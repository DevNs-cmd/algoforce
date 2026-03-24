import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './contexts/AuthContext'

import Navigation from './components/common/Navigation'
import Footer from './components/common/Footer'
import Chatbot from './components/chatbot/Chatbot'
import ConsultancyButton from './components/common/ConsultancyButton'
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

// Conditionally show footer and chatbot (not on AI Builder page)
const AppShell = () => {
  const location = useLocation()
  const isBuilderPage = location.pathname === '/ai-builder'

  return (
    <div className={isBuilderPage ? 'h-screen overflow-hidden' : 'min-h-screen bg-white'}>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/ai-builder" element={<AIBuilder />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!isBuilderPage && <Footer />}
      {!isBuilderPage && <Chatbot />}
      {!isBuilderPage && <ConsultancyButton />}
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
