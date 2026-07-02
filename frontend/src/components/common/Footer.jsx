import { Link } from "react-router-dom"
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaXTwitter,
  FaWhatsapp,
} from "react-icons/fa6"
import { FaMapMarkerAlt } from "react-icons/fa"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="text-white bg-[#030308] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="px-6 py-12 md:py-20 mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-8">
              <Link to="/" className="inline-block">
                <div className="bg-white px-4 py-2 rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_8px_24px_rgba(255,255,255,0.04)]">
                  <img src="/logo.png" alt="AlgoForce" className="h-8 w-auto object-contain" />
                </div>
              </Link>
            </div>

            <p className="mb-8 text-gray-500 max-w-sm font-medium leading-[1.8]">
              The premier AI execution studio for high-growth startups and
              ambitious founders. We engineer technical equity.
            </p>

            <div className="mb-8 flex flex-col gap-3 max-w-sm text-gray-500 text-sm font-medium leading-relaxed">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-purple-500 flex-shrink-0" />
                <p>
                  Office: South East Delhi, Kalkaji, New Delhi – 110019
                </p>
              </div>
              <div className="pl-6 text-xs text-gray-600 space-y-1">
                <p>MSME UDYAM: UDYAM-DL-08-0122150</p>
                <p>GSTIN: Applied / Pending Registration</p>
              </div>
            </div>

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
            <h4 className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 italic">Navigation</h4>
            <ul className="space-y-4">
              {[
                // { name: 'Academy', path: '/academy' },
                { name: 'Labs', path: '/labs' },
                { name: 'Pricing', path: '/pricing' },
                { name: 'Meet Our Founder', path: '/founder' },
                { name: 'Meet Our Team', path: '/team' },
                { name: 'What is AlgoForce?', path: '/what-is-algoforce' },
                { name: 'Blog Insights', path: '/blog' }
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-500 hover:text-white transition-colors text-sm font-bold italic">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SEO Pillars */}
          <div>
            <h4 className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-purple-600 italic">Industrial Proof</h4>
            <ul className="space-y-4">
              {[
                { name: 'AI Course for Beginners', path: '/ai-course' },
                { name: 'AI Projects for Students', path: '/ai-course-for-students' },
                { name: 'Build AI App No-Code', path: '/build-ai-app-without-coding' },
                { name: 'AI Certification India', path: '/ai-certification-india' }
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-500 hover:text-white transition-colors text-sm font-bold italic">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Section moved to Bottom or separate grid */}
        </div>

        <div className="pt-16 mt-16 flex flex-wrap justify-center gap-8 border-t border-white/5 opacity-50">
             {[
                { name: 'Crucible', path: 'https://crucible-website-omega.vercel.app/', isExternal: true },
                { name: 'Privacy', path: '/privacy-policy' },
                { name: 'Terms', path: '/terms-and-conditions' },
                { name: 'Refunds', path: '/refund-policy' },
                { name: 'Cancellation', path: '/cancellation-policy' },
                { name: 'Cookies', path: '/cookie-policy' },
                { name: 'AI Policy', path: '/ai-policy' }
              ].map(link => (
                link.isExternal ? (
                  <a key={link.name} href={link.path} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
                    {link.name}
                  </a>
                ) : (
                  <Link key={link.path} to={link.path} className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
                    {link.name}
                  </Link>
                )
              ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-16 mt-16 text-center border-t border-white/5">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-800">
            Copyright {currentYear} AlgoForce AI
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
