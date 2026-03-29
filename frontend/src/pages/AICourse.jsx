import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaCheckCircle, FaRocket, FaCertificate, FaShieldAlt, FaClock } from 'react-icons/fa'
import ComparisonTable from "../components/sections/academy/ComparisonTable"
import SocialProof from "../components/sections/home/SocialProof"

const AICourse = () => {
    return (
        <div className="min-h-screen bg-[#020205] text-white pt-32 pb-20 selection:bg-purple-500/30">
            <Helmet>
                <title>AI Course for Beginners (Step-by-Step Guide 2026) | AlgoForce</title>
                <meta name="description" content="Build and deploy real AI apps in 2 hours with our elite AI course for beginners. No coding required. Master OpenAI, LangChain & MERN. Start building today!" />
                <link rel="canonical" href="https://www.algoforceaii.com/ai-course" />
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Is this AI course beginner friendly?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, our AI course is 100% beginner friendly. We focus on industrial execution using low-code tools, so no prior coding experience is required."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Do I need coding skills to build AI apps?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "No, we teach you how to build professional AI apps without coding using the modern AI-native stack (Cursor, Bubble, Make)."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Will I get a certificate after completion?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, every student receives an MSME-certified industrial certificate recognized by tech giants in India and globally."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How long does it take to build a project?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Our execution-first model allows you to build and deploy functional AI projects in under 120 minutes."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "What tools will I learn in this AI course?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "You will master Cursor, OpenAI APIs, LangChain, Make.com, and the MERN stack for AI-native deployment."
                                }
                            }
                        ]
                    }
                    `}
                </script>
            </Helmet>

            <article className="max-w-4xl mx-auto px-6">
                {/* Hero Header */}
                <header className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="text-[12px] font-black uppercase tracking-[0.4em] text-purple-600 mb-6">Industrial Training 2025</h2>
                        <h1 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-tight">
                            The Ultimate <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-white italic">AI Course.</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-medium leading-relaxed italic opacity-80 mb-12">
                            Stop chasing trends. Start building systems. <br />
                            Learn the engineering behind OpenAI, Claude, and Agentic Workflows.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link to="/labs" className="px-10 py-5 bg-white text-black rounded-full font-black text-[14px] uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                                Explore Labs
                            </Link>
                            <Link to="/nexus" className="px-10 py-5 border border-white/10 rounded-full font-black text-[14px] uppercase tracking-widest hover:bg-white/5 transition-all">
                                Try Nexus
                            </Link>
                        </div>
                    </motion.div>
                </header>

                {/* Main SEO Content Grid */}
                <div className="prose prose-invert prose-purple max-w-none space-y-16">
                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-8 uppercase italic border-b border-white/5 pb-4">1. Why Choose This AI Course in 2025?</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            In 2025, the barrier to entry for building world-class technology has vanished. Our <strong>AI course</strong> is built on a single premise: speed of execution is the only moat. Whether you are a student, a founder, or a professional, mastering AI automation is no longer optional—it is a survival skill.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Traditional education focuses on theory and high-level concepts. We focus on <strong>execution labs</strong> where you build real products in under 2 hours.
                        </p>
                    </section>

                    <section className="bg-white/5 p-12 rounded-[2.5rem] border border-white/10">
                        <h2 className="text-3xl font-black tracking-tight mb-8 uppercase italic">What You Will Build (The Labs Proof)</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold flex items-center gap-3 text-purple-500"><FaRocket /> Autonomous Agents</h3>
                                <p className="text-gray-400">Build AI bots that scan the web, research competitors, and write 2000-word reports autonomously.</p>
                                <Link to="/labs" className="text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">See Live Demo {"->"}</Link>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold flex items-center gap-3 text-blue-500"><FaShieldAlt /> Enterprise AI Workflows</h3>
                                <p className="text-gray-400">Learn to automate customer service using OpenAI APIs and Twilio voice integrations.</p>
                                <Link to="/labs" className="text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">See Live Demo {"->"}</Link>
                            </div>
                        </div>
                    </section>

                    <ComparisonTable />

                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-8 uppercase italic border-b border-white/5 pb-4">2. Core Modules: From Logic to Deployment</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0">
                            {[
                                "Module 1: Prompt Engineering Mastery",
                                "Module 2: Custom GPTs & Knowledge Bases",
                                "Module 3: No-Code AI App Builders",
                                "Module 4: Agentic Orchestration (LangChain)",
                                "Module 5: Monetization & SaaS Business Models",
                                "Module 6: Final Project & Certification"
                            ].map((module, i) => (
                                <li key={i} className="flex items-center gap-4 bg-[#111111] p-6 rounded-2xl border border-white/5 font-bold text-gray-300">
                                    <FaCheckCircle className="text-purple-600 flex-shrink-0" />
                                    {module}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-8 uppercase italic border-b border-white/5 pb-4">3. Career Outcomes & Industrial Recognition</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            Upon completion of the <strong>AI Certification</strong>, students are equipped to take on roles as AI Product Managers, Automation Specialists, and Prompt Engineers. Our <strong>MSME-certified registration</strong> ensures that your skills are recognized by industrial giants across India and globally.
                        </p>
                        <div className="p-10 rounded-[3.5rem] bg-purple-600/10 border border-purple-500/20 text-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6">
                                <span className="bg-red-500/20 text-red-500 text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-full border border-red-500/20 animate-pulse">Limited Lab Slots</span>
                            </div>
                            <h4 className="text-3xl font-black mb-4">Ready to Build the Future?</h4>
                            <p className="text-gray-400 mb-10 italic">Next cohort starts <span className="text-white font-bold">April 5</span>. We only accept 20 builders per cohort.</p>
                            <Link to="/labs" className="inline-block px-12 py-5 bg-white text-black rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                                Secure Lab Seat
                            </Link>
                        </div>
                    </section>

                    <SocialProof />

                    {/* FAQ Links Section */}
                    <section className="pt-20 border-t border-white/5">
                        <h2 className="text-2xl font-black mb-8 uppercase tracking-widest text-gray-500">Related Resources</h2>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/ai-course-for-students" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all text-purple-400">AI Course for Students</Link>
                            <Link to="/blog/best-ai-projects-for-students" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all">Placement Insights Blog</Link>
                            <Link to="/labs" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all">Build Live Projects</Link>
                            <Link to="/ai-certification-india" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all text-emerald-400">AI Certification India</Link>
                        </div>
                    </section>
                </div>
            </article>
        </div>
    )
}

export default AICourse
