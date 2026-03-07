import { Helmet } from "react-helmet-async"
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const Labs = () => {
    const [activeTab, setActiveTab] = useState('courses');

    const sections = {
        courses: [
            { title: 'AI Mastery Pro', duration: '12 Weeks', slots: 'Elite', desc: 'Full-stack AI engineering from architecture to autonomous deployment.' },
            { title: 'Data Analytics', duration: '8 Weeks', slots: 'Premium', desc: 'Predictive modeling and industrial business intelligence frameworks.' },
            { title: 'Full Stack MERN', duration: '16 Weeks', slots: 'Standard', desc: 'Build scalable modern applications using industry extraction logic.' }
        ],
        apprenticeships: [
            { title: 'AlgoForce Residency', duration: '6 Months', slots: '10 Left', desc: 'Work directly with our senior engineers on high-value client MVPs.' },
            { title: 'AI Agent Architect', duration: '4 Months', slots: '15 Left', desc: 'Intensive lab training for building production-grade autonomous agents.' }
        ],
        workshops: [
            { title: 'LLM Fine-tuning', duration: '1 Day', slots: 'Live', desc: 'Deep dive into fine-tuning Llama-3 and small language models.' },
            { title: 'MVP Sprint 2.0', duration: '2 Weeks', slots: 'Live', desc: 'Learn the proprietary AlgoForce methodology for rapid execution.' }
        ],
        webinars: [
            { title: 'Future of AI 2026', duration: '90 Min', slots: 'Free', desc: 'Analysis of the autonomous economy and agentic landscapes.' },
            { title: 'Startup Funding AI', duration: '60 Min', slots: 'Free', desc: 'How to leverage AI systems to secure institutional investment.' }
        ]
    }

    return (
        <>
            <Helmet>
                <title>Labs – AlgoForce Engineering Academy</title>
                <meta name="description" content="Industrial training for the next generation of AI practitioners." />
            </Helmet>

            <div className="min-h-screen bg-[#020205] text-white pt-40 pb-32 px-6 relative overflow-hidden">
                {/* Background Liquid */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-purple-600/10 blur-[150px] rounded-full" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-28">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-6 py-2 mb-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl shadow-xl"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)] animate-pulse" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">Practitioner Labs</span>
                        </motion.div>
                        <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tight md:tracking-tighter leading-none uppercase italic">
                            Engine <span className="text-purple-600">Upgrade.</span>
                        </h1>
                        <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto font-medium">
                            We don't teach theory. We build high-performance engineers
                            capable of deploying autonomous infrastructure in the real-world.
                        </p>
                    </div>

                    {/* iOS Tab Switcher */}
                    <div className="flex justify-center mb-20">
                        <div className="inline-flex p-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-2xl">
                            {Object.keys(sections).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`relative px-8 py-3 rounded-full font-bold text-[13px] uppercase tracking-wide transition-all duration-500 ${activeTab === tab ? 'text-black' : 'text-gray-500 hover:text-white'
                                        }`}
                                >
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="active-tab-bg"
                                            className="absolute inset-0 bg-white rounded-full -z-10 shadow-lg"
                                        />
                                    )}
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Liquid Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="wait">
                            {sections[activeTab].map((item, idx) => (
                                <motion.div
                                    key={item.title + activeTab}
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: idx * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                    className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-[60px] group hover:bg-white/[0.06] hover:scale-[1.02] transition-all duration-700 overflow-hidden cursor-default"
                                >
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-black mb-3 tracking-tighter uppercase italic text-white group-hover:text-purple-400 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                            {item.desc}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-gray-500 pt-8 border-t border-white/5 group-hover:text-gray-300 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-600/30 group-hover:bg-purple-500 transition-colors shadow-[0_0_10px_rgba(168,85,247,0.3)]" />
                                            <span>{item.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600/30 group-hover:bg-blue-500 transition-colors shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
                                            <span>{item.slots}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Footer Call to Action */}
                    <div className="mt-40 text-center">
                        <h4 className="text-[12px] font-bold uppercase tracking-[0.5em] text-gray-700 mb-8 italic">Next Enrollment: 15 MAR 2026</h4>
                        <button className="px-12 py-6 border border-white/10 rounded-full font-bold text-[15px] text-white hover:bg-white hover:text-black transition-all">Request Lab Access {'->'}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Labs
