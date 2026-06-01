import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaBrain, FaBriefcase, FaMusic, FaRocket } from "react-icons/fa";
import { defaultKeywords } from "../seoConfig";

const ecosystemUnits = [
  {
    icon: <FaBriefcase />,
    title: "AlgoForce AI",
    description:
      "Enterprise AI, automation, managed AI services, AI product development, and digital transformation for SMEs, scale-ups, and enterprises.",
  },
  {
    icon: <FaRocket />,
    title: "Crucible",
    description:
      "A startup operating system for founders, with venture workspace, sprint tracking, health scoring, MVP support, and fundraising readiness.",
  },
  {
    icon: <FaBrain />,
    title: "AlgoForce Labs",
    description:
      "Talent infrastructure for students, professionals, and corporates through AI, product engineering, growth marketing, and corporate training programs.",
  },
  {
    icon: <FaMusic />,
    title: "Velqora",
    description:
      "An operating system for performers and live entertainment teams, covering artist profiles, bookings, contracts, payments, and event workflows.",
  },
];

const WhatIsAlgoForce = () => {
  return (
    <main className="min-h-screen bg-[#020205] text-white pt-32 pb-20 selection:bg-purple-500/30">
      <Helmet>
        <title>What is AlgoForce AI? | Execution Infrastructure Ecosystem</title>
        <meta
          name="description"
          content="AlgoForce AI is an execution infrastructure ecosystem connecting enterprise AI, Crucible startup OS, AlgoForce Labs talent infrastructure, and Velqora entertainment technology."
        />
        <meta
          name="keywords"
          content={`${defaultKeywords}, what is AlgoForce AI, execution infrastructure ecosystem, Crucible startup OS, Velqora entertainment OS, AlgoForce business model`}
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.algoforceaii.com/what-is-algoforce" />
      </Helmet>

      <article className="mx-auto max-w-6xl px-6">
        <header className="mx-auto mb-20 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="mb-6 text-[12px] font-black uppercase tracking-[0.4em] text-purple-500">
              Master Ecosystem
            </p>
            <h1 className="mb-8 text-5xl font-black leading-tight tracking-tight md:text-7xl">
              What is AlgoForce AI?
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-medium leading-8 text-gray-400 md:text-xl">
              AlgoForce AI closes the gap between ambition and execution by connecting technology,
              talent, startups, and creative industries into one compounding execution infrastructure.
            </p>
          </motion.div>
        </header>

        <section className="mb-20 grid gap-5 md:grid-cols-2">
          {ecosystemUnits.map((unit, index) => (
            <motion.article
              key={unit.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-8"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                {unit.icon}
              </div>
              <h2 className="mb-4 text-2xl font-black">{unit.title}</h2>
              <p className="leading-7 text-gray-400">{unit.description}</p>
            </motion.article>
          ))}
        </section>

        <section className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center md:p-12">
          <h2 className="mb-5 text-3xl font-black tracking-tight md:text-4xl">
            Your Ambition Deserves Infrastructure
          </h2>
          <p className="mx-auto mb-8 max-w-2xl leading-7 text-gray-400">
            Start with enterprise AI services, join a Labs cohort, explore startup execution through
            Crucible, or partner with AlgoForce to build the next layer of the ecosystem.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-transform hover:scale-105"
            >
              Contact AlgoForce
            </Link>
            <Link
              to="/labs"
              className="rounded-full border border-white/10 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-white/5"
            >
              Explore Labs
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
};

export default WhatIsAlgoForce;
