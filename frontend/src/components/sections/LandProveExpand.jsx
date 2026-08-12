import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight, ShieldCheck, Layers, TrendingUp, RefreshCw } from 'lucide-react'

const PHASES = [
  {
    step: '01',
    title: 'Land on a Single Workflow',
    subtitle: 'Start where the friction is highest',
    icon: CheckCircle2,
    description: 'We identify one high-volume, exception-heavy operational workflow — such as accounts reconciliation, invoice matching, or lead qualification — and implement focused automation around your existing software.',
    highlights: ['Single workflow focus', 'Minimal disruption', 'No software replacement']
  },
  {
    step: '02',
    title: 'Prove Measurable Value',
    subtitle: 'Validate performance before expanding',
    icon: ShieldCheck,
    description: 'We run a focused pilot to validate accuracy, operational throughput, and team adoption against clear success criteria before recommending broader rollout.',
    highlights: ['Validated accuracy', 'Measured time savings', 'Team adoption proof']
  },
  {
    step: '03',
    title: 'Operate & Maintain',
    subtitle: 'Managed AI operations post go-live',
    icon: RefreshCw,
    description: 'AlgoForce maintains, monitors, and improves the deployed automation — handling model updates, exception edge-cases, and ongoing system support under a predictable service model.',
    highlights: ['Proactive updates', 'Exception monitoring', 'Dedicated support']
  },
  {
    step: '04',
    title: 'Expand to Adjacent Workflows',
    subtitle: 'Scale enterprise capability across teams',
    icon: TrendingUp,
    description: 'Once the initial workflow is proven, AlgoForce extends intelligent automation to adjacent business functions — carrying over integrations, data models, and operational learnings.',
    highlights: ['Shared data layer', 'Cross-team adoption', 'Compounding efficiency']
  }
]

const LandProveExpand = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white text-slate-900 border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-slate-700 bg-slate-100 border border-slate-200/80 px-4 py-1.5 rounded-full mb-4 shadow-sm">
            Enterprise Engagement Model
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            Start with one workflow.{' '}
            <span className="premium-serif italic font-normal text-purple-700">Expand as value is proven.</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
            You don't need to transform your entire enterprise on day one. We prove practical value in a single operational area before extending automation across adjacent teams and systems.
          </p>
        </motion.div>

        {/* Phase Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-14">
          {PHASES.map((phase, idx) => {
            const IconComp = phase.icon
            return (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="relative rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 flex flex-col justify-between hover:bg-white hover:border-slate-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase text-purple-700 tracking-widest bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
                      Phase {phase.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <IconComp size={18} />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">{phase.title}</h3>
                  <p className="text-xs font-semibold text-slate-500 mb-4">{phase.subtitle}</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal mb-5">{phase.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 space-y-1.5">
                  {phase.highlights.map(item => (
                    <div key={item} className="flex items-center gap-2 text-[11px] font-medium text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Action Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link to="/contact?type=assessment">
            <button className="inline-flex items-center gap-2.5 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all">
              <span>Identify Your Starting Workflow</span>
              <ArrowRight size={15} />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default LandProveExpand
