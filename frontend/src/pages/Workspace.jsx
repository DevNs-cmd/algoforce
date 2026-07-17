/**
 * Workspace.jsx
 * Authenticated workspace shell with sidebar navigation.
 * Routes to all operational modules. Clean enterprise SaaS layout.
 */
import { useEffect, useState, useCallback, useRef, lazy, Suspense } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AIChat from './workspace/AIChat'
import { ProductsPage, DownloadsPage, DeploymentsPage, LicensesPage, ApiKeysPage, MarketplacePage, DocumentationPage, OrganizationPage } from './workspace/PortalExperience'

// Lazy load modules
const CommandCenter          = lazy(() => import('./workspace/CommandCenter'))
const Projects               = lazy(() => import('./workspace/Projects'))
const Tasks                  = lazy(() => import('./workspace/Tasks'))
const Approvals              = lazy(() => import('./workspace/Approvals'))
const CRMLite                = lazy(() => import('./workspace/CRMLite'))
const CompanyVault           = lazy(() => import('./workspace/CompanyVault'))
const KnowledgeBase          = lazy(() => import('./workspace/KnowledgeBase'))
const KnowledgeSearch        = lazy(() => import('./workspace/KnowledgeSearch'))
const DocumentAnalyzer       = lazy(() => import('./workspace/DocumentAnalyzer'))
const MeetingNotes           = lazy(() => import('./workspace/MeetingNotes'))
const SOPGenerator           = lazy(() => import('./workspace/SOPGenerator'))
const DocumentGenerator      = lazy(() => import('./workspace/DocumentGenerator'))
const DeployMarketplace      = lazy(() => import('./workspace/DeployMarketplace'))
const BusinessAssessment     = lazy(() => import('./workspace/BusinessAssessment'))
const AutomationRecs         = lazy(() => import('./workspace/AutomationRecommendations'))
const HealthScore            = lazy(() => import('./workspace/HealthScore'))
const Integrations           = lazy(() => import('./workspace/Integrations'))
const Support                = lazy(() => import('./workspace/Support'))
const Billing                = lazy(() => import('./workspace/Billing'))
const Team                   = lazy(() => import('./workspace/Team'))
const ExecutiveReports       = lazy(() => import('./workspace/ExecutiveReports'))
const Timeline               = lazy(() => import('./workspace/Timeline'))
const WorkspaceSettings      = lazy(() => import('./workspace/WorkspaceSettings'))
const Meetings               = lazy(() => import('./workspace/Meetings'))
const ClientPortalInfo       = lazy(() => import('./workspace/ClientPortalInfo'))

const NAV_ITEMS = [
  // WORK
  { path: '/workspace',                 label: 'Home',                     icon: '🏠', group: 'WORK' },
  { path: '/workspace/tasks',           label: 'Tasks',                    icon: '✅', group: 'WORK' },
  { path: '/workspace/approvals',       label: 'Approvals',                icon: '📥', group: 'WORK' },
  { path: '/workspace/meetings',        label: 'Meetings',                 icon: '📅', group: 'WORK' },
  { path: '/workspace/projects',        label: 'Projects',                 icon: '📊', group: 'WORK' },

  // CLIENTS
  { path: '/workspace/crm',             label: 'CRM & Leads',              icon: '🤝', group: 'CLIENTS' },
  { path: '/workspace/client-portal',   label: 'Client Portal',            icon: '👤', group: 'CLIENTS' },
  { path: '/workspace/contracts',       label: 'Contracts',                icon: '📜', group: 'CLIENTS' },

  // FILES & DOCS
  { path: '/workspace/vault',           label: 'Company Files',            icon: '📁', group: 'FILES & DOCS' },
  { path: '/workspace/documents',       label: 'Documents',                icon: '📄', group: 'FILES & DOCS' },
  { path: '/workspace/proposals',       label: 'Proposals',                icon: '📃', group: 'FILES & DOCS' },
  { path: '/workspace/sop',             label: 'SOPs',                     icon: '📋', group: 'FILES & DOCS' },

  // COMPANY
  { path: '/workspace/chat',            label: 'Ask Anything',             icon: '💬', group: 'COMPANY' },
  { path: '/workspace/executive-reports',label: 'Reports',                 icon: '📈', group: 'COMPANY' },
  { path: '/workspace/billing',         label: 'Invoices',                 icon: '🧾', group: 'COMPANY' },
  { path: '/workspace/support',         label: 'Support',                  icon: '🎫', group: 'COMPANY' },
  { path: '/workspace/integrations',    label: 'Integrations',             icon: '🌐', group: 'COMPANY' },
  { path: '/workspace/team',            label: 'Team',                     icon: '👥', group: 'COMPANY' },
  { path: '/workspace/timeline',        label: 'Activity Log',             icon: '⏱️', group: 'COMPANY' },
  { path: '/workspace/settings',        label: 'Settings',                 icon: '⚙️', group: 'COMPANY' },
]

const GROUPS = ['WORK', 'CLIENTS', 'FILES & DOCS', 'COMPANY']

