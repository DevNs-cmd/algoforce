/**
 * UpdatesPage.jsx — Software Updates
 *
 * Design Reference: Apple Software Update, macOS System Preferences
 *
 * Shows available and recent updates. Clean list — no cards, no marketplace.
 */
import { useOwnedApps } from './useOwnedApps'
import { useNavigate } from 'react-router-dom'

function UpdateRow({ app }) {
  return (
    <div className="flex items-start justify-between gap-4 py-5 border-b border-slate-50 last:border-0">
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm"
          style={{ backgroundColor: app.color }}
        >
          {app.icon}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900">{app.name}</p>
          <p className="text-xs text-slate-400 mt-0.5">{app.updateVersion} · Released {app.releaseDate}</p>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-sm">{app.changelog}</p>
        </div>
      </div>
      <button className="flex-shrink-0 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-700 transition-colors">
        Install
      </button>
    </div>
  )
}

export default function UpdatesPage() {
  const { apps } = useOwnedApps()
  const navigate = useNavigate()
  const updates = apps.filter(a => a.updateAvailable)
  const upToDate = apps.filter(a => !a.updateAvailable)

  return (
    <div className="flex-1 overflow-y-auto bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-8 py-16 space-y-12">

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Updates</h1>
          {updates.length === 0 ? (
            <p className="text-sm text-slate-400">All applications are up to date.</p>
          ) : (
            <p className="text-sm text-slate-400">{updates.length} update{updates.length !== 1 ? 's' : ''} available.</p>
          )}
        </div>

        {/* Available updates */}
        {updates.length > 0 && (
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Available</p>
            <div className="rounded-2xl border border-amber-100 bg-amber-50/30 px-5">
              {updates.map(app => (
                <UpdateRow key={app.id} app={app} />
              ))}
            </div>
          </div>
        )}

        {/* Up-to-date apps */}
        {upToDate.length > 0 && (
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Up to Date</p>
            <div className="rounded-2xl border border-slate-100 bg-white px-5">
              {upToDate.map(app => (
                <div
                  key={app.id}
                  className="flex items-center gap-4 py-4 border-b border-slate-50 last:border-0"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: app.color }}
                  >
                    {app.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{app.name}</p>
                    <p className="text-xs text-slate-400">{app.version}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex-shrink-0">
                    Up to date
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
