import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaShieldAlt, FaLock, FaChartLine, FaServer, FaCode, FaLink } from 'react-icons/fa'

const WhyChooseUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const reasons = [
    {
      icon: <FaShieldAlt className="text-purple-400" />,
      title: "Enterprise Grade Security",
      desc: "End-to-end encryption, multi-tenant separation, secure API gateways, and rigorous compliance checks matching Indian financial & cloud security standards."
    },
    {
      icon: <FaLock className="text-purple-400" />,
      title: "Absolute Data Privacy",
      desc: "Your data stays yours. We support secure, self-hosted LLM deployments on private cloud VPCs (AWS, Azure) so that proprietary business memory never leaks."
    },
    {
      icon: <FaChartLine className="text-purple-400" />,
      title: "ROI-Driven Engineering",
      desc: "Every system is built to move a business metric. We map out hours saved, error rate reduction, and process leaks to ensure clear financial amortization."
    }
  ]

  const technologies = [
    { name: "Generative AI", tools: "GPT-4o, Claude 3.5 Sonnet, Llama 3, Mistral" },
    { name: "Automation & Code", tools: "n8n, Make, Python, Node.js, Next.js, FastAPI" },
    { name: "Data & Storage", tools: "PostgreSQL, MongoDB, Supabase, Redis, Pinecone (Vector)" }
  ]

  const integrations = [
    "Salesforce CRM", "Zoho Suite", "SAP ERP", "Tally Prime", "WhatsApp Cloud API", "Slack & Teams"
  ]

  return (
    <section ref={ref} id="why-choose-us" className="py-16 md:py-24 bg-[#03070d] text-white relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-[-10rem] right-[-10rem] w-[30rem] h-[30rem] rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10rem] left-[-10rem] w-[30rem] h-[30rem] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 subtle-ai-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-400 mb-4">Enterprise Standards</h2>
          <h3 className="text-3xl md:text-5xl font-bold leading-tight">
            Why Indian Enterprises Trust <span className="premium-serif italic font-normal text-[#cdb4ff]">AlgoForce AI</span>
          </h3>
          <p className="max-w-xl mx-auto text-slate-400 font-normal text-sm md:text-base mt-4">
            We bridge the gap between cutting-edge artificial intelligence and rock-solid, production-grade business execution.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="p-7 md:p-8 rounded-[24px] premium-dark-surface border border-white/5 hover:border-purple-500/30 transition-all flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-115 transition-transform">
                {reason.icon}
              </div>
              <h4 className="text-xl font-bold mb-3">{reason.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed font-normal">{reason.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack & Integrations Row */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-[28px] premium-dark-surface border border-white/5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FaCode className="text-purple-400 text-xl" />
                <h4 className="text-xl font-bold">State-of-the-Art Technology Stack</h4>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 font-normal">
                We select, implement, and maintain the optimum stack tailored for your throughput requirements. No vendor lock-in.
              </p>
              <div className="space-y-4">
                {technologies.map((tech, i) => (
                  <div key={i} className="border-b border-white/5 pb-3">
                    <h5 className="text-xs uppercase tracking-wider font-bold text-purple-400 mb-1">{tech.name}</h5>
                    <p className="text-sm text-slate-200 font-semibold">{tech.tools}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Integrations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-[28px] premium-dark-surface border border-white/5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FaLink className="text-purple-400 text-xl" />
                <h4 className="text-xl font-bold">Seamless Enterprise Integrations</h4>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 font-normal">
                AI is only as good as the systems it connects to. We build direct secure conduits connecting models to your existing workspace directories, messaging pipelines, and ERP databases.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {integrations.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-sm font-semibold text-slate-200 hover:bg-white/[0.04] transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
