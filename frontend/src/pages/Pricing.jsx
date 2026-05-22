import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'

const Pricing = () => {
  const RAZORPAY_LINK = "https://rzp.io/l/algoforce-payment";

  const comboPackages = [
    {
      name: 'Starter Retainer',
      price: '25K-75K/mo',
      oldPrice: 'Audit',
      description: 'A focused entry plan for businesses starting with AI-led growth.',
      features: ['2 AI services', 'Monthly reporting', 'Email support', 'Basic automation'],
      badge: 'Starter'
    },
    {
      name: 'Growth Retainer',
      price: '75K-2L/mo',
      oldPrice: 'Scale',
      description: 'The core monthly engagement for teams ready to automate and grow.',
      features: ['5 AI services', 'Weekly reporting', 'Priority support', 'Advanced AI flows'],
      badge: 'Popular',
      highlight: true
    },
    {
      name: 'Scale Retainer',
      price: '2L-8L/mo',
      oldPrice: 'Custom',
      description: 'Full ecosystem execution for companies that need a dedicated AI growth team.',
      features: ['Full ecosystem stack', 'Dedicated team', '24/7 support', 'Custom AI systems'],
      badge: 'Industrial'
    }
  ];

  const specialized = [
    {
      name: 'Project-Based Services',
      price: '50K-5L',
      desc: 'Branding, web, automation, CRM, MVP, and AI workflow projects.',
      features: ['Brand + web', 'AI automation', 'CRM setup', 'MVP delivery']
    },
    {
      name: 'Corporate Training',
      price: '2L-20L/qtr',
      desc: 'Enterprise AI training programs for teams, colleges, and partner companies.',
      features: ['Custom curriculum', 'Live sessions', 'Team projects', 'Certification']
    }
  ];

  const individualServices = [
    { category: 'Labs Cohorts', price: 'Rs 5K+', items: ['AI courses', 'Live cohorts', 'Certifications'] },
    { category: 'Crucible', price: 'Rs 10K+', items: ['Memberships', 'Hackathons', 'Demo days'] },
    { category: 'SaaS Tools', price: 'Rs 1K+', items: ['AlgoLeads', 'AlgoContent', 'AlgoCRM'] },
    { category: 'Placements', price: 'Rs 50K+', items: ['Apprenticeships', 'Hiring pipeline', 'Partner fees'] }
  ];

  return (
    <>
      <Helmet>
        <title>Pricing - AlgoForce AI Services, Labs & Crucible</title>
        <meta name="description" content="AlgoForce AI pricing for consulting retainers, project-based services, Labs cohorts, Crucible memberships, SaaS products, and corporate training." />
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
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Ecosystem Pricing Models</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-black mb-8 tracking-tight md:tracking-tighter leading-none"
            >
              Build <span className="italic text-purple-600/80">With</span> Clarity.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto font-medium"
            >
              Clear entry points for AI consulting, project builds, Labs cohorts, Crucible memberships, SaaS tools, and enterprise training.
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
                  <span className="text-5xl font-black tracking-tighter">Rs {pkg.price}</span>
                  <span className="text-gray-600 text-[13px] font-bold uppercase tracking-widest italic">{pkg.oldPrice}</span>
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
                    Start Payment {'->'}
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
                  <div className="text-4xl font-black mb-6 tracking-tighter">Rs {item.price}</div>
                  <Link to="/contact">
                    <button className="px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[13px] font-bold transition-all">Request Scope</button>
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
