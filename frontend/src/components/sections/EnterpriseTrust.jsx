import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCloud, FaLock, FaPlug, FaHeadset } from 'react-icons/fa'

const TRUST_SIGNALS = [
  {
    icon: <FaPlug />,
    title: 'Fits your current stack',
    description: 'Deploy around the ERP, CRM, documents and communication tools your teams already rely on.'
  },
  {
    icon: <FaLock />,
    title: 'Designed for business data',
    description: 'Choose secure private-cloud or on-premises deployment options that keep your operating data in your control.'
  },
  {
    icon: <FaCloud />,
    title: 'Managed beyond go-live',
    description: 'We configure, monitor, update and maintain the product after it is deployed.'
  },
  {
    icon: <FaHeadset />,
    title: 'A team stays with you',
    description: 'Your people receive onboarding, support and a clear path for continuous product improvement.'
  }
]

const EnterpriseTrust = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} id="enterprise-trust" className="relative overflow-hidden border-b border-white/5 bg-[#020205] py-16 text-white md:py-20">
      <div className="pointer-events-none absolute inset-0 subtle-ai-grid opacity-20" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.35em] text-purple-400">Enterprise-ready deployment</p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Software that works with <span className="premium-serif font-normal italic text-[#cdb4ff]">the way you operate.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400">
            AlgoForce is a product company: we deploy proven AI software, connect it to your environment and stay accountable after launch.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_SIGNALS.map((signal, index) => (
            <motion.article
              key={signal.title}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08, duration: 0.55 }}
              className="rounded-[22px] border border-white/5 bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04]"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-600/20 text-lg text-purple-300">
                {signal.icon}
              </div>
              <h3 className="mb-2 text-base font-bold">{signal.title}</h3>
              <p className="text-xs leading-relaxed text-slate-400">{signal.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EnterpriseTrust
