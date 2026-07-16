const siteUrl = "https://www.algoforceaii.com";
const siteName = "AlgoForce";
const ogImage = `${siteUrl}/logo.png`;
 
const coreKeywords = [
  "Enterprise AI Products Company",
  "Specialized AI Copilots",
  "TallyGPT Finance Copilot",
  "LeadBolt Sales Copilot",
  "GST Autopilot Compliance",
  "Business Process Automation",
  "AI Automation Company",
  "Workflow Automation",
  "Custom AI Copilots",
  "AI Software Products",
  "AI Agents for Business",
  "Business Automation Company",
  "Enterprise AI Solutions",
  "Artificial Intelligence Company India",
  "AI Digital Transformation",
  "Automation Services India",
  "AI Integration Company",
  "Generative AI Copilots",
  "AI for Manufacturing",
  "AI for Healthcare",
  "AI for Hotels",
  "AI for SMEs",
  "AI Workflow Automation",
  "Delhi AI Company",
  "AI Company in New Delhi",
  "Business Automation Delhi",
  "Enterprise AI India",
  "AlgoForce",
  "AlgoForce Labs",
  "Crucible",
  "Velqora"
];
 
const pageKeywords = {
  home: [
    "Enterprise AI Products Company",
    "Specialized AI Copilots",
    "Business Process Automation",
    "AI Automation Company",
    "Workflow Automation India",
    "AI Company in New Delhi",
    "Enterprise AI India"
  ],
  services: [
    "Enterprise AI Solutions",
    "Business Automation Company",
    "AI Integration Company",
    "Generative AI Copilots",
    "AI Workflow Automation",
    "Automation Services India",
    "AI for Manufacturing",
    "AI for Healthcare",
    "AI for Hotels"
  ],
  contact: [
    "Request AI Copilot Assessment",
    "AI Copilot Subscription Price",
    "Business AI Assessment Delhi",
    "Specialized AI Copilots Delhi"
  ],
  pricing: [
    "AI copilot subscription price",
    "business assessment pricing",
    "copilot setup cost",
    "AI subscription pricing"
  ],
  labs: [
    "Talent Engine",
    "AI training New Delhi",
    "full-stack development India",
    "AI course India students"
  ],
  crucible: [
    "startup execution platform India",
    "startup operating system",
    "MVP builder India",
    "startup execution Delhi"
  ]
};

const combineKeywords = (...groups) =>
  [...new Set(groups.flat().filter(Boolean))].join(", ");

const defaultKeywords = combineKeywords(coreKeywords);

const buildSchema = (path, meta) => {
  const url = `${siteUrl}${path === "/" ? "" : path}`;

  // 1. Breadcrumb Schema
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
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbElements
  };

  // 2. LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
    "name": "AlgoForce",
    "image": ogImage,
    "url": siteUrl,
    "telephone": "+918448947436",
    "priceRange": "$$",
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
      "latitude": "28.5398",
      "longitude": "77.2541"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  // 3. Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    "name": "AlgoForce",
    "alternateName": ["AlgoForce", "AlgoForce Copilots"],
    "url": siteUrl,
    "logo": ogImage,
    "foundingDate": "2026",
    "founder": {
      "@type": "Person",
      "name": "Dev N Suman",
      "jobTitle": "Founder & CEO",
      "url": `${siteUrl}/founder`
    },
    "description": "AlgoForce is an Enterprise AI Products Company. We build specialized, out-of-the-box AI copilots (TallyGPT, LeadBolt, GST Autopilot) for business functions on a monthly subscription model.",
    "email": "af@algoforceaii.com",
    "telephone": "+918448947436",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kalkaji",
      "addressLocality": "South East Delhi",
      "addressRegion": "New Delhi",
      "postalCode": "110019",
      "addressCountry": "IN"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "sameAs": [
      "https://www.linkedin.com/company/algoforceofficial/",
      "https://x.com/algoforceAF",
      "https://www.instagram.com/algo.force?igsh=MzRndng5bXJ6eHU4",
      "https://www.facebook.com/share/1BDAyoFCG1/"
    ]
  };

  // 4. Service Schema mapping the services
  const servicesCatalog = [
    { name: "TallyGPT Finance Copilot", desc: "Specialized AI copilot automating ledger reconciliation, manual voucher entry, and tax readiness." },
    { name: "LeadBolt Sales Copilot", desc: "Specialized AI copilot for 24/7 lead qualification, booking meetings, and automated CRM sync." },
    { name: "GST Autopilot Compliance", desc: "Specialized AI copilot matching purchase registers with GSTR-2B to prevent tax leakage." },
    { name: "HR & Onboarding Copilot", desc: "Specialized AI copilot acting as a private corporate knowledge operating layer for company memory." },
    { name: "HotelGPT Booking Copilot", desc: "Specialized AI copilot handling 24/7 guest bookings and queries across WhatsApp and messaging." },
    { name: "FactoryGPT & Quality Vision AI", desc: "Specialized AI copilot automating manufacturing quality control via real-time camera inspection." },
    { name: "Business AI Assessment", desc: "One-time operations audit mapping workflows and identifying automation opportunities." }
  ].map((srv) => ({
    "@type": "Service",
    "name": srv.name,
    "description": srv.desc,
    "provider": { "@type": "LocalBusiness", "name": "AlgoForce", "url": siteUrl },
    "areaServed": "IN"
  }));

  // 5. 20 SEO FAQs Schema
  const faqsList = [
    {
      q: "What does AlgoForce do?",
      a: "AlgoForce is an Enterprise AI Products Company. We build specialized, out-of-the-box AI copilots (such as TallyGPT, LeadBolt, and GST Autopilot) for specific business functions, helping organizations automate operations under a subscription model."
    },
    {
      q: "What is an Enterprise AI Products Company?",
      a: "An Enterprise AI Products Company builds specialized, pre-configured AI software and copilots designed for specific corporate functions, deployed on a subscription model."
    },
    {
      q: "Where is AlgoForce headquartered?",
      a: "AlgoForce is headquartered in Kalkaji, South East Delhi, New Delhi - 110019, India. We serve clients across all of India and globally."
    },
    {
      q: "Do you offer Business Assessments?",
      a: "Yes, AlgoForce provides a one-time Business Assessment (₹49,999) to audit operations, map database schemas, identify process leaks, and select the right AI Copilot."
    },
    {
      q: "How can business process automation reduce manual work?",
      a: "By deploying specialized AI copilots to automate data reconciliation, client booking, compliance reporting, and sales pipelines, companies can save hundreds of administrative hours."
    },
    {
      q: "What are AI copilots for business?",
      a: "AI copilots are pre-built, specialized software assistants configured to automate operational workflows like finance entries, CRM logs, and customer support."
    },
    {
      q: "How does TallyGPT help finance teams?",
      a: "TallyGPT connects to Tally ERP to auto-reconcile transactions, answer financial queries, parse invoices, and eliminate manual entry errors."
    },
    {
      q: "What industries does AlgoForce serve?",
      a: "We serve Manufacturing, Healthcare, Hotels, Retail, Education, and SMEs, configuring copilots to match each sector's specific workflow requirements."
    },
    {
      q: "What is the Business Assessment?",
      a: "Our Business Assessment is a 1-2 week operational audit where our team maps workflows, analyzes ERP/CRM data readiness, and selects the ideal specialized AI Copilot for your business."
    },
    {
      q: "How do you integrate AI with CRM systems like Salesforce or Zoho?",
      a: "Our LeadBolt sales copilot connects to CRM software via secure API webhooks to automate lead scoring, CRM updates, and scheduling callbacks."
    },
    {
      q: "Can you connect AI copilots with legacy ERP systems?",
      a: "Yes. TallyGPT and our other copilots integrate with ERP systems like Tally, SAP, and custom databases via secure middleware pipelines."
    },
    {
      q: "What is the implementation timeline for an AI Copilot?",
      a: "Product implementation takes 2 to 6 weeks, which covers database connection, business rule configuration, security setups, and validation testing."
    },
    {
      q: "How does WhatsApp booking automation work?",
      a: "HotelGPT and LeadBolt connect to the official WhatsApp Cloud API, allowing clients to make reservations, log details, and book slots 24/7."
    },
    {
      q: "What are internal HR copilots?",
      a: "HR copilots act as private knowledge layers, allowing employees to query internal documentation, manuals, policies, and training materials securely."
    },
    {
      q: "Is business data secure with AlgoForce copilots?",
      a: "Yes. Security is our core priority. We use end-to-end encryption, secure database channels, and can deploy copilots on private VPC cloud servers."
    },
    {
      q: "How do you measure copilot performance?",
      a: "We monitor performance metrics: reduction in entry errors, turnaround time for support tickets, lead conversion latency, and operational cost savings."
    },
    {
      q: "What is the difference between AlgoForce and a traditional software vendor?",
      a: "Traditional vendors charge high custom development retainers. AlgoForce builds specialized, pre-built AI copilots, charging a simple setup fee and a monthly subscription."
    },
    {
      q: "What is the role of AlgoForce Labs?",
      a: "AlgoForce Labs is our Talent Engine, training top developers and engineers by building real enterprise AI products."
    },
    {
      q: "What is Crucible?",
      a: "Crucible is our Startup Execution Platform, providing founders with a Startup Operating System to validate concepts, build MVPs, and scale products."
    },
    {
      q: "How do we get started?",
      a: "You can get started by requesting a Business Assessment on our contact page or by browsing our specialized AI copilots."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsList.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  // Compile final graph depending on path
  if (path === "/" || path === "") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        organizationSchema,
        localBusinessSchema,
        {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          "url": siteUrl,
          "name": "AlgoForce AI",
          "description": "Enterprise AI Company India - Custom AI Systems & Business Automation"
        },
        faqSchema,
        breadcrumbSchema
      ]
    };
  }

  if (path === "/services" || path === "/ai-consulting") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        breadcrumbSchema,
        ...servicesCatalog
      ]
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbSchema,
      {
        "@context": "https://schema.org",
        "@type": meta.schemaType || "WebPage",
        "@id": `${url}#webpage`,
        "url": url,
        "name": meta.title,
        "description": meta.description
      }
    ]
  };
};

const seoConfig = {
  "/": {
    title: "Enterprise AI Products Company India | AI Copilots for Business | AlgoForce",
    description: "AlgoForce is an Enterprise AI Products Company. We build specialized AI copilots — TallyGPT, LeadBolt, GST Autopilot — for business functions on a monthly subscription model.",
    keywords: combineKeywords(pageKeywords.home, coreKeywords),
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/`,
    schemaType: "WebPage",
  },
  "/services": {
    title: "Specialized AI Copilots for Business | TallyGPT, LeadBolt, GST Autopilot | AlgoForce",
    description: "Browse AlgoForce's specialized AI copilots for Finance, Sales, GST Compliance, HR, Hotels, and Manufacturing. Monthly subscription. Business Assessment included.",
    keywords: combineKeywords(pageKeywords.services, coreKeywords),
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/services`,
    schemaType: "Service",
  },
  "/ai-consulting": {
    title: "AI Copilot Products for Enterprise | Business Automation | AlgoForce",
    description: "AlgoForce builds pre-configured AI copilots for business operations. Subscription-based AI products for finance, sales, compliance, and more.",
    keywords: combineKeywords(pageKeywords.services, coreKeywords),
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/ai-consulting`,
    schemaType: "Service",
  },
  "/contact": {
    title: "Request a Business AI Assessment | AlgoForce Copilots",
    description: "Contact AlgoForce to request a Business Assessment and discover which AI Copilot fits your operations. Assessment → Implementation → Monthly Subscription.",
    keywords: combineKeywords(pageKeywords.contact, coreKeywords),
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/contact`,
    schemaType: "ContactPage",
  },
  "/pricing": {
    title: "AI Copilot Pricing & Subscription Plans | AlgoForce",
    description: "Transparent pricing for AlgoForce AI Copilots — Business Assessment (₹49,999), Product Implementation (₹2,49,999), Monthly Subscription from ₹49,999/month.",
    keywords: combineKeywords(pageKeywords.pricing, coreKeywords),
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/pricing`,
    schemaType: "PricingPage",
  },
  "/labs": {
    title: "AlgoForce Labs — Talent Engine Building Real AI Copilots | New Delhi",
    description: "AlgoForce Labs is the talent engine behind AlgoForce's AI copilots — training IIT/NIT engineers and developers by building real enterprise products.",
    keywords: combineKeywords(pageKeywords.labs, coreKeywords),
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/labs`,
    schemaType: "EducationalOrganization",
  },
  "/training": {
    title: "AlgoForce Labs — Talent Engine Building Real AI Copilots | New Delhi",
    description: "AlgoForce Labs is the talent engine behind AlgoForce's AI copilots — training IIT/NIT engineers and developers by building real enterprise products.",
    keywords: combineKeywords(pageKeywords.labs, coreKeywords),
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/training`,
    schemaType: "EducationalOrganization",
  },
  "/crucible": {
    title: "Crucible — Startup Execution OS by AlgoForce | Build & Launch MVPs",
    description: "Crucible is the Startup Operating System by AlgoForce, helping founders validate concepts, build MVPs fast, source technical talent, and scale with real execution infrastructure.",
    keywords: combineKeywords(pageKeywords.crucible, coreKeywords),
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/crucible`,
    schemaType: "SoftwareApplication",
  },
  "/velqora": {
    title: "Velqora — Booking & Career OS for Performing Artists in India",
    description: "Velqora helps performing artists and event organizers manage bookings, contracts, and payments — all in one platform. Subscriptions from ₹499/month.",
    keywords: "artist booking platform India, event organizer tools India, Velqora, performer SaaS",
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/velqora`,
    schemaType: "SoftwareApplication",
  },
  "/about": {
    title: "About AlgoForce — Enterprise AI Products Company | Dev N Suman | New Delhi",
    description: "AlgoForce is an Enterprise AI Products Company founded in 2026 by Dev N Suman in New Delhi. We build specialized AI copilots on a subscription model for businesses across India.",
    keywords: "About AlgoForce, Dev N Suman, Enterprise AI Products Company, Delhi AI Copilots",
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/about`,
    schemaType: "AboutPage",
  },
  "/cancellation-policy": {
    title: "Cancellation Policy | AlgoForce",
    description: "Read the cancellation and refund policy for AlgoForce AI Copilot subscriptions, Business Assessments, and Product Implementation agreements.",
    keywords: "cancellation policy AlgoForce, AI copilot subscription cancellation",
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/cancellation-policy`,
    schemaType: "WebPage",
  },
  "/cookie-policy": {
    title: "Cookie Policy | AlgoForce",
    description: "Learn how AlgoForce uses cookies and tracking technologies on our Enterprise AI Copilot products website.",
    keywords: "cookie policy AlgoForce, cookie consent New Delhi",
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/cookie-policy`,
    schemaType: "WebPage",
  },
  "/ai-policy": {
    title: "Artificial Intelligence Policy | AlgoForce",
    description: "AlgoForce policy on AI transparency, data privacy, LLM hosting, and secure AI copilot deployments.",
    keywords: "AI policy AlgoForce, copilot data privacy, self-hosted LLM security",
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/ai-policy`,
    schemaType: "WebPage",
  },
  default: {
    title: "AlgoForce | Enterprise AI Products Company India",
    description: "AlgoForce builds specialized AI copilots (TallyGPT, LeadBolt, GST Autopilot, HR Copilot) for business functions on a monthly subscription. Business Assessment → Implementation → Subscription.",
    keywords: defaultKeywords,
    image: ogImage,
    robots: "index, follow",
  }
};

export { buildSchema, coreKeywords, defaultKeywords, siteName, siteUrl };
export default seoConfig;
