import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  FaCogs, 
  FaRegCalendarAlt, 
  FaLink, 
  FaLock, 
  FaArrowUp, 
  FaBriefcase,
  FaCheckCircle
} from "react-icons/fa";
import { Link } from "react-router-dom";

const WhyAlgoForce = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const advantages = [
    {
      title: 'Ready-to-use software',
      desc: 'Deploy pre-built software immediately without starting from scratch.',
      icon: <FaCogs />
    },
    {
      title: 'Fast deployment',
      desc: 'Get up and running in 2 to 4 weeks with our configured software products.',
      icon: <FaRegCalendarAlt />
    },
    {
      title: 'Works with existing software',
      desc: 'Connects directly with Tally, SAP, Zoho, Salesforce, WhatsApp, and other tools you use.',
      icon: <FaLink />
    },
    {
      title: 'Secure deployment',
      desc: 'Runs securely in your own cloud account or on-premises to protect your data.',
      icon: <FaLock />
    },
    {
      title: 'Monthly updates',
      desc: 'Receive continuous improvements, new features, and model updates automatically.',
      icon: <FaArrowUp />
    },
    {
      title: 'Dedicated support',
      desc: 'Get ongoing maintenance and direct support to keep your software running smoothly.',
      icon: <FaBriefcase />
    }
  ];

  return (
    <section ref={ref} id="why" className="py-14 md:py-20 bg-white text-black relative border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-16 px-2">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-6">Why AlgoForce</h2>
            <h3 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
              Why businesses <span className="premium-serif italic font-normal text-purple-600">choose AlgoForce.</span>
            </h3>
          </div>

          {/* Core Advantages - Grid of 6 */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 max-w-6xl mx-auto">
            {advantages.map((adv, i) => (
              <div key={i} className="p-6 md:p-8 rounded-[24px] bg-gray-50 border border-gray-100 hover:shadow-lg hover:shadow-purple-500/5 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 mb-6 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  {adv.icon}
                </div>
                <h4 className="text-lg font-bold mb-3">{adv.title}</h4>
                <p className="text-gray-500 text-xs font-normal leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>

          {/* Comparison Summary Table */}
          <div className="rounded-[28px] bg-gray-50 border border-gray-100 overflow-hidden shadow-sm max-w-5xl mx-auto mb-14">
            <div className="grid grid-cols-3 bg-black text-white p-6 font-bold uppercase text-[10px] sm:text-[11px] tracking-widest text-center">
              <div className="text-left">Factor</div>
              <div>Custom Software Development</div>
              <div className="text-purple-400 font-bold">AlgoForce Software</div>
            </div>
            {[
              { factor: 'Delivery Model', trad: 'Custom code from scratch', af: 'Ready-to-use software products' },
              { factor: 'Financial Model', trad: 'Unpredictable hourly bills', af: 'Simple monthly subscription' },
              { factor: 'Data Security', trad: 'Public shared APIs', af: 'Private secure deployment' },
              { factor: 'Updates', trad: 'Pay extra for maintenance', af: 'Ongoing support and updates included' }
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-3 gap-3 p-4 sm:p-5 border-t border-gray-100 text-xs font-bold items-center text-center ${i % 2 === 0 ? 'bg-white' : ''}`}>
                <div className="text-left text-gray-400 uppercase tracking-widest text-[9px]">{row.factor}</div>
                <div className="text-red-500 opacity-60 line-through decoration-black decoration-2">{row.trad}</div>
                <div className="text-purple-600 font-bold flex items-center justify-center gap-1.5">
                  <FaCheckCircle className="text-[10px] flex-shrink-0" /> {row.af}
                </div>
              </div>
            ))}
          </div>

          {/* Final Call to Action */}
          <div className="mt-10 p-7 md:p-10 rounded-[28px] bg-[#05050F] text-white text-center relative overflow-hidden group max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between text-left gap-8">
              <div className="max-w-xl">
                <h4 className="text-2xl font-bold mb-3 leading-tight">Book a Business Assessment.</h4>
                <p className="text-gray-400 text-xs font-normal">
                  Our product team will audit your workflows and recommend the right specialized AI products before any implementation setup or subscription.
                </p>
              </div>
              <Link to="/contact" className="w-full md:w-auto flex-shrink-0">
                <button className="w-full md:w-auto px-8 py-4 bg-white text-black rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                  Book Assessment
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
