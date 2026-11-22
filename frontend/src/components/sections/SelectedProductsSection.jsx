import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { ArrowRight, Database, Factory, Globe, Cpu, CheckCircle2, ChevronRight } from 'lucide-react'

const PRODUCTS = [
  {
    id: 'tallygpt',
    tabLabel: 'TallyGPT Finance AI',
    name: 'TallyGPT Finance AI',
    badge: 'Finance & Accounting Automation',
    status: 'Ready for Demonstration',
    statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    icon: Database,
    targetAudience: 'Finance Directors, CFOs, Accounting Teams & Business Owners using Tally Prime / ERP 9',
    problem:
      'Manual bank reconciliations, delayed voucher entry, and slow ledger querying waste countless accounting hours and introduce human ledger discrepancies.',
    whatItDoes:
      'Connects securely to your local or cloud Tally database to enable natural language ledger queries, automated bank reconciliation, and automated invoice voucher mapping without modifying existing accounting workflows.',
    features: [
      'Natural language financial queries against live Tally ledgers',
      'Bank statement OCR and reconciliation matching automation',
      'Automated sales/purchase voucher drafting with approval checkpoints',
      'Runs on local infrastructure or private VPC (Zero external data sharing)'
    ],
    ctaText: 'Request TallyGPT Demonstration',
    link: '/contact?interest=tallygpt&type=demo'
  },
  {
    id: 'factorygpt',
    tabLabel: 'FactoryGPT',
    name: 'FactoryGPT',
    badge: 'Industrial Operations Intelligence',
    status: 'Active Client Deployment',
    statusColor: 'bg-blue-50 text-blue-800 border-blue-200',
    icon: Factory,
    targetAudience: 'Plant Managers, Quality Heads & Operations Directors in Manufacturing & Fabrication',
    problem:
      'Shop-floor tracking often relies on end-of-shift paper logs or siloed spreadsheets, creating blind spots in production downtime, scrap rates, and actual yields.',
    whatItDoes:
      'A modular shop-floor event capture and visibility system that logs machine run-time, worker station events, and quality inspection anomalies, feeding live metrics directly to plant management dashboards.',
    features: [
      'Digital line-event, machine status and shift handover logging',
      'Real-time machine downtime reason tracking and categorization',
      'Quality checklist capture with visual proofing on tablet',
      'Direct sync with central inventory and dispatch databases'
    ],
    ctaText: 'Request FactoryGPT Demonstration',
    link: '/contact?interest=factorygpt&type=demo'
  },
  {
    id: 'citerank',
    tabLabel: 'CiteRank GEO',
    name: 'CiteRank GEO',
    badge: 'Search & Generative Engine Visibility',
    status: 'Active Proprietary Platform',
    statusColor: 'bg-purple-50 text-purple-900 border-purple-200',
    icon: Globe,
    targetAudience: 'B2B Brands, Professional Firms & Enterprise Marketing/Growth Leaders',
    problem:
      'Traditional SEO only tracks Google links. As buyers increasingly use ChatGPT, Perplexity, and Claude for vendor discovery, brands remain completely invisible in AI answers.',
    whatItDoes:
      'A specialized Generative Engine Optimization (GEO) platform that analyzes how AI models cite, perceive, and rank your brand across industry queries, providing actionable optimization recommendations.',
    features: [
      'Cross-LLM citation and sentiment tracking (OpenAI, Anthropic, Perplexity)',
      'Entity authority and structured knowledge graph audits',
      'Competitive presence benchmarks in AI answer citations',
      'Content architecture blueprints for generative indexing'
    ],
    ctaText: 'Enquire About CiteRank GEO',
    link: '/contact?interest=citerank&type=demo'
  },
  {
    id: 'crucible',
    tabLabel: 'Crucible Engineering R&D',
    name: 'Crucible Developer Sandbox & R&D',
    badge: 'Internal Engineering Accelerators',
    status: 'Internal R&D Initiative',
    statusColor: 'bg-slate-100 text-slate-800 border-slate-200',
    icon: Cpu,
    targetAudience: 'Partner Engineering Teams & Technical Evaluators',
    problem:
      'Custom enterprise software projects frequently stall on recurring scaffolding, auth, agent orchestrations, and integration middleware.',
    whatItDoes:
      'Our internal engineering toolkit and accelerator repository. Contains pre-tested microservices, multi-model LLM orchestrators, and enterprise connectors that enable our engineers to deliver client systems 2x faster.',
    features: [
      'Standardized enterprise authentication & RBAC scaffolds',
      'Resilient webhook and ERP connector libraries',
      'Agentic workflow execution runtime and sandbox',
      'Used internally to de-risk and accelerate client delivery'
    ],
    ctaText: 'Explore Engineering Capabilities',
    link: '/services'
  }
]

const SelectedProductsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const [activeTab, setActiveTab] = useState(0)

  const current = PRODUCTS[activeTab]
  const CurrentIcon = current.icon

  return (
    <section ref={ref} id="products" className="py-16 md:py-24 bg-white text-slate-900 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 max-w-3xl mx-auto"
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#092941] bg-slate-100 border border-slate-200 px-4 py-1.5 rounded-full mb-3.5 shadow-2xs">
            Proprietary Products & Engineering Accelerators
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-[#092941] mb-4">
            Verified Technology &{' '}
            <span className="font-serif italic font-normal text-purple-900">
              Software Solutions.
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            In addition to custom client engineering, AlgoForce develops purpose-built software products to solve specific operational bottlenecks. Select any product to inspect its readiness.
          </p>
        </motion.div>

        {/* 3D Tactile Tab Switcher */}
        <div className="flex items-center justify-center mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <div className="inline-flex p-2 rounded-2xl bg-gradient-to-b from-slate-200/90 to-slate-300/80 border-t border-t-white/80 border-b-2 border-b-slate-400/50 border-x border-slate-300/90 shadow-[inset_0_3px_8px_rgba(9,41,65,0.12),inset_0_1px_2px_rgba(0,0,0,0.08),0_2px_4px_rgba(255,255,255,0.9)] backdrop-blur-md">
            {PRODUCTS.map((prod, idx) => {
              const Icon = prod.icon
              const isActive = activeTab === idx
              return (
                <button
                  key={prod.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-b from-[#12395b] to-[#092941] text-white shadow-[0_8px_20px_rgba(9,41,65,0.38),0_2px_6px_rgba(9,41,65,0.2),inset_0_1px_1px_rgba(255,255,255,0.35)] border-t border-t-white/30 border-b-2 border-b-[#051724] -translate-y-0.5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 active:translate-y-0'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-white' : 'text-slate-500'} />
                  <span>{prod.tabLabel}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 3D Elevated Sliding Product Spotlight Card */}
        <div className="max-w-5xl mx-auto mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.99 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-3xl bg-gradient-to-b from-white via-white to-slate-50 border-t-2 border-t-white border-b-4 border-b-slate-300/90 border-x border-slate-200/90 shadow-[0_24px_55px_-6px_rgba(9,41,65,0.18),0_12px_24px_-6px_rgba(9,41,65,0.12),0_0_0_1px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_2px_rgba(9,41,65,0.03)] p-6 sm:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Product Info */}
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className={`text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-md border ${current.statusColor} font-bold uppercase shadow-2xs`}>
                      {current.status}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {current.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#092941] mb-3">
                    {current.name}
                  </h3>

                  <div className="p-3.5 rounded-xl bg-white border-t border-t-white border-b-2 border-b-slate-200 border-x border-slate-200/90 mb-4 shadow-[0_4px_10px_rgba(9,41,65,0.04),inset_0_1px_0_rgba(255,255,255,1)]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-0.5">
                      Target Audience:
                    </span>
                    <p className="text-xs text-slate-700 font-normal leading-relaxed">
                      {current.targetAudience}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {current.whatItDoes}
                  </p>

                  <div className="flex items-center gap-4">
                    <Link to={current.link}>
                      <button className="px-6 py-3.5 bg-gradient-to-b from-[#12395b] to-[#092941] hover:from-[#0d2d48] hover:to-[#071f32] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all border-t border-t-white/30 border-b-2 border-b-[#051724] shadow-[0_10px_22px_rgba(9,41,65,0.32),0_2px_4px_rgba(9,41,65,0.2),inset_0_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:translate-y-0">
                        <span>{current.ctaText}</span>
                        <ArrowRight size={14} />
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Right: Key Features Panel (Layered 3D Sub-card) */}
                <div className="lg:col-span-5 bg-gradient-to-b from-white to-slate-50/90 p-6 rounded-2xl border-t-2 border-t-white border-b-3 border-b-slate-300 border-x border-slate-200 shadow-[0_14px_30px_-4px_rgba(9,41,65,0.12),0_4px_10px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1)]">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#092941] mb-4">
                    Key Features & Technical Scope:
                  </div>

                  <div className="space-y-3">
                    {current.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-3 rounded-xl border-t border-t-white border-b-2 border-b-slate-200 border-x border-slate-200/90 shadow-[0_4px_10px_rgba(9,41,65,0.05),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(9,41,65,0.08)] transition-all">
                        <CheckCircle2 size={15} className="text-[#092941] mt-0.5 flex-shrink-0" />
                        <span className="font-semibold leading-snug">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View all products link */}
        <div className="text-center">
          <Link
            to="/products"
            className="text-xs font-semibold text-slate-600 hover:text-[#092941] transition-colors inline-flex items-center gap-1.5"
          >
            <span>View complete product portfolio & technical readiness details</span>
            <ChevronRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SelectedProductsSection
