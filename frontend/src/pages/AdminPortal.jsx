import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabaseService } from '../services/supabaseService'
import { motion } from 'framer-motion'
import { 
  FaUsers, FaSearch, FaCogs, FaHeadset, FaFileInvoice, FaSignOutAlt,
  FaCheck, FaArrowRight, FaClock, FaCheckCircle
} from 'react-icons/fa'

const AdminPortal = () => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('customers')

  // Load persistence states
  const [tickets, setTickets] = useState(supabaseService.getTickets())
  const [projects, setProjects] = useState(supabaseService.getProjects())
  const [assessments, setAssessments] = useState(supabaseService.getAssessments())
  const [invoices] = useState(supabaseService.getInvoices())

  const [developerNote, setDeveloperNote] = useState('')
  const [replyText, setReplyText] = useState('')
  const [selectedTicketId, setSelectedTicketId] = useState(null)

  const handleAdvanceMilestone = (projId, currentStatus) => {
    const nextMilestones = {
      'Assessment': 'Planning',
      'Planning': 'Integration',
      'Integration': 'Testing',
      'Testing': 'Training',
      'Training': 'Go-Live',
      'Go-Live': 'Support',
      'Support': 'Completed'
    }
    const nextStatus = nextMilestones[currentStatus] || 'Completed'
    
    // Update status
    const updated = projects.map(p => {
      if (p.id === projId) {
        return {
          ...p,
          status: nextStatus,
          lastUpdate: `Deployment milestone advanced to ${nextStatus} by AlgoForce Admin.`
        }
      }
      return p
    })
    setProjects(updated)
  }

  const handlePostNote = (projId) => {
    if (!developerNote) return
    const updated = projects.map(p => {
      if (p.id === projId) {
        return { ...p, lastUpdate: developerNote }
      }
      return p
    })
    setProjects(updated)
    setDeveloperNote('')
  }

  const handleReplyTicket = (tktId) => {
    if (!replyText) return
    const updated = supabaseService.replyTicket(tktId, 'support', replyText)
    setTickets(updated)
    setReplyText('')
  }

  const menuItems = [
    { id: 'customers', label: 'Customers & Projects', icon: FaUsers },
    { id: 'assessments', label: 'Assessments Inbox', icon: FaSearch },
    { id: 'tickets', label: 'Support Queue', icon: FaHeadset },
    { id: 'invoices', label: 'Invoices Issued', icon: FaFileInvoice }
  ]

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans antialiased">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white px-2 py-0.5 rounded-lg border border-slate-700 shrink-0">
            <img src="/logo.png" alt="AlgoForce" className="h-5 w-auto object-contain invert brightness-0" />
          </div>
          <span className="text-base font-bold tracking-tight">
            Algo<span className="text-purple-400">Force</span> <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">Internal Admin</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/workspace/overview" className="text-[10px] font-bold border border-white/20 hover:bg-white/5 px-3 py-1.5 rounded-full uppercase tracking-wider transition-all">
            Client Workspace
          </Link>
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-xs font-bold text-rose-400 hover:text-rose-500 transition-all bg-transparent"
          >
            <FaSignOutAlt size={11} /> Log Out
          </button>
        </div>
      </header>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 border-r border-slate-200/80 bg-white hidden md:flex flex-col justify-between py-6">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest px-6 block mb-2">Admin Dashboard</span>
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-6 py-3 text-xs border-r-2 transition-all text-left ${
                  activeTab === item.id 
                    ? 'bg-amber-50 text-amber-700 font-bold border-amber-500' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold'
                }`}
              >
                <item.icon className="text-slate-400 text-xs shrink-0 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-4xl mx-auto w-full">
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Customers & Deployments</h2>
              <div className="space-y-6">
                {projects.map(proj => (
                  <div key={proj.id} className="p-5 border border-slate-250 bg-white rounded-2xl shadow-sm space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800">{proj.name}</h3>
                        <p className="text-[10px] text-slate-400 font-semibold">Active Engineers: {proj.engineers.join(', ')}</p>
                      </div>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded uppercase">
                        {proj.status}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleAdvanceMilestone(proj.id, proj.status)}
                        className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[10px] font-bold transition-all flex items-center gap-1"
                      >
                        Advance Milestone <FaArrowRight size={8} />
                      </button>
                    </div>

                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider block">Add Dev Log Note</span>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Update status message..."
                          value={developerNote}
                          onChange={(e) => setDeveloperNote(e.target.value)}
                          className="flex-1 text-xs font-semibold p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 bg-slate-50/20" 
                        />
                        <button 
                          onClick={() => handlePostNote(proj.id)}
                          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-all"
                        >
                          Post Log
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'assessments' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Assessments Inbox</h2>
              <div className="space-y-4">
                {assessments.length === 0 ? (
                  <p className="text-xs text-slate-400 font-semibold italic text-center py-6 border border-dashed border-slate-200 rounded-xl">No assessments generated by customers yet.</p>
                ) : (
                  assessments.map(asm => (
                    <div key={asm.id} className="p-5 border border-slate-200 bg-white rounded-xl shadow-sm space-y-3">
                      <div className="flex justify-between items-start border-b border-slate-100 pb-2">
                        <div>
                          <h3 className="text-xs font-bold text-slate-800">{asm.formData.companyName} Review</h3>
                          <p className="text-[10px] text-slate-400 font-semibold">{asm.timestamp}</p>
                        </div>
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{asm.complexity} Complexity</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">{asm.summary}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'tickets' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Support Queue</h2>
              <div className="space-y-4">
                {tickets.map(tkt => (
                  <div key={tkt.id} className="p-4 border border-slate-200 bg-white rounded-xl shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xs font-bold text-slate-800">{tkt.subject}</h3>
                        <p className="text-[9px] text-slate-400 font-bold uppercase">{tkt.id} • {tkt.date}</p>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${tkt.status === 'Open' ? 'bg-amber-100 text-amber-700 animate-pulse' : 'bg-slate-100 text-slate-600'}`}>{tkt.status}</span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-600 leading-relaxed font-semibold">
                      {tkt.messages[tkt.messages.length - 1]?.text}
                    </div>

                    {tkt.status === 'Open' && (
                      <div className="pt-2 border-t border-slate-100 space-y-2">
                        <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider block">Reply to Ticket</span>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Type reply message..." 
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="flex-1 text-xs font-semibold p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 bg-slate-50/20" 
                          />
                          <button 
                            onClick={() => handleReplyTicket(tkt.id)}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-all"
                          >
                            Send Reply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Invoices History</h2>
              <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-150">
                      <th className="p-3">Invoice ID</th>
                      <th className="p-3">Customer Plan</th>
                      <th className="p-3">Issue Date</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-600">
                    {invoices.map(inv => (
                      <tr key={inv.id}>
                        <td className="p-3 text-slate-900">{inv.id}</td>
                        <td className="p-3">{inv.plan}</td>
                        <td className="p-3 text-slate-400">{inv.date}</td>
                        <td className="p-3">
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded uppercase">
                            {inv.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminPortal
