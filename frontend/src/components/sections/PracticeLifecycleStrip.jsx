import { Link } from 'react-router-dom'
import { ShieldCheck, Compass, Code2, Cpu, Layers, Sparkles, ChevronRight } from 'lucide-react'

const PILLARS = [
  { label: 'Technology Consulting', path: '/services#consulting', icon: Compass, tint: 'text-[#2563EB] bg-blue-50 border-blue-100' },
  { label: 'Software Engineering', path: '/services#engineering', icon: Code2, tint: 'text-[#0A2A43] bg-slate-100 border-slate-200' },
  { label: 'AI & Automation', path: '/services#ai-automation', icon: Cpu, tint: 'text-[#9A4DFF] bg-purple-50 border-purple-100' },
  { label: 'Enterprise Solutions', path: '/services#enterprise', icon: Layers, tint: 'text-[#2563EB] bg-blue-50 border-blue-100' },
  { label: 'Managed Services', path: '/services#managed-services', icon: ShieldCheck, tint: 'text-[#0A2A43] bg-slate-100 border-slate-200' },
  { label: 'Products & R&D', path: '/products', icon: Sparkles, tint: 'text-[#9A4DFF] bg-purple-50 border-purple-100' },
]

const PracticeLifecycleStrip = () => {
  return (
    <div className="w-full bg-white py-3 sm:py-4 px-3 sm:px-5 lg:px-7 overflow-x-clip">
      <div className="mx-auto max-w-[1400px] rounded-2xl bg-[#f8f9fb] border border-[#e3e8f0] px-4 sm:px-6 py-3.5 shadow-[0_2px_10px_-4px_rgba(10,42,67,0.05)]">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-3.5 text-xs">
          {/* Left Identity Statement */}
          <div className="flex items-center gap-2.5 text-center xl:text-left">
            <span className="w-6 h-6 rounded-lg bg-white border border-[#e2e8f0] shadow-xs flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={14} className="text-[#0A2A43]" />
            </span>
            <span className="font-medium text-[#0A2A43] tracking-tight">
              Six Technology Practices:{' '}
              <span className="text-[#5a6678] font-normal">
                Plan, build and maintain software
              </span>
            </span>
          </div>

          {/* Interactive Division Dock Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {PILLARS.map((p) => {
              const Icon = p.icon
              return (
                <Link
                  key={p.label}
                  to={p.path}
                  className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] text-[11.5px] font-medium text-[#0A2A43] shadow-[0_2px_6px_-2px_rgba(10,42,67,0.05)] hover:-translate-y-0.5 hover:shadow-[0_6px_14px_-4px_rgba(10,42,67,0.1)] transition-all duration-200"
                >
                  <span className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 ${p.tint}`}>
                    <Icon size={10} strokeWidth={2.2} />
                  </span>
                  <span>{p.label}</span>
                  <ChevronRight size={11} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              )
            })}
          </div>

          {/* Verified MSME Seal */}
          <div className="font-mono text-[10.5px] text-[#5c6878] bg-white px-2.5 py-1 rounded-lg border border-[#e2e8f0] whitespace-nowrap">
            MSME: UDYAM-DL-08-0122150
          </div>
        </div>
      </div>
    </div>
  )
}

export default PracticeLifecycleStrip
