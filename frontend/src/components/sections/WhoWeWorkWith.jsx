import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { Building2, GraduationCap, Handshake, ArrowRight, Check, ArrowUpRight } from 'lucide-react'
import { SectionCanvas, SectionHeader, FolderTabEar } from './sectionPrimitives'

const AUDIENCES = [
  {
    id: 'businesses',
    tabLabel: 'Businesses',
    shortDesc: 'Business software, process automation and system integration.',
    title: 'For Businesses',
    subtitle: 'Founders, Operations, Finance & IT Teams',
    description:
      'Business software, process automation and system integration.',
    icon: Building2,
    badge: 'Businesses',
    tint: 'bg-[#0A2A43] text-white',
    badgeTint: 'text-[#2563EB] bg-blue-50 border-blue-100',
    highlights: [
      'Custom web and mobile business applications',
      'Approval and workflow automation',
      'Tally, SAP and database integrations',
      'Operational reporting and dashboards',
      'Ongoing maintenance and technical support',
    ],
    ctaText: 'Explore Business Solutions',
    ctaLink: '/services',
    stats: [
      { label: 'Deployment', val: 'Cloud or on-premise' },
      { label: 'Integration', val: 'Works with existing tools' },
    ],
  },
  {
    id: 'institutions',
    tabLabel: 'Educational Institutions',
    shortDesc: 'Admission systems, student portals and campus automation.',
    title: 'For Educational Institutions',
    subtitle: 'Schools, Colleges, Universities & Coaching Institutes',
    description:
      'Admission systems, student portals and campus automation.',
    icon: GraduationCap,
    badge: 'Educational Institutions',
    tint: 'bg-[#2563EB] text-white',
    badgeTint: 'text-[#2563EB] bg-blue-50 border-blue-100',
    highlights: [
      'Admission and enquiry management systems',
      'Student, faculty and parent self-service portals',
      'Fee tracking and automated digital receipts',
      'Administrative and exam workflow software',
      'Institutional websites and mobile apps',
    ],
    ctaText: 'Explore Education Technology',
    ctaLink: '/industries/education',
    stats: [
      { label: 'Admissions', val: 'Enquiry to enrollment tracking' },
      { label: 'Portals', val: 'Web and mobile access' },
    ],
  },
  {
    id: 'partners',
    tabLabel: 'Technology Partners',
    shortDesc: 'White-label development and technical delivery.',
    title: 'For Technology Partners',
    subtitle: 'Consultancies, Agencies, IT Resellers & Advisors',
    description:
      'White-label development and technical delivery.',
    icon: Handshake,
    badge: 'Technology Partners',
    tint: 'bg-[#9A4DFF] text-white',
    badgeTint: 'text-[#9A4DFF] bg-purple-50 border-purple-100',
    highlights: [
      'White-label web and mobile development',
      'AI and workflow automation delivery',
      'Joint execution on technical project scopes',
      'Reseller and structured referral agreements',
      'Dedicated engineering collaboration',
    ],
    ctaText: 'Become a Technology Partner',
    ctaLink: '/partnerships',
    stats: [
      { label: 'Model', val: 'White-label or co-delivery' },
      { label: 'Confidentiality', val: 'Mutual NDA terms' },
    ],
  },
]

