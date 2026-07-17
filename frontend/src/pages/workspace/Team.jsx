/**
 * Team.jsx
 * Team members directory.
 * Invite members, assign permissions (Owner / Manager / Employee / Viewer).
 */
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getTeamMembers } from '../../services/operationsService'
import { logActivity } from '../../services/activityService'

const ROLES = ['owner', 'admin', 'member', 'guest']

export default function Team() {
  const { user, company, userDisplayName } = useAuth()
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Invite Form
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('member')
  const [inviting, setInviting] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)

  useEffect(() => {
    if (company?.id) {
      loadMembers()
    }
  }, [company])

  const loadMembers = async () => {
    setLoading(true)
    try {
      const data = await getTeamMembers(company.id)
      setMembers(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleInvite = async (e) => {
    e.preventDefault()
    if (!inviteEmail.trim() || inviting) return
    setInviting(true)
    try {
      // Mock invite logic: add a row to local state and log activity
      const mockMember = {
        id: Math.random().toString(36).substring(7),
        company_id: company.id,
        user_id: null,
        role: inviteRole,
        created_at: new Date().toISOString(),
        email_placeholder: inviteEmail // Just for display
      }
      
      setMembers(prev => [...prev, mockMember])
      await logActivity(
        company.id,
        user.id,
        'crm',
        `Invited team member: "${inviteEmail}" as ${inviteRole}`
      )
      setInviteEmail('')
      setInviteRole('member')
      setShowInviteModal(false)
    } catch (err) {
      alert(err.message)
    } finally {
      setInviting(false)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#06101d]">Teams & Permissions</h1>
          <p className="text-sm text-slate-500 mt-0.5">Invite teammates and configure access roles (Owner, Manager, Employee, Viewer).</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="px-4 py-2 bg-[#06101d] text-white rounded-xl text-xs font-bold hover:bg-[#102640] transition-all"
        >
          ➕ Invite Member
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f7f9fc]">
        
        {/* Members Directory Table */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#06101d]/8 overflow-hidden shadow-xs">
          {loading ? (
            <p className="text-center text-slate-400 text-xs py-10">Fetching directory records...</p>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#06101d]/8 bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="px-5 py-3.5">User Profile</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Permission Role</th>
                  <th className="px-5 py-3.5">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#06101d]/6 text-slate-700 font-medium">
                {/* Active user row */}
                <tr className="bg-white">
                  <td className="px-5 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#06101d] text-white flex items-center justify-center font-bold text-xs">
                      {userDisplayName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-[#06101d]">{userDisplayName} (You)</p>
                      <p className="text-[10px] text-slate-400">{user?.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-green-500 font-bold">Active</td>
                  <td className="px-5 py-4 text-[#06101d] uppercase font-bold text-[10px]">Owner</td>
                  <td className="px-5 py-4 text-slate-400">{new Date(user?.created_at || Date.now()).toLocaleDateString()}</td>
                </tr>

                {/* Seeded and invited members */}
                {members.map(member => {
                  const label = member.email_placeholder || `teammate_${member.id.slice(0,4)}@company.com`
                  return (
                    <tr key={member.id} className="hover:bg-[#f7f9fc]/50">
                      <td className="px-5 py-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs uppercase">
                          {label.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-[#06101d]">{label.split('@')[0]}</p>
                          <p className="text-[10px] text-slate-400">{label}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-amber-500 font-semibold">
                        {member.user_id ? 'Active' : 'Pending Invite'}
                      </td>
                      <td className="px-5 py-4 text-[#06101d] uppercase font-bold text-[10px]">{member.role}</td>
                      <td className="px-5 py-4 text-slate-400">{new Date(member.created_at).toLocaleDateString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-[#06101d]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleInvite} className="bg-white rounded-3xl max-w-lg w-full border border-[#06101d]/15 shadow-xl p-6 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[#06101d] mb-1">Invite Team Member</h3>
              <p className="text-xs text-slate-500">Add a teammate to collaborate on operations and review compliance audits.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                placeholder="teammate@company.com"
                className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-sm bg-[#f7f9fc]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">OS Access Permission</label>
              <select
                value={inviteRole}
                onChange={e => setInviteRole(e.target.value)}
                className="w-full px-2 py-2 border border-[#06101d]/12 rounded-xl text-sm bg-[#f7f9fc] text-slate-600 font-semibold"
              >
                {ROLES.map(r => <option key={r} value={r}>{r.toUpperCase()}</option>)}
              </select>
            </div>

            <div className="flex gap-2 justify-end mt-4">
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 border border-[#06101d]/12 rounded-xl text-xs font-semibold text-slate-600 hover:bg-[#f7f9fc]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={inviting}
                className="px-5 py-2 bg-[#06101d] text-white rounded-xl text-xs font-bold hover:bg-[#102640]"
              >
                {inviting ? 'Inviting...' : 'Send Invitation'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
