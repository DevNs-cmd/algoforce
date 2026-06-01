import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FaArrowRight, FaBrain, FaLinkedin, FaRocket, FaShieldAlt } from "react-icons/fa"
import SeoHead from "../components/common/SeoHead"
import PageVideoBackdrop from "../components/common/PageVideoBackdrop"

const Founder = () => {
  const pillars = [
    {
      icon: FaBrain,
      title: "Systems Thinking",
      text: "Turning scattered ideas into repeatable AI, automation, and execution infrastructure."
    },
    {
      icon: FaRocket,
      title: "Founder Execution",
      text: "Building Crucible as a practical operating layer for founders who need speed and accountability."
    },
    {
      icon: FaShieldAlt,
      title: "MSME Registered",
      text: "Operating with a formal business foundation under UDYAM-DL_08-0122150."
    }
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020205] text-white pt-32 md:pt-40 pb-20">
      <SeoHead path="/founder" />
      <Helmet>
        <title>Dev N Suman - Founder & CEO of AlgoForce AI</title>
        <meta
          name="description"
          content="Meet Dev N Suman, Founder and CEO of AlgoForce AI, building AI systems, Labs talent infrastructure, and Crucible founder execution."
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Dev N Suman",
              "jobTitle": "Founder & CEO",
              "worksFor": {
                "@type": "Organization",
                "name": "AlgoForce AI",
                "url": "https://www.algoforceaii.com"
              },
              "url": "https://www.algoforceaii.com/founder",
              "sameAs": [
                "https://www.linkedin.com/in/dev-n-suman-3616a6377/",
                "https://www.algoforceaii.com/founder"
              ]
            }
          `}
        </script>
      </Helmet>

      <PageVideoBackdrop src="/video1.mp4" className="z-0" videoClassName="opacity-[0.3]" />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-16 right-[-10%] w-[760px] h-[760px] rounded-full bg-purple-600/12 blur-[150px]" />
        <div className="absolute bottom-10 left-[-12%] w-[620px] h-[620px] rounded-full bg-[#062f4f]/30 blur-[140px]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
        <section className="grid lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-14 items-center mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full premium-dark-surface backdrop-blur-xl mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8f38ff]" />
              <span className="text-[10px] font-semibold uppercase text-slate-300">Meet the Founder</span>
            </div>

            <h1 className="text-[2.55rem] sm:text-5xl md:text-6xl lg:text-[4.8rem] font-bold leading-[1.04] mb-6">
              Dev N Suman, founder of <span className="brand-gradient-text">AlgoForce AI</span>
            </h1>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
              Dev is building AlgoForce AI as an execution ecosystem: AI services for businesses, Labs for talent, and Crucible for founders who want to move from idea to disciplined execution.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="https://www.linkedin.com/in/dev-n-suman-3616a6377/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 rounded-full bg-white text-[#06101d] font-bold text-sm flex items-center justify-center gap-3 hover:bg-[#f6f1ff] transition-all"
              >
                <FaLinkedin /> Connect on LinkedIn
              </a>
              <Link
                to="/contact"
                className="px-7 py-4 rounded-full border border-white/14 text-white font-bold text-sm flex items-center justify-center gap-3 hover:border-white/35 transition-all"
              >
                Work with AlgoForce <FaArrowRight size={12} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.85 }}
            className="premium-dark-surface rounded-[30px] p-4 sm:p-5 backdrop-blur-2xl"
          >
            <div className="relative aspect-[4/5] min-h-[440px] overflow-hidden rounded-[24px] border border-white/10">
              <video
                autoPlay
                loop
                muted
                defaultMuted
                playsInline
                webkit-playsinline="true"
                preload="metadata"
                src="/vecteezy.mp4"
                className="absolute inset-0 h-full w-full object-cover opacity-80"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,13,0.05),rgba(3,7,13,0.82))]" />
              <div className="absolute left-5 right-5 bottom-5 rounded-[22px] bg-[#03070d]/72 border border-white/12 backdrop-blur-2xl p-5">
                <p className="text-[10px] uppercase font-semibold text-slate-400 mb-2">Founder Office</p>
                <h2 className="text-2xl font-bold mb-2">Execution over noise.</h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Building systems, teams, and operating habits that make AI useful in the real world.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="grid md:grid-cols-3 gap-5 md:gap-6 mb-14 md:mb-20">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08 }}
              className="premium-dark-surface rounded-[26px] p-6 md:p-7 backdrop-blur-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/7 border border-white/10 flex items-center justify-center text-purple-300 mb-6">
                <pillar.icon />
              </div>
              <h3 className="text-2xl font-bold mb-3">{pillar.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{pillar.text}</p>
            </motion.div>
          ))}
        </section>

        <section className="premium-dark-surface rounded-[30px] p-6 md:p-10 lg:p-12 backdrop-blur-2xl">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
            <div>
              <p className="text-[11px] uppercase font-semibold text-purple-300 mb-4">The ecosystem story</p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                One founder, three connected execution engines.
              </h2>
              <div className="flex flex-wrap gap-3">
                <Link to="/labs" className="px-5 py-3 rounded-full bg-white text-[#06101d] text-sm font-bold">
                  Visit Labs
                </Link>
                <a href="https://crucible-website-omega.vercel.app/" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-full border border-white/12 text-sm font-bold">
                  Enter Crucible
                </a>
              </div>
            </div>
            <div className="space-y-5 text-slate-300 leading-relaxed">
              <p>
                AlgoForce AI Core delivers consulting retainers, automation systems, AI workflows, CRM implementation, and custom business platforms for startups, SMEs, and enterprises.
              </p>
              <p>
                AlgoForce Labs develops execution-ready builders through AI cohorts, certification programs, apprenticeships, and project-based learning.
              </p>
              <p>
                Crucible supports founders through operating systems, hackathons, demo days, membership pathways, and a practical builder community.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Founder
