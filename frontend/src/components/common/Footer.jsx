import { Link } from "react-router-dom"
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaXTwitter,
  FaWhatsapp,
} from "react-icons/fa6"
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa"
import { ArrowRight, ShieldCheck } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-white via-slate-50 to-slate-100/90 text-slate-800 border-t-2 border-t-white border-b-2 border-b-slate-300 shadow-[0_-10px_35px_rgba(9,41,65,0.05)] relative overflow-hidden">
      <div className="px-6 py-14 md:py-20 mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 xl:gap-14">

          {/* Brand & Corporate Column */}
          <div className="sm:col-span-2 md:col-span-3 xl:col-span-2">
            <div className="flex items-center mb-6">
              <Link to="/" className="inline-block group">
                <div className="bg-white px-4 py-2.5 rounded-2xl flex items-center justify-center border-t border-t-white border-b-2 border-b-slate-200 border-x border-slate-200 shadow-[0_6px_16px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1)] group-hover:-translate-y-0.5 transition-transform">
                  <img src="/algoforce-official-logo.png" alt="AlgoForce - Technology Partner" className="h-8 w-auto object-contain" />
                </div>
              </Link>
            </div>

            <p className="text-sm font-serif italic text-[#092941] mb-2 font-normal">
              Your Technology Partner. From Problem to Progress.
            </p>

            <p className="mb-6 text-slate-600 text-xs sm:text-sm font-normal leading-relaxed max-w-md">
              AlgoForce is an integrated IT services and digital engineering company. We combine technology consulting, custom software engineering, AI automation, and managed operations under one unified delivery organization.
            </p>

            {/* Corporate Credentials Box */}
            <div className="mb-6 p-4 rounded-xl bg-white border-t border-t-white border-b-2 border-b-slate-200 border-x border-slate-200 shadow-[0_4px_12px_rgba(9,41,65,0.04),inset_0_1px_0_rgba(255,255,255,1)] max-w-md space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="mt-0.5 text-[#092941] flex-shrink-0" />
                <span className="font-medium">South East Delhi, Kalkaji, New Delhi – 110019</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={14} className="text-emerald-700 flex-shrink-0" />
                <span className="font-mono text-[11px] font-bold text-slate-700">MSME UDYAM: UDYAM-DL-08-0122150</span>
              </div>
              <div className="flex items-center gap-4 pt-1 border-t border-slate-100 text-slate-600">
                <a href="tel:+918448947436" className="flex items-center gap-1.5 hover:text-[#092941] transition-colors">
                  <FaPhoneAlt size={11} className="text-[#092941]" />
                  <span>+91 84489 47436</span>
                </a>
                <a href="mailto:connect@algoforce.in" className="flex items-center gap-1.5 hover:text-[#092941] transition-colors">
                  <FaEnvelope size={11} className="text-[#092941]" />
                  <span>connect@algoforce.in</span>
                </a>
              </div>
            </div>

            {/* Social Channels */}
            <div className="flex space-x-3">
              {[
                { icon: <FaLinkedin size={15} />, href: "https://www.linkedin.com/company/algoforceofficial/", label: "LinkedIn" },
                { icon: <FaInstagram size={15} />, href: "https://www.instagram.com/algo.force?igsh=MzRndng5bXJ6eHU4", label: "Instagram" },
                { icon: <FaFacebook size={15} />, href: "https://www.facebook.com/share/1BDAyoFCG1/", label: "Facebook" },
                { icon: <FaXTwitter size={15} />, href: "https://x.com/algoforceAF", label: "X" },
                { icon: <FaWhatsapp size={15} />, href: "https://wa.me/918448947436", label: "WhatsApp" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-slate-600 hover:text-white hover:bg-[#092941] transition-all border-t border-t-white border-b-2 border-b-slate-200 border-x border-slate-200 shadow-[0_2px_6px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Six Divisions Column */}
          <div>
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#092941]">Six Divisions</h4>
            <ul className="space-y-3">
              {[
                { name: 'Technology Consulting', path: '/services#consulting' },
                { name: 'Software & Digital Engineering', path: '/services#software-engineering' },
                { name: 'AI & Intelligent Automation', path: '/services#ai-automation' },
                { name: 'Enterprise Solutions', path: '/services#enterprise' },
                { name: 'Managed Technology Services', path: '/services#managed-services' },
                { name: 'Products, Platforms & R&D', path: '/products' }
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-600 hover:text-[#092941] transition-colors text-xs font-medium flex items-center gap-1 group">
                    <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-[#092941] transition-colors" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries & Pathways */}
          <div>
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#092941]">Industries</h4>
            <ul className="space-y-3">
              {[
                { name: 'Manufacturing & Distribution', path: '/industries/manufacturing' },
                { name: 'Education & Institutions', path: '/industries/education' },
                { name: 'Retail & E-Commerce', path: '/industries' },
                { name: 'Logistics & Supply Chain', path: '/industries' },
                { name: 'Healthcare & Wellness', path: '/industries' },
                { name: 'Industry Overview Hub', path: '/industries' }
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-600 hover:text-[#092941] transition-colors text-xs font-medium flex items-center gap-1 group">
                    <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-[#092941] transition-colors" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Engagement & Partnerships */}
          <div>
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-purple-900">Partner & Engage</h4>
            <ul className="space-y-3">
              {[
                { name: 'Partnership Program', path: '/partnerships' },
                { name: 'White-Label Delivery', path: '/partnerships#white-label' },
                { name: 'Reseller & Referrals', path: '/partnerships#reseller' },
                { name: 'About AlgoForce', path: '/about' },
                { name: 'Discuss Your Requirement', path: '/contact' },
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-600 hover:text-[#092941] transition-colors text-xs font-medium flex items-center gap-1 group">
                    <span className="w-1 h-1 rounded-full bg-purple-300 group-hover:bg-purple-900 transition-colors" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-slate-200">
              <Link to="/contact">
                <button className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-b from-[#12395b] to-[#092941] hover:from-[#0d2d48] hover:to-[#071f32] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border-t border-t-white/30 border-b-2 border-b-[#051724] shadow-[0_6px_16px_rgba(9,41,65,0.3),inset_0_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-0.5">
                  <span>Start Conversation</span>
                  <ArrowRight size={13} />
                </button>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom bar links & copyright */}
        <div className="pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 text-xs text-slate-500">
          <p>© {currentYear} AlgoForce. All rights reserved. Registered under MSME UDYAM-DL-08-0122150.</p>
          <div className="flex flex-wrap gap-5">
            {[
              { name: 'Privacy Policy', path: '/privacy-policy' },
              { name: 'Terms & Conditions', path: '/terms-and-conditions' },
              { name: 'Cookie Policy', path: '/cookie-policy' },
              { name: 'AI Ethics Policy', path: '/ai-policy' },
            ].map(link => (
              <Link key={link.path} to={link.path} className="hover:text-[#092941] transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
