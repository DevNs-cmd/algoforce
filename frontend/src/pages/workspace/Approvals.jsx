/**
 * Approvals.jsx
 * Business approval manager.
 * Request review on generated/uploaded documents, comment, approve, or reject.
 */
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getApprovals, createApproval, respondToApproval, deleteApproval } from '../../services/operationsService'
import { getDocuments } from '../../services/workspaceService'
import { logActivity } from '../../services/activityService'

const PRIORITY_BADGES = {
  urgent: 'bg-red-50 text-red-700 border-red-200',
  high: 'bg-orange-50 text-orange-700 border-orange-200',
  medium: 'bg-blue-50 text-blue-700 border-blue-200',
  low: 'bg-slate-50 text-slate-600 border-slate-200'
}

export default function Approvals() {
  const { user, company } = useAuth()
  const [approvals, setApprovals] = useState([])
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewTab, setViewTab] = useState('pending') // pending | completed

  // Modal / Create form state
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [documentId, setDocumentId] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [creating, setCreating] = useState(false)

  // Comments for responding
  const [comments, setComments] = useState({})
  const [responding, setResponding] = useState({})

  useEffect(() => {
    if (company?.id) {
      loadApprovals()
      loadDocs()
    }
  }, [company, viewTab])

  const loadApprovals = async () => {
    setLoading(true)
    try {
      const data = await getApprovals(company.id, viewTab === 'pending' ? 'pending' : null)
      // Filter out pending if viewTab is completed
      if (viewTab === 'completed') {
        setApprovals(data.filter(a => a.status !== 'pending'))
      } else {
        setApprovals(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const loadDocs = async () => {
    try {
      const allDocs = await getDocuments(company.id)
      setDocs(allDocs)
    } catch (err) {
      console.error(err)
    }
  }

  const handleRequest = async (e) => {
    e.preventDefault()
    if (!title.trim() || creating) return
    setCreating(true)
    try {
      const created = await createApproval(company.id, user.id, {
        title,
        description,
        document_id: documentId || null,
        priority,
        due_date: dueDate || null
      })
      await logActivity(company.id, user.id, 'approve', `Requested approval: "${title}"`)
      setTitle('')
      setDescription('')
      setDocumentId('')
      setPriority('medium')
      setDueDate('')
      setShowRequestModal(false)
      loadApprovals()
    } catch (err) {
      alert(err.message)
    } finally {
      setCreating(false)
    }
  }

  const handleResponse = async (approvalId, status) => {
    setResponding(prev => ({ ...prev, [approvalId]: true }))
    try {
      await respondToApproval(approvalId, user.id, status, comments[approvalId] || '')
      await logActivity(
        company.id,
        user.id,
        status === 'approved' ? 'approve' : 'reject',
        `${status === 'approved' ? 'Approved' : 'Rejected'}: "${approvals.find(a => a.id === approvalId)?.title}"`
      )
      loadApprovals()
    } catch (err) {
      alert(err.message)
    } finally {
      setResponding(prev => ({ ...prev, [approvalId]: false }))
    }
  }

  const handleDelete = async (approvalId, approvalTitle) => {
    if (!confirm(`Remove approval request "${approvalTitle}"?`)) return
    try {
      await deleteApproval(approvalId)
      setApprovals(prev => prev.filter(a => a.id !== approvalId))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#06101d]">Approvals Inbox</h1>
          <p className="text-sm text-slate-500 mt-0.5">Control operational compliance and review documents.</p>
        </div>
        <button
          onClick={() => setShowRequestModal(true)}
          className="px-4 py-2 bg-[#06101d] text-white rounded-xl text-xs font-bold hover:bg-[#102640] transition-all"
        >
          ✉️ Request Approval
        </button>
      </div>

      {/* Tabs */}
      <div className="flex-shrink-0 border-b border-[#06101d]/8 p-4 flex gap-1.5 bg-white">
        {['pending', 'completed'].map(t => (
          <button
            key={t}
            onClick={() => setViewTab(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
              viewTab === t ? 'bg-[#06101d] text-white' : 'bg-[#f7f9fc] text-slate-600'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* List Container */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {loading ? (
          <div className="text-center text-slate-400 py-10">Loading approvals...</div>
        ) : approvals.length === 0 ? (
          <div className="text-center text-slate-400 py-12">
            <span className="text-3xl block mb-2">📥</span>
            No approvals in this folder.
          </div>
        ) : (
          approvals.map(app => (
            <div key={app.id} className="bg-white rounded-2xl border border-[#06101d]/8 p-5 transition-all hover:shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#06101d]">{app.title}</h3>
                  {app.description && <p className="text-xs text-slate-500 mt-1">{app.description}</p>}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider ${PRIORITY_BADGES[app.priority] || PRIORITY_BADGES.medium}`}>
                    {app.priority}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border capitalize ${
                    app.status === 'pending' ? 'bg-amber-55 text-amber-700 border-amber-200' : app.status === 'approved' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    {app.status}
                  </span>
                </div>
              </div>

              {/* Document Attachment */}
              {app.documents && (
                <div className="mt-3.5 p-2.5 rounded-xl border border-[#06101d]/8 bg-[#f7f9fc] flex items-center gap-2 max-w-md">
                  <span className="text-sm">📎</span>
                  <span className="text-xs font-medium text-slate-700 truncate">{app.documents.name}</span>
                </div>
              )}

              {/* Actions Section */}
              {app.status === 'pending' ? (
                <div className="mt-4 pt-4 border-t border-[#06101d]/6 space-y-3">
                  <input
                    type="text"
                    value={comments[app.id] || ''}
                    onChange={e => setComments({ ...comments, [app.id]: e.target.value })}
                    placeholder="Add operational notes or reason for approval/rejection..."
                    className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-xs bg-[#f7f9fc]"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => handleResponse(app.id, 'rejected')}
                      disabled={responding[app.id]}
                      className="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-50 transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleResponse(app.id, 'approved')}
                      disabled={responding[app.id]}
                      className="px-4 py-1.5 bg-[#06101d] text-white rounded-lg text-xs font-bold hover:bg-[#102640]"
                    >
                      ✓ Approve Document
                    </button>
                  </div>
                </div>
              ) : (
                app.comments && (
                  <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-500 italic">
                    Comment: "{app.comments}"
                  </div>
                )
              )}

              <div className="flex justify-between items-center mt-3 text-[10px] text-slate-400">
                <span>Requested on: {new Date(app.created_at).toLocaleDateString()}</span>
                <button
                  onClick={() => handleDelete(app.id, app.title)}
                  className="text-slate-300 hover:text-red-500"
                >
                  Delete Request
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Request Approval Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 bg-[#06101d]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleRequest} className="bg-white rounded-3xl max-w-lg w-full border border-[#06101d]/15 shadow-xl p-6 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[#06101d] mb-1">Request Approval</h3>
              <p className="text-xs text-slate-500">Route a business action or document for review.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. FY26 Q1 Operations Budget Sheet"
                className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-sm bg-[#f7f9fc]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Details (Optional)</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Operational description..."
                rows={3}
                className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-sm bg-[#f7f9fc] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Link Document</label>
                <select
                  value={documentId}
                  onChange={e => setDocumentId(e.target.value)}
                  className="w-full px-2 py-2 border border-[#06101d]/12 rounded-xl text-sm bg-[#f7f9fc]"
                >
                  <option value="">Select File...</option>
                  {docs.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value)}
                  className="w-full px-2 py-2 border border-[#06101d]/12 rounded-xl text-sm bg-[#f7f9fc]"
                >
                  {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className="flex gap-2 justify-end mt-4">
              <button
                type="button"
                onClick={() => setShowRequestModal(false)}
                className="px-4 py-2 border border-[#06101d]/12 rounded-xl text-xs font-semibold text-slate-600 hover:bg-[#f7f9fc]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creating}
                className="px-5 py-2 bg-[#06101d] text-white rounded-xl text-xs font-bold hover:bg-[#102640]"
              >
                {creating ? 'Submitting...' : 'Send Request'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
