import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { ArrowRight, Database, Factory, Globe, Cpu, Check, ChevronRight, Lock, Terminal } from 'lucide-react'
import { SectionCanvas, SectionHeader, FolderTabEar } from './sectionPrimitives'

const PRODUCTS = [
  {
    id: 'tallygpt',
    tabLabel: 'TallyGPT Finance AI',
    name: 'TallyGPT Finance AI',
    badge: 'Accounting Automation',
    status: 'Ready for Demonstration',
    statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    icon: Database,
    targetAudience: 'Finance teams and business owners using Tally Prime or Tally ERP 9.',
    whatItDoes:
      'Connects directly to Tally for plain-English ledger questions, bank statement matching and draft voucher entry.',
    features: [
      'Plain-English queries over live Tally ledgers',
      'Automated bank statement matching and checks',
      'Voucher drafting with staff approval step',
      'Local server or private cloud installation',
    ],
    ctaText: 'Request TallyGPT Demo',
    link: '/contact?interest=tallygpt&type=demo',
    preview: {
      windowTitle: 'TallyGPT • Accounting Assistant',
      tag: 'Local / Private Cloud',
      queryExample: 'Match pending bank credits against open party invoices',
      modules: [
        { name: 'Tally Prime Sync', state: 'Ledger Connector' },
        { name: 'Bank Reconciliation', state: 'Draft Match' },
        { name: 'Voucher Review', state: 'Approval Step' },
      ],
    },
  },
  {
    id: 'factorygpt',
    tabLabel: 'FactoryGPT',
    name: 'FactoryGPT',
    badge: 'Manufacturing Operations',
    status: 'Active Client Deployment',
    statusColor: 'bg-blue-50 text-[#2563EB] border-blue-200',
    icon: Factory,
    targetAudience: 'Plant managers, quality teams and manufacturing supervisors.',
    whatItDoes:
      'Captures shift runs, machine downtime and quality checks from factory tablets into central reports.',
    features: [
      'Digital machine runs and shift log capture',
      'Downtime reason tracking from plant terminals',
      'Photo-backed quality checklists before dispatch',
      'Syncs output with inventory records',
    ],
    ctaText: 'Request FactoryGPT Demo',
    link: '/contact?interest=factorygpt&type=demo',
    preview: {
      windowTitle: 'FactoryGPT • Shop-Floor Log',
      tag: 'Plant Tablet App',
      queryExample: 'Record shift output, downtime causes and dispatch approvals',
      modules: [
        { name: 'Shift Activity Log', state: 'Tablet Input' },
        { name: 'Quality Checklist', state: 'Inspection Record' },
        { name: 'Inventory Sync', state: 'Stock Update' },
      ],
    },
  },
  {
    id: 'citerank',
    tabLabel: 'CiteRank GEO',
    name: 'CiteRank GEO',
    badge: 'AI Search Visibility',
    status: 'Active Proprietary Platform',
    statusColor: 'bg-purple-50 text-purple-900 border-purple-200',
    icon: Globe,
    targetAudience: 'B2B firms tracking company visibility across AI answer tools.',
    whatItDoes:
      'Audits how ChatGPT, Claude and Perplexity cite and describe your company across buyer questions.',
    features: [
      'Citation tracking across OpenAI, Claude and Perplexity',
      'Company profile and structured entity audits',
      'Side-by-side competitor citation comparisons',
      'Actionable content structure fixes',
    ],
    ctaText: 'Enquire About CiteRank GEO',
    link: '/contact?interest=citerank&type=demo',
    preview: {
      windowTitle: 'CiteRank • AI Citation Audit',
      tag: 'Multi-Model Checks',
      queryExample: 'Check how public AI assistants cite our core services',
      modules: [
        { name: 'Citation Tracker', state: 'Cross-LLM Check' },
        { name: 'Entity Schema Check', state: 'Structure Audit' },
        { name: 'Visibility Report', state: 'Fix Checklist' },
      ],
    },
  },
  {
    id: 'crucible',
    tabLabel: 'Crucible R&D',
    name: 'Crucible Engineering Sandbox',
    badge: 'Engineering Tools',
    status: 'Internal R&D Initiative',
    statusColor: 'bg-slate-100 text-slate-800 border-slate-200',
    icon: Cpu,
    targetAudience: 'AlgoForce engineering teams and delivery partners.',
    whatItDoes:
      'Internal software templates, authentication modules and ERP connectors reused across custom client projects.',
    features: [
      'Role-based login and user permission templates',
      'Reliable webhook and ERP sync adapters',
      'Workflow automation runtime and test harness',
      'Used internally across custom software projects',
    ],
    ctaText: 'Explore Custom Services',
    link: '/services',
    preview: {
      windowTitle: 'Crucible • Shared Modules',
      tag: 'Internal Toolkit',
      queryExample: 'Reusable login, webhook and integration building blocks',
      modules: [
        { name: 'User Auth & RBAC', state: 'Base Template' },
        { name: 'ERP Sync Adapter', state: 'API Bridge' },
        { name: 'Automation Runner', state: 'Test Sandbox' },
      ],
    },
  },
]

const SelectedProductsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const [activeTab, setActiveTab] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const current = PRODUCTS[activeTab]
  const CurrentIcon = current.icon

  return (
    <div ref={ref}>
      <SectionCanvas id="products" outerClassName="bg-white py-5 sm:py-7">
        <SectionHeader
          badge="Products & R&D"
          titlePrimary="Products & Technology"
          titleMuted="Software built to solve specific problems."
          description="Practical software products developed by AlgoForce alongside custom engineering projects."
          inView={inView}
        />

        {/* Sleek Dock-Style Switcher */}
        <div className="flex items-center justify-center mb-8 overflow-x-auto pb-2 scrollbar-hide max-w-full">
          <div className="inline-flex p-1.5 rounded-2xl saas-tab-tray gap-1.5">
            {PRODUCTS.map((prod, idx) => {
              const Icon = prod.icon
              const isActive = activeTab === idx
              return (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0A2A43] text-white shadow-[0_8px_18px_-6px_rgba(10,42,67,0.38)] -translate-y-0.5'
                      : 'text-slate-600 hover:text-[#0A2A43] hover:bg-white/70'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-white' : 'text-slate-500'} />
                  <span>{prod.tabLabel}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Split Product Card + Illustrative UI Architecture Mockup */}
        <div className="max-w-5xl mx-auto mb-8">
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

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Product Overview & Feature List */}
                <div className="lg:col-span-6">
                  <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
                    <span className={`text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-md border ${current.statusColor} font-bold uppercase`}>
                      {current.status}
                    </span>
                    <span className="text-xs font-medium text-[#6E7B8C]">{current.badge}</span>
                  </div>

                  <h3 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl font-semibold text-[#0A2A43] mb-3 tracking-tight">
                    {current.name}
                  </h3>

                  <div className="p-3 rounded-xl bg-[#f8f9fb] border border-[#e5eaf2] mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#6E7B8C] font-semibold block mb-0.5">
                      Built For
                    </span>
                    <p className="text-xs text-[#0A2A43] font-medium leading-relaxed">
                      {current.targetAudience}
                    </p>
                  </div>

                  <p className="text-sm text-[#4A5769] leading-[1.65] font-normal mb-5">
                    {current.whatItDoes}
                  </p>

                  <div className="space-y-2 mb-6">
                    {current.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5 text-xs text-[#0A2A43] font-medium leading-snug">
                        <span className="w-4 h-4 rounded-md bg-blue-50 border border-blue-100 text-[#2563EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={10} strokeWidth={2.5} />
                        </span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={current.link}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#0A2A43] hover:bg-[#113D61] text-white rounded-xl text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-2 transition-all shadow-[0_10px_22px_-6px_rgba(10,42,67,0.34)] hover:-translate-y-0.5"
                  >
                    <span>{current.ctaText}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Right: Illustrative Floating Architecture Mockup Window */}
                <div className="lg:col-span-6 relative">
                  <div
                    className="hidden sm:block absolute inset-0 rounded-2xl bg-[#f1f5f9] border border-[#e2e8f0] translate-x-2.5 translate-y-2.5 rotate-[1.5deg]"
                    aria-hidden="true"
                  />

                  <div className="relative rounded-2xl bg-[#f8f9fb] border border-[#dce3ec] p-5 sm:p-6 shadow-[0_18px_40px_-14px_rgba(10,42,67,0.14)]">
                    {/* Floating Squircle Product Icon */}
                    <div
                      className="hidden sm:flex absolute -top-4 -right-3 w-11 h-11 rounded-2xl bg-white border border-[#e2e8f0] saas-squircle-badge items-center justify-center rotate-6"
                      aria-hidden="true"
                    >
                      <CurrentIcon size={18} className="text-[#0A2A43]" />
                    </div>

                    {/* Mini Window Top Bar */}
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200/80">
                      <div className="flex items-center gap-2">
                        <Terminal size={13} className="text-[#2563EB]" />
                        <span className="text-[11.5px] font-mono font-semibold text-[#0A2A43]">
                          {current.preview.windowTitle}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-[#e2e8f0] text-[#5A6678]">
                        <Lock size={9} />
                        {current.preview.tag}
                      </span>
                    </div>

                    {/* Illustrative Input / Command Pill */}
                    <div className="p-3 rounded-xl bg-white border border-[#e2e8f0] shadow-2xs mb-4">
                      <span className="block text-[9.5px] font-mono uppercase tracking-wider text-[#6E7B8C] mb-1">
                        System Workflow Pattern
                      </span>
                      <div className="text-xs font-medium text-[#0A2A43]">
                        “{current.preview.queryExample}”
                      </div>
                    </div>

                    {/* Layered Architecture Component Cards */}
                    <div className="space-y-2">
                      {current.preview.modules.map((mod, idx) => (
                        <div
                          key={mod.name}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#e6ebf2] shadow-[0_2px_6px_-2px_rgba(10,42,67,0.04)]"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className={`w-2 h-2 rounded-sm ${idx === 0 ? 'bg-[#0A2A43]' : idx === 1 ? 'bg-[#2563EB]' : 'bg-[#9A4DFF]'}`} />
                            <span className="text-xs font-semibold text-[#0A2A43]">{mod.name}</span>
                          </div>
                          <span className="text-[10.5px] font-mono text-[#5A6678] bg-[#f8f9fb] px-2 py-0.5 rounded border border-[#e5eaf2]">
                            {mod.state}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View Portfolio Link */}
        <div className="text-center">
          <Link
            to="/products"
            className="text-xs font-semibold text-[#5A6678] hover:text-[#0A2A43] transition-colors inline-flex items-center gap-1.5"
          >
            <span>View complete product portfolio &amp; technical readiness details</span>
            <ChevronRight size={13} />
          </Link>
        </div>
      </SectionCanvas>
    </div>
  )
}

export default SelectedProductsSection
