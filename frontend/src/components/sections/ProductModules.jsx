import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { 
  FaBrain, 
  FaCogs, 
  FaWhatsapp, 
  FaChartLine, 
  FaUsers, 
  FaIndustry, 
  FaHotel, 
  FaDatabase, 
  FaArrowRight,
  FaTimes,
  FaCheck
} from 'react-icons/fa'

const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'finance', name: 'Finance' },
  { id: 'sales', name: 'Sales' },
  { id: 'hr', name: 'HR' },
  { id: 'operations', name: 'Operations' },
  { id: 'manufacturing', name: 'Manufacturing' },
  { id: 'hospitality', name: 'Hospitality' },
  { id: 'knowledge', name: 'Knowledge' },
  { id: 'analytics', name: 'Analytics' }
]

const PRODUCTS = [
  {
    id: 'tallygpt',
    name: 'TallyGPT',
    tagline: 'AI Finance Copilot',
    description: 'Automates accounting workflows, reconciliations and financial reporting.',
    outcome: 'Reconcile books 10x faster and secure real-time financial intelligence.',
    category: 'finance',
    icon: <FaBrain />,
    color: '#8f38ff',
    integrations: ['Tally Prime ERP', 'Tally ERP 9', 'Local SQL Gateway'],
    hosting: ['Secure AlgoForce Cloud', 'On-Premises server sync'],
    details: 'Automates routine ledger updates, maps accounts payable/receivable, flags anomalies, and allows managers to ask natural language questions about financial records.'
  },
  {
    id: 'leadbolt',
    name: 'LeadBolt',
    tagline: 'AI Sales Copilot',
    description: 'Captures, qualifies and follows up with leads automatically.',
    outcome: '24/7 lead qualification and 24% increase in sales conversions.',
    category: 'sales',
    icon: <FaChartLine />,
    color: '#7aa7c7',
    integrations: ['WhatsApp Cloud API', 'Zoho CRM', 'Salesforce CRM', 'HubSpot'],
    hosting: ['Secure Cloud Gateway', 'Private AWS/Azure VPC'],
    details: 'Engages inbound traffic and WhatsApp chats instantly, qualifies prospect criteria, registers leads in CRM, and schedules live validation calls with sales engineers.'
  },
  {
    id: 'hotelgpt',
    name: 'HotelGPT',
    tagline: 'AI Hospitality Copilot',
    description: 'Handles guest enquiries, bookings and WhatsApp conversations 24/7.',
    outcome: '19% increase in booking conversions; zero missed reservations.',
    category: 'hospitality',
    icon: <FaHotel />,
    color: '#b783ff',
    integrations: ['Property Management Systems', 'WhatsApp Cloud API', 'Stripe Payments'],
    hosting: ['Secure Cloud Gateway'],
    details: 'Manages room queries, books guests directly, triggers check-in/out workflows, and answers general guest questions without front desk intervention.'
  },
  {
    id: 'gst-autopilot',
    name: 'GST Autopilot',
    tagline: 'AI Compliance Copilot',
    description: 'Automates GST reconciliation and compliance.',
    outcome: 'Eliminate tax credit leakages and save 40+ hours per month.',
    category: 'finance',
    icon: <FaCogs />,
    color: '#8f38ff',
    integrations: ['GST Portal API', 'Tally Prime ERP', 'SAP ERP'],
    hosting: ['Secure AlgoForce Cloud', 'Private Cloud VPC'],
    details: 'Automates Input Tax Credit (ITC) matching, highlights tax anomalies, maps incoming purchase registries, and streamlines the preparation of compliance data.'
  },
  {
    id: 'hr-copilot',
    name: 'HR Copilot',
    tagline: 'AI HR Copilot',
    description: 'Internal employee assistant for onboarding and queries.',
    outcome: 'Reduce employee query times by 90% and streamline onboarding.',
    category: 'hr',
    icon: <FaUsers />,
    color: '#8f38ff',
    integrations: ['Slack', 'MS Teams', 'Google Drive', 'Notion'],
    hosting: ['Private AWS/Azure VPC', 'Secure AlgoForce Cloud'],
    details: 'Acts as an internal knowledge directory, allowing employees to query internal policies, request leave info, and navigate onboarding protocols.'
  },
  {
    id: 'factorygpt',
    name: 'FactoryGPT',
    tagline: 'Vision AI Copilot',
    description: 'Vision AI for manufacturing and quality inspection.',
    outcome: '42% reduction in defect leakage and automated assembly checks.',
    category: 'manufacturing',
    icon: <FaIndustry />,
    color: '#7aa7c7',
    integrations: ['Live Camera Feeds', 'Industrial PLCs', 'ERP Log System'],
    hosting: ['On-Premises Edge Server', 'Private Cloud VPC'],
    details: 'Analyzes video streams on assembly lines in real-time, flags physical defects, monitors safety gear compliance, and triggers automated defect logs in the ERP.'
  },
  {
    id: 'inventory-copilot',
    name: 'Inventory Copilot',
    tagline: 'AI Inventory Copilot',
    description: 'Inventory synchronization and monitoring.',
    outcome: '25% decrease in over-stocking and real-time stock sync.',
    category: 'operations',
    icon: <FaDatabase />,
    color: '#b783ff',
    integrations: ['Shopify', 'Amazon Seller Central', 'Tally ERP', 'SAP'],
    hosting: ['Secure Cloud Gateway', 'Private AWS/Azure VPC'],
    details: 'Monitors and reconciles inventory databases across retail registers and e-commerce warehouses, triggering automatic re-order alerts to avoid stockouts.'
  },
  {
    id: 'corporate-brain',
    name: 'Corporate Brain',
    tagline: 'AI Knowledge Copilot',
    description: 'Private enterprise knowledge system.',
    outcome: 'Secure retention of company IP and instant SOP lookups.',
    category: 'knowledge',
    icon: <FaBrain />,
    color: '#8f38ff',
    integrations: ['Google Workspace', 'MS Office 365', 'Confluence', 'Internal Databases'],
    hosting: ['Private AWS/Azure VPC (Strict Security)'],
    details: 'Indexes and unifies historical documents, files, emails, and database records into a single secure interface with vector search capability.'
  },
  {
    id: 'operational-intelligence',
    name: 'Operational Intelligence',
    tagline: 'AI Analytics Copilot',
    description: 'Executive dashboards and decision insights.',
    outcome: '100% visibility over operational leakage and automated reports.',
    category: 'analytics',
    icon: <FaCogs />,
    color: '#7aa7c7',
    integrations: ['PostgreSQL', 'MongoDB', 'Supabase', 'BigQuery'],
    hosting: ['Secure AlgoForce Cloud', 'Private Cloud VPC'],
    details: 'Synthesizes scattered database metrics into real-time decision dashboards, highlighting process bottlenecks and calculating department ROI automatically.'
  },
  {
    id: 'unified-data-platform',
    name: 'Unified Data Platform',
    tagline: 'AI Data Copilot',
    description: 'Connect every database into one operational layer.',
    outcome: 'Single source of truth; zero manually matched tables.',
    category: 'operations',
    icon: <FaDatabase />,
    color: '#b783ff',
    integrations: ['PostgreSQL', 'MongoDB', 'MySQL', 'Oracle DB', 'CSV Exports'],
    hosting: ['Private AWS/Azure VPC', 'Secure AlgoForce Cloud'],
    details: 'Integrates databases into a clean operational storage warehouse, handling ETL processes and database schemas automatically to supply copilots with structured data.'
  }
]

