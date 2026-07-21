import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import orionLogo from '../../../../Orion LOGO.png'
import orionVideo from '../../../../Orion Video.mp4'
import useIsMobile from '../../hooks/useIsMobile'

const OrionDiscovery = () => {
  const isMobile = useIsMobile()

  return (
  <section className="bg-[#f7f9fc] px-5 py-14 text-[#06101d] sm:px-6 md:py-20">
    <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[30px] border border-[#10223b]/10 bg-white shadow-[0_24px_70px_rgba(6,47,79,0.08)] lg:grid-cols-[1.02fr_0.98fr]">
      <div className="flex flex-col justify-center px-7 py-10 sm:px-10 md:px-14 md:py-16">
        <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#8f38ff]/25 bg-[#8f38ff]/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6e24ca]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#b98448]" />
          Advanced Space Systems Division
        </div>
        <h2 className="max-w-xl text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
          Beyond AI. Engineering the future of <span className="premium-serif font-normal italic text-[#8f38ff]">orbital infrastructure.</span>
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
          While AlgoForce develops enterprise AI software, ORION is its Advanced Space Systems Division: a long-horizon engineering initiative focused on autonomous spacecraft technology, space robotics, digital twins, and mission operations.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/orion" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#06101d] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#102640]">
            Explore Orion <ArrowUpRight size={15} />
          </Link>
          <Link to="/orion/join" className="inline-flex items-center justify-center rounded-xl border border-[#06101d]/10 bg-[#f7f9fc] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#06101d] transition-colors hover:bg-slate-100">
            Join the Mission
          </Link>
        </div>
        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Advanced space systems • orbital infrastructure • mission engineering</p>
      </div>
      <div className="relative isolate min-h-[310px] overflow-hidden border-t border-[#10223b]/10 bg-[#03070d] lg:border-l lg:border-t-0">
        {isMobile ? (
          <img
            src={orionLogo}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[62%_center] opacity-60"
          />
        ) : (
          <video autoPlay muted loop playsInline preload="metadata" poster={orionLogo} aria-hidden="true" tabIndex={-1} className="absolute inset-0 h-full w-full object-cover object-[62%_center] opacity-60">
            <source src={orionVideo} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,13,0.14),rgba(3,7,13,0.88))]" />
        <div className="relative flex min-h-[310px] flex-col justify-end p-7 text-white sm:p-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d7b274]">ORION MISSION FILM</p>
          <p className="mt-3 max-w-sm text-2xl font-semibold leading-tight tracking-tight">Breakthrough space technology engineered for persistent operations.</p>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-slate-300">Space Systems Platform</p>
        </div>
      </div>
    </div>
  </section>
  )
}

export default OrionDiscovery

