import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaSearch, FaList, FaCogs, FaRegCalendarAlt } from 'react-icons/fa'

const ImplementationProcess = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const steps = [
    {
      icon: <FaSearch />,
      title: "Business Assessment",
      desc: "We study your workflows and audit your data systems."
    },
    {
      icon: <FaList />,
      title: "Product Selection",
      desc: "We recommend the exact specialized AI products for your business."
    },
    {
      icon: <FaCogs />,
      title: "Implementation",
      desc: "We configure, integrate, and deploy the selected products."
    },
    {
      icon: <FaRegCalendarAlt />,
      title: "Monthly Subscription",
      desc: "We manage hosting, models, security, and updates."
    }
  ]

  return (
    <section ref={ref} id="how-it-works" className="py-16 md:py-24 bg-white text-black relative border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-4">How it works</h2>
          <h3 className="text-3xl md:text-5xl font-bold leading-tight">
            How <span className="premium-serif italic font-normal text-purple-600">AlgoForce works.</span>
          </h3>
        </motion.div>

        {/* Process Timeline Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
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
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Step 0{idx + 1}</span>
                <h4 className="text-xl font-bold mt-2 mb-3">{step.title}</h4>
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
