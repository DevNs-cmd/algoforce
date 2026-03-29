import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Share2, 
  Download, 
  Rocket, 
  ChevronDown, 
  Zap,
  Layout,
  PanelLeft,
  PanelRight,
  Monitor,
  Maximize2
} from 'lucide-react';
import { useNexus } from '../../contexts/NexusContext';

const NexusHeader = () => {
  const { state, dispatch } = useNexus();

  const toggleLeft = () => dispatch({ type: 'SET_UI_STATE', payload: { leftPanelOpen: !state.ui.leftPanelOpen } });
  const toggleRight = () => dispatch({ type: 'SET_UI_STATE', payload: { rightPanelOpen: !state.ui.rightPanelOpen } });
  const toggleBottom = () => dispatch({ type: 'SET_UI_STATE', payload: { bottomPanelOpen: !state.ui.bottomPanelOpen } });

  return (
    <header className="h-12 border-b border-[#1a1a2e] bg-[#0a0a14] flex items-center justify-between px-4 z-20">
      {/* Left: Branding & Project */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-white">Nexus <span className="text-cyan-400">AI</span></span>
        </div>
        
        <div className="h-6 w-px bg-[#1a1a2e]" />
        
        <div className="flex items-center gap-2 group cursor-pointer">
          <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{state.project.name}</span>
          {!state.project.unsaved && <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />}
          {state.project.unsaved && <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />}
        </div>
      </div>

      {/* Center: Model Selector */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1a2e] border border-[#2a2a44] cursor-pointer hover:border-cyan-500/50 transition-colors group">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">{state.ai.model}</span>
          <ChevronDown className="w-3.3 h-3.3 text-slate-500" />
        </div>
        
        <div className="flex items-center gap-1 bg-[#0f0f1a] rounded-md border border-[#1a1a2e] p-1">
          <button 
            onClick={toggleLeft}
            className={`p-1.5 rounded transition-colors ${state.ui.leftPanelOpen ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <PanelLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={toggleBottom}
            className={`p-1.5 rounded transition-colors ${state.ui.bottomPanelOpen ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button 
            onClick={toggleRight}
            className={`p-1.5 rounded transition-colors ${state.ui.rightPanelOpen ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <PanelRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 mr-2">
          <span className="text-[10px] uppercase tracking-widest text-slate-500">Agent Mode</span>
          <button 
            onClick={() => dispatch({ type: 'SET_AI_STATE', payload: { agentMode: !state.ai.agentMode } })}
            className={`relative w-9 h-5 rounded-full transition-colors ${state.ai.agentMode ? 'bg-purple-600' : 'bg-[#1a1a2e]'}`}
          >
            <motion.div 
              animate={{ x: state.ai.agentMode ? 18 : 2 }}
              className="absolute top-1 w-3 h-3 rounded-full bg-white shadow-lg"
            />
          </button>
        </div>

        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#1a1a2e] border border-[#2a2a44] text-xs font-medium text-slate-300 hover:text-white hover:border-slate-500 transition-colors">
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>

        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#1a1a2e] border border-[#2a2a44] text-xs font-medium text-slate-300 hover:text-white hover:border-slate-500 transition-colors">
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-gradient-to-r from-cyan-600 to-purple-600 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all">
          <Rocket className="w-3.5 h-3.5" />
          <span>Deploy</span>
        </button>
      </div>
    </header>
  );
};

export default NexusHeader;
