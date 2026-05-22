import { useEffect } from 'react';
import { motion } from 'framer-motion';

const Nexus = () => {
  useEffect(() => {
    // Technical fallback redirect to Crucible
    window.location.replace("https://crucible-website-omega.vercel.app/");
  }, []);

  return (
    <div className="h-screen w-screen bg-[#020205] flex items-center justify-center text-white font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center px-6"
      >
        <div className="w-16 h-16 border-t-2 border-purple-500 rounded-full animate-spin mx-auto mb-6 shadow-[0_0_15px_rgba(168,85,247,0.3)]" />
        <h2 className="text-xl font-bold tracking-tighter uppercase mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
          Crucible Engine
        </h2>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          Redirecting to Crucible...
        </p>
      </motion.div>
    </div>
  );
};

export default Nexus;
