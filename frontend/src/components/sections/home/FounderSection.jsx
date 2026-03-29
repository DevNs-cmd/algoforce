import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaTwitter, FaTerminal } from 'react-icons/fa'

const FounderSection = () => {
    return (
        <section className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side: Story & Context */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-[12px] font-black uppercase tracking-[0.4em] text-purple-600 mb-8 border-l-2 border-purple-600 pl-4">The Architect</h2>
                        <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter leading-[1.1]">
                            Built by <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-white italic font-bold">Real AI Builders.</span>
                        </h2>
                        
                        <div className="space-y-6 text-gray-400 font-medium leading-relaxed italic text-lg">
                            <p>
                                Unlike traditional courses taught by professors, AlgoForce was born in the trenches of <strong>industrial AI execution</strong>. 
                            </p>
                            <p>
                                Our founder, <strong>Dev N Suman</strong>, started by building autonomous systems for startups and winning national-level hackathons. We don't teach "about" AI. We teach how to <strong>engineer AI into revenue-generating assets</strong>.
                            </p>
                            <p>
                                From winning 24-hour sprint sessions to deploying high-scale LLM architectures, every module in our curriculum is a direct extraction of real-world battle-tested code.
                            </p>
                        </div>

                        <div className="mt-12 grid grid-cols-2 gap-8">
                            <div>
                                <div className="text-3xl font-black text-white mb-2 italic">10+</div>
                                <div className="text-[10px] uppercase font-black tracking-widest text-gray-600">AI Products Shipped</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-white mb-2 italic">Winner</div>
                                <div className="text-[10px] uppercase font-black tracking-widest text-gray-600">National Hackathons</div>
                            </div>
                        </div>

                        <div className="flex gap-6 mt-12">
                            <a href="#" className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all shadow-xl">
                                <FaLinkedin className="text-xl" />
                            </a>
                            <a href="#" className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all shadow-xl">
                                <FaGithub className="text-xl" />
                            </a>
                            <a href="#" className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all shadow-xl">
                                <FaTerminal className="text-xl" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Side: Visual & Person Schema */}
                    <div className="relative">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5 }}
                            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.8)] bg-gray-900 group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60" />
                            <div className="w-full h-full bg-indigo-950/20 animate-pulse flex items-center justify-center text-8xl font-black text-white/5">DEV</div>
                            
                            <div className="absolute bottom-10 left-10 z-20">
                                <h3 className="text-3xl font-black text-white tracking-tighter mb-2">Dev N Suman</h3>
                                <p className="text-purple-500 font-bold uppercase tracking-widest text-[11px]">Founder & AI Engineer</p>
                            </div>
                        </motion.div>

                        {/* Person Schema Script */}
                        <script type="application/ld+json">
                            {`
                            {
                                "@context": "https://schema.org",
                                "@type": "Person",
                                "name": "Dev N Suman",
                                "jobTitle": "Founder & AI Engineer",
                                "affiliation": {
                                    "@type": "Organization",
                                    "name": "AlgoForce AI"
                                },
                                "url": "https://www.algoforceaii.com",
                                "knowsAbout": ["Artificial Intelligence", "Prompt Engineering", "Full Stack Development", "MERN Stack"]
                            }
                            `}
                        </script>

                        {/* Decorative Background Glow */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full -z-10" />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -z-10" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FounderSection
