import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaGraduationCap, FaBriefcase, FaCertificate, FaArrowRight } from 'react-icons/fa'

const AICourseForStudents = () => {
    return (
        <div className="min-h-screen bg-[#020205] text-white pt-32 pb-20 selection:bg-purple-500/30">
            <Helmet>
                <title>AI Course for Students (Step-by-Step Placement Guide 2026) | AlgoForce</title>
                <meta name="description" content="Master AI product engineering and secure top placements with the best AI course for students. Build 7 real-world projects and earn MSME certification. Start your career today!" />
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "Course",
                        "name": "AI Professional Program for Students 2026",
                        "description": "Comprehensive AI training for BTech/BCA students focusing on industrial placement and hands-on projects with 2026 industrial stack.",
                        "provider": {
                            "@type": "Organization",
                            "name": "AlgoForce Academy",
                            "sameAs": "https://www.algoforceaii.com"
                        }
                    }
                    `}
                </script>
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Will this AI course help in placements?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, our AI course focuses on building a professional portfolio of 7+ projects which is a massive advantage in placement rounds."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Do you provide internship certificates?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, students work on live industrial projects and receive govt-registered MSME internship certificates."
                                }
                            },
                             {
                                "@type": "Question",
                                "name": "What is the fee for the student AI course?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "The student track is heavily subsidized for college students (BTech/BCA). Please check our enrollment page for current scholarships."
                                }
                            }
                        ]
                    }
                    `}
                </script>
            </Helmet>

            <article className="max-w-4xl mx-auto px-6">
                <header className="text-center mb-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h2 className="text-[12px] font-black uppercase tracking-[0.4em] text-blue-500 mb-6">Student Specialized Roadmap</h2>
                        <h1 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-tight">
                            Best AI Course <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-300 to-white italic">For Students.</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-medium leading-relaxed italic opacity-80 mb-12">
                            Transform from a student to a builder in 8 weeks. <br />
                            Master the skills that top-tier AI agencies and tech giants are hiring for.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link to="/labs" className="px-10 py-5 bg-white text-black rounded-full font-black text-[14px] uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                                See Intern Projects
                            </Link>
                            <Link to="/ai-certification-india" className="px-10 py-5 border border-white/10 rounded-full font-black text-[14px] uppercase tracking-widest hover:bg-white/5 transition-all">
                                Certification Details
                            </Link>
                        </div>
                    </motion.div>
                </header>

                <div className="prose prose-invert prose-blue max-w-none space-y-16">
                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-8 uppercase italic border-b border-white/5 pb-4">1. Why Every Student Needs an AI Portfolio in 2025</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            In 2025, a simple resume is no longer sufficient. Companies are looking for <strong>proof-of-execution</strong>. Our <strong>AI course for students</strong> is specifically designed to help you build a high-impact portfolio of production-ready AI tools, from automated research bots to full-scale SaaS MVPs.
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0">
                            {[
                                "BTech/BCA Placement Success",
                                "Hands-on Industrial Internship",
                                "Live Project Demonstrations",
                                "Career Mentorship & Network"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 bg-[#111111] p-6 rounded-2xl border border-white/5 font-bold text-gray-300">
                                    <FaBriefcase className="text-blue-500 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="bg-white/5 p-12 rounded-[2.5rem] border border-white/10">
                        <h3 className="text-2xl font-black uppercase tracking-widest mb-6">The Placement Mote</h3>
                        <p className="text-gray-400 text-lg italic leading-relaxed">
                            "Most students learn syntax. Our students learn systems. When you can show an interviewer a live AI agent you built in 2 hours, the job is already yours."
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-8 uppercase italic border-b border-white/5 pb-4">2. Top Skills for Professional AI Developers</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            Our curriculum covers the full stack of modern AI engineering, ensuring you are capable of handling high-value projects as soon as you graduate.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-[#111111]/50 p-8 rounded-3xl border border-white/5 text-center">
                                <FaGraduationCap className="text-4xl text-blue-500 mx-auto mb-6" />
                                <h4 className="text-xl font-bold mb-4">Prompt Eng.</h4>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Logic & Logic Design</p>
                            </div>
                            <div className="bg-[#111111]/50 p-8 rounded-3xl border border-white/5 text-center">
                                <FaCertificate className="text-4xl text-purple-500 mx-auto mb-6" />
                                <h4 className="text-xl font-bold mb-4">Automation</h4>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Revenue Systems</p>
                            </div>
                            <div className="bg-[#111111]/50 p-8 rounded-3xl border border-white/5 text-center">
                                <FaArrowRight className="text-4xl text-white mx-auto mb-6" />
                                <h4 className="text-xl font-bold mb-4">Agentic LLMs</h4>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Autonomous Scale</p>
                            </div>
                        </div>
                    </section>

                    <section className="pt-20 border-t border-white/5 flex flex-wrap gap-4">
                        <Link to="/ai-course" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all">Foundational AI Course</Link>
                        <Link to="/build-ai-app-without-coding" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all">Build AI App without Coding</Link>
                        <Link to="/ai-certification-india" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all">AI Certification India</Link>
                    </section>
                </div>
            </article>
        </div>
    )
}

export default AICourseForStudents
