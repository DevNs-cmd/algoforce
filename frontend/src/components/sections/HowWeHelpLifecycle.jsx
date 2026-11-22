import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Search, 
  FileCheck, 
  Layers, 
  Code2, 
  Workflow, 
  Rocket, 
  ShieldCheck,
  Pause,
  Play
} from 'lucide-react'

const STAGES = [
  {
    step: '01',
    name: 'Understand',
    tagline: 'Deep Discovery & Requirement Context',
    icon: Search,
    description:
      'We begin by analyzing your business operations, institutional structure, team responsibilities, and specific pain points. No architecture or technology is proposed until we understand the underlying business necessity.',
    deliverables: [
      'Comprehensive Operational Workflow Mapping',
      'Stakeholder & Team Pain Point Identification',
      'Data Availability & Readiness Assessment',
      'Preliminary ROI & Feasibility Benchmarks'
    ],
    technicalFocus: 'Business Analysis • Operational Context • Bottleneck Discovery',
    accentColor: 'from-blue-600 to-indigo-600',
    badgeColor: 'bg-blue-50 text-blue-900 border-blue-200'
  },
  {
    step: '02',
    name: 'Assess',
    tagline: 'Technical Feasibility & Constraint Evaluation',
    icon: FileCheck,
    description:
      'Our senior architects evaluate your existing software stack (Tally, SAP, CRMs, legacy databases), server environments, security policies, and integration touchpoints to establish an unambiguous technical scope.',
    deliverables: [
      'Legacy System & Database Compatibility Audit',
      'Data Security & Privacy Constraint Specification',
      'Integration API Mapping & Middleware Requirements',
      'Detailed Feasibility & Risk Mitigation Blueprint'
    ],
    technicalFocus: 'Stack Compatibility • Security Protocols • Compliance Check',
    accentColor: 'from-indigo-600 to-purple-600',
    badgeColor: 'bg-indigo-50 text-indigo-900 border-indigo-200'
  },
  {
    step: '03',
    name: 'Design',
    tagline: 'System Architecture & Interface Specification',
    icon: Layers,
    description:
      'We specify the target system architecture, database schemas, security protocols, API contracts, and user experience. You receive a complete technical and UI specification before engineering commences.',
    deliverables: [
      'End-to-End System & Cloud Architecture Blueprints',
      'Interactive User Experience Wireframes & Flows',
      'REST/GraphQL API Schemas & Data Contract Docs',
      'Milestone-Based Engineering Execution Schedule'
    ],
    technicalFocus: 'System Architecture • DB Schema • UI/UX Design Contract',
    accentColor: 'from-purple-600 to-pink-600',
    badgeColor: 'bg-purple-50 text-purple-900 border-purple-200'
  },
  {
    step: '04',
    name: 'Develop',
    tagline: 'Rigorous Full-Stack Engineering',
    icon: Code2,
    description:
      'Our engineers develop the software application, AI pipelines, or digital system following strict coding standards, automated unit testing, version control, and modular architecture designed for high scalability.',
    deliverables: [
      'High-Performance Frontend & Responsive Interfaces',
      'Robust Backend Services, Microservices & APIs',
      'LLM Pipelines, Machine Learning Agents & Automation',
      'Automated Test Suites & Static Code Analysis Audits'
    ],
    technicalFocus: 'Clean Code • High Concurrency • Automated Testing',
    accentColor: 'from-[#092941] to-blue-900',
    badgeColor: 'bg-slate-100 text-[#092941] border-slate-300'
  },
  {
    step: '05',
    name: 'Integrate',
    tagline: 'Seamless System & Data Interconnection',
    icon: Workflow,
    description:
      'We connect the new solution with your existing environment — whether Tally Prime, SAP, Salesforce, custom CRMs, internal databases, or third-party APIs — ensuring seamless bidirectional data flow with zero operational disruption.',
    deliverables: [
      'Non-Invasive ERP & Accounting Connectors (Tally/SAP)',
      'Secure Webhook & Real-Time Sync Pipelines',
      'Historical Data Migration & Reconciliation Validation',
      'End-to-End Integrated Simulation Testing'
    ],
    technicalFocus: 'Bidirectional Sync • Zero Data Loss • Non-Invasive Middleware',
    accentColor: 'from-teal-600 to-emerald-600',
    badgeColor: 'bg-teal-50 text-teal-900 border-teal-200'
  },
  {
    step: '06',
    name: 'Deploy',
    tagline: 'Controlled Rollout & Production Verification',
    icon: Rocket,
    description:
      'The system is implemented into your secure cloud or private infrastructure, validated with staging datasets, and transitioned into production with comprehensive team walkthroughs and documentation.',
    deliverables: [
      'Production VPC Cloud Deployment (AWS / Azure / GCP)',
      'Automated Staging-to-Production CI/CD Pipelines',
      'Comprehensive Role-Based Team Onboarding & Training',
      'Operational Handover & User Manual Documentation'
    ],
    technicalFocus: 'Zero-Downtime Rollout • VPC Isolation • Team Onboarding',
    accentColor: 'from-emerald-600 to-green-600',
    badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-200'
  },
  {
    step: '07',
    name: 'Manage',
    tagline: 'Continuous Monitoring & SLA Stewardship',
    icon: ShieldCheck,
    description:
      'We remain actively engaged post-deployment, delivering proactive infrastructure monitoring, bug resolution, security updates, SLA-backed technical support, and iterative improvements as your operations expand.',
    deliverables: [
      '24/7 Server & System Health Uptime Monitoring',
      'Dedicated SLA-Backed Bug Fixing & Incident Handling',
      'Routine Security Patches, Backups & Performance Tuning',
      'Quarterly Technology Review & Roadmap Iterations'
    ],
    technicalFocus: '24/7 SLA Support • Infrastructure Health • Continuous Evolution',
    accentColor: 'from-amber-600 to-orange-600',
    badgeColor: 'bg-amber-50 text-amber-900 border-amber-200'
  }
]

