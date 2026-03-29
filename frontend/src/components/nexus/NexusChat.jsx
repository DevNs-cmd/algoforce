import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Send, Mic, Paperclip, Sparkles, FileCode, Zap
} from 'lucide-react';
import { useNexus } from '../../contexts/NexusContext';
import { fetchStream, parseFileBlocks } from '../../services/nexusAI';

// Simple markdown-like code block renderer (no external dep)
const MessageContent = ({ content }) => {
  const parts = content.split(/(```[\s\S]*?```|<file[\s\S]*?<\/file>)/g);
  return (
    <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
      {parts.map((part, i) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.slice(3, -3).split('\n');
          const lang = lines[0] || '';
          const code = lines.slice(1).join('\n');
          return (
            <pre key={i} className="my-2 p-3 bg-black/40 rounded-lg border border-white/10 text-xs font-mono overflow-x-auto text-cyan-300">
              {lang && <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-widest">{lang}</div>}
              {code}
            </pre>
          );
        }
        if (part.startsWith('<file') && part.endsWith('</file>')) {
          const pathMatch = part.match(/path=['"]([^'"]+)['"]/);
          const path = pathMatch?.[1] || 'file';
          return (
            <div key={i} className="my-2 p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center gap-2">
              <FileCode className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span className="text-xs font-mono text-cyan-400 truncate">{path}</span>
              <span className="text-[10px] text-cyan-600 ml-auto">generated</span>
            </div>
          );
        }
        return part ? <span key={i}>{part}</span> : null;
      })}
    </div>
  );
};

const QUICK_PROMPTS = [
  "Create a hero section",
  "Add dark mode toggle",
  "Build a login page",
  "Fix API errors"
];

