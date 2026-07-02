import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaBuilding, FaHeartbeat, FaHotel, FaShoppingBag, FaGraduationCap } from 'react-icons/fa'

const CaseStudies = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const cases = [
    {
      icon: <FaBuilding className="text-purple-400" />,
      industry: "Manufacturing",
      title: "Vision AI & Workflow Quality Audit System",
      problem: "Manual visual verification of manufactured parts was causing bottlenecks and high error rates during peak production cycles.",
      solution: "Implemented custom Vision AI filters mapping live cameras to n8n automated queues, instantly detecting defects and reporting to Tally Prime.",
      roi: "42% decrease in Quality Assurance cycle times; 99.8% accuracy in defect logging."
    },
    {
      icon: <FaHeartbeat className="text-purple-400" />,
      industry: "Healthcare",
      title: "Patient Booking & CRM Integration Pipeline",
      problem: "Front-desk workers spent 30+ hours weekly manually matching WhatsApp booking messages with Doctor calendars and hospital databases.",
      solution: "Connected WhatsApp Business API to custom Salesforce tables with automated agent routing, callback triggers, and SMS confirmations.",
      roi: "30+ administrative hours saved weekly; 92% decrease in booking scheduling friction."
    },
    {
      icon: <FaHotel className="text-purple-400" />,
      industry: "Hotels & Hospitality",
      title: "AI Booking Assistant & Local Database Sync",
      problem: "Over 20% of direct reservation queries via WhatsApp and Web Chat failed to close due to delayed staff follow-up replies.",
      solution: "Deployed 24/7 AI Booking Agents integrated with the hotel PMS database, executing reservation links and answering room queries immediately.",
      roi: "19% increase in direct booking revenue; zero missed queries during off-business hours."
    },
    {
      icon: <FaShoppingBag className="text-purple-400" />,
      industry: "Retail & E-Commerce",
      title: "Predictive Inventory Sync & Dashboard Console",
      problem: "Scattered data across offline retail registers and e-commerce warehouses caused constant inventory lag and stockouts.",
      solution: "Developed unified data integrations connecting Shopify endpoints to legacy Tally ERP databases with real-time forecasting dashboards.",
      roi: "25% decrease in over-stocking costs; instant sales reconciliations via a central dashboard."
    },
    {
      icon: <FaGraduationCap className="text-purple-400" />,
      industry: "Education & Corporate Academy",
      title: "Intelligent Knowledge Management Portal",
      problem: "Support staff struggled to resolve student curriculum queries due to unstructured data scattered across hundreds of PDFs and videos.",
      solution: "Built a private, RAG-powered internal assistant mapping curriculum files, enabling tutors to search and retrieve reference details instantly.",
      roi: "75% faster student support ticket resolution; 100% accurate syllabus extraction."
    }
  ]

  return (
    <section ref={ref} id="case-studies" className="py-16 md:py-24 bg-[#05050F] text-white relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-purple-900/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-400 mb-4">Case Studies</h2>
          <h3 className="text-3xl md:text-5xl font-bold leading-tight">
            Measurable ROI Across <span className="premium-serif italic font-normal text-[#cdb4ff]">Core Industries</span>
          </h3>
          <p className="max-w-xl mx-auto text-slate-400 font-normal text-sm md:text-base mt-4">
            How we solve complex business problems using custom software integration and automated AI pipelines.
          </p>
        </motion.div>

        {/* Case Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cases.map((cs, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + idx * 0.08 }}
              className={`p-7 rounded-[24px] premium-dark-surface border border-white/5 hover:border-purple-500/30 transition-all flex flex-col justify-between ${idx >= 3 ? 'lg:col-span-1 md:col-span-2' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1.5 rounded-full">
                    {cs.industry}
                  </span>
                  <div className="text-xl bg-white/5 p-2.5 rounded-xl border border-white/5">
                    {cs.icon}
                  </div>
                </div>
                <h4 className="text-lg font-bold mb-4 leading-snug">{cs.title}</h4>
                <div className="space-y-3.5 mb-6">
                  <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Problem</h5>
                    <p className="text-slate-300 text-xs leading-relaxed font-normal">{cs.problem}</p>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Solution</h5>
                    <p className="text-slate-300 text-xs leading-relaxed font-normal">{cs.solution}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-5">
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-1">Measured ROI</h5>
                <p className="text-slate-200 text-sm font-bold">{cs.roi}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseStudies
