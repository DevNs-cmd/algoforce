import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  Workflow
} from 'lucide-react'

const DIVISIONS = [
  {
    num: '01',
    id: 'consulting',
    title: 'Technology Consulting',
    subtitle: 'Strategic Advisory & Architecture',
    description:
      'We assess your current technology landscape, identify operational constraints, formulate realistic digital roadmaps, and architect resilient software solutions before writing code.',
    capabilities: [
      'Technology & Process Assessment',
      'Solution & System Architecture Blueprints',
      'Digital Transformation Strategy & Scoping',
      'Technical Due Diligence & Codebase Audits',
      'Cloud & Infrastructure Modernization Planning'
    ],
    deliverableHighlight: 'Architectural Blueprint & Cost-Optimized Roadmap',
    link: '/services#consulting',
    icon: Compass,
  },
  {
    num: '02',
    id: 'engineering',
    title: 'Software & Digital Engineering',
    subtitle: 'Full-Stack Custom Development',
    description:
      'End-to-end engineering of modern web applications, high-performance mobile apps, robust APIs, and distributed cloud backends built for high concurrency, security, and long-term maintainability.',
    capabilities: [
      'Custom Enterprise Web Apps & Client Portals',
      'Native & Cross-Platform Mobile Applications',
      'REST & GraphQL Microservices Architecture',
      'Cloud Engineering (AWS, GCP, Azure Environments)',
      'Legacy Code Modernization & Database Optimization'
    ],
    deliverableHighlight: 'Scalable Production Codebases & Automated CI/CD',
    link: '/services#engineering',
    icon: Code2,
  },
  {
    num: '03',
    id: 'ai-automation',
    title: 'AI & Intelligent Automation',
    subtitle: 'Production-Grade AI & Systems',
    description:
      'We design practical AI systems grounded in your enterprise data. From LLM agents and multi-system automation to intelligent document processing and operational copilots that eliminate repetitive manual effort.',
    capabilities: [
      'Custom Enterprise LLM & Agent Pipelines',
      'Multi-System Workflow & Approval Automation',
      'Intelligent OCR & Document Extraction Engines',
      'Conversational Querying for Databases & ERPs',
      'Private Infrastructure & VPC AI Deployments'
    ],
    deliverableHighlight: 'Validated AI Automations Grounded in Your Data',
    link: '/services#ai-automation',
    icon: Cpu,
  },
  {
    num: '04',
    id: 'enterprise',
    title: 'Enterprise & Industry Solutions',
    subtitle: 'System Integrations & Operations',
    description:
      'Connecting your core business systems into a unified operational fabric. We integrate ERPs (Tally, SAP), CRMs (Zoho, Salesforce), logistics platforms, and custom operational databases without disrupting existing operations.',
    capabilities: [
      'Tally Prime & Tally ERP 9 Automated Sync Connectors',
      'SAP Enterprise Data Pipelines & Gateway Bridges',
      'CRM Pipeline & Lead Routing Automation',
      'Custom Plant & Executive Operational Dashboards',
      'Campus & Institutional Enterprise Systems'
    ],
    deliverableHighlight: 'Zero-Disruption Middleware & Central Dashboards',
    link: '/services#enterprise',
    icon: Layers,
  },
  {
    num: '05',
    id: 'managed-services',
    title: 'Managed Technology Services',
    subtitle: 'Continuous Support & 24/7 SLAs',
    description:
      'Technology requires ongoing stewardship. We provide managed maintenance, continuous monitoring, performance tuning, proactive security patching, and dedicated SLA-backed engineering support.',
    capabilities: [
      '24/7 Proactive Server & System Monitoring',
      'SLA-Backed Bug Fixing & Dedicated Incident Support',
      'Continuous Security Patches & Scheduled Backups',
      'Cloud Cost Optimization & Performance Tuning',
      'Iterative Feature Enhancements & Version Upgrades'
    ],
    deliverableHighlight: 'Guaranteed Uptime SLAs & Active Engineering Support',
    link: '/services#managed-services',
    icon: ShieldCheck,
  },
  {
    num: '06',
    id: 'products-rnd',
    title: 'Products, Platforms & R&D',
    subtitle: 'Proprietary IP & Accelerators',
    description:
      'Our dedicated research and internal engineering teams develop reusable technology platforms, proprietary products like TallyGPT and FactoryGPT, and developer tooling that accelerate client time-to-market.',
    capabilities: [
      'TallyGPT (Conversational Accounting & Reconciliations)',
      'FactoryGPT (Shop-Floor Operational Intelligence)',
      'CiteRank GEO (Generative Engine Optimization)',
      'Reusable Middleware & Integration Scaffolds',
      'Internal Engineering Accelerators for Rapid Delivery'
    ],
    deliverableHighlight: 'Tested Proprietary Accelerators & Deployable IP',
    link: '/products',
    icon: Sparkles,
  }
]

