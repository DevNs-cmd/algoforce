/**
 * openaiService.js
 * OpenAI API calls — key sourced from environment variable only.
 * Customers never see, set, or interact with the key.
 * All AI calls are transparent — users click "Create" or "Summarize", AI runs silently.
 */

const OPENAI_BASE = 'https://api.openai.com/v1'

// Key from environment only — never from localStorage or customer input
function getApiKey() {
  return import.meta.env.VITE_OPENAI_API_KEY || ''
}

// Internal readiness check used by modules to gracefully handle unconfigured state
export function hasApiKey() {
  return !!getApiKey()
}

// ─── PUBLIC AI HELPER FUNCTIONS ───────────────────────────────────────────────
// Named for the business action performed, not the underlying AI model.

/** Ask Anything — business AI assistant with optional company context */
export async function askAnything(userMessage, context = '') {
  const systemPrompt = context
    ? `You are a business AI assistant. Use this company context to answer accurately:\n\n${context}`
    : 'You are a helpful business AI assistant. Be concise and practical.'
  const key = getApiKey()
  if (!key) return '[AI unavailable — platform configuration required]'
  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: 'gpt-4o-mini', temperature: 0.3, messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ]}),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.choices?.[0]?.message?.content || ''
}

/** Generate executive report — returns markdown */
export async function generateReport(period, companyData) {
  const key = getApiKey()
  if (!key) return '[AI unavailable — platform configuration required]'
  const prompt = `You are a CFO-level analyst. Generate a professional executive ${period} report in markdown with sections: Executive Summary, Key Achievements, Risks & Issues, Financial Highlights, Project Status, Recommendations, Next Period Priorities.\n\nCompany data:\n${JSON.stringify(companyData, null, 2)}`
  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: 'gpt-4o', temperature: 0.3, max_tokens: 4096, messages: [{ role: 'user', content: prompt }] }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.choices?.[0]?.message?.content || ''
}

/** Summarize meeting notes — returns structured JSON */
export async function summarizeMeeting(rawNotes) {
  const key = getApiKey()
  if (!key) return '[AI unavailable — platform configuration required]'
  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: 'gpt-4o-mini', temperature: 0.2, max_tokens: 4096, messages: [
      { role: 'system', content: 'You are a professional meeting summarizer. Return JSON: { summary, decisions[], action_items[{task,owner,due_date}], attendees[], next_steps[] }' },
      { role: 'user', content: `Summarize:\n\n${rawNotes}` },
    ]}),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.choices?.[0]?.message?.content || ''
}

/** Create SOP — returns markdown document */
export async function createSOP(processName, context = '') {
  const key = getApiKey()
  if (!key) return '[AI unavailable — platform configuration required]'
  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: 'gpt-4o-mini', temperature: 0.3, max_tokens: 4096, messages: [
      { role: 'system', content: 'You are an expert business process consultant. Create a detailed Standard Operating Procedure in markdown with: Purpose, Scope, Responsibilities, Step-by-step Procedure (numbered), Quality Checks, Document Control.' },
      { role: 'user', content: `Create SOP for: ${processName}\n\nContext: ${context}` },
    ]}),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.choices?.[0]?.message?.content || ''
}

/** Generate formal business document (proposal, quotation, letter) — returns markdown */
export async function generateDocument(docType, details, companyContext = '') {
  const key = getApiKey()
  if (!key) return '[AI unavailable — platform configuration required]'
  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: 'gpt-4o-mini', temperature: 0.4, max_tokens: 4096, messages: [
      { role: 'system', content: `You are a professional business writer. Generate a formal ${docType} in markdown. Use professional language with all standard sections.` },
      { role: 'user', content: `Generate a ${docType}:\n${details}\n\nCompany context:\n${companyContext}` },
    ]}),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.choices?.[0]?.message?.content || ''
}

/** Answer from uploaded company documents */
export async function answerFromDocuments(question, documentTexts = []) {
  const key = getApiKey()
  if (!key) return '[AI unavailable — platform configuration required]'
  const context = documentTexts.join('\n\n---\n\n').slice(0, 14000)
  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: 'gpt-4o-mini', temperature: 0.2, max_tokens: 4096, messages: [
      { role: 'system', content: 'Answer questions ONLY from the provided company documents. If not found, say so. Quote relevant sections when helpful.' },
      { role: 'user', content: `Documents:\n${context}\n\nQuestion: ${question}` },
    ]}),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.choices?.[0]?.message?.content || ''
}

/** Automation recommendations based on business assessment */
export async function getAutomationRecommendations(assessmentData) {
  const key = getApiKey()
  if (!key) return '[AI unavailable — platform configuration required]'
  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: 'gpt-4o-mini', temperature: 0.3, max_tokens: 4096, messages: [
      { role: 'system', content: 'You are an AI automation consultant for Indian SMEs. Return JSON array: [{title, description, roi_estimate, effort, priority, tools_involved}] — top 5 automation opportunities.' },
      { role: 'user', content: `Assessment:\n${JSON.stringify(assessmentData, null, 2)}` },
    ]}),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.choices?.[0]?.message?.content || ''
}

// ─────────────────────────────────────────────────────────────────────────────
/** Core call — full (non-streaming) */
async function callOpenAI(messages, model = 'gpt-4o-mini', temperature = 0.3) {
  const key = getApiKey()
  if (!key) {
    throw new Error('No OpenAI API key configured. Go to Settings → AI Configuration to add your key.')
  }

  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ model, messages, temperature, max_tokens: 4096 }),
  })

  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.choices?.[0]?.message?.content || ''
}

/** Core call — streaming, calls onChunk(text) incrementally */
export async function streamOpenAI(messages, onChunk, model = 'gpt-4o-mini', temperature = 0.3) {
  const key = getApiKey()
  if (!key) {
    throw new Error('No OpenAI API key configured. Go to Settings → AI Configuration to add your key.')
  }

  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ model, messages, temperature, max_tokens: 4096, stream: true }),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error?.message || `HTTP ${res.status}`)
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let fullText = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop()

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      const data = line.slice(6).trim()
      if (data === '[DONE]') continue
      try {
        const parsed = JSON.parse(data)
        const chunk = parsed.choices?.[0]?.delta?.content
        if (chunk) {
          fullText += chunk
          onChunk(chunk)
        }
      } catch (_) { /* ignore parse errors */ }
    }
  }
  return fullText
}

// ─────────────────────────────────────────────────────────────────────────────
// DOCUMENT ANALYSIS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Analyze a document (contract, invoice, SOP, etc.)
 * Returns structured analysis as markdown text.
 */
export async function analyzeDocument(text, docType = 'document', fileName = '') {
  const messages = [
    {
      role: 'system',
      content: `You are a professional business document analyst. Analyze the provided ${docType} and return a structured report in markdown format with these sections:

## Summary
A concise 2-3 sentence summary of what this document is about.

## Key Information
Bullet points listing the most important facts, figures, parties, and dates.

## Obligations & Deadlines
Any commitments, payment terms, deadlines, or time-sensitive items found.

## Risks & Red Flags
Potential risks, unfavorable clauses, missing information, or items requiring attention.

## Action Items
Concrete next steps the reader should take based on this document.

Be factual and specific. Reference actual content from the document. Do not fabricate information.`,
    },
    {
      role: 'user',
      content: `Document Name: ${fileName}\nDocument Type: ${docType}\n\n--- DOCUMENT CONTENT ---\n${text.slice(0, 12000)}`,
    },
  ]
  return callOpenAI(messages, 'gpt-4o-mini')
}

// ─────────────────────────────────────────────────────────────────────────────
// MEETING NOTES
// ─────────────────────────────────────────────────────────────────────────────

export async function analyzeMeetingNotes(transcript, meetingTitle = 'Meeting') {
  const messages = [
    {
      role: 'system',
      content: `You are an expert meeting facilitator and business analyst. Process the meeting transcript and generate a professional meeting report in markdown with these sections:

## Meeting Overview
Date/title if mentioned, participants, and 1-sentence purpose.

## Summary
A concise paragraph summarizing what was discussed and decided.

## Key Decisions
A numbered list of all decisions made during the meeting.

## Action Items
A table with columns: | Task | Responsible | Deadline | Priority |
List every action item with the person assigned and any mentioned deadline.

## Open Questions
Items left unresolved that need follow-up.

## Next Steps
What happens next — next meeting, deliverables, reviews.

Be precise and extract real information from the transcript.`,
    },
    {
      role: 'user',
      content: `Meeting Title: ${meetingTitle}\n\n--- TRANSCRIPT ---\n${transcript.slice(0, 12000)}`,
    },
  ]
  return callOpenAI(messages, 'gpt-4o-mini')
}

