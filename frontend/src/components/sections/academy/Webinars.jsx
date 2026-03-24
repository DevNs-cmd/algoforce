import { motion } from 'framer-motion'
import { FaLaptopCode, FaBriefcase, FaUserGraduate } from 'react-icons/fa'

const Webinars = () => {
    const webinars = [
        { title: "How to Build AI Startup", icon: FaLaptopCode, color: "text-blue-400" },
        { title: "Crack Tech Internships", icon: FaBriefcase, color: "text-green-400" },
        { title: "Zero to SaaS Founder", icon: FaUserGraduate, color: "text-orange-400" }
    ]

    return (
        <section className="bg-black py-24 px-6">
            <div className="max-w-7xl mx-auto mb-16 px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Free Masterclasses.</h2>
                <p className="text-gray-400 font-medium tracking-tight">Access expert knowledge without any cost. Level up your journey today.</p>
            </div>

            <div className="flex overflow-x-auto no-scrollbar gap-5 px-6 md:gap-8 md:px-24">
                {webinars.map((webinar, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="flex-shrink-0 w-[260px] md:w-[320px] p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl hover:bg-white/[0.06] transition-all cursor-pointer group"
                    >
                        <div className="p-4 rounded-3xl bg-white/5 border border-white/5 w-fit mb-8 group-hover:bg-white/10 transition-colors">
                            <webinar.icon className={`text-3xl ${webinar.color} transition-colors`} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-8 transition-colors tracking-tight leading-tight">{webinar.title}</h3>
                        
                        <motion.button
                             whileHover={{ x: 5 }}
                             className="text-white flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-purple-400 transition-colors"
                        >
                            <span className="p-1 rounded bg-white/5 border border-white/5 group-hover:bg-purple-500/20 group-hover:border-purple-500/20">👉</span> Join Free
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Webinars
