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
    FaMapMarkerAlt
} from 'react-icons/fa'
import OptimizedVideo from '../components/common/OptimizedVideo'

const CATEGORIES = [
    { id: "all", label: "All Services" },
    { id: "ai-software", label: "AI & Custom Software" },
    { id: "automation", label: "Process Automation" },
    { id: "data-erp", label: "Data & ERP Integration" }
]

const SERVICES_DATA = [
    {
        title: "Enterprise AI Solutions",
        category: "ai-software",
        icon: FaBrain,
        color: "#8f38ff",
        problem: "Inability to scale processes or extract actionable value from massive amounts of unstructured corporate data.",
        solution: "Custom Generative AI strategy, fine-tuned private models, and secure cloud database architectures.",
        roi: "5x faster document search cycles and zero proprietary data leakage.",
        industries: "Manufacturing, Healthcare, Finance, Logistics",
        time: "6 - 8 Weeks"
    },
    {
        title: "Business Automation",
        category: "automation",
        icon: FaCogs,
        color: "#7aa7c7",
        problem: "Valuable employee hours lost to repetitive document matching, data entry, and manual background operations.",
        solution: "End-to-end automated pipelines executing complex business data flows silently in the background.",
        roi: "Up to 80% reduction in manual data processing times.",
        industries: "Retail, Hotels, E-Commerce, SMEs",
        time: "4 - 6 Weeks"
    },
    {
        title: "AI Agents",
        category: "ai-software",
        icon: FaBrain,
        color: "#b783ff",
        problem: "Dropped leads, booking delays, and support bottlenecks during off-business hours.",
        solution: "Autonomous, 24/7 conversational agents that can execute API calls and update calendars automatically.",
        roi: "92% decrease in first-response times and lower support overhead.",
        industries: "Hotels, E-Commerce, Education, Healthcare",
        time: "3 - 5 Weeks"
    },
    {
        title: "Custom Software",
        category: "ai-software",
        icon: FaCode,
        color: "#38b6ff",
        problem: "Rigid legacy software carrying expensive per-seat subscription models and creating operational blockages.",
        solution: "Tailored full-stack business software platforms engineered around your exact rules.",
        roi: "Complete elimination of per-seat SaaS licensing costs.",
        industries: "All Industries, Corporate Offices",
        time: "6 - 12 Weeks"
    },
    {
        title: "CRM Automation",
        category: "automation",
        icon: FaCogs,
        color: "#5ce1e6",
        problem: "Sales pipelines lagging because representatives spend too much time manually updating Zoho or Salesforce.",
        solution: "Automated pipelines that enrich leads, log chats instantly, and trigger follow-up tasks.",
        roi: "40% increase in CRM record accuracy; faster response rates.",
        industries: "Real Estate, Retail, B2B Consulting, SMEs",
        time: "2 - 4 Weeks"
    },
    {
        title: "ERP Integration",
        category: "data-erp",
        icon: FaExchangeAlt,
        color: "#ff914d",
        problem: "Sales channels and inventory logs isolated from core financial ERP systems.",
        solution: "Custom middleware connectors bridging web channels directly with SAP, Oracle, or Tally Prime.",
        roi: "Real-time stock matching and 95% faster financial audits.",
        industries: "Manufacturing, Retail, E-Commerce",
        time: "4 - 8 Weeks"
    },
    {
        title: "WhatsApp Automation",
        category: "automation",
        icon: FaWhatsapp,
        color: "#25d366",
        problem: "Losing high-intent customer inquiries on WhatsApp due to late manual replies from agents.",
        solution: "Official WhatsApp Cloud API setups integrated with automated calendar booking systems.",
        roi: "19% increase in booking conversions; instant lead capture.",
        industries: "Hotels, Healthcare, Local Services, SMEs",
        time: "2 - 3 Weeks"
    },
    {
        title: "Workflow Automation",
        category: "automation",
        icon: FaCogs,
        color: "#ff5757",
        problem: "Fragmented tools failing to sync datasets, forcing team members into manual workarounds.",
        solution: "n8n and Make pipelines coordinating datasets between email, sheets, and databases.",
        roi: "30+ administrative hours saved weekly per department.",
        industries: "B2B, Startups, Digital Agencies",
        time: "2 - 4 Weeks"
    },
    {
        title: "Internal AI Assistants",
        category: "ai-software",
        icon: FaBrain,
        color: "#ffde59",
        problem: "Employees wasting time searching through local files, policies, and sheets for standard questions.",
        solution: "Private, RAG-powered vector chatbots search-indexing all corporate documents securely.",
        roi: "75% faster internal query answers for support and sales teams.",
        industries: "Corporates, Education, Finance, Healthcare",
        time: "3 - 5 Weeks"
    },
    {
        title: "Knowledge Management",
        category: "data-erp",
        icon: FaFolderOpen,
        color: "#8c52ff",
        problem: "Corporate knowledge and past project logs lost when senior employees exit.",
        solution: "A unified knowledge catalog indexing historical files, sheets, and SOPs into an interactive memory.",
        roi: "Direct retention of company IP and accelerated team onboarding.",
        industries: "Consulting, IT Services, Legal, Education",
        time: "4 - 6 Weeks"
    },
    {
        title: "Reporting Dashboards",
        category: "data-erp",
        icon: FaRegChartBar,
        color: "#00c2cb",
        problem: "Management flying blind due to lagged metrics and manually compiled spreadsheets.",
        solution: "Real-time decision intelligence dashboards showing process bottlenecks, ROI, and core metrics.",
        roi: "100% visibility over operational leakage; instant strategy reviews.",
        industries: "All Industries",
        time: "3 - 5 Weeks"
    },
    {
        title: "Data Integration",
        category: "data-erp",
        icon: FaExchangeAlt,
        color: "#cb6ce6",
        problem: "Conflicting data reporting due to isolated databases (PostgreSQL, MongoDB, CSV files).",
        solution: "ETL pipelines consolidating scattered databases into a clean operational data warehouse.",
        roi: "Single source of truth; zero manually matched tables.",
        industries: "Manufacturing, Finance, E-Commerce",
        time: "4 - 6 Weeks"
    },
    {
        title: "Digital Transformation",
        category: "ai-software",
        icon: FaCode,
        color: "#ff66c4",
        problem: "Traditional companies losing speed and scaling ability due to paper and Excel chains.",
        solution: "Comprehensive modernization replacing manual logs with scalable cloud systems.",
        roi: "100% compliance and ready to scale operations instantly.",
        industries: "Manufacturing, Hospitality, Healthcare, Retail",
        time: "8 - 16 Weeks"
    }
]

