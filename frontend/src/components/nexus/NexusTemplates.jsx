import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  ShoppingCart, 
  Layout, 
  User, 
  MessageSquare, 
  ShieldCheck, 
  Smartphone, 
  Cpu,
  Plus
} from 'lucide-react';
import { useNexus } from '../../contexts/NexusContext';

const templates = [
  { id: 'landing', name: 'React Landing Page', icon: Layout, color: 'text-cyan-400', desc: 'Hero, Features, Pricing, Footer' },
  { id: 'store', name: 'E-Commerce Store', icon: ShoppingCart, color: 'text-purple-400', desc: 'Product grid, cart, checkout UI' },
  { id: 'saas', name: 'SaaS Dashboard', icon: Cpu, color: 'text-green-400', desc: 'Analytics, sidebar nav, data tables' },
  { id: 'portfolio', name: 'Portfolio Site', icon: User, color: 'text-blue-400', desc: 'Creative dev portfolio with animations' },
  { id: 'chat', name: 'Chat Application', icon: MessageSquare, color: 'text-orange-400', desc: 'Real-time chat UI with rooms' },
  { id: 'auth', name: 'Auth System', icon: ShieldCheck, color: 'text-red-400', desc: 'Login, signup, forgot password flows' },
];

const NexusTemplates = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full"
          >
            Start Your Masterpiece
          </motion.div>
          <h1 className="text-5xl font-black text-white mb-4 tracking-tighter">Choose a Template</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Select a foundation and let Nexus AI build the rest autonomously.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.02, translateY: -5 }}
            onClick={() => onSelect('blank')}
            className="group relative h-48 rounded-3xl bg-[#0f0f1a] border border-white/5 p-8 flex flex-col justify-center items-center cursor-pointer overflow-hidden transition-all hover:border-cyan-500/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Plus className="w-10 h-10 text-slate-500 group-hover:text-cyan-400 mb-4 transition-colors" />
            <span className="text-xl font-bold text-white">Blank Canvas</span>
            <span className="text-sm text-slate-500 mt-1">Start from scratch</span>
          </motion.div>

          {templates.map((tpl, i) => (
            <motion.div
              key={tpl.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, translateY: -5 }}
              onClick={() => onSelect(tpl.id)}
              className="group relative h-48 rounded-3xl bg-[#0f0f1a] border border-white/5 p-8 flex flex-col justify-between cursor-pointer overflow-hidden transition-all hover:border-cyan-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-start">
                <tpl.icon className={`w-8 h-8 ${tpl.color}`} />
                <Zap className="w-4 h-4 text-slate-700 group-hover:text-cyan-400 transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{tpl.name}</h3>
                <p className="text-sm text-slate-500 truncate">{tpl.desc}</p>
              </div>
              
              {/* Decorative Glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/5 blur-3xl group-hover:bg-cyan-500/10 transition-all" />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center text-slate-600">
          <p className="text-xs font-bold uppercase tracking-[0.2em]">Press ESC to cancel or start with a blank project</p>
        </div>
      </motion.div>
    </div>
  );
};

export default NexusTemplates;
