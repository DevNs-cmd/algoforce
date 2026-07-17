/**
 * Support.jsx
 * Support Center.
 * File tickets, choose priority classes, read support thread logs.
 */
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getTickets, createTicket } from '../../services/operationsService'
import { logActivity } from '../../services/activityService'

const CATEGORIES = ['bug', 'feature', 'question', 'billing', 'other']
const PRIORITIES = ['low', 'medium', 'high']

export default function Support() {
  const { user, company } = useAuth()
  
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Create ticket form
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('question')
  const [priority, setPriority] = useState('medium')
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')

  // Selected ticket chat simulation
  const [activeTicketId, setActiveTicketId] = useState(null)
  const [chatInput, setChatInput] = useState('')
  const [ticketChats, setTicketChats] = useState({}) // Simulated message threads per ticket

  useEffect(() => {
    if (company?.id) {
      loadTickets()
    }
  }, [company])

  const loadTickets = async () => {
    setLoading(true)
    try {
      const data = await getTickets(company.id)
      setTickets(data)
      if (data.length > 0 && !activeTicketId) {
        setActiveTicketId(data[0].id)
      }
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
      const created = await createTicket(company.id, user.id, {
        title,
        description,
        category,
        priority
      })
      await logActivity(company.id, user.id, 'task', `Opened Support Ticket: "${title}"`)
      setTickets(prev => [created, ...prev])
      setActiveTicketId(created.id)
      
      setTitle('')
      setDescription('')
      setCategory('question')
      setPriority('medium')
    } catch (err) {
      setError(err.message)
    } finally {
      setCreating(false)
    }
  }

  const activeTicket = tickets.find(t => t.id === activeTicketId)

  // Seed default chat logs when ticket is selected
  const activeChats = activeTicket ? (ticketChats[activeTicket.id] || [
    { sender: 'AlgoForce Bot', msg: `Hello! We've received your ticket regarding: "${activeTicket.title}". An integration engineer will review this shortly.`, date: activeTicket.created_at },
    ...(activeTicket.description ? [{ sender: 'You', msg: activeTicket.description, date: activeTicket.created_at }] : [])
  ]) : []

  const handleSendChat = (e) => {
    e.preventDefault()
    if (!chatInput.trim() || !activeTicketId) return
    
    const newMsg = { sender: 'You', msg: chatInput, date: new Date().toISOString() }
    const updatedChats = [...activeChats, newMsg]
    
    setTicketChats(prev => ({ ...prev, [activeTicketId]: updatedChats }))
    setChatInput('')

    // Mock reply from engineering after 1.5 seconds
    setTimeout(() => {
      const replyMsg = { sender: 'Rahul (Lead Engineer)', msg: `Thanks for the input. I am checking the ledger records matching your request now.`, date: new Date().toISOString() }
      setTicketChats(prev => ({ ...prev, [activeTicketId]: [...updatedChats, replyMsg] }))
    }, 1500)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#06101d]">Support Center</h1>
          <p className="text-sm text-slate-500 mt-0.5">Submit questions, report system bugs, or schedule sessions with engineers.</p>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel: File ticket + list */}
        <div className="w-80 border-r border-[#06101d]/8 flex flex-col flex-shrink-0 overflow-hidden bg-white">
          <div className="p-4 border-b border-[#06101d]/6">
            <form onSubmit={handleCreate} className="space-y-3.5">
              <h3 className="text-xs font-bold uppercase text-slate-400">File a Ticket</h3>
              <div>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Ticket Subject..."
                  className="w-full px-3 py-1.5 border border-[#06101d]/12 rounded-xl text-xs bg-[#f7f9fc]"
                />
              </div>
              <div>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe your issue or query..."
                  rows={2}
                  className="w-full px-3 py-1.5 border border-[#06101d]/12 rounded-xl text-xs bg-[#f7f9fc] resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-2 py-1.5 border border-[#06101d]/12 rounded-xl text-xs bg-[#f7f9fc] text-slate-600 font-semibold"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                  </select>
                </div>
                <div>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                    className="w-full px-2 py-1.5 border border-[#06101d]/12 rounded-xl text-xs bg-[#f7f9fc] text-slate-600 font-semibold"
                  >
                    {PRIORITIES.map(p => <option key={p} value={p}>{p.toUpperCase()}</option>)}
                  </select>
                </div>
              </div>
              {error && <p className="text-[10px] text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={creating}
                className="w-full py-2 bg-[#06101d] text-white rounded-xl text-xs font-bold hover:bg-[#102640] transition-colors"
              >
                {creating ? 'Filing...' : 'File Ticket'}
              </button>
            </form>
          </div>

          {/* Ticket list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-[#f7f9fc]">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide px-2.5">Your Tickets ({tickets.length})</p>
            {loading ? (
              <p className="text-center text-slate-400 text-xs py-6">Loading tickets...</p>
            ) : tickets.length === 0 ? (
              <p className="text-center text-slate-400 text-[11px] py-10">No support tickets.</p>
            ) : (
              tickets.map(t => (
                <div
                  key={t.id}
                  onClick={() => setActiveTicketId(t.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col gap-1 ${
                    activeTicketId === t.id
                      ? 'border-[#06101d] bg-white shadow-xs'
                      : 'border-transparent bg-[#f7f9fc] hover:bg-[#edf1f5]'
                  }`}
                >
                  <span className="text-xs font-bold text-[#06101d] truncate">{t.title}</span>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1">
                    <span className="capitalize font-semibold text-slate-550">{t.category}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                      t.priority === 'high' ? 'bg-red-50 text-red-650' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {t.priority}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right chat interface thread simulator */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#f7f9fc]">
          {activeTicket ? (
            <>
              {/* Active Ticket details header */}
              <div className="bg-white border-b border-[#06101d]/6 p-4 flex-shrink-0 flex justify-between items-center gap-4">
                <div>
                  <h4 className="text-xs font-bold text-[#06101d]">{activeTicket.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Classification: {activeTicket.category} · Status: {activeTicket.status}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border capitalize ${
                  activeTicket.status === 'open' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50 text-slate-500'
                }`}>
                  {activeTicket.status}
                </span>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
                {activeChats.map((c, idx) => (
                  <div key={idx} className={`flex ${c.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                    <div className="space-y-0.5">
                      <span className="text-[9px] text-slate-400 font-bold block px-1 capitalize">{c.sender}</span>
                      <div className={`px-3 py-2.5 rounded-2xl text-xs max-w-sm ${
                        c.sender === 'You'
                          ? 'bg-[#06101d] text-white shadow-xs'
                          : 'bg-white text-[#06101d] border border-[#06101d]/8 shadow-xs'
                      }`}>
                        {c.msg}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Send */}
              <div className="p-4 bg-white border-t border-[#06101d]/8 flex-shrink-0">
                <form onSubmit={handleSendChat} className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    placeholder="Type a message to the engineering team..."
                    className="flex-1 px-3 py-2 border border-[#06101d]/12 rounded-xl text-xs bg-[#f7f9fc] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#06101d] text-white rounded-xl text-xs font-bold hover:bg-[#102640]"
                  >
                    Send
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-slate-400 text-xs">Choose or open a ticket from the registry to view conversations.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
