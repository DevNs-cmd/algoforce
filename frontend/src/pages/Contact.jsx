import { Helmet } from "react-helmet-async"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitContact } from '../services/api'
import PhoneInput from '../components/PhoneInput'
import { FaUser, FaBuilding, FaBriefcase, FaCheckCircle, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaCogs, FaClock, FaCheck, FaLayerGroup } from 'react-icons/fa'
import PageVideoBackdrop from '../components/common/PageVideoBackdrop'
import { trackFormStart, trackFormSubmit, trackCTAClick } from '../utils/analytics'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    role: '',
    industry: 'Manufacturing',
    companySize: '11-50 employees',
    currentSystems: '',
    timeline: '1-3 months',
    problem: '',
    inquiryType: 'assessment' // 'assessment' | 'demo'
  })

  const [formStarted, setFormStarted] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const interest = params.get('interest') || params.get('service') || params.get('package');

    setFormData(prev => ({
      ...prev,
      inquiryType: type === 'demo' ? 'demo' : 'assessment',
      problem: interest
        ? `I want to discuss the ${interest} workflow automation opportunity at AlgoForce.`
        : prev.problem
    }));
  }, []);

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (!formStarted) {
      setFormStarted(true)
      trackFormStart(formData.inquiryType === 'demo' ? 'demo_request_form' : 'workflow_assessment_form')
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: null })

    // Track analytics funnel submission
    trackFormSubmit(
      formData.inquiryType === 'demo' ? 'demo_request_form' : 'workflow_assessment_form',
      formData
    )

    try {
      const payload = {
        name: formData.name,
        company: formData.company,
        phone: formData.phone,
        email: formData.email,
        role: formData.role,
        inquiryType: formData.inquiryType,
        problem: `[Industry: ${formData.industry}] [Size: ${formData.companySize}] [Systems: ${formData.currentSystems || 'N/A'}] [Timeline: ${formData.timeline}] Details: ${formData.problem}`
      }

      const data = await submitContact(payload)

      if (data.success) {
        setStatus({
          loading: false,
          success: true,
          error: null
        })
        setFormData({
          name: '',
          company: '',
          phone: '',
          email: '',
          role: '',
          industry: 'Manufacturing',
          companySize: '11-50 employees',
          currentSystems: '',
          timeline: '1-3 months',
          problem: '',
          inquiryType: 'assessment'
        })
      }
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: error.response?.data?.message || error.message || 'Something went wrong. Please try again.'
      })
    }
  }

  const inquiryTypes = [
    { value: 'assessment', label: 'Book Workflow Assessment (Recommended)' },
    { value: 'demo', label: 'Book Product Demo' }
  ]

  const industries = [
    'Manufacturing',
    'Finance & Accounting',
    'Retail & E-commerce',
    'Logistics & Supply Chain',
    'Healthcare',
    'Hospitality',
    'Education',
    'Professional Services',
    'Other Operationally Complex Business'
  ]

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '500+ employees'
  ]

  const timelines = [
    'Immediate (within 30 days)',
    '1-3 months',
    '3-6 months',
    'Exploratory / Planning phase'
  ]

  const assessmentSteps = [
    { title: 'Map the Workflow', desc: 'We identify manual tasks, bottlenecks, and dependencies across your teams.' },
    { title: 'Understand Current Systems', desc: 'We audit compatibility with Tally, SAP, CRM, or existing databases.' },
    { title: 'Identify Automation Fit', desc: 'We determine specifically what to automate and what to keep as-is.' },
    { title: 'Define Next Steps', desc: 'You receive a structured view of scope, pilot plan, and deployment path.' }
  ]

  return (
    <>
      <Helmet>
        <title>{formData.inquiryType === 'demo' ? 'Book a Product Demo | AlgoForce' : 'Book a Workflow Assessment | AlgoForce'}</title>
        <meta
          name="description"
          content="Start a commercial conversation with AlgoForce. Book a Workflow Assessment to map your operational bottlenecks and receive a structured implementation plan."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.algoforceaii.com/contact" />
      </Helmet>

      <div className="min-h-screen pt-24 bg-[#f6f8fb] text-[#06101d]">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24 text-white bg-[#03070d] border-b border-white/5">
          <PageVideoBackdrop src="/video1.mp4" className="z-0" videoClassName="opacity-[0.22]" />
          <div className="absolute inset-0 subtle-ai-grid opacity-45" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(143,56,255,0.18),transparent_34rem)]" />

          <div className="relative z-10 px-4 sm:px-6 mx-auto text-center max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-purple-400 mb-4 bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20">
                Commercial Conversation
              </span>

              <h1 className="mb-6 text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                {formData.inquiryType === 'demo' ? (
                  <>Book a <span className="premium-serif italic font-normal text-[#cdb4ff]">Product Demo</span></>
                ) : (
                  <>Book a <span className="premium-serif italic font-normal text-[#cdb4ff]">Workflow Assessment</span></>
                )}
              </h1>

              <p className="max-w-3xl mx-auto text-base md:text-lg text-slate-300 leading-relaxed font-normal">
                {formData.inquiryType === 'demo'
                  ? 'For businesses that already know which AlgoForce solution family matches their workflow.'
                  : 'For businesses seeking expert guidance to map operational bottlenecks and identify high-value automation opportunities.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form & Info Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl px-6 mx-auto">
            <div className="grid gap-12 lg:grid-cols-2">

              {/* Left Column: Purpose & Details */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* CTA Toggle Tabs */}
                <div className="mb-8 p-1.5 bg-slate-200/80 rounded-2xl flex gap-1">
                  <button
                    onClick={() => setFormData(p => ({ ...p, inquiryType: 'assessment' }))}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all text-center ${formData.inquiryType === 'assessment' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Workflow Assessment
                  </button>
                  <button
                    onClick={() => setFormData(p => ({ ...p, inquiryType: 'demo' }))}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all text-center ${formData.inquiryType === 'demo' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Product Demo
                  </button>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200/70 shadow-sm mb-8">
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {formData.inquiryType === 'demo' ? 'What happens during a demo?' : 'What happens during an assessment?'}
                  </h3>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed mb-4">
                    {formData.inquiryType === 'demo'
                      ? 'We demonstrate the relevant AlgoForce solution, walk through live integrations, and answer your questions about deployment and support.'
                      : 'A structured, 45-minute discovery session. We map your current manual process, audit software compatibility, and provide a clear proposal if there is a fit.'}
                  </p>

                  <div className="space-y-3">
                    {assessmentSteps.map((step, i) => (
                      <div key={i} className="flex gap-3 text-xs">
                        <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <div>
                          <strong className="text-slate-900 font-bold">{step.title}: </strong>
                          <span className="text-slate-600 font-normal">{step.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Office & Direct Contact */}
                <div className="p-6 bg-white rounded-2xl border border-slate-200/70 space-y-4">
                  <div>
                    <h4 className="text-[10px] font-bold text-purple-700 uppercase tracking-wider mb-1">Office Location</h4>
                    <p className="flex items-start gap-2 text-xs font-semibold text-slate-800 leading-snug">
                      <FaMapMarkerAlt className="text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>South East Delhi, Kalkaji, New Delhi – 110019</span>
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-purple-700 uppercase tracking-wider mb-1">Direct Commercial Contact</h4>
                    <a href="https://wa.me/918448947436" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-slate-800 hover:text-purple-700 transition-colors">
                      <FaWhatsapp className="text-emerald-600" /> +91 84489 47436
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: High-Conversion Lead Form */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <AnimatePresence mode="wait">
                  {status.success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-10 text-center bg-white rounded-3xl border border-slate-200 shadow-md"
                    >
                      <FaCheckCircle className="w-14 h-14 mx-auto mb-5 text-emerald-600" />
                      <h3 className="mb-3 text-2xl font-bold text-slate-900 tracking-tight">Request Received</h3>
                      <p className="mb-6 text-slate-600 font-normal text-xs leading-relaxed max-w-md mx-auto">
                        Thank you. A solutions engineer will review your operational requirements and contact you within 24 business hours to confirm your discovery call.
                      </p>
                      <button
                        onClick={() => setStatus({ loading: false, success: false, error: null })}
                        className="px-6 py-3 font-bold text-xs text-white transition-colors bg-slate-900 rounded-xl hover:bg-slate-800"
                      >
                        Submit Another Inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 bg-white rounded-3xl border border-slate-200/90 shadow-sm">
                      <h3 className="mb-6 text-xl font-bold text-slate-900 tracking-tight">
                        {formData.inquiryType === 'demo' ? 'Request a Product Demo' : 'Book a Workflow Assessment'}
                      </h3>

                      {/* Inquiry Type & Name */}
                      <div className="grid md:grid-cols-2 gap-5 mb-4">
                        <div>
                          <label className="block mb-1.5 font-bold text-slate-700 text-[10px] uppercase tracking-wider">Inquiry Type *</label>
                          <select
                            name="inquiryType"
                            value={formData.inquiryType}
                            onChange={handleChange}
                            required
                            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-xs bg-white font-bold"
                          >
                            {inquiryTypes.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
                          </select>
                        </div>

                        <div>
                          <label className="block mb-1.5 font-bold text-slate-700 text-[10px] uppercase tracking-wider">Full Name *</label>
                          <div className="relative">
                            <FaUser className="absolute text-slate-400 left-3.5 top-3 text-xs" />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              placeholder="John Smith"
                              className="w-full py-2.5 pl-9 pr-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-xs bg-white font-semibold text-slate-900"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Company & Email */}
                      <div className="grid md:grid-cols-2 gap-5 mb-4">
                        <div>
                          <label className="block mb-1.5 font-bold text-slate-700 text-[10px] uppercase tracking-wider">Company Name *</label>
                          <div className="relative">
                            <FaBuilding className="absolute text-slate-400 left-3.5 top-3 text-xs" />
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              required
                              placeholder="Acme Manufacturing Ltd"
                              className="w-full py-2.5 pl-9 pr-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-xs bg-white font-semibold text-slate-900"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block mb-1.5 font-bold text-slate-700 text-[10px] uppercase tracking-wider">Work Email *</label>
                          <div className="relative">
                            <FaEnvelope className="absolute text-slate-400 left-3.5 top-3 text-xs" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder="john@acme.com"
                              className="w-full py-2.5 pl-9 pr-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-xs bg-white font-semibold text-slate-900"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Phone & Role */}
                      <div className="grid md:grid-cols-2 gap-5 mb-4">
                        <div>
                          <label className="block mb-1.5 font-bold text-slate-700 text-[10px] uppercase tracking-wider">Phone / WhatsApp *</label>
                          <PhoneInput
                            value={formData.phone}
                            onChange={(v) => {
                              if (!formStarted) {
                                setFormStarted(true)
                                trackFormStart('workflow_assessment_form')
                              }
                              setFormData(p => ({ ...p, phone: v }))
                            }}
                            placeholder="Enter phone number"
                          />
                        </div>

                        <div>
                          <label className="block mb-1.5 font-bold text-slate-700 text-[10px] uppercase tracking-wider">Your Role / Title *</label>
                          <div className="relative">
                            <FaBriefcase className="absolute text-slate-400 left-3.5 top-3 text-xs" />
                            <input
                              type="text"
                              name="role"
                              value={formData.role}
                              onChange={handleChange}
                              required
                              placeholder="CEO, CFO, Ops Lead, IT Director"
                              className="w-full py-2.5 pl-9 pr-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-xs bg-white font-semibold text-slate-900"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Industry & Company Size */}
                      <div className="grid md:grid-cols-2 gap-5 mb-4">
                        <div>
                          <label className="block mb-1.5 font-bold text-slate-700 text-[10px] uppercase tracking-wider">Industry *</label>
                          <select
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-xs bg-white font-medium text-slate-800"
                          >
                            {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                          </select>
                        </div>

                        <div>
                          <label className="block mb-1.5 font-bold text-slate-700 text-[10px] uppercase tracking-wider">Company Size *</label>
                          <select
                            name="companySize"
                            value={formData.companySize}
                            onChange={handleChange}
                            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-xs bg-white font-medium text-slate-800"
                          >
                            {companySizes.map(sz => <option key={sz} value={sz}>{sz}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* Current Systems & Timeline */}
                      <div className="grid md:grid-cols-2 gap-5 mb-4">
                        <div>
                          <label className="block mb-1.5 font-bold text-slate-700 text-[10px] uppercase tracking-wider">Current Systems Used</label>
                          <input
                            type="text"
                            name="currentSystems"
                            value={formData.currentSystems}
                            onChange={handleChange}
                            placeholder="e.g. Tally, SAP, Salesforce, Excel"
                            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-xs bg-white font-normal text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block mb-1.5 font-bold text-slate-700 text-[10px] uppercase tracking-wider">Implementation Timeline</label>
                          <select
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-xs bg-white font-medium text-slate-800"
                          >
                            {timelines.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* Workflow Problem Description */}
                      <div className="mb-5">
                        <label className="block mb-1.5 font-bold text-slate-700 text-[10px] uppercase tracking-wider">
                          Describe your manual workflow bottleneck or goal *
                        </label>
                        <textarea
                          name="problem"
                          value={formData.problem}
                          onChange={handleChange}
                          required
                          rows="3"
                          placeholder="What tasks or handoffs between systems are taking up team effort?"
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-xs bg-white font-normal text-slate-800 resize-none"
                        />
                      </div>

                      {status.error && (
                        <div className="p-3.5 mb-5 text-red-700 bg-red-50 border border-red-200 rounded-xl text-xs">
                          {status.error}
                        </div>
                      )}

                      <motion.button
                        type="submit"
                        disabled={status.loading || !formData.phone}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all ${status.loading || !formData.phone ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800 shadow-md focus:outline-none'}`}
                      >
                        {status.loading ? 'Submitting Request...' : formData.inquiryType === 'demo' ? 'Request Product Demo' : 'Book Workflow Assessment'}
                      </motion.button>

                      <p className="mt-3 text-[10px] text-center text-slate-400 font-medium">
                        Fast-track qualification. Your details are confidential and used only for scoping your assessment.
                      </p>
                    </form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Contact
