/**
 * ExecutiveReports.jsx
 * AI Executive Reports Generator.
 * Generates Weekly/Monthly executive summary PDFs or markdown reports of company operations, risk status, projects, savings, and next steps.
 */
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getCommandCenterData, getProjects } from '../../services/operationsService'
import { hasApiKey, generateReport } from '../../services/openaiService'
import { logActivity } from '../../services/activityService'
import ReactMarkdown from 'react-markdown'

export default function ExecutiveReports() {
  const { user, company } = useAuth()
  const [reportType, setReportType] = useState('weekly') // weekly | monthly
  const [report, setReport] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [savedReports, setSavedReports] = useState([])

  // Load context on mount
  const [dbData, setDbData] = useState(null)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    if (company?.id) {
      loadContext()
      loadSavedReports()
    }
  }, [company])

  const loadContext = async () => {
    try {
      const [ccData, projData] = await Promise.all([
        getCommandCenterData(company.id),
        getProjects(company.id)
      ])
      setDbData(ccData)
      setProjects(projData)
    } catch (e) {
      console.error(e)
    }
  }

  const loadSavedReports = async () => {
    try {
      const { getGeneratedDocs } = await import('../../services/workspaceService')
      const data = await getGeneratedDocs(company.id, 'executive_report')
      setSavedReports(data)
    } catch (e) {
      console.error(e)
    }
  }

  const handleGenerate = async () => {
    if (!hasApiKey()) {
      setError('AI is not yet configured for this platform. Please contact your administrator.')
      return
    }
    setLoading(true)
    setError('')
    setReport('')

    // Aggregate facts for AI context
    const openTasks = (dbData?.tasks || []).filter(t => t.status !== 'done')
    const pendingApprovals = dbData?.pendingApprovals || []
    const projectSummary = projects.map(p => `- ${p.name}: ${p.progress}% complete (${p.status})`).join('\n')
    const taskSummary = openTasks.map(t => `- ${t.title} (Priority: ${t.priority}, Due: ${t.due_date || 'N/A'})`).join('\n')
    const approvalSummary = pendingApprovals.map(a => `- ${a.title} (Priority: ${a.priority})`).join('\n')

    const companyData = {
      company: company?.name || 'Unknown',
      reportType,
      projects: projectSummary || 'No active projects',
      pendingApprovals: approvalSummary || 'None pending',
      openTasks: taskSummary || 'No open tasks'
    }

    try {
      const content = await generateReport(reportType, companyData)
      setReport(content)

      // Save report to Supabase
      const { saveGeneratedDoc } = await import('../../services/workspaceService')
      const title = `${reportType.toUpperCase()} Executive Summary — ${new Date().toLocaleDateString('en-IN')}`
      await saveGeneratedDoc(company.id, user.id, 'executive_report', title, content, { type: reportType })
      await logActivity(company.id, user.id, 'generate', `Generated ${reportType} Executive Report`)
      loadSavedReports()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (content, title) => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.replace(/\s+/g, '_')}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#06101d]">Executive Reports</h1>
          <p className="text-sm text-slate-500 mt-0.5">Generate weekly or monthly business status briefings summarizing project rollouts, risks, and ROI matrix.</p>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Side options */}
        <div className="w-80 border-r border-[#06101d]/8 p-5 flex flex-col justify-between flex-shrink-0 bg-white">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase text-slate-400">Report Parameters</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-650 mb-1.5">Reporting Cycle</label>
              <div className="grid grid-cols-2 gap-2 bg-[#f7f9fc] p-1 rounded-xl border border-[#06101d]/6">
                {['weekly', 'monthly'].map(t => (
                  <button
                    key={t}
                    onClick={() => setReportType(t)}
                    className={`py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      reportType === t ? 'bg-[#06101d] text-white shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Saved reports lists */}
            {savedReports.length > 0 && (
              <div className="space-y-2 pt-4">
                <h4 className="text-xs font-bold uppercase text-slate-400">History Log</h4>
                <div className="space-y-1.5 max-h-60 overflow-y-auto">
                  {savedReports.map(r => (
                    <button
                      key={r.id}
                      onClick={() => setReport(r.content)}
                      className="w-full text-left p-2.5 rounded-xl border border-[#06101d]/6 hover:border-[#8f38ff]/30 text-xs bg-[#f7f9fc] truncate font-medium block"
                    >
                      📄 {r.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3 pt-4 border-t border-[#06101d]/6">
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-2.5 bg-[#06101d] text-white rounded-xl text-xs font-bold hover:bg-[#102640] transition-colors flex items-center justify-center gap-1.5"
            >
              {loading && <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
              {loading ? 'Synthesizing report...' : `Compile ${reportType.toUpperCase()} Report`}
            </button>
          </div>
        </div>

        {/* Right Side Content Panel */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#f7f9fc]">
          {report ? (
            <div className="bg-white rounded-3xl border border-[#06101d]/8 p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-[#06101d]/6 pb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">AI Compilation Output</span>
                <button
                  onClick={() => handleDownload(report, `${reportType.toUpperCase()}_Executive_Summary`)}
                  className="px-3.5 py-1.5 border border-[#06101d]/8 hover:bg-slate-50 text-xs font-bold rounded-xl text-slate-650"
                >
                  Download Markdown
                </button>
              </div>
              <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-[#06101d] prose-h2:text-sm prose-p:text-slate-650 prose-li:text-slate-650">
                <ReactMarkdown>{report}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <span className="text-4xl block mb-2">📊</span>
              <h3 className="font-bold text-[#06101d] text-sm">No Report Rendered</h3>
              <p className="text-xs text-slate-550 max-w-xs mt-1 leading-normal">Select parameters on the left to compile operations timeline summaries dynamically.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
