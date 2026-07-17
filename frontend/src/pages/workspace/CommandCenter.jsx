/**
 * CommandCenter.jsx
 * Apple-quality central hub for AlgoForce Workspace.
 * Clean typography, generous spacing, 16px rounded cards, no emojis, and clear visual hierarchy.
 */
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { joinWaitlist } from '../../services/workspaceService'
import { logActivity } from '../../services/activityService'

export default function CommandCenter() {
  const { user, company, userDisplayName } = useAuth()

  // App products library
  const initialProducts = [
    {
      id: 'aura',
      name: 'Aura AI',
      description: 'Knowledge Operating System for operations and support teams.',
      status: 'Installed',
      version: '2.5',
      platform: 'Windows / macOS',
      documentation: '/workspace/documentation',
      roadmap: 'Voice agent streaming in v2.6, advanced semantic caching.',
      faq: 'Supports direct local file indexation and local LLM execution.',
      installGuide: 'Download package and run setup.exe or dmg installer.',
      apiSnippet: 'POST /v1/chat { "message": "hello" }',
    },
    {
      id: 'tally',
      name: 'TallyGPT',
      description: 'ERP Data Connector for real-time ledger and invoice synchronization.',
      status: 'Available',
      version: '1.2.0',
      platform: 'Windows / Linux',
      documentation: '/workspace/documentation',
      roadmap: 'Tally Prime auto-sync service release in Q3 2026.',
      faq: 'Binds with local Tally XML server via port 9000.',
      installGuide: 'Configure Tally Prime XML server and run tally-connector agent.',
      apiSnippet: 'GET /v1/tally/ledgers',
    },
    {
      id: 'leadbolt',
      name: 'LeadBolt',
      description: 'Sales Intelligence Platform and revenue automation workspace.',
      status: 'Coming Soon',
    },
    {
      id: 'factory',
      name: 'FactoryGPT',
      description: 'Industrial AI Suite and computer vision manufacturing agent.',
      status: 'Coming Soon',
    },
    {
      id: 'hotel',
      name: 'HotelGPT',
      description: 'Hospitality AI Platform for automated booking and guest relations.',
      status: 'Coming Soon',
    },
    {
      id: 'corpbrain',
      name: 'Corporate Brain',
      description: 'Knowledge Graph Engine for automated taxonomy and file analysis.',
      status: 'Coming Soon',
    },
    {
      id: 'hrcopilot',
      name: 'HR Copilot',
      description: 'AI attendance, recruitment screening, and leave manager.',
      status: 'Coming Soon',
    },
    {
      id: 'gst',
      name: 'GST Autopilot',
      description: 'Tax reconciliation, billing audit, and automatic filing engine.',
      status: 'Coming Soon',
    },
    {
      id: 'inventory',
      name: 'Inventory Copilot',
      description: 'Predictive stock replenishment and warehouse logistics manager.',
      status: 'Coming Soon',
    },
  ]

  const [products] = useState(initialProducts)

  // Details Modal state
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Waitlist Modal state
  const [waitlistProduct, setWaitlistProduct] = useState(null)
  const [waitlistForm, setWaitlistForm] = useState({
    name: userDisplayName || '',
    email: user?.email || '',
    companyName: company?.name || '',
    role: '',
    useCase: '',
  })
  const [submittingWaitlist, setSubmittingWaitlist] = useState(false)
  const [waitlistSuccess, setWaitlistSuccess] = useState(false)

  // Details view active tab
  const [detailTab, setDetailTab] = useState('overview')

  const handleOpenProduct = (app) => {
    logActivity(company?.id, user?.id, 'search', `Opened workspace console: ${app.name}`)
    alert(`Redirecting to live ${app.name} instance...`)
  }

  const handleJoinWaitlist = async (e) => {
    e.preventDefault()
    if (!waitlistProduct) return
    setSubmittingWaitlist(true)
    try {
      await joinWaitlist(user.id, company.id, {
        productId: waitlistProduct.id,
        name: waitlistForm.name,
        email: waitlistForm.email,
        companyName: waitlistForm.companyName,
        role: waitlistForm.role,
        useCase: waitlistForm.useCase,
      })
      setWaitlistSuccess(true)
      logActivity(company?.id, user?.id, 'task', `Joined waitlist for ${waitlistProduct.name}`)
      setTimeout(() => {
        setWaitlistProduct(null)
        setWaitlistSuccess(false)
        setWaitlistForm({
          name: userDisplayName || '',
          email: user?.email || '',
          companyName: company?.name || '',
          role: '',
          useCase: '',
        })
      }, 2000)
    } catch (err) {
      alert(`Registration failed: ${err.message}`)
    } finally {
      setSubmittingWaitlist(false)
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white min-h-screen text-slate-900 font-sans antialiased selection:bg-slate-100 selection:text-slate-900">
      <div className="max-w-4xl mx-auto px-8 py-14 space-y-12">
        {/* Welcome Briefing Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-100 pb-8 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#8f38ff]">Workspace overview</span>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 mt-1">
              Good Morning, {userDisplayName}
            </h1>
            <p className="text-sm text-slate-500 font-normal">
              Manage every AlgoForce product from one workspace.
            </p>
          </div>

          <div className="text-right text-xs text-slate-500 font-normal space-y-0.5">
            <div>Subscription: <span className="font-semibold text-slate-900">Enterprise</span></div>
            <div>Renewal date: <span className="font-semibold text-slate-900">Dec 31, 2026</span></div>
          </div>
        </div>

        {/* Continue Working Widget */}
        <div className="space-y-3">
          <h2 className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400">Continue Working</h2>
          <div className="p-5 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 transition-all duration-200 flex items-center justify-between gap-4 shadow-3xs">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xs font-bold text-slate-700">
                AI
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-900">Aura AI</h3>
                <p className="text-[10px] text-slate-450 mt-0.5">Last opened 2 hours ago · Voice workspace</p>
              </div>
            </div>
            <button
              onClick={() => handleOpenProduct(products[0])}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-all"
            >
              Resume
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-5">
          <h2 className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400">Your Products</h2>
          
          <div className="grid gap-6 sm:grid-cols-2">
            {products.map((p) => (
              <div
                key={p.id}
                className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-xs transition-all duration-200 flex flex-col justify-between h-48"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-semibold text-slate-900">{p.name}</h3>
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
                      p.status === 'Installed' ? 'bg-emerald-50 text-emerald-700' :
                      p.status === 'Available' ? 'bg-indigo-50 text-indigo-700' :
                      'bg-slate-50 text-slate-500'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed pr-2">
                    {p.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <div>
                    {p.version && `Version ${p.version}`} {p.platform && `· ${p.platform}`}
                  </div>
                  <div className="flex gap-2.5">
                    {p.status === 'Coming Soon' ? (
                      <button
                        onClick={() => setWaitlistProduct(p)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-850 transition-colors"
                      >
                        Join Waitlist
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => setSelectedProduct(p)}
                          className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => handleOpenProduct(p)}
                          className="text-xs font-semibold text-slate-900 bg-slate-50 hover:bg-slate-100 px-3 py-1 rounded-lg border border-slate-100 transition-all"
                        >
                          Open
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details Slide-over / Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-2xl max-w-xl w-full max-h-[85vh] overflow-hidden flex flex-col p-6 space-y-6">
            <div className="flex justify-between items-start border-b border-slate-50 pb-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-950">{selectedProduct.name} Details</h3>
                <p className="text-[10px] text-slate-400 mt-1">Version {selectedProduct.version} · Platform: {selectedProduct.platform}</p>
              </div>
              <button
                onClick={() => { setSelectedProduct(null); setDetailTab('overview') }}
                className="text-slate-400 hover:text-slate-800 text-xs p-1"
              >
                Close
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex gap-4 border-b border-slate-50 pb-1 text-xs font-medium text-slate-400">
              {['overview', 'installation', 'roadmap', 'api'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setDetailTab(tab)}
                  className={`pb-2 capitalize transition-all ${
                    detailTab === tab ? 'border-b-2 border-slate-900 text-slate-900 font-semibold' : 'hover:text-slate-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto text-xs text-slate-650 leading-relaxed font-normal py-2">
              {detailTab === 'overview' && (
                <div className="space-y-4">
                  <p>{selectedProduct.description}</p>
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">FAQ</h4>
                    <p className="mt-1 text-slate-500">{selectedProduct.faq}</p>
                  </div>
                </div>
              )}

              {detailTab === 'installation' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">Installation instructions</h4>
                  <p>{selectedProduct.installGuide}</p>
                  <p className="text-slate-400">Ensure the latest runtime client is installed in the system before activating.</p>
                </div>
              )}

              {detailTab === 'roadmap' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">Product Roadmap</h4>
                  <p>{selectedProduct.roadmap}</p>
                </div>
              )}

              {detailTab === 'api' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">API Sample</h4>
                  <pre className="p-3.5 bg-slate-950 text-slate-300 font-mono text-[10px] rounded-lg overflow-x-auto">
                    {selectedProduct.apiSnippet}
                  </pre>
                </div>
              )}
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-slate-50">
              <button
                onClick={() => { setSelectedProduct(null); setDetailTab('overview') }}
                className="px-4 py-2 border border-slate-150 text-slate-550 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-all"
              >
                Close details
              </button>
              <button
                onClick={() => {
                  setSelectedProduct(null)
                  handleOpenProduct(selectedProduct)
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-all"
              >
                Open client workspace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Waitlist Join Modal */}
      {waitlistProduct && (
        <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-200 space-y-5">
            <div className="flex justify-between items-start border-b border-slate-50 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Join {waitlistProduct.name} Waitlist</h3>
                <p className="text-[10px] text-slate-400 mt-1">Get early access to our private beta build.</p>
              </div>
              <button
                onClick={() => setWaitlistProduct(null)}
                className="text-slate-400 hover:text-slate-800 text-xs p-1"
              >
                ✕
              </button>
            </div>

            {waitlistSuccess ? (
              <div className="py-8 text-center text-xs font-semibold text-emerald-600 space-y-2 animate-in fade-in duration-300">
                <p className="text-xl">✓</p>
                <p>Registration completed successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleJoinWaitlist} className="space-y-3.5 text-xs text-slate-700">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={waitlistForm.name}
                    onChange={e => setWaitlistForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    value={waitlistForm.email}
                    onChange={e => setWaitlistForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={waitlistForm.companyName}
                    onChange={e => setWaitlistForm(prev => ({ ...prev, companyName: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Role / Job Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Finance Lead, Operations Manager"
                    required
                    value={waitlistForm.role}
                    onChange={e => setWaitlistForm(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Primary Use Case</label>
                  <textarea
                    rows={2.5}
                    placeholder="Briefly describe what you would like to automate..."
                    required
                    value={waitlistForm.useCase}
                    onChange={e => setWaitlistForm(prev => ({ ...prev, useCase: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs focus:outline-none resize-none"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-3">
                  <button
                    type="button"
                    onClick={() => setWaitlistProduct(null)}
                    className="px-3.5 py-2 border border-slate-200 text-slate-500 font-semibold rounded-lg hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingWaitlist}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all"
                  >
                    {submittingWaitlist ? 'Registering...' : 'Request Invitation'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
