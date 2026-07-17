/**
 * DocumentGenerator.jsx
 * Generate proposals, quotations, SOWs, BRDs, implementation plans, and customer-ready documents.
 */
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { saveGeneratedDoc, getGeneratedDocs } from '../../services/workspaceService'
import { generateProposal, hasApiKey } from '../../services/openaiService'
import ReactMarkdown from 'react-markdown'

const DOC_TEMPLATES = [
  {
    id: 'proposal',
    label: 'Business Proposal',
    icon: '📊',
    description: 'Formal proposal to a potential client or partner.',
    fields: ['clientName', 'projectName', 'scope', 'budget', 'timeline'],
  },
  {
    id: 'quotation',
    label: 'Quotation / Price Quote',
    icon: '💰',
    description: 'Itemised pricing document for goods or services.',
    fields: ['clientName', 'projectName', 'scope', 'budget', 'timeline'],
  },
  {
    id: 'Statement of Work',
    label: 'Statement of Work',
    icon: '📝',
    description: 'Detailed SOW defining deliverables, timeline, and responsibilities.',
    fields: ['clientName', 'projectName', 'scope', 'budget', 'timeline'],
  },
  {
    id: 'Business Requirement Document',
    label: 'Business Requirement Document',
    icon: '📋',
    description: 'BRD capturing functional and non-functional requirements.',
    fields: ['clientName', 'projectName', 'scope', 'additionalInfo'],
  },
  {
    id: 'Implementation Plan',
    label: 'Implementation Plan',
    icon: '🗓️',
    description: 'Phased plan for deploying a system or process.',
    fields: ['clientName', 'projectName', 'scope', 'timeline', 'additionalInfo'],
  },
  {
    id: 'Non-Disclosure Agreement',
    label: 'NDA Template',
    icon: '🔒',
    description: 'Mutual NDA between two parties.',
    fields: ['clientName', 'additionalInfo'],
  },
]

const FIELD_CONFIG = {
  clientName: { label: 'Client / Recipient Name', placeholder: 'Acme Pvt Ltd', type: 'text' },
  projectName: { label: 'Project / Service Name', placeholder: 'AI Operations Dashboard', type: 'text' },
  scope: { label: 'Scope of Work / Description', placeholder: 'Describe what will be delivered…', type: 'textarea' },
  budget: { label: 'Budget / Value', placeholder: '₹5,00,000 or "To be discussed"', type: 'text' },
  timeline: { label: 'Timeline / Duration', placeholder: '3 months, by 30 Sep 2025, etc.', type: 'text' },
  additionalInfo: { label: 'Additional Context', placeholder: 'Any special terms, background, or requirements…', type: 'textarea' },
}

