/**
 * DownloadsPage.jsx
 *
 * AlgoForce mobile apps — Android & iOS.
 * Apps are coming soon. Users can join the waitlist per app.
 * All apps are under 100 MB.
 */
import { useState } from 'react'

const APPS = [
  {
    id: 'aura',
    name: 'Aura AI',
    category: 'Knowledge Workspace',
    color: '#6366f1',
    size: '< 80 MB',
    platforms: ['android', 'ios'],
  },
  {
    id: 'tally',
    name: 'TallyGPT',
    category: 'ERP Connector',
    color: '#0891b2',
    size: '< 45 MB',
    platforms: ['android', 'ios'],
  },
]

// SVG icons for platforms
const AndroidIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C7.14 3.07 6 4.61 6 6.5v.5h12v-.5c0-1.89-1.14-3.43-2.47-4.34zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
  </svg>
)

const AppleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
)

function AppCard({ app }) {
  const [waitlist, setWaitlist] = useState({ android: false, ios: false })
  const [email, setEmail] = useState('')
  const [joining, setJoining] = useState(null) // 'android' | 'ios' | null
  const [submitted, setSubmitted] = useState({ android: false, ios: false })

  const handleJoin = async (platform) => {
    setJoining(platform)
  }

  const handleSubmit = (platform) => {
    if (!email.trim()) return
    setSubmitted(prev => ({ ...prev, [platform]: true }))
    setJoining(null)
    setEmail('')
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden">
      {/* App header */}
      <div className="flex items-start gap-4 px-6 pt-6 pb-5">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-base font-bold flex-shrink-0 shadow-sm"
          style={{ backgroundColor: app.color }}
        >
          {app.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <h3 className="text-sm font-semibold text-slate-900">{app.name}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{app.category}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Under {app.size}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-200" />
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded-full">
              Coming Soon
            </span>
          </div>
        </div>
      </div>

      {/* Platform rows */}
      <div className="border-t border-slate-50 divide-y divide-slate-50">
        {/* Android */}
        <div className="px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-slate-500"><AndroidIcon /></span>
            <div>
              <p className="text-xs font-semibold text-slate-800">Android</p>
              <p className="text-[10px] text-slate-400">Google Play Store</p>
            </div>
          </div>
          <div className="flex-shrink-0">
            {submitted.android ? (
              <span className="text-[11px] font-semibold text-green-600 bg-green-50 border border-green-100 px-3 py-1.5 rounded-xl">
                You're on the list
              </span>
            ) : joining === 'android' ? (
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit('android')}
                  placeholder="your@email.com"
                  autoFocus
                  className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 outline-none focus:border-slate-400 w-40 bg-white"
                />
                <button
                  onClick={() => handleSubmit('android')}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-700 transition-colors"
                >
                  Join
                </button>
                <button
                  onClick={() => setJoining(null)}
                  className="text-slate-400 hover:text-slate-600 text-xs transition-colors"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleJoin('android')}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200"
              >
                Join Waitlist
              </button>
            )}
          </div>
        </div>

        {/* iOS */}
        <div className="px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-slate-500"><AppleIcon /></span>
            <div>
              <p className="text-xs font-semibold text-slate-800">iPhone & iPad</p>
              <p className="text-[10px] text-slate-400">Apple App Store</p>
            </div>
          </div>
          <div className="flex-shrink-0">
            {submitted.ios ? (
              <span className="text-[11px] font-semibold text-green-600 bg-green-50 border border-green-100 px-3 py-1.5 rounded-xl">
                You're on the list
              </span>
            ) : joining === 'ios' ? (
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit('ios')}
                  placeholder="your@email.com"
                  autoFocus
                  className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 outline-none focus:border-slate-400 w-40 bg-white"
                />
                <button
                  onClick={() => handleSubmit('ios')}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-700 transition-colors"
                >
                  Join
                </button>
                <button
                  onClick={() => setJoining(null)}
                  className="text-slate-400 hover:text-slate-600 text-xs transition-colors"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleJoin('ios')}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200"
              >
                Join Waitlist
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DownloadsPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-8 py-16 space-y-12">

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Downloads</h1>
          <p className="text-sm text-slate-400">
            Native mobile apps for Android and iOS. Join the waitlist to be notified at launch.
          </p>
        </div>

        {/* Coming soon notice */}
        <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
          <p className="text-xs text-slate-500 leading-relaxed">
            Mobile apps are currently in development. All apps are under 100 MB. 
            Join the waitlist for your platform and we'll notify you the moment they go live.
          </p>
        </div>

        {/* App list */}
        <div className="space-y-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Your Applications</p>
          {APPS.map(app => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>

      </div>
    </div>
  )
}