// ─────────────────────────────────────────────────────────────────────────────
// SOP GENERATOR
// ─────────────────────────────────────────────────────────────────────────────

export async function generateSOP(processDescription, companyName = 'Your Company') {
  const messages = [
    {
      role: 'system',
      content: `You are an expert business process consultant and technical writer specializing in Standard Operating Procedures (SOPs). 

Generate a complete, professional SOP in markdown format with:

## Standard Operating Procedure
**Document ID:** SOP-[YYYY]-[NNN]  
**Company:** ${companyName}  
**Version:** 1.0  
**Effective Date:** ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}  
**Review Date:** [One year from effective date]

## 1. Purpose
Why this SOP exists.

## 2. Scope
Who this applies to, what departments, what situations.

## 3. Definitions
Key terms and abbreviations used in this document.

## 4. Responsibilities
Table: | Role | Responsibilities |

## 5. Procedure
Step-by-step numbered instructions. Use sub-steps (5.1, 5.2) as needed. Include decision points, approvals, and escalation paths.

## 6. Approval Workflow
Who approves at each stage, format: Role → Action → Next Step

## 7. Document Control
Revision history table: | Version | Date | Changes | Author |

## 8. References
Any related policies, forms, or documents.

Be thorough, specific, and professional. This will be used by actual employees.`,
    },
    {
      role: 'user',
      content: `Create an SOP for the following process:\n\n${processDescription}`,
    },
  ]
  return callOpenAI(messages, 'gpt-4o-mini')
}

// ─────────────────────────────────────────────────────────────────────────────
// PROPOSAL / DOCUMENT GENERATOR
// ─────────────────────────────────────────────────────────────────────────────

export async function generateProposal(inputs) {
  const { docType, clientName, projectName, scope, budget, timeline, companyName, additionalInfo } = inputs

  const messages = [
    {
      role: 'system',
      content: `You are a senior business development consultant. Generate a professional ${docType} in markdown format. Include all standard sections for this document type. Use formal business language. Be specific with numbers, dates, and deliverables where provided. Format should be ready to send to a client.`,
    },
    {
      role: 'user',
      content: `Generate a ${docType} with these details:
- Our Company: ${companyName}
- Client/Recipient: ${clientName}
- Project/Service: ${projectName}
- Scope of Work: ${scope}
- Budget/Value: ${budget || 'To be discussed'}
- Timeline: ${timeline || 'To be agreed'}
- Additional Info: ${additionalInfo || 'None'}
- Date: ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}`,
    },
  ]
  return callOpenAI(messages, 'gpt-4o-mini')
}

// ─────────────────────────────────────────────────────────────────────────────
// KNOWLEDGE BASE Q&A
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Answer a question using document context.
 * @param {string} question - User's question
 * @param {Array<{name: string, text: string}>} documents - Extracted doc texts
 * @param {Array} history - Previous conversation messages
 */
export async function askKnowledgeBase(question, documents, history = []) {
  const contextText = documents
    .slice(0, 6) // Limit context to avoid token overflow
    .map((d) => `--- Document: "${d.name}" ---\n${d.text?.slice(0, 2000) || '[No text extracted]'}`)
    .join('\n\n')

  const systemPrompt = `You are an intelligent knowledge assistant for a business. You have access to the following company documents:

${contextText}

Answer questions ONLY based on information found in these documents. If the answer is not in the documents, say "I couldn't find information about this in your uploaded documents." Always cite which document your answer comes from. Be concise and professional.`

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-6), // Keep last 6 exchanges for context
    { role: 'user', content: question },
  ]
  return callOpenAI(messages, 'gpt-4o-mini')
}

// ─────────────────────────────────────────────────────────────────────────────
// KNOWLEDGE SEARCH
// ─────────────────────────────────────────────────────────────────────────────

