import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false); // kept, not used (no breaking change)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const x = useMotionValue(0);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "AlgoForce Labs", path: "/algoforce-labs.html", isExternal: true },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#05050F] shadow-lg transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-white/80 px-4 py-1.5 rounded-full shadow-sm"
            >
              <span className="text-[#0A2A43]">Algo</span>
              <span className="text-[#9A4DFF]">Force</span>
            </motion.div>
          </Link>




          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Home link always first */}
            <Link
              to="/"
              className={`font-medium transition-colors ${location.pathname === "/"
                ? "text-purple-400"
                : "text-white hover:text-purple-400"
                }`}
            >
              Home
            </Link>

            {/* Section buttons only on Home */}
            {location.pathname === "/" && (
              <>
                <button
                  onClick={() => scrollToSection("what-is")}
                  className="text-white hover:text-purple-400 transition-colors font-medium"
                >
                  Overview
                </button>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="text-white hover:text-purple-400 transition-colors font-medium"
                >
                  Engine
                </button>
                <button
                  onClick={() => scrollToSection("product-modules")}
                  className="text-white hover:text-purple-400 transition-colors font-medium"
                >
                  Product
                </button>
                <button
                  onClick={() => scrollToSection("who-its-for")}
                  className="text-white hover:text-purple-400 transition-colors font-medium"
                >
                  Who Wins
                </button>
              </>
            )}

            {/* Other nav links (exclude Home) */}
            {navLinks
              .filter((link) => link.path !== "/")
              .map((link) =>
                link.isExternal ? (
                  <a
                    key={link.path}
                    href={link.path}
                    className="font-medium text-white hover:text-purple-400 transition-colors"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-medium transition-colors ${location.pathname === link.path
                      ? "text-purple-400"
                      : "text-white hover:text-purple-400"
                      }`}
                  >
                    {link.name}
                  </Link>
                )
              )}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Request Demo
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[10000] md:hidden"
            >
              {/* BACKDROP — click anywhere closes menu */}
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* PANEL */}
              <motion.div
                style={{ x }}
                drag="x"
                dragConstraints={{ left: -300, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -120 || info.velocity.x < -500) {
                    setMobileMenuOpen(false);
                  } else {
                    x.set(0);
                  }
                }}
                initial={{ x: 320 }}
                animate={{ x: 0 }}
                exit={{ x: 320 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute right-0 top-0 h-full w-[80%] max-w-xs bg-gradient-to-b from-[#05050F] to-[#0B0F2A] px-6 pt-6 shadow-2xl z-[10001]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                  <span className="text-2xl font-bold gradient-text">
                    AlgoForce
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white text-2xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Links */}
                <div className="flex flex-col space-y-6 text-lg text-white">
                  <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                    Home
                  </Link>
                  <button onClick={() => scrollToSection("what-is")}>
                    What is AlgoForce
                  </button>
                  <button onClick={() => scrollToSection("how-it-works")}>
                    How It Works
                  </button>
                  <button onClick={() => scrollToSection("product-modules")}>
                    Product
                  </button>
                  <button onClick={() => scrollToSection("who-its-for")}>
                    Who It’s For
                  </button>
                  <Link to="/pricing" onClick={() => setMobileMenuOpen(false)}>
                    Pricing
                  </Link>
                  <a href="/algoforce-labs.html" onClick={() => setMobileMenuOpen(false)}>
                    AlgoForce Labs
                  </a>
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Contact
                  </Link>
                </div>

                {/* CTA */}
                <div className="mt-auto pt-10">
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full py-4 rounded-xl bg-purple-600 text-white font-semibold">
                      Request Demo →
                    </button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
