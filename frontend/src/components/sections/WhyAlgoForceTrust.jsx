import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { 
  Layers, 
  Target, 
  Cpu, 
  Workflow, 
  ShieldCheck, 
  Headphones, 
  FileCheck2
} from 'lucide-react'

const PILLARS = [
  {
    icon: Layers,
    title: 'One Partner Across Multiple Requirements',
    description:
      'Eliminate the friction of managing separate vendors for consulting, web development, mobile apps, AI automation, and system maintenance. AlgoForce unifies all six capabilities under one accountable delivery team.'
  },
  {
    icon: Target,
    title: 'Business-Problem-First Methodology',
    description:
      'We do not push trendy frameworks or unnecessary AI models. Every engagement begins with dissecting your operational bottlenecks, identifying constraints, and proposing the most economical, reliable solution.'
  },
  {
    icon: Cpu,
    title: 'Custom Engineering Over Generic Templates',
    description:
      'Your business logic and compliance needs are unique. We engineer software tailored to your specific workflows, database schemas, and organizational hierarchy rather than forcing rigid off-the-shelf SaaS compromises.'
  },
  {
    icon: Workflow,
    title: 'Deep Integration with Your Existing Stack',
    description:
      'You do not need to replace your existing ERP or CRM. We build non-invasive middleware and API connectors that integrate smoothly with Tally, SAP, Zoho, Salesforce, legacy SQL databases, and internal spreadsheets.'
  },
  {
    icon: ShieldCheck,
    title: 'Development & Implementation Under One Engagement',
    description:
      'We do not hand over code and walk away. Our engineers supervise staging validation, data migration, cloud deployment, and user onboarding to ensure high user adoption and zero operational disruption.'
  },
  {
    icon: Headphones,
    title: 'Continued Technical Support & SLAs',
    description:
      'Software requires continuous stewardship. We offer structured monthly retainers, 24/7 uptime monitoring, security patching, and ongoing feature enhancements to keep your systems fast and dependable.'
  }
]

const WhyAlgoForceTrust = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#f8fafc] text-slate-900 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#092941] bg-white border border-slate-200 px-4 py-1.5 rounded-full mb-4 shadow-2xs">
            Reliability & Engineering Rigor
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-[#092941] mb-5">
            Why Organizations Choose{' '}
            <span className="font-serif italic font-normal text-purple-900">
              AlgoForce as Their Technology Partner.
            </span>
          </h2>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
            Grounded in software engineering fundamentals, transparent communication, and a commitment to measurable operational outcomes.
          </p>
        </motion.div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {PILLARS.map((p, idx) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-3xl bg-gradient-to-b from-white via-white to-slate-50 border-t-2 border-t-white border-b-3 border-b-slate-300/80 border-x border-slate-200/90 p-7 shadow-[0_14px_30px_-4px_rgba(9,41,65,0.1),0_4px_10px_rgba(9,41,65,0.04),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-1 hover:shadow-[0_22px_45px_-6px_rgba(9,41,65,0.16)] transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border-t border-t-white border-b-2 border-b-slate-200 border-x border-slate-200 flex items-center justify-center text-[#092941] mb-5 shadow-[0_4px_10px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1)] group-hover:bg-purple-50 group-hover:text-purple-900 transition-colors">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-[#092941] mb-3 group-hover:text-purple-950 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {p.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Verified Enterprise Credentials Bar */}
        <div className="p-7 rounded-3xl bg-gradient-to-r from-white via-slate-50 to-white border-t-2 border-t-white border-b-3 border-b-slate-300 border-x border-slate-200 shadow-[0_16px_35px_-4px_rgba(9,41,65,0.1),0_4px_10px_rgba(9,41,65,0.04),inset_0_1px_0_rgba(255,255,255,1)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border-t border-t-white border-b-2 border-b-emerald-200 border-x border-emerald-200 text-emerald-800 flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(16,185,129,0.1),inset_0_1px_0_rgba(255,255,255,1)]">
              <FileCheck2 size={24} />
            </div>
            <div>
              <div className="text-sm font-bold text-[#092941] mb-1 flex items-center gap-2">
                <span>Verified Government of India Enterprise</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Registered under the Ministry of Micro, Small and Medium Enterprises (MSME) • Registration Number: <span className="font-mono text-slate-900 font-semibold">UDYAM-DL-08-0122150</span>
              </p>
            </div>
          </div>

          <Link to="/about">
            <button className="px-5 py-2.5 bg-gradient-to-b from-white to-slate-100 hover:to-slate-200 text-slate-900 border-t border-t-white border-b-2 border-b-slate-300 border-x border-slate-200 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shadow-[0_4px_10px_rgba(9,41,65,0.05),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5">
              Learn More About AlgoForce →
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default WhyAlgoForceTrust
