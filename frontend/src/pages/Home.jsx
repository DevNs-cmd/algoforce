import Hero from '../components/sections/Hero'
import TheProblem from '../components/sections/TheProblem'
import WhoThisIsFor from '../components/sections/WhoThisIsFor'
import ImplementationProcess from '../components/sections/ImplementationProcess'
import SolutionFamilies from '../components/sections/SolutionFamilies'
import FinanceBeachhead from '../components/sections/FinanceBeachhead'
import LandProveExpand from '../components/sections/LandProveExpand'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import EnterpriseTrust from '../components/sections/EnterpriseTrust'
import AssessmentSection from '../components/sections/AssessmentSection'
import EnterpriseFaq from '../components/sections/EnterpriseFaq'
import FinalCTA from '../components/sections/FinalCTA'

// ORION: Commented out — internal R&D initiative, hidden from commercial user journey.
// Accessible via direct URL /orion for internal review.
// import OrionDiscovery from '../components/sections/OrionDiscovery'

const Home = () => {
  return (
    <div className="overflow-x-hidden animate-moving-gradient">
      {/* 1. HERO — Primary: Book a Workflow Assessment, Secondary: Explore Solutions */}
      <Hero />

      {/* 2. OPERATIONAL GAP — "Your business already has software. The problem is what still happens between the systems." */}
      <TheProblem />

      {/* 3. WHO THIS IS FOR — "Built for teams with expensive operational workflows." */}
      <WhoThisIsFor />

      {/* 4. HOW ALGOFORCE WORKS — 8-step engagement model */}
      <ImplementationProcess />

      {/* 5. SOLUTIONS BY FUNCTION — Featured commercial solution families + Product-Agnostic CTA */}
      <SolutionFamilies featuredOnly={true} />

      {/* 6. FINANCE AI BEACHHEAD — Current commercial beachhead (Tally-connected workflows) */}
      <FinanceBeachhead />

      {/* 7. BUSINESS VALUE & PROOF — Land -> Prove -> Expand commercial relationship model */}
      <LandProveExpand />

      {/* 8. INDUSTRIES & EXISTING STACK FIT */}
      <WhyChooseUs />

      {/* 9. SYSTEM COMPATIBILITY & OPERATIONS — "Built around the way your business already operates." */}
      <EnterpriseTrust />

      {/* 10. WORKFLOW ASSESSMENT — Differentiates Assessment vs Demo + 4-step outputs */}
      <AssessmentSection />

      {/* 11. FAQ — Buyer objections answered */}
      <EnterpriseFaq />

      {/* 12. FINAL CTA — "Have a workflow worth improving?" */}
      <FinalCTA />

      {/* ORION: Preserved in codebase at components/sections/OrionDiscovery.jsx, hidden from commercial flow */}
    </div>
  )
}

export default Home
