import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaPhoneAlt, FaEnvelope, FaTimes, FaHeadset, FaWhatsapp } from 'react-icons/fa'

const ConsultancyButton = () => {
    const [isOpen, setIsOpen] = useState(false)

    const contactDetails = {
        phone: "844947436",
        email: "af@algoforceaii.com"
    }

    return (
        <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-[9998]">
            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-6 py-4 bg-white/10 border border-white/20 backdrop-blur-2xl rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] group hover:bg-white/20 transition-all border-glow"
            >
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                    {isOpen ? <FaTimes size={14} /> : <FaHeadset size={14} />}
                </div>
                <span className="text-[13px] font-bold text-white tracking-tight uppercase hidden sm:block">Consultancy</span>
            </motion.button>

            {/* Menu Popup */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, x: -20 }}
                        animate={{ opacity: 1, scale: 1, y: -20, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20, x: -20 }}
                        className="absolute bottom-full left-0 mb-4 w-64 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 shadow-2xl overflow-hidden"
                    >
                        <div className="text-center mb-6">
                            <h4 className="text-white font-bold text-sm mb-1 tracking-tight">Expert Consultancy</h4>
                            <p className="text-[10px] text-gray-400 font-medium tracking-wide">Ready to accelerate your vision?</p>
                        </div>

                        <div className="space-y-3">
                            <motion.a
                                href={`https://wa.me/${contactDetails.phone.replace(/\+/g, '').replace(/\s+/g, '')}?text=${encodeURIComponent("Hello AlgoForce Team, I'm interested in your consultancy services. Can you guys help me out?")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 transition-all group/call"
                            >
                                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400 group-hover/call:bg-green-500 group-hover/call:text-white transition-all">
                                    <FaWhatsapp size={14} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">WhatsApp Us</p>
                                    <p className="text-xs text-white font-semibold">{contactDetails.phone}</p>
                                </div>
                            </motion.a>

                            <motion.a
                                href={`mailto:${contactDetails.email}`}
                                whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 transition-all group/mail"
                            >
                                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover/mail:bg-blue-500 group-hover/mail:text-white transition-all">
                                    <FaEnvelope size={14} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Email Us</p>
                                    <p className="text-xs text-white font-semibold">af@algoforceaii.com</p>
                                </div>
                            </motion.a>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5 text-center">
                            <p className="text-[9px] font-bold text-purple-400 uppercase tracking-[0.2em] animate-pulse">Available 24/7</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ConsultancyButton
