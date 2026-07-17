/**
 * SOPGenerator.jsx
 * Describe a business process in plain language.
 * AI generates a complete, professional SOP with roles, steps, approvals, and responsibilities.
 */
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { saveGeneratedDoc, getGeneratedDocs } from '../../services/workspaceService'
import { generateSOP, hasApiKey } from '../../services/openaiService'
import ReactMarkdown from 'react-markdown'

const EXAMPLE_PROCESSES = [
  'Employee onboarding process from offer acceptance to first day',
  'Purchase order approval workflow for orders above ₹50,000',
  'Customer complaint handling and escalation process',
  'Monthly GST filing and reconciliation process',
  'Inventory reorder and supplier follow-up procedure',
]

export default function SOPGenerator() {
  const { user, company } = useAuth()
  const [description, setDescription] = useState('')
  const [sop, setSop] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [savedSOPs, setSavedSOPs] = useState([])
  const [activeSOPId, setActiveSOPId] = useState(null)

  useEffect(() => {
    if (company?.id) loadSaved()
  }, [company])

  const loadSaved = async () => {
    try {
      const data = await getGeneratedDocs(company.id, 'sop')
      setSavedSOPs(data)
    } catch (e) { console.error(e) }
  }

  const handleGenerate = async () => {
    if (!description.trim()) { setError('Please describe the process.'); return }
    if (!hasApiKey()) { setError('No OpenAI API key. Go to Settings → AI Configuration.'); return }
    setError('')
    setLoading(true)
    setSop('')
    setActiveSOPId(null)
    try {
      const result = await generateSOP(description, company?.name || 'Your Company')
      setSop(result)
      const title = description.slice(0, 60) + (description.length > 60 ? '…' : '')
      await saveGeneratedDoc(company.id, user.id, 'sop', title, result, { description })
      await loadSaved()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLoad = (saved) => {
    setActiveSOPId(saved.id)
    setSop(saved.content)
    setDescription(saved.metadata?.description || '')
  }

  const handleDownload = () => {
    const content = sop
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const title = description.slice(0, 40).replace(/[^a-z0-9]/gi, '_') || 'SOP'
    a.download = `SOP_${title}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const displaySOP = sop

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8">
        <h1 className="text-xl font-semibold text-[#06101d]">AI SOP Generator</h1>
        <p className="text-sm text-slate-500 mt-0.5">Describe any business process. Get a complete Standard Operating Procedure with roles, steps, and approvals.</p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left — Input + Library */}
        <div className="w-80 flex-shrink-0 border-r border-[#06101d]/8 flex flex-col overflow-hidden">
          <div className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto">
            {/* Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Describe the process</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. The process for approving vendor invoices in our accounts department, from receipt to payment..."
                rows={5}
                className="w-full px-3 py-3 rounded-xl border border-[#06101d]/12 bg-[#f7f9fc] text-sm text-[#06101d] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30 resize-none"
              />
              <p className="text-[10px] text-slate-400 mt-1">{description.length} characters — more detail = better SOP</p>
            </div>

            {/* Examples */}
            <div>
              <p className="text-[10px] font-semibold uppercase text-slate-400 mb-2">Quick Examples</p>
              <div className="space-y-1.5">
                {EXAMPLE_PROCESSES.map((ex) => (
                  <button key={ex} onClick={() => setDescription(ex)}
                    className="w-full text-left px-3 py-2.5 rounded-xl bg-[#f7f9fc] border border-[#06101d]/8 text-xs text-slate-600 hover:border-[#8f38ff]/30 hover:text-[#06101d] transition-all leading-relaxed">
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {/* Saved SOPs */}
            {savedSOPs.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold uppercase text-slate-400 mb-2">Saved SOPs</p>
                <div className="space-y-1.5">
                  {savedSOPs.map((s) => (
                    <button key={s.id} onClick={() => handleLoad(s)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs font-medium transition-all leading-relaxed ${
                        activeSOPId === s.id
                          ? 'border-[#8f38ff]/30 bg-[#8f38ff]/5 text-[#06101d]'
                          : 'border-[#06101d]/8 bg-[#f7f9fc] text-slate-600 hover:text-[#06101d]'
                      }`}>
                      📄 {s.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Generate Button */}
          <div className="flex-shrink-0 p-4 border-t border-[#06101d]/8">
            {error && <p className="text-xs text-red-500 mb-3">{error}</p>}
            <button
              onClick={handleGenerate}
              disabled={loading || !description.trim()}
              className="w-full py-3 bg-[#06101d] text-white rounded-xl text-sm font-bold hover:bg-[#102640] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
              {loading ? 'Generating SOP…' : 'Generate SOP'}
            </button>
          </div>
        </div>

        {/* Right — SOP Output */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {!displaySOP ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-sm">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="font-semibold text-[#06101d] mb-2">Your SOP will appear here</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Describe a business process on the left. The AI will generate a professional SOP with document ID, roles, procedures, and approvals.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-shrink-0 px-6 py-4 border-b border-[#06101d]/8 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#06101d]">Generated SOP</span>
                <div className="flex gap-2">
                  <button onClick={handleDownload}
                    className="px-4 py-2 rounded-xl border border-[#06101d]/15 text-xs font-semibold text-slate-600 hover:bg-[#f7f9fc] transition-all">
                    ↓ Download .md
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(displaySOP)
                    }}
                    className="px-4 py-2 rounded-xl bg-[#06101d] text-white text-xs font-bold hover:bg-[#102640] transition-all">
                    Copy
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl mx-auto prose prose-slate prose-headings:font-semibold prose-headings:text-[#06101d] prose-h2:text-lg prose-h3:text-base prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-[#06101d] prose-table:text-sm">
                  <ReactMarkdown>{displaySOP}</ReactMarkdown>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
