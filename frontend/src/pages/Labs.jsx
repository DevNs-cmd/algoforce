import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import { FaGraduationCap, FaArrowRight, FaUsers, FaGlobe, FaCertificate, FaTv, FaBookOpen, FaHammer } from 'react-icons/fa'
import { useState } from 'react'

const Labs = () => {
    const [activeTab, setActiveTab] = useState('courses');

    const sections = {
        courses: [
            { title: 'AI Mastery Pro', duration: '12 Weeks', learners: '1.2k', desc: 'Comprehensive full-stack AI engineering from math to model deployment.' },
            { title: 'Data Analytics Elite', duration: '8 Weeks', learners: '2.5k', desc: 'Master business intelligence with SQL, PowerBI, and predictive modeling.' },
            { title: 'Full Stack MERN', duration: '16 Weeks', learners: '1.5k', desc: 'Build scalable web applications using the modern industry stack.' }
        ],
        apprenticeships: [
            { title: 'AlgoForce Residency', duration: '6 Months', slots: '10', desc: 'Work directly with our engineering team on real client MVPs.' },
            { title: 'AI Agent Architect', duration: '4 Months', slots: '15', desc: 'Intensive hands-on training for building autonomous business agents.' }
        ],
        workshops: [
            { title: 'LLM Fine-tuning', date: 'Monthly', mode: 'Live', desc: 'One-day intensive lab on fine-tuning Llama-3 and small models.' },
            { title: 'MVP Sprint 2.0', date: 'Bi-weekly', mode: 'Live', desc: 'Learn the AlgoForce methodology for rapid MVP development.' }
        ],
        webinars: [
            { title: 'Future of AI 2026', type: 'Expert Panel', recording: 'Available', desc: 'Insights from industry leaders on the autonomous economy.' },
            { title: 'Startup Funding AI', type: 'Growth Session', recording: 'Free', desc: 'How to leverage AI to attract investors for your tech startup.' }
        ]
    }

    return (
        <>
            <Helmet>
                <title>Labs – AlgoForce Academy</title>
                <meta name="description" content="Courses, Apprenticeships, Workshops, and Webinars for the next generation of AI entrepreneurs." />
            </Helmet>

            <div className="min-h-screen bg-[#05050F] text-white pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-[0.2em] mb-6"
                        >
                            AlgoForce Labs
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                            Upskill for the <span className="text-purple-500">Autonomous Era.</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            We don't just teach theory. We build practitioners through courses,
                            real-world apprenticeships, and live workshops.
                        </p>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {Object.keys(sections).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest transition-all ${activeTab === tab
                                        ? 'bg-purple-600 text-white shadow-xl shadow-purple-600/20 scale-105'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sections[activeTab].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all group"
                            >
                                <div className="p-3 w-fit rounded-xl bg-purple-600/20 text-purple-400 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all">
                                    {activeTab === 'courses' && <FaBookOpen size={24} />}
                                    {activeTab === 'apprenticeships' && <FaHammer size={24} />}
                                    {activeTab === 'workshops' && <FaUsers size={24} />}
                                    {activeTab === 'webinars' && <FaTv size={24} />}
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed">{item.desc}</p>

                                <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-widest pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-2">
                                        <FaGlobe className="text-purple-500" />
                                        <span>{item.duration || item.date || item.type}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaUsers className="text-blue-500" />
                                        <span>{item.learners || item.slots || item.mode || item.recording}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Ecosystem Stats */}
                    <div className="mt-32 grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Learners', val: '5k+', icon: <FaUsers /> },
                            { label: 'Partners', val: '50+', icon: <FaGlobe /> },
                            { label: 'Placements', val: '95%', icon: <FaCertificate /> },
                            { label: 'Workshops', val: '200+', icon: <FaHammer /> }
                        ].map((stat, i) => (
                            <div key={i} className="text-center p-8 rounded-3xl bg-transparent border border-white/5 group hover:bg-white/5 transition-all">
                                <div className="text-3xl text-purple-500 mb-4 flex justify-center">{stat.icon}</div>
                                <div className="text-4xl font-black mb-1 group-hover:scale-110 transition-transform">{stat.val}</div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-32 p-12 rounded-[3rem] bg-gradient-to-br from-purple-600 to-blue-700 text-center">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Start Your Journey.</h2>
                        <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
                            Join the AlgoForce ecosystem and get the keys to the future of high-performance tech.
                        </p>
                        <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-all flex items-center gap-3 mx-auto shadow-2xl">
                            Apply for Lab Access
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Labs
