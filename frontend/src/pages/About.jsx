import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaBuilding, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import SeoHead from "../components/common/SeoHead";

const details = [
  {
    icon: <FaUsers />,
    title: "Our Founder",
    description: "AlgoForce AI was founded in June 2026 by Dev N Suman in New Delhi, India.",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Our Headquarters",
    description: "Based in South Delhi, Kalkaji, New Delhi, India. Operating as a registered MSME unit.",
  },
  {
    icon: <FaBuilding />,
    title: "Ecosystem Units",
    description: "Spanning enterprise AI services, Crucible (startup OS), Labs (talent), and Velqora (live events OS).",
  },
];

const About = () => {
  return (
    <main className="min-h-screen bg-[#020205] text-white pt-32 pb-20 selection:bg-purple-500/30">
      <SeoHead path="/about" />
      <article className="mx-auto max-w-6xl px-6">
        <header className="mx-auto mb-20 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="mb-6 text-[12px] font-black uppercase tracking-[0.4em] text-purple-500">
              About AlgoForce AI
            </p>
            <h1 className="mb-8 text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Built to Close the Execution Gap in India
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-medium leading-8 text-gray-400 md:text-xl">
              We construct premium execution infrastructure for enterprises, startups, talent, and performing artists across India.
            </p>
          </motion.div>
        </header>

        <section className="mb-20 grid gap-5 md:grid-cols-3">
          {details.map((detail, index) => (
            <motion.article
              key={detail.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-8"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                {detail.icon}
              </div>
              <h2 className="mb-4 text-2xl font-black">{detail.title}</h2>
              <p className="leading-7 text-gray-400">{detail.description}</p>
            </motion.article>
          ))}
        </section>

        <section className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center md:p-12">
          <h2 className="mb-5 text-3xl font-black tracking-tight md:text-4xl">
            Your Ambition Deserves Infrastructure
          </h2>
          <p className="mx-auto mb-8 max-w-2xl leading-7 text-gray-400">
            AlgoForce AI closes the gap between your ambition and your execution. Partner with us today.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-transform hover:scale-105"
            >
              Contact Us
            </Link>
            <Link
              to="/founder"
              className="rounded-full border border-white/10 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-white/5"
            >
              Meet Dev
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
};

export default About;
