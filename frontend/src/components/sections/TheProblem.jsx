import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const HAS_ALREADY = [
  { label: 'ERP / Accounting', example: 'Tally, SAP, Oracle' },
  { label: 'CRM', example: 'Salesforce, Zoho, HubSpot' },
  { label: 'Documents & Files', example: 'Drive, SharePoint, PDFs' },
  { label: 'Spreadsheets', example: 'Excel, Google Sheets' },
  { label: 'Communication', example: 'Email, WhatsApp, Teams' },
  { label: 'HR Systems', example: 'HRMS, Payroll software' },
]

const STILL_DOES_MANUALLY = [
  { label: 'Check & reconcile', color: 'text-red-400' },
  { label: 'Copy across systems', color: 'text-red-400' },
  { label: 'Match records manually', color: 'text-amber-400' },
  { label: 'Follow up repeatedly', color: 'text-amber-400' },
  { label: 'Manually approve', color: 'text-amber-400' },
  { label: 'Coordinate between teams', color: 'text-orange-400' },
  { label: 'Escalate exceptions', color: 'text-orange-400' },
  { label: 'Compile reports by hand', color: 'text-red-400' },
]

const TheProblem = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white text-black border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-4">The operational gap</p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-5">
            Your business already has software.{' '}
            <span className="premium-serif italic font-normal text-purple-600">
              The problem is what still happens between the systems.
            </span>
          </h2>
          <p className="text-gray-500 text-base leading-relaxed font-normal">
            Companies invest in software. But people still perform the repetitive operational work that software doesn't connect — the checking, copying, matching, following up, and reconciling that happens in between.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Column 1: What companies have */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="p-8 rounded-[28px] bg-gray-50 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-500">Your company already has</span>
            </div>
            <div className="space-y-3">
              {HAS_ALREADY.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <span className="font-bold text-gray-800 text-sm">{item.label}</span>
                  <span className="text-xs text-gray-400 font-normal">{item.example}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 2: What people still do manually */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-8 rounded-[28px] bg-[#05050F] text-white border border-white/5"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">But people still do this manually</span>
            </div>
            <div className="space-y-3">
              {STILL_DOES_MANUALLY.map((item) => (
                <div key={item.label} className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/60 flex-shrink-0" />
                  <span className={`font-semibold text-sm ${item.color}`}>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 text-base md:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
            AlgoForce automates the operational work <strong className="text-black font-bold">around</strong> those systems —
            without asking your team to replace what already works.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default TheProblem
