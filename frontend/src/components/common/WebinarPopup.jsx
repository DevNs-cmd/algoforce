import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import OrionTechnicalDrawing from '../orion/OrionTechnicalDrawing'
import useIsMobile from '../../hooks/useIsMobile'

const STORAGE_KEY = 'algoforce_orion_popup_ts'
const SUPPRESS_DAYS = 7

const shouldShowPopup = () => {
  try {
    const timestamp = localStorage.getItem(STORAGE_KEY)
    return !timestamp || Date.now() - Number(timestamp) > SUPPRESS_DAYS * 24 * 60 * 60 * 1000
  } catch {
    return true
  }
}

const recordDismissal = () => {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()))
  } catch {
    // Local storage may be unavailable in a privacy-restricted browser.
  }
}

const WebinarPopup = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile || location.pathname === '/orion/join' || !shouldShowPopup()) {
      setIsOpen(false)
      return undefined
    }
    const timer = window.setTimeout(() => setIsOpen(true), 2600)
    return () => window.clearTimeout(timer)
  }, [isMobile, location.pathname])

  useEffect(() => {
    if (!isOpen) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && close()
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const close = () => {
    setIsOpen(false)
    recordDismissal()
  }

  const goTo = (path) => {
    recordDismissal()
    setIsOpen(false)
    navigate(path)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#06101d]/45 p-4 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(event) => event.target === event.currentTarget && close()}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="orion-popup-title"
            className="relative grid max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[30px] border border-[#10223b]/10 bg-white shadow-[0_30px_100px_rgba(6,47,79,0.25)] md:grid-cols-[0.83fr_1.17fr]"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', damping: 24, stiffness: 220 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button onClick={close} aria-label="Dismiss Orion announcement" className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#10223b]/10 bg-white text-slate-500 shadow-sm transition-colors hover:text-[#06101d]">
              <X size={16} />
            </button>
            <div className="min-h-[230px] border-b border-[#10223b]/10 bg-[#f4f7fb] p-4 md:border-b-0 md:border-r md:p-5">
              <OrionTechnicalDrawing className="h-full min-h-[230px] rounded-[22px]" variant="satellite" label="ORION MISSION BRIEF" />
            </div>
            <div className="p-7 sm:p-9 md:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#8f38ff]/25 bg-[#8f38ff]/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#6e24ca]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#b98448]" /> Orion Advanced Space Systems
              </div>
              <h2 id="orion-popup-title" className="mt-5 text-2xl font-semibold leading-tight tracking-tight text-[#06101d] sm:text-3xl">Build the future beyond Earth.</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Orion is AlgoForce&apos;s Advanced Space Systems Initiative, focused on autonomous spacecraft, orbital infrastructure, robotics, mission intelligence and long-term technology development.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                We&apos;re connecting engineers, designers and systems builders who want to apply disciplined thinking to future mission operations and space systems.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => goTo('/orion/join')} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#06101d] px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#102640]">Join Orion <ArrowRight size={14} /></button>
                <button onClick={() => goTo('/orion')} className="inline-flex flex-1 items-center justify-center rounded-xl border border-[#10223b]/10 bg-[#f7f9fc] px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-[#06101d] transition-colors hover:bg-slate-100">Learn More</button>
              </div>
              <button onClick={close} className="mt-4 text-xs font-semibold text-slate-500 transition-colors hover:text-[#06101d]">Dismiss</button>
              <p className="mt-7 border-t border-[#10223b]/10 pt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Advanced space systems • long-horizon engineering</p>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WebinarPopup
