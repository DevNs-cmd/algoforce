import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  Compass,
  Code2,
  Cpu,
  Layers,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Check,
  Workflow,
} from 'lucide-react'
import { SectionHeader, FolderTabEar } from './sectionPrimitives'

const DIVISIONS = [
  {
    num: '01',
    id: 'consulting',
    title: 'Technology Consulting',
    subtitle: 'Architecture & Planning',
    description:
      'Architecture, audits and technology planning.',
    capabilities: [
      'Technology and workflow audits',
      'System architecture and database design',
      'Legacy software modernization plans',
      'Build versus buy tool reviews',
      'Phased project scoping and milestones',
    ],
    pairsWith: ['Software Engineering', 'Enterprise Solutions'],
    deliverableHighlight: 'Clear system architecture and practical build plan',
    link: '/services#consulting',
    icon: Compass,
    accent: 'text-[#2563EB] bg-blue-50 border-blue-100',
  },
  {
    num: '02',
    id: 'engineering',
    title: 'Software Engineering',
    subtitle: 'Web, Mobile & APIs',
    description:
      'Custom web, mobile and business applications.',
    capabilities: [
      'Custom business web applications and portals',
      'Android and iOS mobile apps',
      'Backend APIs and cloud hosting setup',
      'Database modeling and optimization',
      'Updates to existing web platforms',
    ],
    pairsWith: ['Technology Consulting', 'Managed Services'],
    deliverableHighlight: 'Maintainable software tailored to daily workflows',
    link: '/services#engineering',
    icon: Code2,
    accent: 'text-[#0A2A43] bg-slate-100 border-slate-200',
  },
  {
    num: '03',
    id: 'ai-automation',
    title: 'AI & Automation',
    subtitle: 'Workflows & Practical AI',
    description:
      'Workflow automation and practical AI integration.',
    capabilities: [
      'Invoice and form document extraction',
      'Automated cross-system approval workflows',
      'Natural-language querying for internal data',
      'Task assistants integrated with existing tools',
      'Private VPC setup for data control',
    ],
    pairsWith: ['Enterprise Solutions', 'Products & R&D'],
    deliverableHighlight: 'Targeted automation reducing manual data entry',
    link: '/services#ai-automation',
    icon: Cpu,
    accent: 'text-[#9A4DFF] bg-purple-50 border-purple-100',
  },
  {
    num: '04',
    id: 'enterprise',
    title: 'Enterprise Solutions',
    subtitle: 'ERP, CRM & Integrations',
    description:
      'ERP, CRM and business system integration.',
    capabilities: [
      'Tally Prime and Tally ERP 9 connectors',
      'SAP and custom API data bridges',
      'CRM lead routing and status updates',
      'Reporting and management dashboards',
      'Multi-department internal platforms',
    ],
    pairsWith: ['AI & Automation', 'Managed Services'],
    deliverableHighlight: 'Connected business applications with reliable data sync',
    link: '/services#enterprise',
    icon: Layers,
    accent: 'text-[#2563EB] bg-blue-50 border-blue-100',
  },
  {
    num: '05',
    id: 'managed-services',
    title: 'Managed Services',
    subtitle: 'Maintenance & Support',
    description:
      'Software maintenance, monitoring and support.',
    capabilities: [
      'System health monitoring and alerts',
      'Scheduled bug fixes and code updates',
      'Security patches and cloud backups',
      'Server performance checks and tuning',
      'Continued technical support as needs evolve',
    ],
    pairsWith: ['Software Engineering', 'Enterprise Solutions'],
    deliverableHighlight: 'Dependable ongoing maintenance and technical care',
    link: '/services#managed-services',
    icon: ShieldCheck,
    accent: 'text-[#0A2A43] bg-slate-100 border-slate-200',
  },
  {
    num: '06',
    id: 'products-rnd',
    title: 'Products & R&D',
    subtitle: 'Proprietary Software',
    description:
      'Proprietary software and engineering tools.',
    capabilities: [
      'TallyGPT for accounting queries and reconciliation',
      'FactoryGPT for shop-floor activity logging',
      'CiteRank GEO for AI visibility audits',
      'Reusable API and ERP connector modules',
      'Internal scaffolds accelerating client projects',
    ],
    pairsWith: ['AI & Automation', 'Software Engineering'],
    deliverableHighlight: 'Focused software platforms built from field experience',
    link: '/products',
    icon: Sparkles,
    accent: 'text-[#9A4DFF] bg-purple-50 border-purple-100',
  },
]

