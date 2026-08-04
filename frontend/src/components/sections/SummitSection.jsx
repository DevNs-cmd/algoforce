import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle2, 
  ExternalLink, 
  ArrowUpRight,
  Ticket,
  X,
  Sparkles
} from 'lucide-react'

const LUMA_EVENT_URL = "https://luma.com/t1m4rkst?tk=GuW27n"
const UNSTOP_EVENT_URL = "https://unstop.com/o/a9xApLV?lb=kVkkl81P&utm_medium=Share&utm_source=events&utm_campaign=Fqgpcvtk16500"

const TOPICS = [
  "Why 90% AI Projects Fail",
  "AI Agents vs Enterprise Systems",
  "Building AI Employees",
  "AI for Sales",
  "AI for HR",
  "AI for Finance",
  "AI for Operations",
  "Live AI Deployment",
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
  const [showPopup, setShowPopup] = useState(true)

  return (
    <section id="summit" className="relative bg-[#f7f9fc] px-4 py-8 sm:px-6 md:py-12 border-b border-[#06101d]/10">
      <div className="mx-auto max-w-7xl">
        
        {/* Main Compact Summit Card with Banner Background */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/10 bg-[#06101d] text-white p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(6,47,79,0.15)]"
        >
          {/* Banner Background Image with Dark Scrim Overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src="/banner.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center opacity-30 scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06101d] via-[#06101d]/90 to-[#06101d]/80" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#06101d]/50 via-transparent to-[#06101d]/90" />
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            
            {/* LEFT SIDE: Heading, Description & Logistics */}
            <div className="flex flex-col space-y-5">
              {/* Badge */}
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-200 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                🚀 Upcoming Enterprise Event
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-white">
                  AlgoForce AI Transformation Summit <span className="premium-serif italic font-normal text-purple-300">Delhi 2026</span>
                </h2>
                <p className="mt-1 text-base sm:text-lg font-bold text-purple-200">
                  Stop Buying AI. <span className="premium-serif italic font-normal text-white">Start Deploying AI.</span>
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed max-w-2xl">
                Join founders, CXOs, business leaders, startup teams, and AI innovators for a full-day summit on real-world AI deployment, automation, and digital transformation. Move beyond AI experiments to production-ready enterprise systems.
              </p>

              {/* Event Logistics Quick Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
                  <Calendar size={15} className="text-purple-300 shrink-0" />
                  <div>
                    <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-300">Date</span>
                    <span className="text-xs font-bold text-white">28 Oct 2026</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
                  <MapPin size={15} className="text-purple-300 shrink-0" />
                  <div>
                    <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-300">City</span>
                    <span className="text-xs font-bold text-white">Delhi</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
                  <Clock size={15} className="text-purple-300 shrink-0" />
                  <div>
                    <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-300">Time</span>
                    <span className="text-xs font-bold text-white">9 AM – 6 PM</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
                  <Users size={15} className="text-purple-300 shrink-0" />
                  <div>
                    <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-300">Audience</span>
                    <span className="text-[10px] font-bold text-white truncate">Founders & CXOs</span>
                  </div>
                </div>
              </div>

              {/* Topics Compact Badges */}
              <div className="pt-1">
                <span className="block text-[9px] font-bold uppercase tracking-wider text-purple-300 mb-2">Key Topics</span>
                <div className="flex flex-wrap gap-1.5">
                  {TOPICS.map((topic) => (
                    <span
                      key={topic}
                      className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-[10px] font-bold text-white"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Compact Reservation & Pass Included Box */}
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 sm:p-6 backdrop-blur-xl flex flex-col space-y-4">
              <div className="flex justify-between items-center border-b border-white/15 pb-3">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-purple-300">Registration Open</span>
                  <h3 className="text-lg font-bold text-white">Reserve Your Seat</h3>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/20 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                  Limited Seats
                </span>
              </div>

              {/* Pass Categories */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 text-center">
                  <span className="block font-bold text-xs text-white">Student Pass</span>
                  <span className="text-[9px] text-slate-200">Valid ID Required</span>
                </div>
                <div className="p-2.5 rounded-xl bg-purple-500/25 border border-purple-400/40 text-center">
                  <span className="block font-bold text-xs text-white">Professional Pass</span>
                  <span className="text-[9px] text-purple-100">Founders & Pros</span>
                </div>
              </div>

              {/* Includes checklist */}
              <div className="space-y-1.5 py-1">
                {INCLUDES.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-white font-semibold">
                    <CheckCircle2 size={13} className="text-purple-300 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Registration Action Buttons */}
              <div className="space-y-2 pt-1">
                <a
                  href={LUMA_EVENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <button className="w-full py-3 px-4 bg-white text-[#06101d] hover:bg-slate-100 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
                    <Ticket size={14} />
                    <span>Register on Luma</span>
                    <ArrowUpRight size={14} />
                  </button>
                </a>

                <a
                  href={UNSTOP_EVENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <button className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all">
                    <ExternalLink size={13} />
                    <span>Register on Unstop</span>
                  </button>
                </a>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default SummitSection
