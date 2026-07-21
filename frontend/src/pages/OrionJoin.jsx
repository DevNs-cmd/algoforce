import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, FileUp, Send } from 'lucide-react'
import OrionTechnicalDrawing from '../components/orion/OrionTechnicalDrawing'

const domains = ['Software', 'Mechanical', 'Electronics', 'Embedded', 'Robotics', 'Computer Vision', 'AI', 'Simulation', 'Manufacturing', 'Research']
const qualities = ['Problem Solvers', 'Builders', 'Researchers', 'Systems Thinkers', 'Curious Engineers', 'Long-Term Commitment']

const Field = ({ label, children, className = '' }) => <label className={`block ${className}`}><span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">{label}</span>{children}</label>
const inputClass = 'w-full rounded-xl border border-[#10223b]/10 bg-[#f7f9fc] px-4 py-3 text-sm text-[#06101d] outline-none transition-colors placeholder:text-slate-400 focus:border-[#8f38ff]/60 focus:bg-white'

const OrionJoin = () => {
  const [submitted, setSubmitted] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] pt-24 text-[#06101d] md:pt-28">
      <section className="border-b border-[#10223b]/10 bg-white px-5 pb-14 pt-12 sm:px-6 md:pb-20 md:pt-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#8f38ff]/25 bg-[#8f38ff]/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.19em] text-[#6e24ca]"><span className="h-1.5 w-1.5 rounded-full bg-[#b98448]" /> Orion Engineering Program</div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">Join Orion</h1>
            <p className="mt-4 max-w-xl text-xl font-medium leading-relaxed text-slate-700">Engineering the next generation of space technologies.</p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600">We are forming a long-term, multidisciplinary engineering community. Tell us about the work you do and the systems you want to help explore.</p>
          </motion.div>
          <OrionTechnicalDrawing className="aspect-[1.42] shadow-[0_20px_60px_rgba(6,47,79,0.08)]" variant="robotics" label="ORION ENGINEERING PROGRAM" />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-6 md:py-20 lg:grid-cols-[1fr_0.62fr]">
        <form onSubmit={submit} className="rounded-[30px] border border-[#10223b]/10 bg-white p-6 shadow-[0_20px_60px_rgba(6,47,79,0.06)] sm:p-8 md:p-10">
          <div className="mb-8"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8f38ff]">Expression of interest</p><h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">Tell us about your engineering practice.</h2></div>
          {submitted ? (
            <div className="rounded-2xl border border-[#8f38ff]/20 bg-[#8f38ff]/5 p-6 text-center"><CheckCircle2 className="mx-auto h-8 w-8 text-[#8f38ff]" /><h3 className="mt-4 text-xl font-semibold">Thank you for your interest.</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">Your expression of interest is ready for review. We&apos;ll be in touch if there is a fit for the current program.</p></div>
          ) : (
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2"><Field label="Name"><input required name="name" className={inputClass} placeholder="Your name" /></Field><Field label="Email"><input required type="email" name="email" className={inputClass} placeholder="you@example.com" /></Field></div>
              <div className="grid gap-5 sm:grid-cols-2"><Field label="LinkedIn"><input name="linkedin" className={inputClass} placeholder="linkedin.com/in/..." /></Field><Field label="University / Organization"><input name="university" className={inputClass} placeholder="University or organization" /></Field></div>
              <div className="grid gap-5 sm:grid-cols-2"><Field label="Primary domain"><select required name="domain" className={inputClass} defaultValue=""><option value="" disabled>Select a domain</option>{domains.map((domain) => <option key={domain}>{domain}</option>)}</select></Field><Field label="Years of experience"><select name="experience" className={inputClass} defaultValue=""><option value="" disabled>Select experience</option><option>Student / early career</option><option>1–3 years</option><option>4–7 years</option><option>8+ years</option></select></Field></div>
              <Field label="Skills"><input name="skills" className={inputClass} placeholder="e.g. CAD, C++, embedded systems, simulation" /></Field>
              <Field label="Portfolio"><input type="url" name="portfolio" className={inputClass} placeholder="Website, GitHub or project link" /></Field>
              <Field label="Resume"><span className="flex w-full items-center gap-3 rounded-xl border border-dashed border-[#10223b]/20 bg-[#f7f9fc] px-4 py-3 text-sm text-slate-500"><FileUp size={18} className="text-[#8f38ff]" /><input name="resume" type="file" accept=".pdf,.doc,.docx" className="w-full text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-white file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[#06101d]" /></span></Field>
              <Field label="Why Orion"><textarea required name="motivation" rows="5" className={`${inputClass} resize-y`} placeholder="Tell us why you want to join Orion and what you would like to explore." /></Field>
              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#06101d] px-6 py-4 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#102640]"><Send size={14} /> Submit interest</button>
              <p className="text-center text-[10px] leading-relaxed text-slate-400">This is an expression of interest for a research initiative. It is not an employment offer or a public disclosure of program details.</p>
            </div>
          )}
        </form>

        <aside id="community" className="h-fit rounded-[30px] border border-[#10223b]/10 bg-[#10223b] p-7 text-white shadow-[0_20px_60px_rgba(6,47,79,0.14)] sm:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d7b274]">What we look for</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">People who make complex systems more understandable.</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">Orion values depth, intellectual honesty, collaborative engineering and sustained curiosity.</p>
          <ul className="mt-8 space-y-3">{qualities.map((quality) => <li key={quality} className="flex items-center gap-3 border-t border-white/10 pt-3 text-sm font-medium"><CheckCircle2 size={16} className="text-[#d7b274]" />{quality}</li>)}</ul>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-[10px] font-bold uppercase tracking-widest text-[#d7b274]">Program note</p><p className="mt-2 text-xs leading-relaxed text-slate-300">Participation pathways may include technical exploration, research collaboration and community initiatives.</p></div>
        </aside>
      </section>
    </main>
  )
}

export default OrionJoin
