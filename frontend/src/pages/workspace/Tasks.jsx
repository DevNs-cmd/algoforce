/**
 * Tasks.jsx
 * Operational task management.
 * Support manual entry, batch AI generation, status/priority filtering, and due date tracking.
 */
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getTasks, createTask, updateTaskStatus, deleteTask } from '../../services/operationsService'
import { logActivity } from '../../services/activityService'
import { hasApiKey, askAnything } from '../../services/openaiService'

const PRIORITIES = ['low', 'medium', 'high', 'urgent']
const STATUSES = ['open', 'in_progress', 'done']

export default function Tasks() {
  const { user, company } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all | open | done | overdue
  
  // New Task Form
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')

  // AI Task Generation State
  const [aiGoal, setAiGoal] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [showAiModal, setShowAiModal] = useState(false)

  useEffect(() => {
    if (company?.id) loadTasks()
  }, [company, filter])

  const loadTasks = async () => {
    setLoading(true)
    try {
      const data = await getTasks(company.id, filter)
      setTasks(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!title.trim() || creating) return
    setCreating(true)
    setError('')
    try {
      const created = await createTask(company.id, user.id, {
        title,
        description,
        priority,
        due_date: dueDate || null,
        source: 'manual'
      })
      await logActivity(company.id, user.id, 'task', `Created task: ${title}`)
      setTasks(prev => [created, ...prev])
      setTitle('')
      setDescription('')
      setPriority('medium')
      setDueDate('')
    } catch (err) {
      setError(err.message)
    } finally {
      setCreating(false)
    }
  }

  const handleStatusChange = async (taskId, currentStatus) => {
    const nextStatusMap = {
      open: 'in_progress',
      in_progress: 'done',
      done: 'open'
    }
    const nextStatus = nextStatusMap[currentStatus]
    try {
      await updateTaskStatus(taskId, nextStatus)
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: nextStatus } : t))
      const task = tasks.find(t => t.id === taskId)
      if (task) {
        await logActivity(
          company.id,
          user.id,
          'task',
          `Changed task status: "${task.title}" to ${nextStatus.replace('_', ' ')}`
        )
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (taskId, taskTitle) => {
    if (!confirm(`Delete task "${taskTitle}"?`)) return
    try {
      await deleteTask(taskId)
      setTasks(prev => prev.filter(t => t.id !== taskId))
      await logActivity(company.id, user.id, 'task', `Deleted task: ${taskTitle}`)
    } catch (err) {
      console.error(err)
    }
  }

  const handleAiTaskGeneration = async () => {
    if (!aiGoal.trim()) return
    if (!hasApiKey()) {
      alert('AI is not yet configured for this platform. Please contact your administrator.')
      return
    }
    setAiLoading(true)
    try {
      const systemCtx = 'You are an operations assistant. Generate a structured list of tasks to accomplish the business goal provided. Respond ONLY with a JSON array of task objects, each containing "title" (string, max 100 chars), "description" (string, max 200 chars), "priority" ("low", "medium", "high", "urgent"). Do not include markdown wraps or anything else.'
      const content = await askAnything(`Goal: ${aiGoal}`, systemCtx)
      const parsed = JSON.parse(content.replace(/```json/g, '').replace(/```/g, '').trim())

      // Save batch of tasks
      const { createTasksBatch } = await import('../../services/operationsService')
      const batchResult = await createTasksBatch(company.id, user.id, parsed)

      setTasks(prev => [...batchResult, ...prev])
      await logActivity(company.id, user.id, 'task', `AI generated ${batchResult.length} tasks for: "${aiGoal}"`)
      setAiGoal('')
      setShowAiModal(false)
    } catch (err) {
      alert('Failed to generate tasks: ' + err.message)
    } finally {
      setAiLoading(false)
    }
  }

  const getPriorityBadge = (p) => {
    const maps = {
      urgent: 'bg-red-50 text-red-700 border-red-200',
      high: 'bg-orange-50 text-orange-700 border-orange-200',
      medium: 'bg-blue-50 text-blue-700 border-blue-200',
      low: 'bg-slate-50 text-slate-600 border-slate-200'
    }
    return `px-2 py-0.5 rounded-full text-[10px] font-semibold border uppercase tracking-wider ${maps[p] || maps.medium}`
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#06101d]">Tasks</h1>
          <p className="text-sm text-slate-500 mt-0.5">Track team responsibilities, priorities, and deadlines.</p>
        </div>
        <button
          onClick={() => setShowAiModal(true)}
          className="px-4 py-2 bg-[#8f38ff] text-white rounded-xl text-xs font-bold hover:bg-[#7a2ee6] transition-all flex items-center gap-1.5"
        >
          ✨ Generate tasks with AI
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Form Panel */}
        <div className="w-80 border-r border-[#06101d]/8 p-5 flex-shrink-0 overflow-y-auto">
          <form onSubmit={handleCreate} className="space-y-4">
            <h3 className="text-xs font-bold uppercase text-slate-400">Add Task</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Task Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Follow up on proposal"
                className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-sm bg-[#f7f9fc]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Description (Optional)</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Details about task..."
                rows={3}
                className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-sm bg-[#f7f9fc] resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
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
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  className="w-full px-2 py-2 border border-[#06101d]/12 rounded-xl text-sm bg-[#f7f9fc] text-xs"
                />
              </div>
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={creating}
              className="w-full py-2.5 bg-[#06101d] text-white rounded-xl text-sm font-bold hover:bg-[#102640] transition-colors"
            >
              {creating ? 'Adding...' : 'Add Task'}
            </button>
          </form>
        </div>

        {/* Right Tasks List */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Filter Bar */}
          <div className="flex-shrink-0 border-b border-[#06101d]/8 p-4 flex gap-1.5 bg-white">
            {['all', 'open', 'in_progress', 'done', 'overdue'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  filter === f
                    ? 'bg-[#06101d] text-white'
                    : 'bg-[#f7f9fc] text-slate-600 hover:text-[#06101d]'
                }`}
              >
                {f.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-2.5">
            {loading ? (
              <div className="text-center text-slate-400 py-10">Loading tasks...</div>
            ) : tasks.length === 0 ? (
              <div className="text-center text-slate-400 py-12">
                <span className="text-3xl block mb-2">📋</span>
                No tasks found in this view.
              </div>
            ) : (
              tasks.map(task => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3.5 p-3.5 bg-white rounded-xl border border-[#06101d]/8 transition-all hover:shadow-sm ${
                    task.status === 'done' ? 'opacity-65' : ''
                  }`}
                >
                  <button
                    onClick={() => handleStatusChange(task.id, task.status)}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      task.status === 'done'
                        ? 'border-green-500 bg-green-500 text-white'
                        : task.status === 'in_progress'
                        ? 'border-blue-500 bg-blue-50 text-blue-500 font-bold'
                        : 'border-[#06101d]/20 hover:border-green-500'
                    }`}
                  >
                    {task.status === 'done' ? '✓' : task.status === 'in_progress' ? '·' : ''}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold text-[#06101d] truncate ${task.status === 'done' ? 'line-through text-slate-400' : ''}`}>
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{task.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className={getPriorityBadge(task.priority)}>{task.priority}</span>
                      {task.due_date && (
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                          task.status === 'done'
                            ? 'bg-slate-50 text-slate-400 border-slate-100'
                            : task.due_date < new Date().toISOString().split('T')[0]
                            ? 'bg-red-50 text-red-600 border-red-100 font-semibold animate-pulse'
                            : 'bg-[#f7f9fc] text-slate-500 border-[#06101d]/8'
                        }`}>
                          📅 {task.due_date}
                        </span>
                      )}
                      {task.source && task.source !== 'manual' && (
                        <span className="text-[9px] text-[#8f38ff] font-semibold bg-[#8f38ff]/5 border border-[#8f38ff]/10 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          From {task.source}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(task.id, task.title)}
                    className="text-slate-300 hover:text-red-500 text-xs transition-colors p-1"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* AI Task Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-[#06101d]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-[#06101d]/15 shadow-xl p-6">
            <h3 className="text-lg font-bold text-[#06101d] mb-1">Generate Tasks with AI</h3>
            <p className="text-xs text-slate-500 mb-4">Describe a project or milestone, and the AI will auto-create prioritized action steps in your task board.</p>
            <textarea
              value={aiGoal}
              onChange={e => setAiGoal(e.target.value)}
              placeholder="e.g. Onboard new enterprise client Acme Corp. Set up databases, draft mutual NDA, invite team members, schedule kickoff meeting."
              rows={4}
              className="w-full px-3 py-2.5 border border-[#06101d]/12 rounded-xl text-sm bg-[#f7f9fc] focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30 resize-none"
            />
            <div className="flex gap-2 justify-end mt-4">
              <button
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2 border border-[#06101d]/12 rounded-xl text-xs font-semibold text-slate-600 hover:bg-[#f7f9fc]"
              >
                Cancel
              </button>
              <button
                onClick={handleAiTaskGeneration}
                disabled={aiLoading || !aiGoal.trim()}
                className="px-5 py-2 bg-[#8f38ff] text-white rounded-xl text-xs font-bold hover:bg-[#7a2ee6] disabled:opacity-50 flex items-center gap-1.5"
              >
                {aiLoading && <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                {aiLoading ? 'Generating...' : 'Generate and Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
