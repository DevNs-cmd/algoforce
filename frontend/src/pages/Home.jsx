import PaymentGateway from '../components/sections/academy/PaymentGateway'
import Hero from '../components/sections/Hero'
import WhatIsAlgoForce from '../components/sections/WhatIsAlgoForce'
import ProductModules from '../components/sections/ProductModules'
import WhyAlgoForce from '../components/sections/WhyAlgoForce'
import WhoItsFor from '../components/sections/WhoItsFor'
import ShowcaseVideo from '../components/sections/ShowcaseVideo'

const Home = () => {
  return (
    <>
      <div className="overflow-x-hidden animate-moving-gradient">
        <Hero />
        <ShowcaseVideo />
        <WhatIsAlgoForce />
        <ProductModules />
        <PaymentGateway
          title="Direct Project, Cohort & Event Funding"
          subtitle="Scan the QR code to fund consulting projects, Labs seats, Crucible memberships, or event passes."
        />
        <WhyAlgoForce />
        <WhoItsFor />
      </div>
    </>
  )
}

export default Home
