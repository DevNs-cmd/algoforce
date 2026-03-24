import { Helmet } from "react-helmet-async"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitContact } from '../services/api'
import PhoneInput from '../components/PhoneInput'
import { FaUser, FaBuilding, FaBriefcase, FaCheckCircle, FaPhone, FaEnvelope } from 'react-icons/fa'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    role: '',
    problem: '',
    inquiryType: 'demo'
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pkg = params.get('package');
    const service = params.get('service');
    const retainer = params.get('retainer');

    if (pkg || service || retainer) {
      const selection = pkg || service || retainer;
      setFormData(prev => ({
        ...prev,
        problem: `I'm interested in the ${selection}. Please provide more details on how we can get started.`,
        inquiryType: pkg ? 'enterprise' : (retainer ? 'consultation' : 'demo')
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
          inquiryType: 'demo'
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
    { value: 'demo', label: 'Request Demo' },
    { value: 'audit', label: 'Revenue Leak Audit' },
    { value: 'enterprise', label: 'Enterprise Solution' },
    { value: 'consultation', label: 'Strategy Consultation' }
  ]

  return (
    <>
      <Helmet>
        <title>Contact AlgoForce – Book a Demo or Consultation</title>
        <meta
          name="description"
          content="Contact AlgoForce to request a demo, revenue audit, or enterprise AI consultation."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.algoforceaii.com/contact" />
        <meta property="og:title" content="Contact AlgoForce – Book a Demo or Consultation" />
        <meta property="og:description" content="Contact AlgoForce to request a demo, revenue audit, or enterprise AI consultation." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AlgoForce AI" />
        <meta property="og:url" content="https://www.algoforceaii.com/contact" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact AlgoForce – Book a Demo or Consultation" />
        <meta name="twitter:description" content="Contact AlgoForce to request a demo, revenue audit, or enterprise AI consultation." />
      </Helmet>

      <div className="min-h-screen pt-24 bg-gradient-to-b from-navy-50 to-white">
        {/* Hero Section */}
        <section className="py-16 text-white bg-gradient-to-br from-navy-900 via-purple-900 to-navy-900">
          <div className="px-6 mx-auto text-center max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="mb-6 text-5xl font-bold md:text-6xl">
                Let's Talk <span className="gradient-text bg-gradient-to-r from-purple-400 to-blue-400">Intelligence</span>
              </h1>
              <p className="max-w-3xl mx-auto text-xl text-gray-300">
                Schedule a demo, audit consultation, or strategic discussion.
                We'll show you exactly where revenue is leaking and how to stop it.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Form Section */}
        <section className="py-24">
          <div className="max-w-6xl px-6 mx-auto">
            <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
              {/* Left: Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="mb-6 text-3xl sm:text-4xl font-bold text-navy-900">Business Information</h2>
                <div className="p-6 sm:p-8 mb-8 sm:mb-12 bg-white border border-purple-100 shadow-lg rounded-2xl sm:rounded-3xl">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold tracking-wider text-purple-600 uppercase mb-1">Company</h3>
                      <p className="text-2xl font-bold text-navy-900">AlgoForce</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-wider text-purple-600 uppercase mb-1">Email</h3>
                      <a href="mailto:af@algoforceaii.com" className="text-2xl font-bold text-navy-900 hover:text-purple-600 transition-colors">
                        af@algoforceaii.com
                      </a>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-wider text-purple-600 uppercase mb-1">Website</h3>
                      <a href="https://algoforceaii.com" target="_blank" rel="noopener noreferrer" className="text-2xl font-bold text-navy-900 hover:text-purple-600 transition-colors">
                        https://algoforceaii.com
                      </a>
                    </div>
                  </div>
                </div>

                <h2 className="mb-6 text-4xl font-bold text-navy-900">What Happens Next?</h2>
                <div className="space-y-6">
                  {[
                    { title: 'Initial Assessment', desc: 'We review your submission and respond within 24 hours.' },
                    { title: 'Discovery Call', desc: '30-minute conversation to understand your business gaps.' },
                    { title: 'Custom Demonstration', desc: 'See AlgoForce in action with relevant industry examples.' },
                    { title: 'Implementation Plan', desc: 'A custom roadmap with clear milestones and ROI projections.' }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 font-bold text-white rounded-full bg-gradient-to-br from-purple-600 to-blue-600">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="mb-2 text-xl font-bold text-navy-900">{step.title}</h3>
                        <p className="text-gray-600">{step.desc}</p>
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
                      className="p-12 text-center border border-green-200 shadow-xl bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl"
                    >
                      <FaCheckCircle className="w-20 h-20 mx-auto mb-6 text-green-600" />
                      <h3 className="mb-4 text-3xl font-bold text-navy-900">Enquiry Received!</h3>
                      <p className="mb-6 text-gray-700">Thank you for reaching out. Our team will review your information and contact you within 24 hours.</p>
                      <button
                        onClick={() => setStatus({ loading: false, success: false, error: null })}
                        className="px-8 py-3 font-semibold text-white transition-colors bg-purple-600 rounded-xl hover:bg-purple-700"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="p-8 bg-white border border-gray-100 shadow-xl rounded-3xl">
                      <h3 className="mb-6 text-2xl font-bold text-navy-900">Get in Touch</h3>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="mb-4">
                          <label className="block mb-2 font-semibold text-navy-900 text-sm">Interest Area</label>
                          <select name="inquiryType" value={formData.inquiryType} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none">
                            {inquiryTypes.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
                          </select>
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2 font-semibold text-navy-900 text-sm">Full Name *</label>
                          <div className="relative">
                            <FaUser className="absolute text-gray-400 left-4 top-4" />
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Smith" className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="mb-4">
                          <label className="block mb-2 font-semibold text-navy-900 text-sm">Company *</label>
                          <div className="relative">
                            <FaBuilding className="absolute text-gray-400 left-4 top-4" />
                            <input type="text" name="company" value={formData.company} onChange={handleChange} required placeholder="Acme Corp" className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2 font-semibold text-navy-900 text-sm">Email Address</label>
                          <div className="relative">
                            <FaEnvelope className="absolute text-gray-400 left-4 top-4" />
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@acme.com" className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="mb-4">
                          <label className="block mb-2 font-semibold text-navy-900 text-sm">Phone Number *</label>
                          <PhoneInput value={formData.phone} onChange={(v) => setFormData(p => ({ ...p, phone: v }))} placeholder="Enter phone number" />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2 font-semibold text-navy-900 text-sm">Your Role *</label>
                          <div className="relative">
                            <FaBriefcase className="absolute text-gray-400 left-4 top-4" />
                            <input type="text" name="role" value={formData.role} onChange={handleChange} required placeholder="CEO, Manager, etc." className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block mb-2 font-semibold text-navy-900 text-sm">Challenge Description *</label>
                        <textarea name="problem" value={formData.problem} onChange={handleChange} required rows="4" placeholder="Tell us about your challenges..." className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none resize-none" />
                      </div>

                      {status.error && <div className="p-4 mb-6 text-red-700 bg-red-50 border border-red-200 rounded-xl text-sm">{status.error}</div>}

                      <motion.button
                        type="submit"
                        disabled={status.loading || !formData.phone}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all ${status.loading || !formData.phone ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg hover:shadow-purple-500/20'}`}
                      >
                        {status.loading ? 'Submitting...' : 'Submit Request'}
                      </motion.button>
                      <p className="mt-4 text-xs text-center text-gray-400 italic">No verification required. Fast-track your enquiry.</p>
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
