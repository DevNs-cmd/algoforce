import { useState } from 'react'
import Hero from '../components/sections/Hero'
import BrandFilmSection from '../components/sections/BrandFilmSection'
import EnterpriseTrust from '../components/sections/EnterpriseTrust'
import WhatIsAlgoForce from '../components/sections/WhatIsAlgoForce'
import ProductModules from '../components/sections/ProductModules'
import ImplementationProcess from '../components/sections/ImplementationProcess'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import WhyAlgoForce from '../components/sections/WhyAlgoForce'
import AssessmentSection from '../components/sections/AssessmentSection'
import EnterpriseFaq from '../components/sections/EnterpriseFaq'
import OrionDiscovery from '../components/sections/OrionDiscovery'
import GoogleReviewCTA from '../components/sections/GoogleReviewCTA'

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <div className="overflow-x-hidden animate-moving-gradient">
      <Hero />
      <BrandFilmSection />
      <EnterpriseTrust />
      <WhatIsAlgoForce setActiveCategory={setActiveCategory} />
      <OrionDiscovery />
      <ProductModules activeCategory={activeCategory} setActiveCategory={setActiveCategory} featuredOnly />
      <ImplementationProcess />
      <WhyChooseUs />
      <WhyAlgoForce />
      <AssessmentSection />
      <EnterpriseFaq />
      <GoogleReviewCTA />
    </div>
  )
}

export default Home