const HowWeHelpLifecycle = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance sliding stage every 6.5 seconds
  useEffect(() => {
    if (!isAutoPlaying || !inView) return undefined
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % STAGES.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [isAutoPlaying, inView])

  const currentStage = STAGES[currentIdx]
  const CurrentIcon = currentStage.icon

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % STAGES.length)
  }

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + STAGES.length) % STAGES.length)
  }

  return (
    <section ref={ref} id="how-we-help" className="py-20 md:py-28 bg-[#f8fafc] text-slate-900 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#092941] bg-white border border-slate-200 px-4 py-1.5 rounded-full mb-4 shadow-2xs">
            Disciplined 7-Stage Delivery Sequence
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-[#092941] mb-5">
            How We Partner With You.{' '}
            <span className="font-serif italic font-normal text-purple-900">
              From Problem to Progress.
            </span>
          </h2>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
            A structured, transparent lifecycle that removes guesswork and guarantees predictable engineering execution from the initial conversation to long-term operational management.
          </p>
        </motion.div>

        {/* Innovative Sliding Timeline Tabs */}
        <div className="mb-8 overflow-x-auto pb-3 scrollbar-hide">
          <div className="flex items-center justify-between min-w-[760px] p-2 rounded-2xl bg-gradient-to-b from-slate-200/90 to-slate-300/80 border-t border-t-white/80 border-b-2 border-b-slate-400/50 border-x border-slate-300/90 shadow-[inset_0_3px_8px_rgba(9,41,65,0.12),inset_0_1px_2px_rgba(0,0,0,0.08),0_2px_4px_rgba(255,255,255,0.9)] backdrop-blur-md gap-2">
            {STAGES.map((s, idx) => {
              const isActive = idx === currentIdx
              const isPast = idx < currentIdx
              return (
                <button
                  key={s.step}
                  onClick={() => {
                    setCurrentIdx(idx)
                    setIsAutoPlaying(false)
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all text-left duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-b from-[#12395b] to-[#092941] text-white shadow-[0_8px_18px_rgba(9,41,65,0.38),0_2px_4px_rgba(9,41,65,0.2),inset_0_1px_1px_rgba(255,255,255,0.35)] border-t border-t-white/30 border-b-2 border-b-[#051724] -translate-y-0.5'
                      : 'hover:bg-white/60 text-slate-600'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white border border-white/30 shadow-xs'
                        : isPast
                        ? 'bg-slate-300/80 text-slate-800'
                        : 'bg-white/70 text-slate-500 group-hover:bg-white'
                    }`}
                  >
                    {s.step}
                  </span>
                  <div className="flex flex-col">
                    <span
                      className={`text-xs font-bold transition-colors ${
                        isActive ? 'text-white' : 'text-slate-700 group-hover:text-slate-900'
                      }`}
                    >
                      {s.name}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Featured Sliding Showcase Card with Eye-Catching Interactive Presentation */}
        <div className="relative mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="rounded-3xl bg-gradient-to-b from-white via-white to-slate-50 border-t-2 border-t-white border-b-4 border-b-slate-300/90 border-x border-slate-200/90 shadow-[0_24px_55px_-6px_rgba(9,41,65,0.18),0_12px_24px_-6px_rgba(9,41,65,0.12),0_0_0_1px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_2px_rgba(9,41,65,0.03)] overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left: Stage Deep Dive */}
                <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
                  <div>
                    {/* Stage Header Info */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white border-t border-t-white border-b border-b-slate-200 border-x border-slate-200 flex items-center justify-center text-[#092941] shadow-[0_4px_10px_rgba(9,41,65,0.08),inset_0_1px_0_rgba(255,255,255,1)]">
                          <CurrentIcon size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-900">
                              Stage {currentStage.step} of 07
                            </span>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${currentStage.badgeColor} font-semibold shadow-2xs`}>
                              {currentStage.technicalFocus}
                            </span>
                          </div>
                          <h3 className="text-3xl font-extrabold text-[#092941] tracking-tight">
                            {currentStage.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm font-semibold text-slate-700 mb-3">
                      {currentStage.tagline}
                    </div>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 font-normal">
                      {currentStage.description}
                    </p>

                    {/* Stage Deliverables */}
                    <div className="pt-6 border-t border-slate-100">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#092941] mb-4">
                        Tangible Stage Deliverables:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {currentStage.deliverables.map((del, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-3 rounded-xl border-t border-t-white border-b-2 border-b-slate-200 border-x border-slate-200/90 shadow-[0_4px_10px_rgba(9,41,65,0.05),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(9,41,65,0.08)] transition-all">
                            <CheckCircle2 size={14} className="text-[#092941] mt-0.5 flex-shrink-0" />
                            <span className="font-semibold leading-snug">{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Stage Bottom Actions */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <Link to="/contact">
                      <button className="px-5 py-2.5 bg-gradient-to-b from-[#12395b] to-[#092941] hover:from-[#0d2d48] hover:to-[#071f32] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all border-t border-t-white/30 border-b-2 border-b-[#051724] shadow-[0_8px_20px_rgba(9,41,65,0.32),0_2px_4px_rgba(9,41,65,0.2),inset_0_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:translate-y-0">
                        <span>Discuss this stage for your organization</span>
                        <ArrowRight size={14} />
                      </button>
                    </Link>

                    {/* Slider Navigation Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrev}
                        aria-label="Previous Stage"
                        className="w-9 h-9 rounded-full bg-white border-t border-t-white border-b-2 border-b-slate-300 border-x border-slate-200 shadow-[0_3px_8px_rgba(9,41,65,0.08),inset_0_1px_0_rgba(255,255,255,1)] text-slate-700 flex items-center justify-center hover:-translate-y-0.5 transition-all"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <span className="text-xs font-mono font-bold text-slate-600 px-1.5 py-0.5 bg-slate-100 rounded-md border border-slate-200">
                        {currentStage.step} / 07
                      </span>
                      <button
                        onClick={handleNext}
                        aria-label="Next Stage"
                        className="w-9 h-9 rounded-full bg-white border-t border-t-white border-b-2 border-b-slate-300 border-x border-slate-200 shadow-[0_3px_8px_rgba(9,41,65,0.08),inset_0_1px_0_rgba(255,255,255,1)] text-slate-700 flex items-center justify-center hover:-translate-y-0.5 transition-all"
                      >
                        <ChevronRight size={16} />
                      </button>
                      <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="w-9 h-9 rounded-full bg-white border-t border-t-white border-b-2 border-b-slate-300 border-x border-slate-200 shadow-[0_3px_8px_rgba(9,41,65,0.08),inset_0_1px_0_rgba(255,255,255,1)] text-slate-500 hover:text-slate-900 flex items-center justify-center hover:-translate-y-0.5 transition-all ml-1"
                        title={isAutoPlaying ? 'Pause auto-slide' : 'Resume auto-slide'}
                      >
                        {isAutoPlaying ? <Pause size={13} /> : <Play size={13} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Architectural Visual Panel */}
                <div className="lg:col-span-5 bg-gradient-to-br from-[#092941] to-[#04121e] p-8 sm:p-10 text-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                      <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                        Operational Blueprint
                      </span>
                      <span className="text-xs font-mono text-purple-300">
                        P{currentStage.step}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                          Operational Focus
                        </span>
                        <div className="text-sm font-bold text-white">
                          {currentStage.name} Phase Execution
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {currentStage.tagline}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                          Architectural Safeguard
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Every step is gated by formal client review, staging verification, and automated regression checks before proceeding to the subsequent phase.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                          Partner Transparency
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Dedicated communication channels (Slack / Teams / WhatsApp), weekly sprint demos, and direct access to senior engineers.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>AlgoForce Engineering OS</span>
                    <span>MSME: UDYAM-DL-08-0122150</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Commitment Banner */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-bold text-[#092941] mb-0.5">
                Full-Lifecycle Involvement Beyond Launch
              </div>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                Unlike transactional agencies that hand over code and disappear, AlgoForce stays as your dedicated technology partner — managing SLAs, updates, and subsequent development phases.
              </p>
            </div>
          </div>
          <Link to="/contact">
            <button className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 rounded-xl text-xs font-semibold whitespace-nowrap transition-all">
              Initiate Discovery Discussion →
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HowWeHelpLifecycle
