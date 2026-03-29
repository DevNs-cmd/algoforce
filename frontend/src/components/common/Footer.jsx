import { Link } from "react-router-dom"
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaXTwitter,
  FaWhatsapp,
} from "react-icons/fa6"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="text-white bg-[#030308] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="px-6 py-12 md:py-20 mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 overflow-hidden rounded-xl bg-white/5 border border-white/10">
                <img src="/logo.png" alt="AlgoForce" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-3xl font-black tracking-tighter text-white">
                Algo<span className="text-purple-600">Force</span>
              </h3>
            </div>

            <p className="mb-8 text-gray-500 max-w-sm font-medium leading-[1.8]">
              The premier AI execution studio for high-growth startups and
              ambitious founders. We engineer technical equity.
            </p>

            <div className="flex space-x-6">
              {[
                { icon: <FaLinkedin />, href: "https://www.linkedin.com/company/algoforceofficial/" },
                { icon: <FaInstagram />, href: "https://www.instagram.com/algo.force?igsh=MzRndng5bXJ6eHU4" },
                { icon: <FaFacebook />, href: "https://www.facebook.com/share/1BDAyoFCG1/" },
                { icon: <FaXTwitter />, href: "https://x.com/algoforceAF" },
                { icon: <FaWhatsapp />, href: "https://wa.me/918448947436" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-600 hover:text-purple-500 hover:bg-white/10 transition-all border border-white/5"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Structure</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Nexus', path: '/ai-builder' },
                { name: 'Academy', path: '/academy' },
                { name: 'Labs', path: '/labs' },
                { name: 'Blog', path: '/blog' },
                { name: 'Pricing', path: '/pricing' },
                { name: 'Contact', path: '/contact' }
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-500 hover:text-white transition-colors text-sm font-bold">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Artifacts</h4>
            <ul className="space-y-4">
              {[
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Terms & Conditions', path: '/terms-and-conditions' },
                { name: 'Refund Policy', path: '/refund-policy' }
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-500 hover:text-white transition-colors text-sm font-bold">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-16 mt-16 text-center border-t border-white/5">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-800">
            ©{currentYear} AlgoForce Ai @Dev N Suman.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
