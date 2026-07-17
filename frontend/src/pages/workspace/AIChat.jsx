/**
 * AIChat.jsx
 * Full-page context-aware AI assistant.
 * Knows company profile, uploaded documents, recent tasks, CRM deals, and pending approvals.
 */
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getDocuments, getGeneratedDocs, getAssessment } from '../../services/workspaceService'
import { getTasks, getApprovals, getCRMCompanies } from '../../services/operationsService'
import { hasApiKey, streamOpenAI } from '../../services/openaiService'
import ReactMarkdown from 'react-markdown'
import { logActivity } from '../../services/activityService'

export default function AIChat({ isFloating = false }) {
  const { user, company } = useAuth()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [thinking, setThinking] = useState(false)
  const chatEndRef = useRef(null)

  // Context loaded states
  const [context, setContext] = useState(null)
  const [loadingContext, setLoadingContext] = useState(true)

  useEffect(() => {
    if (company?.id) {
      loadWorkspaceContext()
    }
  }, [company])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadWorkspaceContext = async () => {
    setLoadingContext(true)
    try {
      const [uDocs, gDocs, tasks, approvals, crmCo, assessment] = await Promise.all([
        getDocuments(company.id),
        getGeneratedDocs(company.id),
        getTasks(company.id),
        getApprovals(company.id, 'pending'),
        getCRMCompanies(company.id),
        getAssessment(company.id)
      ])
      
      setContext({
        companyName: company.name,
        documents: uDocs.map(d => ({ name: d.name, category: d.category, length: d.extracted_text?.length || 0 })),
        generated: gDocs.map(g => ({ title: g.title, type: g.type })),
        tasks: tasks.map(t => ({ title: t.title, status: t.status, priority: t.priority, due: t.due_date })),
        approvals: approvals.map(a => ({ title: a.title, priority: a.priority })),
        crm: crmCo.map(c => ({ name: c.name, status: c.status, value: c.value })),
        assessment: assessment?.form_data || {}
      })
    } catch (err) {
      console.error('Failed to load workspace context for AI', err)
    } finally {
      setLoadingContext(false)
    }
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || thinking) return

    if (!hasApiKey()) {
      setMessages(prev => [...prev,
        { role: 'user', content: input },
        { role: 'assistant', content: '⚠️ AI is not yet configured for this platform. Please contact your administrator.' }
      ])
      setInput('')
      return
    }

    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setThinking(true)

    // Build context summary prompt block
    const docSummary = (context?.documents || []).map(d => `- ${d.name} (${d.category})`).join('\n')
    const taskSummary = (context?.tasks || []).slice(0, 10).map(t => `- [${t.status}] ${t.title} (${t.priority}, due ${t.due || 'none'})`).join('\n')
    const crmSummary = (context?.crm || []).map(c => `- ${c.name} (${c.status}, value ₹${c.value || 0})`).join('\n')
    const genSummary = (context?.generated || []).map(g => `- ${g.title} (${g.type})`).join('\n')
    const assessmentSummary = JSON.stringify(context?.assessment || {})

    const systemPrompt = `You are the primary AI operations assistant for a company using AlgoForce OS. You have context over their entire operational layer.
Company Profile Name: ${context?.companyName || 'Unknown'}
Uploaded Documents:
${docSummary || 'None'}
Generated Business Docs (SOPs, Proposals, Reports):
${genSummary || 'None'}
Task Registry (recent):
${taskSummary || 'None'}
CRM Clients & Deals:
${crmSummary || 'None'}
Business Assessment JSON: ${assessmentSummary}

Answer client requests with this knowledge. If they ask to locate a document, tell them its name. If they ask about tasks, list them. Be professional, direct, and concise.`

    // Stream response token-by-token using the service layer (key stays private)
    let streamBuffer = ''
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      await streamOpenAI(
        [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
          { role: 'user', content: userMsg.content }
        ],
        (chunk) => {
          streamBuffer += chunk
          setMessages(prev => {
            const updated = [...prev]
            updated[updated.length - 1] = { role: 'assistant', content: streamBuffer }
            return updated
          })
        }
      )
      await logActivity(company.id, user.id, 'search', `AI Chat query: "${userMsg.content.slice(0, 50)}..."`)
    } catch (err) {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'assistant', content: 'Connection failed: ' + err.message }
        return updated
      })
    } finally {
      setThinking(false)
    }
  }

  return (
    <div className="h-full flex flex-col">
      {!isFloating && (
        <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-[#06101d]">Ask Anything</h1>
            <p className="text-sm text-slate-500 mt-0.5">Chat with the AI that has access to your entire company repository, tasks, CRM registry, and vaults.</p>
          </div>
          <button
            onClick={loadWorkspaceContext}
            className="text-xs font-semibold text-[#8f38ff] bg-[#8f38ff]/5 border border-[#8f38ff]/10 px-3 py-1.5 rounded-lg hover:bg-[#8f38ff]/10"
          >
            🔄 Refresh Context
          </button>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#f7f9fc]">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md">
              <span className="text-4xl block mb-4">💬</span>
              <h3 className="font-bold text-[#06101d] mb-1">Ask Anything</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                This assistant is loaded with context from your active workspace. You can query tasks, lookup CRM prospects, draft business proposals, or summarize files.
              </p>
              <div className="mt-5 space-y-2">
                {['What tasks are overdue?', 'Do we have any pending approvals?', 'Show active prospects in the CRM'].map(q => (
                  <button
                    key={q}
                    onClick={() => { setInput(q) }}
                    className="block w-full text-left px-4 py-2.5 rounded-xl border border-[#06101d]/8 bg-white text-xs font-medium text-slate-600 hover:border-[#8f38ff] transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
              m.role === 'user'
                ? 'bg-[#06101d] text-white shadow-xs'
                : 'bg-white text-[#06101d] border border-[#06101d]/8 shadow-xs'
            }`}>
              {m.role === 'assistant' ? (
                <div className="prose prose-slate prose-headings:font-bold prose-headings:text-[#06101d] prose-h2:text-sm prose-p:text-slate-650 prose-li:text-slate-650 max-w-none">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              ) : m.content}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex justify-start">
            <div className="bg-white border border-[#06101d]/8 rounded-2xl px-4 py-3 shadow-xs">
              <div className="flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 bg-[#8f38ff] rounded-full animate-bounce [animation-delay:0ms]" />
                <div className="w-1.5 h-1.5 bg-[#8f38ff] rounded-full animate-bounce [animation-delay:150ms]" />
                <div className="w-1.5 h-1.5 bg-[#8f38ff] rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 p-4 border-t border-[#06101d]/8 bg-white">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={thinking}
            placeholder={loadingContext ? 'Syncing OS context...' : 'Ask the OS assistant... e.g. What proposals do we have active?'}
            className="flex-1 px-4 py-3 rounded-xl border border-[#06101d]/12 bg-[#f7f9fc] text-xs focus:outline-none focus:ring-1 focus:ring-[#8f38ff]"
          />
          <button
            type="submit"
            disabled={!input.trim() || thinking || loadingContext}
            className="px-5 py-3 bg-[#06101d] text-white rounded-xl text-xs font-bold hover:bg-[#102640] transition-all disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
