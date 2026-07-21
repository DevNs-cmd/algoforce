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
    title: 'AlgoForce Finance AI',
    tagline: 'Powered by Tally integration.',
    problem: 'Matching bank statements, updating bills, and reconciling ledgers manually takes hours and leads to mistakes.',
    howItWorks: 'Connects directly to your Tally system to automate bank reconciliation and voucher entries in plain English.',
    integrations: 'Tally Prime, Tally ERP 9, Local database sync.',
    timeToDeploy: '3 weeks',
    outcome: 'Reconcile books 10x faster and identify accounting mistakes automatically.',
    category: 'finance',
    icon: FaBrain,
    color: '#8f38ff',
    details: 'Automates routine ledger updates, maps accounts payable and receivable, flags invoice anomalies, and answers financial questions in plain English.'
  },
  {
    id: 'leadbolt',
    title: 'LeadBolt',
    tagline: 'AI software for lead management.',
    problem: 'Potential customers leave when sales representatives take hours or days to reply to new inquiries.',
    howItWorks: 'An automated responder that answers web and WhatsApp inquiries instantly 24/7.',
    integrations: 'Zoho CRM, Salesforce, HubSpot, WhatsApp Cloud API.',
    timeToDeploy: '2 weeks',
    outcome: '24/7 instant replies and a 24% increase in sales meetings booked.',
    category: 'sales',
    icon: FaChartLine,
    color: '#7aa7c7',
    details: 'Greets inbound web traffic and WhatsApp inquiries instantly, qualifies prospect criteria, logs lead details in CRM, and schedules calls with your sales team.'
  },
  {
    id: 'hotelgpt',
    title: 'HotelGPT',
    tagline: 'Guest communication software.',
    problem: 'Front desks lose booking revenue when guests have to wait on hold or send emails to check room availability.',
    howItWorks: 'A virtual guest host that answers room inquiries, checks availability, and books reservations 24/7.',
    integrations: 'Property Management Systems, WhatsApp, Stripe.',
    timeToDeploy: '2 weeks',
    outcome: '19% more direct bookings and zero missed guest calls.',
    category: 'hospitality',
    icon: FaHotel,
    color: '#b783ff',
    details: 'Integrates with room databases to handle check-in/out workflows, answer general guest questions, and coordinate room reservations via WhatsApp.'
  },
  {
    id: 'factorygpt',
    title: 'FactoryGPT',
    tagline: 'AI quality inspection software.',
    problem: 'Manual visual inspection of parts is slow and occasionally lets defective products ship to clients.',
    howItWorks: 'Vision AI software that scans products on your assembly line and flags defects automatically.',
    integrations: 'Factory cameras, Industrial PLCs, ERP systems.',
    timeToDeploy: '4 weeks',
    outcome: '42% reduction in quality defects and automatic error logs.',
    category: 'manufacturing',
    icon: FaIndustry,
    color: '#7aa7c7',
    details: 'Analyzes assembly line video feeds in real time, automatically flags missing parts or cracks, and triggers defect logs in your ERP database.'
  },
  {
    id: 'corporate-brain',
    title: 'Corporate Brain',
    tagline: 'Company knowledge software.',
    problem: 'Employees waste hours searching through files, folders, and emails to find company procedures, templates, or past decisions.',
    howItWorks: 'A secure search engine that indexes your company folders and documents for instant lookup.',
    integrations: 'Google Workspace, Microsoft 365, Notion, Confluence.',
    timeToDeploy: '4 weeks',
    outcome: 'Access company procedures instantly and protect institutional memory.',
    category: 'knowledge',
    icon: FaBrain,
    color: '#8f38ff',
    details: 'Indexes and unifies historical documents, standard operating procedures, email records, and company templates into a single secure search interface.'
  },
  {
    id: 'operational-intelligence',
    title: 'Operational Intelligence',
    tagline: 'Business analytics software.',
    problem: 'Managers make critical decisions using outdated or manually compiled spreadsheets that take days to prepare.',
    howItWorks: 'Real-time dashboards that connect directly to your databases to show key operational metrics.',
    integrations: 'PostgreSQL, MongoDB, BigQuery, Excel.',
    timeToDeploy: '3 weeks',
    outcome: '100% visibility over operational costs and automated weekly reports.',
    category: 'analytics',
    icon: FaCogs,
    color: '#7aa7c7',
    details: 'Synthesizes scattered database tables into real-time decision dashboards, highlighting process bottlenecks and calculating department ROI automatically.'
  },
  {
    id: 'inventory-copilot',
    title: 'Inventory Copilot',
    tagline: 'Inventory management software.',
    problem: 'E-commerce stores and warehouses run out of stock or over-purchase because inventory counts are updated manually.',
    howItWorks: 'Software that links your online store and warehouse databases to synchronize stock counts in real time.',
    integrations: 'Shopify, Amazon, Tally, SAP.',
    timeToDeploy: '3 weeks',
    outcome: '25% lower holding costs and zero stockout emergencies.',
    category: 'operations',
    icon: FaDatabase,
    color: '#b783ff',
    details: 'Monitors inventory databases, reconciles sales registers, triggers automatic reorder alerts, and drafts purchase orders.'
  },
  {
    id: 'gst-autopilot',
    title: 'GST Autopilot',
    tagline: 'GST automation software.',
    problem: 'Comparing purchase bills with government portals manually is tedious and results in unclaimed tax credits.',
    howItWorks: 'Automates purchase register comparison against portal entries to match Input Tax Credit claims.',
    integrations: 'Government GST Portal, Tally, SAP ERP.',
    timeToDeploy: '2 weeks',
    outcome: 'Stop tax credit leakage and save 40+ accounting hours monthly.',
    category: 'finance',
    icon: FaCogs,
    color: '#8f38ff',
    details: 'Imports purchase registers and matches them against portal entries, highlighting mismatches and alerting vendors about missing tax filings.'
  },
  {
    id: 'hr-copilot',
    title: 'HR Copilot',
    tagline: 'Employee support software.',
    problem: 'HR managers spend a third of their day answering the same repetitive questions about leave policies, salaries, and insurance.',
    howItWorks: 'An interactive internal assistant that resolves employee policy questions and coordinates onboarding.',
    integrations: 'Slack, Microsoft Teams, HR databases.',
    timeToDeploy: '3 weeks',
    outcome: '90% faster employee query resolution and automated onboarding checklists.',
    category: 'hr',
    icon: FaUsers,
    color: '#8f38ff',
    details: 'Acts as an internal support assistant, allowing team members to ask questions about leave policy, holiday calendars, and onboarding setup.'
  }
]

