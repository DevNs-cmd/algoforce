/**
 * DeployMarketplace.jsx
 * AI Solutions Catalog.
 * Enables users to request deployment of enterprise modules. Logs leads in DB.
 */
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getDeployments, requestDeployment } from '../../services/operationsService'
import { logActivity } from '../../services/activityService'

const PRODUCTS = [
  { id: 'tallygpt', name: 'TallyGPT Core', desc: 'Natural language ledger Q&A, automated receipt entries, and dynamic audit reports.', price: '₹15,000/month', category: 'Finance' },
  { id: 'salesgpt', name: 'SalesGPT Pipeline', desc: 'Predictive deal pipelines, automated email drafts, and outbound lead prioritization.', price: '₹18,000/month', category: 'Sales' },
  { id: 'hrms_ai', name: 'HRMS Copilot', desc: 'Automate offer drafting, policy summaries, employee onboarding lists, and leave reviews.', price: '₹12,050/month', category: 'HR' },
  { id: 'factorygpt', name: 'FactoryGPT Operations', desc: 'Predictive inventory replenishment, SOP adherence audits, and supply chain warnings.', price: '₹25,000/month', category: 'Operations' },
  { id: 'supportgpt', name: 'SupportGPT Desk', desc: 'Auto-reply draft recommendations, customer ticket routing, and sentiment metrics.', price: '₹14,500/month', category: 'Customer Desk' },
  { id: 'nexus', name: 'AlgoForce Nexus', desc: 'Central enterprise dashboard consolidating metrics across departments.', price: 'On Request', category: 'Intelligence' },
  { id: 'crucible', name: 'Crucible Core', desc: 'Custom code execution engine for high-security workflows.', price: 'On Request', category: 'Developer Tools' },
  { id: 'velqora', name: 'Velqora Premium', desc: 'High-scale customer database and communications integration hub.', price: 'On Request', category: 'Sales' },
]

export default function DeployMarketplace() {
  const { user, company } = useAuth()
  const [deployments, setDeployments] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Deployment Request Form
  const [selectedProd, setSelectedProd] = useState(null)
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (company?.id) {
      loadDeployments()
    }
  }, [company])

  const loadDeployments = async () => {
    setLoading(true)
    try {
      const data = await getDeployments(company.id)
      setDeployments(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleRequest = async (e) => {
    e.preventDefault()
    if (!selectedProd || submitting) return
    setSubmitting(true)
    try {
      const created = await requestDeployment(
        company.id,
        user.id,
        selectedProd.name,
        selectedProd.id,
        notes
      )
      setDeployments(prev => [created, ...prev])
      await logActivity(
        company.id,
        user.id,
        'deploy',
        `Requested deployment: ${selectedProd.name}`,
        notes
      )
      setSelectedProd(null)
      setNotes('')
    } catch (err) {
      alert(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const getStatusBadge = (productId) => {
    const matched = deployments.find(d => d.product_id === productId)
    if (!matched) return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">Available</span>
    
    const colors = {
      requested: 'bg-amber-50 text-amber-700 border-amber-200',
      reviewing: 'bg-blue-50 text-blue-700 border-blue-200',
      scheduled: 'bg-purple-50 text-purple-700 border-purple-200',
      active: 'bg-green-50 text-green-700 border-green-200',
      cancelled: 'bg-red-50 text-red-700 border-red-200'
    }
    return (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border capitalize ${colors[matched.status] || colors.requested}`}>
        {matched.status}
      </span>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#06101d]">AI Solutions Catalog</h1>
          <p className="text-sm text-slate-500 mt-0.5">Explore, license, and trigger implementation of custom AlgoForce AI solutions.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f7f9fc]">
        
        {/* Active Deployments Panel */}
        {deployments.length > 0 && (
          <div className="bg-white rounded-3xl border border-[#06101d]/8 p-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Your Deployment Integrations</h3>
            <div className="divide-y divide-[#06101d]/6">
              {deployments.map(d => (
                <div key={d.id} className="py-3 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-[#06101d]">{d.product_name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Requested on: {new Date(d.created_at).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border capitalize ${
                    d.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {PRODUCTS.map(prod => {
            const hasRequested = deployments.some(d => d.product_id === prod.id)
            return (
              <div key={prod.id} className="bg-white rounded-2xl border border-[#06101d]/8 p-5 flex flex-col justify-between hover:shadow-sm transition-all">
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] uppercase font-bold text-[#8f38ff] tracking-wide bg-[#8f38ff]/5 border border-[#8f38ff]/10 px-2 py-0.5 rounded">
                      {prod.category}
                    </span>
                    {getStatusBadge(prod.id)}
                  </div>
                  <h3 className="text-sm font-bold text-[#06101d]">{prod.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{prod.desc}</p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#06101d]/6 flex justify-between items-center gap-2">
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase font-semibold">Pricing</p>
                    <p className="text-xs font-bold text-slate-700">Starting from {prod.price}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProd(prod)}
                    disabled={hasRequested}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                      hasRequested
                        ? 'bg-slate-50 text-slate-450 border border-slate-200 cursor-not-allowed'
                        : 'bg-[#06101d] text-white hover:bg-[#102640]'
                    }`}
                  >
                    {hasRequested ? 'Deployment Sent' : 'Deploy Solutions'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Deployment Request Modal */}
      {selectedProd && (
        <div className="fixed inset-0 z-50 bg-[#06101d]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleRequest} className="bg-white rounded-3xl max-w-lg w-full border border-[#06101d]/15 shadow-xl p-6 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[#06101d] mb-1">Request Solutions Deployment</h3>
              <p className="text-xs text-slate-500">Initiate implementation process for {selectedProd.name}.</p>
            </div>
            
            <div className="p-3.5 rounded-2xl bg-[#f7f9fc] border border-[#06101d]/6">
              <p className="text-xs font-bold text-[#06101d]">{selectedProd.name}</p>
              <p className="text-xs text-slate-500 mt-1">{selectedProd.desc}</p>
              <p className="text-xs font-semibold text-[#8f38ff] mt-2">Est. Cost: Starting from {selectedProd.price}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Deployment notes / Context</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Include custom integration requirements, e.g. We use Tally Prime on AWS, want to connect it to our WhatsApp numbers..."
                rows={4}
                className="w-full px-3 py-2 border border-[#06101d]/12 rounded-xl text-xs bg-[#f7f9fc] resize-none focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30"
              />
            </div>

            <div className="flex gap-2 justify-end mt-4">
              <button
                type="button"
                onClick={() => setSelectedProd(null)}
                className="px-4 py-2 border border-[#06101d]/12 rounded-xl text-xs font-semibold text-slate-600 hover:bg-[#f7f9fc]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-[#06101d] text-white rounded-xl text-xs font-bold hover:bg-[#102640]"
              >
                {submitting ? 'Submitting...' : 'Confirm Request'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
