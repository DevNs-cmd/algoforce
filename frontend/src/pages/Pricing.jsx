import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCheck, FaArrowRight } from 'react-icons/fa'

const Pricing = () => {
  const RAZORPAY_LINK = "https://rzp.io/l/algoforce-payment"; // REPLACE THIS WITH REAL LINK
  const comboPackages = [
    {
      name: 'STARTUP GROWTH PACK',
      price: '149',
      oldPrice: '299',
      description: 'The global foundation for new businesses to establish authority and capture leads.',
      features: [
        '5-page Premium Website',
        'Global SEO Setup',
        'AI Chatbot (Lead Generation)',
        'Google Analytics 4 Setup',
        '1 Month Priority Support'
      ],
      cta: 'Buy Startup Pack',
      highlight: false,
      color: 'from-blue-500 to-cyan-500',
      tag: 'Startup Essentials'
    },
    {
      name: 'BUSINESS AUTOMATION PACK',
      price: '299',
      oldPrice: '599',
      description: 'Comprehensive automation system for businesses ready to scale globally without chaos.',
      features: [
        'Business Website (7+ pages)',
        'Advanced AI Chatbot',
        'Core CRM Automation',
        'Global SEO Optimization',
        '1 Month Systems Maintenance'
      ],
      cta: 'Buy Business Pack',
      highlight: true,
      color: 'from-purple-500 to-indigo-500',
      badge: 'Most Popular'
    },
    {
      name: 'AI DOMINATION PACK',
      price: '499',
      oldPrice: '999',
      description: 'The ultimate AI growth infrastructure for high-value global business transformation.',
      features: [
        'Premium High-Conversion Website',
        'AI Chatbot + Voice Receptionist Setup',
        'Advanced Automation Workflows',
        'Industrial SEO Deployment',
        '30 Days Performance Optimization'
      ],
      cta: 'Buy Domination Pack',
      highlight: false,
      color: 'from-green-500 to-teal-500',
      tag: 'Maximum ROI'
    }
  ]

  const additionalPacks = [
    {
      name: 'E-COMMERCE GROWTH PACK',
      price: '399',
      description: 'Industrial e-commerce setup with automated inventory and sales triggers.',
      features: [
        'Premium E-commerce Storefront',
        'Global Payment Integration',
        'Conversion-Optimized SEO',
        'Paid Ads Strategic Setup',
        'Automated Cart Recovery'
      ],
      color: 'from-orange-400 to-red-500'
    },
    {
      name: 'SAAS LAUNCH PACK',
      price: '1,299+',
      description: 'End-to-end MVP execution for tech founders and digital product builders.',
      features: [
        'Scalable SaaS MVP Development',
        'Premium UI/UX Strategy',
        'High-Performance Landing Page',
        'Launch Marketing & SEO Plan',
        'Founder Strategy Consultation'
      ],
      color: 'from-gray-700 to-gray-900'
    }
  ]

  const retainers = [
    {
      name: 'Growth Retainer',
      price: '149',
      period: '/month',
      features: [
        'Continuous SEO/AEO Optimization',
        'Social Media Content Strategy',
        'Advanced Data Analytics',
        'Revenue Impact Support'
      ]
    },
    {
      name: 'Automation Retainer',
      price: '99',
      period: '/month',
      features: [
        'AI Bot Performance Tuning',
        'Active CRM Management',
        'Ops Workflow Monitoring',
        'Efficiency Audits'
      ]
    }
  ]

  const individualServices = [
    {
      category: 'AI & Automation',
      items: [
        { name: 'Basic FAQ Bot (Web/WhatsApp)', price: '$25 – $49' },
        { name: 'Lead Gen AI Bot', price: '$49 – $99' },
        { name: 'Advanced Bot + CRM Sync', price: '$99 – $199' },
        { name: 'AI Voice Receptionist Setup', price: '$75 – $149' },
        { name: 'Workflow Automation', price: '$49 – $249' }
      ]
    },
    {
      category: 'Web & Digital Assets',
      items: [
        { name: 'High-Conversion Landing Page', price: '$49 – $99' },
        { name: 'Business Website (5-7 Pages)', price: '$149 – $249' },
        { name: 'Premium E-commerce Store', price: '$249 – $499' },
        { name: 'Basic MVP App Build', price: '$349 – $749' },
        { name: 'SaaS Platform MVP', price: '$1,299 – $2,499' }
      ]
    },
    {
      category: 'SEO, Ads & Content',
      items: [
        { name: 'Global SEO Setup', price: '$49 – $99' },
        { name: 'AEO / GEO (AI Search) Setup', price: '$75 – $149' },
        { name: 'Social Media Strategy', price: '$49 – $149' },
        { name: 'Paid Ads Management', price: '$49' },
        { name: 'Monthly Growth Support', price: '$75 – $249' }
      ]
    }
  ]

  const faqs = [
    {
      question: 'What is the difference between AI and traditional agencies?',
      answer: 'Traditional agencies focus on creative outputs; we focus on execution infrastructure. We use AI to reduce your operational costs while building systems that capture and convert revenue automatically.'
    },
    {
      question: 'Do you offer custom pricing for large enterprises?',
      answer: 'Yes. For complex SaaS builds or large-scale enterprise automation, we provide custom bespoke quotes starting from $4,999+ based on architecture requirements.'
    },
    {
      question: 'How do the retainers work?',
      answer: 'Our retainers ensure your AI systems and growth engines never go obsolete. We provide monthly optimization, security updates, and performance scaling as your business grows.'
    },
    {
      question: 'What is AEO/GEO?',
      answer: 'AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) are the future of SEO. We optimize your brand to show up as the primary answer in AI search tools like ChatGPT, Perplexity, and Google Gemini.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Pricing – AlgoForce AI & Automation Solutions</title>
        <meta
          name="description"
          content="Affordable global AI, automation, and web development pricing. Choose from combo packs or monthly retainers starting at $199."
        />
      </Helmet>

      <div className="min-h-screen pt-24 bg-white overflow-hidden">
        {/* SECTION 1: DARK COLORED HERO & COMBOS */}
        <div className="bg-gradient-to-b from-black via-[#050814] to-black text-white relative">
          {/* Subtle background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[120px]" />
          </div>

          {/* Hero Section */}
          <section className="py-20 text-center relative z-10">
            <div className="px-6 mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="mb-6 text-5xl font-bold md:text-7xl">
                  Powerful Combos. <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Simple Pricing.</span>
                </h1>
                <p className="max-w-3xl mx-auto text-xl text-gray-400">
                  Stop paying for disconnected services. Get the full power of AI and Automation with our high-converting combo packages.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Combo Packages */}
          <section className="py-12 relative z-10">
            <div className="px-6 mx-auto max-w-7xl pb-20">
              <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
                {comboPackages.map((tier, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className={`relative bg-gray-900/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border ${tier.highlight ? 'border-purple-500 ring-2 ring-purple-500/20' : 'border-white/10'}`}
                  >
                    {tier.badge && (
                      <div className="absolute top-0 px-4 py-1 text-sm font-semibold text-white -translate-x-1/2 -translate-y-1/2 bg-purple-600 left-1/2 rounded-full">
                        {tier.badge}
                      </div>
                    )}
                    <h3 className="mb-2 text-lg sm:text-xl font-bold text-gray-300">{tier.name}</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl sm:text-4xl font-bold text-white">${tier.price}</span>
                      <span className="text-base sm:text-lg text-gray-500 line-through">${tier.oldPrice}</span>
                    </div>
                    <p className="mb-6 sm:mb-8 text-xs sm:text-sm text-gray-400">{tier.description}</p>

                    <ul className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex gap-3 text-xs sm:text-sm text-gray-300">
                          <FaCheck className="flex-shrink-0 text-purple-500 mt-0.5 sm:mt-1" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={RAZORPAY_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3 sm:py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm sm:text-base ${tier.highlight ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                    >
                      <img src="https://razorpay.com/favicon.png" alt="Razorpay" className="w-5 h-5 invert" />
                      {tier.cta}
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* SECTION 2: CLEAN WHITE ADDITIONAL PACKS & RETAINERS */}
        <section className="py-24 bg-white">
          <div className="px-6 mx-auto max-w-7xl">
            <h2 className="text-4xl font-bold mb-16 text-center text-gray-900 border-b border-gray-100 pb-8">Specialized Solutions</h2>

            {/* Additional Packs */}
            <div className="grid gap-6 sm:gap-8 mb-16 sm:mb-24 md:grid-cols-2">
              {additionalPacks.map((pack, index) => (
                <div key={index} className="p-6 sm:p-8 border border-gray-200 bg-gray-50 rounded-2xl sm:rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">{pack.name}</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">{pack.description}</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                      {pack.features.map((f, i) => (
                        <li key={i} className="flex gap-2 items-center text-xs sm:text-sm text-gray-700">
                          <FaCheck className="text-purple-600 flex-shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-center md:text-right min-w-[150px] sm:min-w-[200px]">
                    <div className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-900">${pack.price}</div>
                    <Link
                      to={`/contact?package=${encodeURIComponent(pack.name)}`}
                      className="inline-block px-4 sm:px-6 py-2.5 sm:py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 font-semibold w-full text-center shadow-lg hover:shadow-purple-500/20 transition-all text-sm sm:text-base"
                    >
                      Request Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Retainers */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Monthly Growth Retainers</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {retainers.map((r, index) => (
                  <div key={index} className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100 rounded-3xl shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">{r.name}</h3>
                      <div className="text-3xl font-bold text-purple-600">${r.price}<span className="text-sm font-normal text-gray-500">{r.period}</span></div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {r.features.map((f, i) => (
                        <li key={i} className="flex gap-3 items-center text-gray-700">
                          <div className="w-2 h-2 rounded-full bg-purple-600" /> {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={RAZORPAY_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 text-center border border-purple-200 text-purple-700 rounded-xl hover:bg-purple-600 hover:text-white transition-all font-semibold flex items-center justify-center gap-2"
                    >
                      <img src="https://razorpay.com/favicon.png" alt="Razorpay" className="w-4 h-4 grayscale opacity-50 group-hover:invert group-hover:opacity-100" />
                      Subscribe Now
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: LIGHT GRAY INDIVIDUAL SERVICES */}
        <section className="py-24 bg-gray-50 border-y border-gray-100">
          <div className="px-6 mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Individual Services (Low Entry Model)</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {individualServices.map((cat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, borderColor: 'rgba(147, 51, 234, 0.3)', boxShadow: '0 20px 25px -5px rgba(147, 51, 234, 0.1), 0 10px 10px -5px rgba(147, 51, 234, 0.04)' }}
                  className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-6 text-purple-600 border-b border-gray-100 pb-4">{cat.category}</h3>
                  <div className="space-y-6">
                    {cat.items.map((item, i) => (
                      <div key={i} className="flex flex-col gap-2 group/item">
                        <div className="flex justify-between items-center gap-4">
                          <span className="text-gray-700 text-sm font-semibold group-hover/item:text-purple-600 transition-colors">{item.name}</span>
                          <span className="text-purple-700 text-xs font-bold px-3 py-1 bg-purple-50 rounded-full border border-purple-100 whitespace-nowrap">{item.price}</span>
                        </div>
                        <Link
                          to={`/contact?service=${encodeURIComponent(item.name)}`}
                          className="text-[10px] uppercase tracking-wider font-bold text-gray-400 hover:text-purple-600 flex items-center gap-1 transition-colors"
                        >
                          Enquire Now <FaArrowRight className="text-[8px] animate-pulse" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: WHITE FAQ SECTION */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl px-6 mx-auto">
            <h2 className="mb-16 text-4xl font-bold text-center text-gray-900">Common Questions</h2>
            <div className="grid gap-8">
              {faqs.map((faq, index) => (
                <div key={index} className="p-8 border border-gray-100 rounded-2xl bg-gray-50 shadow-sm hover:border-purple-200 transition-colors">
                  <h3 className="mb-3 text-lg font-bold text-purple-700">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: DARK FINAL CTA & BADGES */}
        <div className="bg-black text-white">
          <section className="py-24 text-center relative overflow-hidden">
            {/* Simple geometric overlay for premium feel */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            <div className="px-6 mx-auto max-w-4xl relative z-10">
              <h2 className="mb-6 text-4xl font-bold">Ready to Scale Your Business?</h2>
              <p className="mb-10 text-xl text-gray-400">Choose a package that fits your needs or contact us for a custom strategy session.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact">
                  <button className="px-10 py-4 bg-purple-600 rounded-xl font-bold text-lg hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-500/25">Book Strategy Call</button>
                </Link>
                <button className="px-10 py-4 border border-white/20 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">View All Work</button>
              </div>
            </div>
          </section>

          {/* Trust Badges */}
          <div className="pb-16 pt-8 border-t border-white/5 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-8 font-medium">Secure Payments</p>
            <div className="flex justify-center items-center gap-4 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
              <img src="https://razorpay.com/favicon.png" alt="Razorpay" className="h-8 sm:h-10" />
              <span className="text-lg sm:text-xl font-bold tracking-tight">Razorpay</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pricing

