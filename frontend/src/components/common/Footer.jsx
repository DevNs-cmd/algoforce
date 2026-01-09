import { Link } from 'react-router-dom'
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="text-white bg-navy-900">
      <div className="px-6 py-12 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="mb-4 text-2xl font-bold gradient-text">AlgoForce</h3>
            <p className="mb-4 text-gray-400">
              The Operating System for Revenue Intelligence. Enterprise-grade AI Business OS that eliminates revenue leaks and compounds intelligence.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-purple-400"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-purple-400"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-purple-400"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 transition-colors hover:text-purple-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 transition-colors hover:text-purple-400">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 transition-colors hover:text-purple-400">
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

        <div className="pt-8 mt-8 text-center text-gray-400 border-t border-gray-800">
          <p>&copy; {currentYear} AlgoForce. All rights reserved. @DevNSuman</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