function ModuleLoader() {
  return (
    <div className="flex-1 flex items-center justify-center bg-[#f7f9fc]">
      <div className="flex gap-1.5">
        {[0,1,2].map(i => (
          <div key={i} className="w-2 h-2 bg-[#06101d]/20 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
        ))}
      </div>
    </div>
  )
}

export default function Workspace() {
  const { user, company, loading, isAuthenticated, userDisplayName, userRole, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [showFloatingChat, setShowFloatingChat] = useState(false)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { replace: true })
    }
  }, [loading, isAuthenticated, navigate])

  const [notifications, setNotifications] = useState([])
  const [showNotif, setShowNotif] = useState(false)
  const notifLoadedRef = useRef(false)

  const loadNotifs = useCallback(async () => {
    if (!user?.id) return
    try {
      const { getNotifications } = await import('../services/operationsService')
      const data = await getNotifications(user.id)
      setNotifications(data || [])
    } catch (e) {
      // Silently ignore — notifications are non-critical
    }
  }, [user?.id])

  // Load once when user id is first available
  useEffect(() => {
    if (user?.id && !notifLoadedRef.current) {
      notifLoadedRef.current = true
      loadNotifs()
    }
  }, [user?.id, loadNotifs])

  const markRead = async (id) => {
    try {
      const { markNotificationRead } = await import('../services/operationsService')
      await markNotificationRead(id)
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n))
    } catch (e) {
      console.error(e)
    }
  }

  const unreadCount = notifications.filter(n => !n.is_read).length

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center">
        <div className="text-center">
          <div className="flex gap-1.5 justify-center mb-3">
            {[0,1,2].map(i => (
              <div key={i} className="w-2 h-2 bg-[#06101d]/30 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
            ))}
          </div>
          <p className="text-sm text-slate-400">Loading OS Hub...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) return null

  // Role-based Nav Filtering
  const role = userRole?.toLowerCase()
  const filteredNavItems = NAV_ITEMS.filter(item => {
    if (role === 'owner' || role === 'admin') return true

    if (role === 'viewer') {
      const allowed = ['/workspace', '/workspace/vault', '/workspace/tasks', '/workspace/support']
      return allowed.includes(item.path)
    }

    if (role === 'employee' || !role) {
      const allowed = [
        '/workspace',
        '/workspace/tasks',
        '/workspace/vault',
        '/workspace/documents',
        '/workspace/proposals',
        '/workspace/sop',
        '/workspace/meetings',
        '/workspace/support'
      ]
      return allowed.includes(item.path)
    }

    if (role === 'manager') {
      const allowed = [
        '/workspace',
        '/workspace/tasks',
        '/workspace/vault',
        '/workspace/documents',
        '/workspace/proposals',
        '/workspace/sop',
        '/workspace/meetings',
        '/workspace/support',
        '/workspace/projects',
        '/workspace/approvals',
        '/workspace/crm',
        '/workspace/executive-reports'
      ]
      return allowed.includes(item.path)
    }

    if (role === 'finance') {
      const allowed = [
        '/workspace',
        '/workspace/tasks',
        '/workspace/vault',
        '/workspace/documents',
        '/workspace/proposals',
        '/workspace/sop',
        '/workspace/meetings',
        '/workspace/support',
        '/workspace/billing',
        '/workspace/executive-reports'
      ]
      return allowed.includes(item.path)
    }

    return false
  })

  return (
    <div className="min-h-screen bg-[#f7f9fc] flex flex-col font-sans relative">
      {/* Top Header */}
      <header className="flex-shrink-0 h-14 bg-white border-b border-[#06101d]/10 flex items-center px-4 gap-4 z-45 sticky top-0 shadow-xs">
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <img src="/logo.png" alt="AlgoForce" className="h-5 w-auto object-contain" />
          <span className="text-[10px] font-bold tracking-wider uppercase bg-[#06101d] text-white px-1.5 py-0.5 rounded-md">OS</span>
        </Link>
        <div className="w-px h-5 bg-[#06101d]/15 flex-shrink-0" />
        <span className="text-sm text-slate-500 font-medium truncate">{company?.name || 'AlgoForce Hub'}</span>

        <div className="ml-auto flex items-center gap-4 relative">
          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="p-1.5 text-slate-500 hover:text-[#06101d] transition-colors relative"
            >
              <span className="text-base">🔔</span>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              )}
            </button>

            {/* Dropdown Overlay */}
            {showNotif && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-[#06101d]/10 shadow-xl py-2 z-50 text-xs">
                <div className="px-4 py-2 border-b border-[#06101d]/6 font-bold text-[#06101d] flex justify-between items-center">
                  <span>Notifications</span>
                  {unreadCount > 0 && <span className="text-[10px] bg-orange-50 text-orange-650 px-1.5 py-0.5 rounded-full">{unreadCount} new</span>}
                </div>
                <div className="max-h-60 overflow-y-auto divide-y divide-[#06101d]/6">
                  {notifications.length === 0 ? (
                    <p className="text-center text-slate-400 py-6">No notifications</p>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markRead(n.id)}
                        className={`p-3 cursor-pointer transition-all hover:bg-slate-50 ${!n.is_read ? 'bg-slate-50/60 font-semibold' : ''}`}
                      >
                        <p className="text-[#06101d]">{n.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#06101d] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {userDisplayName.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-[#06101d] hidden sm:block">{userDisplayName}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 56px)' }}>
        {/* Sidebar */}
        <aside className="w-56 flex-shrink-0 bg-white border-r border-[#06101d]/10 flex flex-col overflow-y-auto">
          <div className="flex-1 p-3 space-y-4 pt-4">
            {GROUPS.map((group) => {
              const items = filteredNavItems.filter(n => n.group === group)
              if (items.length === 0) return null
              return (
                <div key={group}>
                  <p className="text-[9px] font-bold uppercase text-slate-400 px-2 mb-1 tracking-wider">{group}</p>
                  <div className="space-y-0.5">
                    {items.map((item) => {
                      const isActive = location.pathname === item.path
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            isActive
                              ? 'bg-[#06101d] text-white'
                              : 'text-slate-600 hover:bg-[#f7f9fc] hover:text-[#06101d]'
                          }`}
                        >
                          <span className="text-sm flex-shrink-0 leading-none">{item.icon}</span>
                          <span className="truncate">{item.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Sidebar Footer */}
          <div className="flex-shrink-0 p-3 border-t border-[#06101d]/8 bg-white">
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:bg-red-50 hover:text-red-650 transition-all"
            >
              <span>↩</span>
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#f7f9fc] overflow-hidden flex flex-col">
          {/* Workspace Routing (default route: CommandCenter) */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <Suspense fallback={<ModuleLoader />}>
              <Routes>
                <Route path="/" element={<CommandCenter />} />
                <Route path="/overview"       element={<CommandCenter />} />
                <Route path="/products"       element={<ProductsPage />} />
                <Route path="/downloads"      element={<DownloadsPage />} />
                <Route path="/deployments"    element={<DeploymentsPage />} />
                <Route path="/licenses"       element={<LicensesPage />} />
                <Route path="/api-keys"       element={<ApiKeysPage />} />
                <Route path="/documentation"  element={<DocumentationPage />} />
                <Route path="/marketplace"    element={<MarketplacePage />} />
                <Route path="/organization"   element={<OrganizationPage />} />
                <Route path="/projects"       element={<Projects />} />
                <Route path="/tasks"          element={<Tasks />} />
                <Route path="/approvals"      element={<Approvals />} />
                <Route path="/crm"            element={<CRMLite />} />
                <Route path="/vault"          element={<CompanyVault />} />
                <Route path="/chat"           element={<AIChat />} />
                <Route path="/meetings"       element={<Meetings />} />
                <Route path="/client-portal"  element={<ClientPortalInfo />} />
                <Route path="/contracts"      element={<CompanyVault category="contract" />} />
                <Route path="/knowledge"      element={<KnowledgeBase />} />
                <Route path="/search"         element={<KnowledgeSearch />} />
                <Route path="/documents"      element={<DocumentAnalyzer />} />
                <Route path="/meeting-notes"  element={<MeetingNotes />} />
                <Route path="/sop"            element={<SOPGenerator />} />
                <Route path="/proposals"      element={<DocumentGenerator />} />
                <Route path="/assessment"     element={<BusinessAssessment />} />
                <Route path="/recommendations" element={<AutomationRecs />} />
                <Route path="/health"         element={<HealthScore />} />
                <Route path="/integrations"   element={<Integrations />} />
                <Route path="/support"        element={<Support />} />
                <Route path="/billing"        element={<Billing />} />
                <Route path="/team"           element={<Team />} />
                <Route path="/executive-reports" element={<ExecutiveReports />} />
                <Route path="/timeline"       element={<Timeline />} />
                <Route path="/settings"       element={<WorkspaceSettings />} />
              </Routes>
            </Suspense>
          </div>
        </main>
      </div>

      {/* Floating Ask Anything AI Helper Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {showFloatingChat && (
          <div className="w-[380px] h-[500px] bg-white rounded-3xl border border-[#06101d]/12 shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-250">
            <div className="px-4 py-3 bg-[#06101d] text-white flex justify-between items-center flex-shrink-0">
              <div>
                <h4 className="font-bold text-xs">Ask Anything</h4>
                <p className="text-[9px] text-slate-455 mt-0.5">AlgoForce Company Assistant</p>
              </div>
              <button
                onClick={() => setShowFloatingChat(false)}
                className="text-xs hover:text-slate-300 p-1"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <AIChat isFloating={true} />
            </div>
          </div>
        )}
        <button
          onClick={() => setShowFloatingChat(!showFloatingChat)}
          className="w-12 h-12 bg-[#06101d] hover:bg-[#142940] text-white rounded-full flex items-center justify-center shadow-xl border border-white/10 transition-all hover:scale-105"
        >
          <span className="text-xl">💬</span>
        </button>
      </div>
    </div>
  )
}
