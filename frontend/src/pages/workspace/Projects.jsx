/**
 * Projects.jsx
 * Active deployment project roadmap tracker.
 * Displays implementation milestones, assigned engineers, timeline progress.
 */
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getProjects, updateProjectMilestones } from '../../services/operationsService'
import { logActivity } from '../../services/activityService'

export default function Projects() {
  const { user, company } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    if (company?.id) {
      loadProjects()
    }
  }, [company])

  const loadProjects = async () => {
    setLoading(true)
    try {
      const data = await getProjects(company.id)
      setProjects(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const toggleMilestone = async (project, milestoneIndex) => {
    setUpdatingId(project.id)
    try {
      const updatedMilestones = project.milestones.map((m, idx) => 
        idx === milestoneIndex ? { ...m, done: !m.done } : m
      )
      
      // Re-calculate progress
      const completedCount = updatedMilestones.filter(m => m.done).length
      const progress = Math.round((completedCount / updatedMilestones.length) * 100)
      
      await updateProjectMilestones(project.id, updatedMilestones, progress)
      
      setProjects(prev => prev.map(p => 
        p.id === project.id ? { ...p, milestones: updatedMilestones, progress } : p
      ))

      const milestoneTitle = project.milestones[milestoneIndex].title
      const newStatusText = updatedMilestones[milestoneIndex].done ? 'Completed' : 'Reopened'
      await logActivity(
        company.id, 
        user.id, 
        'task', 
        `Project Milestone "${milestoneTitle}": ${newStatusText}`
      )
    } catch (err) {
      alert(err.message)
    } finally {
      setUpdatingId(null)
    }
  }

  if (loading) return (
    <div className="flex-1 flex items-center justify-center bg-[#f7f9fc]">
      <p className="text-slate-400 text-xs">Syncing project timelines...</p>
    </div>
  )

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-6 py-5 border-b border-[#06101d]/8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#06101d]">Deployment Projects</h1>
          <p className="text-sm text-slate-500 mt-0.5">Track implementation roadmaps, milestones, and assigned AlgoForce engineering experts.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f7f9fc]">
        {projects.length === 0 ? (
          <div className="text-center py-16 text-slate-400 bg-white rounded-3xl border border-[#06101d]/8">
            <span className="text-4xl block mb-2.5">🚀</span>
            No active deployment projects running.
          </div>
        ) : (
          projects.map(proj => (
            <div key={proj.id} className="bg-white rounded-3xl border border-[#06101d]/8 p-6 space-y-6">
              {/* Progress and status header */}
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#06101d]">{proj.name}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold border bg-[#8f38ff]/5 border-[#8f38ff]/20 text-[#8f38ff] uppercase tracking-wider capitalize">
                    {proj.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Progress</p>
                    <p className="text-sm font-bold text-[#06101d]">{proj.progress}%</p>
                  </div>
                  <div className="w-12 h-12 flex-shrink-0 relative flex items-center justify-center">
                    <svg className="absolute w-full h-full transform -rotate-90">
                      <circle cx="24" cy="24" r="18" stroke="#f1f5f9" strokeWidth="3" fill="transparent" />
                      <circle
                        cx="24"
                        cy="24"
                        r="18"
                        stroke="#8f38ff"
                        strokeWidth="3"
                        fill="transparent"
                        strokeDasharray={113.1}
                        strokeDashoffset={113.1 - (113.1 * proj.progress) / 100}
                        className="transition-all duration-500"
                      />
                    </svg>
                    <span className="text-[10px] font-bold text-[#06101d]">{proj.progress}%</span>
                  </div>
                </div>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Milestones Checklist */}
                <div className="lg:col-span-2 space-y-3 bg-[#f7f9fc] rounded-2xl border border-[#06101d]/5 p-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Milestones Roadmap</h4>
                  <div className="space-y-2">
                    {proj.milestones.map((m, idx) => (
                      <label
                        key={idx}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          m.done 
                            ? 'border-green-150 bg-green-50/50 text-slate-505'
                            : 'border-[#06101d]/8 bg-white hover:border-[#06101d]/20 text-[#06101d]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={m.done}
                          disabled={updatingId === proj.id}
                          onChange={() => toggleMilestone(proj, idx)}
                          className="accent-green-500 w-4 h-4"
                        />
                        <span className={`text-xs font-semibold ${m.done ? 'line-through text-slate-400' : ''}`}>
                          {m.title}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Engineering team card */}
                <div className="bg-[#f7f9fc] rounded-2xl border border-[#06101d]/5 p-4 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Engineers</h4>
                    <div className="space-y-2.5">
                      {proj.engineers.map((eng, idx) => (
                        <div key={idx} className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#06101d] text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                            {eng.name.charAt(0)}
                          </div>
                          <div className="min-w-0 text-xs">
                            <p className="font-bold text-[#06101d] truncate">{eng.name}</p>
                            <p className="text-[10px] text-slate-400">{eng.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#06101d]/6 text-[10px] text-slate-500 leading-normal">
                    💡 Need help? Connect directly via the **Support Center** to trigger instant updates with your engineering team.
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
