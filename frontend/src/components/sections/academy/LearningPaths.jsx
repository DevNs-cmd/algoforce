import { motion } from 'framer-motion'
import { FaCheckCircle, FaUserCheck, FaArrowRight } from 'react-icons/fa'

const LearningPaths = () => {
    const paths = [
        {
            title: "AI Engineer Path",
            steps: ["Python Fundamentals", "Machine Learning Basics", "LLM Fine-tuning", "AI Agent Development"],
            gradient: "from-purple-500 to-blue-500",
            progress: 75
        },
        {
            title: "Startup Founder Path",
            steps: ["Product Strategy", "No-code MVPs", "Technical Equity", "Venture Scaling"],
            gradient: "from-blue-500 to-green-500",
            progress: 45
        }
    ]

    return (
        <section className="bg-black py-24 px-6 relative overflow-hidden">
             <div className="max-w-7xl mx-auto mb-16 px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Learning Paths.</h2>
                <p className="text-gray-400 font-medium">Your structured journey from curious learner to master builder.</p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                {paths.map((path, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        className="group relative flex flex-col p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl overflow-hidden transition-all duration-500 hover:bg-white/[0.05]"
                    >
                         {/* Side gradient indicator */}
                         <div className={`absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b ${path.gradient} opacity-50`} />

                         <div className="flex items-center justify-between mb-12">
                            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{path.title}</h3>
                            <div className="relative w-12 h-12">
                                <svg className="w-12 h-12 transform -rotate-90">
                                    <circle
                                        cx="24"
                                        cy="24"
                                        r="20"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="transparent"
                                        className="text-white/10"
                                    />
                                    <circle
                                        cx="24"
                                        cy="24"
                                        r="20"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeDasharray="125.6"
                                        strokeDashoffset={125.6 - (125.6 * path.progress) / 100}
                                        fill="transparent"
                                        className="text-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-gray-500">
                                    {path.progress}%
                                </div>
                            </div>
                         </div>

                         <div className="space-y-6 relative ml-4">
                             {/* Vertical connection line */}
                             <div className="absolute top-4 bottom-4 left-3 w-px bg-white/10" />

                             {path.steps.map((step, sIdx) => (
                                <motion.div
                                    key={sIdx}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * sIdx }}
                                    className="flex items-center gap-6 group/step"
                                >
                                    <div className={`p-2 rounded-full border border-white/10 z-10 transition-colors group-hover/step:bg-purple-500/20 group-hover/step:border-purple-500/20 ${sIdx === 0 ? 'bg-purple-500 text-white border-purple-500' : 'bg-[#020205] text-gray-600'}`}>
                                        <FaCheckCircle className="text-[10px]" />
                                    </div>
                                    <span className={`text-sm md:text-base font-bold tracking-tight transition-colors group-hover/step:text-purple-300 ${sIdx === 0 ? 'text-white' : 'text-gray-500'}`}>
                                        {step}
                                    </span>
                                </motion.div>
                             ))}
                         </div>

                         <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-12 w-full px-8 py-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all hover:border-white/10"
                         >
                            Start Path <FaArrowRight className="text-purple-500" />
                         </motion.button>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default LearningPaths
