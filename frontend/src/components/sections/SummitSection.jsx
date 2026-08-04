import { motion } from 'framer-motion'
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Navigation, 
  CheckCircle2, 
  ExternalLink, 
  ArrowUpRight
} from 'lucide-react'

const LUMA_EVENT_URL = "https://luma.com/t1m4rkst?tk=GuW27n"
const UNSTOP_EVENT_URL = "https://unstop.com/o/a9xApLV?lb=kVkkl81P&utm_medium=Share&utm_source=events&utm_campaign=Fqgpcvtk16500"

const TOPICS = [
  "Why 90% of AI Projects Fail",
  "AI Agents vs Enterprise AI Systems",
  "Building AI Employees",
  "AI for Sales",
  "AI for HR",
  "AI for Finance",
  "AI for Operations",
  "Live Enterprise AI Deployment",
  "Future of AI Companies"
]

const INCLUDES = [
  "AI Readiness Assessment",
  "AI Strategy Roadmap",
  "Enterprise AI Playbook",
  "Networking Session",
  "Live AI Demonstrations"
]

const SummitSection = () => {
  return (
    <section id="summit" className="relative py-16 sm:py-20 md:py-24 bg-[#03070d] text-white border-b border-white/10 overflow-hidden">
      {/* Background Banner Image Backdrop with Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/banner.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-25 scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#03070d]/90 via-[#03070d]/95 to-[#03070d]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:items-start xl:gap-14">
          
          {/* LEFT COLUMN: Main Event Content (≈65%) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-10"
          >
            {/* Badge & Headings */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8f38ff]" />
                🚀 Upcoming Enterprise Event
              </div>

              <h2 className="mb-4 max-w-4xl text-3xl font-semibold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl text-white">
                AlgoForce AI Transformation Summit <span className="premium-serif italic font-normal text-[#cdb4ff]">Delhi 2026</span>
              </h2>

              <p className="mb-6 text-xl sm:text-2xl font-bold tracking-tight text-white">
                Stop Buying AI. <span className="premium-serif italic font-normal text-[#cdb4ff]">Start Deploying AI.</span>
              </p>

              <div className="space-y-4 max-w-3xl text-sm sm:text-base leading-relaxed text-slate-300 font-normal">
                <p>
                  Join founders, CXOs, business leaders, startup teams, and AI innovators for a full-day enterprise AI summit focused on real-world AI deployment, automation, and digital transformation.
                </p>
                <p>
                  Discover how organizations are moving beyond AI experiments and implementing production-ready AI systems that improve operations, reduce costs, and drive measurable business outcomes.
                </p>
              </div>
            </div>

            {/* Event Information Grid */}
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md shadow-xl">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-[#cdb4ff]">Event Information</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <Calendar size={18} className="mt-0.5 text-[#cdb4ff] shrink-0" />
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Date</span>
                    <span className="text-sm font-bold text-white">28 October 2026</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <MapPin size={18} className="mt-0.5 text-[#cdb4ff] shrink-0" />
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Location</span>
                    <span className="text-sm font-bold text-white">Delhi</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <Navigation size={18} className="mt-0.5 text-[#cdb4ff] shrink-0" />
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Venue</span>
                    <span className="text-xs font-semibold text-slate-200">Exact Location To Be Announced</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <Clock size={18} className="mt-0.5 text-[#cdb4ff] shrink-0" />
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Duration</span>
                    <span className="text-xs font-semibold text-slate-200">9:00 AM – 6:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Target Audience Line */}
              <div className="mt-4 flex items-center gap-3 p-4 rounded-2xl bg-white/[0.04] border border-white/5">
                <Users size={18} className="text-[#cdb4ff] shrink-0" />
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Audience</span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    Founders • CXOs • Business Owners • Startup Teams • AI Professionals
                  </span>
                </div>
              </div>
            </div>

            {/* Large Event Banner Display */}
            <div className="relative group overflow-hidden rounded-[26px] border border-white/12 shadow-[0_24px_70px_rgba(0,0,0,0.4)]">
              <img
                src="/banner.png"
                alt="AlgoForce AI Transformation Summit Delhi 2026 Event Banner"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover rounded-[24px] transition-transform duration-500 hover:scale-[1.01]"
              />
            </div>

            {/* Summit Topics Grid */}
            <div>
              <div className="mb-6">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#cdb4ff]">Summit Agenda</p>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Key Topics & Sessions
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {TOPICS.map((topic, index) => (
                  <motion.div
                    key={topic}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ y: -3 }}
                    className="p-5 rounded-[20px] border border-white/10 bg-white/[0.03] transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Session 0{index + 1}
                      </span>
                      <div className="w-2 h-2 rounded-full bg-[#8f38ff]" />
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {topic}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Left Content CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={LUMA_EVENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <button className="w-full px-8 py-4 bg-white text-[#06101d] hover:bg-slate-100 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95">
                  <span>Register via Luma</span>
                  <ArrowUpRight size={15} />
                </button>
              </a>

              <a
                href={UNSTOP_EVENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <button className="w-full px-8 py-4 border border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all backdrop-blur-md active:scale-95">
                  <span>Register via Unstop</span>
                  <ExternalLink size={14} />
                </button>
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Sticky Registration Card (≈35%) */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="w-full lg:sticky lg:top-28"
          >
            <div className="relative overflow-hidden rounded-[30px] border border-white/12 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-xl shadow-[0_24px_70px_rgba(0,0,0,0.5)]">
              <div className="relative z-10">
                <div className="mb-6 border-b border-white/10 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#cdb4ff]">Summit Registration</span>
                  <h3 className="text-2xl font-bold text-white tracking-tight mt-1">Reserve Your Seat</h3>
                </div>

                {/* Event Key Meta Info */}
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                    <span className="text-slate-400 font-medium">Date</span>
                    <span className="font-bold text-white">28 October 2026</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                    <span className="text-slate-400 font-medium">City</span>
                    <span className="font-bold text-white">Delhi</span>
                  </div>
                  <div className="flex justify-between items-start py-1.5 border-b border-white/5">
                    <span className="text-slate-400 font-medium">Venue</span>
                    <span className="font-semibold text-slate-200 text-right text-xs max-w-[170px]">Exact Location To Be Announced</span>
                  </div>
                </div>

                {/* Tickets Pricing Box */}
                <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/8 space-y-3">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Pass Pricing</span>
                  
                  <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.04]">
                    <div>
                      <span className="block font-bold text-sm text-white">Student Pass</span>
                      <span className="text-[10px] text-slate-400">Valid student ID required</span>
                    </div>
                    <span className="text-lg font-extrabold text-[#cdb4ff]">₹99</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.08] border border-white/10">
                    <div>
                      <span className="block font-bold text-sm text-white">Professional Pass</span>
                      <span className="text-[10px] text-slate-300">Founders, CXOs & Pros</span>
                    </div>
                    <span className="text-lg font-extrabold text-white">₹299</span>
                  </div>
                </div>

                {/* What's Included */}
                <div className="mb-8">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Pass Includes</span>
                  <ul className="space-y-2.5">
                    {INCLUDES.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-medium">
                        <CheckCircle2 size={16} className="text-[#8f38ff] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Registration Buttons */}
                <div className="space-y-3">
                  <a
                    href={LUMA_EVENT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <button className="w-full py-3.5 px-6 bg-white hover:bg-slate-100 text-[#06101d] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
                      <span>Register on Luma</span>
                      <ArrowUpRight size={15} />
                    </button>
                  </a>

                  <a
                    href={UNSTOP_EVENT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <button className="w-full py-3.5 px-6 border border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all">
                      <span>Register on Unstop</span>
                      <ExternalLink size={14} />
                    </button>
                  </a>
                </div>

                {/* Footer Note */}
                <p className="mt-4 text-center text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Limited Seats Available
                </p>
              </div>
            </div>
          </motion.aside>

        </div>
      </div>
    </section>
  )
}

export default SummitSection
