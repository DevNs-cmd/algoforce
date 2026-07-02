import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCheckCircle, FaUsers, FaCogs, FaDatabase } from "react-icons/fa";
import { Link } from "react-router-dom";

const WhyAlgoForce = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const advantages = [
    {
      title: 'Enterprise AI Strategy',
      desc: 'We don\'t just deliver code; we analyze operational leaks, select optimal models, design secure architectures, and verify ROI.',
      icon: <FaCogs />
    },
    {
      title: 'Talent Sourcing Pool',
      desc: 'Our Talent Development Division (Labs) trains and pipelines engineers, ensuring rapid system updates and continuous deployment.',
      icon: <FaUsers />
    },
    {
      title: 'Proprietary Software Moat',
      desc: 'Our Startup Incubation Platform (Crucible) validates and prototypes MVPs using execution routines, turning ideas into assets.',
      icon: <FaDatabase />
    }
  ]

  return (
    <section ref={ref} id="why" className="py-14 md:py-20 bg-white text-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-10 md:mb-14 px-2">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-6">Advantage</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
              Why Businesses Choose <br /> <span className="premium-serif italic font-normal text-purple-600">AlgoForce AI</span>
            </h3>
          </div>

          {/* Core Advantages */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-10 mb-10 md:mb-14">
            {advantages.map((adv, i) => (
              <div key={i} className="group">
                <div className="text-3xl text-purple-600 mb-6 flex justify-center group-hover:scale-110 transition-transform">{adv.icon}</div>
                <h4 className="text-xl font-bold mb-4 text-center">{adv.title}</h4>
                <p className="text-gray-500 text-sm font-normal leading-relaxed text-center">{adv.desc}</p>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="rounded-[28px] bg-gray-50 border border-gray-100 overflow-hidden shadow-sm">
            <div className="grid md:grid-cols-3 bg-black text-white p-8 font-bold uppercase text-[12px] tracking-widest text-center">
              <div className="text-left">Factor</div>
              <div>Traditional IT Vendor</div>
              <div className="text-purple-400 font-bold">AlgoForce AI Partner</div>
            </div>
            {[
              { factor: 'Core Focus', trad: 'Builds Standard Code', af: 'Delivers Automated Business Outcomes' },
              { factor: 'Deliverable', trad: 'One-time SaaS Setup', af: 'Custom Integrated AI System' },
              { factor: 'Engagement Model', trad: 'Hourly Dev Retainer', af: 'Strategic Systems Implementation' },
              { factor: 'Security & Hosting', trad: 'Generic Public Cloud APIs', af: 'Self-hosted LLMs & Secure Databases' }
            ].map((row, i) => (
              <div key={i} className={`grid md:grid-cols-3 gap-3 p-5 md:p-7 border-t border-gray-100 text-sm font-bold items-center text-center ${i % 2 === 0 ? 'bg-white' : ''}`}>
                <div className="text-left text-gray-400 uppercase tracking-widest text-[12px]">{row.factor}</div>
                <div className="text-red-400 opacity-60 line-through decoration-black decoration-2">{row.trad}</div>
                <div className="text-purple-600 font-bold flex items-center justify-center gap-2">
                  <FaCheckCircle className="text-xs" /> {row.af}
                </div>
              </div>
            ))}
          </div>

          {/* Final Call to Action */}
          <div className="mt-10 md:mt-14 p-7 md:p-12 rounded-[28px] bg-[#05050F] text-white text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between text-left gap-8">
              <div className="max-w-xl">
                <h4 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">Ready to Audit Your Operations?</h4>
                <p className="text-gray-400 text-sm font-normal">
                  Book a free discovery call with a solutions consultant. We will analyze your processes, identify bottlenecks, and map out a custom AI integration strategy.
                </p>
              </div>
              <Link to="/contact" className="w-full md:w-auto">
                <button className="w-full md:w-auto px-10 py-5 bg-white text-black rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                  Book AI Consultation
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyAlgoForce;
