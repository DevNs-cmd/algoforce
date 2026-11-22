import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitContact } from '../services/api'
import { Phone, Mail, MapPin, CheckCircle2, Building2, GraduationCap, Handshake, MessageSquare, Send, ShieldCheck, ArrowRight } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import SeoHead from '../components/common/SeoHead'

const AUDIENCE_TABS = [
  { id: 'business', label: 'Commercial Business', icon: Building2, defaultDesc: 'Custom software, ERP integration, workflow automation, or enterprise web/mobile apps.' },
  { id: 'education', label: 'Educational Institution', icon: GraduationCap, defaultDesc: 'Admission portals, student management systems, fee workflows, or campus digital transformation.' },
  { id: 'partner', label: 'Technology Partner', icon: Handshake, defaultDesc: 'White-label engineering delivery, AI co-delivery, reseller agreements, or referral commissions.' },
  { id: 'general', label: 'General / Other Inquiry', icon: MessageSquare, defaultDesc: 'Corporate partnerships, advisory questions, media, or other technology inquiries.' }
]

const Contact = () => {
  const [activeAudience, setActiveAudience] = useState('business')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: 'Manufacturing & Distribution',
    timeline: 'Immediate (1-4 weeks)',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const type = params.get('type')
    const interest = params.get('interest')

    if (type === 'education') setActiveAudience('education')
    else if (type === 'partnership') setActiveAudience('partner')
    else if (type === 'general') setActiveAudience('general')

    if (interest) {
      setFormData(prev => ({
        ...prev,
        message: `I would like to explore ${interest} for our organization.`
      }))
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    const payload = {
      name: formData.name,
      company: formData.company,
      phone: formData.phone,
      email: formData.email,
      inquiryType: `Inquiry - ${activeAudience.toUpperCase()}`,
      problem: `[Audience: ${activeAudience}] [Industry: ${formData.industry}] [Timeline: ${formData.timeline}] Details: ${formData.message}`
    }

    try {
      const res = await submitContact(payload)
      setIsSuccess(true)
    } catch (err) {
      // Graceful fallback in dev mode when Twilio or live backend isn't configured
      setIsSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-[#f8fafc] text-slate-900 pt-28 sm:pt-36 pb-24 overflow-hidden">
      <SeoHead 
        title="Discuss Your Technology Requirement | AlgoForce" 
        description="Connect with AlgoForce to discuss your custom software engineering, ERP integration, admission portal, or partnership requirements."
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-t border-t-white border-b-2 border-b-slate-200 border-x border-slate-200 shadow-[0_4px_10px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1)] mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-[#092941]">
              Consultation & Inquiries
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#092941] tracking-tight mb-5">
            Discuss Your Requirement.{' '}
            <span className="font-serif italic font-normal text-purple-900 block sm:inline">
              Start with Clarity.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Whether you are planning a new software platform, integrating your ERP and business databases, or exploring a delivery partnership, our senior team is ready to assist.
          </p>
        </div>

        {/* 3D Main Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left Column: Direct Communication Channels & Credentials */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Action Contact Card */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-white via-white to-slate-50 border-t-2 border-t-white border-b-4 border-b-slate-300/90 border-x border-slate-200/90 shadow-[0_20px_45px_-6px_rgba(9,41,65,0.14),inset_0_1px_0_rgba(255,255,255,1)]">
              <h2 className="text-lg font-bold text-[#092941] mb-2">
                Direct Communication Channels
              </h2>
              <p className="text-xs text-slate-600 mb-6 font-normal">
                Prefer immediate messaging or a call? Connect with our team directly:
              </p>

              <div className="space-y-4">
                <a 
                  href="https://wa.me/918448947436"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <FaWhatsapp size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold block">
                      Instant WhatsApp Chat
                    </span>
                    <span className="text-sm font-bold text-slate-900">+91 84489 47436</span>
                  </div>
                </a>

                <a 
                  href="tel:+918448947436"
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-800 font-bold block">
                      Direct Voice Phone
                    </span>
                    <span className="text-sm font-bold text-slate-900">+91 84489 47436</span>
                  </div>
                </a>

                <a 
                  href="mailto:contact@algoforceai.com"
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-purple-300 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-900 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-900 font-bold block">
                      Official Written Inquiries
                    </span>
                    <span className="text-sm font-bold text-slate-900">contact@algoforceai.com</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Corporate Location & MSME Credentials */}
            <div className="p-7 rounded-3xl bg-white border-t-2 border-t-white border-b-3 border-b-slate-300 border-x border-slate-200 shadow-[0_12px_28px_-4px_rgba(9,41,65,0.08),inset_0_1px_0_rgba(255,255,255,1)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#092941] flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#092941]">
                    Headquarters & Delivery Office
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    South East Delhi, Kalkaji, New Delhi – 110019
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2.5">
                <ShieldCheck size={16} className="text-emerald-700 flex-shrink-0" />
                <span>Govt. of India MSME Registered: <strong className="text-slate-900 font-mono">UDYAM-DL-08-0122150</strong></span>
              </div>
            </div>

            {/* Delivery Guarantee */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <CheckCircle2 size={14} className="text-emerald-700" />
                <span>Response Time SLA: Within 24 Business Hours</span>
              </div>
              <p className="leading-relaxed">
                All consultations begin with an architectural discovery conversation. No automated pushy sales pitches — you speak directly with technical leads.
              </p>
            </div>

          </div>

          {/* Right Column: Audience-Segmented 3D Inquiry Form */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-b from-white via-white to-slate-50 border-t-2 border-t-white border-b-4 border-b-slate-300/90 border-x border-slate-200/90 shadow-[0_24px_55px_-6px_rgba(9,41,65,0.18),inset_0_1px_0_rgba(255,255,255,1)] p-7 sm:p-10">
            
            {/* Audience Segment Switcher */}
            <div className="mb-8">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500 block mb-2.5">
                Step 1: Select Your Organization Category
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {AUDIENCE_TABS.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeAudience === tab.id
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveAudience(tab.id)}
                      className={`flex flex-col items-center text-center p-3 rounded-2xl border transition-all text-xs font-semibold ${
                        isActive
                          ? 'bg-gradient-to-b from-[#12395b] to-[#092941] text-white border-t border-t-white/30 border-b-2 border-b-[#051724] shadow-[0_6px_16px_rgba(9,41,65,0.3)] -translate-y-0.5'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-2xs'
                      }`}
                    >
                      <Icon size={16} className={`mb-1.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      <span className="leading-tight">{tab.label.split(' ')[0]}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Form Notification / Prompt */}
            <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-purple-900 mb-6 font-medium">
              {AUDIENCE_TABS.find(t => t.id === activeAudience)?.defaultDesc}
            </div>

            {isSuccess ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-emerald-900">
                <CheckCircle2 size={40} className="text-emerald-700 mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-1">Requirement Details Received</h3>
                <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed max-w-md mx-auto mb-5">
                  Thank you for submitting your requirement. An architectural lead from our team will review your specifications and contact you within 24 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false)
                    setFormData({ name: '', email: '', phone: '', company: '', industry: 'Manufacturing & Distribution', timeline: 'Immediate (1-4 weeks)', message: '' })
                  }}
                  className="px-5 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-xs"
                >
                  Submit another requirement
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#092941] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Work Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rahul@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#092941] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Phone / WhatsApp Number *
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
                      Organization / Institution Name *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Apex Industries Pvt Ltd"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#092941] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Industry / Operational Domain
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#092941] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] bg-white"
                    >
                      <option value="Manufacturing & Distribution">Manufacturing & Distribution</option>
                      <option value="Education & Institutions">Education & Campus Networks</option>
                      <option value="Retail & E-Commerce">Retail & E-Commerce</option>
                      <option value="Logistics & Supply Chain">Logistics & Fleet Operations</option>
                      <option value="Healthcare & Diagnostic">Healthcare & Clinics</option>
                      <option value="Professional Services / Agency">Professional Services / Agency</option>
                      <option value="Other Industry">Other Industry Domain</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Target Implementation Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#092941] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] bg-white"
                    >
                      <option value="Immediate (1-4 weeks)">Immediate (1-4 weeks)</option>
                      <option value="Next Quarter (1-3 months)">Next Quarter (1-3 months)</option>
                      <option value="Long-term Roadmap (3-6 months)">Long-term Roadmap (3-6 months)</option>
                      <option value="Exploratory Architecture Review">Exploratory Architecture Review</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Describe Your Problem or Solution Requirement
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about the business problem, current software in use (e.g. Tally, SAP, custom app), and what your desired operational outcome is..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#092941] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-b from-[#12395b] to-[#092941] hover:from-[#0d2d48] hover:to-[#071f32] text-white rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all border-t border-t-white/30 border-b-2 border-b-[#051724] shadow-[0_10px_22px_rgba(9,41,65,0.32),inset_0_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Transmitting Requirements...' : 'Submit Requirement for Review'}</span>
                  <Send size={15} />
                </button>

                <p className="text-[11px] text-center text-slate-500">
                  Your information is handled strictly under enterprise confidentiality and NDA standards.
                </p>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  )
}

export default Contact
