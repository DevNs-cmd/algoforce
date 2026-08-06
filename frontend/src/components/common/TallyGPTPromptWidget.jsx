import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { FaDownload, FaArrowRight, FaTimes, FaDesktop, FaCheckCircle, FaBolt } from 'react-icons/fa'

export default function TallyGPTPromptWidget() {
  const [isOpen, setIsOpen] = useState(true)
  const [isPulsing, setIsPulsing] = useState(false)
  const navigate = useNavigate()

  // Continuous subtle re-trigger pulse / expand logic
  useEffect(() => {
    let interval
    if (!isOpen) {
      interval = setInterval(() => {
        setIsPulsing(true)
        setTimeout(() => setIsPulsing(false), 2000)
      }, 7000)
    }
    return () => clearInterval(interval)
  }, [isOpen])

  const handleGoToTallyGPT = () => {
    navigate('/products/finance-ai')
  }

  return (
    <div className="fixed bottom-24 left-4 sm:bottom-28 sm:left-6 z-40 pointer-events-none">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="tallygpt-popup-expanded"
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative overflow-hidden pointer-events-auto max-w-[320px] sm:max-w-[350px] w-full p-4 sm:p-5 rounded-3xl border border-[#8f38ff]/40 bg-[#06101d]/95 text-white shadow-[0_25px_60px_rgba(143,56,255,0.25)] backdrop-blur-xl"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-[#8f38ff]/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span>TallyGPT v2.0 Ready</span>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Minimize widget"
                >
                  <FaTimes size={12} />
                </button>
              </div>

              {/* Body */}
              <div className="mb-3.5">
                <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
                  <FaDesktop className="text-[#8f38ff]" size={14} />
                  <span>Install TallyGPT for Windows</span>
                </h4>
                <p className="text-xs text-slate-300 leading-snug font-normal">
                  Automate ledgers, GST 2B reconciliation &amp; financial reports directly in Tally Prime &amp; ERP 9.
                </p>
              </div>

              {/* Key Features Badges */}
              <div className="mb-4 flex flex-wrap gap-1.5 text-[10px] font-semibold text-slate-300">
                <span className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 flex items-center gap-1">
                  <FaCheckCircle className="text-emerald-400" size={9} /> 100% Local
                </span>
                <span className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 flex items-center gap-1">
                  <FaCheckCircle className="text-emerald-400" size={9} /> Port 9000
                </span>
                <span className="rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 font-bold">
                  52.4 MB .exe
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Link
                  to="/products/finance-ai"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#8f38ff] via-[#7e25f6] to-[#6116cd] py-3 px-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Install &amp; Explore TallyGPT</span>
                  <FaArrowRight size={11} />
                </Link>

                <a
                  href="/TallyGPT_Setup_v2.0.0.exe"
                  download="TallyGPT_Setup_v2.0.0.exe"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <FaDownload size={11} className="text-[#8f38ff]" />
                  <span>Direct Download (.exe)</span>
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Minimized Continuous Trigger Badge */
          <motion.button
            key="tallygpt-popup-collapsed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-full border bg-[#06101d] text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 ${
              isPulsing
                ? 'border-[#8f38ff] shadow-[0_0_25px_rgba(143,56,255,0.6)] scale-105'
                : 'border-[#8f38ff]/40'
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8f38ff] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8f38ff]" />
            </span>
            <FaBolt size={14} className="text-purple-400" />
            <span className="text-xs font-bold tracking-tight text-white">
              Install TallyGPT v2.0
            </span>
            <span className="rounded-full bg-[#8f38ff]/20 px-2 py-0.5 text-[9px] font-extrabold text-purple-300 border border-[#8f38ff]/30">
              52.4MB
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
