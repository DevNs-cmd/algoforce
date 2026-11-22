import { Link } from 'react-router-dom'
import { ShieldCheck, ChevronRight } from 'lucide-react'

const PILLARS = [
  { label: 'Technology Consulting', path: '/services#consulting' },
  { label: 'Software Engineering', path: '/services#engineering' },
  { label: 'AI & Automation', path: '/services#ai-automation' },
  { label: 'Enterprise Solutions', path: '/services#enterprise' },
  { label: 'Managed Services', path: '/services#managed-services' },
  { label: 'Proprietary R&D', path: '/products' }
]

const PracticeLifecycleStrip = () => {
  return (
    <div className="w-full bg-[#f8fafc] border-t border-b border-slate-200/90 py-5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-slate-700">
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={16} className="text-[#092941] flex-shrink-0" />
            <span className="font-semibold text-slate-900">
              Full-Lifecycle Delivery: Strategy • Engineering • Integration • Managed Operations
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-slate-800">
            {PILLARS.map((p, i) => (
              <Link 
                key={i} 
                to={p.path} 
                className="hover:text-purple-900 hover:underline transition-colors flex items-center gap-1 font-medium"
              >
                <span>{p.label}</span>
                <ChevronRight size={12} className="text-slate-400" />
              </Link>
            ))}
          </div>

          <div className="font-mono text-[11px] text-slate-500 font-medium">
            MSME: UDYAM-DL-08-0122150
          </div>
        </div>
      </div>
    </div>
  )
}

export default PracticeLifecycleStrip
