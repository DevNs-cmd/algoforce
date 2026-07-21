const siteUrl = "https://www.algoforceaii.com";
const siteName = "AlgoForce";
const ogImage = `${siteUrl}/logo.png`;
 
const coreKeywords = [
  "AI Software Company",
  "AI Software Products",
  "AlgoForce Finance AI",
  "LeadBolt Lead Management Software",
  "GST Autopilot Automation",
  "Business Process Automation",
  "AI Automation Company",
  "Workflow Automation",
  "AI Software for Business",
  "Business Automation Company",
  "AI Integration Company",
  "AI for Manufacturing",
  "AI for Healthcare",
  "AI for Hospitality",
  "AI for SMEs",
  "AI Workflow Automation",
  "Delhi AI Company",
  "AI Company in New Delhi",
  "Business Automation Delhi",
  "AlgoForce",
  "AlgoForce Labs",
  "Crucible",
  "Velqora"
];
 
const pageKeywords = {
  home: [
    "AI Software Company",
    "AI Software Products",
    "Business Process Automation",
    "AI Automation Company",
    "Workflow Automation India",
    "AI Company in New Delhi"
  ],
  services: [
    "AI Software Products",
    "Business Automation Company",
    "AI Integration Company",
    "AI Workflow Automation",
    "Automation Services India",
    "AI for Manufacturing",
    "AI for Healthcare",
    "AI for Hospitality"
  ],
  contact: [
    "Book Product Demo",
    "AI Software Subscription",
    "Business AI Assessment Delhi",
    "AI Software Company Delhi"
  ],
  pricing: [
    "AI software subscription",
    "business assessment",
    "software setup",
    "AI subscription"
  ],
  labs: [
    "Labs Talent Training",
    "AI training New Delhi",
    "software development India"
  ],
  crucible: [
    "startup platform India",
    "startup platform",
    "MVP builder India",
    "startup platform Delhi"
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
    "description": "AlgoForce is an Enterprise AI Software Company. We deploy ready-to-use products such as AlgoForce Finance AI, LeadBolt and GST Autopilot to automate business operations.",
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
    { name: "AlgoForce Finance AI", desc: "Powered by Tally integration to automate accounting workflows, reconciliation effort and exception review." },
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
      a: "AlgoForce is an Enterprise AI Software Company. We deploy ready-to-use products such as AlgoForce Finance AI, LeadBolt and GST Autopilot to automate specific business operations under a subscription model."
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
      q: "What happens after a product demo?",
      a: "When there is a product fit, AlgoForce runs a focused discovery and business assessment to confirm workflows, integrations, deployment scope and support requirements."
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
      q: "How does AlgoForce Finance AI help finance teams?",
      a: "AlgoForce Finance AI is powered by Tally integration and helps teams automate accounting workflows, reconcile transactions and surface exceptions without replacing Tally."
    },
    {
      q: "What industries does AlgoForce serve?",
      a: "We serve Manufacturing, Healthcare, Hotels, Retail, Education, and SMEs, configuring copilots to match each sector's specific workflow requirements."
    },
    {
      q: "What is the Business Assessment?",
      a: "The Business Assessment follows product fit. It confirms the operational workflow, systems, data readiness and deployment requirements before we prepare a proposal."
    },
    {
      q: "How do you integrate AI with CRM systems like Salesforce or Zoho?",
      a: "Our LeadBolt sales copilot connects to CRM software via secure API webhooks to automate lead scoring, CRM updates, and scheduling callbacks."
    },
    {
      q: "Can you connect AI copilots with legacy ERP systems?",
      a: "Yes. AlgoForce Finance AI and other products can integrate with systems such as Tally, SAP and internal databases through a deployment plan tailored to your environment."
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
      a: "You can get started by booking a product demo on our contact page or by browsing our enterprise AI software products."
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
    title: "Enterprise AI Software Company India | AI Software for Business | AlgoForce",
    description: "AlgoForce is an Enterprise AI Software Company. We deploy products such as AlgoForce Finance AI, LeadBolt and GST Autopilot to automate business operations.",
    keywords: combineKeywords(pageKeywords.home, coreKeywords),
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/`,
    schemaType: "WebPage",
  },
  "/services": {
    title: "Enterprise AI Software Products | AlgoForce Finance AI, LeadBolt, GST Autopilot | AlgoForce",
    description: "Browse AlgoForce software products for finance, sales, GST compliance, HR, hotels and manufacturing. Deploy around the systems your teams already use.",
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
    description: "Contact AlgoForce to book a product demo and discover which enterprise AI software product fits your operations. Demo → Discovery → Deployment → Support.",
    keywords: combineKeywords(pageKeywords.contact, coreKeywords),
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/contact`,
    schemaType: "ContactPage",
  },
  "/pricing": {
    title: "AI Copilot Pricing & Subscription Plans | AlgoForce",
    description: "Enterprise AI software pricing is scoped after product demo and discovery, based on deployment, integration, security and support requirements.",
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
    title: "AlgoForce | Enterprise AI Software Company India",
    description: "AlgoForce deploys enterprise AI software products including AlgoForce Finance AI, LeadBolt, GST Autopilot and HR Copilot. Demo → Discovery → Deployment → Support.",
    keywords: defaultKeywords,
    image: ogImage,
    robots: "index, follow",
  }
};

export { buildSchema, coreKeywords, defaultKeywords, siteName, siteUrl };
export default seoConfig;
