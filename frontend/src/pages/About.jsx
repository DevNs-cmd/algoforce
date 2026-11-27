import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ShieldCheck, ArrowRight, CheckCircle2, Building2, Code2, Cpu, Layers, Workflow, Sparkles, MapPin, Phone, Mail } from "lucide-react"
import SeoHead from "../components/common/SeoHead"

const DIVISIONS = [
  { num: '01', title: 'Technology Consulting', desc: 'Requirements analysis, architecture design, digital roadmaps, and technical feasibility audits.' },
  { num: '02', title: 'Software & Digital Engineering', desc: 'Custom enterprise web platforms, mobile apps, secure APIs, and microservices architecture.' },
  { num: '03', title: 'AI & Intelligent Automation', desc: 'Applied machine learning, LLM agents, document processing, and robotic workflow orchestration.' },
  { num: '04', title: 'Enterprise & Industry Solutions', desc: 'Non-invasive Tally Prime, SAP, and CRM connectors with executive management dashboards.' },
  { num: '05', title: 'Managed Technology Services', desc: 'System monitoring, security updates, bug fixes, and ongoing software maintenance.' },
  { num: '06', title: 'Products, Platforms & R&D', desc: 'Proprietary software products and reusable engineering tools built in-house.' }
]

const VALUES = [
  {
    title: 'Integrated Delivery, Not Fragmented Vendors',
    desc: 'Businesses shouldn’t have to juggle a strategist, a freelance coder, and an external support team. We take full ownership from assessment to long-term operations.'
  },
  {
    title: 'Non-Invasive Architecture',
    desc: 'We never force clients to rip and replace systems that work. We engineer smart middleware that connects to your existing Tally, SAP, or legacy database.'
  },
  {
    title: 'Production Reality Over Hype',
    desc: 'We do not sell AI as magic. We only recommend artificial intelligence and automation where there is a mathematically clear operational efficiency gain.'
  },
  {
    title: 'Strict Intellectual Property Protection',
    desc: 'Client data is hosted in your private VPCs (AWS, Azure, or on-premise). Your code, data schemas, and competitive IP remain 100% yours.'
  }
]

const About = () => {
  return (
    <div className="bg-[#f8fafc] text-slate-900 pt-28 sm:pt-36 pb-24 overflow-hidden">
      <SeoHead 
        title="About AlgoForce | Integrated IT Services & Digital Engineering" 
        description="Learn about AlgoForce — Your Technology Partner. We combine technology consulting, software engineering, AI automation, and managed operations under one unified brand."
      />

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-t border-t-white border-b-2 border-b-slate-200 border-x border-slate-200 shadow-[0_4px_10px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1)] mb-4">
            <Building2 size={15} className="text-[#092941]" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-[#092941]">
              About AlgoForce
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#092941] tracking-tight mb-5">
            Your Technology Partner.{' '}
            <span className="font-serif italic font-normal text-purple-900 block sm:inline">
              From Problem to Progress.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            AlgoForce is an integrated IT services and digital engineering company. We help businesses and institutions understand their technology requirements, identify problems, design solutions, develop software, integrate systems, deploy technology, and manage it over time.
          </p>
        </div>

        {/* Corporate Identity & Government MSME Verification */}
        <div className="p-8 sm:p-11 rounded-3xl bg-gradient-to-r from-white via-slate-50 to-white border-t-2 border-t-white border-b-4 border-b-slate-300 border-x border-slate-200 shadow-[0_20px_45px_-6px_rgba(9,41,65,0.14),inset_0_1px_0_rgba(255,255,255,1)] mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shadow-2xs">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                      Government of India Enterprise
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                      Verified
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#092941]">
                    Ministry of MSME Registered Enterprise
                  </h2>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                AlgoForce is legally registered under the Ministry of Micro, Small and Medium Enterprises (MSME), Government of India, under registration number <span className="font-mono text-slate-900 font-bold">UDYAM-DL-08-0122150</span>. Our headquarters and delivery operations are situated in Kalkaji, South East Delhi.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-[#092941]" />
                  <span>South East Delhi, Kalkaji, New Delhi – 110019</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone size={13} className="text-[#092941]" />
                  <span>+91 84489 47436</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1">
                Official Entity Designation
              </span>
              <div className="text-sm font-bold text-[#092941] mb-2">
                AlgoForce Integrated Technologies
              </div>
              <div className="text-xs text-slate-500 font-mono">
                UDYAM: UDYAM-DL-08-0122150
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-emerald-800 font-semibold flex items-center justify-center gap-1">
                <CheckCircle2 size={13} />
                <span>Active Operating Status</span>
              </div>
            </div>
          </div>
        </div>

        {/* The 6 Capabilities Under ONE Brand */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#092941] bg-white px-3 py-1 rounded-md border border-slate-200 shadow-2xs">
              One Organization • Six Unified Divisions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#092941] mt-3 mb-2">
              Integrated Capabilities Under One Roof
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              We are not six separate vendors or a loose agency network. All six divisions work in tight collaboration to deliver complete technology solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIVISIONS.map((div) => (
              <div
                key={div.num}
                className="rounded-3xl bg-gradient-to-b from-white via-white to-slate-50 border-t-2 border-t-white border-b-3 border-b-slate-300/80 border-x border-slate-200/90 shadow-[0_12px_28px_-4px_rgba(9,41,65,0.1),inset_0_1px_0_rgba(255,255,255,1)] p-6 hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <span className="text-xs font-mono font-bold text-purple-900">
                    Division {div.num}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#092941] mb-2">
                  {div.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {div.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Ethos & Values */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#092941] mb-2">
              Our Engineering Ethos
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              How we approach software development, client trust, and long-term partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((val, idx) => (
              <div 
                key={idx}
                className="p-7 rounded-3xl bg-white border-t-2 border-t-white border-b-3 border-b-slate-300 border-x border-slate-200 shadow-[0_12px_28px_-4px_rgba(9,41,65,0.08),inset_0_1px_0_rgba(255,255,255,1)]"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-900 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-purple-200">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#092941] mb-2">
                      {val.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {val.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-white via-slate-50 to-white border-t-2 border-t-white border-b-4 border-b-slate-300 border-x border-slate-200 shadow-[0_16px_35px_-4px_rgba(9,41,65,0.1),inset_0_1px_0_rgba(255,255,255,1)]">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#092941] mb-3">
            Looking for a Long-Term Technology Partner?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-6 leading-relaxed">
            Whether you are assessing a new digital initiative, building custom software, or needing reliable ongoing managed support, let's talk about your requirements.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact">
              <button className="px-6 py-3.5 bg-gradient-to-b from-[#12395b] to-[#092941] hover:from-[#0d2d48] hover:to-[#071f32] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all border-t border-t-white/30 border-b-2 border-b-[#051724] shadow-[0_10px_22px_rgba(9,41,65,0.32),inset_0_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-0.5">
                <span>Discuss Your Requirement</span>
                <ArrowRight size={15} />
              </button>
            </Link>
            <Link to="/services">
              <button className="px-5 py-3.5 bg-white hover:bg-slate-50 text-[#092941] border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs">
                Explore Our Divisions
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default About
