/**
 * DocumentAnalyzer.jsx
 * Upload any business document (contract, invoice, SOP, quotation, PO, GST notice).
 * AI generates a structured analysis: summary, risks, dates, obligations, next actions.
 */
import { useState, useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { uploadDocument, getDocuments, formatFileSize, getFileIcon } from '../../services/workspaceService'
import { analyzeDocument, hasApiKey } from '../../services/openaiService'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

const DOC_TYPES = [
  'Contract', 'Invoice', 'Purchase Order', 'Quotation',
  'GST Notice', 'SOP', 'Agreement', 'Report', 'Other'
]

const ACCEPTED = '.pdf,.docx,.doc,.xlsx,.xls,.csv,.txt'

export default function DocumentAnalyzer() {
  const { user, company } = useAuth()
  const [recentDocs, setRecentDocs] = useState([])
  const [activeDoc, setActiveDoc] = useState(null)
  const [docType, setDocType] = useState('Contract')
  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (company?.id) loadRecent()
  }, [company])

  const loadRecent = async () => {
    try {
      const data = await getDocuments(company.id, 'contract')
      setRecentDocs(data.slice(0, 8))
    } catch (e) { console.error(e) }
  }

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setAnalysis('')
    setUploading(true)
    setUploadProgress(0)
    try {
      const doc = await uploadDocument(file, company.id, user.id, 'contract', (p) => setUploadProgress(p))
      setActiveDoc(doc)
      await loadRecent()
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
      setUploadProgress(0)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleAnalyze = async () => {
    if (!activeDoc?.extracted_text) {
      setError('No document text available. The file may not have extractable text.')
      return
    }
    if (!hasApiKey()) {
      setError('No OpenAI API key. Go to Settings → AI Configuration.')
      return
    }
    setError('')
    setLoading(true)
    setAnalysis('')
    try {
      const result = await analyzeDocument(activeDoc.extracted_text, docType, activeDoc.name)
      setAnalysis(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const downloadAnalysis = () => {
    const blob = new Blob([`# Analysis: ${activeDoc?.name}\n\n${analysis}`], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analysis_${activeDoc?.name?.replace(/\.[^.]+$/, '')}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8">
        <h1 className="text-xl font-semibold text-[#06101d]">AI Document Analyzer</h1>
        <p className="text-sm text-slate-500 mt-0.5">Upload contracts, invoices, or notices. Get instant AI analysis with risks, dates, and next actions.</p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left — Upload + Recent */}
        <div className="w-72 flex-shrink-0 border-r border-[#06101d]/8 flex flex-col overflow-hidden p-4 gap-4">
          {/* Upload */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED}
              onChange={handleUpload}
              className="hidden"
              id="da-upload"
            />
            <label
              htmlFor="da-upload"
              className={`flex flex-col items-center justify-center gap-2 w-full py-6 rounded-xl border-2 border-dashed cursor-pointer text-sm font-semibold transition-all text-center ${
                uploading
                  ? 'border-[#8f38ff]/40 bg-[#8f38ff]/5 text-[#8f38ff]'
                  : 'border-[#06101d]/20 text-slate-500 hover:border-[#8f38ff]/50 hover:text-[#8f38ff]'
              }`}
            >
              <span className="text-2xl">📎</span>
              {uploading ? `Uploading… ${uploadProgress}%` : 'Click to upload document'}
              <span className="text-[10px] font-normal text-slate-400">PDF, Word, Excel, CSV, TXT</span>
            </label>
          </div>

          {/* Document Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Document Type</label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#06101d]/12 bg-[#f7f9fc] text-sm text-[#06101d] focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30"
            >
              {DOC_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          {/* Recent Docs */}
          <div className="flex-1 overflow-y-auto">
            <p className="text-[10px] font-semibold uppercase text-slate-400 mb-2">Recent</p>
            <div className="space-y-1.5">
              {recentDocs.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => { setActiveDoc(doc); setAnalysis('') }}
                  className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-all ${
                    activeDoc?.id === doc.id
                      ? 'bg-[#06101d] text-white'
                      : 'bg-[#f7f9fc] hover:bg-[#eef2f7] text-[#06101d]'
                  }`}
                >
                  <span className="text-base flex-shrink-0">{getFileIcon(doc.name)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">{doc.name}</p>
                    <p className={`text-[10px] ${activeDoc?.id === doc.id ? 'text-white/60' : 'text-slate-400'}`}>
                      {formatFileSize(doc.file_size)}
                    </p>
                  </div>
                </button>
              ))}
              {recentDocs.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-4">No documents analyzed yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Right — Analysis */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {!activeDoc ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="font-semibold text-[#06101d] mb-2">Select or upload a document</h3>
                <p className="text-sm text-slate-500">Upload a contract, invoice, SOP, or notice to get an AI analysis.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Document Header */}
              <div className="flex-shrink-0 px-6 py-4 border-b border-[#06101d]/8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl flex-shrink-0">{getFileIcon(activeDoc.name)}</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#06101d] truncate">{activeDoc.name}</p>
                    <p className="text-xs text-slate-400">{formatFileSize(activeDoc.file_size)} · {docType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {analysis && (
                    <button onClick={downloadAnalysis}
                      className="px-4 py-2 rounded-xl border border-[#06101d]/15 text-xs font-semibold text-slate-600 hover:bg-[#f7f9fc] transition-all">
                      ↓ Download
                    </button>
                  )}
                  <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="px-5 py-2 bg-[#06101d] text-white rounded-xl text-sm font-bold hover:bg-[#102640] transition-all disabled:opacity-60 flex items-center gap-2"
                  >
                    {loading && <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                    {loading ? 'Analyzing…' : 'Analyze with AI'}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="mx-6 mt-4 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">{error}</div>
              )}

              {/* Analysis Result */}
              <div className="flex-1 overflow-y-auto p-6">
                {!analysis && !loading && (
                  <div className="text-center py-12 text-slate-400">
                    <p className="text-sm">Click <strong className="text-[#06101d]">Analyze with AI</strong> to generate a structured analysis of this document.</p>
                  </div>
                )}
                {analysis && (
                  <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-[#06101d] prose-h2:text-lg prose-h3:text-base prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-[#06101d]">
                    <ReactMarkdown>{analysis}</ReactMarkdown>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
