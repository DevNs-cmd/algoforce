import { Link } from 'react-router-dom'

function PortalSectionPage({ title, subtitle, badge = 'AlgoForce Hub', actions = null, stats = [], children }) {
  return (
    <div className="flex-1 overflow-y-auto bg-[#f7f9fc]">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between border-b border-[#06101d]/8 pb-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500">{badge}</p>
            <h1 className="text-2xl font-semibold text-[#06101d] mt-1">{title}</h1>
            <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
          </div>
          {actions}
        </div>

        {stats.length > 0 && (
          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-[#06101d]/8 bg-white p-4 shadow-xs">
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">{stat.label}</p>
                <p className="mt-2 text-lg font-semibold text-[#06101d]">{stat.value}</p>
                {stat.helper && <p className="mt-1 text-xs text-slate-500">{stat.helper}</p>}
              </div>
            ))}
          </div>
        )}

        {children}
      </div>
    </div>
  )
}

export function ProductsPage() {
  const products = [
    { name: 'Aura AI', description: 'Knowledge assistant for operators and support teams.', status: 'Installed', license: 'Enterprise', version: '2.4.1', platform: 'Windows / macOS', updated: '2 days ago' },
    { name: 'LeadBolt', description: 'Revenue automation and lead intelligence workspace.', status: 'Active', license: 'Growth', version: '1.8.0', platform: 'Cloud', updated: '5 days ago' },
    { name: 'FactoryGPT', description: 'Industrial workflow copilot for plant operations.', status: 'Licensed', license: 'Enterprise', version: '3.1.2', platform: 'Linux / Edge', updated: '1 week ago' },
  ]

  return (
    <PortalSectionPage
      title="My Products"
      subtitle="Manage every AlgoForce product you own from one professional customer portal."
      badge="Software Management"
      stats={[
        { label: 'Activated Products', value: '6', helper: 'Including enterprise and cloud products' },
        { label: 'Installed Locally', value: '2', helper: 'Ready for launch' },
        { label: 'Pending Updates', value: '3', helper: 'Available on the release channel' },
      ]}
      actions={<span className="inline-flex items-center rounded-full border border-[#06101d]/10 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">Customer-owned software</span>}
    >
      <div className="grid gap-4 xl:grid-cols-2">
        {products.map((product) => (
          <div key={product.name} className="rounded-3xl border border-[#06101d]/8 bg-white p-5 shadow-xs">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-[#06101d]">{product.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{product.description}</p>
              </div>
              <span className="rounded-full border border-[#06101d]/10 bg-[#f7f9fc] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">{product.status}</span>
            </div>
            <dl className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <div><dt className="text-[10px] uppercase tracking-[0.2em] text-slate-400">License</dt><dd className="mt-1 font-semibold text-[#06101d]">{product.license}</dd></div>
              <div><dt className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Version</dt><dd className="mt-1 font-semibold text-[#06101d]">{product.version}</dd></div>
              <div><dt className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Platform</dt><dd className="mt-1 font-semibold text-[#06101d]">{product.platform}</dd></div>
              <div><dt className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Updated</dt><dd className="mt-1 font-semibold text-[#06101d]">{product.updated}</dd></div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-2">
              <button className="rounded-full bg-[#06101d] px-3.5 py-2 text-xs font-semibold text-white">Launch</button>
              <button className="rounded-full border border-[#06101d]/10 px-3.5 py-2 text-xs font-semibold text-slate-600">Download</button>
              <button className="rounded-full border border-[#06101d]/10 px-3.5 py-2 text-xs font-semibold text-slate-600">Docs</button>
            </div>
          </div>
        ))}
      </div>
    </PortalSectionPage>
  )
}

export function DownloadsPage() {
  const downloads = [
    { product: 'Aura AI', channel: 'Windows Installer', version: '2.4.1', release: '12 Jul 2026', size: '320 MB', checksum: 'SHA256:a0d1...' },
    { product: 'LeadBolt', channel: 'macOS', version: '1.8.0', release: '09 Jul 2026', size: '210 MB', checksum: 'SHA256:91c2...' },
  ]

  return (
    <PortalSectionPage
      title="Downloads"
      subtitle="Download the correct package for each platform and review release notes before install."
      badge="Software Center"
      stats={[
        { label: 'Available Packages', value: '8', helper: 'Windows, macOS, Linux and mobile' },
        { label: 'Latest Release', value: 'Aura AI 2.4.1', helper: 'Current stable channel' },
        { label: 'Previous Versions', value: '14', helper: 'Archived for rollback' },
      ]}
    >
      <div className="space-y-4">
        {downloads.map((item) => (
          <div key={`${item.product}-${item.channel}`} className="rounded-3xl border border-[#06101d]/8 bg-white p-5 shadow-xs flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#06101d]">{item.product}</h2>
              <p className="mt-1 text-sm text-slate-500">{item.channel} · Version {item.version}</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <div><span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Release</span><div className="font-semibold text-[#06101d]">{item.release}</div></div>
              <div><span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Size</span><div className="font-semibold text-[#06101d]">{item.size}</div></div>
              <div><span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Checksum</span><div className="font-semibold text-[#06101d]">{item.checksum}</div></div>
            </div>
            <button className="rounded-full bg-[#06101d] px-4 py-2 text-xs font-semibold text-white">Download</button>
          </div>
        ))}
      </div>
    </PortalSectionPage>
  )
}

export function DeploymentsPage() {
  const deployments = [
    { name: 'LeadBolt', environment: 'Production', status: 'Live', progress: '100%', owner: 'Rahul Sharma', started: '12 Jul 2026' },
    { name: 'TallyGPT', environment: 'Staging', status: 'In Review', progress: '78%', owner: 'Nina Patel', started: '09 Jul 2026' },
  ]

  return (
    <PortalSectionPage
      title="Deployments"
      subtitle="Track purchased deployments without leaving the customer portal."
      badge="Delivery Operations"
      stats={[
        { label: 'Live Deployments', value: '3', helper: 'Production and staging environments' },
        { label: 'Active Changes', value: '2', helper: 'Awaiting review or release' },
        { label: 'Updated Today', value: '1', helper: 'Deployment progress refreshed' },
      ]}
    >
      <div className="space-y-4">
        {deployments.map((deployment) => (
          <div key={deployment.name} className="rounded-3xl border border-[#06101d]/8 bg-white p-5 shadow-xs">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-base font-semibold text-[#06101d]">{deployment.name}</h2>
                <p className="mt-1 text-sm text-slate-500">Environment · {deployment.environment}</p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                <div><span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Status</span><div className="font-semibold text-[#06101d]">{deployment.status}</div></div>
                <div><span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Completion</span><div className="font-semibold text-[#06101d]">{deployment.progress}</div></div>
                <div><span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Engineer</span><div className="font-semibold text-[#06101d]">{deployment.owner}</div></div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="rounded-full bg-[#06101d] px-3.5 py-2 text-xs font-semibold text-white">View Deployment</button>
              <button className="rounded-full border border-[#06101d]/10 px-3.5 py-2 text-xs font-semibold text-slate-600">Open Documentation</button>
              <button className="rounded-full border border-[#06101d]/10 px-3.5 py-2 text-xs font-semibold text-slate-600">Request Change</button>
            </div>
          </div>
        ))}
      </div>
    </PortalSectionPage>
  )
}

export function LicensesPage() {
  return (
    <PortalSectionPage
      title="Licenses"
      subtitle="Manage activation tokens, seat allocation, and renewals from a single place."
      badge="License Center"
      stats={[
        { label: 'Organization License', value: 'Enterprise', helper: 'Active for all purchased products' },
        { label: 'Seats Used', value: '18 / 25', helper: '7 seats remain' },
        { label: 'Expiry', value: '15 Aug 2026', helper: 'Auto-renewal enabled' },
      ]}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-[#06101d]/8 bg-white p-5 shadow-xs">
          <h2 className="text-base font-semibold text-[#06101d]">License actions</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] px-3 py-3"><span>Generate Activation Token</span><button className="text-xs font-semibold text-[#06101d]">Create</button></div>
            <div className="flex items-center justify-between rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] px-3 py-3"><span>Manage Devices</span><button className="text-xs font-semibold text-[#06101d]">Review</button></div>
            <div className="flex items-center justify-between rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] px-3 py-3"><span>View Invoice</span><button className="text-xs font-semibold text-[#06101d]">Open</button></div>
          </div>
        </div>
        <div className="rounded-3xl border border-[#06101d]/8 bg-white p-5 shadow-xs">
          <h2 className="text-base font-semibold text-[#06101d]">Products activated</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li className="rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] px-3 py-3">Aura AI · Enterprise</li>
            <li className="rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] px-3 py-3">LeadBolt · Growth</li>
            <li className="rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] px-3 py-3">FactoryGPT · Enterprise</li>
          </ul>
        </div>
      </div>
    </PortalSectionPage>
  )
}

export function ApiKeysPage() {
  const keys = [
    { name: 'Support Webhook', created: '12 Jul 2026', lastUsed: 'Today', scope: 'Full Access' },
    { name: 'Analytics Sync', created: '09 Jul 2026', lastUsed: '3 days ago', scope: 'Read Only' },
  ]

  return (
    <PortalSectionPage
      title="API Keys"
      subtitle="Issue scoped API credentials for integrations without exposing secret values after creation."
      badge="Developer Access"
      stats={[
        { label: 'Active Keys', value: '4', helper: 'Including webhook and read-only keys' },
        { label: 'Last Rotation', value: '12 Jul 2026', helper: 'Security review completed' },
        { label: 'Permissions', value: '2 scopes', helper: 'Read only and full access' },
      ]}
    >
      <div className="space-y-4">
        {keys.map((key) => (
          <div key={key.name} className="rounded-3xl border border-[#06101d]/8 bg-white p-5 shadow-xs flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#06101d]">{key.name}</h2>
              <p className="mt-1 text-sm text-slate-500">Created {key.created} · Last used {key.lastUsed}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="rounded-full bg-[#f7f9fc] px-3 py-1.5">{key.scope}</span>
              <button className="rounded-full border border-[#06101d]/10 px-3 py-1.5 text-xs font-semibold text-[#06101d]">Copy</button>
              <button className="rounded-full border border-[#06101d]/10 px-3 py-1.5 text-xs font-semibold text-[#06101d]">Regenerate</button>
            </div>
          </div>
        ))}
      </div>
    </PortalSectionPage>
  )
}

export function MarketplacePage() {
  const products = [
    { name: 'Inventory Copilot', category: 'Operations', price: 'Starting at $199/mo', platforms: 'Cloud · Windows', status: 'Available' },
    { name: 'HR Copilot', category: 'People', price: 'Starting at $149/mo', platforms: 'Cloud · Web', status: 'Installed' },
  ]

  return (
    <PortalSectionPage
      title="Marketplace"
      subtitle="Explore available AlgoForce products and request activation or deployment directly."
      badge="Product Catalog"
      stats={[
        { label: 'Available Products', value: '12', helper: 'Customer-ready products' },
        { label: 'Purchased', value: '6', helper: 'Already activated in your org' },
        { label: 'Deployment Requests', value: '2', helper: 'In progress' },
      ]}
    >
      <div className="grid gap-4 xl:grid-cols-2">
        {products.map((product) => (
          <div key={product.name} className="rounded-3xl border border-[#06101d]/8 bg-white p-5 shadow-xs">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-[#06101d]">{product.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{product.category}</p>
              </div>
              <span className="rounded-full border border-[#06101d]/10 bg-[#f7f9fc] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">{product.status}</span>
            </div>
            <p className="mt-4 text-sm text-slate-600">{product.price}</p>
            <p className="mt-1 text-sm text-slate-500">{product.platforms}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button className="rounded-full bg-[#06101d] px-3.5 py-2 text-xs font-semibold text-white">Book Demo</button>
              <button className="rounded-full border border-[#06101d]/10 px-3.5 py-2 text-xs font-semibold text-slate-600">Activate</button>
            </div>
          </div>
        ))}
      </div>
    </PortalSectionPage>
  )
}

export function DocumentationPage() {
  const articles = [
    { title: 'Getting Started', summary: 'Install, configure, and launch your first product in minutes.' },
    { title: 'API Reference', summary: 'Use scoped credentials and endpoint examples for your integrations.' },
    { title: 'Troubleshooting', summary: 'Resolve common deployment and configuration issues quickly.' },
  ]

  return (
    <PortalSectionPage
      title="Documentation"
      subtitle="Access product guides, configuration references, and release notes from one place."
      badge="Knowledge Base"
      stats={[
        { label: 'Articles', value: '24', helper: 'Current and maintained' },
        { label: 'Release Notes', value: '12', helper: 'Latest product updates' },
        { label: 'Support Guides', value: '8', helper: 'Troubleshooting and setup' },
      ]}
    >
      <div className="grid gap-4 xl:grid-cols-3">
        {articles.map((article) => (
          <div key={article.title} className="rounded-3xl border border-[#06101d]/8 bg-white p-5 shadow-xs">
            <h2 className="text-base font-semibold text-[#06101d]">{article.title}</h2>
            <p className="mt-2 text-sm text-slate-500">{article.summary}</p>
            <button className="mt-4 rounded-full border border-[#06101d]/10 px-3.5 py-2 text-xs font-semibold text-slate-600">Open</button>
          </div>
        ))}
      </div>
    </PortalSectionPage>
  )
}

export function OrganizationPage() {
  return (
    <PortalSectionPage
      title="Organization"
      subtitle="Maintain company profile, member access, departments, permissions, and security controls."
      badge="Account Overview"
      stats={[
        { label: 'Company', value: 'AlgoForce Technologies', helper: 'Primary organization' },
        { label: 'Members', value: '18', helper: 'Active users across departments' },
        { label: 'Security', value: 'Tier 2', helper: 'SAML and MFA enabled' },
      ]}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-[#06101d]/8 bg-white p-5 shadow-xs">
          <h2 className="text-base font-semibold text-[#06101d]">Company profile</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] px-3 py-3">Primary contact · Rahul Sharma</div>
            <div className="rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] px-3 py-3">Industry · Enterprise software</div>
            <div className="rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] px-3 py-3">Departments · Engineering, Finance, Operations</div>
          </div>
        </div>
        <div className="rounded-3xl border border-[#06101d]/8 bg-white p-5 shadow-xs">
          <h2 className="text-base font-semibold text-[#06101d]">Permissions and security</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] px-3 py-3">Admins can manage licenses and deployments</div>
            <div className="rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] px-3 py-3">MFA required for privileged accounts</div>
            <div className="rounded-2xl border border-[#06101d]/8 bg-[#f7f9fc] px-3 py-3">Audit logs retained for 12 months</div>
          </div>
        </div>
      </div>
    </PortalSectionPage>
  )
}
