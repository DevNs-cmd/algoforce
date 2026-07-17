import { supabase, isSupabaseClientConfigured } from './supabase'

// ── LOCAL STORAGE FALLBACK SEED DATA ──────────────────────────────────────────
const SEED_WORKSPACES = [
  { id: 'ws-acme', name: 'Acme Operations Ltd', role: 'Owner', status: 'Active', plan: 'Enterprise', joined: '2026-01-12' },
  { id: 'ws-hotel', name: 'Hotel Horizon Resorts', role: 'Admin', status: 'Active', plan: 'Scale', joined: '2026-03-20' },
  { id: 'ws-factory', name: 'Factory Solutions Corp', role: 'Operations', status: 'Setup Phase', plan: 'Custom', joined: '2026-07-01' }
]

const SEED_PROJECTS = [
  {
    id: 'proj-tally',
    workspaceId: 'ws-acme',
    name: 'TallyGPT Accounting Software',
    status: 'Testing', // Current step
    milestones: [
      { name: 'Assessment', status: 'Completed', date: '2026-06-05' },
      { name: 'Planning', status: 'Completed', date: '2026-06-12' },
      { name: 'Integration', status: 'Completed', date: '2026-06-25' },
      { name: 'Testing', status: 'In Progress', date: '2026-07-10' },
      { name: 'Training', status: 'Pending', date: null },
      { name: 'Go-Live', status: 'Pending', date: null },
      { name: 'Support', status: 'Pending', date: null }
    ],
    engineers: ['Rohan Sharma', 'Vikram Aditya'],
    lastUpdate: 'Validation test scripts completed with 99.4% intent accuracy.',
    tasks: [
      { id: 't1', title: 'Audit Tally ERP database schemas', completed: true },
      { id: 't2', title: 'Connect local ledger bridge connector', completed: true },
      { id: 't3', title: 'Run natural language parsing tests', completed: true },
      { id: 't4', title: 'Reconcile historical June 2026 banking entries', completed: false },
      { id: 't5', title: 'Execute accounting staff workshop', completed: false }
    ]
  },
  {
    id: 'proj-leadbolt',
    workspaceId: 'ws-acme',
    name: 'LeadBolt Lead Management Software',
    status: 'Support',
    milestones: [
      { name: 'Assessment', status: 'Completed', date: '2026-05-01' },
      { name: 'Planning', status: 'Completed', date: '2026-05-04' },
      { name: 'Integration', status: 'Completed', date: '2026-05-15' },
      { name: 'Testing', status: 'Completed', date: '2026-05-22' },
      { name: 'Training', status: 'Completed', date: '2026-05-28' },
      { name: 'Go-Live', status: 'Completed', date: '2026-06-01' },
      { name: 'Support', status: 'In Progress', date: '2026-06-01' }
    ],
    engineers: ['Amit Verma'],
    lastUpdate: 'Lead response time reduced to 4 seconds. Native CRM logs active.',
    tasks: [
      { id: 'l1', title: 'Configure official WhatsApp Cloud API keys', completed: true },
      { id: 'l2', title: 'Establish Zoho CRM sales pipeline webhook mapping', completed: true },
      { id: 'l3', title: 'Run custom qualification branch validations', completed: true },
      { id: 'l4', title: 'Handover operator metrics dashboard', completed: true }
    ]
  }
]

const SEED_INTEGRATIONS = [
  { id: 'int-tally', name: 'Tally', status: 'Pending', category: 'ERP', type: 'Requires connector' },
  { id: 'int-sap', name: 'SAP', status: 'Available', category: 'ERP', type: 'Requires connector' },
  { id: 'int-zoho', name: 'Zoho', status: 'Connected', category: 'CRM', type: 'Native Integration' },
  { id: 'int-salesforce', name: 'Salesforce', status: 'Available', category: 'CRM', type: 'Native Integration' },
  { id: 'int-whatsapp', name: 'WhatsApp', status: 'Connected', category: 'Messaging', type: 'Native Integration' },
  { id: 'int-shopify', name: 'Shopify', status: 'Available', category: 'Commerce', type: 'Native Integration' },
  { id: 'int-hubspot', name: 'HubSpot', status: 'Available', category: 'CRM', type: 'Native Integration' },
  { id: 'int-google', name: 'Google Workspace', status: 'Connected', category: 'Workspace', type: 'Native Integration' },
  { id: 'int-microsoft', name: 'Microsoft 365', status: 'Available', category: 'Workspace', type: 'Native Integration' },
  { id: 'int-oracle', name: 'Oracle', status: 'Coming Soon', category: 'ERP', type: 'Requires connector' },
  { id: 'int-mongodb', name: 'MongoDB', status: 'Available', category: 'Database', type: 'Native Integration' },
  { id: 'int-postgres', name: 'PostgreSQL', status: 'Connected', category: 'Database', type: 'Native Integration' },
  { id: 'int-aws', name: 'AWS', status: 'Connected', category: 'Cloud', type: 'Compatible' },
  { id: 'int-azure', name: 'Azure', status: 'Available', category: 'Cloud', type: 'Compatible' },
  { id: 'int-gcp', name: 'Google Cloud', status: 'Available', category: 'Cloud', type: 'Compatible' }
]

