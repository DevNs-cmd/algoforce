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
      title: 'Ecosystem Advantage',
      desc: 'Unlike a normal agency, AlgoForce connects services, training, founders, SaaS, and venture upside in one growth loop.',
      icon: <FaCogs />
    },
    {
      title: 'Talent Factory',
      desc: 'Labs creates an internal pipeline of trained builders, lowering delivery friction and improving quality over time.',
      icon: <FaUsers />
    },
    {
      title: 'Founder Network',
      desc: 'Crucible compounds brand, community, deal flow, hackathon talent, and startup partnerships.',
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
              Why the Model <br /> <span className="text-gray-300">Compounds.</span>
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
              <div>Single Business</div>
              <div className="text-purple-400">AlgoForce Ecosystem</div>
            </div>
            {[
              { factor: 'Revenue', trad: 'One stream', af: '10+ streams' },
              { factor: 'Talent', trad: 'External hiring', af: 'Labs pipeline' },
              { factor: 'Community', trad: 'Audience only', af: 'Crucible network' },
              { factor: 'Scale Path', trad: 'Services only', af: 'Services + SaaS + Venture' }
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
              <h4 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">Ready to Enter the Ecosystem?</h4>
              <p className="text-gray-400 font-medium mb-12 max-w-xl mx-auto">
                Book a strategy call for services, join Labs, or move into Crucible if you are building a startup.
              </p>
              <Link to="/contact">
                <button className="px-12 py-6 bg-white text-black rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">Start the Conversation</button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyAlgoForce;
