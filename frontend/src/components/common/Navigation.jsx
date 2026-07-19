import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import AuthModal from "../auth/AuthModal";
import { rafThrottle } from "../../utils/performance";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const isLightPage = location.pathname === '/labs' || location.pathname === '/services' || location.pathname === '/products' || location.pathname === '/solutions';

  useEffect(() => {
    const handleScroll = rafThrottle(() => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Labs", path: "/labs" },
    { name: "Crucible", path: "https://crucible-website-omega.vercel.app/", isExternal: true },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-3 sm:p-4 md:p-5 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`
            pointer-events-auto
            flex items-center justify-between
            px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-[24px]
            border transition-all duration-500 ease-out
            ${scrolled
              ? `w-full max-w-5xl ${isLightPage ? 'bg-black/80 border-white/10' : 'bg-black/60 border-white/8'} backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.3)]`
              : `w-full max-w-7xl ${isLightPage ? 'bg-black/75 border-white/8' : 'bg-black/30 border-white/6'} backdrop-blur-lg shadow-sm`
            }
          `}
        >
          <Link to="/" className="flex min-w-0 items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white px-3 py-1 rounded-xl flex items-center justify-center border border-white/10 shadow-[0_4px_12px_rgba(255,255,255,0.05)]"
            >
              <img src="/logo.png" alt="AlgoForce" loading="lazy" className="h-6 sm:h-7 w-auto object-contain" />
            </motion.div>
            <span className="hidden min-[360px]:block text-lg sm:text-xl font-semibold brand-wordmark">
              Algo<span>Force</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              link.isExternal ? (
                <a
                  key={link.name}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-semibold transition-all duration-300 hover:text-white text-slate-300"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[13px] font-semibold transition-all duration-300 hover:text-white ${location.pathname === link.path ? "text-white" : "text-slate-300"
                    }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    to="/contact"
                    className="px-5 py-2 bg-white text-[#06101d] hover:bg-[#f6f1ff] rounded-full text-[13px] font-bold transition-all shadow-md"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-full bg-white/8 border border-white/12 text-white active:scale-95 transition-all"
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
          <div className="fixed inset-0 z-[100] md:hidden flex items-center justify-center p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Menu Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-[320px] bg-[#03070d] border border-white/12 rounded-[28px] flex flex-col p-8 shadow-[0_40px_100px_rgba(0,0,0,0.55)] overflow-hidden"
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white text-xs active:scale-90 transition-all"
              >
                X
              </button>

              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {link.isExternal ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xl font-semibold text-gray-400 hover:text-white transition-all duration-300"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xl font-semibold text-gray-400 hover:text-white transition-all duration-300"
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4"
                >
                  {!user ? (
                    <div className="flex flex-col gap-3">
                      <Link
                        to="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full py-3 bg-white text-black text-center rounded-full font-bold text-sm active:scale-95 transition-all shadow-xl"
                      >
                        Get Started
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
