import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, CircleDot, Cpu, Factory, Orbit, Radar, Satellite, ScanLine, Settings2, Sparkles, Waves } from 'lucide-react'
import orionLogo from '../../../Orion LOGO.png'
import OrionTechnicalDrawing from '../components/orion/OrionTechnicalDrawing'

const researchAreas = [
  { title: 'Orbital Infrastructure', icon: Orbit, description: 'Modular concepts for operations, servicing and long-duration systems in orbit.', variant: 'platform' },
  { title: 'Satellite Systems', icon: Satellite, description: 'Resilient satellite architecture designed for autonomy, observability and maintainability.', variant: 'satellite' },
  { title: 'Autonomous Robotics', icon: Settings2, description: 'Robotic systems research for inspection, manipulation and controlled remote operations.', variant: 'robotics' },
  { title: 'Mission Intelligence', icon: Radar, description: 'Decision support studies for mission planning, simulation and systems coordination.', variant: 'platform' },
  { title: 'Space Manufacturing', icon: Factory, description: 'Research into modular production methods and engineering validation in constrained environments.', variant: 'robotics' },
  { title: 'Computer Vision', icon: ScanLine, description: 'Vision-assisted inspection approaches for mechanical systems and operational awareness.', variant: 'satellite' },
  { title: 'AI Flight Systems', icon: Cpu, description: 'Safety-conscious autonomy research for complex system monitoring and response.', variant: 'platform' },
  { title: 'Ground Software', icon: Waves, description: 'Software tools for digital twins, mission analysis and engineering collaboration.', variant: 'satellite' },
]

const focusAreas = [
  'Orbital Platform Research',
  'Satellite System Architecture',
  'Autonomous Robotics',
  'Digital Mission Simulation',
  'Engineering Validation',
]

const process = ['Research', 'Simulation', 'Digital Twin', 'Prototype', 'Testing', 'Mission Ready']

