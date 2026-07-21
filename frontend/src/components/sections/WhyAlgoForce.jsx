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

const WhyAlgoForce = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const advantages = [
    {
      title: 'Less repetitive work',
      desc: 'Move routine financial, sales, support and operational tasks out of your team’s manual queue.',
      icon: <FaCogs />
    },
    {
      title: 'Faster time to value',
      desc: 'Adopt a proven product and a defined deployment plan instead of funding a project from scratch.',
      icon: <FaRegCalendarAlt />
    },
    {
      title: 'More from existing systems',
      desc: 'Turn the ERP, CRM, documents and data you already maintain into automated business workflows.',
      icon: <FaLink />
    },
    {
      title: 'Lower operating risk',
      desc: 'Build guardrails into the workflow with a deployment model designed around your business data.',
      icon: <FaLock />
    },
    {
      title: 'Continuous improvement',
      desc: 'Keep improving the product after go-live instead of letting the workflow fall behind your operation.',
      icon: <FaArrowUp />
    },
    {
      title: 'Accountable support',
      desc: 'Work with a product team that stays responsible for adoption, maintenance and the next improvement.',
      icon: <FaBriefcase />
    }
  ];

  return (
    <section ref={ref} id="roi" className="py-14 md:py-20 bg-white text-black relative border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-16 px-2">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-6">Business value</h2>
            <h3 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
              Build the case for <span className="premium-serif italic font-normal text-purple-600">operational ROI.</span>
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
              <div>Traditional project model</div>
              <div className="text-purple-400 font-bold">AlgoForce product model</div>
            </div>
            {[
              { factor: 'Time to value', trad: 'Start with a blank build', af: 'Deploy a proven product around your workflow' },
              { factor: 'Cost control', trad: 'Variable project scope and change requests', af: 'A defined deployment and ongoing support model' },
              { factor: 'Team capacity', trad: 'Manual work remains with the team', af: 'Automate repeatable operational work' },
              { factor: 'Improvement', trad: 'Maintenance becomes a separate project', af: 'Product updates and support continue after launch' }
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

        </motion.div>
      </div>
    </section>
  );
};

export default WhyAlgoForce;
