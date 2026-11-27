import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { Factory, GraduationCap, ArrowRight, ChevronRight, AlertCircle, CheckCircle2, ArrowLeftRight } from 'lucide-react'
import { SectionCanvas, SectionHeader, FolderTabEar } from './sectionPrimitives'

const INDUSTRIES = [
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    tagline: 'Production, inventory and ERP integration.',
    icon: Factory,
    path: '/industries/manufacturing',
    badge: 'Manufacturing & Distribution',
    pairs: [
      {
        challenge: 'Paper shift logs delay production and downtime reporting.',
        solutionTitle: 'Shop-Floor Activity Tracking',
        solutionDesc: 'Capture daily machine runs and shift logs on tablets.',
      },
      {
        challenge: 'Stock counts mismatch between the factory floor and warehouse.',
        solutionTitle: 'Inventory & Dispatch Sync',
        solutionDesc: 'Update stock levels automatically from barcode scans and dispatches.',
      },
      {
        challenge: 'Manual quality sign-offs delay outgoing customer shipments.',
        solutionTitle: 'Operational Dashboards',
        solutionDesc: 'Track daily production output and quality approvals clearly.',
      },
      {
        challenge: 'Matching invoices with dispatch records takes manual hours.',
        solutionTitle: 'Tally & ERP Integration',
        solutionDesc: 'Sync dispatch records directly with Tally or ERP invoices.',
      },
    ],
  },
  {
    id: 'education',
    title: 'Education',
    tagline: 'Admissions, student management and fee automation.',
    icon: GraduationCap,
    path: '/industries/education',
    badge: 'Schools, Colleges & Institutes',
    pairs: [
      {
        challenge: 'Student enquiries are lost across chats and spreadsheets.',
        solutionTitle: 'Admission Enquiry Management',
        solutionDesc: 'Track and assign student enquiries from one organized pipeline.',
      },
      {
        challenge: 'Students and parents lack online access to updates.',
        solutionTitle: 'Student & Parent Portals',
        solutionDesc: 'Online portals for attendance records, notices and schedules.',
      },
      {
        challenge: 'Manual fee reminders and paper receipts create extra work.',
        solutionTitle: 'Fee Workflow Automation',
        solutionDesc: 'Send fee reminders and issue digital receipts automatically.',
      },
      {
        challenge: 'Student data sits disconnected between admissions and accounts.',
        solutionTitle: 'Institutional Web & Apps',
        solutionDesc: 'Unified campus websites, admission forms and records.',
      },
    ],
  },
]

const OTHER_SECTORS = [
  { name: 'Retail', desc: 'E-commerce and inventory systems' },
  { name: 'Logistics', desc: 'Dispatch, tracking and workflow automation' },
  { name: 'Healthcare', desc: 'Clinic management and operational software' },
  { name: 'Professional Services', desc: 'Business applications and process automation' },
]

const IndustrySolutionsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const [activeIdx, setActiveIdx] = useState(0)
  const [focusedPair, setFocusedPair] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const current = INDUSTRIES[activeIdx]
  const CurrentIcon = current.icon

  return (
    <div ref={ref}>
      <SectionCanvas outerClassName="bg-white py-5 sm:py-7">
        <SectionHeader
          badge="Industries"
          titlePrimary="Industries We Serve"
          titleMuted="Software built around daily work."
          description="We solve manual processes and disconnected tools with practical industry software."
          inView={inView}
        />

        {/* Sector Toggle */}
        <div className="flex items-center justify-center mb-8 overflow-x-auto pb-2 scrollbar-hide max-w-full">
          <div className="inline-flex p-1.5 rounded-2xl saas-tab-tray gap-1.5">
            {INDUSTRIES.map((ind, idx) => {
              const Icon = ind.icon
              const isActive = activeIdx === idx
              return (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => {
                    setActiveIdx(idx)
                    setFocusedPair(0)
                  }}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0A2A43] text-white shadow-[0_8px_18px_-6px_rgba(10,42,67,0.38)] -translate-y-0.5'
                      : 'text-slate-600 hover:text-[#0A2A43] hover:bg-white/70'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-white' : 'text-slate-500'} />
                  <span>{ind.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Paired Transformation Lens Card */}
        <div className="max-w-5xl mx-auto mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[26px] bg-white border border-[#dce3ec] p-5 sm:p-8 lg:p-10 saas-card-elevation"
            >
              <FolderTabEar />

              {/* Sector Header Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#f8f9fb] border border-[#e2e8f0] saas-squircle-badge flex items-center justify-center text-[#0A2A43] flex-shrink-0">
                    <CurrentIcon size={21} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] block">
                      {current.badge}
                    </span>
                    <h3 className="font-['Outfit',sans-serif] text-xl sm:text-2xl font-semibold text-[#0A2A43]">
                      {current.title}
                    </h3>
                    <p className="text-xs text-[#6E7B8C]">{current.tagline}</p>
                  </div>
                </div>

                <Link
                  to={current.path}
                  className="w-full sm:w-auto px-4 py-2.5 bg-[#f8f9fb] hover:bg-white text-[#0A2A43] border border-[#dce3ec] rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-all shadow-2xs hover:-translate-y-0.5"
                >
                  <span>Full Sector Blueprint</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Column Labels (Desktop) */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-2 mb-3 text-[10.5px] font-mono font-semibold uppercase tracking-wider text-[#6E7B8C]">
                <div className="col-span-5 flex items-center gap-1.5 text-rose-700">
                  <AlertCircle size={12} />
                  <span>Common Bottleneck</span>
                </div>
                <div className="col-span-2 text-center">Solution</div>
                <div className="col-span-5 flex items-center gap-1.5 text-[#0A2A43]">
                  <CheckCircle2 size={12} className="text-[#2563EB]" />
                  <span>Business Software &amp; Integrations</span>
                </div>
              </div>

              {/* Paired Workflow Rows */}
              <div className="space-y-3">
                {current.pairs.map((pair, idx) => {
                  const isFocused = focusedPair === idx
                  return (
                    <div
                      key={pair.solutionTitle}
                      onMouseEnter={() => setFocusedPair(idx)}
                      onClick={() => setFocusedPair(idx)}
                      className={`grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isFocused
                          ? 'bg-[#f8f9fb] border-[#cbd5e1] shadow-[0_10px_24px_-12px_rgba(10,42,67,0.14)]'
                          : 'bg-white border-[#eceff4] hover:border-[#dce3ec]'
                      }`}
                    >
                      {/* Bottleneck Note Card */}
                      <div className="md:col-span-5 flex items-start gap-2.5 p-3 rounded-xl bg-white border border-rose-100 shadow-[0_2px_6px_-2px_rgba(225,29,72,0.06)]">
                        <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" aria-hidden="true" />
                        <p className="text-xs text-slate-700 font-medium leading-relaxed">
                          {pair.challenge}
                        </p>
                      </div>

                      {/* Bridge Arrow */}
                      <div className="md:col-span-2 flex items-center justify-center py-0.5 md:py-0">
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                          isFocused
                            ? 'bg-[#0A2A43] border-[#0A2A43] text-white shadow-sm'
                            : 'bg-white border-[#e2e8f0] text-slate-400'
                        }`}>
                          <ArrowLeftRight size={13} className="rotate-90 md:rotate-0" />
                        </div>
                      </div>

                      {/* Engineered Solution Paper Card */}
                      <div className={`md:col-span-5 p-3 rounded-xl border transition-all ${
                        isFocused
                          ? 'bg-white border-[#bfdbfe] shadow-[0_8px_18px_-8px_rgba(37,99,235,0.2)]'
                          : 'bg-white border-[#e6ebf2]'
                      }`}>
                        <div className="text-xs font-semibold text-[#0A2A43] mb-0.5">
                          {pair.solutionTitle}
                        </div>
                        <p className="text-[11.5px] text-[#5A6678] leading-snug">
                          {pair.solutionDesc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Additional Industry Cards Strip */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">
            {OTHER_SECTORS.map((sector) => (
              <div
                key={sector.name}
                className="p-3 rounded-xl bg-white border border-[#e3e8f0] text-left shadow-2xs"
              >
                <div className="text-xs font-semibold text-[#0A2A43] mb-0.5">{sector.name}</div>
                <div className="text-[11px] text-[#5A6678] leading-snug">{sector.desc}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/industries"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A2A43] hover:text-[#2563EB] transition-colors"
            >
              <span>View all industry solutions</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </SectionCanvas>
    </div>
  )
}

export default IndustrySolutionsSection
