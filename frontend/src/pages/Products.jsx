import SeoHead from "../components/common/SeoHead"
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import {
    FaArrowRight,
    FaBrain,
    FaCogs,
    FaWhatsapp,
    FaCode,
    FaFolderOpen,
    FaRegChartBar,
    FaExchangeAlt,
    FaCheck,
    FaPhoneAlt,
    FaTimes,
    FaMapMarkerAlt,
    FaChartLine,
    FaHotel,
    FaDatabase,
    FaUsers,
    FaIndustry
} from 'react-icons/fa'
import OptimizedVideo from '../components/common/OptimizedVideo'

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'finance', label: 'Finance' },
  { id: 'sales', label: 'Sales' },
  { id: 'hr', label: 'HR' },
  { id: 'operations', label: 'Operations' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'knowledge', label: 'Knowledge' },
  { id: 'analytics', label: 'Analytics' }
]

const PRODUCTS = [
  {
    id: 'tallygpt',
    title: 'TallyGPT',
    tagline: 'AI Finance Copilot',
    problem: 'Manual ledger reconciliation and delayed bookkeeping errors.',
    howItWorks: 'Direct read-only ERP database queries via natural language interface.',
    integrations: 'Tally Prime, Tally ERP 9, local database sync.',
    timeToDeploy: '3–4 weeks',
    outcome: 'Reconcile books 10x faster and secure real-time financial intelligence.',
    category: 'finance',
    icon: FaBrain,
    color: '#8f38ff',
    details: 'Automates routine ledger updates, maps accounts payable/receivable, flags anomalies, and allows managers to ask natural language questions about financial records.'
  },
  {
    id: 'leadbolt',
    title: 'LeadBolt',
    tagline: 'AI Sales Copilot',
    problem: 'Dropped B2B leads due to late manual follow-ups.',
    howItWorks: 'Autonomous WhatsApp & web conversation agents qualifying leads.',
    integrations: 'Zoho CRM, Salesforce, HubSpot, WhatsApp Cloud API.',
    timeToDeploy: '2–3 weeks',
    outcome: '24/7 lead qualification and 24% increase in sales conversions.',
    category: 'sales',
    icon: FaChartLine,
    color: '#7aa7c7',
    details: 'Engages inbound traffic and WhatsApp chats instantly, qualifies prospect criteria, registers leads in CRM, and schedules live validation calls with sales engineers.'
  },
  {
    id: 'hotelgpt',
    title: 'HotelGPT',
    tagline: 'AI Hospitality Copilot',
    problem: 'Losing direct guest reservations during peak hours or overnight.',
    howItWorks: 'Conversational booking AI linked to Property Management Systems.',
    integrations: 'WhatsApp API, HMS databases, Stripe.',
    timeToDeploy: '2 weeks',
    outcome: '19% increase in booking conversions; zero missed reservations.',
    category: 'hospitality',
    icon: FaHotel,
    color: '#b783ff',
    details: 'Manages room queries, books guests directly, triggers check-in/out workflows, and answers general guest questions without front desk intervention.'
  },
  {
    id: 'gst-autopilot',
    title: 'GST Autopilot',
    tagline: 'AI Compliance Copilot',
    problem: 'Manual invoice matching errors causing Input Tax Credit leaks.',
    howItWorks: 'Automated GSTR reconciliation script checking invoices.',
    integrations: 'GST Portal API, Tally, SAP.',
    timeToDeploy: '2 weeks',
    outcome: 'Zero Input Tax Credit leakage and 40+ hours saved monthly.',
    category: 'finance',
    icon: FaCogs,
    color: '#8f38ff',
    details: 'Automates Input Tax Credit (ITC) matching, highlights tax anomalies, maps incoming purchase registries, and streamlines the preparation of compliance data.'
  },
  {
    id: 'hr-copilot',
    title: 'HR Copilot',
    tagline: 'AI HR Copilot',
    problem: 'Internal support teams losing hours to employee onboarding FAQ.',
    howItWorks: 'Retrieval-augmented search over secure internal HR directories.',
    integrations: 'Slack, MS Teams, Notion, Google Workspace.',
    timeToDeploy: '3 weeks',
    outcome: '90% reduction in employee internal query response times.',
    category: 'hr',
    icon: FaUsers,
    color: '#8f38ff',
    details: 'Acts as an internal knowledge directory, allowing employees to query internal policies, request leave info, and navigate onboarding protocols.'
  },
  {
    id: 'factorygpt',
    title: 'FactoryGPT',
    tagline: 'Vision AI Copilot',
    problem: 'Manual assembly checks causing quality assurance defects.',
    howItWorks: 'Vision AI model scanning live assembly camera streams.',
    integrations: 'Industrial PLC systems, video feeds, ERP logs.',
    timeToDeploy: '4–6 weeks',
    outcome: '42% reduction in quality defects and automated error logs.',
    category: 'manufacturing',
    icon: FaIndustry,
    color: '#7aa7c7',
    details: 'Analyzes video streams on assembly lines in real-time, flags physical defects, monitors safety gear compliance, and triggers automated defect logs in the ERP.'
  },
  {
    id: 'inventory-copilot',
    title: 'Inventory Copilot',
    tagline: 'AI Inventory Copilot',
    problem: 'Stockouts and inventory desync between offline ERP and online sales.',
    howItWorks: 'Automated webhook inventory sync matching warehouses.',
    integrations: 'Shopify, Amazon Central, Tally ERP, SAP.',
    timeToDeploy: '3 weeks',
    outcome: '25% decrease in over-stocking and automated reorder alerts.',
    category: 'operations',
    icon: FaDatabase,
    color: '#b783ff',
    details: 'Monitors and reconciles inventory databases across retail registers and e-commerce warehouses, triggering automatic re-order alerts to avoid stockouts.'
  },
  {
    id: 'corporate-brain',
    title: 'Corporate Brain',
    tagline: 'AI Knowledge Copilot',
    problem: 'Proprietary project memory lost when developers or managers exit.',
    howItWorks: 'Semantic index search across internal documents and sheets.',
    integrations: 'Google Drive, MS Office 365, internal databases.',
    timeToDeploy: '4 weeks',
    outcome: 'Secure retention of company IP and instant SOP lookups.',
    category: 'knowledge',
    icon: FaBrain,
    color: '#8f38ff',
    details: 'Indexes and unifies historical documents, files, emails, and database records into a single secure interface with vector search capability.'
  },
  {
    id: 'operational-intelligence',
    title: 'Operational Intelligence',
    tagline: 'AI Analytics Copilot',
    problem: 'Management flying blind due to manual spreadsheet calculations.',
    howItWorks: 'Real-time process bottleneck data ingestion dashboard.',
    integrations: 'PostgreSQL, MongoDB, Supabase, BigQuery.',
    timeToDeploy: '3 weeks',
    outcome: '100% visibility over operational leakage and automated reports.',
    category: 'analytics',
    icon: FaCogs,
    color: '#7aa7c7',
    details: 'Synthesizes scattered database metrics into real-time decision dashboards, highlighting process bottlenecks and calculating department ROI automatically.'
  },
  {
    id: 'unified-data-platform',
    title: 'Unified Data Platform',
    tagline: 'AI Data Copilot',
    problem: 'Conflicting numbers due to isolated database schemas.',
    howItWorks: 'Automated ETL processing pipeline warehousing databases.',
    integrations: 'PostgreSQL, MongoDB, MySQL, Oracle DB.',
    timeToDeploy: '4 weeks',
    outcome: 'Single source of truth; zero manually matched tables.',
    category: 'operations',
    icon: FaDatabase,
    color: '#b783ff',
    details: 'Integrates databases into a clean operational storage warehouse, handling ETL processes and database schemas automatically to supply copilots with structured data.'
  }
]

