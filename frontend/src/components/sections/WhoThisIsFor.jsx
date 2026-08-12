import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { ArrowRight, Landmark, Sliders, TrendingUp, Factory, Layers } from 'lucide-react'
import { trackCTAClick } from '../../utils/analytics'

const TEAMS = [
  {
    title: 'Finance Teams',
    icon: Landmark,
    description: 'Teams spending significant hours reconciling accounts, managing invoice exceptions, and manually updating ledger entries.',
  },
  {
    title: 'Operations Teams',
    icon: Sliders,
    description: 'Teams managing cross-department approval matrixes, operational escalations, and handoffs between disconnected systems.',
  },
  {
    title: 'Sales Organizations',
    icon: TrendingUp,
    description: 'Organizations experiencing qualification delays, inconsistent lead follow-up, and manual CRM logging.',
  },
  {
    title: 'Manufacturing Teams',
    icon: Factory,
    description: 'Teams relying on manual visual observation for quality checks, production logging, and shop-floor reporting.',
  },
  {
    title: 'Growing Businesses',
    icon: Layers,
    description: 'Businesses with fragmented software stacks where teams manually bridge gaps between ERP, CRM, and files.',
  },
]

const WhoThisIsFor = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section ref={ref} className="py-20 md:py-28 bg-slate-50/80 text-slate-900 border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-slate-700 bg-white border border-slate-200 px-4 py-1.5 rounded-full mb-4 shadow-sm">
            Target Workflow Profiles
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            Built for teams with{' '}
            <span className="premium-serif italic font-normal text-purple-700">expensive operational workflows.</span>
          </h2>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
            Start with the workflow creating the most manual effort, delay or operational risk in your organization.
          </p>
        </motion.div>

        {/* Teams Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-14">
          {TEAMS.map((team, idx) => {
            const IconComp = team.icon
            return (
              <motion.div
                key={team.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 border border-purple-100 flex items-center justify-center mb-5">
                    <IconComp size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{team.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{team.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link
            to="/contact?type=assessment"
            onClick={() => trackCTAClick('Find My Workflow', '/contact?type=assessment', 'who_this_is_for')}
          >
            <button className="inline-flex items-center gap-2.5 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold text-sm shadow-md transition-all">
              <span>Find My Workflow</span>
              <ArrowRight size={15} />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default WhoThisIsFor
