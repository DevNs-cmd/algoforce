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
  { name: 'Tally', desc: 'Fully compatible. Syncs ledgers, vouchers, and transactions in real-time.' },
  { name: 'Zoho', desc: 'Direct API integration. Automatically pushes qualified leads and logs conversations.' },
  { name: 'Salesforce', desc: 'Direct REST API sync. Updates lead pipelines and synchronizes data tables.' },
  { name: 'WhatsApp', desc: 'Official Cloud API integration. Handles customer queries and booking workflows.' },
  { name: 'Shopify', desc: 'Webhook & API sync. Reconciles inventory levels and web sales in real-time.' },
  { name: 'MongoDB', desc: 'Native connector. Connects unstructured databases with AI model endpoints.' },
  { name: 'PostgreSQL', desc: 'Native connector. Direct schema syncing and structured queries.' },
  { name: 'AWS', desc: 'Cloud hosting. Supports secure, private VPC deployments for enterprise clients.' },
  { name: 'Azure', desc: 'Cloud hosting. Supports private subnet deployments matching security standards.' },
  { name: 'Google Cloud', desc: 'Cloud hosting. Native deployment and Google Workspace API sync.' },
  { name: 'SAP', desc: 'Enterprise ERP sync. Reconciles material logs, finance registries, and inventory.' },
  { name: 'Oracle', desc: 'Enterprise database connector. Secure read/write sync for database schemas.' },
  { name: 'HubSpot', desc: 'Pipeline connector. Syncs contact cards and schedules follow-up tasks.' },
  { name: 'Meta', desc: 'Conversational channels. Hooks WhatsApp, Instagram, and Messenger into AI.' },
  { name: 'REST APIs', desc: 'Universal compatibility. Syncs with any modern web service.' },
  { name: 'Webhooks', desc: 'Real-time triggers. Runs automation scripts on database updates.' },
  { name: 'CSV', desc: 'Offline data loader. Imports historical files and spreadsheets securely.' }
]

const INDUSTRIES = [
  { name: 'Manufacturing', icon: <FaIndustry /> },
  { name: 'Healthcare', icon: <FaHeartbeat /> },
  { name: 'Hotels', icon: <FaHotel /> },
  { name: 'Retail', icon: <FaShoppingBag /> },
  { name: 'Education', icon: <FaGraduationCap /> },
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
            Click on any platform logo below to examine its deployment and operational compatibility status.
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
                <div className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">{activeInt} Compatibility</div>
                <p className="text-xs text-slate-300 leading-normal">{INTEGRATIONS.find(i => i.name === activeInt)?.desc}</p>
              </motion.div>
            ) : (
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 border-dashed text-center flex flex-col justify-center text-xs text-slate-500 font-semibold italic">
                Select an integration logo above to view technical compatibility status.
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
