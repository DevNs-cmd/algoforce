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
          href="https://algoforceaii.com/"
        />

        {/* Open Graph */}
        <meta property="og:title" content="AlgoForce – AI Business OS" />
        <meta
          property="og:description"
          content="The Operating System for Revenue Intelligence."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AlgoForce AI" />
        <meta
          property="og:url"
          content="https://algoforceaii.com/"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AlgoForce – AI Business Operating System" />
        <meta
          name="twitter:description"
          content="The Operating System for Revenue Intelligence."
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