const CONTACT_NUMBER = "918448947436"

const Services = () => {
    const [selectedTab, setSelectedTab] = useState("all")
    const [contactService, setContactService] = useState(null)

    const stats = [
        ['13', 'Core Services'],
        ['100%', 'Execution Standard'],
        ['UDYAM', 'MSME Registered'],
    ]

    const openWhatsApp = (serviceTitle) => {
        const msg = encodeURIComponent(`Hi, I'm interested in the ${serviceTitle} service at AlgoForce. Please share more details.`)
        window.open(`https://wa.me/${CONTACT_NUMBER}?text=${msg}`, '_blank')
    }

    const callOwner = () => {
        window.location.href = `tel:${CONTACT_NUMBER}`
    }

    const filteredServices = selectedTab === "all" 
        ? SERVICES_DATA 
        : SERVICES_DATA.filter(s => s.category === selectedTab)

    return (
        <main className="min-h-screen bg-[#f7f9fc] text-[#06101d]">
            <SeoHead path="/services" />

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
                                <span className="text-[10px] font-semibold uppercase text-slate-500">Enterprise AI Company India</span>
                            </div>
                            <h1 className="mb-6 max-w-4xl text-[2.45rem] font-semibold leading-[1.03] sm:text-5xl md:text-6xl lg:text-[4.1rem] tracking-tight">
                                Enterprise AI Solutions & <span className="premium-serif italic font-normal text-[#8f38ff]">Business Automation</span>
                            </h1>
                            <p className="max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg font-normal">
                                We help startups, SMEs, and corporate enterprises automate legacy workflows, deploy intelligent agents, and build custom database software that drives ROI.
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
                                    <p className="mb-2 text-[10px] font-semibold uppercase text-white/70">Consulting & Integration</p>
                                    <h2 className="text-2xl font-semibold md:text-3xl tracking-tight">Custom software built for measurable ROI.</h2>
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

            {/* Services Filter and Grid Section */}
            <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20">
                {/* Tabs Filter */}
                <div className="flex flex-wrap items-center justify-between gap-6 mb-12 border-b border-[#06101d]/10 pb-6">
                    <div className="text-left">
                        <p className="mb-2 text-[11px] font-semibold uppercase text-[#8f38ff] tracking-widest">Capabilities</p>
                        <h2 className="text-3xl font-semibold md:text-4xl tracking-tight">Our Services Catalog</h2>
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
                    {filteredServices.map((item, index) => {
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
                                            {item.time} Built
                                        </span>
                                    </div>

                                    <h3 className="mb-4 text-xl font-bold leading-tight text-[#06101d] tracking-tight">
                                        {item.title}
                                    </h3>

                                    {/* Problem, Solution, ROI layout */}
                                    <div className="space-y-4 mb-6 text-sm">
                                        <div>
                                            <span className="block font-bold text-slate-400 uppercase tracking-widest text-[9px] mb-0.5">Problem</span>
                                            <p className="text-slate-600 font-normal leading-relaxed">{item.problem}</p>
                                        </div>
                                        <div>
                                            <span className="block font-bold text-slate-400 uppercase tracking-widest text-[9px] mb-0.5">Solution</span>
                                            <p className="text-slate-900 font-semibold leading-relaxed">{item.solution}</p>
                                        </div>
                                        <div>
                                            <span className="block font-bold text-[#8f38ff] uppercase tracking-widest text-[9px] mb-0.5">Expected ROI</span>
                                            <p className="text-[#8f38ff] font-bold leading-relaxed">{item.roi}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-[#06101d]/10 pt-5 mt-4">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Target Industries</p>
                                            <p className="text-xs font-bold text-slate-600 mt-0.5 max-w-[160px] truncate" title={item.industries}>
                                                {item.industries}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setContactService(item)}
                                            className="inline-flex items-center gap-2 rounded-xl bg-[#06101d] px-5 py-3 text-xs font-bold text-white transition-all hover:bg-[#102640] shrink-0"
                                        >
                                            Enquire <FaArrowRight size={10} />
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
                        Start with a free AI Readiness Audit
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-slate-600 text-sm md:text-base font-normal">
                        Identify process bottlenecks, evaluate database model feasibility, and structure a custom, ROI-driven integration roadmap with our engineers.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            to="/contact?interest=audit"
                            className="rounded-xl bg-[#06101d] text-white hover:bg-[#102640] px-8 py-4 text-xs font-bold uppercase tracking-widest transition-transform inline-flex items-center justify-center gap-2 hover:scale-[1.02]"
                        >
                            Book Audit
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

            {/* Contact Popup Modal */}
            <AnimatePresence>
                {contactService && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setContactService(null)}
                            className="absolute inset-0 bg-[#06101d]/55 backdrop-blur-lg"
                        />
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0, y: 24 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 24 }}
                            className="relative w-full max-w-[430px] overflow-hidden rounded-[30px] border border-[#06101d]/10 bg-white p-7 shadow-[0_30px_100px_rgba(6,47,79,0.24)] md:p-8"
                        >
                            <button onClick={() => setContactService(null)} className="absolute right-6 top-6 text-slate-400 hover:text-[#06101d] focus:outline-none">
                                <FaTimes />
                            </button>
                            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc] text-[#8f38ff]">
                                <FaBrain size={24} />
                            </div>
                            <h2 className="mb-3 text-2xl font-bold tracking-tight">Request Service</h2>
                            <p className="mb-8 leading-relaxed text-slate-600 text-sm">
                                Confirm your interest in <span className="font-bold text-[#06101d]">{contactService.title}</span>. The AlgoForce team will connect within 24 hours.
                            </p>
                            <div className="space-y-3">
                                <button
                                    onClick={() => openWhatsApp(contactService.title)}
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

export default Services
