/**
 * CommandCenter.jsx
 * Business-First morning briefing dashboard for the company operating platform.
 */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { getCommandCenterData, updateTaskStatus, respondToApproval } from '../../services/operationsService'
import { logActivity } from '../../services/activityService'
import ActivityFeed from './ActivityFeed'

export default function CommandCenter() {
  const { user, company, userDisplayName } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState({})

  useEffect(() => {
    if (company?.id) {
      loadDashboard()
    }
  }, [company])

  const loadDashboard = async () => {
    setLoading(true)
    try {
      const ccData = await getCommandCenterData(company.id, user.id)
      setData(ccData)
    } catch (e) {
      console.error('Error loading dashboard:', e)
    } finally {
      setLoading(false)
    }
  }

  const markTaskDone = async (task) => {
    setActionLoading(prev => ({ ...prev, [task.id]: true }))
    try {
      await updateTaskStatus(task.id, 'done')
      await logActivity(company.id, user.id, 'task', `Completed task: ${task.title}`)
      await loadDashboard()
    } catch (e) {
      console.error(e)
    } finally {
      setActionLoading(prev => ({ ...prev, [task.id]: false }))
    }
  }

  const handleApproval = async (approval, status) => {
    setActionLoading(prev => ({ ...prev, [approval.id]: true }))
    try {
      await respondToApproval(approval.id, user.id, status)
      await loadDashboard()
    } catch (e) {
      console.error(e)
    } finally {
      setActionLoading(prev => ({ ...prev, [approval.id]: false }))
    }
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#f7f9fc]">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-2 border-[#06101d] border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-xs">Loading morning briefing...</p>
        </div>
      </div>
    )
  }

  const tasksCount = data?.tasks?.filter(t => t.status !== 'done')?.length || 0
  const approvalsCount = data?.pendingApprovals?.length || 0
  const deployCount = data?.activeDeploymentsCount || 0
  const activeInvoicesVal = data?.activeInvoicesSum || 0
  const clientMsgsCount = data?.clientMessagesCount || 0

  // Format invoices amount to ₹4.2L style
  const formatAmountLakhs = (val) => {
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)}L`
    } else if (val >= 1000) {
      return `₹${(val / 1000).toFixed(1)}K`
    }
    return `₹${val}`
  }

  const activeProjects = data?.activeProjects || []
  const todayTasks = data?.dueToday || []
  const pendingApprovals = data?.pendingApprovals || []

  return (
    <div className="flex-1 overflow-y-auto bg-[#f7f9fc]">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        
        {/* Welcome Briefing Header */}
        <div className="flex justify-between items-end border-b border-[#06101d]/5 pb-4">
          <div>
            <h1 className="text-xl font-bold text-[#06101d] tracking-tight">
              Good Morning, {userDisplayName}.
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Operations Hub for {company?.name} · Enterprise OS Session
            </p>
          </div>
          <span className="text-xs font-semibold px-4 py-1.5 bg-white border border-[#06101d]/10 rounded-full text-slate-650 shadow-xs">
            📅 {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>

        {/* 5-Column Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[
            { value: `${tasksCount} Tasks`, label: 'Due / Active', color: 'text-orange-655 bg-orange-50/50 border-orange-200' },
            { value: `${approvalsCount} Approv`, label: 'Pending Review', color: 'text-purple-650 bg-purple-50/50 border-purple-200' },
            { value: `${deployCount} Deploy`, label: 'Live Systems', color: 'text-green-600 bg-green-50/50 border-green-200' },
            { value: formatAmountLakhs(activeInvoicesVal), label: 'Active Invoices', color: 'text-[#8f38ff] bg-[#8f38ff]/5 border-[#8f38ff]/10' },
            { value: `${clientMsgsCount} Client`, label: 'Unread Messages', color: 'text-blue-650 bg-blue-50/50 border-blue-200' }
          ].map((stat, i) => (
            <div key={i} className={`p-4 rounded-2xl border bg-white flex flex-col justify-between shadow-xs hover:shadow-sm transition-all ${stat.color}`}>
              <span className="text-lg font-black tracking-tight">{stat.value}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400 mt-1 tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Active Projects + Today's Tasks */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Active Projects */}
            <div className="bg-white rounded-3xl border border-[#06101d]/8 p-5 shadow-xs">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Active Projects</h3>
              {activeProjects.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs">
                  🚀 No active projects. Set up one in the Projects module.
                </div>
              ) : (
                <div className="space-y-4">
                  {activeProjects.map(proj => (
                    <div key={proj.id} className="p-4 bg-[#f7f9fc] rounded-2xl border border-[#06101d]/5 hover:border-[#06101d]/12 transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-bold text-[#06101d]">{proj.name}</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5 capitalize">Stage: {proj.status}</p>
                        </div>
                        <span className="text-xs font-bold text-[#8f38ff] bg-[#8f38ff]/5 px-2 py-0.5 rounded border border-[#8f38ff]/10">
                          {proj.progress}%
                        </span>
                      </div>
                      <div className="mt-3.5 space-y-1">
                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-[#8f38ff] rounded-full transition-all duration-300" style={{ width: `${proj.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Today's Tasks Checklist */}
            <div className="bg-white rounded-3xl border border-[#06101d]/8 overflow-hidden shadow-xs">
              <div className="px-5 py-4 border-b border-[#06101d]/8 flex justify-between items-center">
                <h3 className="text-xs font-bold text-[#06101d] uppercase tracking-wider">Today's Tasks</h3>
                <Link to="/workspace/tasks" className="text-[10px] text-[#8f38ff] font-bold hover:underline">View All Tasks →</Link>
              </div>
              {todayTasks.length === 0 ? (
                <p className="text-center text-xs text-slate-400 py-10">No tasks due today. Hooray!</p>
              ) : (
                <div className="divide-y divide-[#06101d]/6">
                  {todayTasks.map(task => (
                    <div key={task.id} className="p-4 flex justify-between items-center gap-3 text-xs hover:bg-[#f7f9fc]/50 transition-all">
                      <div className="flex items-center gap-3 min-w-0">
                        <button
                          onClick={() => markTaskDone(task)}
                          disabled={actionLoading[task.id]}
                          className="w-4 h-4 rounded border border-[#06101d]/20 hover:bg-green-50 hover:border-green-500 flex-shrink-0 flex items-center justify-center transition-all"
                        >
                          {actionLoading[task.id] && <div className="w-2 h-2 border border-slate-400 border-t-transparent rounded-full animate-spin" />}
                        </button>
                        <span className="font-semibold text-[#06101d] truncate">{task.title}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase border ${
                        task.priority === 'urgent' ? 'bg-red-50 text-red-750 border-red-200' : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Real-time Activity Feed + Approvals */}
          <div className="space-y-6">
            
            {/* Real-time Activity Feed */}
            <div className="bg-white rounded-3xl border border-[#06101d]/8 overflow-hidden shadow-xs flex flex-col h-[320px]">
              <div className="px-5 py-4 border-b border-[#06101d]/8 flex justify-between items-center flex-shrink-0">
                <h3 className="text-xs font-bold text-[#06101d] uppercase tracking-wider">Company Activity Log</h3>
                <Link to="/workspace/timeline" className="text-[10px] text-[#8f38ff] font-bold hover:underline">Full Log →</Link>
              </div>
              <div className="flex-1 overflow-hidden">
                <ActivityFeed limit={5} compact={true} />
              </div>
            </div>

            {/* Pending Approvals */}
            <div className="bg-white rounded-3xl border border-[#06101d]/8 overflow-hidden shadow-xs">
              <div className="px-5 py-4 border-b border-[#06101d]/8 flex justify-between items-center">
                <h3 className="text-xs font-bold text-[#06101d] uppercase tracking-wider">Awaiting Approval</h3>
                <Link to="/workspace/approvals" className="text-[10px] text-[#8f38ff] font-bold hover:underline">Inbox →</Link>
              </div>
              {pendingApprovals.length === 0 ? (
                <p className="text-center text-xs text-slate-400 py-10">No pending approvals.</p>
              ) : (
                <div className="divide-y divide-[#06101d]/6">
                  {pendingApprovals.slice(0, 3).map(app => (
                    <div key={app.id} className="p-4 flex flex-col gap-3 text-xs">
                      <div>
                        <p className="font-bold text-[#06101d]">{app.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Priority: {app.priority}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproval(app, 'approved')}
                          disabled={actionLoading[app.id]}
                          className="flex-1 py-1.5 bg-green-600 text-white rounded-lg text-[10px] font-bold hover:bg-green-700 transition-all disabled:opacity-50"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleApproval(app, 'rejected')}
                          disabled={actionLoading[app.id]}
                          className="flex-1 py-1.5 border border-red-200 text-red-650 rounded-lg text-[10px] font-bold hover:bg-red-50 transition-all disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
