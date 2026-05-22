import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaShieldAlt, FaRocket, FaCertificate, FaBrain } from 'react-icons/fa'

const WhatIsAlgoForce = () => {
    return (
        <div className="min-h-screen bg-[#020205] text-white pt-32 pb-20 selection:bg-purple-500/30">
            <Helmet>
                <title>What is AlgoForce AI? | Services, Labs & Crucible Ecosystem</title>
                <meta name="description" content="AlgoForce AI is a full-stack AI growth ecosystem combining consulting services, AlgoForce Labs education, Crucible founder incubation, SaaS products, and venture pipeline." />
                <link rel="canonical" href="https://www.algoforceaii.com/what-is-algoforce" />
            </Helmet>

            <article className="max-w-4xl mx-auto px-6">
                <header className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="text-[12px] font-black uppercase tracking-[0.4em] text-purple-600 mb-6">Master Ecosystem 2025</h2>
                        <h1 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-tight italic">
                            The AI Growth <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-white not-italic">Ecosystem.</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-medium leading-relaxed italic opacity-80 max-w-2xl mx-auto mb-12">
                            AlgoForce AI is not one company line. It is Services, Labs, and Crucible working together as a compounding business model.
                        </p>
                    </motion.div>
                </header>

                <div className="prose prose-invert prose-purple max-w-none space-y-24">
                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-8 uppercase italic border-b border-white/5 pb-4">1. Three Engines, One Brand</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            <strong>AlgoForce AI</strong> combines AI consulting, education, and founder incubation under one ecosystem. The model is designed so every client, student, founder, SaaS user, and partner strengthens the same flywheel.
                        </p>
                        <div className="bg-[#111111] p-10 rounded-[3rem] border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold flex items-center gap-3 text-white"><FaBrain /> AlgoForce Labs</h3>
                                <p className="text-sm text-gray-500">We train students and professionals through AI cohorts, certifications, capstone projects, apprenticeships, and placement pathways.</p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold flex items-center gap-3 text-white"><FaRocket /> Crucible</h3>
                                <p className="text-sm text-gray-500">We run founder community, hackathons, incubator cohorts, demo days, investor access, and startup venture pipeline.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-8 uppercase italic border-b border-white/5 pb-4">2. The AlgoForce Advantage</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-10">
                            The advantage is the integrated model: retainers and projects create cash flow, Labs creates talent, Crucible creates deal flow, and SaaS turns delivery IP into recurring products.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 border border-white/5 rounded-3xl bg-white/[0.02] group hover:bg-white/[0.05] transition-all">
                                <FaShieldAlt className="text-3xl text-purple-600 mb-6" />
                                <h4 className="text-xl font-bold mb-4">Talent Moat</h4>
                                <p className="text-sm text-gray-500">Labs builds a trained internal and partner talent pipeline that reduces delivery friction and increases quality.</p>
                            </div>
                            <div className="p-8 border border-white/5 rounded-3xl bg-white/[0.02] group hover:bg-white/[0.05] transition-all">
                                <FaCertificate className="text-3xl text-emerald-500 mb-6" />
                                <h4 className="text-xl font-bold mb-4">Community Defense</h4>
                                <p className="text-sm text-gray-500">Crucible compounds trust through founders, alumni, sponsors, events, portfolio startups, and investor relationships.</p>
                            </div>
                        </div>
                    </section>

                    <section className="text-center bg-purple-600/10 border border-purple-500/20 p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-transparent opacity-30" />
                        <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter uppercase italic leading-none relative z-10">
                            Built for Builders. <br />
                            <span className="text-white">Run by Founders.</span>
                        </h2>
                        <div className="flex flex-wrap justify-center gap-6 relative z-10">
                            <Link to="/academy" className="px-10 py-5 bg-white text-black rounded-full font-black text-[13px] uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
                                Join the Academy
                            </Link>
                            <Link to="/labs" className="px-10 py-5 border border-white/10 rounded-full font-black text-[13px] uppercase tracking-widest hover:bg-white/5 transition-all">
                                Explore the Labs
                            </Link>
                        </div>
                    </section>
                </div>
            </article>
        </div>
    )
}

export default WhatIsAlgoForce
