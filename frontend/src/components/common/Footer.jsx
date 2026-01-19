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
      <div className="px-6 py-12 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-2xl font-bold gradient-text">
              AlgoForce
            </h3>

            <p className="mb-4 text-gray-400">
              The Operating System for Revenue Intelligence. Enterprise-grade AI
              Business OS that eliminates revenue leaks and compounds
              intelligence.
            </p>

            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/algoforceofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400"
              >
                <FaLinkedin size={22} />
              </a>

              <a
                href="https://www.instagram.com/algo.force?igsh=MzRndng5bXJ6eHU4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400"
              >
                <FaInstagram size={22} />
              </a>

              <a
                href="https://www.facebook.com/your-facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400"
              >
                <FaFacebook size={22} />
              </a>

              <a
                href="https://x.com/algoforceAF"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400"
              >
                <FaXTwitter size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-purple-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-purple-400">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-purple-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Enterprise Solutions</li>
              <li>Partner Program</li>
              <li>Support</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 text-center text-gray-400 border-t border-gray-800">
          <p>
            ©{currentYear} AlgoForce. All rights reserved.
          </p>
          <p> @Dev N Suman </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
