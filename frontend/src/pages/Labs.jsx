import { Helmet } from "react-helmet-async"
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef, useMemo } from 'react'
import { FaCheck, FaWhatsapp, FaPhoneAlt, FaTimes, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaAws, FaDocker, FaGitAlt, FaGithub, FaDatabase, FaJava, FaPython, FaGraduationCap, FaCode, FaChartBar, FaRobot, FaKeyboard, FaGlobe, FaFileExcel, FaBrain, FaRocket, FaArrowRight } from 'react-icons/fa'
import { SiC, SiCplusplus, SiMongodb, SiFirebase, SiMysql, SiTailwindcss, SiNextdotjs } from 'react-icons/si'
import { Link } from 'react-router-dom'

const SECTIONS = {
    mega: [
        { 
            title: 'BTech / BCA Complete Pack', 
            description: 'Full software engineering roadmap.',
            price: '₹7,999', 
            originalPrice: '₹45,000',
            label: 'Popular',
            icon: FaGraduationCap,
            color: '#A855F7',
            features: ['Internship certificate', 'Placement support', '5+ projects', 'Portfolio building']
        },
        { 
            title: 'Full Stack MERN Pack', 
            description: 'Master architecture to deployment.',
            price: '₹8,999', 
            originalPrice: '₹35,000',
            label: 'Trending',
            icon: FaCode,
            color: '#00FF87',
            features: ['MERN certification', 'Cloud deployment', 'API patterns', 'Database logic']
        },
        { 
            title: 'Data Analytics + AI', 
            description: 'Data engineering & AI insights.',
            price: '₹6,999', 
            originalPrice: '₹30,000',
            label: 'High ROI',
            icon: FaChartBar,
            color: '#00D2FF',
            features: ['BI mastery', 'SQL architecture', 'ML foundations', 'Power BI']
        },
        { 
            title: 'AI + Future Tech', 
            description: 'Agentic automation and LLMs.',
            price: '₹5,999', 
            originalPrice: '₹25,000',
            label: 'Advanced',
            icon: FaRobot,
            color: '#FF00CC',
            features: ['Agentic workflows', 'Prompt engineering', 'AI automations', 'Startup logic']
        }
    ],
    mini: [
        { title: 'Programming Starter', description: 'Foundation logic.', price: '₹2,499', originalPrice: '₹8,000', icon: FaKeyboard, color: '#00D2FF' },
        { title: 'Web Dev Starter', description: 'Core web technologies.', price: '₹2,999', originalPrice: '₹10,000', icon: FaGlobe, color: '#00FF87' },
        { title: 'Python + SQL Pack', description: 'Data science basics.', price: '₹3,499', originalPrice: '₹12,000', icon: FaPython, color: '#FF8C00' },
        { title: 'Excel + Power BI', description: 'Business analytics.', price: '₹2,999', originalPrice: '₹9,000', icon: FaFileExcel, color: '#00D2FF' },
        { title: 'Java + DSA Pack', description: 'Advanced logic.', price: '₹3,999', originalPrice: '₹15,000', icon: FaBrain, color: '#A855F7' }
    ],
    single: {
        Programming: [
            { name: 'C Programming', price: '₹999', icon: SiC, color: '#00D2FF' },
            { name: 'C++ Mastery', price: '₹1,499', icon: SiCplusplus, color: '#00D2FF' },
            { name: 'Java Core', price: '₹1,999', icon: FaJava, color: '#00D2FF' },
            { name: 'Python Pro', price: '₹1,999', icon: FaPython, color: '#00D2FF' }
        ],
        Development: [
            { name: 'HTML + CSS', price: '₹999', icon: FaHtml5, color: '#00FF87' },
            { name: 'JavaScript', price: '₹1,499', icon: FaJs, color: '#00FF87' },
            { name: 'React.js', price: '₹2,499', icon: FaReact, color: '#00FF87' },
            { name: 'Node.js', price: '₹2,499', icon: FaNodeJs, color: '#00FF87' }
        ],
        Cloud: [
            { name: 'AWS Basics', price: '₹1,499', icon: FaAws, color: '#FF8C00' },
            { name: 'Docker + K8s', price: '₹2,499', icon: FaDocker, color: '#FF8C00' },
            { name: 'Git + GitHub', price: '₹999', icon: FaGithub, color: '#FF8C00' }
        ],
        Database: [
            { name: 'SQL Mastery', price: '₹1,499', icon: FaDatabase, color: '#FF00CC' },
            { name: 'MongoDB', price: '₹1,999', icon: SiMongodb, color: '#FF00CC' },
            { name: 'Firebase', price: '₹1,499', icon: SiFirebase, color: '#FF00CC' }
        ]
    },
    premium: [
        { 
            title: 'Founders Execution Track', 
            description: 'For students building startups.',
            price: '₹14,999', 
            originalPrice: '₹65,000',
            label: 'Premium',
            icon: FaRocket,
            color: '#A855F7',
            features: ['Career mentorship', 'Industry projects', 'Mock interviews', 'Internship']
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

    // Theme transition: Dark -> Subtle Purple -> Dark (Optimized)
    const backgroundOverlay = useTransform(
        scrollYProgress,
        [0, 0.4, 0.6, 1],
        ["rgba(10, 10, 10, 1)", "rgba(20, 10, 40, 1)", "rgba(30, 15, 60, 0.7)", "rgba(10, 10, 10, 1)"]
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
        <div ref={containerRef} className="relative min-h-screen bg-[#0A0A0A]">
            <Helmet>
                <title>AlgoForce Labs – MSME Certified AI Training & Internships</title>
                <meta name="description" content="AlgoForce Labs provides MSME-certified AI training, BTech/BCA internships, and professional certifications. Master MERN, Python, and AI automation now." />
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
                <meta property="og:title" content="AlgoForce Labs – Industrial AI Training & Internships" />
                <meta property="og:description" content="Professional AI certification and industrial internship programs for BTech/BCA students." />
                <meta property="og:image" content="https://www.algoforceaii.com/og-labs.png" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            {/* Dynamic 3D Liquid Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <motion.div
                    animate={{
                        x: ['-20%', '10%', '-20%'],
                        y: ['-10%', '20%', '-10%'],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-5%] left-[-5%] w-[800px] h-[800px] bg-purple-600/5 blur-[120px] rounded-full transform-gpu will-change-transform"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 20, 0],
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] right-[10%] w-[700px] h-[700px] bg-blue-600/5 blur-[100px] rounded-full transform-gpu will-change-transform"
                />
                <motion.div
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute top-[30%] left-[40%] w-[600px] h-[600px] bg-purple-500/5 blur-[150px] rounded-full transform-gpu"
                />
            </div>

            {/* Scroll-driven Theme Overlay */}
            <motion.div 
                style={{ backgroundColor: backgroundOverlay }} 
                className="fixed inset-0 pointer-events-none z-[1] transition-colors duration-1000" 
            />

            <div className="relative z-10 pt-16 md:pt-24 pb-6 md:pb-8 selection:bg-purple-500/30">
                
                <div className="max-w-6xl mx-auto px-6 mb-2 md:mb-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-center lg:text-left"
                        >
                            {/* Dual Trust Badges */}
                            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mb-6 md:mb-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl shadow-xl"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)] animate-pulse" />
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gray-500 whitespace-nowrap">Startup Execution Engine</span>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl shadow-xl"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_10px_#22c55e] animate-pulse" />
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gray-500 whitespace-nowrap">Govt Registered MSME</span>
                                </motion.div>
                            </div>

                            <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-none">
                                Real AI Projects <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-white italic">You Will Build.</span>
                            </h1>
                            <p className="text-sm md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 font-medium opacity-80 leading-relaxed mb-12 italic">
                                Stop following tutorials. Start building production-grade AI systems. <br className="hidden md:block" />
                                Master tools like OpenAI, LangChain, and MERN with hands-on labs.
                            </p>

                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="relative flex justify-center items-center"
                        >
                            <div className="absolute inset-0 bg-purple-600/20 blur-[120px] rounded-full -z-10 animate-pulse" />
                            <motion.div
                                animate={{
                                    y: [0, -15, 0],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden bg-white p-6 shadow-2xl border-4 border-white/10 group hover:scale-105 transition-transform cursor-pointer transform-gpu"
                            >
                                <img 
                                    src="/logo.png" 
                                    alt="AlgoForce Logo" 
                                    className="w-full h-full object-contain" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>



                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black mb-10 tracking-tighter uppercase italic text-gray-500">
                        Choose Your <span className="text-white">Track.</span>
                    </h2>
                </div>
                <div className={`sticky top-20 z-50 flex justify-center px-4 mb-4 md:mb-8 transition-all duration-500 ${isScrolled ? 'opacity-100 scale-95' : 'opacity-100'}`}>
                    <div className="bg-[#141414]/60 backdrop-blur-3xl border border-white/5 rounded-[2rem] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-x-auto no-scrollbar max-w-full">
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
                                    className={`relative px-8 md:px-12 py-3.5 rounded-full font-bold text-[13px] md:text-[14px] transition-all duration-300 whitespace-nowrap min-w-max flex-shrink-0 ${
                                        activeTab === tab.id ? 'text-black' : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="active-ios-tab"
                                            className="absolute inset-0 bg-white rounded-full shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
                                        />
                                    )}
                                    <span className="relative z-10">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div id="pricing-grid" className="max-w-7xl mx-auto px-6 py-6 md:py-12 border-t border-white/5 selection:bg-rose-500/20">
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
                                        whileHover={{ y: -10 }}
                                        className="group relative p-8 md:p-10 rounded-[2.5rem] bg-[#141414]/40 border border-white/10 backdrop-blur-xl transition-all duration-500 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-tr opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundImage: `linear-gradient(to top right, ${item.color}, transparent)` }} />
                                        
                                        <div className="flex justify-between items-start mb-10 relative z-10">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl shadow-2xl" style={{ color: item.color }}>
                                                    <item.icon />
                                                </div>
                                                <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60">
                                                    {item.label}
                                                </div>
                                            </div>
                                            <motion.button 
                                                whileHover={{ scale: 1.1, rotate: 90 }}
                                                onClick={() => setContactCourse(item)}
                                                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all text-white/20"
                                            >
                                                <div className="text-xl font-light">+</div>
                                            </motion.button>
                                        </div>

                                        <h3 className="text-3xl font-black mb-4 text-white group-hover:text-white transition-colors tracking-tight leading-tight relative z-10">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 mb-10 font-medium leading-relaxed opacity-80 relative z-10">
                                            {item.description}
                                        </p>
                                        
                                        <div className="space-y-4 mb-12 relative z-10 flex-1">
                                            {item.features.map(f => (
                                                <div key={f} className="flex items-center gap-4 text-[13px] text-gray-300 font-bold">
                                                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                                        <FaCheck className="text-[8px]" style={{ color: item.color }} />
                                                    </div>
                                                    {f}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                                            <div>
                                                <div className="text-[11px] text-white/20 font-black line-through mb-1 uppercase tracking-wider">{item.originalPrice}</div>
                                                <div className="text-3xl font-black text-white tracking-tighter" style={{ color: item.color }}>{item.price}</div>
                                            </div>
                                            <motion.button 
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setContactCourse(item)}
                                                className="px-10 py-4 bg-white text-black rounded-full font-black text-[14px] shadow-2xl transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
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
                                        whileHover={{ y: -10 }}
                                        className="p-8 rounded-[2.5rem] bg-[#141414]/40 border border-white/10 backdrop-blur-xl group transition-all duration-300 relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-tr opacity-0 group-hover:opacity-5 transition-opacity" style={{ backgroundImage: `linear-gradient(to top right, ${item.color}, transparent)` }} />
                                        
                                        <div className="flex justify-between items-start mb-8 relative z-10">
                                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl shadow-xl transition-transform duration-500 group-hover:scale-110" style={{ color: item.color }}>
                                                <item.icon />
                                            </div>
                                            <motion.button 
                                                whileHover={{ rotate: 90, scale: 1.2 }} 
                                                onClick={() => setContactCourse(item)} 
                                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:bg-white hover:text-black transition-all"
                                            >
                                                <span className="text-xl font-light">+</span>
                                            </motion.button>
                                        </div>
                                        <h4 className="text-[20px] font-black text-white tracking-tight mb-2 relative z-10">{item.title}</h4>
                                        <p className="text-[13px] text-gray-400 mb-10 leading-relaxed font-bold opacity-70 relative z-10">{item.description}</p>
                                        
                                        <div className="flex items-center justify-between pt-6 border-t border-white/5 relative z-10">
                                            <div>
                                                <div className="text-[10px] text-white/20 line-through mb-0.5 font-black uppercase tracking-wider">{item.originalPrice}</div>
                                                <div className="text-2xl font-black text-white tracking-tight" style={{ color: item.color }}>{item.price}</div>
                                            </div>
                                            <motion.button 
                                                whileHover={{ scale: 1.05 }}
                                                onClick={() => setContactCourse(item)}
                                                className="px-6 py-3 bg-white/10 border border-white/10 text-white rounded-full text-[12px] font-black transition-all hover:bg-white hover:text-black shadow-xl"
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
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
                            >
                                {Object.entries(SECTIONS.single).map(([category, courses]) => (
                                    <div key={category} className="space-y-8">
                                        <div className="flex items-center gap-4 mb-2">
                                            <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-white/40">
                                                {category}
                                            </h3>
                                            <div 
                                                className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_currentColor]" 
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
                                                    whileHover={{ 
                                                        y: -5,
                                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                                        borderColor: course.color + '40'
                                                    }}
                                                    onClick={() => setContactCourse({ name: course.name, title: course.name })}
                                                    className="group relative p-4 rounded-2xl bg-[#141414]/50 border border-white/5 backdrop-blur-sm transition-all duration-300 cursor-pointer overflow-hidden"
                                                >
                                                    {/* Hover Glow Effect */}
                                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                                        <div 
                                                            className="absolute -inset-[100%] animate-[spin_5s_linear_infinite]"
                                                            style={{
                                                                background: `conic-gradient(from 0deg, transparent 20%, ${course.color}20 50%, transparent 80%)`
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="relative z-10 flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl overflow-hidden">
                                                            {course.icon && (
                                                                <course.icon 
                                                                    className="text-2xl transition-all duration-500" 
                                                                    style={{ color: course.color }} 
                                                                />
                                                            )}
                                                            <div className="absolute inset-0 blur-md opacity-30 group-hover:opacity-50 transition-opacity" style={{ backgroundColor: course.color }} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-[14px] font-bold text-white group-hover:text-white transition-colors truncate">
                                                                {course.name}
                                                            </div>
                                                            <div className="flex items-center gap-2 mt-0.5">
                                                                <span className="text-[11px] font-black tracking-tighter" style={{ color: course.color }}>{course.price}</span>
                                                                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-white/5 text-white/40 font-bold uppercase tracking-widest border border-white/5">Lab Access</span>
                                                            </div>
                                                        </div>
                                                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/20 group-hover:bg-white group-hover:text-black transition-all">
                                                            <div className="text-xl font-light transform group-hover:rotate-90 transition-transform">+</div>
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
                                className="relative w-full max-w-[400px] bg-[#0F0F0F] border border-white/10 rounded-[3rem] p-10 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-3xl"
                            >
                                <button onClick={() => setContactCourse(null)} className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors z-20"><FaTimes /></button>
                                
                                <div className="text-center relative z-10">
                                    <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-10 text-white text-3xl font-light shadow-2xl">
                                        +
                                    </div>
                                    <h2 className="text-3xl font-black mb-4 tracking-tighter text-white">Join Program</h2>
                                    <p className="text-base text-gray-400 mb-12 font-medium leading-relaxed">
                                        Confirm your seat for <span className="text-white font-bold underline decoration-purple-500 underline-offset-4">{contactCourse.title || contactCourse.name}</span>.
                                    </p>

                                    <div className="flex flex-col gap-5">
                                        <motion.button 
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => openWhatsApp(contactCourse.title || contactCourse.name)}
                                            className="w-full py-5 bg-[#25D366] text-white rounded-full font-black text-[16px] flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(37,211,102,0.2)] hover:shadow-[0_20px_40px_rgba(37,211,102,0.3)] transition-all"
                                        >
                                            <FaWhatsapp className="text-2xl" /> WhatsApp Support
                                        </motion.button>
                                        <motion.button 
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={callOwner}
                                            className="w-full py-5 bg-white text-black rounded-full font-black text-[16px] flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(255,255,255,0.1)] transition-all"
                                        >
                                            <FaPhoneAlt className="text-sm" /> Call Direct
                                        </motion.button>
                                    </div>
                                    
                                    <div className="mt-12 pt-8 border-t border-white/5">
                                        <p className="text-[11px] text-white/20 font-black uppercase tracking-[0.4em]">AlgoForce Elite Support</p>
                                    </div>
                                </div>

                                {/* Background accents for modal */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-[60px] rounded-full pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full pointer-events-none" />
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
