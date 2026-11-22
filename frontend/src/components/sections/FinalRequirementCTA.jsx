import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone, Mail, CheckCircle2 } from 'lucide-react'

const FinalRequirementCTA = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#f8fafc] text-slate-900 border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#092941] bg-white border border-slate-200 px-4 py-1.5 rounded-full mb-6 shadow-2xs">
            Start a Conversation
          </span>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#092941] mb-6 tracking-tight leading-[1.12]">
            Have a Technology Requirement?{' '}
            <span className="font-serif italic font-normal text-purple-900 block sm:inline">
              Let's Work on It.
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-10">
            Whether you need a new software system, an existing process improved, technology integrated or ongoing technical support, start with a conversation about your requirement.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
            <Link to="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-b from-[#12395b] to-[#092941] hover:from-[#0d2d48] hover:to-[#071f32] text-white rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all border-t border-t-white/30 border-b-2 border-b-[#051724] shadow-[0_10px_25px_rgba(9,41,65,0.35),0_2px_4px_rgba(9,41,65,0.2),inset_0_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:translate-y-0">
                <span>Discuss Your Requirement</span>
                <ArrowRight size={17} />
              </button>
            </Link>

            <Link to="/services" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-7 py-4 bg-gradient-to-b from-white to-slate-100 hover:to-slate-200 text-[#092941] border-t border-t-white border-b-2 border-b-slate-300 border-x border-slate-200 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-[0_6px_16px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5 active:translate-y-0">
                <span>Explore Our Capabilities</span>
              </button>
            </Link>
          </div>

          {/* Direct channels for quick communication */}
          <div className="pt-10 border-t border-slate-200 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-[#092941]" />
              <span>Direct Phone / WhatsApp: <a href="https://wa.me/918448947436" target="_blank" rel="noopener noreferrer" className="text-slate-900 font-semibold hover:underline">+91 84489 47436</a></span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-[#092941]" />
              <span>Official Inquiries: <a href="mailto:contact@algoforceai.com" className="text-slate-900 font-semibold hover:underline">contact@algoforceai.com</a></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-700" />
              <span className="font-medium">Direct response within 24 business hours</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FinalRequirementCTA