export async function searchKnowledge(query, documents) {
  const contextText = documents
    .map((d) => `--- Document: "${d.name}" (ID: ${d.id}) ---\n${d.extracted_text?.slice(0, 1500) || '[No text]'}`)
    .join('\n\n')

  const messages = [
    {
      role: 'system',
      content: `You are a document search engine for a business knowledge base. Given a search query, identify the most relevant documents and extract the specific passages that answer the query.

Return results in this format:
## Search Results for: [query]

### Result 1 — [Document Name]
**Relevance:** High/Medium/Low  
**Relevant passage:** [Quote the actual relevant text]  
**Why it matches:** [Brief explanation]

If no documents are relevant, say so clearly.`,
    },
    {
      role: 'user',
      content: `Search Query: "${query}"\n\n${contextText}`,
    },
  ]
  return callOpenAI(messages, 'gpt-4o-mini')
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTOMATION RECOMMENDATIONS
// ─────────────────────────────────────────────────────────────────────────────

const ALGOFORCE_PRODUCTS = `
AlgoForce AI Products:
1. FactoryGPT — AI for manufacturing: defect detection, quality control, production monitoring
2. SalesGPT — AI for sales: lead scoring, CRM automation, pipeline management
3. HRMS AI — AI for HR: payroll automation, attendance, recruitment, onboarding
4. FinanceGPT — AI for finance: invoice processing, expense tracking, GST compliance, reconciliation
5. SupportGPT — AI for customer support: ticket routing, auto-responses, knowledge base chatbot
6. DocuScan AI — AI for document processing: OCR, data extraction from forms and invoices
7. Nexus — Business intelligence: automated reporting, KPI dashboards, data connectors
8. Crucible — Developer platform: build custom AI workflows and automation scripts
9. Velqora — CRM + sales automation: deal tracking, quote generation, client communication
`

export async function generateAutomationRecommendations(assessmentData, documents) {
  const docSummary = documents.slice(0, 4).map((d) => `- ${d.name}: ${d.extracted_text?.slice(0, 300)}`).join('\n')
  const assessmentText = Object.entries(assessmentData || {})
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')

  const messages = [
    {
      role: 'system',
      content: `You are a business automation consultant at AlgoForce. Analyze the company's assessment data and documents to identify their specific operational pain points, then recommend which AlgoForce products address each pain point with clear business reasoning.

${ALGOFORCE_PRODUCTS}

Format your response as:

## Automation Analysis for [Company Name]

### Identified Pain Points
List specific operational problems found from the assessment and documents.

### Recommended Solutions

For each recommendation:
#### [Product Name]
**Problem it solves:** [Specific pain point identified]
**Expected impact:** [Quantifiable benefit, e.g., "Reduce invoice processing time from 2 days to 4 hours"]
**Estimated ROI:** [Conservative estimate]
**Priority:** High/Medium/Low with reason

### Implementation Sequence
Recommended order to implement these solutions and why.

Be specific, data-driven, and honest. Only recommend products that genuinely address identified problems.`,
    },
    {
      role: 'user',
      content: `Company Assessment Data:\n${assessmentText}\n\nUploaded Documents:\n${docSummary}`,
    },
  ]
  return callOpenAI(messages, 'gpt-4o-mini')
}

// ─────────────────────────────────────────────────────────────────────────────
// ASSESSMENT REPORT
// ─────────────────────────────────────────────────────────────────────────────

export async function generateAssessmentReport(formData, companyName) {
  const messages = [
    {
      role: 'system',
      content: `You are a senior business consultant conducting an operational assessment. Based on the company's answers, generate a comprehensive Business Assessment Report in markdown with:

## Business Assessment Report
**Company:** [Name]  
**Date:** ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}

## Executive Summary
3-4 sentences on the company's current operational state and primary opportunities.

## Current State Analysis
Assessment of each operational area based on their answers.

## Key Findings
Top 5-7 findings with impact severity (Critical/High/Medium/Low).

## Automation Opportunity Matrix
Table: | Process | Current Method | Automation Potential | Business Impact |

## Recommended Roadmap
Phase 1 (Month 1-2), Phase 2 (Month 3-4), Phase 3 (Month 5-6) with specific actions.

## Estimated Impact
Conservative estimates of time saved, cost reduction, error rate improvement.

## Next Steps
3-5 concrete immediate actions.

Be analytical, specific, and professional.`,
    },
    {
      role: 'user',
      content: `Company Name: ${companyName}\n\nAssessment Answers:\n${Object.entries(formData).map(([k, v]) => `${k}: ${v}`).join('\n')}`,
    },
  ]
  return callOpenAI(messages, 'gpt-4o-mini')
}
