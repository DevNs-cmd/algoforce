/**
 * Meetings.jsx
 * Meetings log and scheduling module with silent AI Summarize Meeting.
 */
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../services/supabase'
import { logActivity } from '../../services/activityService'
import { summarizeMeeting } from '../../services/openaiService'

export default function Meetings() {
  const { company, user } = useAuth()
  const [meetings, setMeetings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  
  // Form states
  const [title, setTitle] = useState('')
  const [agenda, setAgenda] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [attendees, setAttendees] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Notes/AI states
  const [notes, setNotes] = useState('')
  const [summarizing, setSummarizing] = useState(false)
  const [aiSummary, setAiSummary] = useState('')

  useEffect(() => {
    if (company?.id) {
      loadMeetings()
    }
  }, [company])

  const loadMeetings = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .eq('company_id', company.id)
        .order('date_time', { ascending: false })
      
      if (error) throw error
      setMeetings(data || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!title || submitting) return
    setSubmitting(true)
    try {
      const attendeesArr = attendees.split(',').map(a => a.trim()).filter(Boolean)
      const { data, error } = await supabase
        .from('meetings')
        .insert({
          company_id: company.id,
          title,
          agenda,
          date_time: dateTime || new Date().toISOString(),
          attendees: attendeesArr,
          status: 'scheduled'
        })
        .select()
        .single()
      
      if (error) throw error
      
      await logActivity(company.id, user.id, 'meeting', `Scheduled meeting: ${title}`)
      setMeetings(prev => [data, ...prev])
      setShowAddModal(false)
      setTitle('')
      setAgenda('')
      setDateTime('')
      setAttendees('')
    } catch (e) {
      alert(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleOpenDetails = (meeting) => {
    setSelectedMeeting(meeting)
    setNotes(meeting.notes || '')
    setAiSummary(meeting.ai_summary || '')
  }

  const handleSaveNotes = async () => {
    if (!selectedMeeting) return
    try {
      const { error } = await supabase
        .from('meetings')
        .update({ notes })
        .eq('id', selectedMeeting.id)
      if (error) throw error
      
      setMeetings(prev => prev.map(m => m.id === selectedMeeting.id ? { ...m, notes } : m))
      alert('Notes saved successfully!')
    } catch (e) {
      alert(e.message)
    }
  }

  const handleAISummarize = async () => {
    if (!selectedMeeting || !notes.trim()) return
    setSummarizing(true)
    try {
      const result = await summarizeMeeting(notes)
      let summaryText = result
      // If result is JSON object, format it into clean Markdown
      try {
        const parsed = JSON.parse(result)
        summaryText = `### Summary\n${parsed.summary || ''}\n\n### Decisions\n${(parsed.decisions || []).map(d => `- ${d}`).join('\n')}\n\n### Action Items\n${(parsed.action_items || []).map(i => `- **${i.task}** (assigned to: ${i.owner || 'N/A'}, due: ${i.due_date || 'N/A'})`).join('\n')}\n\n### Next Steps\n${(parsed.next_steps || []).map(n => `- ${n}`).join('\n')}`
      } catch (_) {}

      const { error } = await supabase
        .from('meetings')
        .update({ ai_summary: summaryText, status: 'completed' })
        .eq('id', selectedMeeting.id)
      
      if (error) throw error
      
      setAiSummary(summaryText)
      setMeetings(prev => prev.map(m => m.id === selectedMeeting.id ? { ...m, ai_summary: summaryText, status: 'completed' } : m))
      await logActivity(company.id, user.id, 'meeting', `Summarized meeting notes: ${selectedMeeting.title}`)
    } catch (e) {
      alert('AI Summarization failed: ' + e.message)
    } finally {
      setSummarizing(false)
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Top Header */}
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#06101d]">Meetings</h1>
          <p className="text-sm text-slate-500 mt-0.5">Schedule meetings, track agendas, document notes, and run silent AI summaries.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#06101d] text-white rounded-xl text-xs font-bold hover:bg-[#152840] transition-all"
        >
          ➕ Schedule Meeting
        </button>
      </div>

      {/* Main Grid: Left List, Right Panel */}
      <div className="flex-1 overflow-hidden flex bg-[#f7f9fc]">
        
        {/* Left Side: Meetings List */}
        <div className="w-1/2 border-r border-[#06101d]/8 overflow-y-auto p-6 space-y-4">
          {loading ? (
            <p className="text-center text-slate-400 text-xs py-10">Loading meetings list...</p>
          ) : meetings.length === 0 ? (
            <div className="text-center py-20 text-slate-400 text-xs">
              📅 No meetings scheduled yet. Create one to begin.
            </div>
          ) : (
            meetings.map(m => (
              <div
                key={m.id}
                onClick={() => handleOpenDetails(m)}
                className={`p-4 bg-white rounded-2xl border transition-all cursor-pointer ${
                  selectedMeeting?.id === m.id ? 'border-[#8f38ff] shadow-sm' : 'border-[#06101d]/8 hover:border-[#06101d]/15'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-[#06101d] text-xs">{m.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-1">
                      📅 {new Date(m.date_time).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border ${
                    m.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}>
                    {m.status}
                  </span>
                </div>
                {m.agenda && (
                  <p className="text-[11px] text-slate-500 mt-2 leading-relaxed line-clamp-2">{m.agenda}</p>
                )}
                {m.attendees?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {m.attendees.map((att, i) => (
                      <span key={i} className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-semibold">{att}</span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Right Side: Meeting Details Panel */}
        <div className="w-1/2 overflow-y-auto p-6 bg-white flex flex-col justify-between">
          {selectedMeeting ? (
            <div className="space-y-6">
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400">Meeting Briefing</span>
                <h2 className="text-base font-bold text-[#06101d] mt-1">{selectedMeeting.title}</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Scheduled for: {new Date(selectedMeeting.date_time).toLocaleString()}
                </p>
              </div>

              {selectedMeeting.agenda && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Agenda</h4>
                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    {selectedMeeting.agenda}
                  </p>
                </div>
              )}

              {/* Notes Editor */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Meeting Notes</h4>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Type meeting transcripts or notes here to summarize..."
                  rows={6}
                  className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-xs bg-[#f7f9fc] resize-none focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30 leading-relaxed"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveNotes}
                    className="px-4 py-2 border border-[#06101d]/12 rounded-lg text-xs font-semibold text-slate-600 hover:bg-[#f7f9fc]"
                  >
                    Save Notes
                  </button>
                  <button
                    onClick={handleAISummarize}
                    disabled={summarizing || !notes.trim()}
                    className="px-4 py-2 bg-[#8f38ff] text-white rounded-lg text-xs font-bold hover:bg-[#7b2be0] disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {summarizing && <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />}
                    {summarizing ? 'Summarizing...' : 'Summarize Meeting'}
                  </button>
                </div>
              </div>

              {/* AI Summary display */}
              {aiSummary && (
                <div className="space-y-2 border-t border-[#06101d]/8 pt-4">
                  <h4 className="text-xs font-bold text-[#8f38ff] uppercase tracking-wide">AI Executive Summary</h4>
                  <div className="text-xs text-slate-650 bg-[#8f38ff]/5 border border-[#8f38ff]/10 p-4 rounded-2xl whitespace-pre-wrap leading-relaxed">
                    {aiSummary}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-slate-400 text-xs">
              👈 Select a meeting from the list to view notes and summarize.
            </div>
          )}
        </div>

      </div>

      {/* Schedule Meeting Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#06101d]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreate} className="bg-white rounded-3xl max-w-md w-full border border-[#06101d]/15 shadow-xl p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#06101d] mb-1">Schedule Meeting</h3>
              <p className="text-xs text-slate-500">Record a new meeting slot details.</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Meeting Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Tally Integration Weekly Sync"
                  className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-xs bg-[#f7f9fc] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Date & Time</label>
                <input
                  type="datetime-local"
                  required
                  value={dateTime}
                  onChange={e => setDateTime(e.target.value)}
                  className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-xs bg-[#f7f9fc] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Attendees (comma separated)</label>
                <input
                  type="text"
                  value={attendees}
                  onChange={e => setAttendees(e.target.value)}
                  placeholder="e.g. Rahul, Ankit, Priya"
                  className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-xs bg-[#f7f9fc] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Agenda Context</label>
                <textarea
                  value={agenda}
                  onChange={e => setAgenda(e.target.value)}
                  placeholder="What is the objective of this sync..."
                  rows={3}
                  className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-xs bg-[#f7f9fc] resize-none focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-[#06101d]/12 rounded-xl text-xs font-semibold text-slate-600 hover:bg-[#f7f9fc]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-[#06101d] text-white rounded-xl text-xs font-bold hover:bg-[#102640]"
              >
                {submitting ? 'Scheduling...' : 'Schedule'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
