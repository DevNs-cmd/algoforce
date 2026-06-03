const siteUrl = "https://www.algoforceaii.com";
const siteName = "AlgoForce AI";
const ogImage = `${siteUrl}/logo.png`;

const coreKeywords = [
  "AlgoForce AI",
  "AlgoForce Labs",
  "Crucible startup OS",
  "Velqora entertainment OS",
  "execution infrastructure ecosystem",
  "business execution infrastructure",
  "execution infrastructure India",
  "AI ecosystem India",
  "no-code app builder India",
  "build AI app without coding India",
  "AI startup India",
  "AI consulting New Delhi",
  "MSME AI services India",
  "AI consulting India",
  "enterprise AI systems India",
  "workflow automation for SMEs",
  "digital transformation company India",
  "custom AI development India",
  "AI automation for startups India",
  "business AI integration India",
  "AI course for beginners India",
  "AI certification India",
  "no-code AI course India",
  "programming courses Delhi",
  "AI training for students India",
  "tech bootcamp India",
  "AI projects for students",
  "machine learning course India 2026",
  "best AI course India",
  "startup operating system India",
  "tools for startup founders India",
  "startup execution platform",
  "MVP to Series A platform India",
  "founder productivity tools India",
  "startup management software India",
  "artist booking platform India",
  "performer management software India",
  "live entertainment platform India",
  "event organizer tools India",
  "artist management app India",
  "Dev N Suman",
];

const pageKeywords = {
  home: [
    "best AI agency in India",
    "India execution infrastructure ecosystem",
    "AI digital transformation ecosystem",
    "enterprise AI digital transformation",
    "AI services for startups",
    "AI solutions for small business",
    "business automation company",
    "digital growth ecosystem",
    "AI powered marketing automation",
    "AI consulting for SMEs",
    "AI product engineering",
    "founder incubation India",
  ],
  marketing: [
    "marketing agency",
    "digital marketing agency",
    "AI marketing agency",
    "B2B marketing agency India",
    "brand strategy agency",
    "online marketing services",
    "paid ads agency",
    "Google Ads agency",
    "Meta Ads agency",
    "marketing automation services",
    "conversion rate optimization",
    "landing page optimization",
    "sales funnel automation",
    "LinkedIn marketing agency",
    "YouTube marketing strategy",
    "content and SEO agency",
  ],
  academy: [
    "AI bootcamp India",
    "learn AI in India",
    "AI training program",
    "AI workshops India",
    "prompt engineering course",
    "generative AI course",
    "machine learning course India",
    "AI projects for students",
    "MSME registered AI certificate",
    "Growth and Digital Marketing course",
    "AI Business Analyst course",
    "Full-Stack Product Engineering course",
    "corporate AI transformation training",
    "Talent as a Service India",
    "sponsored corporate cohorts",
  ],
  builder: [
    "build AI app without coding",
    "custom GPT builder",
    "AI agent builder",
    "RAG chatbot builder",
    "business chatbot builder",
    "no-code MVP builder",
    "AI workflow builder",
  ],
  enterprise: [
    "enterprise AI consulting",
    "AI transformation consulting",
    "AI product development services",
    "SaaS platform subscriptions",
    "enterprise consulting retainers",
    "managed AI services India",
    "API licensing AI",
    "white label AI platform",
    "BFSI AI solutions",
    "manufacturing AI solutions",
    "healthcare AI automation",
    "ecommerce AI automation",
    "logistics AI automation",
    "real estate AI solutions",
    "CTO AI advisory",
    "COO AI automation",
    "AI ROI audit",
    "digital transformation roadmap",
  ],
  startups: [
    "Crucible OS",
    "operating system for startups",
    "startup execution platform",
    "venture workspace",
    "startup sprint tracking",
    "startup OKR tracking",
    "Venture Health Score",
    "startup idea validation",
    "MVP product build",
    "fundraising readiness tools",
    "investor pipeline CRM",
    "startup data room",
    "founder community India",
    "venture studio build",
    "service for equity startup",
  ],
  entertainment: [
    "Velqora",
    "operating system for performers",
    "live entertainment platform India",
    "artist booking platform",
    "event organizer tools",
    "performer management software",
    "artist career dashboard",
    "band workspace",
    "event booking automation",
    "artist contract management",
    "entertainment SaaS India",
    "live event management software",
  ],
  local: [
    "AI company Patna",
    "AI agency Bihar",
    "AI startup India",
    "digital marketing agency Patna",
    "software development company India",
  ],
};

const combineKeywords = (...groups) =>
  [...new Set(groups.flat().filter(Boolean))].join(", ");

const defaultKeywords = combineKeywords(
  coreKeywords,
  pageKeywords.home,
  pageKeywords.enterprise,
  pageKeywords.startups,
  pageKeywords.marketing,
  pageKeywords.academy,
  pageKeywords.local
);

const buildSchema = (path, meta) => {
  const url = `${siteUrl}${path === "/" ? "/" : path}`;

  if (path === "/" || path === "") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          "name": "AlgoForce AI",
          "alternateName": ["AlgoForce", "AlgoForce AI Ecosystem"],
          "url": "https://www.algoforceaii.com",
          "logo": "https://www.algoforceaii.com/logo.png",
          "foundingDate": "2026",
          "founder": {
            "@type": "Person",
            "name": "Dev N Suman",
            "jobTitle": "Founder & CEO",
            "url": "https://linkedin.com/in/dev-n-suman-3616a6377"
          },
          "description": "AlgoForce AI is India's execution infrastructure ecosystem spanning enterprise AI consulting, startup OS (CRUCIBLE), talent infrastructure (AlgoForce Labs), and live entertainment OS (Velqora).",
          "email": "af@algoforceaii.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Kalkaji",
            "addressLocality": "New Delhi",
            "postalCode": "110019",
            "addressRegion": "Delhi",
            "addressCountry": "IN"
          },
          "areaServed": "IN",
          "knowsAbout": [
            "Artificial Intelligence", "Enterprise Automation", "Startup Infrastructure",
            "Talent Development", "Digital Transformation", "AI Consulting"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "AlgoForce AI Services",
            "itemListElement": [
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Enterprise AI Consulting"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "CRUCIBLE Startup OS"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "AlgoForce Labs Training"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Velqora Artist Platform"}}
            ]
          },
          "sameAs": [
            "https://linkedin.com/company/algoforce-ai",
            "https://github.com/DevNs-cmd"
          ]
        },
        {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          "url": "https://www.algoforceaii.com",
          "name": "AlgoForce AI",
          "description": "India's execution infrastructure ecosystem",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.algoforceaii.com/?s={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is AlgoForce AI?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "AlgoForce AI is an execution infrastructure ecosystem with 4 businesses: enterprise AI consulting, CRUCIBLE (startup OS), AlgoForce Labs (talent platform), and Velqora (live entertainment OS). Based in New Delhi, India."
              }
            },
            {
              "@type": "Question",
              "name": "What is CRUCIBLE by AlgoForce?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "CRUCIBLE is a startup operating system that helps founders from idea validation through Series A fundraising readiness, with tools for execution tracking, Venture Health Score, and investor pipeline management."
              }
            },
            {
              "@type": "Question",
              "name": "What is AlgoForce Labs?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "AlgoForce Labs is a talent infrastructure platform that trains students in AI, full-stack development, and digital marketing, then places them in startups and enterprises. Programs start from ₹22,000."
              }
            },
            {
              "@type": "Question",
              "name": "Does AlgoForce AI work with enterprises in India?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. AlgoForce AI delivers enterprise AI consulting, automation systems, and digital transformation for enterprises, scale-ups, and SMEs across India. Engagements begin with a free AI Readiness Audit."
              }
            },
            {
              "@type": "Question",
              "name": "Where is AlgoForce AI located?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "AlgoForce AI is headquartered in New Delhi, India and is a Government of India registered MSME."
              }
            }
          ]
        }
      ]
    };
  }

  if (path === "/services" || path === "/ai-consulting") {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Enterprise AI Consulting & Automation Services",
      "provider": {
        "@type": "Organization",
        "name": "AlgoForce AI",
        "url": "https://www.algoforceaii.com",
        "logo": "https://www.algoforceaii.com/logo.png"
      },
      "areaServed": "IN",
      "description": "Enterprise AI systems, automation infrastructure, and digital transformation for Indian businesses."
    };
  }

  if (path === "/crucible") {
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "CRUCIBLE",
      "operatingSystem": "All",
      "applicationCategory": "BusinessApplication",
      "offers": {
        "@type": "Offer",
        "price": "2999",
        "priceCurrency": "INR",
        "description": "Subscriptions from ₹2,999/month"
      },
      "description": "Crucible is a startup operating system that helps founders from idea validation through Series A fundraising readiness, with tools for execution tracking, Venture Health Score, and investor pipeline management."
    };
  }

  if (path === "/velqora") {
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Velqora",
      "operatingSystem": "All",
      "applicationCategory": "EntertainmentApplication",
      "offers": {
        "@type": "Offer",
        "price": "499",
        "priceCurrency": "INR",
        "description": "Subscriptions from ₹499/month"
      },
      "description": "Velqora helps performing artists and event organizers manage bookings, contracts, and payments — all in one platform."
    };
  }

  if (path === "/labs" || path === "/training") {
    return [
      {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "AI Systems & Operational Automation for Leaders",
        "description": "8-week cohort for founders and executives integrating AI systems to optimize scale and operations.",
        "provider": {
          "@type": "Organization",
          "name": "AlgoForce Labs",
          "url": "https://www.algoforceaii.com/labs"
        },
        "offers": {
          "@type": "Offer",
          "price": "15000",
          "priceCurrency": "INR",
          "category": "Paid"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "AI Systems Architect & Engineering Track",
        "description": "16-week advanced program for engineers deploying production-grade AI systems.",
        "provider": {
          "@type": "Organization",
          "name": "AlgoForce Labs",
          "url": "https://www.algoforceaii.com/labs"
        },
        "offers": {
          "@type": "Offer",
          "price": "35000",
          "priceCurrency": "INR",
          "category": "Paid"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Operational Intelligence & AI Systems",
        "description": "12-week track for data teams building advanced analytics infrastructure and real-time execution dashboards.",
        "provider": {
          "@type": "Organization",
          "name": "AlgoForce Labs",
          "url": "https://www.algoforceaii.com/labs"
        },
        "offers": {
          "@type": "Offer",
          "price": "25000",
          "priceCurrency": "INR",
          "category": "Paid"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Enterprise Automation Infrastructure Specialist",
        "description": "14-week cohort for operations and technology teams designing enterprise automated workflows.",
        "provider": {
          "@type": "Organization",
          "name": "AlgoForce Labs",
          "url": "https://www.algoforceaii.com/labs"
        },
        "offers": {
          "@type": "Offer",
          "price": "30000",
          "priceCurrency": "INR",
          "category": "Paid"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Elite Systems Deployment Apprenticeship",
        "description": "For top performers moving into custom implementation and enterprise infrastructure systems.",
        "provider": {
          "@type": "Organization",
          "name": "AlgoForce Labs",
          "url": "https://www.algoforceaii.com/labs"
        },
        "offers": {
          "@type": "Offer",
          "price": "50000",
          "priceCurrency": "INR",
          "category": "Paid"
        }
      }
    ];
  }

  if (path === "/about") {
    return [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About AlgoForce AI",
        "description": "AlgoForce AI was founded in 2026 by Dev N Suman in New Delhi. We build execution infrastructure for enterprises, startups, talent, and creators across India."
      },
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Dev N Suman",
        "jobTitle": "Founder & CEO",
        "url": "https://linkedin.com/in/dev-n-suman-3616a6377",
        "worksFor": {
          "@type": "Organization",
          "name": "AlgoForce AI",
          "url": "https://www.algoforceaii.com"
        }
      }
    ];
  }

  if (path === "/founder") {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Dev N Suman",
      "jobTitle": "Founder & CEO",
      "url": "https://www.algoforceaii.com/founder",
      "worksFor": {
        "@type": "Organization",
        "name": "AlgoForce AI",
        "url": "https://www.algoforceaii.com"
      },
      "sameAs": [
        "https://www.linkedin.com/in/dev-n-suman-3616a6377/"
      ]
    };
  }

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: ogImage,
      founder: {
        "@type": "Person",
        name: "Dev N Suman",
        url: `${siteUrl}/founder`,
      },
      description:
        "AlgoForce AI is an execution infrastructure ecosystem across enterprise AI, digital transformation, startup operating systems, talent infrastructure, and live entertainment technology.",
      areaServed: ["India", "Global"],
      knowsAbout: [
        "Artificial Intelligence",
        "Enterprise AI",
        "AI Automation",
        "Digital Transformation",
        "Digital Marketing",
        "Marketing Automation",
        "Custom Software Development",
        "Startup MVP Development",
        "Startup Operating Systems",
        "Venture Studios",
        "AI Education",
        "Talent Infrastructure",
        "Live Entertainment Technology",
        "Workflow Automation",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        url: `${siteUrl}/contact`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteName,
      url: siteUrl,
      inLanguage: "en",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": meta.schemaType || "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: meta.title,
      description: meta.description,
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ];
};

const seoConfig = {
  "/": {
    title: "AlgoForce AI — AI Consulting, Startup OS & Talent Platform | New Delhi, India",
    description:
      "AlgoForce AI is India's execution infrastructure ecosystem — enterprise AI consulting, CRUCIBLE startup OS, AlgoForce Labs talent platform, and Velqora for live entertainment. New Delhi.",
    keywords: "AI consulting India, startup operating system India, AI courses New Delhi, enterprise AI automation India, MVP development India, AlgoForce AI, CRUCIBLE startup platform, AlgoForce Labs",
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/`,
    schemaType: "WebPage",
  },
  "/services": {
    title: "Enterprise AI Consulting & Automation Services | AlgoForce AI India",
    description: "AlgoForce AI delivers enterprise AI systems, automation infrastructure, and digital transformation for Indian businesses. Start with a free AI Readiness Audit.",
    keywords: "AI consulting India, enterprise AI automation India, digital transformation India",
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/services`,
  },
  "/ai-consulting": {
    title: "Enterprise AI Consulting & Automation Services | AlgoForce AI India",
    description: "AlgoForce AI delivers enterprise AI systems, automation infrastructure, and digital transformation for Indian businesses. Start with a free AI Readiness Audit.",
    keywords: "AI consulting India, enterprise AI automation India, digital transformation India",
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/ai-consulting`,
  },
  "/crucible": {
    title: "CRUCIBLE — Startup Operating System for Indian Founders | AlgoForce AI",
    description: "CRUCIBLE is the execution infrastructure for startups — from idea to Series A. Workspace tools, Venture Health Score, fundraising readiness. ₹2,999/mo.",
    keywords: "startup OS India, startup tools for founders India",
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/crucible`,
  },
  "/pricing": {
    title: "Pricing | Enterprise AI, Startup OS, Labs & Automation Services",
    description:
      "Explore pricing for enterprise AI consulting, AI product development, managed AI services, startup MVP support, Labs training, and marketing automation.",
    keywords: combineKeywords(coreKeywords, pageKeywords.enterprise, pageKeywords.marketing, pageKeywords.startups, [
      "AI agency pricing",
      "automation service pricing",
      "custom software pricing India",
      "digital marketing pricing India",
    ]),
    image: ogImage,
  },
  "/labs": {
    title: "AI & Tech Training for Students | AlgoForce Labs — New Delhi",
    description: "AlgoForce Labs trains students in AI, full-stack development, and growth marketing through real-world project sprints. Placement support included. From ₹22,000.",
    keywords: "AI courses India students, AI training New Delhi, full-stack development India",
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/labs`,
  },
  "/training": {
    title: "AI & Tech Training for Students | AlgoForce Labs — New Delhi",
    description: "AlgoForce Labs trains students in AI, full-stack development, and growth marketing through real-world project sprints. Placement support included. From ₹22,000.",
    keywords: "AI courses India students, AI training New Delhi, full-stack development India",
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/training`,
  },
  "/velqora": {
    title: "Velqora — Booking & Career OS for Performing Artists in India",
    description: "Velqora helps performing artists and event organizers manage bookings, contracts, and payments — all in one platform. Subscriptions from ₹499/month.",
    keywords: "artist booking platform India, event organizer tools India",
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/velqora`,
  },
  "/about": {
    title: "About AlgoForce AI — Founder Dev N Suman | New Delhi, India",
    description: "AlgoForce AI was founded in 2026 by Dev N Suman in New Delhi. We build execution infrastructure for enterprises, startups, talent, and creators across India.",
    keywords: "About AlgoForce AI, Dev N Suman, execution infrastructure India",
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/about`,
  },
  "/contact": {
    title: "Contact AlgoForce AI | Enterprise AI, Startup & Growth Systems",
    description:
      "Contact AlgoForce AI for enterprise AI, digital transformation, AI audits, startup execution systems, Labs training, marketing automation, and growth infrastructure.",
    keywords: combineKeywords(coreKeywords, pageKeywords.enterprise, pageKeywords.marketing, pageKeywords.startups, pageKeywords.local, [
      "contact AI agency",
      "hire AI agency India",
      "hire digital marketing agency",
      "book AI consultation",
    ]),
    image: ogImage,
  },
  "/privacy-policy": {
    title: "Privacy Policy | AlgoForce AI",
    description:
      "Read how AlgoForce AI collects, protects, and uses information across AI services, marketing automation, courses, labs, and business systems.",
    keywords: combineKeywords(coreKeywords, ["AlgoForce privacy policy", "AI services privacy"]),
    image: ogImage,
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions | AlgoForce AI",
    description:
      "Legal terms for using AlgoForce AI services, AI systems, marketing automation, training programs, software, labs, and digital products.",
    keywords: combineKeywords(coreKeywords, ["AlgoForce terms", "AI services terms"]),
    image: ogImage,
  },
  "/refund-policy": {
    title: "Refund Policy | AlgoForce AI",
    description:
      "Refund, cancellation, and dispute terms for AlgoForce AI services, Academy programs, Labs access, consulting, and growth initiatives.",
    keywords: combineKeywords(coreKeywords, ["AlgoForce refund policy", "AI course refund"]),
    image: ogImage,
  },
  "/ai-builder": {
    title: "AI Builder | AI Products, Agents, MVPs & Workflow Automation",
    description:
      "Use AlgoForce AI Builder to prototype AI products, agents, chatbots, RAG systems, no-code MVPs, and automation workflows for businesses and startups.",
    keywords: combineKeywords(coreKeywords, pageKeywords.enterprise, pageKeywords.builder, pageKeywords.startups, [
      "AI app builder India",
      "custom chatbot builder",
      "AI automation builder",
      "AI SaaS builder",
    ]),
    image: ogImage,
    schemaType: "WebPage",
  },
  "/nexus": {
    title: "Nexus | AI Operations Console for Execution Infrastructure",
    description:
      "Nexus is the AlgoForce AI operations console for intelligent workflows, AI automations, business execution, growth campaigns, and operational clarity.",
    keywords: combineKeywords(coreKeywords, pageKeywords.enterprise, pageKeywords.builder, pageKeywords.marketing, [
      "AI operations console",
      "business operating system",
      "AI workflow dashboard",
    ]),
    image: ogImage,
    schemaType: "WebPage",
  },
  "/academy": {
    title: "AlgoForce Academy | AI, Product, Growth & Corporate Training",
    description:
      "Learn AI, machine learning, full-stack product engineering, growth marketing, AI business analysis, and corporate AI transformation with AlgoForce Academy.",
    keywords: combineKeywords(coreKeywords, pageKeywords.academy, pageKeywords.enterprise, [
      "best AI course in India",
      "AI course after 12th",
      "AI course for college students",
      "AI certification for students",
    ]),
    image: ogImage,
    schemaType: "WebPage",
  },
  "/dashboard": {
    title: "Dashboard | AlgoForce AI Console",
    description:
      "Access your AlgoForce AI dashboard for active AI systems, workflow automation, business metrics, and operational execution tools.",
    keywords: combineKeywords(coreKeywords, ["AlgoForce dashboard", "AI dashboard"]),
    image: ogImage,
    robots: "index, follow",
  },
  "/what-is-algoforce": {
    title: "What is AlgoForce AI? | Execution Infrastructure Ecosystem",
    description:
      "AlgoForce AI is an execution infrastructure ecosystem connecting enterprise AI, Crucible startup OS, AlgoForce Labs talent infrastructure, and Velqora entertainment technology.",
    keywords: combineKeywords(coreKeywords, pageKeywords.enterprise, pageKeywords.startups, pageKeywords.academy, pageKeywords.entertainment, [
      "what is AlgoForce AI",
      "AlgoForce business model",
      "execution infrastructure ecosystem India",
      "AlgoForce ecosystem",
    ]),
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/what-is-algoforce`,
  },
  "/blog": {
    title: "AlgoForce Blog | Enterprise AI, Startups, Talent & Growth Guides",
    description:
      "Read practical guides on enterprise AI, digital transformation, startup execution, AI automation, talent infrastructure, marketing, and ecosystem growth.",
    keywords: combineKeywords(coreKeywords, pageKeywords.enterprise, pageKeywords.startups, pageKeywords.marketing, pageKeywords.academy, pageKeywords.builder, [
      "AI blog India",
      "digital marketing blog",
      "startup growth blog",
      "AI automation guides",
    ]),
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/blog`,
    schemaType: "CollectionPage",
  },
  "/blog/:id": {
    title: "AlgoForce Blog Article | Execution Infrastructure & AI Systems",
    description:
      "Tactical AlgoForce AI article on enterprise AI, startup execution, automation, marketing, AI courses, talent infrastructure, and real growth systems.",
    keywords: combineKeywords(coreKeywords, pageKeywords.enterprise, pageKeywords.startups, pageKeywords.marketing, pageKeywords.academy, pageKeywords.builder),
    image: ogImage,
    type: "article",
    robots: "index, follow",
    schemaType: "WebPage",
  },
  "/ai-course": {
    title: "AI Course in India | AI, ML, Product Engineering & Automation",
    description:
      "Join an AI course in India focused on AI and machine learning, prompt engineering, automation, product engineering, real client projects, and placements.",
    keywords: combineKeywords(coreKeywords, pageKeywords.academy, pageKeywords.enterprise, [
      "AI course India",
      "best AI course India",
      "prompt engineering course India",
      "generative AI training",
    ]),
    image: ogImage,
    schemaType: "WebPage",
  },
  "/ai-course-for-students": {
    title: "AI Course for Students | Projects, Sprints, Placement & Careers",
    description:
      "Practical AI course for students with foundation training, project sprints, specialization tracks, AI projects, portfolio building, mentoring, and placement support.",
    keywords: combineKeywords(coreKeywords, pageKeywords.academy, [
      "AI course for students",
      "AI projects for college students",
      "student AI portfolio",
      "learn AI for placements",
    ]),
    image: ogImage,
    schemaType: "WebPage",
  },
  "/build-ai-app-without-coding": {
    title: "Build AI App Without Coding | No-Code AI MVP & Startup Guide",
    description:
      "Learn how to build an AI app without coding using no-code tools, AI agents, APIs, workflow automation, MVP validation, and startup execution systems.",
    keywords: combineKeywords(coreKeywords, pageKeywords.builder, pageKeywords.startups, [
      "build AI app without coding",
      "no code AI app",
      "AI MVP builder",
      "launch AI startup without coding",
    ]),
    image: ogImage,
  },
  "/ai-certification-india": {
    title: "AI Certification India | MSME AI Training, Projects & Placement",
    description:
      "Get AI certification in India with practical AI projects, automation labs, prompt engineering, generative AI training, MSME-registered proof, and career support.",
    keywords: combineKeywords(coreKeywords, pageKeywords.academy, [
      "AI certification India",
      "best AI certification India",
      "MSME AI certificate",
      "generative AI certification India",
    ]),
    image: ogImage,
    robots: "index, follow",
    schemaType: "WebPage",
  },
  "/founder": {
    title: "Dev N Suman | Founder & CEO, AlgoForce AI Ecosystem",
    description:
      "Dev N Suman is the Founder and CEO of AlgoForce AI, building an execution infrastructure ecosystem across AI, startups, Labs talent, and entertainment technology.",
    keywords: combineKeywords(coreKeywords, pageKeywords.enterprise, pageKeywords.startups, [
      "Dev N Suman",
      "AlgoForce founder",
      "Founder of AlgoForce AI",
      "young AI entrepreneur India",
    ]),
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/founder`,
    schemaType: "ProfilePage",
  },
  "/team": {
    title: "AlgoForce AI Team | AI, Startup, Labs & Growth Operators",
    description:
      "Meet the AlgoForce AI team across enterprise AI, startup execution, Labs talent, Velqora entertainment tech, marketing, finance, operations, and growth.",
    keywords: combineKeywords(coreKeywords, pageKeywords.enterprise, pageKeywords.startups, pageKeywords.entertainment, pageKeywords.marketing, [
      "AlgoForce team",
      "AI agency team",
      "marketing agency team",
      "AI startup team India",
    ]),
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/team`,
  },
  "/es": {
    title: "AlgoForce AI ES | AI Automation & Marketing Agency",
    description:
      "Spanish version coming soon. Explore AlgoForce AI automation, marketing, AI apps, digital growth, and business systems in English for now.",
    keywords: combineKeywords(coreKeywords, ["agencia de inteligencia artificial", "automatizacion con IA"]),
    image: ogImage,
  },
  "/fr": {
    title: "AlgoForce AI FR | AI Automation & Marketing Agency",
    description:
      "French version coming soon. Explore AlgoForce AI automation, marketing, AI apps, digital growth, and business systems in English for now.",
    keywords: combineKeywords(coreKeywords, ["agence IA", "automatisation IA"]),
    image: ogImage,
  },
  "/de": {
    title: "AlgoForce AI DE | AI Automation & Marketing Agency",
    description:
      "German version coming soon. Explore AlgoForce AI automation, marketing, AI apps, digital growth, and business systems in English for now.",
    keywords: combineKeywords(coreKeywords, ["KI Agentur", "KI Automatisierung"]),
    image: ogImage,
  },
  default: {
    title: "AlgoForce AI | Execution Infrastructure Ecosystem",
    description:
      "AlgoForce AI builds enterprise AI, digital transformation systems, startup operating infrastructure, talent programs, automation workflows, and growth platforms.",
    keywords: defaultKeywords,
    image: ogImage,
    robots: "index, follow",
  },
};

export { buildSchema, coreKeywords, defaultKeywords, siteName, siteUrl };
export default seoConfig;
