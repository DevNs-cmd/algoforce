/**
 * AppDetail.jsx — Individual Application Page
 *
 * Accessed via /workspace/app/:appId
 * Tabs: Overview, Workspace, Settings, Updates, Permissions, Storage, Diagnostics, Support, Logs
 *
 * Design Reference: Apple System Preferences, Linear Issue Detail, Vercel Project Page
 */
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useOwnedApps } from './useOwnedApps'

const TABS = [
  { id: 'overview',     label: 'Overview' },
  { id: 'workspace',    label: 'Workspace' },
  { id: 'updates',      label: 'Updates' },
  { id: 'permissions',  label: 'Permissions' },
  { id: 'storage',      label: 'Storage' },
  { id: 'diagnostics',  label: 'Diagnostics' },
  { id: 'support',      label: 'Support' },
  { id: 'logs',         label: 'Logs' },
]

function MetricCard({ label, value }) {
  return (
    <div className="p-4 rounded-xl border border-slate-100 bg-white">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
      <p className="text-lg font-semibold text-slate-900 mt-1">{value}</p>
    </div>
  )
}

function StatusDot({ color }) {
  return <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
}

/* ─── Tab Panels ────────────────────────────────────────────────── */

function OverviewPanel({ app }) {
  return (
    <div className="space-y-8">
      {/* Status + region */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(app.metrics || []).map(m => (
          <MetricCard key={m.label} label={m.label} value={m.value} />
        ))}
      </div>

      {/* App info */}
      <div className="space-y-3">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Application Info</h3>
        <div className="rounded-2xl border border-slate-100 bg-white divide-y divide-slate-50">
          {[
            { label: 'Version', value: `v${app.version}` },
            { label: 'Status', value: app.status },
            { label: 'Region', value: app.details?.region || '—' },
            { label: 'Environment', value: app.details?.environment || '—' },
            { label: 'Uptime (30d)', value: app.details?.uptime || '—' },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between px-5 py-3">
              <span className="text-xs text-slate-400 font-medium">{row.label}</span>
              <span className="text-xs font-semibold text-slate-800">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WorkspacePanel({ app }) {
  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-500">Your active workspace environment for {app.name}.</p>
      <div className="rounded-2xl border border-slate-100 bg-white divide-y divide-slate-50">
        {[
          { label: 'Workspace ID', value: app.details?.workspace || '—' },
          { label: 'Region', value: app.details?.region || '—' },
          { label: 'Environment', value: app.details?.environment || '—' },
          { label: 'Uptime', value: app.details?.uptime || '—' },
        ].map(row => (
          <div key={row.label} className="flex items-center justify-between px-5 py-3.5">
            <span className="text-xs text-slate-400 font-medium">{row.label}</span>
            <span className="text-xs font-mono font-semibold text-slate-800">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function UpdatesPanel({ app }) {
  if (!app.updateAvailable) {
    return (
      <div className="py-12 text-center space-y-2">
        <p className="text-sm font-semibold text-slate-900">You're up to date</p>
        <p className="text-xs text-slate-400">{app.name} {app.version} is the latest version.</p>
      </div>
    )
  }
  return (
    <div className="space-y-5">
      <div className="p-5 rounded-2xl border border-amber-100 bg-amber-50/40 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">Update Available</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-900">{app.name} {app.updateVersion}</p>
          <p className="text-xs text-slate-500">{app.changelog}</p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-700 transition-colors">
          Install Update
        </button>
      </div>
    </div>
  )
}

function PermissionsPanel({ app }) {
  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-500">Permissions granted to {app.name} in your organization.</p>
      <div className="rounded-2xl border border-slate-100 bg-white divide-y divide-slate-50">
        {(app.details?.permissions || []).map(perm => (
          <div key={perm} className="flex items-center justify-between px-5 py-3.5">
            <span className="text-xs font-mono text-slate-700">{perm}</span>
            <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Granted</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StoragePanel({ app }) {
  const storage = app.details?.storage || '0 GB'
  const raw = parseFloat(storage)
  const max = 10
  const pct = Math.min((raw / max) * 100, 100)

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl border border-slate-100 bg-white space-y-3">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Used</p>
            <p className="text-2xl font-semibold text-slate-900 mt-1">{storage}</p>
          </div>
          <p className="text-xs text-slate-400">{max} GB available</p>
        </div>
        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, backgroundColor: app.color }}
          />
        </div>
      </div>
    </div>
  )
}

function DiagnosticsPanel({ app }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-100 bg-white divide-y divide-slate-50">
        {[
          { label: 'API Health', value: 'Healthy', ok: true },
          { label: 'Database Connection', value: 'Connected', ok: true },
          { label: 'Storage Mount', value: 'Mounted', ok: true },
          { label: 'Last Health Check', value: '1 min ago', ok: true },
        ].map(row => (
          <div key={row.label} className="flex items-center justify-between px-5 py-3.5">
            <span className="text-xs text-slate-500">{row.label}</span>
            <span className={`text-xs font-semibold ${row.ok ? 'text-green-600' : 'text-red-500'}`}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SupportPanel({ app }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { title: 'Open a Ticket', desc: 'Report an issue or request a feature.' },
          { title: 'Live Chat', desc: 'Talk to the AlgoForce support team.' },
          { title: 'Documentation', desc: `${app.name} administrator guide.` },
          { title: 'Status Page', desc: 'Check service availability.' },
        ].map(item => (
          <button
            key={item.title}
            className="p-5 rounded-2xl border border-slate-100 bg-white text-left hover:border-slate-200 hover:shadow-sm transition-all"
          >
            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
            <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

function LogsPanel({ app }) {
  const logs = app.details?.logs || []
  const levelColor = l => l === 'WARN' ? 'text-amber-600' : l === 'ERROR' ? 'text-red-500' : 'text-slate-400'

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-slate-100 bg-white divide-y divide-slate-50 font-mono text-xs overflow-hidden">
        {logs.map((log, i) => (
          <div key={i} className="flex items-start gap-4 px-5 py-3.5">
            <span className="text-slate-400 flex-shrink-0 w-12">{log.time}</span>
            <span className={`flex-shrink-0 w-10 font-bold ${levelColor(log.level)}`}>{log.level}</span>
            <span className="text-slate-600 leading-relaxed">{log.message}</span>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="px-5 py-6 text-center text-slate-400">No logs available.</div>
        )}
      </div>
    </div>
  )
}

/* ─── Main ────────────────────────────────────────────────────────── */

export default function AppDetail() {
  const { appId } = useParams()
  const navigate = useNavigate()
  const { apps } = useOwnedApps()
  const [activeTab, setActiveTab] = useState('overview')

  const app = apps.find(a => a.id === appId)

  if (!app) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
        Application not found.
      </div>
    )
  }

  const renderPanel = () => {
    switch (activeTab) {
      case 'overview':    return <OverviewPanel app={app} />
      case 'workspace':   return <WorkspacePanel app={app} />
      case 'updates':     return <UpdatesPanel app={app} />
      case 'permissions': return <PermissionsPanel app={app} />
      case 'storage':     return <StoragePanel app={app} />
      case 'diagnostics': return <DiagnosticsPanel app={app} />
      case 'support':     return <SupportPanel app={app} />
      case 'logs':        return <LogsPanel app={app} />
      default:            return null
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-8 py-14 space-y-10">

        {/* Back */}
        <button
          onClick={() => navigate('/workspace')}
          className="text-[11px] font-semibold text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1.5 uppercase tracking-wider"
        >
          ← Back
        </button>

        {/* App header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-bold shadow-sm flex-shrink-0"
              style={{ backgroundColor: app.color }}
            >
              {app.icon}
            </div>
            <div className="pt-0.5 space-y-0.5">
              <h1 className="text-xl font-semibold text-slate-900">{app.name}</h1>
              <p className="text-xs text-slate-400">{app.category}</p>
              <div className="flex items-center gap-1.5 pt-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: app.color }} />
                <span className="text-xs font-semibold" style={{ color: app.color }}>{app.status}</span>
              </div>
            </div>
          </div>
          <button className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-700 transition-colors flex-shrink-0">
            Launch
          </button>
        </div>

        {/* Tab nav */}
        <div className="border-b border-slate-100">
          <nav className="flex gap-0 -mb-px overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                {tab.label}
                {tab.id === 'updates' && app.updateAvailable && (
                  <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mb-0.5" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        <div>{renderPanel()}</div>

      </div>
    </div>
  )
}
