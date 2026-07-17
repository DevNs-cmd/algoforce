/**
 * Timeline.jsx
 * Audit log timeline showing every action within the workspace.
 * Pulls from activity_log.
 */
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getActivity, ACTIVITY_ICONS } from '../../services/activityService'

export default function Timeline() {
  const { company } = useAuth()
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (company?.id) {
      loadActivityLog()
    }
  }, [company])

  const loadActivityLog = async () => {
    setLoading(true)
    try {
      const data = await getActivity(company.id, 50)
      setActivities(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filtered = activities.filter(a => {
    if (filter === 'all') return true
    return a.type === filter
  })

  // Group by date
  const grouped = filtered.reduce((groups, act) => {
    const date = new Date(act.created_at).toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(act)
    return groups
  }, {})

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#06101d]">Company Operations Timeline</h1>
          <p className="text-sm text-slate-500 mt-0.5">GitHub-style audit log tracking document uploads, generated SOPs, and approval history.</p>
        </div>
        <button
          onClick={loadActivityLog}
          className="text-xs font-semibold text-[#06101d] bg-white border border-[#06101d]/8 px-3 py-1.5 rounded-lg hover:bg-slate-50"
        >
          🔄 Refresh Log
        </button>
      </div>

      {/* Filter Options */}
      <div className="flex-shrink-0 border-b border-[#06101d]/8 p-4 flex gap-1.5 bg-white overflow-x-auto">
        {['all', 'upload', 'generate', 'approve', 'reject', 'task', 'crm', 'deploy'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all whitespace-nowrap ${
              filter === type ? 'bg-[#06101d] text-white' : 'bg-[#f7f9fc] text-slate-600'
            }`}
          >
            {type === 'all' ? 'All Activities' : `${ACTIVITY_ICONS[type] || ''} ${type}`}
          </button>
        ))}
      </div>

      {/* Timeline List */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#f7f9fc]">
        {loading ? (
          <p className="text-center text-slate-400 py-10">Fetching timeline history...</p>
        ) : Object.keys(grouped).length === 0 ? (
          <div className="text-center text-slate-450 py-16">
            <span className="text-3xl block mb-2">⏱️</span>
            No logged activities.
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-8">
            {Object.entries(grouped).map(([date, items]) => (
              <div key={date} className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide border-b border-[#06101d]/6 pb-2">
                  {date}
                </h3>
                
                <div className="relative pl-6 border-l border-[#06101d]/8 space-y-5 ml-2.5">
                  {items.map(item => (
                    <div key={item.id} className="relative flex flex-col gap-0.5 text-xs">
                      {/* Node Bullet Icon */}
                      <span className="absolute -left-[35px] top-0 w-6 h-6 rounded-full border border-[#06101d]/8 bg-white flex items-center justify-center text-xs shadow-xs">
                        {ACTIVITY_ICONS[item.type] || ACTIVITY_ICONS.default}
                      </span>
                      
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-semibold text-[#06101d]">{item.title}</span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(item.created_at).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-[11px] text-slate-500 mt-0.5 whitespace-pre-wrap">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
