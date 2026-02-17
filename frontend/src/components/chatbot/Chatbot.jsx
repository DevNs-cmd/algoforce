import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaTimes, FaPaperPlane, FaUserAlt } from 'react-icons/fa'
import { ALGOFORCE_KNOWLEDGE } from './knowledge'

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { role: 'bot', content: ALGOFORCE_KNOWLEDGE.persona.greeting }
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const scrollRef = useRef(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = async () => {
        if (!input.trim()) return

        const userMsg = { role: 'user', content: input }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setIsTyping(true)

        // Advanced Simulated AI Response
        setTimeout(() => {
            const botResponse = generateAIResponse(input.toLowerCase())
            setMessages(prev => [...prev, { role: 'bot', content: botResponse }])
            setIsTyping(false)
        }, 1200)
    }

    const generateAIResponse = (query) => {
        const q = query.toLowerCase().trim();

        // Helper for fuzzy matching (includes basic typo handling)
        const matches = (keywords) => {
            return keywords.some(key => {
                if (q.includes(key)) return true;
                // Simple typo logic: if word length > 4 and has high overlap
                const words = q.split(/\s+/);
                return words.some(word => {
                    if (word.length < 4) return false;
                    let overlap = 0;
                    for (let char of key) if (word.includes(char)) overlap++;
                    return overlap / key.length > 0.8 && Math.abs(word.length - key.length) <= 2;
                });
            });
        };

        // 1. BUYING / STARTING
        if (matches(['buy', 'start', 'hire', 'use', 'work with', 'purchase', 'puchase', 'get starte', 'enquire'])) {
            return `Execute with AlgoForce:\n\n` +
                ALGOFORCE_KNOWLEDGE.purchaseSteps.join("\n") +
                ` \n\nReady? [Pay Directly (Razorpay)](https://rzp.io/l/algoforce-payment) or [Contact Support](/contact)`;
        }

        // 2. Philosophy & Founder
        if (matches(['philosophy', 'vision', 'why', 'founder', 'suman', 'dev', 'who made', 'background'])) {
            return `AlgoForce Core:\n- Founded by Dev N Suman\n- "Revenue Infrastructure" focus\n- AI Moats: LLMs + RAG + Automation\n- 10x Deployment Speed.`;
        }

        // 3. Packages & Pricing
        if (matches(['price', 'pricing', 'prizing', 'cost', 'how much', 'package', 'pack', 'plan', 'cheap'])) {
            const packs = ALGOFORCE_KNOWLEDGE.packages.map(p => `- **${p.name}**: ${p.price} (${p.value})`).join("\n");
            return `Service Packs:\n${packs}\n- **SaaS Launch**: $2,499+\n\nWhich stage? [Full Pricing](/pricing)`;
        }

        // 4. RAG/LLM Specialization
        if (matches(['rag', 'llm', 'chatbot', 'bot', 'train', 'gpt', 'intelligent', 'ai agent'])) {
            return `Our RAG Tech:\n- Custom LLM Ingestion\n- 24/7 Support/Sales\n- Web & WhatsApp\n- Basic: $49 | ROI: High\n- Example: I am a RAG bot!`;
        }

        // 5. AEO/SEO
        if (matches(['seo', 'aeo', 'geo', 'google', 'perplexity', 'ranking', 'search', 'optimization'])) {
            return `Next-Gen Search:\n- AEO (Answer Engine Optimization)\n- GEO (Generative Engine Optimization)\n- Rank in ChatGPT & Perplexity\n- Dominate AI search.`;
        }

        // 6. SaaS / Apps
        if (matches(['saas', 'mvp', 'app', 'build', 'software', 'develop', 'platform', 'startup'])) {
            return `SaaS Build:\n- 30-Day Launch\n- MVP Architecture\n- Starting: $2,499\n- Full Tech Strategy included.`;
        }

        // 7. Support/Retainers
        if (matches(['support', 'maintenance', 'retainer', 'monthly', 'help', 'fix', 'update'])) {
            return `Maintenance:\n- **Growth**: $299/mo\n- **Automation**: $199/mo\n- Continuous bot/AI health.`;
        }

        // 8. Contact / Audit
        if (matches(['contact', 'call', 'audit', 'talk', 'meeting', 'phone', 'email', 'connect'])) {
            return `Next Move:\n1. Open [Contact](/contact)\n2. Request "Free AI Audit"\n3. We scan your leaks in 24h.`;
        }

        // 9. Personality/Default
        if (matches(['hello', 'hi', 'hey', 'greetings', 'sup', 'yo'])) {
            return `Greetings. How can I help?\n- **AI Strategy**\n- **Pricing Review**\n- **Revenue Audit**`;
        }

        return `I specialize in AlgoForce:\n- RAG bots & Automation\n- SaaS MVP builds\n- AEO (AI Search) ranking\n\nWhat's your biggest business bottleneck?`;
    }

    return (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[9999]">
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:bg-purple-700 transition-all group relative"
                    >
                        <motion.div
                            animate={{ 
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                        >
                            <FaRobot size={28} className="group-hover:rotate-12 transition-transform" />
                        </motion.div>
                        <motion.span 
                            className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [1, 0.7, 1]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="w-[90vw] sm:w-[350px] max-w-[400px] h-[70vh] sm:h-[500px] max-h-[600px] bg-[#0A0D18]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-3xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-purple-900/20 to-blue-900/20 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                                    <FaRobot size={20} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">AlgoForce AI Buddy</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">RAG Optimized</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors p-2"
                            >
                                <FaTimes size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
                        >
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: msg.role === 'bot' ? -20 : 20, y: 10 }}
                                    animate={{ opacity: 1, x: 0, y: 0 }}
                                    transition={{ 
                                        duration: 0.4, 
                                        delay: idx * 0.1,
                                        type: "spring",
                                        stiffness: 200
                                    }}
                                    className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}
                                >
                                    <motion.div 
                                        className={`flex gap-2 max-w-[85%] ${msg.role === 'bot' ? 'flex-row' : 'flex-row-reverse'}`}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <motion.div 
                                            className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${msg.role === 'bot' ? 'bg-purple-600' : 'bg-white/10'}`}
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            {msg.role === 'bot' ? <FaRobot /> : <FaUserAlt />}
                                        </motion.div>
                                        <motion.div 
                                            className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${msg.role === 'bot'
                                                ? 'bg-white/5 border border-white/10 text-gray-200'
                                                : 'bg-purple-600 text-white'
                                                }`}
                                            initial={{ scale: 0.8 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.1 + idx * 0.1 }}
                                        >
                                            {msg.content}
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 p-3 rounded-2xl flex gap-1 items-center">
                                        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
                                        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white/5 border-t border-white/10">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask me anything..."
                                    className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
                                />
                                <button
                                    type="submit"
                                    className="p-2.5 bg-purple-600 rounded-xl text-white hover:bg-purple-700 transition-all disabled:opacity-50"
                                    disabled={!input.trim() || isTyping}
                                >
                                    <FaPaperPlane size={16} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Chatbot
