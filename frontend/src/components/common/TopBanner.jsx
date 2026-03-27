import { motion } from 'framer-motion'

const TopBanner = () => {
    return (
        <div className="fixed top-2 left-0 right-0 flex justify-center z-[110] pointer-events-none">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="pointer-events-auto inline-flex items-center gap-3 px-5 py-2 rounded-full bg-black/40 border border-white/5 backdrop-blur-3xl shadow-2xl"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_10px_#22c55e]" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
                    Govt Registered MSME
                </span>
            </motion.div>
        </div>
    )
}

export default TopBanner
