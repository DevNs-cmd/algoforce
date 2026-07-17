/**
 * WorkspaceSettings.jsx
 * OpenAI API key config, company name, and profile settings.
 */
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../services/supabase'

export default function WorkspaceSettings() {
  const { user, company, userDisplayName, logout } = useAuth()
  const [companyName, setCompanyName] = useState(company?.name || '')
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const handleSaveCompany = async () => {
    if (!company?.id || !companyName.trim()) return
    setSaving(true)
    try {
      await supabase.from('companies').update({ name: companyName }).eq('id', company.id)
      setSaveMsg('Company name updated.')
    } catch (e) {
      setSaveMsg('Error saving company name.')
    } finally {
      setSaving(false)
      setTimeout(() => setSaveMsg(''), 3000)
    }
  }

  const handleChangePassword = async () => {
    const email = user?.email
    if (!email) return
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/workspace/settings`,
      })
      setSaveMsg('Password reset email sent to ' + email)
      setTimeout(() => setSaveMsg(''), 5000)
    } catch (e) {
      setSaveMsg('Error: ' + e.message)
    }
  }


  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8">
        <h1 className="text-xl font-semibold text-[#06101d]">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your AI configuration, company profile, and account.</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
          {/* Save Message */}
          {saveMsg && (
            <div className="p-3 rounded-xl bg-[#f7f9fc] border border-[#06101d]/10 text-sm text-[#06101d]">{saveMsg}</div>
          )}



          {/* Company Profile */}
          <div className="bg-white rounded-2xl border border-[#06101d]/10 p-6 shadow-sm">
            <h2 className="font-semibold text-[#06101d] mb-5">Company Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#06101d] mb-2">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#06101d]/12 bg-[#f7f9fc] text-sm text-[#06101d] focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#06101d] mb-2">Workspace ID</label>
                <div className="px-4 py-3 rounded-xl border border-[#06101d]/12 bg-[#f7f9fc] text-sm text-slate-400 font-mono">
                  {company?.id || '—'}
                </div>
              </div>
              <button onClick={handleSaveCompany} disabled={saving}
                className="px-5 py-2.5 bg-[#06101d] text-white rounded-xl text-sm font-bold hover:bg-[#102640] transition-all disabled:opacity-50">
                {saving ? 'Saving…' : 'Save Company Name'}
              </button>
            </div>
          </div>

          {/* Account */}
          <div className="bg-white rounded-2xl border border-[#06101d]/10 p-6 shadow-sm">
            <h2 className="font-semibold text-[#06101d] mb-5">Account</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#f7f9fc] border border-[#06101d]/8">
                <div className="w-10 h-10 rounded-full bg-[#06101d] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {userDisplayName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#06101d]">{userDisplayName}</p>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={handleChangePassword}
                  className="px-5 py-2.5 rounded-xl border border-[#06101d]/15 text-sm font-semibold text-slate-600 hover:bg-[#f7f9fc] transition-all">
                  Reset Password
                </button>
                <button onClick={logout}
                  className="px-5 py-2.5 rounded-xl border border-red-200 text-sm font-semibold text-red-500 hover:bg-red-50 transition-all">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
