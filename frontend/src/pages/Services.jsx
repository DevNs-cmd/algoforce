import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaBrain, FaBriefcase, FaChartLine } from "react-icons/fa";
import SeoHead from "../components/common/SeoHead";

const services = [
  {
    icon: <FaBriefcase />,
    title: "AI Consulting Retainers",
    description: "Ongoing advisory, architecture, and technology leadership to build and sustain your AI capabilities.",
  },
  {
    icon: <FaBrain />,
    title: "Workflow Automation Systems",
    description: "Custom automations (n8n, Make) to orchestrate processes, eliminate leaks, and multiply team leverage.",
  },
  {
    icon: <FaChartLine />,
    title: "AI Readiness Audit",
    description: "A comprehensive assessment of your business's processes, data readiness, and high-ROI opportunities.",
  },
];

const Services = () => {
  return (
    <main className="min-h-screen bg-[#020205] text-white pt-32 pb-20 selection:bg-purple-500/30">
      <SeoHead path="/services" />
      <article className="mx-auto max-w-6xl px-6">
        <header className="mx-auto mb-20 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="mb-6 text-[12px] font-black uppercase tracking-[0.4em] text-purple-500">
              Enterprise Infrastructure
            </p>
            <h1 className="mb-8 text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Enterprise AI Consulting for Indian Businesses
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-medium leading-8 text-gray-400 md:text-xl">
              AlgoForce AI delivers enterprise AI systems, automation infrastructure, and digital transformation for serious builders and scale-ups across India.
            </p>
          </motion.div>
        </header>

        <section className="mb-20 grid gap-5 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-8"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                {service.icon}
              </div>
              <h2 className="mb-4 text-2xl font-black">{service.title}</h2>
              <p className="leading-7 text-gray-400">{service.description}</p>
            </motion.article>
          ))}
        </section>

        <section className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center md:p-12">
          <h2 className="mb-5 text-3xl font-black tracking-tight md:text-4xl">
            Start with a free AI Readiness Audit
          </h2>
          <p className="mx-auto mb-8 max-w-2xl leading-7 text-gray-400">
            Identify process leaks, evaluate model feasibility, and structure a high-impact automation plan with our engineers.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-transform hover:scale-105"
            >
              Book Audit
            </Link>
            <Link
              to="/pricing"
              className="rounded-full border border-white/10 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-white/5"
            >
              View Pricing
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
};

export default Services;
