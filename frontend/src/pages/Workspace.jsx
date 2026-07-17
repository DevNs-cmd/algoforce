/**
 * Workspace.jsx
 * Redesigned central workspace shell for AlgoForce.
 * Features an iOS-style permanent left sidebar without emojis, a top header Help link that opens the ChatGPT-style right drawer.
 */
import { useEffect, useState, useCallback, useRef, lazy, Suspense } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AIChat from './workspace/AIChat'
import { ProductsPage, DownloadsPage, LicensesPage, DocumentationPage, ReleaseNotesPage, IntegrationsPage, SupportPage, BillingPage, DevelopersPage, CommunityPage, SettingsPage } from './workspace/PortalExperience'

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
const BusinessAssessment     = lazy(() => import('./workspace/BusinessAssessment'))
const AutomationRecs         = lazy(() => import('./workspace/AutomationRecommendations'))
const HealthScore            = lazy(() => import('./workspace/HealthScore'))
const Team                   = lazy(() => import('./workspace/Team'))
const ExecutiveReports       = lazy(() => import('./workspace/ExecutiveReports'))
const Timeline               = lazy(() => import('./workspace/Timeline'))
const WorkspaceSettings      = lazy(() => import('./workspace/WorkspaceSettings'))
const Meetings               = lazy(() => import('./workspace/Meetings'))
const ClientPortalInfo       = lazy(() => import('./workspace/ClientPortalInfo'))

const NAV_ITEMS = [
  {
    path: '/workspace',
    label: 'Home',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21H18.375c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    path: '/workspace/products',
    label: 'Products',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h14.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    ),
  },
  {
    path: '/workspace/downloads',
    label: 'Downloads',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
  },
  {
    path: '/workspace/licenses',
    label: 'Licenses',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
  },
  {
    path: '/workspace/documentation',
    label: 'Documentation',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    path: '/workspace/release-notes',
    label: 'Release Notes',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    path: '/workspace/integrations',
    label: 'Integrations',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253" />
      </svg>
    ),
  },
  {
    path: '/workspace/support',
    label: 'Support',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 21l8.97-8.97M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
      </svg>
    ),
  },
  {
    path: '/workspace/billing',
    label: 'Billing',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
      </svg>
    ),
  },
  {
    path: '/workspace/developers',
    label: 'Developers',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
  {
    path: '/workspace/community',
    label: 'Community',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m0 0a5.971 5.971 0 0 0-.08-.83 5.002 5.002 0 0 0-9.7 0 5.97 5.97 0 0 0-.08.83m1.94 0-.001.031c0 .225.012.447.037.666A11.944 11.944 0 0 0 12 21c2.17 0 4.207-.576 5.963-1.584A6.06 6.06 0 0 0 18 18.72m-12 0a5.99 5.99 0 0 1 2.378-4.718A5.99 5.99 0 0 1 12 12.75a5.99 5.99 0 0 1 3.622 1.252A5.99 5.99 0 0 1 18 18.72m-12 0a6.002 6.002 0 0 0 12 0M12 9.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" />
      </svg>
    ),
  },
  {
    path: '/workspace/settings',
    label: 'Settings',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.936 6.936 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
]

function ModuleLoader() {
  return (
    <div className="flex-1 flex items-center justify-center bg-white">
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
        ))}
      </div>
    </div>
  )
}

export default function Workspace() {
  const { user, company, loading, isAuthenticated, userDisplayName, userRole, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [showRightSidebar, setShowRightSidebar] = useState(false)

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
      // Silently ignore
    }
  }, [user?.id])

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
      <div className="min-h-screen bg-white flex items-center justify-center text-xs text-slate-400">
        Syncing AlgoForce workspace...
      </div>
    )
  }

  if (!isAuthenticated) return null

  // All roles share access to the consolidated pages list
  const filteredNavItems = NAV_ITEMS

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative selection:bg-slate-100 selection:text-slate-900">
      {/* Top Header Navigation */}
      <header className="flex-shrink-0 h-14 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center px-6 gap-4 z-40 sticky top-0">
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-xs font-semibold text-white shadow-xs">A</div>
          <div className="leading-none">
            <div className="text-xs font-bold tracking-tight text-slate-900">AlgoForce</div>
            <div className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#8f38ff]">Workspace</div>
          </div>
        </Link>
        <div className="w-px h-4 bg-slate-100 flex-shrink-0" />
        <span className="text-xs text-slate-500 font-medium truncate">{company?.name || 'Workspace'}</span>

        <div className="ml-auto flex items-center gap-5 relative text-xs font-medium">
          {/* Help Link (Toggles right chat drawer) */}
          <button
            onClick={() => setShowRightSidebar(!showRightSidebar)}
            className="text-slate-500 hover:text-slate-900 transition-colors font-medium"
          >
            Help
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="p-1 text-slate-400 hover:text-slate-900 transition-colors relative"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-600 rounded-full" />
              )}
            </button>

            {/* Dropdown Overlay */}
            {showNotif && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl border border-slate-100 shadow-xl py-2 z-50 text-[11px] font-normal leading-normal text-slate-650">
                <div className="px-4 py-2 border-b border-slate-100 font-semibold text-slate-900 flex justify-between items-center">
                  <span>Notifications</span>
                  {unreadCount > 0 && <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full">{unreadCount} new</span>}
                </div>
                <div className="max-h-60 overflow-y-auto divide-y divide-slate-50">
                  {notifications.length === 0 ? (
                    <p className="text-center text-slate-400 py-6">No notifications</p>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markRead(n.id)}
                        className={`p-3 cursor-pointer transition-all hover:bg-slate-50 ${!n.is_read ? 'bg-slate-50/50 font-medium text-slate-900' : ''}`}
                      >
                        <p className="font-semibold">{n.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace Layout Wrapper */}
      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 56px)' }}>
        {/* iOS style left sidebar */}
        <aside className="w-52 flex-shrink-0 bg-white border-r border-slate-100 flex flex-col justify-between overflow-y-auto">
          <div className="p-4 space-y-2.5">
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400 px-2.5">Workspace</p>
            <div className="space-y-0.5">
              {filteredNavItems.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-slate-100 text-slate-900 font-semibold shadow-3xs'
                        : 'text-slate-500 hover:bg-slate-50/80 hover:text-slate-800'
                    }`}
                  >
                    <span className="text-slate-400 group-hover:text-slate-700 flex-shrink-0">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Profile & Logout Footer */}
          <div className="p-4 border-t border-slate-50 space-y-3">
            <div className="flex items-center gap-3 px-1">
              <div className="w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-bold shadow-3xs">
                {userDisplayName.charAt(0).toUpperCase()}
              </div>
              <div className="leading-none min-w-0">
                <p className="text-xs font-semibold text-slate-900 truncate">{userDisplayName}</p>
                <p className="text-[9px] text-slate-400 truncate mt-0.5">Primary Member</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-450 hover:bg-red-50 hover:text-red-700 transition-all border border-transparent hover:border-red-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Workspace Routing */}
        <main className="flex-1 bg-white overflow-hidden flex flex-col">
          <div className="flex-1 overflow-hidden flex flex-col">
            <Suspense fallback={<ModuleLoader />}>
              <Routes>
                <Route path="/" element={<CommandCenter />} />
                <Route path="/overview"       element={<CommandCenter />} />
                <Route path="/products"       element={<ProductsPage />} />
                <Route path="/downloads"      element={<DownloadsPage />} />
                <Route path="/deployments"    element={<DeploymentsPage />} />
                <Route path="/licenses"       element={<LicensesPage />} />
                <Route path="/documentation"  element={<DocumentationPage />} />
                <Route path="/release-notes"  element={<ReleaseNotesPage />} />
                <Route path="/integrations"   element={<IntegrationsPage />} />
                <Route path="/support"        element={<SupportPage />} />
                <Route path="/billing"        element={<BillingPage />} />
                <Route path="/developers"     element={<DevelopersPage />} />
                <Route path="/community"      element={<CommunityPage />} />
                <Route path="/settings"       element={<SettingsPage />} />
                
                {/* Legacy / Compatibility Fallbacks */}
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
                <Route path="/team"           element={<Team />} />
                <Route path="/executive-reports" element={<ExecutiveReports />} />
                <Route path="/timeline"       element={<Timeline />} />
              </Routes>
            </Suspense>
          </div>
        </main>

        {/* Collapsible right chat drawer styled exactly like ChatGPT */}
        {showRightSidebar && (
          <aside className="w-80 flex-shrink-0 bg-white border-l border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center flex-shrink-0 text-xs font-semibold text-slate-800">
              <span>AlgoForce Assistant</span>
              <button
                onClick={() => setShowRightSidebar(false)}
                className="text-slate-400 hover:text-slate-800 text-[10px]"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <AIChat isFloating={true} />
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
