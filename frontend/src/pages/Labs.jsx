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
    { id: 'workshops', label: 'Workshops', title: 'Engineering Workshops', text: 'Learn how to build, deploy, and scale business automation pipelines.' },
    { id: 'projects', label: 'Open Source', title: 'Open-Source Projects', text: 'Contribute to shared databases, connectors, and software tools on GitHub.' },
    { id: 'collaborations', label: 'Collaborations', title: 'University Collaborations', text: 'Collaborate with college engineering cells and developer communities across India.' },
]

const LABS_DATA = {
    internships: [
        {
            title: 'AI Software Deployment',
            description: 'Two-track structure: Training Track where students gain hands-on deployment, UAT, and support experience, and Deployment Track where AlgoForce places trained talent directly with client engagements.',
            icon: FaBriefcase,
            color: '#8f38ff',
            features: [
                'Database connection support', 
                'UAT testing runs', 
                'Client support coordination',
                'Fast-track to paid client placements'
            ],
            ctaText: 'Apply for Program'
        }
    ],
    research: [
        {
            title: 'Edge-Compute Defect Detection',
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
        <main className="min-h-screen bg-[#f7f9fc] text-[#06101d] overflow-x-hidden w-full">
            <SeoHead path="/labs" />

            {/* Hero Section — with ample top clearance for floating header */}
            <section className="relative overflow-hidden border-b border-[#06101d]/8 bg-white pt-40 pb-12 sm:pt-44 sm:pb-16 md:pt-52 md:pb-20 w-full">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-12rem] right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#8f38ff]/10 blur-[90px]" />
                    <div className="absolute bottom-[-12rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-[#062f4f]/10 blur-[100px]" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 w-full">
                    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75 }}
                            className="w-full max-w-full"
                        >
                            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-[#06101d]/10 bg-[#f7f9fc] px-3.5 py-1.5 sm:px-4 sm:py-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#8f38ff]" />
                                <span className="text-[10px] font-semibold uppercase text-slate-500">AlgoForce Labs</span>
                            </div>
                            <h1 className="mb-4 sm:mb-6 text-3xl font-semibold leading-[1.08] sm:text-5xl md:text-6xl lg:text-[4rem] tracking-tight text-[#06101d] break-words">
                                AlgoForce Labs trains <span className="premium-serif italic font-normal text-[#8f38ff]">future software engineers.</span>
                            </h1>
                            <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg font-normal">
                                A cohort-based software engineering program. Students build and ship real production software for live AlgoForce clients — not dummy projects — under a structured 4-8 week track.
                            </p>
                            
                            <div className="mt-6 sm:mt-8 grid max-w-xl grid-cols-2 gap-3">
                                <div className="rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc] p-3.5 sm:p-4 text-center">
                                    <div className="text-xl sm:text-2xl font-bold text-[#06101d]">1,000+</div>
                                    <div className="mt-1 text-[9px] sm:text-[10px] font-semibold uppercase text-slate-400">Students Trained</div>
                                </div>
                                <div className="rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc] p-3.5 sm:p-4 text-center">
                                    <div className="text-xl sm:text-2xl font-bold text-[#06101d]">20+</div>
                                    <div className="mt-1 text-[9px] sm:text-[10px] font-semibold uppercase text-slate-400">Client Placements</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08, duration: 0.75 }}
                            className="overflow-hidden rounded-[24px] sm:rounded-[30px] border border-[#06101d]/10 bg-white p-3.5 sm:p-4 shadow-[0_24px_70px_rgba(6,47,79,0.08)] w-full"
                        >
                            <div className="relative aspect-[16/10] min-h-[220px] sm:min-h-[260px] overflow-hidden rounded-[20px] sm:rounded-[24px] border border-[#06101d]/10 bg-[#eef2f7] w-full">
                                <OptimizedVideo
                                    src="/vecteezy.mp4"
                                    inView
                                    preload="metadata"
                                    mobilePreload="none"
                                    className="absolute inset-0 h-full w-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,16,29,0.04),rgba(6,16,29,0.68))]" />
                                <div className="absolute left-4 right-4 bottom-4 sm:left-5 sm:right-5 sm:bottom-5 text-white">
                                    <p className="mb-1 text-[9px] sm:text-[10px] font-semibold uppercase text-white/70">Labs Focus</p>
                                    <h2 className="text-lg sm:text-2xl font-semibold md:text-3xl tracking-tight leading-snug">Software engineering driven by real products.</h2>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 justify-center text-center">
                                <FaMapMarkerAlt className="shrink-0 text-[#8f38ff]" />
                                <span className="break-words">Office: South Delhi, Kalkaji, New Delhi 110019</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Labs Directory and Cards */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14 md:py-20 w-full max-w-full overflow-hidden">
                <div className="grid gap-6 sm:gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start w-full">
                    
                    {/* Sidebar Navigator — static on mobile to prevent navbar collision, sticky on desktop */}
                    <aside className="relative lg:sticky lg:top-[135px] lg:z-30 rounded-[24px] sm:rounded-[30px] border border-[#06101d]/10 bg-white p-3.5 sm:p-4 shadow-[0_16px_50px_rgba(6,47,79,0.06)] md:p-5 w-full max-w-full overflow-hidden">
                        <p className="mb-2.5 px-2 text-[10px] sm:text-[11px] font-bold uppercase text-[#8f38ff] tracking-wider">Directory</p>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide flex-nowrap shrink-0 lg:grid lg:gap-2 lg:overflow-x-visible lg:pb-0 w-full">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`rounded-[16px] sm:rounded-[18px] px-3.5 py-2.5 lg:py-3.5 text-left text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 lg:shrink lg:w-full active:scale-95 ${
                                        activeTab === tab.id 
                                            ? 'bg-[#06101d] text-white shadow-[0_10px_25px_rgba(6,16,29,0.18)]' 
                                            : 'bg-[#f7f9fc] text-slate-500 hover:text-[#06101d] hover:bg-[#edf2f8]'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Content Section */}
                    <div className="min-w-0 w-full max-w-full overflow-hidden">
                        <div className="mb-6 sm:mb-8 flex flex-col gap-2.5 md:flex-row md:items-end md:justify-between w-full">
                            <div>
                                <p className="mb-1.5 text-[10px] sm:text-[11px] font-bold uppercase text-[#8f38ff] tracking-wider">Ecosystem Registry</p>
                                <h2 className="text-2xl sm:text-3xl font-semibold md:text-4xl tracking-tight text-[#06101d] break-words">{activeTrack.title}</h2>
                            </div>
                            <p className="max-w-xl text-xs sm:text-sm leading-relaxed text-slate-500 md:text-base font-normal break-words">
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
                                className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3 w-full max-w-full"
                            >
                                {activeItems.map((item, index) => {
                                    const Icon = item.icon
                                    return (
                                        <motion.article
                                            key={item.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ delay: Math.min(index * 0.035, 0.18) }}
                                            className="group flex h-full flex-col rounded-[22px] border border-[#06101d]/10 bg-white p-4 sm:p-6 shadow-[0_20px_55px_rgba(6,47,79,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(6,47,79,0.12)] justify-between w-full max-w-full overflow-hidden"
                                        >
                                            <div className="w-full max-w-full overflow-hidden">
                                                <div className="mb-4 flex items-start justify-between gap-3">
                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc]" style={{ color: item.color }}>
                                                        {Icon && <Icon className="text-lg" />}
                                                    </div>
                                                    <span className="rounded-full border border-[#06101d]/10 bg-[#f7f9fc] px-2.5 py-1 text-[9px] sm:text-[10px] font-semibold uppercase text-slate-500 shrink-0">
                                                        {activeTab}
                                                    </span>
                                                </div>

                                                <h3 className="mb-2 text-lg sm:text-xl font-semibold leading-tight text-[#06101d] tracking-tight break-words w-full">
                                                    {item.title}
                                                </h3>
                                                <p className="mb-5 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal break-words w-full">
                                                    {item.description}
                                                </p>

                                                <div className="mb-6 flex flex-wrap gap-1.5 sm:gap-2 w-full max-w-full">
                                                    {item.features.map((feature) => (
                                                        <span key={feature} className="inline-flex items-center gap-1.5 rounded-full border border-[#06101d]/10 bg-[#f7f9fc] px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-slate-600 break-words max-w-full text-left">
                                                            <FaCheck size={8} className="text-[#8f38ff] shrink-0" />
                                                            <span className="break-words">{feature}</span>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#06101d]/10 pt-4 w-full">
                                                <span className="text-[9px] sm:text-[10px] font-bold uppercase text-slate-400 tracking-wider shrink-0">Production Focus</span>
                                                <button
                                                    onClick={() => setSelectedItem(item)}
                                                    className="inline-flex items-center gap-1.5 rounded-full bg-[#06101d] px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#102640] active:scale-95 shrink-0"
                                                >
                                                    {item.ctaText || 'Learn More'} <FaArrowRight size={9} />
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
            <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-12 sm:pb-16 md:pb-24 w-full max-w-full overflow-hidden">
                <div className="grid gap-4 sm:gap-6 md:grid-cols-3 w-full">
                    {[
                        {
                            icon: FaLayerGroup,
                            title: 'University Collaborations',
                            text: 'We collaborate with student communities from leading institutions (IITs, NITs, and top universities) to train future developers. Structured partnerships for colleges covering cohort delivery, mentorship, and placement-linked outcomes.',
                        },
                        {
                            icon: FaBriefcase,
                            title: 'Real Software Products',
                            text: "Students don't complete dummy projects. They write code for real business software, gaining hands-on database and integration experience. Practical product delivery is embedded directly in the curriculum.",
                        },
                        {
                            icon: FaRocket,
                            title: 'Career Development',
                            text: 'Our programs prepare elite student engineering talent to launch their software careers or join top product teams with job-readiness outcomes and client deployment opportunities.',
                        },
                    ].map((item, index) => (
                        <motion.article
                            key={item.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.08 }}
                            className="rounded-[24px] sm:rounded-[30px] border border-[#06101d]/10 bg-white p-5 sm:p-6 shadow-[0_20px_55px_rgba(6,47,79,0.06)] md:p-7 w-full max-w-full overflow-hidden"
                        >
                            <div className="mb-4 sm:mb-6 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc] text-[#8f38ff]">
                                <item.icon />
                            </div>
                            <h3 className="mb-2 sm:mb-3 text-xl sm:text-2xl font-semibold tracking-tight text-[#06101d] break-words">{item.title}</h3>
                            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal break-words">{item.text}</p>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* Interaction Popup Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-[100002] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedItem(null)}
                            className="absolute inset-0 bg-[#06101d]/65 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0, y: 24 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 24 }}
                            className="relative w-full max-w-[420px] max-h-[85vh] overflow-y-auto rounded-[28px] border border-[#06101d]/10 bg-white p-6 sm:p-8 shadow-2xl"
                        >
                            <button onClick={() => setSelectedItem(null)} className="absolute right-5 top-5 p-2 text-slate-400 hover:text-[#06101d] focus:outline-none">
                                <FaTimes />
                            </button>
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc] text-[#8f38ff]">
                                <FaGraduationCap size={22} />
                            </div>
                            <h2 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-[#06101d]">Labs Ecosystem</h2>
                            <p className="mb-6 leading-relaxed text-slate-600 text-xs sm:text-sm font-normal">
                                Submit your interest in the <span className="font-bold text-[#06101d]">{selectedItem.title}</span> track. Our Labs coordinator will connect with you.
                            </p>
                            <div className="space-y-3">
                                <button
                                    onClick={() => openWhatsApp(selectedItem.title)}
                                    className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#06101d] py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-slate-900 transition-colors focus:outline-none active:scale-95 shadow-md"
                                >
                                    <FaWhatsapp size={16} /> Contact via WhatsApp
                                </button>
                                <button
                                    onClick={() => { setSelectedItem(null); window.location.href = `tel:${CONTACT_NUMBER}` }}
                                    className="flex w-full items-center justify-center gap-2.5 rounded-full border border-[#06101d]/10 bg-[#f7f9fc] py-3.5 text-xs sm:text-sm font-bold text-[#06101d] hover:bg-slate-100 transition-colors focus:outline-none active:scale-95"
                                >
                                    <FaPhoneAlt size={14} /> Call Direct
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
