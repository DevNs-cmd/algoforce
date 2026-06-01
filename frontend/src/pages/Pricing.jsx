import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaChartLine, FaCheck, FaHeadset, FaLayerGroup, FaRocket, FaShieldAlt } from 'react-icons/fa'
import PageVideoBackdrop from '../components/common/PageVideoBackdrop'

const Pricing = () => {
  const RAZORPAY_LINK = "https://rzp.io/l/algoforce-payment"

  const comboPackages = [
    {
      name: 'Starter Retainer',
      price: '25K-75K',
      cadence: '/mo',
      label: 'Audit',
      description: 'A focused entry plan for businesses beginning with AI-led growth and automation.',
      features: ['2 AI services', 'Monthly reporting', 'Email support', 'Basic automation'],
      badge: 'Starter'
    },
    {
      name: 'Growth Retainer',
      price: '75K-2L',
      cadence: '/mo',
      label: 'Most chosen',
      description: 'The core monthly engagement for teams ready to automate repeatable workflows.',
      features: ['5 AI services', 'Weekly reporting', 'Priority support', 'Advanced AI flows'],
      badge: 'Popular',
      highlight: true
    },
    {
      name: 'Scale Retainer',
      price: '2L-8L',
      cadence: '/mo',
      label: 'Custom',
      description: 'Full ecosystem execution for companies that need a dedicated AI growth team.',
      features: ['Full ecosystem stack', 'Dedicated team', '24/7 support', 'Custom AI systems'],
      badge: 'Industrial'
    }
  ]

  const specialized = [
    {
      icon: FaLayerGroup,
      name: 'Project-Based Services',
      price: '50K-5L',
      desc: 'Branding, web, automation, CRM, MVP, and AI workflow projects with scoped delivery.',
      features: ['Brand + web', 'AI automation', 'CRM setup', 'MVP delivery']
    },
    {
      icon: FaChartLine,
      name: 'Corporate Training',
      price: '2L-20L/qtr',
      desc: 'Enterprise AI training programs for teams, colleges, and partner companies.',
      features: ['Custom curriculum', 'Live sessions', 'Team projects', 'Certification']
    }
  ]

  const entryPoints = [
    { category: 'Labs Cohorts', price: 'Rs 5K+', items: ['AI courses', 'Live cohorts', 'Certifications'] },
    { category: 'Crucible', price: 'Rs 10K+', items: ['Memberships', 'Hackathons', 'Demo days'] },
    { category: 'SaaS Tools', price: 'Rs 1K+', items: ['AlgoLeads', 'AlgoContent', 'AlgoCRM'] },
    { category: 'Placements', price: 'Rs 50K+', items: ['Apprenticeships', 'Hiring pipeline', 'Partner fees'] }
  ]

  const proof = [
    { icon: FaShieldAlt, label: 'Secure payments' },
    { icon: FaHeadset, label: 'Priority support' },
    { icon: FaRocket, label: 'Execution first' }
  ]

  return (
    <>
      <Helmet>
        <title>Pricing - AlgoForce AI Services, Labs & Crucible</title>
        <meta name="description" content="AlgoForce AI pricing for consulting retainers, project-based services, Labs cohorts, Crucible memberships, SaaS products, and corporate training." />
      </Helmet>

      <div className="relative min-h-screen overflow-hidden bg-[#020205] text-white pt-32 md:pt-40 pb-20 md:pb-28">
        <PageVideoBackdrop src="/video2.mp4" className="z-0" videoClassName="opacity-[0.3]" />
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[720px] h-[720px] bg-purple-600/10 blur-[150px] rounded-full" />
          <div className="absolute bottom-20 left-[-10%] w-[640px] h-[640px] bg-blue-600/10 blur-[130px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
          <section className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-end mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-7 rounded-full premium-dark-surface backdrop-blur-xl">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                <span className="text-[10px] font-semibold uppercase text-slate-300">Ecosystem Pricing Models</span>
              </div>

              <h1 className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[4.9rem] font-bold leading-[1.04] mb-6">
                Clear pricing for serious AI execution.
              </h1>
              <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Choose a monthly retainer, scope a focused project, or enter through Labs, Crucible, SaaS tools, and enterprise training.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="premium-dark-surface rounded-[28px] p-6 md:p-8 backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div>
                  <p className="text-[11px] uppercase font-semibold text-slate-400 mb-2">Best starting point</p>
                  <h2 className="text-2xl md:text-3xl font-bold">Growth Retainer</h2>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white text-[#06101d] flex items-center justify-center">
                  <FaRocket />
                </div>
              </div>
              <div className="py-6">
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-4xl md:text-5xl font-bold">Rs 75K-2L</span>
                  <span className="text-slate-400 pb-1">/mo</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  A practical monthly system for teams that need workflows, reporting, automation, and implementation discipline.
                </p>
              </div>
              <a href={RAZORPAY_LINK} target="_blank" rel="noopener noreferrer" className="block">
                <button className="w-full py-4 rounded-full bg-white text-[#06101d] font-bold text-sm flex items-center justify-center gap-3 hover:bg-[#f6f1ff] transition-all">
                  Start Payment <FaArrowRight size={12} />
                </button>
              </a>
            </motion.div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-16">
            {comboPackages.map((pkg, idx) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + (idx * 0.08), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative group p-6 md:p-8 rounded-[28px] premium-dark-surface backdrop-blur-2xl flex flex-col transition-all duration-500 hover:-translate-y-1 ${pkg.highlight ? 'ring-1 ring-purple-500/45 shadow-[0_30px_80px_rgba(143,56,255,0.14)]' : ''}`}
              >
                <div className="flex items-center justify-between gap-4 mb-8">
                  <span className="px-3 py-1.5 rounded-full bg-white/6 border border-white/10 text-[10px] font-semibold uppercase text-purple-300">
                    {pkg.badge}
                  </span>
                  <span className="text-[11px] uppercase font-semibold text-slate-500">{pkg.label}</span>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white">{pkg.name}</h3>
                <div className="flex items-end gap-2 mb-6">
                  <span className="text-4xl font-bold">Rs {pkg.price}</span>
                  <span className="text-slate-500 pb-1">{pkg.cadence}</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 pb-8 border-b border-white/8">{pkg.description}</p>

                <div className="space-y-4 mb-8 flex-grow">
                  {pkg.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-white/6 border border-white/10 flex items-center justify-center text-purple-300">
                        <FaCheck size={9} />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>

                <a href={RAZORPAY_LINK} target="_blank" rel="noopener noreferrer">
                  <button className={`w-full py-4 rounded-full font-bold text-sm transition-all ${pkg.highlight ? 'bg-purple-600 text-white hover:bg-purple-500' : 'bg-white text-[#06101d] hover:bg-[#f6f1ff]'}`}>
                    Start Payment
                  </button>
                </a>
              </motion.div>
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 mb-12 md:mb-16">
            {specialized.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: idx * 0.08 }}
                className="p-6 md:p-8 rounded-[28px] premium-dark-surface backdrop-blur-2xl flex flex-col sm:flex-row justify-between gap-8"
              >
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-white/7 border border-white/10 flex items-center justify-center text-purple-300 mb-6">
                    <item.icon />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{item.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((feature) => (
                      <span key={feature} className="px-3 py-2 rounded-full bg-white/5 border border-white/8 text-[11px] font-semibold text-slate-400">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="sm:text-right sm:min-w-[180px] flex sm:block items-center justify-between gap-5">
                  <div>
                    <div className="text-[11px] uppercase font-semibold text-slate-500 mb-2">From</div>
                    <div className="text-3xl font-bold">Rs {item.price}</div>
                  </div>
                  <Link to="/contact">
                    <button className="px-6 py-3 bg-white/6 hover:bg-white/10 border border-white/10 rounded-full text-[13px] font-bold transition-all whitespace-nowrap">
                      Request Scope
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </section>

          <section className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 items-stretch">
            <div className="rounded-[28px] premium-dark-surface backdrop-blur-2xl p-6 md:p-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Entry points</h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Start small, validate the fit, then move into deeper execution when your systems are ready.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {proof.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white/5 border border-white/8 p-4">
                    <item.icon className="text-purple-300 mb-3" />
                    <p className="text-sm font-semibold text-slate-300">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {entryPoints.map((item) => (
                <div key={item.category} className="rounded-[24px] premium-dark-surface backdrop-blur-xl p-5 md:p-6">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <h3 className="text-xl font-bold">{item.category}</h3>
                    <span className="text-sm font-bold text-purple-300 whitespace-nowrap">{item.price}</span>
                  </div>
                  <div className="space-y-3">
                    {item.items.map((entry) => (
                      <div key={entry} className="flex items-center gap-3 text-sm text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        {entry}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-12 md:mt-16 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-slate-500 text-center md:text-left">
              Payments are handled through secure Razorpay checkout. Custom invoices are available for enterprise scopes.
            </p>
            <Link to="/contact">
              <button className="text-[13px] font-bold text-white hover:text-purple-300 transition-colors flex items-center gap-3">
                Get a bespoke quote <FaArrowRight size={12} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pricing
