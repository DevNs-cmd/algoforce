import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Compass,
  Code2,
  Cpu,
  Layers,
  ShieldCheck,
  Sparkles,
  GitMerge,
  Workflow,
  Server,
  Check,
} from 'lucide-react'
import HeroWatermarkLayer from './HeroWatermarkLayer'
import './SectionSurfaces.css'

const CAPABILITY_TILES = [
  { label: 'Technology Consulting', icon: Compass, accent: 'text-[#2563EB] bg-blue-50/90 border-blue-100' },
  { label: 'Software Engineering', icon: Code2, accent: 'text-[#0A2A43] bg-slate-100/90 border-slate-200/80' },
  { label: 'AI & Automation', icon: Cpu, accent: 'text-[#9A4DFF] bg-purple-50/90 border-purple-100' },
  { label: 'Enterprise Solutions', icon: Layers, accent: 'text-[#2563EB] bg-blue-50/90 border-blue-100' },
  { label: 'Managed Services', icon: ShieldCheck, accent: 'text-[#0A2A43] bg-slate-100/90 border-slate-200/80' },
  { label: 'Products & R&D', icon: Sparkles, accent: 'text-[#9A4DFF] bg-purple-50/90 border-purple-100' },
]

const ENGINEERING_TRACKS = [
  { label: 'Custom Applications', barWidth: 'w-[78%]', barColor: 'bg-[#0A2A43]', dotColor: 'bg-[#0A2A43]' },
  { label: 'Digital Infrastructure', barWidth: 'w-[66%]', barColor: 'bg-[#2563EB]', dotColor: 'bg-[#2563EB]' },
  { label: 'Software Engineering', barWidth: 'w-[84%]', barColor: 'bg-[#9A4DFF]', dotColor: 'bg-[#9A4DFF]' },
]

const ENTERPRISE_SYSTEMS = [
  { label: 'System Integration', icon: GitMerge, tint: 'text-[#2563EB] bg-blue-50/90 border-blue-100' },
  { label: 'Workflow Automation', icon: Workflow, tint: 'text-[#9A4DFF] bg-purple-50/90 border-purple-100' },
  { label: 'Operational Systems', icon: Server, tint: 'text-[#0A2A43] bg-slate-100/90 border-slate-200/80' },
]

const CONSULTING_ITEMS = ['Architecture', 'Digital Strategy', 'Technical Assessment']

const FolderTabEar = () => (
  <div
    className="hidden sm:block absolute -top-[9px] left-5 h-[10px] w-16 rounded-t-lg bg-white/95 border-t border-x border-[#e3e8f0]"
    aria-hidden="true"
  />
)

