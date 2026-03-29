import React, { useRef, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  FileCode, 
  Settings, 
  Save, 
  RotateCcw,
  Check, 
  Info,
  ChevronRight,
  Monitor
} from 'lucide-react';
import { useNexus } from '../../contexts/NexusContext';

const NexusEditor = () => {
  const { state, dispatch } = useNexus();
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  
  const activeFile = state.project.files[state.project.activeFilePath];
  const openTabs = state.project.openTabs;

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Custom theme "nexus-dark"
    monaco.editor.defineTheme('nexus-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '#7c3aed', fontStyle: 'bold' },
        { token: 'identifier', foreground: '#e2e8f0' },
        { token: 'string', foreground: '#00f5ff' },
        { token: 'function', foreground: '#00ff88', fontStyle: 'bold' },
        { token: 'type', foreground: '#ff8800' },
        { token: 'comment', foreground: '#64748b' },
      ],
      colors: {
        'editor.background': '#0f0f1a',
        'editor.foreground': '#e2e8f0',
        'editor.lineHighlightBackground': '#1a1a2e',
        'editorCursor.foreground': '#00f5ff',
        'editorWhitespace.foreground': '#1a1a2e',
        'editorIndentGuide.background': '#1a1a2e',
        'editorIndentGuide.activeBackground': '#00f5ff55',
        'editor.selectionBackground': '#00f5ff22',
        'editorBracketMatch.background': '#7c3aed33',
        'editorBracketMatch.border': '#7c3aed',
      }
    });

    monaco.editor.setTheme('nexus-dark');
  };

  const handleSave = () => {
    if (state.project.activeFilePath) {
      dispatch({ type: 'SAVE_FILE', payload: state.project.activeFilePath });
      // Show saved toast (mock)
      console.log('Saved:', state.project.activeFilePath);
    }
  };

  const handleContentChange = (value) => {
    if (state.project.activeFilePath && value !== activeFile?.content) {
      dispatch({ 
        type: 'UPDATE_FILE', 
        payload: { path: state.project.activeFilePath, content: value, unsaved: true } 
      });
    }
  };

  const closeTab = (e, path) => {
    e.stopPropagation();
    dispatch({ type: 'CLOSE_TAB', payload: path });
  };

  if (!state.project.activeFilePath) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[#0f0f1a] text-[#64748b]">
        <div className="text-center group">
          <FileCode className="w-16 h-16 mx-auto mb-4 opacity-10 group-hover:opacity-30 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12" />
          <h2 className="text-xl font-medium mb-2 group-hover:text-[#e2e8f0] transition-colors">Select a file to edit</h2>
          <p className="text-sm opacity-50 group-hover:opacity-80 transition-all">Cmd+P to search files, or select from the explorer</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#0f0f1a]">
      {/* Tab Bar */}
      <div className="flex bg-[#0a0a14] border-b border-[#1a1a2e] overflow-x-auto no-scrollbar h-10">
        <AnimatePresence mode="popLayout">
          {openTabs.map((path) => (
            <motion.div
              layout
              key={path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => dispatch({ type: 'SET_ACTIVE_FILE', payload: path })}
              className={`flex items-center gap-2 px-4 h-full cursor-pointer transition-all border-r border-[#1a1a2e] relative group min-w-[120px] max-w-[240px] ${
                path === state.project.activeFilePath ? 'bg-[#0f0f1a]' : 'bg-[#080810] hover:bg-[#0f0f1a]/80'
              }`}
            >
              <FileCode className={`w-3.5 h-3.5 ${path === state.project.activeFilePath ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span className={`text-[12px] truncate ${path === state.project.activeFilePath ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                {path.split('/').pop()}
              </span>
              
              {state.project.files[path]?.unsaved && (
                <div className="w-2 h-2 rounded-full bg-orange-500/80 shadow-[0_0_4px_rgba(249,115,22,0.5)]" />
              )}
              
              <button 
                onClick={(e) => closeTab(e, path)}
                className="ml-auto p-0.5 rounded-md text-transparent group-hover:text-slate-500 hover:text-white hover:bg-[#1a1a2e] transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              
              {path === state.project.activeFilePath && (
                <motion.div layoutId="activeTabGlow" className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 shadow-[0_-4px_10px_rgba(0,245,255,0.4)]" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Breadcrumbs */}
      <div className="flex items-center h-8 px-4 text-[10px] text-slate-500 border-b border-[#1a1a2e] bg-[#0f0f1a]/50">
        {state.project.activeFilePath.split('/').map((part, index, arr) => (
          <React.Fragment key={index}>
            <span className="hover:text-slate-300 cursor-pointer">{part}</span>
            {index < arr.length - 1 && <ChevronRight className="w-3 h-3 mx-1" />}
          </React.Fragment>
        ))}
      </div>

      {/* Editor Surface */}
      <div className="flex-grow relative overflow-hidden group">
        <Editor
          height="100%"
          language={activeFile?.language}
          value={activeFile?.content || ''}
          theme={state.editor.theme}
          onMount={handleEditorDidMount}
          onChange={handleContentChange}
          options={{
            fontSize: state.editor.fontSize,
            wordWrap: state.editor.wordWrap,
            minimap: { enabled: state.editor.minimap },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, Courier New, monospace',
            padding: { top: 16 },
            automaticLayout: true,
            renderWhitespace: 'none',
            fontLigatures: true,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'hidden',
              verticalScrollbarSize: 6,
            }
          }}
        />

        {/* Floating actions */}
        <div className="absolute top-4 right-8 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleSave} className="p-2 rounded-lg bg-[#1a1a2e]/80 border border-[#2a2a44] text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 backdrop-blur-md transition-all shadow-xl">
            <Save className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg bg-[#1a1a2e]/80 border border-[#2a2a44] text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 backdrop-blur-md transition-all shadow-xl">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#0a0a14] border-t border-[#1a1a2e] flex items-center justify-between px-4 text-[10px] font-medium text-slate-500 select-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 hover:text-slate-300 cursor-pointer">
            <RotateCcw className="w-3 h-3 text-cyan-500" />
            <span>Ready</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-slate-300 cursor-pointer uppercase">
            {activeFile?.language}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 hover:text-slate-300 cursor-pointer">
            Ln 1, Col 1
          </div>
          <div className="flex items-center gap-1.5 hover:text-slate-300 cursor-pointer">
            UTF-8
          </div>
          <div className="flex items-center gap-1.5 text-cyan-500">
            <Check className="w-3 h-3" />
            <span>Synced</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NexusEditor;
