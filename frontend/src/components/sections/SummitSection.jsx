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
    <section id="summit" className="bg-[#f7f9fc] px-5 py-14 text-[#06101d] sm:px-6 md:py-20 border-b border-[#06101d]/10 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        
        {/* Main Grid: Left Content (65%), Right Sticky Card (35%) */}
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start xl:gap-12">
          
          {/* LEFT CONTENT AREA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.75 }}
            className="flex flex-col space-y-8"
          >
            {/* Header Block */}
            <div className="rounded-[30px] border border-[#06101d]/10 bg-white p-7 sm:p-9 shadow-[0_24px_70px_rgba(6,47,79,0.06)]">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#8f38ff]/25 bg-[#8f38ff]/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6e24ca]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8f38ff]" />
                🚀 Upcoming Enterprise Event
              </div>

              <h2 className="mb-3 text-3xl font-semibold leading-[1.06] tracking-tight sm:text-4xl md:text-5xl text-[#06101d]">
                AlgoForce AI Transformation Summit <span className="premium-serif italic font-normal text-[#8f38ff]">Delhi 2026</span>
              </h2>

              <p className="mb-6 text-xl sm:text-2xl font-bold tracking-tight text-[#06101d]">
                Stop Buying AI. <span className="premium-serif italic font-normal text-[#8f38ff]">Start Deploying AI.</span>
              </p>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
                <p>
                  Join founders, CXOs, business leaders, startup teams, and AI innovators for a full-day enterprise AI summit focused on real-world AI deployment, automation, and digital transformation.
                </p>
                <p>
                  Discover how organizations are moving beyond AI experiments and implementing production-ready AI systems that improve operations, reduce costs, and drive measurable business outcomes.
                </p>
              </div>
            </div>

            {/* Event Wide Banner Card Format */}
            <div className="group overflow-hidden rounded-[30px] border border-[#06101d]/10 bg-white p-3 shadow-[0_24px_70px_rgba(6,47,79,0.08)]">
              <div className="relative overflow-hidden rounded-[24px]">
                <img
                  src="/banner.png"
                  alt="AlgoForce AI Transformation Summit Delhi 2026 Event Banner"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                />
              </div>
            </div>

            {/* Event Information Grid */}
            <div className="rounded-[30px] border border-[#06101d]/10 bg-white p-7 sm:p-8 shadow-[0_24px_70px_rgba(6,47,79,0.06)]">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8f38ff]">Event Logistics</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3.5 p-4 rounded-[20px] border border-[#06101d]/8 bg-[#f7f9fc]">
                  <div className="p-2.5 rounded-xl bg-white border border-[#06101d]/10 text-[#8f38ff] shrink-0 shadow-sm">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Date</span>
                    <span className="text-sm font-bold text-[#06101d]">28 October 2026</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-[20px] border border-[#06101d]/8 bg-[#f7f9fc]">
                  <div className="p-2.5 rounded-xl bg-white border border-[#06101d]/10 text-[#8f38ff] shrink-0 shadow-sm">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Location</span>
                    <span className="text-sm font-bold text-[#06101d]">Delhi</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-[20px] border border-[#06101d]/8 bg-[#f7f9fc]">
                  <div className="p-2.5 rounded-xl bg-white border border-[#06101d]/10 text-[#8f38ff] shrink-0 shadow-sm">
                    <Navigation size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Venue</span>
                    <span className="text-xs font-semibold text-slate-600">Exact Location To Be Announced</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-[20px] border border-[#06101d]/8 bg-[#f7f9fc]">
                  <div className="p-2.5 rounded-xl bg-white border border-[#06101d]/10 text-[#8f38ff] shrink-0 shadow-sm">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Duration</span>
                    <span className="text-xs font-semibold text-slate-600">9:00 AM – 6:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Target Audience Bar */}
              <div className="mt-4 flex items-center gap-3.5 p-4 rounded-[20px] border border-[#06101d]/8 bg-[#f7f9fc]">
                <Users size={18} className="text-[#8f38ff] shrink-0" />
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Audience</span>
                  <span className="text-xs sm:text-sm font-bold text-[#06101d]">
                    Founders • CXOs • Business Owners • Startup Teams • AI Professionals
                  </span>
                </div>
              </div>
            </div>

            {/* Key Topics & Sessions Grid */}
            <div className="rounded-[30px] border border-[#06101d]/10 bg-white p-7 sm:p-8 shadow-[0_24px_70px_rgba(6,47,79,0.06)]">
              <div className="mb-6">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8f38ff]">Summit Sessions</p>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#06101d]">
                  Key Topics & Curriculum
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
                    className="p-5 rounded-[20px] border border-[#06101d]/10 bg-[#f7f9fc] transition-all duration-300 hover:bg-white hover:shadow-md flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Topic 0{index + 1}
                      </span>
                      <div className="w-2 h-2 rounded-full bg-[#8f38ff]" />
                    </div>
                    <h4 className="text-sm font-bold text-[#06101d] leading-snug">
                      {topic}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Left Content CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={LUMA_EVENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <button className="w-full px-8 py-4 bg-[#06101d] text-white hover:bg-[#102640] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95">
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
                <button className="w-full px-8 py-4 border border-[#06101d]/10 bg-white hover:bg-slate-100 text-[#06101d] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95">
                  <ExternalLink size={14} />
                  <span>Register via Unstop</span>
                </button>
              </a>
            </div>
          </motion.div>

          {/* RIGHT STICKY REGISTRATION CARD (35%) */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="w-full lg:sticky lg:top-28"
          >
            <div className="rounded-[30px] border border-[#06101d]/10 bg-white p-7 sm:p-8 shadow-[0_24px_70px_rgba(6,47,79,0.08)]">
              <div className="mb-6 border-b border-[#06101d]/8 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8f38ff]">Pass Reservations</span>
                <h3 className="text-2xl font-bold text-[#06101d] tracking-tight mt-1">Reserve Your Seat</h3>
              </div>

              {/* Event Key Details */}
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-[#06101d]/6">
                  <span className="text-slate-500 font-medium text-xs uppercase tracking-wider">Date</span>
                  <span className="font-bold text-[#06101d]">28 October 2026</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#06101d]/6">
                  <span className="text-slate-500 font-medium text-xs uppercase tracking-wider">City</span>
                  <span className="font-bold text-[#06101d]">Delhi</span>
                </div>
                <div className="flex justify-between items-start py-2 border-b border-[#06101d]/6">
                  <span className="text-slate-500 font-medium text-xs uppercase tracking-wider">Venue</span>
                  <span className="font-semibold text-[#06101d] text-right text-xs max-w-[170px]">Exact Location To Be Announced</span>
                </div>
              </div>

              {/* Pass Pricing Blocks */}
              <div className="mb-6 space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Pass Pricing</span>
                
                <div className="flex justify-between items-center p-3.5 rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc]">
                  <div>
                    <span className="block font-bold text-sm text-[#06101d]">Student Pass</span>
                    <span className="text-[10px] text-slate-500">Valid student ID required</span>
                  </div>
                  <span className="text-lg font-extrabold text-[#8f38ff]">₹99</span>
                </div>

                <div className="flex justify-between items-center p-3.5 rounded-2xl border border-[#8f38ff]/20 bg-[#8f38ff]/5">
                  <div>
                    <span className="block font-bold text-sm text-[#06101d]">Professional Pass</span>
                    <span className="text-[10px] text-slate-600">Founders, CXOs & Pros</span>
                  </div>
                  <span className="text-lg font-extrabold text-[#06101d]">₹299</span>
                </div>
              </div>

              {/* Pass Includes List */}
              <div className="mb-8">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Pass Includes</span>
                <ul className="space-y-2.5">
                  {INCLUDES.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-semibold">
                      <CheckCircle2 size={16} className="text-[#8f38ff] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Action Buttons */}
              <div className="space-y-3">
                <a
                  href={LUMA_EVENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <button className="w-full py-3.5 px-6 bg-[#06101d] hover:bg-[#102640] text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all">
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
                  <button className="w-full py-3.5 px-6 border border-[#06101d]/10 bg-[#f7f9fc] hover:bg-slate-100 text-[#06101d] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all">
                    <span>Register on Unstop</span>
                    <ExternalLink size={14} />
                  </button>
                </a>
              </div>

              {/* Footer Note */}
              <p className="mt-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
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