const SixDivisions = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const [selectedIdx, setSelectedIdx] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const activeDiv = DIVISIONS[selectedIdx]
  const ActiveIcon = activeDiv.icon

  return (
    <section ref={ref} id="capabilities" className="py-16 sm:py-24 bg-white text-[#0A2A43] relative overflow-x-clip">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            badge="Core Divisions"
            titlePrimary="What We Do"
            titleMuted="Six technology practices. One partner."
            description="Plan, build and maintain software through six connected engineering practices under one team."
            inView={inView}
          />

          {/* Interactive Connected Pipeline Stepper */}
          <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide max-w-full">
            <div className="relative flex items-center justify-between min-w-[680px] p-2 rounded-2xl saas-tab-tray gap-1.5">
              {DIVISIONS.map((div, idx) => {
                const Icon = div.icon
                const isSelected = selectedIdx === idx
                return (
                  <button
                    key={div.id}
                    type="button"
                    onClick={() => setSelectedIdx(idx)}
                    className={`flex-1 flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                      isSelected
                        ? 'bg-white text-[#0A2A43] border border-[#dce3ec] shadow-[0_8px_18px_-6px_rgba(10,42,67,0.16)] -translate-y-0.5'
                        : 'text-[#5A6678] hover:text-[#0A2A43] hover:bg-white/60'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0 ${isSelected ? div.accent : 'bg-white/80 border-slate-200 text-slate-500'}`}>
                      <Icon size={13} />
                    </span>
                    <div className="min-w-0">
                      <span className="block font-mono text-[9.5px] font-bold text-[#6E7B8C] leading-none mb-0.5">
                        {div.num}
                      </span>
                      <span className="block text-[11.5px] font-semibold truncate">
                        {div.title.split('&')[0].trim()}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Layered Architectural Spotlight Card */}
          <div className="relative mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIdx}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-[28px] sm:rounded-[32px] border border-[#e3e8f0] saas-canvas p-6 sm:p-9 lg:p-11 saas-card-elevation overflow-hidden"
              >
                <div className="saas-dot-matrix absolute inset-0 pointer-events-none" aria-hidden="true" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Division Deep Dive Paper Surface */}
                  <div className="lg:col-span-7 relative rounded-[22px] bg-white border border-[#e2e8f0] p-6 sm:p-8 shadow-[0_14px_34px_-12px_rgba(10,42,67,0.1)]">
                    <FolderTabEar />

                    {/* Overlapping Floating Icon Squircle on upper right edge */}
                    <div
                      className="hidden sm:flex absolute -top-4 right-6 w-11 h-11 rounded-2xl bg-white border border-[#e2e8f0] saas-squircle-badge items-center justify-center rotate-6"
                      aria-hidden="true"
                    >
                      <ActiveIcon size={19} className="text-[#0A2A43]" />
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <span className={`text-[10.5px] font-mono font-semibold px-2.5 py-0.5 rounded-md border ${activeDiv.accent}`}>
                        Division {activeDiv.num}
                      </span>
                      <span className="text-xs font-medium text-[#6E7B8C]">
                        {activeDiv.subtitle}
                      </span>
                    </div>

                    <h3 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl font-semibold text-[#0A2A43] tracking-tight mb-3">
                      {activeDiv.title}
                    </h3>

                    <p className="text-sm text-[#4A5769] leading-[1.65] font-normal mb-6">
                      {activeDiv.description}
                    </p>

                    <div className="pt-5 border-t border-slate-100">
                      <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#6E7B8C] mb-3">
                        Engineering Deliverables &amp; Scope
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {activeDiv.capabilities.map((c) => (
                          <div
                            key={c}
                            className="flex items-start gap-2 text-xs text-[#0A2A43] p-2.5 rounded-xl bg-[#f8f9fb] border border-[#e6ebf2] font-medium leading-snug"
                          >
                            <span className="w-4 h-4 rounded-md bg-white border border-[#dce3ec] text-[#2563EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check size={10} strokeWidth={2.5} />
                            </span>
                            <span>{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Connected Ecosystem Pane + Action */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full gap-5">
                    {/* Outcome Paper Note Card */}
                    <div className="relative rounded-[22px] bg-white border border-[#e2e8f0] p-6 shadow-[0_12px_30px_-10px_rgba(10,42,67,0.09)] lg:rotate-[1deg]">
                      <div className="hidden sm:flex justify-center -mt-8 mb-3" aria-hidden="true">
                        <span className="w-3.5 h-3.5 rounded-full saas-pin ring-2 ring-white" />
                      </div>
                      <span className="block text-[10.5px] font-mono uppercase tracking-wider text-[#6E7B8C] mb-1.5">
                        Target Engagement Outcome
                      </span>
                      <div className="text-base font-semibold text-[#0A2A43] leading-snug">
                        {activeDiv.deliverableHighlight}
                      </div>
                    </div>

                    {/* Connected Sibling Practices Box */}
                    <div className="rounded-[22px] bg-white/90 border border-[#e2e8f0] p-6 shadow-[0_10px_28px_-12px_rgba(10,42,67,0.08)]">
                      <div className="flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#0A2A43] mb-3">
                        <Workflow size={13} className="text-[#2563EB]" />
                        <span>Commonly Combines With</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {activeDiv.pairsWith.map((sibling) => (
                          <button
                            key={sibling}
                            type="button"
                            onClick={() => {
                              const match = DIVISIONS.findIndex((d) => d.title.includes(sibling) || sibling.includes(d.title.split('&')[0].trim()))
                              if (match >= 0) setSelectedIdx(match)
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#f8f9fb] hover:bg-white border border-[#dce3ec] text-xs font-medium text-[#0A2A43] transition-all hover:-translate-y-0.5 shadow-2xs"
                          >
                            + {sibling}
                          </button>
                        ))}
                      </div>

                      <Link
                        to={activeDiv.link}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#0A2A43] hover:bg-[#113D61] text-white text-xs sm:text-sm font-medium shadow-[0_10px_22px_-6px_rgba(10,42,67,0.34)] hover:-translate-y-0.5 transition-all"
                      >
                        <span>Explore {activeDiv.title}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Multi-Division Callout Banner */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#f8f9fb] border border-[#e3e8f0] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center md:text-left">
              <div className="hidden sm:flex w-10 h-10 rounded-xl bg-white border border-[#e2e8f0] text-[#0A2A43] items-center justify-center flex-shrink-0 shadow-xs">
                <Workflow size={18} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#0A2A43]">
                  Need multiple services under one engagement?
                </h4>
                <p className="text-xs text-[#5A6678]">
                  We combine architecture, software build, integration and support in one team.
                </p>
              </div>
            </div>
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-white hover:bg-slate-50 text-[#0A2A43] border border-[#dce3ec] rounded-xl font-medium text-xs whitespace-nowrap transition-all shadow-xs hover:-translate-y-0.5"
            >
              Discuss Your Architecture →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SixDivisions
