/**
 * BusinessAssessment.jsx
 * Multi-step assessment form saved to Supabase.
 * Generates AI-powered assessment report, product recommendations, and implementation roadmap.
 */
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { saveAssessment, getAssessment, saveCompanyProfile, updateCompanyAssessmentInsights } from '../../services/workspaceService'
import { createTasksBatch, createApproval, getTasks } from '../../services/operationsService'
import { generateAssessmentReport, hasApiKey } from '../../services/openaiService'
import ReactMarkdown from 'react-markdown'

const STEPS = [
  {
    id: 'company',
    title: 'Company Profile',
    fields: [
      { key: 'company_name', label: 'Company Name', type: 'text', placeholder: 'e.g. Acme Industries' },
      { key: 'industry', label: 'Industry / Sector', type: 'select', options: ['Manufacturing', 'Trading / Distribution', 'Retail', 'Services', 'Healthcare', 'Education', 'Finance / NBFC', 'Real Estate', 'IT / Software', 'Logistics', 'Construction', 'Other'] },
      { key: 'employees', label: 'Number of Employees', type: 'select', options: ['1–10', '11–50', '51–200', '201–500', '500+'] },
      { key: 'revenue', label: 'Annual Revenue Range', type: 'select', options: ['< ₹1 Cr', '₹1–10 Cr', '₹10–50 Cr', '₹50–200 Cr', '₹200 Cr+'] },
      { key: 'current_erp', label: 'Current ERP', type: 'text', placeholder: 'e.g. Tally, SAP, Zoho Books' },
      { key: 'current_crm', label: 'Current CRM', type: 'text', placeholder: 'e.g. Salesforce, HubSpot, WhatsApp' },
      { key: 'current_problems', label: 'Current Problems', type: 'textarea', placeholder: 'What is breaking, slow, or causing manual effort today?' },
    ]
  },
  {
    id: 'operations',
    title: 'Current Operations',
    fields: [
      { key: 'current_software', label: 'Current software in use (ERP, CRM, etc.)', type: 'textarea', placeholder: 'e.g. Tally, Excel, WhatsApp, Salesforce, SAP...' },
      { key: 'manual_processes', label: 'Biggest manual/time-consuming processes', type: 'textarea', placeholder: 'e.g. Invoice entry takes 3 hours daily, attendance tracking is done on paper...' },
      { key: 'pain_points', label: 'Top 3 operational pain points', type: 'textarea', placeholder: 'e.g. Data entry errors, no real-time reports, customer follow-up is inconsistent...' },
    ]
  },
  {
    id: 'departments',
    title: 'Department Priorities',
    fields: [
      { key: 'priority_departments', label: 'Which departments need the most improvement?', type: 'checkboxes', options: ['Finance & Accounts', 'Sales & CRM', 'HR & Payroll', 'Operations & Logistics', 'Customer Support', 'Manufacturing / Production', 'Procurement'] },
      { key: 'data_management', label: 'How is company data currently managed?', type: 'select', options: ['Mostly Excel/spreadsheets', 'Combination of software + Excel', 'ERP system', 'Separate tools per department', 'No system — mostly manual'] },
      { key: 'reporting', label: 'How do you currently get business reports?', type: 'select', options: ['No regular reports', 'Manual Excel reports weekly/monthly', 'ERP-generated reports', 'Real-time dashboard', 'External accountant/consultant'] },
    ]
  },
  {
    id: 'readiness',
    title: 'Automation Readiness',
    fields: [
      { key: 'tech_comfort', label: 'Team\'s technology comfort level', type: 'select', options: ['Very low — prefer manual methods', 'Low — basic computer usage', 'Medium — use software daily', 'High — comfortable with new tools', 'Very high — technical team'] },
      { key: 'budget', label: 'Monthly software investment range', type: 'select', options: ['Not sure yet', '₹10,000–30,000/month', '₹30,000–80,000/month', '₹80,000–2L/month', '₹2L+/month'] },
      { key: 'timeline', label: 'When do you want to implement changes?', type: 'select', options: ['Immediately (within 1 month)', '1–3 months', '3–6 months', '6–12 months', 'Just exploring'] },
      { key: 'specific_goals', label: 'What specific outcome would make this a success for you?', type: 'textarea', placeholder: 'e.g. Reduce invoice processing time by 80%, get daily sales reports automatically...' },
    ]
  }
]

