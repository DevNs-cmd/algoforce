import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check,
  Search,
  FileCheck,
  Layers,
  Code2,
  Workflow,
  Rocket,
  ShieldCheck,
  Pause,
  Play,
} from 'lucide-react'
import { SectionHeader, FolderTabEar } from './sectionPrimitives'

const STAGES = [
  {
    step: '01',
    name: 'Understand',
    tagline: 'Business requirements and daily workflows',
    icon: Search,
    description:
      'Review your goals, team workflows and existing bottlenecks before proposing software.',
    deliverables: [
      'Operational workflow review',
      'Core bottleneck list',
      'Data format inspection',
      'Initial build scope',
    ],
    technicalFocus: 'Requirement Review',
    badgeColor: 'bg-blue-50 text-[#2563EB] border-blue-200',
  },
  {
    step: '02',
    name: 'Assess',
    tagline: 'Software compatibility and technical constraints',
    icon: FileCheck,
    description:
      'Check current software, data sources, security requirements and integration points.',
    deliverables: [
      'Existing software compatibility check',
      'Access and data security review',
      'API and Tally/ERP connection mapping',
      'Project constraint and risk summary',
    ],
    technicalFocus: 'Technical Assessment',
    badgeColor: 'bg-slate-100 text-[#0A2A43] border-slate-200',
  },
  {
    step: '03',
    name: 'Design',
    tagline: 'System structure and interface layouts',
    icon: Layers,
    description:
      'Define software architecture, database tables, user screens and integration plans upfront.',
    deliverables: [
      'System and database schema plan',
      'Screen wireframes and user flows',
      'API specification documents',
      'Clear milestone schedule',
    ],
    technicalFocus: 'Architecture & Design',
    badgeColor: 'bg-purple-50 text-purple-900 border-purple-200',
  },
  {
    step: '04',
    name: 'Develop',
    tagline: 'Web, mobile and backend build',
    icon: Code2,
    description:
      'Build web apps, mobile apps and automation workflows using clean tested code.',
    deliverables: [
      'Responsive web and mobile interfaces',
      'Backend services and databases',
      'Automation and AI scripts',
      'Automated quality checks',
    ],
    technicalFocus: 'Software Engineering',
    badgeColor: 'bg-blue-50 text-[#2563EB] border-blue-200',
  },
  {
    step: '05',
    name: 'Integrate',
    tagline: 'Connect with your existing tools',
    icon: Workflow,
    description:
      'Connect new software cleanly with Tally, SAP, CRMs and spreadsheets.',
    deliverables: [
      'Tally and ERP sync bridges',
      'Real-time API webhooks',
      'Record migration and verification',
      'End-to-end integration testing',
    ],
    technicalFocus: 'System Integration',
    badgeColor: 'bg-slate-100 text-[#0A2A43] border-slate-200',
  },
  {
    step: '06',
    name: 'Deploy',
    tagline: 'Launch and team handover',
    icon: Rocket,
    description:
      'Launch into your cloud or server environment with testing and user training.',
    deliverables: [
      'Cloud or on-premise server deployment',
      'Staging validation and release checks',
      'Staff walkthroughs and onboarding',
      'Admin and user documentation',
    ],
    technicalFocus: 'Rollout & Training',
    badgeColor: 'bg-purple-50 text-purple-900 border-purple-200',
  },
  {
    step: '07',
    name: 'Support',
    tagline: 'Ongoing maintenance and updates',
    icon: ShieldCheck,
    description:
      'Monitor systems, fix issues and deliver ongoing improvements after launch.',
    deliverables: [
      'Routine server and uptime checks',
      'Bug fixes and incident support',
      'Security patches and backups',
      'Iterative feature updates over time',
    ],
    technicalFocus: 'Ongoing Maintenance',
    badgeColor: 'bg-blue-50 text-[#2563EB] border-blue-200',
  },
]