const FloatingConsultingCard = ({ compact = false }) => (
  <div className="relative select-none">
    {/* Layered offset cream-ivory paper sheet behind */}
    <div
      className="hidden sm:block absolute inset-0 rounded-[20px] bg-[#FAFBFD] border border-[#e3e8f0] translate-x-2 translate-y-2 rotate-[3.5deg] shadow-sm"
      aria-hidden="true"
    />

    {/* Main editorial white note card */}
    <div className="relative h-full rounded-[20px] bg-white border border-[#e2e8f0] p-4 sm:p-5 saas-paper-shadow transition-shadow duration-300 text-left">
      {/* Subtle pushpin accent on desktop/tablet */}
      <div className="hidden sm:flex justify-center -mt-7 mb-2.5" aria-hidden="true">
        <span className="w-3.5 h-3.5 rounded-full saas-pin ring-2 ring-white" />
      </div>

      <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-100">
        <span className="text-[12.5px] sm:text-[13px] font-semibold tracking-tight text-[#0A2A43]">
          Technology Consulting
        </span>
      </div>

      <ul className="space-y-2 text-left">
        {CONSULTING_ITEMS.map((item) => (
          <li key={item} className="flex items-center gap-2 text-[12px] text-slate-600 font-medium leading-snug">
            <span className="w-4 h-4 rounded-md bg-blue-50 border border-blue-100 text-[#2563EB] flex items-center justify-center flex-shrink-0">
              <Check size={10} strokeWidth={2.5} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Overlapping floating squircle icon card (hidden on compact mobile to avoid clutter) */}
    {!compact && (
      <div
        className="hidden xl:flex absolute -bottom-4 -right-3 w-11 h-11 rounded-2xl bg-white border border-[#e2e8f0] saas-squircle-badge items-center justify-center rotate-[7deg]"
        aria-hidden="true"
      >
        <div className="w-6 h-6 rounded-lg bg-[#2563EB] text-white flex items-center justify-center">
          <Compass size={14} strokeWidth={2.1} />
        </div>
      </div>
    )}
  </div>
)

const FloatingEnterpriseCard = ({ compact = false }) => (
  <div className="relative select-none">
    {/* Back translucent card layer for perspective & depth */}
    <div
      className="hidden sm:block absolute inset-0 rounded-[20px] bg-white/65 border border-[#e2e8f0]/80 translate-x-2 translate-y-2 -rotate-[2deg]"
      aria-hidden="true"
    />

    {/* Layered translucent foreground card */}
    <div className="relative h-full rounded-[20px] bg-white/95 sm:bg-white/85 backdrop-blur-md border border-[#e2e8f0] p-4 sm:p-5 saas-card-elevation saas-card-elevation-hover text-left">
      <FolderTabEar />

      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-[12.5px] sm:text-[13px] font-semibold tracking-tight text-[#0A2A43]">
          Enterprise Solutions
        </span>
        <span className="w-2 h-2 rounded-full bg-[#2563EB]/70" aria-hidden="true" />
      </div>

      <div className="space-y-2 text-left">
        {ENTERPRISE_SYSTEMS.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.label}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-[#f7f9fc]/90 border border-[#e7ecf3]"
            >
              <span className={`w-6 h-6 rounded-lg border flex items-center justify-center flex-shrink-0 ${item.tint}`}>
                <Icon size={12} strokeWidth={2.1} />
              </span>
              <span className="text-[11.5px] sm:text-[12px] font-medium text-[#0A2A43]/90 leading-tight">
                {item.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>

    {/* Overlapping floating system badge on upper-left edge */}
    {!compact && (
      <div
        className="hidden xl:flex absolute -top-4 -left-4 w-11 h-11 rounded-2xl bg-white border border-[#e2e8f0] saas-squircle-badge items-center justify-center -rotate-[8deg]"
        aria-hidden="true"
      >
        <div className="w-6 h-6 rounded-lg bg-[#0A2A43] text-white flex items-center justify-center">
          <Layers size={14} strokeWidth={2.1} />
        </div>
      </div>
    )}
  </div>
)

const FloatingEngineeringCard = () => (
  <div className="relative select-none h-full">
    <div className="relative h-full rounded-[20px] bg-white/95 border border-[#e2e8f0] p-4 sm:p-5 lg:pb-7 saas-card-elevation saas-card-elevation-hover text-left">
      <FolderTabEar />

      <div className="flex items-center justify-between gap-2 mb-3.5">
        <span className="text-[12.5px] sm:text-[13px] font-semibold tracking-tight text-[#0A2A43]">
          Engineering &amp; Development
        </span>
      </div>

      <div className="space-y-2.5">
        {ENGINEERING_TRACKS.map((track) => (
          <div
            key={track.label}
            className="p-2.5 rounded-xl bg-[#f8fafc] border border-[#e8edf4]"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`w-2 h-2 rounded-sm ${track.dotColor} flex-shrink-0`} aria-hidden="true" />
              <span className="text-[11.5px] sm:text-[12px] font-medium text-[#0A2A43] leading-none">
                {track.label}
              </span>
            </div>
            {/* Subtle minimal progress bar visual without fabricated metrics */}
            <div className="h-1.5 w-full rounded-full bg-slate-200/80 overflow-hidden" aria-hidden="true">
              <div className={`h-full rounded-full ${track.barColor} opacity-85 ${track.barWidth}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const FloatingDivisionsCard = ({ compact = false }) => (
  <div className="relative select-none h-full">
    <div className="relative h-full rounded-[20px] bg-white/95 border border-[#e2e8f0] p-4 sm:p-5 lg:pb-7 saas-card-elevation saas-card-elevation-hover text-left">
      <FolderTabEar />

      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-[12.5px] sm:text-[13px] font-semibold tracking-tight text-[#0A2A43]">
          Six Core Divisions
        </span>
      </div>

      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
        {CAPABILITY_TILES.map((tile, idx) => {
          const Icon = tile.icon
          const staggerClass = !compact && idx % 2 === 1 ? 'sm:translate-y-0.5' : ''
          return (
            <div
              key={tile.label}
              className={`flex items-center gap-1.5 px-2 py-2 rounded-xl bg-white border border-[#e5eaf2] shadow-[0_2px_6px_-2px_rgba(10,42,67,0.06)] ${staggerClass}`}
            >
              <span className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 ${tile.accent}`}>
                <Icon size={11} strokeWidth={2.1} />
              </span>
              <span className="text-[10.5px] sm:text-[11px] font-medium text-[#0A2A43]/90 leading-tight">
                {tile.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  </div>
)

const Hero = () => {
  const prefersReducedMotion = useReducedMotion()

  // Pointer parallax motion values (zero React re-renders)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 75, damping: 24, mass: 0.8 })
  const smoothY = useSpring(pointerY, { stiffness: 75, damping: 24, mass: 0.8 })

  const depthNearX = useTransform(smoothX, [-1, 1], [-8, 8])
  const depthNearY = useTransform(smoothY, [-1, 1], [-7, 7])
  const depthMidX = useTransform(smoothX, [-1, 1], [6, -6])
  const depthMidY = useTransform(smoothY, [-1, 1], [5, -5])
  const depthSubtleX = useTransform(smoothX, [-1, 1], [-3, 3])
  const depthSubtleY = useTransform(smoothY, [-1, 1], [-2, 2])
  const depthWatermarkPrimaryX = useTransform(smoothX, [-1, 1], [4, -4])
  const depthWatermarkPrimaryY = useTransform(smoothY, [-1, 1], [3, -3])
  const depthWatermarkMicroX = useTransform(smoothX, [-1, 1], [-7, 7])
  const depthWatermarkMicroY = useTransform(smoothY, [-1, 1], [-5, 5])

  useEffect(() => {
    if (prefersReducedMotion) {
      pointerX.set(0)
      pointerY.set(0)
    }
  }, [prefersReducedMotion, pointerX, pointerY])

  const handlePointerMove = (e) => {
    if (prefersReducedMotion) return
    if (e.pointerType && e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    pointerX.set(normX)
    pointerY.set(normY)
  }

  const handlePointerLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  const floatLoop = (duration, yShift = 5) =>
    prefersReducedMotion
      ? undefined
      : {
        y: [0, -yShift, 0],
        transition: {
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }

  const cardEntrance = (delay = 0) =>
    prefersReducedMotion
      ? { initial: false, animate: { opacity: 1 } }
      : {
        initial: { opacity: 0, y: 14, scale: 0.97 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
      }

  return (
    <section
      aria-label="AlgoForce Hero"
      className="relative w-full bg-white pt-[74px] sm:pt-[86px] pb-6 sm:pb-8 px-3 sm:px-5 lg:px-7 overflow-x-clip"
    >
      {/* Large Rounded Hero Canvas matching ChronoTask inspiration */}
      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="saas-canvas relative mx-auto max-w-[1400px] rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] border border-[#e3e8f0] overflow-hidden shadow-[0_1px_3px_rgba(10,42,67,0.03),0_22px_55px_-28px_rgba(10,42,67,0.09)] lg:min-h-[690px] xl:min-h-[735px] flex flex-col justify-center"
      >
        {/* Micro-dot textured background, signature AlgoForce watermark & subtle center light halo */}
        <div className="saas-dot-matrix absolute inset-0 pointer-events-none" aria-hidden="true" />
        <HeroWatermarkLayer
          depthPrimaryX={depthWatermarkPrimaryX}
          depthPrimaryY={depthWatermarkPrimaryY}
          depthMicroX={depthWatermarkMicroX}
          depthMicroY={depthWatermarkMicroY}
        />
        <div className="saas-center-halo absolute inset-0 z-[2] pointer-events-none" aria-hidden="true" />

        {/* Subtle geometric edge border highlight */}
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* DESKTOP FLOATING CARDS — Four Corner Composition (lg+ screens) */}
        <div className="hidden lg:block pointer-events-none" aria-hidden="true">
          {/* FLOATING CARD 1 — LEFT TOP */}
          <motion.div
            {...cardEntrance(0.18)}
            style={prefersReducedMotion ? undefined : { x: depthNearX, y: depthNearY }}
            className="saas-motion-safe pointer-events-auto absolute top-6 left-4 xl:top-9 xl:left-9 w-[205px] xl:w-[242px] -rotate-[5deg] z-10 hover:z-30 transition-transform duration-300 hover:-translate-y-1"
          >
            <motion.div animate={floatLoop(6.2, 5)}>
              <FloatingConsultingCard />
            </motion.div>
          </motion.div>

          {/* FLOATING CARD 2 — RIGHT TOP */}
          <motion.div
            {...cardEntrance(0.24)}
            style={prefersReducedMotion ? undefined : { x: depthMidX, y: depthMidY }}
            className="saas-motion-safe pointer-events-auto absolute top-7 right-4 xl:top-10 xl:right-9 w-[208px] xl:w-[246px] rotate-[4.5deg] z-10 hover:z-30 transition-transform duration-300 hover:-translate-y-1"
          >
            <motion.div animate={floatLoop(6.9, 6)}>
              <FloatingEnterpriseCard />
            </motion.div>
          </motion.div>

          {/* FLOATING CARD 3 — LEFT BOTTOM */}
          <motion.div
            {...cardEntrance(0.3)}
            style={prefersReducedMotion ? undefined : { x: depthMidX, y: depthNearY }}
            className="saas-motion-safe pointer-events-auto absolute -bottom-3 left-4 xl:-bottom-2 xl:left-9 w-[212px] xl:w-[252px] rotate-[2.5deg] z-10 hover:z-30 transition-transform duration-300 hover:-translate-y-1"
          >
            <motion.div animate={floatLoop(7.4, 4)}>
              <FloatingEngineeringCard />
            </motion.div>
          </motion.div>

          {/* FLOATING CARD 4 — RIGHT BOTTOM */}
          <motion.div
            {...cardEntrance(0.36)}
            style={prefersReducedMotion ? undefined : { x: depthNearX, y: depthMidY }}
            className="saas-motion-safe pointer-events-auto absolute -bottom-3 right-4 xl:-bottom-2 xl:right-9 w-[224px] xl:w-[278px] -rotate-[3.5deg] z-10 hover:z-30 transition-transform duration-300 hover:-translate-y-1"
          >
            <motion.div animate={floatLoop(6.6, 5)}>
              <FloatingDivisionsCard />
            </motion.div>
          </motion.div>
        </div>

        {/* CENTRAL HERO CONTENT */}
        <div className="relative z-20 mx-auto w-full max-w-[500px] xl:max-w-[600px] 2xl:max-w-[640px] px-5 sm:px-8 pt-10 pb-8 sm:pt-14 sm:pb-12 lg:py-16 text-center">
          {/* Central Brand Element above the headline — Preserves exact logo & astronaut placement */}
          <motion.div
            {...cardEntrance(0.05)}
            style={prefersReducedMotion ? undefined : { x: depthSubtleX, y: depthSubtleY }}
            className="flex justify-center mb-7 sm:mb-8"
          >
            <motion.div
              animate={floatLoop(5.6, 4)}
              className="saas-motion-safe inline-flex items-center justify-center rounded-[20px] sm:rounded-[22px] bg-white px-5 py-2.5 sm:px-6 sm:py-3 border border-[#e3e8f0] shadow-[0_18px_38px_-10px_rgba(10,42,67,0.16),0_6px_14px_-4px_rgba(10,42,67,0.08),inset_0_1px_0_rgba(255,255,255,1)]"
            >
              <img
                src="/algoforce-hero-logo.png"
                alt="AlgoForce"
                width={605}
                height={227}
                loading="eager"
                className="h-9 sm:h-11 md:h-[46px] w-auto object-contain select-none"
              />
            </motion.div>
          </motion.div>

          {/* Central Headline */}
          <motion.h1
            {...cardEntrance(0.12)}
            className="font-['Outfit',sans-serif] text-[2rem] min-[400px]:text-[2.35rem] sm:text-[3rem] lg:text-[2.75rem] xl:text-[3.5rem] 2xl:text-[3.85rem] font-semibold tracking-[-0.032em] leading-[1.1] text-[#0A2A43] mb-5"
          >
            <span className="block">Your Technology Partner.</span>
            <span className="block mt-1.5 text-[#6F7C8E] font-medium">
              From Problem to Progress.
            </span>
          </motion.h1>

          {/* Supporting Description */}
          <motion.p
            {...cardEntrance(0.18)}
            className="mx-auto max-w-[520px] text-[14.5px] sm:text-[15.5px] xl:text-[16.5px] leading-[1.65] text-[#4A5769] font-normal mb-8"
          >
            Software, automation and technology services for businesses and institutions.
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div
            {...cardEntrance(0.24)}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 w-full max-w-md mx-auto"
          >
            <Link
              to="/contact"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0A2A43] hover:bg-[#113D61] text-white text-[14px] font-medium tracking-[-0.01em] inline-flex items-center justify-center gap-2 shadow-[0_10px_24px_-6px_rgba(10,42,67,0.38),0_2px_6px_-1px_rgba(10,42,67,0.2),inset_0_1px_0_rgba(255,255,255,0.16)] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-6px_rgba(10,42,67,0.44)] active:translate-y-0 transition-all duration-200 whitespace-nowrap"
            >
              <span>Discuss Your Requirement</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              to="/services"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/95 hover:bg-white text-[#0A2A43] border border-[#dce3ec] hover:border-[#c6d1de] text-[14px] font-medium tracking-[-0.01em] inline-flex items-center justify-center gap-2 shadow-[0_2px_10px_-2px_rgba(10,42,67,0.06),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_-4px_rgba(10,42,67,0.1)] active:translate-y-0 transition-all duration-200 whitespace-nowrap"
            >
              <span>Explore Our Services</span>
            </Link>
          </motion.div>

          {/* TABLET & MOBILE CAPABILITY CARDS — Stacked cleanly without overlapping text (< lg screens) */}
          <motion.div
            {...cardEntrance(0.3)}
            className="lg:hidden mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
          >
            <div className="sm:-rotate-[1deg]">
              <FloatingConsultingCard compact />
            </div>
            <div className="sm:rotate-[1deg]">
              <FloatingEnterpriseCard compact />
            </div>
            <div className="sm:rotate-[1deg]">
              <FloatingEngineeringCard />
            </div>
            <div className="sm:-rotate-[1deg]">
              <FloatingDivisionsCard compact />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
