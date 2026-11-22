import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Factory, ArrowRight, CheckCircle2, ShieldCheck, Database, Sliders, AlertCircle, FileSpreadsheet } from 'lucide-react'
import SeoHead from '../components/common/SeoHead'

const IndustryManufacturing = () => {
  return (
    <div className="bg-[#f8fafc] text-slate-900 pt-28 sm:pt-36 pb-24 overflow-hidden">
      <SeoHead 
        title="Manufacturing & Distribution Technology Solutions | AlgoForce" 
        description="Operational visibility, shop-floor event capture, Tally/SAP integrations, and automated dispatch workflows for manufacturing and distribution enterprises."
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs mb-4">
            <Factory size={14} className="text-[#092941]" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-[#092941]">
              Industry Focus: Manufacturing & Distribution
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#092941] tracking-tight mb-5">
            Operational Visibility.{' '}
            <span className="font-serif italic font-normal text-purple-900 block sm:inline">
              From Shop-Floor to Ledger.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Manufacturing plants often struggle with disconnected shop-floors, delayed paper logs, and manual ERP reconciliations. We engineer non-invasive software systems that synchronize machinery events, inventory movements, and finance operations in real time.
          </p>
        </div>

        {/* 3D Elevated Main Content Box */}
        <div className="rounded-3xl bg-gradient-to-b from-white via-white to-slate-50/70 border-t-2 border-t-white border-b-2 border-b-slate-300/60 border-x border-slate-200 shadow-[0_25px_60px_rgba(9,41,65,0.12),0_8px_20px_rgba(9,41,65,0.06),0_1px_0_rgba(255,255,255,1)_inset] p-7 sm:p-11 mb-12">
          
          {/* Section: Operational Challenges */}
          <div className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#092941] mb-4 flex items-center gap-2.5">
              <AlertCircle size={22} className="text-rose-600" />
              <span>Core Operational Bottlenecks in Manufacturing</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Delayed Shop-Floor Data', desc: 'Paper-based shift logs mean production totals reach management 24-48 hours late, obscuring machine downtime causes.' },
                { title: 'Stock & Warehouse Discrepancies', desc: 'Raw material consumption and finished goods inventory do not tally automatically between the plant floor and warehouse.' },
                { title: 'Manual Quality Gate Approvals', desc: 'Inspection sign-offs rely on physical signatures, slowing dispatches and creating quality compliance traceability gaps.' },
                { title: 'Delayed ERP / Invoice Entry', desc: 'Accounting teams spend days manually cross-referencing gate passes, bills of lading, and purchase orders against Tally/SAP.' }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-gradient-to-b from-white to-rose-50/20 border border-slate-200 shadow-2xs">
                  <div className="text-sm font-bold text-slate-800 mb-1">{item.title}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: AlgoForce Engineered Solutions */}
          <div className="pt-8 border-t border-slate-200 mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#092941] mb-4 flex items-center gap-2.5">
              <CheckCircle2 size={22} className="text-purple-900" />
              <span>How AlgoForce Solves These Challenges</span>
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: '1. FactoryGPT & Digital Line Event Logging',
                  desc: 'Tablet-based operator interfaces for real-time machine run-time capture, downtime reason tracking, and automated shift handover reports without complex hardware overhauls.'
                },
                {
                  title: '2. Real-Time Tally Prime & ERP Synchronization',
                  desc: 'Non-invasive middleware that pushes production output, raw material deductions, and dispatch notes directly into your existing Tally or SAP installation.'
                },
                {
                  title: '3. Automated Barcode / QR Dispatch & Quality Tracking',
                  desc: 'Digital quality checklists with photo evidence and automated gate pass generation that updates inventory levels the moment a shipment departs.'
                },
                {
                  title: '4. Executive Operational & Yield Dashboards',
                  desc: 'Unified KPI dashboards displayed on desktop and mobile: track OEE (Overall Equipment Effectiveness), scrap rates, and worker productivity live.'
                }
              ].map((sol, i) => (
                <div key={i} className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 transition-transform">
                  <div className="text-sm font-bold text-[#092941] mb-1">{sol.title}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{sol.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-[#092941]">Ready to optimize your plant workflows?</div>
              <p className="text-xs text-slate-600">Schedule an operational walkthrough with our manufacturing systems team.</p>
            </div>
            <Link to="/contact?interest=manufacturing&type=assessment">
              <button className="px-6 py-3 bg-[#092941] hover:bg-[#071f32] text-white rounded-xl text-xs font-semibold whitespace-nowrap transition-all shadow-sm">
                Discuss Manufacturing Requirement →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndustryManufacturing
