import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNexus, NexusProvider } from '../contexts/NexusContext';
import { INITIAL_FILES } from '../services/virtualFS';

const NexusHeader = React.lazy(() => import('../components/nexus/NexusHeader'));
const NexusFileTree = React.lazy(() => import('../components/nexus/NexusFileTree'));
const NexusEditor = React.lazy(() => import('../components/nexus/NexusEditor'));
const NexusPreview = React.lazy(() => import('../components/nexus/NexusPreview'));
const NexusChat = React.lazy(() => import('../components/nexus/NexusChat'));
const NexusTerminal = React.lazy(() => import('../components/nexus/NexusTerminal'));
const NexusBackground = React.lazy(() => import('../components/nexus/NexusBackground'));

const NexusContent = () => {
  const { state, dispatch } = useNexus();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('nexus_state');
    if (!saved) {
      dispatch({ type: 'SET_FILES', payload: INITIAL_FILES });
      dispatch({ type: 'SET_ACTIVE_FILE', payload: 'src/App.jsx' });
    }
    setTimeout(() => setIsLoaded(true), 500);
  }, [dispatch]);

  if (!isLoaded) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-t-2 border-cyan-500 rounded-full animate-spin mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Nexus AI Loading...
          </h1>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#080810] text-[#e2e8f0] overflow-hidden flex flex-col">
      <React.Suspense fallback={
        <div className="h-full w-full bg-[#080810] flex items-center justify-center text-cyan-500 animate-pulse text-sm">
          Initializing Interface...
        </div>
      }>
        {/* Background */}
        <NexusBackground />

        {/* Header */}
        <div className="flex-shrink-0 relative z-20">
          <NexusHeader />
        </div>

        {/* Main IDE Layout */}
        <div className="flex-grow flex overflow-hidden relative z-10" style={{ height: 'calc(100vh - 48px)' }}>
          
          {/* Left: File Tree */}
          {state.ui.leftPanelOpen && (
            <div className="w-56 flex-shrink-0 border-r border-[#1a1a2e] overflow-hidden">
              <NexusFileTree />
            </div>
          )}

          {/* Center: Editor + Bottom Panel */}
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">
            {/* Editor */}
            <div
              className="overflow-hidden"
              style={{ height: state.ui.bottomPanelOpen ? '60%' : '100%' }}
            >
              <NexusEditor />
            </div>

            {/* Bottom Panel: Chat / Terminal */}
            {state.ui.bottomPanelOpen && (
              <div className="flex-1 border-t border-[#1a1a2e] flex flex-col overflow-hidden bg-[#0f0f1a] min-h-0">
                {/* Tab Bar */}
                <div className="flex items-center gap-4 px-4 h-9 border-b border-[#1a1a2e] bg-[#0a0a14] flex-shrink-0">
                  <button
                    onClick={() => dispatch({ type: 'SET_UI_STATE', payload: { bottomTab: 'chat' } })}
                    className={`text-[10px] font-bold uppercase tracking-widest transition-colors pb-0.5 border-b-2 ${
                      state.ui.bottomTab === 'chat'
                        ? 'text-cyan-400 border-cyan-400'
                        : 'text-slate-500 border-transparent hover:text-slate-300'
                    }`}
                  >
                    💬 Nexus AI
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'SET_UI_STATE', payload: { bottomTab: 'terminal' } })}
                    className={`text-[10px] font-bold uppercase tracking-widest transition-colors pb-0.5 border-b-2 ${
                      state.ui.bottomTab === 'terminal'
                        ? 'text-cyan-400 border-cyan-400'
                        : 'text-slate-500 border-transparent hover:text-slate-300'
                    }`}
                  >
                    ⚡ Terminal
                  </button>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-hidden">
                  {state.ui.bottomTab === 'chat' ? <NexusChat /> : <NexusTerminal />}
                </div>
              </div>
            )}
          </div>

          {/* Right: Live Preview */}
          {state.ui.rightPanelOpen && (
            <div className="w-[35%] flex-shrink-0 border-l border-[#1a1a2e] overflow-hidden">
              <NexusPreview />
            </div>
          )}
        </div>
      </React.Suspense>
    </div>
  );
};

const Nexus = () => (
  <NexusProvider>
    <NexusContent />
  </NexusProvider>
);

export default Nexus;