const ProductModules = ({ activeCategory, setActiveCategory }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05
  })

  // Local active category fallback if parent state is not supplied
  const [localCategory, setLocalCategory] = useState('all')
  const currentCategory = activeCategory || localCategory
  const setCurrentCategory = setActiveCategory || setLocalCategory

  const [selectedProduct, setSelectedProduct] = useState(null)

  const filteredProducts = currentCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === currentCategory)

  return (
    <section id="products" className="py-16 md:py-24 bg-[#05050F] text-white relative border-b border-white/5">
      <div className="absolute inset-0 bg-purple-600/[0.01] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-[12px] font-bold uppercase tracking-[0.5em] text-purple-500 mb-4">AI Products</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">
            Specialized <span className="premium-serif italic font-normal text-purple-400">AI Copilots.</span>
          </h3>
          <p className="max-w-xl mx-auto text-gray-400 font-normal text-sm md:text-base mt-2">
            Subscribe to specialized AI products that integrate with existing business systems and automate operations.
          </p>
        </motion.div>

        {/* Categories Navigation Bar (Google-style) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-4xl mx-auto px-4 border-b border-white/5 pb-6">
          {CATEGORIES.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentCategory(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                currentCategory === tab.id
                  ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/10'
                  : 'bg-white/5 text-slate-300 border-white/5 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredProducts.map((p, idx) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="p-6 md:p-7 rounded-[24px] bg-white/[0.02] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.04] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center text-xl group-hover:bg-purple-600 group-hover:text-white transition-all shadow-2xl">
                      {p.icon}
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 bg-white/5 px-2.5 py-1 rounded-md">
                      {p.category}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{p.name}</h4>
                  <p className="text-purple-300/80 text-xs font-semibold uppercase tracking-wider mb-4">{p.tagline}</p>
                  <p className="text-slate-300 font-normal text-sm leading-relaxed mb-6">{p.description}</p>
                </div>

                <div className="border-t border-white/5 pt-5 mt-2">
                  <div className="mb-5">
                    <span className="block font-bold text-slate-500 uppercase tracking-wider text-[9px] mb-1">Primary Outcome</span>
                    <p className="text-slate-200 font-semibold text-xs leading-relaxed">{p.outcome}</p>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedProduct(p)}
                    className="text-[11px] font-bold uppercase tracking-widest text-purple-400 group-hover:text-white flex items-center gap-2 transition-colors focus:outline-none"
                  >
                    Learn More <FaArrowRight size={8} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Global CTA */}
        <div className="text-center mt-12">
          <Link to="/services">
            <button className="px-8 py-3.5 border border-purple-500/20 hover:border-purple-500/40 text-purple-400 hover:text-white bg-purple-500/5 hover:bg-purple-500/10 rounded-full font-bold text-xs uppercase tracking-widest transition-all">
              View Detailed Product Specs
            </button>
          </Link>
        </div>
      </div>

      {/* Premium Specifications Popup Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl overflow-hidden rounded-[30px] border border-white/10 bg-[#070710] p-6 sm:p-8 md:p-10 shadow-[0_30px_100px_rgba(143,56,255,0.15)] max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="absolute right-6 top-6 text-slate-400 hover:text-white focus:outline-none w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 active:scale-90 transition-transform"
              >
                <FaTimes size={12} />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center text-2xl border border-purple-500/20">
                  {selectedProduct.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold leading-tight">{selectedProduct.name}</h3>
                  <p className="text-purple-400 text-xs font-bold uppercase tracking-wider mt-0.5">{selectedProduct.tagline}</p>
                </div>
              </div>

              <div className="space-y-6 text-sm">
                <div>
                  <h4 className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">Overview</h4>
                  <p className="text-slate-300 font-normal leading-relaxed">{selectedProduct.details}</p>
                </div>

                <div>
                  <h4 className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">Primary Outcome</h4>
                  <p className="text-slate-100 font-semibold leading-relaxed">{selectedProduct.outcome}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <h4 className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-2">Native Connectors</h4>
                    <div className="flex flex-col gap-1.5">
                      {selectedProduct.integrations.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                          <FaCheck size={8} className="text-purple-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-2">Deployment & Hosting</h4>
                    <div className="flex flex-col gap-1.5">
                      {selectedProduct.hosting.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                          <FaCheck size={8} className="text-purple-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Ready in 2–4 Weeks setup
                </span>
                <Link to={`/contact?interest=${selectedProduct.id}`} className="w-full sm:w-auto">
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white text-black hover:bg-gray-100 px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Request Implementation <FaArrowRight size={8} />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ProductModules
