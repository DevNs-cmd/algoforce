import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Ticket, ExternalLink, ArrowUpRight, X, Calendar, Users, Sparkles } from 'lucide-react'

const LUMA_EVENT_URL = "https://luma.com/t1m4rkst?tk=GuW27n"
const UNSTOP_EVENT_URL = "https://unstop.com/o/a9xApLV?lb=kVkkl81P&utm_medium=Share&utm_source=events&utm_campaign=Fqgpcvtk16500"
const DISMISS_COUNT_KEY = "af_summit_dismiss_count"

const SummitMarqueeBanner = () => {
  const [showModal, setShowModal] = useState(false)
  const [dismissCount, setDismissCount] = useState(() => {
    try {
      return parseInt(localStorage.getItem(DISMISS_COUNT_KEY) || '0', 10)
    } catch (_) {
      return 0
    }
  })

  // Recurring Popup Controller:
  // - Re-triggers every ~8 seconds (5-10s range)
  // - If user clicks close 'X' 3 times, frequency reduces to once every 5 minutes (300s)
  useEffect(() => {
    if (showModal) return undefined

    const isInitialLand = !sessionStorage.getItem('af_summit_initial_landed')
    let timerMs = 8000 // Default 8 seconds (5-10 sec requirement)

    if (isInitialLand) {
      timerMs = 2000 // Fast 2s trigger on first website landing
      sessionStorage.setItem('af_summit_initial_landed', 'true')
    } else if (dismissCount >= 3) {
      timerMs = 300000 // 5 minutes reduced frequency after 3 dismissals
    }

    const timer = setTimeout(() => {
      setShowModal(true)
    }, timerMs)

    return () => clearTimeout(timer)
  }, [showModal, dismissCount])

  const handleClose = (e) => {
    if (e) e.stopPropagation()
    setShowModal(false)
    const nextCount = dismissCount + 1
    setDismissCount(nextCount)
    try {
      localStorage.setItem(DISMISS_COUNT_KEY, nextCount.toString())
    } catch (_) {}
  }

  return (
    <>
      {/* 1. Permanent Top Marquee Banner (Above navbar, clean iOS frosted style) */}
      <div
        onClick={() => setShowModal(true)}
        className="fixed top-0 left-0 right-0 z-[55] h-8 sm:h-9 bg-[#1c1c1e]/90 backdrop-blur-xl border-b border-white/10 text-white cursor-pointer overflow-hidden shadow-sm select-none group transition-colors hover:bg-[#2c2c2e]/90 flex items-center justify-between"
      >
        <div className="flex items-center gap-4 text-xs font-medium tracking-tight whitespace-nowrap animate-marquee overflow-hidden flex-1">
          <span className="inline-flex items-center gap-1.5 bg-[#007AFF]/20 border border-[#007AFF]/40 text-[#64D2FF] px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider shrink-0">
            <Sparkles size={11} className="text-[#64D2FF]" />
            Summit Delhi 2026
          </span>
          <span className="text-slate-200">AlgoForce AI Transformation Summit Delhi 2026 • 28 Oct 2026 • Stop Buying AI. Start Deploying AI.</span>
          <span className="font-semibold text-[#64D2FF] group-hover:text-white transition-colors flex items-center gap-1">
            Reserve Seat on Luma &amp; Unstop <ArrowUpRight size={13} />
          </span>
          <span className="text-white/20">|</span>
          <span className="inline-flex items-center gap-1.5 bg-[#007AFF]/20 border border-[#007AFF]/40 text-[#64D2FF] px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider shrink-0">
            <Sparkles size={11} className="text-[#64D2FF]" />
            Summit Delhi 2026
          </span>
          <span className="text-slate-200">AlgoForce AI Transformation Summit Delhi 2026 • 28 Oct 2026 • Stop Buying AI. Start Deploying AI.</span>
          <span className="font-semibold text-[#64D2FF] group-hover:text-white transition-colors flex items-center gap-1">
            Reserve Seat <ArrowUpRight size={13} />
          </span>
        </div>
      </div>

      {/* 2. Floating Right-Side Sticky Button (Clean iOS Pill Tab, Fully Responsive) */}
      <motion.button
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        onClick={() => setShowModal(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[45] group flex items-center"
        aria-label="Register for Summit 2026"
      >
        <div className="relative flex items-center gap-2 sm:gap-2.5 bg-[#1c1c1e]/90 backdrop-blur-2xl text-white font-medium text-xs tracking-tight pl-2.5 sm:pl-3.5 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-l-xl sm:rounded-l-2xl shadow-[0_16px_40px_rgba(0,0,0,0.6)] border-l border-t border-b border-white/15 group-hover:bg-[#2c2c2e] transition-all duration-300">
          <span className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse"></span>
          <span className="hidden sm:inline font-semibold text-white">Summit 2026</span>
          <span className="sm:hidden font-semibold text-[11px]">Summit</span>
          <span className="bg-[#007AFF] text-white px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold shadow-sm">
            Register
          </span>
        </div>
      </motion.button>

      {/* 3. iOS Frosted Glass Event Registration Modal (Fully Responsive & Scrollable) */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100001] flex items-center justify-center p-3 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/65 backdrop-blur-2xl"
            />

            {/* Modal Sheet Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", damping: 28, stiffness: 360 }}
              className="relative w-[92vw] max-w-[460px] max-h-[85vh] sm:max-h-[90vh] overflow-y-auto scrollbar-hide rounded-[28px] sm:rounded-[36px] bg-[#1c1c1e]/95 backdrop-blur-3xl border border-white/15 p-5 sm:p-7 text-white shadow-[0_32px_90px_rgba(0,0,0,0.65)]"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all z-10 active:scale-90"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              {/* iOS Pill Header */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-[10px] sm:text-[11px] font-medium tracking-tight mb-2.5">
                <span>Summit Delhi 2026</span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-1">
                AlgoForce AI Transformation Summit
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mb-4">
                Stop Buying AI Software. Start Deploying Enterprise AI Operating Systems.
              </p>

              {/* iOS Widget Group (Clean Cards) */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 sm:p-4 space-y-3 sm:space-y-3.5 mb-4 sm:mb-5">
                <div className="flex items-center gap-3 sm:gap-3.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#007AFF]/20 text-[#64D2FF] flex items-center justify-center shrink-0">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">28 October 2026 • 10:00 AM IST</div>
                    <div className="text-[11px] text-slate-400">Delhi NCR, India</div>
                  </div>
                </div>

                <div className="h-[1px] bg-white/10 w-full" />

                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#34C759]/20 text-[#30D158] flex items-center justify-center shrink-0">
                    <Users size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">200+ Enterprise Leaders</div>
                    <div className="text-[11px] text-slate-400">CEOs, CFOs &amp; Technology Directors</div>
                  </div>
                </div>

                <div className="h-[1px] bg-white/10 w-full" />

                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#BF5AF2]/20 text-[#BF5AF2] flex items-center justify-center shrink-0">
                    <Ticket size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Live System Teardown</div>
                    <div className="text-[11px] text-slate-400">Deploy AI Agents into ERP, CRM &amp; Tally</div>
                  </div>
                </div>
              </div>

              {/* iOS Action Buttons */}
              <div className="space-y-2.5">
                <a
                  href={LUMA_EVENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  className="block w-full group"
                >
                  <button className="w-full py-3.5 px-5 bg-[#007AFF] hover:bg-[#0062cc] text-white font-semibold text-xs sm:text-sm rounded-xl sm:rounded-2xl flex items-center justify-between shadow-lg active:scale-[0.98] transition-all">
                    <span>Reserve Seat on Luma</span>
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </a>

                <a
                  href={UNSTOP_EVENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  className="block w-full group"
                >
                  <button className="w-full py-3.5 px-5 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-xs sm:text-sm rounded-xl sm:rounded-2xl flex items-center justify-between active:scale-[0.98] transition-all">
                    <span>Reserve Seat on Unstop</span>
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
