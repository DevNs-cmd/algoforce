import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Building2, PhoneCall } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ─── 7-day localStorage suppression key ─── */
const STORAGE_KEY = 'algoforce_consultation_popup_ts';
const SUPPRESS_DAYS = 7;

function shouldShowPopup() {
  try {
    const ts = localStorage.getItem(STORAGE_KEY);
    if (!ts) return true;
    const diff = Date.now() - parseInt(ts, 10);
    return diff > SUPPRESS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return true;
  }
}

function recordDismissal() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch { /* ignore */ }
}

/* ─── Data ─── */
const whatYouGet = [
  '30-Minute Business Assessment',
  'Workflow Automation Opportunities',
  'AI Readiness Report',
  'ROI Estimation',
  'Technology Recommendations',
  'Implementation Roadmap',
];

const industries = [
  'Manufacturing', 'Healthcare', 'Hotels',
  'Education', 'Retail', 'Logistics',
  'Construction', 'Professional Services',
];

const leftBadges = [
  'MSME Registered',
  'Enterprise AI Consulting',
  'Workflow Automation',
  'Custom Software',
];

/* ─── Component ─── */
const WebinarPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (shouldShowPopup()) {
      const timer = setTimeout(() => setIsOpen(true), 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    recordDismissal();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    if (isOpen) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCTA = () => {
    recordDismissal();
    setIsOpen(false);
    navigate('/contact?interest=consultation');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl"
          onClick={handleBackdropClick}
        >
          {/* ── Main Modal Card ── */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="relative w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] bg-[#03070d]/80 border border-white/10 rounded-[32px] shadow-[0_30px_100px_rgba(139,92,246,0.25)] overflow-hidden flex flex-col md:flex-row text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient glows */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>

            {/* ══════════════════════════════════════
                LEFT PANEL — White enterprise visual
            ══════════════════════════════════════ */}
            <div className="relative w-full md:w-[42%] h-56 sm:h-72 md:h-auto border-b md:border-b-0 md:border-r border-white/10 bg-white overflow-hidden flex-shrink-0 flex flex-col">

              {/* Illustration */}
              <div className="flex-1 flex items-center justify-center px-6 pt-6">
                <img
                  src="/enterprise-popup.jpg"
                  alt="Enterprise AI Systems Illustration"
                  className="w-full h-full object-contain select-none"
                  loading="eager"
                />
              </div>

              {/* Text block */}
              <div className="px-6 pb-5 text-gray-900 hidden md:block">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-indigo-600 mb-1.5">
                  Enterprise AI Transformation
                </p>
                <p className="text-[11px] text-gray-500 font-medium leading-relaxed mb-3">
                  Custom AI Systems · Workflow Automation · Business Process Optimization
                </p>
                <h3 className="text-base font-black leading-snug text-gray-900 mb-3">
                  Automate Your Business.<br />
                  Increase Productivity.<br />
                  Reduce Operational Costs.
                </h3>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {leftBadges.map((b) => (
                    <span
                      key={b}
                      className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100"
                    >
                      ✓ {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════
                RIGHT PANEL — Dark premium content
            ══════════════════════════════════════ */}
            <div className="flex-1 p-6 sm:p-8 md:p-10 flex flex-col overflow-y-auto no-scrollbar justify-between">
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold tracking-wide rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)] mb-4">
                  🚀 Complimentary AI Strategy Session
                </div>

                {/* Heading */}
                <h2 className="text-xl sm:text-2xl md:text-[1.65rem] font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent mb-2">
                  Book Your Free AI Business Assessment
                </h2>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  Discover how AI can automate repetitive work, eliminate operational
                  bottlenecks, and measurably improve business performance.
                </p>

                {/* Host info */}
                <div className="flex items-center gap-3 pb-4 border-b border-white/5 mb-4">
                  <div className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center font-bold text-violet-400 shadow-inner text-sm">
                    DS
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">Hosted By</div>
                    <div className="text-sm font-bold text-white">Dev N Suman</div>
                    <div className="text-[11px] text-slate-400">Founder & CEO, AlgoForce AI</div>
                  </div>
                </div>

                {/* What you receive */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-violet-400 tracking-widest uppercase">
                    What You Will Receive
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-3 mt-2">
                    {whatYouGet.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="w-4 h-4 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-violet-400 stroke-[3]" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Industries */}
                <div>
                  <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">
                    Suitable For
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {industries.map((ind) => (
                      <span
                        key={ind}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Action area ── */}
              <div className="mt-6 pt-4 border-t border-white/5">

                {/* Trust line */}
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                  <p className="text-[11px] text-slate-400">
                    Helping businesses build smarter operations ·{' '}
                    <span className="text-slate-300 font-medium">MSME Registered</span>
                  </p>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCTA}
                    className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-sm transition-all shadow-[0_8px_20px_rgba(139,92,246,0.3)] hover:shadow-[0_8px_25px_rgba(139,92,246,0.45)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 group"
                  >
                    <PhoneCall className="w-4 h-4 group-hover:animate-bounce" />
                    Book Free Consultation
                  </button>
                  <button
                    onClick={handleClose}
                    className="py-3 px-6 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 text-slate-400 hover:text-white font-semibold text-sm transition-all active:scale-[0.99]"
                  >
                    Maybe Later
                  </button>
                </div>

                {/* Footer */}
                <p className="text-[10px] text-slate-600 tracking-wider text-center mt-4 uppercase leading-relaxed">
                  South East Delhi, Kalkaji, New Delhi – 110019
                  <br />
                  MSME Registered · UDYAM-DL-08-0122150
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WebinarPopup;
