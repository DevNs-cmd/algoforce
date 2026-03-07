import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import AuthModal from "../auth/AuthModal";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Nexus", path: "/ai-builder" },
    { name: "Labs", path: "/labs" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#05050F]/80 backdrop-blur-md border-b border-white/5 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <span className="text-2xl font-black text-white tracking-tighter">
                Algo<span className="text-purple-600 group-hover:text-purple-500 transition-colors">Force</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:text-purple-500 ${location.pathname === link.path ? "text-purple-500" : "text-gray-500"
                    }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div layoutId="nav-line" className="h-[2px] bg-purple-600 mt-1" />
                  )}
                </Link>
              ))}
            </div>

            {/* Auth / CTA */}
            <div className="hidden md:flex items-center space-x-8">
              {user ? (
                <div className="flex items-center gap-6">
                  <Link to="/dashboard" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-xl bg-purple-600/10 border border-purple-600/20 flex items-center justify-center text-[10px] text-purple-400 font-black group-hover:bg-purple-600 group-hover:text-white transition-all shadow-xl">
                      {user.name?.[0].toUpperCase()}
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">{user.name?.split(' ')[0]}</span>
                  </Link>
                  <button onClick={logout} className="text-[10px] font-black uppercase tracking-widest text-gray-700 hover:text-red-500 transition-colors">Logout</button>
                </div>
              ) : (
                <div className="flex items-center gap-8">
                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors"
                  >
                    Login
                  </button>
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2.5 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-50 transition-all shadow-xl shadow-white/5"
                    >
                      Init Project
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[60] md:hidden bg-[#05050F] flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="text-2xl font-black text-white tracking-tighter">Algo<span className="text-purple-600">Force</span></span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white text-3xl p-4">✕</button>
            </div>
            <div className="flex flex-col space-y-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-black text-white hover:text-purple-600 transition-colors tracking-tighter"
                >
                  {link.name}
                </Link>
              ))}
              {user && (
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-black text-purple-600 tracking-tighter">Dashboard</Link>
              )}
            </div>
            <div className="mt-auto">
              {!user ? (
                <button
                  onClick={() => { setMobileMenuOpen(false); setAuthModalOpen(true); }}
                  className="w-full py-5 bg-purple-600 text-white rounded-[2rem] font-black text-lg uppercase tracking-widest shadow-2xl shadow-purple-900/40"
                >
                  Join the Hub
                </button>
              ) : (
                <button
                  onClick={logout}
                  className="w-full py-5 bg-white/5 text-gray-400 rounded-[2rem] font-black text-lg uppercase tracking-widest border border-white/5"
                >
                  Log Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default Navigation;
