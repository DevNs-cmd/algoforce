import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  FaHeartbeat,
  FaLayerGroup,
  FaMoneyBillWave,
  FaRocket,
  FaCogs,
  FaUsers,
  FaArrowRight,
  FaCheckCircle,
  FaShieldAlt,
  FaCode
} from "react-icons/fa"
import SeoHead from "../components/common/SeoHead"
import OptimizedVideo from "../components/common/OptimizedVideo"
import { useInView } from "react-intersection-observer"

const pillars = [
  {
    icon: <FaLayerGroup />,
    title: "MVP Build & Launch",
    subtitle: "Rapid prototyping to production",
    description: "We help founders validate their ideas, map requirements, structure database schemas, and build launch-ready MVPs with execution speed.",
    highlights: ["Schema Design", "Rapid Prototyping", "Production Readiness"]
  },
  {
    icon: <FaHeartbeat />,
    title: "Technical Talent & Teams",
    subtitle: "Embedded engineering squads",
    description: "Access deployment-ready developers and product engineers from our Labs talent engine to build and support your technical infrastructure.",
    highlights: ["Senior Engineers", "DevOps & Cloud", "24/7 Code Maintenance"]
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Product Scale & Growth",
    subtitle: "Enterprise readiness",
    description: "Transition your product from MVP into a scaling company using Crucible's structured execution platform and operational systems.",
    highlights: ["SOC2 & Security", "High-Scale DBs", "Growth Analytics"]
  },
]

const executionSteps = [
  {
    step: "01",
    title: "Architecture & Blueprint",
    desc: "Deconstruct your vision into system design, API contracts, and database models."
  },
  {
    step: "02",
    title: "Sprint Build",
    desc: "Rapid iterative development using our pre-built enterprise modules."
  },
  {
    step: "03",
    title: "Security & Load Test",
    desc: "Rigorous automated testing, security audit, and deployment orchestration."
  },
  {
    step: "04",
    title: "Go-Live & Team Handoff",
    desc: "Deploy to production with dedicated post-launch support and talent placement."
  }
]

const Crucible = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <main className="min-h-screen bg-[#03070d] text-white pt-28 sm:pt-32 md:pt-40 pb-20 selection:bg-purple-500/30 overflow-hidden relative">
      <SeoHead path="/crucible" />

      {/* Decorative ambient background glows */}
      <div className="absolute top-[-10rem] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10rem] right-[-10rem] w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 subtle-ai-grid opacity-20 pointer-events-none" />

      <article className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Header Hero */}
        <header className="mx-auto mb-20 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8f38ff] shadow-[0_0_10px_#8f38ff]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300">Crucible OS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.08] tracking-tight text-white">
              The Startup <span className="premium-serif italic font-normal text-[#cdb4ff]">Execution Platform.</span>
            </h1>

            <p className="mx-auto max-w-3xl text-base md:text-lg text-slate-300 font-normal leading-relaxed mb-10">
              Crucible is a Startup Operating System—helping early-stage founders validate concepts, build MVPs, launch, find technical teams, and scale enterprise-grade products.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact?interest=crucible">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-[#06101d] rounded-full font-bold text-sm flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(143,56,255,0.16)] transition-all"
                >
                  Apply to Crucible <FaArrowRight size={10} />
                </motion.button>
              </Link>
              <a href="#pillars">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border border-white/14 rounded-full font-bold text-sm text-white hover:border-white/30 backdrop-blur-xl transition-all"
                >
                  Explore Pillars
                </motion.button>
              </a>
            </div>
          </motion.div>
        </header>

        {/* Video Showcase Section */}
        <section className="mb-24 max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.03] backdrop-blur-xl shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
            <OptimizedVideo
              src="/video2.mp4"
              inView={true}
              preload="metadata"
              className="w-full aspect-video object-cover"
            />
          </div>
        </section>

        {/* Pillars Section */}
        <section id="pillars" className="mb-24">
          <div className="text-center mb-14">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-400">Core Architecture</span>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mt-2">
              Built for <span className="premium-serif italic font-normal text-[#cdb4ff]">founders who execute.</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
            {pillars.map((pillar, index) => (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-[24px] border border-white/10 bg-white/[0.02] p-8 flex flex-col justify-between hover:border-purple-500/30 hover:bg-white/[0.04] transition-all group"
              >
                <div>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/20 text-purple-300 text-xl group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-1">{pillar.subtitle}</span>
                  <h3 className="mb-4 text-2xl font-bold text-white">{pillar.title}</h3>
                  <p className="leading-relaxed text-slate-400 text-sm font-normal mb-6">{pillar.description}</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/5">
                  {pillar.highlights.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                      <FaCheckCircle size={10} className="text-purple-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Execution Workflow Steps */}
        <section className="mb-24 max-w-6xl mx-auto" ref={ref}>
          <div className="text-center mb-14">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-400">Execution Model</span>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mt-2">
              From idea to <span className="premium-serif italic font-normal text-[#cdb4ff]">deployed platform.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {executionSteps.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-[22px] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
              >
                <span className="text-2xl font-black text-purple-400 tracking-wider block mb-3">{step.step}</span>
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-4xl rounded-[28px] border border-white/12 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8 text-center md:p-14 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-[-6rem] right-[-6rem] w-[20rem] h-[20rem] rounded-full bg-purple-600/10 blur-[90px] pointer-events-none" />

          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-white">
            Ready to Build Your Product?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-slate-300 text-sm md:text-base leading-relaxed font-normal">
            Learn how Crucible can accelerate your product build, secure your technical infrastructure, and connect you with deployment-ready engineers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact?interest=crucible"
              className="rounded-full bg-white px-9 py-4 text-sm font-bold text-black transition-transform hover:scale-105 shadow-xl"
            >
              Apply to Crucible
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}

export default Crucible
