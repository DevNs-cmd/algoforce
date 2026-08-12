import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { Landmark, TrendingUp, Sliders, Factory, Users, FileText, ArrowRight, CheckCircle2 } from 'lucide-react'

const SOLUTION_FAMILIES = [
  {
    id: 'finance',
    name: 'Finance',
    eyebrow: 'Finance Operations',
    icon: Landmark,
    badge: 'Core Beachhead',
    problem: 'Finance teams often spend significant time on manual ledger reconciliation, exception tracking, and invoice processing.',
    capability: 'Automate accounting workflows around your existing Tally, SAP, or ERP environment without software replacement.',
    outcome: 'Reduce manual reconciliation effort and detect ledger exceptions earlier in the process.',
    path: '/solutions/finance',
  },
  {
    id: 'revenue',
    name: 'Revenue',
    eyebrow: 'Revenue Operations',
    icon: TrendingUp,
    problem: 'Inconsistent lead follow-up, qualification delays, and manual CRM logging can reduce sales velocity.',
    capability: 'Deploy intelligent automation for lead engagement, instant qualification, and CRM synchronization.',
    outcome: 'More consistent follow-up, faster response times, and improved pipeline visibility.',
    path: '/solutions/revenue',
  },
  {
    id: 'operations',
    name: 'Operations',
    eyebrow: 'Process Coordination',
    icon: Sliders,
    problem: 'Cross-department approvals, exception handling, and operational handoffs create delays that single systems don\'t manage.',
    capability: 'Orchestrate approval matrixes, automated escalations, and task routing between disconnected tools.',
    outcome: 'Streamlined operational throughput and reduced manual administrative oversight.',
    path: '/solutions/operations',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    eyebrow: 'Production & Quality',
    icon: Factory,
    problem: 'Quality inspection, defect logging, and shop-floor reporting still depend heavily on manual visual observation.',
    capability: 'Integrate automated visual quality inspection and real-time production telemetry directly with your ERP.',
    outcome: 'Earlier defect detection, automated compliance logs, and enhanced shop-floor visibility.',
    path: '/solutions/manufacturing',
  },
  {
    id: 'people',
    name: 'People',
    eyebrow: 'HR & Workforces',
    icon: Users,
    problem: 'HR teams spend significant time answering repetitive policy queries and managing manual onboarding steps.',
    capability: 'Automate employee self-service inquiries, policy lookups, and standardized onboarding checklists.',
    outcome: 'Faster employee support resolution and reduced routine HR workload.',
    path: '/solutions/people',
  },
  {
    id: 'knowledge',
    name: 'Knowledge',
    eyebrow: 'Enterprise Knowledge',
    icon: FileText,
    problem: 'Critical operational SOPs, historical records, and policy manuals are scattered across separate documents and email silos.',
    capability: 'Unify internal documentation into a secure, searchable enterprise knowledge repository.',
    outcome: 'Faster access to verified operational answers and preserved institutional memory.',
    path: '/solutions/knowledge',
  },
]

const SolutionCard = ({ item, index, inView }) => {
  const IconComponent = item.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-slate-300 hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)] hover:-translate-y-1"
    >
      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-800 transition-colors duration-300 group-hover:bg-slate-900 group-hover:text-white">
              <IconComponent size={22} strokeWidth={2} />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block">
                {item.eyebrow}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                {item.name}
              </h3>
            </div>
          </div>
          {item.badge && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {item.badge}
            </span>
          )}
        </div>

        {/* Problem */}
        <div className="mb-5 border-t border-slate-100 pt-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Operational Challenge
          </span>
          <p className="text-sm font-normal text-slate-600 leading-relaxed">
            {item.problem}
          </p>
        </div>

        {/* Capability */}
        <div className="mb-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            AlgoForce Capability
          </span>
          <p className="text-sm font-medium text-slate-800 leading-relaxed">
            {item.capability}
          </p>
        </div>

        {/* Business Outcome */}
        <div className="mb-6 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            <CheckCircle2 size={13} className="text-emerald-600" />
            Key Business Outcome
          </div>
          <p className="text-xs font-semibold text-slate-900 leading-relaxed">
            {item.outcome}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100">
        <Link
          to={item.path}
          className="inline-flex w-full items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-900 transition-colors duration-200 group-hover:text-purple-700"
        >
          <span>Explore {item.name} Solution</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-all duration-300 group-hover:bg-purple-700 group-hover:text-white group-hover:translate-x-1">
            <ArrowRight size={14} />
          </div>
        </Link>
      </div>
    </motion.div>
  )
}

const SolutionFamilies = ({ featuredOnly = false }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const displayedFamilies = featuredOnly ? SOLUTION_FAMILIES.slice(0, 4) : SOLUTION_FAMILIES

  return (
    <section ref={ref} id="solutions" className="relative bg-slate-50/70 py-20 md:py-28 text-slate-900 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-slate-700 bg-white border border-slate-200 px-4 py-1.5 rounded-full mb-4 shadow-sm">
            Solutions by Business Function
          </span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            Find the solution built for{' '}
            <span className="premium-serif italic font-normal text-purple-800">your workflow.</span>
          </h2>
          
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
            Start with the business function you want to optimize. Every solution integrates with your existing software stack to eliminate manual operational bottlenecks.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {displayedFamilies.map((item, index) => (
            <SolutionCard key={item.id} item={item} index={index} inView={inView} />
          ))}
        </div>

        {/* Bottom Assessment & View All Callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {featuredOnly && (
            <Link to="/solutions">
              <button className="px-8 py-3.5 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-sm">
                View All Solution Families (6)
              </button>
            </Link>
          )}

          <Link to="/contact?type=assessment">
            <button className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md">
              Book a Workflow Assessment
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default SolutionFamilies
