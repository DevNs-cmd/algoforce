import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaGraduationCap, FaCode, FaRobot, FaChartLine, FaCloud, FaShieldAlt, FaRocket, FaCheck, FaArrowRight, FaPlayCircle, FaUsers, FaAward, FaTimes } from 'react-icons/fa'
import { useState } from 'react'

const Labs = () => {
    const [showProspectus, setShowProspectus] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    
    const courses = [
        {
            id: 'ai-ml',
            category: 'AI & Machine Learning',
            title: 'AI / ML Pro Masterclass',
            rating: '4.8',
            students: '1.2k+',
            price: '$89',
            oldPrice: '$179',
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
            price: '$119',
            oldPrice: '$239',
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
            price: '$3',
            oldPrice: '$119',
            icon: <FaChartLine />,
            color: 'bg-indigo-600',
            shadow: 'shadow-indigo-200',
            features: ['Advanced MS Excel', 'Power BI & Tableau', 'SQL for Data Science', 'Business Strategy'],
            learningPath: 'Completed in 100 Days • 8 Modules • Career Focused'
        },
        {
            id: 'excel-pro',
            category: 'Data Analytics',
            title: 'Excel Mastery Pro',
            rating: '4.6',
            students: '3.2k+',
            price: '$19',
            oldPrice: '$89',
            icon: <FaChartLine />,
            color: 'bg-green-600',
            shadow: 'shadow-green-200',
            features: ['Advanced Formulas', 'Pivot Tables & Charts', 'Data Visualization', 'Dashboard Creation'],
            learningPath: '1 Month • 6 Modules • Quick Start'
        },
        {
            id: 'python-basics',
            category: 'Programming',
            title: 'Python for Beginners',
            rating: '4.8',
            students: '4.1k+',
            price: '$29',
            oldPrice: '$99',
            icon: <FaCode />,
            color: 'bg-blue-600',
            shadow: 'shadow-blue-200',
            features: ['Python Fundamentals', 'Data Structures', 'File Handling', 'Basic Projects'],
            learningPath: '1.5 Months • 10 Modules • Beginner Friendly'
        },
        {
            id: 'digital-marketing',
            category: 'Marketing',
            title: 'Digital Marketing Essentials',
            rating: '4.5',
            students: '2.8k+',
            price: '$39',
            oldPrice: '$129',
            icon: <FaRocket />,
            color: 'bg-purple-600',
            shadow: 'shadow-purple-200',
            features: ['SEO Fundamentals', 'Social Media Marketing', 'Content Strategy', 'Google Ads Basics'],
            learningPath: '1 Month • 8 Modules • Practical Skills'
        },
        {
            id: 'sql-mastery',
            category: 'Data Science',
            title: 'SQL Database Mastery',
            rating: '4.7',
            students: '1.9k+',
            price: '$25',
            oldPrice: '$79',
            icon: <FaChartLine />,
            color: 'bg-orange-600',
            shadow: 'shadow-orange-200',
            features: ['SQL Fundamentals', 'Advanced Queries', 'Database Design', 'Performance Optimization'],
            learningPath: '1 Month • 7 Modules • Job Ready'
        },
        {
            id: 'web-basics',
            category: 'Web Development',
            title: 'HTML & CSS Fundamentals',
            rating: '4.6',
            students: '5.2k+',
            price: '$15',
            oldPrice: '$69',
            icon: <FaCode />,
            color: 'bg-pink-600',
            shadow: 'shadow-pink-200',
            features: ['HTML5 Essentials', 'CSS3 Styling', 'Responsive Design', 'Basic JavaScript'],
            learningPath: '3 Weeks • 5 Modules • Quick Learning'
        },
        {
            id: 'fullstack',
            category: 'Software Engineering',
            title: 'Full Stack MERN Mastery',
            rating: '4.8',
            students: '1.5k+',
            price: '$149',
            oldPrice: '$179',
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
            price: '$129',
            oldPrice: '$203',
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
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-to-b from-purple-50 to-transparent opacity-40" />
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10 text-center">
                        <div>
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
                                <button 
                                    onClick={() => setShowProspectus(true)}
                                    className="px-8 py-4 border border-gray-200 text-gray-700 rounded-xl font-bold text-lg hover:bg-white hover:shadow-lg transition-all"
                                >
                                    Prospectus
                                </button>
                            </div>
                        </div>
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
                                <div
                                    key={course.id}
                                    className="bg-white border border-gray-100 rounded-2xl sm:rounded-[32px] p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group"
                                >
                                    <div className="flex justify-between items-start mb-8">
                                        <div className={`w-14 h-14 ${course.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}>
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
                                        <button
                                            onClick={() => setSelectedCourse(course)}
                                            className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold text-sm uppercase tracking-widest transition-all ${course.id === 'gen-ai' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'bg-gray-900 text-white hover:bg-purple-600'}`}
                                        >
                                            <img src="https://razorpay.com/favicon.png" alt="Razorpay" className="w-4 h-4 invert" />
                                            Enroll Now
                                        </button>
                                    </div>
                                </div>
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

            {/* PROSPECTUS POPUP */}
            {showProspectus && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                            <h2 className="text-3xl font-bold text-gray-900">Course Prospectus</h2>
                            <button
                                onClick={() => setShowProspectus(false)}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <FaTimes size={24} className="text-gray-600" />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
                            <div className="mb-8 text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">AlgoForce Labs Course Catalog 2026</h3>
                                <p className="text-gray-600 max-w-3xl mx-auto">
                                    Discover our comprehensive range of industry-focused courses designed to accelerate your career in AI, Data Science, Web Development, and emerging technologies. All courses include hands-on projects, certification, and career support.
                                </p>
                                <div className="flex justify-center gap-8 mt-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                                        <span className="text-gray-600">Beginner Friendly</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                        <span className="text-gray-600">Industry Projects</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                        <span className="text-gray-600">Certification</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courses.map((course) => (
                                    <div key={course.id} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-purple-200">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`w-14 h-14 ${course.color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}>
                                                {course.icon}
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{course.category}</div>
                                                <div className="flex items-center gap-1 justify-end text-sm font-bold text-amber-500">
                                                    <span>★</span> {course.rating}
                                                    <span className="text-gray-400 text-xs">({course.students})</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{course.title}</h3>
                                        
                                        <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                                            <div className="text-xs font-semibold text-purple-700 uppercase tracking-widest mb-1">What You'll Learn</div>
                                            <div className="space-y-2">
                                                {course.features.map((feature, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                                        <FaCheck className="text-purple-600 text-xs flex-shrink-0" />
                                                        <span>{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                                            <div className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-1">Program Details</div>
                                            <div className="text-sm text-gray-700">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <FaGraduationCap className="text-blue-600 text-xs" />
                                                    <span>{course.learningPath}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FaAward className="text-blue-600 text-xs" />
                                                    <span>Industry-Recognized Certificate</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-baseline gap-2 mb-4 p-3 bg-green-50 rounded-lg">
                                            <span className="text-2xl font-bold text-green-700">{course.price}</span>
                                            <span className="text-sm text-gray-400 line-through">{course.oldPrice}</span>
                                            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full font-semibold">
                                                {Math.round((1 - parseInt(course.price.replace('$', '')) / parseInt(course.oldPrice.replace('$', ''))) * 100)}% OFF
                                            </span>
                                        </div>
                                        
                                        <div className="text-xs text-gray-500 text-center font-medium">
                                            Limited seats available • Enroll now to secure your spot
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-8 p-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white text-center">
                                <h4 className="text-2xl font-bold mb-3">Ready to Start Your Learning Journey?</h4>
                                <p className="mb-6 opacity-90">Join over 5,000+ professionals who have transformed their careers with AlgoForce Labs.</p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <a
                                        href={RAZORPAY_PAYMENT_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-8 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                                    >
                                        <img src="https://razorpay.com/favicon.png" alt="Razorpay" className="w-4 h-4" />
                                        Enroll Now
                                    </a>
                                    <button
                                        onClick={() => setShowProspectus(false)}
                                        className="px-8 py-3 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-purple-600 transition-all"
                                    >
                                        Close Prospectus
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* COURSE ENROLLMENT POPUP */}
            {selectedCourse && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className={`w-16 h-16 ${selectedCourse.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}>
                                    {selectedCourse.icon}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
                                    <div className="flex items-center gap-4 mt-1">
                                        <div className="flex items-center gap-1">
                                            <span>★</span> {selectedCourse.rating}
                                        </div>
                                        <div className="text-sm opacity-90">{selectedCourse.students} Learners</div>
                                        <div className="text-sm opacity-90">{selectedCourse.category}</div>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedCourse(null)}
                                className="p-2 rounded-full hover:bg-white/20 transition-colors"
                            >
                                <FaTimes size={24} className="text-white" />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Left Column - Course Details */}
                                <div>
                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <FaGraduationCap className="text-purple-600" />
                                            What You'll Master
                                        </h3>
                                        <div className="space-y-3">
                                            {selectedCourse.features.map((feature, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <FaCheck className="text-purple-600 mt-1 flex-shrink-0" />
                                                    <span className="text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-6 p-4 bg-purple-50 rounded-xl">
                                        <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                                            <FaAward className="text-purple-600" />
                                            Program Structure
                                        </h4>
                                        <div className="text-gray-700">
                                            <div className="mb-2">
                                                <span className="font-semibold">Duration:</span> {selectedCourse.learningPath}
                                            </div>
                                            <div className="mb-2">
                                                <span className="font-semibold">Format:</span> Online + Live Sessions
                                            </div>
                                            <div>
                                                <span className="font-semibold">Certificate:</span> Industry-Recognized Completion Certificate
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-blue-50 rounded-xl">
                                        <h4 className="font-bold text-blue-900 mb-3">Why Choose This Course?</h4>
                                        <ul className="space-y-2 text-gray-700 text-sm">
                                            <li>• Hands-on projects with real-world applications</li>
                                            <li>• Expert instructors from top tech companies</li>
                                            <li>• Lifetime access to course materials</li>
                                            <li>• Career support and job placement assistance</li>
                                            <li>• Active community of 5,000+ learners</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Right Column - Enrollment */}
                                <div>
                                    <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white mb-6">
                                        <div className="text-center mb-6">
                                            <div className="text-sm uppercase tracking-widest mb-2 opacity-90">Limited Time Offer</div>
                                            <div className="flex items-baseline justify-center gap-3 mb-2">
                                                <span className="text-5xl font-bold">{selectedCourse.price}</span>
                                                <span className="text-xl line-through opacity-70">{selectedCourse.oldPrice}</span>
                                            </div>
                                            <div className="bg-white/20 inline-block px-3 py-1 rounded-full text-sm font-semibold">
                                                {Math.round((1 - parseInt(selectedCourse.price.replace('$', '')) / parseInt(selectedCourse.oldPrice.replace('$', ''))) * 100)}% OFF
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center gap-2">
                                                <FaCheck className="text-green-400" />
                                                <span className="text-sm">Instant course access</span>
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <FaCheck className="text-green-400" />
                                                <span className="text-sm">Certificate upon completion</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaCheck className="text-green-400" />
                                                <span className="text-sm">30-day money-back guarantee</span>
                                            </div>
                                        </div>

                                        <a
                                            href={RAZORPAY_PAYMENT_LINK}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-3 shadow-lg"
                                        >
                                            <img src="https://razorpay.com/favicon.png" alt="Razorpay" className="w-5 h-5" />
                                            Enroll Now - Pay with Razorpay
                                        </a>
                                        
                                        <div className="mt-4 text-center text-xs opacity-80">
                                            🔒 Secure payment via Razorpay • Instant access after payment
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <h4 className="font-bold text-gray-900 mb-3">Still Have Questions?</h4>
                                        <p className="text-gray-600 text-sm mb-4">
                                            Our course advisors are here to help you choose the right path for your career goals.
                                        </p>
                                        <Link 
                                            to="/contact"
                                            className="w-full py-2 border border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors text-center block"
                                        >
                                            Talk to an Advisor
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    )
}

export default Labs
