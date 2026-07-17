/**
 * KnowledgeSearch.jsx
 * Natural language search across ALL uploaded company documents.
 * AI finds relevant passages and cites source documents.
 */
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getDocuments, getFileIcon, formatFileSize } from '../../services/workspaceService'
import { searchKnowledge, hasApiKey } from '../../services/openaiService'
import ReactMarkdown from 'react-markdown'

export default function KnowledgeSearch() {
  const { company } = useAuth()
  const [docs, setDocs] = useState([])
  const [query, setQuery] = useState('')
  const [results, setResults] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [recentSearches, setRecentSearches] = useState([])

  useEffect(() => {
    if (company?.id) loadDocs()
    const stored = localStorage.getItem('af_recent_searches')
    if (stored) setRecentSearches(JSON.parse(stored))
  }, [company])

  const loadDocs = async () => {
    try {
      const data = await getDocuments(company.id)
      setDocs(data)
    } catch (e) { console.error(e) }
  }

  const saveSearch = (q) => {
    const updated = [q, ...recentSearches.filter(s => s !== q)].slice(0, 8)
    setRecentSearches(updated)
    localStorage.setItem('af_recent_searches', JSON.stringify(updated))
  }

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) return
    if (!hasApiKey()) { setError('No OpenAI API key. Go to Settings → AI Configuration.'); return }
    if (docs.length === 0) { setError('No documents uploaded yet. Upload documents in the Knowledge Base first.'); return }
    setError('')
    setLoading(true)
    setResults('')
    saveSearch(searchQuery)
    try {
      const result = await searchKnowledge(searchQuery, docs)
      setResults(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8">
        <h1 className="text-xl font-semibold text-[#06101d]">Company Knowledge Search</h1>
        <p className="text-sm text-slate-500 mt-0.5">Search across all uploaded documents using natural language. AI finds and cites relevant passages.</p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left — Stats + Recent */}
        <div className="w-64 flex-shrink-0 border-r border-[#06101d]/8 p-4 overflow-y-auto">
          {/* Stats */}
          <div className="mb-5">
            <p className="text-[10px] font-semibold uppercase text-slate-400 mb-3">Knowledge Base</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#f7f9fc] rounded-xl p-3 text-center border border-[#06101d]/8">
                <div className="text-xl font-bold text-[#06101d]">{docs.length}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Documents</div>
              </div>
              <div className="bg-[#f7f9fc] rounded-xl p-3 text-center border border-[#06101d]/8">
                <div className="text-xl font-bold text-[#8f38ff]">{docs.filter(d => d.extracted_text).length}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Indexed</div>
              </div>
            </div>
          </div>

          {/* Document List */}
          {docs.length > 0 && (
            <div className="mb-5">
              <p className="text-[10px] font-semibold uppercase text-slate-400 mb-2">Indexed Documents</p>
              <div className="space-y-1.5">
                {docs.map(doc => (
                  <div key={doc.id} className="flex items-center gap-2 p-2 rounded-lg">
                    <span className="text-sm flex-shrink-0">{getFileIcon(doc.name)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[#06101d] truncate">{doc.name}</p>
                      <p className="text-[10px] text-slate-400">{formatFileSize(doc.file_size)}</p>
                    </div>
                    {doc.extracted_text
                      ? <span className="text-[10px] text-green-500 flex-shrink-0">✓</span>
                      : <span className="text-[10px] text-slate-300 flex-shrink-0">—</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold uppercase text-slate-400 mb-2">Recent Searches</p>
              <div className="space-y-1.5">
                {recentSearches.map((s, i) => (
                  <button key={i} onClick={() => { setQuery(s); handleSearch(s) }}
                    className="w-full text-left px-3 py-2 rounded-lg bg-[#f7f9fc] text-xs text-slate-600 hover:text-[#06101d] transition-all truncate border border-[#06101d]/8">
                    🔍 {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {docs.length === 0 && (
            <div className="text-center py-6 text-sm text-slate-400">
              <div className="text-2xl mb-2">📁</div>
              No documents yet.<br />
              <span className="text-xs">Upload files in the Knowledge Base module first.</span>
            </div>
          )}
        </div>

        {/* Right — Search + Results */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search Bar */}
          <div className="flex-shrink-0 p-5 border-b border-[#06101d]/8">
            <div className="flex gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search across all your documents… e.g. What are the payment terms? Who is responsible for quality checks?"
                className="flex-1 px-4 py-3 rounded-xl border border-[#06101d]/12 bg-[#f7f9fc] text-sm text-[#06101d] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30 transition-all"
              />
              <button
                onClick={() => handleSearch()}
                disabled={!query.trim() || loading}
                className="px-6 py-3 bg-[#06101d] text-white rounded-xl text-sm font-bold hover:bg-[#102640] transition-all disabled:opacity-40 flex items-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : '🔍'}
                {loading ? 'Searching…' : 'Search'}
              </button>
            </div>

            {/* Suggested Queries */}
            {!results && !loading && (
              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  'What are the payment terms?',
                  'List all obligations',
                  'Who are the key contacts?',
                  'What are the deadlines?',
                  'Summarize the key risks'
                ].map(q => (
                  <button key={q} onClick={() => { setQuery(q); handleSearch(q) }}
                    className="px-3 py-1.5 rounded-full bg-[#f7f9fc] border border-[#06101d]/10 text-xs text-slate-600 hover:border-[#8f38ff]/40 hover:text-[#06101d] transition-all">
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto p-6">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 mb-4">{error}</div>
            )}

            {!results && !loading && !error && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-sm">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="font-semibold text-[#06101d] mb-2">Search your company knowledge</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Ask anything in plain English. The AI will find relevant sections across all your uploaded documents and show you exactly where the answer is.
                  </p>
                </div>
              </div>
            )}

            {results && (
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-2 mb-5 pb-4 border-b border-[#06101d]/8">
                  <span className="text-sm font-semibold text-[#06101d]">Results for:</span>
                  <span className="px-3 py-1 bg-[#8f38ff]/10 text-[#8f38ff] rounded-full text-xs font-semibold">"{query}"</span>
                </div>
                <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-[#06101d] prose-h2:text-base prose-h3:text-sm prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-[#06101d] prose-blockquote:border-[#8f38ff] prose-blockquote:text-slate-600">
                  <ReactMarkdown>{results}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
