import { useState } from 'react'
import PaymentGateway from '../components/sections/academy/PaymentGateway'
import Hero from '../components/sections/Hero'
import WhatIsAlgoForce from '../components/sections/WhatIsAlgoForce'
import ProductModules from '../components/sections/ProductModules'
import WhyAlgoForce from '../components/sections/WhyAlgoForce'
import ShowcaseVideo from '../components/sections/ShowcaseVideo'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import ImplementationProcess from '../components/sections/ImplementationProcess'
import AssessmentSection from '../components/sections/AssessmentSection'
import EcosystemSection from '../components/sections/EcosystemSection'
import CustomerReviews from '../components/sections/CustomerReviews'
import EnterpriseFaq from '../components/sections/EnterpriseFaq'

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <>
      <div className="overflow-x-hidden animate-moving-gradient">
        <Hero />
        <ShowcaseVideo />
        <WhatIsAlgoForce setActiveCategory={setActiveCategory} />
        <ProductModules activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <WhyChooseUs />
        <ImplementationProcess />
        <AssessmentSection />
        <EcosystemSection />
        <WhyAlgoForce />
        <CustomerReviews />
        <PaymentGateway
          title="AI Software Subscription & Deployment"
          subtitle="Scan the QR code to initiate your Business Assessment, fund product deployment, or activate your monthly software subscription."
        />
        <EnterpriseFaq />
      </div>
    </>
  )
}

export default Home
