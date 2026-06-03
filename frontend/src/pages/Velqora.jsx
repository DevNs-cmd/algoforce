import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaFileContract, FaMoneyCheck } from "react-icons/fa";
import SeoHead from "../components/common/SeoHead";

const features = [
  {
    icon: <FaCalendarAlt />,
    title: "Booking & Calendar",
    description: "Accept booking requests, view artist availability, and manage event schedules in one dynamic panel.",
  },
  {
    icon: <FaFileContract />,
    title: "Contracts & Agreements",
    description: "Generate legally compliant artist agreements, secure riders, and sign contracts digitally.",
  },
  {
    icon: <FaMoneyCheck />,
    title: "Instant Payments",
    description: "Automate payouts, collect event advances, track commission splits, and view revenue analytics.",
  },
];

const Velqora = () => {
  return (
    <main className="min-h-screen bg-[#020205] text-white pt-32 pb-20 selection:bg-purple-500/30">
      <SeoHead path="/velqora" />
      <article className="mx-auto max-w-6xl px-6">
        <header className="mx-auto mb-20 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="mb-6 text-[12px] font-black uppercase tracking-[0.4em] text-purple-500">
              Velqora OS
            </p>
            <h1 className="mb-8 text-5xl font-black leading-tight tracking-tight md:text-7xl">
              The Operating System for India's Performing Artists
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-medium leading-8 text-gray-400 md:text-xl">
              Velqora connects performing artists and live event organizers across India, streamlining logistics, bookings, payments, and contract management.
            </p>
          </motion.div>
        </header>

        <section className="mb-20 grid gap-5 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-8"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                {feature.icon}
              </div>
              <h2 className="mb-4 text-2xl font-black">{feature.title}</h2>
              <p className="leading-7 text-gray-400">{feature.description}</p>
            </motion.article>
          ))}
        </section>

        <section className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center md:p-12">
          <h2 className="mb-5 text-3xl font-black tracking-tight md:text-4xl">
            Streamline your performance career
          </h2>
          <p className="mx-auto mb-8 max-w-2xl leading-7 text-gray-400">
            Join thousands of performers and organizers today. Artist subscriptions start from only ₹499/month.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
};

export default Velqora;
