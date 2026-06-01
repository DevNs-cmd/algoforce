import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useLayoutEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './contexts/AuthContext'
import SeoHead from './components/common/SeoHead'

import Navigation from './components/common/Navigation'
import Footer from './components/common/Footer'
import Chatbot from './components/chatbot/Chatbot'
import ConsultancyButton from './components/common/ConsultancyButton'
import PageVideoBackdrop from './components/common/PageVideoBackdrop'
import SplashScreen from './components/common/SplashScreen'
import useIsMobile from './hooks/useIsMobile'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Labs from './pages/Labs'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import RefundPolicy from './pages/RefundPolicy'
import AIBuilder from './pages/AIBuilder'
import Academy from './pages/Academy'
import Dashboard from './pages/Dashboard'
import Blog from './pages/Blog'
import LanguagePlaceholder from './pages/LanguagePlaceholder'
import Breadcrumbs from './components/common/Breadcrumbs'

import Nexus from './pages/Nexus'
import AICourse from './pages/AICourse'
import AICourseForStudents from './pages/AICourseForStudents'
import BuildAIApp from './pages/BuildAIApp'
import AICertificationIndia from './pages/AICertificationIndia'
import BlogPost from './pages/BlogPost'
import Founder from './pages/Founder'
import Team from './pages/Team'

// Conditionally show footer and chatbot (not on AI Builder or Nexus page)
const AppShell = () => {
  const location = useLocation()
  const isMobileViewport = useIsMobile()
  const isBuilderPage = location.pathname === '/ai-builder'
  const isNexusPage = location.pathname === '/nexus'
  const routesWithOwnSurface = ['/pricing', '/labs', '/founder', '/team', '/contact']
  const hasPageVideoBackdrop =
    !isMobileViewport &&
    !isBuilderPage &&
    !isNexusPage &&
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
    <div className={(isBuilderPage) ? 'h-screen overflow-hidden' : 'relative min-h-screen bg-black isolation-isolate'}>
      {hasPageVideoBackdrop && (
        <div className="fixed inset-0 z-0">
          <PageVideoBackdrop src="/video1.mp4" videoClassName="opacity-[0.16]" />
        </div>
      )}
      <SeoHead path={location.pathname} />
      <SplashScreen />
      <Navigation />
      <div className="relative z-10">
        {!isBuilderPage && !isNexusPage && location.pathname !== '/' && <Breadcrumbs />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/ai-builder" element={<AIBuilder />} />
          <Route path="/nexus" element={<Nexus />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/team" element={<Team />} />
          
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

        {!isBuilderPage && !isNexusPage && <Footer />}
      </div>
      {!isBuilderPage && !isNexusPage && <Chatbot />}
      {!isBuilderPage && !isNexusPage && <ConsultancyButton />}
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <AppShell />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App
