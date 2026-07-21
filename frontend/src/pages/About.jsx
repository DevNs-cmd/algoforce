import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { FaEye, FaRocket, FaShieldAlt, FaHandshake, FaArrowRight, FaUsers, FaCheckCircle, FaBuilding } from "react-icons/fa"
import SeoHead from "../components/common/SeoHead"

const About = () => {
  const standards = [
    {
      icon: <FaShieldAlt className="text-indigo-600 text-xl" />,
      title: "Private Cloud Security",
      description: "Deployments inside client private VPCs (AWS/Azure) so proprietary business data never leaves your infrastructure."
    },
    {
      icon: <FaRocket className="text-purple-600 text-xl" />,
      title: "Implementation Model",
      description: "Fast-track 2-4 week product configurations and direct database integrations (Tally, SAP, and custom CRMs)."
    },
    {
      icon: <FaHandshake className="text-blue-600 text-xl" />,
      title: "Customer Success",
      description: "Dedicated account managers handle monthly performance tuning, model updates, and seamless operational expansions."
    }
  ]

  const workflowSteps = [
    { num: "01", title: "Product Demo", desc: "Interactive walkthrough tailored to your existing software stack." },
    { num: "02", title: "Business Assessment", desc: "Technical discovery to identify high-impact automation targets." },
    { num: "03", title: "VPC Deployment", desc: "Fast-track 2-4 week deployment directly into your secure infrastructure." },
    { num: "04", title: "Ongoing Support", desc: "Monthly subscription model with continuous performance tuning and expansion." }
  ]

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#06101d] pt-28 pb-24 selection:bg-purple-500/20">
      <SeoHead path="/about" />
      
      <article className="mx-auto max-w-7xl px-5 sm:px-6">
        
        {/* Header Hero Section */}
        <header className="mx-auto mb-20 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-700 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-indigo-600" /> Company Profile
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-[#06101d] sm:text-6xl md:text-7xl">
              Enterprise AI Software Company
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg md:text-xl">
              We build specialized AI products that integrate directly with existing business systems to automate daily operations.
            </p>
          </motion.div>
        </header>

        {/* Mission & Vision Grid */}
        <section className="mb-20 grid gap-8 md:grid-cols-2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group flex flex-col justify-between rounded-[32px] border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:shadow-xl"
          >
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-transform duration-300 group-hover:scale-110">
                <FaRocket className="text-xl" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">Our Core Focus</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#06101d] sm:text-3xl">Mission</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                Automate business operations by deploying secure, pre-built, reliable AI products that integrate seamlessly with existing enterprise software systems.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-indigo-600">
              <FaCheckCircle /> Secure Private Deployment
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group flex flex-col justify-between rounded-[32px] border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-xl"
          >
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 transition-transform duration-300 group-hover:scale-110">
                <FaEye className="text-xl" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600">Future Outlook</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#06101d] sm:text-3xl">Vision</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                AI software products that systematically automate business operations, helping growth-driven organizations eliminate repetitive manual workloads.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-purple-600">
              <FaCheckCircle /> Zero Custom Code Overhead
            </div>
          </motion.div>
        </section>

        {/* What We Build & How We Work */}
        <section className="mb-20 overflow-hidden rounded-[36px] border border-slate-200/90 bg-white p-8 sm:p-12 md:p-16 shadow-sm">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600">Operational Methodology</span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#06101d] sm:text-4xl">What we build & How we work</h2>
              <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                We build and deploy business software powered by AI. Rather than billing by the hour or writing custom code from scratch, we offer ready-to-use software products configured for Tally, SAP, CRM, and other existing systems.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                Every client journey begins with a product demo. When there is a fit, we run discovery and a business assessment before deploying and supporting the software on a monthly subscription.
              </p>
            </div>

            {/* Workflow Step Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {workflowSteps.map((step) => (
                <div key={step.num} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 transition-all duration-300 hover:border-indigo-200 hover:bg-white hover:shadow-md">
                  <span className="font-mono text-xs font-bold text-indigo-600">{step.num}</span>
                  <h3 className="mt-2 text-base font-bold text-[#06101d]">{step.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology & Enterprise Standards */}
        <section className="mb-20">
          <div className="mb-12 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600">Enterprise Readiness</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#06101d] sm:text-4xl">Deployment Standards</h2>
          </div>
          
          <div className="mb-10 grid gap-6 md:grid-cols-3">
            {standards.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="group rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:shadow-xl"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#06101d]">{item.title}</h3>
                <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">{item.description}</p>
              </motion.article>
            ))}
          </div>

          {/* Formal Registry Card */}
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:flex-row text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <FaBuilding />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-indigo-600">Formal Registry</span>
                <span className="block text-sm font-bold text-[#06101d]">MSME Registered: UDYAM-DL-08-0122150</span>
              </div>
            </div>
            <div className="text-xs font-semibold text-slate-500">
              Operating in compliance with Indian standards for software entities.
            </div>
          </div>
        </section>

        {/* Leadership & Team Section */}
        <section className="mx-auto max-w-4xl rounded-[36px] border border-slate-200/90 bg-white p-8 text-center shadow-sm sm:p-12 md:p-16">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 text-2xl">
            <FaUsers />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-600">Company Leadership</span>
          <h2 className="mt-2 mb-4 text-3xl font-extrabold tracking-tight text-[#06101d] sm:text-4xl">
            Founder & Leadership
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            AlgoForce is led by Dev N Suman (Founder & CEO) in New Delhi, India, supported by our ecosystem contributors in engineering, operations, and product implementation.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/founder"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#06101d] px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-colors hover:bg-slate-800"
            >
              Meet Our Founder <FaArrowRight size={12} />
            </Link>
            <Link
              to="/team"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#06101d] transition-colors hover:bg-slate-50"
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
