/**
 * MeetingNotes.jsx
 * Upload or paste meeting transcripts.
 * AI generates summaries, action items, responsibilities, deadlines, and downloadable reports.
 */
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { uploadDocument, getDocuments, saveGeneratedDoc, getGeneratedDocs, formatFileSize } from '../../services/workspaceService'
import { analyzeMeetingNotes, hasApiKey } from '../../services/openaiService'
import ReactMarkdown from 'react-markdown'

export default function MeetingNotes() {
  const { user, company } = useAuth()
  const [inputMode, setInputMode] = useState('paste') // 'paste' | 'upload'
  const [transcript, setTranscript] = useState('')
  const [meetingTitle, setMeetingTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState('')
  const [error, setError] = useState('')
  const [savedReports, setSavedReports] = useState([])
  const [activeReport, setActiveReport] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (company?.id) loadSavedReports()
  }, [company])

  const loadSavedReports = async () => {
    try {
      const data = await getGeneratedDocs(company.id, 'meeting_report')
      setSavedReports(data)
    } catch (e) { console.error(e) }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const doc = await uploadDocument(file, company.id, user.id, 'meeting', (p) => {})
      setTranscript(doc.extracted_text || '')
      setMeetingTitle(file.name.replace(/\.[^.]+$/, ''))
      setInputMode('paste') // Switch to show transcript
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleGenerate = async () => {
    if (!transcript.trim()) {
      setError('Please paste or upload a meeting transcript.')
      return
    }
    if (!hasApiKey()) {
      setError('No OpenAI API key. Go to Settings → AI Configuration.')
      return
    }
    setError('')
    setLoading(true)
    setReport('')
    setActiveReport(null)
    try {
      const result = await analyzeMeetingNotes(transcript, meetingTitle || 'Meeting')
      setReport(result)
      // Auto-save
      await saveGeneratedDoc(
        company.id, user.id, 'meeting_report',
        meetingTitle || `Meeting — ${new Date().toLocaleDateString()}`,
        result, { transcript: transcript.slice(0, 500) }
      )
      await loadSavedReports()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const downloadReport = (content, title) => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title?.replace(/[^a-z0-9]/gi, '_')}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const displayReport = activeReport ? activeReport.content : report

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8">
        <h1 className="text-xl font-semibold text-[#06101d]">AI Meeting Notes</h1>
        <p className="text-sm text-slate-500 mt-0.5">Upload or paste transcripts. Get summaries, action items, responsibilities, and deadlines.</p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left — Input */}
        <div className="w-80 flex-shrink-0 border-r border-[#06101d]/8 flex flex-col overflow-hidden">
          {/* Mode Toggle */}
          <div className="p-4 border-b border-[#06101d]/8">
            <div className="flex gap-1 bg-[#f7f9fc] p-1 rounded-xl mb-4">
              {['paste', 'upload'].map(m => (
                <button key={m} onClick={() => setInputMode(m)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg capitalize transition-all ${
                    inputMode === m ? 'bg-white text-[#06101d] shadow-sm' : 'text-slate-500'
                  }`}>
                  {m === 'paste' ? '✏️ Paste Text' : '📎 Upload File'}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Meeting Title</label>
              <input
                type="text"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                placeholder="e.g. Q3 Planning Call"
                className="w-full px-3 py-2.5 rounded-xl border border-[#06101d]/12 bg-[#f7f9fc] text-sm text-[#06101d] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30"
              />
            </div>
          </div>

          {inputMode === 'paste' ? (
            <div className="flex-1 flex flex-col p-4 gap-3 overflow-hidden">
              <label className="block text-xs font-semibold text-slate-500">Transcript / Notes</label>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste your meeting transcript or notes here…&#10;&#10;e.g. John: Let's finalize the Q3 budget&#10;Sarah: We need to cut costs by 15%..."
                className="flex-1 px-3 py-3 rounded-xl border border-[#06101d]/12 bg-[#f7f9fc] text-sm text-[#06101d] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30 resize-none"
              />
              <p className="text-[10px] text-slate-400">{transcript.length.toLocaleString()} characters</p>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center w-full">
                <input type="file" accept=".txt,.pdf,.docx,.doc" onChange={handleFileUpload} className="hidden" id="mn-upload" />
                <label htmlFor="mn-upload"
                  className={`flex flex-col items-center justify-center gap-2 w-full py-10 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
                    uploading ? 'border-[#8f38ff]/40 bg-[#8f38ff]/5 text-[#8f38ff]' : 'border-[#06101d]/20 text-slate-500 hover:border-[#8f38ff]/50'
                  }`}>
                  <span className="text-3xl">🎙️</span>
                  <span className="text-sm font-semibold">{uploading ? 'Uploading…' : 'Upload transcript'}</span>
                  <span className="text-[10px] text-slate-400">TXT, PDF, Word</span>
                </label>
              </div>
            </div>
          )}

          <div className="p-4 border-t border-[#06101d]/8">
            {error && <p className="text-xs text-red-500 mb-3">{error}</p>}
            <button
              onClick={handleGenerate}
              disabled={loading || !transcript.trim()}
              className="w-full py-3 bg-[#06101d] text-white rounded-xl text-sm font-bold hover:bg-[#102640] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
              {loading ? 'Generating Report…' : 'Generate Meeting Report'}
            </button>
          </div>
        </div>

        {/* Right — Reports */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Saved Reports Bar */}
          {savedReports.length > 0 && (
            <div className="flex-shrink-0 px-4 py-3 border-b border-[#06101d]/8 flex items-center gap-2 overflow-x-auto">
              <span className="text-[10px] font-semibold uppercase text-slate-400 flex-shrink-0">Saved:</span>
              <button
                onClick={() => { setActiveReport(null) }}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  !activeReport ? 'bg-[#06101d] text-white' : 'bg-[#f7f9fc] text-slate-500 hover:text-[#06101d]'
                }`}>
                Current
              </button>
              {savedReports.slice(0, 5).map(r => (
                <button key={r.id}
                  onClick={() => setActiveReport(r)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all truncate max-w-[160px] ${
                    activeReport?.id === r.id ? 'bg-[#06101d] text-white' : 'bg-[#f7f9fc] text-slate-500 hover:text-[#06101d]'
                  }`}>
                  {r.title}
                </button>
              ))}
            </div>
          )}

          {/* Report Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {!displayReport ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-5xl mb-4">📝</div>
                  <h3 className="font-semibold text-[#06101d] mb-2">Meeting report will appear here</h3>
                  <p className="text-sm text-slate-500 max-w-xs">Paste your transcript on the left and click Generate Meeting Report.</p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-[#06101d]">
                    {activeReport?.title || meetingTitle || 'Meeting Report'}
                  </h2>
                  <button
                    onClick={() => downloadReport(displayReport, activeReport?.title || meetingTitle || 'Meeting_Report')}
                    className="px-4 py-2 rounded-xl border border-[#06101d]/15 text-xs font-semibold text-slate-600 hover:bg-[#f7f9fc] transition-all"
                  >
                    ↓ Download
                  </button>
                </div>
                <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-[#06101d] prose-h2:text-lg prose-h3:text-base prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-[#06101d] prose-table:text-sm">
                  <ReactMarkdown>{displayReport}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
