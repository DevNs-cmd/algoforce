/**
 * DiscoverPage.jsx — Upcoming AlgoForce Applications
 *
 * ONLY place where future/coming-soon products appear.
 * Beautiful large cards. Notify Me (no form, no waitlist).
 * Design Reference: Linear changelog, Apple product page rows.
 */
import { useState } from 'react'

const UPCOMING = [
  {
    id: 'factory',
    name: 'FactoryGPT',
    desc: 'Industrial AI for manufacturing operations, production planning, and shop floor intelligence.',
    category: 'Industrial AI',
    expected: 'Q1 2027',
    color: '#dc2626',
  },
  {
    id: 'hotel',
    name: 'HotelGPT',
    desc: 'End-to-end AI platform for hospitality — front desk, revenue management, and guest experience.',
    category: 'Hospitality AI',
    expected: 'Q2 2027',
    color: '#7c3aed',
  },
  {
    id: 'hr',
    name: 'HR Copilot',
    desc: 'Workforce intelligence for HR teams. Hiring, onboarding, performance, and compliance — automated.',
    category: 'HR AI',
    expected: 'Q4 2026',
    color: '#0284c7',
  },
  {
    id: 'leadbolt',
    name: 'LeadBolt',
    desc: 'AI sales assistant. Prospecting, outreach, follow-up, and pipeline management without the CRM chaos.',
    category: 'Sales AI',
    expected: 'Q3 2026',
    color: '#d97706',
  },
  {
    id: 'inventory',
    name: 'Inventory Copilot',
    desc: 'Real-time inventory intelligence across warehouses, stores, and supply chains.',
    category: 'Supply Chain AI',
    expected: 'Q1 2027',
    color: '#059669',
  },
  {
    id: 'gst',
    name: 'GST Autopilot',
    desc: 'Automated GST filing, reconciliation, and compliance for Indian businesses.',
    category: 'Compliance AI',
    expected: 'Q4 2026',
    color: '#0891b2',
  },
  {
    id: 'brain',
    name: 'Corporate Brain',
    desc: 'Organizational knowledge graph. Connect people, documents, decisions, and institutional memory.',
    category: 'Knowledge AI',
    expected: 'Q2 2027',
    color: '#7c3aed',
  },
]

function DiscoverCard({ product }) {
  const [notified, setNotified] = useState(false)

  return (
    <div className="flex items-start justify-between gap-5 py-7 border-b border-slate-50 last:border-0 group">
      <div className="flex items-start gap-5">
        {/* Color accent bar */}
        <div
          className="w-1 h-12 rounded-full flex-shrink-0 mt-1 opacity-70"
          style={{ backgroundColor: product.color }}
        />
        <div className="min-w-0 space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-slate-900">{product.name}</h3>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{product.category}</span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed max-w-md">{product.desc}</p>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pt-1">
            Expected {product.expected}
          </p>
        </div>
      </div>

      <div className="flex-shrink-0 pt-1">
        {notified ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-green-600 bg-green-50 border border-green-100">
            Notified
          </span>
        ) : (
          <button
            onClick={() => setNotified(true)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200"
          >
            Notify Me
          </button>
        )}
      </div>
    </div>
  )
}

export default function DiscoverPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-8 py-16 space-y-12">

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Discover</h1>
          <p className="text-sm text-slate-400 max-w-md">
            Applications in development. Click Notify Me and we'll reach out when they launch.
          </p>
        </div>

        {/* Product list */}
        <div className="space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 pb-2">Upcoming</p>
          <div>
            {UPCOMING.map(product => (
              <DiscoverCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
