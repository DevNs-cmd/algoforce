import Hero from '../components/sections/Hero'
import TheProblem from '../components/sections/TheProblem'
import EnterpriseTrust from '../components/sections/EnterpriseTrust'
import SolutionFamilies from '../components/sections/SolutionFamilies'
import ImplementationProcess from '../components/sections/ImplementationProcess'
import FinanceBeachhead from '../components/sections/FinanceBeachhead'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import WhyAlgoForce from '../components/sections/WhyAlgoForce'
import AssessmentSection from '../components/sections/AssessmentSection'
import EnterpriseFaq from '../components/sections/EnterpriseFaq'
import FinalCTA from '../components/sections/FinalCTA'

// ORION: Commented out — R&D initiative, hidden from commercial homepage per strategic direction.
// Remove comment to restore when AlgoForce is ready to surface ORION commercially.
// import OrionDiscovery from '../components/sections/OrionDiscovery'

// SUMMIT: Commented out as a homepage section — Summit is available via the dismissible banner
// and as a standalone event resource. It should not compete with primary customer acquisition flow.
// import SummitSection from '../components/sections/SummitSection'

const Home = () => {
  return (
    <div className="overflow-x-hidden animate-moving-gradient">
      {/* 1. Hero — What is AlgoForce, for whom, what outcome */}
      <Hero />

      {/* 2. The Problem — The work between the systems */}
      <TheProblem />

      {/* 3. Enterprise Trust — Why AlgoForce is deployable */}
      <EnterpriseTrust />

      {/* 4. Solutions by Business Function — The 6 solution families */}
      <SolutionFamilies />

      {/* 5. How We Work — 8-step engagement model */}
      <ImplementationProcess />

      {/* 6. Finance AI Beachhead — Current commercial product */}
      <FinanceBeachhead />

      {/* 7. Industries + Integrations */}
      <WhyChooseUs />

      {/* 8. Business value framing */}
      <WhyAlgoForce />

      {/* 9. Workflow Assessment CTA */}
      <AssessmentSection />

      {/* 10. FAQ — Buyer objections */}
      <EnterpriseFaq />

      {/* 11. Final CTA — "Have a workflow worth improving?" */}
      <FinalCTA />

      {/* ORION: <OrionDiscovery /> — hidden. Preserved in codebase at components/sections/OrionDiscovery.jsx */}
      {/* SUMMIT: <SummitSection /> — hidden. Summit accessible via marquee banner. */}
    </div>
  )
}

export default Home
