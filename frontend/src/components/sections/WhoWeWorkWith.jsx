import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { Building2, GraduationCap, Handshake, ArrowRight, CheckCircle2 } from 'lucide-react'

const AUDIENCES = [
  {
    id: 'businesses',
    tabLabel: 'Businesses & Enterprises',
    title: 'For Businesses & Enterprise Operations',
    subtitle: 'Founders, CXOs, Operations, Finance & IT Decision-Makers',
    description:
      'Turn manual operations and fragmented tools into integrated, scalable technology systems. We engineer custom web and mobile applications, automate business processes, connect ERP/CRM data, and provide continuous technical management.',
    icon: Building2,
    badge: 'Commercial Operations',
    highlights: [
      'Custom Enterprise Web & Mobile Applications',
      'End-to-End Workflow & Business Process Automation',
      'Tally Prime, SAP & Legacy Database Connectors',
      'Real-Time Operational Dashboards & Executive Reporting',
      'Dedicated Application Support & Uptime SLAs'
    ],
    ctaText: 'Explore Business Solutions',
    ctaLink: '/services',
    stats: [
      { label: 'Deployment Model', val: 'Private Cloud / On-Prem' },
      { label: 'Integration Fit', val: 'Works with existing stack' }
    ]
  },
  {
    id: 'institutions',
    tabLabel: 'Educational Institutions',
    title: 'For Educational Institutions & Campus Networks',
    subtitle: 'Schools, Colleges, Universities & Coaching Organizations',
    description:
      'Modernize institutional infrastructure and student experiences. We deliver end-to-end admission portals, student lifecycle management systems, administrative workflow automation, and institutional web applications.',
    icon: GraduationCap,
    badge: 'Institutional Transformation',
    highlights: [
      'Multi-Channel Admission & Enquiry Capture Systems',
      'Unified Student, Faculty & Parent Portals',
      'Automated Fee Tracking, Receipting & Notifications',
      'Administrative Workflow & Examination Automation',
      'Modern High-Speed Institutional Portals & Apps'
    ],
    ctaText: 'Explore Education Technology',
    ctaLink: '/industries/education',
    stats: [
      { label: 'Enquiry Response', val: 'Instant 24/7 Automation' },
      { label: 'Student Portals', val: 'Self-service Web & Mobile' }
    ]
  },
  {
    id: 'partners',
    tabLabel: 'Technology & Agency Partners',
    title: 'For Technology, Consulting & Delivery Partners',
    subtitle: 'Consultancies, Agencies, IT Resellers & System Integrators',
    description:
      'Expand your delivery capacity without overhead. Collaborate with AlgoForce for reliable software development, AI implementation, white-label project execution, referral commissions, and joint client engagements.',
    icon: Handshake,
    badge: 'Partner Ecosystem',
    highlights: [
      'White-Label Software & Digital Engineering Delivery',
      'AI & Intelligent Automation Implementation Support',
      'Project Delivery Partnerships for Complex Scopes',
      'Transparent Recurring Referral & Reseller Models',
      'Long-Term Collaborative Technology Delivery'
    ],
    ctaText: 'Become a Technology Partner',
    ctaLink: '/partnerships',
    stats: [
      { label: 'Delivery Model', val: 'White-label / Co-delivery' },
      { label: 'Partnership Terms', val: 'Transparent SLA & NDA' }
    ]
  }
]

const WhoWeWorkWith = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const [activeTab, setActiveTab] = useState(0)

  const current = AUDIENCES[activeTab]
  const CurrentIcon = current.icon

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#f8fafc] text-slate-900 border-b border-slate-200/90 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 max-w-3xl mx-auto"
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#092941] bg-white border border-slate-200/90 px-4 py-1.5 rounded-full mb-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            Audience-Led Pathways
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-[#092941] mb-4">
            Built for Your Specific{' '}
            <span className="font-serif italic font-normal text-purple-900">
              Technology Context.
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Select your organization type to see tailored technology capabilities, architecture fit, and engagement routes.
          </p>
        </motion.div>

        {/* 3D Tactile Tab Switcher — Mobile Responsive Horizontal Scroll */}
        <div className="flex items-center justify-center mb-8 overflow-x-auto pb-2 scrollbar-hide max-w-full">
          <div className="inline-flex p-1.5 sm:p-2 rounded-2xl bg-gradient-to-b from-slate-200/90 to-slate-300/80 border-t border-t-white/80 border-b-2 border-b-slate-400/50 border-x border-slate-300/90 shadow-[inset_0_3px_8px_rgba(9,41,65,0.12),inset_0_1px_2px_rgba(0,0,0,0.08),0_2px_4px_rgba(255,255,255,0.9)] backdrop-blur-md gap-1">
            {AUDIENCES.map((item, idx) => {
              const Icon = item.icon
              const isActive = activeTab === idx
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-b from-[#12395b] to-[#092941] text-white shadow-[0_8px_20px_rgba(9,41,65,0.38),0_2px_6px_rgba(9,41,65,0.2),inset_0_1px_1px_rgba(255,255,255,0.35)] border-t border-t-white/30 border-b-2 border-b-[#051724] -translate-y-0.5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 active:translate-y-0'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-white' : 'text-slate-500'} />
                  <span>{item.tabLabel}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 3D Elevated Spotlight Showcase Card */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.99 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-3xl bg-gradient-to-b from-white via-white to-slate-50 border-t-2 border-t-white border-b-4 border-b-slate-300/90 border-x border-slate-200/90 shadow-[0_24px_55px_-6px_rgba(9,41,65,0.18),0_12px_24px_-6px_rgba(9,41,65,0.12),0_0_0_1px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_2px_rgba(9,41,65,0.03)] p-6 sm:p-10 md:p-12 relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Overview Column */}
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border-t border-t-white border-b border-b-slate-200 border-x border-slate-200 text-xs font-mono font-bold text-slate-700 mb-4 shadow-[0_4px_10px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1)]">
                    <CurrentIcon size={14} className="text-purple-900" />
                    <span>{current.badge}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#092941] mb-2 tracking-tight">
                    {current.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mb-4">
                    {current.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {current.description}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <Link to={current.ctaLink} className="w-full sm:w-auto">
                      <button className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-b from-[#12395b] to-[#092941] hover:from-[#0d2d48] hover:to-[#071f32] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all border-t border-t-white/30 border-b-2 border-b-[#051724] shadow-[0_10px_22px_rgba(9,41,65,0.32),0_2px_4px_rgba(9,41,65,0.2),inset_0_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm">
                        <span>{current.ctaText}</span>
                        <ArrowRight size={15} />
                      </button>
                    </Link>

                    <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                      {current.stats.map((st, i) => (
                        <div key={i} className="flex flex-col bg-white/80 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
                          <span className="text-[9px] sm:text-[10px] uppercase font-mono text-slate-400">{st.label}</span>
                          <span className="text-slate-800 font-bold text-[11px] sm:text-xs">{st.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Capabilities Box (Layered 3D Floating Sub-card) */}
                <div className="lg:col-span-5 bg-gradient-to-b from-white to-slate-50/90 p-5 sm:p-6 rounded-2xl border-t-2 border-t-white border-b-3 border-b-slate-300 border-x border-slate-200 shadow-[0_14px_30px_-4px_rgba(9,41,65,0.12),0_4px_10px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1)]">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#092941] mb-4 flex items-center justify-between">
                    <span>Key Solution Capabilities:</span>
                    <span className="text-[10px] font-mono text-purple-900 font-bold px-2 py-0.5 rounded bg-purple-50 border border-purple-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                      5 Priority Areas
                    </span>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    {current.highlights.map((h, i) => (
                      <div 
                        key={i} 
                        className="flex items-start gap-2.5 text-xs text-slate-700 p-2.5 sm:p-3 rounded-xl bg-white border-t border-t-white border-b-2 border-b-slate-200 border-x border-slate-200/90 shadow-[0_4px_12px_rgba(9,41,65,0.06),0_1px_2px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(9,41,65,0.1)] transition-all"
                      >
                        <CheckCircle2 size={15} className="text-[#092941] mt-0.5 flex-shrink-0" />
                        <span className="font-semibold leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default WhoWeWorkWith
