import SeoHead from "../components/common/SeoHead"
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import {
    FaArrowRight,
    FaBrain,
    FaBriefcase,
    FaCode,
    FaDatabase,
    FaGithub,
    FaGlobe,
    FaGraduationCap,
    FaKeyboard,
    FaLayerGroup,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaRocket,
    FaTimes,
    FaWhatsapp,
    FaCheck,
    FaMicrochip,
    FaSearch,
    FaUsers
} from 'react-icons/fa'
import OptimizedVideo from '../components/common/OptimizedVideo'

const TABS = [
    { id: 'internships', label: 'Internships', title: 'Internship Programs', text: 'Work alongside our deployment team on active client software environments.' },
    { id: 'research', label: 'Research', title: 'Research Initiatives', text: 'Investigate AI system latency, edge-compute performance, and local database security benchmarks.' },
    { id: 'hackathons', label: 'Hackathons', title: 'Student Hackathons', text: 'Participate in engineering sprints to build prototypes and solve speed benchmarks.' },
    { id: 'workshops', label: 'Engineering Workshops', title: 'Engineering Workshops', text: 'Learn how to build, deploy, and scale business automation pipelines.' },
    { id: 'projects', label: 'Open Source', title: 'Open-Source Projects', text: 'Contribute to shared databases, connectors, and software tools on GitHub.' },
    { id: 'collaborations', label: 'University Collaborations', title: 'University Collaborations', text: 'Collaborate with college engineering cells and developer communities across India.' },
]

const LABS_DATA = {
    internships: [
        {
            title: 'AI Software Deployment',
            description: 'Hands-on roles deploying and configuring our ready-to-use software products.',
            icon: FaBriefcase,
            color: '#7aa7c7',
            features: ['Database connection support', 'UAT testing runs', 'Client support coordination'],
            ctaText: 'Apply for Internship'
        }
    ],
    research: [
        {
            title: 'Evaluating Edge-Compute for Defect Detection',
            description: 'An analysis of latency and camera trigger benchmarks on local manufacturing floors.',
            icon: FaMicrochip,
            color: '#b783ff',
            features: ['Edge hardware tests', 'PLC trigger speeds', 'Defect logging algorithms'],
            ctaText: 'Read Research Paper'
        }
    ],
    hackathons: [
        {
            title: 'Operational Software Hackathon',
            description: 'Engineering sprints to optimize speed benchmarks for database search queries.',
            icon: FaGlobe,
            color: '#8f38ff',
            features: ['Query speed contests', 'API mapping challenges', 'Open to college students'],
            ctaText: 'Register for Hackathon'
        }
    ],
    workshops: [
        {
            title: 'Business Automation Workshops',
            description: 'Practical training on mapping business processes and writing integration scripts.',
            icon: FaGraduationCap,
            color: '#8f38ff',
            features: ['Process map training', 'Database setup worksheets', 'Integration guidelines'],
            ctaText: 'Join Workshop'
        }
    ],
    projects: [
        {
            title: 'Tally Database Connector Bridge',
            description: 'Open connector framework enabling safe local SQL queries and data extraction.',
            icon: FaGithub,
            color: '#b783ff',
            features: ['Local service sync', 'XML parsing optimization', 'Read-only access keys'],
            ctaText: 'Contribute on GitHub'
        }
    ],
    collaborations: [
        {
            title: 'University Developer Cells',
            description: 'Partnering with college engineering clubs to run hackathons and internship programs.',
            icon: FaUsers,
            color: '#8f38ff',
            features: ['Joint hackathons', 'Engineering club meets', 'Workshops for students'],
            ctaText: 'Join Community'
        }
    ]
}

const CONTACT_NUMBER = "918448947436"

