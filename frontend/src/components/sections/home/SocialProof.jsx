import { motion } from 'framer-motion'
import { FaGraduationCap, FaCode, FaCheckCircle, FaStar } from 'react-icons/fa'

const SocialProof = () => {
    const stats = [
        { label: "Students Trained", value: "500+", icon: FaGraduationCap, color: "text-purple-500" },
        { label: "Projects Built", value: "1,200+", icon: FaCode, iconColor: "text-blue-500" },
        { label: "Success Rate", value: "98%", icon: FaCheckCircle, color: "text-green-500" },
        { label: "India-wide Impact", value: "24+", icon: FaStar, color: "text-yellow-500" }
    ];

    return (
        <section className="py-24 border-y border-white/5 bg-[#080808]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-500 mb-6 font-bold">The Social Proof Engine</h2>
                    <h2 className="text-3xl md:text-5xl font-black mb-10 tracking-tighter uppercase italic leading-none">
                        Trusted by Students <br />
                        <span className="text-white">Across India.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 text-2xl group-hover:scale-110 transition-transform ${stat.color || stat.iconColor}`}>
                                <stat.icon />
                            </div>
                            <div className="text-4xl md:text-5xl font-black mb-4 tracking-tighter italic font-bold">{stat.value}</div>
                            <div className="text-[10px] uppercase font-black tracking-widest text-gray-400 group-hover:text-white transition-colors">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 flex flex-wrap justify-center gap-10 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                    <div className="text-xl font-bold italic tracking-tighter">BTech India</div>
                    <div className="text-xl font-bold italic tracking-tighter">BCA Connect</div>
                    <div className="text-xl font-bold italic tracking-tighter">Startup Hub</div>
                    <div className="text-xl font-bold italic tracking-tighter">Developer Hub</div>
                </div>
            </div>
        </section>
    )
}

export default SocialProof
