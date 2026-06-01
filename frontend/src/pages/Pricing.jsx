import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FaArrowRight,
  FaChartLine,
  FaCheck,
  FaHeadset,
  FaLayerGroup,
  FaMapMarkerAlt,
  FaRocket,
  FaShieldAlt,
} from 'react-icons/fa'

const Pricing = () => {
  const RAZORPAY_LINK = "https://rzp.io/l/algoforce-payment"

  const comboPackages = [
    {
      name: 'Starter Retainer',
      price: '$29',
      cadence: '/mo',
      label: 'Audit',
      description: 'A focused entry plan for businesses beginning with AI-led growth and automation.',
      features: ['2 AI services', 'Monthly reporting', 'Email support', 'Basic automation'],
      badge: 'Starter',
    },
    {
      name: 'Growth Retainer',
      price: '$69',
      cadence: '/mo',
      label: 'Most chosen',
      description: 'The core monthly engagement for teams ready to automate repeatable workflows.',
      features: ['5 AI services', 'Weekly reporting', 'Priority support', 'Advanced AI flows'],
      badge: 'Popular',
      highlight: true,
    },
    {
      name: 'Scale Retainer',
      price: '$99',
      cadence: '/mo',
      label: 'Custom',
      description: 'Full ecosystem execution for companies that need a dedicated AI growth team.',
      features: ['Full ecosystem stack', 'Dedicated team', '24/7 support', 'Custom AI systems'],
      badge: 'Industrial',
    },
  ]

  const specialized = [
    {
      icon: FaLayerGroup,
      name: 'Project-Based Services',
      price: '$79',
      desc: 'Branding, web, automation, CRM, MVP, and AI workflow projects with scoped delivery.',
      features: ['Brand + web', 'AI automation', 'CRM setup', 'MVP delivery'],
    },
    {
      icon: FaChartLine,
      name: 'Corporate Training',
      price: '$99/qtr',
      desc: 'Enterprise AI training programs for teams, colleges, and partner companies.',
      features: ['Custom curriculum', 'Live sessions', 'Team projects', 'Certification'],
    },
  ]

  const entryPoints = [
    { category: 'Labs Cohorts', price: '$19+', items: ['AI courses', 'Live cohorts', 'Certifications'] },
    { category: 'Crucible', price: '$29+', items: ['Memberships', 'Hackathons', 'Demo days'] },
    { category: 'SaaS Tools', price: '$9+', items: ['AlgoLeads', 'AlgoContent', 'AlgoCRM'] },
    { category: 'Placements', price: '$49+', items: ['Apprenticeships', 'Hiring pipeline', 'Partner fees'] },
  ]

  const proof = [
    { icon: FaShieldAlt, label: 'Secure payments' },
    { icon: FaHeadset, label: 'Priority support' },
    { icon: FaRocket, label: 'Execution first' },
  ]

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#06101d]">
      <Helmet>
        <title>Pricing - AlgoForce AI Services, Labs & Crucible</title>
        <meta name="description" content="AlgoForce AI pricing for consulting retainers, project-based services, Labs cohorts, Crucible memberships, SaaS products, and corporate training." />
        <link rel="canonical" href="https://www.algoforceaii.com/pricing" />
      </Helmet>

      <section className="relative overflow-hidden border-b border-[#06101d]/8 bg-white pt-32 pb-14 md:pt-36 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-12rem] right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#8f38ff]/10 blur-[90px]" />
          <div className="absolute bottom-[-12rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-[#062f4f]/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#06101d]/10 bg-[#f7f9fc] px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8f38ff]" />
                <span className="text-[10px] font-semibold uppercase text-slate-500">Ecosystem Pricing</span>
              </div>
              <h1 className="mb-6 max-w-4xl text-[2.5rem] font-semibold leading-[1.03] sm:text-5xl md:text-6xl lg:text-[4.1rem]">
                Clear pricing for <span className="premium-serif italic font-normal text-[#8f38ff]">serious execution.</span>
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                Choose a monthly retainer, scope a focused project, or enter through Labs, Crucible, SaaS tools, and enterprise training. No public plan exceeds $99.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={RAZORPAY_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#06101d] px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#102640]">
                  Start Payment <FaArrowRight size={11} />
                </a>
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#06101d]/10 bg-white px-6 py-3.5 text-sm font-bold text-[#06101d] transition-all hover:border-[#8f38ff]/40 hover:text-[#8f38ff]">
                  Request Quote
                </Link>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.75 }}
              className="overflow-hidden rounded-[34px] border border-[#06101d]/10 bg-white p-4 shadow-[0_24px_70px_rgba(6,47,79,0.08)]"
            >
              <div className="relative aspect-[16/10] min-h-[260px] overflow-hidden rounded-[28px] border border-[#06101d]/10 bg-[#eef2f7]">
                <video
                  autoPlay
                  loop
                  muted
                  defaultMuted
                  playsInline
                  webkit-playsinline="true"
                  preload="metadata"
                  src="/video2.mp4"
                  className="absolute inset-0 h-full w-full object-cover opacity-80"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,16,29,0.04),rgba(6,16,29,0.68))]" />
                <div className="absolute left-5 right-5 bottom-5 text-white">
                  <p className="mb-2 text-[10px] font-semibold uppercase text-white/70">Best Starting Point</p>
                  <h2 className="text-2xl font-semibold md:text-3xl">Growth Retainer</h2>
                </div>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-5 px-2 pt-6">
                <div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-[#06101d] md:text-4xl">$69</span>
                    <span className="pb-1 text-sm font-semibold text-slate-400">/mo</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Monthly workflows, reporting, automation, and implementation discipline.
                  </p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#06101d] text-white">
                  <FaRocket />
                </div>
              </div>
              <div className="mt-6 flex items-start gap-3 px-2 text-sm font-semibold text-slate-500">
                <FaMapMarkerAlt className="mt-0.5 text-[#8f38ff]" />
                <span>Office: South Delhi, Kalkaji, New Delhi 110019</span>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase text-[#8f38ff]">Retainers</p>
            <h2 className="text-3xl font-semibold md:text-4xl">Monthly execution models</h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-slate-500 md:text-base">
            Pick the operating depth that matches your current stage, then expand into projects, Labs, or training as needed.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {comboPackages.map((pkg, idx) => (
            <motion.article
              key={pkg.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: idx * 0.08 }}
              className={`flex h-full flex-col rounded-[30px] border p-6 shadow-[0_24px_70px_rgba(6,47,79,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(6,47,79,0.14)] md:p-7 ${pkg.highlight ? 'border-[#06101d] bg-[#06101d] text-white' : 'border-[#06101d]/10 bg-white text-[#06101d]'}`}
            >
              <div className="mb-8 flex items-center justify-between gap-4">
                <span className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase ${pkg.highlight ? 'border border-white/10 bg-white/8 text-purple-200' : 'border border-[#06101d]/10 bg-[#f7f9fc] text-[#8f38ff]'}`}>
                  {pkg.badge}
                </span>
                <span className={`text-[11px] font-semibold uppercase ${pkg.highlight ? 'text-slate-400' : 'text-slate-400'}`}>{pkg.label}</span>
              </div>

              <h3 className="mb-3 text-2xl font-semibold">{pkg.name}</h3>
              <div className="mb-6 flex items-end gap-2">
                <span className="text-4xl font-bold">{pkg.price}</span>
                <span className={`pb-1 ${pkg.highlight ? 'text-slate-400' : 'text-slate-500'}`}>{pkg.cadence}</span>
              </div>
              <p className={`mb-8 border-b pb-8 text-sm leading-relaxed ${pkg.highlight ? 'border-white/10 text-slate-300' : 'border-[#06101d]/10 text-slate-600'}`}>{pkg.description}</p>

              <div className="mb-8 flex-grow space-y-4">
                {pkg.features.map((feature) => (
                  <div key={feature} className={`flex items-center gap-3 text-sm ${pkg.highlight ? 'text-slate-300' : 'text-slate-600'}`}>
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full ${pkg.highlight ? 'bg-white/8 text-purple-200' : 'bg-[#f7f9fc] text-[#8f38ff]'}`}>
                      <FaCheck size={9} />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <a href={RAZORPAY_LINK} target="_blank" rel="noopener noreferrer" className="mt-auto">
                <button className={`w-full rounded-full py-4 text-sm font-bold transition-all ${pkg.highlight ? 'bg-white text-[#06101d] hover:bg-[#f6f1ff]' : 'bg-[#06101d] text-white hover:bg-[#102640]'}`}>
                  Start Payment
                </button>
              </a>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 md:pb-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {specialized.map((item, idx) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-[30px] border border-[#06101d]/10 bg-white p-6 shadow-[0_24px_70px_rgba(6,47,79,0.08)] md:p-8"
            >
              <div className="mb-6 flex items-start justify-between gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc] text-[#8f38ff]">
                  <item.icon />
                </div>
                <div className="text-right">
                  <div className="mb-1 text-[11px] font-semibold uppercase text-slate-400">From</div>
                  <div className="text-2xl font-bold">{item.price}</div>
                </div>
              </div>
              <h3 className="mb-3 text-2xl font-semibold md:text-3xl">{item.name}</h3>
              <p className="mb-6 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              <div className="mb-8 flex flex-wrap gap-2">
                {item.features.map((feature) => (
                  <span key={feature} className="rounded-full border border-[#06101d]/10 bg-[#f7f9fc] px-3 py-2 text-[11px] font-semibold text-slate-500">
                    {feature}
                  </span>
                ))}
              </div>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#06101d] px-5 py-3 text-sm font-bold text-white">
                Request Scope <FaArrowRight size={11} />
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 md:pb-24">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[30px] border border-[#06101d]/10 bg-[#06101d] p-7 text-white shadow-[0_24px_70px_rgba(6,47,79,0.18)] md:p-8">
            <h2 className="mb-4 text-3xl font-semibold md:text-4xl">Entry points</h2>
            <p className="mb-8 leading-relaxed text-slate-300">
              Start small, validate the fit, then move into deeper execution when your systems are ready.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {proof.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <item.icon className="mb-3 text-purple-300" />
                  <p className="text-sm font-semibold text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {entryPoints.map((item) => (
              <article key={item.category} className="rounded-[26px] border border-[#06101d]/10 bg-white p-5 shadow-[0_20px_55px_rgba(6,47,79,0.07)] md:p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold">{item.category}</h3>
                  <span className="whitespace-nowrap text-sm font-bold text-[#8f38ff]">{item.price}</span>
                </div>
                <div className="space-y-3">
                  {item.items.map((entry) => (
                    <div key={entry} className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#8f38ff]" />
                      {entry}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-[#06101d]/10 pt-8 md:flex-row">
          <p className="text-center text-sm text-slate-500 md:text-left">
            Payments are handled through secure Razorpay checkout. Custom invoices are available for enterprise scopes.
          </p>
          <Link to="/contact" className="flex items-center gap-3 text-[13px] font-bold text-[#06101d] transition-colors hover:text-[#8f38ff]">
            Get a bespoke quote <FaArrowRight size={12} />
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Pricing
