import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaChevronDown } from 'react-icons/fa'
import { SITE_FAQS } from '../../data/siteFaqs'

const EnterpriseFaq = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05
  })

  const [activeIndex, setActiveIndex] = useState(null)

  const toggleIndex = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx)
  }

  return (
    <section ref={ref} id="faq" className="py-16 md:py-24 bg-white text-black relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-4">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Frequently Asked <span className="premium-serif italic font-normal text-purple-600">Questions</span>
          </h2>
          <p className="max-w-xl mx-auto text-gray-500 font-normal text-sm md:text-base mt-4">
            Everything you need to know about choosing, deploying and supporting AlgoForce software.
          </p>
        </motion.div>

        <div className="space-y-4">
          {SITE_FAQS.map((faq, idx) => {
            const isOpen = activeIndex === idx
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.03 }}
                className="border-b border-gray-100 pb-4"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full flex items-center justify-between text-left py-4 focus:outline-none group"
                >
                  <span className="font-bold text-base md:text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
                    {faq.question}
                  </span>
                  <span className={`text-purple-600 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ml-4 flex-shrink-0`}>
                    <FaChevronDown size={14} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-500 text-sm md:text-base leading-relaxed pb-4 pt-1 font-normal">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default EnterpriseFaq
