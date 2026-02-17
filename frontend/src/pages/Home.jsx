import { Helmet } from "react-helmet-async"

import Hero from '../components/sections/Hero'
import WhatIsAlgoForce from '../components/sections/WhatIsAlgoForce'
import FoundersVision from '../components/sections/FoundersVision'
// import HowItWorks from '../components/sections/HowItWorks'
import ProductModules from '../components/sections/ProductModules'
import WhyAlgoForce from '../components/sections/WhyAlgoForce'
import WhoItsFor from '../components/sections/WhoItsFor'


const Home = () => {
  return (
    <>
      <Helmet>
        <title>AlgoForce – Premium AI Execution Partner</title>

        <meta
          name="description"
          content="AlgoForce is a premium AI execution partner and growth agency. We build high-performance AI automation, SaaS MVPs, and scalable revenue systems for global clients."
        />
        <script type="application/ld+json">
          {`
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AlgoForce",
  "url": "https://www.algoforceaii.com",
  "founder": {
    "@type": "Person",
    "name": "Dev N Suman",
    "url": "www.linkedin.com/in/dev-n-suman-3616a6377"
  }
}
`}
        </script>


        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://www.algoforceaii.com/"
        />

        {/* Open Graph */}
        <meta property="og:title" content="AlgoForce – AI Execution Partner" />
        <meta
          property="og:description"
          content="Premium AI Automation & Digital Growth Agency."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AlgoForce" />
        <meta
          property="og:url"
          content="https://www.algoforceaii.com/"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AlgoForce – AI Execution Partner" />
        <meta
          name="twitter:description"
          content="Premium AI Automation & Digital Growth Agency."
        />
      </Helmet>

      <div className="overflow-x-hidden">
        <Hero />
        <WhatIsAlgoForce />
        <FoundersVision />
        {/* <HowItWorks /> */}
        <ProductModules />
        <WhyAlgoForce />
        <WhoItsFor />
      </div>
    </>
  )
}

export default Home
