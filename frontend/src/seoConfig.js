const siteUrl = "https://www.algoforceaii.com";
const siteName = "AlgoForce AI";
const ogImage = `${siteUrl}/logo.png`;

const coreKeywords = [
  "Enterprise AI Company India",
  "AI Consulting India",
  "Business Process Automation",
  "AI Automation Company",
  "Workflow Automation",
  "Custom AI Development",
  "AI Software Development",
  "AI Agents for Business",
  "Business Automation Company",
  "Enterprise AI Solutions",
  "Artificial Intelligence Company India",
  "AI Digital Transformation",
  "Automation Services India",
  "AI Integration Company",
  "Generative AI Consulting",
  "AI for Manufacturing",
  "AI for Healthcare",
  "AI for Hotels",
  "AI for SMEs",
  "AI Workflow Automation",
  "Delhi AI Company",
  "AI Company in New Delhi",
  "Business Automation Delhi",
  "Enterprise AI India",
  "Custom Software Delhi",
  "AlgoForce AI",
  "AlgoForce Labs",
  "Crucible",
  "Velqora"
];

const pageKeywords = {
  home: [
    "Enterprise AI Company India",
    "AI Consulting India",
    "Business Process Automation",
    "AI Automation Company",
    "Workflow Automation India",
    "Custom AI Development Delhi",
    "AI Company in New Delhi",
    "Enterprise AI India"
  ],
  services: [
    "Enterprise AI Solutions",
    "Business Automation Company",
    "AI Integration Company",
    "Generative AI Consulting",
    "AI Workflow Automation",
    "Automation Services India",
    "AI for Manufacturing",
    "AI for Healthcare",
    "AI for Hotels"
  ],
  contact: [
    "Talk to an AI Solutions Consultant",
    "Book Free AI Consultation",
    "AI Consulting India",
    "Generative AI Consulting",
    "Custom AI Development Delhi"
  ],
  pricing: [
    "custom software pricing India",
    "AI consulting cost",
    "enterprise automation pricing",
    "AI software development cost"
  ],
  labs: [
    "Talent Development Division",
    "AI training New Delhi",
    "full-stack development India",
    "AI course India students"
  ],
  crucible: [
    "startup incubation platform India",
    "startup operating system",
    "MVP builder India",
    "startup incubation Delhi"
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
    "name": "AlgoForce AI",
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
    "name": "AlgoForce AI",
    "alternateName": ["AlgoForce", "AlgoForce AI Systems"],
    "url": siteUrl,
    "logo": ogImage,
    "foundingDate": "2026",
    "founder": {
      "@type": "Person",
      "name": "Dev N Suman",
      "jobTitle": "Founder & CEO",
      "url": `${siteUrl}/founder`
    },
    "description": "AlgoForce AI is a premier Enterprise AI Company in India, delivering custom AI systems, workflow automation, and digital transformation.",
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

  // 4. Service Schema mapping the 13 services
  const servicesCatalog = [
    { name: "Enterprise AI Solutions", desc: "Custom AI strategy, architecture, and system design for high-scale enterprise operations." },
    { name: "Business Automation", desc: "Automating manual back-office tasks and data flows to improve organizational throughput." },
    { name: "AI Agents", desc: "Autonomous AI agents executing multi-step business operations and customer support workflows." },
    { name: "Custom Software", desc: "High-performance enterprise software tailored to replace legacy bottlenecks." },
    { name: "CRM Automation", desc: "Automating customer relation workflows, pipeline updates, and follow-ups within Salesforce/Zoho." },
    { name: "ERP Integration", desc: "Connecting enterprise resource planning tools with intelligence models and messaging queues." },
    { name: "WhatsApp Automation", desc: "Building 24/7 client booking, support, and lead capture systems via WhatsApp Cloud API." },
    { name: "Workflow Automation", desc: "Orchestrating workflows using enterprise n8n and Make pipelines for cross-system data sync." },
    { name: "Internal AI Assistants", desc: "Deploying secure, custom RAG search engines for employee training and file extraction." },
    { name: "Knowledge Management", desc: "Structuring unstructured data, PDFs, and training logs into a unified corporate memory." },
    { name: "Reporting Dashboards", desc: "Real-time decision intelligence dashboards showing process bottlenecks, ROI, and metrics." },
    { name: "Data Integration", desc: "Connecting scattered database silos into a clean, queryable operational data warehouse." },
    { name: "Digital Transformation", desc: "Modernizing legacy pipelines into automated, secure, and cloud-enabled digital engines." }
  ].map((srv) => ({
    "@type": "Service",
    "name": srv.name,
    "description": srv.desc,
    "provider": { "@type": "LocalBusiness", "name": "AlgoForce AI", "url": siteUrl },
    "areaServed": "IN"
  }));

  // 5. 20 SEO FAQs Schema
  const faqsList = [
    {
      q: "What does AlgoForce AI do?",
      a: "AlgoForce AI is a premier Enterprise AI Company in India. We design and build custom AI software, deploy AI agents, build CRM/ERP integrations, and automate business processes to reduce manual work and drive measurable ROI."
    },
    {
      q: "What is an Enterprise AI Company?",
      a: "An Enterprise AI Company specializes in designing, building, and integrating custom artificial intelligence systems, databases, and automated workflows directly into business operations to replace manual processes."
    },
    {
      q: "Where is AlgoForce AI headquartered?",
      a: "AlgoForce AI is headquartered in Kalkaji, South East Delhi, New Delhi - 110019, India. We serve clients across all of India and globally."
    },
    {
      q: "Do you offer AI consulting services in India?",
      a: "Yes, AlgoForce AI is a leading AI Consulting Company in India. We provide strategic generative AI advisory, system architecture design, technology stack mapping, and ROI discovery audits."
    },
    {
      q: "How can business process automation reduce manual work?",
      a: "By automating manual workflows (e.g. using n8n, Make), synchronizing CRM/ERP data, sending auto-replies via WhatsApp, and deploying AI assistants, businesses can eliminate administrative tasks and save hundreds of employee hours."
    },
    {
      q: "What are AI agents for business?",
      a: "AI agents are autonomous software assistants configured to handle complex business operations, such as answering client support tickets, qualifying leads, reading files, and executing API calls without human intervention."
    },
    {
      q: "How does custom software development benefit SMEs in Delhi?",
      a: "Custom software development solves specific bottlenecks unique to your business. Unlike generic SaaS subscriptions, it integrates with your existing workflows, carries no per-seat licensing costs, and builds a permanent digital asset."
    },
    {
      q: "What industries does AlgoForce AI serve?",
      a: "We build custom systems for Manufacturing, Healthcare, Hotels, Retail, Education, and SMEs. We adapt our enterprise architectures to fit the workflows and regulatory compliance of each industry."
    },
    {
      q: "What is your AI readiness audit?",
      a: "Our AI readiness audit is a 1-2 week technical evaluation. We map your workflows, detect operational data leaks, assess model feasibility, and outline a high-ROI roadmap for deploying automation."
    },
    {
      q: "How do you integrate AI with CRM systems like Salesforce or Zoho?",
      a: "We connect CRM software via secure webhooks, custom endpoints, and automation middleware. We enable automatic lead scoring, instant WhatsApp updates, database synching, and automated quotation generators."
    },
    {
      q: "Can you connect AI systems with legacy ERP systems?",
      a: "Yes. We design secure database bridges and middleware APIs to interface with legacy ERP software like SAP, Tally, or Microsoft Dynamics, enabling real-time dashboards and automated analytics."
    },
    {
      q: "What is the implementation timeline for custom AI software?",
      a: "Implementation typically takes 4 to 8 weeks. This includes system mapping, pipeline design, API integration, data testing, user acceptance testing, and team training."
    },
    {
      q: "How does WhatsApp automation improve lead capture?",
      a: "By using the official WhatsApp Cloud API, we build automated chat engines that interact with incoming leads 24/7, record interest details directly into your CRM, and schedule callback consultations instantly."
    },
    {
      q: "What are internal AI assistants?",
      a: "Internal AI assistants are secure, company-hosted chatbots that allow employees to search corporate documentation, HR policies, sales collateral, and past project guidelines securely using RAG technology."
    },
    {
      q: "Is business data secure with AlgoForce AI?",
      a: "Yes. Data security is our core pillar. We use end-to-end encryption, secure APIs, and can deploy open-source models (like Llama-3 or Mistral) on private self-hosted cloud servers so your data never leaves your control."
    },
    {
      q: "How does AlgoForce AI measure ROI?",
      a: "We track clear operational metrics: reduction in manual hours, decrease in data entry errors, improvement in response times for customer inquiries, and direct cost savings from replacing legacy per-seat licensing."
    },
    {
      q: "What is the difference between AlgoForce AI and a traditional software vendor?",
      a: "Traditional vendors build software specs exactly as written. AlgoForce AI operates as a strategic consulting and engineering partner, evaluating your business leaks, designing workflows, and supporting deployment for measurable ROI."
    },
    {
      q: "What is the role of AlgoForce Labs?",
      a: "AlgoForce Labs is our Talent Development Division. It trains developers and operational specialists on advanced AI systems and automation tools, creating a continuous talent pool for deployment."
    },
    {
      q: "What is Crucible?",
      a: "Crucible is our Startup Incubation Platform. It helps early-stage founders scale their workflows, build MVPs, and manage investor relations using structured software and execution routines."
    },
    {
      q: "How can we book a free AI consultation?",
      a: "You can book a consultation directly through our contact page by requesting a Discovery Call, AI Assessment, or Enterprise Quote. Our engineering team will reach out within 24 hours to schedule the session."
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
    title: "Enterprise AI Company India | Business Automation & Software | AlgoForce AI",
    description: "AlgoForce AI is a leading Enterprise AI Company in India. We develop custom AI systems, workflow automation, CRM/ERP integration, and AI agents for Indian businesses to reduce manual work and drive ROI.",
    keywords: combineKeywords(pageKeywords.home, coreKeywords),
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/`,
    schemaType: "WebPage",
  },
  "/services": {
    title: "Enterprise AI Solutions & Workflow Automation Services | AlgoForce AI",
    description: "Explore our custom enterprise AI solutions, business process automation, CRM/ERP integration, WhatsApp workflows, and AI agents. Start with a free AI Readiness Audit. Delhi, India.",
    keywords: combineKeywords(pageKeywords.services, coreKeywords),
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/services`,
    schemaType: "Service",
  },
  "/ai-consulting": {
    title: "Enterprise AI Consulting India | Business Automation Company",
    description: "Enterprise AI consulting retainers and digital transformation systems. Discover operational leaks and integrate secure generative AI agents for maximum ROI.",
    keywords: combineKeywords(pageKeywords.services, coreKeywords),
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/ai-consulting`,
    schemaType: "Service",
  },
  "/contact": {
    title: "Talk to an AI Solutions Consultant | AlgoForce AI",
    description: "Contact AlgoForce AI to speak with an enterprise AI solutions consultant. Book a discovery call, request a custom AI assessment, or get an enterprise software quote.",
    keywords: combineKeywords(pageKeywords.contact, coreKeywords),
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/contact`,
    schemaType: "ContactPage",
  },
  "/pricing": {
    title: "Enterprise AI Solutions & Custom Software Pricing | AlgoForce AI",
    description: "Transparent pricing models for custom AI development, business automation integration, workflow systems, and enterprise consulting retainers.",
    keywords: combineKeywords(pageKeywords.pricing, coreKeywords),
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/pricing`,
    schemaType: "PricingPage",
  },
  "/labs": {
    title: "Talent Development Division | AlgoForce Labs New Delhi",
    description: "AlgoForce Labs is our talent development division, training next-generation builders to deploy enterprise AI software, automation pipelines, and custom software.",
    keywords: combineKeywords(pageKeywords.labs, coreKeywords),
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/labs`,
    schemaType: "EducationalOrganization",
  },
  "/training": {
    title: "Talent Development Division | AlgoForce Labs New Delhi",
    description: "AlgoForce Labs is our talent development division, training next-generation builders to deploy enterprise AI software, automation pipelines, and custom software.",
    keywords: combineKeywords(pageKeywords.labs, coreKeywords),
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/training`,
    schemaType: "EducationalOrganization",
  },
  "/crucible": {
    title: "Startup Incubation Platform | Crucible by AlgoForce AI",
    description: "Crucible is our startup incubation platform, helping founders validate ideas, launch MVPs, and scale operations with robust software systems.",
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
    title: "About AlgoForce AI — Founder Dev N Suman | New Delhi, India",
    description: "AlgoForce AI was founded in 2026 by Dev N Suman in New Delhi. We build custom AI software and business automation systems for enterprises and SMEs across India.",
    keywords: "About AlgoForce AI, Dev N Suman, execution infrastructure India, Delhi AI Company",
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/about`,
    schemaType: "AboutPage",
  },
  "/cancellation-policy": {
    title: "Cancellation Policy | AlgoForce AI",
    description: "Read the cancellation policy for AlgoForce AI services, software contracts, monthly retainers, and subscriptions.",
    keywords: "cancellation policy AlgoForce, software service cancellation",
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/cancellation-policy`,
    schemaType: "WebPage",
  },
  "/cookie-policy": {
    title: "Cookie Policy | AlgoForce AI",
    description: "Learn how AlgoForce AI uses cookies and tracking technologies to optimize our enterprise AI platform website.",
    keywords: "cookie policy AlgoForce, cookie consent New Delhi",
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/cookie-policy`,
    schemaType: "WebPage",
  },
  "/ai-policy": {
    title: "Artificial Intelligence (AI) Policy | AlgoForce AI",
    description: "AlgoForce AI policy regarding transparency, data privacy, LLM hosting, and secure artificial intelligence systems.",
    keywords: "AI policy, database privacy AI, self-hosted LLM security",
    image: ogImage,
    robots: "index, follow",
    canonical: `${siteUrl}/ai-policy`,
    schemaType: "WebPage",
  },
  default: {
    title: "AlgoForce AI | Enterprise AI Company India",
    description: "AlgoForce AI builds custom enterprise AI, digital transformation systems, workflow automation, and custom business platforms.",
    keywords: defaultKeywords,
    image: ogImage,
    robots: "index, follow",
  }
};

export { buildSchema, coreKeywords, defaultKeywords, siteName, siteUrl };
export default seoConfig;
