import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowDown, ArrowRight, CircleDot, CheckCircle2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'

/* ────────────────────────────────────────────
   DATA — 100% Unique, Non-Repetitive Aerospace Images
   ──────────────────────────────────────────── */

const subsystems = [
  {
    id: 'flight-software',
    title: 'Flight Software',
    category: 'Core Avionics',
    desc: 'Deterministic onboard software for guidance, navigation, and fault recovery.',
    details: 'Real-time software architectures built for embedded flight computers, focusing on fault tolerance, state management, and telemetry processing.',
    img: '/orion_flight_computer.jpg',
    alt: 'Spacecraft flight computer embedded systems hardware - Orion Advanced Space Systems',
    specs: ['Real-Time OS', 'Fault Recovery', 'State Management']
  },
  {
    id: 'digital-twin',
    title: 'Orbital Digital Twin',
    category: 'Simulation',
    desc: 'Telemetry-synchronised models reflecting spacecraft state.',
    details: 'Software models integrating ground telemetry to mirror physical spacecraft state and aid anomaly diagnosis.',
    img: '/orion_lab.jpg',
    alt: 'Orbital digital twin simulation framework lab - Orion space systems engineering',
    specs: ['State Synchronization', 'Anomaly Diagnostics', 'Telemetry Modeling']
  },
  {
    id: 'mission-simulation',
    title: 'Mission Simulation',
    category: 'Orbital Physics',
    desc: 'Physics-based orbital dynamics to test edge cases before hardware.',
    details: 'Numerical simulation environments for testing trajectory planning, attitude control loops, and mission scenarios.',
    img: '/orion_constellation.jpg',
    alt: 'Mission simulation environment for spacecraft orbital dynamics testing',
    specs: ['Orbital Dynamics', 'Attitude Modeling', 'Scenario Testing']
  },
  {
    id: 'space-robotics',
    title: 'Space Robotics',
    category: 'Robotics',
    desc: 'Manipulators and proximity control for inspection and servicing.',
    details: 'Kinematic control algorithms and visual guidance systems designed for robotic arms and orbital proximity maneuvers.',
    img: '/orion_robotics.jpg',
    alt: 'Space robotics manipulator arm for orbital servicing - Orion AlgoForce India',
    specs: ['Kinematic Control', 'Visual Servoing', 'Proximity Operations']
  },
  {
    id: 'ground-systems',
    title: 'Ground Systems',
    category: 'Communications',
    desc: 'Telemetry networks, antenna control, and satellite pass scheduling.',
    details: 'Software infrastructure for scheduling station passes, decoding telemetry packets, and routing mission commands.',
    img: '/orion_ground_antenna.jpg',
    alt: 'Deep space satellite communications network dish antenna array',
    specs: ['Pass Scheduling', 'Packet Processing', 'Command Routing']
  },
  {
    id: 'mission-control',
    title: 'Mission Control',
    category: 'Operations',
    desc: 'Unified flight control integrating telemetry, automation, and engineering teams.',
    details: 'Operational interfaces providing real-time telemetry displays, command queue auditing, and subsystem status visualization.',
    img: '/orion_mission_control.jpg',
    alt: 'Aerospace mission control center with orbital trajectory displays - Orion',
    specs: ['Telemetry Displays', 'Command Auditing', 'Status Consoles']
  },
  {
    id: 'autonomous-nav',
    title: 'Autonomous Navigation',
    category: 'GNC',
    desc: 'Star tracking, attitude determination, and thruster management.',
    details: 'Guidance, navigation, and control algorithms for processing star tracker measurements and managing orientation.',
    img: '/orion_star_tracker.jpg',
    alt: 'High precision star tracker optical sensor module on spacecraft chassis',
    specs: ['Attitude Estimation', 'Star Pattern Matching', 'Desaturation Control']
  },
  {
    id: 'spacecraft-platform',
    title: 'Spacecraft Platform',
    category: 'Bus Architecture',
    desc: 'Modular architectures built for longevity and in-orbit servicing.',
    details: 'Mechanical and electrical interface standards designed for modular spacecraft components and serviceability.',
    img: '/orion_satellite.jpg',
    alt: 'Modular spacecraft platform satellite in low Earth orbit - Orion AlgoForce',
    specs: ['Modular Interfaces', 'Thermal Architecture', 'Power Management']
  },
]

