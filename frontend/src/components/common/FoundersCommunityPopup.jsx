import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { FaUsers, FaTimes, FaWhatsapp } from 'react-icons/fa'
import gsap from 'gsap'

const RealisticSnake = () => {
    const containerRef = useRef(null)
    const segmentRefs = useRef([])
    const headRef = useRef({ x: 12, y: 12, angle: 0 })
    const requestRef = useRef()

    const SEGMENT_COUNT = 40
    const SEGMENT_GAP = 4
    
    useEffect(() => {
        const segments = Array.from({ length: SEGMENT_COUNT }, () => ({ x: 12, y: 12 }))
        const head = headRef.current
        
        // Roaming Logic using GSAP - Restricted to Perimeter
        let currentTargetIndex = 0;
        let direction = 1;

        const roam = () => {
            if (!containerRef.current) return
            const bounds = containerRef.current.getBoundingClientRect()
            const w = bounds.width;
            const h = bounds.height;
            const m = 18; // margin from edge
            
            const corners = [
                { x: m, y: m },
                { x: w - m, y: m },
                { x: w - m, y: h - m },
                { x: m, y: h - m }
            ]

            currentTargetIndex = (currentTargetIndex + direction + 4) % 4;
            const target = corners[currentTargetIndex];

            // Chance to reverse direction at a corner
            if (Math.random() > 0.7) direction *= -1;

            const dx = target.x - head.x;
            const dy = target.y - head.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            const speed = 90; // pixels per second
            
            gsap.to(head, {
                x: target.x,
                y: target.y,
                duration: Math.max(0.5, dist / speed),
                ease: "power1.inOut",
                onComplete: roam
            })
        }
        roam()

        // Slithering Animation Loop
        const animate = (time) => {
            const wiggle = Math.sin(time * 0.008) * 10

            // Segment 0 is the head
            segments[0].x = head.x + wiggle
            segments[0].y = head.y + wiggle

            // Update head DOM element
            const headEl = segmentRefs.current[0]
            if (headEl) {
                headEl.style.transform = `translate3d(${segments[0].x}px, ${segments[0].y}px, 0)`
            }

            for (let i = 1; i < SEGMENT_COUNT; i++) {
                const prev = segments[i - 1]
                const curr = segments[i]
                
                const dx = prev.x - curr.x
                const dy = prev.y - curr.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                const angle = Math.atan2(dy, dx)
                
                if (distance > SEGMENT_GAP) {
                    curr.x = prev.x - Math.cos(angle) * SEGMENT_GAP
                    curr.y = prev.y - Math.sin(angle) * SEGMENT_GAP
                }
                
                const el = segmentRefs.current[i]
                if (el) {
                    el.style.transform = `translate3d(${curr.x}px, ${curr.y}px, 0) scale(${1 - (i / SEGMENT_COUNT) * 0.6})`
                }
            }

            requestRef.current = requestAnimationFrame(animate)
        }
        requestRef.current = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(requestRef.current)
            gsap.killTweensOf(head)
        }
    }, [])

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none z-[100]">
            {[...Array(SEGMENT_COUNT)].map((_, i) => (
                <div 
                    key={i}
                    ref={el => segmentRefs.current[i] = el}
                    className="absolute w-2.5 h-2.5 rounded-full"
                    style={{
                        backgroundColor: i === 0 ? '#10b981' : (i % 2 === 0 ? '#064e3b' : '#059669'),
                        boxShadow: i === 0 ? '0 0 15px #10b981' : 'none',
                        zIndex: SEGMENT_COUNT - i,
                        willChange: 'transform'
                    }}
                />
            ))}
        </div>
    )
}

const FoundersCommunityPopup = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 800)
        return () => clearTimeout(timer)
    }, [])

    const handleClose = () => setIsVisible(false)

    const whatsappLink = `https://wa.me/918448947436?text=${encodeURIComponent("Hi AlgoForce! I'm a founder and I'd love to join the Exclusive Founders Community. Please share the details.")}`

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-[4px]">
                    {/* SONAR/RIPPLE EXPANDING GRADIENT - LIVES OUTSIDE SO IT CAN OVERFLOW */}
                    <div className="absolute pointer-events-none flex items-center justify-center">
                        {[0, 1, 2].map((i) => (
                            <motion.div 
                                key={i}
                                animate={{ 
                                    scale: [1, 5],
                                    opacity: [0.5, 0]
                                }}
                                transition={{ 
                                    duration: 5, 
                                    repeat: Infinity, 
                                    ease: "easeOut",
                                    delay: i * 1.6
                                }}
                                className="absolute w-48 h-48 rounded-full border-2 border-emerald-400/30 blur-[2px]"
                            />
                        ))}
                        <div className="absolute w-[500px] h-[500px] bg-emerald-500/10 blur-[100px] rounded-full animate-pulse" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="relative w-full max-w-[320px] sm:max-w-[360px]"
                    >
                        {/* ROAMING SNAKE - BOUNDED TO POPUP EDGES */}
                        <div className="absolute inset-0 z-[100] pointer-events-none rounded-[3rem] overflow-hidden">
                            <RealisticSnake />
                        </div>

                        {/* MOVING GRADIENT BOUNDARY */}
                        <div className="absolute inset-[-1.5px] rounded-[2.6rem] sm:rounded-[3.1rem] overflow-hidden p-[1.5px] bg-white/[0.05]">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%] opacity-40 mix-blend-screen animate-[spin_12s_linear_infinite]"
                                 style={{ 
                                     background: 'conic-gradient(from 0deg, transparent, #10b981, transparent, #06b6d4, transparent, #8b5cf6, transparent)'
                                 }} 
                            />
                        </div>
                        
                        {/* MAIN CONTENT */}
                        <div className="relative z-10 bg-[#0d1117]/95 backdrop-blur-3xl rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl">
                            
                            <button 
                                onClick={handleClose}
                                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/5 flex items-center justify-center text-white/30 hover:text-white transition-all z-20 group/close"
                            >
                                <FaTimes size={12} className="group-hover/close:rotate-90 transition-transform duration-500" />
                            </button>

                            <div className="px-8 sm:px-10 py-12 sm:py-14 text-center">
                                <motion.div 
                                    className="inline-grid grid-cols-3 gap-1.5 p-3 rounded-2xl bg-white/[0.04] border border-white/5 mb-8"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                                        <div key={i} className={`w-3.5 h-3.5 rounded-sm ${i === 5 || i === 2 || i === 8 ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-emerald-900/40'}`} />
                                    ))}
                                </motion.div>

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
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.96 }}
                                        className="relative group/ios-btn flex items-center justify-center gap-3 w-full py-4.5 px-8 bg-[#1c1c1e] text-white rounded-2xl font-black text-base sm:text-lg transition-all border border-white/20 overflow-hidden shadow-2xl active:bg-[#2c2c2e]"
                                    >
                                        <div className="relative z-10 flex items-center gap-3">
                                            <FaWhatsapp size={22} className="text-emerald-400" />
                                            <span>Request Invite</span>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
                @keyframes spin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                @keyframes pulse-glow {
                    0%, 100% { transform: scale(1); opacity: 0.4; }
                    50% { transform: scale(1.15); opacity: 0.6; }
                }
            `}</style>
        </AnimatePresence>
    )
}

export default FoundersCommunityPopup;