const SixDivisions = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const [selectedIdx, setSelectedIdx] = useState(0)

  const activeDiv = DIVISIONS[selectedIdx]
  const ActiveIcon = activeDiv.icon

  return (
    <section ref={ref} id="capabilities" className="py-16 md:py-24 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#0A2A43] bg-slate-100 border border-slate-200 px-4 py-1.5 rounded-full mb-3.5 shadow-2xs">
            <span>Six Core Technology Divisions • One Technology Partner</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-[#0A2A43] mb-4">
            Everything Required to Turn{' '}
            <span className="font-serif italic font-normal text-purple-900">
              Requirements into Reality.
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Select any division to explore its core offerings, engineering architecture, and tangible deliverables.
          </p>
        </motion.div>

        {/* 3D Elevated Interactive Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-10 max-w-6xl mx-auto">
          {/* Left: 6 Division Pills — Horizontal swipeable track on mobile, vertical stack on desktop */}
          <div className="lg:col-span-4 flex lg:flex-col gap-2.5 overflow-x-auto pb-2.5 lg:pb-0 scrollbar-hide max-w-full">
            {DIVISIONS.map((div, idx) => {
              const Icon = div.icon
              const isSelected = selectedIdx === idx
              return (
                <button
                  key={div.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`min-w-[220px] sm:min-w-[240px] lg:min-w-0 flex-shrink-0 lg:flex-shrink flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#12395b] to-[#092941] border-t border-t-white/30 border-b-2 border-b-[#051724] border-x border-[#092941] text-white shadow-[0_10px_24px_rgba(9,41,65,0.35),0_2px_4px_rgba(9,41,65,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)] -translate-y-0.5'
                      : 'bg-white border-t border-t-white border-b-2 border-b-slate-200 border-x border-slate-200/90 text-slate-700 shadow-[0_4px_10px_rgba(9,41,65,0.04),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(9,41,65,0.08)] hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors shadow-xs ${
                        isSelected ? 'bg-white/15 text-white border border-white/20' : 'bg-slate-50 text-[#092941] border border-slate-200'
                      }`}
                    >
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">
                        {div.title}
                      </div>
                      <div className={`text-[10px] leading-tight ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {div.subtitle}
                      </div>
                    </div>
                  </div>
                  <span className={`text-[11px] font-mono font-bold ${isSelected ? 'text-purple-300' : 'text-slate-400'}`}>
                    {div.num}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Right: 3D Elevated Sliding Spotlight Card */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIdx}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="h-full flex flex-col justify-between rounded-3xl bg-gradient-to-b from-white via-white to-slate-50 border-t-2 border-t-white border-b-4 border-b-slate-300/90 border-x border-slate-200/90 shadow-[0_24px_55px_-6px_rgba(9,41,65,0.18),0_12px_24px_-6px_rgba(9,41,65,0.12),0_0_0_1px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_2px_rgba(9,41,65,0.03)] p-6 sm:p-9"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0A2A43] shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
                        <ActiveIcon size={22} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-purple-900 font-bold block">
                          Division {activeDiv.num}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#0A2A43]">
                          {activeDiv.title}
                        </h3>
                      </div>
                    </div>

                    <span className="hidden sm:inline text-xs font-mono px-3 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                      {activeDiv.subtitle}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {activeDiv.description}
                  </p>

                  <div className="mb-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0A2A43] mb-3">
                      Engineering Deliverables & Scope:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeDiv.capabilities.map((c, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 p-3 rounded-xl bg-white border border-slate-200/90 shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 transition-transform">
                          <Check size={14} className="text-[#0A2A43] mt-0.5 flex-shrink-0" />
                          <span className="font-semibold leading-snug">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 font-medium">
                    Core Guarantee: <span className="text-slate-800 font-bold">{activeDiv.deliverableHighlight}</span>
                  </div>

                  <Link to={activeDiv.link}>
                    <button className="px-5 py-2.5 bg-[#0A2A43] hover:bg-[#071f32] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-[0_6px_16px_rgba(10,42,67,0.2)] hover:-translate-y-0.5 active:translate-y-0">
                      <span>Explore {activeDiv.title} Details</span>
                      <ArrowRight size={14} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Integration Callout in 3D Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-50 via-white to-slate-50 border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0A2A43] flex items-center justify-center flex-shrink-0 shadow-2xs">
              <Workflow size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0A2A43]">
                Need multi-division collaboration?
              </h4>
              <p className="text-xs text-slate-600">
                Most client engagements combine consulting, custom software engineering, and managed operations under one contract.
              </p>
            </div>
          </div>
          <Link to="/contact">
            <button className="px-5 py-2.5 bg-[#0A2A43] hover:bg-[#071f32] text-white rounded-xl font-semibold text-xs whitespace-nowrap transition-all shadow-xs">
              Discuss Your Architecture →
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SixDivisions
