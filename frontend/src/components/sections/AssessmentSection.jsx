import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { FaCheck, FaArrowRight, FaClock, FaClipboardList, FaBullseye, FaMap } from 'react-icons/fa'
import { trackCTAClick } from '../../utils/analytics'

const AssessmentSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const steps = [
    {
      icon: <FaClock className="text-purple-600" />,
      title: "Map the workflow",
      desc: "We identify the specific manual tasks, systems involved and people in the operational process you want to improve."
    },
    {
      icon: <FaClipboardList className="text-purple-600" />,
      title: "Understand the current process",
      desc: "We establish what already works, where delays or errors occur, and what the workflow depends on across teams and tools."
    },
    {
      icon: <FaBullseye className="text-purple-600" />,
      title: "Identify the automation opportunity",
      desc: "We recommend specifically what to automate, what to leave as-is, and what would create the most practical operational value."
    },
    {
      icon: <FaMap className="text-purple-600" />,
      title: "Provide a clear next step",
      desc: "You receive a structured view of the implementation path — scope, integrations, pilot approach, and what success looks like."
    }
  ]

  const outputs = [
    "Workflow documentation",
    "Gap analysis",
    "Integration fit",
    "Automation scope",
    "Pilot plan",
    "Implementation path"
  ]

  return (
    <section ref={ref} id="book-assessment" className="py-20 md:py-28 bg-white text-black border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-600">Find the workflow worth automating</span>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mt-2 tracking-tight">
              Start with a{' '}
              <span className="premium-serif italic font-normal text-purple-600">Workflow Assessment.</span>
            </h2>
            <p className="text-gray-600 text-sm mt-4 font-normal leading-relaxed">
              Start with a focused workflow conversation. If there is a fit, we'll recommend the appropriate next step — mapping your manual bottlenecks and defining a clear implementation path.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left: 4 Steps */}
            <div className="space-y-5">
              <h3 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-4">What happens during the assessment</h3>
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100/50 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-sm shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">{idx + 1}. {step.title}</h4>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed font-normal">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Deliverables Box */}
            <div className="p-8 md:p-10 rounded-[30px] bg-[#05050F] text-white flex flex-col justify-between h-full border border-white/5 relative overflow-hidden">
              <div className="absolute top-[-10rem] right-[-10rem] w-[25rem] h-[25rem] rounded-full bg-purple-600/5 blur-[80px] pointer-events-none" />

              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block mb-1">Assessment output</span>
                <h3 className="text-2xl font-bold mb-6">What you leave with</h3>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {outputs.map((item) => (
                    <div key={item} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-semibold">
                      <span className="w-4 h-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <FaCheck size={7} className="text-purple-400" />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-normal border-t border-white/5 pt-5">
                  The assessment is a structured workflow conversation, not a generic sales process. If there's a fit, you receive a clear implementation proposal. If there isn't, you receive honest advice about your current options.
                </p>
              </div>

              <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row gap-4 items-center justify-between mt-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Typically 45–60 minutes
                </span>
                <Link
                  to="/contact?type=assessment"
                  onClick={() => trackCTAClick('Book Workflow Assessment', '/contact?type=assessment', 'assessment_section')}
                  className="w-full sm:w-auto"
                >
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white text-black hover:bg-gray-100 px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all">
                    Book Workflow Assessment <FaArrowRight size={8} />
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
