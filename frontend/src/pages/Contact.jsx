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
    { value: 'services', label: 'AlgoForce AI Services' },
    { value: 'labs', label: 'AlgoForce Labs Cohort' },
    { value: 'crucible', label: 'Crucible Founder Program' },
    { value: 'partnership', label: 'Partnership / Sponsorship' }
  ]

  return (
    <>
      <Helmet>
        <title>Contact AlgoForce AI - Services, Labs & Crucible</title>
        <meta
          name="description"
          content="Contact AlgoForce AI for consulting retainers, Labs cohorts, Crucible founder programs, corporate training, partnerships, and sponsorships."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.algoforceaii.com/contact" />
        <meta property="og:title" content="Contact AlgoForce AI - Enter the Ecosystem" />
        <meta property="og:description" content="Reach AlgoForce AI for services, Labs, Crucible, training, partnerships, and events." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AlgoForce AI" />
        <meta property="og:url" content="https://www.algoforceaii.com/contact" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact AlgoForce AI - Services, Labs & Crucible" />
        <meta name="twitter:description" content="Reach AlgoForce AI for consulting, cohorts, founder programs, and partnerships." />
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
              <h1 className="mb-6 text-4xl md:text-6xl font-extrabold">
                Start with <span className="brand-gradient-text">AlgoForce</span>
              </h1>
              <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed">
                Tell us whether you need AI services, Labs training, Crucible founder support, or a strategic partnership.
                The right team will map the next step.
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
                <h2 className="mb-6 text-3xl sm:text-4xl font-extrabold text-[#06101d]">AlgoForce Contact</h2>
                <div className="p-6 sm:p-8 mb-8 sm:mb-12 premium-light-surface rounded-[24px]">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-[#8f38ff] uppercase mb-1">Company</h3>
                      <p className="text-2xl font-extrabold text-[#06101d]">AlgoForce</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#8f38ff] uppercase mb-1">Office</h3>
                      <p className="flex items-start gap-3 text-xl sm:text-2xl font-extrabold text-[#06101d] leading-tight">
                        <FaMapMarkerAlt className="text-[#062f4f] mt-1 flex-shrink-0" />
                        <span>South Delhi, Kalkaji, New Delhi 110019</span>
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#8f38ff] uppercase mb-1">Email</h3>
                      <a href="mailto:af@algoforceaii.com" className="text-2xl font-extrabold text-[#06101d] hover:text-[#8f38ff] transition-colors break-words">
                        af@algoforceaii.com
                      </a>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#8f38ff] uppercase mb-1">WhatsApp</h3>
                      <a href="https://wa.me/918448947436" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-2xl font-extrabold text-[#06101d] hover:text-[#8f38ff] transition-colors">
                        <FaWhatsapp className="text-[#062f4f]" /> 8448947436
                      </a>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#8f38ff] uppercase mb-1">Website</h3>
                      <a href="https://algoforceaii.com" target="_blank" rel="noopener noreferrer" className="text-2xl font-extrabold text-[#06101d] hover:text-[#8f38ff] transition-colors break-words">
                        https://algoforceaii.com
                      </a>
                    </div>
                  </div>
                </div>

                <h2 className="mb-6 text-3xl md:text-4xl font-extrabold text-[#06101d]">What Happens Next?</h2>
                <div className="space-y-6">
                  {[
                    { title: 'Route Your Request', desc: 'We identify whether your best entry point is Services, Labs, Crucible, or Partnerships.' },
                    { title: 'Discovery Call', desc: 'A focused conversation around goals, budget, timeline, and expected outcome.' },
                    { title: 'Custom Roadmap', desc: 'You receive a practical next-step plan with the right offer and scope.' },
                    { title: 'Execution Kickoff', desc: 'We move into onboarding, payment, cohort admission, event access, or partner setup.' }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 font-bold text-white rounded-2xl bg-[#06101d]">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="mb-2 text-xl font-extrabold text-[#06101d]">{step.title}</h3>
                        <p className="text-slate-600">{step.desc}</p>
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
                      className="p-12 text-center premium-light-surface rounded-[24px]"
                    >
                      <FaCheckCircle className="w-20 h-20 mx-auto mb-6 text-[#8f38ff]" />
                      <h3 className="mb-4 text-3xl font-extrabold text-[#06101d]">Enquiry Received!</h3>
                      <p className="mb-6 text-gray-700">Thank you for reaching out. Our team will review your information and contact you within 24 hours.</p>
                      <button
                        onClick={() => setStatus({ loading: false, success: false, error: null })}
                        className="px-8 py-3 font-semibold text-white transition-colors bg-[#06101d] rounded-xl hover:bg-[#102640]"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 premium-light-surface rounded-[24px]">
                      <h3 className="mb-6 text-2xl font-extrabold text-[#06101d]">Start Your Request</h3>

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
                        <label className="block mb-2 font-semibold text-navy-900 text-sm">What do you want to build, learn, or partner on? *</label>
                        <textarea name="problem" value={formData.problem} onChange={handleChange} required rows="4" placeholder="Tell us your goal, timeline, and which part of AlgoForce you are interested in." className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none resize-none" />
                      </div>

                      {status.error && <div className="p-4 mb-6 text-red-700 bg-red-50 border border-red-200 rounded-xl text-sm">{status.error}</div>}

                      <motion.button
                        type="submit"
                        disabled={status.loading || !formData.phone}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all ${status.loading || !formData.phone ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg hover:shadow-purple-500/20'}`}
                      >
                        {status.loading ? 'Submitting...' : 'Submit Ecosystem Request'}
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
