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
      title: "FactoryGPT & Workflow Quality Audit",
      problem: "Manual visual inspection of manufactured components caused production bottlenecks and high defect leakage rates during peak production cycles.",
      solution: "Implemented FactoryGPT connected to live camera feeds to automate defect detection and synchronize quality metrics with ERP databases.",
      roi: "42% reduction in defect leakage; 99.8% accuracy in defect logging."
    },
    {
      icon: <FaHeartbeat className="text-purple-400" />,
      industry: "Healthcare",
      title: "Sales Copilot & CRM Integration",
      problem: "Front-desk staff spent 30+ hours weekly manually coordinating doctor schedules, patient intake notes, and CRM databases.",
      solution: "Deployed Sales Copilot to automatically handle patient intake, qualify inquiries, and update clinic CRMs in real time.",
      roi: "30+ administrative hours saved weekly; 92% reduction in schedule coordination delay."
    },
    {
      icon: <FaHotel className="text-purple-400" />,
      industry: "Hotels & Hospitality",
      title: "HotelGPT & Booking Operations",
      problem: "Over 20% of guest reservation queries via messaging channels failed to close due to delayed staff responses.",
      solution: "Deployed HotelGPT connected to property management systems to handle bookings and answer guest queries 24/7.",
      roi: "19% increase in direct reservation revenue; zero missed queries during peak hours."
    },
    {
      icon: <FaShoppingBag className="text-purple-400" />,
      industry: "Retail & E-Commerce",
      title: "Inventory Copilot & ERP Sync",
      problem: "Scattered data across retail registers and e-commerce warehouses caused constant inventory lag and stockouts.",
      solution: "Implemented Inventory Copilot to connect Shopify endpoints to legacy Tally ERP databases for real-time inventory matching.",
      roi: "25% decrease in over-stocking costs; real-time sales reconciliations."
    },
    {
      icon: <FaGraduationCap className="text-purple-400" />,
      industry: "Corporate & HR Operations",
      title: "HR Copilot & Knowledge Operating Layer",
      problem: "Support teams struggled to resolve employee policy and training queries due to unstructured data scattered across PDF files.",
      solution: "Deployed HR Copilot to serve as an internal knowledge operating layer, enabling instant extraction of HR policies and onboarding steps.",
      roi: "75% faster internal query resolution; 100% accurate policy answers."
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
            How our specialized AI copilots drive efficiency, automate business functions, and deliver operational intelligence.
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
