import PaymentGateway from '../components/sections/academy/PaymentGateway'
import Hero from '../components/sections/Hero'
import WhatIsAlgoForce from '../components/sections/WhatIsAlgoForce'
import ProductModules from '../components/sections/ProductModules'
import WhyAlgoForce from '../components/sections/WhyAlgoForce'
import WhoItsFor from '../components/sections/WhoItsFor'
import ShowcaseVideo from '../components/sections/ShowcaseVideo'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import ImplementationProcess from '../components/sections/ImplementationProcess'
import CaseStudies from '../components/sections/CaseStudies'
import CustomerReviews from '../components/sections/CustomerReviews'
import EnterpriseFaq from '../components/sections/EnterpriseFaq'

const Home = () => {
  return (
    <>
      <div className="overflow-x-hidden animate-moving-gradient">
        <Hero />
        <ShowcaseVideo />
        <WhatIsAlgoForce />
        <ProductModules />
        <WhyChooseUs />
        <ImplementationProcess />
        <CaseStudies />
        <CustomerReviews />
        <WhyAlgoForce />
        <WhoItsFor />
        <PaymentGateway
          title="Direct Project & Digital Solution Funding"
          subtitle="Scan the QR code to fund custom AI software engineering, enterprise automation integrations, or consulting programs."
        />
        <EnterpriseFaq />
      </div>
    </>
  )
}

export default Home
