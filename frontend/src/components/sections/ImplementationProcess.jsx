import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaSearchPlus, FaDraftingCompass, FaCogs, FaChartBar } from 'react-icons/fa'

const ImplementationProcess = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const steps = [
    {
      icon: <FaSearchPlus />,
      title: "1. AI Discovery & Audit",
      duration: "Week 1 - 2",
      desc: "We analyze your business operations, map out repetitive work processes, evaluate data silos, and identify high-ROI opportunities for automation."
    },
    {
      icon: <FaDraftingCompass />,
      title: "2. Architecture & Pilot",
      duration: "Week 3 - 4",
      desc: "We select the optimum models (GPT/Claude/Local), design the secure integration pipelines, and deploy a functional pilot workflow to validate performance."
    },
    {
      icon: <FaCogs />,
      title: "3. Systems Integration",
      duration: "Week 5 - 8",
      desc: "We build out full custom software portals, link systems to your CRM, ERP, and WhatsApp messaging API, and deploy real-time monitoring controls."
    },
    {
      icon: <FaChartBar />,
      title: "4. Handover & Scaling",
      duration: "Continuous",
      desc: "We train your employee teams, monitor token and processing performance, fine-tune agent prompts, and scale the workflows as your business expands."
    }
  ]

  return (
    <section ref={ref} id="implementation-process" className="py-16 md:py-24 bg-white text-black relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-4">Methodology</h2>
          <h3 className="text-3xl md:text-5xl font-bold leading-tight">
            Our Structured <span className="premium-serif italic font-normal text-purple-600">Implementation Process</span>
          </h3>
          <p className="max-w-xl mx-auto text-gray-500 font-normal text-sm md:text-base mt-4">
            How we take your business operations from manual bottlenecks to automated, AI-driven digital ecosystems.
          </p>
        </motion.div>

        {/* Process Timeline Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="p-7 rounded-[24px] bg-gray-50 border border-gray-100 hover:shadow-xl hover:shadow-purple-500/5 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                  {step.icon}
                </div>
                <h4 className="text-xl font-bold mb-1">{step.title}</h4>
                <div className="text-xs font-bold uppercase text-purple-600 tracking-wider mb-4">{step.duration}</div>
                <p className="text-gray-500 text-sm leading-relaxed font-normal">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImplementationProcess
