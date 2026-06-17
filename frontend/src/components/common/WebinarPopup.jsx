import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Users, Sparkles, PhoneCall } from 'lucide-react';

const WebinarPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already registered or dismissed the popup in the current session
    const popupShown = sessionStorage.getItem('algoforce_webinar_popup_shown');
    if (!popupShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000); // 3 seconds delay
      return () => clearTimeout(timer);
    }
  }, []);

  // Close modal and store state in sessionStorage
  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('algoforce_webinar_popup_shown', 'true');
  };

  // Close when clicking outside the modal content
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleRegister = () => {
    // Save state so popup doesn't reappear
    sessionStorage.setItem('algoforce_webinar_popup_shown', 'true');
    setIsOpen(false);

    // Prefilled WhatsApp message
    const message = `Hello AlgoForce Team,

I would like to register for the AI, Careers & Future of Work 2026 Webinar.

Name:
College:
Year:
City:

Please share the webinar joining details.

Thank you.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918448947436?text=${encodedMessage}`;
    
    // Open in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const highlights = [
    'ChatGPT vs Claude vs Gemini',
    'Prompt Engineering Frameworks',
    'AI Career Opportunities',
    'Automation & Productivity Systems',
    'Future Skills for 2026+'
  ];

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
          {/* Main Modal Card */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="relative w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] bg-[#03070d]/80 border border-white/10 rounded-[32px] shadow-[0_30px_100px_rgba(139,92,246,0.25)] overflow-hidden flex flex-col md:flex-row text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glows */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Poster Showcase (Desktop) / Header (Mobile) */}
            <div className="relative w-full md:w-[42%] h-56 sm:h-72 md:h-auto border-b md:border-b-0 md:border-r border-white/10 bg-white overflow-hidden flex-shrink-0 flex items-center justify-center">
              <img
                src="/poster-ai.png"
                alt="Webinar Poster"
                className="w-full h-full object-contain select-none"
                loading="eager"
              />
            </div>

            {/* Right Column: Content */}
            <div className="flex-1 p-6 sm:p-8 md:p-10 flex flex-col overflow-y-auto no-scrollbar justify-between">
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold tracking-wide rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                  <Sparkles className="w-3 h-3 text-violet-400 fill-violet-400/20" />
                  🔥 Exclusive Live Session
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mt-4 leading-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  AI, Careers & The Future of Work 2026
                </h2>

                {/* Host Info */}
                <div className="flex items-center gap-3 mt-3.5 pb-3.5 border-b border-white/5">
                  <div className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center font-bold text-violet-400 shadow-inner">
                    DS
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Hosted By</div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      Dev N Suman
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/20">Host</span>
                    </div>
                    <div className="text-[11px] text-slate-400">Founder & CEO, AlgoForce AI</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-4">
                  Discover how AI is transforming careers, businesses, and the future of work. Learn Prompt Engineering, AI Workflows, ChatGPT, Claude, Gemini, Automation Systems, and future-ready skills.
                </p>

                {/* Highlights List */}
                <div className="mt-5 space-y-2.5">
                  <span className="text-[11px] font-bold text-violet-400 tracking-wider uppercase">What You Will Learn:</span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                    {highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="w-4 h-4 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-violet-400 stroke-[3]" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Area & Footer */}
              <div className="mt-8 pt-4 border-t border-white/5">
                {/* Social Proof */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex -space-x-2">
                    <div className="w-5 h-5 rounded-full border border-black bg-slate-700 flex items-center justify-center text-[7px] font-bold text-white">A</div>
                    <div className="w-5 h-5 rounded-full border border-black bg-violet-600 flex items-center justify-center text-[7px] font-bold text-white">B</div>
                    <div className="w-5 h-5 rounded-full border border-black bg-[#002369] flex items-center justify-center text-[7px] font-bold text-white">C</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Users className="w-3.5 h-3.5 text-violet-400" />
                    <span>2500+ Applicants Already Registered</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleRegister}
                    className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-sm transition-all shadow-[0_8px_20px_rgba(139,92,246,0.3)] hover:shadow-[0_8px_25px_rgba(139,92,246,0.45)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 group"
                  >
                    <PhoneCall className="w-4 h-4 group-hover:animate-bounce" />
                    Reserve My Seat
                  </button>
                  <button
                    onClick={handleClose}
                    className="py-3 px-6 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 text-slate-400 hover:text-white font-semibold text-sm transition-all active:scale-[0.99]"
                  >
                    Maybe Later
                  </button>
                </div>

                {/* Footer Registration Info */}
                <p className="text-[10px] text-slate-500 tracking-wider text-center mt-4 uppercase">
                  MSME Registered • UDYAM-DL-08-0122150
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
