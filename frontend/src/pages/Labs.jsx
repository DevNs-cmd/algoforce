import { Helmet } from "react-helmet-async"
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef, useMemo } from 'react'
import { FaCheck, FaWhatsapp, FaPhoneAlt, FaTimes, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaAws, FaDocker, FaGitAlt, FaGithub, FaDatabase, FaJava, FaPython, FaGraduationCap, FaCode, FaChartBar, FaRobot, FaKeyboard, FaGlobe, FaFileExcel, FaBrain, FaRocket, FaArrowRight } from 'react-icons/fa'
import { SiC, SiCplusplus, SiMongodb, SiFirebase, SiMysql, SiTailwindcss, SiNextdotjs } from 'react-icons/si'
import { Link } from 'react-router-dom'
import PageVideoBackdrop from '../components/common/PageVideoBackdrop'

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
            features: ['AI Systems Architecture', 'Business Process Automation', 'Operational Integration', 'Capstone Implementation']
        },
        { 
            title: 'AI Systems Architect & Engineering Track', 
            description: '16-week advanced program for engineers deploying production-grade AI systems.',
            price: 'Rs 35,000', 
            originalPrice: 'Rs 75,000',
            label: 'Trending',
            icon: FaCode,
            color: '#7aa7c7',
            features: ['Custom AI Architectures', 'Secure Cloud Integration', 'Workflow Orchestration', 'Operational Dashboards']
        },
        { 
            title: 'Operational Intelligence & AI Systems', 
            description: '12-week track for data teams building advanced analytics infrastructure and real-time execution dashboards.',
            price: 'Rs 25,000', 
            originalPrice: 'Rs 60,000',
            label: 'High ROI',
            icon: FaChartBar,
            color: '#b783ff',
            features: ['Operational Intelligence Dashboards', 'Data Infrastructure', 'Predictive Decision Engines', 'Intelligent Reporting']
        },
        { 
            title: 'Enterprise Automation Infrastructure Specialist', 
            description: '14-week cohort for operations and technology teams designing enterprise automated workflows.',
            price: 'Rs 30,000', 
            originalPrice: 'Rs 65,000',
            label: 'Advanced',
            icon: FaRobot,
            color: '#8f38ff',
            features: ['Intelligent Workflows', 'Prompt & Agent Orchestration', 'Advanced n8n & Make Infrastructure', 'Systemic Operational Delivery']
        }
    ],
    mini: [
        { title: 'Low-Code Systems & Operations Builder', description: '6-week bootcamp for non-technical operations builders.', price: 'Rs 10,000', originalPrice: 'Rs 25,000', icon: FaKeyboard, color: '#8f38ff' },
        { title: 'AI-Led Operational Growth Systems', description: '10-week cohort for automated distribution and analytics funnels.', price: 'Rs 18,000', originalPrice: 'Rs 40,000', icon: FaGlobe, color: '#7aa7c7' },
        { title: 'Python & SQL Data Infrastructure', description: 'Data engineering foundations for custom database systems.', price: 'Rs 12,000', originalPrice: 'Rs 30,000', icon: FaPython, color: '#b783ff' },
        { title: 'Operational Intelligence & Reporting', description: 'Business analytics platforms with custom reporting.', price: 'Rs 9,000', originalPrice: 'Rs 22,000', icon: FaFileExcel, color: '#8f38ff' },
        { title: 'Agentic Orchestration & Workflows', description: 'Deploying autonomous agents, prompts, and orchestration workflows.', price: 'Rs 15,000', originalPrice: 'Rs 35,000', icon: FaBrain, color: '#7aa7c7' }
    ],
    single: {
        Programming: [
            { name: 'Systems Logic & C', price: 'Rs 999', icon: SiC, color: '#8f38ff' },
            { name: 'Advanced Logic in C++', price: 'Rs 1,499', icon: SiCplusplus, color: '#8f38ff' },
            { name: 'Java Core Systems', price: 'Rs 1,999', icon: FaJava, color: '#8f38ff' },
            { name: 'Python Pro Automation', price: 'Rs 1,999', icon: FaPython, color: '#8f38ff' }
        ],
        Development: [
            { name: 'HTML & CSS Layouts', price: 'Rs 999', icon: FaHtml5, color: '#7aa7c7' },
            { name: 'JavaScript Logic', price: 'Rs 1,499', icon: FaJs, color: '#7aa7c7' },
            { name: 'React UI Systems', price: 'Rs 2,499', icon: FaReact, color: '#7aa7c7' },
            { name: 'Node.js Core Integration', price: 'Rs 2,499', icon: FaNodeJs, color: '#7aa7c7' }
        ],
        Cloud: [
            { name: 'AWS Cloud Infrastructure', price: 'Rs 1,499', icon: FaAws, color: '#b783ff' },
            { name: 'Docker & Kubernetes', price: 'Rs 2,499', icon: FaDocker, color: '#b783ff' },
            { name: 'Git & Version Workflows', price: 'Rs 999', icon: FaGithub, color: '#b783ff' }
        ],
        Database: [
            { name: 'SQL Database Systems', price: 'Rs 1,499', icon: FaDatabase, color: '#8f38ff' },
            { name: 'MongoDB Data Stores', price: 'Rs 1,999', icon: SiMongodb, color: '#8f38ff' },
            { name: 'Firebase Operations', price: 'Rs 1,499', icon: SiFirebase, color: '#8f38ff' }
        ]
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
            features: ['Client systems projects', 'Enterprise case studies', 'Deployment mentorship', 'Implementation network']
        }
    ]
};


