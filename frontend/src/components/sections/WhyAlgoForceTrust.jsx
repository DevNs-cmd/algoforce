import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  Layers,
  Target,
  Cpu,
  Workflow,
  ShieldCheck,
  Headphones,
  FileCheck2,
  ArrowRight,
} from 'lucide-react'
import { SectionHeader, FolderTabEar } from './sectionPrimitives'

const PILLARS = [
  {
    num: '01',
    icon: Layers,
    span: 'md:col-span-3',
    tint: 'text-[#2563EB] bg-blue-50 border-blue-100',
    title: 'One Technology Partner',
    description:
      'Multiple technology capabilities under one engagement.',
  },
  {
    num: '02',
    icon: Target,
    span: 'md:col-span-3',
    tint: 'text-[#9A4DFF] bg-purple-50 border-purple-100',
    title: 'Built Around Your Needs',
    description:
      'Solutions based on actual business requirements.',
  },
  {
    num: '03',
    icon: Cpu,
    span: 'md:col-span-2',
    tint: 'text-[#0A2A43] bg-slate-100 border-slate-200',
    title: 'Custom Development',
    description:
      'Software designed around your workflows.',
  },
  {
    num: '04',
    icon: Workflow,
    span: 'md:col-span-2',
    tint: 'text-[#2563EB] bg-blue-50 border-blue-100',
    title: 'Existing System Integration',
    description:
      'Connect with the tools you already use.',
  },
  {
    num: '05',
    icon: Headphones,
    span: 'md:col-span-2',
    tint: 'text-[#0A2A43] bg-slate-100 border-slate-200',
    title: 'Ongoing Support',
    description:
      'Maintenance and continued technical assistance.',
  },
]

const WhyAlgoForceTrust = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section ref={ref} className="py-16 sm:py-24 bg-white text-[#0A2A43] relative overflow-x-clip">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            badge="Why AlgoForce"
            titlePrimary="Why Work With AlgoForce?"
            titleMuted="Practical engineering. Direct accountability."
            description="Plan, build and maintain software built to grow with your business."
            inView={inView}
          />

          {/* Asymmetric Bento Mosaic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-5 mb-8">
            {PILLARS.map((p, idx) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.title}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={prefersReducedMotion || inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className={`${p.span} relative rounded-[22px] bg-[#f8f9fb] hover:bg-white border border-[#e3e8f0] hover:border-[#cbd5e1] p-6 sm:p-7 saas-card-elevation-hover group`}
                >
                  {idx === 0 && <FolderTabEar bgClass="bg-[#f8f9fb]" />}

                  <div>
                    <div className="w-11 h-11 rounded-2xl bg-white border border-[#e2e8f0] saas-squircle-badge flex items-center justify-center flex-shrink-0 mb-5 group-hover:-translate-y-0.5 transition-transform">
                      <span className={`w-6 h-6 rounded-lg border flex items-center justify-center ${p.tint}`}>
                        <Icon size={14} strokeWidth={2.1} />
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-[#6E7B8C]">{p.num}</span>
                        <h3 className="font-['Outfit',sans-serif] text-lg font-semibold text-[#0A2A43] tracking-tight">
                          {p.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#4A5769] leading-[1.65] font-normal">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Official Government Registration Seal Card */}
          <div className="relative rounded-[22px] bg-white border border-[#dce3ec] p-6 sm:p-7 saas-card-elevation flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center flex-shrink-0 shadow-xs">
                <FileCheck2 size={22} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[#0A2A43] mb-1">
                  <span>Registered Government of India Enterprise</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                    Active MSME Unit
                  </span>
                </div>
                <p className="text-xs text-[#4A5769] leading-relaxed">
                  Ministry of Micro, Small and Medium Enterprises (MSME) • Udyam Registration:{' '}
                  <span className="font-mono text-[#0A2A43] font-semibold">UDYAM-DL-08-0122150</span>
                </p>
              </div>
            </div>

            <Link
              to="/about"
              className="px-5 py-2.5 bg-[#f8f9fb] hover:bg-white text-[#0A2A43] border border-[#dce3ec] rounded-xl text-xs font-semibold whitespace-nowrap transition-all shadow-2xs hover:-translate-y-0.5"
            >
              Learn More About AlgoForce →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyAlgoForceTrust
