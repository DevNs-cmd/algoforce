import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import OrionTechnicalDrawing from '../orion/OrionTechnicalDrawing'

const OrionDiscovery = () => (
  <section className="bg-[#f7f9fc] px-5 py-14 text-[#06101d] sm:px-6 md:py-20">
    <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[30px] border border-[#10223b]/10 bg-white shadow-[0_24px_70px_rgba(6,47,79,0.08)] lg:grid-cols-[1.02fr_0.98fr]">
      <div className="flex flex-col justify-center px-7 py-10 sm:px-10 md:px-14 md:py-16">
        <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#8f38ff]/25 bg-[#8f38ff]/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6e24ca]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#b98448]" />
          Introducing Orion
        </div>
        <h2 className="max-w-xl text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
          Beyond AI. Engineering the future of <span className="premium-serif font-normal italic text-[#8f38ff]">space infrastructure.</span>
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
          While AlgoForce develops enterprise AI software, Orion is our long-term engineering initiative exploring autonomous orbital systems, robotics, digital twins, mission intelligence and next-generation space infrastructure.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/orion" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#06101d] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#102640]">
            Explore Orion <ArrowUpRight size={15} />
          </Link>
          <Link to="/orion/join" className="inline-flex items-center justify-center rounded-xl border border-[#06101d]/10 bg-[#f7f9fc] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#06101d] transition-colors hover:bg-slate-100">
            Join Engineering Program
          </Link>
        </div>
        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Independent research initiative • Engineering program • India</p>
      </div>
      <div className="min-h-[310px] border-t border-[#10223b]/10 bg-[#f4f7fb] p-4 lg:border-l lg:border-t-0 md:p-6">
        <OrionTechnicalDrawing className="h-full min-h-[280px] shadow-[0_16px_44px_rgba(16,34,59,0.06)]" label="ORION ORBITAL PLATFORM" />
      </div>
    </div>
  </section>
)

export default OrionDiscovery
