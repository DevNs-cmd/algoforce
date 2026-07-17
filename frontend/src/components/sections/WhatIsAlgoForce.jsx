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
  FaChartBar,
  FaArrowRight 
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

  const assistanceItems = [
    { title: 'Reduce manual work', category: 'operations', icon: <FaTasks /> },
    { title: 'Automate repetitive tasks', category: 'operations', icon: <FaTasks /> },
    { title: 'Improve sales response', category: 'sales', icon: <FaChartLine /> },
    { title: 'Manage inventory', category: 'operations', icon: <FaTasks /> },
    { title: 'Speed up accounting', category: 'finance', icon: <FaDollarSign /> },
    { title: 'Automate customer support', category: 'hospitality', icon: <FaHotel /> },
    { title: 'Improve manufacturing quality', category: 'manufacturing', icon: <FaIndustry /> },
    { title: 'Organize company knowledge', category: 'knowledge', icon: <FaBrain /> }
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
    <section ref={ref} id="categories" className="py-14 md:py-20 bg-white text-black overflow-hidden relative border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Second Section: Categories Selector */}
          <div className="text-center mb-16">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-6">Browse by Function</h2>
            
            {/* Horizontal Icons list (Google-style) */}
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
 
          <hr className="border-gray-100 my-10 max-w-6xl mx-auto" />
 
          {/* Third Section: What can AlgoForce help you with? */}
          <div className="mt-12">
            <div className="text-center mb-10">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-4">Problems We Solve</h2>
              <h3 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                What problems do we solve?
              </h3>
            </div>
 
            {/* Assistance Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {assistanceItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  onClick={() => handleSelectCategory(item.category)}
                  className="p-6 rounded-[22px] bg-gray-50 border border-gray-100 hover:border-purple-500/30 hover:bg-white hover:shadow-xl hover:shadow-purple-500/5 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-base shrink-0 mt-0.5 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-6 text-[10px] font-bold uppercase tracking-wider text-purple-600 opacity-80 group-hover:opacity-100 transition-opacity">
                    View AI Product <FaArrowRight size={8} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}

export default WhatIsAlgoForce
