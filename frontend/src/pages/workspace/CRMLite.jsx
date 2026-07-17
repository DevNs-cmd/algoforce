/**
 * CRMLite.jsx
 * Standard CRM Lite.
 * Maintain clients database, contacts registry, pipelines, deal values, and notes.
 */
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import {
  getCRMCompanies,
  createCRMCompany,
  deleteCRMCompany,
  getCRMContacts,
  createCRMContact,
  deleteCRMContact
} from '../../services/operationsService'
import { logActivity } from '../../services/activityService'

const PIPELINES = ['prospect', 'proposal_sent', 'negotiation', 'won', 'lost']

export default function CRMLite() {
  const { user, company } = useAuth()
  
  const [crmCompanies, setCrmCompanies] = useState([])
  const [loadingCompanies, setLoadingCompanies] = useState(true)
  const [activeCompanyId, setActiveCompanyId] = useState(null)
  
  const [contacts, setContacts] = useState([])
  const [loadingContacts, setLoadingContacts] = useState(false)

  // Modals / Form Data
  const [showCompanyModal, setShowCompanyModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  
  // New Company Form fields
  const [companyName, setCompanyName] = useState('')
  const [industry, setIndustry] = useState('')
  const [status, setStatus] = useState('prospect')
  const [dealValue, setDealValue] = useState('')
  const [companyNotes, setCompanyNotes] = useState('')
  const [savingCompany, setSavingCompany] = useState(false)

  // New Contact Form fields
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactRole, setContactRole] = useState('')
  const [savingContact, setSavingContact] = useState(false)

  useEffect(() => {
    if (company?.id) {
      loadCompanies()
    }
  }, [company])

  useEffect(() => {
    if (activeCompanyId) {
      loadContacts(activeCompanyId)
    } else {
      setContacts([])
    }
  }, [activeCompanyId])

  const loadCompanies = async () => {
    setLoadingCompanies(true)
    try {
      const data = await getCRMCompanies(company.id)
      setCrmCompanies(data)
      if (data.length > 0 && !activeCompanyId) {
        setActiveCompanyId(data[0].id)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingCompanies(false)
    }
  }

  const loadContacts = async (coId) => {
    setLoadingContacts(true)
    try {
      const data = await getCRMContacts(company.id, coId)
      setContacts(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingContacts(false)
    }
  }

  const handleCreateCompany = async (e) => {
    e.preventDefault()
    if (!companyName.trim() || savingCompany) return
    setSavingCompany(true)
    try {
      const val = parseFloat(dealValue) || 0
      const created = await createCRMCompany(company.id, {
        name: companyName,
        industry,
        status,
        value: val,
        notes: companyNotes
      })
      await logActivity(company.id, user.id, 'crm', `Added client to CRM: "${companyName}"`)
      setCrmCompanies(prev => [created, ...prev])
      setActiveCompanyId(created.id)
      
      setCompanyName('')
      setIndustry('')
      setStatus('prospect')
      setDealValue('')
      setCompanyNotes('')
      setShowCompanyModal(false)
    } catch (err) {
      alert(err.message)
    } finally {
      setSavingCompany(false)
    }
  }

  const handleCreateContact = async (e) => {
    e.preventDefault()
    if (!contactName.trim() || savingContact || !activeCompanyId) return
    setSavingContact(true)
    try {
      const created = await createCRMContact(company.id, {
        crm_company_id: activeCompanyId,
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        role: contactRole
      })
      await logActivity(company.id, user.id, 'crm', `Added contact: "${contactName}" under company`)
      setContacts(prev => [created, ...prev])
      
      setContactName('')
      setContactEmail('')
      setContactPhone('')
      setContactRole('')
      setShowContactModal(false)
    } catch (err) {
      alert(err.message)
    } finally {
      setSavingContact(false)
    }
  }

  const handleDeleteCompany = async (coId, coName) => {
    if (!confirm(`Delete client "${coName}"? This will unlink contacts.`)) return
    try {
      await deleteCRMCompany(coId)
      setCrmCompanies(prev => prev.filter(c => c.id !== coId))
      await logActivity(company.id, user.id, 'crm', `Deleted client: "${coName}"`)
      if (activeCompanyId === coId) {
        setActiveCompanyId(null)
      }
    } catch (err) {
      alert(err.message)
    }
  }

  const handleDeleteContact = async (contactId, name) => {
    if (!confirm(`Delete contact "${name}"?`)) return
    try {
      await deleteCRMContact(contactId)
      setContacts(prev => prev.filter(c => c.id !== contactId))
    } catch (err) {
      console.error(err)
    }
  }

  const activeCo = crmCompanies.find(c => c.id === activeCompanyId)

  const statusBadge = (s) => {
    const maps = {
      prospect: 'bg-slate-50 text-slate-700 border-slate-200',
      proposal_sent: 'bg-blue-50 text-blue-700 border-blue-200',
      negotiation: 'bg-orange-50 text-orange-700 border-orange-200',
      won: 'bg-green-50 text-green-700 border-green-200',
      lost: 'bg-red-50 text-red-700 border-red-200'
    }
    return `px-2.5 py-0.5 rounded-full text-[10px] font-bold border capitalize tracking-wider ${maps[s] || maps.prospect}`
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#06101d]">CRM Lite</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage business prospects, accounts, and contact database.</p>
        </div>
        <button
          onClick={() => setShowCompanyModal(true)}
          className="px-4 py-2 bg-[#06101d] text-white rounded-xl text-xs font-bold hover:bg-[#102640] transition-all"
        >
          🤝 Add Account
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Accounts/Companies List */}
        <div className="w-80 border-r border-[#06101d]/8 flex flex-col flex-shrink-0 overflow-hidden">
          <div className="p-3.5 border-b border-[#06101d]/6 bg-white text-xs font-bold text-slate-400 uppercase tracking-wide">
            Client Accounts ({crmCompanies.length})
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-[#f7f9fc]">
            {loadingCompanies ? (
              <p className="text-center text-slate-400 py-10">Loading Accounts...</p>
            ) : crmCompanies.length === 0 ? (
              <div className="text-center text-slate-400 py-10 text-xs">
                No CRM records.
              </div>
            ) : (
              crmCompanies.map(co => (
                <div
                  key={co.id}
                  onClick={() => setActiveCompanyId(co.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col gap-1.5 ${
                    activeCompanyId === co.id
                      ? 'border-[#06101d] bg-white shadow-sm'
                      : 'border-transparent bg-[#f7f9fc] hover:bg-[#edf1f5]'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-sm font-bold text-[#06101d] truncate">{co.name}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteCompany(co.id, co.name) }}
                      className="text-slate-300 hover:text-red-500 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span>{co.industry || 'No Industry'}</span>
                    {co.value ? <span className="font-semibold text-slate-700">₹{co.value.toLocaleString('en-IN')}</span> : ''}
                  </div>
                  <div>
                    <span className={statusBadge(co.status)}>{co.status.replace('_', ' ')}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Details, Contacts & Timeline/Notes */}
        <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6">
          {activeCo ? (
            <>
              {/* Header Info */}
              <div className="flex justify-between items-start border-b border-[#06101d]/8 pb-5">
                <div>
                  <h2 className="text-lg font-bold text-[#06101d]">{activeCo.name}</h2>
                  <p className="text-sm text-slate-500">{activeCo.industry || 'No specified industry'}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className={statusBadge(activeCo.status)}>{activeCo.status.replace('_', ' ')}</span>
                  {activeCo.value && (
                    <span className="text-sm font-bold text-slate-700">
                      Pipeline Value: ₹{activeCo.value.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>

              {/* Notes */}
              {activeCo.notes && (
                <div className="bg-white rounded-2xl border border-[#06101d]/8 p-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Deal Notes / Context</h4>
                  <p className="text-sm text-slate-600 whitespace-pre-wrap">{activeCo.notes}</p>
                </div>
              )}

              {/* Contacts */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contacts Registry</h4>
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="text-xs font-semibold text-[#8f38ff] hover:underline"
                  >
                    + New Contact
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {loadingContacts ? (
                    <p className="text-slate-400 text-xs py-4">Loading contacts...</p>
                  ) : contacts.length === 0 ? (
                    <p className="text-slate-400 text-xs col-span-2">No contacts registered for this account.</p>
                  ) : (
                    contacts.map(c => (
                      <div key={c.id} className="bg-white rounded-2xl border border-[#06101d]/8 p-4 flex justify-between items-start gap-4">
                        <div className="min-w-0 space-y-1">
                          <p className="text-sm font-bold text-[#06101d] truncate">{c.name}</p>
                          {c.role && <p className="text-xs text-slate-400 font-medium">{c.role}</p>}
                          {c.email && <p className="text-xs text-slate-500 font-mono truncate">✉️ {c.email}</p>}
                          {c.phone && <p className="text-xs text-slate-500 font-mono">📞 {c.phone}</p>}
                        </div>
                        <button
                          onClick={() => handleDeleteContact(c.id, c.name)}
                          className="text-slate-200 hover:text-red-500 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-slate-400 text-sm">Select an account from the sidebar or add a new customer.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Company Modal */}
      {showCompanyModal && (
        <div className="fixed inset-0 z-50 bg-[#06101d]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateCompany} className="bg-white rounded-3xl max-w-lg w-full border border-[#06101d]/15 shadow-xl p-6 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[#06101d] mb-1">Add Client Account</h3>
              <p className="text-xs text-slate-500">Record a new operational prospect or active account.</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Company / Account Name</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="e.g. Reliance Logistics"
                className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-sm bg-[#f7f9fc]"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Industry</label>
                <input
                  type="text"
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                  placeholder="e.g. Retail"
                  className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-sm bg-[#f7f9fc]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Pipeline Stage</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="w-full px-2 py-2 border border-[#06101d]/12 rounded-xl text-sm bg-[#f7f9fc]"
                >
                  {PIPELINES.map(p => <option key={p} value={p}>{p.replace('_', ' ')}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Deal Value (INR)</label>
              <input
                type="number"
                value={dealValue}
                onChange={e => setDealValue(e.target.value)}
                placeholder="e.g. 500000"
                className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-sm bg-[#f7f9fc]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Internal Notes</label>
              <textarea
                value={companyNotes}
                onChange={e => setCompanyNotes(e.target.value)}
                placeholder="Requirements, context, history..."
                rows={3}
                className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-sm bg-[#f7f9fc] resize-none"
              />
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <button
                type="button"
                onClick={() => setShowCompanyModal(false)}
                className="px-4 py-2 border border-[#06101d]/12 rounded-xl text-xs font-semibold text-slate-600 hover:bg-[#f7f9fc]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingCompany}
                className="px-5 py-2 bg-[#06101d] text-white rounded-xl text-xs font-bold hover:bg-[#102640]"
              >
                {savingCompany ? 'Adding...' : 'Add Account'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-[#06101d]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateContact} className="bg-white rounded-3xl max-w-lg w-full border border-[#06101d]/15 shadow-xl p-6 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[#06101d] mb-1">Add Contact</h3>
              <p className="text-xs text-slate-500">Add an executive contact for {activeCo?.name}.</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={contactName}
                onChange={e => setContactName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-sm bg-[#f7f9fc]"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Role / Designation</label>
                <input
                  type="text"
                  value={contactRole}
                  onChange={e => setContactRole(e.target.value)}
                  placeholder="e.g. Procurement Lead"
                  className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-sm bg-[#f7f9fc]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={e => setContactPhone(e.target.value)}
                  placeholder="e.g. +91 9988776655"
                  className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-sm bg-[#f7f9fc]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
              <input
                type="email"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                placeholder="e.g. ramesh@company.com"
                className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-sm bg-[#f7f9fc]"
              />
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <button
                type="button"
                onClick={() => setShowContactModal(false)}
                className="px-4 py-2 border border-[#06101d]/12 rounded-xl text-xs font-semibold text-slate-600 hover:bg-[#f7f9fc]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingContact}
                className="px-5 py-2 bg-[#06101d] text-white rounded-xl text-xs font-bold hover:bg-[#102640]"
              >
                {savingContact ? 'Adding...' : 'Add Contact'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
