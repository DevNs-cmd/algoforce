import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Factory, GraduationCap, ShoppingBag, Truck, Stethoscope, Briefcase, ArrowRight, CheckCircle2, ShieldCheck, Layers } from 'lucide-react'
import SeoHead from '../components/common/SeoHead'

const INDUSTRIES = [
  {
    id: 'manufacturing',
    title: 'Manufacturing & Distribution',
    tagline: 'Operational visibility from plant floor to financial ledger.',
    icon: Factory,
    featured: true,
    badge: 'Priority Sector 01',
    route: '/industries/manufacturing',
    challenges: [
      'Disconnected shop-floor shift logs & manual downtime reporting',
      'Inventory count discrepancies between floor & warehouse',
      'Delayed ERP & Tally Prime invoice entry causing billing lags'
    ],
    solutions: [
      'FactoryGPT line logging & operator terminal applications',
      'Real-time non-invasive Tally Prime & ERP data sync',
      'QR/Barcode dispatch verification & automated gate passes'
    ]
  },
  {
    id: 'education',
    title: 'Education & Institutional Networks',
    tagline: 'Modern campus operations from admission enquiry to alumni.',
    icon: GraduationCap,
    featured: true,
    badge: 'Priority Sector 02',
    route: '/industries/education',
    challenges: [
      'Leaked admission leads & slow multi-channel enquiry response',
      'Fragmented fee reconciliations across multiple bank accounts',
      'Clunky legacy student/parent portals with high support overhead'
    ],
    solutions: [
      'Omnichannel admission CRM with automated qualification',
      'Unified high-speed student, faculty & parent web/mobile portals',
      'Automated payment gateway reconciliations into accounting ledger'
    ]
  },
  {
    id: 'retail',
    title: 'Retail & Multi-Channel E-Commerce',
    tagline: 'Unified inventory, omnichannel orders, and automated fulfillment.',
    icon: ShoppingBag,
    badge: 'Domain Practice',
    route: '/contact?industry=retail',
    challenges: [
      'Stock mismatch between offline store POS and online marketplaces',
      'Manual order routing causing fulfillment delays and stockouts',
      'Slow return processing and inventory restock reconciliations'
    ],
    solutions: [
      'Centralized real-time inventory synchronization engine',
      'Automated multi-warehouse order routing and dispatch tracking',
      'Custom customer loyalty portals and integrated checkout experiences'
    ]
  },
  {
    id: 'logistics',
    title: 'Logistics, Fleet & Supply Chain',
    tagline: 'Real-time vehicle tracking, proof-of-delivery, and route visibility.',
    icon: Truck,
    badge: 'Domain Practice',
    route: '/contact?industry=logistics',
    challenges: [
      'Lack of real-time milestone tracking for transit shipments',
      'Paper proof-of-delivery (POD) delaying invoice generation by weeks',
      'Manual driver assignment and inefficient dispatch scheduling'
    ],
    solutions: [
      'Driver mobile application with digital photo & signature POD',
      'Automated transit milestone alerts for dispatchers and clients',
      'Instant billing trigger upon digital delivery confirmation'
    ]
  },
  {
    id: 'healthcare',
    title: 'Healthcare Clinics & Diagnostic Centers',
    tagline: 'Streamlined patient appointments, lab reports, and doctor schedules.',
    icon: Stethoscope,
    badge: 'Domain Practice',
    route: '/contact?industry=healthcare',
    challenges: [
      'High patient no-show rates due to lack of automated reminders',
      'Delayed lab report dispatch causing patient follow-up bottlenecks',
      'Unstructured doctor schedules and appointment slot overlap'
    ],
    solutions: [
      'WhatsApp/SMS appointment booking and confirmation automation',
      'Automated patient portal with secure test report downloads',
      'Doctor schedule management and digital prescription workflows'
    ]
  },
  {
    id: 'professional-services',
    title: 'Professional Services & Consultancies',
    tagline: 'Automated client intake, project milestone tracking, and billing.',
    icon: Briefcase,
    badge: 'Domain Practice',
    route: '/contact?industry=services',
    challenges: [
      'Disorganized client onboarding and document collection cycles',
      'Unbillable hours lost to manual status updates and email back-and-forth',
      'Delayed milestone invoicing impacting operational cash flow'
    ],
    solutions: [
      'Self-service client intake and document upload portals',
      'Real-time project milestone tracking with automated client notifications',
      'Automated milestone billing and contract milestone triggers'
    ]
  }
]

const Industries = () => {
  return (
    <div className="bg-[#f8fafc] text-slate-900 pt-28 sm:pt-36 pb-24 overflow-hidden">
      <SeoHead 
        title="Industry Solutions & Sector Blueprints | AlgoForce" 
        description="Explore how AlgoForce designs domain-tailored software systems, workflow automation, and enterprise integrations for manufacturing, education, retail, logistics, and healthcare."
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-t border-t-white border-b-2 border-b-slate-200 border-x border-slate-200 shadow-[0_4px_10px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1)] mb-4">
            <Layers size={14} className="text-[#092941]" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-[#092941]">
              Domain-Specific Solutions
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#092941] tracking-tight mb-5">
            Software Built for Your{' '}
            <span className="font-serif italic font-normal text-purple-900 block sm:inline">
              Operational Reality.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Technology succeeds when it respects industry-specific workflows, terminology, and operational constraints. Explore our tailored engineering architectures across key sectors.
          </p>
        </div>

        {/* Priority Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon
            return (
              <div 
                key={ind.id}
                className="rounded-3xl bg-gradient-to-b from-white via-white to-slate-50 border-t-2 border-t-white border-b-4 border-b-slate-300/90 border-x border-slate-200/90 shadow-[0_20px_45px_-6px_rgba(9,41,65,0.14),0_8px_18px_-4px_rgba(9,41,65,0.08),inset_0_1px_0_rgba(255,255,255,1)] p-7 sm:p-9 flex flex-col justify-between hover:-translate-y-1 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white border-t border-t-white border-b-2 border-b-slate-200 border-x border-slate-200 flex items-center justify-center text-[#092941] shadow-[0_4px_10px_rgba(9,41,65,0.08),inset_0_1px_0_rgba(255,255,255,1)]">
                        <Icon size={24} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-purple-900 font-bold block">
                          {ind.badge}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-[#092941]">
                          {ind.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 mb-6 font-normal leading-relaxed">
                    {ind.tagline}
                  </p>

                  {/* Bottlenecks vs Solutions */}
                  <div className="space-y-4 mb-8">
                    <div className="p-4 rounded-2xl bg-rose-50/30 border border-rose-100 shadow-2xs">
                      <span className="text-[10px] font-mono uppercase font-bold text-rose-900 block mb-2">
                        Common Operational Bottlenecks:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {ind.challenges.map((c, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-purple-50/30 border border-purple-100 shadow-2xs">
                      <span className="text-[10px] font-mono uppercase font-bold text-purple-900 block mb-2">
                        AlgoForce Engineered Architecture:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {ind.solutions.map((s, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 size={13} className="text-[#092941] mt-0.5 flex-shrink-0" />
                            <span className="font-medium">{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100">
                  <Link to={ind.route}>
                    <button className="w-full py-3 bg-gradient-to-b from-[#12395b] to-[#092941] hover:from-[#0d2d48] hover:to-[#071f32] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all border-t border-t-white/30 border-b-2 border-b-[#051724] shadow-[0_8px_20px_rgba(9,41,65,0.32),inset_0_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-0.5">
                      <span>{ind.featured ? 'View Full Sector Blueprint' : 'Discuss Sector Requirements'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Custom Sector Inquiries CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-white via-slate-50 to-white border-t-2 border-t-white border-b-4 border-b-slate-300 border-x border-slate-200 shadow-[0_16px_35px_-4px_rgba(9,41,65,0.1),inset_0_1px_0_rgba(255,255,255,1)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#092941] mb-2">
              Operating in another industry sector?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              We frequently architect bespoke digital solutions for real estate, logistics, legal, and financial services. Let's discuss your specific operational workflow.
            </p>
          </div>
          <Link to="/contact">
            <button className="px-6 py-3.5 bg-gradient-to-b from-[#12395b] to-[#092941] hover:from-[#0d2d48] hover:to-[#071f32] text-white rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border-t border-t-white/30 border-b-2 border-b-[#051724] shadow-[0_10px_22px_rgba(9,41,65,0.32),inset_0_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-0.5">
              Discuss Your Sector →
            </button>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Industries
