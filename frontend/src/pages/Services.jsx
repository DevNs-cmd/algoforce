import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Compass, 
  Code2, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Workflow, 
  Server,
  FileCheck2,
  Database
} from 'lucide-react'
import SeoHead from '../components/common/SeoHead'

const DIVISIONS_DETAIL = [
  {
    id: 'consulting',
    number: '01',
    title: 'Technology Consulting & Digital Advisory',
    shortTitle: 'Technology Consulting',
    tagline: 'Strategic discovery, technology feasibility & architecture planning.',
    icon: Compass,
    overview:
      'We help enterprise leaders and institutional executives make informed, de-risked technology decisions before committing engineering capital. We evaluate your operational bottlenecks, assess legacy constraints, and formulate actionable architecture roadmaps.',
    coreServices: [
      'Technology Stack & Codebase Audits',
      'Enterprise Solution & Systems Architecture',
      'Legacy Modernization & Cloud Migration Feasibility',
      'Digital Transformation Strategy & Roadmap Design',
      'Technical Due Diligence & Vendor Evaluation'
    ],
    deliverables: [
      'Comprehensive Technical Discovery Report',
      'High-Level Architecture Diagrams (HLD / LLD)',
      'Phased Engineering Milestone Schedule',
      'Total Cost of Ownership (TCO) & ROI Projection'
    ],
    idealFor: 'Enterprises planning software modernization, cloud migrations, or multi-system overhauls.'
  },
  {
    id: 'engineering',
    number: '02',
    title: 'Software & Digital Engineering',
    shortTitle: 'Software Engineering',
    tagline: 'High-performance web applications, mobile platforms & robust backends.',
    icon: Code2,
    overview:
      'From complex web portals and native/cross-platform mobile applications to microservices backends, we engineer custom software built for speed, resilience, high concurrency, and long-term maintainability.',
    coreServices: [
      'Custom Web Applications & Enterprise Portals (React, Next.js, Node)',
      'Native & Cross-Platform Mobile Applications (iOS, Android, React Native)',
      'RESTful & GraphQL API Microservices Architecture',
      'Distributed Cloud Backend Engineering (AWS, GCP, Azure)',
      'High-Throughput Database Architecture (PostgreSQL, MongoDB, Redis)'
    ],
    deliverables: [
      'Clean, Version-Controlled Production Codebases',
      'Automated CI/CD Deployment Pipelines',
      'Comprehensive API Contracts & Swagger Documentation',
      'Performance & Load-Testing Benchmarking Reports'
    ],
    idealFor: 'Businesses needing tailored software applications that standard off-the-shelf SaaS cannot accommodate.'
  },
  {
    id: 'ai-automation',
    number: '03',
    title: 'AI & Intelligent Automation',
    shortTitle: 'AI & Automation',
    tagline: 'Production-grade LLM applications, intelligent agents & workflow automation.',
    icon: Cpu,
    overview:
      'We build practical AI systems that integrate directly into your operational workflow. Instead of generic chat toys, we design intelligent agents, automated document extraction pipelines, and copilots grounded strictly in your proprietary data.',
    coreServices: [
      'Custom Enterprise LLM Fine-Tuning & RAG Pipelines',
      'Autonomous Multi-Agent Workflow Orchestrations',
      'Intelligent OCR & Document Extraction (Invoices, Receipts, Contracts)',
      'Conversational Querying for Databases, ERPs & File Vaults',
      'Private VPC & On-Premise LLM Deployments for Strict Data Security'
    ],
    deliverables: [
      'Fully Integrated AI Workflow Pipelines',
      'Trained Multi-Model Orchestration Runtime',
      'Data Privacy & Security Encryption Compliance Docs',
      'Zero-Hallucination Guardrails & Monitoring Dashboard'
    ],
    idealFor: 'Teams spending significant employee hours on repetitive data entry, ledger querying, or document processing.'
  },
  {
    id: 'enterprise',
    number: '04',
    title: 'Enterprise & Industry Solutions',
    shortTitle: 'Enterprise Solutions',
    tagline: 'System integrations, ERP/CRM bridges & custom operational dashboards.',
    icon: Layers,
    overview:
      'Connecting fragmented systems into a cohesive operational engine. We bridge Tally Prime, SAP, Salesforce, Zoho, logistics APIs, and proprietary internal databases without disrupting your daily operations.',
    coreServices: [
      'Tally Prime & Tally ERP 9 Non-Invasive Database Sync',
      'SAP Enterprise Gateway Connectors & Workflow Automation',
      'CRM Pipeline, Lead Routing & Communication Integrations',
      'Custom Plant & Shop-Floor Operational Dashboards',
      'Institutional Campus ERP & Student Lifecycle Systems'
    ],
    deliverables: [
      'Non-Invasive API & Middleware Connectors',
      'Centralized Real-Time Operational Dashboards',
      'Historical Data Cleaning & Migration Validation',
      'Automated Exception Alerting & Escalation Rules'
    ],
    idealFor: 'Organizations running separate software systems that currently require manual human bridging.'
  },
  {
    id: 'managed-services',
    number: '05',
    title: 'Managed Technology Services & SLAs',
    shortTitle: 'Managed Services',
    tagline: '24/7 uptime monitoring, application maintenance & proactive support.',
    icon: ShieldCheck,
    overview:
      'Software requires dedicated ongoing care. We provide proactive application monitoring, server infrastructure management, routine security patching, database backups, and dedicated SLA-backed engineering support.',
    coreServices: [
      '24/7 Uptime & System Performance Monitoring',
      'Dedicated Tier-2 & Tier-3 Engineering Support with Defined SLAs',
      'Scheduled Security Patching, Vulnerability Scans & Backups',
      'Cloud Resource Optimization & Infrastructure Cost Reduction',
      'Continuous Feature Iteration, Sprint Enhancements & Tech Debt Upgrades'
    ],
    deliverables: [
      'Contractual SLA Agreement with Guaranteed Response Times',
      'Monthly Infrastructure & Health Analytics Reports',
      'Dedicated Slack / WhatsApp Escalation Channels',
      'Automated Disaster Recovery & Backup Routines'
    ],
    idealFor: 'Companies seeking high-reliability technical operations without the overhead of an in-house DevOps team.'
  },
  {
    id: 'products-rnd',
    number: '06',
    title: 'Products, Platforms & Internal R&D',
    shortTitle: 'Products & Platforms',
    tagline: 'Proprietary software products and reusable technology frameworks.',
    icon: Sparkles,
    overview:
      'Our internal engineering team builds proprietary platforms to address recurring industry challenges. Clients benefit from our proven accelerators, pre-built connectors, and ongoing research into emerging software paradigms.',
    coreServices: [
      'TallyGPT: Conversational Accounting & Bank Reconciliation AI',
      'FactoryGPT: Shop-Floor Line Event Capture & Operational Intelligence',
      'CiteRank GEO: Generative Engine Optimization & Citation Audits',
      'Reusable Middleware Connectors for Accelerated Client Delivery',
      'Continuous R&D in Multi-Agent Collaboration & Developer Tooling'
    ],
    deliverables: [
      'Demonstration Access & Custom Sandbox Walkthroughs',
      'Commercial Software Licensing & White-Label Deployments',
      'Custom Adapter Modules Tailored to Your Specific System'
    ],
    idealFor: 'Organizations looking for verified software solutions that can be rapidly configured and deployed.'
  }
]

const Services = () => {
  const [activeTab, setActiveTab] = useState(0)
  const current = DIVISIONS_DETAIL[activeTab]
  const CurrentIcon = current.icon

  return (
    <div className="bg-[#f8fafc] text-slate-900 pt-28 sm:pt-36 pb-24 overflow-hidden">
      <SeoHead 
        title="Services & Technology Divisions | AlgoForce" 
        description="Explore AlgoForce's six integrated technology divisions: Technology Consulting, Software Engineering, AI & Automation, Enterprise Solutions, Managed Services, and Products & R&D."
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Hero */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#092941]" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-[#092941]">
              Six Practice Divisions • Unified Partner
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#092941] tracking-tight mb-5">
            Full-Spectrum Digital Engineering.{' '}
            <span className="font-serif italic font-normal text-purple-900 block sm:inline">
              From Problem to Progress.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            AlgoForce provides the full continuum of technology capabilities. Whether you need strategic architecture, custom application development, enterprise integration, or ongoing support, our divisions operate as one cohesive team.
          </p>
        </div>

        {/* 3D Tactile Division Switcher */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2 scrollbar-hide">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/70 border border-slate-300/80 shadow-[inset_0_2px_6px_rgba(0,0,0,0.08)] backdrop-blur-md">
            {DIVISIONS_DETAIL.map((d, idx) => {
              const Icon = d.icon
              const isActive = activeTab === idx
              return (
                <button
                  key={d.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#092941] text-white shadow-[0_6px_16px_rgba(9,41,65,0.3),0_1px_2px_rgba(255,255,255,0.2)_inset] -translate-y-0.5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-white' : 'text-slate-500'} />
                  <span>{d.shortTitle}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 3D Elevated Feature Card */}
        <div className="max-w-5xl mx-auto mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-3xl bg-gradient-to-b from-white via-white to-slate-50/70 border-t-2 border-t-white border-b-2 border-b-slate-300/60 border-x border-slate-200 shadow-[0_25px_60px_rgba(9,41,65,0.12),0_8px_20px_rgba(9,41,65,0.06),0_1px_0_rgba(255,255,255,1)_inset] p-7 sm:p-11"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#092941] shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
                    <CurrentIcon size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-purple-900 font-bold block">
                      Division {current.number}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#092941]">
                      {current.title}
                    </h2>
                  </div>
                </div>

                <Link to="/contact">
                  <button className="px-5 py-2.5 bg-[#092941] hover:bg-[#071f32] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-[0_6px_16px_rgba(9,41,65,0.2)] hover:-translate-y-0.5">
                    <span>Discuss Requirement</span>
                    <ArrowRight size={14} />
                  </button>
                </Link>
              </div>

              <div className="mb-6">
                <div className="text-xs font-semibold text-slate-500 mb-2">Practice Overview</div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {current.overview}
                </p>
              </div>

              {/* Two Column Grid: Core Services vs Tangible Deliverables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 shadow-[0_4px_14px_rgba(0,0,0,0.03)]">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#092941] mb-4">
                    Core Capabilities & Focus:
                  </div>
                  <div className="space-y-2.5">
                    {current.coreServices.map((svc, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                        <CheckCircle2 size={15} className="text-[#092941] mt-0.5 flex-shrink-0" />
                        <span className="font-medium leading-snug">{svc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-purple-50/20 border border-slate-200 shadow-[0_4px_14px_rgba(0,0,0,0.03)]">
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-4">
                    Key Deliverables:
                  </div>
                  <div className="space-y-2.5">
                    {current.deliverables.map((del, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-900 mt-2 flex-shrink-0" />
                        <span className="font-medium leading-snug">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="text-slate-500">
                  <span className="font-bold text-slate-700">Recommended for: </span>
                  <span>{current.idealFor}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Contact Strip */}
        <div className="p-8 rounded-3xl bg-[#092941] text-white flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto shadow-2xl">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold mb-2">
              Have a project that requires multiple divisions?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Most clients engage us across 2 or 3 divisions — such as advisory + custom software engineering + managed support. Schedule a requirement discovery conversation with our architecture team.
            </p>
          </div>
          <Link to="/contact">
            <button className="px-7 py-3.5 bg-white text-[#092941] hover:bg-slate-100 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all shadow-md hover:-translate-y-0.5">
              Discuss Your Architecture →
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Services
