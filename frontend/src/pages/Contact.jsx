import { Helmet } from "react-helmet-async"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitContact } from '../services/api'
import PhoneInput from '../components/PhoneInput'
import { FaUser, FaBuilding, FaBriefcase, FaCheckCircle, FaPhone, FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa'
import PageVideoBackdrop from '../components/common/PageVideoBackdrop'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    role: '',
    problem: '',
    inquiryType: 'discovery'
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const interest = params.get('interest') || params.get('service') || params.get('package');

    if (interest) {
      setFormData(prev => ({
        ...prev,
        problem: `I'm interested in discussing the ${interest} solution at AlgoForce AI. Let's schedule a call.`,
        inquiryType: interest === 'audit' || interest === 'assessment' ? 'assessment' : 'discovery'
      }));
    }
  }, []);

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: null })

    try {
      const data = await submitContact(formData)

      if (data.success) {
        setStatus({
          loading: false,
          success: true,
          error: null
        })
        // Clear form
        setFormData({
          name: '',
          company: '',
          phone: '',
          email: '',
          role: '',
          problem: '',
          inquiryType: 'discovery'
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
    { value: 'discovery', label: 'Discovery Call' },
    { value: 'assessment', label: 'AI Readiness Assessment' },
    { value: 'quote', label: 'Enterprise Quote Request' },
    { value: 'support', label: 'Technical System Support' }
  ]

  return (
    <>
      <Helmet>
        <title>Talk to an AI Solutions Consultant | AlgoForce AI</title>
        <meta
          name="description"
          content="Speak with an enterprise AI solutions consultant. Book a discovery call, request a custom AI readiness assessment, or get an enterprise software quote."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.algoforceaii.com/contact" />
        <meta property="og:title" content="Talk to an AI Solutions Consultant | AlgoForce AI" />
        <meta property="og:description" content="Reach our engineering team to book an AI audit or request custom software development quotes." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AlgoForce AI" />
        <meta property="og:url" content="https://www.algoforceaii.com/contact" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="min-h-screen pt-24 bg-[#f6f8fb] text-[#06101d]">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-18 md:py-24 text-white bg-[#03070d]">
          <PageVideoBackdrop src="/video1.mp4" className="z-0" videoClassName="opacity-[0.22]" />
          <div className="absolute inset-0 subtle-ai-grid opacity-45" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(143,56,255,0.18),transparent_34rem)]" />
          <div className="relative z-10 px-6 mx-auto text-center max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="mb-6 text-4xl md:text-6xl font-extrabold tracking-tight">
                Talk to an <span className="brand-gradient-text">AI Solutions Consultant</span>
              </h1>
              <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed font-normal">
                Let us map your operations, evaluate CRM/ERP bottlenecks, and outline a high-ROI workflow automation plan. Our engineers will follow up within 24 hours.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Form Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl px-6 mx-auto">
            <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
              {/* Left: Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="mb-6 text-3xl sm:text-4xl font-bold text-[#06101d] tracking-tight">Enterprise Advisory</h2>
                <div className="p-6 sm:p-8 mb-8 sm:mb-12 premium-light-surface rounded-[24px] border border-slate-200/50">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-[10px] font-bold text-[#8f38ff] uppercase tracking-wider mb-1">Company</h3>
                      <p className="text-2xl font-bold text-[#06101d]">AlgoForce AI</p>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-bold text-[#8f38ff] uppercase tracking-wider mb-1">Registered Office</h3>
                      <p className="flex items-start gap-3 text-xl sm:text-2xl font-bold text-[#06101d] leading-tight">
                        <FaMapMarkerAlt className="text-[#062f4f] mt-1 flex-shrink-0" />
                        <span>South East Delhi, Kalkaji, New Delhi – 110019</span>
                      </p>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-bold text-[#8f38ff] uppercase tracking-wider mb-1">Email</h3>
                      <a href="mailto:af@algoforceaii.com" className="text-2xl font-bold text-[#06101d] hover:text-[#8f38ff] transition-colors break-words">
                        af@algoforceaii.com
                      </a>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-bold text-[#8f38ff] uppercase tracking-wider mb-1">WhatsApp Cloud Connect</h3>
                      <a href="https://wa.me/918448947436" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-2xl font-bold text-[#06101d] hover:text-[#8f38ff] transition-colors">
                        <FaWhatsapp className="text-[#062f4f]" /> +91 84489 47436
                      </a>
                    </div>
                  </div>
                </div>

                <h2 className="mb-6 text-3xl md:text-4xl font-bold text-[#06101d] tracking-tight">Our Advisory Path</h2>
                <div className="space-y-6">
                  {[
                    { title: 'Discovery Consultation', desc: 'A focused strategy call mapping your core workflow leaks, systems, and ROI timeline.' },
                    { title: 'AI Readiness Assessment', desc: 'An engineering evaluation on model options (GPT vs private cloud LLMs) and databases.' },
                    { title: 'Enterprise Quotation', desc: 'You receive a complete milestone-based scope proposal with fixed costings.' },
                    { title: 'System Handover & SLAs', desc: 'Secure production deployment backed by reliable SLA maintenance retainers.' }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 font-bold text-white rounded-2xl bg-[#06101d]">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="mb-2 text-xl font-bold text-[#06101d]">{step.title}</h3>
                        <p className="text-slate-600 text-sm font-normal leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <AnimatePresence mode="wait">
                  {status.success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="p-12 text-center premium-light-surface rounded-[24px] border border-slate-200/50"
                    >
                      <FaCheckCircle className="w-20 h-20 mx-auto mb-6 text-[#8f38ff]" />
                      <h3 className="mb-4 text-3xl font-bold text-[#06101d] tracking-tight">Request Logged!</h3>
                      <p className="mb-6 text-gray-700 font-normal text-sm leading-relaxed">Thank you. An enterprise solutions engineer will contact you via email or phone within 24 hours.</p>
                      <button
                        onClick={() => setStatus({ loading: false, success: false, error: null })}
                        className="px-8 py-3.5 font-bold text-white transition-colors bg-[#06101d] rounded-xl hover:bg-[#102640]"
                      >
                        Send Another Request
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 premium-light-surface rounded-[24px] border border-slate-200/50">
                      <h3 className="mb-6 text-2xl font-bold text-[#06101d] tracking-tight">Start Your Consultation Request</h3>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="mb-4">
                          <label className="block mb-2 font-bold text-slate-700 text-xs uppercase tracking-wider">Requested Service</label>
                          <select name="inquiryType" value={formData.inquiryType} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm bg-white font-semibold">
                            {inquiryTypes.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
                          </select>
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2 font-bold text-slate-700 text-xs uppercase tracking-wider">Full Name *</label>
                          <div className="relative">
                            <FaUser className="absolute text-gray-400 left-4 top-4" />
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Smith" className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm bg-white font-semibold" />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="mb-4">
                          <label className="block mb-2 font-bold text-slate-700 text-xs uppercase tracking-wider">Company / Entity Name *</label>
                          <div className="relative">
                            <FaBuilding className="absolute text-gray-400 left-4 top-4" />
                            <input type="text" name="company" value={formData.company} onChange={handleChange} required placeholder="Acme Corp" className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm bg-white font-semibold" />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2 font-bold text-slate-700 text-xs uppercase tracking-wider">Business Email *</label>
                          <div className="relative">
                            <FaEnvelope className="absolute text-gray-400 left-4 top-4" />
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@acme.com" className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm bg-white font-semibold" />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="mb-4">
                          <label className="block mb-2 font-bold text-slate-700 text-xs uppercase tracking-wider">Phone / WhatsApp Number *</label>
                          <PhoneInput value={formData.phone} onChange={(v) => setFormData(p => ({ ...p, phone: v }))} placeholder="Enter phone number" />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2 font-bold text-slate-700 text-xs uppercase tracking-wider">Your Designation / Role *</label>
                          <div className="relative">
                            <FaBriefcase className="absolute text-gray-400 left-4 top-4" />
                            <input type="text" name="role" value={formData.role} onChange={handleChange} required placeholder="CEO, Product Manager, Director" className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm bg-white font-semibold" />
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block mb-2 font-bold text-slate-700 text-xs uppercase tracking-wider">What operations or workflows do you want to automate? *</label>
                        <textarea name="problem" value={formData.problem} onChange={handleChange} required rows="4" placeholder="Detail your operational bottlenecks, current software (Zoho/Tally/Salesforce/SAP), and target timeline." className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm bg-white font-normal resize-none" />
                      </div>

                      {status.error && <div className="p-4 mb-6 text-red-700 bg-red-50 border border-red-200 rounded-xl text-sm">{status.error}</div>}

                      <motion.button
                        type="submit"
                        disabled={status.loading || !formData.phone}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all ${status.loading || !formData.phone ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#06101d] hover:bg-[#102640] shadow-lg focus:outline-none'}`}
                      >
                        {status.loading ? 'Scheduling...' : 'Book AI Strategy Consultation'}
                      </motion.button>
                      <p className="mt-4 text-[10px] text-center text-gray-400 font-bold uppercase tracking-wider">Fast-track routing. No email verification required.</p>
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
