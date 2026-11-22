import SeoHead from '../components/common/SeoHead'
import Hero from '../components/sections/Hero'
import PracticeLifecycleStrip from '../components/sections/PracticeLifecycleStrip'
import WhoWeWorkWith from '../components/sections/WhoWeWorkWith'
import SixDivisions from '../components/sections/SixDivisions'
import IndustrySolutionsSection from '../components/sections/IndustrySolutionsSection'
import HowWeHelpLifecycle from '../components/sections/HowWeHelpLifecycle'
import SelectedProductsSection from '../components/sections/SelectedProductsSection'
import WhyAlgoForceTrust from '../components/sections/WhyAlgoForceTrust'
import PartnershipEcosystemSection from '../components/sections/PartnershipEcosystemSection'
import FinalRequirementCTA from '../components/sections/FinalRequirementCTA'

const Home = () => {
  return (
    <div className="overflow-x-hidden bg-white text-slate-900">
      <SeoHead path="/" />

      {/* 1. PROFESSIONAL HERO — Brand positioning & background video slider */}
      <Hero />

      {/* TRANSITION STRIP — Full-Lifecycle Delivery & Practice Divisions */}
      <PracticeLifecycleStrip />

      {/* 2. WHO WE WORK WITH — 3 Pathways: Businesses, Educational Institutions, Partners */}
      <WhoWeWorkWith />

      {/* 3. WHAT WE DO — Six Core Technology Divisions under One Brand */}
      <SixDivisions />

      {/* 4. SOLUTIONS BY INDUSTRY — Manufacturing & Distribution, Education & Institutions */}
      <IndustrySolutionsSection />

      {/* 5. HOW WE HELP — 7-Stage Full Engagement Lifecycle */}
      <HowWeHelpLifecycle />

      {/* 6. SELECTED TECHNOLOGY & PRODUCTS — Real verified products & actual readiness */}
      <SelectedProductsSection />

      {/* 7. WHY ALGOFORCE — Delivery rigor, MSME credentials & capabilities */}
      <WhyAlgoForceTrust />

      {/* 8. PARTNERSHIP ECOSYSTEM — White-label, co-delivery, resellers & consultancies */}
      <PartnershipEcosystemSection />

      {/* 9. FINAL CONVERSION SECTION — "Have a Technology Requirement? Let's Work on It." */}
      <FinalRequirementCTA />
    </div>
  )
}

export default Home
