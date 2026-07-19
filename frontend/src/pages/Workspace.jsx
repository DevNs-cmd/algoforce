/**
 * Workspace.jsx — Portal Shell
 *
 * Minimal iOS-style sidebar + glass header.
 * Design Reference: Apple Business Manager, Arc Browser, Linear, Vercel
 *
 * Left sidebar sections:
 *   Home · My Apps · Updates · Downloads · Notifications
 *   ──────────────────────────────────────────────────
 *   Support · Billing · Settings · Discover
 *   ──────────────────────────────────────────────────
 *   [org name]
 *   [logout]
 */
import { useState, lazy, Suspense } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useOwnedApps } from './workspace/useOwnedApps'
import {
  SupportPage,
  BillingPage,
  SettingsPage,
  NotificationsPage,
} from './workspace/WorkspacePages'

const CommandCenter  = lazy(() => import('./workspace/CommandCenter'))
const MyApps         = lazy(() => import('./workspace/MyApps'))
const AppDetail      = lazy(() => import('./workspace/AppDetail'))
const UpdatesPage    = lazy(() => import('./workspace/UpdatesPage'))
const DownloadsPage  = lazy(() => import('./workspace/DownloadsPage'))
const DiscoverPage   = lazy(() => import('./workspace/DiscoverPage'))

/* ── Icons (inline SVG, no emoji) ──────────────────────────── */
const Icon = {
  home: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  ),
  apps: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  updates: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-3.37" />
    </svg>
  ),
  downloads: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  bell: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  support: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  billing: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  settings: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  discover: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  logout: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
}

const PRIMARY_NAV = [
  { label: 'Home',          path: '/workspace',               icon: 'home',       exact: true },
  { label: 'My Apps',       path: '/workspace/my-apps',       icon: 'apps' },
  { label: 'Updates',       path: '/workspace/updates',       icon: 'updates',    badge: true },
  { label: 'Downloads',     path: '/workspace/downloads',     icon: 'downloads' },
  { label: 'Notifications', path: '/workspace/notifications', icon: 'bell' },
]

const SECONDARY_NAV = [
  { label: 'Support',  path: '/workspace/support',  icon: 'support' },
  { label: 'Billing',  path: '/workspace/billing',  icon: 'billing' },
  { label: 'Settings', path: '/workspace/settings', icon: 'settings' },
  { label: 'Discover', path: '/workspace/discover', icon: 'discover' },
]

function NavItem({ item, active, updateCount }) {
  return (
    <Link
      to={item.path}
      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-150 ${
        active
          ? 'bg-slate-900 text-white'
          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
      }`}
    >
      <span className={active ? 'text-white' : 'text-slate-400'}>{Icon[item.icon]}</span>
      <span className="flex-1">{item.label}</span>
      {item.badge && updateCount > 0 && (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
          active ? 'bg-white text-slate-900' : 'bg-amber-500 text-white'
        }`}>
          {updateCount}
        </span>
      )}
    </Link>
  )
}

function Sidebar({ onLogout, updates }) {
  const location = useLocation()

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path
    return location.pathname.startsWith(item.path)
  }

  return (
    <aside
      style={{
        width: '220px',
        flexShrink: 0,
        height: '100vh',
        position: 'sticky',
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(0,0,0,0.06)',
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <div className="px-5 pt-6 pb-2 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-[11px] font-black tracking-tight">AF</span>
        </div>
        <span className="text-sm font-bold text-slate-900 tracking-tight">AlgoForce</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pt-6 space-y-0.5 overflow-y-auto">
        {PRIMARY_NAV.map(item => (
          <NavItem key={item.path} item={item} active={isActive(item)} updateCount={updates.length} />
        ))}

        {/* Divider */}
        <div className="my-3 border-t border-slate-100" />

        {SECONDARY_NAV.map(item => (
          <NavItem key={item.path} item={item} active={isActive(item)} updateCount={0} />
        ))}
      </nav>

      {/* Footer — org + logout */}
      <div className="px-3 pb-5 pt-3 border-t border-slate-100 space-y-0.5">
        <div className="px-3 py-2">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest truncate">Organization</p>
          <p className="text-xs font-medium text-slate-700 mt-0.5 truncate">AlgoForce Demo Corp</p>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all duration-150"
        >
          {Icon.logout}
          Log out
        </button>
      </div>
    </aside>
  )
}

function LoadingFallback() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-slate-200 border-t-slate-400 rounded-full animate-spin" />
    </div>
  )
}

export default function Workspace() {
  const { logout: signOut } = useAuth()
  const navigate = useNavigate()
  const { updates } = useOwnedApps()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fff' }}>
      <Sidebar onLogout={handleLogout} updates={updates} />

      {/* Main content */}
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route index                   element={<CommandCenter />} />
            <Route path="my-apps"          element={<MyApps />} />
            <Route path="app/:appId"       element={<AppDetail />} />
            <Route path="updates"          element={<UpdatesPage />} />
            <Route path="downloads"        element={<DownloadsPage />} />
            <Route path="notifications"    element={<NotificationsPage />} />
            <Route path="support"          element={<SupportPage />} />
            <Route path="billing"          element={<BillingPage />} />
            <Route path="settings"         element={<SettingsPage />} />
            <Route path="discover"         element={<DiscoverPage />} />
            {/* Fallback */}
            <Route path="*"               element={<CommandCenter />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}