const SEED_TICKETS = [
  { id: 'tkt-101', subject: 'Tally Prime bridge reconnection lag', status: 'Open', priority: 'High', category: 'Integration', date: '2026-07-16', messages: [{ sender: 'user', text: 'We noticed a 12-second latency in pulling voucher details compared to normal.' }] },
  { id: 'tkt-102', subject: 'Invoice Billing Query for July 2026', status: 'Resolved', priority: 'Low', category: 'Billing', date: '2026-07-02', messages: [{ sender: 'user', text: 'Is the implementation setup fee included in this cycle?' }, { sender: 'support', text: 'Yes, the invoice details are split under Itemized line-items.' }] }
]

const SEED_DOCUMENTS = [
  { id: 'doc-001', name: 'AlgoForce_Business_Assessment_Summary.pdf', type: 'Report', size: '2.4 MB', date: '2026-06-08' },
  { id: 'doc-002', name: 'SaaS_Software_Agreement_Fully_Executed.pdf', type: 'Contract', size: '4.1 MB', date: '2026-06-15' },
  { id: 'doc-003', name: 'TallyGPT_Deployment_VPC_Architecture.png', type: 'Architecture', size: '1.2 MB', date: '2026-06-20' },
  { id: 'doc-004', name: 'Inv_2026_06_Acme.pdf', type: 'Invoice', size: '124 KB', date: '2026-07-01' }
]

const SEED_NOTIFICATIONS = [
  { id: 'not-1', type: 'Assessment Complete', text: 'Your Operations Opportunity Report has been generated.', date: '2026-06-08', unread: true },
  { id: 'not-2', type: 'Project Updated', text: 'TallyGPT milestone advanced from Integration to Testing phase.', date: '2026-07-10', unread: true },
  { id: 'not-3', type: 'Invoice Ready', text: 'July 2026 monthly billing invoice is ready for download.', date: '2026-07-01', unread: false }
]

const SEED_INVOICES = [
  { id: 'INV-2026-001', date: '2026-07-01', amount: 'Contact for pricing', plan: 'Enterprise Monthly Subscription', status: 'Paid', file: 'Inv_2026_06_Acme.pdf' },
  { id: 'INV-2026-002', date: '2026-06-15', amount: 'Contact for pricing', plan: 'TallyGPT Setup Configuration Fee', status: 'Paid', file: 'Setup_Acme_06.pdf' }
]

// ── HELPER TO GET INITIAL DATABASE STATE FROM LOCALSTORAGE ────────────────────
const getLocalData = (key, defaultValue) => {
  const data = localStorage.getItem(`af_db_${key}`)
  if (!data) {
    localStorage.setItem(`af_db_${key}`, JSON.stringify(defaultValue))
    return defaultValue
  }
  return JSON.parse(data)
}

const saveLocalData = (key, value) => {
  localStorage.setItem(`af_db_${key}`, JSON.stringify(value))
}

// Initialize tables in state
let db = {
  workspaces: getLocalData('workspaces', SEED_WORKSPACES),
  projects: getLocalData('projects', SEED_PROJECTS),
  integrations: getLocalData('integrations', SEED_INTEGRATIONS),
  tickets: getLocalData('tickets', SEED_TICKETS),
  documents: getLocalData('documents', SEED_DOCUMENTS),
  notifications: getLocalData('notifications', SEED_NOTIFICATIONS),
  invoices: getLocalData('invoices', SEED_INVOICES),
  assessments: getLocalData('assessments', []),
  conversations: getLocalData('conversations', []),
  members: getLocalData('members', [
    { email: 'dev@algoforceaii.com', name: 'Dev N Suman', role: 'Owner' },
    { email: 'finance@acme.com', name: 'Alok Gupta', role: 'Finance' },
    { email: 'ops@acme.com', name: 'Shreya Roy', role: 'Operations' }
  ])
}

const updateDb = (key, value) => {
  db[key] = value
  saveLocalData(key, value)
}

// ── CUSTOMER & CLIENT SERVICE WRAPPER ──────────────────────────────────────────
export const supabaseService = {
  // Authentication Simulated Persistence
  getCurrentUser: () => {
    const localUser = localStorage.getItem('af_user')
    return localUser ? JSON.parse(localUser) : null
  },
  
  // Workspaces
  getWorkspaces: () => db.workspaces,
  createWorkspace: (name) => {
    const newWs = {
      id: `ws-${Math.random().toString(36).substr(2, 9)}`,
      name,
      role: 'Owner',
      status: 'Setup Phase',
      plan: 'Scale',
      joined: new Date().toISOString().split('T')[0]
    }
    const list = [...db.workspaces, newWs]
    updateDb('workspaces', list)
    return newWs
  },

  // Company Members / Roles
  getMembers: () => db.members,
  inviteMember: (email, name, role) => {
    const list = [...db.members, { email, name, role }]
    updateDb('members', list)
    return list
  },

  // Assessments Onboarding Wizard
  getAssessments: () => db.assessments,
  saveAssessment: (formData) => {
    // Generate reports dynamically based on their inputs
    const complexity = formData.currentSoftware ? (formData.currentSoftware.split(',').length > 2 ? 'High' : 'Medium') : 'Low'
    const recommended = []
    
    const inputLower = JSON.stringify(formData).toLowerCase()
    if (inputLower.includes('tally') || inputLower.includes('accounting') || inputLower.includes('invoice')) {
      recommended.push('TallyGPT')
      recommended.push('GST Autopilot')
    }
    if (inputLower.includes('lead') || inputLower.includes('sale') || inputLower.includes('crm')) {
      recommended.push('LeadBolt')
    }
    if (inputLower.includes('hotel') || inputLower.includes('room') || inputLower.includes('guest')) {
      recommended.push('HotelGPT')
    }
    if (inputLower.includes('defect') || inputLower.includes('factory') || inputLower.includes('camera') || inputLower.includes('quality')) {
      recommended.push('FactoryGPT')
    }
    if (inputLower.includes('file') || inputLower.includes('sop') || inputLower.includes('documents')) {
      recommended.push('Corporate Brain')
    }
    if (inputLower.includes('employee') || inputLower.includes('leave') || inputLower.includes('hr')) {
      recommended.push('HR Copilot')
    }
    if (recommended.length === 0) {
      recommended.push('Corporate Brain')
      recommended.push('LeadBolt')
    }

    const report = {
      id: `asm-${Date.now()}`,
      timestamp: new Date().toISOString(),
      formData,
      summary: `Operations review for ${formData.companyName || 'your company'}. Current infrastructure includes ${formData.currentSoftware || 'no local ERPs'} running across ${formData.locations || '1'} location(s). We identified core bottlenecks in: ${formData.painPoints || 'repetitive operations'}.`,
      opportunityReport: `Deploying ${recommended.join(' and ')} will automate active routines. Estimated operational speed is projected to improve by 10x for targeted data pipelines.`,
      recommendedProducts: recommended,
      roadmap: [
        'Business Assessment Completion',
        'Database Connector Verification & Schema Mapping',
        'Configuration of Software Templates',
        'Internal UAT testing runs',
        'Staff Onboarding & Go-Live launch'
      ],
      timeline: '2 to 4 weeks deployment schedule.',
      complexity
    }

    const list = [report, ...db.assessments]
    updateDb('assessments', list)

    // Trigger notification
    const newNotif = {
      id: `not-${Date.now()}`,
      type: 'Assessment Complete',
      text: `Opportunity Report for ${formData.companyName} has been successfully generated.`,
      date: new Date().toISOString().split('T')[0],
      unread: true
    }
    updateDb('notifications', [newNotif, ...db.notifications])

    return report
  },

  // Active Projects
  getProjects: () => db.projects,
  updateProjectTask: (projId, taskId, completed) => {
    const list = db.projects.map(p => {
      if (p.id === projId) {
        return {
          ...p,
          tasks: p.tasks.map(t => t.id === taskId ? { ...t, completed } : t)
        }
      }
      return p
    })
    updateDb('projects', list)
    return list
  },
  addProjectComment: (projId, comment) => {
    const list = db.projects.map(p => {
      if (p.id === projId) {
        return {
          ...p,
          lastUpdate: comment
        }
      }
      return p
    })
    updateDb('projects', list)
    return list
  },

  // Integrations Status Toggle
  getIntegrations: () => db.integrations,
  toggleIntegration: (intId, newStatus) => {
    const list = db.integrations.map(i => i.id === intId ? { ...i, status: newStatus } : i)
    updateDb('integrations', list)
    return list
  },

  // Support Tickets
  getTickets: () => db.tickets,
  createTicket: (subject, category, priority, text) => {
    const newTicket = {
      id: `tkt-${Math.floor(100 + Math.random() * 900)}`,
      subject,
      status: 'Open',
      priority,
      category,
      date: new Date().toISOString().split('T')[0],
      messages: [{ sender: 'user', text }]
    }
    const list = [newTicket, ...db.tickets]
    updateDb('tickets', list)
    return newTicket
  },
  replyTicket: (tktId, sender, text) => {
    const list = db.tickets.map(t => {
      if (t.id === tktId) {
        return {
          ...t,
          status: sender === 'support' ? 'Resolved' : 'Open',
          messages: [...t.messages, { sender, text }]
        }
      }
      return t
    })
    updateDb('tickets', list)
    return list
  },

  // Documents
  getDocuments: () => db.documents,
  uploadDocument: (name, type, size) => {
    const newDoc = {
      id: `doc-${Math.random().toString(36).substr(2, 5)}`,
      name,
      type,
      size,
      date: new Date().toISOString().split('T')[0]
    }
    const list = [newDoc, ...db.documents]
    updateDb('documents', list)
    return newDoc
  },

  // Invoices & Billing
  getInvoices: () => db.invoices,

  // Notifications
  getNotifications: () => db.notifications,
  markNotificationsRead: () => {
    const list = db.notifications.map(n => ({ ...n, unread: false }))
    updateDb('notifications', list)
    return list
  },

  // AI Conversations for Docked Assistant
  getConversations: () => db.conversations,
  saveConversation: (messages) => {
    const conv = {
      id: `conv-${Date.now()}`,
      timestamp: new Date().toISOString(),
      messages
    }
    const list = [conv, ...db.conversations]
    updateDb('conversations', list)
    return conv
  },

  // AI OpenAI Call Router
  askAssistant: async (messageText, conversationHistory, customApiKey = null) => {
    if (customApiKey) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${customApiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: 'You are the AlgoForce Operations Assistant. Help users explore software products, construct deployment roadmaps, create SOP drafts, configure database credentials, design automation steps, and summarize operational workflows. Respond clearly without complex AI jargon.' },
              ...conversationHistory,
              { role: 'user', content: messageText }
            ]
          })
        })
        const resData = await response.json()
        if (resData.choices?.[0]?.message?.content) {
          return resData.choices[0].message.content
        }
      } catch (err) {
        console.error('Error connecting to OpenAI Live API:', err)
      }
    }

    // High fidelity simulator fallback
    return new Promise((resolve) => {
      setTimeout(() => {
        const lower = messageText.toLowerCase()
        if (lower.includes('sop') || lower.includes('procedure')) {
          resolve(`### Standard Operating Procedure (SOP) Template

**Title:** Automated Ledger Sync Verification  
**Department:** Accounting & Operations  
**Frequency:** Daily  

1. **Verify Connection:** Confirm that the local Tally Prime service has connected via the read-only credentials check.
2. **Review Exception Logs:** Inspect the dashboard for unmatched transaction triggers.
3. **Execute Reconciliations:** Double-click unresolved voucher batches and click "Run Smart Reconciler" to automatically balance lines.
4. **Export Report:** Trigger the daily ledger summary and deliver to the CFO dashboard.

*Generated by Operations Assistant*`)
        } else if (lower.includes('checklist') || lower.includes('step')) {
          resolve(`### Software Deployment Checklist (2 to 4 Weeks Roadmap)

1. **[Week 1] System Mapping & Access Setup:** Map the database schema fields. Provision read-only database user credentials.
2. **[Week 2] Software Configuration:** Set up the ready-to-use template environment matching Tally and CRM models.
3. **[Week 3] Integration Testing:** Perform verification tests of active pipelines (e.g. leads sync, balance reconciliation).
4. **[Week 4] Training & Go-Live:** Execute key staff onboarding and launch production logs.`)
        } else if (lower.includes('product') || lower.includes('recommend')) {
          resolve(`Based on your company workflows, I recommend deploying:
- **TallyGPT** to auto-reconcile invoices, vouchers, and transactions in plain English.
- **LeadBolt** to immediately capture incoming WhatsApp leads and write details to your Zoho or Salesforce CRM 24/7.
- **GST Autopilot** to match purchase registers with GST Portal returns to avoid tax credit leakages.`)
        } else if (lower.includes('tally') || lower.includes('sap')) {
          resolve(`Our ready-to-use software products integrate natively with **Tally** databases or **SAP** gateways. Connection is read-only and runs securely inside your own private cloud or on-premises server.`)
        } else {
          resolve(`I am the Operations Assistant. I can help you generate SOPs, build custom deployment checklists, recommend AI software products, search documents, explain your business assessment roadmap, and plan database integration connections. 

How can I help you automate your business operations today?`)
        }
      }, 700)
    })
  }
}
