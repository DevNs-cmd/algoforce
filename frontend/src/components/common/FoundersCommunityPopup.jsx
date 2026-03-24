import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaUsers, FaTimes, FaWhatsapp } from 'react-icons/fa'

const FoundersCommunityPopup = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Reduced frequency logic - show if not seen recently (or for testing)
        const hasSeen = localStorage.getItem('hasSeenFoundersPopup')
        if (!hasSeen) {
            const timer = setTimeout(() => setIsVisible(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        localStorage.setItem('hasSeenFoundersPopup', 'true')
    }

    const whatsappLink = `https://wa.me/918448947436?text=${encodeURIComponent("Hi AlgoForce! I'm a founder and I'd love to join the Exclusive Founders Community. Please share the details.")}`

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-[300px] sm:max-w-[340px] p-[2px] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
                    >
                        {/* Animated RGB Gradient Border Background */}
                        <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,#ff0000,#ff8000,#ffff00,#00ff00,#00ffff,#0000ff,#8000ff,#ff00ff,#ff0000)]" />
                        
                        {/* Inner Content Container */}
                        <div className="relative z-10 bg-[#0a0a0f] backdrop-blur-3xl rounded-[2.45rem] sm:rounded-[2.95rem] overflow-hidden">
                            
                            {/* Control Icons */}
                            <button 
                                onClick={handleClose}
                                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all z-20 group/close"
                            >
                                <FaTimes size={12} className="group-hover/close:rotate-90 transition-transform duration-300" />
                            </button>

                            <div className="px-6 sm:px-8 py-10 sm:py-12 text-center">
                                {/* Elevated Icon Container */}
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring' }}
                                    className="inline-flex p-3 sm:p-4 rounded-[1.5rem] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 mb-6 sm:mb-8 text-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.2)]"
                                >
                                    <FaUsers size={24} className="sm:size-[28px]" />
                                </motion.div>

                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight tracking-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
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
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl font-bold text-sm transition-all shadow-[0_10px_30px_rgba(79,70,229,0.3)]"
                                    >
                                        <FaWhatsapp size={18} /> Request Invite
                                    </motion.a>
                                    
                                    <button 
                                        onClick={handleClose}
                                        className="text-[10px] sm:text-[11px] text-gray-500 font-bold uppercase tracking-[0.3em] hover:text-white transition-colors py-1 py-1"
                                    >
                                        Maybe Later
                                    </button>
                                </div>
                            </div>

                            {/* Subtle Inner Glow */}
                            <div className="absolute inset-0 pointer-events-none rounded-[2.45rem] sm:rounded-[2.95rem] border border-white/5" />
                        </div>
                    </motion.div>
                </div>
            )}

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </AnimatePresence>
    )
}

export default FoundersCommunityPopup;

