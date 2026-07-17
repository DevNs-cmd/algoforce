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

  return (
    <section ref={ref} id="why-choose-us" className="py-16 md:py-24 bg-[#03070d] text-white relative overflow-hidden border-b border-white/5">
      {/* Decorative Glows */}
      <div className="absolute top-[-10rem] right-[-10rem] w-[30rem] h-[30rem] rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10rem] left-[-10rem] w-[30rem] h-[30rem] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 subtle-ai-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Integrations Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-400">Ecosystem Fit</span>
          <h3 className="text-3xl md:text-5xl font-bold leading-tight mt-2">
            Seamless Database & <span className="premium-serif italic font-normal text-[#cdb4ff]">Software Integrations</span>
          </h3>
          <p className="max-w-xl mx-auto text-slate-400 font-normal text-sm mt-3">
            Click on any platform logo below to view integration details.
          </p>
        </motion.div>

        {/* Logos Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-10 max-w-5xl mx-auto">
          {INTEGRATIONS.map((item, idx) => (
            <motion.button
              key={item.name}
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
        </div>

        {/* Compatibility Checker Panel */}
        <div className="max-w-xl mx-auto mb-20 h-24">
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
                Select an integration logo above to view compatibility.
              </div>
            )}
          </AnimatePresence>
        </div>

        <hr className="border-white/5 my-14 max-w-5xl mx-auto" />

        {/* Industries Grid */}
        <div className="mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-400">Vertical Relevance</span>
            <h3 className="text-3xl md:text-4xl font-bold leading-tight mt-2">
              Industries <span className="premium-serif italic font-normal text-[#cdb4ff]">We Serve</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {INDUSTRIES.map((ind, idx) => (
              <motion.div
                key={ind.name}
                whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.03)' }}
                className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col items-center justify-center text-center group transition-colors"
              >
                <div className="text-lg text-purple-400 mb-3 group-hover:scale-110 transition-transform">
                  {ind.icon}
                </div>
                <span className="text-xs font-semibold text-slate-300">{ind.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default WhyChooseUs
