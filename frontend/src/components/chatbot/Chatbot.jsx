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
        if (matches(['buy', 'start', 'hire', 'use', 'work with', 'purchase', 'get starte', 'enquire'])) {
            return `Execute with AlgoForce:\n\n` +
                ALGOFORCE_KNOWLEDGE.purchaseSteps.join("\n") +
                ` \n\nReady? [Pay Directly](https://rzp.io/l/algoforce-payment) or [Contact Support](/contact)`;
        }

        // 1b. NEXUS / AI BUILDER
        if (matches(['nexus', 'vibe', 'builder', 'ai builder', 'code', 'generate'])) {
            return `Nexus AI Builder:\nOur proprietary "vibe coding" engine. Build SaaS, UIs, and backend APIs purely through natural language. Instantly deployable and fully customizable.`;
        }

        // 1c. LABS / EDUCATION
        if (matches(['labs', 'learn', 'course', 'apprenticeship', 'study', 'education'])) {
            return `AlgoForce Labs:\nWe share our internal execution secrets. Join high-end masterclasses on AI Automation and RAG architecture, or enter our apprenticeship program.`;
        }

        // 1d. ALGOFORCE GENERAL
        if (matches(['algoforce', 'what do you', 'what is', 'services', 'offer'])) {
            return `AlgoForce consists of:\n\n` + ALGOFORCE_KNOWLEDGE.products.join("\n\n") + `\n\nHow can we help?`;
        }

        // 2. Philosophy & Founder
        if (matches(['philosophy', 'vision', 'why', 'founder', 'suman', 'dev', 'who made'])) {
            return `AlgoForce OS:\n- Founded by Dev N Suman\n- Focus: "Revenue Infrastructure"\n- Pure iOS liquid aesthetics\n- 10x Deployment Speed.`;
        }

        // 3. Packages & Pricing
        if (matches(['price', 'pricing', 'cost', 'how much', 'package', 'pack', 'plan'])) {
            return `Service Packs:\n- **Startup**: $29\n- **Business**: $69\n- **Scale**: $99\n- **SaaS MVP**: $99 max\n\nWhich stage? [Full Pricing](/pricing)`;
        }

        // 4. RAG/LLM Specialization
        if (matches(['rag', 'llm', 'chatbot', 'bot', 'train', 'gpt', 'intelligent', 'ai agent'])) {
            return `Our RAG Tech:\n- Custom LLM Ingestion\n- 24/7 Support/Sales\n- Web & WhatsApp\n- Starts at $49`;
        }

        // 8. Contact / Audit
        if (matches(['contact', 'call', 'audit', 'talk', 'meeting', 'phone', 'email', 'connect'])) {
            return `Next Move:\n1. Open [Contact](/contact)\n2. Request "Free AI Audit"\n3. We scan your leaks in 24h.`;
        }

        // 9. Personality/Default
        if (matches(['hello', 'hi', 'hey', 'greetings', 'sup'])) {
            return `Greetings. How can I accelerate your vision today?\n- **Ask about Nexus**\n- **Ask about Labs**\n- **Ask about Pricing**`;
        }

        return `I specialize in AlgoForce OS:\n- Nexus (AI Vibe Coding)\n- Labs (Education)\n- Studio (Agency Builds)\n\nWhat are you looking to build?`;
    }

    return (
        <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 sm:right-6 z-[100000] pointer-events-none">
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="pointer-events-auto w-14 h-14 sm:w-16 sm:h-16 bg-[#06101d] border border-white/15 rounded-full shadow-[0_18px_45px_rgba(6,16,29,0.32)] flex items-center justify-center text-white hover:bg-[#0b1d31] transition-all group relative"
                    >
                        <FaRobot size={25} className="text-[#b783ff]" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8f38ff] rounded-full border-2 border-[#03070d]" />
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
                        className="pointer-events-auto w-[calc(100vw-2rem)] sm:w-[380px] h-[min(75dvh,620px)] sm:h-[550px] max-h-[calc(100dvh-2rem)] bg-[#03070d]/94 backdrop-blur-2xl border border-white/12 rounded-[28px] shadow-[0_35px_90px_rgba(0,0,0,0.48)] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-5 border-b border-white/5 bg-transparent flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/6 border border-white/12 rounded-2xl flex items-center justify-center">
                                    <FaRobot size={23} className="text-[#b783ff]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-[15px]">AlgoForce AI</h3>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className="w-2 h-2 bg-[#8f38ff] rounded-full" />
                                        <span className="text-[11px] text-slate-400 font-semibold uppercase">Online</span>
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
                                        whileHover={{ scale: 1.01 }}
                                    >
                                        <motion.div
                                            className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${msg.role === 'bot' ? 'bg-[#8f38ff]' : 'bg-white/10'}`}
                                        >
                                            {msg.role === 'bot' ? <FaRobot /> : <FaUserAlt />}
                                        </motion.div>
                                        <motion.div
                                            className={`p-4 rounded-2xl text-[14px] leading-relaxed whitespace-pre-line font-medium ${msg.role === 'bot'
                                                ? 'bg-white/5 border border-white/10 text-gray-200'
                                                : 'bg-white text-black'
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
                                    placeholder="Type your message..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-[14px] font-medium focus:outline-none focus:bg-white/10 focus:border-[#8f38ff]/60 text-white placeholder-gray-500 transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="p-2.5 bg-[#8f38ff] rounded-xl text-white hover:bg-[#7f2bec] transition-all disabled:opacity-50"
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