const Orion = () => (
  <main className="min-h-screen bg-[#f7f9fc] pt-24 text-[#06101d] md:pt-28">
    <section className="relative overflow-hidden border-b border-[#10223b]/10 bg-white">
      <div className="absolute -right-52 top-16 h-[30rem] w-[30rem] rounded-full bg-[#8f38ff]/5 blur-[110px]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-12 sm:px-6 md:pb-20 md:pt-16 lg:grid-cols-[1fr_0.92fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#8f38ff]/25 bg-[#8f38ff]/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.19em] text-[#6e24ca]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b98448]" /> Advanced Aerospace Research Division
          </div>
          <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl md:text-7xl">ORION</h1>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">Advanced Aerospace Research Division</h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            Orion is AlgoForce&apos;s long-term aerospace research initiative focused on autonomous orbital systems, intelligent satellites, robotic servicing platforms and advanced space technologies.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/orion/join" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#06101d] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#102640]">
              Join Orion <ArrowRight size={15} />
            </Link>
            <a href="#research-areas" className="inline-flex items-center justify-center rounded-xl border border-[#06101d]/10 bg-[#f7f9fc] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#06101d] transition-colors hover:bg-slate-100">Explore research</a>
          </div>
          <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Research Division • Engineering Program • Limited Access</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.05 }} className="relative">
          <OrionTechnicalDrawing className="aspect-[1.26] shadow-[0_24px_70px_rgba(6,47,79,0.10)]" label="ORION RESEARCH PLATFORM" />
          <div className="absolute -bottom-6 -left-3 hidden w-44 overflow-hidden rounded-2xl border border-[#10223b]/10 bg-white p-2 shadow-[0_18px_45px_rgba(6,47,79,0.14)] sm:block">
            <img src={orionLogo} alt="Orion identity mark" className="aspect-square w-full rounded-xl object-cover" />
          </div>
        </motion.div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20">
      <div className="grid gap-8 rounded-[30px] border border-[#10223b]/10 bg-white p-7 shadow-[0_20px_60px_rgba(6,47,79,0.05)] md:grid-cols-[0.9fr_1.1fr] md:p-10">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8f38ff]">Vision</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight">Engineering systems for the next era of space infrastructure.</h2>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {['Orbital servicing', 'Autonomous spacecraft', 'Modular space infrastructure', 'AI-assisted mission operations', 'Robotics', 'Advanced manufacturing'].map((item) => (
            <li key={item} className="flex items-center gap-3 rounded-xl border border-[#10223b]/8 bg-[#f7f9fc] px-4 py-3 text-sm font-medium text-slate-700"><CheckCircle2 size={16} className="shrink-0 text-[#8f38ff]" />{item}</li>
          ))}
        </ul>
      </div>
    </section>

    <section id="research-areas" className="border-y border-[#10223b]/10 bg-white px-5 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8f38ff]">Research areas</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">A disciplined, multidisciplinary research program.</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">We communicate the engineering questions we are exploring—not confidential designs or proprietary architecture.</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {researchAreas.map(({ title, icon: Icon, description, variant }) => (
            <article key={title} className="group overflow-hidden rounded-[22px] border border-[#10223b]/10 bg-[#f7f9fc] transition-transform duration-300 hover:-translate-y-1">
              <OrionTechnicalDrawing variant={variant} label={title.toUpperCase()} className="aspect-[1.55] rounded-none border-0 border-b border-[#10223b]/10" />
              <div className="p-5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-[#8f38ff]/20 bg-white text-[#8f38ff]"><Icon size={17} /></div>
                <h3 className="font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8f38ff]">Engineering philosophy</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">Build carefully. Validate continuously. Communicate responsibly.</h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600">Orion is structured around simulation, systems thinking and measured validation. Our program reflects the realities of long-cycle engineering work, not speculative promises.</p>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((step, index) => (
            <li key={step} className="relative overflow-hidden rounded-2xl border border-[#10223b]/10 bg-white p-5 shadow-[0_12px_36px_rgba(6,47,79,0.04)]">
              <span className="text-[10px] font-bold tracking-widest text-[#8f38ff]">0{index + 1}</span>
              <p className="mt-6 text-base font-semibold">{step}</p>
              {index < process.length - 1 && <ArrowRight size={14} className="absolute bottom-5 right-5 text-[#b98448]" />}
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="border-y border-[#10223b]/10 bg-white px-5 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8f38ff]">Current focus</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">The work underway now.</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">Status reflects active research and engineering exploration—not flight-qualified systems.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {focusAreas.map((area, index) => (
            <div key={area} className="rounded-2xl border border-[#10223b]/10 bg-[#f7f9fc] p-5">
              <span className="text-[10px] font-bold tracking-widest text-slate-400">0{index + 1}</span>
              <h3 className="mt-7 text-sm font-semibold leading-snug">{area}</h3>
              <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-[#8f38ff]/20 bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#6e24ca]"><CircleDot size={10} /> In Progress</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8f38ff]">Engineering gallery</p><h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Technical concepts, deliberately presented.</h2></div>
        <p className="max-w-md text-sm leading-relaxed text-slate-600">Conceptual studies only. No proprietary systems, specifications or confidential designs are displayed.</p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <OrionTechnicalDrawing className="aspect-[1.25] shadow-[0_16px_44px_rgba(6,47,79,0.05)]" variant="satellite" label="SATELLITE SYSTEM STUDY" />
        <OrionTechnicalDrawing className="aspect-[1.25] shadow-[0_16px_44px_rgba(6,47,79,0.05)]" variant="robotics" label="ROBOTIC SERVICE STUDY" />
        <OrionTechnicalDrawing className="aspect-[1.25] shadow-[0_16px_44px_rgba(6,47,79,0.05)]" variant="platform" label="MODULAR PLATFORM STUDY" />
      </div>
    </section>

    <section className="px-5 pb-16 sm:px-6 md:pb-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-[#10223b]/10 bg-[#10223b] px-7 py-10 text-white shadow-[0_24px_70px_rgba(6,47,79,0.18)] sm:px-10 md:px-14 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d7b274]">Orion Engineering Program</p><h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">Join a multidisciplinary community building for the long term.</h2><p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">We welcome engineers, researchers, designers and developers working across aerospace software, embedded systems, mechanical design, AI, simulation and orbital technologies.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><Link to="/orion/join" className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#06101d] transition-colors hover:bg-[#f1ecff]">Apply Now</Link><Link to="/orion/join#community" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10">Engineering Community</Link></div>
        </div>
      </div>
    </section>
  </main>
)

export default Orion
