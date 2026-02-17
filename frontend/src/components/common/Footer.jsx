import { Link } from "react-router-dom"
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaXTwitter,
} from "react-icons/fa6"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="text-white bg-navy-900">
      <div className="px-4 sm:px-6 py-8 sm:py-12 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold gradient-text">
              AlgoForce
            </h3>

            <p className="mb-4 text-sm sm:text-base text-gray-400">
              The Operating System for Revenue Intelligence. Enterprise-grade AI
              Business OS that eliminates revenue leaks and compounds
              intelligence.
            </p>

            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="https://www.linkedin.com/company/algoforceofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <FaLinkedin size={20} className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
              </a>

              <a
                href="https://www.instagram.com/algo.force?igsh=MzRndng5bXJ6eHU4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <FaInstagram size={20} className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
              </a>

              <a
                href="https://www.facebook.com/share/1BDAyoFCG1/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <FaFacebook size={20} className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
              </a>

              <a
                href="https://x.com/algoforceAF"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <FaXTwitter size={20} className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 sm:mb-4 text-sm sm:text-base font-semibold">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link to="/" className="text-sm sm:text-base text-gray-400 hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm sm:text-base text-gray-400 hover:text-purple-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/labs" className="text-sm sm:text-base text-gray-400 hover:text-purple-400 transition-colors">
                  AlgoForce Labs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm sm:text-base text-gray-400 hover:text-purple-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 sm:mb-4 text-sm sm:text-base font-semibold">Legal</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-gray-400">
              <li>
                <Link to="/privacy-policy" className="text-sm sm:text-base hover:text-purple-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-sm sm:text-base hover:text-purple-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-sm sm:text-base hover:text-purple-400 transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 text-center text-gray-400 border-t border-gray-800">
          <p className="text-sm sm:text-base">
            ©{currentYear} AlgoForce. All rights reserved.
          </p>
          <p className="text-sm sm:text-base mt-1"> @Dev N Suman </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
