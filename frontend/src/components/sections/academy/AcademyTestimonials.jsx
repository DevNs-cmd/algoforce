import { motion } from 'framer-motion'
import { FaQuoteLeft, FaLinkedin } from 'react-icons/fa'

const AcademyTestimonials = () => {
    const testimonials = [
        {
            name: "Emily Watson",
            role: "AI Engineer @ Stealth",
            quote: "I built my first autonomous agent in just 2 weeks. The workflow-first teaching is a game changer.",
            result: "Raised Pre-seed $500k",
            avatar: "EW"
        },
        {
            name: "David Chen",
            role: "CS Senior @ Stanford",
            quote: "AlgoForce Academy bridged the gap between academic theory and actual production engineering.",
            result: "Landed Google AI Intern",
            avatar: "DC"
        },
        {
            name: "Sophia Martinez",
            role: "Founder, Zenith SaaS",
            quote: "The Startup MVP workshop saved me months of development. Launched in 8 days exactly.",
            result: "1.2k Beta Signups",
            avatar: "SM"
        }
    ]

    return (
        <section className="bg-black py-24 px-6 relative overflow-hidden">
             <div className="max-w-7xl mx-auto mb-16 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Voices of Builders.</h2>
                <p className="text-gray-400 font-medium tracking-tight">Real results from the next generation of engineers and founders.</p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((t, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.06)' }}
                        className="group relative p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl transition-all duration-500 hover:scale-[1.02] shadow-2xl"
                    >
                         <div className="flex items-center gap-6 mb-8 px-2">
                             <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center font-bold text-white shadow-xl">
                                {t.avatar}
                             </div>
                             <div>
                                <h4 className="text-lg font-bold transition-colors group-hover:text-purple-300 tracking-tight">{t.name}</h4>
                                <p className="text-xs text-gray-500 font-medium italic tracking-tight">{t.role}</p>
                             </div>
                             <FaLinkedin className="ml-auto text-gray-700 hover:text-blue-400 transition-colors pointer-events-auto cursor-pointer" />
                         </div>

                         <div className="mb-8 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                             <FaQuoteLeft className="text-purple-500/20 text-2xl mb-4" />
                             <p className="text-sm md:text-base text-gray-400 font-medium leading-relaxed italic tracking-tight">"{t.quote}"</p>
                         </div>

                         <div className="pt-6 border-t border-white/5 flex items-center justify-between px-2">
                             <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Outcome</span>
                             <span className="text-xs font-bold text-green-400 tracking-tight">{t.result}</span>
                         </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default AcademyTestimonials
