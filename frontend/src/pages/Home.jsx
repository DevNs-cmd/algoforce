import Hero from '../components/sections/Hero'
import TheProblem from '../components/sections/TheProblem'
import WhyAlgoForce from '../components/sections/WhyAlgoForce'
import ImplementationProcess from '../components/sections/ImplementationProcess'
import SolutionFamilies from '../components/sections/SolutionFamilies'
import FinanceBeachhead from '../components/sections/FinanceBeachhead'
import LandProveExpand from '../components/sections/LandProveExpand'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import EnterpriseTrust from '../components/sections/EnterpriseTrust'
import AssessmentSection from '../components/sections/AssessmentSection'
import EnterpriseFaq from '../components/sections/EnterpriseFaq'
import FinalCTA from '../components/sections/FinalCTA'

// ORION: Commented out — internal R&D initiative, hidden from commercial user journey per business model.
// Accessible via direct URL /orion for internal review.
// import OrionDiscovery from '../components/sections/OrionDiscovery'

const Home = () => {
  return (
    <div className="overflow-x-hidden animate-moving-gradient">
      {/* 1. HERO — Eyebrow, H1, Subhead, Primary CTA: Book a Workflow Assessment, Secondary: Explore Solutions */}
      <Hero />

      {/* 2. OPERATIONAL GAP — "Your business already has software. The problem is what still happens between the systems." */}
      <TheProblem />

      {/* 3. WHY ALGOFORCE — Qualitative value drivers (no invented ROI %) */}
      <WhyAlgoForce />

      {/* 4. DISCOVER → IMPLEMENT → OPERATE → IMPROVE — 8-step engagement process */}
      <ImplementationProcess />

      {/* 5. SOLUTIONS BY FUNCTION — Featured commercial solution families + View All */}
      <SolutionFamilies featuredOnly={true} />

      {/* 6. FINANCE AI BEACHHEAD — Current commercial beachhead (Tally-connected workflows) */}
      <FinanceBeachhead />

      {/* 7. LAND → PROVE → EXPAND — Start with one workflow, prove value, expand adjacent */}
      <LandProveExpand />

      {/* 8 & 9. INDUSTRIES + EXISTING STACK / INTEGRATIONS — Qualified industry & integration fit */}
      <WhyChooseUs />

      {/* 10. BUSINESS VALUE & DEPLOYMENT CREDIBILITY — Infrastructure & security fit */}
      <EnterpriseTrust />

      {/* 11. WORKFLOW ASSESSMENT — Differentiates Assessment vs Demo + 4-step outputs */}
      <AssessmentSection />

      {/* 12. FAQ — Buyer objections answered */}
      <EnterpriseFaq />

      {/* 13. FINAL CTA — "Have a workflow worth improving?" */}
      <FinalCTA />

      {/* ORION: Preserved in codebase at components/sections/OrionDiscovery.jsx, hidden from commercial flow */}
    </div>
  )
}

export default Home