const HowWeHelpLifecycle = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !isAutoPlaying || !inView) return undefined
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % STAGES.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [isAutoPlaying, inView, prefersReducedMotion])

  const currentStage = STAGES[currentIdx]
  const CurrentIcon = currentStage.icon
  const progressPercent = ((currentIdx + 1) / STAGES.length) * 100

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIdx((prev) => (prev + 1) % STAGES.length)
  }

  const handlePrev = () => {
    setIsAutoPlaying(false)
    setCurrentIdx((prev) => (prev - 1 + STAGES.length) % STAGES.length)
  }

  return (
    <section ref={ref} id="how-we-help" className="py-16 sm:py-24 bg-white text-[#0A2A43] relative overflow-x-clip">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            badge="Delivery Process"
            titlePrimary="How We Deliver"
            titleMuted="Seven clear steps."
            description="A direct workflow from understanding requirements to ongoing support."
            inView={inView}
          />

          {/* Interactive Timeline Rail with Smooth Scrubber */}
          <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide max-w-full">
            <div className="relative min-w-[700px] p-2 rounded-2xl saas-tab-tray">
              {/* Animated Progress Track under buttons */}
              <div className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-slate-300/60 overflow-hidden" aria-hidden="true">
                <motion.div
                  className="h-full bg-[#2563EB] rounded-full"
                  initial={false}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </div>

              <div className="flex items-center justify-between gap-1.5 pb-1">
                {STAGES.map((s, idx) => {
                  const isActive = idx === currentIdx
                  const isPast = idx < currentIdx
                  return (
                    <button
                      key={s.step}
                      type="button"
                      onClick={() => {
                        setCurrentIdx(idx)
                        setIsAutoPlaying(false)
                      }}
                      className={`flex-1 flex items-center justify-center gap-2 px-2.5 py-2 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-[#0A2A43] text-white shadow-[0_8px_18px_-6px_rgba(10,42,67,0.4)] -translate-y-0.5'
                          : isPast
                          ? 'bg-white/80 text-[#0A2A43] hover:bg-white'
                          : 'text-slate-600 hover:bg-white/60 hover:text-[#0A2A43]'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-md text-[10px] font-mono font-bold flex items-center justify-center ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : isPast
                            ? 'bg-blue-50 text-[#2563EB]'
                            : 'bg-slate-200/70 text-slate-500'
                        }`}
                      >
                        {s.step}
                      </span>
                      <span className="text-xs font-semibold whitespace-nowrap">{s.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Dual-Surface Stage Spotlight Canvas */}
          <div className="mb-8 rounded-[28px] sm:rounded-[32px] border border-[#e3e8f0] saas-canvas p-5 sm:p-8 lg:p-10 saas-card-elevation relative overflow-hidden">
            <div className="saas-dot-matrix absolute inset-0 pointer-events-none" aria-hidden="true" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
              >
                {/* Left Paper Surface: Stage Overview & Deliverables */}
                <div className="lg:col-span-7 relative rounded-[22px] bg-white border border-[#e2e8f0] p-6 sm:p-8 shadow-[0_14px_34px_-12px_rgba(10,42,67,0.1)] flex flex-col justify-between">
                  <FolderTabEar />

                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-[#f8f9fb] border border-[#e2e8f0] saas-squircle-badge flex items-center justify-center text-[#0A2A43]">
                          <CurrentIcon size={20} />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-0.5">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB]">
                              Stage {currentStage.step} of 07
                            </span>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border font-semibold ${currentStage.badgeColor}`}>
                              {currentStage.technicalFocus}
                            </span>
                          </div>
                          <h3 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl font-semibold text-[#0A2A43] tracking-tight">
                            {currentStage.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm font-semibold text-[#0A2A43]/80 mb-2">
                      {currentStage.tagline}
                    </div>

                    <p className="text-sm text-[#4A5769] leading-[1.65] font-normal mb-6">
                      {currentStage.description}
                    </p>

                    <div className="pt-5 border-t border-slate-100">
                      <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#6E7B8C] mb-3">
                        Stage Deliverables
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {currentStage.deliverables.map((del) => (
                          <div
                            key={del}
                            className="flex items-start gap-2.5 text-xs text-[#0A2A43] bg-[#f8f9fb] p-2.5 rounded-xl border border-[#e6ebf2] font-medium leading-snug"
                          >
                            <span className="w-4 h-4 rounded-md bg-white border border-[#dce3ec] text-[#2563EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check size={10} strokeWidth={2.5} />
                            </span>
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Controls & CTA Footer */}
                  <div className="mt-7 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <Link
                      to="/contact"
                      className="px-5 py-2.5 bg-[#0A2A43] hover:bg-[#113D61] text-white rounded-xl text-xs sm:text-sm font-medium inline-flex items-center gap-2 transition-all shadow-[0_8px_18px_-6px_rgba(10,42,67,0.34)] hover:-translate-y-0.5"
                    >
                      <span>Discuss this stage</span>
                      <ArrowRight size={14} />
                    </Link>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous stage"
                        className="w-9 h-9 rounded-full bg-[#f8f9fb] hover:bg-white border border-[#dce3ec] text-[#0A2A43] flex items-center justify-center transition-all shadow-2xs"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <span className="text-xs font-mono font-semibold text-[#5A6678] px-2">
                        {currentStage.step} / 07
                      </span>
                      <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next stage"
                        className="w-9 h-9 rounded-full bg-[#f8f9fb] hover:bg-white border border-[#dce3ec] text-[#0A2A43] flex items-center justify-center transition-all shadow-2xs"
                      >
                        <ChevronRight size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAutoPlaying((prev) => !prev)}
                        aria-label={isAutoPlaying ? 'Pause lifecycle auto-advance' : 'Resume lifecycle auto-advance'}
                        className="w-9 h-9 rounded-full bg-[#f8f9fb] hover:bg-white border border-[#dce3ec] text-[#5A6678] hover:text-[#0A2A43] flex items-center justify-center transition-all ml-1"
                      >
                        {isAutoPlaying ? <Pause size={13} /> : <Play size={13} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Precision Navy Architectural Window + Floating Tag */}
                <div className="lg:col-span-5 relative rounded-[22px] bg-[#0A2A43] p-6 sm:p-8 text-white flex flex-col justify-between shadow-[0_22px_48px_-14px_rgba(10,42,67,0.42)]">
                  <div>
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300">
                        Operational Blueprint
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-white/10 border border-white/15 text-[11px] font-mono text-blue-200">
                        Phase P{currentStage.step}
                      </span>
                    </div>

                    <div className="space-y-3.5">
                      <div className="p-4 rounded-xl bg-white/[0.06] border border-white/10">
                        <span className="text-[10px] font-mono text-blue-200 uppercase tracking-wider block mb-1">
                          Operational Focus
                        </span>
                        <div className="text-sm font-semibold text-white">
                          {currentStage.name} Phase Execution
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed font-normal">
                          {currentStage.tagline}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.06] border border-white/10">
                        <span className="text-[10px] font-mono text-blue-200 uppercase tracking-wider block mb-1">
                          Stage Gate Review
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed font-normal">
                          Each milestone is reviewed and tested with your team before moving forward.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.06] border border-white/10">
                        <span className="text-[10px] font-mono text-blue-200 uppercase tracking-wider block mb-1">
                          Direct Communication
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed font-normal">
                          Regular sprint check-ins and direct updates from engineers working on your build.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300 font-mono">
                    <span>AlgoForce Engineering</span>
                    <span>MSME: UDYAM-DL-08-0122150</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Commitment Banner */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#f8f9fb] border border-[#e3e8f0] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] mt-1.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <div className="text-sm font-semibold text-[#0A2A43] mb-0.5">
                  Development and ongoing support
                </div>
                <p className="text-xs text-[#5A6678] max-w-2xl leading-relaxed">
                  We remain available after launch for bug fixes, updates and system maintenance.
                </p>
              </div>
            </div>
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-white hover:bg-slate-50 text-[#0A2A43] border border-[#dce3ec] rounded-xl text-xs font-semibold whitespace-nowrap transition-all shadow-2xs hover:-translate-y-0.5"
            >
              Discuss Your Project →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowWeHelpLifecycle
