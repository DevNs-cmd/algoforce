import { Helmet } from "react-helmet-async"

import PaymentGateway from '../components/sections/academy/PaymentGateway'
import Hero from '../components/sections/Hero'
import WhatIsAlgoForce from '../components/sections/WhatIsAlgoForce'
import ProductModules from '../components/sections/ProductModules'
import WhyAlgoForce from '../components/sections/WhyAlgoForce'
import WhoItsFor from '../components/sections/WhoItsFor'


const Home = () => {
  return (
    <>
      <Helmet>
        <title>AlgoForce AI – Custom AI Automation & Growth Partner</title>
        <meta
          name="description"
          content="AlgoForce AI specializes in custom AI automation, SaaS execution, and automated revenue systems. MSME-certified AI agency for high-growth enterprises worldwide."
        />
        <meta name="keywords" content="AI automation services, custom AI development, AI execution partner, business automation AI, SaaS development India, AI consulting 2025" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.algoforceaii.com/#organization",
                  "name": "AlgoForce AI",
                  "url": "https://www.algoforceaii.com",
                  "logo": "https://www.algoforceaii.com/logo.png",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+918448947436",
                    "contactType": "Sales",
                    "areaServed": "Global"
                  },
                  "sameAs": [
                    "https://www.linkedin.com/in/dev-n-suman-3616a6377"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.algoforceaii.com/#website",
                  "url": "https://www.algoforceaii.com",
                  "name": "AlgoForce AI",
                  "description": "Premium AI Execution & Growth Partner",
                  "publisher": { "@id": "https://www.algoforceaii.com/#organization" },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://www.algoforceaii.com/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "AggregateRating",
                  "itemReviewed": {
                    "@type": "Course",
                    "name": "Industrial AI Professional Program"
                  },
                  "ratingValue": "4.9",
                  "bestRating": "5",
                  "reviewCount": "512"
                },
                {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://www.algoforceaii.com"
                    }
                  ]
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What does AlgoForce AI do?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "AlgoForce AI specializes in building high-performance AI automation, custom SaaS product development, and automated revenue systems to help businesses scale efficiently."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Is AlgoForce AI MSME certified?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, AlgoForce AI is a proud MSME-certified AI agency operating worldwide from India, ensuring elite standards in technology and industrial training."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Do you offer custom AI training?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, through our industrial training division, AlgoForce Labs, we provide professional certification and hands-on AI development workshops for students and teams."
                      }
                    }
                  ]
                }
              ]
            }
          `}
        </script>

        <link rel="canonical" href="https://www.algoforceaii.com/" />
        <link rel="alternate" hreflang="en" href="https://www.algoforceaii.com/" />
        <link rel="alternate" hreflang="es" href="https://www.algoforceaii.com/es" />
        <link rel="alternate" hreflang="fr" href="https://www.algoforceaii.com/fr" />
        <link rel="alternate" hreflang="de" href="https://www.algoforceaii.com/de" />
        <link rel="alternate" hreflang="x-default" href="https://www.algoforceaii.com/" />

        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.algoforceaii.com/" />
        <meta property="og:title" content="AlgoForce AI – Premium AI Execution Partner | Automated Systems" />
        <meta property="og:description" content="AlgoForce AI builds custom AI automation, SaaS MVPs, and scalable digital revenue systems for worldwide enterprises." />
        <meta property="og:image" content="https://www.algoforceaii.com/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.algoforceaii.com/" />
        <meta name="twitter:title" content="AlgoForce AI – Premium AI Execution Partner" />
        <meta name="twitter:description" content="AlgoForce AI builds custom AI automation and scalable revenue systems for high-growth companies." />
        <meta name="twitter:image" content="https://www.algoforceaii.com/og-image.png" />
      </Helmet>

      <div className="overflow-x-hidden animate-moving-gradient">
        <Hero />
        <WhatIsAlgoForce />
        <ProductModules />
        <PaymentGateway
          title="Direct Project Funding"
          subtitle="Fund your vision directly. High-speed execution begins the moment you scan."
        />
        <WhyAlgoForce />
        <WhoItsFor />
      </div>
    </>
  )
}

export default Home
