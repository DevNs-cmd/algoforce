import { motion } from 'framer-motion'
import { FaRobot, FaLayerGroup, FaRocket, FaGlobe, FaDatabase, FaServer } from 'react-icons/fa'

const CourseCategories = () => {
    const categories = [
        { icon: FaRobot, title: "AI & Machine Learning", desc: "Build generative AI, LLMs & agents." },
        { icon: FaLayerGroup, title: "Full Stack Development", desc: "Modern stack for robust engineering." },
        { icon: FaRocket, title: "Startup & Product Building", desc: "From idea to market validation." },
        { icon: FaGlobe, title: "Web3 & Blockchain", desc: "Decentralized future engineering." },
        { icon: FaDatabase, title: "Data Science", desc: "Extract insights from raw data." },
        { icon: FaServer, title: "DevOps & Cloud", desc: "Deploy & scale infrastructure." }
    ]

    return (
        <section className="bg-black py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto mb-16 px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Choose Your Track.</h2>
                <p className="text-gray-400 font-medium">Focused learning paths to accelerate your career.</p>
            </div>

            <div className="flex overflow-x-auto no-scrollbar gap-5 px-6 md:gap-8 md:px-24">
                {categories.map((cat, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="flex-shrink-0 w-[240px] md:w-[280px] p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-2xl hover:bg-white/[0.06] transition-all cursor-pointer group"
                    >
                        <div className="p-4 rounded-3xl bg-white/5 border border-white/5 w-fit mb-6 group-hover:bg-purple-500/10 transition-colors">
                            <cat.icon className="text-2xl text-purple-400 group-hover:text-purple-300 transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">{cat.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed font-medium">{cat.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default CourseCategories
