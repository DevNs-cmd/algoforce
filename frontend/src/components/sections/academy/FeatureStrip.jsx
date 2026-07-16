import { motion } from 'framer-motion'

const FeatureStrip = () => {
    const features = [
        "Academic Partners",
        "Real Product Builds",
        "Enterprise Database Sync",
        "Deployment Credentials",
        "Startup Operating OS"
    ]

    return (
        <section className="bg-black py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {features.map((feature, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -5, scale: 1.02, backgroundColor: 'rgba(255,255,255,0.06)' }}
                        className="px-6 py-8 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl flex items-center justify-center text-center transition-all duration-300"
                    >
                        <span className="text-xs md:text-sm font-bold text-gray-400 tracking-wide">{feature}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default FeatureStrip
