import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import AuthModal from "../auth/AuthModal";
import { rafThrottle } from "../../utils/performance";
import { ChevronDown } from "lucide-react";

const SOLUTIONS_DROPDOWN = [
  { name: "Finance", path: "/solutions/finance", desc: "Automate finance workflows around your existing systems" },
  { name: "Revenue", path: "/solutions/revenue", desc: "Intelligent automation for lead and sales workflows" },
  { name: "Operations", path: "/solutions/operations", desc: "Automate approvals, exceptions and coordination" },
  { name: "Manufacturing", path: "/solutions/manufacturing", desc: "AI for quality, production and operational visibility" },
  { name: "People", path: "/solutions/people", desc: "Automate repetitive HR and employee workflows" },
  { name: "Knowledge", path: "/solutions/knowledge", desc: "Turn documents into usable operational intelligence" },
];

const INDUSTRIES_DROPDOWN = [
  { name: "Manufacturing", path: "/industries/manufacturing" },
  { name: "Finance & Accounting", path: "/industries/finance" },
  { name: "Retail", path: "/industries/retail" },
  { name: "Logistics", path: "/industries/logistics" },
  { name: "Healthcare", path: "/industries/healthcare" },
  { name: "Hospitality", path: "/industries/hospitality" },
  { name: "Education", path: "/industries/education" },
  { name: "Professional Services", path: "/industries/professional-services" },
];

const DropdownMenu = ({ items, isOpen, type }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.97 }}
        transition={{ duration: 0.18 }}
        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50"
      >
        <div className="bg-[#03070d] border border-white/10 rounded-[20px] shadow-[0_24px_60px_rgba(0,0,0,0.5)] p-3 backdrop-blur-xl">
          {type === "solutions" ? (
            <div className="grid grid-cols-2 gap-1 w-[480px]">
              {items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <span className="text-[13px] font-bold text-white group-hover:text-purple-300 transition-colors">{item.name}</span>
                  <span className="text-[11px] text-slate-500 leading-tight font-normal">{item.desc}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-1 w-[340px]">
              {items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <span className="text-[13px] font-semibold text-slate-300 group-hover:text-white transition-colors">{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const solutionsRef = useRef(null);
  const industriesRef = useRef(null);

  const isLightPage =
    location.pathname === "/labs" ||
    location.pathname === "/services" ||
    location.pathname === "/products" ||
    location.pathname === "/solutions";

  useEffect(() => {
    const handleScroll = rafThrottle(() => {
      setScrolled(window.scrollY > 20);
    });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel?.();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
    setIndustriesOpen(false);
  }, [location.pathname]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (solutionsRef.current && !solutionsRef.current.contains(e.target)) setSolutionsOpen(false);
      if (industriesRef.current && !industriesRef.current.contains(e.target)) setIndustriesOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = (active) =>
    `text-[13px] font-semibold transition-all duration-300 hover:text-white flex items-center gap-1 ${active ? "text-white" : "text-slate-300"}`;

  const isSolutionsActive = location.pathname.startsWith("/solutions") || location.pathname.startsWith("/products");
  const isIndustriesActive = location.pathname.startsWith("/industries");

  return (
    <>
      <div className="fixed top-8 sm:top-9 left-0 right-0 z-50 flex justify-center p-2 sm:p-3 md:p-4 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`
            pointer-events-auto
            flex items-center justify-between
            px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-[24px]
            border transition-all duration-500 ease-out
            ${scrolled
              ? `w-full max-w-5xl ${isLightPage ? "bg-black/80 border-white/10" : "bg-black/60 border-white/8"} backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.3)]`
              : `w-full max-w-7xl ${isLightPage ? "bg-black/75 border-white/8" : "bg-black/30 border-white/6"} backdrop-blur-lg shadow-sm`
            }
          `}
        >
          {/* Logo */}
          <Link to="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3 group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white px-2.5 py-1 sm:px-3 rounded-xl flex items-center justify-center border border-white/10 shadow-[0_4px_12px_rgba(255,255,255,0.05)]"
            >
              <img src="/logo.png" alt="AlgoForce" loading="lazy" className="h-5 sm:h-7 w-auto object-contain" />
            </motion.div>
            <span className="hidden min-[340px]:block text-base sm:text-xl font-semibold brand-wordmark">
              Algo<span>Force</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5">
            <Link to="/" className={navLinkClass(location.pathname === "/")}>Home</Link>

            {/* Solutions Dropdown */}
            <div ref={solutionsRef} className="relative">
              <button
                onClick={() => { setSolutionsOpen(!solutionsOpen); setIndustriesOpen(false); }}
                className={navLinkClass(isSolutionsActive)}
              >
                Solutions <ChevronDown size={13} className={`transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`} />
              </button>
              <DropdownMenu items={SOLUTIONS_DROPDOWN} isOpen={solutionsOpen} type="solutions" />
            </div>

            {/* Industries Dropdown */}
            <div ref={industriesRef} className="relative">
              <button
                onClick={() => { setIndustriesOpen(!industriesOpen); setSolutionsOpen(false); }}
                className={navLinkClass(isIndustriesActive)}
              >
                Industries <ChevronDown size={13} className={`transition-transform duration-200 ${industriesOpen ? "rotate-180" : ""}`} />
              </button>
              <DropdownMenu items={INDUSTRIES_DROPDOWN} isOpen={industriesOpen} type="industries" />
            </div>

            <Link to="/#how-it-works" className={navLinkClass(false)}>How It Works</Link>
            <Link to="/about" className={navLinkClass(location.pathname === "/about")}>About</Link>
            <Link to="/contact" className={navLinkClass(location.pathname === "/contact")}>Contact</Link>

            {/* ORION: hidden from commercial nav — R&D only, accessible via direct URL /orion */}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4">
              {!user ? (
                <Link
                  to="/contact?type=assessment"
                  className="px-5 py-2 bg-white text-[#06101d] hover:bg-[#f6f1ff] rounded-full text-[13px] font-bold transition-all shadow-md whitespace-nowrap"
                >
                  Book Workflow Assessment
                </Link>
              ) : null}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/8 border border-white/12 text-white active:scale-95 transition-all"
            >
              <div className="flex flex-col gap-1.5">
                <div className="w-5 h-0.5 bg-white rounded-full" />
                <div className="w-5 h-0.5 bg-white/55 rounded-full" />
              </div>
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] max-h-[90vh] bg-[#03070d] border border-white/12 rounded-[28px] flex flex-col p-6 sm:p-8 shadow-[0_40px_100px_rgba(0,0,0,0.55)] overflow-y-auto scrollbar-hide"
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white text-xs font-bold active:scale-90 transition-all z-10"
              >
                ✕
              </button>

              <div className="flex flex-col gap-1 pt-2">
                {[
                  { name: "Home", path: "/" },
                  { name: "About", path: "/about" },
                  { name: "Pricing", path: "/pricing" },
                  { name: "Contact", path: "/contact" },
                ].map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xl font-semibold text-gray-400 hover:text-white transition-all duration-300 py-2"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Solutions Accordion */}
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 }}>
                  <button
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                    className="flex items-center justify-between w-full text-xl font-semibold text-gray-400 hover:text-white transition-all py-2"
                  >
                    Solutions <ChevronDown size={16} className={`transition-transform ${mobileSolutionsOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobileSolutionsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-4 flex flex-col gap-2 pt-1 pb-2"
                      >
                        {SOLUTIONS_DROPDOWN.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-base font-semibold text-gray-500 hover:text-white transition-colors py-1"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Mobile Industries Accordion */}
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  <button
                    onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                    className="flex items-center justify-between w-full text-xl font-semibold text-gray-400 hover:text-white transition-all py-2"
                  >
                    Industries <ChevronDown size={16} className={`transition-transform ${mobileIndustriesOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobileIndustriesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-4 flex flex-col gap-2 pt-1 pb-2"
                      >
                        {INDUSTRIES_DROPDOWN.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-base font-semibold text-gray-500 hover:text-white transition-colors py-1"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* How It Works */}
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.25 }}>
                  <Link
                    to="/#how-it-works"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xl font-semibold text-gray-400 hover:text-white transition-all duration-300 py-2"
                  >
                    How It Works
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-6 pt-4 border-t border-white/8"
                >
                  {!user ? (
                    <div className="flex flex-col gap-3">
                      <Link
                        to="/contact?type=assessment"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full py-3.5 bg-white text-black text-center rounded-full font-bold text-sm active:scale-95 transition-all shadow-xl"
                      >
                        Book Workflow Assessment
                      </Link>
                      <Link
                        to="/contact?type=demo"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full py-3 border border-white/15 text-white text-center rounded-full font-semibold text-sm active:scale-95 transition-all"
                      >
                        Book a Demo
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => { setMobileMenuOpen(false); logout(); }}
                        className="w-full py-3 border border-white/10 text-white rounded-full font-bold text-sm active:scale-95 transition-all"
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default Navigation;
