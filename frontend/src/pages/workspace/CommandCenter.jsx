/**
 * CommandCenter.jsx
 * Business-First morning briefing dashboard for the company operating platform.
 */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { getCommandCenterData } from '../../services/operationsService'

const PRODUCT_LAUNCHERS = [
  { name: 'Aura AI', description: 'Knowledge assistant for operators and support teams.', badge: 'Installed', version: '2.4.1', primaryAction: 'Launch', secondaryAction: 'Update', accent: 'from-[#8f38ff]/15 to-[#06101d]/5' },
  { name: 'LeadBolt', description: 'Revenue automation and lead intelligence workspace.', badge: 'Active', version: '1.8.0', primaryAction: 'Launch', secondaryAction: 'Docs', accent: 'from-[#06101d]/10 to-[#8f38ff]/10' },
  { name: 'FactoryGPT', description: 'Manufacturing workflow copilot for plant operations.', badge: 'Ready', version: '3.1.2', primaryAction: 'Install', secondaryAction: 'Download', accent: 'from-[#f7f9fc] to-[#e9e8ff]' },
  { name: 'Corporate Brain', description: 'Company-wide knowledge layer for docs and decisions.', badge: 'Cloud', version: 'Live', primaryAction: 'Open', secondaryAction: 'Configure', accent: 'from-[#06101d]/8 to-[#8f38ff]/10' },
]

const DOWNLOADS = [
  { product: 'Aura AI', platform: 'Windows', version: '2.4.1' },
  { product: 'LeadBolt', platform: 'macOS', version: '1.8.0' },
  { product: 'FactoryGPT', platform: 'Linux', version: '3.1.2' },
  { product: 'Corporate Brain', platform: 'Android', version: 'Latest' },
]

const RELEASES = [
  { date: 'Jul 16', product: 'Aura AI', detail: 'Voice agent release and new desktop workflows' },
  { date: 'Jul 14', product: 'LeadBolt', detail: 'WhatsApp integration and richer automation templates' },
  { date: 'Jul 11', product: 'FactoryGPT', detail: 'Quality AI updates for plant operations' },
]

const RESOURCES = [
  { title: 'Documentation', description: 'Setup guides, admin playbooks and implementation notes.' },
  { title: 'Developer API', description: 'Scoped credentials, endpoints and integration recipes.' },
  { title: 'Prompt Library', description: 'Reusable prompts for support, finance and operations teams.' },
]

const INTEGRATIONS = [
  { name: 'Google Workspace', status: 'Connect' },
  { name: 'Slack', status: 'Connected' },
  { name: 'Tally', status: 'Connected' },
  { name: 'SAP', status: 'Configure' },
]

export default function CommandCenter() {
  const { company, userDisplayName } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    const loadDashboard = async () => {
      setLoading(true)
      try {
        const ccData = await getCommandCenterData(company?.id)
        if (!ignore) setData(ccData || {})
      } catch (error) {
        console.error('Error loading AlgoForce Hub:', error)
        if (!ignore) setData({})
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    if (company?.id) {
      loadDashboard()
    } else {
      setData({})
      setLoading(false)
    }

    return () => { ignore = true }
  }, [company?.id])

  const updates = data?.recentDocuments?.length || data?.recentGeneratedDocs?.length ? [
    { title: 'Aura AI v2.4 is available', meta: 'Release notes and installers published' },
    { title: 'LeadBolt deployment updated', meta: 'Configuration synced to production' },
  ] : [
    { title: 'No recent updates yet', meta: 'Product release history will appear here as soon as your organization starts using the portal.' },
  ]

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#f7f9fc]">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-2 border-[#06101d] border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-xs">Loading AlgoForce Hub...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-[#f7f9fc]">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="rounded-[32px] border border-[#06101d]/10 bg-[#06101d] p-8 text-white shadow-[0_20px_60px_rgba(6,16,29,0.12)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c8a3ff]">AlgoForce Workspace</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">Welcome back, {userDisplayName}.</h1>
              <p className="mt-3 text-sm text-slate-300">Manage, download and launch every AlgoForce product from one secure workspace.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-200">
              <div className="font-semibold text-white">{company?.name || 'Customer account'}</div>
              <div className="mt-1 text-xs text-slate-300">Software access · updates · support</div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-[28px] border border-[#06101d]/8 bg-white p-5 shadow-xs">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#06101d]">Product library</h2>
                <p className="mt-1 text-sm text-slate-500">Launch, install, update and manage every AlgoForce product from one workspace.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#f7f9fc] px-3 py-1.5 text-[11px] font-semibold text-slate-600">4 installed</span>
                <span className="rounded-full bg-[#f7f9fc] px-3 py-1.5 text-[11px] font-semibold text-slate-600">1 ready to install</span>
                <span className="rounded-full bg-[#f7f9fc] px-3 py-1.5 text-[11px] font-semibold text-slate-600">3 updates</span>
              </div>
            </div>

            <div className="mt-5 grid gap-3 lg:grid-cols-2">
              {PRODUCT_LAUNCHERS.map((product) => (
                <div key={product.name} className={`rounded-[24px] border border-[#06101d]/8 bg-gradient-to-br ${product.accent} p-4`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#06101d] text-sm font-semibold text-white">{product.name.charAt(0)}</div>
                      <div>
                        <h3 className="text-base font-semibold text-[#06101d]">{product.name}</h3>
                        <p className="mt-1 text-sm text-slate-600">{product.description}</p>
                      </div>
                    </div>
                    <span className="rounded-full border border-[#06101d]/10 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">{product.badge}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                    <span>{product.version}</span>
                    <span className="font-semibold text-[#06101d]">{product.primaryAction}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="rounded-full bg-[#06101d] px-3.5 py-2 text-xs font-semibold text-white">{product.primaryAction}</button>
                    <button className="rounded-full border border-[#06101d]/10 bg-white/80 px-3.5 py-2 text-xs font-semibold text-slate-600">{product.secondaryAction}</button>
                    <button className="rounded-full border border-[#06101d]/10 bg-white/80 px-3.5 py-2 text-xs font-semibold text-slate-600">Docs</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-[#06101d]/8 bg-white p-5 shadow-xs">
              <h3 className="text-sm font-semibold text-[#06101d]">Quick access</h3>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <Link to="/workspace/licenses" className="flex items-center justify-between rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] px-3 py-3 hover:border-[#8f38ff]/30">Licenses <span className="font-semibold text-[#06101d]">Manage</span></Link>
                <Link to="/workspace/api-keys" className="flex items-center justify-between rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] px-3 py-3 hover:border-[#8f38ff]/30">API Keys <span className="font-semibold text-[#06101d]">Generate</span></Link>
                <Link to="/workspace/integrations" className="flex items-center justify-between rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] px-3 py-3 hover:border-[#8f38ff]/30">Integrations <span className="font-semibold text-[#06101d]">Connect</span></Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#06101d]/8 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#06101d]">Latest releases</h3>
                <Link to="/workspace/downloads" className="text-xs font-semibold text-slate-600 hover:underline">Open releases</Link>
              </div>
              <div className="mt-4 space-y-3">
                {RELEASES.map((release) => (
                  <div key={`${release.product}-${release.date}`} className="rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] p-3">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">{release.date}</p>
                    <p className="mt-1 text-sm font-semibold text-[#06101d]">{release.product}</p>
                    <p className="mt-1 text-xs text-slate-500">{release.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-[#06101d]/8 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#06101d]">Downloads</h3>
              <Link to="/workspace/downloads" className="text-xs font-semibold text-slate-600 hover:underline">Open center</Link>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {DOWNLOADS.map((item) => (
                <div key={`${item.product}-${item.platform}`} className="rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] p-3">
                  <p className="text-sm font-semibold text-[#06101d]">{item.product}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.platform} · {item.version}</p>
                  <button className="mt-3 rounded-full border border-[#06101d]/10 px-3 py-1.5 text-[11px] font-semibold text-[#06101d]">Download</button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-[#06101d]/8 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#06101d]">Resources</h3>
              <Link to="/workspace/documentation" className="text-xs font-semibold text-slate-600 hover:underline">Open docs</Link>
            </div>
            <div className="mt-4 space-y-3">
              {RESOURCES.map((resource) => (
                <div key={resource.title} className="rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] p-3">
                  <p className="text-sm font-semibold text-[#06101d]">{resource.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{resource.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-[#06101d]/8 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#06101d]">Integrations</h3>
              <Link to="/workspace/integrations" className="text-xs font-semibold text-slate-600 hover:underline">View all</Link>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {INTEGRATIONS.map((integration) => (
                <div key={integration.name} className="rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] p-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#06101d]">{integration.name}</span>
                  <span className="text-[11px] font-semibold text-[#8f38ff]">{integration.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-[#06101d]/8 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#06101d]">Support</h3>
              <Link to="/workspace/support" className="text-xs font-semibold text-slate-600 hover:underline">Open portal</Link>
            </div>
            <div className="mt-4 space-y-3">
              {(updates.length ? updates : []).slice(0, 2).map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] p-3">
                  <p className="text-sm font-semibold text-[#06101d]">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.meta}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
