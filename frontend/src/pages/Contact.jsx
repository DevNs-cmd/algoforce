import { Helmet } from "react-helmet-async"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitContact } from '../services/api'
import PhoneInput from '../components/PhoneInput'
import { FaUser, FaBuilding, FaBriefcase, FaCheckCircle, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaCheck } from 'react-icons/fa'
import PageVideoBackdrop from '../components/common/PageVideoBackdrop'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    role: '',
    problem: '',
    inquiryType: 'assessment'
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const interest = params.get('interest') || params.get('service') || params.get('package');

    if (interest) {
      setFormData(prev => ({
        ...prev,
        problem: `I'm interested in discussing the ${interest} solution at AlgoForce AI. Let's schedule a call.`,
        inquiryType: 'assessment'
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
    { value: 'assessment', label: 'Business Assessment' },
    { value: 'implementation', label: 'Product Deployment' },
    { value: 'subscription', label: 'Monthly Support' }
  ]

  const assessmentPillars = [
    { title: 'Understand your business', desc: 'Identify where manual tasks are slowing down your operations.' },
    { title: 'Map existing systems', desc: 'Check compatibility with Tally, SAP, Zoho, Salesforce, or other software you use.' },
    { title: 'Recommend software products', desc: 'Select the ready-to-use AI software that matches your operational needs.' },
    { title: 'Scope implementation', desc: 'Plan how to configure and deploy the software in 2 to 4 weeks.' },
    { title: 'Answer your questions', desc: 'Discuss pricing, secure hosting options, and ongoing monthly support.' }
  ]

  return (
    <>
      <Helmet>
        <title>Book a Business Assessment | AlgoForce</title>
        <meta
          name="description"
          content="Book a Business Assessment with the AlgoForce product team. We map your software environment, understand your processes, and recommend software products."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.algoforceaii.com/contact" />
      </Helmet>

      <div className="min-h-screen pt-24 bg-[#f6f8fb] text-[#06101d]">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-18 md:py-24 text-white bg-[#03070d] border-b border-white/5">
          <PageVideoBackdrop src="/video1.mp4" className="z-0" videoClassName="opacity-[0.22]" />
          <div className="absolute inset-0 subtle-ai-grid opacity-45" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(143,56,255,0.18),transparent_34rem)]" />
          
          <div className="relative z-10 px-6 mx-auto text-center max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="mb-6 text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Book a Business Assessment
              </h1>
              <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed font-normal">
                Talk to our product specialists. We will understand your business, recommend suitable software, discuss implementation, and answer your questions.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Form & Info Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl px-6 mx-auto">
            <div className="grid gap-12 lg:grid-cols-2">
              
              {/* Left: Assessment Details */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="mb-6 text-3xl font-bold text-[#06101d] tracking-tight">Assessment Scope</h2>
                
                <div className="space-y-6 mb-12">
                  {assessmentPillars.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 font-bold text-purple-600 rounded-xl bg-purple-100/65 text-sm">
                        0{i + 1}
                      </div>
                      <div>
                        <h3 className="mb-1 text-lg font-bold text-[#06101d]">{item.title}</h3>
                        <p className="text-slate-600 text-xs font-normal leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 premium-light-surface rounded-[24px] border border-slate-200/50 space-y-4">
                  <div>
                    <h4 className="text-[10px] font-bold text-[#8f38ff] uppercase tracking-wider mb-1">Office Location</h4>
                    <p className="flex items-start gap-2.5 text-sm font-semibold text-[#06101d] leading-snug">
                      <FaMapMarkerAlt className="text-[#062f4f] mt-0.5 flex-shrink-0" />
                      <span>South East Delhi, Kalkaji, New Delhi – 110019</span>
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-[#8f38ff] uppercase tracking-wider mb-1">WhatsApp Cloud Connect</h4>
                    <a href="https://wa.me/918448947436" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-[#06101d] hover:text-[#8f38ff] transition-colors">
                      <FaWhatsapp className="text-[#062f4f]" /> +91 84489 47436
                    </a>
                  </div>
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
                      <FaCheckCircle className="w-16 h-16 mx-auto mb-6 text-[#8f38ff]" />
                      <h3 className="mb-4 text-3xl font-bold text-[#06101d] tracking-tight">Assessment Booked!</h3>
                      <p className="mb-6 text-gray-700 font-normal text-sm leading-relaxed">Thank you. A product solutions engineer will reach out via email or phone within 24 hours to schedule the assessment.</p>
                      <button
                        onClick={() => setStatus({ loading: false, success: false, error: null })}
                        className="px-8 py-3.5 font-bold text-white transition-colors bg-[#06101d] rounded-xl hover:bg-[#102640]"
                      >
                        Request Another Session
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 premium-light-surface rounded-[24px] border border-slate-200/50">
                      <h3 className="mb-6 text-2xl font-bold text-[#06101d] tracking-tight">Book Business Assessment</h3>
 
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="mb-4">
                          <label className="block mb-2 font-bold text-slate-700 text-[10px] uppercase tracking-wider">Inquiry Type *</label>
                          <select name="inquiryType" value={formData.inquiryType} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-xs bg-white font-bold">
                            {inquiryTypes.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
                          </select>
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2 font-bold text-slate-700 text-[10px] uppercase tracking-wider">Full Name *</label>
                          <div className="relative">
                            <FaUser className="absolute text-gray-400 left-4 top-4 text-xs" />
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Smith" className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-xs bg-white font-semibold" />
                          </div>
                        </div>
                      </div>
 
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="mb-4">
                          <label className="block mb-2 font-bold text-slate-700 text-[10px] uppercase tracking-wider">Company Name *</label>
                          <div className="relative">
                            <FaBuilding className="absolute text-gray-400 left-4 top-4 text-xs" />
                            <input type="text" name="company" value={formData.company} onChange={handleChange} required placeholder="Acme Corp" className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-xs bg-white font-semibold" />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2 font-bold text-slate-700 text-[10px] uppercase tracking-wider">Business Email *</label>
                          <div className="relative">
                            <FaEnvelope className="absolute text-gray-400 left-4 top-4 text-xs" />
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@acme.com" className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-xs bg-white font-semibold" />
                          </div>
                        </div>
                      </div>
 
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="mb-4">
                          <label className="block mb-2 font-bold text-slate-700 text-[10px] uppercase tracking-wider">Phone / WhatsApp Number *</label>
                          <PhoneInput value={formData.phone} onChange={(v) => setFormData(p => ({ ...p, phone: v }))} placeholder="Enter phone number" />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2 font-bold text-slate-700 text-[10px] uppercase tracking-wider">Designation / Role *</label>
                          <div className="relative">
                            <FaBriefcase className="absolute text-gray-400 left-4 top-4 text-xs" />
                            <input type="text" name="role" value={formData.role} onChange={handleChange} required placeholder="CEO, Operations Lead, Partner" className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-xs bg-white font-semibold" />
                          </div>
                        </div>
                      </div>
 
                      <div className="mb-6">
                        <label className="block mb-2 font-bold text-slate-700 text-[10px] uppercase tracking-wider">Briefly describe your software setup, manual tasks, and goals *</label>
                        <textarea name="problem" value={formData.problem} onChange={handleChange} required rows="4" placeholder="Detail your manual bottlenecks, current software (Tally, SAP, CRM, etc.), and goals." className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-xs bg-white font-normal resize-none" />
                      </div>
 
                      {status.error && <div className="p-4 mb-6 text-red-700 bg-red-50 border border-red-200 rounded-xl text-xs">{status.error}</div>}
 
                      <motion.button
                        type="submit"
                        disabled={status.loading || !formData.phone}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full py-4 rounded-xl font-bold text-base text-white transition-all ${status.loading || !formData.phone ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#06101d] hover:bg-[#102640] shadow-lg focus:outline-none'}`}
                      >
                        {status.loading ? 'Submitting...' : 'Book Business Assessment'}
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