const currentWork = [
  'Orbital systems architecture',
  'Mission simulation platform',
  'Digital twin framework',
  'Robotics concepts & kinematics',
  'Guidance & navigation research',
  'University collaboration',
  'Embedded flight software',
  'Ground software',
]

/* ────────────────────────────────────────────
   COMPONENTS
   ──────────────────────────────────────────── */

const Kicker = ({ children, dark }) => (
  <p className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] ${
    dark 
      ? 'border border-[#d7b274]/30 bg-[#d7b274]/10 text-[#d7b274]' 
      : 'border border-[#8f38ff]/20 bg-[#8f38ff]/5 text-[#8f38ff]'
  }`}>
    <span className={`h-1.5 w-1.5 rounded-full ${dark ? 'bg-[#d7b274]' : 'bg-[#8f38ff]'}`} />
    {children}
  </p>
)

const FadeIn = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
)

/* ────────────────────────────────────────────
   PAGE
   ──────────────────────────────────────────── */

const Orion = () => {
  const parallaxRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const [selectedSubsystem, setSelectedSubsystem] = useState(null)

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#06101d]">

      {/* ═══════════════════════════════════════════
          1. HERO — SPACEX / ANDURIL / NASA CONFIDENT MINIMALIST
          ═══════════════════════════════════════════ */}
      <section className="relative isolate flex min-h-screen flex-col justify-between overflow-hidden bg-[#03070d] text-white">
        
        {/* Full-bleed Edge-to-Edge Cinematic Video */}
        <video
          autoPlay muted loop playsInline preload="auto"
          aria-hidden="true" tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-55 sm:opacity-65 scale-[1.02]"
        >
          <source src="/orion_video.mp4" type="video/mp4" />
        </video>

        {/* Industrial Overlay Scrim */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#03070d_0%,rgba(3,7,13,0.85)_45%,rgba(3,7,13,0.3)_75%,#03070d_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,13,0.2)_0%,rgba(3,7,13,0.96)_92%)]" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-36 pb-16 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 24 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} 
            className="max-w-[52rem]"
          >
            
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-200 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d7b274]" /> ADVANCED SPACE SYSTEMS DIVISION
            </div>

            <h1 className="text-4xl font-semibold leading-[0.96] tracking-[-0.05em] sm:text-6xl md:text-7xl lg:text-[4.5rem]">
              Engineering the infrastructure<br className="hidden sm:block" /> future civilization<br className="hidden sm:block" /> will depend on.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl">
              Flight software, space robotics, and digital twins built for the next century of orbital operations.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link 
                to="/orion/join" 
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-7 py-4 text-xs font-bold uppercase tracking-wider text-[#03070d] transition-colors hover:bg-slate-100"
              >
                <span>Become an Orion Engineer</span>
                <ArrowRight size={15} />
              </Link>
              <a 
                href="#architecture" 
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition-colors hover:bg-white/10"
              >
                <span>Mission Architecture</span>
                <ArrowDown size={14} className="text-[#d7b274]" />
              </a>
            </div>

          </motion.div>
        </div>

        {/* Minimal Subsystem Bar at Hero Bottom */}
        <div className="relative z-10 border-t border-white/10 bg-[#03070d]/80 py-4.5 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:px-6">
            <div className="flex flex-wrap items-center gap-4 sm:gap-8">
              <span>Flight Software</span>
              <span className="text-white/20">•</span>
              <span>Space Robotics</span>
              <span className="text-white/20">•</span>
              <span>Digital Twins</span>
              <span className="text-white/20">•</span>
              <span>Orbital Infrastructure</span>
            </div>
            <span className="hidden lg:inline font-mono text-slate-500">ORION ARCHITECTURE</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. SCALE VISUAL — Constellation over Earth
          ═══════════════════════════════════════════ */}
      <section ref={parallaxRef} className="relative isolate overflow-hidden bg-[#03070d] text-white">
        <motion.img
          style={{ y: imgY }}
          src="/orion_constellation.jpg"
          alt="Satellite constellation orbiting Earth viewed from space - orbital infrastructure scale"
          loading="lazy" decoding="async"
          className="h-[460px] w-full object-cover opacity-75 sm:h-[580px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03070d] via-transparent to-[#03070d]/60" />
        <FadeIn className="absolute bottom-12 left-5 right-5 mx-auto max-w-7xl sm:left-6 sm:right-6">
          <p className="max-w-3xl text-2xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Space is expanding from single-use satellites into a connected orbital ecosystem.
          </p>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════
          3. WHY SPACE MUST CHANGE
          ═══════════════════════════════════════════ */}
      <section id="why" className="mx-auto max-w-7xl px-5 py-24 sm:px-6 md:py-32">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <FadeIn>
            <Kicker>Why Space Must Change</Kicker>
            <p className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">Spacecraft wasn&apos;t designed to endure.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.04em] md:text-5xl">Spacecraft are launched, operated in isolation, and abandoned.</h2>
          </FadeIn>
        </div>
        <div className="mt-16 grid border-l border-t border-[#10223b]/10 md:grid-cols-3">
          {[
            { title: 'Single-Use Spacecraft', desc: 'Launched, operated, and decommissioned once fuel or key components degrade.' },
            { title: 'No In-Orbit Servicing', desc: 'Absence of standardized docking interfaces for maintenance or refueling.' },
            { title: 'Fragmented Operations', desc: 'Isolated ground operations lacking distributed autonomy and digital twins.' },
          ].map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.08} className="border-b border-r border-[#10223b]/10 px-6 py-8 sm:px-8 md:py-10">
              <span className="text-[10px] font-bold tracking-[0.16em] text-[#b98448]">0{i + 1}</span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600">{p.desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. FUTURE ORBIT — Industrial Architecture
          ═══════════════════════════════════════════ */}
      <section id="architecture" className="border-y border-white/10 bg-[#0a1628] text-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 md:py-32">
          <FadeIn className="max-w-3xl">
            <Kicker dark>A Different Way to Build Orbit</Kicker>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">Orbit should become enduring infrastructure.</h2>
          </FadeIn>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { img: '/orion_satellite.jpg', alt: 'Orbital satellite infrastructure engineered for persistent operations', title: 'Orbital Infrastructure', desc: 'Space systems engineered for serviceability, modularity, and decade-scale operation.' },
              { img: '/orion_lab.jpg', alt: 'Autonomous spacecraft operations flight software system', title: 'Autonomous Operations', desc: 'Flight software executing perception, trajectory planning, and onboard decision loops.' },
              { img: '/orion_robotics.jpg', alt: 'Robotic manipulator arm performing orbital inspection and servicing', title: 'Robotic Servicing', desc: 'Manipulators and proximity control for orbital inspection, capture, and repair.' },
            ].map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.1} className="group overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-[#d7b274]/40">
                <img src={card.img} alt={card.alt} loading="lazy" decoding="async" className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <div className="p-7">
                  <h3 className="text-xl font-semibold">{card.title}</h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-300">{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. SUBSYSTEMS — 100% Unique Visual Cards
          ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 md:py-32">
        <FadeIn className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Kicker>Subsystems</Kicker>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">Engineering Systems</h2>
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {subsystems.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.05} className="group cursor-pointer">
              <div 
                onClick={() => setSelectedSubsystem(s)}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#10223b]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8f38ff]/40 hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden bg-[#0a1628]">
                  <img src={s.img} alt={s.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                  <span className="absolute top-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#d7b274] backdrop-blur-md">
                    {s.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-[#06101d]">{s.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">{s.desc}</p>
                  </div>
                  <div className="mt-6 border-t border-slate-100 pt-3">
                    <span className="text-[11px] font-bold text-[#8f38ff] group-hover:underline">Explore Architecture &rarr;</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. MANIFESTO & CINEMATIC VIDEO — Looping background
          ═══════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden bg-[#03070d] py-32 text-white md:py-44">
        <video
          autoPlay muted loop playsInline preload="auto"
          aria-hidden="true" tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover opacity-50 sm:opacity-60 scale-[1.03]"
        >
          <source src="/orion_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#03070d]/90 via-[#03070d]/70 to-[#03070d]/95" />
        
        <div className="relative mx-auto max-w-5xl px-5 sm:px-6">
          <FadeIn>
            <div className="space-y-8 text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-4xl md:text-5xl lg:text-[3.75rem]">
              <p className="text-white drop-shadow-md">Great civilizations are remembered by the infrastructure they leave behind.</p>
              <p className="text-slate-400">We believe humanity&apos;s next infrastructure will not be built on Earth.</p>
              <p className="text-[#d7b274] drop-shadow-lg">It will be engineered in orbit.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. CURRENT ENGINEERING — Grounded focus areas
          ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <FadeIn>
            <Kicker>Current Engineering</Kicker>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">What We&apos;re Working On</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">Active research, simulation harness development, and subsystem architecture.</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid gap-3 sm:grid-cols-2">
              {currentWork.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="flex items-center gap-3.5 rounded-xl border border-[#10223b]/10 bg-white p-4.5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#8f38ff]/30"
                >
                  <CheckCircle2 size={16} className="text-[#8f38ff] shrink-0" />
                  <span className="text-xs font-semibold text-[#06101d]">{item}</span>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8. JOIN — Engineering Division Recruitment
          ═══════════════════════════════════════════ */}
      <section className="px-5 py-24 sm:px-6 md:py-32">
        <FadeIn className="mx-auto grid max-w-7xl gap-10 overflow-hidden rounded-[32px] border border-[#10223b]/10 bg-white p-8 shadow-[0_30px_80px_rgba(6,47,79,0.08)] sm:p-12 lg:grid-cols-[1fr_auto] lg:items-end md:p-16">
          <div>
            <Kicker>Join the Division</Kicker>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.04em] md:text-5xl">Engineer humanity beyond Earth.</h2>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-600">We welcome software, systems, robotics, and aerospace engineers who thrive on hard physical constraints.</p>
            <p className="mt-6 inline-flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700">
              <CircleDot size={13} className="text-[#8f38ff]" /> Mechanical · Embedded · Flight Software · Robotics · Aerospace · Simulation · GNC · Controls
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:w-60 lg:flex-col">
            <Link to="/orion/join" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#06101d] px-7 py-4 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#102640]">Become an Orion Engineer <ArrowRight size={14} /></Link>
            <Link to="/orion/join" className="inline-flex items-center justify-center rounded-xl border border-[#10223b]/10 px-7 py-4 text-xs font-bold uppercase tracking-wider text-[#06101d] transition-colors hover:bg-[#f7f9fc]">Mission Architecture</Link>
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════
          9. SUBSYSTEM SPECIFICATION MODAL
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedSubsystem && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setSelectedSubsystem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }} 
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-[#0a1628] text-white shadow-2xl"
            >
              <button 
                onClick={() => setSelectedSubsystem(null)}
                className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <X size={18} />
              </button>

              <div className="relative h-56 w-full">
                <img src={selectedSubsystem.img} alt={selectedSubsystem.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/40 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span className="rounded-full bg-[#d7b274]/20 border border-[#d7b274]/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#d7b274]">
                    {selectedSubsystem.category}
                  </span>
                  <h3 className="mt-2 text-2xl font-semibold">{selectedSubsystem.title}</h3>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <p className="text-sm leading-relaxed text-slate-300">{selectedSubsystem.details}</p>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#d7b274]">Architecture Overview</h4>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-3">
                    {selectedSubsystem.specs.map((spec) => (
                      <li key={spec} className="rounded-xl border border-white/10 bg-white/5 p-3 text-[11px] font-semibold text-slate-200">
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-[11px] text-slate-400 font-mono">ORION ARCHITECTURE</span>
                  <Link 
                    to="/orion/join" 
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-bold text-[#06101d] transition-colors hover:bg-slate-200"
                  >
                    Apply to Team &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════
          10. FOOTER — Orion dominant, AlgoForce once
          ═══════════════════════════════════════════ */}
      <footer className="border-t border-white/10 bg-[#03070d] px-5 py-12 text-slate-400 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-white">ORION</p>
            <p className="mt-1 text-xs text-slate-400">Advanced Space Systems Division</p>
            <p className="mt-1 text-[11px] text-slate-500">An initiative by AlgoForce</p>
          </div>
          <Link to="/about" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d7b274] transition-colors hover:text-[#d7b274]/80">Learn about AlgoForce &rarr;</Link>
        </div>
      </footer>
    </main>
  )
}

export default Orion
