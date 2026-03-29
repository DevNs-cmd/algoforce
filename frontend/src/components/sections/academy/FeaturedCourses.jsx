import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaTimes, FaCheckCircle, FaUsers, FaClock, FaCertificate, FaArrowRight } from 'react-icons/fa'

const FeaturedCourses = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);

    const courses = [
        {
            title: "BTech / BCA Complete Tech Pack",
            instructor: "Dev N Suman",
            duration: "6 Months",
            level: "All Levels",
            price: "₹7,999",
            originalPrice: "₹45,000",
            badge: "Best Seller",
            badgeColor: "bg-purple-600",
            details: "Detailed masterclass for engineering students covering C, C++, Java, Python, DSA, and MERN Stack. includes 5+ Industrial projects.",
            perks: ["Internship Certificate", "Placement Prep", "Live Mentorship", "Source Code Access"]
        },
        {
            title: "Full Stack MERN Mastery",
            instructor: "Alex Rivera",
            duration: "4 Months",
            level: "Intermediate",
            price: "₹8,999",
            originalPrice: "₹35,000",
            badge: "Popular",
            badgeColor: "bg-blue-600",
            details: "Comprehensive bootcamp covering MERN stack with modern UI/UX principles and enterprise-grade deployment logic.",
            perks: ["Portfolio Building", "Resume Review", "API Mastery", "Cloud Hosting"]
        },
        {
            title: "Data Analytics + AI Systems",
            instructor: "Dev N Suman",
            duration: "4 Months",
            level: "Intermediate",
            price: "₹6,999",
            originalPrice: "₹30,000",
            badge: "Trending",
            badgeColor: "bg-green-600",
            details: "Learn Excel, SQL, Python, Power BI, and basics of ML. Build industrial business intelligence frameworks.",
            perks: ["Advanced Excel", "Power BI / Tableau", "Machine Learning", "Real Dashboards"]
        },
        {
            title: "AI + Future Tech Starter",
            instructor: "Dev N Suman",
            duration: "3 Months",
            level: "Intermediate",
            price: "₹5,999",
            originalPrice: "₹25,000",
            badge: "Premium",
            badgeColor: "bg-orange-600",
            details: "Prompt Engineering, ChatGPT Automation, and AI Startup building. The ultimate agentic workflow course.",
            perks: ["AI Tool Mastery", "Automation Workflows", "Startup Basics", "Agentic Logic"]
        }
    ]

    return (
        <section id="courses" className="bg-[#020205] py-16 md:py-24 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto mb-12 md:mb-20 text-center relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Student Pricing Model</span>
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-4xl md:text-7xl font-black mb-8 tracking-tighter uppercase italic"
                >
                    Featured <span className="text-purple-600">Labs</span>
                </motion.h2>
                <p className="text-gray-400 font-medium max-w-2xl mx-auto text-sm md:text-lg italic px-4">
                    MSME Government Registered Certification Programs for the next generation of BTech/BCA engineers.
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
                {courses.map((course, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.8 }}
                        className="group relative flex flex-col p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-purple-600/30 backdrop-blur-3xl overflow-hidden transition-all duration-700 hover:bg-white/[0.05] shadow-2xl"
                    >
                        {/* Course Header/Badge */}
                        <div className="flex justify-between items-start mb-8">
                            <div className={`px-4 py-1.5 rounded-full ${course.badgeColor}/10 border border-${course.badgeColor}/30 text-white text-[9px] font-bold uppercase tracking-widest`}>
                                {course.badge}
                            </div>
                            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold uppercase tracking-widest text-gray-400">
                                {course.level}
                            </div>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-black mb-4 leading-tight uppercase italic group-hover:text-purple-400 transition-colors tracking-tight">{course.title}</h3>
                            <p className="text-[11px] text-gray-600 mb-8 font-black uppercase tracking-widest">Instructor: {course.instructor}</p>

                            <div className="space-y-4 mb-10 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                                <span className="flex items-center gap-3"><FaClock className="text-purple-600" /> {course.duration} Duration</span>
                                <span className="flex items-center gap-3"><FaCertificate className="text-blue-600" /> Govt MSME Certification</span>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[11px] text-gray-600 font-bold line-through mb-1">{course.originalPrice}</span>
                                <span className="text-2xl font-black text-white italic">{course.price}</span>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCourse(course)}
                                className="px-6 py-3.5 bg-white text-black rounded-full font-black text-[11px] uppercase tracking-wider shadow-lg hover:shadow-white/20 active:scale-95"
                            >
                                Enroll
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ENROLLMENT MODAL */}
            <AnimatePresence>
                {selectedCourse && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCourse(null)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                        />
                        
                        <motion.div
                            initial={{ scale: 0.95, y: 30, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 30, opacity: 0 }}
                            className="relative w-full max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl overflow-y-auto no-scrollbar max-h-[90vh]"
                        >
                            <button 
                                onClick={() => setSelectedCourse(null)}
                                className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors text-xl z-50 p-2"
                            >
                                <FaTimes />
                            </button>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                                    <span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.4em] leading-none">Registration Active</span>
                                </div>

                                <h2 className="text-3xl md:text-6xl font-black mb-6 tracking-tighter text-white leading-none uppercase italic">
                                    {selectedCourse.title}
                                </h2>
                                
                                <p className="text-gray-400 text-sm md:text-lg mb-10 leading-relaxed font-medium italic opacity-80">
                                    {selectedCourse.details}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 pt-10 border-t border-white/5">
                                    <div className="space-y-5">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-600">Lab Benefits</h4>
                                        <div className="space-y-4">
                                            {selectedCourse.perks.map((perk, i) => (
                                                <div key={i} className="flex items-start gap-4 text-[12px] md:text-[13px] text-gray-300 font-bold uppercase tracking-wide italic">
                                                    <FaCheckCircle className="text-purple-600 text-sm flex-shrink-0 mt-0.5" />
                                                    {perk}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600">Industrial Score</h4>
                                        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                                            <div className="flex items-center justify-between text-[11px] font-black text-gray-500 uppercase tracking-widest">
                                                <span>Trust Score</span>
                                                <span className="text-white">98%</span>
                                            </div>
                                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-purple-600 w-[98%]" />
                                            </div>
                                            <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest italic leading-relaxed">
                                                All students receive valid Govt MSME registration certificate upon successful completion.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-center gap-8 pt-10 border-t border-white/5">
                                    <div className="flex-1 text-center md:text-left">
                                        <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em] mb-2">Tuition Investment</div>
                                        <div className="flex items-baseline gap-4">
                                            <div className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-none">{selectedCourse.price}</div>
                                            <div className="text-gray-700 text-lg md:text-2xl font-black italic line-through tracking-tighter">{selectedCourse.originalPrice}</div>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full md:w-auto px-14 py-6 bg-white text-black rounded-full font-black text-[15px] uppercase tracking-wider shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95"
                                        onClick={() => {
                                            setSelectedCourse(null);
                                            setTimeout(() => {
                                                const el = document.getElementById('payment');
                                                if(el) el.scrollIntoView({ behavior: 'smooth' });
                                            }, 100);
                                        }}
                                    >
                                        Apply Now {'->'}
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
