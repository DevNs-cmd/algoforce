import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { FaCheck, FaArrowRight, FaClock, FaClipboardList, FaBullseye, FaMap } from 'react-icons/fa'

const AssessmentSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const steps = [
    {
      icon: <FaClock className="text-purple-600" />,
      title: "We study your workflows",
      desc: "Our team analyzes your current operational routines and manual tasks."
    },
    {
      icon: <FaClipboardList className="text-purple-600" />,
      title: "We identify bottlenecks",
      desc: "We pinpoint manual processes, data silos, and communication delays."
    },
    {
      icon: <FaBullseye className="text-purple-600" />,
      title: "We recommend software",
      desc: "We match your business needs with the right AI software products from our catalog."
    },
    {
      icon: <FaMap className="text-purple-600" />,
      title: "We plan implementation",
      desc: "We outline database compatibility, integrations, and deployment timelines."
    }
  ]

  const outputs = [
    "Assessment Summary",
    "System Audit",
    "Product Selection",
    "Deployment Plan",
    "Pricing Details",
    "Implementation Timeline"
  ]

  return (
    <section ref={ref} id="assessment" className="py-16 md:py-24 bg-white text-black border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-600">The Entry Point</span>
            <h3 className="text-3xl md:text-5xl font-bold leading-tight mt-2 tracking-tight">
              Every deployment starts with a <span className="premium-serif italic font-normal text-purple-600">Business Assessment.</span>
            </h3>
            <p className="text-gray-500 text-sm mt-4 font-normal leading-relaxed">
              We do not build custom software from scratch. We assess your operations first to ensure our pre-built AI software products fit your business needs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left: 4 Steps */}
            <div className="space-y-6">
              <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-4">Assessment steps</h4>
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100/50 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-sm shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-base">{idx + 1}. {step.title}</h5>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed font-normal">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Deliverables Box */}
            <div className="p-8 md:p-10 rounded-[30px] bg-[#05050F] text-white flex flex-col justify-between h-full border border-white/5 relative overflow-hidden group">
              <div className="absolute top-[-10rem] right-[-10rem] w-[25rem] h-[25rem] rounded-full bg-purple-600/5 blur-[80px] pointer-events-none" />
              
              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block mb-1">Deliverables</span>
                <h4 className="text-2xl font-bold mb-6">Assessment Deliverables</h4>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {outputs.map((item) => (
                    <div key={item} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-semibold">
                      <span className="w-4 h-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <FaCheck size={7} className="text-purple-400" />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Takes 30–60 Minutes
                </span>
                <Link to="/contact" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white text-black hover:bg-gray-100 px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all">
                    Book Business Assessment <FaArrowRight size={8} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AssessmentSection
