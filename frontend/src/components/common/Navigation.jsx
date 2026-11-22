import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Menu, X } from "lucide-react";
import { rafThrottle } from "../../utils/performance";

const SERVICES_DROPDOWN = [
  { 
    name: "Technology Consulting", 
    path: "/services#consulting", 
    desc: "Technology roadmaps, solution architecture & advisory" 
  },
  { 
    name: "Software & Digital Engineering", 
    path: "/services#engineering", 
    desc: "Custom web applications, mobile apps, APIs & cloud systems" 
  },
  { 
    name: "AI & Intelligent Automation", 
    path: "/services#ai-automation", 
    desc: "LLMs, intelligent agents, workflow automation & OCR pipelines" 
  },
  { 
    name: "Enterprise & Industry Solutions", 
    path: "/services#enterprise", 
    desc: "Tally, SAP, CRM integrations & operational dashboards" 
  },
  { 
    name: "Managed Technology Services", 
    path: "/services#managed-services", 
    desc: "24/7 monitoring, application maintenance, security & SLAs" 
  },
  { 
    name: "Products, Platforms & R&D", 
    path: "/products", 
    desc: "Proprietary software including TallyGPT, FactoryGPT & CiteRank" 
  },
];

const INDUSTRIES_DROPDOWN = [
  { 
    name: "Manufacturing & Distribution", 
    path: "/industries/manufacturing", 
    desc: "Production tracking, inventory sync & shop-floor visibility" 
  },
  { 
    name: "Education & Institutions", 
    path: "/industries/education", 
    desc: "Admission management, student portals & campus workflows" 
  },
  { 
    name: "All Industry Capabilities", 
    path: "/industries", 
    desc: "Retail, Healthcare, Logistics, Financial & Professional Services" 
  },
];

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const location = useLocation();
  const servicesRef = useRef(null);
  const industriesRef = useRef(null);

  useEffect(() => {
    const handleScroll = rafThrottle(() => {
      setScrolled(window.scrollY > 15);
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
    setServicesOpen(false);
    setIndustriesOpen(false);
  }, [location.pathname]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) setServicesOpen(false);
      if (industriesRef.current && !industriesRef.current.contains(e.target)) setIndustriesOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = (active) =>
    `text-[12px] xl:text-[13px] font-semibold transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${
      active ? "text-[#092941] font-bold" : "text-slate-600 hover:text-[#092941]"
    }`;

  const isServicesActive = location.pathname.startsWith("/services");
  const isIndustriesActive = location.pathname.startsWith("/industries");

  return (
    <>
      <div className="fixed top-2 sm:top-3 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className={`
            pointer-events-auto
            flex items-center justify-between
            px-3 sm:px-5 py-2 rounded-full
            bg-white/94 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.08)]
            transition-all duration-300 ease-out
            w-full max-w-6xl
          `}
        >
          {/* Official Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <img 
              src="/algoforce-official-logo.png" 
              alt="AlgoForce - Technology Partner" 
              className="h-7 sm:h-8 md:h-9 w-auto object-contain group-hover:scale-102 transition-transform drop-shadow-[0_2px_4px_rgba(9,41,65,0.08)]" 
            />
            <div className="hidden lg:flex flex-col border-l border-slate-200/90 pl-2.5 ml-0.5">
              <span className="text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase leading-none">
                Technology Partner
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links — only on xl screens so it NEVER wraps or breaks */}
          <div className="hidden xl:flex items-center gap-4 2xl:gap-6 flex-nowrap">
            <Link to="/" className={navLinkClass(location.pathname === "/")}>
              Home
            </Link>

            {/* Services Dropdown */}
            <div ref={servicesRef} className="relative">
              <button
                onClick={() => { setServicesOpen(!servicesOpen); setIndustriesOpen(false); }}
                className={navLinkClass(isServicesActive)}
              >
                <span>Services</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 w-[500px] bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 backdrop-blur-xl"
                  >
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 py-1 font-semibold">
                      Six Integrated Divisions
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 mt-1">
                      {SERVICES_DROPDOWN.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setServicesOpen(false)}
                          className="flex flex-col p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <span className="text-xs font-bold text-[#092941] group-hover:text-purple-900 transition-colors">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-slate-500 leading-snug mt-0.5 font-normal">
                            {item.desc}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Industries Dropdown */}
            <div ref={industriesRef} className="relative">
              <button
                onClick={() => { setIndustriesOpen(!industriesOpen); setServicesOpen(false); }}
                className={navLinkClass(isIndustriesActive)}
              >
                <span>Industries</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${industriesOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {industriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 w-[380px] bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 backdrop-blur-xl"
                  >
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 py-1 font-semibold">
                      Target Operating Contexts
                    </div>
                    <div className="flex flex-col gap-1 mt-1">
                      {INDUSTRIES_DROPDOWN.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setIndustriesOpen(false)}
                          className="flex flex-col p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <span className="text-xs font-bold text-[#092941] group-hover:text-purple-900 transition-colors">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-slate-500 leading-snug mt-0.5 font-normal">
                            {item.desc}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/products" className={navLinkClass(location.pathname === "/products")}>
              Products
            </Link>

            <Link to="/partnerships" className={navLinkClass(location.pathname === "/partnerships")}>
              Partnerships
            </Link>

            <Link to="/about" className={navLinkClass(location.pathname === "/about")}>
              About
            </Link>

            <Link to="/contact" className={navLinkClass(location.pathname === "/contact")}>
              Contact
            </Link>
          </div>

          {/* Right Header Action Button */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Link to="/contact">
              <button className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#092941] hover:bg-[#071f32] text-white rounded-full text-xs sm:text-[13px] font-semibold transition-all shadow-sm whitespace-nowrap">
                Discuss Your Requirement
              </button>
            </Link>

            {/* Mobile / Tablet Toggle Button (<xl) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="xl:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-800"
            >
              {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] xl:hidden flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full bg-white rounded-t-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <img src="/algoforce-official-logo.png" alt="AlgoForce" className="h-8 w-auto object-contain" />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-2 py-4">
                <Link to="/" className="px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50">
                  Home
                </Link>
                <Link to="/services" className="px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50">
                  Services (Six Divisions)
                </Link>
                <Link to="/industries/manufacturing" className="px-3 py-2 text-sm text-slate-600 rounded-lg hover:bg-slate-50 pl-6">
                  • Manufacturing & Distribution
                </Link>
                <Link to="/industries/education" className="px-3 py-2 text-sm text-slate-600 rounded-lg hover:bg-slate-50 pl-6">
                  • Education & Institutions
                </Link>
                <Link to="/products" className="px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50">
                  Products & Platforms
                </Link>
                <Link to="/partnerships" className="px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50">
                  Partnerships
                </Link>
                <Link to="/about" className="px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50">
                  About AlgoForce
                </Link>
                <Link to="/contact" className="px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50">
                  Contact
                </Link>
              </div>

              <div className="pt-2">
                <Link to="/contact" className="w-full">
                  <button className="w-full py-3.5 bg-[#092941] text-white rounded-xl font-bold text-sm">
                    Discuss Your Requirement
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
