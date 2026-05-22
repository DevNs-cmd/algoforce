import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import AuthModal from "../auth/AuthModal";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/contact" },
    { name: "Labs", path: "/labs" },
    { name: "Crucible", path: "https://crucible-website-omega.vercel.app/", isExternal: true },
    { name: "Founder", path: "/founder" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`
            pointer-events-auto
            flex items-center justify-between
            px-6 py-3 rounded-full
            border border-white/10
            backdrop-blur-2xl transition-all duration-700 ease-in-out
            ${scrolled ? "w-full max-w-4xl bg-black/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" : "w-full max-w-7xl bg-black/20"}
          `}
        >
          {/* Logo */}
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative w-10 h-10 overflow-hidden rounded-full border border-white/20 bg-white/5 flex items-center justify-center transition-all duration-500 shadow-2xl"
            >
              <img src="/logo.png" alt="AlgoForce" loading="lazy" className="w-full h-full object-cover" />
            </motion.div>
            <span className="text-xl font-black text-white tracking-tighter sm:block">
              Algo<span className="text-purple-600 group-hover:text-purple-400 transition-colors">Force</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              link.isExternal ? (
                <a
                  key={link.name}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-semibold transition-all duration-300 hover:text-white text-gray-500"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[13px] font-semibold transition-all duration-300 hover:text-white ${location.pathname === link.path ? "text-white" : "text-gray-500"
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
                <Link to="/dashboard" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[11px] text-white font-bold hover:bg-white/10 transition-all">
                  {user.name?.[0].toUpperCase()}
                </Link>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-6 py-2.5 bg-white text-black hover:bg-white/90 rounded-full text-[13px] font-bold transition-all shadow-[0_10px_20px_rgba(255,255,255,0.05)]"
                >
                  Join
                </button>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white active:scale-95 transition-all"
            >
              <div className="flex flex-col gap-1.5">
                <div className="w-5 h-0.5 bg-white rounded-full" />
                <div className="w-5 h-0.5 bg-white/40 rounded-full" />
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
              className="relative w-full max-w-[320px] bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] flex flex-col p-10 shadow-[0_50px_100px_rgba(0,0,0,0.9)] overflow-hidden"
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white text-xs active:scale-90 transition-all"
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
                        className="text-xl font-bold text-gray-400 hover:text-white transition-all duration-300"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xl font-bold text-gray-400 hover:text-white transition-all duration-300"
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
                    <button
                      onClick={() => { setMobileMenuOpen(false); setAuthModalOpen(true); }}
                      className="w-full py-4 bg-white text-black rounded-full font-bold text-base active:scale-95 transition-all shadow-xl"
                    >
                      Join
                    </button>
                  ) : (
                    <button
                      onClick={logout}
                      className="w-full py-4 border border-white/10 text-white rounded-full font-bold text-base active:scale-95 transition-all"
                    >
                      Log Out
                    </button>
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
