import { motion } from 'framer-motion'
import { FaCalendarAlt, FaUserTie, FaUsers } from 'react-icons/fa'

const LiveWorkshops = () => {
    const workshops = [
        {
            title: "Advanced Generative AI Architectures",
            instructor: "Dev N Suman",
            date: "April 15, 2026",
            time: "10:00 AM EST",
            seatsLeft: 12,
            type: "Masterclass"
        },
        {
             title: "Full Stack AI SaaS Sprint",
             instructor: "Marcus Kael",
             date: "April 22, 2026",
             time: "02:00 PM EST",
             seatsLeft: 8,
             type: "Hands-on Cohort"
        }
    ]

    return (
        <section id="workshops" className="bg-black py-24 px-6 relative overflow-hidden">
             {/* Glowing light effect */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

             <div className="max-w-7xl mx-auto mb-16 px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Live Workshops & Cohorts.</h2>
                <p className="text-gray-400 font-medium">Join real-time sessions and build alongside industry experts.</p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {workshops.map((workshop, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.01 }}
                        className="group relative flex flex-col p-4 md:p-8 rounded-[2rem] md:rounded-[3rem] bg-white/[0.04] border border-white/10 backdrop-blur-3xl hover:border-purple-500/30 transition-all duration-500 shadow-2xl"
                    >
                        {/* Glow indicator like iOS notification line */}
                        <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-1 md:w-1.5 h-1/3 md:h-1/2 bg-gradient-to-b from-purple-500 to-transparent rounded-full opacity-60" />

                        <div className="relative z-10 pl-2 md:pl-4">
                             <div className="flex items-center gap-3 mb-4">
                                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-[9px] font-bold uppercase tracking-widest">{workshop.type}</span>
                                {workshop.seatsLeft < 10 && (
                                    <span className="text-red-400 text-[9px] font-bold uppercase tracking-widest animate-pulse">Only {workshop.seatsLeft} Seats Left!</span>
                                )}
                             </div>

                             <h3 className="text-2xl md:text-3xl font-bold mb-8 group-hover:text-purple-300 transition-colors leading-tight">{workshop.title}</h3>

                             <div className="grid grid-cols-2 gap-6 mb-12">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                                        <FaCalendarAlt className="text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-500 mb-1 tracking-widest">Date & Time</p>
                                        <p className="text-xs text-white/80">{workshop.date} at {workshop.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                                        <FaUserTie className="text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-500 mb-1 tracking-widest">Instructor</p>
                                        <p className="text-xs text-white/80">{workshop.instructor}</p>
                                    </div>
                                </div>
                             </div>

                             <div className="flex flex-col sm:flex-row items-center gap-6 pt-8 border-t border-white/5">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full sm:w-auto px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-bold text-sm shadow-[0_20px_40px_rgba(168,85,247,0.2)] transition-all"
                                >
                                    Reserve Spot
                                </motion.button>
                                <p className="text-xs text-gray-500 font-medium italic">Full refund available up to 48h before the event.</p>
                             </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default LiveWorkshops
