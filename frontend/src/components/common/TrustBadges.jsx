import { motion } from 'framer-motion'
import { FaShieldAlt, FaCode, FaCheckCircle, FaGraduationCap } from 'react-icons/fa'

const TrustBadges = () => {
    const badges = [
        { icon: FaShieldAlt, text: "MSME Registered", color: "text-emerald-500" },
        { icon: FaCode, text: "No Coding Required", color: "text-blue-500" },
        { icon: FaCheckCircle, text: "Beginner Friendly", color: "text-purple-500" },
        { icon: FaGraduationCap, text: "Industrial Certificate", color: "text-orange-500" }
    ];

    return (
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {badges.map((badge, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-xl group hover:bg-white/[0.08] transition-all"
                >
                    <badge.icon className={`text-[12px] ${badge.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors">{badge.text}</span>
                </motion.div>
            ))}
        </div>
    )
}

export default TrustBadges
