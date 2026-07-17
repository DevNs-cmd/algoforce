import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { motion } from 'framer-motion'
import { 
  FaBriefcase, FaGraduationCap, FaCode, FaFlask, FaUsers, FaArrowRight,
  FaSignOutAlt, FaFolderOpen, FaGithub, FaAward, FaCalendarAlt, FaCheck
} from 'react-icons/fa'

const LabsPortal = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('projects')

  // Seeding student data
  const studentData = {
    name: user?.name || 'Student Dev',
    college: 'NIT Delhi',
    track: 'AI Software Engineering',
    advisor: 'Dr. Vivek Saini',
    tasks: [
      { id: '1', title: 'Complete Tally schema extraction mapping guide', completed: true },
      { id: '2', title: 'Optimize query parser latency index logs', completed: false },
      { id: '3', title: 'Connect private cloud database demo instance', completed: false }
    ],
    projects: [
      { name: 'Tally Database Bridge Connector', repo: 'algoforce/tally-bridge', status: 'In Review' },
      { name: 'WhatsApp Webhook State Machine', repo: 'algoforce/whatsapp-state', status: 'Merged' }
    ],
    certifications: [
      { title: 'AI Systems Deployment Specialist', date: '2026-06-15' }
    ]
  }

  const toggleTask = (id) => {
    // Local update
  }

  const menuItems = [
    { id: 'projects', label: 'My Projects', icon: FaFolderOpen },
    { id: 'learning', label: 'Learning Tracks', icon: FaGraduationCap },
    { id: 'tasks', label: 'Task Assignments', icon: FaCheck },
    { id: 'hackathons', label: 'Hackathons', icon: FaCalendarAlt },
    { id: 'research', label: 'Research Papers', icon: FaFlask },
    { id: 'certificates', label: 'Certificates', icon: FaAward }
  ]

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans antialiased">
      {/* Top Header */}
      <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white px-2 py-0.5 rounded-lg border border-slate-700 shrink-0">
            <img src="/logo.png" alt="AlgoForce" className="h-5 w-auto object-contain invert brightness-0" />
          </div>
          <span className="text-base font-bold tracking-tight">
            Algo<span className="text-purple-400">Force</span> <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">Labs Portal</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/workspace/overview" className="text-[10px] font-bold border border-white/20 hover:bg-white/5 px-3 py-1.5 rounded-full uppercase tracking-wider transition-all">
            Client Workspace
          </Link>
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-xs font-bold text-rose-400 hover:text-rose-500 transition-all bg-transparent"
          >
            <FaSignOutAlt size={11} /> Log Out
          </button>
        </div>
      </header>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 border-r border-slate-200/80 bg-white hidden md:flex flex-col justify-between py-6">
          <div className="space-y-4">
            <div className="px-6 pb-4 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 leading-tight">{studentData.name}</h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{studentData.college}</p>
            </div>
            <div className="space-y-1">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-6 py-3 text-xs border-r-2 transition-all text-left ${
                    activeTab === item.id 
                      ? 'bg-purple-50 text-purple-700 font-bold border-purple-600' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold'
                  }`}
                >
                  <item.icon className="text-slate-400 text-xs shrink-0 w-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-4xl mx-auto w-full">
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Open Projects & Sprints</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {studentData.projects.map(p => (
                  <div key={p.name} className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xs font-bold text-slate-800">{p.name}</h3>
                      <span className="text-[9px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-100 uppercase">{p.status}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
                      <FaGithub size={11} /> {p.repo}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'learning' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Syllabus & Action Track</h2>
              <div className="space-y-4">
                {[
                  { title: 'Tally Connector Bridge Mechanics', desc: 'Understanding XML schemas, read-only security permissions, and pipeline triggers.', status: 'Active' },
                  { title: 'Vision Quality Inspection Edge Tuning', desc: 'Latency optimization and camera triggers for assembly lines.', status: 'Coming Next' }
                ].map(track => (
                  <div key={track.title} className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
                    <div className="flex justify-between">
                      <h3 className="text-xs font-bold text-slate-800">{track.title}</h3>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">{track.status}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-normal">{track.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Tasks Assignments</h2>
              <div className="space-y-2">
                {studentData.tasks.map(t => (
                  <label key={t.id} className="flex gap-2.5 p-3 border border-slate-100 rounded-xl bg-white hover:bg-slate-50 cursor-pointer items-start">
                    <input type="checkbox" checked={t.completed} readOnly className="mt-0.5 text-purple-600 rounded" />
                    <span className={`text-xs font-semibold leading-normal ${t.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>{t.title}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hackathons' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Student Hackathons</h2>
              <div className="p-5 border border-purple-100 bg-purple-50/40 rounded-xl space-y-3">
                <span className="text-[9px] font-bold uppercase text-purple-600 tracking-wider">Upcoming Event</span>
                <h3 className="text-sm font-bold text-slate-800">Operational Software Speed Sprint</h3>
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                  Collaborate to optimize query indices on legacy accounting tables. Prizes include paid deployment roles at clients.
                </p>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-xs transition-all">
                  Register for Sprints
                </button>
              </div>
            </div>
          )}

          {activeTab === 'research' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Research Studies</h2>
              <div className="p-4 border border-slate-200 bg-white rounded-xl flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-800">Defect Detection Latency benchmarks on Edge Camera stream</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">Author: Student Cohort</p>
                </div>
                <button className="text-purple-600 text-xs font-bold hover:underline">Download PDF</button>
              </div>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Issued Credentials</h2>
              <div className="space-y-3">
                {studentData.certifications.map(c => (
                  <div key={c.title} className="p-4 border border-slate-200 bg-white rounded-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-lg shrink-0">
                      <FaAward />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-800">{c.title}</h3>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">Issued on: {c.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default LabsPortal
