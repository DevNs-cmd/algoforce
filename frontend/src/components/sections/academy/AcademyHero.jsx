import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import TrustBadges from '../../common/TrustBadges'

const AcademyHero = () => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);
    const y2 = useTransform(scrollY, [0, 500], [0, 100]);

    return (
        <section ref={containerRef} className="relative flex items-center justify-center min-h-[90vh] md:min-h-screen overflow-hidden bg-[#020205] text-white pt-20 md:pt-28 pb-12 md:pb-20 px-6">
            
            {/* iOS Dynamic Lighting */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 80, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-600/10 blur-[180px] rounded-full opacity-30 transform-gpu"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        x: [0, -100, 0],
                        y: [0, -60, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[900px] h-[900px] bg-blue-600/10 blur-[200px] rounded-full opacity-20 transform-gpu"
                />
            </div>

            <div className="relative z-20 mx-auto text-center max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Floating Decorative Elements - Optimized for No Overlap */}
                    <div className="hidden lg:block">
                        <motion.div
                            style={{ y: y1 }}
                            animate={{ rotateX: [10, -10, 10], rotateY: [-15, 15, -15] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-32 -left-20 w-72 h-44 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-3xl p-6 shadow-[0_50px_100px_rgba(0,0,0,0.5)] transform-gpu hover:bg-white/[0.06] transition-all"
                        >
                            <div className="h-1.5 w-12 bg-purple-500/40 rounded-full mb-4" />
                            <div className="space-y-3">
                                <div className="h-4 w-full bg-white/10 rounded-full" />
                                <div className="h-4 w-5/6 bg-white/10 rounded-full" />
                                <div className="h-4 w-2/3 bg-white/10 rounded-full" />
                            </div>
                        </motion.div>

                        <motion.div
                            style={{ y: y2 }}
                            animate={{ rotateX: [-10, 10, -10], rotateY: [15, -15, 15] }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-32 -right-20 w-80 h-48 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl p-8 shadow-[0_50px_100px_rgba(0,0,0,0.5)] transform-gpu hover:bg-white/[0.06] transition-all"
                        >
                            <div className="h-2 w-16 bg-blue-500/40 rounded-full mb-6" />
                            <div className="space-y-4">
                                <div className="h-5 w-full bg-white/10 rounded-full" />
                                <div className="h-5 w-3/4 bg-white/10 rounded-full" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-6 py-2 mb-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl shadow-xl"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,1)] animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">AlgoForce Labs</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1 
                        className="text-5xl md:text-8xl lg:text-9xl font-bold mb-10 leading-[1] tracking-tight"
                    >
                        <span className="block text-white mb-2">Build Real</span>
                        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-purple-400/50">
                            AI Systems.
                        </span>
                        <div className="text-3xl md:text-5xl lg:text-7xl text-gray-500 font-medium mt-6 tracking-normal">
                             Talent Engine & AI Products.
                        </div>
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="max-w-2xl mx-auto mb-12 md:mb-16 text-sm md:text-xl text-gray-400 font-medium leading-relaxed italic"
                    >
                        Labs is the talent engine behind AlgoForce. Students build real enterprise products, gain implementation experience, and become deployment-ready engineers.
                    </motion.p>

                    {/* Action CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link to="#courses">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-5 bg-white text-black rounded-full font-bold text-[15px] shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all"
                            >
                                Join a Cohort {'->'}
                            </motion.button>
                        </Link>
                        <Link to="/labs">
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 border border-white/10 rounded-full font-bold text-[15px] hover:border-white/30 backdrop-blur-xl transition-all"
                            >
                                View Labs Tracks
                            </motion.button>
                        </Link>
                    </div>

                    <div className="mt-20">
                        <TrustBadges />
                    </div>
                </motion.div>
            </div>

            {/* Subtle Grid Background */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </section>
    )
}

export default AcademyHero
