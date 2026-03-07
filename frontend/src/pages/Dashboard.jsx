import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import api from '../services/api'
import AuthModal from '../components/auth/AuthModal'

const Dashboard = () => {
    const { user, token, logout } = useAuth()
    const navigate = useNavigate()
    const [authModalOpen, setAuthModalOpen] = useState(false)
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({ total: 0, thisWeek: 0, files: 0 })

    useEffect(() => {
        if (!user) {
            setLoading(false)
            return
        }
        const fetchProjects = async () => {
            try {
                const res = await api.get('/projects', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const projs = res.data.projects || []
                setProjects(projs)

                const oneWeekAgo = new Date()
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
                const thisWeek = projs.filter(p => new Date(p.createdAt) > oneWeekAgo).length
                const totalFiles = projs.reduce((sum, p) => sum + (p.files?.length || 0), 0)
                setStats({ total: projs.length, thisWeek, files: totalFiles })
            } catch { /* ignore */ } finally {
                setLoading(false)
            }
        }
        fetchProjects()
    }, [user, token])

    const deleteProject = async (id) => {
        if (!confirm('Delete this project?')) return
        try {
            await api.delete(`/projects/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setProjects(prev => prev.filter(p => p._id !== id))
        } catch { /* ignore */ }
    }

    if (!user) {
        return (
            <>
                <Helmet><title>Dashboard – AlgoForce</title></Helmet>
                <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
                <div className="min-h-screen flex items-center justify-center pt-20 px-4"
                    style={{ background: 'linear-gradient(135deg, #05050F 0%, #0B0F2A 100%)' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-md"
                    >
                        <div className="text-6xl mb-6">🔒</div>
                        <h1 className="text-3xl font-bold gradient-text mb-4">Sign In Required</h1>
                        <p className="text-gray-400 mb-8">
                            Create an account to save your projects, access chat history, and manage your AI-generated code.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setAuthModalOpen(true)}
                            className="px-8 py-3 rounded-xl font-semibold text-white"
                            style={{ background: 'linear-gradient(135deg, #8700FF, #9A4DFF)', boxShadow: '0 8px 25px rgba(135,0,255,0.35)' }}
                        >
                            Sign In / Create Account
                        </motion.button>
                        <div className="mt-4">
                            <Link to="/ai-builder" className="text-purple-400 text-sm hover:text-purple-300 transition-colors">
                                → Try AI Builder without account
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>Dashboard – AlgoForce</title>
                <meta name="description" content="Manage your AI-generated projects and chat history on AlgoForce." />
            </Helmet>

            <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6"
                style={{ background: 'linear-gradient(135deg, #05050F 0%, #0B0F2A 100%)' }}>
                <div className="max-w-6xl mx-auto">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between mb-8 flex-wrap gap-4"
                    >
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                Welcome, <span className="gradient-text">{user.name}</span>
                            </h1>
                            <p className="text-gray-400 mt-1">{user.email} · {user.plan} plan</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link to="/ai-builder">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white"
                                    style={{ background: 'linear-gradient(135deg, #8700FF, #9A4DFF)', boxShadow: '0 6px 20px rgba(135,0,255,0.3)' }}
                                >
                                    + New Project
                                </motion.button>
                            </Link>
                            <button
                                onClick={logout}
                                className="px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-white transition-colors"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                            >
                                Sign Out
                            </button>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
                    >
                        {[
                            { label: 'Total Projects', value: stats.total, icon: '📦', color: '#8700FF' },
                            { label: 'This Week', value: stats.thisWeek, icon: '📅', color: '#00c6ff' },
                            { label: 'Files Generated', value: stats.files, icon: '📄', color: '#9A4DFF' }
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 + i * 0.05 }}
                                className="p-5 rounded-2xl"
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(154,77,255,0.2)',
                                    boxShadow: `0 4px 20px rgba(135,0,255,0.08)`
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl">{stat.icon}</div>
                                    <div>
                                        <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                                        <div className="text-xs text-gray-500">{stat.label}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Projects */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <h2 className="text-xl font-semibold text-white">Your Projects</h2>
                            <span className="text-xs px-2 py-0.5 rounded-full text-purple-400"
                                style={{ background: 'rgba(154,77,255,0.15)' }}>
                                {projects.length}
                            </span>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-16">
                                <div className="text-purple-400 text-sm animate-pulse">Loading projects...</div>
                            </div>
                        ) : projects.length === 0 ? (
                            <div
                                className="flex flex-col items-center justify-center py-16 rounded-2xl text-center"
                                style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(154,77,255,0.3)' }}
                            >
                                <div className="text-5xl mb-4 opacity-40">🚀</div>
                                <h3 className="text-white font-medium mb-2">No projects yet</h3>
                                <p className="text-gray-500 text-sm mb-6">Start building with AI to see your projects here.</p>
                                <Link to="/ai-builder">
                                    <button className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
                                        style={{ background: 'linear-gradient(135deg, #8700FF, #9A4DFF)' }}>
                                        Start Building
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {projects.map((proj, i) => (
                                    <motion.div
                                        key={proj._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group p-5 rounded-2xl transition-all hover:border-purple-500/40"
                                        style={{
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(154,77,255,0.15)',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => navigate(`/ai-builder?project=${proj._id}`)}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="text-2xl">📦</div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); deleteProject(proj._id) }}
                                                className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-all text-sm"
                                            >✕</button>
                                        </div>
                                        <h3 className="font-semibold text-white text-sm mb-1 truncate">{proj.name}</h3>
                                        {proj.description && (
                                            <p className="text-xs text-gray-500 mb-3 line-clamp-2">{proj.description}</p>
                                        )}
                                        <div className="flex items-center justify-between text-xs text-gray-600">
                                            <span>{proj.files?.length || 0} files</span>
                                            <span>{new Date(proj.updatedAt).toLocaleDateString()}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
