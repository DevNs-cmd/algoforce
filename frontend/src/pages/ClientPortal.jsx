/**
 * ClientPortal.jsx
 * Isolated B2B client dashboard route (/client).
 * Gives AlgoForce client companies transparent visibility over their project.
 */
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../services/supabase'
import { getProjects, getInvoices, getTickets, createTicket } from '../services/operationsService'
import { getDocuments } from '../services/workspaceService'

export default function ClientPortal() {
  const { user, company, userDisplayName, logout, loading, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')

  // Data states
  const [projects, setProjects] = useState([])
  const [invoices, setInvoices] = useState([])
  const [tickets, setTickets] = useState([])
  const [documents, setDocuments] = useState([])
  const [meetings, setMeetings] = useState([])
  const [messages, setMessages] = useState([])
  const [loadingData, setLoadingData] = useState(true)

  // Chat/Support input states
  const [chatInput, setChatInput] = useState('')
  const [sendingChat, setSendingChat] = useState(false)
  const [ticketTitle, setTicketTitle] = useState('')
  const [ticketDesc, setTicketDesc] = useState('')
  const [creatingTicket, setCreatingTicket] = useState(false)
  const [showTicketModal, setShowTicketModal] = useState(false)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { replace: true })
    }
  }, [loading, isAuthenticated, navigate])

  useEffect(() => {
    if (company?.id) {
      loadPortalData()

      // Realtime subscription for portal messages
      const channel = supabase
        .channel(`client_portal_messages_${company.id}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'client_messages', filter: `company_id=eq.${company.id}` },
          (payload) => {
            setMessages(prev => [...prev, payload.new])
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [company])

  const loadPortalData = async () => {
    setLoadingData(true)
    try {
      const [proj, inv, tkt, docs, mtg, msg] = await Promise.all([
        getProjects(company.id),
        getInvoices(company.id),
        getTickets(company.id),
        getDocuments(company.id),
        supabase.from('meetings').select('*').eq('company_id', company.id).order('date_time', { ascending: true }),
        supabase.from('client_messages').select('*').eq('company_id', company.id).order('created_at', { ascending: true })
      ])

      setProjects(proj || [])
      setInvoices(inv || [])
      setTickets(tkt || [])
      setDocuments(docs || [])
      setMeetings(mtg.data || [])
      setMessages(msg.data || [])
    } catch (e) {
      console.error('Error loading client portal data:', e)
    } finally {
      setLoadingData(false)
    }
  }

  const handleSendChat = async (e) => {
    e.preventDefault()
    if (!chatInput.trim() || sendingChat) return
    setSendingChat(true)
    try {
      const { error } = await supabase
        .from('client_messages')
        .insert({
          company_id: company.id,
          client_user_id: user.id,
          message: chatInput,
          sender: 'client'
        })
      if (error) throw error
      setChatInput('')
    } catch (e) {
      alert(e.message)
    } finally {
      setSendingChat(false)
    }
  }

  const handleCreateTicket = async (e) => {
    e.preventDefault()
    if (!ticketTitle || creatingTicket) return
    setCreatingTicket(true)
    try {
      const ticket = await createTicket(company.id, user.id, {
        title: ticketTitle,
        description: ticketDesc,
        category: 'issue',
        priority: 'medium'
      })
      setTickets(prev => [ticket, ...prev])
      setShowTicketModal(false)
      setTicketTitle('')
      setTicketDesc('')
    } catch (e) {
      alert(e.message)
    } finally {
      setCreatingTicket(false)
    }
  }

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-[#03070d] flex items-center justify-center text-white">
        <div className="text-center space-y-3">
          <div className="w-6 h-6 border-2 border-white/25 border-t-white rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Loading B2B Client Portal...</p>
        </div>
      </div>
    )
  }

  const activeProj = projects[0]
  const nextMeeting = meetings.filter(m => m.status === 'scheduled')[0]

  return (
    <div className="min-h-screen bg-[#f7f9fc] flex flex-col font-sans">
      {/* Top Header */}
      <header className="h-16 bg-white border-b border-[#06101d]/10 flex items-center justify-between px-6 sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="AlgoForce" className="h-6 w-auto object-contain" />
          <span className="text-[9px] font-bold bg-[#8f38ff] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Client Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-slate-650 bg-slate-50 border px-3 py-1 rounded-xl">
            🏢 {company?.name}
          </span>
          <button
            onClick={logout}
            className="text-xs font-semibold text-slate-500 hover:text-red-500 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Content Container */}
      <div className="flex-1 flex overflow-hidden max-w-7xl w-full mx-auto" style={{ height: 'calc(100vh - 64px)' }}>
        
        {/* Navigation Sidebar */}
        <aside className="w-56 bg-white border-r border-[#06101d]/8 p-4 flex flex-col justify-between">
          <div className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'billing', label: 'Documents & Billing', icon: '🧾' },
              { id: 'support', label: 'Support & Tickets', icon: '🎫' },
              { id: 'messages', label: 'Message Center', icon: '💬' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === tab.id
                    ? 'bg-[#06101d] text-white shadow-sm'
                    : 'text-slate-650 hover:bg-[#f7f9fc] hover:text-[#06101d]'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="p-3 bg-[#f7f9fc] border rounded-2xl text-[10px] text-slate-500 leading-normal">
            Need direct technical support? Use the **Message Center** tab.
          </div>
        </aside>

        {/* Tab content area */}
        <main className="flex-1 overflow-y-auto p-6">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-lg font-bold text-[#06101d]">Welcome, {userDisplayName}.</h1>
                <p className="text-xs text-slate-500 mt-0.5">Here is a summary of your B2B integration project timeline.</p>
              </div>

              {/* Project Tracker */}
              {activeProj ? (
                <div className="bg-white rounded-3xl border border-[#06101d]/8 p-5 shadow-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400">Project Status</span>
                      <h3 className="text-sm font-bold text-[#06101d] mt-1">{activeProj.name}</h3>
                      <p className="text-[10px] text-slate-500 capitalize mt-0.5">Stage: {activeProj.status}</p>
                    </div>
                    <span className="text-sm font-black text-[#8f38ff]">{activeProj.progress}% Completed</span>
                  </div>

                  <div className="mt-4">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#8f38ff] rounded-full transition-all" style={{ width: `${activeProj.progress}%` }} />
                    </div>
                  </div>

                  {/* Milestones Checklist */}
                  {activeProj.milestones?.length > 0 && (
                    <div className="mt-6 space-y-3">
                      <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">Implementation Milestones</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {activeProj.milestones.map((m, i) => (
                          <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-50 bg-[#f7f9fc]/50 text-xs">
                            <span className="text-sm">{m.done ? '✅' : '⏳'}</span>
                            <span className={m.done ? 'text-slate-450 line-through' : 'font-semibold text-slate-700'}>{m.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-[#06101d]/8 p-10 text-center text-slate-400 text-xs shadow-xs">
                  🚀 Setup in progress. Active project roadmap will appear here shortly.
                </div>
              )}

              {/* Next Meeting & Team */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Next Sync */}
                <div className="bg-white rounded-3xl border border-[#06101d]/8 p-5 shadow-xs">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Next Scheduled Sync</h3>
                  {nextMeeting ? (
                    <div className="p-3 bg-[#f7f9fc] rounded-2xl border border-[#06101d]/5">
                      <p className="font-bold text-xs text-[#06101d]">{nextMeeting.title}</p>
                      <p className="text-[10px] text-slate-500 mt-1">
                        📅 {new Date(nextMeeting.date_time).toLocaleString()}
                      </p>
                      {nextMeeting.agenda && (
                        <p className="text-[10px] text-slate-450 mt-2 italic">Agenda: {nextMeeting.agenda}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 py-4">No sync scheduled this week.</p>
                  )}
                </div>

                {/* Team Profiles */}
                <div className="bg-white rounded-3xl border border-[#06101d]/8 p-5 shadow-xs">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Assigned Engineering Team</h3>
                  {activeProj?.engineers?.length > 0 ? (
                    <div className="space-y-3">
                      {activeProj.engineers.map((eng, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#06101d] flex items-center justify-center text-white text-xs font-bold">
                            {eng.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#06101d]">{eng.name}</p>
                            <p className="text-[10px] text-slate-400">{eng.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 py-4">Engineers are being assigned to this workspace.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BILLING & DOCUMENTS */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-lg font-bold text-[#06101d]">Documents & Invoicing</h1>
                <p className="text-xs text-slate-500 mt-0.5">Manage accounts payable and download active compliance agreements.</p>
              </div>

              {/* Invoices List */}
              <div className="bg-white rounded-3xl border border-[#06101d]/8 p-5 shadow-xs space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Invoices</h3>
                {invoices.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">No invoices recorded.</p>
                ) : (
                  <div className="divide-y divide-[#06101d]/6">
                    {invoices.map(inv => (
                      <div key={inv.id} className="py-3 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-[#06101d]">₹{inv.amount.toLocaleString()}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{inv.description}</p>
                          <p className="text-[9px] text-slate-400 mt-0.5">Due date: {inv.due_date}</p>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border capitalize ${
                          inv.status === 'paid' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                        }`}>
                          {inv.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Documents List */}
              <div className="bg-white rounded-3xl border border-[#06101d]/8 p-5 shadow-xs space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Shared Documents</h3>
                {documents.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">No documents shared yet.</p>
                ) : (
                  <div className="divide-y divide-[#06101d]/6">
                    {documents.map(d => (
                      <div key={d.id} className="py-3 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-[#06101d]">{d.name}</p>
                          <p className="text-[9px] text-slate-400 mt-0.5">Category: {d.category}</p>
                        </div>
                        <span className="text-[10px] text-[#8f38ff] font-bold">PDF</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SUPPORT */}
          {activeTab === 'support' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-lg font-bold text-[#06101d]">Support & Service Desk</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Log service inquiries and track their resolution status.</p>
                </div>
                <button
                  onClick={() => setShowTicketModal(true)}
                  className="px-4 py-2 bg-[#06101d] text-white rounded-xl text-xs font-bold hover:bg-[#152840]"
                >
                  Create Ticket
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-[#06101d]/8 overflow-hidden shadow-xs">
                {tickets.length === 0 ? (
                  <p className="text-xs text-slate-400 py-10 text-center">No support tickets created yet.</p>
                ) : (
                  <div className="divide-y divide-[#06101d]/6">
                    {tickets.map(tkt => (
                      <div key={tkt.id} className="p-4 flex justify-between items-center text-xs hover:bg-[#f7f9fc]/50 transition-all">
                        <div>
                          <h4 className="font-bold text-[#06101d]">{tkt.title}</h4>
                          <p className="text-[10px] text-slate-400 mt-1">{tkt.description}</p>
                          <p className="text-[9px] text-slate-400 mt-1">Logged on: {new Date(tkt.created_at).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border capitalize ${
                          tkt.status === 'open' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-slate-50 text-slate-650 border-slate-200'
                        }`}>
                          {tkt.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="h-full flex flex-col justify-between bg-white rounded-3xl border border-[#06101d]/8 overflow-hidden shadow-xs">
              
              {/* Chat Header */}
              <div className="px-5 py-4 border-b border-[#06101d]/8 flex justify-between items-center bg-white flex-shrink-0">
                <div>
                  <h4 className="font-bold text-xs text-[#06101d]">Technical Operations Desk</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Direct communications line with engineers</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-5 bg-[#f7f9fc] space-y-4">
                {messages.length === 0 ? (
                  <p className="text-center text-slate-400 text-xs py-20">Send a greeting message to start the conversation.</p>
                ) : (
                  messages.map(m => (
                    <div key={m.id} className={`flex ${m.sender === 'client' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs ${
                        m.sender === 'client' ? 'bg-[#06101d] text-white shadow-xs' : 'bg-white text-[#06101d] border border-[#06101d]/8 shadow-xs'
                      }`}>
                        <p className="leading-relaxed">{m.message}</p>
                        <span className="text-[8px] text-slate-400 block mt-1 text-right">
                          {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendChat} className="p-4 border-t border-[#06101d]/8 bg-white flex gap-2 flex-shrink-0">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Ask a technical question..."
                  className="flex-1 px-4 py-3 border border-[#06101d]/12 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#8f38ff]"
                />
                <button
                  type="submit"
                  disabled={sendingChat || !chatInput.trim()}
                  className="px-5 py-3 bg-[#06101d] text-white rounded-xl text-xs font-bold hover:bg-[#152840] transition-all disabled:opacity-40"
                >
                  Send
                </button>
              </form>

            </div>
          )}

        </main>
      </div>

      {/* Ticket Creation Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 bg-[#06101d]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateTicket} className="bg-white rounded-3xl max-w-sm w-full border border-[#06101d]/15 shadow-xl p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#06101d] mb-1">Create Support Ticket</h3>
              <p className="text-xs text-slate-500">Provide details of technical glitches or questions.</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Ticket Title</label>
                <input
                  type="text"
                  required
                  value={ticketTitle}
                  onChange={e => setTicketTitle(e.target.value)}
                  placeholder="e.g. API Timeout on Tally sync module"
                  className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-xs bg-[#f7f9fc] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Description</label>
                <textarea
                  value={ticketDesc}
                  onChange={e => setTicketDesc(e.target.value)}
                  placeholder="Provide precise details..."
                  rows={4}
                  className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-xs bg-[#f7f9fc] resize-none focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowTicketModal(false)}
                className="px-4 py-2 border border-[#06101d]/12 rounded-xl text-xs font-semibold text-slate-600 hover:bg-[#f7f9fc]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creatingTicket}
                className="px-5 py-2 bg-[#06101d] text-white rounded-xl text-xs font-bold hover:bg-[#102640]"
              >
                {creatingTicket ? 'Submitting...' : 'Log Ticket'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
