import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaTimes, FaWhatsapp } from 'react-icons/fa'

// Pure CSS snake — uses offset-path animation, zero JS per frame
const CSSSnake = ({ delay = 0, color = '#10b981', size = 10, opacity = 0.9 }) => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[3rem]" style={{ zIndex: 100 }}>
        <div
            style={{
                position: 'absolute',
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor: color,
                boxShadow: `0 0 ${size * 1.5}px ${color}`,
                opacity,
                offsetPath: `path("M 30 30 Q 310 30 310 200 Q 310 420 30 420 Q 30 200 30 30")`,
                animation: `snake-path 7s linear ${delay}s infinite`,
                willChange: 'offset-distance'
            }}
        />
    </div>
)

const FoundersCommunityPopup = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 1000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isVisible]);

    const handleClose = () => setIsVisible(false)

    const whatsappLink = `https://wa.me/918448947436?text=${encodeURIComponent("Hi AlgoForce! I'm a founder and I'd love to join the Exclusive Founders Community. Please share the details.")}`

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/85">
                    
                    {/* SONAR RINGS — pure CSS, expand outward from popup center */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="absolute w-[340px] h-[460px] rounded-[3rem] border border-emerald-500/20 sonar-ring" style={{ animationDelay: '0s' }} />
                        <div className="absolute w-[340px] h-[460px] rounded-[3rem] border border-cyan-400/15 sonar-ring" style={{ animationDelay: '1.6s' }} />
                        <div className="absolute w-[340px] h-[460px] rounded-[3rem] border border-purple-500/10 sonar-ring" style={{ animationDelay: '3.2s' }} />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="relative w-full max-w-[320px] sm:max-w-[360px]"
                    >
                        {/* CSS Snake Trails */}
                        <CSSSnake delay={0} color="#10b981" size={10} opacity={0.85} />
                        <CSSSnake delay={3.5} color="#06b6d4" size={7} opacity={0.55} />

                        {/* MOVING GRADIENT BORDER */}
                        <div className="absolute inset-[-1.5px] rounded-[2.6rem] sm:rounded-[3.1rem] overflow-hidden p-[1.5px]">
                            <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%] opacity-35 border-spin"
                                style={{ background: 'conic-gradient(from 0deg, transparent, #10b981, transparent, #06b6d4, transparent, #8b5cf6, transparent)' }}
                            />
                        </div>

                        {/* MAIN CONTENT — no backdrop-blur for performance */}
                        <div className="relative z-10 bg-[#0d1117] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">

                            <button
                                onClick={handleClose}
                                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/5 flex items-center justify-center text-white/30 hover:text-white transition-colors z-20"
                            >
                                <FaTimes size={12} />
                            </button>

                            <div className="px-8 sm:px-10 py-12 sm:py-14 text-center">
                                <div className="inline-grid grid-cols-3 gap-1.5 p-3 rounded-2xl bg-white/[0.04] border border-white/5 mb-8">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                                        <div
                                            key={i}
                                            className={`w-3.5 h-3.5 rounded-sm ${i === 2 || i === 5 || i === 8 ? 'bg-emerald-500' : 'bg-emerald-900/40'}`}
                                            style={i === 2 || i === 5 || i === 8 ? { boxShadow: '0 0 8px rgba(16,185,129,0.45)' } : {}}
                                        />
                                    ))}
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tighter">
                                    Founders <span className="text-emerald-500">Network</span>
                                </h3>

                                <p className="text-gray-400 text-sm sm:text-[15px] mb-10 leading-relaxed font-semibold px-2 opacity-80">
                                    Join the elite circle of builders engineering the next era.
                                </p>

                                <div className="space-y-6">
                                    <motion.a
                                        href={whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={handleClose}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="relative flex items-center justify-center gap-3 w-full py-4 px-8 bg-[#1c1c1e] text-white rounded-2xl font-black text-base sm:text-lg border border-white/20 shadow-xl overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <FaWhatsapp size={22} className="text-emerald-400 relative z-10" />
                                        <span className="relative z-10">Request Invite</span>
                                    </motion.a>

                                    <button
                                        onClick={handleClose}
                                        className="text-[11px] sm:text-[12px] text-gray-500 font-bold uppercase tracking-[0.6em] hover:text-white transition-colors"
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
                @keyframes border-spin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to   { transform: translate(-50%, -50%) rotate(360deg); }
                }
                .border-spin { animation: border-spin 12s linear infinite; }

                @keyframes snake-path {
                    0%   { offset-distance: 0%; }
                    100% { offset-distance: 100%; }
                }

                @keyframes sonar-expand {
                    0%   { transform: scale(1);   opacity: 0.55; }
                    100% { transform: scale(1.9); opacity: 0;    }
                }
                .sonar-ring {
                    animation: sonar-expand 5s ease-out infinite;
                }
            `}</style>
        </AnimatePresence>
    )
}

export default FoundersCommunityPopup