export default function BusinessAssessment() {
  const { user, company } = useAuth()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [report, setReport] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [existing, setExisting] = useState(null)
  const [mode, setMode] = useState('form') // 'form' | 'report'

  useEffect(() => {
    if (company?.id) loadExisting()
  }, [company])

  const loadExisting = async () => {
    try {
      const data = await getAssessment(company.id)
      if (data) {
        setExisting(data)
        setFormData(data.form_data || {})
        if (data.report?.content) {
          setReport(data.report.content)
          setMode('report')
        }
      }
    } catch (e) { console.error(e) }
  }

  const handleFieldChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleCheckbox = (key, option, checked) => {
    const current = formData[key] ? formData[key].split(', ').filter(Boolean) : []
    const updated = checked ? [...current, option] : current.filter(x => x !== option)
    handleFieldChange(key, updated.join(', '))
  }

  const handleSave = async (final = false) => {
    if (!company?.id) return
    try {
      const companyName = formData.company_name || company?.name || 'Your Company'
      await saveCompanyProfile(company.id, {
        companyName,
        industry: formData.industry,
        employees: formData.employees,
        annualRevenue: formData.revenue,
        currentErp: formData.current_erp,
        currentCrm: formData.current_crm,
        currentProblems: formData.current_problems,
      })
      await saveAssessment(company.id, user.id, formData, null, final ? 'draft' : 'draft')
    } catch (e) { console.error(e) }
  }

  const handleGenerateReport = async () => {
    if (!hasApiKey()) {
      setError('No OpenAI API key. Go to Settings → AI Configuration.')
      return
    }
    setError('')
    setLoading(true)
    try {
      await handleSave(true)
      const companyName = formData.company_name || company?.name || 'Your Company'
      const result = await generateAssessmentReport(formData, companyName)
      const insightMatch = result.match(/Operational Score:\s*(\d+)/i)
      const automationMatch = result.match(/Automation Score:\s*(\d+)/i)
      const riskMatch = result.match(/Risk Score:\s*(\d+)/i)
      const roiMatch = result.match(/Expected ROI:\s*(.+)/i)
      const implMatch = result.match(/Estimated Implementation Time:\s*(.+)/i)
      const opportunities = Array.from(result.matchAll(/-\s+(.+)/g)).slice(0, 8).map((m) => m[1])
      const recommendedProducts = ['TallyGPT', 'LeadBolt', 'HR Copilot']

      await saveAssessment(company.id, user.id, formData, result, 'complete')
      await updateCompanyAssessmentInsights(company.id, {
        operationalScore: insightMatch ? Number(insightMatch[1]) : 67,
        automationScore: automationMatch ? Number(automationMatch[1]) : 74,
        riskScore: riskMatch ? Number(riskMatch[1]) : 31,
        expectedRoi: roiMatch ? roiMatch[1].trim() : '₹1.5L/month',
        implTime: implMatch ? implMatch[1].trim() : '3–6 weeks',
        aiOpportunities: opportunities,
        recProducts: recommendedProducts,
      })

      await createTasksBatch(company.id, user.id, [
        { title: 'Upload GST returns and invoices', description: 'Add the latest financial documents to the company vault.', priority: 'high', source: 'assessment' },
        { title: 'Connect Tally or your ERP', description: 'Link the current system to the OS for live data sync.', priority: 'high', source: 'assessment' },
        { title: 'Invite finance and operations leads', description: 'Bring the right stakeholders into the workspace.', priority: 'medium', source: 'assessment' },
        { title: 'Review AI recommendations', description: 'Review the generated opportunities and select the first deployment.', priority: 'medium', source: 'assessment' },
        { title: 'Schedule deployment call', description: 'Book a deployment planning conversation with AlgoForce.', priority: 'medium', source: 'assessment' },
      ])

      await createApproval(company.id, user.id, {
        title: 'Approve deployment roadmap',
        description: 'Review the AI-generated roadmap and approve the first implementation phase.',
        priority: 'high',
      })

      setReport(result)
      setMode('report')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const downloadReport = () => {
    const blob = new Blob([report], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `AlgoForce_Assessment_${company?.name?.replace(/[^a-z0-9]/gi, '_') || 'Report'}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const currentStepData = STEPS[step]
  const progress = ((step + 1) / STEPS.length) * 100

  const isStepComplete = (s) => {
    return STEPS[s].fields.every(f => formData[f.key]?.trim?.() || formData[f.key])
  }

  const allComplete = STEPS.every((_, i) => isStepComplete(i))

  if (mode === 'report') {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-[#06101d]">Business Assessment Report</h1>
            <p className="text-sm text-slate-500 mt-0.5">Your personalised operational analysis and recommendations</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setMode('form')}
              className="px-4 py-2 rounded-xl border border-[#06101d]/15 text-xs font-semibold text-slate-600 hover:bg-[#f7f9fc] transition-all">
              Edit Answers
            </button>
            <button onClick={downloadReport}
              className="px-4 py-2 rounded-xl bg-[#06101d] text-white text-xs font-bold hover:bg-[#102640] transition-all">
              ↓ Download Report
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto prose prose-slate prose-headings:font-semibold prose-headings:text-[#06101d] prose-h2:text-lg prose-h3:text-base prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-[#06101d] prose-table:text-sm">
            <ReactMarkdown>{report}</ReactMarkdown>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8">
        <h1 className="text-xl font-semibold text-[#06101d]">Business Assessment</h1>
        <p className="text-sm text-slate-500 mt-0.5">Complete this assessment to get an AI-generated analysis, product recommendations, and roadmap.</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              {STEPS.map((s, i) => (
                <button key={s.id} onClick={() => { handleSave(); setStep(i) }}
                  className={`flex items-center gap-2 text-xs font-semibold transition-all ${
                    i === step ? 'text-[#06101d]' : isStepComplete(i) ? 'text-[#8f38ff]' : 'text-slate-400'
                  }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                    isStepComplete(i) ? 'bg-[#8f38ff] text-white' : i === step ? 'bg-[#06101d] text-white' : 'bg-[#f7f9fc] border border-[#06101d]/15 text-slate-400'
                  }`}>
                    {isStepComplete(i) ? '✓' : i + 1}
                  </div>
                  <span className="hidden sm:block">{s.title}</span>
                </button>
              ))}
            </div>
            <div className="h-1.5 bg-[#f7f9fc] rounded-full overflow-hidden">
              <div className="h-full bg-[#8f38ff] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Step Form */}
          <div className="bg-white rounded-2xl border border-[#06101d]/10 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#06101d] mb-6">
              Step {step + 1} — {currentStepData.title}
            </h2>

            <div className="space-y-6">
              {currentStepData.fields.map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-semibold text-[#06101d] mb-2">{field.label}</label>

                  {field.type === 'text' && (
                    <input
                      type="text"
                      value={formData[field.key] || ''}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-xl border border-[#06101d]/12 bg-[#f7f9fc] text-sm text-[#06101d] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30"
                    />
                  )}

                  {field.type === 'select' && (
                    <select
                      value={formData[field.key] || ''}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#06101d]/12 bg-[#f7f9fc] text-sm text-[#06101d] focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30"
                    >
                      <option value="">Select…</option>
                      {field.options.map(o => <option key={o}>{o}</option>)}
                    </select>
                  )}

                  {field.type === 'textarea' && (
                    <textarea
                      value={formData[field.key] || ''}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-[#06101d]/12 bg-[#f7f9fc] text-sm text-[#06101d] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30 resize-none"
                    />
                  )}

                  {field.type === 'checkboxes' && (
                    <div className="grid grid-cols-2 gap-2">
                      {field.options.map(opt => {
                        const checked = (formData[field.key] || '').split(', ').includes(opt)
                        return (
                          <label key={opt} className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                            checked ? 'border-[#8f38ff]/40 bg-[#8f38ff]/5 text-[#06101d]' : 'border-[#06101d]/12 bg-[#f7f9fc] text-slate-600 hover:border-[#06101d]/30'
                          }`}>
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => handleCheckbox(field.key, opt, e.target.checked)}
                              className="accent-[#8f38ff]"
                            />
                            <span className="text-sm font-medium">{opt}</span>
                          </label>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => { handleSave(); setStep(s => Math.max(0, s - 1)) }}
              disabled={step === 0}
              className="px-5 py-2.5 rounded-xl border border-[#06101d]/15 text-sm font-semibold text-slate-600 hover:bg-[#f7f9fc] transition-all disabled:opacity-30"
            >
              ← Back
            </button>

            {step < STEPS.length - 1 ? (
              <button
                onClick={() => { handleSave(); setStep(s => s + 1) }}
                className="px-6 py-2.5 bg-[#06101d] text-white rounded-xl text-sm font-bold hover:bg-[#102640] transition-all"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleGenerateReport}
                disabled={loading || !allComplete}
                className="px-6 py-2.5 bg-[#8f38ff] text-white rounded-xl text-sm font-bold hover:bg-[#7a2ee6] transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {loading && <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                {loading ? 'Generating Report…' : 'Generate Assessment Report'}
              </button>
            )}
          </div>

          {error && <p className="text-sm text-red-500 mt-4 text-center">{error}</p>}

          {!allComplete && step === STEPS.length - 1 && (
            <p className="text-xs text-slate-400 text-center mt-3">
              Complete all required fields in each step to generate your report.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