const Labs = () => {
    const [activeTab, setActiveTab] = useState('single');
    const [isScrolled, setIsScrolled] = useState(false);
    const [contactCourse, setContactCourse] = useState(null);
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Theme transition: dark hero mood -> subtle purple -> dark
    const backgroundOverlay = useTransform(
        scrollYProgress,
        [0, 0.4, 0.6, 1],
        ["rgba(3, 7, 13, 0.76)", "rgba(12, 8, 28, 0.72)", "rgba(9, 16, 31, 0.76)", "rgba(3, 7, 13, 0.84)"]
    );

    // Optimized Course Selection logic
    const filteredCourses = useMemo(() => {
        const data = SECTIONS[activeTab];
        if (!data) return [];
        if (activeTab === 'single' && !Array.isArray(data)) {
            return Object.entries(data).flatMap(([category, items]) => 
                items.map(item => ({ 
                    ...item, 
                    title: item.name, 
                    category,
                    isIndividual: true 
                }))
            );
        }
        return data;
    }, [activeTab]);

    // Placeholder contact
    // Updated to consistent consultancy number
    const CONTACT_NUMBER = "918448947436";

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 100);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (contactCourse) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [contactCourse]);

    const openWhatsApp = (courseTitle) => {
        const msg = encodeURIComponent(`Hi, I'm interested in enrolling for the ${courseTitle} at AlgoForce Labs. Please share more details.`);
        window.open(`https://wa.me/${CONTACT_NUMBER}?text=${msg}`, '_blank');
    };

    const callOwner = () => {
        window.location.href = `tel:${CONTACT_NUMBER}`;
    };


    return (
        <div ref={containerRef} className="relative min-h-screen overflow-hidden premium-page-bg text-white">
            <Helmet>
                <title>AlgoForce Labs - AI Cohorts, Certifications & Talent Pipeline</title>
                <meta name="description" content="AlgoForce Labs runs AI cohorts, certifications, apprenticeships, portfolio projects, and placement pathways for students and professionals." />
                <link rel="canonical" href="https://www.algoforceaii.com/labs" />
                <script type="application/ld+json">
                {`
                    {
                    "@context": "https://schema.org",
                    "@type": "Course",
                    "name": "BTech / BCA Complete Pack",
                    "description": "Full software engineering roadmap from logic to deployment.",
                    "provider": {
                        "@type": "Organization",
                        "name": "AlgoForce Labs",
                        "sameAs": "https://www.algoforceaii.com/labs"
                    }
                    }
                `}
                </script>
                <meta property="og:title" content="AlgoForce Labs - AI Cohorts & Talent Pipeline" />
                <meta property="og:description" content="Cohort-based AI training, apprenticeships, certifications, and placement pathways." />
                <meta property="og:image" content="https://www.algoforceaii.com/og-labs.png" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            {/* Premium AI background */}
            <PageVideoBackdrop src="/video2.mp4" className="fixed z-0" videoClassName="opacity-[0.3]" />
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute inset-0 subtle-ai-grid opacity-55" />
                <motion.div
                    animate={{
                        x: ['-20%', '10%', '-20%'],
                        y: ['-10%', '20%', '-10%'],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] left-[-10%] w-[720px] h-[720px] bg-[#8f38ff]/10 blur-[140px] rounded-full transform-gpu will-change-transform"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 20, 0],
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-12%] right-[5%] w-[720px] h-[720px] bg-[#062f4f]/28 blur-[130px] rounded-full transform-gpu will-change-transform"
                />
                <motion.div
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute top-[28%] left-[40%] w-[520px] h-[520px] bg-white/5 blur-[140px] rounded-full transform-gpu"
                />
            </div>

            {/* Scroll-driven Theme Overlay */}
            <motion.div 
                style={{ backgroundColor: backgroundOverlay }} 
                className="fixed inset-0 pointer-events-none z-[1] transition-colors duration-1000" 
            />

            <div className="relative z-10 pt-28 md:pt-34 pb-10 md:pb-14 selection:bg-purple-500/20">
                
                <div className="max-w-7xl mx-auto px-5 sm:px-6 mb-10 md:mb-14">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-center lg:text-left"
                        >
                            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mb-6 md:mb-7">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full premium-dark-surface backdrop-blur-xl"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#8f38ff]" />
                                    <span className="text-[10px] font-semibold uppercase text-slate-300 whitespace-nowrap">AI Talent Infrastructure</span>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full premium-dark-surface backdrop-blur-xl"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#7aa7c7]" />
                                    <span className="text-[10px] font-semibold uppercase text-slate-300 whitespace-nowrap">Cohorts & Apprenticeships</span>
                                </motion.div>
                            </div>

                            <h1 className="text-[2.35rem] sm:text-5xl md:text-6xl lg:text-[4.75rem] font-bold text-white mb-6 leading-[1.06]">
                                Build AI execution capabilities with <span className="brand-gradient-text">AlgoForce Labs</span>
                            </h1>
                            <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8">
                                Move from skills acquisition to systems deployment, certification, and enterprise implementation. <br className="hidden md:block" />
                                AlgoForce Labs is our strategic talent infrastructure platform.
                            </p>

                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.1, ease: "easeOut" }}
                            className="relative flex justify-center items-center"
                        >
                            <div className="w-full max-w-md premium-dark-surface rounded-[28px] p-6 md:p-8 backdrop-blur-xl">
                                <div className="relative aspect-video overflow-hidden rounded-[22px] border border-white/10 mb-6 shadow-[0_24px_70px_rgba(6,47,79,0.12)]">
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        defaultMuted
                                        playsInline
                                        webkit-playsinline="true"
                                        preload="metadata"
                                        src="/video2.mp4"
                                        className="absolute inset-0 h-full w-full object-cover"
                                        aria-hidden="true"
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,13,0.08),rgba(3,7,13,0.58))]" />
                                    <div className="absolute left-4 right-4 bottom-4">
                                        <p className="text-[10px] uppercase font-semibold text-white/75 labs-keep-white">Live execution lab</p>
                                        <h2 className="text-2xl font-bold text-white labs-keep-white">Build. Automate. Deploy.</h2>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center overflow-hidden">
                                        <img src="/logo.png" alt="AlgoForce Logo" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase text-slate-400 font-semibold">Labs operating model</p>
                                        <h2 className="text-2xl font-extrabold brand-wordmark">Algo<span>Force</span></h2>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    {['Systems', 'Automation', 'AI Apps', 'Deployment'].map((label) => (
                                        <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                                            <div className="text-sm font-extrabold text-white">{label}</div>
                                            <div className="text-xs uppercase text-slate-400 mt-1">Execution module</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>



                <div className="text-center mb-8 px-5 sm:px-6">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                        Choose your Labs track
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">Professional AI and automation programs mapped to execution roles, from single skills to enterprise deployment tracks.</p>
                </div>
                <div className={`sticky top-20 z-50 flex justify-center px-4 mb-4 md:mb-8 transition-all duration-500 ${isScrolled ? 'opacity-100 scale-95' : 'opacity-100'}`}>
                    <div className="premium-dark-surface backdrop-blur-2xl rounded-[26px] p-1.5 overflow-x-auto no-scrollbar max-w-full">
                        <div className="flex items-center min-w-max gap-1 px-1">
                            {[
                                { id: 'single', label: 'Individual' },
                                { id: 'mini', label: 'Mini Special' },
                                { id: 'mega', label: 'Mega Combos' },
                                { id: 'premium', label: 'Elite Track' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative px-7 md:px-10 py-3.5 rounded-full font-bold text-[13px] md:text-[14px] transition-all duration-300 whitespace-nowrap min-w-max flex-shrink-0 ${
                                        activeTab === tab.id ? 'text-[#06101d]' : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="active-ios-tab"
                                            className="absolute inset-0 bg-white rounded-full shadow-[0_12px_28px_rgba(143,56,255,0.14)]"
                                        />
                                    )}
                                    <span className="relative z-10">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div id="pricing-grid" className="max-w-7xl mx-auto px-5 sm:px-6 py-8 md:py-10 border-t border-white/10 selection:bg-purple-500/20">
                    <AnimatePresence mode="wait">
                        {(activeTab === 'mega' || activeTab === 'premium') && (
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                            >
                                {SECTIONS[activeTab].map((item, i) => (
                                    <motion.div 
                                        key={`${activeTab}-${item.title}`}
                                        whileHover={{ y: -6 }}
                                        className="group relative p-8 md:p-10 rounded-[26px] premium-dark-surface backdrop-blur-xl transition-all duration-500 overflow-hidden"
                                    >
                                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                        
                                        <div className="flex justify-between items-start mb-10 relative z-10">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-white/7 border border-white/10 flex items-center justify-center text-2xl" style={{ color: item.color }}>
                                                    <item.icon />
                                                </div>
                                                <div className="px-4 py-1.5 rounded-full bg-white/6 border border-white/10 text-[10px] font-bold uppercase text-slate-300">
                                                    {item.label}
                                                </div>
                                            </div>
                                            <motion.button 
                                                whileHover={{ scale: 1.05 }}
                                                onClick={() => setContactCourse(item)}
                                                className="w-12 h-12 rounded-full bg-white/6 border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#06101d] transition-all text-white/55"
                                            >
                                                <div className="text-xl font-light">+</div>
                                            </motion.button>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-extrabold mb-4 text-white group-hover:text-white transition-colors leading-tight relative z-10">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-400 mb-10 font-normal leading-relaxed relative z-10">
                                            {item.description}
                                        </p>
                                        
                                        <div className="space-y-4 mb-12 relative z-10 flex-1">
                                            {item.features.map(f => (
                                                <div key={f} className="flex items-center gap-4 text-[13px] text-slate-300 font-medium">
                                                    <div className="w-5 h-5 rounded-full bg-white/6 flex items-center justify-center border border-white/10">
                                                        <FaCheck className="text-[8px]" style={{ color: item.color }} />
                                                    </div>
                                                    {f}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                                            <div>
                                                <div className="text-[11px] text-white/28 font-bold line-through mb-1 uppercase">{item.originalPrice}</div>
                                                <div className="text-3xl font-extrabold text-white" style={{ color: item.color }}>{item.price}</div>
                                            </div>
                                            <motion.button 
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setContactCourse(item)}
                                                className="px-8 py-4 bg-white text-[#06101d] rounded-full font-bold text-[14px] shadow-[0_18px_40px_rgba(143,56,255,0.14)] transition-all"
                                            >
                                                Enroll Now
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'mini' && (
                            <motion.div
                                key="mini"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {SECTIONS.mini.map((item, i) => (
                                    <motion.div 
                                        key={`mini-${i}`} 
                                        whileHover={{ y: -6 }}
                                        className="p-8 rounded-[26px] premium-dark-surface backdrop-blur-xl group transition-all duration-300 relative overflow-hidden"
                                    >
                                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                                        
                                        <div className="flex justify-between items-start mb-8 relative z-10">
                                            <div className="w-14 h-14 rounded-2xl bg-white/7 border border-white/10 flex items-center justify-center text-2xl transition-transform duration-500 group-hover:scale-105" style={{ color: item.color }}>
                                                <item.icon />
                                            </div>
                                            <motion.button 
                                                whileHover={{ scale: 1.05 }} 
                                                onClick={() => setContactCourse(item)} 
                                                className="w-10 h-10 rounded-full bg-white/6 border border-white/10 flex items-center justify-center text-white/55 hover:bg-white hover:text-[#06101d] transition-all"
                                            >
                                                <span className="text-xl font-light">+</span>
                                            </motion.button>
                                        </div>
                                        <h4 className="text-[20px] font-extrabold text-white mb-2 relative z-10">{item.title}</h4>
                                        <p className="text-[13px] text-slate-400 mb-10 leading-relaxed font-normal relative z-10">{item.description}</p>
                                        
                                        <div className="flex items-center justify-between pt-6 border-t border-white/5 relative z-10">
                                            <div>
                                                <div className="text-[10px] text-white/28 line-through mb-0.5 font-bold uppercase">{item.originalPrice}</div>
                                                <div className="text-2xl font-extrabold text-white" style={{ color: item.color }}>{item.price}</div>
                                            </div>
                                            <motion.button 
                                                whileHover={{ scale: 1.03 }}
                                                onClick={() => setContactCourse(item)}
                                                className="px-6 py-3 bg-white/8 border border-white/10 text-white rounded-full text-[12px] font-bold transition-all hover:bg-white hover:text-[#06101d]"
                                            >
                                                Enroll
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'single' && (
                            <motion.div
                                key="single"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10"
                            >
                                {Object.entries(SECTIONS.single).map(([category, courses]) => (
                                    <div key={category} className="space-y-5">
                                        <div className="flex items-center gap-4 mb-2">
                                            <h3 className="text-[12px] font-bold uppercase text-slate-400">
                                                {category}
                                            </h3>
                                            <div 
                                                className="w-1.5 h-1.5 rounded-full" 
                                                style={{ 
                                                    backgroundColor: courses[0]?.color, 
                                                    color: courses[0]?.color 
                                                }} 
                                            />
                                            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                                        </div>
                                        <div className="space-y-4">
                                            {courses.map((course, i) => (
                                                <motion.div 
                                                    key={`${category}-${i}`} 
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    whileHover={{ y: -4, borderColor: `${course.color}66` }}
                                                    onClick={() => setContactCourse({ name: course.name, title: course.name })}
                                                    className="group relative p-4 rounded-2xl premium-dark-surface backdrop-blur-sm transition-all duration-300 cursor-pointer overflow-hidden"
                                                >
                                                    <div className="relative z-10 flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-white/7 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                                                            {course.icon && (
                                                                <course.icon 
                                                                    className="text-2xl transition-all duration-500 relative z-10" 
                                                                    style={{ color: course.color }} 
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-[14px] font-bold text-white group-hover:text-white transition-colors truncate">
                                                                {course.name}
                                                            </div>
                                                            <div className="flex items-center gap-2 mt-0.5">
                                                                <span className="text-[11px] font-extrabold" style={{ color: course.color }}>{course.price}</span>
                                                                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-white/6 text-slate-400 font-bold uppercase border border-white/8">Lab Access</span>
                                                            </div>
                                                        </div>
                                                        <div className="w-8 h-8 rounded-full bg-white/6 border border-white/8 flex items-center justify-center text-white/50 group-hover:bg-white group-hover:text-[#06101d] transition-all">
                                                            <div className="text-xl font-light">+</div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Contact Modal */}
                <AnimatePresence>
                    {contactCourse && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setContactCourse(null)}
                                className="absolute inset-0 bg-black/80 backdrop-blur-lg"
                            />
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                                className="relative w-full max-w-[400px] bg-[#03070d]/96 border border-white/12 rounded-[28px] p-8 md:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.55)] overflow-hidden backdrop-blur-2xl"
                            >
                                <button onClick={() => setContactCourse(null)} className="absolute top-7 right-7 text-white/30 hover:text-white transition-colors z-20"><FaTimes /></button>
                                
                                <div className="text-center relative z-10">
                                    <div className="w-20 h-20 rounded-2xl bg-white/7 border border-white/10 flex items-center justify-center mx-auto mb-8 text-white text-3xl font-light">
                                        +
                                    </div>
                                    <h2 className="text-3xl font-extrabold mb-4 text-white">Join Program</h2>
                                    <p className="text-base text-slate-400 mb-10 font-normal leading-relaxed">
                                        Confirm your seat for <span className="text-white font-bold underline decoration-purple-500 underline-offset-4">{contactCourse.title || contactCourse.name}</span>.
                                    </p>

                                    <div className="flex flex-col gap-5">
                                        <motion.button 
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => openWhatsApp(contactCourse.title || contactCourse.name)}
                                            className="w-full py-5 bg-[#06101d] border border-white/12 text-white rounded-full font-bold text-[16px] flex items-center justify-center gap-3 transition-all"
                                        >
                                            <FaWhatsapp className="text-2xl" /> WhatsApp Support
                                        </motion.button>
                                        <motion.button 
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={callOwner}
                                            className="w-full py-5 bg-white text-[#06101d] rounded-full font-bold text-[16px] flex items-center justify-center gap-3 transition-all"
                                        >
                                            <FaPhoneAlt className="text-sm" /> Call Direct
                                        </motion.button>
                                    </div>
                                    
                                    <div className="mt-10 pt-7 border-t border-white/5">
                                        <p className="text-[11px] text-slate-500 font-bold uppercase">AlgoForce Labs Support</p>
                                    </div>
                                </div>

                                {/* Background accents for modal */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#8f38ff]/10 blur-[60px] rounded-full pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#062f4f]/20 blur-[60px] rounded-full pointer-events-none" />
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Floating Navigation / Micro-interaction style footer if needed */}
        </div>
    )
}

export default Labs
