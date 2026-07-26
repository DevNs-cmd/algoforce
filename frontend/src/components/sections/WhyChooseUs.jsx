import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaLink, 
  FaDatabase, 
  FaCloud, 
  FaNetworkWired,
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

const INTEGRATIONS = [
  { name: 'Tally', desc: 'Compatible. Connects to your local Tally database.' },
  { name: 'SAP', desc: 'Requires connector. Connects via secure SAP integration gateway.' },
  { name: 'Zoho', desc: 'Native Integration. Syncs contact details and logs meetings instantly.' },
  { name: 'Salesforce', desc: 'Native Integration. Connects directly to update sales pipelines.' },
  { name: 'WhatsApp', desc: 'Native Integration. Connects with the official Cloud API.' },
  { name: 'Shopify', desc: 'Native Integration. Syncs store orders and inventory levels.' },
  { name: 'HubSpot', desc: 'Native Integration. Synchronizes leads and scheduling records.' },
  { name: 'Google Workspace', desc: 'Native Integration. Connects to Google Drive and Calendar.' },
  { name: 'Microsoft 365', desc: 'Native Integration. Syncs with OneDrive and Outlook.' },
  { name: 'Oracle', desc: 'Requires connector. Reconciles database records securely.' },
  { name: 'MongoDB', desc: 'Native Integration. Connects database fields to AI copilots.' },
  { name: 'PostgreSQL', desc: 'Native Integration. Reads database schemas directly.' },
  { name: 'AWS', desc: 'Compatible. Supports secure private hosting.' },
  { name: 'Azure', desc: 'Compatible. Supports enterprise deployment networks.' },
  { name: 'Google Cloud', desc: 'Compatible. Supports secure hosting and API integrations.' }
]

const INDUSTRIES = [
  { name: 'Manufacturing', icon: <FaIndustry /> },
  { name: 'Healthcare', icon: <FaHeartbeat /> },
  { name: 'Retail', icon: <FaShoppingBag /> },
  { name: 'Education', icon: <FaGraduationCap /> },
  { name: 'Hospitality', icon: <FaHotel /> },
  { name: 'Construction', icon: <FaBuilding /> },
  { name: 'Finance', icon: <FaDollarSign /> },
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
    <section ref={ref} id="why-choose-us" className="py-16 md:py-24 bg-[#03070d] text-white relative overflow-hidden border-b border-white/5">
      {/* Decorative Glows */}
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
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-400">Vertical Relevance</span>
            <h3 className="text-3xl md:text-4xl font-bold leading-tight mt-2">
              Software that understands <span className="premium-serif italic font-normal text-[#cdb4ff]">your industry.</span>
            </h3>
            <p className="max-w-xl mx-auto text-slate-400 font-normal text-sm mt-3">
              Start with the realities of your operation, then choose the product that fits the workflow.
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
                {showAllIndustries ? 'Show Fewer Industries' : `Show All Industries (${INDUSTRIES.length})`}
              </button>
            </div>
          )}
        </div>

        <hr className="border-white/5 my-12 max-w-5xl mx-auto" />

        <div id="integrations">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-10"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-400">Integrations</span>
            <h3 className="text-3xl md:text-5xl font-bold leading-tight mt-2">
              Automate work without <span className="premium-serif italic font-normal text-[#cdb4ff]">replacing your stack.</span>
            </h3>
            <p className="max-w-xl mx-auto text-slate-400 font-normal text-sm mt-3">
              AlgoForce products are deployed around the systems your teams already use.
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
                  whileHover={{ scale: 1.05, border: '1px solid rgba(143,56,255,0.4)' }}
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

          {INTEGRATIONS.length > 6 && (
            <div className="text-center mb-8">
              <button
                onClick={() => setShowAllIntegrations(!showAllIntegrations)}
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-purple-300 hover:text-white border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 transition-all"
              >
                {showAllIntegrations ? 'Show Fewer Platforms' : `Show All Integrations (${INTEGRATIONS.length})`}
              </button>
            </div>
          )}

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
                  Select a platform to view how it fits into the deployment.
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
