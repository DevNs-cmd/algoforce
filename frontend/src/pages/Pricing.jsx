import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'

const Pricing = () => {
  const RAZORPAY_LINK = "https://rzp.io/l/algoforce-payment";

  const comboPackages = [
    {
      name: 'Startup Growth Pack',
      price: '149',
      oldPrice: '299',
      description: 'The foundation for new businesses to establish authority.',
      features: ['5-page Premium Website', 'Global SEO Setup', 'AI Chatbot (Lead Gen)', 'Google Analytics 4', '1 Month Support'],
      badge: 'Starter'
    },
    {
      name: 'Business Automation',
      price: '299',
      oldPrice: '599',
      description: 'Comprehensive automation system for ready-to-scale entities.',
      features: ['Business Website (7+ pages)', 'Advanced AI Chatbot', 'Core CRM Automation', 'Global SEO Opt', 'Systems Maintenance'],
      badge: 'Popular',
      highlight: true
    },
    {
      name: 'AI Domination Pack',
      price: '499',
      oldPrice: '999',
      description: 'Ultimate AI infrastructure for global transformation.',
      features: ['High-Conversion Website', 'AI + Voice Receptionist', 'Advanced Workflows', 'Industrial SEO', 'Performance Opt'],
      badge: 'Industrial'
    }
  ];

  const specialized = [
    {
      name: 'E-Commerce Growth',
      price: '399',
      desc: 'Industrial storefront with automated triggers.',
      features: ['Premium Storefront', 'Global Payments', 'Ad Strategy', 'Cart Recovery']
    },
    {
      name: 'SaaS Launch MVP',
      price: '1,299+',
      desc: 'End-to-end execution for tech founders.',
      features: ['Scalable MVP Build', 'UI/UX Strategy', 'Landing Page', 'Founder Consultation']
    }
  ];

  const individualServices = [
    { category: 'AI & Chatbots', price: '$49', items: ['Basic AI Chatbot', 'Advanced AI Voice', 'CRM Integration'] },
    { category: 'Web & SaaS', price: '$99', items: ['Landing Page', 'Multi-page Web', 'SaaS MVP Component'] },
    { category: 'SEO & Growth', price: '$49', items: ['Industrial SEO', 'AEO AI Strategy', 'Social Meta'] },
    { category: 'Automation', price: '$75', items: ['E-mail Workflow', 'Data Scraping', 'API Integration'] }
  ];

  return (
    <>
      <Helmet>
        <title>Pricing – AlgoForce AI Efficiency</title>
        <meta name="description" content="Premium AI and SaaS execution pricing for global founders." />
      </Helmet>

      <div className="min-h-screen bg-[#020205] text-white pt-40 pb-32 relative overflow-hidden">
        {/* iOS Liquid Background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/10 blur-[150px] rounded-full"
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 18, repeat: Infinity }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-28">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Execution Pricing Models</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-black mb-8 tracking-tight md:tracking-tighter leading-none"
            >
              Scale <span className="italic text-purple-600/80">Pure</span> Speed.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto font-medium"
            >
              Transparent, performance-driven investment models for founders building the next dimension of technology.
            </motion.p>
          </div>

          {/* Core Bundles grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
            {comboPackages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (idx * 0.1), duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative group p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-[80px] flex flex-col transition-all duration-700 hover:bg-white/[0.06] hover:scale-[1.02] ${pkg.highlight ? 'ring-1 ring-purple-500/40 shadow-[0_30px_60px_rgba(168,85,247,0.1)]' : ''
                  }`}
              >
                {pkg.badge && (
                  <div className="absolute top-10 right-12 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-purple-400">
                    {pkg.badge}
                  </div>
                )}

                <h3 className="text-2xl font-black mb-2 tracking-tighter italic uppercase text-white">{pkg.name}</h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-black tracking-tighter">${pkg.price}</span>
                  <span className="text-gray-600 text-[13px] font-bold uppercase tracking-widest italic line-through">${pkg.oldPrice}</span>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-10 pb-10 border-b border-white/5">{pkg.description}</p>

                <div className="space-y-4 mb-12 flex-grow">
                  {pkg.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center gap-3 text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                      {feature}
                    </div>
                  ))}
                </div>

                <a href={RAZORPAY_LINK} target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-5 rounded-full font-bold text-[15px] transition-all shadow-xl ${pkg.highlight ? 'bg-purple-600 text-white' : 'bg-white text-black'
                      }`}
                  >
                    Deploy Link {'->'}
                  </motion.button>
                </a>
              </motion.div>
            ))}
          </div>

          {/* Specialized Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32">
            {specialized.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl flex flex-col md:flex-row justify-between items-center gap-8 group hover:bg-white/[0.04] transition-all"
              >
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-black mb-2 tracking-tighter uppercase italic">{item.name}</h3>
                  <p className="text-gray-500 text-sm font-medium mb-6">{item.desc}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    {item.features.map((f, i) => (
                      <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[11px] font-bold uppercase tracking-widest text-gray-400">{f}</span>
                    ))}
                  </div>
                </div>
                <div className="text-center md:text-right min-w-[200px]">
                  <div className="text-4xl font-black mb-6 tracking-tighter">${item.price}</div>
                  <Link to="/contact">
                    <button className="px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[13px] font-bold transition-all">Audit Engine</button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer - Social Proof */}
          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-left flex flex-col items-center md:items-start">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.5em] text-gray-600 mb-4 italic">Security Infrastructure</h4>
              <div className="flex items-center gap-10 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                <span className="text-xl font-black tracking-tighter italic">RAZORPAY</span>
                <span className="text-xl font-black tracking-tighter italic">STRIPE</span>
                <span className="text-xl font-black tracking-tighter italic">SSL SECURED</span>
              </div>
            </div>
            <Link to="/contact">
              <button className="text-[13px] font-bold uppercase tracking-[0.2em] text-white hover:text-purple-500 transition-colors">Bespoke Quotes {'->'}</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pricing
