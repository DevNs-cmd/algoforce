import { Helmet } from "react-helmet-async"
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import {
    FaArrowRight,
    FaAws,
    FaBrain,
    FaBriefcase,
    FaChartBar,
    FaCheck,
    FaCode,
    FaDatabase,
    FaDocker,
    FaFileExcel,
    FaGithub,
    FaGlobe,
    FaGraduationCap,
    FaHtml5,
    FaJava,
    FaJs,
    FaKeyboard,
    FaLayerGroup,
    FaMapMarkerAlt,
    FaNodeJs,
    FaPhoneAlt,
    FaPython,
    FaReact,
    FaRocket,
    FaTimes,
    FaWhatsapp,
} from 'react-icons/fa'
import { SiC, SiCplusplus, SiFirebase, SiMongodb } from 'react-icons/si'
import useIsMobile from '../hooks/useIsMobile'

const SECTIONS = {
    mega: [
        {
            title: 'AI Systems & Operational Automation for Leaders',
            description: '8-week cohort for founders and executives integrating AI systems to optimize scale and operations.',
            price: 'Rs 15,000',
            originalPrice: 'Rs 45,000',
            label: 'Popular',
            icon: FaGraduationCap,
            color: '#8f38ff',
            features: ['AI Systems Architecture', 'Business Process Automation', 'Operational Integration', 'Capstone Implementation'],
        },
        {
            title: 'AI Systems Architect & Engineering Track',
            description: '16-week advanced program for engineers deploying production-grade AI systems.',
            price: 'Rs 35,000',
            originalPrice: 'Rs 75,000',
            label: 'Trending',
            icon: FaCode,
            color: '#7aa7c7',
            features: ['Custom AI Architectures', 'Secure Cloud Integration', 'Workflow Orchestration', 'Operational Dashboards'],
        },
        {
            title: 'Operational Intelligence & AI Systems',
            description: '12-week track for data teams building advanced analytics infrastructure and real-time execution dashboards.',
            price: 'Rs 25,000',
            originalPrice: 'Rs 60,000',
            label: 'High ROI',
            icon: FaChartBar,
            color: '#b783ff',
            features: ['Operational Intelligence Dashboards', 'Data Infrastructure', 'Predictive Decision Engines', 'Intelligent Reporting'],
        },
        {
            title: 'Enterprise Automation Infrastructure Specialist',
            description: '14-week cohort for operations and technology teams designing enterprise automated workflows.',
            price: 'Rs 30,000',
            originalPrice: 'Rs 65,000',
            label: 'Advanced',
            icon: FaBrain,
            color: '#8f38ff',
            features: ['Intelligent Workflows', 'Prompt & Agent Orchestration', 'Advanced n8n & Make Infrastructure', 'Systemic Operational Delivery'],
        },
    ],
    mini: [
        { title: 'Low-Code Systems & Operations Builder', description: '6-week bootcamp for non-technical operations builders.', price: 'Rs 10,000', originalPrice: 'Rs 25,000', label: 'Bootcamp', icon: FaKeyboard, color: '#8f38ff' },
        { title: 'AI-Led Operational Growth Systems', description: '10-week cohort for automated distribution and analytics funnels.', price: 'Rs 18,000', originalPrice: 'Rs 40,000', label: 'Growth', icon: FaGlobe, color: '#7aa7c7' },
        { title: 'Python & SQL Data Infrastructure', description: 'Data engineering foundations for custom database systems.', price: 'Rs 12,000', originalPrice: 'Rs 30,000', label: 'Data', icon: FaPython, color: '#b783ff' },
        { title: 'Operational Intelligence & Reporting', description: 'Business analytics platforms with custom reporting.', price: 'Rs 9,000', originalPrice: 'Rs 22,000', label: 'Analytics', icon: FaFileExcel, color: '#8f38ff' },
        { title: 'Agentic Orchestration & Workflows', description: 'Deploying autonomous agents, prompts, and orchestration workflows.', price: 'Rs 15,000', originalPrice: 'Rs 35,000', label: 'Workflow', icon: FaBrain, color: '#7aa7c7' },
    ],
    single: {
        Programming: [
            { name: 'Systems Logic & C', price: 'Rs 999', icon: SiC, color: '#8f38ff' },
            { name: 'Advanced Logic in C++', price: 'Rs 1,499', icon: SiCplusplus, color: '#8f38ff' },
            { name: 'Java Core Systems', price: 'Rs 1,999', icon: FaJava, color: '#8f38ff' },
            { name: 'Python Pro Automation', price: 'Rs 1,999', icon: FaPython, color: '#8f38ff' },
        ],
        Development: [
            { name: 'HTML & CSS Layouts', price: 'Rs 999', icon: FaHtml5, color: '#7aa7c7' },
            { name: 'JavaScript Logic', price: 'Rs 1,499', icon: FaJs, color: '#7aa7c7' },
            { name: 'React UI Systems', price: 'Rs 2,499', icon: FaReact, color: '#7aa7c7' },
            { name: 'Node.js Core Integration', price: 'Rs 2,499', icon: FaNodeJs, color: '#7aa7c7' },
        ],
        Cloud: [
            { name: 'AWS Cloud Infrastructure', price: 'Rs 1,499', icon: FaAws, color: '#b783ff' },
            { name: 'Docker & Kubernetes', price: 'Rs 2,499', icon: FaDocker, color: '#b783ff' },
            { name: 'Git & Version Workflows', price: 'Rs 999', icon: FaGithub, color: '#b783ff' },
        ],
        Database: [
            { name: 'SQL Database Systems', price: 'Rs 1,499', icon: FaDatabase, color: '#8f38ff' },
            { name: 'MongoDB Data Stores', price: 'Rs 1,999', icon: SiMongodb, color: '#8f38ff' },
            { name: 'Firebase Operations', price: 'Rs 1,499', icon: SiFirebase, color: '#8f38ff' },
        ],
    },
    premium: [
        {
            title: 'Elite Systems Deployment Apprenticeship',
            description: 'For top performers moving into custom implementation and enterprise infrastructure systems.',
            price: 'Rs 50,000',
            originalPrice: 'Rs 95,000',
            label: 'Premium',
            icon: FaRocket,
            color: '#8f38ff',
            features: ['Client systems projects', 'Enterprise case studies', 'Deployment mentorship', 'Implementation network'],
        },
    ],
}

