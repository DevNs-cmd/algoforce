import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaGraduationCap, FaDiscord } from 'react-icons/fa'

const AcademyFinalCTA = () => {
    return (
        <section className="bg-black py-32 px-6 relative overflow-hidden">
             {/* Large background gradient */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-500/5 blur-[200px] rounded-full pointer-events-none" />

             <div className="max-w-7xl mx-auto rounded-[4rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5 backdrop-blur-3xl overflow-hidden p-16 md:p-32 text-center relative shadow-2xl">
                 <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                 >
                    <h2 className="text-4xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight">
                        Start <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-blue-500">Building</span>.<br />
                        <span className="text-gray-400">Stop Just Watching Tutorials.</span>
                    </h2>

                    <p className="max-w-2xl mx-auto mb-16 text-sm md:text-lg text-gray-500 font-medium leading-relaxed tracking-tight italic">
                        The era of passive learning is over. Join 5,000+ builders worldwide who are engineering the future of AI.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        <Link to="#courses">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-5 bg-white text-black rounded-full font-bold text-sm shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all flex items-center gap-4"
                            >
                                <FaGraduationCap className="text-lg" /> Browse Courses
                            </motion.button>
                        </Link>
                        <Link to="#community">
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-5 border border-white/10 rounded-full font-bold text-sm text-white hover:border-white/30 backdrop-blur-xl transition-all flex items-center gap-4"
                            >
                                <FaDiscord className="text-lg text-[#5865F2]" /> Join Community
                            </motion.button>
                        </Link>
                    </div>

                    {/* Branding accent */}
                    <div className="mt-16 text-[10px] uppercase font-bold text-gray-700 tracking-[0.5em] group cursor-default">
                        Engineered by <span className="group-hover:text-purple-500 transition-colors">AlgoForce Labs</span>
                    </div>
                 </motion.div>
             </div>
        </section>
    )
}

export default AcademyFinalCTA
