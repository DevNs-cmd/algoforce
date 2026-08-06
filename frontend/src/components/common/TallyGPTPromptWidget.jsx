import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaDownload, FaArrowRight, FaTimes, FaDesktop, FaCheckCircle, FaBolt } from 'react-icons/fa'

export default function TallyGPTPromptWidget() {
  const [isOpen, setIsOpen] = useState(true)
  const [isPulsing, setIsPulsing] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Hide widget if user is ALREADY on the Finance AI page
  const isAlreadyOnFinanceAI = location.pathname === '/products/finance-ai'

  // Continuous subtle pulse reminder when collapsed
  useEffect(() => {
    let interval
    if (!isOpen) {
      interval = setInterval(() => {
        setIsPulsing(true)
        setTimeout(() => setIsPulsing(false), 2200)
      }, 8000)
    }
    return () => clearInterval(interval)
  }, [isOpen])

  if (isAlreadyOnFinanceAI) return null

  return (
    <div className="fixed bottom-20 left-4 sm:bottom-24 sm:left-6 z-40 pointer-events-none">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="tallygpt-prompt-expanded"
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="relative overflow-hidden pointer-events-auto max-w-[calc(100vw-2rem)] sm:max-w-[340px] w-full p-4 sm:p-5 rounded-[26px] border border-[#8f38ff]/35 bg-[#06101d]/90 text-white shadow-[0_20px_50px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
          >
            {/* Premium Gradient Glow Overlay */}
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-28 h-28 bg-[#8f38ff]/25 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-28 h-28 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-purple-200">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span>TallyGPT v2.0 Desktop</span>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Minimize prompt"
                >
                  <FaTimes size={12} />
                </button>
              </div>

              {/* Title & Description */}
              <div className="mb-3">
                <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                  <FaDesktop className="text-[#8f38ff] shrink-0" size={13} />
                  <span>Install TallyGPT for Tally</span>
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                  Connect Tally Prime &amp; ERP 9 on port 9000 to automate ledgers, GST 2B recon &amp; audit reports.
                </p>
              </div>

              {/* Badges Row */}
              <div className="mb-3.5 flex flex-wrap gap-1.5 text-[9px] font-bold text-slate-300">
                <span className="rounded-lg bg-white/5 border border-white/10 px-2 py-0.5 flex items-center gap-1">
                  <FaCheckCircle className="text-emerald-400" size={9} /> 100% On-Premises
                </span>
                <span className="rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 px-2 py-0.5 font-extrabold">
                  52.4 MB .exe
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Link
                  to="/products/finance-ai"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8f38ff] via-[#7e25f6] to-[#6116cd] py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-purple-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Install &amp; Explore TallyGPT</span>
                  <FaArrowRight size={10} />
                </Link>

                <a
                  href="/TallyGPT_Setup_v2.0.0.exe"
                  download="TallyGPT_Setup_v2.0.0.exe"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <FaDownload size={10} className="text-[#8f38ff]" />
                  <span>Direct Setup Download</span>
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Minimized Continuous Trigger Badge */
          <motion.button
            key="tallygpt-prompt-collapsed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className={`pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-full border bg-[#06101d]/95 text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
              isPulsing
                ? 'border-[#8f38ff] shadow-[0_0_25px_rgba(143,56,255,0.65)] scale-105'
                : 'border-[#8f38ff]/40'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8f38ff] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8f38ff]" />
            </span>
            <FaBolt size={12} className="text-purple-400" />
            <span className="text-xs font-bold tracking-tight text-white">
              Install TallyGPT v2.0
            </span>
            <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[9px] font-extrabold text-purple-300 border border-purple-500/30">
              .exe
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
