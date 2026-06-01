import { motion } from 'framer-motion';

const CRUCIBLE_URL = 'https://crucible-website-omega.vercel.app/';

const Nexus = () => {
  return (
    <main className="min-h-screen bg-[#020205] text-white font-sans px-6 py-28 flex items-center justify-center">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-5xl text-center"
      >
        <p className="mb-5 text-[11px] font-black uppercase tracking-[0.45em] text-purple-400">
          Crucible by AlgoForce
        </p>
        <h1 className="mx-auto mb-8 max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-7xl">
          Startup Execution Infrastructure for Founders
        </h1>
        <p className="mx-auto mb-12 max-w-3xl text-base font-medium leading-8 text-gray-400 md:text-xl">
          Nexus connects founders to the Crucible startup operating system: venture workspace,
          execution tracking, MVP support, fundraising readiness, and AlgoForce Labs talent access.
        </p>

        <div className="mx-auto mb-12 grid max-w-4xl gap-4 md:grid-cols-3">
          {[
            ['Venture Workspace', 'Track sprints, OKRs, milestones, tasks, and founder accountability.'],
            ['Venture Health Score', 'Measure execution velocity, traction, team strength, finance, and product progress.'],
            ['Ecosystem Support', 'Access Labs talent, AI services, founder community, and startup growth workflows.'],
          ].map(([title, description]) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left">
              <h2 className="mb-3 text-lg font-black">{title}</h2>
              <p className="text-sm leading-6 text-gray-500">{description}</p>
            </article>
          ))}
        </div>

        <a
          href={CRUCIBLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-transform hover:scale-105"
        >
          Open Crucible
        </a>
      </motion.section>
    </main>
  );
};

export default Nexus;
