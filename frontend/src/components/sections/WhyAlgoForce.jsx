import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaTimes, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const WhyAlgoForce = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const comparisons = [
    {
      category: "Intelligence",
      traditional: "Static reports and manual work",
      services: "Human consultants with limited time",
      algoforce: "AI Systems that learn and grow daily",
    },
    {
      category: "Speed",
      traditional: "Weeks for a simple website",
      services: "Months for custom automation",
      algoforce: "Rapid deployment in 7-14 days",
    },
    {
      category: "Scale",
      traditional: "Hiring more staff to grow",
      services: "High hourly rates and bloat",
      algoforce: "Infinite scale via AI automation",
    },
    {
      category: "Data Retention",
      traditional: "Scattered emails and docs",
      services: "Knowledge lost when people leave",
      algoforce: "Centralized Business Intelligence",
    },
    {
      category: "Support",
      traditional: "9-5 availability only",
      services: "Slow tickets and email chains",
      algoforce: "24/7 AI Support and Chatbots",
    },
    {
      category: "Pricing",
      traditional: "Hidden fees and high costs",
      services: "Expensive monthly retainers",
      algoforce: "Affordable, transparent global pricing",
    },
  ];

  const differentiators = [
    {
      title: "Automation Moat",
      description:
        "The more tasks you automate with us, the higher your profit margins. Competitors will still be hiring while you'll be scaling.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          fill="none"
          className="w-8 h-8 text-indigo-600"
        >
          <path
            d="M32 2C17 2 4 15 4 30c0 15 13 28 28 28s28-13 28-28C60 15 47 2 32 2z"
            stroke="currentColor"
            strokeWidth="3"
          />
          <circle cx="32" cy="30" r="6" fill="currentColor" />
          <path
            d="M32 24v-8M32 36v8M26 30h-8M38 30h8M27 27l-5-5M41 27l5-5M27 33l-5 5M41 33l5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "High-Speed Delivery",
      description:
        "We value your time. Our internal AI tools allow us to build premium websites and automated systems in half the usual time.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          fill="none"
          className="w-8 h-8 text-indigo-600"
        >
          <rect x="10" y="24" width="44" height="30" stroke="currentColor" strokeWidth="3" rx="2" />
          <rect x="20" y="14" width="8" height="10" fill="currentColor" />
          <rect x="36" y="14" width="8" height="10" fill="currentColor" />
          <path d="M10 24h44M10 34h44M10 44h44" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: "India-First Pricing",
      description:
        "We offer world-class AI solutions at prices that make sense for the Indian market. No dollar-indexed pricing, just local value.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          fill="none"
          className="w-8 h-8 text-indigo-600"
        >
          <path
            d="M10 50L24 38L38 28L54 14"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10" cy="50" r="3" fill="currentColor" />
          <circle cx="24" cy="38" r="3" fill="currentColor" />
          <circle cx="38" cy="28" r="3" fill="currentColor" />
          <circle cx="54" cy="14" r="3" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="why-algoforce"
      className="py-24 bg-gradient-to-b from-[#05050F]/5 to-white"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6">
              Why <span className="gradient-text">AlgoForce Agency</span>?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Not just another agency. Not another one-off freelancer.
              A category-defining AI partner for your business.
            </p>
          </div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16"
          >
            {/* Table Header (desktop only) */}
            <div className="hidden md:grid md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-navy-900 to-purple-900 text-white">
              <div></div>
              <div className="font-semibold text-lg text-center">
                Traditional Agency
              </div>
              <div className="font-semibold text-lg text-center">Software Alone</div>
              <div className="font-semibold text-lg text-center bg-white/10 rounded-lg py-2 backdrop-blur-sm">
                AlgoForce⭐
              </div>
            </div>

            {/* Table Rows */}
            {comparisons.map((comparison, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={`grid grid-cols-1 md:grid-cols-4 gap-4 p-5 md:p-6 
rounded-2xl md:rounded-none 
border border-gray-200 md:border-b md:border-x-0 
mb-4 md:mb-0
${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                {/* Category */}
                <div className="font-semibold text-navy-900">
                  {comparison.category}
                </div>

                {/* Traditional */}
                <div className="text-gray-600 text-sm md:text-sm text-[15px] leading-relaxed flex items-start gap-2">
                  <span className="md:hidden font-semibold text-navy-900">
                    Traditional Agency
                  </span>
                  <FaTimes className="text-red-500 flex-shrink-0 mt-1" />
                  <span>{comparison.traditional}</span>
                </div>

                {/* Services */}
                <div className="text-gray-600 text-sm md:text-sm text-[15px] leading-relaxed flex items-start gap-2">
                  <span className="md:hidden font-semibold text-navy-900">
                    Software Alone
                  </span>
                  <FaTimes className="text-red-500 flex-shrink-0 mt-1" />
                  <span>{comparison.services}</span>
                </div>

                {/* AlgoForce */}
                <div
                  className="text-gray-900 text-[15px] md:text-sm font-semibold 
flex items-start gap-2 
bg-purple-50 rounded-xl 
px-4 py-3"
                >
                  <span className="md:hidden font-semibold text-purple-700">
                    AlgoForce ⭐
                  </span>
                  <FaCheck className="text-green-600 flex-shrink-0 mt-1" />
                  <span>{comparison.algoforce}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Differentiators */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-4xl font-bold text-center text-navy-900 mb-12">
              The Three pillars of our Agency
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {differentiators.map((diff, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.6, delay: 1 + index * 0.15 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-purple-100"
                >
                  <div className="text-6xl mb-6">{diff.icon}</div>
                  <h4 className="text-2xl font-bold text-navy-900 mb-4">
                    {diff.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {diff.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom Statement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-16 glass-dark rounded-3xl p-12 text-center text-white"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              "Competitive Pricing. Realistic Solutions.
              <br />
              Attractive results for modern businesses."
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto">
              We focus on low entry prices, powerful combos, and recurring retainers
              to ensure your business grows without breaking the bank.
            </p>
            <Link to="/pricing">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-navy-900 rounded-lg font-semibold text-lg hover:shadow-xl transition-all"
              >
                View Pricing Packs
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyAlgoForce;
