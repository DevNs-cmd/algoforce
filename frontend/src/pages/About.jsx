import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { FaEye, FaRocket, FaShieldAlt, FaHandshake, FaArrowRight, FaUsers } from "react-icons/fa"
import SeoHead from "../components/common/SeoHead"

const About = () => {
  const standards = [
    {
      icon: <FaShieldAlt />,
      title: "Private Cloud Security",
      description: "Deployments inside client private VPCs (AWS/Azure) so proprietary data never leaves your infrastructure."
    },
    {
      icon: <FaRocket />,
      title: "Implementation Model",
      description: "Fast-track 2-4 week product configurations and direct database integrations (Tally/SAP/CRM)."
    },
    {
      icon: <FaHandshake />,
      title: "Customer Success",
      description: "Dedicated account managers handle monthly performance tuning, model updates, and expansions."
    }
  ]

  return (
    <main className="min-h-screen bg-[#020205] text-white pt-32 pb-20 selection:bg-purple-500/30">
      <SeoHead path="/about" />
      <article className="mx-auto max-w-6xl px-6">
        
        {/* Header */}
        <header className="mx-auto mb-20 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="mb-6 text-[12px] font-black uppercase tracking-[0.4em] text-purple-500">
              Company Profile
            </p>
            <h1 className="mb-8 text-5xl font-black leading-tight tracking-tight md:text-7xl">
              AI Software Company
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-medium leading-8 text-gray-400 md:text-xl">
              We build specialized AI products that integrate with existing business systems and automate operations.
            </p>
          </motion.div>
        </header>

        {/* Mission and Vision */}
        <section className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="p-8 rounded-[28px] bg-white/[0.02] border border-white/5 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
                <FaRocket />
              </div>
              <h2 className="text-2xl font-black mb-4">Mission</h2>
              <p className="text-gray-400 text-sm leading-relaxed font-normal">
                Automate business operations by deploying secure, pre-built, reliable AI products that integrate with existing software systems.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="p-8 rounded-[28px] bg-white/[0.02] border border-white/5 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
                <FaEye />
              </div>
              <h2 className="text-2xl font-black mb-4">Vision</h2>
              <p className="text-gray-400 text-sm leading-relaxed font-normal">
                AI software products that automate business operations, helping companies eliminate manual work.
              </p>
            </div>
          </motion.div>
        </section>
 
        {/* What We Build & How We Work */}
        <section className="mb-20 p-8 md:p-12 rounded-[30px] bg-white/[0.01] border border-white/5">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black mb-6">What we build & How we work</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-normal">
              We build and deploy business software powered by AI. Rather than billing by the hour or writing custom code from scratch, we offer ready-to-use software products configured for Tally, SAP, CRM, and other existing systems.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed font-normal">
              Every client engagement begins with a Business Assessment to understand your operations. Once matched, we deploy the software and support it on a monthly subscription.
            </p>
          </div>
        </section>

        {/* Methodology & Enterprise Standards */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black">Deployment Standards</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {standards.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 hover:border-purple-500/20 transition-colors"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                  {item.icon}
                </div>
                <h3 className="mb-4 text-xl font-bold">{item.title}</h3>
                <p className="leading-relaxed text-xs text-gray-400 font-normal">{item.description}</p>
              </motion.article>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 max-w-4xl mx-auto">
            <div>
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block">Formal Registry</span>
              <span className="text-sm font-bold text-white block mt-1">MSME Registered: UDYAM-DL-08-0122150</span>
            </div>
            <div className="h-px w-8 bg-white/10 sm:hidden" />
            <div className="text-slate-400 text-xs font-semibold">
              Operating in compliance with Indian standards for software entities.
            </div>
          </div>
        </section>

        {/* Leadership & Team */}
        <section className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center md:p-12">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl mx-auto mb-6">
            <FaUsers />
          </div>
          <h2 className="mb-5 text-3xl font-black tracking-tight md:text-4xl">
            Founder & Leadership
          </h2>
          <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-sm text-gray-400 font-normal">
            AlgoForce is led by Dev N Suman (Founder & CEO) in New Delhi, India, supported by our ecosystem contributors in engineering, operations, and product implementation.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/founder"
              className="rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-black transition-transform hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              Meet Our Founder <FaArrowRight size={10} />
            </Link>
            <Link
              to="/team"
              className="rounded-full border border-white/10 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/5 inline-flex items-center justify-center gap-2"
            >
              Meet Our Team
            </Link>
          </div>
        </section>

      </article>
    </main>
  );
};

export default About;
