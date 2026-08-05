import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Ticket, ExternalLink, ArrowUpRight, X, Sparkles } from 'lucide-react'

const LUMA_EVENT_URL = "https://luma.com/t1m4rkst?tk=GuW27n"
const UNSTOP_EVENT_URL = "https://unstop.com/o/a9xApLV?lb=kVkkl81P&utm_medium=Share&utm_source=events&utm_campaign=Fqgpcvtk16500"

const SummitMarqueeBanner = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {/* Ticker Bar */}
      <div 
        onClick={() => setShowModal(true)}
        className="fixed top-0 left-0 right-0 z-[55] h-8 sm:h-9 bg-gradient-to-r from-purple-950 via-[#06101d] to-purple-900 border-b border-purple-500/30 text-white cursor-pointer overflow-hidden px-4 shadow-md select-none group transition-colors hover:from-purple-900 hover:to-purple-850 flex items-center"
      >
        <div className="flex items-center gap-4 text-xs font-semibold tracking-wide whitespace-nowrap animate-marquee">
          <span className="inline-flex items-center gap-1.5 bg-purple-500/25 border border-purple-400/40 text-purple-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0">
            <Sparkles size={11} className="text-purple-300 animate-spin" style={{ animationDuration: '4s' }} />
            Summit Delhi 2026
          </span>
          <span>🚀 AlgoForce AI Transformation Summit Delhi 2026 • 28 Oct 2026 • Stop Buying AI. Start Deploying AI.</span>
          <span className="underline decoration-purple-400 font-bold text-purple-300 group-hover:text-white transition-colors flex items-center gap-1">
            Reserve Your Seat on Luma & Unstop <ArrowUpRight size={13} />
          </span>
          <span className="text-purple-400/50">|</span>
          <span className="inline-flex items-center gap-1.5 bg-purple-500/25 border border-purple-400/40 text-purple-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0">
            <Sparkles size={11} className="text-purple-300 animate-spin" style={{ animationDuration: '4s' }} />
            Summit Delhi 2026
          </span>
          <span>🚀 AlgoForce AI Transformation Summit Delhi 2026 • 28 Oct 2026 • Stop Buying AI. Start Deploying AI.</span>
          <span className="underline decoration-purple-400 font-bold text-purple-300 group-hover:text-white transition-colors flex items-center gap-1">
            Reserve Your Seat on Luma & Unstop <ArrowUpRight size={13} />
          </span>
        </div>
      </div>

      {/* 1-Tap Redirect Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100001] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-[#06101d] p-6 text-white shadow-2xl"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all"
              >
                <X size={16} />
              </button>

              <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-200 mb-3">
                <span>🚀 Upcoming Enterprise Summit</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-1">
                AlgoForce AI Transformation Summit <span className="premium-serif italic font-normal text-purple-300">Delhi 2026</span>
              </h3>

              <p className="text-xs text-slate-300 font-medium mb-4">
                📅 28 Oct 2026 • 9 AM - 6 PM IST | Delhi, India
              </p>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Select your preferred registration platform to reserve your seat:
              </p>

              <div className="space-y-3">
                <a
                  href={LUMA_EVENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowModal(false)}
                  className="block w-full"
                >
                  <button className="w-full py-3.5 px-4 bg-white text-[#06101d] hover:bg-slate-100 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
                    <Ticket size={16} />
                    <span>Register on Luma</span>
                    <ArrowUpRight size={15} />
                  </button>
                </a>

                <a
                  href={UNSTOP_EVENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowModal(false)}
                  className="block w-full"
                >
                  <button className="w-full py-3.5 px-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all">
                    <ExternalLink size={15} />
                    <span>Register on Unstop</span>
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default SummitMarqueeBanner
