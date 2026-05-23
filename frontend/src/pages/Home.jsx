import { Helmet } from "react-helmet-async"

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
      <Helmet>
        <title>AlgoForce AI - Services, Labs and Crucible Ecosystem</title>
        <meta
          name="description"
          content="AlgoForce AI combines AI consulting, AlgoForce Labs education, and Crucible founder incubation into one AI-powered business growth ecosystem."
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="AlgoForce AI, AlgoForce Labs, Crucible, AI consulting India, AI courses, startup incubation, AI automation" />
        <link rel="canonical" href="https://www.algoforceaii.com/" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.algoforceaii.com/" />
        <meta property="og:title" content="AlgoForce AI - AI Services, Labs and Crucible" />
        <meta property="og:description" content="A full-stack AI growth ecosystem for businesses, students, and founders." />
        <meta property="og:image" content="https://www.algoforceaii.com/logo.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.algoforceaii.com/" />
        <meta name="twitter:title" content="AlgoForce AI - Services, Labs and Crucible" />
        <meta name="twitter:description" content="AI consulting, talent creation, and founder incubation under one ecosystem." />
        <meta name="twitter:image" content="https://www.algoforceaii.com/logo.png" />
      </Helmet>

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
