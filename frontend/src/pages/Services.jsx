import SeoHead from "../components/common/SeoHead"
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import {
    FaArrowRight,
    FaBrain,
    FaBriefcase,
    FaChartLine,
    FaCheck,
    FaPhoneAlt,
    FaTimes,
    FaWhatsapp,
    FaMapMarkerAlt
} from 'react-icons/fa'
import OptimizedVideo from '../components/common/OptimizedVideo'

const SERVICES_DATA = [
    {
        title: "AI Consulting Retainers",
        category: "Retainer",
        description: "Ongoing advisory, architecture, and technology leadership to build and sustain your organization's AI capabilities.",
        color: "#8f38ff",
        icon: FaBriefcase,
        features: [
            "Ongoing Technical Strategy",
            "Architecture & Engineering Leadership",
            "Custom Pilot Implementation",
            "Scale Advisory"
        ]
    },
    {
        title: "Workflow Automation Systems",
        category: "Automation",
        description: "Custom automations (n8n, Make) to orchestrate complex processes, eliminate operational leaks, and multiply team leverage.",
        color: "#7aa7c7",
        icon: FaBrain,
        features: [
            "Intelligent Workflow Orchestration",
            "Process Leak Elimination",
            "Custom n8n & Make Orchestrations",
            "Leverage Systems Integration"
        ]
    },
    {
        title: "AI Readiness Audit",
        category: "Analysis",
        description: "A comprehensive assessment of your business's processes, data readiness, and high-ROI opportunities.",
        color: "#b783ff",
        icon: FaChartLine,
        features: [
            "Process Mapping & Discovery",
            "Model Feasibility Assessment",
            "High-ROI Execution Roadmap",
            "Executive Audit Report"
        ]
    }
]

const CONTACT_NUMBER = "918448947436"

