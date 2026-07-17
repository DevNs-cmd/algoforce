import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { FaGraduationCap, FaCode, FaFlask, FaUsers, FaArrowRight } from 'react-icons/fa'

const INSTITUTIONS = [
  { name: 'Amity University', abbr: 'AMITY' },
  { name: 'NIT Delhi', abbr: 'NITD' },
  { name: 'DTU', abbr: 'DTU' },
  { name: 'NSUT', abbr: 'NSUT' },
  { name: 'IIIT Delhi', abbr: 'IIITD' },
  { name: 'IIT Communities', abbr: 'IIT' },
]

const COLLABORATION_TYPES = [
  { icon: <FaGraduationCap />, label: 'Internship programs' },
  { icon: <FaFlask />, label: 'Research initiatives' },
  { icon: <FaCode />, label: 'Engineering workshops' },
  { icon: <FaUsers />, label: 'Hackathons' },
  { icon: <FaGraduationCap />, label: 'Student innovation programs' },
  { icon: <FaCode />, label: 'Product development' },
]

const EcosystemSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} id="ecosystem" className="py-16 md:py-24 bg-[#03070d] text-white relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 subtle-ai-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-400">Academic & Innovation Partners</span>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mt-2 tracking-tight">
            Academic & Innovation Partners
          </h2>
          <p className="text-slate-400 text-sm mt-4 font-normal leading-relaxed max-w-2xl mx-auto">
            AlgoForce collaborates with universities and engineering communities across India for internships, product engineering, hackathons, research and workforce development.
          </p>
        </motion.div>

        {/* Institution Logo Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12 max-w-5xl mx-auto"
        >
          {INSTITUTIONS.map((inst) => (
            <div
              key={inst.name}
              className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border border-white/5 bg-white/[0.02] h-20 hover:border-white/10 hover:bg-white/[0.04] transition-all group"
            >
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">{inst.abbr}</span>
              <span className="text-[8px] text-slate-700 group-hover:text-slate-500 transition-colors font-semibold text-center leading-tight">{inst.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Collaboration Types */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {COLLABORATION_TYPES.map((type) => (
            <div key={type.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 text-xs font-bold text-slate-400">
              <span className="text-purple-400">{type.icon}</span>
              {type.label}
            </div>
          ))}
        </motion.div>

        {/* Footer note + CTA */}
        <div className="text-center space-y-4">
          <p className="text-[11px] text-slate-600 font-semibold uppercase tracking-widest">
            And engineering colleges across India
          </p>
          <Link to="/labs" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#cdb4ff] hover:text-white transition-colors group">
            Explore AlgoForce Labs <FaArrowRight size={10} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  )
}

export default EcosystemSection
