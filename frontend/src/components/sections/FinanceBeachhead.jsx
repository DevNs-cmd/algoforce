import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Shield, AlertCircle, Clock } from 'lucide-react'
import { trackCTAClick } from '../../utils/analytics'

const WORKFLOW_CATEGORIES = [
  {
    category: 'SUPPORTED (Ready for Deployment)',
    statusTag: 'Supported',
    tagClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    items: [
      'Invoice & purchase document processing',
      'Bank & ledger reconciliation assistance',
    ]
  },
  {
    category: 'ASSESSMENT-LED (Scoped via Discovery)',
    statusTag: 'Assessment-Led',
    tagClass: 'bg-purple-50 text-purple-700 border-purple-200',
    items: [
      'Accounts receivable follow-up workflows',
      'Automated transaction exception detection',
    ]
  },
  {
    category: 'VALIDATION (Custom Scoping Required)',
    statusTag: 'Validation',
    tagClass: 'bg-amber-50 text-amber-700 border-amber-200',
    items: [
      'Tally-connected natural language queries',
      'Custom multi-branch financial reporting',
    ]
  }
]

const HOW_IT_FITS = [
  { label: 'Compatible with Tally Prime & ERP 9', desc: 'Connects to your local Tally environment without replacing your existing setup.' },
  { label: 'Don\'t replace Tally', desc: 'Automates manual tasks around Tally rather than forcing a platform migration.' },
  { label: 'Business-data controls', desc: 'Designed around customer confidentiality and data security requirements.' },
  { label: 'Managed beyond go-live', desc: 'We maintain, monitor, and improve the solution as your workflows evolve.' },
]

const FinanceBeachhead = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left: Main Positioning & Workflow Categories */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-purple-700 bg-purple-50 border border-purple-200 px-3.5 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Current Commercial Beachhead
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-slate-900 mb-4">
              Finance AI for businesses{' '}
              <span className="premium-serif italic font-normal text-purple-700">
                that already run on Tally.
              </span>
            </h2>

            <p className="text-slate-600 text-base leading-relaxed mb-6 font-normal">
              Don't replace Tally. Automate the work around it. AlgoForce Finance AI automates repetitive accounting tasks around your existing ERP without asking your team to change what already works.
            </p>

            {/* Workflow States Breakdown */}
            <div className="space-y-4 mb-8">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Workflow Readiness States
              </p>

              {WORKFLOW_CATEGORIES.map((cat) => (
                <div key={cat.category} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800">{cat.category}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${cat.tagClass}`}>
                      {cat.statusTag}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {cat.items.map(item => (
                      <div key={item} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle size={13} className="text-purple-600 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <p className="text-[11px] text-slate-500 font-normal italic">
                * Specific workflow capabilities are confirmed during your Workflow Assessment based on your Tally setup and data environment.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact?type=assessment&interest=finance"
                onClick={() => trackCTAClick('Book Finance Workflow Assessment', '/contact?type=assessment&interest=finance', 'finance_beachhead')}
              >
                <button className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-full font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-all shadow-md w-full sm:w-auto">
                  Book Finance Workflow Assessment
                </button>
              </Link>
              <Link
                to="/products/finance-ai"
                onClick={() => trackCTAClick('Explore Finance AI', '/products/finance-ai', 'finance_beachhead')}
              >
                <button className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-slate-300 text-slate-700 rounded-full font-bold text-xs uppercase tracking-wider hover:border-slate-400 hover:text-slate-900 transition-all w-full sm:w-auto">
                  Explore Solution Capabilities <ArrowRight size={13} />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right: Existing Stack & Integration Fit */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-purple-400 block mb-6">
              Integration Architecture
            </span>

            <div className="space-y-6">
              {HOW_IT_FITS.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={15} className="text-purple-300" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm mb-1">{item.label}</p>
                    <p className="text-slate-400 text-xs leading-relaxed font-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="AlgoForce Finance AI" className="h-6 w-auto object-contain bg-white rounded-md px-2 py-1" />
                <div>
                  <p className="text-xs font-bold text-white">Finance AI — Commercial Beachhead</p>
                  <p className="text-[10px] text-slate-400 font-normal">Available for qualified pilot deployment</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FinanceBeachhead
