import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaUsers, FaTimes, FaWhatsapp, FaArrowRight } from 'react-icons/fa'

const FoundersCommunityPopup = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Instant show for testing
        setIsVisible(true)
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        localStorage.setItem('hasSeenFoundersPopup', 'true')
    }

    const whatsappLink = `https://wa.me/918448947436?text=${encodeURIComponent("Hi AlgoForce! I'm a founder and I'd love to join the Exclusive Founders Community. Please share the details.")}`

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 15 }}
                        transition={{ 
                            type: 'spring', 
                            stiffness: 300, 
                            damping: 25 
                        }}
                        className="relative w-full max-w-[300px] sm:max-w-[340px] overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] bg-black/20 p-[1px] shadow-[0_50px_120px_rgba(0,0,0,0.9)]"
                    >
                        {/* Professional Moving Gradient Boundary (Premium Tones) */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent,#6366f1,transparent,#a855f7,transparent,#6366f1)] animate-spin-slow opacity-40 blur-3xl" />
                        </div>
                        
                        {/* Glassmorphic Container (iOS Architecture) */}
                        <div className="relative z-10 bg-[#0a0a0f]/60 backdrop-blur-3xl rounded-[2.4rem] sm:rounded-[2.9rem] overflow-hidden border border-white/5">
                            
                            {/* Control Icons */}
                            <button 
                                onClick={handleClose}
                                className="absolute top-5 right-5 w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all z-20"
                            >
                                <FaTimes size={10} />
                            </button>

                            <div className="px-6 sm:px-8 py-10 sm:py-12 text-center">
                                {/* Elevated Icon Container */}
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring' }}
                                    className="inline-flex p-3 sm:p-4 rounded-[1.5rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 mb-6 sm:mb-8 text-indigo-400 shadow-xl"
                                >
                                    <FaUsers size={22} className="sm:size-[26px]" />
                                </motion.div>

                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight tracking-tight">
                                    Founders <br /> Community
                                </h3>

                                <p className="text-gray-400 text-[13px] sm:text-sm mb-8 leading-relaxed font-medium px-2">
                                    Exclusive access for innovators engineering the future of AI.
                                </p>

                                <div className="space-y-4 pt-2">
                                    <motion.a 
                                        href={whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={handleClose}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center justify-center gap-3 w-full py-3.5 px-6 bg-white text-black rounded-2xl font-bold text-sm transition-all shadow-xl active:scale-95 duration-300"
                                    >
                                        <FaWhatsapp size={16} /> Request Invite
                                    </motion.a>
                                    
                                    <button 
                                        onClick={handleClose}
                                        className="text-[10px] sm:text-[11px] text-gray-600 font-bold uppercase tracking-[0.2em] hover:text-white transition-colors py-1"
                                    >
                                        Maybe Later
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            <style>{`
                @keyframes spin-slow {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 15s linear infinite;
                }
            `}</style>
        </AnimatePresence>
    )
}

export default FoundersCommunityPopup;
