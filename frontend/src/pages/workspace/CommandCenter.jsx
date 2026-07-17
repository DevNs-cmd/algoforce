/**
 * CommandCenter.jsx
 * Redesigned central software workspace for AlgoForce customers.
 * Focuses on software access, installed applications, downloads, updates, and integrations.
 */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { logActivity } from '../../services/activityService'
import { supabase } from '../../services/supabase'

export default function CommandCenter() {
  const { user, company, userDisplayName } = useAuth()

  // Dynamic application list states to allow interactive Install/Update/Launch
  const [apps, setApps] = useState([
    {
      id: 'aura',
      name: 'Aura AI',
      description: 'Knowledge assistant for operators and support teams.',
      status: 'installed',
      version: '2.5',
      updateAvailable: true,
      platform: 'Windows / macOS',
      isCloud: false,
    },
    {
      id: 'leadbolt',
      name: 'LeadBolt',
      description: 'Revenue automation and lead intelligence workspace.',
      status: 'installed',
      version: '4.1',
      updateAvailable: false,
      platform: 'Cloud',
      isCloud: true,
    },
    {
      id: 'tallygpt',
      name: 'TallyGPT',
      description: 'ERP and Tally data connector with automated invoice ingestion.',
      status: 'installed',
      version: '1.2.0',
      updateAvailable: false,
      platform: 'Windows / Linux',
      isCloud: false,
    },
    {
      id: 'corpbrain',
      name: 'Corporate Brain',
      description: 'Centralised knowledge engine, semantic database, and file index.',
      status: 'cloud',
      version: '3.0',
      updateAvailable: false,
      platform: 'Cloud',
      isCloud: true,
    },
    {
      id: 'factorygpt',
      name: 'FactoryGPT',
      description: 'Smart manufacturing quality control and computer vision agent.',
      status: 'not_installed',
      version: '3.0',
      updateAvailable: false,
      platform: 'Linux / Edge',
      isCloud: false,
    },
  ])

  // Dynamic integration states
  const [integrations, setIntegrations] = useState([
    { id: 'google', name: 'Google Workspace', status: 'disconnected', icon: '📧' },
    { id: 'slack', name: 'Slack', status: 'connected', icon: '💬' },
    { id: 'tally', name: 'Tally Prime', status: 'connected', icon: '📊' },
    { id: 'sap', name: 'SAP ERP', status: 'disconnected', icon: '⚙️' },
  ])

  // Interactive action overlays/states
  const [progressState, setProgressState] = useState({}) // { appId: { progress, label } }
  const [activeModalApp, setActiveModalApp] = useState(null)
  const [toastMsg, setToastMsg] = useState('')

  // Show temporary toast message
  const triggerToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 4000)
  }

  // Handle Application Install Simulation
  const handleInstall = (appId) => {
    if (progressState[appId]) return

    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 5
      setProgressState((prev) => ({
        ...prev,
        [appId]: {
          progress: currentProgress,
          label: currentProgress < 40 ? 'Downloading package...' : currentProgress < 80 ? 'Extracting binaries...' : 'Registering license...',
        },
      }));

      if (currentProgress >= 100) {
        clearInterval(interval)
        setProgressState((prev) => {
          const next = { ...prev }
          delete next[appId]
          return next
        });
        setApps((prev) =>
          prev.map((app) => (app.id === appId ? { ...app, status: 'installed' } : app))
        );
        triggerToast(`🎉 ${apps.find(a => a.id === appId).name} installed successfully!`)
        logActivity(company?.id, user?.id, 'deploy', `Installed application: ${appId}`)
      }
    }, 150)
  }

  // Handle Application Update Simulation
  const handleUpdate = (appId) => {
    if (progressState[appId]) return

    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 10
      setProgressState((prev) => ({
        ...prev,
        [appId]: {
          progress: currentProgress,
          label: 'Applying security patches...',
        },
      }))

      if (currentProgress >= 100) {
        clearInterval(interval)
        setProgressState((prev) => {
          const next = { ...prev }
          delete next[appId]
          return next
        })
        setApps((prev) =>
          prev.map((app) =>
            app.id === appId ? { ...app, updateAvailable: false, version: '2.5.1' } : app
          )
        )
        triggerToast(`⚡ Aura AI updated to version 2.5.1!`)
        logActivity(company?.id, user?.id, 'deploy', `Updated application: ${appId}`)
      }
    }, 100)
  }

  // Handle Application Launch Simulation
  const handleLaunch = (app) => {
    setActiveModalApp(app)
    logActivity(company?.id, user?.id, 'search', `Launched application workspace: ${app.name}`)
  }

  // Toggle Integration Status
  const handleToggleIntegration = (id) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = item.status === 'connected' ? 'disconnected' : 'connected'
          triggerToast(`${item.name} is now ${newStatus}!`)
          logActivity(company?.id, user?.id, 'task', `${newStatus === 'connected' ? 'Connected' : 'Disconnected'} integration: ${item.name}`)
          return { ...item, status: newStatus }
        }
        return item
      })
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/50">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 left-6 bg-[#06101d] text-white border border-[#8f38ff]/30 text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-300 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#8f38ff] rounded-full animate-ping" />
          {toastMsg}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Welcome Briefing Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#06101d]/5 pb-6 gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#06101d] tracking-tight">
              Welcome back, {userDisplayName}.
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-lg leading-relaxed">
              Manage, download and launch every AlgoForce product from one secure workspace.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-white border border-[#06101d]/10 rounded-full text-slate-650 shadow-2xs">
              ⚡ Local Node Running
            </span>
          </div>
        </div>

        {/* Continue Working Widget */}
        <div className="relative overflow-hidden rounded-3xl border border-[#8f38ff]/10 bg-white p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#8f38ff]/3 to-transparent pointer-events-none" />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#8f38ff]/5 border border-[#8f38ff]/15 flex items-center justify-center text-xl shadow-3xs">
              🔮
            </div>
            <div>
              <span className="text-[9px] uppercase font-extrabold tracking-widest text-[#8f38ff]">Continue Working</span>
              <h3 className="text-sm font-bold text-[#06101d] mt-0.5">Aura AI Voice Sandbox</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Last opened 2 hours ago · Local development workspace</p>
            </div>
          </div>
          <button
            onClick={() => handleLaunch(apps[0])}
            className="px-4 py-2 bg-[#06101d] hover:bg-[#142940] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex-shrink-0"
          >
            Resume
          </button>
        </div>

        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Left Pane - Apps Library & Downloads */}
          <div className="lg:col-span-2 space-y-8">
            {/* Installed Applications */}
            <div className="space-y-4">
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Applications</h2>
              
              <div className="space-y-3.5">
                {apps.map((app) => {
                  const activeProgress = progressState[app.id]
                  return (
                    <div
                      key={app.id}
                      className="group relative rounded-3xl border border-[#06101d]/6 bg-white p-5 hover:border-[#8f38ff]/25 transition-all shadow-2xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 rounded-2xl bg-[#06101d]/3 border border-[#06101d]/5 flex items-center justify-center text-lg flex-shrink-0">
                            {app.id === 'aura' ? '🔮' : app.id === 'leadbolt' ? '⚡' : app.id === 'tallygpt' ? '📊' : app.id === 'corpbrain' ? '🧠' : '🏭'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm font-bold text-[#06101d]">{app.name}</h3>
                              <span className="text-[9px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">
                                v{app.version}
                              </span>
                              {app.status === 'installed' && (
                                <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200/40">
                                  Installed
                                </span>
                              )}
                              {app.status === 'cloud' && (
                                <span className="text-[9px] font-semibold text-[#8f38ff] bg-[#8f38ff]/5 px-1.5 py-0.5 rounded-md border border-[#8f38ff]/10">
                                  Cloud
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed pr-2">
                              {app.description}
                            </p>
                          </div>
                        </div>

                        {/* Actions buttons */}
                        <div className="flex flex-wrap gap-2 items-center flex-shrink-0 self-end sm:self-start">
                          {activeProgress ? (
                            <div className="w-28 text-right pr-2">
                              <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden mb-1">
                                <div className="h-full bg-[#8f38ff] rounded-full" style={{ width: `${activeProgress.progress}%` }} />
                              </div>
                              <span className="text-[9px] text-slate-400 font-medium block leading-none">{activeProgress.label}</span>
                            </div>
                          ) : (
                            <>
                              {app.status === 'not_installed' ? (
                                <button
                                  onClick={() => handleInstall(app.id)}
                                  className="px-3.5 py-2 bg-[#8f38ff] hover:bg-[#7b29e0] text-white text-xs font-bold rounded-xl transition-all shadow-3xs"
                                >
                                  Install
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleLaunch(app)}
                                  className="px-3.5 py-2 bg-[#06101d] hover:bg-[#142940] text-white text-xs font-bold rounded-xl transition-all shadow-3xs"
                                >
                                  Launch
                                </button>
                              )}

                              {app.updateAvailable && (
                                <button
                                  onClick={() => handleUpdate(app.id)}
                                  className="px-3 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-250 text-amber-700 text-xs font-bold rounded-xl transition-all"
                                >
                                  Update
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      {/* Card Footer Links */}
                      <div className="mt-4 pt-4 border-t border-[#06101d]/4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                        <a href="#/workspace/documentation" className="hover:text-[#8f38ff] transition-all">Documentation</a>
                        <span>·</span>
                        <a href="#/workspace/documentation" className="hover:text-[#8f38ff] transition-all">Release Notes</a>
                        <span>·</span>
                        <a href="#/workspace/support" className="hover:text-[#8f38ff] transition-all">Get Support</a>
                        {app.status === 'installed' && (
                          <>
                            <span>·</span>
                            <span className="text-slate-450">{app.platform}</span>
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Download Center */}
            <div className="space-y-4">
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Download Center</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { os: 'Windows', size: '320 MB', action: 'Download' },
                  { os: 'macOS', size: '210 MB', action: 'Download' },
                  { os: 'Linux', size: '190 MB', action: 'Download' },
                  { os: 'Android APK', size: '42 MB', action: 'Download' },
                  { os: 'iOS App Store', size: 'Link', action: 'Open' },
                  { os: 'CLI Console', size: 'npm i -g algoforce', action: 'Copy' },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-white rounded-2xl border border-[#06101d]/6 shadow-3xs flex flex-col justify-between group hover:border-[#8f38ff]/20 transition-all">
                    <div>
                      <h4 className="text-xs font-bold text-[#06101d]">{item.os}</h4>
                      <p className="text-[9px] text-slate-400 mt-1">{item.size}</p>
                    </div>
                    <button
                      onClick={() => triggerToast(`${item.os} installer file download started.`)}
                      className="w-full mt-4 py-1.5 bg-[#f7f9fc] group-hover:bg-[#06101d] group-hover:text-white text-[10px] font-bold text-slate-600 rounded-lg text-center transition-all"
                    >
                      {item.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Pane - Releases, Quick Settings, Integrations */}
          <div className="space-y-8">
            {/* Quick Workspace Settings */}
            <div className="bg-white p-5 rounded-3xl border border-[#06101d]/6 shadow-2xs space-y-4">
              <h3 className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Workspace Controls</h3>
              
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'API Keys', path: '/workspace/api-keys', icon: '🔑' },
                  { label: 'Integrations', path: '/workspace/integrations', icon: '🌐' },
                  { label: 'Licenses', path: '/workspace/licenses', icon: '📜' },
                  { label: 'Support Center', path: '/workspace/support', icon: '🎫' },
                  { label: 'Invoices', path: '/workspace/billing', icon: '🧾' },
                  { label: 'Organization', path: '/workspace/organization', icon: '👥' },
                ].map((link, i) => (
                  <Link
                    key={i}
                    to={link.path}
                    className="p-3 bg-slate-50/50 hover:bg-[#8f38ff]/5 border border-[#06101d]/4 rounded-2xl flex flex-col items-center justify-center text-center hover:border-[#8f38ff]/20 transition-all gap-1.5"
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="text-[10px] font-bold text-slate-650">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Releases Channel */}
            <div className="bg-white p-5 rounded-3xl border border-[#06101d]/6 shadow-2xs space-y-4">
              <h3 className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Latest Releases</h3>
              
              <div className="space-y-4">
                {[
                  { date: 'July 16', app: 'Aura AI Voice Agent', desc: 'Added support for sub-100ms conversational audio latency.', isNew: true },
                  { date: 'July 14', app: 'LeadBolt WhatsApp Sync', desc: 'Seamless ingestion of WhatsApp lead activities into dashboard.', isNew: true },
                  { date: 'July 11', app: 'FactoryGPT edge package', desc: 'Optimised Docker engine version 3.0 for Jetson Nano hardware.', isNew: false },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 text-xs">
                    <div className="text-right w-14 flex-shrink-0">
                      <p className="font-bold text-[#06101d]">{item.date}</p>
                    </div>
                    <div className="w-px bg-slate-200 self-stretch relative">
                      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#8f38ff]" />
                    </div>
                    <div className="flex-1 pb-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-[#06101d] leading-none">{item.app}</h4>
                        {item.isNew && (
                          <span className="text-[8px] font-extrabold bg-[#8f38ff]/10 text-[#8f38ff] px-1 rounded-sm">NEW</span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-450 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Integrations */}
            <div className="bg-white p-5 rounded-3xl border border-[#06101d]/6 shadow-2xs space-y-4">
              <h3 className="text-xs uppercase font-extrabold tracking-widest text-slate-400">System Integrations</h3>
              
              <div className="divide-y divide-[#06101d]/4">
                {integrations.map((item) => (
                  <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm">{item.icon}</span>
                      <span className="font-semibold text-[#06101d]">{item.name}</span>
                    </div>
                    <button
                      onClick={() => handleToggleIntegration(item.id)}
                      className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all border ${
                        item.status === 'connected'
                          ? 'bg-slate-100 text-slate-650 border-slate-250 hover:bg-red-50 hover:text-red-650 hover:border-red-200'
                          : 'bg-[#8f38ff]/5 border-[#8f38ff]/15 text-[#8f38ff] hover:bg-[#8f38ff]/10'
                      }`}
                    >
                      {item.status === 'connected' ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources list */}
            <div className="bg-white p-5 rounded-3xl border border-[#06101d]/6 shadow-2xs space-y-4">
              <h3 className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Resources</h3>
              
              <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                <a href="#/workspace/documentation" className="p-3 bg-slate-50/50 rounded-xl hover:text-[#8f38ff] hover:bg-[#8f38ff]/5 border border-[#06101d]/4 transition-all">📚 Docs</a>
                <a href="#/workspace/documentation" className="p-3 bg-slate-50/50 rounded-xl hover:text-[#8f38ff] hover:bg-[#8f38ff]/5 border border-[#06101d]/4 transition-all">🔑 Developer API</a>
                <a href="#/workspace/documentation" className="p-3 bg-slate-50/50 rounded-xl hover:text-[#8f38ff] hover:bg-[#8f38ff]/5 border border-[#06101d]/4 transition-all">📹 Videos</a>
                <a href="#/workspace/documentation" className="p-3 bg-slate-50/50 rounded-xl hover:text-[#8f38ff] hover:bg-[#8f38ff]/5 border border-[#06101d]/4 transition-all">📦 SDK packages</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Launch Modal */}
      {activeModalApp && (
        <div className="fixed inset-0 bg-[#06101d]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#06101d]/12 shadow-2xl max-w-lg w-full overflow-hidden p-6 animate-in zoom-in-95 duration-200 space-y-5">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#06101d]/5 flex items-center justify-center text-lg">
                  ⚡
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#06101d]">{activeModalApp.name} Application</h3>
                  <span className="text-[9px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-sm">Version {activeModalApp.version}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveModalApp(null)}
                className="text-slate-450 hover:text-slate-700 text-xs p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600 leading-relaxed">
              <p>
                Connecting to cloud orchestrator node... <span className="text-emerald-600 font-bold">SUCCESS</span>
              </p>
              <p>
                Binding sandbox port and syncing organization preferences... <span className="text-emerald-600 font-bold">READY</span>
              </p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold mt-3">Active Workspace Details</p>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-2.5">
                <div><span className="text-slate-400 font-medium">Domain:</span> <span className="font-bold text-[#06101d]">{company?.name?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'company'}.algoforce.ai</span></div>
                <div><span className="text-slate-400 font-medium">Environment:</span> <span className="font-bold text-[#06101d]">Sandbox</span></div>
                <div><span className="text-slate-400 font-medium">Deployment:</span> <span className="font-bold text-[#06101d]">Local Node</span></div>
                <div><span className="text-slate-400 font-medium">Uptime:</span> <span className="font-bold text-emerald-600">99.9%</span></div>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => setActiveModalApp(null)}
                className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setActiveModalApp(null)
                  triggerToast(`🚀 Launched ${activeModalApp.name} web sandbox environment!`)
                }}
                className="px-4 py-2 bg-[#8f38ff] hover:bg-[#7b29e0] text-white text-xs font-bold rounded-xl transition-all shadow-3xs"
              >
                Open Cloud Console
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
