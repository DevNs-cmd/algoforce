import { Helmet } from "react-helmet-async"

import Hero from '../components/sections/Hero'
import WhatIsAlgoForce from '../components/sections/WhatIsAlgoForce'
import HowItWorks from '../components/sections/HowItWorks'
import ProductModules from '../components/sections/ProductModules'
import WhyAlgoForce from '../components/sections/WhyAlgoForce'
import WhoItsFor from '../components/sections/WhoItsFor'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>AlgoForce – AI Business Operating System</title>

        <meta
          name="description"
          content="AlgoForce is an enterprise-grade AI Business Operating System that eliminates revenue leaks and compounds intelligence."
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://algoforceai.netlify.app/"
        />

        {/* Open Graph */}
        <meta property="og:title" content="AlgoForce – AI Business OS" />
        <meta
          property="og:description"
          content="The Operating System for Revenue Intelligence."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://algoforceai.netlify.app/"
        />
      </Helmet>

      <div className="overflow-x-hidden">
        <Hero />
        <WhatIsAlgoForce />
        <HowItWorks />
        <ProductModules />
        <WhyAlgoForce />
        <WhoItsFor />
      </div>
    </>
  )
}

export default Home
