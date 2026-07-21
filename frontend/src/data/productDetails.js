export const PRODUCT_DETAILS = [
  {
    slug: 'finance-ai',
    name: 'AlgoForce Finance AI',
    tagline: 'Automate accounting work without replacing Tally.',
    function: 'Finance',
    problem: 'Finance teams lose time to reconciliation, exception review and answering repeat accounting questions across disconnected records.',
    whoItsFor: 'CFOs, finance leaders, accounting teams and CA firms that operate in Tally-driven environments.',
    outcomes: ['Reduce repetitive reconciliation work', 'Surface accounting exceptions earlier', 'Give teams faster access to financial answers'],
    features: ['Tally-connected accounting workflows', 'Exception and anomaly review', 'Natural-language finance questions', 'Support for private deployment requirements'],
    integrations: ['Tally Prime', 'Tally ERP 9', 'Local SQL gateway'],
    deploymentTimeline: 'A deployment plan is defined after confirming the Tally environment, data access and accounting workflow.',
    pricing: 'Scoped after a product demo and discovery conversation based on the Tally environment, deployment setup and support requirements.',
    screens: ['Reconciliation workspace', 'Exception review queue', 'Finance question interface'],
    faqs: [
      ['Will it replace Tally?', 'No. AlgoForce Finance AI is deployed around your Tally environment to automate accounting work without replacing the system of record.'],
      ['Who needs to be involved?', 'A finance owner and the person responsible for the Tally environment are usually enough to begin a product-fit conversation.']
    ]
  },
  {
    slug: 'leadbolt',
    name: 'LeadBolt',
    tagline: 'Turn every inbound lead into a faster, more consistent sales response.',
    function: 'Sales',
    problem: 'Sales teams miss high-intent leads when replies, qualification and CRM updates depend on manual follow-up.',
    whoItsFor: 'Sales leaders and revenue teams managing inbound enquiries across WhatsApp, web and CRM channels.',
    outcomes: ['Respond to inbound interest around the clock', 'Qualify leads against a consistent process', 'Keep CRM records current without copy-pasting'],
    features: ['Inbound lead engagement', 'Qualification workflows', 'CRM record updates', 'Meeting and handoff coordination'],
    integrations: ['WhatsApp Cloud API', 'Zoho CRM', 'Salesforce', 'HubSpot'],
    deploymentTimeline: 'The rollout is scoped around lead sources, qualification rules, CRM fields and team handoff requirements.',
    pricing: 'Scoped after demo and discovery based on lead channels, CRM connections and sales workflow coverage.',
    screens: ['Lead qualification flow', 'Conversation handoff view', 'CRM update activity'],
    faqs: [
      ['Which channels can LeadBolt support?', 'The product can be scoped for the inbound web, WhatsApp and CRM channels that your sales team already uses.'],
      ['Does it replace the sales team?', 'No. It automates the first-response and qualification work so your team can focus on the right sales conversations.']
    ]
  },
  {
    slug: 'factorygpt',
    name: 'FactoryGPT',
    tagline: 'Make quality inspection more consistent and visible on the production floor.',
    function: 'Manufacturing',
    problem: 'Manual quality checks make it difficult to detect defects consistently, record evidence and connect inspection data to operational systems.',
    whoItsFor: 'Factory owners, quality leaders and operations teams responsible for production quality and inspection workflows.',
    outcomes: ['Standardise quality inspection workflows', 'Identify exceptions sooner', 'Create a clearer operational record of quality events'],
    features: ['Live camera-feed analysis', 'Defect and exception flags', 'Quality-event logging', 'Industrial system integration planning'],
    integrations: ['Live camera feeds', 'Industrial PLCs', 'ERP log systems'],
    deploymentTimeline: 'The timeline is defined after reviewing camera coverage, quality rules, hardware environment and ERP logging requirements.',
    pricing: 'Scoped after demo and discovery based on production lines, cameras, edge deployment and integration requirements.',
    screens: ['Inspection event timeline', 'Exception review workspace', 'Quality operations report'],
    faqs: [
      ['Can FactoryGPT work on-premises?', 'Deployment options are considered during discovery, including on-premises and private-cloud environments where appropriate.'],
      ['What is needed for a demo?', 'A description of the inspection workflow, the production environment and any existing camera coverage is enough to start.']
    ]
  },
  {
    slug: 'hotelgpt',
    name: 'HotelGPT',
    tagline: 'Give guests a dependable response from enquiry to booking.',
    function: 'Hospitality',
    problem: 'Guest enquiries, booking requests and support questions are often missed or delayed when they depend on a limited front-desk team.',
    whoItsFor: 'Hotel owners, general managers and guest-experience teams handling direct booking and service communication.',
    outcomes: ['Reduce missed guest enquiries', 'Create a more consistent guest response', 'Support direct booking and service workflows'],
    features: ['Guest enquiry handling', 'Booking workflow support', 'Always-on guest communication', 'Property-system integration planning'],
    integrations: ['Property management systems', 'WhatsApp Cloud API', 'Payment workflow providers'],
    deploymentTimeline: 'The rollout is planned around the property system, booking rules, guest channels and escalation process.',
    pricing: 'Scoped after a product demo based on the number of properties, guest channels and connected systems.',
    screens: ['Guest conversation workspace', 'Booking handoff view', 'Service request queue'],
    faqs: [
      ['Can it handle guest questions outside office hours?', 'HotelGPT is designed to support guest communication beyond front-desk availability, with clear handoffs for the hotel team.'],
      ['Will it change our property-management system?', 'No. The deployment is designed around the property systems and guest channels you already operate.']
    ]
  },
  {
    slug: 'corporate-brain',
    name: 'Corporate Brain',
    tagline: 'Make approved company knowledge easy to find and use.',
    function: 'Knowledge',
    problem: 'Teams lose time locating the right policy, SOP, file or historical answer across disconnected folders and knowledge systems.',
    whoItsFor: 'Operations leaders, people teams and knowledge owners who need colleagues to find trusted information faster.',
    outcomes: ['Reduce time spent searching for internal information', 'Preserve institutional knowledge', 'Give teams a clearer source for approved answers'],
    features: ['Knowledge-source indexing', 'Secure internal search', 'Document and SOP retrieval', 'Access-control and deployment planning'],
    integrations: ['Google Workspace', 'Microsoft 365', 'Confluence', 'Internal file systems'],
    deploymentTimeline: 'The rollout is planned around the approved knowledge sources, permissions and information-governance requirements.',
    pricing: 'Scoped after discovery based on knowledge sources, access controls, data volume and deployment environment.',
    screens: ['Knowledge search interface', 'Source and permission review', 'Answer evidence view'],
    faqs: [
      ['Which documents can be included?', 'The discovery conversation identifies the sources that should be searchable and the information that must remain restricted.'],
      ['How are answers kept trustworthy?', 'The deployment is planned around approved sources, permissions and a clear process for maintaining knowledge over time.']
    ]
  },
  {
    slug: 'operational-intelligence',
    name: 'Operational Intelligence',
    tagline: 'Turn operating data into a clearer view of performance and bottlenecks.',
    function: 'Operations',
    problem: 'Leaders struggle to see operating performance when the data required for decisions is spread across systems and manual reports.',
    whoItsFor: 'COOs, operations leaders and finance teams that need dependable visibility into operational performance.',
    outcomes: ['Create a shared view of key operations', 'Identify process bottlenecks sooner', 'Reduce the effort required for recurring reporting'],
    features: ['Operational metric mapping', 'Data-connected reporting', 'Bottleneck visibility', 'Scheduled management updates'],
    integrations: ['PostgreSQL', 'MongoDB', 'Supabase', 'BigQuery'],
    deploymentTimeline: 'The rollout is scoped after reviewing the data sources, required metrics, reporting cadence and decision workflow.',
    pricing: 'Scoped after demo and discovery based on data sources, dashboard coverage and reporting needs.',
    screens: ['Operational performance dashboard', 'Bottleneck analysis view', 'Management reporting workspace'],
    faqs: [
      ['Can it connect to our existing databases?', 'The data environment is reviewed during discovery to confirm which sources and metrics can be included in the deployment.'],
      ['Is this only for reporting?', 'The goal is operational decision support: making the data behind recurring decisions easier to access and act on.']
    ]
  },
  {
    slug: 'inventory-copilot',
    name: 'Inventory Copilot',
    tagline: 'Keep stock decisions aligned across stores, channels and warehouses.',
    function: 'Operations',
    problem: 'Inventory teams face stockouts, excess holding and manual reconciliation when sales and stock records sit in separate systems.',
    whoItsFor: 'Retail, warehouse and operations teams coordinating inventory across multiple channels or locations.',
    outcomes: ['Improve inventory visibility', 'Reduce manual stock reconciliation', 'Make replenishment decisions more timely'],
    features: ['Cross-channel stock monitoring', 'Inventory reconciliation', 'Reorder alert workflows', 'Purchase-order preparation support'],
    integrations: ['Shopify', 'Amazon Seller Central', 'Tally ERP', 'SAP'],
    deploymentTimeline: 'The rollout is planned around inventory sources, sales channels, replenishment rules and warehouse workflows.',
    pricing: 'Scoped after a product-fit discussion based on locations, sales channels, stock sources and integration requirements.',
    screens: ['Stock health view', 'Reconciliation queue', 'Reorder workflow'],
    faqs: [
      ['Can it work across multiple inventory channels?', 'The product is designed to be scoped around the channels and stock systems that must stay aligned.'],
      ['Does it place orders automatically?', 'Approval rules and reorder workflows are defined during discovery so the deployment fits your operating controls.']
    ]
  },
  {
    slug: 'gst-autopilot',
    name: 'GST Autopilot',
    tagline: 'Reduce the manual effort and risk in GST matching workflows.',
    function: 'Finance',
    problem: 'Accounting teams spend significant time matching purchase records, finding GST mismatches and following up on compliance exceptions.',
    whoItsFor: 'Finance leaders, accounting teams and CA firms managing GST reconciliation and compliance workflows.',
    outcomes: ['Reduce manual GST matching work', 'Surface mismatches before filing deadlines', 'Give teams a clearer exception trail'],
    features: ['Purchase-register matching', 'Mismatch identification', 'Compliance exception logs', 'Vendor follow-up workflow support'],
    integrations: ['GST workflow sources', 'Tally Prime', 'SAP ERP'],
    deploymentTimeline: 'The deployment plan is based on the current reconciliation process, source systems, exception workflow and reviewer roles.',
    pricing: 'Scoped after a demo and discovery conversation based on source systems, transaction volume and workflow coverage.',
    screens: ['GST matching queue', 'Mismatch review', 'Compliance exception log'],
    faqs: [
      ['Does it replace the accounting team?', 'No. GST Autopilot is designed to reduce repetitive matching work while keeping the accounting team in control of review and filing decisions.'],
      ['Can it work with Tally?', 'Tally connectivity is discussed during discovery as part of the finance and compliance workflow.']
    ]
  },
  {
    slug: 'hr-copilot',
    name: 'HR Copilot',
    tagline: 'Give employees faster, more consistent support on everyday HR questions.',
    function: 'HR',
    problem: 'HR teams repeatedly answer policy and onboarding questions while employees struggle to find the current, approved information.',
    whoItsFor: 'HR leaders, people operations teams and growing organisations standardising employee support and onboarding.',
    outcomes: ['Reduce repeated employee questions', 'Make onboarding information easier to access', 'Create more consistent HR-policy guidance'],
    features: ['Employee policy assistance', 'Onboarding workflow support', 'Approved knowledge access', 'Internal communication integration planning'],
    integrations: ['Slack', 'Microsoft Teams', 'Google Drive', 'Notion'],
    deploymentTimeline: 'The timeline is planned around policy sources, access rules, employee channels and onboarding workflow requirements.',
    pricing: 'Scoped after a demo and discovery conversation based on employee channels, knowledge sources and required access controls.',
    screens: ['Employee support interface', 'Policy answer source view', 'Onboarding checklist'],
    faqs: [
      ['Will employees receive answers from approved policies?', 'The rollout identifies the HR sources that should inform answers and the process for keeping them current.'],
      ['Can it work in Teams or Slack?', 'The employee channels that matter to your organisation are reviewed during discovery and included where there is a fit.']
    ]
  }
]

export const getProductBySlug = (slug) => PRODUCT_DETAILS.find((product) => product.slug === slug)