const Labs = () => {
    const [activeTab, setActiveTab] = useState('internships')
    const [selectedItem, setSelectedItem] = useState(null)

    const activeTrack = TABS.find((tab) => tab.id === activeTab) || TABS[0]
    const activeItems = LABS_DATA[activeTab] || []

    const openWhatsApp = (title) => {
        const msg = encodeURIComponent(`Hi, I'm interested in ${title} at AlgoForce Labs. Please share details.`)
        window.open(`https://wa.me/${CONTACT_NUMBER}?text=${msg}`, '_blank')
    }

    return (
        <main className="min-h-screen bg-[#f7f9fc] text-[#06101d]">
            <SeoHead path="/labs" />

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
                        <span className="text-[10px] font-semibold uppercase text-slate-500">AlgoForce Labs</span>
                    </div>
                    <h1 className="mb-6 max-w-4xl text-[2.45rem] font-semibold leading-[1.03] sm:text-5xl md:text-6xl lg:text-[4.1rem] tracking-tight">
                        AlgoForce Labs trains <span className="premium-serif italic font-normal text-[#8f38ff]">future software engineers.</span>
                    </h1>
                    <p className="max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg font-normal">
                        Students learn by building real software products, not dummy projects. We collaborate with universities and student developer cells across India.
                    </p>
                    
                    <div className="mt-8 grid max-w-xl grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc] p-4 text-center">
                            <div className="text-2xl font-bold text-[#06101d]">1,000+</div>
                            <div className="mt-1 text-[10px] font-semibold uppercase text-slate-400">Students Trained</div>
                        </div>
                        <div className="rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc] p-4 text-center">
                            <div className="text-2xl font-bold text-[#06101d]">Real Products</div>
                            <div className="mt-1 text-[10px] font-semibold uppercase text-slate-400">Built in Labs</div>
                        </div>
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
                            src="/vecteezy.mp4"
                            inView
                            preload="metadata"
                            mobilePreload="none"
                            className="absolute inset-0 h-full w-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,16,29,0.04),rgba(6,16,29,0.68))]" />
                        <div className="absolute left-5 right-5 bottom-5 text-white">
                            <p className="mb-2 text-[10px] font-semibold uppercase text-white/70">Labs Focus</p>
                            <h2 className="text-2xl font-semibold md:text-3xl tracking-tight">Software engineering driven by real products.</h2>
                        </div>
                    </div>
                    <div className="mt-5 flex items-start gap-3 text-sm font-semibold text-slate-500 justify-center">
                        <FaMapMarkerAlt className="mt-0.5 text-[#8f38ff]" />
                        <span>Office: South Delhi, Kalkaji, New Delhi 110019</span>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>

    {/* Labs Directory and Cards */}
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
            
            {/* Sidebar Navigator */}
            <aside className="rounded-[30px] border border-[#06101d]/10 bg-white p-4 shadow-[0_24px_70px_rgba(6,47,79,0.08)] md:p-5">
                <p className="mb-3 px-2 text-[11px] font-semibold uppercase text-[#8f38ff]">Directory</p>
                <div className="grid gap-2">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`rounded-[18px] px-4 py-4 text-left text-sm font-bold transition-all ${
                                activeTab === tab.id 
                                    ? 'bg-[#06101d] text-white shadow-[0_14px_32px_rgba(6,16,29,0.18)]' 
                                    : 'bg-[#f7f9fc] text-slate-500 hover:text-[#06101d]'
                            }`}
                        >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Content Section */}
                    <div>
                        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="mb-3 text-[11px] font-semibold uppercase text-[#8f38ff]">Ecosystem Registry</p>
                                <h2 className="text-3xl font-semibold md:text-4xl tracking-tight">{activeTrack.title}</h2>
                            </div>
                            <p className="max-w-xl text-sm leading-relaxed text-slate-500 md:text-base font-normal">
                                {activeTrack.text}
                            </p>
                        </div>

                        {/* Cards Grid */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -18 }}
                                className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
                            >
                                {activeItems.map((item, index) => {
                                    const Icon = item.icon
                                    return (
                                        <motion.article
                                            key={item.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-80px" }}
                                            transition={{ delay: Math.min(index * 0.035, 0.18) }}
                                            className="group flex h-full flex-col rounded-[22px] border border-[#06101d]/10 bg-white p-5 shadow-[0_20px_55px_rgba(6,47,79,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(6,47,79,0.12)] md:p-6 justify-between"
                                        >
                                            <div>
                                                <div className="mb-5 flex items-start justify-between gap-4">
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc]" style={{ color: item.color }}>
                                                        {Icon && <Icon className="text-xl" />}
                                                    </div>
                                                    <span className="rounded-full border border-[#06101d]/10 bg-[#f7f9fc] px-3 py-1 text-[10px] font-semibold uppercase text-slate-500">
                                                        {activeTab}
                                                    </span>
                                                </div>

                                                <h3 className="mb-3 text-xl font-semibold leading-tight text-[#06101d] tracking-tight">
                                                    {item.title}
                                                </h3>
                                                <p className="mb-6 text-sm leading-relaxed text-slate-600 font-normal">{item.description}</p>

                                                <div className="mb-7 flex flex-wrap gap-2">
                                                    {item.features.map((feature) => (
                                                        <span key={feature} className="inline-flex items-center gap-2 rounded-full border border-[#06101d]/10 bg-[#f7f9fc] px-3 py-1.5 text-[11px] font-semibold text-slate-500">
                                                            <FaCheck size={9} className="text-[#8f38ff]" />
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#06101d]/10 pt-5">
                                                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Production Focus</span>
                                                <button
                                                    onClick={() => setSelectedItem(item)}
                                                    className="inline-flex items-center gap-2 rounded-full bg-[#06101d] px-5 py-3 text-xs font-bold text-white transition-all hover:bg-[#102640] focus:outline-none"
                                                >
                                                    {item.ctaText || 'Learn More'} <FaArrowRight size={10} />
                                                </button>
                                            </div>
                                        </motion.article>
                                    )
                                })}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Collaborations Info Section */}
            <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 md:pb-24">
                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        {
                            icon: FaLayerGroup,
                            title: 'University Collaborations',
                            text: 'We collaborate with student communities from leading institutions (IITs, NITs, and top universities) to train future developers.',
                        },
                        {
                            icon: FaBriefcase,
                            title: 'Real Software Products',
                            text: "Students don't complete dummy projects. They write code for real business software, gaining hands-on database and integration experience.",
                        },
                        {
                            icon: FaRocket,
                            title: 'Career Development',
                            text: 'Our programs prepare elite student engineering talent to launch their software careers or join top product teams.',
                        },
                    ].map((item, index) => (
                        <motion.article
                            key={item.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ delay: index * 0.08 }}
                            className="rounded-[30px] border border-[#06101d]/10 bg-white p-6 shadow-[0_24px_70px_rgba(6,47,79,0.08)] md:p-7"
                        >
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc] text-[#8f38ff]">
                                <item.icon />
                            </div>
                            <h3 className="mb-3 text-2xl font-semibold tracking-tight">{item.title}</h3>
                            <p className="text-sm leading-relaxed text-slate-600 font-normal">{item.text}</p>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* Interaction Popup Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedItem(null)}
                            className="absolute inset-0 bg-[#06101d]/55 backdrop-blur-lg"
                        />
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0, y: 24 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 24 }}
                            className="relative w-full max-w-[430px] overflow-hidden rounded-[30px] border border-[#06101d]/10 bg-white p-7 shadow-[0_30px_100px_rgba(6,47,79,0.24)] md:p-8"
                        >
                            <button onClick={() => setSelectedItem(null)} className="absolute right-6 top-6 text-slate-400 hover:text-[#06101d] focus:outline-none">
                                <FaTimes />
                            </button>
                            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc] text-[#8f38ff]">
                                <FaGraduationCap size={24} />
                            </div>
                            <h2 className="mb-3 text-2xl font-bold tracking-tight">Labs Ecosystem</h2>
                            <p className="mb-8 leading-relaxed text-slate-600 text-sm font-normal">
                                Submit your interest in the <span className="font-bold text-[#06101d]">{selectedItem.title}</span> track. Our Labs coordinator will connect with you.
                            </p>
                            <div className="space-y-3">
                                <button
                                    onClick={() => openWhatsApp(selectedItem.title)}
                                    className="flex w-full items-center justify-center gap-3 rounded-full bg-[#06101d] py-4 text-sm font-bold text-white hover:bg-slate-900 transition-colors focus:outline-none"
                                >
                                    <FaWhatsapp /> Contact via WhatsApp
                                </button>
                                <button
                                    onClick={() => { setSelectedItem(null); window.location.href = `tel:${CONTACT_NUMBER}` }}
                                    className="flex w-full items-center justify-center gap-3 rounded-full border border-[#06101d]/10 bg-[#f7f9fc] py-4 text-sm font-bold text-[#06101d] hover:bg-slate-100 transition-colors focus:outline-none"
                                >
                                    <FaPhoneAlt /> Call direct
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    )
}

export default Labs