const WhoWeWorkWith = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const [activeIdx, setActiveIdx] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  return (
    <div ref={ref}>
      <SectionCanvas outerClassName="bg-white py-5 sm:py-7">
        <SectionHeader
          badge="Customer Pathways"
          titlePrimary="Who We Work With"
          titleMuted="Software built around your requirements."
          description="Select your organization type to view relevant services and delivery options."
          inView={inView}
        />

        {/* Desktop Interactive Expanding 3-Card Bento Workspace */}
        <div className="hidden lg:flex items-stretch gap-4 min-h-[430px]">
          {AUDIENCES.map((item, idx) => {
            const Icon = item.icon
            const isActive = activeIdx === idx

            return (
              <motion.div
                key={item.id}
                layout={!prefersReducedMotion}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => !isActive && setActiveIdx(idx)}
                className={`relative rounded-[24px] transition-colors duration-300 ${
                  isActive
                    ? 'flex-[2.2] bg-white border border-[#dce3ec] p-7 saas-card-elevation cursor-default'
                    : 'flex-[0.85] bg-white/75 hover:bg-white border border-[#e3e8f0] hover:border-[#cbd5e1] p-6 cursor-pointer saas-card-elevation-hover flex flex-col justify-between group'
                }`}
              >
                {isActive && <FolderTabEar />}

                {isActive ? (
                  <motion.div
                    key={`expanded-${item.id}`}
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.08 }}
                    className="h-full grid grid-cols-12 gap-6 items-center"
                  >
                    {/* Left Detail */}
                    <div className="col-span-7 flex flex-col justify-between h-full">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-[11px] font-mono font-semibold text-[#0A2A43] mb-4">
                          <Icon size={13} className="text-[#2563EB]" />
                          <span>{item.badge}</span>
                        </div>

                        <h3 className="font-['Outfit',sans-serif] text-2xl font-semibold text-[#0A2A43] tracking-tight mb-1.5">
                          {item.title}
                        </h3>
                        <p className="text-xs font-medium text-[#6E7B8C] mb-4">
                          {item.subtitle}
                        </p>
                        <p className="text-[13.5px] text-[#4A5769] leading-[1.65] font-normal mb-6">
                          {item.description}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-2.5">
                          {item.stats.map((st) => (
                            <div
                              key={st.label}
                              className="px-3 py-2 rounded-xl bg-[#f8f9fb] border border-[#e5eaf2]"
                            >
                              <span className="block text-[9.5px] font-mono uppercase tracking-wider text-[#6E7B8C]">
                                {st.label}
                              </span>
                              <span className="text-xs font-semibold text-[#0A2A43]">
                                {st.val}
                              </span>
                            </div>
                          ))}
                        </div>

                        <Link
                          to={item.ctaLink}
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0A2A43] hover:bg-[#113D61] text-white text-xs font-medium shadow-[0_10px_22px_-6px_rgba(10,42,67,0.34)] hover:-translate-y-0.5 transition-all"
                        >
                          <span>{item.ctaText}</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>

                    {/* Right Layered Paper Checklist Card */}
                    <div className="col-span-5 relative h-full flex flex-col justify-center">
                      <div className="rounded-2xl bg-[#f8f9fb] border border-[#e4e9f0] p-4 shadow-[inset_0_1px_2px_rgba(10,42,67,0.03)]">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-[#0A2A43] uppercase tracking-wider mb-3 px-1">
                          <span>Key Capabilities</span>
                          <span className="font-mono text-[10px] text-[#6E7B8C]">05 Areas</span>
                        </div>
                        <div className="space-y-2">
                          {item.highlights.map((h) => (
                            <div
                              key={h}
                              className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-[#e6ebf2] shadow-[0_2px_6px_-2px_rgba(10,42,67,0.05)] text-[11.5px] font-medium text-[#0A2A43] leading-snug"
                            >
                              <span className="w-4 h-4 rounded-md bg-blue-50 border border-blue-100 text-[#2563EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check size={10} strokeWidth={2.5} />
                              </span>
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    {/* Compact Inactive Docked Preview Card */}
                    <div>
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-[#e2e8f0] saas-squircle-badge flex items-center justify-center -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${item.tint}`}>
                            <Icon size={15} />
                          </div>
                        </div>
                        <span className="w-8 h-8 rounded-full bg-[#f8f9fb] border border-[#e2e8f0] flex items-center justify-center text-slate-400 group-hover:text-[#0A2A43] group-hover:bg-white transition-colors">
                          <ArrowUpRight size={14} />
                        </span>
                      </div>

                      <span className={`inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md border mb-3 ${item.badgeTint}`}>
                        {item.badge}
                      </span>

                      <h3 className="font-['Outfit',sans-serif] text-xl font-semibold text-[#0A2A43] tracking-tight mb-2">
                        {item.tabLabel}
                      </h3>
                      <p className="text-xs text-[#5B6779] leading-relaxed font-normal">
                        {item.shortDesc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0A2A43]">
                      <span>Inspect Pathway</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Tablet & Mobile Segmented Switcher + Clean Stack (< lg) */}
        <div className="lg:hidden">
          <div className="flex items-center justify-center mb-6 overflow-x-auto pb-2 scrollbar-hide max-w-full">
            <div className="inline-flex p-1.5 rounded-2xl saas-tab-tray gap-1">
              {AUDIENCES.map((item, idx) => {
                const Icon = item.icon
                const isActive = activeIdx === idx
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-[#0A2A43] text-white shadow-[0_6px_14px_-4px_rgba(10,42,67,0.35)]'
                        : 'text-slate-600 hover:text-[#0A2A43] hover:bg-white/70'
                    }`}
                  >
                    <Icon size={14} />
                    <span>{item.tabLabel}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {(() => {
            const current = AUDIENCES[activeIdx]
            const CurrentIcon = current.icon
            return (
              <div className="relative rounded-[24px] bg-white border border-[#dce3ec] p-5 sm:p-8 saas-card-elevation">
                <FolderTabEar />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-[11px] font-mono font-semibold text-[#0A2A43] mb-3.5">
                  <CurrentIcon size={13} className="text-[#2563EB]" />
                  <span>{current.badge}</span>
                </div>

                <h3 className="font-['Outfit',sans-serif] text-xl sm:text-2xl font-semibold text-[#0A2A43] mb-1.5">
                  {current.title}
                </h3>
                <p className="text-xs font-medium text-[#6E7B8C] mb-3.5">{current.subtitle}</p>
                <p className="text-sm text-[#4A5769] leading-relaxed mb-5">{current.description}</p>

                <div className="space-y-2 mb-6">
                  {current.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#f8f9fb] border border-[#e5eaf2] text-xs font-medium text-[#0A2A43]"
                    >
                      <Check size={14} className="text-[#2563EB] mt-0.5 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={current.ctaLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0A2A43] text-white text-xs sm:text-sm font-medium shadow-[0_8px_20px_-6px_rgba(10,42,67,0.34)]"
                >
                  <span>{current.ctaText}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            )
          })()}
        </div>
      </SectionCanvas>
    </div>
  )
}

export default WhoWeWorkWith
