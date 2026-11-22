import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { Factory, GraduationCap, ArrowRight, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react'

const INDUSTRIES = [
  {
    id: 'manufacturing',
    title: 'Manufacturing & Distribution',
    tagline: 'Operational visibility, production logging & ERP synchronisation.',
    icon: Factory,
    path: '/industries/manufacturing',
    challenges: [
      'Shop-floor paper logs causing critical data delays in central ERP',
      'Inventory count discrepancies between manufacturing plant & warehouse',
      'Manual quality inspection reports creating shipment approval bottlenecks',
      'Finance reconciliation delays between dispatch notes and Tally/SAP invoices'
    ],
    solutions: [
      {
        title: 'Production & Shop-Floor Event Tracking',
        desc: 'Digital line and machine event logging synced directly into central database.'
      },
      {
        title: 'Inventory & Dispatch Automation',
        desc: 'Automated barcode/QR scanning, dispatch note creation and real-time stock levels.'
      },
      {
        title: 'Finance & Tally/SAP Integration',
        desc: 'Automated invoice mapping, tax compliance checks, and accounts reconciliation.'
      },
      {
        title: 'Custom Plant Executive Dashboards',
        desc: 'Live operational KPIs, yield metrics, and downtime analytics on tablet and desktop.'
      }
    ],
    badge: 'Industry Priority 01'
  },
  {
    id: 'education',
    title: 'Education & Institutional Networks',
    tagline: 'Student lifecycle management, admission automation & portals.',
    icon: GraduationCap,
    path: '/industries/education',
    challenges: [
      'High volume of admission enquiries lost in WhatsApp & manual spreadsheets',
      'Fragmented student databases between admissions, fee counters & academics',
      'Manual fee reminder calls and paper receipt generation causing revenue delay',
      'Outdated institutional portals lacking student and parent self-service'
    ],
    solutions: [
      {
        title: 'Admission & Enquiry Automation',
        desc: 'Multi-channel enquiry capture, instant automated responses, and counselor routing.'
      },
      {
        title: 'Institutional & Student Portals',
        desc: 'Self-service portals for students, faculty, and parents with fee tracking and notices.'
      },
      {
        title: 'Administrative Workflow Automation',
        desc: 'Automated fee receipting, attendance exception alerts, and compliance documentation.'
      },
      {
        title: 'Modern Web & Mobile Infrastructure',
        desc: 'High-speed institutional portals, admission microsites, and campus communication apps.'
      }
    ],
    badge: 'Industry Priority 02'
  }
]

const IndustrySolutionsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const [activeIdx, setActiveIdx] = useState(0)

  const current = INDUSTRIES[activeIdx]
  const CurrentIcon = current.icon

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#f8fafc] text-slate-900 border-b border-slate-200/90 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 max-w-3xl mx-auto"
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#0A2A43] bg-white border border-slate-200 px-4 py-1.5 rounded-full mb-3.5 shadow-2xs">
            Domain-Specific Operating Context
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-[#0A2A43] mb-4">
            Solutions Built for Your{' '}
            <span className="font-serif italic font-normal text-purple-900">
              Specific Industry Challenges.
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Software only succeeds when it respects the daily realities of your sector. Toggle between sectors to see our targeted engineering architectures.
          </p>
        </motion.div>

        {/* 3D Tactile Sector Toggle */}
        <div className="flex items-center justify-center mb-8 overflow-x-auto pb-2 scrollbar-hide max-w-full">
          <div className="inline-flex p-1.5 sm:p-2 rounded-2xl bg-gradient-to-b from-slate-200/90 to-slate-300/80 border-t border-t-white/80 border-b-2 border-b-slate-400/50 border-x border-slate-300/90 shadow-[inset_0_3px_8px_rgba(9,41,65,0.12),inset_0_1px_2px_rgba(0,0,0,0.08),0_2px_4px_rgba(255,255,255,0.9)] backdrop-blur-md gap-1">
            {INDUSTRIES.map((ind, idx) => {
              const Icon = ind.icon
              const isActive = activeIdx === idx
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-b from-[#12395b] to-[#092941] text-white shadow-[0_8px_20px_rgba(9,41,65,0.38),0_2px_6px_rgba(9,41,65,0.2),inset_0_1px_1px_rgba(255,255,255,0.35)] border-t border-t-white/30 border-b-2 border-b-[#051724] -translate-y-0.5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 active:translate-y-0'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-white' : 'text-slate-500'} />
                  <span>{ind.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 3D Elevated Sliding Spotlight */}
        <div className="max-w-5xl mx-auto mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.99 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-3xl bg-gradient-to-b from-white via-white to-slate-50 border-t-2 border-t-white border-b-4 border-b-slate-300/90 border-x border-slate-200/90 shadow-[0_24px_55px_-6px_rgba(9,41,65,0.18),0_12px_24px_-6px_rgba(9,41,65,0.12),0_0_0_1px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_2px_rgba(9,41,65,0.03)] p-6 sm:p-10"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white border-t border-t-white border-b border-b-slate-200 border-x border-slate-200 flex items-center justify-center text-[#092941] shadow-[0_4px_10px_rgba(9,41,65,0.08),inset_0_1px_0_rgba(255,255,255,1)]">
                    <CurrentIcon size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#092941]">
                      {current.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-normal">
                      {current.tagline}
                    </p>
                  </div>
                </div>

                <Link to={current.path} className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-4 py-2 bg-gradient-to-b from-white to-slate-50 hover:to-slate-100 text-[#092941] border-t border-t-white border-b-2 border-b-slate-300 border-x border-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-[0_4px_10px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5 active:translate-y-0">
                    <span>Full Sector Blueprint</span>
                    <ArrowRight size={13} />
                  </button>
                </Link>
              </div>

              {/* Side-by-Side: Challenges vs Engineered Solutions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Challenges Column */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-rose-50/30 border border-slate-200/80 shadow-[0_4px_14px_rgba(0,0,0,0.03)]">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-900 mb-3.5">
                    <AlertCircle size={15} className="text-rose-600" />
                    <span>Operational Bottlenecks We Solve:</span>
                  </div>
                  <ul className="space-y-3">
                    {current.challenges.map((c, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                        <span className="leading-relaxed font-medium">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solutions Column */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-purple-50/20 border border-slate-200/80 shadow-[0_4px_14px_rgba(0,0,0,0.03)]">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-900 mb-3.5">
                    <CheckCircle2 size={15} className="text-purple-800" />
                    <span>AlgoForce Engineered Systems:</span>
                  </div>
                  <div className="space-y-2.5">
                    {current.solutions.map((s, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:-translate-y-0.5 transition-transform">
                        <div className="text-xs font-bold text-[#0A2A43] mb-0.5">
                          {s.title}
                        </div>
                        <p className="text-[11px] text-slate-600 leading-normal font-normal">
                          {s.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View All Industries Link */}
        <div className="text-center">
          <Link
            to="/industries"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#0A2A43] transition-colors"
          >
            <span>Explore how we support Retail, Healthcare, Logistics, and Professional Services</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default IndustrySolutionsSection
