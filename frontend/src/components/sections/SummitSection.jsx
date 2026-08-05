import { motion } from 'framer-motion'
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle2, 
  ExternalLink, 
  ArrowUpRight,
  Ticket
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
  return (
    <>
      {/* ==========================================
          DESKTOP VIEW (Featuring Actual Banner Image)
         ========================================== */}
      <section id="summit" className="hidden md:block relative bg-[#f7f9fc] px-4 py-8 sm:px-6 md:py-12 border-b border-[#06101d]/10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/10 bg-[#06101d] text-white p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(6,47,79,0.15)]"
          >
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-32 right-1/4 w-[600px] h-[350px] bg-purple-600/20 rounded-full blur-[130px]" />
            </div>

            <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
              
              {/* LEFT SIDE: Actual Banner Image Poster (Same Manner as Mobile) */}
              <div className="lg:col-span-7">
                <div className="relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl bg-black/40 group">
                  <img
                    src="/banner.png"
                    alt="AlgoForce AI Transformation Summit Delhi 2026 Banner"
                    className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.01] transition-transform duration-300"
                  />
                </div>
              </div>

              {/* RIGHT SIDE: Heading, Details & Registration Box */}
              <div className="lg:col-span-5 flex flex-col space-y-4">
                
                {/* Badge & Title */}
                <div>
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-200 backdrop-blur-md mb-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                    🚀 Upcoming Enterprise Event
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-extrabold leading-tight tracking-tight text-white">
                    AlgoForce AI Transformation Summit <span className="premium-serif italic font-normal text-purple-300">Delhi 2026</span>
                  </h2>
                  <p className="mt-1 text-sm font-bold text-purple-200">
                    Stop Buying AI. <span className="premium-serif italic font-normal text-white">Start Deploying AI.</span>
                  </p>
                </div>

                {/* Event Logistics Strip */}
                <div className="grid grid-cols-2 gap-2">
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
                      <span className="text-xs font-bold text-white">10 AM – 3 PM</span>
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

                {/* Pass Info & Includes */}
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl space-y-3">
                  <div className="flex justify-between items-center border-b border-white/15 pb-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-purple-300">Registration Open</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/20 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                      Limited Seats
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {INCLUDES.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-white font-semibold">
                        <CheckCircle2 size={13} className="text-purple-300 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={LUMA_EVENT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <button className="w-full py-3 px-3 bg-white text-[#06101d] hover:bg-slate-100 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all">
                      <Ticket size={14} />
                      <span>Register Luma</span>
                      <ArrowUpRight size={13} />
                    </button>
                  </a>

                  <a
                    href={UNSTOP_EVENT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <button className="w-full py-3 px-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all">
                      <span>Register Unstop</span>
                      <ExternalLink size={13} />
                    </button>
                  </a>
                </div>

              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          MOBILE VIEW (Clean Light Theme & Fixed Clearance)
         ========================================== */}
      <section id="summit-mobile" className="block md:hidden relative bg-[#f8fafc] px-4 pt-16 pb-36 border-y border-slate-200">
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] text-slate-900 space-y-4">
            
            {/* Header Badge & Title */}
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-700 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-600 animate-pulse" />
                🚀 Upcoming Enterprise Event
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                AlgoForce AI Transformation Summit <span className="italic font-normal text-purple-700">Delhi 2026</span>
              </h2>
              <p className="mt-1 text-xs font-bold text-purple-600">
                Stop Buying AI. <span className="italic font-normal text-slate-700">Start Deploying AI.</span>
              </p>
            </div>

            {/* Quick Action Buttons at Top */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={LUMA_EVENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <button className="w-full py-2.5 px-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 shadow-md active:scale-95 transition-all">
                  <Ticket size={13} />
                  <span>Luma</span>
                  <ArrowUpRight size={12} />
                </button>
              </a>

              <a
                href={UNSTOP_EVENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <button className="w-full py-2.5 px-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 shadow-md active:scale-95 transition-all">
                  <span>Unstop</span>
                  <ExternalLink size={12} />
                </button>
              </a>
            </div>

            {/* Banner Poster Image */}
            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-slate-900">
              <img
                src="/banner.png"
                alt="AlgoForce AI Transformation Summit Delhi 2026"
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>

            {/* Logistics Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                <Calendar size={15} className="text-purple-600 shrink-0" />
                <div>
                  <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400">Date</span>
                  <span className="text-[11px] font-bold text-slate-900">28 Oct 2026</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                <MapPin size={15} className="text-purple-600 shrink-0" />
                <div>
                  <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400">City</span>
                  <span className="text-[11px] font-bold text-slate-900">Delhi</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                <Clock size={15} className="text-purple-600 shrink-0" />
                <div>
                  <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400">Time</span>
                  <span className="text-[11px] font-bold text-slate-900">10 AM – 3 PM</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                <Users size={15} className="text-purple-600 shrink-0" />
                <div>
                  <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400">Audience</span>
                  <span className="text-[11px] font-bold text-slate-900 truncate">Founders & CXOs</span>
                </div>
              </div>
            </div>

            {/* Includes Checklist */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="block text-[9px] font-extrabold uppercase tracking-wider text-purple-700 mb-2">
                Every Attendee Receives
              </span>
              <div className="space-y-1.5">
                {INCLUDES.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 size={13} className="text-purple-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Call to Action Buttons */}
            <div className="space-y-2 pt-1">
              <a
                href={LUMA_EVENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <button className="w-full py-3 px-4 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all">
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
                <button className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all">
                  <ExternalLink size={13} />
                  <span>Register on Unstop</span>
                </button>
              </a>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default SummitSection
