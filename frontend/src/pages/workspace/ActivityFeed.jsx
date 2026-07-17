/**
 * ActivityFeed.jsx
 * Real-time Company Activity stream widget using Supabase Realtime subscriptions.
 */
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getActivity, ACTIVITY_ICONS } from '../../services/activityService'
import { supabase } from '../../services/supabase'

export default function ActivityFeed({ limit = 30, compact = false }) {
  const { company } = useAuth()
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (company?.id) {
      loadInitialActivities()

      // Subscribe to real-time postgres changes for insert
      const channel = supabase
        .channel(`activity_log_realtime_${company.id}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'activity_log',
            filter: `company_id=eq.${company.id}`
          },
          (payload) => {
            setActivities(prev => [payload.new, ...prev.slice(0, limit - 1)])
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [company, limit])

  const loadInitialActivities = async () => {
    setLoading(true)
    try {
      const data = await getActivity(company.id, limit)
      setActivities(data)
    } catch (e) {
      console.error('Error fetching activities:', e)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-slate-400 text-xs flex items-center justify-center h-full">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-[#06101d]/30 rounded-full animate-bounce [animation-delay:0ms]" />
          <div className="w-1.5 h-1.5 bg-[#06101d]/30 rounded-full animate-bounce [animation-delay:150ms]" />
          <div className="w-1.5 h-1.5 bg-[#06101d]/30 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    )
  }

  if (activities.length === 0) {
    return (
      <div className="p-6 text-center text-slate-400 text-xs flex flex-col items-center justify-center h-full">
        <span className="text-xl mb-1">⏱️</span>
        <p>No activity registered yet.</p>
      </div>
    )
  }

  return (
    <div className={`h-full overflow-y-auto px-5 py-4 ${compact ? 'space-y-3' : 'space-y-4'}`}>
      {activities.map((act) => {
        const timeStr = new Date(act.created_at).toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit'
        })
        const dateStr = new Date(act.created_at).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short'
        })

        return (
          <div key={act.id} className="flex gap-3 text-xs items-start">
            <span className="text-base p-1.5 bg-slate-100 rounded-xl flex-shrink-0 flex items-center justify-center shadow-xs">
              {ACTIVITY_ICONS[act.type] || ACTIVITY_ICONS.default}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-[#06101d] leading-normal break-words">{act.title}</p>
              {act.description && !compact && (
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed truncate">{act.description}</p>
              )}
              <p className="text-[9px] text-slate-400 mt-1 font-medium">
                {dateStr} · {timeStr}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
