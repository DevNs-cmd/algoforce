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
    name: 'AlgoForce Finance AI',
    tagline: 'Powered by Tally integration.',
    description: 'Automate accounting work without replacing Tally.',
    outcome: 'Reduce reconciliation work and surface accounting exceptions before they become delays.',
    category: 'finance',
    featured: true,
    icon: <FaBrain />,
    color: '#8f38ff',
    integrations: ['Tally Prime ERP', 'Tally ERP 9', 'Local SQL Gateway'],
    hosting: ['Secure Cloud Hosting', 'On-Premises Server Sync'],
    details: 'Automates routine ledger updates, maps accounts payable and receivable, flags invoice anomalies, and answers financial questions in plain English.'
  },
  {
    id: 'leadbolt',
    name: 'LeadBolt',
    tagline: 'AI software for lead management.',
    description: 'Engages, qualifies, and follows up with sales leads automatically.',
    outcome: '24/7 instant replies and a 24% increase in sales meetings booked.',
    category: 'sales',
    featured: true,
    icon: <FaChartLine />,
    color: '#7aa7c7',
    integrations: ['WhatsApp Cloud API', 'Zoho CRM', 'Salesforce CRM', 'HubSpot'],
    hosting: ['Secure Cloud Hosting', 'Private Cloud Server'],
    details: 'Greets inbound web traffic and WhatsApp inquiries instantly, qualifies prospect criteria, logs lead details in CRM, and schedules calls with your sales team.'
  },
  {
    id: 'hotelgpt',
    name: 'HotelGPT',
    tagline: 'Guest communication software.',
    description: 'Manages guest inquiries, room bookings, and support messages 24/7.',
    outcome: '19% more direct bookings and zero missed guest calls.',
    category: 'hospitality',
    icon: <FaHotel />,
    color: '#b783ff',
    integrations: ['Property Management Systems', 'WhatsApp Cloud API', 'Stripe Payments'],
    hosting: ['Secure Cloud Hosting'],
    details: 'Integrates with room databases to handle check-in/out workflows, answer general guest questions, and coordinate room reservations via WhatsApp.'
  },
  {
    id: 'factorygpt',
    name: 'FactoryGPT',
    tagline: 'AI quality inspection software.',
    description: 'Scans live camera feeds to automate quality inspection and detect product defects.',
    outcome: '42% reduction in quality defects and automatic error logs.',
    category: 'manufacturing',
    featured: true,
    icon: <FaIndustry />,
    color: '#7aa7c7',
    integrations: ['Live Camera Feeds', 'Industrial PLCs', 'ERP Log System'],
    hosting: ['On-Premises Edge Server', 'Private Cloud Server'],
    details: 'Analyzes assembly line video feeds in real time, automatically flags missing parts or cracks, and triggers defect logs in your ERP database.'
  },
  {
    id: 'corporate-brain',
    name: 'Corporate Brain',
    tagline: 'Company knowledge software.',
    description: 'A secure search engine that unifies all company files, procedures, and manuals.',
    outcome: 'Access standard operating procedures instantly and protect institutional memory.',
    category: 'knowledge',
    icon: <FaBrain />,
    color: '#8f38ff',
    integrations: ['Google Workspace', 'Microsoft Office 365', 'Confluence', 'Internal Files'],
    hosting: ['Private Cloud Server (Secure)'],
    details: 'Indexes and unifies historical documents, standard operating procedures, email records, and company templates into a single secure search interface.'
  },
  {
    id: 'operational-intelligence',
    name: 'Operational Intelligence',
    tagline: 'Business analytics software.',
    description: 'Connects directly to your databases to calculate operational metrics and generate dashboards.',
    outcome: '100% visibility over operational costs and automated weekly reports.',
    category: 'analytics',
    icon: <FaCogs />,
    color: '#7aa7c7',
    integrations: ['PostgreSQL', 'MongoDB', 'Supabase', 'BigQuery'],
    hosting: ['Secure Cloud Hosting', 'Private Cloud Server'],
    details: 'Synthesizes scattered database tables into real-time decision dashboards, highlighting process bottlenecks and calculating department ROI automatically.'
  },
  {
    id: 'inventory-copilot',
    name: 'Inventory Copilot',
    tagline: 'Inventory management software.',
    description: 'Syncs stock levels automatically between stores, e-commerce channels, and warehouses.',
    outcome: '25% lower holding costs and zero stockout emergencies.',
    category: 'operations',
    icon: <FaDatabase />,
    color: '#b783ff',
    integrations: ['Shopify', 'Amazon Seller Central', 'Tally ERP', 'SAP'],
    hosting: ['Secure Cloud Hosting', 'Private Cloud Server'],
    details: 'Monitors inventory databases, reconciles sales registers, triggers automatic reorder alerts, and drafts purchase orders.'
  },
  {
    id: 'gst-autopilot',
    name: 'GST Autopilot',
    tagline: 'GST automation software.',
    description: 'Automates tax credit matching and compliance logs.',
    outcome: 'Stop tax credit leakage and save 40+ accounting hours monthly.',
    category: 'finance',
    icon: <FaCogs />,
    color: '#8f38ff',
    integrations: ['GST Portal API', 'Tally Prime ERP', 'SAP ERP'],
    hosting: ['Secure Cloud Hosting', 'Private Cloud Server'],
    details: 'Imports purchase registers and matches them against portal entries, highlighting mismatches and alerting vendors about missing tax filings.'
  },
  {
    id: 'hr-copilot',
    name: 'HR Copilot',
    tagline: 'Employee support software.',
    description: 'An interactive employee assistant that answers policy questions and coordinates onboarding.',
    outcome: '90% faster employee query resolution and automated onboarding checklists.',
    category: 'hr',
    icon: <FaUsers />,
    color: '#8f38ff',
    integrations: ['Slack', 'Microsoft Teams', 'Google Drive', 'Notion'],
    hosting: ['Private Cloud Server', 'Secure Cloud Hosting'],
    details: 'Acts as an internal support assistant, allowing team members to ask questions about leave policy, holiday calendars, and onboarding setup.'
  }
]

const ProductModules = ({ activeCategory, setActiveCategory, featuredOnly = false }) => {
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
    ? (featuredOnly ? PRODUCTS.filter(p => p.featured) : PRODUCTS)
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
          <h2 className="text-[12px] font-bold uppercase tracking-[0.5em] text-purple-500 mb-4">Flagship products</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">
            Start with software built for <span className="premium-serif italic font-normal text-purple-400">your operation.</span>
          </h3>
          <p className="max-w-xl mx-auto text-gray-400 font-normal text-sm md:text-base mt-2">
            Each product targets a high-value operational job, then connects to the systems your business already runs.
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
                  
                  <Link 
                    to={`/products/${p.id === 'tallygpt' ? 'finance-ai' : p.id}`}
                    className="text-[11px] font-bold uppercase tracking-widest text-purple-400 group-hover:text-white flex items-center gap-2 transition-colors focus:outline-none"
                  >
                    Product Details <FaArrowRight size={8} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Global CTA */}
        <div className="text-center mt-12">
          <Link to="/products">
            <button className="px-8 py-3.5 border border-purple-500/20 hover:border-purple-500/40 text-purple-400 hover:text-white bg-purple-500/5 hover:bg-purple-500/10 rounded-full font-bold text-xs uppercase tracking-widest transition-all">
              Explore all products
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
                    Book a Demo <FaArrowRight size={8} />
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
