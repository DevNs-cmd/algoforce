import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCheckCircle, FaUsers, FaCogs, FaRocket } from "react-icons/fa";
import { Link } from "react-router-dom";

const WhyAlgoForce = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const advantages = [
    {
      title: 'Built by Engineers',
      desc: 'We are tech-first. Every project is handled by specialists who understand architecture and scalability.',
      icon: <FaCogs />
    },
    {
      title: 'Founders First',
      desc: 'We optimize for your burn rate and speed. We focus on getting you to the next milestone faster.',
      icon: <FaUsers />
    },
    {
      title: 'Global Delivery',
      desc: 'Leveraging global talent to deliver enterprise-grade software at startup-friendly price points.',
      icon: <FaRocket />
    }
  ]

  return (
    <section id="why" className="py-16 md:py-24 bg-white text-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-10 md:mb-16 px-2">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-6">Advantage</h2>
            <h3 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
              Why Founders <br /> <span className="text-gray-300">Choose the Studio.</span>
            </h3>
          </div>

          {/* Core Advantages */}
          <div className="grid md:grid-cols-3 gap-12 mb-12 md:mb-20">
            {advantages.map((adv, i) => (
              <div key={i} className="group">
                <div className="text-3xl text-purple-600 mb-8 flex justify-center group-hover:scale-125 transition-transform">{adv.icon}</div>
                <h4 className="text-2xl font-black mb-4 text-center">{adv.title}</h4>
                <p className="text-gray-500 font-medium leading-relaxed text-center">{adv.desc}</p>
              </div>
            ))}
          </div>

          {/* Comparison Table (Simplified & White) */}
          <div className="rounded-[3rem] bg-gray-50 border border-gray-100 overflow-hidden shadow-sm">
            <div className="grid md:grid-cols-3 bg-black text-white p-8 font-bold uppercase text-[12px] tracking-widest text-center">
              <div className="text-left">Factor</div>
              <div>Traditional Agency</div>
              <div className="text-purple-400">AlgoForce Studio</div>
            </div>
            {[
              { factor: 'Launch Speed', trad: '3-6 Months', af: '2-4 Weeks' },
              { factor: 'Ownership', trad: 'Mixed/Limited', af: '100% IP' },
              { factor: 'Intelligence', trad: 'Static Software', af: 'AI Integrated' },
              { factor: 'Support', trad: 'Ticket Based', af: 'Dedicated Pulse' }
            ].map((row, i) => (
              <div key={i} className={`grid md:grid-cols-3 p-8 border-t border-gray-100 text-sm font-bold items-center text-center ${i % 2 === 0 ? 'bg-white' : ''}`}>
                <div className="text-left text-gray-400 uppercase tracking-widest text-[12px]">{row.factor}</div>
                <div className="text-red-400 opacity-60 line-through decoration-black decoration-2">{row.trad}</div>
                <div className="text-purple-600 font-bold flex items-center justify-center gap-2">
                  <FaCheckCircle className="text-xs" /> {row.af}
                </div>
              </div>
            ))}
          </div>

          {/* Final Call to Action in White Section */}
          <div className="mt-12 md:mt-20 p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] bg-[#05050F] text-white text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <h4 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">Ready to Deploy Your Vision?</h4>
              <p className="text-gray-400 font-medium mb-12 max-w-xl mx-auto">
                Join the ambitious founders who have secured their technical mote with AlgoForce.
              </p>
              <Link to="/contact">
                <button className="px-12 py-6 bg-white text-black rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">Initiate Transmission</button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyAlgoForce;
