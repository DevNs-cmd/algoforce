/**
 * AutomationRecommendations.jsx
 * AI analyzes uploaded documents + Business Assessment answers
 * to recommend specific AlgoForce products that solve identified operational problems.
 */
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getDocuments, getAssessment } from '../../services/workspaceService'
import { generateAutomationRecommendations, hasApiKey } from '../../services/openaiService'
import ReactMarkdown from 'react-markdown'

export default function AutomationRecommendations() {
  const { company } = useAuth()
  const [docs, setDocs] = useState([])
  const [assessment, setAssessment] = useState(null)
  const [results, setResults] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasData, setHasData] = useState(false)

  useEffect(() => {
    if (company?.id) loadData()
  }, [company])

  const loadData = async () => {
    try {
      const [docsData, assessmentData] = await Promise.all([
        getDocuments(company.id),
        getAssessment(company.id),
      ])
      setDocs(docsData)
      setAssessment(assessmentData)
      setHasData(docsData.length > 0 || (assessmentData?.form_data && Object.keys(assessmentData.form_data).length > 0))
    } catch (e) { console.error(e) }
  }

  const handleGenerate = async () => {
    if (!hasApiKey()) { setError('No OpenAI API key. Go to Settings → AI Configuration.'); return }
    setError('')
    setLoading(true)
    setResults('')
    try {
      const assessmentData = assessment?.form_data || {}
      const result = await generateAutomationRecommendations(assessmentData, docs)
      setResults(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const assessmentFilled = assessment?.form_data && Object.keys(assessment.form_data).length > 0
  const docCount = docs.length

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8">
        <h1 className="text-xl font-semibold text-[#06101d]">Automation Recommendations</h1>
        <p className="text-sm text-slate-500 mt-0.5">AI analyses your documents and assessment data to recommend exactly which products solve your specific problems.</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8">
          {/* Data Status Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className={`rounded-2xl border p-4 ${assessmentFilled ? 'border-green-200 bg-green-50' : 'border-[#06101d]/10 bg-[#f7f9fc]'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{assessmentFilled ? '✅' : '⬜'}</span>
                <span className="text-sm font-semibold text-[#06101d]">Business Assessment</span>
              </div>
              <p className="text-xs text-slate-500">
                {assessmentFilled
                  ? `Completed — ${Object.keys(assessment.form_data).length} answers on file`
                  : 'Not completed yet. Complete your Business Assessment for better recommendations.'}
              </p>
              {!assessmentFilled && (
                <a href="/workspace/assessment" className="text-xs text-[#8f38ff] font-semibold mt-2 block hover:underline">
                  Complete Assessment →
                </a>
              )}
            </div>

            <div className={`rounded-2xl border p-4 ${docCount > 0 ? 'border-green-200 bg-green-50' : 'border-[#06101d]/10 bg-[#f7f9fc]'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{docCount > 0 ? '✅' : '⬜'}</span>
                <span className="text-sm font-semibold text-[#06101d]">Company Documents</span>
              </div>
              <p className="text-xs text-slate-500">
                {docCount > 0
                  ? `${docCount} document${docCount > 1 ? 's' : ''} uploaded and indexed`
                  : 'No documents uploaded yet. Upload SOPs, reports, or invoices for better analysis.'}
              </p>
              {docCount === 0 && (
                <a href="/workspace/knowledge" className="text-xs text-[#8f38ff] font-semibold mt-2 block hover:underline">
                  Upload Documents →
                </a>
              )}
            </div>
          </div>

          {/* Context available but no results yet */}
          {!results && (
            <div className="text-center py-12 border border-[#06101d]/10 rounded-2xl bg-white">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="font-semibold text-[#06101d] mb-2">Get personalised automation recommendations</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
                {hasData
                  ? 'Based on your business assessment answers and uploaded documents, the AI will identify your specific pain points and recommend exactly which AlgoForce products solve them — with ROI estimates.'
                  : 'Complete your Business Assessment and upload some company documents first. The AI needs context to make meaningful recommendations.'}
              </p>

              {error && (
                <div className="mx-auto max-w-md mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">{error}</div>
              )}

              <button
                onClick={handleGenerate}
                disabled={loading || !hasData}
                className="px-8 py-3.5 bg-[#06101d] text-white rounded-xl text-sm font-bold hover:bg-[#102640] transition-all disabled:opacity-50 inline-flex items-center gap-2"
              >
                {loading && <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                {loading ? 'Analysing…' : 'Generate Recommendations'}
              </button>

              {!hasData && (
                <p className="text-xs text-slate-400 mt-4">
                  Complete your assessment or upload documents to unlock this feature.
                </p>
              )}
            </div>
          )}

          {/* Results */}
          {results && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-[#06101d]">Your Recommendations</h2>
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="px-4 py-2 rounded-xl border border-[#06101d]/15 text-xs font-semibold text-slate-600 hover:bg-[#f7f9fc] transition-all flex items-center gap-2"
                >
                  {loading && <div className="w-3 h-3 border-2 border-slate-400/40 border-t-slate-600 rounded-full animate-spin" />}
                  Refresh
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">{error}</div>
              )}

              <div className="bg-white rounded-2xl border border-[#06101d]/10 p-6 shadow-sm">
                <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-[#06101d] prose-h2:text-lg prose-h3:text-base prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-[#06101d] prose-table:text-sm">
                  <ReactMarkdown>{results}</ReactMarkdown>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-[#f7f9fc] border border-[#06101d]/10 text-center">
                <p className="text-sm text-slate-600 mb-3">
                  Ready to implement any of these recommendations?
                </p>
                <a href="/contact"
                  className="inline-block px-6 py-2.5 bg-[#06101d] text-white rounded-xl text-sm font-bold hover:bg-[#102640] transition-all">
                  Book a Business Assessment Call →
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
