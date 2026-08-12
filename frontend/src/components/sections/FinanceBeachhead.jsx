import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'

const WORKFLOW_AREAS = [
  'Invoice and document processing',
  'Ledger reconciliation assistance',
  'Accounts receivable follow-up',
  'Exception flagging and review',
  'Financial reporting automation',
  'Tally-connected workflow queries',
]

const HOW_IT_FITS = [
  { label: 'Works with Tally Prime & ERP 9', desc: 'Connects to your local Tally database without replacing your existing setup.' },
  { label: 'No software replacement required', desc: 'Automates work around Tally, not instead of it.' },
  { label: 'Private deployment options', desc: 'Designed for business data confidentiality requirements.' },
  { label: 'Managed after go-live', desc: 'We maintain and improve the solution as your workflows evolve.' },
]

const FinanceBeachhead = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white text-black border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-purple-600 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Current commercial solution
            </span>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">
              Finance AI for businesses{' '}
              <span className="premium-serif italic font-normal text-purple-600">
                that already run on Tally.
              </span>
            </h2>

            <p className="text-gray-600 text-base leading-relaxed mb-6 font-normal">
              AlgoForce Finance AI automates the repetitive work around your finance systems without forcing your team to replace the tools they already use. Designed for businesses where finance workflows are high-volume, exception-heavy and largely manual.
            </p>

            <div className="mb-8">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">Workflow areas</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {WORKFLOW_AREAS.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 py-2 text-sm">
                    <CheckCircle size={14} className="text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700 font-normal">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-3 font-normal italic">
                * Specific workflow capabilities confirmed during discovery based on your Tally version, data structure and operational requirements.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/products/finance-ai">
                <button className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#06101d] text-white rounded-full font-bold text-sm hover:bg-[#102640] transition-all shadow-lg">
                  Explore Finance AI <ArrowRight size={14} />
                </button>
              </Link>
              <Link to="/contact?type=assessment&interest=finance">
                <button className="inline-flex items-center gap-2 px-6 py-3.5 border border-gray-200 text-gray-700 rounded-full font-bold text-sm hover:border-gray-400 hover:text-black transition-all">
                  Book Finance Workflow Assessment
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right: How it fits card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="p-8 rounded-[28px] bg-[#03070d] text-white border border-white/5"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-400 mb-6">How it fits your environment</p>

            <div className="space-y-6">
              {HOW_IT_FITS.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + idx * 0.08 }}
                  className="flex gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={14} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm mb-1">{item.label}</p>
                    <p className="text-slate-400 text-xs leading-relaxed font-normal">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="AlgoForce Finance AI" className="h-6 w-auto object-contain bg-white rounded-lg px-2 py-1" />
                <div>
                  <p className="text-xs font-bold text-white">Finance AI — TallyGPT</p>
                  <p className="text-[10px] text-slate-500 font-normal">Available for deployment</p>
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
