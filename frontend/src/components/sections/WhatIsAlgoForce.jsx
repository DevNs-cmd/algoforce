import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaDollarSign, 
  FaChartLine, 
  FaUsers, 
  FaIndustry, 
  FaHotel, 
  FaTasks, 
  FaBrain, 
  FaChartBar
} from 'react-icons/fa'

const WhatIsAlgoForce = ({ setActiveCategory }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.08
  })

  const categories = [
    { id: 'finance', name: 'Finance', icon: <FaDollarSign /> },
    { id: 'sales', name: 'Sales', icon: <FaChartLine /> },
    { id: 'hr', name: 'HR', icon: <FaUsers /> },
    { id: 'manufacturing', name: 'Manufacturing', icon: <FaIndustry /> },
    { id: 'hospitality', name: 'Hospitality', icon: <FaHotel /> },
    { id: 'operations', name: 'Operations', icon: <FaTasks /> },
    { id: 'knowledge', name: 'Knowledge', icon: <FaBrain /> },
    { id: 'analytics', name: 'Analytics', icon: <FaChartBar /> }
  ]

  const handleSelectCategory = (categoryId) => {
    if (setActiveCategory) {
      setActiveCategory(categoryId)
    }
    const target = document.getElementById('products')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section ref={ref} id="product-categories" className="py-14 md:py-20 bg-white text-black overflow-hidden relative border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-4">Browse by business function</h2>
            <h3 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">
              Find the software built for <span className="premium-serif italic font-normal text-purple-600">your team.</span>
            </h3>
            <p className="max-w-2xl mx-auto mb-10 text-sm md:text-base leading-relaxed text-gray-500">
              Start with the function you want to improve. We will show the product designed for that operational workflow.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
              {categories.map((cat, idx) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelectCategory(cat.id)}
                  className="flex flex-col items-center gap-3 p-4 sm:p-5 rounded-[20px] bg-gray-50 hover:bg-gray-100/80 border border-gray-100 transition-all w-24 sm:w-28 shadow-sm group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-base sm:text-lg group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-bold text-gray-700 tracking-tight">{cat.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhatIsAlgoForce
