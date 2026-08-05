const siteUrl = "https://www.algoforceaii.com";
const siteName = "AlgoForce AI";
const defaultOgImage = `${siteUrl}/logo.png`;

// High-intent enterprise keywords for AEO, GEO, and Search Engines
const coreKeywords = [
  "AlgoForce AI Transformation Summit Delhi 2026",
  "AI Summit Delhi 2026",
  "Stop Buying AI Start Deploying AI",
  "AlgoForce Summit Tickets Luma Unstop",
  "Enterprise AI Software Company",
  "AI Software Company India",
  "AI Consulting Company",
  "Business Process Automation",
  "Enterprise Automation Solutions",
  "AI for Manufacturing",
  "AI for Finance",
  "Tally AI Integration",
  "LeadBolt Sales Copilot",
  "AlgoForce Finance AI",
  "FactoryGPT Quality Inspection",
  "ORION Space Systems",
  "Space AI Infrastructure",
  "AI Software Company New Delhi",
  "AlgoForce AI",
  "AlgoForce Labs",
  "Crucible Startup OS",
  "Velqora",
  "Dev N Suman Founder"
];

const combineKeywords = (...groups) =>
  [...new Set(groups.flat().filter(Boolean))].join(", ");

const defaultKeywords = combineKeywords(coreKeywords);

/**
 * Builds an enterprise multi-entity JSON-LD @graph tailored to each route and entity
 */
export const buildSchema = (path, meta = {}) => {
  const pageUrl = `${siteUrl}${path === "/" ? "" : path}`;

  // 1. Core Organization & LocalBusiness
  const organizationSchema = {
    "@type": ["Organization", "Corporation", "ProfessionalService", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    "name": "AlgoForce AI",
    "legalName": "AlgoForce AI Private Limited",
    "alternateName": ["AlgoForce", "AlgoForce Enterprise AI", "AlgoForce AI Systems"],
    "url": siteUrl,
    "logo": {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#logo`,
      "url": `${siteUrl}/logo.png`,
      "contentUrl": `${siteUrl}/logo.png`,
      "caption": "AlgoForce AI Logo",
      "width": "512",
      "height": "512"
    },
    "image": `${siteUrl}/logo.png`,
    "foundingDate": "2026",
    "description": "AlgoForce is an Enterprise AI Software Company that deploys, integrates, and supports AI software automating business operations across finance, sales, manufacturing, HR, hospitality, and operations.",
    "email": "af@algoforceaii.com",
    "telephone": "+91-8448947436",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kalkaji",
      "addressLocality": "South East Delhi",
      "addressRegion": "New Delhi",
      "postalCode": "110019",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.5383",
      "longitude": "77.2520"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "20:00"
      }
    ],
    "areaServed": [
      { "@type": "Country", "name": "India" },
      { "@type": "AdministrativeArea", "name": "Delhi NCR" },
      { "@type": "Place", "name": "Global" }
    ],
    "vatID": "MSME UDYAM-DL-08-0122150",
    "taxID": "UDYAM-DL-08-0122150",
    "knowsAbout": [
      "Enterprise Artificial Intelligence",
      "Business Process Automation",
      "Tally ERP AI Integration",
      "Lead Management Automation",
      "Computer Vision Quality Inspection",
      "Private Cloud & On-Premise AI Deployment",
      "Autonomous Space Systems Infrastructure"
    ],
    "founder": {
      "@type": "Person",
      "@id": `${siteUrl}/#founder`,
      "name": "Dev N Suman",
      "jobTitle": "Founder & Chief Executive Officer",
      "worksFor": { "@id": `${siteUrl}/#organization` },
      "sameAs": [
        "https://linkedin.com/in/dev-n-suman-3616a6377",
        "https://github.com/DevNs-cmd"
      ]
    },
    "sameAs": [
      "https://www.linkedin.com/company/algoforceofficial/",
      "https://www.instagram.com/algo.force",
      "https://www.facebook.com/share/1BDAyoFCG1/",
      "https://x.com/algoforceAF",
      "https://wa.me/918448947436",
      "https://g.page/r/CSblxr3Io_B5EBM/review"
    ]
  };

  // 2. WebSite & SearchAction
  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "url": siteUrl,
    "name": "AlgoForce AI",
    "description": "Enterprise AI Software Company deploying ready-to-use products that automate business operations.",
    "publisher": { "@id": `${siteUrl}/#organization` },
    "inLanguage": "en-US",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/products?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // 3. BreadcrumbList
  const pathSegments = path.split("/").filter(Boolean);
  const breadcrumbElements = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": siteUrl
    }
  ];
  pathSegments.forEach((segment, idx) => {
    const currentPath = `${siteUrl}/${pathSegments.slice(0, idx + 1).join("/")}`;
    const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    breadcrumbElements.push({
      "@type": "ListItem",
      "position": idx + 2,
      "name": name,
      "item": currentPath
    });
  });

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    "itemListElement": breadcrumbElements
  };

  // 4. WebPage & Speakable Schema
  const webPageSchema = {
    "@type": ["WebPage", meta.schemaType || "ItemPage"],
    "@id": pageUrl,
    "url": pageUrl,
    "name": meta.title || "AlgoForce AI — Enterprise AI Software Company",
    "isPartOf": { "@id": `${siteUrl}/#website` },
    "about": { "@id": `${siteUrl}/#organization` },
    "description": meta.description || "AlgoForce AI deploys enterprise AI software automating business operations across finance, sales, manufacturing, HR, and operations.",
    "inLanguage": "en-US",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".speakable-summary", "p"]
    }
  };

  const graph = [organizationSchema, websiteSchema, breadcrumbSchema, webPageSchema];

  // 5. Product & SoftwareApplication Schemas for Product / Home pages
  if (path === "/" || path === "/products" || path.startsWith("/products/")) {
    const productsSchema = [
      {
        "@type": ["SoftwareApplication", "Product"],
        "@id": `${siteUrl}/#tallygpt`,
        "name": "AlgoForce Finance AI",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Windows, Linux, Cloud",
        "description": "Automates accounting work, ledger reconciliation, and invoice processing without replacing Tally ERP.",
        "brand": { "@id": `${siteUrl}/#organization` },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "seller": { "@id": `${siteUrl}/#organization` }
        }
      },
      {
        "@type": ["SoftwareApplication", "Product"],
        "@id": `${siteUrl}/#leadbolt`,
        "name": "LeadBolt Sales Copilot",
        "applicationCategory": "SalesApplication",
        "operatingSystem": "Web, Cloud, WhatsApp",
        "description": "Autonomous lead management software that greets, qualifies, and schedules sales calls via WhatsApp and CRM.",
        "brand": { "@id": `${siteUrl}/#organization` },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "seller": { "@id": `${siteUrl}/#organization` }
        }
      },
      {
        "@type": ["SoftwareApplication", "Product"],
        "@id": `${siteUrl}/#factorygpt`,
        "name": "FactoryGPT Quality Inspection",
        "applicationCategory": "IndustrialApplication",
        "operatingSystem": "Edge Linux, On-Premises PLC",
        "description": "Computer vision quality inspection software that scans camera feeds to detect defects on assembly lines.",
        "brand": { "@id": `${siteUrl}/#organization` },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "seller": { "@id": `${siteUrl}/#organization` }
        }
      }
    ];
    graph.push(...productsSchema);
  }

  // 6. VideoObject Schema for Brand Film
  if (path === "/") {
    graph.push({
      "@type": "VideoObject",
      "@id": `${siteUrl}/#brand-film-video`,
      "name": "See AlgoForce in Action — Enterprise AI Software",
      "description": "Watch how AlgoForce deploys Enterprise AI software that automates business operations across finance, sales, manufacturing, HR and operations.",
      "thumbnailUrl": [`${siteUrl}/poster-ai.png`],
      "uploadDate": "2026-07-26T00:00:00+05:30",
      "contentUrl": `${siteUrl}/algoforce-brand-film.mp4`,
      "embedUrl": `${siteUrl}/algoforce-brand-film.mp4`,
      "publisher": { "@id": `${siteUrl}/#organization` }
    });
  }

  // 7. ORION Space Systems Division Schema
  if (path === "/orion" || path === "/orion/join") {
    graph.push({
      "@type": ["ResearchOrganization", "GovernmentService"],
      "@id": `${siteUrl}/orion/#division`,
      "name": "ORION Space Systems Division — AlgoForce",
      "alternateName": "ORION Orbital Robotics & Space AI",
      "url": `${siteUrl}/orion`,
      "description": "ORION is the Advanced Space Systems division of AlgoForce, engineering orbital robotics, satellite ground operations, space AI infrastructure, and autonomous flight computers.",
      "parentOrganization": { "@id": `${siteUrl}/#organization` },
      "knowsAbout": [
        "Orbital Robotics",
        "Autonomous Spacecraft Flight Systems",
        "Space AI Infrastructure",
        "Satellite Ground Operations",
        "Orbital Manufacturing & Digital Twins"
      ]
    });
  }

  // 8. FAQPage Schema
  const defaultFaqs = [
    {
      question: "What does AlgoForce AI do?",
      answer: "AlgoForce is an Enterprise AI Software Company. We deploy, integrate, and support ready-to-use AI software products that automate business operations across finance, sales, manufacturing, HR, hospitality, and operations."
    },
    {
      question: "How does AlgoForce deploy software?",
      answer: "AlgoForce products are deployed around the ERPs, CRMs, databases, and communication tools your team already uses. Deployment options include secure private cloud or on-premises servers."
    },
    {
      question: "Where is AlgoForce located?",
      answer: "AlgoForce AI is headquartered in Kalkaji, South East Delhi, New Delhi 110019, India and registered as a Government of India MSME."
    }
  ];

  graph.push({
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    "mainEntity": defaultFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
};

const seoConfig = {
  default: {
    title: "AlgoForce AI — Enterprise AI Software Company",
    description: "AlgoForce deploys ready-to-use AI software products that automate business operations across finance, sales, manufacturing, HR, and operations. Private cloud & on-premises deployment.",
    canonical: `${siteUrl}/`,
    image: defaultOgImage,
    keywords: defaultKeywords,
    schemaType: "WebPage"
  },
  "/": {
    title: "AlgoForce AI — Enterprise AI Software Company | Business Automation",
    description: "We deploy AI software that automates business operations. Ready-to-use products for finance, sales, HR, manufacturing, hospitality & operations deployed around your existing ERP & CRM stack.",
    canonical: `${siteUrl}/`,
    image: defaultOgImage,
    keywords: combineKeywords(coreKeywords, [
      "Enterprise AI Software Company",
      "Business Operations Automation",
      "Tally AI Integration",
      "Lead Management AI",
      "Delhi AI Software"
    ]),
    schemaType: "WebPage"
  },
  "/products": {
    title: "Enterprise AI Products & Solutions | AlgoForce AI",
    description: "Explore AlgoForce AI software products: Finance AI for Tally, LeadBolt sales copilot, FactoryGPT computer vision quality inspection, HotelGPT & Corporate Brain.",
    canonical: `${siteUrl}/products`,
    image: defaultOgImage,
    keywords: combineKeywords(coreKeywords, [
      "AI Software Products",
      "Tally ERP AI",
      "LeadBolt Copilot",
      "FactoryGPT Defect Inspection",
      "HotelGPT Guest AI"
    ]),
    schemaType: "CollectionPage"
  },
  "/services": {
    title: "Enterprise AI Software Products & Deployment Services | AlgoForce",
    description: "Deploy ready-to-use AI software integrated with your Tally, SAP, Zoho, Salesforce, and database stack with monthly managed support.",
    canonical: `${siteUrl}/services`,
    image: defaultOgImage,
    keywords: combineKeywords(coreKeywords, ["AI Software Deployment", "Managed AI Support", "ERP Integration"]),
    schemaType: "Service"
  },
  "/ai-consulting": {
    title: "Enterprise AI Consulting & Operational Assessment | AlgoForce",
    description: "Consult with AlgoForce product specialists to assess operational workflows, integration fit, and receive a clear AI deployment roadmap.",
    canonical: `${siteUrl}/ai-consulting`,
    image: defaultOgImage,
    keywords: combineKeywords(coreKeywords, ["AI Consulting India", "Operational AI Assessment", "AI Strategy"]),
    schemaType: "Service"
  },
  "/orion": {
    title: "ORION Space Systems Division | Space AI & Orbital Robotics | AlgoForce",
    description: "ORION is the Advanced Space Systems division of AlgoForce, building orbital robotics, satellite ground operations, space AI infrastructure, and autonomous flight computers.",
    canonical: `${siteUrl}/orion`,
    image: `${siteUrl}/orion_logo.png`,
    keywords: combineKeywords(coreKeywords, [
      "ORION Space Systems",
      "Space AI Infrastructure",
      "Orbital Robotics",
      "Satellite Ground Operations",
      "Autonomous Spacecraft Flight Computers",
      "Orbital Manufacturing"
    ]),
    schemaType: "ItemPage"
  },
  "/orion/join": {
    title: "Join ORION Space Systems Division | Orbital Robotics Careers | AlgoForce",
    description: "Join the ORION Space Systems Division engineering orbital robotics, satellite operations, and autonomous space AI infrastructure.",
    canonical: `${siteUrl}/orion/join`,
    image: `${siteUrl}/orion_logo.png`,
    keywords: combineKeywords(coreKeywords, ["Join ORION", "Space AI Careers", "Orbital Robotics Engineer"]),
    schemaType: "ItemPage"
  },
  "/crucible": {
    title: "Crucible OS — The Startup Execution Platform | AlgoForce",
    description: "Crucible is a Startup Operating System helping early-stage founders validate concepts, build launch-ready MVPs, and scale engineering teams.",
    canonical: `${siteUrl}/crucible`,
    image: defaultOgImage,
    keywords: combineKeywords(coreKeywords, ["Crucible Startup OS", "MVP Builder India", "Startup Technical Team"]),
    schemaType: "ItemPage"
  },
  "/labs": {
    title: "AlgoForce Labs — Engineering Community & Talent Platform",
    description: "AlgoForce Labs trains and deploys product engineers who build, implement, and support enterprise AI software products.",
    canonical: `${siteUrl}/labs`,
    image: defaultOgImage,
    keywords: combineKeywords(coreKeywords, ["AlgoForce Labs", "AI Engineering Community", "Talent Platform"]),
    schemaType: "ItemPage"
  },
  "/velqora": {
    title: "Velqora — Live Entertainment Operating System | AlgoForce",
    description: "Velqora provides live event execution infrastructure, venue booking software, and operational systems for live entertainment.",
    canonical: `${siteUrl}/velqora`,
    image: defaultOgImage,
    keywords: combineKeywords(coreKeywords, ["Velqora OS", "Live Event Software", "Entertainment Systems"]),
    schemaType: "ItemPage"
  },
  "/what-is-algoforce": {
    title: "What is AlgoForce? | Enterprise AI Software Company Overview",
    description: "Learn how AlgoForce deploys AI software products that automate operations across finance, sales, HR, manufacturing, and hospitality.",
    canonical: `${siteUrl}/what-is-algoforce`,
    image: defaultOgImage,
    keywords: combineKeywords(coreKeywords, ["What is AlgoForce", "AlgoForce AI Company Overview"]),
    schemaType: "AboutPage"
  },
  "/about": {
    title: "About AlgoForce AI — Enterprise AI Software Company",
    description: "AlgoForce is an Enterprise AI Software Company headquartered in New Delhi, India. We build, deploy, and maintain software that automates business operations.",
    canonical: `${siteUrl}/about`,
    image: defaultOgImage,
    keywords: combineKeywords(coreKeywords, ["About AlgoForce", "AI Company New Delhi", "Enterprise AI Vision"]),
    schemaType: "AboutPage"
  },
  "/contact": {
    title: "Book a Demo & Contact Product Specialists | AlgoForce AI",
    description: "Book a focused 30-minute product demo with AlgoForce product specialists to see software in action and discuss operational integration.",
    canonical: `${siteUrl}/contact`,
    image: defaultOgImage,
    keywords: combineKeywords(coreKeywords, ["Book AI Demo", "Contact AlgoForce", "AlgoForce New Delhi Address"]),
    schemaType: "ContactPage"
  },
  "/pricing": {
    title: "Transparent Product Pricing & Subscription Plans | AlgoForce AI",
    description: "Simple monthly subscription pricing for AlgoForce AI products including Finance AI, LeadBolt, and custom enterprise deployments.",
    canonical: `${siteUrl}/pricing`,
    image: defaultOgImage,
    keywords: combineKeywords(coreKeywords, ["AI Software Pricing", "AlgoForce Subscription Cost"]),
    schemaType: "ItemPage"
  }
};

export { siteUrl, siteName, defaultOgImage, coreKeywords, defaultKeywords };
export default seoConfig;