const CONTACT_NUMBER = "918448947436"

const PRODUCT_PATHS = {
    'AlgoForce Finance AI': 'finance-ai',
    'LeadBolt': 'leadbolt',
    'HotelGPT': 'hotelgpt',
    'FactoryGPT': 'factorygpt',
    'Corporate Brain': 'corporate-brain',
    'Operational Intelligence': 'operational-intelligence',
    'Inventory Copilot': 'inventory-copilot',
    'GST Autopilot': 'gst-autopilot',
    'HR Copilot': 'hr-copilot'
}

const Products = () => {
    const [selectedTab, setSelectedTab] = useState("all")
    const [selectedProduct, setSelectedProduct] = useState(null)

    const stats = [
        ['9', 'AI Products'],
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
                                AI Products for <span className="premium-serif italic font-normal text-[#8f38ff]">Business Operations</span>
                            </h1>
                            <p className="max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg font-normal">
                                We deploy ready-to-use software products for finance, sales, HR, manufacturing, customer support and operations.
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
                                    <p className="mb-2 text-[10px] font-semibold uppercase text-white/70">Implementation & Support</p>
                                    <h2 className="text-2xl font-semibold md:text-3xl tracking-tight">AI products built to automate work.</h2>
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
                                        <Link
                                            to={`/products/${PRODUCT_PATHS[item.title]}`}
                                            className="text-xs font-bold text-purple-600 hover:text-purple-800 transition-colors focus:outline-none"
                                        >
                                            Product Details
                                        </Link>
                                        <Link
                                            to={`/contact?interest=${encodeURIComponent(item.title)}`}
                                            className="inline-flex items-center gap-2 rounded-xl bg-[#06101d] px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#102640] shrink-0"
                                        >
                                            Book a Demo <FaArrowRight size={8} />
                                        </Link>
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
                        See the right product in a demo.
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-slate-600 text-sm md:text-base font-normal">
                        See the relevant product, discuss the operational workflow and decide whether a deeper discovery is worthwhile.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            to="/contact"
                            className="rounded-xl bg-[#06101d] text-white hover:bg-[#102640] px-8 py-4 text-xs font-bold uppercase tracking-widest transition-transform inline-flex items-center justify-center gap-2 hover:scale-[1.02]"
                        >
                            Book a Demo
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
