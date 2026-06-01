const siteUrl = "https://www.algoforceaii.com";
const siteName = "AlgoForce AI";
const ogImage = `${siteUrl}/logo.png`;

const coreKeywords = [
  "AlgoForce AI",
  "AlgoForce Labs",
  "AI agency India",
  "AI marketing agency India",
  "AI automation agency",
  "AI consulting company India",
  "AI development company India",
  "custom AI software development",
  "AI business automation",
  "workflow automation services",
  "digital marketing agency for startups",
  "performance marketing agency India",
  "growth marketing agency",
  "startup marketing agency",
  "lead generation agency",
  "SEO agency India",
  "social media marketing agency",
  "content marketing agency",
  "AI tools for business",
  "AI chatbot development",
  "AI app builder",
  "no-code AI app builder",
  "startup MVP development India",
  "AI courses in India",
  "AI certification India",
  "AI course for students",
  "Dev N Suman",
];

const pageKeywords = {
  home: [
    "best AI agency in India",
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
    "brand strategy agency",
    "online marketing services",
    "paid ads agency",
    "Google Ads agency",
    "Meta Ads agency",
    "marketing automation services",
    "conversion rate optimization",
    "landing page optimization",
    "sales funnel automation",
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
  pageKeywords.marketing,
  pageKeywords.local
);

const buildSchema = (path, meta) => {
  const url = `${siteUrl}${path === "/" ? "/" : path}`;

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
        "AlgoForce AI builds AI systems, automation workflows, marketing automation, custom software, and AI training programs for startups, students, SMEs, and growth teams.",
      areaServed: ["India", "Global"],
      knowsAbout: [
        "Artificial Intelligence",
        "AI Automation",
        "Digital Marketing",
        "Marketing Automation",
        "Custom Software Development",
        "Startup MVP Development",
        "AI Education",
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
    title: "AlgoForce AI | AI Agency, Automation, Marketing & Growth Systems",
    description:
      "AlgoForce AI is an AI agency and growth systems company for startups, SMEs, students, and founders. Build AI apps, automate workflows, improve marketing, and launch faster.",
    keywords: defaultKeywords,
    image: ogImage,
    robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    canonical: `${siteUrl}/`,
    schemaType: "WebPage",
  },
  "/pricing": {
    title: "Pricing | AI Automation, Marketing & Custom Software Services",
    description:
      "Transparent pricing for AI automation, marketing automation, custom AI systems, startup MVP development, workflow automation, and growth execution support.",
    keywords: combineKeywords(coreKeywords, pageKeywords.marketing, [
      "AI agency pricing",
      "automation service pricing",
      "custom software pricing India",
      "digital marketing pricing India",
    ]),
    image: ogImage,
  },
  "/labs": {
    title: "AlgoForce Labs | AI Projects, Automation Demos & Builder Talent",
    description:
      "Explore AlgoForce Labs for AI projects, automation demos, startup MVP systems, AI tools, and execution-ready builders trained for real business outcomes.",
    keywords: combineKeywords(coreKeywords, pageKeywords.academy, pageKeywords.builder, [
      "AI labs India",
      "AI project lab",
      "automation demo",
      "startup lab India",
    ]),
    image: ogImage,
  },
  "/contact": {
    title: "Contact AlgoForce AI | AI Agency & Marketing Automation Experts",
    description:
      "Contact AlgoForce AI for AI automation, digital marketing, startup MVP development, AI app building, chatbot development, SEO, lead generation, and growth systems.",
    keywords: combineKeywords(coreKeywords, pageKeywords.marketing, pageKeywords.local, [
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
    title: "AI Builder | Build AI Apps, Chatbots, Agents & Workflow Automation",
    description:
      "Use AlgoForce AI Builder to create AI apps, custom chatbots, AI agents, RAG systems, no-code MVPs, and automated business workflows faster.",
    keywords: combineKeywords(coreKeywords, pageKeywords.builder, [
      "AI app builder India",
      "custom chatbot builder",
      "AI automation builder",
      "AI SaaS builder",
    ]),
    image: ogImage,
    schemaType: "WebPage",
  },
  "/nexus": {
    title: "Nexus | AI Operations Console for Automation & Growth Teams",
    description:
      "Nexus is the AlgoForce AI operations console for managing intelligent workflows, AI automations, custom systems, growth campaigns, and business execution.",
    keywords: combineKeywords(coreKeywords, pageKeywords.builder, pageKeywords.marketing, [
      "AI operations console",
      "business operating system",
      "AI workflow dashboard",
    ]),
    image: ogImage,
    schemaType: "WebPage",
  },
  "/academy": {
    title: "AlgoForce Academy | AI Courses, Certification & Student Projects",
    description:
      "Learn AI with AlgoForce Academy through AI courses, live workshops, MSME-registered certification, AI projects, prompt engineering, and automation labs.",
    keywords: combineKeywords(coreKeywords, pageKeywords.academy, [
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
    robots: "noindex, nofollow",
  },
  "/blog": {
    title: "AlgoForce Blog | AI, Automation, Marketing & Startup Growth Guides",
    description:
      "Read practical guides on AI automation, AI tools, digital marketing, SEO, startup MVPs, AI courses, student projects, and business growth systems.",
    keywords: combineKeywords(coreKeywords, pageKeywords.marketing, pageKeywords.academy, pageKeywords.builder, [
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
    title: "AlgoForce Blog Article | AI, Automation & Growth Systems",
    description:
      "Tactical AlgoForce AI article on AI tools, automation, marketing, startup MVP development, AI courses, certifications, and real execution systems.",
    keywords: combineKeywords(coreKeywords, pageKeywords.marketing, pageKeywords.academy, pageKeywords.builder),
    image: ogImage,
    type: "article",
    robots: "index, follow",
    schemaType: "WebPage",
  },
  "/ai-course": {
    title: "AI Course in India | AI Systems, Prompt Engineering & Automation",
    description:
      "Join an AI course in India focused on prompt engineering, AI tools, custom AI systems, automation workflows, real projects, and career-ready execution.",
    keywords: combineKeywords(coreKeywords, pageKeywords.academy, [
      "AI course India",
      "best AI course India",
      "prompt engineering course India",
      "generative AI training",
    ]),
    image: ogImage,
    schemaType: "WebPage",
  },
  "/ai-course-for-students": {
    title: "AI Course for Students | AI Projects, Tools & Career Portfolio",
    description:
      "Practical AI course for students with AI projects, automation tools, portfolio building, prompt engineering, AI apps, and career-ready certification.",
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
    title: "Build AI App Without Coding | No-Code AI App & MVP Builder Guide",
    description:
      "Learn how to build an AI app without coding using no-code tools, AI agents, chatbots, APIs, workflow automation, and startup MVP systems.",
    keywords: combineKeywords(coreKeywords, pageKeywords.builder, [
      "build AI app without coding",
      "no code AI app",
      "AI MVP builder",
      "launch AI startup without coding",
    ]),
    image: ogImage,
  },
  "/ai-certification-india": {
    title: "AI Certification India | MSME-Registered AI Training & Projects",
    description:
      "Get AI certification in India with practical AI projects, automation labs, prompt engineering, generative AI training, and MSME-registered proof.",
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
    title: "Dev N Suman | Founder & CEO of AlgoForce AI",
    description:
      "Dev N Suman is the Founder and CEO of AlgoForce AI, building AI systems, automation, marketing technology, education, and startup execution infrastructure.",
    keywords: combineKeywords(coreKeywords, [
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
    title: "AlgoForce AI Team | AI, Marketing, Growth & Operations Leaders",
    description:
      "Meet the AlgoForce AI team across AI systems, marketing, growth, finance, operations, Labs, client execution, and founder support.",
    keywords: combineKeywords(coreKeywords, pageKeywords.marketing, [
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
    title: "AlgoForce AI | AI Agency, Automation, Marketing & Growth Systems",
    description:
      "AlgoForce AI builds custom AI systems, workflow automation, marketing automation, startup MVPs, AI tools, and training programs for modern organizations.",
    keywords: defaultKeywords,
    image: ogImage,
    robots: "index, follow",
  },
};

export { buildSchema, coreKeywords, defaultKeywords, siteName, siteUrl };
export default seoConfig;