export default function DocumentGenerator() {
  const { user, company } = useAuth()
  const [selectedTemplate, setSelectedTemplate] = useState(DOC_TEMPLATES[0])
  const [fields, setFields] = useState({})
  const [document, setDocument] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [savedDocs, setSavedDocs] = useState([])
  const [activeDocId, setActiveDocId] = useState(null)

  useEffect(() => {
    if (company?.id) loadSaved()
  }, [company])

  const loadSaved = async () => {
    try {
      const data = await getGeneratedDocs(company.id, 'proposal')
      setSavedDocs(data)
    } catch (e) { console.error(e) }
  }

  const handleFieldChange = (key, value) => setFields(prev => ({ ...prev, [key]: value }))

  const handleGenerate = async () => {
    if (!hasApiKey()) { setError('No OpenAI API key. Go to Settings → AI Configuration.'); return }
    setError('')
    setLoading(true)
    setDocument('')
    setActiveDocId(null)
    try {
      const inputs = {
        docType: selectedTemplate.label,
        ...fields,
        companyName: company?.name || 'Your Company',
      }
      const result = await generateProposal(inputs)
      setDocument(result)
      const title = `${selectedTemplate.label} — ${fields.clientName || 'Draft'}`
      await saveGeneratedDoc(company.id, user.id, 'proposal', title, result, { template: selectedTemplate.id, fields })
      await loadSaved()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLoad = (saved) => {
    setActiveDocId(saved.id)
    setDocument(saved.content)
    const tmpl = DOC_TEMPLATES.find(t => t.id === saved.metadata?.template)
    if (tmpl) setSelectedTemplate(tmpl)
    if (saved.metadata?.fields) setFields(saved.metadata.fields)
  }

  const handleDownload = () => {
    const blob = new Blob([document], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedTemplate.label.replace(/\s+/g, '_')}_${fields.clientName?.replace(/\s+/g, '_') || 'Draft'}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8">
        <h1 className="text-xl font-semibold text-[#06101d]">AI Document Generator</h1>
        <p className="text-sm text-slate-500 mt-0.5">Generate proposals, quotations, SOWs, BRDs, and more. Saved to your workspace.</p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left — Config */}
        <div className="w-80 flex-shrink-0 border-r border-[#06101d]/8 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {/* Template Selector */}
            <div>
              <p className="text-[10px] font-semibold uppercase text-slate-400 mb-2">Document Type</p>
              <div className="grid grid-cols-1 gap-1.5">
                {DOC_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => { setSelectedTemplate(tmpl); setDocument(''); setActiveDocId(null) }}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      selectedTemplate.id === tmpl.id
                        ? 'border-[#06101d] bg-[#06101d] text-white'
                        : 'border-[#06101d]/10 bg-[#f7f9fc] hover:border-[#06101d]/30 text-[#06101d]'
                    }`}
                  >
                    <span className="text-lg flex-shrink-0">{tmpl.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold leading-tight">{tmpl.label}</p>
                      <p className={`text-[10px] mt-0.5 leading-tight truncate ${selectedTemplate.id === tmpl.id ? 'text-white/70' : 'text-slate-400'}`}>
                        {tmpl.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Fields */}
            <div>
              <p className="text-[10px] font-semibold uppercase text-slate-400 mb-3">Details</p>
              <div className="space-y-3">
                {selectedTemplate.fields.map((key) => {
                  const cfg = FIELD_CONFIG[key]
                  return (
                    <div key={key}>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{cfg.label}</label>
                      {cfg.type === 'textarea' ? (
                        <textarea
                          value={fields[key] || ''}
                          onChange={(e) => handleFieldChange(key, e.target.value)}
                          placeholder={cfg.placeholder}
                          rows={3}
                          className="w-full px-3 py-2.5 rounded-xl border border-[#06101d]/12 bg-[#f7f9fc] text-sm text-[#06101d] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30 resize-none"
                        />
                      ) : (
                        <input
                          type="text"
                          value={fields[key] || ''}
                          onChange={(e) => handleFieldChange(key, e.target.value)}
                          placeholder={cfg.placeholder}
                          className="w-full px-3 py-2.5 rounded-xl border border-[#06101d]/12 bg-[#f7f9fc] text-sm text-[#06101d] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Saved */}
            {savedDocs.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold uppercase text-slate-400 mb-2">Recent</p>
                <div className="space-y-1.5">
                  {savedDocs.slice(0, 5).map((s) => (
                    <button key={s.id} onClick={() => handleLoad(s)}
                      className={`w-full text-left px-3 py-2 rounded-xl border text-xs font-medium transition-all truncate ${
                        activeDocId === s.id ? 'border-[#8f38ff]/30 bg-[#8f38ff]/5 text-[#06101d]' : 'border-[#06101d]/8 bg-[#f7f9fc] text-slate-600'
                      }`}>
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex-shrink-0 p-4 border-t border-[#06101d]/8">
            {error && <p className="text-xs text-red-500 mb-3">{error}</p>}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3 bg-[#06101d] text-white rounded-xl text-sm font-bold hover:bg-[#102640] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
              {loading ? 'Generating…' : `Generate ${selectedTemplate.label}`}
            </button>
          </div>
        </div>

        {/* Right — Output */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {!document ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-sm">
                <div className="text-5xl mb-4">{selectedTemplate.icon}</div>
                <h3 className="font-semibold text-[#06101d] mb-2">Your {selectedTemplate.label} will appear here</h3>
                <p className="text-sm text-slate-500">{selectedTemplate.description}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-shrink-0 px-6 py-4 border-b border-[#06101d]/8 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#06101d]">{selectedTemplate.label}</span>
                <div className="flex gap-2">
                  <button onClick={handleDownload}
                    className="px-4 py-2 rounded-xl border border-[#06101d]/15 text-xs font-semibold text-slate-600 hover:bg-[#f7f9fc] transition-all">
                    ↓ Download
                  </button>
                  <button onClick={() => navigator.clipboard.writeText(document)}
                    className="px-4 py-2 rounded-xl bg-[#06101d] text-white text-xs font-bold hover:bg-[#102640] transition-all">
                    Copy
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl mx-auto prose prose-slate prose-headings:font-semibold prose-headings:text-[#06101d] prose-h2:text-lg prose-h3:text-base prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-[#06101d] prose-table:text-sm">
                  <ReactMarkdown>{document}</ReactMarkdown>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
