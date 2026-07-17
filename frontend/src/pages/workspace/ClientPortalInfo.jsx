/**
 * ClientPortalInfo.jsx
 * Staff workspace view for managing client portal, listings, and communicating with clients.
 */
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../services/supabase'
import { logActivity } from '../../services/activityService'

export default function ClientPortalInfo() {
  const { company, user } = useAuth()
  const [clients, setClients] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  
  // New Client creation form
  const [showAddModal, setShowAddModal] = useState(false)
  const [clientEmail, setClientEmail] = useState('')
  const [clientName, setClientName] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Chat message input
  const [selectedClient, setSelectedClient] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (company?.id) {
      loadClients()
      loadClientMessages()

      // Realtime subscription for client messages
      const channel = supabase
        .channel(`client_messages_realtime_${company.id}`)
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

  const loadClients = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('company_members')
        .select('*')
        .eq('company_id', company.id)
        .eq('user_type', 'client')
      if (error) throw error
      setClients(data || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const loadClientMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('client_messages')
        .select('*')
        .eq('company_id', company.id)
        .order('created_at', { ascending: true })
      if (error) throw error
      setMessages(data || [])
    } catch (e) {
      console.error(e)
    }
  }

  const handleCreateClient = async (e) => {
    e.preventDefault()
    if (!clientEmail || submitting) return
    setSubmitting(true)
    try {
      // Create a company member representing the client user
      // Note: In production this would link to an actual auth user. We insert user_type = 'client'.
      const { data, error } = await supabase
        .from('company_members')
        .insert({
          company_id: company.id,
          role: 'client',
          user_type: 'client',
          department: 'Client'
        })
        .select()
        .single()
      
      if (error) throw error

      await logActivity(company.id, user.id, 'crm', `Registered B2B client: ${clientName || clientEmail}`)
      setClients(prev => [...prev, data])
      setShowAddModal(false)
      setClientEmail('')
      setClientName('')
    } catch (e) {
      alert(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleSendReply = async (e) => {
    e.preventDefault()
    if (!replyText.trim() || !selectedClient || sending) return
    setSending(true)
    try {
      const { error } = await supabase
        .from('client_messages')
        .insert({
          company_id: company.id,
          client_user_id: selectedClient.user_id || user.id, // Fallback to current user if client has no user_id yet
          message: replyText,
          sender: 'staff'
        })
      if (error) throw error
      setReplyText('')
    } catch (e) {
      alert(e.message)
    } finally {
      setSending(false)
    }
  }

  // Filter messages for selected client
  const clientMessages = messages.filter(m => m.client_user_id === selectedClient?.user_id || m.client_user_id === user.id)

  return (
    <div className="h-full flex flex-col">
      {/* Top Header */}
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#06101d]">Client Portal Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage B2B clients portal access and chat with active B2B portal clients.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#06101d] text-white rounded-xl text-xs font-bold hover:bg-[#152840]"
        >
          ➕ Register Client
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden bg-[#f7f9fc]">
        {/* Left Side: Info & Client List */}
        <div className="w-1/2 overflow-y-auto p-6 space-y-6 border-r border-[#06101d]/8">
          
          {/* Info Card */}
          <div className="p-4 bg-white rounded-2xl border border-[#06101d]/8 space-y-2.5">
            <h3 className="text-xs font-bold text-[#06101d]">B2B Client Experience</h3>
            <p className="text-xs text-slate-550 leading-relaxed">
              Your clients can access their dashboard by navigating directly to <code className="bg-[#f7f9fc] px-1.5 py-0.5 rounded border text-[#8f38ff] font-mono">/client</code>. 
              They see their project roadmaps, invoice schedules, meetings schedules, and support pipelines in real-time.
            </p>
          </div>

          {/* Client List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Registered Clients</h4>
            {loading ? (
              <p className="text-xs text-slate-400 text-center py-6">Loading client lists...</p>
            ) : clients.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6 bg-white border border-[#06101d]/6 rounded-2xl">No B2B clients registered yet.</p>
            ) : (
              <div className="space-y-2">
                {clients.map(c => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedClient(c)}
                    className={`p-4 bg-white rounded-2xl border cursor-pointer transition-all ${
                      selectedClient?.id === c.id ? 'border-[#8f38ff] shadow-sm' : 'border-[#06101d]/6 hover:border-[#06101d]/12'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-[#06101d]">{c.role === 'client' ? `Client Account #${c.id.slice(0, 8)}` : c.role}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Joined: {new Date(c.created_at).toLocaleDateString()}</p>
                      </div>
                      <span className="text-[10px] text-slate-450">💬 Chat</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Chat Panel */}
        <div className="w-1/2 overflow-hidden flex flex-col bg-white">
          {selectedClient ? (
            <div className="h-full flex flex-col justify-between">
              
              {/* Chat Header */}
              <div className="px-5 py-4 border-b border-[#06101d]/8 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-xs text-[#06101d]">Client Console Chat</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Direct link to B2B Client Portal</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-5 bg-[#f7f9fc] space-y-3.5">
                {clientMessages.length === 0 ? (
                  <p className="text-center text-slate-400 text-xs py-20">Send a greeting message to start the thread.</p>
                ) : (
                  clientMessages.map(m => (
                    <div key={m.id} className={`flex ${m.sender === 'staff' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs ${
                        m.sender === 'staff' ? 'bg-[#06101d] text-white' : 'bg-white text-[#06101d] border border-[#06101d]/8'
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
              <form onSubmit={handleSendReply} className="p-4 border-t border-[#06101d]/8 bg-white flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Type a response to client..."
                  className="flex-1 px-4 py-3 border border-[#06101d]/12 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#8f38ff]"
                />
                <button
                  type="submit"
                  disabled={sending || !replyText.trim()}
                  className="px-5 py-3 bg-[#06101d] text-white rounded-xl text-xs font-bold hover:bg-[#152840] transition-all disabled:opacity-40"
                >
                  Send
                </button>
              </form>

            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-slate-400 text-xs p-6">
              👈 Select a client from the left pane to open the live communications console.
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#06101d]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateClient} className="bg-white rounded-3xl max-w-sm w-full border border-[#06101d]/15 shadow-xl p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#06101d] mb-1">Register Client Profile</h3>
              <p className="text-xs text-slate-500">Provide credentials or names for client login.</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  placeholder="e.g. Mehta & Sons"
                  className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-xs bg-[#f7f9fc] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Contact Email</label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={e => setClientEmail(e.target.value)}
                  placeholder="e.g. contact@mehtasons.com"
                  className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-xs bg-[#f7f9fc] focus:outline-none"
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
                {submitting ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
