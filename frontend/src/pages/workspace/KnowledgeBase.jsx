/**
 * KnowledgeBase.jsx
 * Upload PDFs, Word docs, Excel, CSVs, text files.
 * Ask AI questions answered ONLY from uploaded company documents.
 */
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { uploadDocument, getDocuments, deleteDocument, formatFileSize, getFileIcon } from '../../services/workspaceService'
import { askKnowledgeBase, hasApiKey } from '../../services/openaiService'
import ReactMarkdown from 'react-markdown'

const ACCEPTED = '.pdf,.docx,.doc,.xlsx,.xls,.csv,.txt,.md'

export default function KnowledgeBase() {
  const { user, company } = useAuth()
  const [docs, setDocs] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState('')
  const [messages, setMessages] = useState([])
  const [question, setQuestion] = useState('')
  const [thinking, setThinking] = useState(false)
  const [selectedDocs, setSelectedDocs] = useState([]) // IDs of docs to query
  const chatEndRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (company?.id) loadDocs()
  }, [company])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadDocs = async () => {
    try {
      const data = await getDocuments(company.id, 'knowledge')
      setDocs(data)
      if (data.length > 0 && selectedDocs.length === 0) {
        setSelectedDocs(data.map(d => d.id))
      }
    } catch (e) { console.error(e) }
  }

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploadError('')
    setUploading(true)
    setUploadProgress(0)
    try {
      for (const file of files) {
        await uploadDocument(file, company.id, user.id, 'knowledge', (p) => setUploadProgress(p))
      }
      await loadDocs()
    } catch (err) {
      setUploadError(err.message)
    } finally {
      setUploading(false)
      setUploadProgress(0)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleAsk = async (e) => {
    e.preventDefault()
    if (!question.trim() || thinking) return

    if (!hasApiKey()) {
      setMessages(prev => [...prev,
        { role: 'user', content: question },
        { role: 'assistant', content: '⚠️ No OpenAI API key configured. Go to **Settings → AI Configuration** to add your key.' }
      ])
      setQuestion('')
      return
    }

    const selectedDocData = docs.filter(d => selectedDocs.includes(d.id))
    if (selectedDocData.length === 0) {
      setMessages(prev => [...prev,
        { role: 'user', content: question },
        { role: 'assistant', content: 'Please select at least one document to query, or upload documents first.' }
      ])
      setQuestion('')
      return
    }

    const userMsg = { role: 'user', content: question }
    setMessages(prev => [...prev, userMsg])
    setQuestion('')
    setThinking(true)

    try {
      const history = messages.slice(-8).map(m => ({ role: m.role, content: m.content }))
      const answer = await askKnowledgeBase(question, selectedDocData, history)
      setMessages(prev => [...prev, { role: 'assistant', content: answer }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.message}` }])
    } finally {
      setThinking(false)
    }
  }

  const handleDelete = async (doc) => {
    if (!confirm(`Delete "${doc.name}"?`)) return
    try {
      await deleteDocument(doc.id, doc.file_path)
      setSelectedDocs(prev => prev.filter(id => id !== doc.id))
      await loadDocs()
    } catch (err) { alert(err.message) }
  }

  const toggleDocSelection = (id) => {
    setSelectedDocs(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  return (
    <div className="h-full flex flex-col gap-0" style={{ minHeight: 0 }}>
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8">
        <h1 className="text-xl font-semibold text-[#06101d]">AI Knowledge Base</h1>
        <p className="text-sm text-slate-500 mt-0.5">Upload company documents. Ask questions. Get answers only from your files.</p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel — Documents */}
        <div className="w-72 flex-shrink-0 border-r border-[#06101d]/8 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-[#06101d]/8">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={ACCEPTED}
              onChange={handleUpload}
              className="hidden"
              id="kb-upload"
            />
            <label
              htmlFor="kb-upload"
              className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border-2 border-dashed cursor-pointer text-sm font-semibold transition-all ${
                uploading
                  ? 'border-[#8f38ff]/40 bg-[#8f38ff]/5 text-[#8f38ff]'
                  : 'border-[#06101d]/20 text-slate-500 hover:border-[#8f38ff]/50 hover:text-[#8f38ff]'
              }`}
            >
              {uploading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#8f38ff]/40 border-t-[#8f38ff] rounded-full animate-spin" />
                  Uploading {uploadProgress}%
                </>
              ) : (
                <>↑ Upload Documents</>
              )}
            </label>
            {uploadError && <p className="text-xs text-red-500 mt-2">{uploadError}</p>}
            <p className="text-[10px] text-slate-400 mt-1.5 text-center">PDF, Word, Excel, CSV, TXT</p>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            {docs.length === 0 && (
              <div className="text-center py-8 text-sm text-slate-400">
                <div className="text-2xl mb-2">📁</div>
                No documents yet.<br />Upload files to get started.
              </div>
            )}
            {docs.map((doc) => (
              <div
                key={doc.id}
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all group ${
                  selectedDocs.includes(doc.id)
                    ? 'border-[#8f38ff]/30 bg-[#8f38ff]/5'
                    : 'border-transparent hover:bg-[#f7f9fc]'
                }`}
                onClick={() => toggleDocSelection(doc.id)}
              >
                <input
                  type="checkbox"
                  checked={selectedDocs.includes(doc.id)}
                  onChange={() => toggleDocSelection(doc.id)}
                  onClick={e => e.stopPropagation()}
                  className="accent-[#8f38ff] flex-shrink-0"
                />
                <span className="text-base flex-shrink-0">{getFileIcon(doc.name)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#06101d] truncate">{doc.name}</p>
                  <p className="text-[10px] text-slate-400">{formatFileSize(doc.file_size)}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(doc) }}
                  className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 text-xs transition-all"
                >✕</button>
              </div>
            ))}
          </div>

          {docs.length > 0 && (
            <div className="p-3 border-t border-[#06101d]/8">
              <p className="text-[10px] text-slate-400 text-center">
                {selectedDocs.length} of {docs.length} selected for Q&A
              </p>
            </div>
          )}
        </div>

        {/* Right Panel — Chat */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-sm">
                  <div className="text-4xl mb-4">💬</div>
                  <h3 className="font-semibold text-[#06101d] mb-2">Ask your documents anything</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Upload documents on the left, then ask questions. The AI will only answer from your company files.
                  </p>
                  <div className="mt-4 space-y-2">
                    {['What are the payment terms?', 'Who are the key stakeholders?', 'Summarize the main obligations'].map(q => (
                      <button key={q} onClick={() => setQuestion(q)}
                        className="block w-full text-left px-4 py-2.5 rounded-xl bg-[#f7f9fc] border border-[#06101d]/10 text-sm text-slate-600 hover:border-[#8f38ff]/40 transition-all">
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === 'user'
                    ? 'bg-[#06101d] text-white'
                    : 'bg-white border border-[#06101d]/10 text-[#06101d]'
                }`}>
                  {msg.role === 'assistant'
                    ? <div className="prose prose-sm max-w-none prose-headings:text-[#06101d] prose-p:text-[#06101d] prose-li:text-[#06101d]">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    : msg.content}
                </div>
              </div>
            ))}

            {thinking && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#06101d]/10 rounded-2xl px-4 py-3">
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
          <div className="flex-shrink-0 p-4 border-t border-[#06101d]/8">
            <form onSubmit={handleAsk} className="flex gap-3">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={docs.length === 0 ? 'Upload documents to start asking questions…' : 'Ask a question about your documents…'}
                disabled={thinking}
                className="flex-1 px-4 py-3 rounded-xl border border-[#06101d]/12 bg-[#f7f9fc] text-sm text-[#06101d] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30 transition-all"
              />
              <button
                type="submit"
                disabled={!question.trim() || thinking}
                className="px-5 py-3 bg-[#06101d] text-white rounded-xl text-sm font-bold hover:bg-[#102640] transition-all disabled:opacity-40"
              >
                Ask
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
