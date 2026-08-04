import { motion } from 'framer-motion'
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Navigation, 
  CheckCircle2, 
  ExternalLink, 
  ArrowUpRight,
  Ticket
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
    <section id="summit" className="bg-[#f7f9fc] px-5 py-12 text-[#06101d] sm:px-6 md:py-16 border-b border-[#06101d]/10 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        
        {/* Two Column Grid: Left Content (65%), Right Sticky Card (35%) */}
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start xl:gap-10">
          
          {/* LEFT COLUMN: Single Cohesive Enterprise Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="rounded-[30px] border border-[#06101d]/10 bg-white p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(6,47,79,0.06)] flex flex-col space-y-8"
          >
            {/* Badge & Title Block */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8f38ff]/25 bg-[#8f38ff]/5 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6e24ca]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8f38ff]" />
                🚀 Upcoming Enterprise Event
              </div>

              <h2 className="mb-2 text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.08] tracking-tight text-[#06101d]">
                AlgoForce AI Transformation Summit <span className="premium-serif italic font-normal text-[#8f38ff]">Delhi 2026</span>
              </h2>

              <p className="mb-4 text-lg sm:text-xl font-bold tracking-tight text-[#06101d]">
                Stop Buying AI. <span className="premium-serif italic font-normal text-[#8f38ff]">Start Deploying AI.</span>
              </p>

              <p className="text-sm leading-relaxed text-slate-600 font-normal">
                Join founders, CXOs, business leaders, startup teams, and AI innovators for a full-day enterprise AI summit focused on real-world AI deployment, automation, and digital transformation. Discover how organizations implement production-ready AI systems that improve operations and drive measurable outcomes.
              </p>
            </div>

            {/* Event Wide Banner visual */}
            <div className="overflow-hidden rounded-[22px] border border-[#06101d]/10 shadow-md">
              <img
                src="/banner.png"
                alt="AlgoForce AI Transformation Summit Delhi 2026 Event Banner"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.01]"
              />
            </div>

            {/* Event Information Grid */}
            <div className="rounded-[22px] border border-[#06101d]/8 bg-[#f7f9fc] p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white border border-[#06101d]/8 text-[#8f38ff] shrink-0">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">Date</span>
                    <span className="text-xs font-bold text-[#06101d]">28 October 2026</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white border border-[#06101d]/8 text-[#8f38ff] shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">Location</span>
                    <span className="text-xs font-bold text-[#06101d]">Delhi</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white border border-[#06101d]/8 text-[#8f38ff] shrink-0">
                    <Navigation size={16} />
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">Venue</span>
                    <span className="text-xs font-semibold text-slate-600">Exact Location To Be Announced</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white border border-[#06101d]/8 text-[#8f38ff] shrink-0">
                    <Clock size={16} />
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">Duration</span>
                    <span className="text-xs font-semibold text-slate-600">9:00 AM – 6:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Target Audience Line */}
              <div className="mt-3.5 flex items-center gap-3 pt-3.5 border-t border-[#06101d]/8">
                <Users size={16} className="text-[#8f38ff] shrink-0" />
                <span className="text-xs font-semibold text-slate-700">
                  <span className="font-bold text-[#06101d]">Audience:</span> Founders • CXOs • Business Owners • Startup Teams • AI Professionals
                </span>
              </div>
            </div>

            {/* Key Topics Grid */}
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8f38ff]">Summit Topics</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {TOPICS.map((topic, index) => (
                  <motion.div
                    key={topic}
                    whileHover={{ y: -2 }}
                    className="p-3.5 rounded-xl border border-[#06101d]/8 bg-[#f7f9fc] hover:bg-white transition-all flex items-start gap-2.5"
                  >
                    <span className="text-[10px] font-bold text-[#8f38ff] shrink-0 mt-0.5">0{index + 1}</span>
                    <h4 className="text-xs font-bold text-[#06101d] leading-snug">
                      {topic}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={LUMA_EVENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <button className="w-full px-7 py-3.5 bg-[#06101d] text-white hover:bg-[#102640] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95">
                  <Ticket size={15} />
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
                <button className="w-full px-7 py-3.5 border border-[#06101d]/10 bg-[#f7f9fc] hover:bg-slate-100 text-[#06101d] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95">
                  <ExternalLink size={14} />
                  <span>Register via Unstop</span>
                </button>
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Sticky Registration Card */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full lg:sticky lg:top-28"
          >
            <div className="rounded-[30px] border border-[#06101d]/10 bg-white p-6 sm:p-7 shadow-[0_20px_60px_rgba(6,47,79,0.06)]">
              <div className="mb-5 border-b border-[#06101d]/8 pb-3.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8f38ff]">Pass Reservations</span>
                <h3 className="text-xl font-bold text-[#06101d] tracking-tight mt-0.5">Reserve Your Seat</h3>
              </div>

              {/* Event Key Details */}
              <div className="space-y-2.5 mb-5 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-[#06101d]/6">
                  <span className="text-slate-500 font-medium uppercase tracking-wider text-[10px]">Date</span>
                  <span className="font-bold text-[#06101d]">28 October 2026</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-[#06101d]/6">
                  <span className="text-slate-500 font-medium uppercase tracking-wider text-[10px]">City</span>
                  <span className="font-bold text-[#06101d]">Delhi</span>
                </div>
                <div className="flex justify-between items-start py-1.5 border-b border-[#06101d]/6">
                  <span className="text-slate-500 font-medium uppercase tracking-wider text-[10px]">Venue</span>
                  <span className="font-semibold text-[#06101d] text-right max-w-[160px]">Exact Location To Be Announced</span>
                </div>
              </div>

              {/* Pass Pricing */}
              <div className="mb-5 space-y-2.5">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Pass Pricing</span>
                
                <div className="flex justify-between items-center p-3 rounded-xl border border-[#06101d]/8 bg-[#f7f9fc]">
                  <div>
                    <span className="block font-bold text-xs text-[#06101d]">Student Pass</span>
                    <span className="text-[9px] text-slate-500">Valid student ID required</span>
                  </div>
                  <span className="text-base font-extrabold text-[#8f38ff]">₹99</span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl border border-[#8f38ff]/20 bg-[#8f38ff]/5">
                  <div>
                    <span className="block font-bold text-xs text-[#06101d]">Professional Pass</span>
                    <span className="text-[9px] text-slate-600">Founders, CXOs & Pros</span>
                  </div>
                  <span className="text-base font-extrabold text-[#06101d]">₹299</span>
                </div>
              </div>

              {/* Pass Includes List */}
              <div className="mb-6">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">Pass Includes</span>
                <ul className="space-y-2">
                  {INCLUDES.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                      <CheckCircle2 size={15} className="text-[#8f38ff] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <a
                  href={LUMA_EVENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <button className="w-full py-3 px-5 bg-[#06101d] hover:bg-[#102640] text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all">
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
                  <button className="w-full py-3 px-5 border border-[#06101d]/10 bg-[#f7f9fc] hover:bg-slate-100 text-[#06101d] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all">
                    <span>Register on Unstop</span>
                    <ExternalLink size={13} />
                  </button>
                </a>
              </div>

              {/* Footer Note */}
              <p className="mt-3.5 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                ⚡ Limited Seats Available
              </p>
            </div>
          </motion.aside>

        </div>
      </div>
    </section>
  )
}

export default SummitSection
