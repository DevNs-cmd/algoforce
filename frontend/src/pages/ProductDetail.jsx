import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaLink,
  FaUserTie,
  FaDownload,
  FaDesktop,
  FaWindows,
  FaApple,
  FaLinux,
  FaShieldAlt,
  FaRocket,
  FaBolt
} from 'react-icons/fa'
import SeoHead from '../components/common/SeoHead'
import { getProductBySlug } from '../data/productDetails'
import TallyGPTInstallSection from '../components/sections/TallyGPTInstallSection'

const ProductDetail = () => {
  const { productSlug } = useParams()
  const product = getProductBySlug(productSlug)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!product) {
    return <Navigate to="/products" replace />
  }

  const isFinanceAI = product.slug === 'finance-ai'
  const demoPath = `/contact?interest=${encodeURIComponent(product.name)}`

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#06101d]">
      <SeoHead path={`/products/${productSlug}`} />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#06101d]/8 bg-gradient-to-b from-[#fbfbfe] via-white to-[#f4f6fc] pt-32 pb-16 md:pt-36 md:pb-24">
        {/* Dynamic ambient glow elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10rem] right-[-6rem] h-[32rem] w-[32rem] rounded-full bg-[#8f38ff]/12 blur-[100px]" />
          <div className="absolute bottom-[-10rem] left-[-8rem] h-[34rem] w-[34rem] rounded-full bg-[#00adef]/10 blur-[110px]" />
          <div className="absolute top-1/2 left-1/3 h-[20rem] w-[20rem] rounded-full bg-purple-500/5 blur-[90px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <Link to="/products" className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition-colors hover:text-[#8f38ff]">
            <FaArrowLeft size={10} /> All products
          </Link>
          
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Left Column: Heading, Badges, Tagline & Highlights */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-6 flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#8f38ff]/20 bg-[#8f38ff]/8 px-4 py-1.5 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8f38ff] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8f38ff]" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8f38ff]">
                    {product.function} SOFTWARE
                  </span>
                </div>

                {isFinanceAI && (
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    <FaBolt className="text-emerald-500" size={10} />
                    <span>TallyGPT v1.0 Desktop Ready</span>
                  </div>
                )}
              </div>

              <h1 className="mb-5 max-w-4xl text-[2.5rem] font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]">
                {product.name}
              </h1>

              <p className="max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl font-normal">
                {product.tagline}
              </p>

              {/* OS Compatibility Chips */}
              {isFinanceAI && (
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-50 to-cyan-50 px-3.5 py-2 text-xs font-bold text-blue-700 shadow-sm transition-transform hover:scale-[1.02]">
                    <FaWindows className="text-[#00adef]" size={14} />
                    <span>Windows 10 / 11 (64-bit)</span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-slate-300/70 bg-slate-100/80 px-3.5 py-2 text-xs font-bold text-slate-800 shadow-sm transition-transform hover:scale-[1.02]">
                    <FaApple className="text-slate-900" size={14} />
                    <span>macOS Monterey+</span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50/80 px-3.5 py-2 text-xs font-bold text-orange-900 shadow-sm transition-transform hover:scale-[1.02]">
                    <FaLinux className="text-orange-600" size={14} />
                    <span>Linux AppImage</span>
                  </span>
                </div>
              )}

              {/* Quick Feature Highlights */}
              <div className="mt-9 grid grid-cols-3 gap-3 border-t border-slate-200/80 pt-6 max-w-xl">
                <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-3.5 text-center shadow-sm">
                  <div className="text-lg md:text-xl font-bold text-[#06101d]">10x</div>
                  <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mt-0.5">Faster Sync</div>
                </div>
                <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-3.5 text-center shadow-sm">
                  <div className="text-lg md:text-xl font-bold text-[#8f38ff]">100%</div>
                  <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mt-0.5">Local Privacy</div>
                </div>
                <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-3.5 text-center shadow-sm">
                  <div className="text-lg md:text-xl font-bold text-[#06101d]">Zero</div>
                  <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mt-0.5">Tally Changes</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Premium Action Card & Download Hub */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.7 }}
              className="relative rounded-[32px] border border-[#8f38ff]/20 bg-white/90 p-7 shadow-[0_28px_80px_rgba(143,56,255,0.14)] backdrop-blur-xl md:p-8"
            >
              <div className="absolute top-0 right-8 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#8f38ff] to-[#6116cd] px-3.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white shadow-md">
                Official Agent Download
              </div>

              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f38ff]">Built for</p>
              <p className="text-base font-semibold leading-relaxed text-[#06101d]">{product.whoItsFor}</p>

              {/* Action Buttons Stack */}
              <div className="mt-8 space-y-3.5">
                {isFinanceAI && (
                  <a
                    href="/tallygpt-desktop.exe"
                    download="tallygpt-desktop.exe"
                    className="group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-[#8f38ff] via-[#7e25f6] to-[#6116cd] p-4 text-center text-white shadow-xl shadow-purple-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/40 active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase">
                      <FaDownload size={15} className="group-hover:translate-y-0.5 transition-transform" />
                      <span>Install TallyGPT for Windows</span>
                    </div>
                    <span className="mt-1 text-[11px] font-medium text-purple-200/90">
                      v1.0.4 • 7.6 MB • Windows 10 & 11 (64-bit)
                    </span>
                  </a>
                )}

                <Link
                  to={demoPath}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#06101d] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-[#102640] shadow-md"
                >
                  Book a demo <FaArrowRight size={9} />
                </Link>

                {isFinanceAI && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#06101d]/15 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-[#06101d] transition-all hover:bg-slate-50 hover:border-[#8f38ff]/40 shadow-sm"
                  >
                    <FaDesktop size={12} className="text-[#8f38ff]" /> Install for Mac & Linux
                  </button>
                )}
              </div>

              {/* Trust Footer */}
              {isFinanceAI && (
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <FaShieldAlt size={12} /> 100% On-Premises Privacy
                  </span>
                  <span className="font-medium text-slate-400">Tally Prime & ERP 9</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dedicated TallyGPT Installation & Desktop Agent Section for Finance AI */}
      {isFinanceAI && (
        <TallyGPTInstallSection isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}

      {/* Problem & Audience */}
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-6 md:grid-cols-2 md:py-20">
        <article className="rounded-[28px] border border-[#06101d]/10 bg-white p-7 shadow-[0_20px_55px_rgba(6,47,79,0.05)] md:p-8">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f38ff]">The problem</p>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">Where operations get stuck.</h2>
          <p className="leading-relaxed text-slate-600">{product.problem}</p>
        </article>
        <article className="rounded-[28px] border border-[#06101d]/10 bg-[#06101d] p-7 text-white shadow-[0_20px_55px_rgba(6,47,79,0.14)] md:p-8">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-purple-300">Who it is for</p>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">A product for the people accountable for the outcome.</h2>
          <p className="leading-relaxed text-slate-300">{product.whoItsFor}</p>
        </article>
      </section>

      {/* Outcomes & Features */}
      <section className="border-y border-[#06101d]/8 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-2 md:py-20">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f38ff]">Business outcomes</p>
            <h2 className="mb-7 text-3xl font-semibold tracking-tight md:text-4xl">What the product is designed to improve.</h2>
            <div className="space-y-4">
              {product.outcomes.map((outcome) => (
                <div key={outcome} className="flex items-start gap-3 rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] p-4">
                  <FaCheckCircle className="mt-0.5 shrink-0 text-[#8f38ff]" />
                  <p className="text-sm font-semibold leading-relaxed text-slate-700">{outcome}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f38ff]">Key capabilities</p>
            <h2 className="mb-7 text-3xl font-semibold tracking-tight md:text-4xl">A focused product, configured for your workflow.</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {product.features.map((feature) => (
                <div key={feature} className="rounded-2xl border border-[#06101d]/10 bg-white p-5 shadow-[0_12px_35px_rgba(6,47,79,0.04)]">
                  <p className="text-sm font-bold leading-relaxed text-[#06101d]">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integrations, Timeline & Pricing */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-[28px] border border-[#06101d]/10 bg-white p-7 shadow-[0_20px_55px_rgba(6,47,79,0.05)]">
            <FaLink className="mb-5 text-xl text-[#8f38ff]" />
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Integrations</p>
            <h2 className="mb-4 text-xl font-semibold tracking-tight">Fits around your current stack.</h2>
            <ul className="space-y-2 text-sm font-medium text-slate-600">
              {product.integrations.map((integration) => <li key={integration}>• {integration}</li>)}
            </ul>
          </article>
          <article className="rounded-[28px] border border-[#06101d]/10 bg-white p-7 shadow-[0_20px_55px_rgba(6,47,79,0.05)]">
            <FaClock className="mb-5 text-xl text-[#8f38ff]" />
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Deployment timeline</p>
            <h2 className="mb-4 text-xl font-semibold tracking-tight">Planned around readiness, not guesswork.</h2>
            <p className="text-sm leading-relaxed text-slate-600">{product.deploymentTimeline}</p>
          </article>
          <article className="rounded-[28px] border border-[#06101d]/10 bg-[#f4efff] p-7 shadow-[0_20px_55px_rgba(6,47,79,0.05)]">
            <FaUserTie className="mb-5 text-xl text-[#8f38ff]" />
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-purple-600">Pricing</p>
            <h2 className="mb-4 text-xl font-semibold tracking-tight">Enterprise pricing, scoped to deployment.</h2>
            <p className="text-sm leading-relaxed text-slate-600">{product.pricing}</p>
          </article>
        </div>
      </section>

      {/* Product Screens */}
      <section className="border-y border-[#06101d]/8 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f38ff]">Product demo</p>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">Review the screens that matter to your team.</h2>
            <p className="leading-relaxed text-slate-600">We walk through the relevant screens, workflow and integration touchpoints in a tailored product demo—rather than presenting generic, disconnected features.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {product.screens.map((screen, index) => (
              <div key={screen} className="rounded-[22px] border border-[#06101d]/10 bg-[#f7f9fc] p-6">
                <span className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xs font-bold text-[#8f38ff] shadow-sm">0{index + 1}</span>
                <h3 className="text-lg font-bold tracking-tight">{screen}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">Reviewed with your operational workflow during the demo.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6 md:py-20">
        <div className="mb-8 text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f38ff]">FAQ</p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Questions teams ask before they deploy.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {product.faqs.map(([question, answer]) => (
            <article key={question} className="rounded-[24px] border border-[#06101d]/10 bg-white p-6 shadow-[0_12px_35px_rgba(6,47,79,0.04)]">
              <h3 className="mb-3 text-base font-bold text-[#06101d]">{question}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{answer}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#06101d] px-5 py-14 text-white sm:px-6 md:py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          <div className="max-w-2xl">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-purple-300">Next step</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">See {product.name} in the context of your operation.</h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link to={demoPath} className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-white px-7 py-4 text-xs font-bold uppercase tracking-widest text-[#06101d] transition-colors hover:bg-slate-100">
              Book a demo <FaArrowRight size={9} />
            </Link>

            {isFinanceAI && (
              <a
                href="/tallygpt-desktop.exe"
                download="tallygpt-desktop.exe"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-purple-500"
              >
                <FaDownload size={12} /> Install TallyGPT for Windows
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProductDetail
