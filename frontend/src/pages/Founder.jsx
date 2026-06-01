import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  FaArrowRight,
  FaBrain,
  FaBriefcase,
  FaEnvelope,
  FaGlobe,
  FaLinkedin,
  FaMapMarkerAlt,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa"
import SeoHead from "../components/common/SeoHead"

const pillars = [
  {
    icon: FaBrain,
    title: "Systems Thinking",
    text: "Turning scattered ideas into repeatable AI, automation, and execution infrastructure.",
  },
  {
    icon: FaRocket,
    title: "Founder Execution",
    text: "Building practical operating layers for founders who need speed, accountability, and sharper follow-through.",
  },
  {
    icon: FaShieldAlt,
    title: "MSME Registered",
    text: "Operating with a formal business foundation under UDYAM-DL-08-0122150.",
  },
]

const engines = [
  {
    icon: FaBriefcase,
    title: "AlgoForce AI Core",
    text: "Consulting retainers, automation systems, AI workflows, CRM implementation, and custom business platforms.",
  },
  {
    icon: FaBrain,
    title: "AlgoForce Labs",
    text: "Execution-ready builders developed through cohorts, certification programs, apprenticeships, and project-based learning.",
  },
  {
    icon: FaGlobe,
    title: "Founder Ecosystem",
    text: "Founder support through operating systems, events, demo pathways, and a practical builder community.",
  },
]

const Founder = () => {
  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#06101d]">
      <SeoHead path="/founder" />
      <Helmet>
        <title>Dev N Suman - Founder & CEO of AlgoForce AI</title>
        <meta
          name="description"
          content="Meet Dev N Suman, Founder and CEO of AlgoForce AI, building AI systems, Labs talent infrastructure, and founder execution."
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

      <section className="relative overflow-hidden border-b border-[#06101d]/8 bg-white pt-32 pb-14 md:pt-36 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-12rem] right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#8f38ff]/10 blur-[90px]" />
          <div className="absolute bottom-[-12rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-[#062f4f]/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
              className="overflow-hidden rounded-[34px] border border-[#06101d]/10 bg-white p-4 shadow-[0_24px_70px_rgba(6,47,79,0.08)]"
            >
              <div className="relative aspect-[4/5] min-h-[420px] overflow-hidden rounded-[28px] border border-[#06101d]/10 bg-[#eef2f7]">
                <video
                  autoPlay
                  loop
                  muted
                  defaultMuted
                  playsInline
                  webkit-playsinline="true"
                  preload="metadata"
                  src="/vecteezy.mp4"
                  className="absolute inset-0 h-full w-full object-cover opacity-76"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,16,29,0.02),rgba(6,16,29,0.72))]" />
                <div className="absolute left-5 right-5 bottom-5 text-white">
                  <p className="mb-2 text-[10px] font-semibold uppercase text-white/70">Founder Office</p>
                  <h2 className="text-2xl font-semibold md:text-3xl">Execution over noise.</h2>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 px-2 pt-5">
                {[
                  ["Founder", "Role"],
                  ["MSME", "Registered"],
                  ["Delhi", "Office"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl bg-[#f7f9fc] p-3">
                    <div className="text-base font-bold text-[#06101d]">{value}</div>
                    <div className="mt-1 text-[9px] font-semibold uppercase text-slate-400">{label}</div>
                  </div>
                ))}
              </div>
            </motion.article>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.75 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#06101d]/10 bg-[#f7f9fc] px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8f38ff]" />
                <span className="text-[10px] font-semibold uppercase text-slate-500">Meet the Founder</span>
              </div>
              <h1 className="mb-6 max-w-4xl text-[2.5rem] font-semibold leading-[1.03] sm:text-5xl md:text-6xl lg:text-[4.15rem]">
                Dev N Suman builds <span className="premium-serif italic font-normal text-[#8f38ff]">execution systems</span> for AlgoForce AI.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                A focused founder profile for clients, partners, students, and builders who want to understand the person shaping AlgoForce AI across services, Labs, and founder ecosystem initiatives.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://www.linkedin.com/in/dev-n-suman-3616a6377/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#06101d] px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#102640]"
                >
                  <FaLinkedin /> LinkedIn
                </a>
                <a
                  href="mailto:af@algoforceaii.com"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#06101d]/10 bg-white px-6 py-3.5 text-sm font-bold text-[#06101d] transition-all hover:border-[#8f38ff]/40 hover:text-[#8f38ff]"
                >
                  <FaEnvelope /> Email
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#06101d]/10 bg-white px-6 py-3.5 text-sm font-bold text-[#06101d] transition-all hover:border-[#8f38ff]/40 hover:text-[#8f38ff]"
                >
                  Work with AlgoForce <FaArrowRight size={11} />
                </Link>
              </div>

              <div className="mt-8 flex items-start gap-3 rounded-[24px] border border-[#06101d]/10 bg-[#f7f9fc] p-5 text-sm font-semibold text-slate-500">
                <FaMapMarkerAlt className="mt-0.5 text-[#8f38ff]" />
                <span>Office: South Delhi, Kalkaji, New Delhi 110019</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase text-[#8f38ff]">Operating Philosophy</p>
            <h2 className="text-3xl font-semibold md:text-4xl">Leadership with a systems lens</h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-slate-500 md:text-base">
            Premium does not mean louder. The founder page now keeps the tone clean, editorial, and business-first.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[30px] border border-[#06101d]/10 bg-white p-6 shadow-[0_24px_70px_rgba(6,47,79,0.08)] md:p-7"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc] text-[#8f38ff]">
                <pillar.icon />
              </div>
              <h3 className="mb-3 text-2xl font-semibold">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{pillar.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 md:pb-24">
        <div className="rounded-[34px] border border-[#06101d]/10 bg-white p-6 shadow-[0_24px_70px_rgba(6,47,79,0.08)] md:p-8 lg:p-10">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase text-[#8f38ff]">Ecosystem</p>
              <h2 className="text-3xl font-semibold md:text-4xl">Three connected execution engines</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/labs" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#06101d] px-5 py-3 text-sm font-bold text-white">
                Visit Labs <FaArrowRight size={11} />
              </Link>
              <Link to="/team" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#06101d]/10 bg-[#f7f9fc] px-5 py-3 text-sm font-bold text-[#06101d]">
                Meet Team
              </Link>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {engines.map((engine, index) => (
              <motion.article
                key={engine.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[26px] border border-[#06101d]/10 bg-[#f7f9fc] p-6"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#06101d]/10 bg-white text-[#8f38ff]">
                  <engine.icon />
                </div>
                <h3 className="mb-3 text-xl font-semibold">{engine.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{engine.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 md:pb-24">
        <div className="rounded-[30px] border border-[#06101d]/10 bg-[#06101d] p-7 text-white md:p-10">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase text-purple-300">Signature</p>
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">AlgoForce AI</h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-300 md:text-base">
              A premium execution company focused on systems, talent infrastructure, and disciplined business delivery.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Founder
