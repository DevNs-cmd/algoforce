/**
 * CompanyVault.jsx
 * Unified registry of company documents, generated SOPs/proposals/reports, and AI logs.
 * Support content search, filtering, download, and file-binding review.
 */
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getDocuments, getGeneratedDocs, deleteDocument, formatFileSize, getFileIcon } from '../../services/workspaceService'
import { logActivity } from '../../services/activityService'

export default function CompanyVault() {
  const { user, company } = useAuth()
  
  const [docs, setDocs] = useState([])
  const [generated, setGenerated] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Filtering & Search
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('all') // all | uploaded | generated
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => {
    if (company?.id) {
      loadVault()
    }
  }, [company])

  const loadVault = async () => {
    setLoading(true)
    try {
      const [uDocs, gDocs] = await Promise.all([
        getDocuments(company.id),
        getGeneratedDocs(company.id)
      ])
      setDocs(uDocs)
      setGenerated(gDocs)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUploaded = async (id, filePath, docName) => {
    if (!confirm(`Permanently delete uploaded document "${docName}"?`)) return
    try {
      await deleteDocument(id, filePath)
      setDocs(prev => prev.filter(d => d.id !== id))
      await logActivity(company.id, user.id, 'reject', `Deleted file from Vault: "${docName}"`)
    } catch (err) {
      alert('Delete failed: ' + err.message)
    }
  }

  const handleDownloadGenerated = (doc) => {
    const blob = new Blob([doc.content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${doc.title.replace(/[^a-z0-9]/gi, '_')}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Map files for consistent render list
  const uploadedItems = docs.map(d => ({
    id: d.id,
    origin: 'uploaded',
    title: d.name,
    category: d.category,
    size: d.file_size,
    date: d.created_at,
    filePath: d.file_path,
    icon: getFileIcon(d.name)
  }))

  const generatedItems = generated.map(g => ({
    id: g.id,
    origin: 'generated',
    title: g.title,
    category: g.type, // sop, proposal, meeting_report
    size: g.content?.length || 0,
    date: g.created_at,
    content: g.content,
    icon: g.type === 'sop' ? '📄' : g.type === 'proposal' ? '✍️' : g.type === 'meeting_report' ? '🎙️' : '✨'
  }))

  const allItems = [...uploadedItems, ...generatedItems].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  const filteredItems = allItems.filter(item => {
    // Tab filter
    if (activeTab === 'uploaded' && item.origin !== 'uploaded') return false
    if (activeTab === 'generated' && item.origin !== 'generated') return false

    // Category filter
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false

    // Search filter
    if (search.trim() !== '') {
      return item.title.toLowerCase().includes(search.toLowerCase())
    }

    return true
  })

  // Unique categories for filtering
  const categories = Array.from(new Set(allItems.map(i => i.category))).filter(Boolean)

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#06101d]">Company Vault</h1>
          <p className="text-sm text-slate-500 mt-0.5">Central repository for all documents, operations SOPs, generated sheets, and reports.</p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex-shrink-0 border-b border-[#06101d]/8 p-4 bg-white flex flex-wrap gap-3 items-center justify-between">
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by filename or title..."
          className="px-3.5 py-1.5 border border-[#06101d]/12 rounded-xl text-xs bg-[#f7f9fc] w-64 focus:outline-none focus:ring-1 focus:ring-[#8f38ff]"
        />

        {/* Tab Filters */}
        <div className="flex gap-1.5 items-center">
          <div className="flex bg-[#f7f9fc] p-1 rounded-lg border border-[#06101d]/6">
            {['all', 'uploaded', 'generated'].map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setCategoryFilter('all') }}
                className={`px-3 py-1 rounded-md text-[11px] font-semibold capitalize transition-all ${
                  activeTab === tab ? 'bg-white text-[#06101d] shadow-xs' : 'text-slate-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-[#06101d]/8 text-[11px] font-semibold bg-[#f7f9fc] text-slate-600"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.replace('_', ' ').toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Vault Table Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <p className="text-center text-slate-400 py-10">Syncing vault contents...</p>
        ) : filteredItems.length === 0 ? (
          <div className="text-center text-slate-400 py-16">
            <span className="text-4xl block mb-2.5">📂</span>
            No resources matches filter.
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-[#06101d]/8 overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#06101d]/8 bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="px-5 py-3.5">Filename / Title</th>
                  <th className="px-5 py-3.5">Source</th>
                  <th className="px-5 py-3.5">Classification</th>
                  <th className="px-5 py-3.5">Size / Length</th>
                  <th className="px-5 py-3.5">Created Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#06101d]/6 text-xs text-slate-700">
                {filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-[#f7f9fc]/50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-[#06101d] flex items-center gap-2.5 max-w-sm truncate">
                      <span className="text-base flex-shrink-0 leading-none">{item.icon}</span>
                      <span className="truncate">{item.title}</span>
                    </td>
                    <td className="px-5 py-4 capitalize font-medium text-slate-500">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        item.origin === 'generated' ? 'bg-[#8f38ff]/5 text-[#8f38ff]' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.origin}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-[10px] text-slate-400 uppercase">
                      {item.category?.replace('_', ' ')}
                    </td>
                    <td className="px-5 py-4 text-slate-400">
                      {item.origin === 'uploaded' ? formatFileSize(item.size) : `${item.size.toLocaleString()} chars`}
                    </td>
                    <td className="px-5 py-4 text-slate-400">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4 text-right flex gap-3 justify-end">
                      {item.origin === 'generated' ? (
                        <button
                          onClick={() => handleDownloadGenerated(item)}
                          className="text-[#8f38ff] font-semibold hover:underline"
                        >
                          Download
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDeleteUploaded(item.id, item.filePath, item.title)}
                          className="text-red-500 font-semibold hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
