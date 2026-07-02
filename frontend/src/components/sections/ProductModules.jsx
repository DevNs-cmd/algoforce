import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaBrain, FaCogs, FaWhatsapp, FaCode, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ProductModules = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const services = [
    {
      icon: <FaBrain />,
      title: 'Enterprise AI Solutions',
      problem: "Scattered data silos and unutilized corporate knowledge.",
      solution: "Custom self-hosted AI models and internal RAG portals.",
      roi: "5x faster document search; 100% data privacy on private cloud.",
      tag: 'AI Systems'
    },
    {
      icon: <FaCogs />,
      title: 'Workflow & CRM Automation',
      problem: "Operations teams wasting hours copy-pasting data between tools.",
      solution: "n8n/Make pipelines connecting CRM (Salesforce/Zoho) to databases.",
      roi: "30+ administrative hours saved weekly per user.",
      tag: 'Automation'
    },
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp Automation Agents',
      problem: "Dropped leads and missed bookings due to slow staff follow-up replies.",
      solution: "24/7 AI chat agents integrated directly with inventory and calendars.",
      roi: "19% increase in reservations; instant customer qualification.",
      tag: 'Customer Experience'
    },
    {
      icon: <FaCode />,
      title: 'Custom AI Software',
      problem: "Rigid subscription SaaS with high per-seat fees and lock-in.",
      solution: "Tailored full-stack business software engineered for your business rules.",
      roi: "Zero seat licensing fees; permanent digital asset ownership.",
      tag: 'Custom Dev'
    }
  ]

  return (
    <section id="services" className="py-16 md:py-24 bg-[#05050F] text-white relative">
      <div className="absolute inset-0 bg-purple-600/[0.01] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-[12px] font-bold uppercase tracking-[0.5em] text-purple-500 mb-4">Enterprise Services</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">
            Our Core <span className="premium-serif italic font-normal text-purple-400">Service Suites</span>
          </h3>
          <p className="max-w-xl mx-auto text-gray-400 font-normal text-sm md:text-base">
            We replace manual inefficiencies with secure AI integrations and custom business software engineered for measurable ROI.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="p-6 md:p-7 rounded-[24px] bg-white/[0.02] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.04] transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center text-xl group-hover:bg-purple-600 group-hover:text-white transition-all shadow-2xl">
                    {s.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{s.tag}</span>
                </div>
                <h4 className="text-xl font-bold mb-4">{s.title}</h4>
                
                {/* Problem / Solution fields */}
                <div className="space-y-3 mb-6 text-xs">
                  <div>
                    <span className="block font-bold text-slate-500 uppercase tracking-wider text-[9px] mb-0.5">Problem</span>
                    <p className="text-slate-400 font-normal leading-relaxed">{s.problem}</p>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-500 uppercase tracking-wider text-[9px] mb-0.5">Solution</span>
                    <p className="text-slate-200 font-semibold leading-relaxed">{s.solution}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 mt-2">
                <span className="block font-bold text-purple-400 uppercase tracking-wider text-[9px] mb-1">Expected ROI</span>
                <p className="text-slate-300 font-bold text-xs leading-relaxed mb-6">{s.roi}</p>
                
                <Link to="/services">
                  <button className="text-[10px] font-bold uppercase tracking-widest text-purple-400 group-hover:text-white flex items-center gap-2 transition-colors">
                    Service Details <FaArrowRight size={8} />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Transformation Illustration Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          className="mt-14 p-8 md:p-12 rounded-[28px] bg-gradient-to-br from-[#121226] to-transparent border border-white/5 flex flex-col lg:flex-row justify-between items-center gap-10"
        >
          <div className="flex-1 text-left">
            <div className="text-purple-400 text-sm font-bold uppercase tracking-widest mb-3">Digital Transformation</div>
            <h4 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">Systems Integration & Operations Modernization</h4>
            <p className="text-gray-400 text-sm font-normal leading-relaxed mb-6">
              Transition from manual spreadsheets and legacy delays into an automated, AI-powered system dashboard. We integrate CRM database engines, custom ERP interfaces, WhatsApp endpoints, and analytics reporting into one dashboard.
            </p>
            <Link to="/contact">
              <button className="px-8 py-4 bg-white text-black hover:bg-gray-100 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">
                Request Free Audit
              </button>
            </Link>
          </div>
          
          {/* Transforming Workflows Illustration */}
          <div className="w-full lg:w-[480px] aspect-[16/9] rounded-2xl border border-white/10 overflow-hidden bg-white/5 relative">
            <img 
              src="/digital_transformation.jpg" 
              alt="Manual workflows transforming into automated AI CRM ERP WhatsApp pipelines" 
              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" 
              loading="lazy" 
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductModules
