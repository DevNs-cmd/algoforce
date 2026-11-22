import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { GraduationCap, ArrowRight, CheckCircle2, ShieldCheck, Users, Calendar, AlertCircle, FileText, Sparkles } from 'lucide-react'
import SeoHead from '../components/common/SeoHead'

const IndustryEducation = () => {
  return (
    <div className="bg-[#f8fafc] text-slate-900 pt-28 sm:pt-36 pb-24 overflow-hidden">
      <SeoHead 
        title="Education & Institutional Technology Solutions | AlgoForce" 
        description="Unified student portals, automated admission enquiry workflows, fee reconciliations, and academic administration systems for schools, colleges, and universities."
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-t border-t-white border-b-2 border-b-slate-200 border-x border-slate-200 shadow-[0_4px_10px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1)] mb-4">
            <GraduationCap size={15} className="text-[#092941]" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-[#092941]">
              Industry Focus: Education & Campus Networks
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#092941] tracking-tight mb-5">
            Institutional Modernization.{' '}
            <span className="font-serif italic font-normal text-purple-900 block sm:inline">
              From Admission to Alumni.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Educational institutions struggle with fragmented admission enquiries, disconnected student databases, manual fee reconciliations, and slow administrative paperwork. We engineer unified institutional software platforms that streamline the entire campus lifecycle.
          </p>
        </div>

        {/* 3D Elevated Main Content Box */}
        <div className="rounded-3xl bg-gradient-to-b from-white via-white to-slate-50 border-t-2 border-t-white border-b-4 border-b-slate-300/90 border-x border-slate-200/90 shadow-[0_24px_55px_-6px_rgba(9,41,65,0.18),0_12px_24px_-6px_rgba(9,41,65,0.12),0_0_0_1px_rgba(9,41,65,0.06),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_2px_rgba(9,41,65,0.03)] p-7 sm:p-11 mb-12">
          
          {/* Section: Institutional Challenges */}
          <div className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#092941] mb-4 flex items-center gap-2.5">
              <AlertCircle size={22} className="text-rose-600" />
              <span>Core Operational Bottlenecks in Educational Institutions</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { 
                  title: 'Leaked Admission Enquiries', 
                  desc: 'Prospective students and parents reach out via website forms, social ads, and walk-ins. Without automated tracking, counsellor follow-ups are delayed and leads go cold.' 
                },
                { 
                  title: 'Fragmented Fee Reconciliations', 
                  desc: 'Accounts teams spend days matching bank statements, NEFT payments, and offline cash receipts against student ledger accounts in Tally or ERP.' 
                },
                { 
                  title: 'Outdated Student & Parent Portals', 
                  desc: 'Clunky legacy portals lead to high support calls for routine tasks like fee receipts, exam admit cards, attendance logs, and academic updates.' 
                },
                { 
                  title: 'Manual Examination & Grade Publishing', 
                  desc: 'Examination seat planning, attendance verification, marks compilation, and grade card printing involve cumbersome manual paperwork and risk calculation errors.' 
                }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-gradient-to-b from-white to-rose-50/40 border-t border-t-white border-b-2 border-b-rose-100 border-x border-rose-100 shadow-[0_4px_12px_rgba(225,29,72,0.04),inset_0_1px_0_rgba(255,255,255,1)]">
                  <div className="text-sm font-bold text-slate-800 mb-1">{item.title}</div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: AlgoForce Engineered Solutions */}
          <div className="pt-8 border-t border-slate-200 mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#092941] mb-4 flex items-center gap-2.5">
              <CheckCircle2 size={22} className="text-purple-900" />
              <span>How AlgoForce Engineers Campus Systems</span>
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: '1. Intelligent Multi-Channel Admission & CRM Engine',
                  desc: 'Centralize every inbound enquiry from your website, WhatsApp, social channels, and walk-ins into a unified admission pipeline. Automated qualification, counsellor lead assignment, and instant applicant SMS/WhatsApp follow-ups increase conversion by 40%.'
                },
                {
                  title: '2. Unified Student, Parent & Faculty Web/Mobile Portals',
                  desc: 'A modern, responsive, high-speed portal where students check schedules, access course material, view attendance, pay fees in one tap, and download official documents without visiting the administrative office.'
                },
                {
                  title: '3. Automated Fee Gateway Integration & Tally Synchronization',
                  desc: 'Secure payment gateway integration with instant digital receipts, automated installment reminders, and real-time ledger synchronization into Tally or institutional accounting software.'
                },
                {
                  title: '4. Examination, Grading & Academic Transcript Automation',
                  desc: 'Digital examination seat planning, barcode-backed marks entry, automated GPA/grade calculation, and instant digital transcript generation with tamper-proof QR verification.'
                }
              ].map((sol, i) => (
                <div key={i} className="p-5 rounded-2xl bg-gradient-to-b from-white to-purple-50/30 border-t-2 border-t-white border-b-3 border-b-purple-200 border-x border-purple-100 shadow-[0_6px_16px_rgba(107,33,168,0.06),inset_0_1px_0_rgba(255,255,255,1)]">
                  <h3 className="text-sm sm:text-base font-bold text-[#092941] mb-1">
                    {sol.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {sol.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Deployment Standards & Compliance */}
          <div className="pt-8 border-t border-slate-200">
            <h2 className="text-lg font-bold text-[#092941] mb-4 flex items-center gap-2">
              <ShieldCheck size={20} className="text-emerald-700" />
              <span>Security & Deployment Guarantees for Educational Institutions</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="font-bold text-slate-900 block mb-1">Role-Based Access (RBAC)</span>
                Strict permissions separating admin, faculty, finance, student, and parent roles.
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="font-bold text-slate-900 block mb-1">Data Privacy & Sovereignty</span>
                Dedicated cloud or on-premise deployment guaranteeing student data confidentiality.
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="font-bold text-slate-900 block mb-1">99.9% Uptime During Exams</span>
                High-concurrency infrastructure engineered for peak traffic during admissions and exam result days.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom CTA Card */}
        <div className="text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-white via-slate-50 to-white border-t-2 border-t-white border-b-4 border-b-slate-300 border-x border-slate-200 shadow-[0_16px_35px_-4px_rgba(9,41,65,0.1),inset_0_1px_0_rgba(255,255,255,1)]">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#092941] mb-3">
            Ready to Modernize Your Institutional Operations?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-6 leading-relaxed">
            Schedule an architectural consultation with our education technology team. We will review your existing admission, student database, and portal workflows to propose a customized solution.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact?type=education">
              <button className="px-6 py-3.5 bg-gradient-to-b from-[#12395b] to-[#092941] hover:from-[#0d2d48] hover:to-[#071f32] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all border-t border-t-white/30 border-b-2 border-b-[#051724] shadow-[0_10px_22px_rgba(9,41,65,0.32),inset_0_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-0.5">
                <span>Discuss Institutional Requirements</span>
                <ArrowRight size={15} />
              </button>
            </Link>
            <Link to="/services">
              <button className="px-5 py-3.5 bg-white hover:bg-slate-50 text-[#092941] border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs">
                Explore Software Engineering Division
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default IndustryEducation
