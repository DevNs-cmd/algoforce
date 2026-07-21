import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, CircleDot } from 'lucide-react'
import orionLogo from '../../../Orion LOGO.png'
import OrionTechnicalDrawing from '../components/orion/OrionTechnicalDrawing'

const researchAreas = [
  { title: 'Orbital Robotics', description: 'Robotic servicing studies for inspection, manipulation and controlled operations in orbit.', variant: 'robotics' },
  { title: 'Satellite Systems', description: 'Resilient satellite architectures designed for autonomy, observability and maintainability.', variant: 'satellite' },
  { title: 'Mission Intelligence', description: 'Decision-support research for mission planning, simulation and systems coordination.', variant: 'platform' },
  { title: 'Space Manufacturing', description: 'Modular production methods and engineering validation in constrained environments.', variant: 'robotics' },
  { title: 'Computer Vision', description: 'Vision-assisted inspection for mechanical systems and operational awareness.', variant: 'satellite' },
  { title: 'AI Flight Systems', description: 'Safety-conscious autonomy research for complex system monitoring and response.', variant: 'platform' },
  { title: 'Ground Software', description: 'Digital-twin tools, mission analysis and engineering collaboration systems.', variant: 'satellite' },
  { title: 'Orbital Infrastructure', description: 'Modular concepts for long-duration platforms, operations and servicing.', variant: 'platform' },
]

const programStats = [
  { value: '5', label: 'Research programs' },
  { value: '8', label: 'Engineering domains' },
  { value: 'Simulation-led', label: 'Validation approach' },
  { value: 'Open', label: 'Contributor community' },
  { value: 'In formation', label: 'University collaboration' },
]

const roadmap = [
  ['2026', 'Research Foundation'],
  ['01', 'Simulation'],
  ['02', 'Prototype'],
  ['03', 'Subsystem Validation'],
  ['04', 'Ground Testing'],
  ['05', 'Technology Demonstration'],
  ['Future', 'Future Mission'],
]

const principles = [
  ['Simulation First', 'Model complex behaviour before committing physical systems.'],
  ['Safety by Design', 'Design for controllability, observability and safe failure states.'],
  ['Systems Engineering', 'Treat software, hardware, operations and people as one system.'],
  ['Mission Reliability', 'Validate assumptions through disciplined, repeatable testing.'],
  ['Modularity', 'Build architectures that can be inspected, replaced and evolved.'],
  ['Autonomous Intelligence', 'Use autonomy to support accountable engineering judgment.'],
  ['Verification', 'Make evidence, traceability and test coverage first-class work.'],
  ['Long-Term Thinking', 'Prioritize durable infrastructure over short-term spectacle.'],
]

const activePrograms = [
  'Orbital platform research',
  'Satellite system architecture',
  'Autonomous robotics',
  'Digital mission simulation',
  'Engineering validation',
]

const galleryStudies = [
  ['ORBITAL PLATFORM STUDY', 'platform', 'md:col-span-2'],
  ['SATELLITE CONFIGURATION', 'satellite', ''],
  ['ROBOTIC SERVICE STUDY', 'robotics', ''],
  ['MISSION PLANNING MODEL', 'platform', ''],
  ['DIGITAL TWIN SYSTEM', 'satellite', 'md:col-span-2'],
  ['INSPECTION ROBOTICS', 'robotics', ''],
  ['ORBITAL NETWORK', 'satellite', ''],
]

const publications = ['Autonomous Docking', 'Orbital Servicing', 'Digital Twin Architecture', 'Mission AI', 'Orbital Manufacturing', 'Satellite Intelligence']

const disciplines = ['Mechanical engineering', 'Aerospace engineering', 'Software engineering', 'Embedded systems', 'AI & computer vision', 'Robotics & controls', 'Simulation & digital twins', 'CAD & systems engineering', 'Mission planning', 'GNC, payload & power systems']

