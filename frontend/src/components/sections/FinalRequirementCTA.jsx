import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone, Mail, Check, MessageSquareText, Compass } from 'lucide-react'
import './SectionSurfaces.css'

const FinalRequirementCTA = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section ref={ref} className="w-full bg-white py-10 sm:py-16 px-3 sm:px-5 lg:px-7 overflow-x-clip">
      <div className="saas-canvas relative mx-auto max-w-[1400px] rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] border border-[#e3e8f0] overflow-hidden shadow-[0_1px_3px_rgba(10,42,67,0.03),0_22px_55px_-28px_rgba(10,42,67,0.09)] py-16 sm:py-24 px-5 sm:px-8">
        <div className="saas-dot-matrix absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="saas-center-halo absolute inset-0 pointer-events-none" aria-hidden="true" />

        {/* Decorative Corner Note Accents mirroring Hero ChronoTask Bookend Symmetry */}
        <div className="hidden lg:block pointer-events-none" aria-hidden="true">
          <div className="absolute top-10 left-10 w-[196px] -rotate-[5deg] rounded-2xl bg-white border border-[#e2e8f0] p-4 shadow-[0_18px_38px_-14px_rgba(10,42,67,0.12)]">
            <div className="flex justify-center -mt-6 mb-2">
              <span className="w-3 h-3 rounded-full saas-pin ring-2 ring-white" />
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0A2A43] mb-1">
              <MessageSquareText size={13} className="text-[#2563EB]" />
              <span>Direct Discussion</span>
            </div>
            <p className="text-[11px] text-[#5A6678] leading-snug">
              Talk directly with engineers about what your business needs.
            </p>
          </div>

          <div className="absolute bottom-9 right-10 w-[206px] rotate-[4deg] rounded-2xl bg-white border border-[#e2e8f0] p-4 shadow-[0_18px_38px_-14px_rgba(10,42,67,0.12)]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0A2A43] mb-1">
              <Compass size={13} className="text-[#9A4DFF]" />
              <span>Clear Build Plan</span>
            </div>
            <p className="text-[11px] text-[#5A6678] leading-snug">
              Practical software scope and architecture before development starts.
            </p>
          </div>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={prefersReducedMotion || inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          {/* Floating Brand Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e2e8f0] shadow-[0_2px_8px_rgba(10,42,67,0.04)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0A2A43] font-mono">
              Get Started
            </span>
          </div>

          <h2 className="font-['Outfit',sans-serif] text-3xl sm:text-5xl md:text-[3.4rem] font-semibold text-[#0A2A43] mb-5 tracking-[-0.03em] leading-[1.1]">
            <span className="block">Have a Project in Mind?</span>
            <span className="block mt-1.5 text-[#6E7B8C] font-medium">
              Let&apos;s discuss it.
            </span>
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base md:text-[17px] text-[#4A5769] font-normal leading-[1.65] mb-9">
            Tell us what you need. Let&apos;s discuss the right technology solution.
          </p>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-10">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0A2A43] hover:bg-[#113D61] text-white text-sm font-medium inline-flex items-center justify-center gap-2 transition-all shadow-[0_10px_24px_-6px_rgba(10,42,67,0.38)] hover:-translate-y-0.5 whitespace-nowrap"
            >
              <span>Discuss Your Requirement</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              to="/contact?type=general"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/95 hover:bg-white text-[#0A2A43] border border-[#dce3ec] hover:border-[#c6d1de] text-sm font-medium inline-flex items-center justify-center gap-2 transition-all shadow-[0_2px_10px_-2px_rgba(10,42,67,0.06)] hover:-translate-y-0.5 whitespace-nowrap"
            >
              <span>Contact AlgoForce</span>
            </Link>
          </div>

          {/* Direct Channels Bar */}
          <div className="pt-8 border-t border-[#e2e8f0] flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs text-[#4A5769]">
            <a
              href="https://wa.me/918448947436"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] text-[#0A2A43] font-medium shadow-2xs transition-colors"
            >
              <Phone size={13} className="text-[#2563EB]" />
              <span>WhatsApp / Phone: +91 84489 47436</span>
            </a>

            <a
              href="mailto:contact@algoforceai.com"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] text-[#0A2A43] font-medium shadow-2xs transition-colors"
            >
              <Mail size={13} className="text-[#2563EB]" />
              <span>contact@algoforceai.com</span>
            </a>

            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#e2e8f0] text-[#0A2A43] font-medium shadow-2xs">
              <Check size={13} className="text-emerald-600" />
              <span>Direct response during business hours</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FinalRequirementCTA