const NexusChat = () => {
  const { state, dispatch } = useNexus();
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const streamRef = useRef('');

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
      content: input.trim(),
      timestamp: new Date().toISOString()
    };

    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    setInput('');
    setIsGenerating(true);
    streamRef.current = '';
    dispatch({ type: 'SET_AI_STATE', payload: { isGenerating: true, streamBuffer: '' } });

    try {
      await fetchStream(
        {
          messages: [...state.ai.messages, userMessage],
          model: state.ai.model,
          projectFiles: state.project.files,
          agentMode: state.ai.agentMode,
          sessionId: state.ai.sessionId
        },
        (token) => {
          streamRef.current += token;
          dispatch({ type: 'SET_AI_STATE', payload: { streamBuffer: streamRef.current } });
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
      console.error(err);
      setIsGenerating(false);
      dispatch({ type: 'SET_AI_STATE', payload: { isGenerating: false, streamBuffer: '' } });
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          role: 'assistant',
          content: `⚠️ Connection error: ${err.message}. Make sure the backend is running on port 8080.`,
          timestamp: new Date().toISOString(),
          filesModified: 0
        }
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0f0f1a] overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/5 blur-[100px] pointer-events-none" />

      {/* Messages */}
      <div className="flex-grow overflow-y-auto px-4 py-4 space-y-4 relative" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1a1a2e transparent' }}>
        {state.ai.messages.length === 0 && !isGenerating && (
          <div className="h-full flex items-center justify-center p-6 min-h-[200px]">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-600/10 border border-white/10 flex items-center justify-center mx-auto mb-5">
                <Sparkles className="w-7 h-7 text-cyan-400" />
              </div>
              <h2 className="text-lg font-bold text-white mb-2">Build anything with Nexus AI</h2>
              <p className="text-xs text-slate-500 mb-6 max-w-xs mx-auto">Describe your vision and Nexus will build it file by file.</p>
              <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setInput(prompt)}
                    className="p-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 hover:border-cyan-500/30 transition-all hover:text-cyan-400 text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {state.ai.messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[88%] rounded-2xl p-3.5 border shadow-lg ${
              msg.role === 'user'
                ? 'bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 border-cyan-500/20 text-white'
                : 'bg-[#1a1a2e] border-[#2a2a44] text-slate-300'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-cyan-500' : 'bg-purple-600'}`}>
                  {msg.role === 'user'
                    ? <div className="w-2 h-2 bg-white rounded-full" />
                    : <Zap className="w-2.5 h-2.5 text-white" />
                  }
                </div>
                <span className="text-[9px] uppercase tracking-widest font-bold opacity-40">
                  {msg.role === 'user' ? 'You' : 'Nexus AI'}
                </span>
                {msg.filesModified > 0 && (
                  <span className="ml-auto text-[9px] text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded-full font-bold">
                    {msg.filesModified} file{msg.filesModified > 1 ? 's' : ''} updated
                  </span>
                )}
              </div>
              <MessageContent content={msg.content} />
            </div>
          </div>
        ))}

        {/* Streaming buffer */}
        {isGenerating && state.ai.streamBuffer && (
          <div className="flex justify-start">
            <div className="max-w-[88%] rounded-2xl p-3.5 bg-[#1a1a2e] border border-[#2a2a44] text-slate-300 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center shadow-[0_0_10px_#7c3aed]">
                  <Sparkles className="w-2.5 h-2.5 text-white animate-pulse" />
                </div>
                <span className="text-[9px] uppercase tracking-widest font-bold opacity-40">Nexus AI</span>
                <span className="ml-auto flex gap-1">
                  {[0,1,2].map(d => (
                    <div key={d} className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                  ))}
                </span>
              </div>
              <MessageContent content={state.ai.streamBuffer} />
            </div>
          </div>
        )}

        {/* Typing indicator (no buffer yet) */}
        {isGenerating && !state.ai.streamBuffer && (
          <div className="flex justify-start">
            <div className="rounded-2xl p-3.5 bg-[#1a1a2e] border border-[#2a2a44] shadow-lg">
              <div className="flex items-center gap-1.5 px-1">
                {[0,1,2].map(d => (
                  <div key={d} className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: `${d * 0.2}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-3 pb-3 pt-2 border-t border-[#1a1a2e] bg-[#0a0a14] flex-shrink-0">
        <div className={`relative flex flex-col bg-[#1a1a2e] border rounded-xl transition-all ${
          isGenerating ? 'opacity-60 border-[#2a2a44]' : 'border-[#2a2a44] focus-within:border-cyan-500/40'
        }`}>
          <textarea
            ref={textareaRef}
            placeholder="Describe what you want to build..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isGenerating}
            rows={2}
            className="w-full pt-3 pb-2 px-4 bg-transparent border-none focus:outline-none focus:ring-0 text-white placeholder-slate-600 resize-none text-sm font-medium"
          />
          <div className="flex items-center justify-between px-3 pb-2">
            <div className="flex items-center gap-1.5">
              <button className="p-1.5 rounded-lg text-slate-600 hover:text-slate-300 hover:bg-[#2a2a44] transition-all">
                <Paperclip className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 rounded-lg text-slate-600 hover:text-slate-300 hover:bg-[#2a2a44] transition-all">
                <Mic className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-1 bg-black/20 px-2 py-1 rounded-full text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                <Zap className="w-2.5 h-2.5 text-purple-500" />
                Smart Mode
              </div>
            </div>
            <button
              onClick={handleSend}
              disabled={isGenerating || !input.trim()}
              className={`p-1.5 rounded-lg flex items-center justify-center transition-all ${
                input.trim() && !isGenerating
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg hover:scale-110 active:scale-95'
                  : 'bg-[#0f0f1a] text-slate-600'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="mt-2 text-center">
          <p className="text-[9px] font-bold text-slate-700 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <FileCode className="w-2.5 h-2.5" />
            Nexus Engine V1
          </p>
        </div>
      </div>

      {/* Progress bar */}
      {isGenerating && (
        <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 w-[200%]"
            style={{ animation: 'marquee 2s linear infinite' }}
          />
        </div>
      )}

      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
};

export default NexusChat;