const tabs = [
    { id: 'single', label: 'Individual', title: 'Focused individual courses', text: 'Short, practical modules for builders who want one capability at a time without a long cohort commitment.' },
    { id: 'mini', label: 'Mini Special', title: 'Bootcamps for applied capability', text: 'Compact programs for operators, students, and professionals who want guided delivery and portfolio proof.' },
    { id: 'mega', label: 'Mega Combos', title: 'Cohorts for systems execution', text: 'Multi-week tracks for leaders, engineering teams, and operators building production-grade automation workflows.' },
    { id: 'premium', label: 'Elite Track', title: 'Apprenticeship with deployment depth', text: 'A premium pathway for top performers moving toward real implementation work and client-ready delivery habits.' },
]

const CONTACT_NUMBER = "918448947436"

const Labs = () => {
    const [activeTab, setActiveTab] = useState('single')
    const [contactCourse, setContactCourse] = useState(null)
    const isMobile = useIsMobile()

    const stats = useMemo(() => {
        const individual = Object.values(SECTIONS.single).flat().length
        const cohortTracks = SECTIONS.mini.length + SECTIONS.mega.length + SECTIONS.premium.length
        return [
            ['4', 'Track Families'],
            [String(individual + cohortTracks), 'Programs'],
            ['1', 'Execution Standard'],
        ]
    }, [])

    const activeTrack = tabs.find((tab) => tab.id === activeTab) || tabs[0]

    const activeCourses = useMemo(() => {
        if (activeTab === 'single') {
            return Object.entries(SECTIONS.single).flatMap(([category, courses]) =>
                courses.map((course) => ({
                    ...course,
                    title: course.name,
                    category,
                    description: `${category} foundation module with guided practice, exercises, and implementation focus.`,
                }))
            )
        }

        return SECTIONS[activeTab]
    }, [activeTab])

    const openWhatsApp = (courseTitle) => {
        const msg = encodeURIComponent(`Hi, I'm interested in enrolling for the ${courseTitle} at AlgoForce Labs. Please share more details.`)
        window.open(`https://wa.me/${CONTACT_NUMBER}?text=${msg}`, '_blank')
    }

    const callOwner = () => {
        window.location.href = `tel:${CONTACT_NUMBER}`
    }

    const CourseCard = ({ item, index }) => {
        const Icon = item.icon
        const title = item.title || item.name

        return (
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: Math.min(index * 0.035, 0.18) }}
                className="group flex h-full flex-col rounded-[22px] border border-[#06101d]/10 bg-white p-5 shadow-[0_20px_55px_rgba(6,47,79,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(6,47,79,0.12)] md:p-6"
            >
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc]" style={{ color: item.color }}>
                        {Icon && <Icon className="text-xl" />}
                    </div>
                    <span className="rounded-full border border-[#06101d]/10 bg-[#f7f9fc] px-3 py-1 text-[10px] font-semibold uppercase text-slate-500">
                        {item.label || item.category || 'Labs'}
                    </span>
                </div>

                <h3 className="mb-3 text-xl font-semibold leading-tight text-[#06101d]">
                    {title}
                </h3>
                {item.description && (
                    <p className="mb-6 text-sm leading-relaxed text-slate-600">{item.description}</p>
                )}

                <div className="mb-7 flex flex-wrap gap-2">
                    {(item.features || ['Guided practice', 'Portfolio-ready', 'Certificate path']).slice(0, 4).map((feature) => (
                        <span key={feature} className="inline-flex items-center gap-2 rounded-full border border-[#06101d]/10 bg-[#f7f9fc] px-3 py-1.5 text-[11px] font-semibold text-slate-500">
                            <FaCheck size={9} className="text-[#8f38ff]" />
                            {feature}
                        </span>
                    ))}
                </div>

                <div className="mt-auto flex items-end justify-between gap-4 border-t border-[#06101d]/10 pt-5">
                    <div>
                        {item.originalPrice && (
                            <p className="mb-1 text-[11px] font-semibold uppercase text-slate-400 line-through">
                                {item.originalPrice}
                            </p>
                        )}
                        <p className="text-2xl font-bold" style={{ color: item.color }}>{item.price}</p>
                    </div>
                    <button
                        onClick={() => setContactCourse({ ...item, title })}
                        className="inline-flex items-center gap-2 rounded-full bg-[#06101d] px-5 py-3 text-xs font-bold text-white transition-all hover:bg-[#102640]"
                    >
                        Enroll <FaArrowRight size={10} />
                    </button>
                </div>
            </motion.article>
        )
    }

    return (
        <main className="min-h-screen bg-[#f7f9fc] text-[#06101d]">
            <Helmet>
                <title>AlgoForce Labs - AI Cohorts, Certifications & Talent Pipeline</title>
                <meta name="description" content="AlgoForce Labs runs AI cohorts, certifications, apprenticeships, portfolio projects, and placement pathways for students and professionals." />
                <link rel="canonical" href="https://www.algoforceaii.com/labs" />
            </Helmet>

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
                            <h1 className="mb-6 max-w-4xl text-[2.45rem] font-semibold leading-[1.03] sm:text-5xl md:text-6xl lg:text-[4.1rem]">
                                Labs for <span className="premium-serif italic font-normal text-[#8f38ff]">execution-ready</span> builders.
                            </h1>
                            <p className="max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                                Cohorts, bootcamps, and focused modules built for practical systems capability, portfolio proof, and confident delivery.
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
                                {isMobile && (
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_18%,rgba(143,56,255,0.20),transparent_15rem),linear-gradient(135deg,#f8fafc,#dbe7f1)]" />
                                )}
                                {!isMobile && (
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        defaultMuted
                                        playsInline
                                        webkit-playsinline="true"
                                        preload="metadata"
                                        src="/vecteezy.mp4"
                                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                                        aria-hidden="true"
                                    />
                                )}
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,16,29,0.04),rgba(6,16,29,0.68))]" />
                                <div className="absolute left-5 right-5 bottom-5 text-white">
                                    <p className="mb-2 text-[10px] font-semibold uppercase text-white/70">Labs Operating Model</p>
                                    <h2 className="text-2xl font-semibold md:text-3xl">Coursework that points to deployment.</h2>
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

            <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20">
                <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
                    <aside className="rounded-[30px] border border-[#06101d]/10 bg-white p-4 shadow-[0_24px_70px_rgba(6,47,79,0.08)] md:p-5">
                        <p className="mb-3 px-2 text-[11px] font-semibold uppercase text-[#8f38ff]">Track Selector</p>
                        <div className="grid gap-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`rounded-[18px] px-4 py-4 text-left text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-[#06101d] text-white shadow-[0_14px_32px_rgba(6,16,29,0.18)]' : 'bg-[#f7f9fc] text-slate-500 hover:text-[#06101d]'}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </aside>

                    <div>
                        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="mb-3 text-[11px] font-semibold uppercase text-[#8f38ff]">Course Directory</p>
                                <h2 className="text-3xl font-semibold md:text-4xl">{activeTrack.title}</h2>
                            </div>
                            <p className="max-w-xl text-sm leading-relaxed text-slate-500 md:text-base">
                                {activeTrack.text}
                            </p>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -18 }}
                                className={`grid gap-5 ${activeTab === 'single' ? 'md:grid-cols-2 xl:grid-cols-3' : 'md:grid-cols-2 xl:grid-cols-3'}`}
                            >
                                {activeCourses.map((item, index) => (
                                    <CourseCard key={`${item.title}-${item.category || item.label || index}`} item={item} index={index} />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 md:pb-24">
                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        {
                            icon: FaLayerGroup,
                            title: 'Structured Pathways',
                            text: 'Tracks are grouped by outcome, so students can move from foundations to cohort depth without confusion.',
                        },
                        {
                            icon: FaBriefcase,
                            title: 'Professional Output',
                            text: 'Every course is framed around useful work: dashboards, automations, systems logic, and implementation confidence.',
                        },
                        {
                            icon: FaRocket,
                            title: 'Deployment Mindset',
                            text: 'Labs training supports the wider AlgoForce execution ecosystem and real business delivery standards.',
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
                            <h3 className="mb-3 text-2xl font-semibold">{item.title}</h3>
                            <p className="text-sm leading-relaxed text-slate-600">{item.text}</p>
                        </motion.article>
                    ))}
                </div>
            </section>

            <AnimatePresence>
                {contactCourse && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setContactCourse(null)}
                            className="absolute inset-0 bg-[#06101d]/55 backdrop-blur-lg"
                        />
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0, y: 24 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 24 }}
                            className="relative w-full max-w-[430px] overflow-hidden rounded-[30px] border border-[#06101d]/10 bg-white p-7 shadow-[0_30px_100px_rgba(6,47,79,0.24)] md:p-8"
                        >
                            <button onClick={() => setContactCourse(null)} className="absolute right-6 top-6 text-slate-400 hover:text-[#06101d]">
                                <FaTimes />
                            </button>
                            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc] text-[#8f38ff]">
                                <FaGraduationCap size={24} />
                            </div>
                            <h2 className="mb-3 text-3xl font-semibold">Join Program</h2>
                            <p className="mb-8 leading-relaxed text-slate-600">
                                Confirm your interest in <span className="font-bold text-[#06101d]">{contactCourse.title || contactCourse.name}</span>. The Labs team will share the next steps.
                            </p>
                            <div className="space-y-3">
                                <button
                                    onClick={() => openWhatsApp(contactCourse.title || contactCourse.name)}
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

export default Labs
