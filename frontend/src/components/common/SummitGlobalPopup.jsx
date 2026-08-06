import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ExternalLink, X, Ticket } from 'lucide-react'

const LUMA_EVENT_URL = "https://luma.com/t1m4rkst?tk=GuW27n"
const UNSTOP_EVENT_URL = "https://unstop.com/o/a9xApLV?lb=kVkkl81P&utm_medium=Share&utm_source=events&utm_campaign=Fqgpcvtk16500"

const SummitGlobalPopup = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-40 pointer-events-none">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="popup-expanded"
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative overflow-hidden pointer-events-auto max-w-[310px] sm:max-w-[330px] w-full p-4 rounded-2xl border border-white/25 bg-[#06101d] text-white shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
          >
            {/* Banner Background Image with Dark Scrim Overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <img
                src="/banner.png"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center opacity-45 scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06101d] via-[#06101d]/85 to-[#06101d]/65" />
            </div>

            <div className="relative z-10">
              {/* Header bar */}
              <div className="flex items-center justify-between border-b border-white/15 pb-2 mb-2.5">
                <div className="inline-flex items-center gap-1.5 rounded-md bg-white/15 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white backdrop-blur-md">
                  <span>🚀 Summit Delhi 2026</span>
                </div>
                <button
                  onClick={handleClose}
                  className="p-1 rounded-lg text-slate-200 hover:text-white hover:bg-white/20 transition-colors"
                  title="Dismiss (Re-appears in 7s)"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Headline & Subtext */}
              <h4 className="text-xs font-bold text-white mb-0.5 leading-snug">
                Stop Buying AI. Start Deploying AI.
              </h4>
              <p className="text-[10px] font-medium text-slate-200 mb-3">
                📅 28 Oct 2026 • Delhi | Reserve Your Seat
              </p>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={LUMA_EVENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <button className="w-full py-2.5 px-2 bg-white text-[#06101d] hover:bg-slate-100 rounded-xl font-extrabold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 shadow-md active:scale-95 transition-all">
                    <span>Luma</span>
                    <ArrowUpRight size={12} />
                  </button>
                </a>

                <a
                  href={UNSTOP_EVENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <button className="w-full py-2.5 px-2 border border-white/30 bg-black/40 hover:bg-black/60 text-white rounded-xl font-extrabold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 backdrop-blur-md active:scale-95 transition-all">
                    <span>Unstop</span>
                    <ExternalLink size={11} />
                  </button>
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Persistent Pulsing Badge when closed */
          <motion.button
            key="popup-collapsed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/25 bg-[#06101d] text-white shadow-2xl hover:scale-105 transition-all active:scale-95"
          >
            <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
            <Ticket size={14} className="text-purple-300" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-white">
              Register Summit 2026
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SummitGlobalPopup
