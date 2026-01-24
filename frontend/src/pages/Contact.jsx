import { Helmet } from "react-helmet-async"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { FaEnvelope, FaUser, FaBuilding, FaBriefcase, FaCheckCircle, FaLock } from 'react-icons/fa'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    role: '',
    problem: '',
    inquiryType: 'demo'
  })

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
    otpSent: false,
    otpVerified: false
  })

  const [otp, setOtp] = useState('')
  const [otpLoading, setOtpLoading] = useState(false)
  const [otpError, setOtpError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: null, otpSent: false, otpVerified: false })

    try {
      // Use environment-specific API URL
      const apiUrl = import.meta.env.VITE_API_URL || 'https://algoforce-backend.onrender.com'
      const response = await axios.post(`${apiUrl}/api/contact`, formData)

      if (response.data.success) {
        // OTP has been sent to user's email
        setStatus({ 
          loading: false, 
          success: false, 
          error: null, 
          otpSent: true, 
          otpVerified: false 
        })
      }
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: error.response?.data?.message || 'Something went wrong. Please try again.',
        otpSent: false,
        otpVerified: false
      })
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setOtpLoading(true)
    setOtpError(null)

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://algoforce-backend.onrender.com'
      const response = await axios.post(`${apiUrl}/api/contact/verify-otp`, {
        email: formData.email,
        otp: otp
      })

      if (response.data.success) {
        setStatus({ 
          loading: false, 
          success: true, 
          error: null, 
          otpSent: true, 
          otpVerified: true 
        })
        // Clear form
        setFormData({
          name: '',
          company: '',
          email: '',
          role: '',
          problem: '',
          inquiryType: 'demo'
        })
        setOtp('')
      }
    } catch (error) {
      setOtpError(error.response?.data?.message || 'Invalid or expired OTP. Please try again.')
    } finally {
      setOtpLoading(false)
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

      <link
        rel="canonical"
        href="https://algoforceaii.com/contact"
      />

      {/* Open Graph */}
      <meta property="og:title" content="Contact AlgoForce – Book a Demo or Consultation" />
      <meta
        property="og:description"
        content="Contact AlgoForce to request a demo, revenue audit, or enterprise AI consultation."
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="AlgoForce AI" />
      <meta property="og:url" content="https://algoforceaii.com/contact" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Contact AlgoForce – Book a Demo or Consultation" />
      <meta
        name="twitter:description"
        content="Contact AlgoForce to request a demo, revenue audit, or enterprise AI consultation."
      />

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
        <div className="max-w-5xl px-6 mx-auto">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-6 text-4xl font-bold text-navy-900">
                What Happens Next?
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 font-bold text-white rounded-full bg-gradient-to-br from-purple-600 to-blue-600">
                    1
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-navy-900">
                      Initial Assessment
                    </h3>
                    <p className="text-gray-600">
                      We review your submission and business context. Most inquiries get a response within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 font-bold text-white rounded-full bg-gradient-to-br from-purple-600 to-blue-600">
                    2
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-navy-900">
                      Discovery Call
                    </h3>
                    <p className="text-gray-600">
                      30-minute conversation to understand your business, challenges, and intelligence gaps.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 font-bold text-white rounded-full bg-gradient-to-br from-purple-600 to-blue-600">
                    3
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-navy-900">
                      Custom Demonstration
                    </h3>
                    <p className="text-gray-600">
                      See AlgoForce in action with examples relevant to your industry and use case.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 font-bold text-white rounded-full bg-gradient-to-br from-purple-600 to-blue-600">
                    4
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-navy-900">
                      Implementation Plan
                    </h3>
                    <p className="text-gray-600">
                      If it's a fit, we create a custom roadmap with clear milestones and ROI projections.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 mt-12 text-white glass-dark rounded-2xl">
                <h3 className="mb-2 font-bold">Not ready to commit?</h3>
                <p className="text-sm text-gray-300">
                  Start with a Revenue Leak Audit. We'll identify hidden losses and provide a prioritized action plan—no AlgoForce purchase required.
                </p>
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
                    <h3 className="mb-4 text-3xl font-bold text-navy-900">
                      Email Verified!
                    </h3>
                    <p className="mb-6 text-gray-700">
                      Thank you for verifying your email. We'll review your information and get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus({ loading: false, success: false, error: null, otpSent: false, otpVerified: false })}
                      className="px-6 py-3 font-semibold text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : status.otpSent ? (
                  <motion.div 
                    key="otp"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="p-8 bg-white border border-purple-200 shadow-xl rounded-3xl"
                  >
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full">
                      <FaLock className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-center text-navy-900">
                      Verify Your Email
                    </h3>
                    <p className="mb-6 text-center text-gray-600">
                      We've sent a 6-digit verification code to <strong>{formData.email}</strong>
                    </p>
                    
                    <form onSubmit={handleOtpSubmit}>
                      <div className="mb-6">
                        <label className="block mb-2 font-semibold text-center text-navy-900">
                          Enter OTP Code
                        </label>
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          maxLength="6"
                          required
                          placeholder="000000"
                          className="w-full py-4 text-3xl font-bold tracking-widest text-center transition-all border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>

                      {otpError && (
                        <div className="p-4 mb-6 text-red-700 border border-red-200 rounded-lg bg-red-50">
                          {otpError}
                        </div>
                      )}

                      <motion.button
                        type="submit"
                        disabled={otpLoading || otp.length !== 6}
                        whileHover={{ scale: otpLoading ? 1 : 1.02 }}
                        whileTap={{ scale: otpLoading ? 1 : 0.98 }}
                        className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                          otpLoading || otp.length !== 6
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-xl text-white'
                        }`}
                      >
                        {otpLoading ? 'Verifying...' : 'Verify Email'}
                      </motion.button>
                    </form>

                    <p className="mt-6 text-sm text-center text-gray-500">
                      OTP expires in 10 minutes. Didn't receive it? Check spam folder.
                    </p>
                    
                    <button
                      onClick={() => {
                        setStatus({ loading: false, success: false, error: null, otpSent: false, otpVerified: false })
                        setOtp('')
                        setOtpError(null)
                      }}
                      className="w-full mt-4 text-sm text-purple-600 transition-colors hover:text-purple-700"
                    >
                      ← Go Back to Form
                    </button>
                  </motion.div>
                ) : (
                <form onSubmit={handleSubmit} className="p-8 bg-white border border-gray-100 shadow-xl rounded-3xl">
                  <h3 className="mb-6 text-2xl font-bold text-navy-900">
                    Get in Touch
                  </h3>

                  {/* Inquiry Type */}
                  <div className="mb-6">
                    <label className="block mb-2 font-semibold text-navy-900">
                      I'm Interested In
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {inquiryTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name */}
                  <div className="mb-6">
                    <label className="block mb-2 font-semibold text-navy-900">
                      Full Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Smith"
                        className="w-full py-3 pl-12 pr-4 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="mb-6">
                    <label className="block mb-2 font-semibold text-navy-900">
                      Company *
                    </label>
                    <div className="relative">
                      <FaBuilding className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        placeholder="Acme Corp"
                        className="w-full py-3 pl-12 pr-4 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-6">
                    <label className="block mb-2 font-semibold text-navy-900">
                      Email *
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@acme.com"
                        className="w-full py-3 pl-12 pr-4 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  {/* Role */}
                  <div className="mb-6">
                    <label className="block mb-2 font-semibold text-navy-900">
                      Your Role *
                    </label>
                    <div className="relative">
                      <FaBriefcase className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        placeholder="CEO, VP of Operations, etc."
                        className="w-full py-3 pl-12 pr-4 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  {/* Problem */}
                  <div className="mb-6">
                    <label className="block mb-2 font-semibold text-navy-900">
                      What Challenge Are You Facing? *
                    </label>
                    <textarea
                      name="problem"
                      value={formData.problem}
                      onChange={handleChange}
                      required
                      rows="4"
                      placeholder="Tell us about your current challenges, revenue leaks, or intelligence gaps..."
                      className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* Error Message */}
                  {status.error && (
                    <div className="p-4 mb-6 text-red-700 border border-red-200 rounded-lg bg-red-50">
                      {status.error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={status.loading}
                    whileHover={{ scale: status.loading ? 1 : 1.02 }}
                    whileTap={{ scale: status.loading ? 1 : 0.98 }}
                    className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                      status.loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-xl text-white'
                    }`}
                  >
                    {status.loading ? 'Sending OTP...' : 'Send Verification Code'}
                  </motion.button>

                  <p className="mt-4 text-sm text-center text-gray-500">
                    We'll send a verification code to your email
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
