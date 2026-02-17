import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import { FaGraduationCap, FaCode, FaRobot, FaChartLine, FaCloud, FaShieldAlt, FaRocket, FaCheck, FaArrowRight, FaPlayCircle, FaUsers, FaAward } from 'react-icons/fa'

const Labs = () => {
    const courses = [
        {
            id: 'ai-ml',
            category: 'AI & Machine Learning',
            title: 'AI / ML Pro Masterclass',
            rating: '4.8',
            students: '1.2k+',
            price: '$179',
            oldPrice: '$299',
            icon: <FaRobot />,
            color: 'bg-violet-600',
            shadow: 'shadow-violet-200',
            features: ['Foundations & Math', 'ML with Python', 'Deep Learning Spec', 'Computer Vision'],
            learningPath: '3 Months • 12 Modules • Certificated'
        },
        {
            id: 'gen-ai',
            category: 'Generative AI',
            title: 'LLM Ops & Generative Engineering',
            rating: '4.9',
            students: '800+',
            price: '$239',
            oldPrice: '$359',
            icon: <FaPlayCircle />,
            color: 'bg-sky-600',
            shadow: 'shadow-sky-200',
            features: ['Generative Engineering', 'LLM Development', 'Prompt Engineering', 'RAG System Design'],
            learningPath: '4 Months • 15 Modules • Project-Based'
        },
        {
            id: 'analytics',
            category: 'Data Analytics',
            title: 'Business Analyst Mastery',
            rating: '4.7',
            students: '2.5k+',
            price: '$119',
            oldPrice: '$191',
            icon: <FaChartLine />,
            color: 'bg-indigo-600',
            shadow: 'shadow-indigo-200',
            features: ['Advanced MS Excel', 'Power BI & Tableau', 'SQL for Data Science', 'Business Strategy'],
            learningPath: '2 Months • 8 Modules • Career Focused'
        },
        {
            id: 'fullstack',
            category: 'Software Engineering',
            title: 'Full Stack MERN Mastery',
            rating: '4.8',
            students: '1.5k+',
            price: '$179',
            oldPrice: '$299',
            icon: <FaCode />,
            color: 'bg-gray-900',
            shadow: 'shadow-gray-200',
            features: ['Advanced React.js', 'Node/Express Backend', 'MongoDB Architecture', 'API Engineering'],
            learningPath: '4 Months • 20 Modules • Portfolio Ready'
        },
        {
            id: 'devops',
            category: 'Cloud & Cyber',
            title: 'Cloud Architect & Cyber Defense',
            rating: '4.6',
            students: '600+',
            price: '$203',
            oldPrice: '$323',
            icon: <FaShieldAlt />,
            color: 'bg-emerald-600',
            shadow: 'shadow-emerald-200',
            features: ['AWS / Azure Cloud', 'DevOps & CI/CD', 'Secure AI Systems', 'Cyber Fundamentals'],
            learningPath: '3 Months • 14 Modules • Industry Hands-on'
        },
        {
            id: 'capstone',
            category: 'Applied Engineering',
            title: 'Industry Capstone Labs',
            rating: '4.9',
            students: '400+',
            price: '$299',
            oldPrice: '$419',
            icon: <FaRocket />,
            color: 'bg-orange-600',
            shadow: 'shadow-orange-200',
            features: ['Real-world Industry Projects', 'Startup MVP Build', 'Corporate Workflows', 'Final Deployment'],
            learningPath: '6 Months • Intensive • Placement Support'
        }
    ]

    const RAZORPAY_PAYMENT_LINK = "https://rzp.io/l/algoforce-labs-enroll" // REPLACE THIS WITH REAL LINK

    return (
        <>
            <Helmet>
                <title>AlgoForce Labs – Industrial AI & Software Lab</title>
                <meta
                    name="description"
                    content="Join India's most aggressive AI & Software Engineering Lab. Industry-grade courses designed for global professional execution."
                />
            </Helmet>

            <div className="min-h-screen bg-[#FDFDFF] pt-24 overflow-hidden">
                {/* HERO SECTION: Labs Branding */}
                <section className="relative py-20 px-6">
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-purple-50 to-transparent opacity-60" />
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 5, 0]
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-40 right-[10%] w-64 h-64 bg-purple-200/20 blur-[100px] rounded-full"
                        />
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 text-white text-[10px] font-bold uppercase tracking-widest mb-8">
                                <FaGraduationCap className="text-sm" /> AlgoForce Labs
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
                                Architect Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Future Scope</span>
                            </h1>
                            <p className="max-w-3xl mx-auto text-xl text-gray-600 mb-10 leading-relaxed">
                                Move beyond theory. Join 5,000+ professionals learning the "AlgoForce Method" to dominate AI, Analytics, and Modern Engineering.
                            </p>

                            <div className="flex flex-wrap justify-center gap-12 mb-16 opacity-60">
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl font-bold text-gray-900">5k+</span>
                                    <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Students<br />Enrolled</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl font-bold text-gray-900">12+</span>
                                    <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Specialized<br />Tracks</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl font-bold text-gray-900">95%</span>
                                    <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Placement<br />Support</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href={RAZORPAY_PAYMENT_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-700 transition-all shadow-xl shadow-purple-200 flex items-center gap-3"
                                >
                                    <img src="https://razorpay.com/favicon.png" alt="Razorpay" className="w-5 h-5 invert" />
                                    Enroll Now
                                </a>
                                <button className="px-8 py-4 border border-gray-200 text-gray-700 rounded-xl font-bold text-lg hover:bg-white hover:shadow-lg transition-all">
                                    Download Prospectus
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* COURSE GRID */}
                <section className="py-24 px-6 relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-end mb-16 reveal">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">Master Syllabus</h2>
                                <div className="w-20 h-1.5 bg-purple-600 rounded-full" />
                            </div>
                            <p className="text-gray-500 max-w-md hidden md:block italic">
                                "We don't teach. We deploy talent into the most aggressive technology verticals on earth."
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {courses.map((course, index) => (
                                <motion.div
                                    key={course.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="bg-white border border-gray-100 rounded-2xl sm:rounded-[32px] p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group"
                                >
                                    <div className="flex justify-between items-start mb-8">
                                        <div className={`w-14 h-14 ${course.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg ${course.shadow} group-hover:rotate-12 transition-transform`}>
                                            {course.icon}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{course.category}</div>
                                            <div className="flex items-center gap-1 justify-end text-sm font-bold text-amber-500">
                                                <span>★</span> {course.rating}
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-purple-600 transition-colors">
                                        {course.title}
                                    </h3>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <FaUsers /> {course.students} Learners
                                    </div>

                                    <ul className="space-y-3 mb-10 flex-grow">
                                        {course.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                                                <FaCheck className="text-purple-600 text-xs flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="pt-6 border-t border-gray-50 mt-auto">
                                        <div className="flex items-baseline gap-2 mb-6">
                                            <span className="text-3xl font-bold text-gray-900">{course.price}</span>
                                            <span className="text-sm text-gray-400 line-through">{course.oldPrice}</span>
                                        </div>
                                        <a
                                            href={RAZORPAY_PAYMENT_LINK}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold text-sm uppercase tracking-widest transition-all ${course.id === 'gen-ai' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'bg-gray-900 text-white hover:bg-purple-600'}`}
                                        >
                                            <img src="https://razorpay.com/favicon.png" alt="Razorpay" className="w-4 h-4 invert" />
                                            Enroll Now
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* WHY JOIN LABS */}
                <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <h2 className="text-4xl font-bold mb-16">Why AlgoForce Labs?</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="p-8">
                                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 text-purple-400">
                                    <FaPlayCircle />
                                </div>
                                <h3 className="text-xl font-bold mb-4">Hands-on Deployment</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">No generic theory. Every module ends with a real-world deployment on cloud or production servers.</p>
                            </div>
                            <div className="p-8">
                                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 text-blue-400">
                                    <FaAward />
                                </div>
                                <h3 className="text-xl font-bold mb-4">Industrial Certification</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">Get recognized by global tech partners. Our certificates carry weight in recruitment circles.</p>
                            </div>
                            <div className="p-8">
                                <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 text-orange-400">
                                    <FaRocket />
                                </div>
                                <h3 className="text-xl font-bold mb-4">Aggressive Growth</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">We focus on high-yield skills that actually pay. Accelerated paths for fast-track professionals.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FINAL CTA */}
                <section className="py-32 bg-white text-center px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Ready to Accelerate Your Career?</h2>
                        <p className="text-xl text-gray-600 mb-12">Limited seats available for the winter cohort. Join the next generation of engineers.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <a
                                href={RAZORPAY_PAYMENT_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-12 py-5 bg-purple-600 text-white rounded-2xl font-bold text-xl hover:bg-purple-700 transition-all shadow-2xl shadow-purple-500/30 flex items-center justify-center gap-3"
                            >
                                <img src="https://razorpay.com/favicon.png" alt="Razorpay" className="w-6 h-6 invert" />
                                Join the Labs
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Labs
