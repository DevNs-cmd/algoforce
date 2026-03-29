import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  RefreshCw, 
  ExternalLink, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Eye, 
  AlertTriangle,
  Zap
} from 'lucide-react';
import { useNexus } from '../../contexts/NexusContext';

const NexusPreview = () => {
  const { state } = useNexus();
  const [srcDoc, setSrcDoc] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef(null);
  const debounceRef = useRef(null);

  const generatePreview = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const files = state.project.files;
      const appFile = files['src/App.jsx'];
      const cssFile = files['src/index.css'];

      if (!appFile?.content) {
        setSrcDoc('');
        setIsLoading(false);
        return;
      }

      let code = appFile.content;

      // Dynamically import Babel to avoid blocking initial page load
      try {
        const Babel = await import('@babel/standalone');
        const result = Babel.transform(code, {
          presets: ['react', 'env'],
          filename: 'App.jsx'
        });
        code = result.code;
      } catch (transpileErr) {
        throw new Error(`Transpile error: ${transpileErr.message}`);
      }

      const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <style>
      body { margin: 0; background: #080810; color: #e2e8f0; font-family: system-ui, sans-serif; }
      ${cssFile?.content || ''}
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      try {
        const module = { exports: {} };
        const exports = module.exports;
        ${code}
        const App = module.exports?.default || exports?.default;
        if (App) {
          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(React.createElement(App));
        } else {
          document.getElementById('root').innerHTML = '<div style="padding:20px;color:#ff8800;font-family:monospace;">No default export found in App.jsx</div>';
        }
      } catch(e) {
        document.getElementById('root').innerHTML = '<pre style="color:#ff4444;padding:20px;font-family:monospace;font-size:12px;white-space:pre-wrap;">' + e.message + '\\n' + e.stack + '</pre>';
      }
    </script>
  </body>
</html>`;
      setSrcDoc(html);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [state.project.files]);

  // Debounced auto-refresh
  useEffect(() => {
    if (!state.ui.autoRefresh) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(generatePreview, 1500);
    return () => clearTimeout(debounceRef.current);
  }, [state.project.files, state.ui.autoRefresh, generatePreview]);

  const hasFiles = Object.keys(state.project.files).length > 0;

  return (
    <div className="h-full flex flex-col bg-[#080810]">
      {/* Toolbar */}
      <div className="h-10 border-b border-[#1a1a2e] bg-[#0a0a14] flex items-center justify-between px-3 flex-shrink-0">
        <div className="flex items-center gap-1 p-1 bg-[#1a1a2e] rounded-md border border-[#2a2a44]">
          <button className="p-1 rounded bg-[#0f0f1a] text-cyan-400" title="Desktop">
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 rounded text-slate-500 hover:text-slate-300 transition-colors" title="Tablet">
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 rounded text-slate-500 hover:text-slate-300 transition-colors" title="Mobile">
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={generatePreview}
            disabled={isLoading}
            className="p-1.5 rounded hover:bg-[#1a1a2e] transition-colors"
            title="Refresh Preview"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-400 hover:text-cyan-400 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => {
              const blob = new Blob([srcDoc], { type: 'text/html' });
              const url = URL.createObjectURL(blob);
              window.open(url, '_blank');
            }}
            className="p-1.5 rounded hover:bg-[#1a1a2e] transition-colors"
            title="Open in New Tab"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 hover:text-cyan-400" />
          </button>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold text-cyan-500 bg-cyan-500/10 select-none">
            <Zap className="w-2.5 h-2.5" />
            LIVE
          </div>
        </div>
      </div>

      {/* Preview Surface */}
      <div className="flex-grow relative overflow-hidden bg-white">
        {!hasFiles ? (
          <div className="h-full w-full flex items-center justify-center bg-[#0a0a14]">
            <div className="text-center">
              <Eye className="w-12 h-12 mx-auto mb-4 text-slate-700" />
              <p className="text-slate-500 text-sm font-medium">No project files yet</p>
              <p className="text-slate-700 text-xs mt-1">Ask Nexus AI to build something to see it here</p>
            </div>
          </div>
        ) : error ? (
          <div className="h-full w-full flex items-center justify-center p-8 bg-[#0a0a14]">
            <div className="text-center max-w-md w-full">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-orange-500 animate-pulse" />
              <h2 className="text-lg font-bold text-white mb-3">Compilation Error</h2>
              <pre className="text-xs text-left text-orange-300 p-4 bg-black/60 rounded-xl border border-orange-500/20 whitespace-pre-wrap overflow-auto max-h-48 font-mono">
                {error}
              </pre>
              <button
                onClick={generatePreview}
                className="mt-4 px-4 py-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-lg text-xs font-bold hover:bg-orange-500/20 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            srcDoc={srcDoc}
            title="Nexus Live Preview"
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-modals"
          />
        )}

        {isLoading && (
          <div className="absolute inset-0 bg-[#0a0a14]/80 backdrop-blur-sm flex items-center justify-center pointer-events-none z-10">
            <div className="text-center">
              <div className="w-10 h-10 border-t-2 border-cyan-500 rounded-full animate-spin mx-auto mb-3" />
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Compiling...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NexusPreview;
