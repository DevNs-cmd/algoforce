/**
 * Billing.jsx
 * Billing and invoicing control center.
 * Displays invoice logs, payment status, and enables simulated receipt downloads.
 */
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getInvoices } from '../../services/operationsService'

export default function Billing() {
  const { company } = useAuth()
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (company?.id) {
      loadBillingData()
    }
  }, [company])

  const loadBillingData = async () => {
    setLoading(true)
    try {
      const data = await getInvoices(company.id)
      setInvoices(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadMockInvoice = (invoice) => {
    const markdownContent = `# Invoice Receipt
---
**Issuer**: AlgoForce Private Limited, New Delhi
**Client**: ${company?.name || 'Valued Partner'}
**Description**: ${invoice.description}
**Amount**: INR ${invoice.amount.toLocaleString('en-IN')}
**Status**: ${invoice.status.toUpperCase()}
**Due Date**: ${invoice.due_date}
---
Thank you for partnering with AlgoForce AI Operations.`
    
    const blob = new Blob([markdownContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Invoice_${invoice.description.replace(/\s+/g, '_')}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#06101d]">Billing & Invoices</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage custom deployment invoicing and active SaaS monthly subscriptions.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f7f9fc]">
        
        {/* Billing Overview Stats Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#06101d]/8 p-5 grid grid-cols-2 gap-4">
          <div className="p-4 bg-[#f7f9fc] rounded-2xl border border-[#06101d]/5">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Unpaid Balance</span>
            <p className="text-lg font-black text-[#06101d] mt-1">₹15,000</p>
          </div>
          <div className="p-4 bg-[#f7f9fc] rounded-2xl border border-[#06101d]/5">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Payment Method</span>
            <p className="text-xs font-semibold text-slate-700 mt-2">Bank Transfer (NEFT/RTGS) / UPI</p>
          </div>
        </div>

        {/* Invoice List Table */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#06101d]/8 overflow-hidden shadow-xs">
          {loading ? (
            <p className="text-center text-slate-400 text-xs py-10">Syncing ledger records...</p>
          ) : invoices.length === 0 ? (
            <p className="text-center text-slate-400 text-xs py-12">No invoices issued for this company workspace.</p>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#06101d]/8 bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="px-5 py-3.5">Invoice Description</th>
                  <th className="px-5 py-3.5">Due Date</th>
                  <th className="px-5 py-3.5">Amount (INR)</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#06101d]/6 text-slate-700 font-medium">
                {invoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-[#f7f9fc]/50">
                    <td className="px-5 py-4 font-semibold text-[#06101d] max-w-xs truncate">{inv.description}</td>
                    <td className="px-5 py-4 text-slate-400">{inv.due_date}</td>
                    <td className="px-5 py-4 text-[#06101d]">₹{inv.amount.toLocaleString('en-IN')}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border capitalize ${
                        inv.status === 'paid' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200 animate-pulse'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleDownloadMockInvoice(inv)}
                        className="text-[#8f38ff] font-bold hover:underline"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
