/**
 * WorkspacePages.jsx
 * Minimal stub pages for Support, Billing, Settings, Notifications
 * within the workspace shell.
 */

/* ── Support ─────────────────────────────────────────────── */
export function SupportPage() {
  const channels = [
    { title: 'Open a Ticket', desc: 'Report a bug or request a feature. Response within 4 hours.' },
    { title: 'Live Chat', desc: 'Available Mon–Fri, 9 am – 6 pm IST.' },
    { title: 'Phone', desc: '+91 98765 43210 · Business hours only.' },
    { title: 'Status Page', desc: 'Check current service availability and incident history.' },
  ]
  return (
    <div className="flex-1 overflow-y-auto bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-8 py-16 space-y-10">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Support</h1>
          <p className="text-sm text-slate-400">We're here to help.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {channels.map(c => (
            <button key={c.title} className="p-5 rounded-2xl border border-slate-100 bg-white text-left hover:border-slate-200 hover:shadow-sm transition-all">
              <p className="text-sm font-semibold text-slate-900">{c.title}</p>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{c.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Billing ─────────────────────────────────────────────── */
export function BillingPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-8 py-16 space-y-10">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Billing</h1>
          <p className="text-sm text-slate-400">Invoices, payment methods, and license details.</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white divide-y divide-slate-50">
          {[
            { label: 'Plan', value: 'Enterprise' },
            { label: 'Billing Cycle', value: 'Annual' },
            { label: 'Next Invoice', value: 'Jan 1, 2027' },
            { label: 'Payment Method', value: '•••• •••• •••• 4242' },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between px-5 py-4">
              <span className="text-xs text-slate-400 font-medium">{row.label}</span>
              <span className="text-xs font-semibold text-slate-800">{row.value}</span>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Invoices</p>
          <div className="rounded-2xl border border-slate-100 bg-white divide-y divide-slate-50">
            {[
              { period: 'Jan 2026 – Dec 2026', amount: '₹6,00,000', status: 'Paid' },
              { period: 'Jan 2025 – Dec 2025', amount: '₹4,80,000', status: 'Paid' },
            ].map(inv => (
              <div key={inv.period} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-xs font-semibold text-slate-800">{inv.period}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{inv.amount}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{inv.status}</span>
                  <button className="text-xs text-slate-400 hover:text-slate-700 font-medium transition-colors">Download</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Settings ────────────────────────────────────────────── */
export function SettingsPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-8 py-16 space-y-10">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Settings</h1>
          <p className="text-sm text-slate-400">Organization, security, and account preferences.</p>
        </div>

        {[
          {
            section: 'Organization',
            rows: [
              { label: 'Organization Name', value: 'AlgoForce Demo Corp' },
              { label: 'Admin Email', value: 'admin@algoforce.in' },
              { label: 'Region', value: 'India (Mumbai)' },
            ],
          },
          {
            section: 'Security',
            rows: [
              { label: 'Two-Factor Auth', value: 'Enabled' },
              { label: 'Session Timeout', value: '8 hours' },
              { label: 'API Keys', value: '3 active' },
            ],
          },
        ].map(group => (
          <div key={group.section} className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{group.section}</p>
            <div className="rounded-2xl border border-slate-100 bg-white divide-y divide-slate-50">
              {group.rows.map(row => (
                <div key={row.label} className="flex items-center justify-between px-5 py-4">
                  <span className="text-xs text-slate-400 font-medium">{row.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-800">{row.value}</span>
                    <button className="text-[11px] text-slate-400 hover:text-slate-700 font-medium transition-colors">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Notifications ───────────────────────────────────────── */
export function NotificationsPage() {
  const items = [
    { title: 'Aura AI Knowledge Sync', desc: 'Sync completed. 3 files updated.', time: '2 min ago', unread: true },
    { title: 'TallyGPT Import', desc: 'Full ledger import finished. 84,912 records.', time: '5 min ago', unread: true },
    { title: 'Update Available', desc: 'Aura AI 2.5.2 is ready to install.', time: '1 hour ago', unread: false },
  ]
  return (
    <div className="flex-1 overflow-y-auto bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-8 py-16 space-y-10">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Notifications</h1>
        <div className="space-y-2">
          {items.map((n, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 p-5 rounded-2xl border transition-all ${
                n.unread ? 'border-slate-200 bg-slate-50/50' : 'border-slate-100 bg-white'
              }`}
            >
              {n.unread && (
                <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0 mt-1.5" />
              )}
              {!n.unread && <span className="w-2 h-2 flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900">{n.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{n.desc}</p>
              </div>
              <span className="text-[10px] text-slate-400 flex-shrink-0 pt-0.5">{n.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
