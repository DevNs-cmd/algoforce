import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCode, FaBolt, FaRocket, FaCheck } from 'react-icons/fa'

const BuildAIApp = () => {
    return (
        <div className="min-h-screen bg-[#020205] text-white pt-32 pb-20 selection:bg-purple-500/30">
            <Helmet>
                <title>Build AI App Without Coding (Step-by-Step Guide 2026) | AlgoForce</title>
                <meta name="description" content="Launch your AI startup MVP in 2 hours. Learn the best way to build AI apps without coding in 2026. MSME-certified training for founders. Start building today!" />
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Can I build an AI app solo without coding?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, our 'build AI app without coding' course is designed to turn founders into full-stack engineers using no-code orchestration."
                                }
                            },
                             {
                                "@type": "Question",
                                "name": "Which no-code AI tools are best for building apps?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "We master the 2026 stack: Cursor for logic, Bubble for interface, and Make for automated workflows."
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
                        <h2 className="text-[12px] font-black uppercase tracking-[0.4em] text-orange-500 mb-6 font-bold">Founder Execution Series</h2>
                        <h1 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-tight">
                            Build AI App <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-300 to-white italic">Without Coding.</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-medium leading-relaxed italic opacity-80 mb-12">
                            Stop waiting for developers. Start shipping software. <br />
                            Master the no-code AI stack that lets you build production-ready apps in 2 hours.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link to="/academy" className="px-10 py-5 bg-white text-black rounded-full font-black text-[14px] uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                                Start Building AI
                            </Link>
                            <Link to="/labs" className="px-10 py-5 border border-white/10 rounded-full font-black text-[14px] uppercase tracking-widest hover:bg-white/5 transition-all">
                                View Lab Results
                            </Link>
                        </div>
                    </motion.div>
                </header>

                <div className="prose prose-invert prose-orange max-w-none space-y-16">
                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-8 uppercase italic border-b border-white/5 pb-4">1. The Rise of the Zero-Code Engineer</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            In 2025, coding is no longer the bottleneck. Our <strong>build AI app without coding</strong> course teaches you how to orchestrate professional-grade systems using low-code/no-code tools like Cursor, Windsurf, Bubble, and Make. You are no longer limited by what you can write; you are only limited by what you can architect.
                        </p>
                    </section>

                    <section className="bg-white/5 p-12 rounded-[2.5rem] border border-white/10">
                        <h2 className="text-2xl font-black uppercase tracking-widest mb-8">The No-Code AI Stack you will learn:</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { name: "Cursor", color: "text-blue-500" },
                                { name: "Bubble", color: "text-purple-500" },
                                { name: "Make.com", color: "text-red-500" },
                                { name: "OpenAI", color: "text-green-500" },
                            ].map((tool, i) => (
                                <div key={i} className="p-6 bg-[#111111] rounded-2xl border border-white/5 text-center flex flex-col items-center gap-3">
                                    <FaBolt className={tool.color} />
                                    <span className="text-xs font-black uppercase tracking-widest">{tool.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-8 uppercase italic border-b border-white/5 pb-4">2. Build Your First MVP in 2 Hours</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            Traditional coding takes months for a single MVP. Our framework reduces that to 120 minutes of high-intensity execution. Our <strong>AI course</strong> is structured as a series of labs where you follow a step-by-step process to deploy a functional, revenue-generating product.
                        </p>
                        <div className="space-y-6">
                            {[
                                "Product Definition & Flow Discovery",
                                "API Connection & Prompt Structuring",
                                "UI/UX Generation with AI Layouts",
                                "One-Click Deployment & Scaling"
                            ].map((step, i) => (
                                <div key={i} className="flex items-center gap-6 bg-[#111111]/50 p-6 rounded-2xl border border-white/5 italic font-bold">
                                    <span className="w-10 h-10 rounded-full border border-orange-500/20 text-orange-500 flex items-center justify-center text-xs">0{i+1}</span>
                                    {step}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-8 uppercase italic border-b border-white/5 pb-4">3. Scaling Beyond the Prototype</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            "Doesn't no-code limit scalability?" No longer. We teach you how to build <strong>scalable no-code AI systems</strong> that handle hundreds of thousands of requests using enterprise-level serverless architectures. 
                        </p>
                        <div className="p-10 rounded-[3rem] bg-orange-600/10 border border-orange-500/20 text-center">
                            <h4 className="text-2xl font-black mb-4">Start Shipping Today.</h4>
                            <p className="text-gray-400 mb-8">Stop thinking. Start building. Every minute you delay is a minute your idea isn't in the market. </p>
                            <Link to="/academy" className="inline-block px-12 py-5 bg-orange-600 text-white rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all">
                                Join the Founder Track
                            </Link>
                        </div>
                    </section>

                    <section className="pt-20 border-t border-white/5 flex flex-wrap gap-4">
                        <Link to="/ai-course" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all text-gray-400">Main AI Course</Link>
                        <Link to="/ai-course-for-students" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all text-gray-400">AI Course for Students</Link>
                        <Link to="/ai-certification-india" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all text-gray-400">AI Certification India</Link>
                    </section>
                </div>
            </article>
        </div>
    )
}

export default BuildAIApp
