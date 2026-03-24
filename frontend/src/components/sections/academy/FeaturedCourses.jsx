import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaTimes, FaCheckCircle, FaUsers, FaClock, FaCertificate, FaArrowRight } from 'react-icons/fa'

const FeaturedCourses = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);

    const courses = [
        {
            title: "Build Your First AI SaaS",
            instructor: "Dev N Suman",
            duration: "6 Weeks",
            level: "Intermediate",
            price: "As Asked By Merchant",
            badge: "Trending",
            badgeColor: "bg-purple-500",
            image: "/courses/saas.png",
            details: "Detailed masterclass on building and scaling your first AI SaaS. From ideation to deployment on GCP/AWS.",
            perks: ["Group Mentorship", "Beta Access to Nexus", "Source Code Included"]
        },
        {
            title: "Full Stack Web Dev Bootcamp",
            instructor: "Alex Rivera",
            duration: "12 Weeks",
            level: "Beginner",
            price: "$499",
            badge: "Popular",
            badgeColor: "bg-blue-500",
            details: "Comprehensive bootcamp covering MERN stack with modern UI/UX principles and enterprise-grade deployment.",
            perks: ["Industry Workflows", "Resume Review", "Job Assistance"]
        },
        {
            title: "AI Agents & Automation Systems",
            instructor: "Dev N Suman",
            duration: "8 Weeks",
            level: "Advanced",
            price: "As Asked By Merchant",
            badge: "Advanced",
            badgeColor: "bg-green-500",
            image: "/courses/ai.png",
            details: "Advanced autonomous agent architectures using LangChain and AutoGPT patterns for enterprise automation.",
            perks: ["LLM API Credits", "Private Discord Channel", "Weekly Code Reviews"]
        },
        {
            title: "Startup MVP in 7 Days",
            instructor: "Marcus Kael",
            duration: "1 Week",
            level: "All Levels",
            price: "$149",
            badge: "Intensive",
            badgeColor: "bg-orange-500",
            details: "The ultimate builder sprint. Go from zero to a functional MVP validated for the market in exactly one week.",
            perks: ["Lean Strategy Template", "Founder Cohort Access", "Investor Ready Pitch-deck"]
        }
    ]

    return (
        <section id="courses" className="bg-[#020205] py-24 px-6 relative">
            <div className="max-w-7xl mx-auto mb-20 text-center">
                <motion.h2 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter"
                >
                    Featured Labs
                </motion.h2>
                <p className="text-gray-400 font-medium max-w-2xl mx-auto text-sm md:text-lg">
                    Master the most in-demand technical skills through hands-on project-based learning.
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {courses.map((course, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.8 }}
                        className="group relative flex flex-col p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-white/20 backdrop-blur-3xl overflow-hidden transition-all duration-700 hover:bg-white/[0.06] shadow-2xl"
                    >
                        {/* Course Header/Badge */}
                        <div className="flex justify-between items-start mb-8">
                            <div className={`px-4 py-1.5 rounded-full ${course.badgeColor}/10 border border-${course.badgeColor}/30 text-${course.badgeColor} text-[10px] font-bold uppercase tracking-widest`}>
                                {course.badge}
                            </div>
                            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold uppercase tracking-widest text-gray-400">
                                {course.level}
                            </div>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-bold mb-4 leading-tight group-hover:text-purple-300 transition-colors">{course.title}</h3>
                            <p className="text-xs text-gray-500 mb-8 italic">Instructor: {course.instructor}</p>

                            <div className="space-y-4 mb-10 text-[11px] font-semibold text-gray-400">
                                <span className="flex items-center gap-3"><FaClock className="text-purple-500" /> {course.duration} Duration</span>
                                <span className="flex items-center gap-3"><FaCertificate className="text-blue-500" /> Professional Certification</span>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-white">{course.price}</span>
                                <span className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">Enrollment Fee</span>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCourse(course)}
                                className="px-6 py-3 bg-white text-black rounded-full font-bold text-xs shadow-lg"
                            >
                                Enroll Now
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ENROLLMENT MODAL */}
            <AnimatePresence>
                {selectedCourse && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCourse(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
                        />
                        
                        <motion.div
                            initial={{ scale: 0.95, y: 30, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 30, opacity: 0 }}
                            className="relative w-full max-w-[350px] sm:max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] p-8 md:p-14 shadow-2xl overflow-y-auto no-scrollbar max-h-[90vh]"
                        >
                            <button 
                                onClick={() => setSelectedCourse(null)}
                                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors text-xl z-50 p-2"
                            >
                                <FaTimes />
                            </button>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                                    <span className="text-[9px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-widest leading-none">Admission Open</span>
                                </div>

                                <h2 className="text-2xl md:text-5xl font-black mb-4 tracking-tight text-white leading-tight">
                                    {selectedCourse.title}
                                </h2>
                                
                                <p className="text-gray-400 text-xs md:text-lg mb-8 leading-relaxed font-medium italic opacity-80">
                                    {selectedCourse.details}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10">
                                    <div className="space-y-4">
                                        <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-400/80">Premium Benefits</h4>
                                        {selectedCourse.perks.map((perk, i) => (
                                            <div key={i} className="flex items-center gap-3 text-[10px] sm:text-sm text-gray-300 font-medium">
                                                <FaCheckCircle className="text-green-500 text-[10px] flex-shrink-0" />
                                                {perk}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="hidden md:block space-y-6">
                                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400/80">Lab Metrics</h4>
                                        <div className="flex items-center gap-4 text-sm text-gray-300 font-medium">
                                            <FaUsers className="text-gray-500" /> 1.2k+ Enrolled
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-6 pt-8 border-t border-white/5">
                                    <div className="flex-1 text-center sm:text-left">
                                        <div className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em] mb-1">Tuition Fee</div>
                                        <div className="text-3xl sm:text-5xl font-black text-white">{selectedCourse.price}</div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full sm:w-auto px-10 py-4 bg-white text-black rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-xl"
                                        onClick={() => {
                                            setSelectedCourse(null);
                                            setTimeout(() => {
                                                const el = document.getElementById('payment');
                                                if(el) el.scrollIntoView({ behavior: 'smooth' });
                                            }, 100);
                                        }}
                                    >
                                        Enroll Now <FaArrowRight className="text-[10px]" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default FeaturedCourses