const CONTACT_NUMBER = "918448947436"

const Products = () => {
    const [selectedTab, setSelectedTab] = useState("all")
    const [selectedProduct, setSelectedProduct] = useState(null)

    const stats = [
        ['10', 'AI Products'],
        ['100%', 'Execution Standard'],
        ['UDYAM', 'MSME Registered'],
    ]

    const openWhatsApp = (title) => {
        const msg = encodeURIComponent(`Hi, I'm interested in the ${title} at AlgoForce. Please share details.`)
        window.open(`https://wa.me/${CONTACT_NUMBER}?text=${msg}`, '_blank')
    }

    const callOwner = () => {
        window.location.href = `tel:${CONTACT_NUMBER}`
    }

    const filteredProducts = selectedTab === "all" 
        ? PRODUCTS 
        : PRODUCTS.filter(p => p.category === selectedTab)

    return (
        <main className="min-h-screen bg-[#f7f9fc] text-[#06101d]">
            <SeoHead path="/products" />

            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-[#06101d]/8 bg-white pt-32 pb-14 md:pt-36 md:pb-20">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-12rem] right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#8f38ff]/10 blur-[90px]" />
                    <div className="absolute bottom-[-12rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-[#062f4f]/10 blur-[100px]" />
                </div>

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
                    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75 }}
                        >
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#06101d]/10 bg-[#f7f9fc] px-4 py-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#8f38ff]" />
                                <span className="text-[10px] font-semibold uppercase text-slate-500">AI Software Company</span>
                            </div>
                            <h1 className="mb-6 max-w-4xl text-[2.45rem] font-semibold leading-[1.03] sm:text-5xl md:text-6xl lg:text-[4.1rem] tracking-tight">
                                AI Products & <span className="premium-serif italic font-normal text-[#8f38ff]">Business Copilots</span>
                            </h1>
                            <p className="max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg font-normal">
                                We configure and deploy specialized AI products for finance, sales, HR, manufacturing, hospitality and operations.
                            </p>
                            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
                                {stats.map(([value, label]) => (
                                    <div key={label} className="rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc] p-4 text-center">
                                        <div className="text-xl md:text-2xl font-bold text-[#06101d]">{value}</div>
                                        <div className="mt-1 text-[9px] md:text-[10px] font-bold uppercase text-slate-400 tracking-wider">{label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08, duration: 0.75 }}
                            className="overflow-hidden rounded-[30px] border border-[#06101d]/10 bg-white p-4 shadow-[0_24px_70px_rgba(6,47,79,0.08)]"
                        >
                            <div className="relative aspect-[16/10] min-h-[260px] overflow-hidden rounded-[24px] border border-[#06101d]/10 bg-[#eef2f7]">
                                <OptimizedVideo
                                    src="/video2.mp4"
                                    inView
                                    preload="metadata"
                                    mobilePreload="none"
                                    className="absolute inset-0 h-full w-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,16,29,0.04),rgba(6,16,29,0.68))]" />
                                <div className="absolute left-5 right-5 bottom-5 text-white">
                                    <p className="mb-2 text-[10px] font-semibold uppercase text-white/70">Implementation & Subscription</p>
                                    <h2 className="text-2xl font-semibold md:text-3xl tracking-tight">AI products built for operational parameters.</h2>
                                </div>
                            </div>
                            <div className="mt-5 flex items-start gap-3 text-sm font-semibold text-slate-500 justify-center">
                                <FaMapMarkerAlt className="mt-0.5 text-[#8f38ff]" />
                                <span>Office: South East Delhi, Kalkaji, New Delhi 110019</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Products Filter and Grid Section */}
            <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20">
                {/* Tabs Filter */}
                <div className="flex flex-wrap items-center justify-between gap-6 mb-12 border-b border-[#06101d]/10 pb-6">
                    <div className="text-left">
                        <p className="mb-2 text-[11px] font-semibold uppercase text-[#8f38ff] tracking-widest">Product Catalog</p>
                        <h2 className="text-3xl font-semibold md:text-4xl tracking-tight">Adopt the Right AI Product</h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all border ${
                                    selectedTab === tab.id
                                        ? "bg-[#06101d] text-white border-[#06101d]"
                                        : "bg-white text-slate-600 border-[#06101d]/10 hover:bg-slate-50"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.article
                                key={item.title}
                                layout
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group flex h-full flex-col rounded-[22px] border border-[#06101d]/10 bg-white p-5 shadow-[0_20px_55px_rgba(6,47,79,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(6,47,79,0.1)] md:p-6 justify-between"
                            >
                                <div>
                                    <div className="mb-5 flex items-start justify-between gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc]" style={{ color: item.color }}>
                                            {Icon && <Icon className="text-xl" />}
                                        </div>
                                        <span className="rounded-full border border-[#06101d]/10 bg-[#f7f9fc] px-3 py-1 text-[9px] font-bold uppercase text-slate-400 tracking-wider">
                                            {item.category}
                                        </span>
                                    </div>

                                    <h3 className="mb-2 text-xl font-bold leading-tight text-[#06101d] tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-purple-600 text-xs font-bold uppercase tracking-wider mb-4">{item.tagline}</p>
                                    
                                    {/* Problem, How it works, Integrations, Timeline */}
                                    <div className="space-y-3 mb-6 text-xs text-slate-600 font-normal">
                                        <div>
                                            <span className="block font-bold text-slate-400 uppercase tracking-widest text-[8px] mb-0.5">Problem</span>
                                            <p className="leading-relaxed">{item.problem}</p>
                                        </div>
                                        <div>
                                            <span className="block font-bold text-slate-400 uppercase tracking-widest text-[8px] mb-0.5">How it works</span>
                                            <p className="leading-relaxed font-semibold text-slate-800">{item.howItWorks}</p>
                                        </div>
                                        <div>
                                            <span className="block font-bold text-slate-400 uppercase tracking-widest text-[8px] mb-0.5">Integrates with</span>
                                            <p className="leading-relaxed font-semibold text-purple-600">{item.integrations}</p>
                                        </div>
                                        <div>
                                            <span className="block font-bold text-slate-400 uppercase tracking-widest text-[8px] mb-0.5">Time to deploy</span>
                                            <p className="leading-relaxed font-bold">{item.timeToDeploy}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-[#06101d]/10 pt-5 mt-4">
                                    <div className="mb-5">
                                        <p className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Business Outcome</p>
                                        <p className="text-xs font-bold text-slate-900 mt-1">{item.outcome}</p>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                                        <button
                                            onClick={() => setSelectedProduct(item)}
                                            className="text-xs font-bold text-purple-600 hover:text-purple-800 transition-colors focus:outline-none"
                                        >
                                            View Specs
                                        </button>
                                        <button
                                            onClick={() => openWhatsApp(item.title)}
                                            className="inline-flex items-center gap-2 rounded-xl bg-[#06101d] px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#102640] shrink-0"
                                        >
                                            Deploy Product <FaArrowRight size={8} />
                                        </button>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </section>

            {/* Bottom Audit Box */}
            <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 md:pb-24">
                <div className="mx-auto max-w-4xl rounded-[30px] border border-[#06101d]/10 bg-white p-8 text-center md:p-12 shadow-[0_24px_70px_rgba(6,47,79,0.08)]">
                    <h2 className="mb-5 text-3xl font-bold tracking-tight md:text-4xl text-[#06101d]">
                        Request a Business Assessment
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-slate-600 text-sm md:text-base font-normal">
                        Select the right AI products and schedule an implementation.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            to="/contact"
                            className="rounded-xl bg-[#06101d] text-white hover:bg-[#102640] px-8 py-4 text-xs font-bold uppercase tracking-widest transition-transform inline-flex items-center justify-center gap-2 hover:scale-[1.02]"
                        >
                            Book Assessment
                        </Link>
                        <Link
                            to="/pricing"
                            className="rounded-xl border border-[#06101d]/10 bg-[#f7f9fc] hover:bg-slate-100 text-[#06101d] px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors inline-flex items-center justify-center gap-2"
                        >
                            View Pricing
                        </Link>
                    </div>
                </div>
            </section>

            {/* Specs Popup Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProduct(null)}
                            className="absolute inset-0 bg-[#06101d]/55 backdrop-blur-lg"
                        />
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0, y: 24 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 24 }}
                            className="relative w-full max-w-[480px] overflow-hidden rounded-[30px] border border-[#06101d]/10 bg-white p-7 shadow-[0_30px_100px_rgba(6,47,79,0.24)] md:p-8"
                        >
                            <button onClick={() => setSelectedProduct(null)} className="absolute right-6 top-6 text-slate-400 hover:text-[#06101d] focus:outline-none w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                                <FaTimes size={12} />
                            </button>
                            
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc] text-2xl flex items-center justify-center" style={{ color: selectedProduct.color }}>
                                    <selectedProduct.icon />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold tracking-tight text-[#06101d]">{selectedProduct.title}</h2>
                                    <p className="text-purple-600 text-xs font-bold uppercase tracking-wider mt-0.5">{selectedProduct.tagline}</p>
                                </div>
                            </div>

                            <div className="space-y-4 text-xs">
                                <div>
                                    <span className="block font-bold text-slate-400 uppercase tracking-widest text-[9px] mb-1">Details</span>
                                    <p className="text-slate-600 font-normal leading-relaxed">{selectedProduct.details}</p>
                                </div>

                                <div>
                                    <span className="block font-bold text-slate-400 uppercase tracking-widest text-[9px] mb-1">Primary Outcome</span>
                                    <p className="text-slate-900 font-semibold leading-relaxed">{selectedProduct.outcome}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                                    <div>
                                        <span className="block font-bold text-slate-400 uppercase tracking-widest text-[9px] mb-1.5">Integrates with</span>
                                        <p className="text-slate-600">{selectedProduct.integrations}</p>
                                    </div>
                                    <div>
                                        <span className="block font-bold text-slate-400 uppercase tracking-widest text-[9px] mb-1.5">Time to deploy</span>
                                        <p className="text-slate-600">{selectedProduct.timeToDeploy}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 mt-8 pt-6 border-t border-slate-100">
                                <button
                                    onClick={() => openWhatsApp(selectedProduct.title)}
                                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#06101d] py-4 text-sm font-bold text-white hover:bg-slate-900 transition-colors focus:outline-none"
                                >
                                    <FaWhatsapp /> WhatsApp Support
                                </button>
                                <button
                                    onClick={callOwner}
                                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#06101d]/10 bg-[#f7f9fc] py-4 text-sm font-bold text-[#06101d] hover:bg-slate-100 transition-colors focus:outline-none"
                                >
                                    <FaPhoneAlt /> Call Direct
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    )
}

export default Products
