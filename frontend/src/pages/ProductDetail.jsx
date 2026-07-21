import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaClock, FaLink, FaUserTie } from 'react-icons/fa'
import SeoHead from '../components/common/SeoHead'
import { getProductBySlug } from '../data/productDetails'

const ProductDetail = () => {
  const { productSlug } = useParams()
  const product = getProductBySlug(productSlug)

  if (!product) {
    return <Navigate to="/products" replace />
  }

  const demoPath = `/contact?interest=${encodeURIComponent(product.name)}`

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#06101d]">
      <SeoHead path="/products" />

      <section className="relative overflow-hidden border-b border-[#06101d]/8 bg-white pt-32 pb-14 md:pt-36 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-12rem] right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#8f38ff]/10 blur-[90px]" />
          <div className="absolute bottom-[-12rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-[#062f4f]/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <Link to="/products" className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition-colors hover:text-[#8f38ff]">
            <FaArrowLeft size={10} /> All products
          </Link>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#06101d]/10 bg-[#f7f9fc] px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8f38ff]" />
                <span className="text-[10px] font-semibold uppercase text-slate-500">{product.function} software</span>
              </div>
              <h1 className="mb-5 max-w-4xl text-[2.45rem] font-semibold leading-[1.03] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.1rem]">
                {product.name}
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
                {product.tagline}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.7 }}
              className="rounded-[30px] border border-[#06101d]/10 bg-[#f7f9fc] p-7 shadow-[0_24px_70px_rgba(6,47,79,0.08)] md:p-8"
            >
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f38ff]">Built for</p>
              <p className="text-base font-semibold leading-relaxed text-[#06101d]">{product.whoItsFor}</p>
              <Link to={demoPath} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#06101d] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#102640]">
                Book a demo <FaArrowRight size={9} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

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

      <section className="bg-[#06101d] px-5 py-14 text-white sm:px-6 md:py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          <div className="max-w-2xl">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-purple-300">Next step</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">See {product.name} in the context of your operation.</h2>
          </div>
          <Link to={demoPath} className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-white px-7 py-4 text-xs font-bold uppercase tracking-widest text-[#06101d] transition-colors hover:bg-slate-100">
            Book a demo <FaArrowRight size={9} />
          </Link>
        </div>
      </section>
    </main>
  )
}

export default ProductDetail
