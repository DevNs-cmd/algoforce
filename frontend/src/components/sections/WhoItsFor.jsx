import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaRocket, FaBuilding, FaUserTie, FaMicrochip } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const WhoItsFor = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const segments = [
    {
      icon: <FaRocket />,
      title: 'Startups & Founders',
      desc: 'Deploying AI software through Crucible to rapidly validate ideas, launch MVPs, and scale startup operations.',
      color: 'bg-purple-600/20 text-purple-400'
    },
    {
      icon: <FaBuilding />,
      title: 'SMEs & Mid-Market',
      desc: 'Subscribing to ready-to-use AI software products (TallyGPT, LeadBolt, GST Autopilot) to automate core business functions and eliminate manual spreadsheets.',
      color: 'bg-blue-600/10 text-blue-400'
    },
    {
      icon: <FaUserTie />,
      title: 'Enterprises & Corporates',
      desc: 'Deploying secure, self-hosted AI software products that preserve organizational knowledge and scale business operations.',
      color: 'bg-green-600/10 text-green-400'
    },
    {
      icon: <FaMicrochip />,
      title: 'Strategic Tech Partners',
      desc: 'Expanding business capabilities through product licensing, configured software products, and ongoing customer success programs.',
      color: 'bg-cyan-600/10 text-cyan-400'
    }
  ]

  return (
    <section id="who" className="py-14 md:py-20 bg-[#05050F] text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-[12px] font-bold uppercase tracking-[0.5em] text-gray-500 mb-6">Target Segments</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
            AI Software for <span className="text-purple-500">Every Scale.</span>
          </h3>
          <p className="max-w-xl mx-auto text-gray-400 font-normal text-sm md:text-base">
            We offer ready-to-use AI software products that fit seamlessly into businesses of any size, from startups to large scale enterprises.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {segments.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1 }}
              className="p-7 md:p-8 rounded-[24px] bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center text-xl mb-8 group-hover:scale-110 transition-transform`}>
                  {s.icon}
                </div>
                <h4 className="text-xl font-bold mb-4">{s.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-normal mb-8">{s.desc}</p>
              </div>
              <div className="h-px w-10 bg-gray-800" />
            </motion.div>
          ))}
        </div>

        {/* Final Statement Block */}
        <div className="relative z-10 mt-10 md:mt-14 p-7 md:p-12 selection:bg-purple-500/30 rounded-[28px] bg-white text-black text-center">
          <h4 className="text-2xl md:text-3xl font-bold mb-5 leading-tight">Find Your AI Software.</h4>
          <p className="text-gray-600 text-sm md:text-base mb-8 max-w-xl mx-auto font-normal">
            Request a Business Assessment to find the right ready-to-use AI software products for your operations, and start your product implementation and monthly subscription.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <button className="px-8 py-4 bg-black text-white hover:bg-gray-900 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">
                Book Business Assessment
              </button>
            </Link>
            <Link to="/products">
              <button className="px-8 py-4 bg-gray-100 text-black border border-gray-200 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white transition-all">
                Explore Products
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoItsFor
