/**
 * CommandCenter.jsx
 * Business-First morning briefing dashboard for the company operating platform.
 */
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { getCommandCenterData } from '../../services/operationsService'

const PRODUCT_LAUNCHERS = [
  { name: 'Aura AI', description: 'Enterprise knowledge and automation workspace', badge: 'Installed' },
  { name: 'LeadBolt', description: 'Sales and revenue operations', badge: 'Active' },
  { name: 'TallyGPT', description: 'Finance and reporting assistant', badge: 'Licensed' },
  { name: 'HotelGPT', description: 'Guest experience and operations', badge: 'Ready' },
  { name: 'FactoryGPT', description: 'Manufacturing operations copilot', badge: 'Ready' },
  { name: 'Corporate Brain', description: 'Company-wide knowledge layer', badge: 'Active' },
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

  const overviewCards = useMemo(() => [
    { label: 'Organization', value: company?.name || 'AlgoForce Technologies', helper: 'Primary account' },
    { label: 'Current Plan', value: 'Enterprise', helper: 'Included products and support' },
    { label: 'Products Activated', value: '6', helper: 'All licensed and available' },
    { label: 'Subscription Status', value: 'Active', helper: 'Renewal on 15 Aug 2026' },
    { label: 'Latest Update', value: 'Aura AI v2.4 released yesterday', helper: 'Available for download' },
    { label: 'Next Billing', value: '15 Aug 2026', helper: 'Auto-renewal enabled' },
  ], [company?.name])

  const updates = data?.recentDocuments?.length || data?.recentGeneratedDocs?.length ? [
    { title: 'Aura AI v2.4 is available', meta: 'Release notes and installers published' },
    { title: 'LeadBolt deployment updated', meta: 'Configuration synced to production' },
  ] : [
    { title: 'No recent updates yet', meta: 'Product release history will appear here as soon as your organization starts using the portal.' },
  ]

  const supportItems = data?.pendingApprovals?.length ? data.pendingApprovals.slice(0, 2).map((item) => ({ title: item.title, meta: item.priority || 'Normal priority' })) : [
    { title: 'No open support tickets', meta: 'Create a support request when you need assistance with a deployment or license.' },
  ]

  const deployments = data?.activeDeployments?.length ? data.activeDeployments.slice(0, 2).map((item) => ({ title: item.name || 'Deployment', meta: item.status || 'Live' })) : [
    { title: 'No active deployments', meta: 'Purchased deployments will appear here with progress and ownership details.' },
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
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div className="rounded-3xl border border-[#06101d]/8 bg-white p-6 shadow-xs">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500">AlgoForce Hub</p>
              <h1 className="text-2xl font-semibold text-[#06101d] mt-1">Good morning, {userDisplayName}.</h1>
              <p className="mt-2 text-sm text-slate-600">Manage every AlgoForce software product you own from one professional customer portal.</p>
            </div>
            <div className="rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] px-4 py-3 text-sm text-slate-600">
              <div className="font-semibold text-[#06101d]">{company?.name || 'AlgoForce Technologies'}</div>
              <div className="mt-1 text-xs">Enterprise account · Active subscription</div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {overviewCards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-[#06101d]/8 bg-white p-4 shadow-xs">
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">{card.label}</p>
              <p className="mt-2 text-lg font-semibold text-[#06101d]">{card.value}</p>
              <p className="mt-1 text-xs text-slate-500">{card.helper}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-[#06101d]/8 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#06101d]">Quick Launch</h2>
              <p className="mt-1 text-sm text-slate-500">Open installed or licensed products directly from the hub.</p>
            </div>
            <Link to="/workspace/products" className="text-sm font-semibold text-[#06101d] hover:underline">View all products</Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {PRODUCT_LAUNCHERS.map((product) => (
              <div key={product.name} className="rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-[#06101d]">{product.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{product.description}</p>
                  </div>
                  <span className="rounded-full border border-[#06101d]/10 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">{product.badge}</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="rounded-full bg-[#06101d] px-3.5 py-2 text-xs font-semibold text-white">Launch</button>
                  <button className="rounded-full border border-[#06101d]/10 px-3.5 py-2 text-xs font-semibold text-slate-600">Documentation</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-3xl border border-[#06101d]/8 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#06101d]">Recent Product Updates</h3>
              <Link to="/workspace/downloads" className="text-xs font-semibold text-slate-600 hover:underline">View downloads</Link>
            </div>
            <div className="mt-4 space-y-3">
              {updates.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] p-3">
                  <p className="text-sm font-semibold text-[#06101d]">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.meta}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#06101d]/8 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#06101d]">Recent Downloads</h3>
              <Link to="/workspace/downloads" className="text-xs font-semibold text-slate-600 hover:underline">Open center</Link>
            </div>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] p-3">
                <p className="text-sm font-semibold text-[#06101d]">Aura AI 2.4.1 Windows Installer</p>
                <p className="mt-1 text-xs text-slate-500">Ready for download · 320 MB</p>
              </div>
              <div className="rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] p-3">
                <p className="text-sm font-semibold text-[#06101d]">LeadBolt macOS package</p>
                <p className="mt-1 text-xs text-slate-500">Latest stable release · 210 MB</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#06101d]/8 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#06101d]">Open Support Tickets</h3>
              <Link to="/workspace/support" className="text-xs font-semibold text-slate-600 hover:underline">Open portal</Link>
            </div>
            <div className="mt-4 space-y-3">
              {supportItems.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] p-3">
                  <p className="text-sm font-semibold text-[#06101d]">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.meta}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#06101d]/8 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#06101d]">Deployment Progress</h3>
            <Link to="/workspace/deployments" className="text-xs font-semibold text-slate-600 hover:underline">See all deployment activity</Link>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {deployments.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] p-3">
                <p className="text-sm font-semibold text-[#06101d]">{item.title}</p>
                <p className="mt-1 text-xs text-slate-500">{item.meta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
