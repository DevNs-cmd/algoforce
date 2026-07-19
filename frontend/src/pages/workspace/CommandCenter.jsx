/**
 * CommandCenter.jsx — Home Screen
 *
 * Design Reference: Apple Business Manager, JetBrains Toolbox, Linear
 *
 * Shows ONLY apps the customer owns, with live operational status.
 * No marketplace. No coming soon. No version badges. No download links.
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useOwnedApps } from './useOwnedApps'

function StatusDot({ color }) {
  return (
    <span
      className="inline-block w-2 h-2 rounded-full flex-shrink-0 ring-2 ring-white"
      style={{ backgroundColor: color }}
    />
  )
}

function AppCard({ app, onClick }) {
  return (
    <button
      onClick={() => onClick(app.id)}
      className="w-full text-left p-6 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-200 group"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* App icon */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm"
            style={{ backgroundColor: app.color }}
          >
            {app.icon}
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-slate-900 leading-tight">{app.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5 font-normal">{app.category}</p>
          </div>
        </div>

        {/* Live status badge */}
        <div className="flex items-center gap-1.5 flex-shrink-0 pt-0.5">
          <StatusDot color={app.color} />
          <span className="text-[11px] font-semibold" style={{ color: app.color }}>
            {app.status}
          </span>
        </div>
      </div>

      {/* Metrics grid */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {(app.metrics || []).map(m => (
          <div key={m.label} className="min-w-0">
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider truncate">{m.label}</p>
            <p className="text-sm font-semibold text-slate-800 mt-0.5">{m.value}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 font-normal">
          {app.details?.region || 'Cloud'}
        </span>
        <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
          Open →
        </span>
      </div>
    </button>
  )
}

export default function CommandCenter() {
  const { userDisplayName, company } = useAuth()
  const navigate = useNavigate()
  const { apps, updates } = useOwnedApps()

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="flex-1 overflow-y-auto bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-8 py-16 space-y-14">

        {/* Welcome Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white text-xs font-bold shadow-sm flex-shrink-0">
              {(company?.name || 'A').charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                {company?.name || 'AlgoForce Workspace'}
              </p>
            </div>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            {greeting}, {userDisplayName}.
          </h1>
          <p className="text-sm text-slate-500 font-normal">
            Your applications are ready.
          </p>
        </div>

        {/* Update nudge — subtle, only if updates exist */}
        {updates.length > 0 && (
          <button
            onClick={() => navigate('/workspace/updates')}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-amber-100 bg-amber-50/50 text-xs text-amber-700 font-medium hover:bg-amber-50 transition-colors text-left"
          >
            <span>
              {updates.length === 1
                ? `${updates[0].name} has an update available — ${updates[0].updateVersion}`
                : `${updates.length} updates available`}
            </span>
            <span className="text-amber-500 font-semibold">Review →</span>
          </button>
        )}

        {/* My Applications */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              My Applications
            </h2>
            <button
              onClick={() => navigate('/workspace/my-apps')}
              className="text-xs font-medium text-slate-400 hover:text-slate-700 transition-colors"
            >
              View all
            </button>
          </div>

          {apps.length === 0 ? (
            <div className="py-16 text-center text-sm text-slate-400">
              No applications provisioned for this organization yet.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {apps.map(app => (
                <AppCard
                  key={app.id}
                  app={app}
                  onClick={id => navigate(`/workspace/app/${id}`)}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
