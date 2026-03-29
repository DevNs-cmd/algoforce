import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCertificate, FaShieldAlt, FaIdCard, FaGlobe } from 'react-icons/fa'

const AICertificationIndia = () => {
    return (
        <div className="min-h-screen bg-[#020205] text-white pt-32 pb-20 selection:bg-purple-500/30">
            <Helmet>
                <title>AI Certification in India (Industrial Training 2026) | AlgoForce</title>
                <meta name="description" content="Get the #1 AI certification in India. MSME-certified industrial training for the 2026 job market. Master AI engineering and earn govt-registered credentials. Apply today!" />
                <link rel="canonical" href="https://www.algoforceaii.com/ai-certification-india" />
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Is AI certification useful in India?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, our AI certification is MSME-registered, providing you with high technical equity in the Indian industrial tech sector."
                                }
                            },
                             {
                                "@type": "Question",
                                "name": "What is the duration of the AI certificate program?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "The industrial program spans 8-12 weeks of high-intensity execution labs."
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
                        <h2 className="text-[12px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-6 font-bold">Industrial Standard AI Platform</h2>
                        <h1 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-tight">
                            AI Certification <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-300 to-white italic">In India.</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-medium leading-relaxed italic opacity-80 mb-12">
                            Secure your future with the most comprehensive AI certificate program in India. <br />
                            Industrial-level training designed for the Indian AI job market in 2025.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link to="/academy" className="px-10 py-5 bg-white text-black rounded-full font-black text-[14px] uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                                Enroll Now
                            </Link>
                            <Link to="/contact" className="px-10 py-5 border border-white/10 rounded-full font-black text-[14px] uppercase tracking-widest hover:bg-white/5 transition-all">
                                Request Details
                            </Link>
                        </div>
                    </motion.div>
                </header>

                <div className="prose prose-invert prose-emerald max-w-none space-y-16">
                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-8 uppercase italic border-b border-white/5 pb-4">1. Why AI Certification Matters in India</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            India is rapidly becoming the global hub for AI execution. Our <strong>AI certification India</strong> program is built to address the specific needs of the Indian tech ecosystem, focusing on rapid deployment, efficient scaling, and industrial-level AI implementation that bypasses traditional coding barriers.
                        </p>
                    </section>

                    <section className="bg-[#111111] p-12 rounded-[2.5rem] border border-emerald-500/10 shadow-[0_30px_60px_-15px_rgba(16,185,129,0.1)]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-3xl font-black mb-8 italic">MSME Registered Certification</h3>
                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    Our certificates are recognized by industrial bodies and government-registered MSME organizations, providing students and professionals with high-tier technical equity during placements and business bids.
                                </p>
                                <ul className="space-y-4 list-none p-0 flex flex-col items-start font-bold">
                                    <li className="flex items-center gap-3 text-emerald-500"><FaIdCard /> Industrial Verification</li>
                                    <li className="flex items-center gap-3 text-emerald-500"><FaGlobe /> Global Validity</li>
                                    <li className="flex items-center gap-3 text-emerald-500"><FaShieldAlt /> Secure Enrollment</li>
                                </ul>
                            </div>
                            <div className="flex justify-center flex-col items-center gap-6">
                                <div className="w-48 h-64 rounded-xl bg-[#0A0A0A] border-4 border-white/10 rotate-3 p-6 flex flex-col justify-between shadow-2xl overflow-hidden relative group cursor-pointer hover:rotate-0 transition-transform">
                                    <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-30 transition-opacity" />
                                    <div className="h-2 w-16 bg-emerald-500/40 rounded-full" />
                                    <div className="space-y-4">
                                        <div className="h-4 w-full bg-white/10 rounded-full" />
                                        <div className="h-4 w-3/4 bg-white/10 rounded-full" />
                                        <div className="h-4 w-5/6 bg-white/10 rounded-full" />
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="w-10 h-10 rounded-full bg-emerald-500/20" />
                                        <div className="h-4 w-12 bg-white/5 rounded-full" />
                                    </div>
                                </div>
                                <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600">Sample Certificate</span>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-8 uppercase italic border-b border-white/5 pb-4">2. High-Value Career Roles with AI Certification</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-10 border border-white/5 rounded-3xl group hover:bg-emerald-500/5 transition-all">
                                <h4 className="text-xl font-bold mb-4 group-hover:text-emerald-500 tracking-tighter">AI Product Manager</h4>
                                <p className="text-sm text-gray-500">Lead AI-native product cycles with high confidence and technical authority.</p>
                            </div>
                            <div className="p-10 border border-white/5 rounded-3xl group hover:bg-emerald-500/5 transition-all">
                                <h4 className="text-xl font-bold mb-4 group-hover:text-emerald-500 tracking-tighter">Automation Specialist</h4>
                                <p className="text-sm text-gray-500">Enable 24/7 autonomous revenue cycles for startups and SMEs.</p>
                            </div>
                        </div>
                    </section>

                    <section className="pt-20 border-t border-white/5 flex flex-wrap gap-4">
                        <Link to="/ai-course" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all text-gray-400">Main AI Course</Link>
                        <Link to="/ai-course-for-students" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all text-gray-400">AI Course for Students</Link>
                        <Link to="/build-ai-app-without-coding" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all text-gray-400">Build AI App without Coding</Link>
                    </section>
                </div>
            </article>
        </div>
    )
}

export default AICertificationIndia
