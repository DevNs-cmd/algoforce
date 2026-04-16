import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNexus, NexusProvider } from '../contexts/NexusContext';
import { INITIAL_FILES } from '../services/virtualFS';

const NexusHeader = React.lazy(() => import('../components/nexus/NexusHeader'));
const NexusFileTree = React.lazy(() => import('../components/nexus/NexusFileTree'));
const NexusEditor = React.lazy(() => import('../components/nexus/NexusEditor'));
const NexusPreview = React.lazy(() => import('../components/nexus/NexusPreview'));
const NexusChat = React.lazy(() => import('../components/nexus/NexusChat'));
const VibeGlass3D = React.lazy(() => import('../components/nexus/VibeGlass3D'));
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
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-t-2 border-cyan-500 rounded-full animate-spin mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Nexux AI Vibe Engine...
          </h1>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-[#020205] text-[#e2e8f0] font-sans relative">
      <React.Suspense fallback={
        <div className="h-screen w-screen flex items-center justify-center text-cyan-500 animate-pulse text-sm font-black uppercase tracking-[0.3em] z-50 relative">
          Initializing Vibe Engine...
        </div>
      }>
        <NexusBackground />
        
        {/* 3D Liquid Glass Layer */}
        <VibeGlass3D />
        
        {/* Hero Section / Prompt UI */}
        <div className="h-screen flex items-center justify-center relative z-20 px-4">
          <div className="w-full max-w-5xl">
            <NexusChat />
          </div>
        </div>

        {/* Feature Scroll Section (Luxury Details) */}
        <div className="relative z-20 px-6 py-32 max-w-7xl mx-auto space-y-64">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-6">
              <span className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em]">Phase 01</span>
              <h2 className="text-5xl font-medium tracking-tighter">Pure Intent. <br/>Zero Code.</h2>
              <p className="text-slate-400 text-lg leading-relaxed">Nexux interprets the subtle nuances of your description, mapping natural language to complex architectural patterns instantly.</p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1" />
            <div className="space-y-6 order-1 md:order-2">
              <span className="text-purple-400 text-xs font-black uppercase tracking-[0.3em]">Phase 02</span>
              <h2 className="text-5xl font-medium tracking-tighter">Autonomous <br/>Refinement.</h2>
              <p className="text-slate-400 text-lg leading-relaxed">Our Vibe Engine doesn't just generate; it evolves. Watch as the 3D core optimizes your application's logic in the background.</p>
            </div>
          </section>

          <section className="text-center py-20 pb-40">
            <h2 className="text-7xl font-black tracking-tighter mb-8 opacity-20">VIBE CODING</h2>
          </section>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none z-10" />
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
