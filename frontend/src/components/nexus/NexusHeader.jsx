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
    <header className="h-14 border-b border-white/5 bg-black/80 backdrop-blur-md flex items-center justify-between px-6 z-20 relative">
      <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent w-full" />
      
      {/* Left: Branding & Project */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tighter text-white leading-none">Nexux <span className="text-cyan-400">AI</span></span>
            <span className="text-[8px] uppercase tracking-[0.3em] font-black text-slate-500">Vibe Engine v2.0</span>
          </div>
        </div>
        
        <div className="h-8 w-px bg-white/5 mx-2" />
        
        <div className="flex items-center gap-3 group cursor-pointer px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all">
          <div className={`w-2 h-2 rounded-full ${state.project.unsaved ? 'bg-orange-500 animate-pulse shadow-[0_0_10px_#f97316]' : 'bg-cyan-500 shadow-[0_0_10px_#22d3ee]'}`} />
          <span className="text-xs font-black uppercase tracking-widest text-slate-300 group-hover:text-white transition-colors">{state.project.name}</span>
        </div>
      </div>

      {/* Center: Model Selector & Workspace Controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 cursor-pointer hover:border-cyan-500/40 hover:bg-white/[0.05] transition-all group shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_#a855f7]" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-cyan-400 transition-colors">{state.ai.model}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400" />
        </div>
        
        <div className="flex items-center gap-1 bg-black/40 rounded-xl border border-white/5 p-1 backdrop-blur-xl">
          <button 
            onClick={toggleLeft}
            className={`p-2 rounded-lg transition-all ${state.ui.leftPanelOpen ? 'bg-cyan-500/10 text-cyan-400 shadow-[inset_0_0_10px_rgba(34,211,238,0.2)]' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
          >
            <PanelLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={toggleBottom}
            className={`p-2 rounded-lg transition-all ${state.ui.bottomPanelOpen ? 'bg-cyan-500/10 text-cyan-400 shadow-[inset_0_0_10px_rgba(34,211,238,0.2)]' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button 
            onClick={toggleRight}
            className={`p-2 rounded-lg transition-all ${state.ui.rightPanelOpen ? 'bg-cyan-500/10 text-cyan-400 shadow-[inset_0_0_10px_rgba(34,211,238,0.2)]' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
          >
            <PanelRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-3 mr-4">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Autonomous Core</span>
          <button 
            onClick={() => dispatch({ type: 'SET_AI_STATE', payload: { agentMode: !state.ai.agentMode } })}
            className={`relative w-11 h-6 rounded-full transition-all duration-500 ${state.ai.agentMode ? 'bg-gradient-to-r from-cyan-500 to-purple-600 shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-white/5'}`}
          >
            <motion.div 
              animate={{ x: state.ai.agentMode ? 22 : 4 }}
              className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-xl flex items-center justify-center`}
            >
              {state.ai.agentMode && <Zap className="w-2.5 h-2.5 text-cyan-500" />}
            </motion.div>
          </button>
        </div>

        <button className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all">
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>

        <button className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-[0_10px_20px_-5px_rgba(34,211,238,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(34,211,238,0.6)] hover:scale-105 active:scale-95 transition-all">
          <Rocket className="w-4 h-4" />
          <span>Launch</span>
        </button>
      </div>
    </header>
  );
};

export default NexusHeader;
