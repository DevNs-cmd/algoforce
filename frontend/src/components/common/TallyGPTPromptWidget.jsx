import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { FaDownload, FaArrowRight, FaTimes, FaDesktop, FaCheckCircle, FaBolt } from 'react-icons/fa'

export default function TallyGPTPromptWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)
  const location = useLocation()

  // Hide widget completely if user is ALREADY on the Finance AI page
  const isAlreadyOnFinanceAI = location.pathname === '/products/finance-ai'

  // Gentle pulse attention trigger after 3s
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPulsing(true)
      const stopTimer = setTimeout(() => setIsPulsing(false), 2500)
      return () => clearTimeout(stopTimer)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isAlreadyOnFinanceAI) return null

  return (
    <div className="fixed bottom-16 left-4 sm:bottom-20 sm:left-6 z-40 pointer-events-none">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="tallygpt-prompt-expanded"
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="relative overflow-hidden pointer-events-auto max-w-[calc(100vw-2rem)] sm:max-w-[320px] w-full p-4 rounded-[24px] border border-[#8f38ff]/40 bg-[#06101d]/95 text-white shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
          >
            {/* Ambient Purple Glow */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-24 h-24 bg-[#8f38ff]/30 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-emerald-300">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span>TallyGPT v2.0 Ready</span>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Minimize prompt"
                >
                  <FaTimes size={12} />
                </button>
              </div>

              {/* Title & Description */}
              <div className="mb-3">
                <h4 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                  <FaDesktop className="text-[#8f38ff] shrink-0" size={12} />
                  <span>Install TallyGPT Desktop Engine</span>
                </h4>
                <p className="text-[11px] text-slate-300 leading-snug font-normal">
                  Connect Tally Prime &amp; ERP 9 on port 9000 for local AI ledger search &amp; GST recon.
                </p>
              </div>

              {/* Badges */}
              <div className="mb-3 flex flex-wrap gap-1 text-[9px] font-bold text-slate-300">
                <span className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 flex items-center gap-1">
                  <FaCheckCircle className="text-emerald-400" size={8} /> 100% Local
                </span>
                <span className="rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 font-extrabold">
                  52.4 MB .exe
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Link
                  to="/products/finance-ai"
                  onClick={() => setIsOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8f38ff] via-[#7e25f6] to-[#6116cd] py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-purple-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Install &amp; Explore TallyGPT</span>
                  <FaArrowRight size={10} />
                </Link>

                <a
                  href="/TallyGPT_Setup_v2.0.0.exe"
                  download="TallyGPT_Setup_v2.0.0.exe"
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <FaDownload size={10} className="text-[#8f38ff]" />
                  <span>Direct Download (.exe)</span>
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Compact Left-Anchored Pill Badge (Max 160px width on mobile so it never crosses center) */
          <motion.button
            key="tallygpt-prompt-collapsed"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            onClick={() => setIsOpen(true)}
            className={`pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-full border bg-[#06101d]/95 text-white shadow-xl backdrop-blur-2xl transition-all duration-300 hover:scale-105 active:scale-95 max-w-[155px] sm:max-w-none ${
              isPulsing
                ? 'border-[#8f38ff] shadow-[0_0_20px_rgba(143,56,255,0.6)] scale-105'
                : 'border-[#8f38ff]/40'
            }`}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8f38ff] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8f38ff]" />
            </span>
            <FaBolt size={11} className="text-purple-400 shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold tracking-tight text-white truncate">
              Install TallyGPT
            </span>
            <span className="hidden sm:inline-block rounded-full bg-purple-500/20 px-1.5 py-0.5 text-[8px] font-extrabold text-purple-300 border border-purple-500/30">
              v2.0
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
