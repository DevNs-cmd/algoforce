import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaPhoneAlt, FaEnvelope, FaTimes, FaHeadset, FaWhatsapp } from 'react-icons/fa'

const ConsultancyButton = () => {
    const [isOpen, setIsOpen] = useState(false)

    const contactDetails = {
        phone: "8448947436",
        email: "af@algoforceaii.com"
    }

    return (
        <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-[9998]">
            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-5 py-3.5 bg-white/92 border border-[#062f4f]/10 backdrop-blur-2xl rounded-full shadow-[0_18px_45px_rgba(6,47,79,0.14)] group hover:bg-white transition-all"
            >
                <div className="w-8 h-8 rounded-full bg-[#06101d] flex items-center justify-center text-white">
                    {isOpen ? <FaTimes size={14} /> : <FaHeadset size={14} />}
                </div>
                <span className="text-[13px] font-bold text-[#06101d] uppercase hidden sm:block">AI Consult</span>
            </motion.button>

            {/* Menu Popup */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, x: -20 }}
                        animate={{ opacity: 1, scale: 1, y: -20, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20, x: -20 }}
                        className="absolute bottom-full left-0 mb-4 w-72 bg-white/95 backdrop-blur-2xl border border-[#062f4f]/10 rounded-[24px] p-6 shadow-[0_30px_80px_rgba(6,47,79,0.2)] overflow-hidden"
                    >
                        <div className="text-center mb-6">
                            <h4 className="text-[#06101d] font-bold text-sm mb-1">AlgoForce Consultation</h4>
                            <p className="text-[11px] text-slate-500 font-medium">Talk to us about systems, automation, or Labs.</p>
                        </div>

                        <div className="space-y-3">
                            <motion.a
                                href={`https://wa.me/91${contactDetails.phone.replace(/\+/g, '').replace(/\s+/g, '')}?text=${encodeURIComponent("Hello AlgoForce Team, I'm interested in your consultancy services. Can you guys help me out?")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ x: 3, backgroundColor: 'rgba(6,47,79,0.04)' }}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-[#f7f8fb] border border-[#062f4f]/8 transition-all group/call"
                            >
                                <div className="w-10 h-10 rounded-xl bg-[#062f4f]/10 flex items-center justify-center text-[#062f4f] group-hover/call:bg-[#062f4f] group-hover/call:text-white transition-all">
                                    <FaWhatsapp size={14} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-0.5">WhatsApp</p>
                                    <p className="text-xs text-[#06101d] font-semibold">{contactDetails.phone}</p>
                                </div>
                            </motion.a>

                            <motion.a
                                href={`mailto:${contactDetails.email}`}
                                whileHover={{ x: 3, backgroundColor: 'rgba(143,56,255,0.05)' }}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-[#f7f8fb] border border-[#062f4f]/8 transition-all group/mail"
                            >
                                <div className="w-10 h-10 rounded-xl bg-[#8f38ff]/10 flex items-center justify-center text-[#8f38ff] group-hover/mail:bg-[#8f38ff] group-hover/mail:text-white transition-all">
                                    <FaEnvelope size={14} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-0.5">Email</p>
                                    <p className="text-xs text-[#06101d] font-semibold">af@algoforceaii.com</p>
                                </div>
                            </motion.a>
                        </div>

                        <div className="mt-6 pt-4 border-t border-[#062f4f]/10 text-center">
                            <p className="text-[10px] font-bold text-[#8f38ff] uppercase">Priority response</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ConsultancyButton
