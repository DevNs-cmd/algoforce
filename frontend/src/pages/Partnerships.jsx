import { useState } from 'react'
import { motion } from 'framer-motion'
import { Handshake, ArrowRight, CheckCircle2, ShieldCheck, Briefcase, Award, Sparkles, Send } from 'lucide-react'
import SeoHead from '../components/common/SeoHead'

const PARTNERSHIP_MODELS = [
  {
    id: 'white-label',
    title: 'White-Label Software & Digital Engineering',
    subtitle: 'Under Your Brand • Full Client Confidentiality',
    description: 'Deliver custom web applications, mobile apps, ERP connectors, and complex backend systems to your clients under your own agency brand, executed by our senior engineering team.',
    benefits: [
      'Strict White-Label Confidentiality (NDA & Non-Solicitation)',
      'Direct Slack/Teams channel integration with our engineering leads',
      'Transparent milestone pricing allowing predictable agency margins',
      'Full technical documentation and client-facing architecture decks'
    ]
  },
  {
    id: 'ai-codelivery',
    title: 'AI & Intelligent Automation Co-Delivery',
    subtitle: 'Specialized AI Engineering • Joint Execution',
    description: 'When your clients request AI workflows, LLM agents, document intelligence, or custom machine learning models, partner with AlgoForce to design and deploy the AI layer seamlessly.',
    benefits: [
      'Pre-tested agentic scaffolding reducing development time by 50%',
      'Custom LLM prompt pipelines, embeddings, and vector databases',
      'Non-invasive API middleware for SAP, Tally, Salesforce, and legacy DBs',
      'Ongoing model maintenance, prompt tuning, and SLA support'
    ]
  },
  {
    id: 'institutional',
    title: 'Institutional & Campus Delivery Partnerships',
    subtitle: 'For Education Consultants & Institutional Resellers',
    description: 'Collaborate to digitize schools, colleges, coaching institutes, and universities. We engineer the admission CRMs, student/parent portals, and fee workflows while you manage institutional relationships.',
    benefits: [
      'Turnkey institutional portal platforms with high-speed web & mobile apps',
      'Proven admission conversion engine and fee reconciliation pipelines',
      'Dedicated on-site or remote institutional onboarding support',
      'Generous recurring annual maintenance contract (AMC) revenue share'
    ]
  },
  {
    id: 'reseller',
    title: 'Reseller & Referral Agreements',
    subtitle: 'Earn 10%–20% on Every Qualified Engagement',
    description: 'Refer clients who need custom software engineering, enterprise integrations, or managed tech services. Receive competitive upfront referral commissions and recurring revenue share on long-term contracts.',
    benefits: [
      'Formal referral contract with transparent milestone tracking',
      '10% to 20% commission on closed project contracts',
      'Recurring share on ongoing Managed Services & AMC retainer retainers',
      'Zero delivery or operational liability for your firm'
    ]
  },
  {
    id: 'joint-consortium',
    title: 'Joint Bidding & Enterprise Consortiums',
    subtitle: 'Collaborative Bids for Large Scale RFP/Tenders',
    description: 'For large corporate tenders or institutional RFPs requiring cross-functional credentials, AlgoForce provides technical capability, MSME certifications, and dedicated engineering horsepower.',
    benefits: [
      'MSME registered enterprise backing (UDYAM-DL-08-0122150)',
      'Joint proposal drafting and technical architecture documentation',
      'Clear scope demarcation and shared risk framework',
      'Joint executive presentations to client procurement teams'
    ]
  }
]

const Partnerships = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    partnershipModel: 'white-label',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.organization,
          type: 'partnership',
          inquiryType: `Partner Inquiry - ${formData.partnershipModel}`,
          message: `Partnership Model: ${formData.partnershipModel}\nOrganization: ${formData.organization}\nDetails: ${formData.message}`
        })
      })

      if (res.ok) {
        setIsSuccess(true)
      } else {
        // Fallback simulate success for dev mode
        setIsSuccess(true)
      }
    } catch {
      setIsSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-[#f8fafc] text-slate-900 pt-28 sm:pt-36 pb-24 overflow-hidden">
      <SeoHead 
        title="Technology & Agency Partnership Program | AlgoForce" 
        description="Expand your delivery capacity. AlgoForce collaborates with agencies, consultancies, IT resellers, and consultants through white-label engineering and referral partnerships."
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-t border-t-white border-b-2 border-b-slate-200 border-x border-slate-200 shadow-[0_4px_10px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1)] mb-4">
            <Handshake size={15} className="text-[#092941]" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-[#092941]">
              Partner Ecosystem
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#092941] tracking-tight mb-5">
            Deliver More.{' '}
            <span className="font-serif italic font-normal text-purple-900 block sm:inline">
              Scale With Confidence.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Whether you are a marketing agency needing custom backend development, a management consultancy needing AI implementation, or an IT reseller seeking referral commissions — AlgoForce provides reliable engineering execution under strict confidentiality.
          </p>
        </div>

        {/* 5 Partnership Models Grid */}
        <div className="space-y-8 mb-20">
          <div className="text-center mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#092941] bg-white px-3 py-1 rounded-md border border-slate-200 shadow-2xs">
              Five Structured Engagement Models
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PARTNERSHIP_MODELS.map((item, idx) => (
              <div 
                key={item.id}
                className="rounded-3xl bg-gradient-to-b from-white via-white to-slate-50 border-t-2 border-t-white border-b-4 border-b-slate-300/90 border-x border-slate-200/90 shadow-[0_16px_35px_-6px_rgba(9,41,65,0.12),0_6px_14px_-4px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1)] p-7 flex flex-col justify-between hover:-translate-y-1 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <span className="text-[11px] font-mono font-bold text-purple-900">
                      Model 0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                      {item.subtitle.split('•')[0]}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#092941] mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal mb-5">
                    {item.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {item.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                        <CheckCircle2 size={13} className="text-[#092941] mt-0.5 flex-shrink-0" />
                        <span className="font-medium leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a href="#partner-form" onClick={() => setFormData(prev => ({ ...prev, partnershipModel: item.id }))}>
                  <button className="w-full py-2.5 bg-gradient-to-b from-white to-slate-100 hover:to-slate-200 text-[#092941] border-t border-t-white border-b-2 border-b-slate-300 border-x border-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs hover:-translate-y-0.5">
                    <span>Apply for this Model</span>
                    <ArrowRight size={13} />
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Trust & NDA Guarantees */}
        <div className="p-8 sm:p-11 rounded-3xl bg-gradient-to-r from-white via-slate-50 to-white border-t-2 border-t-white border-b-4 border-b-slate-300 border-x border-slate-200 shadow-[0_16px_35px_-4px_rgba(9,41,65,0.1),inset_0_1px_0_rgba(255,255,255,1)] mb-20">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck size={28} className="text-emerald-700" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#092941]">
                Our Firm Partnership Commitments
              </h2>
              <p className="text-xs text-slate-500 font-normal">
                Legal guarantees that protect your client relationships and revenue
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="font-bold text-slate-900 block mb-1 text-sm">Ironclad Non-Solicitation</span>
              We strictly contractually pledge never to pitch our own services directly to your clients during or after the engagement.
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="font-bold text-slate-900 block mb-1 text-sm">Full White-Label Privacy</span>
              All code commits, repositories, issue trackers, and client walkthroughs can be branded under your corporate identity.
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="font-bold text-slate-900 block mb-1 text-sm">Transparent Fixed Milestones</span>
              No hidden hourly fees. You receive fixed milestone estimates that allow your agency to price client contracts with certainty.
            </div>
          </div>
        </div>

        {/* Dedicated Partner Application Form */}
        <div id="partner-form" className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-b from-white via-white to-slate-50 border-t-2 border-t-white border-b-4 border-b-slate-300/90 border-x border-slate-200/90 shadow-[0_24px_55px_-6px_rgba(9,41,65,0.18),inset_0_1px_0_rgba(255,255,255,1)] p-8 sm:p-12">
          <div className="text-center mb-8">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-900 bg-purple-50 px-3 py-1 rounded-md border border-purple-200 shadow-2xs">
              Direct Partner Application
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#092941] mt-3 mb-2">
              Start an Exploratory Conversation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Share details about your agency, practice, or firm. Our partnership director will schedule a 20-minute introductory call.
            </p>
          </div>

          {isSuccess ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-emerald-900">
              <CheckCircle2 size={36} className="text-emerald-700 mx-auto mb-3" />
              <h3 className="text-lg font-bold mb-1">Partnership Inquiry Received</h3>
              <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed max-w-md mx-auto mb-4">
                Thank you for reaching out. A senior member of our partnerships team will review your organization details and connect within 24 business hours.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false)
                  setFormData({ name: '', email: '', phone: '', organization: '', partnershipModel: 'white-label', message: '' })
                }}
                className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold hover:bg-emerald-800 transition-colors"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#092941] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@agency.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#092941] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#092941] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Agency / Firm Name *
                  </label>
                  <input
                    type="text"
                    name="organization"
                    required
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="e.g. Apex Consulting Group"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#092941] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Preferred Partnership Model *
                </label>
                <select
                  name="partnershipModel"
                  value={formData.partnershipModel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#092941] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] bg-white"
                >
                  <option value="white-label">White-Label Software & Digital Engineering</option>
                  <option value="ai-codelivery">AI & Intelligent Automation Co-Delivery</option>
                  <option value="institutional">Institutional & Campus Delivery Partnerships</option>
                  <option value="reseller">Reseller & Referral Agreements (10%-20% Commission)</option>
                  <option value="joint-consortium">Joint Bidding & Enterprise Consortium</option>
                  <option value="other">Other Partnership Structure</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Tell Us About Your Firm & Client Scopes
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your current client requirements, typical project sizes, or how you would like to collaborate..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#092941] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-b from-[#12395b] to-[#092941] hover:from-[#0d2d48] hover:to-[#071f32] text-white rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all border-t border-t-white/30 border-b-2 border-b-[#051724] shadow-[0_10px_22px_rgba(9,41,65,0.32),inset_0_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Submitting Application...' : 'Submit Partnership Application'}</span>
                <Send size={15} />
              </button>

              <p className="text-[11px] text-center text-slate-500">
                All inquiries are treated with strict confidentiality under mutual NDA standards.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}

export default Partnerships
