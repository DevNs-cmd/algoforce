import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useLayoutEffect, lazy, Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './contexts/AuthContext'
import SeoHead from './components/common/SeoHead'

import Navigation from './components/common/Navigation'
import Footer from './components/common/Footer'
import Chatbot from './components/chatbot/Chatbot'
import ConsultancyButton from './components/common/ConsultancyButton'
import PageVideoBackdrop from './components/common/PageVideoBackdrop'
import SplashScreen from './components/common/SplashScreen'
import WebinarPopup from './components/common/WebinarPopup'
import Breadcrumbs from './components/common/Breadcrumbs'

// ── Eagerly-loaded (above-the-fold, small pages) ──────────────────────────────
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Products from './pages/Products'

// ── Lazily-loaded (large bundles or infrequent pages) ──────────────────────────
const Pricing = lazy(() => import('./pages/Pricing'))
const Labs = lazy(() => import('./pages/Labs'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'))
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'))
const CancellationPolicy = lazy(() => import('./pages/CancellationPolicy'))
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'))
const AiPolicy = lazy(() => import('./pages/AiPolicy'))
const AIBuilder = lazy(() => import('./pages/AIBuilder'))
const Academy = lazy(() => import('./pages/Academy'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Blog = lazy(() => import('./pages/Blog'))
const LanguagePlaceholder = lazy(() => import('./pages/LanguagePlaceholder'))
const Nexus = lazy(() => import('./pages/Nexus'))
const AICourse = lazy(() => import('./pages/AICourse'))
const AICourseForStudents = lazy(() => import('./pages/AICourseForStudents'))
const BuildAIApp = lazy(() => import('./pages/BuildAIApp'))
const AICertificationIndia = lazy(() => import('./pages/AICertificationIndia'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Founder = lazy(() => import('./pages/Founder'))
const Team = lazy(() => import('./pages/Team'))
const WhatIsAlgoForcePage = lazy(() => import('./pages/WhatIsAlgoForce'))
const Crucible = lazy(() => import('./pages/Crucible'))
const Velqora = lazy(() => import('./pages/Velqora'))
const Login = lazy(() => import('./pages/Login'))
const Workspace = lazy(() => import('./pages/Workspace'))
const LabsPortal = lazy(() => import('./pages/LabsPortal'))
const AdminPortal = lazy(() => import('./pages/AdminPortal'))
const ClientPortal = lazy(() => import('./pages/ClientPortal'))

// Minimal full-screen spinner for lazy page transitions
const PageLoader = () => (
  <div className="fixed inset-0 bg-[#03070d] flex items-center justify-center z-50">
    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
  </div>
)


// Conditionally show footer and chatbot (not on Workspace, Admin, or Labs Portal pages)
const AppShell = () => {
  const location = useLocation()
  const isBuilderPage = location.pathname === '/ai-builder'
  const isNexusPage = location.pathname === '/nexus'
  const isWorkspace = location.pathname.startsWith('/workspace')
  const isLabsPortal = location.pathname.startsWith('/labs-portal')
  const isAdminPortal = location.pathname.startsWith('/admin')
  const isLoginPage = location.pathname === '/login'
  const isClientPortal = location.pathname.startsWith('/client')

  const hideMarketingShells = isBuilderPage || isNexusPage || isWorkspace || isLabsPortal || isAdminPortal || isLoginPage || isClientPortal

  const routesWithOwnSurface = ['/pricing', '/labs', '/founder', '/team', '/contact']
  const hasPageVideoBackdrop =
    !hideMarketingShells &&
    location.pathname !== '/' &&
    !routesWithOwnSurface.includes(location.pathname)

  useLayoutEffect(() => {
    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)))
      if (target) {
        requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }))
        return
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname, location.search, location.hash])

  useEffect(() => {
    // Technical SEO: Force Domain Canonicalization (www + https)
    const host = window.location.host
    const protocol = window.location.protocol

    if (process.env.NODE_ENV === 'production') {
      if (host === 'algoforceaii.com' || protocol === 'http:') {
        window.location.replace(`https://www.algoforceaii.com${location.pathname}${location.search}${location.hash}`)
      }
    }
  }, [location])

  useEffect(() => {
    // Apply lazy-loading to images by default to improve LCP/CLS
    const images = document.querySelectorAll('img:not([loading])')
    images.forEach((img) => img.setAttribute('loading', 'lazy'))
  }, [location])

  return (
    <div className={(isBuilderPage || isWorkspace || isLabsPortal || isAdminPortal) ? 'h-screen overflow-hidden' : 'relative min-h-screen bg-black isolation-isolate'}>
      {hasPageVideoBackdrop && (
        <div className="fixed inset-0 z-0">
          <PageVideoBackdrop src="/video1.mp4" videoClassName="opacity-[0.16]" />
        </div>
      )}
      <SeoHead path={location.pathname} />
      <SplashScreen />
      {!hideMarketingShells && <Navigation />}
      <div className="relative z-10">
        {!hideMarketingShells && location.pathname !== '/' && <Breadcrumbs />}

        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/solutions" element={<Products />} />
            <Route path="/services" element={<Products />} />
            <Route path="/ai-consulting" element={<Products />} />
            <Route path="/crucible" element={<Crucible />} />
            <Route path="/velqora" element={<Velqora />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/training" element={<Labs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/cancellation-policy" element={<CancellationPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/ai-policy" element={<AiPolicy />} />
            <Route path="/ai-builder" element={<AIBuilder />} />
            <Route path="/nexus" element={<Nexus />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/founder" element={<Founder />} />
            <Route path="/team" element={<Team />} />
            <Route path="/what-is-algoforce" element={<WhatIsAlgoForcePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/workspace/*" element={<Workspace />} />
            <Route path="/client/*" element={<ClientPortal />} />
            <Route path="/labs-portal/*" element={<LabsPortal />} />
            <Route path="/admin/*" element={<AdminPortal />} />

            {/* SEO Landing Pages */}
            <Route path="/ai-course" element={<AICourse />} />
            <Route path="/ai-course-for-students" element={<AICourseForStudents />} />
            <Route path="/build-ai-app-without-coding" element={<BuildAIApp />} />
            <Route path="/ai-certification-india" element={<AICertificationIndia />} />

            <Route path="/es" element={<LanguagePlaceholder />} />
            <Route path="/fr" element={<LanguagePlaceholder />} />
            <Route path="/de" element={<LanguagePlaceholder />} />
            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>

        {!hideMarketingShells && <Footer />}
      </div>
      {!hideMarketingShells && <Chatbot />}
      {!hideMarketingShells && <ConsultancyButton />}
      {!hideMarketingShells && <WebinarPopup />}
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppShell />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App
