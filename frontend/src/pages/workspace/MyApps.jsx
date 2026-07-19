/**
 * MyApps.jsx — Application Library
 *
 * Full expanded view of all installed applications.
 * Feels like JetBrains Toolbox or Adobe Creative Cloud — not a marketplace.
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOwnedApps } from './useOwnedApps'

function StatusDot({ color }) {
  return (
    <span
      className="inline-block w-2 h-2 rounded-full flex-shrink-0"
      style={{ backgroundColor: color }}
    />
  )
}

function AppRow({ app, onClick }) {
  return (
    <button
      onClick={() => onClick(app.id)}
      className="w-full text-left flex items-start gap-5 px-5 py-5 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-200 focus:outline-none group"
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-base font-bold flex-shrink-0 shadow-sm"
        style={{ backgroundColor: app.color }}
      >
        {app.icon}
      </div>

      {/* Main body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">{app.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{app.category}</p>
          </div>
          {/* Status + launch */}
          <div className="flex items-center gap-3 flex-shrink-0 pt-0.5">
            <div className="flex items-center gap-1.5">
              <StatusDot color={app.color} />
              <span className="text-[11px] font-semibold" style={{ color: app.color }}>
                {app.status}
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-700 transition-colors">
              Open →
            </span>
          </div>
        </div>

        {/* Metrics row */}
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {(app.metrics || []).map(m => (
            <div key={m.label} className="flex items-center gap-1.5">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{m.label}</span>
              <span className="text-xs font-semibold text-slate-700">{m.value}</span>
            </div>
          ))}
        </div>

        {/* Update pill */}
        {app.updateAvailable && (
          <div className="mt-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-100 text-[10px] font-semibold text-amber-600">
              Update available — {app.updateVersion}
            </span>
          </div>
        )}
      </div>
    </button>
  )
}

export default function MyApps() {
  const { apps } = useOwnedApps()
  const navigate = useNavigate()

  return (
    <div className="flex-1 overflow-y-auto bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-8 py-16 space-y-10">

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">My Applications</h1>
          <p className="text-sm text-slate-400">{apps.length} application{apps.length !== 1 ? 's' : ''} provisioned for your organization.</p>
        </div>

        {/* App list */}
        <div className="space-y-3">
          {apps.map(app => (
            <AppRow key={app.id} app={app} onClick={id => navigate(`/workspace/app/${id}`)} />
          ))}
        </div>

      </div>
    </div>
  )
}
