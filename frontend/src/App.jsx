import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import Navigation from './components/common/Navigation'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navigation />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            {/* Catch-all route: redirect unknown paths to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App
