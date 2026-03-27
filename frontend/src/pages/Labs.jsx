import { Helmet } from "react-helmet-async"
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef, useMemo } from 'react'
import { FaCheck, FaWhatsapp, FaPhoneAlt, FaTimes } from 'react-icons/fa'

const SECTIONS = {
    mega: [
        { 
            title: 'BTech / BCA Complete Pack', 
            description: 'Full software engineering roadmap.',
            price: '₹7,999', 
            originalPrice: '₹45,000',
            label: 'Popular',
            features: ['Internship certificate', 'Placement support', '5+ projects', 'Portfolio building']
        },
        { 
            title: 'Full Stack MERN Pack', 
            description: 'Master architecture to deployment.',
            price: '₹8,999', 
            originalPrice: '₹35,000',
            label: 'Trending',
            features: ['MERN certification', 'Cloud deployment', 'API patterns', 'Database logic']
        },
        { 
            title: 'Data Analytics + AI', 
            description: 'Data engineering & AI insights.',
            price: '₹6,999', 
            originalPrice: '₹30,000',
            label: 'High ROI',
            features: ['BI mastery', 'SQL architecture', 'ML foundations', 'Power BI']
        },
        { 
            title: 'AI + Future Tech', 
            description: 'Agentic automation and LLMs.',
            price: '₹5,999', 
            originalPrice: '₹25,000',
            label: 'Advanced',
            features: ['Agentic workflows', 'Prompt engineering', 'AI automations', 'Startup logic']
        }
    ],
    mini: [
        { title: 'Programming Starter', description: 'Foundation logic.', price: '₹2,499', originalPrice: '₹8,000' },
        { title: 'Web Dev Starter', description: 'Core web technologies.', price: '₹2,999', originalPrice: '₹10,000' },
        { title: 'Python + SQL Pack', description: 'Data science basics.', price: '₹3,499', originalPrice: '₹12,000' },
        { title: 'Excel + Power BI', description: 'Business analytics.', price: '₹2,999', originalPrice: '₹9,000' },
        { title: 'Java + DSA Pack', description: 'Advanced logic.', price: '₹3,999', originalPrice: '₹15,000' }
    ],
    single: {
        Programming: [
            { name: 'C Programming', price: '₹999' },
            { name: 'C++ Mastery', price: '₹1,499' },
            { name: 'Java Core', price: '₹1,999' },
            { name: 'Python Pro', price: '₹1,999' }
        ],
        Development: [
            { name: 'HTML + CSS', price: '₹999' },
            { name: 'JavaScript', price: '₹1,499' },
            { name: 'React.js', price: '₹2,499' },
            { name: 'Node.js', price: '₹2,499' }
        ],
        Cloud: [
            { name: 'AWS Basics', price: '₹1,499' },
            { name: 'Docker + K8s', price: '₹2,499' },
            { name: 'Git + GitHub', price: '₹999' }
        ],
        Database: [
            { name: 'SQL Mastery', price: '₹1,499' },
            { name: 'MongoDB', price: '₹1,999' },
            { name: 'Firebase', price: '₹1,499' }
        ]
    },
    premium: [
        { 
            title: 'Founders Execution Track', 
            description: 'For students building startups.',
            price: '₹14,999', 
            originalPrice: '₹65,000',
            label: 'Premium',
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
    const CONTACT_NUMBER = "+919315575744";

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 100);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                <title>AlgoForce Labs – MSME Certified AI Training & Industrial Internships | AlgoForce AI</title>
                <meta name="description" content="AlgoForce Labs provides industry-leading AI training, BTech/BCA internships, and professional certification programs. Master MERN, Python, and AI automation with MSME certification." />
                <link rel="canonical" href="https://www.algoforceaii.com/labs" />
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

            <div className="relative z-10 pt-40 pb-20 selection:bg-purple-500/30">
                
                <div className="max-w-6xl mx-auto px-6 mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-center lg:text-left"
                        >
                            {/* Dual Trust Badges */}
                            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mb-10">
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

                            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6 leading-tight">
                                Industry-level <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-white">programs.</span>
                            </h1>
                            <p className="text-sm md:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 font-medium opacity-80 leading-relaxed mb-10">
                                Professional certification for engineering students. <br className="hidden md:block" />
                                Learn how to build, ship, and scale your career assets.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => document.getElementById('pricing-grid').scrollIntoView({ behavior: 'smooth' })}
                                    className="w-full sm:w-auto px-10 py-4 bg-gradient-to-br from-[#7C3AED] to-[#A855F7] rounded-full font-semibold text-[15px] shadow-[0_10px_30px_rgba(124,58,237,0.3)] transition-all"
                                >
                                    Explore Programs
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => document.getElementById('pricing-grid').scrollIntoView({ behavior: 'smooth' })}
                                    className="w-full sm:w-auto px-10 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full font-semibold text-[15px] transition-all"
                                >
                                    View Pricing
                                </motion.button>
                            </div>
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

                {/* Tab Switcher - Apple Style Sticky */}
                <div className={`sticky top-8 z-50 flex justify-center px-4 mb-20 transition-all duration-500 ${isScrolled ? 'opacity-100 scale-95' : 'opacity-100'}`}>
                    <div className="bg-[#141414]/80 backdrop-blur-2xl border border-white/10 rounded-full p-1.5 shadow-2xl overflow-x-auto no-scrollbar max-w-full">
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
                                    className={`relative px-6 md:px-10 py-3 rounded-full font-bold text-[13px] md:text-[14px] transition-all duration-300 whitespace-nowrap min-w-max flex-shrink-0 ${
                                        activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                                    }`}
                                >
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="active-ios-tab"
                                            className="absolute inset-0 bg-white/10 rounded-full border border-white/10 shadow-[inset_0_1px_10px_rgba(255,255,255,0.05)]"
                                        />
                                    )}
                                    <span className="relative z-10">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div id="pricing-grid" className="max-w-6xl mx-auto px-6">
                    <AnimatePresence mode="wait">
                        {(activeTab === 'mega' || activeTab === 'premium') && (
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto lg:perspective-[2000px]"
                            >
                                {SECTIONS[activeTab].map((item, i) => (
                                    <motion.div 
                                        key={`${activeTab}-${item.title}`}
                                        whileHover={{ 
                                            y: -5,
                                            scale: 1.01,
                                            backgroundColor: 'rgba(20,20,20,0.9)'
                                        }}
                                        className="group relative flex flex-col p-8 rounded-[2.5rem] bg-[#111111]/80 backdrop-blur-xl border border-white/5 transition-all duration-300 transform-gpu will-change-transform overflow-hidden"
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="inline-flex px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-semibold uppercase tracking-widest">
                                                {item.label}
                                            </div>
                                            <motion.button 
                                                whileHover={{ scale: 1.2, rotate: 90 }}
                                                onClick={() => setContactCourse(item)}
                                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-gray-400 border border-white/5"
                                            >
                                                +
                                            </motion.button>
                                        </div>

                                        <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-purple-400 transition-colors tracking-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-400 mb-8 font-medium leading-relaxed opacity-80">
                                            {item.description}
                                        </p>
                                        
                                        <div className="space-y-3 mb-12 flex-1">
                                            {item.features.map(f => (
                                                <div key={f} className="flex items-center gap-3 text-[12px] text-gray-400 font-medium">
                                                    <FaCheck className="text-purple-600/60 text-[10px]" />
                                                    {f}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-8 border-t border-white/5 flex items-end justify-between">
                                            <div>
                                                <div className="text-[12px] text-gray-600 font-medium line-through opacity-50 mb-1">{item.originalPrice}</div>
                                                <div className="text-3xl font-semibold text-white tracking-tighter">{item.price}</div>
                                            </div>
                                            <motion.button 
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setContactCourse(item)}
                                                className="px-10 py-3.5 bg-gradient-to-br from-[#7C3AED] to-[#A855F7] rounded-full font-semibold text-[14px] shadow-lg shadow-purple-500/20"
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
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {SECTIONS.mini.map((item, i) => (
                                    <motion.div 
                                        key={`mini-${i}`} 
                                        whileHover={{ y: -5, scale: 1.01 }}
                                        className="p-8 rounded-[2rem] bg-[#111111]/80 backdrop-blur-xl border border-white/5 group transition-all duration-300 shadow-xl transform-gpu will-change-transform"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="text-[18px] font-semibold text-white/90 tracking-tight">{item.title}</h4>
                                            <motion.button whileHover={{ rotate: 90 }} onClick={() => setContactCourse(item)} className="text-gray-600 hover:text-white">+</motion.button>
                                        </div>
                                        <p className="text-[12px] text-gray-500 mb-8 leading-relaxed font-medium opacity-80">{item.description}</p>
                                        
                                        <div className="flex items-end justify-between pt-6 border-t border-white/5">
                                            <div>
                                                <div className="text-[10px] text-gray-600 line-through mb-1">{item.originalPrice}</div>
                                                <div className="text-2xl font-semibold text-white tracking-tight">{item.price}</div>
                                            </div>
                                            <motion.button 
                                                whileHover={{ scale: 1.05 }}
                                                onClick={() => setContactCourse(item)}
                                                className="px-6 py-2.5 bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 rounded-full text-[12px] font-semibold transition-all"
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
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                            >
                                {Object.entries(SECTIONS.single).map(([category, courses]) => (
                                    <div key={category} className="space-y-6">
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-purple-600 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                                            {category}
                                        </h3>
                                        <div className="space-y-2">
                                            {courses.map((course, i) => (
                                                <motion.div 
                                                    key={`${category}-${i}`} 
                                                    whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.03)' }}
                                                    onClick={() => setContactCourse({ name: course.name, title: course.name })}
                                                    className="p-4 rounded-[1.2rem] bg-[#111111]/50 border border-white/5 transition-all duration-200 transform-gpu will-change-transform flex items-center justify-between group cursor-pointer"
                                                >
                                                    <div>
                                                        <div className="text-[13px] font-medium text-gray-400 group-hover:text-white transition-colors">{course.name}</div>
                                                        <div className="text-[12px] text-purple-600/80 font-semibold mt-0.5">{course.price}</div>
                                                    </div>
                                                    <div className="w-6 h-6 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-[10px] group-hover:bg-white group-hover:text-black transition-all">
                                                        +
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
                                className="relative w-full max-w-[360px] bg-[#141414] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden"
                            >
                                <button onClick={() => setContactCourse(null)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"><FaTimes /></button>
                                
                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-3xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-8 text-purple-500 text-2xl font-light">
                                        +
                                    </div>
                                    <h2 className="text-2xl font-semibold mb-3 tracking-tight">Finalize Enrollment</h2>
                                    <p className="text-sm text-gray-500 mb-10 font-medium leading-relaxed">
                                        You are one step away from joining <span className="text-white font-semibold">{contactCourse.title || contactCourse.name}</span>.
                                    </p>

                                    <div className="flex flex-col gap-4">
                                        <motion.button 
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => openWhatsApp(contactCourse.title || contactCourse.name)}
                                            className="w-full py-5 bg-[#25D366] text-white rounded-full font-bold text-[15px] flex items-center justify-center gap-3 shadow-lg shadow-green-500/20"
                                        >
                                            <FaWhatsapp className="text-xl" /> WhatsApp Enroll
                                        </motion.button>
                                        <motion.button 
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={callOwner}
                                            className="w-full py-5 bg-white text-black rounded-full font-bold text-[15px] flex items-center justify-center gap-3 transition-transform"
                                        >
                                            <FaPhoneAlt className="text-sm" /> Call Directly
                                        </motion.button>
                                    </div>
                                    
                                    <div className="mt-10 pt-8 border-t border-white/5">
                                        <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em]">AlgoForce Execution Team</p>
                                    </div>
                                </div>
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
