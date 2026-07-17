import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../services/supabase'

// ─── STYLED COMMON CONTAINER ───────────────────────────────────────────────────
function PortalPageWrapper({ title, subtitle, children }) {
  return (
    <div className="flex-1 overflow-y-auto bg-white min-h-screen text-slate-900 selection:bg-slate-100 selection:text-slate-900">
      <div className="max-w-4xl mx-auto px-8 py-14 space-y-12">
        <div className="space-y-2 border-b border-slate-100 pb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
          <p className="text-sm text-slate-500 max-w-xl font-normal leading-relaxed">{subtitle}</p>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

// ─── PRODUCTS PAGE ────────────────────────────────────────────────────────────
export function ProductsPage() {
  const products = [
    { id: 'aura', name: 'Aura AI', description: 'Knowledge Operating System.', status: 'Installed', version: '2.5', platform: 'Windows / macOS' },
    { id: 'tally', name: 'TallyGPT', description: 'ERP Data Connector.', status: 'Available', version: '1.2.0', platform: 'Windows / Linux' },
    { id: 'leadbolt', name: 'LeadBolt', description: 'Sales Intelligence Platform.', status: 'Coming Soon' },
    { id: 'factory', name: 'FactoryGPT', description: 'Industrial AI Suite.', status: 'Coming Soon' },
    { id: 'hotel', name: 'HotelGPT', description: 'Hospitality AI Platform.', status: 'Coming Soon' },
    { id: 'corp', name: 'Corporate Brain', description: 'Knowledge Graph Engine.', status: 'Coming Soon' },
    { id: 'hr', name: 'HR Copilot', description: 'Automated HR workflows.', status: 'Coming Soon' },
    { id: 'gst', name: 'GST Autopilot', description: 'AI-assisted tax return filer.', status: 'Coming Soon' },
    { id: 'inventory', name: 'Inventory Copilot', description: 'Stock replenishment agent.', status: 'Coming Soon' },
  ]

  return (
    <PortalPageWrapper title="Software library" subtitle="Explore and open your active products, or request preview access to platforms currently in development.">
      <div className="grid gap-6 sm:grid-cols-2">
        {products.map((p) => (
          <div key={p.name} className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-200 flex flex-col justify-between h-48">
            <div className="space-y-1.5">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-semibold text-slate-900">{p.name}</h3>
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
                  p.status === 'Installed' ? 'bg-emerald-50 text-emerald-700' :
                  p.status === 'Available' ? 'bg-indigo-50 text-indigo-700' :
                  'bg-slate-50 text-slate-550'
                }`}>{p.status}</span>
              </div>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">{p.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <div>{p.version && `Version ${p.version}`} {p.platform && `· ${p.platform}`}</div>
              <div className="flex gap-2">
                <button className="text-xs font-semibold text-slate-700 hover:text-slate-950 transition-colors">Details</button>
                {(p.status === 'Installed' || p.status === 'Available') && (
                  <button className="text-xs font-semibold text-slate-900 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-100 transition-all">Open</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </PortalPageWrapper>
  )
}

// ─── DOWNLOADS PAGE ───────────────────────────────────────────────────────────
export function DownloadsPage() {
  const downloads = [
    { platform: 'Windows', version: '2.5.0', date: 'Jul 12, 2026', checksum: 'SHA256: e82f...a109' },
    { platform: 'macOS (Apple Silicon)', version: '2.5.0', date: 'Jul 12, 2026', checksum: 'SHA256: 489d...0b8a' },
    { platform: 'macOS (Intel)', version: '2.5.0', date: 'Jul 12, 2026', checksum: 'SHA256: fa1a...43c2' },
    { platform: 'Linux (Debian/Ubuntu)', version: '2.5.0', date: 'Jul 12, 2026', checksum: 'SHA256: fbb8...81b7' },
    { platform: 'Docker Image', version: '3.0.0', date: 'Jul 11, 2026', checksum: 'SHA256: c32a...9822' },
    { platform: 'Android APK', version: '1.4.2', date: 'Jun 28, 2026', checksum: 'SHA256: 9aa2...e81c' },
    { platform: 'iOS Client', version: '1.4.0', date: 'Jun 25, 2026', checksum: 'App Store Redirect' },
  ]

  return (
    <PortalPageWrapper title="Downloads" subtitle="Fetch desktop clients, mobile builds, and developer SDK utilities. Verify checksum signatures for deployment safety.">
      <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-2xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 font-semibold text-slate-500 uppercase tracking-widest text-[9px]">
              <th className="px-6 py-4">Platform</th>
              <th className="px-6 py-4">Version</th>
              <th className="px-6 py-4">Release Date</th>
              <th className="px-6 py-4">SHA256 Checksum</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-650 font-normal">
            {downloads.map((d, i) => (
              <tr key={i} className="hover:bg-slate-50/40 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-900">{d.platform}</td>
                <td className="px-6 py-4">{d.version}</td>
                <td className="px-6 py-4">{d.date}</td>
                <td className="px-6 py-4 font-mono text-[10px] text-slate-400">{d.checksum}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-xs font-semibold text-slate-900 bg-slate-50 hover:bg-slate-100 px-3 py-1 rounded-lg border border-slate-150/40 transition-all">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PortalPageWrapper>
  )
}

// ─── LICENSES PAGE ────────────────────────────────────────────────────────────
export function LicensesPage() {
  return (
    <PortalPageWrapper title="Licenses" subtitle="Manage primary license keys, seat allocations, and activation states across deployment nodes.">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 rounded-2xl border border-slate-100 bg-white space-y-4">
          <h2 className="text-sm font-semibold text-slate-950">Active Licenses</h2>
          <div className="space-y-3.5">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center text-xs">
              <div>
                <p className="font-semibold text-slate-900">Aura AI Enterprise</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Expires Dec 31, 2026</p>
              </div>
              <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">Active</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center text-xs">
              <div>
                <p className="font-semibold text-slate-900">TallyGPT Growth</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Expires Aug 15, 2026</p>
              </div>
              <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">Active</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-slate-100 bg-white space-y-4">
          <h2 className="text-sm font-semibold text-slate-950">Seats & Access</h2>
          <div className="space-y-2 text-xs text-slate-550 leading-relaxed">
            <div className="flex justify-between py-2 border-b border-slate-50">
              <span>Total Seats</span>
              <span className="font-semibold text-slate-900">25 seats</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-50">
              <span>Seats Allocated</span>
              <span className="font-semibold text-slate-900">18 seats</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-50">
              <span>Available Licenses</span>
              <span className="font-semibold text-slate-900">7 seats</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Auto-Renewal</span>
              <span className="font-semibold text-emerald-600">Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </PortalPageWrapper>
  )
}

// ─── DOCUMENTATION PAGE ───────────────────────────────────────────────────────
export function DocumentationPage() {
  const categories = [
    { title: 'Quick Start', items: ['Workspace introduction', 'Access management', 'First build run', 'Deployment parameters'] },
    { title: 'Installation', items: ['Windows setup guide', 'macOS local runtime', 'Linux headless service', 'Docker orchestrator'] },
    { title: 'Guides & SOPs', items: ['Indexing company vaults', 'Tally integration config', 'Audit trails', 'Role profiles'] },
    { title: 'API Access', items: ['Bearer auth tokens', 'Scoped permissions', 'Webhooks sync', 'Rate limit controls'] },
    { title: 'Examples & SDKs', items: ['Python client build', 'Node.js event bindings', 'Shell script automations', 'Webhook handling'] },
    { title: 'Videos', items: ['Setup walkthrough', 'Advanced Aura training', 'TallyGPT live demo', 'Admin diagnostics'] },
  ]

  return (
    <PortalPageWrapper title="Documentation" subtitle="Explore configuration references, API specs, and installation guides. Search documentation to resolve setup queries.">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search documentation (guides, API reference, parameters)..."
          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-slate-300"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((c) => (
          <div key={c.title} className="p-5 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 transition-all duration-200 space-y-4">
            <h3 className="text-xs uppercase font-extrabold tracking-widest text-slate-400">{c.title}</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              {c.items.map((item) => (
                <li key={item}>
                  <a href="#/workspace/documentation" className="hover:text-slate-900 transition-colors block py-0.5">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </PortalPageWrapper>
  )
}

// ─── RELEASE NOTES PAGE ───────────────────────────────────────────────────────
export function ReleaseNotesPage() {
  const logs = [
    { version: 'v2.5.0', date: 'July 16, 2026', tag: 'Aura AI Voice Agent', desc: 'Added support for sub-100ms conversational audio latency. Support for multiple concurrent voice streams. Enhanced memory models.' },
    { version: 'v1.8.2', date: 'July 14, 2026', tag: 'LeadBolt WhatsApp Sync', desc: 'Seamless ingestion of WhatsApp lead activities into central CRM engine. Custom event handler support.' },
    { version: 'v3.0.0', date: 'July 11, 2026', tag: 'FactoryGPT edge package', desc: 'Optimised Docker engine version 3.0 for Jetson Nano hardware. Multi-camera feed streaming optimizations.' },
  ]

  return (
    <PortalPageWrapper title="Release notes" subtitle="Stay updated with version milestones, performance optimizations, and security patches across our product suite.">
      <div className="space-y-12 pl-4 border-l border-slate-100">
        {logs.map((item, i) => (
          <div key={i} className="relative space-y-2">
            <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-slate-400" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">{item.version}</span>
              <span className="text-[10px] text-slate-400 font-normal">· {item.date}</span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest bg-slate-50 text-slate-550 border border-slate-100 px-1.5 py-0.5 rounded-md">{item.tag}</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">{item.desc}</p>
          </div>
        ))}
      </div>
    </PortalPageWrapper>
  )
}

// ─── INTEGRATIONS PAGE ────────────────────────────────────────────────────────
export function IntegrationsPage() {
  const [integrations, setIntegrations] = useState([
    { id: 'google', name: 'Google Workspace', status: 'Connected', desc: 'Sync mail, calendars, and document repositories.' },
    { id: 'slack', name: 'Slack', status: 'Connected', desc: 'Broadcast notifications and trigger Slack-based workflows.' },
    { id: 'tally', name: 'Tally Prime', status: 'Connected', desc: 'Auto-ingest vouchers, invoice records, and ledgers.' },
    { id: 'sap', name: 'SAP ERP', status: 'Disconnected', desc: 'Connect procurement, planning, and manufacturing.' },
  ])

  const toggle = (id) => {
    setIntegrations(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: item.status === 'Connected' ? 'Disconnected' : 'Connected' }
      }
      return item
    }))
  }

  return (
    <PortalPageWrapper title="Integrations" subtitle="Authorize integrations with third-party software products to synchronize records and process events.">
      <div className="grid gap-6 sm:grid-cols-2">
        {integrations.map((item) => (
          <div key={item.id} className="p-6 rounded-2xl border border-slate-100 bg-white flex flex-col justify-between h-44">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-slate-950">{item.name}</h3>
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
                  item.status === 'Connected' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-550'
                }`}>{item.status}</span>
              </div>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">{item.desc}</p>
            </div>
            <div className="pt-4 border-t border-slate-50 flex justify-end">
              <button
                onClick={() => toggle(item.id)}
                className={`text-xs font-semibold px-3 py-1 rounded-lg border transition-all ${
                  item.status === 'Connected'
                    ? 'bg-slate-50 border-slate-200 text-slate-650 hover:bg-red-50 hover:text-red-700 hover:border-red-200'
                    : 'bg-indigo-50 border-indigo-100 text-indigo-700 hover:bg-indigo-100'
                }`}
              >
                {item.status === 'Connected' ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </PortalPageWrapper>
  )
}

// ─── SUPPORT PAGE ─────────────────────────────────────────────────────────────
export function SupportPage() {
  return (
    <PortalPageWrapper title="Support center" subtitle="Contact our technical operations team, raise service requests, or check active service diagnostics.">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-slate-250 transition-all duration-200 flex flex-col justify-between h-44">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-slate-950">Technical Ticket</h3>
            <p className="text-xs text-slate-500 font-normal">Open a diagnostic ticket with our engineering team.</p>
          </div>
          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-900 border border-slate-100 rounded-xl transition-all">
            Create Ticket
          </button>
        </div>

        <div className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-slate-250 transition-all duration-200 flex flex-col justify-between h-44">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-slate-950">Live Chat</h3>
            <p className="text-xs text-slate-500 font-normal">Engage directly with on-duty deployment support.</p>
          </div>
          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-900 border border-slate-100 rounded-xl transition-all">
            Start Live Chat
          </button>
        </div>

        <div className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-slate-250 transition-all duration-200 flex flex-col justify-between h-44">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-slate-950">Support Email</h3>
            <p className="text-xs text-slate-500 font-normal">Submit general inquiries or SLA accounts issues.</p>
          </div>
          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-900 border border-slate-100 rounded-xl transition-all">
            Email Support
          </button>
        </div>
      </div>
    </PortalPageWrapper>
  )
}

// ─── BILLING PAGE ─────────────────────────────────────────────────────────────
export function BillingPage() {
  const invoices = [
    { id: 'INV-2026-003', date: 'Jul 15, 2026', amount: '₹1,50,000', status: 'Paid' },
    { id: 'INV-2026-002', date: 'Jun 15, 2026', amount: '₹1,50,000', status: 'Paid' },
    { id: 'INV-2026-001', date: 'May 15, 2026', amount: '₹1,50,000', status: 'Paid' },
  ]

  return (
    <PortalPageWrapper title="Billing & Invoices" subtitle="Review subscription cycles, print generated invoice vouchers, and update default payment profiles.">
      <div className="space-y-8">
        <div className="p-6 rounded-2xl border border-slate-100 bg-white space-y-4">
          <h2 className="text-sm font-semibold text-slate-950">Subscription Overview</h2>
          <div className="grid gap-4 sm:grid-cols-3 text-xs leading-normal">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-450 block font-bold uppercase tracking-wider">Plan</span>
              <span className="font-bold text-slate-900 mt-1 block">Enterprise Subscription</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-450 block font-bold uppercase tracking-wider">Recurring Amount</span>
              <span className="font-bold text-slate-900 mt-1 block">₹1,50,000 / month</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-450 block font-bold uppercase tracking-wider">Renewal Date</span>
              <span className="font-bold text-[#8f38ff] mt-1 block">Dec 31, 2026</span>
            </div>
          </div>
        </div>

        <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-2xs">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Invoice History</h3>
          </div>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 font-semibold text-slate-500 uppercase tracking-widest text-[9px]">
                <th className="px-6 py-3.5">Invoice ID</th>
                <th className="px-6 py-3.5">Issued Date</th>
                <th className="px-6 py-3.5">Amount</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Print</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-650 font-normal">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-3.5 font-semibold text-slate-900">{inv.id}</td>
                  <td className="px-6 py-3.5">{inv.date}</td>
                  <td className="px-6 py-3.5">{inv.amount}</td>
                  <td className="px-6 py-3.5"><span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">Paid</span></td>
                  <td className="px-6 py-3.5 text-right">
                    <button className="text-xs font-semibold text-slate-900 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-150/40 transition-all">
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PortalPageWrapper>
  )
}

// ─── DEVELOPERS PAGE ──────────────────────────────────────────────────────────
export function DevelopersPage() {
  const keys = [
    { label: 'Production Sync Token', created: 'Jul 12, 2026', scope: 'Full Access', secret: 'algoforce_live_e823b...' },
    { label: 'Sandbox Webhook Key', created: 'Jun 10, 2026', scope: 'Read-Only', secret: 'algoforce_test_41c0a...' },
  ]

  return (
    <PortalPageWrapper title="Developer sandbox" subtitle="Retrieve API credentials, bind callback webhooks, view rate limit diagnostics, or test custom payload integrations.">
      <div className="space-y-8">
        {/* Keys */}
        <div className="p-6 rounded-2xl border border-slate-100 bg-white space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold text-slate-950">Active API Scopes</h2>
            <button className="text-xs font-bold text-slate-900 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-all">
              Create Key
            </button>
          </div>
          
          <div className="divide-y divide-slate-100">
            {keys.map((k) => (
              <div key={k.label} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs">
                <div>
                  <h3 className="font-semibold text-slate-900">{k.label}</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">Created {k.created} · Scope: {k.scope}</p>
                </div>
                <div className="flex items-center gap-2">
                  <code className="bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg text-slate-500 font-mono text-[10px] select-all">{k.secret}</code>
                  <button className="text-[10px] font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-150 transition-all">Copy</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payload Example */}
        <div className="p-6 rounded-2xl border border-slate-100 bg-white space-y-3">
          <h2 className="text-sm font-semibold text-slate-950">Quick API Ingestion Sample</h2>
          <pre className="p-4 bg-slate-950 text-slate-300 rounded-xl overflow-x-auto text-[10px] font-mono leading-relaxed">
{`curl -X POST https://api.algoforce.ai/v1/ingest \\
  -H "Authorization: Bearer <your_key_here>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "module": "tally",
    "payload": {
      "voucher_id": "VCH-10928a",
      "amount": 25000,
      "currency": "INR"
    }
  }'`}
          </pre>
        </div>
      </div>
    </PortalPageWrapper>
  )
}

// ─── COMMUNITY PAGE ───────────────────────────────────────────────────────────
export function CommunityPage() {
  return (
    <PortalPageWrapper title="Community" subtitle="Connect with peers, view the public roadmap, join beta programs, and suggest features.">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 transition-all duration-200 flex flex-col justify-between h-44">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-slate-950">Discord Server</h3>
            <p className="text-xs text-slate-500 font-normal">Discuss code setups and integrations with verified developers.</p>
          </div>
          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-900 border border-slate-100 rounded-xl transition-all">
            Join Discord
          </button>
        </div>

        <div className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 transition-all duration-200 flex flex-col justify-between h-44">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-slate-950">GitHub Repository</h3>
            <p className="text-xs text-slate-500 font-normal">Explore open SDK packages, issue trackers, and CLI sources.</p>
          </div>
          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-900 border border-slate-100 rounded-xl transition-all">
            View GitHub
          </button>
        </div>

        <div className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 transition-all duration-200 flex flex-col justify-between h-44">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-slate-950">Public Roadmap</h3>
            <p className="text-xs text-slate-500 font-normal">Review planned feature additions and product releases.</p>
          </div>
          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-900 border border-slate-100 rounded-xl transition-all">
            Open Roadmap
          </button>
        </div>

        <div className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 transition-all duration-200 flex flex-col justify-between h-44">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-slate-950">Beta Program</h3>
            <p className="text-xs text-slate-500 font-normal">Request early access deployment builds for pending systems.</p>
          </div>
          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-900 border border-slate-100 rounded-xl transition-all">
            Join Beta
          </button>
        </div>
      </div>
    </PortalPageWrapper>
  )
}

// ─── DEPLOYMENTS PAGE ─────────────────────────────────────────────────────────
export function DeploymentsPage() {
  const deployments = [
    { name: 'LeadBolt WhatsApp Sync', environment: 'Production', status: 'Live', updated: 'Today' },
    { name: 'TallyGPT Voucher API', environment: 'Staging', status: 'In Review', updated: 'Yesterday' },
  ]

  return (
    <PortalPageWrapper title="Deployments" subtitle="Track live cloud operations, staging testing nodes, and remote environment diagnostics.">
      <div className="space-y-4">
        {deployments.map((d) => (
          <div key={d.name} className="p-6 rounded-2xl border border-slate-100 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">{d.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">Environment · {d.environment}</p>
            </div>
            <div className="flex items-center gap-6 text-xs text-slate-600">
              <div><span className="text-[10px] text-slate-400 block uppercase tracking-wider">Status</span><span className="font-semibold text-slate-900">{d.status}</span></div>
              <div><span className="text-[10px] text-slate-400 block uppercase tracking-wider">Last Activity</span><span className="font-semibold text-slate-950">{d.updated}</span></div>
              <button className="text-xs font-semibold text-slate-900 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-150/40 transition-all">
                Console
              </button>
            </div>
          </div>
        ))}
      </div>
    </PortalPageWrapper>
  )
}

// ─── ORGANIZATION PAGE ────────────────────────────────────────────────────────
export function OrganizationPage() {
  const members = [
    { name: 'Rahul Sharma', email: 'rahul@company.com', role: 'Owner', department: 'Finance' },
    { name: 'Nina Patel', email: 'nina@company.com', role: 'Manager', department: 'Operations' },
    { name: 'Amit Singh', email: 'amit@company.com', role: 'Member', department: 'Engineering' },
  ]

  return (
    <PortalPageWrapper title="Organization" subtitle="Manage members of your organization, their platform roles, and security access rules.">
      <div className="space-y-8">
        <div className="p-6 rounded-2xl border border-slate-100 bg-white space-y-4">
          <div className="flex justify-between items-center border-b border-slate-50 pb-4">
            <h2 className="text-sm font-semibold text-slate-950">Team Directory</h2>
            <button className="text-xs font-bold text-slate-900 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-all">
              Invite Member
            </button>
          </div>
          
          <div className="divide-y divide-slate-100">
            {members.map((m) => (
              <div key={m.email} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs">
                <div>
                  <h3 className="font-semibold text-slate-900">{m.name}</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">{m.email} · {m.department}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-650 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">{m.role}</span>
                  <button className="text-[10px] font-semibold text-slate-400 hover:text-red-600 transition-colors">Revoke</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalPageWrapper>
  )
}

// ─── SETTINGS PAGE ───────────────────────────────────────────────────────────
export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const { user, company, userDisplayName } = useAuth()

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'organization', label: 'Organization' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'api-keys', label: 'API Keys' },
    { id: 'theme', label: 'Theme' },
    { id: 'sessions', label: 'Sessions' },
  ]

  return (
    <PortalPageWrapper title="Settings" subtitle="Manage your profile settings, company access permissions, security preferences, and active browser sessions.">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Settings tabs sidebar */}
        <div className="w-full md:w-44 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible border-b md:border-b-0 border-slate-100 pb-2 md:pb-0 gap-1 flex-shrink-0 text-xs">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-3 py-2 text-left font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeTab === t.id
                  ? 'bg-slate-100 text-slate-900 font-bold'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-850'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content panel */}
        <div className="flex-1 bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs w-full text-xs space-y-6">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">Your profile</h3>
              <div className="space-y-3 max-w-sm">
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Display Name</label>
                  <input type="text" defaultValue={userDisplayName} className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs" />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Email Address</label>
                  <input type="email" defaultValue={user?.email || ''} readOnly className="w-full px-3 py-2 bg-slate-50/50 border border-slate-100 text-slate-400 rounded-lg text-xs cursor-not-allowed" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'organization' && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">Organization profile</h3>
              <div className="space-y-3 max-w-sm">
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Company Name</label>
                  <input type="text" defaultValue={company?.name || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs" />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Primary Domain</label>
                  <input type="text" defaultValue="algoforce.ai" readOnly className="w-full px-3 py-2 bg-slate-50/50 border border-slate-100 text-slate-400 rounded-lg text-xs cursor-not-allowed" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">Security controls</h3>
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 cursor-pointer">
                  <input type="checkbox" defaultChecked className="mt-0.5 accent-indigo-650" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Require multi-factor authentication (MFA)</span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Enforce authentication tokens for all member accounts.</span>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 accent-indigo-650" />
                  <div>
                    <span className="font-semibold text-slate-900 block">IP Whitelisting</span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Only authorize API calls from designated static IPs.</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">Notification preferences</h3>
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 cursor-pointer">
                  <input type="checkbox" defaultChecked className="mt-0.5 accent-indigo-650" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Deployment status alerts</span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Send email when product deployment nodes change status.</span>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 cursor-pointer">
                  <input type="checkbox" defaultChecked className="mt-0.5 accent-indigo-650" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Monthly billing receipts</span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Send generated invoices directly to the billing channel.</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'api-keys' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-slate-900">API credentials</h3>
                <button className="text-[10px] font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-150 transition-all">Generate Key</button>
              </div>
              <div className="space-y-2.5">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-slate-900">Production Sync API</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">algoforce_live_e823b...</p>
                  </div>
                  <button className="text-[9px] font-bold text-slate-700 bg-white hover:bg-slate-50 px-2 py-0.5 rounded border border-slate-200">Copy</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">Appearance</h3>
              <div className="max-w-xs">
                <label className="block text-slate-400 font-medium mb-1.5">Workspace Theme</label>
                <select className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs focus:outline-none">
                  <option>Light Theme</option>
                  <option>Dark Mode</option>
                  <option>System Settings</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'sessions' && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">Active browser logins</h3>
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-slate-900">Chrome (Windows 11) · Current Session</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">IP Address: 103.88.22.109 · Delhi, India</p>
                  </div>
                  <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded">Active</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-slate-900">Safari (iPhone iOS)</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">IP Address: 103.88.22.112 · Delhi, India</p>
                  </div>
                  <button className="text-[9px] font-bold text-slate-450 hover:text-red-650 transition-colors">Revoke</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PortalPageWrapper>
  )
}

