/**
 * useOwnedApps.js
 * Central hook that defines which applications the customer owns
 * and their live runtime status. In production this pulls from Supabase.
 */
import { useState, useEffect } from 'react'

// Static owned-app definitions.
// In production: query `company_products` or `licenses` from Supabase.
const OWNED_APPS = [
  {
    id: 'aura',
    name: 'Aura AI',
    category: 'Knowledge Workspace',
    icon: 'A',
    color: '#6366f1',
    version: '2.5.1',
    updateAvailable: true,
    updateVersion: '2.5.2',
    releaseDate: 'Jul 12, 2026',
    changelog: 'Voice streaming latency reduced by 40%. New memory compression model.',
  },
  {
    id: 'tally',
    name: 'TallyGPT',
    category: 'ERP Connector',
    icon: 'T',
    color: '#0891b2',
    version: '1.2.0',
    updateAvailable: false,
    updateVersion: null,
    releaseDate: 'Jun 28, 2026',
    changelog: null,
  },
]

// Live runtime status per app. In production: poll a status API.
const LIVE_STATUS = {
  aura: {
    status: 'Running',
    color: '#16a34a',
    metrics: [
      { label: 'Conversations', value: '428' },
      { label: 'Knowledge Files', value: '189' },
      { label: 'Last Sync', value: '2 min ago' },
      { label: 'Storage', value: '2.4 GB' },
    ],
    details: {
      workspace: 'cloud-prod-ind-01',
      uptime: '99.98%',
      region: 'India (Mumbai)',
      environment: 'Production',
      storage: '2.4 GB',
      conversations: 428,
      knowledgeFiles: 189,
      lastSyncTime: '2 min ago',
      permissions: ['read_documents', 'write_knowledge', 'manage_users', 'api_access'],
      logs: [
        { time: '16:40', level: 'INFO', message: 'Knowledge sync completed. 3 files updated.' },
        { time: '16:35', level: 'INFO', message: 'Voice agent session started. User: Dev.' },
        { time: '15:02', level: 'WARN', message: 'Slow embedding detected. Retrying with fallback model.' },
        { time: '14:18', level: 'INFO', message: 'Backup snapshot created. Size: 2.4 GB.' },
      ],
    },
  },
  tally: {
    status: 'Connected',
    color: '#0891b2',
    metrics: [
      { label: 'Companies', value: '4' },
      { label: 'Invoices Synced', value: '84,912' },
      { label: 'Last Import', value: '5 min ago' },
      { label: 'Vouchers', value: '1,209' },
    ],
    details: {
      workspace: 'tally-local-bridge-01',
      uptime: '99.6%',
      region: 'On-Premise (Delhi)',
      environment: 'Production',
      storage: '0.6 GB',
      companies: 4,
      invoicesSynced: 84912,
      vouchers: 1209,
      lastImport: '5 min ago',
      permissions: ['read_ledger', 'read_vouchers', 'write_reconciled'],
      logs: [
        { time: '16:38', level: 'INFO', message: 'Full ledger sync complete. 84,912 records imported.' },
        { time: '16:30', level: 'INFO', message: 'TDS reconciliation pass started.' },
        { time: '15:45', level: 'INFO', message: 'New company connected: Vertex Corp.' },
      ],
    },
  },
}

export function useOwnedApps() {
  const [apps, setApps] = useState(
    OWNED_APPS.map(a => ({ ...a, ...(LIVE_STATUS[a.id] || {}) }))
  )

  // Simulate a live status pulse every 30 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setApps(prev =>
        prev.map(app => {
          const live = LIVE_STATUS[app.id]
          if (!live) return app
          return { ...app, status: live.status }
        })
      )
    }, 30000)
    return () => clearInterval(id)
  }, [])

  const updates = apps.filter(a => a.updateAvailable)

  return { apps, updates }
}
