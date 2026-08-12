import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaIndustry,
  FaHeartbeat,
  FaHotel,
  FaShoppingBag,
  FaGraduationCap,
  FaBuilding,
  FaDollarSign,
  FaTruck,
  FaBriefcase,
  FaCogs
} from 'react-icons/fa'
import { trackCTAClick } from '../../utils/analytics'

const INTEGRATIONS = [
  { name: 'Tally', desc: 'Connects to your local Tally database without software replacement.' },
  { name: 'SAP', desc: 'Connects via secure SAP enterprise gateway.' },
  { name: 'Zoho', desc: 'Syncs contacts, leads, and sales records.' },
  { name: 'Salesforce', desc: 'Updates pipeline stages and logs customer interactions.' },
  { name: 'WhatsApp', desc: 'Connects via official Cloud API for lead follow-up.' },
  { name: 'Shopify', desc: 'Syncs orders and inventory levels.' },
  { name: 'HubSpot', desc: 'Synchronizes prospect records and scheduling.' },
  { name: 'Google Workspace', desc: 'Connects with Drive and Calendar workflows.' },
  { name: 'Microsoft 365', desc: 'Syncs with OneDrive and Outlook.' },
  { name: 'PostgreSQL', desc: 'Reads and reconciles database tables directly.' },
]

const INDUSTRIES = [
  { name: 'Manufacturing', icon: <FaIndustry /> },
  { name: 'Healthcare', icon: <FaHeartbeat /> },
  { name: 'Retail', icon: <FaShoppingBag /> },
  { name: 'Education', icon: <FaGraduationCap /> },
  { name: 'Hospitality', icon: <FaHotel /> },
  { name: 'Construction', icon: <FaBuilding /> },
  { name: 'Finance & Accounting', icon: <FaDollarSign /> },
  { name: 'Logistics', icon: <FaTruck /> },
  { name: 'Professional Services', icon: <FaBriefcase /> },
  { name: 'SMEs', icon: <FaCogs /> }
]

const WhyChooseUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05
  })

  const [activeInt, setActiveInt] = useState(null)
  const [showAllIndustries, setShowAllIndustries] = useState(false)
  const [showAllIntegrations, setShowAllIntegrations] = useState(false)

  const visibleIndustries = showAllIndustries ? INDUSTRIES : INDUSTRIES.slice(0, 5)
  const visibleIntegrations = showAllIntegrations ? INTEGRATIONS : INTEGRATIONS.slice(0, 6)

  return (
    <section ref={ref} id="why-choose-us" className="py-20 md:py-28 bg-[#03070d] text-white relative overflow-hidden border-b border-white/5">
      {/* Glows */}
      <div className="absolute top-[-10rem] right-[-10rem] w-[30rem] h-[30rem] rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10rem] left-[-10rem] w-[30rem] h-[30rem] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 subtle-ai-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Industries Grid */}
        <div id="industries">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-10"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-400">Industries</span>
            <h3 className="text-3xl md:text-4xl font-bold leading-tight mt-2">
              Solutions designed for{' '}
              <span className="premium-serif italic font-normal text-[#cdb4ff]">operationally complex businesses.</span>
            </h3>
            <p className="max-w-xl mx-auto text-slate-400 font-normal text-sm mt-3">
              We start with the operational workflow, not a generic industry pitch. The business function comes first; the industry context shapes the implementation.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            <AnimatePresence>
              {visibleIndustries.map((ind) => (
                <motion.div
                  key={ind.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.03)' }}
                  className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col items-center justify-center text-center group transition-colors"
                >
                  <div className="text-lg text-purple-400 mb-3 group-hover:scale-110 transition-transform">
                    {ind.icon}
                  </div>
                  <span className="text-xs font-semibold text-slate-300">{ind.name}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {INDUSTRIES.length > 5 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAllIndustries(!showAllIndustries)}
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-purple-300 hover:text-white border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 transition-all"
              >
                {showAllIndustries ? 'Show Fewer Industries' : 'View Industries'}
              </button>
            </div>
          )}
        </div>

        <hr className="border-white/5 my-14 max-w-5xl mx-auto" />

        {/* Integrations Grid */}
        <div id="integrations">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-10"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-400">Existing Stack Compatibility</span>
            <h3 className="text-3xl md:text-5xl font-bold leading-tight mt-2">
              Works with the systems{' '}
              <span className="premium-serif italic font-normal text-[#cdb4ff]">your business already uses.</span>
            </h3>
            <p className="max-w-xl mx-auto text-slate-400 font-normal text-sm mt-3">
              AlgoForce automates work around your existing ERP, CRM, databases, and communication tools.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-6 max-w-5xl mx-auto">
            <AnimatePresence>
              {visibleIntegrations.map((item) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.03, border: '1px solid rgba(143,56,255,0.4)' }}
                  onClick={() => setActiveInt(activeInt === item.name ? null : item.name)}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center font-bold text-xs uppercase tracking-wider transition-all h-20 ${
                    activeInt === item.name 
                      ? 'bg-purple-600/20 border-purple-500 text-purple-300' 
                      : 'bg-white/[0.01] border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{item.name}</span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={() => setShowAllIntegrations(!showAllIntegrations)}
              className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-purple-300 hover:text-white border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 transition-all"
            >
              {showAllIntegrations ? 'Show Fewer Platforms' : 'View Supported Integrations'}
            </button>
          </div>

          <div className="max-w-xl mx-auto h-24">
            <AnimatePresence mode="wait">
              {activeInt ? (
                <motion.div
                  key={activeInt}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-center flex flex-col justify-center"
                >
                  <div className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">{activeInt} Integration</div>
                  <p className="text-xs text-slate-300 leading-normal">{INTEGRATIONS.find(i => i.name === activeInt)?.desc}</p>
                </motion.div>
              ) : (
                <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 border-dashed text-center flex flex-col justify-center text-xs text-slate-500 font-semibold italic">
                  Select a platform to view how it fits into your workflow.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  )
}

export default WhyChooseUs