const SystemArchitecture = () => (
  <div className="overflow-hidden rounded-[26px] border border-[#10223b]/10 bg-[#f6f8fb] p-4 shadow-[0_16px_44px_rgba(6,47,79,0.05)] sm:p-6">
    <div className="grid gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#10223b] sm:grid-cols-3">
      {[
        ['Ground Control', 'Planning, command & telemetry'],
        ['Mission AI', 'Autonomy, prediction & coordination'],
        ['Orbital Platform', 'Operations & servicing'],
        ['Satellite Cluster', 'Sensing, communications & power'],
        ['Robotic Systems', 'Inspection, manipulation & repair'],
        ['Digital Twin', 'Simulation, fault injection & validation'],
      ].map(([title, detail], index) => (
        <div key={title} className="relative min-h-28 border border-[#10223b]/10 bg-white p-4 sm:min-h-32">
          <span className="text-[#b98448]">0{index + 1}</span>
          <h3 className="mt-5 text-xs font-semibold tracking-tight text-[#06101d]">{title}</h3>
          <p className="mt-2 text-[10px] font-medium normal-case leading-relaxed tracking-normal text-slate-500">{detail}</p>
          {index < 5 && <ArrowRight size={13} className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 bg-[#f6f8fb] text-[#8f38ff] sm:block" />}
        </div>
      ))}
    </div>
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#10223b]/10 pt-4 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
      <span>Communications • Power • Sensors • Telemetry</span>
      <span className="text-[#8f38ff]">Closed-loop validation</span>
    </div>
  </div>
)

const Orion = () => (
  <main className="min-h-screen bg-[#f7f9fc] pt-24 text-[#06101d] md:pt-28">
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#03070d] text-white">
      <img src={orionLogo} alt="" aria-hidden="true" fetchpriority="high" className="absolute inset-0 h-full w-full object-cover object-[62%_45%] opacity-70 mix-blend-screen sm:object-[72%_48%]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#03070d_0%,rgba(3,7,13,0.9)_37%,rgba(3,7,13,0.48)_68%,#03070d_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,13,0.3),rgba(3,7,13,0.86)_92%)]" />
      <div className="absolute inset-0 subtle-ai-grid opacity-30" />
      <div className="relative mx-auto grid min-h-[620px] max-w-7xl content-center gap-10 px-5 py-16 sm:px-6 md:min-h-[690px] md:py-20 lg:grid-cols-[1fr_0.92fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.19em] text-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d7b274] shadow-[0_0_12px_rgba(215,178,116,0.9)]" /> Independent aerospace research program
          </div>
          <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl md:text-7xl">ORION</h1>
          <h2 className="mt-5 max-w-3xl text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">Orbital Resource Infrastructure &amp; Operations Network</h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">Engineering the next generation of autonomous orbital infrastructure through simulation, systems engineering and long-term research.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/orion/join" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#06101d] transition-colors hover:bg-[#f1ecff]">Join Engineering Program <ArrowRight size={15} /></Link>
            <a href="#research-areas" className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10">Explore research</a>
          </div>
        </motion.div>
        <div className="hidden lg:block" aria-hidden="true" />
      </div>
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-px border-t border-white/15 bg-white/15 sm:grid-cols-5">
        {programStats.map(({ value, label }, index) => (
          <motion.div key={label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + index * 0.06 }} className="bg-[#03070d]/85 px-4 py-5 sm:px-5 md:py-6">
            <p className="text-sm font-semibold tracking-tight text-white sm:text-base">{value}</p>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">{label}</p>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8f38ff]">System architecture</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">One engineering system, from ground control to orbit.</h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600">Orion connects mission planning, autonomous intelligence, orbital platforms and digital validation in one traceable engineering loop.</p>
          <div className="mt-7 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">{['Ground control', 'Mission AI', 'Orbital platform', 'Satellite cluster', 'Robotic systems', 'Digital twin'].map((item) => <p key={item} className="border-l-2 border-[#d7b274] pl-3 font-medium">{item}</p>)}</div>
        </div>
        <SystemArchitecture />
      </div>
    </section>

    <section className="border-y border-[#10223b]/10 bg-white px-5 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8f38ff]">Road to orbit</p><h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">A research roadmap built for measured progress.</h2><p className="mt-4 text-sm leading-relaxed text-slate-600">Aerospace work earns confidence through stages of simulation, prototype learning and validation—not premature claims.</p></div>
        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
          {roadmap.map(([code, title], index) => <li key={title} className="relative min-h-32 border border-[#10223b]/10 bg-[#f7f9fc] p-4"><span className="text-[10px] font-bold tracking-widest text-[#8f38ff]">{code}</span><h3 className="mt-6 text-sm font-semibold leading-snug">{title}</h3>{index < roadmap.length - 1 && <ArrowRight size={13} className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 bg-white text-[#b98448] lg:block" />}</li>)}
        </ol>
      </div>
    </section>

    <section id="research-areas" className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20">
      <div className="max-w-2xl"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8f38ff]">Research domains</p><h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Engineering questions worth examining closely.</h2><p className="mt-4 text-sm leading-relaxed text-slate-600">We share the domains we are exploring, not confidential designs or flight-qualified claims.</p></div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {researchAreas.map(({ title, description, variant }) => <article key={title} className="group overflow-hidden rounded-[22px] border border-[#10223b]/10 bg-white transition-transform duration-300 hover:-translate-y-1"><OrionTechnicalDrawing variant={variant} label={title.toUpperCase()} className="aspect-[1.55] rounded-none border-0 border-b border-[#10223b]/10" /><div className="p-5"><h3 className="font-semibold tracking-tight">{title}</h3><p className="mt-2 text-xs leading-relaxed text-slate-600">{description}</p></div></article>)}
      </div>
    </section>

    <section className="border-y border-[#10223b]/10 bg-[#10223b] px-5 py-14 text-white sm:px-6 md:py-20">
      <div className="mx-auto max-w-7xl"><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d7b274]">Engineering principles</p><h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">A blueprint for responsible, long-cycle engineering.</h2><p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300">Serious infrastructure requires explicit principles before it requires ambitious claims.</p></div><OrionTechnicalDrawing variant="platform" label="ORION ENGINEERING PRINCIPLES" className="min-h-[245px] shadow-[0_20px_60px_rgba(0,0,0,0.22)]" /></div>
        <div className="mt-8 grid border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">{principles.map(([title, description], index) => <div key={title} className="border-b border-r border-white/15 p-5"><span className="text-[10px] font-bold tracking-widest text-[#d7b274]">0{index + 1}</span><h3 className="mt-5 text-sm font-semibold">{title}</h3><p className="mt-2 text-xs leading-relaxed text-slate-300">{description}</p></div>)}</div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20">
      <div className="grid gap-8 rounded-[30px] border border-[#10223b]/10 bg-white p-7 shadow-[0_20px_60px_rgba(6,47,79,0.05)] lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
        <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8f38ff]">Digital twin &amp; mission simulation</p><h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight">Validate the mission before committing the hardware.</h2><p className="mt-5 text-sm leading-relaxed text-slate-600">Digital twins create a common space for mission simulation, hardware-in-the-loop studies, software validation, fault injection and mission planning.</p><ul className="mt-7 space-y-3">{['Mission simulation', 'Hardware-in-the-loop', 'Software validation', 'Fault injection', 'Mission planning'].map((item) => <li key={item} className="flex items-center gap-3 text-sm font-medium text-slate-700"><CheckCircle2 size={16} className="text-[#8f38ff]" />{item}</li>)}</ul></div>
        <div className="overflow-hidden rounded-2xl border border-[#10223b]/10 bg-[#f6f8fb] p-4 sm:p-6"><div className="flex items-center justify-between border-b border-[#10223b]/10 pb-3 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500"><span>ORION digital twin</span><span className="text-[#8f38ff]">Simulation active</span></div><div className="mt-5 grid gap-4 sm:grid-cols-[1.25fr_0.75fr]"><OrionTechnicalDrawing variant="satellite" label="ORBITAL STATE MODEL" className="min-h-[235px] rounded-xl" /><div className="grid gap-4"><div className="border border-[#10223b]/10 bg-white p-4"><p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Telemetry</p><div className="mt-5 flex h-16 items-end gap-1">{[35, 58, 42, 78, 55, 72, 48, 86].map((height, index) => <span key={index} style={{ height: `${height}%` }} className="flex-1 bg-[#8f38ff]/60" />)}</div></div><div className="border border-[#10223b]/10 bg-white p-4"><p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Test sequence</p><p className="mt-4 text-xs font-semibold text-[#06101d]">Fault injection → response validation</p></div></div></div></div>
      </div>
    </section>

    <section className="border-y border-[#10223b]/10 bg-white px-5 py-14 sm:px-6 md:py-20"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8f38ff]">Current research programs</p><h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">The work underway now.</h2></div><p className="max-w-md text-sm leading-relaxed text-slate-600">Statuses reflect active engineering exploration, not flight-qualified systems.</p></div><div className="mt-10 grid gap-4 md:grid-cols-5">{activePrograms.map((area, index) => <div key={area} className="border border-[#10223b]/10 bg-[#f7f9fc] p-5"><span className="text-[10px] font-bold tracking-widest text-slate-400">0{index + 1}</span><h3 className="mt-7 text-sm font-semibold leading-snug">{area}</h3><div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-[#8f38ff]/20 bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#6e24ca]"><CircleDot size={10} /> In progress</div></div>)}</div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8f38ff]">Engineering gallery</p><h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Concept studies, deliberately presented.</h2></div><p className="max-w-md text-sm leading-relaxed text-slate-600">Blueprints, operational models and engineering studies. No confidential systems or flight specifications are shown.</p></div><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{galleryStudies.map(([label, variant, span]) => <OrionTechnicalDrawing key={label} className={`aspect-[1.22] shadow-[0_16px_44px_rgba(6,47,79,0.05)] ${span}`} variant={variant} label={label} />)}</div></section>

    <section className="border-y border-[#10223b]/10 bg-white px-5 py-14 sm:px-6 md:py-20"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8f38ff]">Research publications</p><h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Research in progress.</h2><p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-600">Orion will publish only when work is ready for responsible public discussion. We do not present speculative concepts as completed research.</p></div><div className="grid border-l border-t border-[#10223b]/10 sm:grid-cols-2 lg:grid-cols-3">{publications.map((topic) => <div key={topic} className="border-b border-r border-[#10223b]/10 p-5"><p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8f38ff]">Coming soon</p><h3 className="mt-6 text-sm font-semibold leading-snug">{topic}</h3></div>)}</div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20"><div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8f38ff]">Who we&apos;re looking for</p><h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">A multidisciplinary engineering community.</h2><p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">Students, researchers, engineers and builders who want to contribute with intellectual honesty, sustained curiosity and serious technical practice.</p><Link to="/orion/join" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6e24ca] hover:text-[#06101d]">Explore the engineering program <ArrowRight size={14} /></Link></div><div className="grid gap-3 sm:grid-cols-2">{disciplines.map((discipline, index) => <div key={discipline} className="flex items-center gap-4 border border-[#10223b]/10 bg-white px-5 py-4"><span className="text-[10px] font-bold tracking-widest text-[#b98448]">{String(index + 1).padStart(2, '0')}</span><p className="text-sm font-semibold">{discipline}</p></div>)}</div></div></section>

    <section className="px-5 pb-16 sm:px-6 md:pb-24"><div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-[#10223b]/10 bg-[#10223b] px-7 py-10 text-white shadow-[0_24px_70px_rgba(6,47,79,0.18)] sm:px-10 md:px-14 md:py-14"><div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d7b274]">Join Orion</p><h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">Help build the future beyond Earth.</h2><p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">Orion is building a multidisciplinary engineering community focused on the technologies that may define future orbital infrastructure. Whether you are a student, researcher, engineer or builder, we invite you to contribute.</p></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><Link to="/orion/join" className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#06101d] transition-colors hover:bg-[#f1ecff]">Apply</Link><Link to="/orion/join#community" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10">Engineering Community</Link><Link to="/orion/join#community" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10">Research Collaboration</Link></div></div></div></section>
  </main>
)

export default Orion
