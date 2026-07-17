/**
 * AIChat.jsx
 * Context-aware AI assistant with a clean ChatGPT-like visual style.
 * Focuses on products, licenses, downloads, billing, and documentation. No emojis.
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
        { role: 'assistant', content: 'AI configuration error: API key is not configured in the workspace.' }
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
    const crmSummary = (context?.crm || []).map(c => `- ${c.name} (${c.status}, value ${c.value || 0})`).join('\n')
    const genSummary = (context?.generated || []).map(g => `- ${g.title} (${g.type})`).join('\n')
    const assessmentSummary = JSON.stringify(context?.assessment || {})

    const systemPrompt = `You are the primary AI assistant for AlgoForce Workspace. You have access to the customer's operational context.
Company Profile Name: ${context?.companyName || 'Unknown'}
Uploaded Documents:
${docSummary || 'None'}
Generated Business Docs:
${genSummary || 'None'}
Task Registry (recent):
${taskSummary || 'None'}
CRM Clients:
${crmSummary || 'None'}
Business Assessment JSON: ${assessmentSummary}

Your design is simple and clean. Provide concise, direct, professional answers. Avoid using emojis. Align explanations clearly.`

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
      await logActivity(company.id, user.id, 'search', `AI Assistant request: "${userMsg.content.slice(0, 50)}..."`)
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
    <div className="h-full flex flex-col bg-white border-l border-slate-100 font-sans antialiased text-slate-800">
      {/* Header */}
      {!isFloating && (
        <div className="flex-shrink-0 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h1 className="text-sm font-semibold text-slate-900">AlgoForce Assistant</h1>
            <p className="text-[10px] text-slate-450 mt-0.5">Workspace helper agent</p>
          </div>
          <button
            onClick={loadWorkspaceContext}
            className="text-[10px] font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Sync context
          </button>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {messages.length === 0 && (
          <div className="p-6 flex flex-col justify-center h-full text-center max-w-sm mx-auto space-y-4">
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900 text-xs">How can I help you?</h3>
              <p className="text-[11px] text-slate-450 leading-relaxed">
                Ask questions regarding products, licenses, downloads, invoices, support tickets, or release notes.
              </p>
            </div>
            <div className="space-y-2 text-left pt-2">
              {[
                'How do I activate TallyGPT?',
                'Show me the release notes for Aura AI',
                'Download the latest Windows client',
              ].map(q => (
                <button
                  key={q}
                  onClick={() => { setInput(q) }}
                  className="block w-full text-left px-3.5 py-2.5 rounded-xl border border-slate-100 bg-white text-[10px] font-medium text-slate-650 hover:bg-slate-50/50 hover:border-slate-350 transition-all duration-150"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`p-5 text-xs leading-relaxed ${m.role === 'user' ? 'bg-white' : 'bg-slate-50/50'}`}>
            <div className="max-w-xl mx-auto space-y-1">
              <p className="text-[9px] uppercase font-bold tracking-widest text-slate-400">
                {m.role === 'user' ? 'User' : 'Assistant'}
              </p>
              <div className="mt-1 text-slate-700 font-normal">
                {m.role === 'assistant' ? (
                  <div className="prose prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-xs prose-p:text-slate-700 prose-li:text-slate-750 max-w-none text-xs leading-relaxed">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                ) : (
                  m.content
                )}
              </div>
            </div>
          </div>
        ))}

        {thinking && (
          <div className="p-5 bg-slate-50/50 text-[10px] text-slate-400">
            <div className="max-w-xl mx-auto flex gap-1 items-center">
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 p-4 border-t border-slate-100 bg-white">
        <form onSubmit={handleSend} className="flex gap-2 max-w-xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={thinking}
            placeholder={loadingContext ? 'Syncing workspace data...' : 'Send message...'}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 text-xs focus:outline-none focus:ring-1 focus:ring-slate-350 transition-all font-normal placeholder-slate-400 text-slate-800"
          />
          <button
            type="submit"
            disabled={!input.trim() || thinking || loadingContext}
            className="px-4 py-3 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-xs font-semibold transition-all disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
