import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Brain, Factory, Search, Cpu, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react'
import SeoHead from '../components/common/SeoHead'

const VERIFIED_PRODUCTS = [
  {
    id: 'tallygpt',
    name: 'TallyGPT Finance AI',
    tagline: 'Conversational Accounting & Automated Ledger Reconciliations',
    badge: 'Finance & Accounting Automation',
    status: 'In Active Client Pilot',
    statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    icon: Brain,
    targetAudience: 'Chief Financial Officers, Commercial Accountants & Growing SME Leaders',
    problem: 'Accounting teams lose dozens of hours every month manually cross-referencing bank statements against Tally Prime entries, tracking down missing invoices, and reconciling outstanding receivables across multiple ledgers.',
    whatItDoes: 'A secure middleware layer that interfaces with Tally Prime and Tally ERP 9 via local or cloud gateways. Allows accounting teams to ask questions in plain English, automate bank reconciliation matching, and detect ledger anomalies before audit cycles.',
    keyCapabilities: [
      'Automated bank statement reconciliation against Tally vouchers',
      'Plain English querying ("What are our unpaid invoices > 60 days?")',
      'Duplicate voucher and anomaly detection across vendor ledgers',
      'Secure local sync without uploading sensitive financial data to public clouds'
    ],
    architecture: 'Local Tally Connector Gateway + Private Encryption + Self-Hosted Vector Store',
    deploymentModel: 'On-Premise / Private Cloud VPC',
    ctaText: 'Request TallyGPT Pilot Access',
    ctaLink: '/contact?interest=tallygpt&type=demo'
  },
  {
    id: 'factorygpt',
    name: 'FactoryGPT Industrial Intelligence',
    tagline: 'Shop-Floor Event Capture & Production Line Synchronization',
    badge: 'Industrial Operations',
    status: 'Enterprise Private Beta',
    statusColor: 'bg-purple-50 text-purple-900 border-purple-200',
    icon: Factory,
    targetAudience: 'Plant Managers, Operations Directors & Industrial Manufacturers',
    problem: 'Manufacturing shop floors rely on clipboards and end-of-shift paper logs. Management learns of machine downtime, component shortages, and output deficits 24 to 48 hours late, when corrective action is already expensive.',
    whatItDoes: 'A lightweight digital terminal system that runs on standard tablets or mobile devices on the plant floor. Operators log downtime causes and production counts in seconds, instantly updating executive dashboards and ERP inventory ledgers.',
    keyCapabilities: [
      'Tablet-first operator logging for machine run-times and downtime causes',
      'Automated shift handover summaries and real-time plant KPIs',
      'Instant raw material deduction and finished goods sync into ERP',
      'Digital quality check sign-offs with photo evidence verification'
    ],
    architecture: 'Lightweight Progressive Web App + Local Edge Cache + Real-Time WebSocket Bus',
    deploymentModel: 'Edge Server + Private Cloud VPC',
    ctaText: 'Request FactoryGPT Demonstration',
    ctaLink: '/contact?interest=factorygpt&type=demo'
  },
  {
    id: 'citerank',
    name: 'CiteRank GEO Platform',
    tagline: 'Generative Engine Optimization & LLM Visibility Auditing',
    badge: 'AI Search Visibility',
    status: 'Enterprise Preview Available',
    statusColor: 'bg-blue-50 text-blue-900 border-blue-200',
    icon: Search,
    targetAudience: 'B2B Brands, Professional Firms & Enterprise Growth Teams',
    problem: 'Traditional SEO monitors Google rankings. However, enterprise buyers increasingly use ChatGPT, Claude, and Perplexity for vendor recommendations — where traditional SEO tools have zero visibility into citation sources.',
    whatItDoes: 'An automated Generative Engine Optimization (GEO) audit engine that simulates multi-model queries across major LLMs, tracking how your brand is cited, perceived, and recommended compared to competitors.',
    keyCapabilities: [
      'Cross-LLM citation tracking across OpenAI, Anthropic, and Perplexity',
      'Structured knowledge graph and authority footprint benchmarking',
      'Identification of hallucinated company data in public generative models',
      'Actionable content structure blueprints to improve generative discovery'
    ],
    architecture: 'Automated Multi-Model LLM Query Runner + Semantic Entity Graph Analyzer',
    deploymentModel: 'Cloud SaaS / Dedicated Tenant',
    ctaText: 'Enquire About CiteRank GEO',
    ctaLink: '/contact?interest=citerank&type=demo'
  },
  {
    id: 'crucible',
    name: 'Crucible Engineering Sandbox & R&D',
    tagline: 'Internal Engineering Accelerators, Middleware & Reusable IP',
    badge: 'Engineering IP & Accelerators',
    status: 'Proprietary Internal Platform',
    statusColor: 'bg-slate-100 text-slate-800 border-slate-300',
    icon: Cpu,
    targetAudience: 'Client Engineering Sponsors & Technology Partners',
    problem: 'Building custom software from zero causes unpredictable delivery timelines and budget ballooning on boilerplate auth, database sync, and agent scaffolds.',
    whatItDoes: 'Our internal library of pre-tested microservices, secure authentication scaffolds, ERP webhook connectors, and agentic execution runtimes. Enables our engineering teams to deliver custom client systems in weeks instead of months.',
    keyCapabilities: [
      'Standardized enterprise authentication & granular RBAC libraries',
      'Resilient webhook retries and bi-directional ERP data sync middleware',
      'Agentic workflow execution sandboxes with human-in-the-loop approvals',
      'De-risks custom client engagements by using proven architectural building blocks'
    ],
    architecture: 'Microservices Boilerplate + Docker Sandboxes + Automated Integration Test Harness',
    deploymentModel: 'Internal IP Deployed to Client VPCs',
    ctaText: 'Discuss Custom Client Engineering',
    ctaLink: '/services'
  }
]

