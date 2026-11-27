import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { Handshake, ArrowRight, Shield, Users, Share2, Layers, Check, ArrowLeftRight } from 'lucide-react'
import { SectionCanvas, SectionHeader, FolderTabEar } from './sectionPrimitives'

const PARTNERSHIP_MODELS = [
  {
    id: 'whitelabel',
    tabLabel: 'White-label Development',
    title: 'White-label Development',
    subtitle: 'Confidential build under your brand',
    desc: 'Your agency keeps client relationships while our engineers build web, mobile and backend systems.',
    partnerOwns: 'Client relationship and brand identity',
    algoforceOwns: 'Software build, QA and NDA delivery',
    benefits: [
      'Mutual NDA and client confidentiality',
      'Direct collaboration with engineers',
      'Clear milestone project scopes',
      'Client-ready code and documentation',
    ],
    icon: Shield,
    badge: 'White-label Delivery',
  },
  {
    id: 'ai-implementation',
    tabLabel: 'Technology Co-Delivery',
    title: 'Technology Co-Delivery',
    subtitle: 'Software, automation and AI build',
    desc: 'Partner with us when clients require automation, API integrations or custom business applications.',
    partnerOwns: 'Client consulting and account strategy',
    algoforceOwns: 'Workflow automation, ERP bridges and software',
    benefits: [
      'Technical scoping alongside your team',
      'Tally, SAP and database integration experience',
      'Practical AI grounded in client data',
      'Flexible cloud or on-premise setup',
    ],
    icon: Layers,
    badge: 'Technical Co-Delivery',
  },
  {
    id: 'institutional',
    tabLabel: 'Institutional Projects',
    title: 'Institutional Projects',
    subtitle: 'Schools, colleges and training networks',
    desc: 'Work together on campus websites, admission tracking systems, fee automation and student portals.',
    partnerOwns: 'Institutional relationships and coordination',
    algoforceOwns: 'Admission systems, portals and billing workflows',
    benefits: [
      'Enquiry and admission CRM systems',
      'Student and parent web portals',
      'Fee tracking and digital receipt workflows',
      'Staff onboarding and ongoing support',
    ],
    icon: Users,
    badge: 'Education Delivery',
  },
  {
    id: 'reseller-referral',
    tabLabel: 'Referral Partnerships',
    title: 'Referral Partnerships',
    subtitle: 'Structured introduction terms',
    desc: 'Introduce organizations needing custom software or integrations while AlgoForce handles scoping and execution.',
    partnerOwns: 'Client introduction and context',
    algoforceOwns: 'Proposal, software build and support',
    benefits: [
      'Transparent referral agreement terms',
      'Prompt scoping and clear estimates',
      'AlgoForce handles technical delivery directly',
      'Regular milestone status updates',
    ],
    icon: Share2,
    badge: 'Referral Terms',
  },
]

const PartnershipEcosystemSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const [activeTab, setActiveTab] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const current = PARTNERSHIP_MODELS[activeTab]
  const CurrentIcon = current.icon

  return (
    <div ref={ref}>
      <SectionCanvas outerClassName="bg-white py-5 sm:py-7">
        <SectionHeader
          badge="Partnerships"
          titlePrimary="Work With AlgoForce"
          titleMuted="Technical delivery for partner firms."
          description="Partner with our engineering team for software development, automation and technical delivery."
          inView={inView}
        />

        {/* Partner Model Pill Tabs */}
        <div className="flex items-center justify-center mb-8 overflow-x-auto pb-2 scrollbar-hide max-w-full">
          <div className="inline-flex p-1.5 rounded-2xl saas-tab-tray gap-1.5">
            {PARTNERSHIP_MODELS.map((item, idx) => {
              const Icon = item.icon
              const isActive = activeTab === idx
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0A2A43] text-white shadow-[0_8px_18px_-6px_rgba(10,42,67,0.38)] -translate-y-0.5'
                      : 'text-slate-600 hover:text-[#0A2A43] hover:bg-white/70'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-white' : 'text-slate-500'} />
                  <span>{item.tabLabel}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Active Co-Delivery Architecture Card */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[26px] bg-white border border-[#dce3ec] p-6 sm:p-9 lg:p-10 saas-card-elevation"
            >
              <FolderTabEar />

              {/* Role Split Visual Diagram */}
              <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center p-4 rounded-2xl bg-[#f8f9fb] border border-[#e5eaf2] mb-8">
                <div className="md:col-span-5 p-3.5 rounded-xl bg-white border border-[#e3e8f0] shadow-2xs">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-[#6E7B8C] font-semibold mb-1">
                    Your Organization Owns
                  </span>
                  <div className="text-xs sm:text-[13px] font-semibold text-[#0A2A43]">
                    {current.partnerOwns}
                  </div>
                </div>

                <div className="md:col-span-1 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#0A2A43] text-white flex items-center justify-center shadow-xs">
                    <ArrowLeftRight size={13} className="rotate-90 md:rotate-0" />
                  </div>
                </div>

                <div className="md:col-span-5 p-3.5 rounded-xl bg-white border border-[#bfdbfe] shadow-2xs">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-[#2563EB] font-semibold mb-1">
                    AlgoForce Delivers
                  </span>
                  <div className="text-xs sm:text-[13px] font-semibold text-[#0A2A43]">
                    {current.algoforceOwns}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Model Narrative */}
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#f8f9fb] border border-[#e2e8f0] text-[11px] font-mono font-semibold text-[#0A2A43] mb-3.5">
                    <CurrentIcon size={13} className="text-[#9A4DFF]" />
                    <span>{current.badge}</span>
                  </div>

                  <h3 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl font-semibold text-[#0A2A43] mb-1.5 tracking-tight">
                    {current.title}
                  </h3>
                  <p className="text-xs font-medium text-[#6E7B8C] mb-4">{current.subtitle}</p>
                  <p className="text-sm text-[#4A5769] leading-[1.65] font-normal mb-6">
                    {current.desc}
                  </p>

                  <Link
                    to="/partnerships"
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#0A2A43] hover:bg-[#113D61] text-white rounded-xl text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-2 transition-all shadow-[0_10px_22px_-6px_rgba(10,42,67,0.34)] hover:-translate-y-0.5"
                  >
                    <span>Explore {current.tabLabel} Terms</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Right Collaboration Guarantees Card */}
                <div className="lg:col-span-5 bg-[#f8f9fb] p-5 sm:p-6 rounded-2xl border border-[#e4e9f0]">
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#0A2A43] mb-3.5">
                    Collaboration Safeguards
                  </div>

                  <div className="space-y-2.5">
                    {current.benefits.map((b) => (
                      <div
                        key={b}
                        className="flex items-start gap-2.5 text-xs text-[#0A2A43] p-3 rounded-xl bg-white border border-[#e6ebf2] shadow-[0_2px_6px_-2px_rgba(10,42,67,0.04)] font-medium leading-snug"
                      >
                        <span className="w-4 h-4 rounded-md bg-blue-50 border border-blue-100 text-[#2563EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={10} strokeWidth={2.5} />
                        </span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </SectionCanvas>
    </div>
  )
}

export default PartnershipEcosystemSection
