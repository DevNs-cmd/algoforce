import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHeartbeat, FaLayerGroup, FaMoneyBillWave } from "react-icons/fa";
import SeoHead from "../components/common/SeoHead";

const pillars = [
  {
    icon: <FaLayerGroup />,
    title: "MVP Build & Launch",
    description: "We help founders validate their ideas, map requirements, structure database schemas, and build launch-ready MVPs with execution speed.",
  },
  {
    icon: <FaHeartbeat />,
    title: "Technical Talent & Teams",
    description: "Access deployment-ready developers and product engineers from our Labs talent engine to build and support your technical infrastructure.",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Product Scale & Growth",
    description: "Transition your product from MVP into a scaling company using Crucible's structured execution platform and operational systems.",
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
              The Startup Execution Platform
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-medium leading-8 text-gray-400 md:text-xl">
              Crucible is a Startup Operating System—not an incubator—helping early-stage founders validate concepts, build MVPs, launch, find technical teams, and scale products.
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
            Ready to Build Your Product?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl leading-7 text-gray-400">
            Learn how Crucible can accelerate your product build, secure your technical infrastructure, and connect you with deployment-ready engineers.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/contact?interest=crucible"
              className="rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-transform hover:scale-105"
            >
              Apply to Crucible
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
};

export default Crucible;