const Products = () => {
  const [activeTab, setActiveTab] = useState(0)
  const current = VERIFIED_PRODUCTS[activeTab]
  const CurrentIcon = current.icon

  return (
    <div className="bg-[#f8fafc] text-slate-900 pt-28 sm:pt-36 pb-24 overflow-hidden">
      <SeoHead 
        title="Products & Engineering Platforms | AlgoForce" 
        description="Explore AlgoForce's verified software solutions: TallyGPT Finance AI, FactoryGPT, CiteRank GEO, and our Crucible Engineering Accelerators."
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-t border-t-white border-b-2 border-b-slate-200 border-x border-slate-200 shadow-[0_4px_10px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1)] mb-4">
            <Cpu size={15} className="text-[#092941]" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-[#092941]">
              Proprietary Technology & IP
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#092941] tracking-tight mb-5">
            Verified Software Products &{' '}
            <span className="font-serif italic font-normal text-purple-900 block sm:inline">
              Engineering Platforms.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            In addition to custom client software engineering, AlgoForce develops specialized software platforms and internal accelerators to solve recurring operational problems.
          </p>
        </div>

        {/* 3D Tactile Product Tab Switcher */}
        <div className="flex items-center justify-center mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <div className="inline-flex p-2 rounded-2xl bg-gradient-to-b from-slate-200/90 to-slate-300/80 border-t border-t-white/80 border-b-2 border-b-slate-400/50 border-x border-slate-300/90 shadow-[inset_0_3px_8px_rgba(9,41,65,0.12),inset_0_1px_2px_rgba(0,0,0,0.08),0_2px_4px_rgba(255,255,255,0.9)] backdrop-blur-md">
            {VERIFIED_PRODUCTS.map((prod, idx) => {
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
                  <span>{prod.name.split(' ')[0]}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 3D Elevated Sliding Product Spotlight Card */}
        <div className="max-w-5xl mx-auto mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.99 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-3xl bg-gradient-to-b from-white via-white to-slate-50 border-t-2 border-t-white border-b-4 border-b-slate-300/90 border-x border-slate-200/90 shadow-[0_24px_55px_-6px_rgba(9,41,65,0.18),0_12px_24px_-6px_rgba(9,41,65,0.12),0_0_0_1px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_2px_rgba(9,41,65,0.03)] p-7 sm:p-11"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Product Info */}
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-2.5 mb-4">
                    <span className={`text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-md border ${current.statusColor} font-bold uppercase shadow-2xs`}>
                      {current.status}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {current.badge}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#092941] mb-2 tracking-tight">
                    {current.name}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-purple-900 mb-5">
                    {current.tagline}
                  </p>

                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 mb-5 shadow-[0_2px_6px_rgba(0,0,0,0.03)]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1">
                      Designed Specifically For:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {current.targetAudience}
                    </p>
                  </div>

                  <div className="mb-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                      The Operational Problem It Solves:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {current.problem}
                    </p>
                  </div>

                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                      What the Solution Does:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {current.whatItDoes}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link to={current.ctaLink}>
                      <button className="px-6 py-3.5 bg-gradient-to-b from-[#12395b] to-[#092941] hover:from-[#0d2d48] hover:to-[#071f32] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all border-t border-t-white/30 border-b-2 border-b-[#051724] shadow-[0_10px_22px_rgba(9,41,65,0.32),inset_0_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-0.5">
                        <span>{current.ctaText}</span>
                        <ArrowRight size={14} />
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Right: Technical Capabilities Box (Layered 3D Sub-card) */}
                <div className="lg:col-span-5 bg-gradient-to-b from-white to-slate-50/90 p-6 rounded-2xl border-t-2 border-t-white border-b-3 border-b-slate-300 border-x border-slate-200 shadow-[0_14px_30px_-4px_rgba(9,41,65,0.12),0_4px_10px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1)]">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#092941] mb-4">
                    Key Features & Technical Scope:
                  </div>

                  <div className="space-y-3 mb-6">
                    {current.keyCapabilities.map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-3 rounded-xl border-t border-t-white border-b-2 border-b-slate-200 border-x border-slate-200/90 shadow-[0_4px_10px_rgba(9,41,65,0.05),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(9,41,65,0.08)] transition-all">
                        <CheckCircle2 size={15} className="text-[#092941] mt-0.5 flex-shrink-0" />
                        <span className="font-semibold leading-snug">{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-200 space-y-2 text-[11px] text-slate-500 font-mono">
                    <div>
                      <span className="text-slate-400 uppercase">Architecture: </span>
                      <span className="text-slate-800 font-medium">{current.architecture}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 uppercase">Deployment: </span>
                      <span className="text-slate-800 font-medium">{current.deploymentModel}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Custom Engineering Callout */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-white via-slate-50 to-white border-t-2 border-t-white border-b-4 border-b-slate-300 border-x border-slate-200 shadow-[0_16px_35px_-4px_rgba(9,41,65,0.1),inset_0_1px_0_rgba(255,255,255,1)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#092941] mb-2">
              Need a custom system tailored to your exact workflows?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              While our proprietary products solve specific problems, the majority of our work is custom software and systems engineering built to your exact specifications.
            </p>
          </div>
          <Link to="/services">
            <button className="px-6 py-3.5 bg-gradient-to-b from-[#12395b] to-[#092941] hover:from-[#0d2d48] hover:to-[#071f32] text-white rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border-t border-t-white/30 border-b-2 border-b-[#051724] shadow-[0_10px_22px_rgba(9,41,65,0.32),inset_0_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-0.5">
              Explore Custom Engineering →
            </button>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Products
