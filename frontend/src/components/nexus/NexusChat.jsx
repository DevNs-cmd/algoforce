import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, Mic, Paperclip, Sparkles, FileCode, Zap, 
  Layout, Smartphone, Monitor, ChevronDown, 
  Globe, Settings, ArrowUp, Cpu, FileText 
} from 'lucide-react';
import { useNexus } from '../../contexts/NexusContext';
import { fetchStream, parseFileBlocks } from '../../services/nexusAI';

const NexusChat = () => {
  const { state, dispatch } = useNexus();
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [state.ai.messages, state.ai.streamBuffer, scrollToBottom]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    setInput('');
    setIsGenerating(true);
    dispatch({ type: 'SET_AI_STATE', payload: { isGenerating: true, streamBuffer: '' } });

    try {
      await fetchStream(
        {
          prompt: input,
          messages: state.ai.messages,
          projectId: state.project.id
        },
        (token) => {
          dispatch({ 
            type: 'SET_AI_STATE', 
            payload: { streamBuffer: state.ai.streamBuffer + token } 
          });
        },
        async (fullContent) => {
          const fileBlocks = await parseFileBlocks(fullContent);
          const aiMessage = {
            role: 'assistant',
            content: fullContent,
            timestamp: new Date().toISOString(),
            filesModified: fileBlocks.length
          };

          dispatch({ type: 'ADD_MESSAGE', payload: aiMessage });
          dispatch({ type: 'SET_AI_STATE', payload: { isGenerating: false, streamBuffer: '' } });
          setIsGenerating(false);

          if (fileBlocks.length > 0) {
            const newFiles = { ...state.project.files };
            fileBlocks.forEach(block => {
              newFiles[block.path] = {
                content: block.content,
                language: block.path.split('.').pop(),
                aiGenerated: true,
                unsaved: true
              };
            });
            dispatch({ type: 'SET_FILES', payload: newFiles });
            dispatch({ type: 'SET_ACTIVE_FILE', payload: fileBlocks[0].path });
          }
        }
      );
    } catch (err) {
      console.error('Nexux Engine Connection Error:', err);
      setIsGenerating(false);
      dispatch({ type: 'SET_AI_STATE', payload: { isGenerating: false, streamBuffer: '' } });
    }
  };

  return (
    <div className="h-full flex flex-col bg-black/40 overflow-hidden backdrop-blur-3xl relative">
      {/* Decorative background gradients */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-cyan-600/5 blur-[120px] pointer-events-none" />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-start pt-20 md:pt-32 p-4 sm:p-6 relative z-10">
        
        {/* Boutique Heading Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-10 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Nexus Vibe 4.5</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold tracking-[-0.03em] text-white mb-6 leading-[0.95]">
            Your Vibe, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Encoded.</span>
          </h1>
          
          <p className="text-slate-400 text-xs md:text-sm max-w-sm mx-auto font-medium tracking-wide opacity-30 leading-relaxed uppercase">
            Autonomous intelligence with human intent.
          </p>
        </motion.div>
        
        {/* Chat Messages (Only if present) */}
        {state.ai.messages.length > 0 && (
          <div className="absolute inset-0 overflow-y-auto px-6 py-20 space-y-6" style={{ scrollbarWidth: 'thin' }}>
            {state.ai.messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-white/10' 
                    : 'bg-white/[0.03] border border-white/5'
                }`}>
                  <div className="flex items-center gap-2 mb-2 opacity-50">
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {msg.role === 'user' ? 'Constructor' : 'Nexux AI'}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-slate-200 leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            {isGenerating && (
              <div className="flex justify-start">
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 max-w-[80%]">
                  <div className="flex items-center gap-2 mb-2 opacity-50">
                    <span className="text-[10px] font-black uppercase tracking-widest">Nexux AI</span>
                  </div>
                  <p className="text-sm text-slate-300 animate-pulse">Generating vibe engine architecture...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Innovative Vibe Artifact */}
        <motion.div
          layout
          className={`w-full max-w-4xl transition-all duration-1000 ${
            state.ai.messages.length === 0 ? 'mt-0' : 'fixed bottom-10 px-6'
          }`}
        >
          <div className="relative group p-1">
            {/* Outer Aura Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-1000" />
            
            <div className="relative bg-[#08080c]/60 backdrop-blur-[60px] border border-white/10 rounded-full h-18 md:h-24 px-4 md:px-7 flex items-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] transition-all duration-700 group-hover:border-white/20">
              {/* Inner Spectral Line */}
              <div className="absolute inset-x-20 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none" />
              
              <div className="flex items-center gap-2 md:gap-4">
                <button className="w-10 h-10 md:w-14 md:h-14 rounded-full text-slate-500 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center group/icon">
                  <Paperclip className="w-5 h-5 md:w-6 md:h-6 group-hover/icon:scale-110 transition-transform" />
                </button>
                <button className="w-10 h-10 md:w-14 md:h-14 rounded-full text-slate-500 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center group/icon">
                  <Mic className="w-5 h-5 md:w-6 md:h-6 group-hover/icon:scale-110 transition-transform" />
                </button>
              </div>

              <div className="h-8 md:h-12 w-[1px] bg-white/10 mx-3 md:mx-6" />

              <div className="flex items-center justify-center px-4 md:px-6 h-9 md:h-12 rounded-full bg-white/[0.04] border border-white/5 whitespace-nowrap overflow-hidden relative">
                <div className="w-4 h-4 text-cyan-400 relative z-10">
                  <Zap className="w-4 h-4 md:w-5 md:h-5 fill-current animate-pulse shadow-[0_0_15px_rgba(34,211,238,0.7)]" />
                </div>
                <span className="hidden sm:inline text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] text-white/40 ml-4 relative z-10">Vibe 2.0</span>
              </div>

              <input
                type="text"
                placeholder="Vibe something amazing..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-grow bg-transparent border-none focus:outline-none focus:ring-0 text-white placeholder-slate-700 text-base md:text-xl font-medium px-4 md:px-10 tracking-tight min-w-0"
              />

              <div className="flex items-center gap-3 pr-2 md:pr-4">
                <div className="hidden lg:flex items-center gap-3 px-5 h-10 rounded-full bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all cursor-pointer group/model group-hover:bg-white/5">
                  <span className="text-[10px] font-bold text-slate-600 group-hover/model:text-slate-300">Claude 4.5</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-800 transition-transform group-hover/model:translate-y-0.5" />
                </div>

                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isGenerating}
                  className={`relative w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all ${
                    input.trim()
                      ? 'bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-110 active:scale-95'
                      : 'bg-white/[0.03] text-slate-800'
                  }`}
                >
                  {isGenerating ? (
                    <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <Send className="w-6 h-6 md:w-8 md:h-8 rotate-[-15deg] translate-x-0.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NexusChat;