const Services = () => {
    const [contactService, setContactService] = useState(null)

    const stats = [
        ['3', 'Core Services'],
        ['100%', 'Execution Standard'],
        ['Active', 'Operational Audits'],
    ]

    const openWhatsApp = (serviceTitle) => {
        const msg = encodeURIComponent(`Hi, I'm interested in the ${serviceTitle} service at AlgoForce. Please share more details.`)
        window.open(`https://wa.me/${CONTACT_NUMBER}?text=${msg}`, '_blank')
    }

    const callOwner = () => {
        window.location.href = `tel:${CONTACT_NUMBER}`
    }

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
                                <span className="text-[10px] font-semibold uppercase text-slate-500">Enterprise Infrastructure</span>
                            </div>
                            <h1 className="mb-6 max-w-4xl text-[2.45rem] font-semibold leading-[1.03] sm:text-5xl md:text-6xl lg:text-[4.1rem]">
                                Enterprise AI Consulting for <span className="premium-serif italic font-normal text-[#8f38ff]">Indian Businesses</span>.
                            </h1>
                            <p className="max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                                AlgoForce AI delivers enterprise AI systems, automation infrastructure, and digital transformation for serious builders and scale-ups across India.
                            </p>
                            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
                                {stats.map(([value, label]) => (
                                    <div key={label} className="rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc] p-4">
                                        <div className="text-2xl font-bold text-[#06101d]">{value}</div>
                                        <div className="mt-1 text-[10px] font-semibold uppercase text-slate-400">{label}</div>
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
                                    <p className="mb-2 text-[10px] font-semibold uppercase text-white/70">Consulting & Systems</p>
                                    <h2 className="text-2xl font-semibold md:text-3xl">Intelligent systems that automate growth.</h2>
                                </div>
                            </div>
                            <div className="mt-5 flex items-start gap-3 text-sm font-semibold text-slate-500">
                                <FaMapMarkerAlt className="mt-0.5 text-[#8f38ff]" />
                                <span>Office: South Delhi, Kalkaji, New Delhi 110019</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Grid Section */}
            <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20">
                <div className="mb-10 text-center md:text-left">
                    <p className="mb-3 text-[11px] font-semibold uppercase text-[#8f38ff]">Capabilities</p>
                    <h2 className="text-3xl font-semibold md:text-4xl">Our Service Suites</h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {SERVICES_DATA.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.article
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ delay: index * 0.08 }}
                                className="group flex h-full flex-col rounded-[22px] border border-[#06101d]/10 bg-white p-5 shadow-[0_20px_55px_rgba(6,47,79,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(6,47,79,0.12)] md:p-6"
                            >
                                <div className="mb-5 flex items-start justify-between gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc]" style={{ color: item.color }}>
                                        {Icon && <Icon className="text-xl" />}
                                    </div>
                                    <span className="rounded-full border border-[#06101d]/10 bg-[#f7f9fc] px-3 py-1 text-[10px] font-semibold uppercase text-slate-500">
                                        {item.category}
                                    </span>
                                </div>

                                <h3 className="mb-3 text-xl font-semibold leading-tight text-[#06101d]">
                                    {item.title}
                                </h3>
                                <p className="mb-6 text-sm leading-relaxed text-slate-600">
                                    {item.description}
                                </p>

                                <div className="mb-7 flex flex-wrap gap-2">
                                    {item.features.map((feature) => (
                                        <span key={feature} className="inline-flex items-center gap-2 rounded-full border border-[#06101d]/10 bg-[#f7f9fc] px-3 py-1.5 text-[11px] font-semibold text-slate-500">
                                            <FaCheck size={9} className="text-[#8f38ff]" />
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto flex items-end justify-between gap-4 border-t border-[#06101d]/10 pt-5">
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase text-slate-400">Implementation</p>
                                        <p className="text-base font-bold text-[#8f38ff]">Custom Built</p>
                                    </div>
                                    <button
                                        onClick={() => setContactService(item)}
                                        className="inline-flex items-center gap-2 rounded-full bg-[#06101d] px-5 py-3 text-xs font-bold text-white transition-all hover:bg-[#102640]"
                                    >
                                        Enquire <FaArrowRight size={10} />
                                    </button>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </section>

            {/* Bottom Audit Box */}
            <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 md:pb-24">
                <div className="mx-auto max-w-4xl rounded-[30px] border border-[#06101d]/10 bg-white p-8 text-center md:p-12 shadow-[0_24px_70px_rgba(6,47,79,0.08)]">
                    <h2 className="mb-5 text-3xl font-semibold tracking-tight md:text-4xl text-[#06101d]">
                        Start with a free AI Readiness Audit
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-slate-600 text-sm md:text-base">
                        Identify process leaks, evaluate model feasibility, and structure a high-impact automation plan with our engineers.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            to="/contact"
                            className="rounded-full bg-[#06101d] text-white hover:bg-[#102640] px-8 py-4 text-xs font-bold uppercase tracking-widest transition-transform inline-flex items-center justify-center gap-2 hover:scale-[1.02]"
                        >
                            Book Audit
                        </Link>
                        <Link
                            to="/pricing"
                            className="rounded-full border border-[#06101d]/10 bg-[#f7f9fc] hover:bg-slate-100 text-[#06101d] px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors inline-flex items-center justify-center gap-2"
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
                            <button onClick={() => setContactService(null)} className="absolute right-6 top-6 text-slate-400 hover:text-[#06101d]">
                                <FaTimes />
                            </button>
                            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc] text-[#8f38ff]">
                                <FaBriefcase size={24} />
                            </div>
                            <h2 className="mb-3 text-3xl font-semibold">Join Program</h2>
                            <p className="mb-8 leading-relaxed text-slate-600">
                                Confirm your interest in <span className="font-bold text-[#06101d]">{contactService.title}</span>. The AlgoForce team will share the next steps.
                            </p>
                            <div className="space-y-3">
                                <button
                                    onClick={() => openWhatsApp(contactService.title)}
                                    className="flex w-full items-center justify-center gap-3 rounded-full bg-[#06101d] py-4 text-sm font-bold text-white"
                                >
                                    <FaWhatsapp /> WhatsApp Support
                                </button>
                                <button
                                    onClick={callOwner}
                                    className="flex w-full items-center justify-center gap-3 rounded-full border border-[#06101d]/10 bg-[#f7f9fc] py-4 text-sm font-bold text-[#06101d]"
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
