import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHeartbeat, FaLayerGroup, FaMoneyBillWave } from "react-icons/fa";
import SeoHead from "../components/common/SeoHead";

const pillars = [
  {
    icon: <FaLayerGroup />,
    title: "Workspace Tools",
    description: "Align your team on active sprints, map OKRs, and build out your product roadmap with structural speed.",
  },
  {
    icon: <FaHeartbeat />,
    title: "Venture Health Score",
    description: "Get real-time feedback on your metrics, compliance, and product milestones to see if you are Series A ready.",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Fundraising CRM",
    description: "Track VC pipelines, manage your investor data room, and build relationships that lead to success.",
  },
];

const Crucible = () => {
  return (
    <main className="min-h-screen bg-[#020205] text-white pt-32 pb-20 selection:bg-purple-500/30">
      <SeoHead path="/crucible" />
      <article className="mx-auto max-w-6xl px-6">
        <header className="mx-auto mb-20 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="mb-6 text-[12px] font-black uppercase tracking-[0.4em] text-purple-500">
              Crucible OS
            </p>
            <h1 className="mb-8 text-5xl font-black leading-tight tracking-tight md:text-7xl">
              The Operating System for Indian Startups
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-medium leading-8 text-gray-400 md:text-xl">
              CRUCIBLE is the execution infrastructure that helps founders move from idea validation through seed stages to Series A readiness.
            </p>
          </motion.div>
        </header>

        <section className="mb-20 grid gap-5 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-8"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                {pillar.icon}
              </div>
              <h2 className="mb-4 text-2xl font-black">{pillar.title}</h2>
              <p className="leading-7 text-gray-400">{pillar.description}</p>
            </motion.article>
          ))}
        </section>

        <section className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center md:p-12">
          <h2 className="mb-5 text-3xl font-black tracking-tight md:text-4xl">
            Choose your subscription tier
          </h2>
          <p className="mx-auto mb-8 max-w-2xl leading-7 text-gray-400">
            Get access to Crucible OS workspace tools, metrics auditing, and fundraising CRM. Tiers from ₹2,999 to ₹24,999/month.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-transform hover:scale-105"
            >
              Start Free Trial
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
};

export default Crucible;
