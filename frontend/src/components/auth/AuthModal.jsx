import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import api from '../../services/api'

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
    const [mode, setMode] = useState(initialMode)
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const endpoint = mode === 'login' ? '/auth/login' : '/auth/register'
            const payload = mode === 'login'
                ? { email: form.email, password: form.password }
                : { name: form.name, email: form.email, password: form.password }

            const res = await api.post(endpoint, payload)
            if (res.data.success) {
                login(res.data.user, res.data.token)
                onClose()
            }
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Authentication failed')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
                    style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(40px)' }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 30 }}
                        className="relative w-full max-w-[380px] rounded-[3.5rem] p-12 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10"
                        style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
                        >✕</button>

                        {/* Title */}
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-black tracking-tighter uppercase italic mb-2">
                                {mode === 'login' ? 'Link' : 'Deploy'} <span className="text-purple-500">Node</span>
                            </h2>
                            <p className="text-gray-500 font-bold text-[11px] uppercase tracking-[0.3em]">
                                {mode === 'login' ? 'Establish Secure Link' : 'Initialize Entity Core'}
                            </p>
                        </div>

                        {/* Error */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-8 p-4 rounded-3xl text-[11px] uppercase font-bold tracking-widest text-red-400 text-center"
                                style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)' }}
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {mode === 'register' && (
                                <input
                                    id="auth-name"
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="IDENTIFIER NAME"
                                    className="w-full px-8 py-5 rounded-[2rem] bg-white/5 border border-white/5 text-white placeholder-gray-700 outline-none transition-all text-[12px] font-bold tracking-widest focus:bg-white/10"
                                />
                            )}

                            <input
                                id="auth-email"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                placeholder="TERMINAL EMAIL"
                                className="w-full px-8 py-5 rounded-[2rem] bg-white/5 border border-white/5 text-white placeholder-gray-700 outline-none transition-all text-[12px] font-bold tracking-widest focus:bg-white/10"
                            />

                            <input
                                id="auth-password"
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                                placeholder="SECURE KEY"
                                className="w-full px-8 py-5 rounded-[2rem] bg-white/5 border border-white/5 text-white placeholder-gray-700 outline-none transition-all text-[12px] font-bold tracking-widest focus:bg-white/10"
                            />

                            <button
                                id="auth-submit"
                                type="submit"
                                disabled={loading}
                                className="w-full py-6 rounded-full font-bold text-black transition-all text-[13px] uppercase tracking-[0.2em] mt-8 shadow-2xl active:scale-95 flex items-center justify-center gap-3"
                                style={{
                                    background: loading ? 'rgba(255, 255, 255, 0.2)' : 'white',
                                }}
                            >
                                {loading && <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />}
                                {loading ? 'Syncing...' : mode === 'login' ? "Establish Link ->" : "Initialize Profile ->"}
                            </button>
                        </form>

                        {/* Switch */}
                        <div className="mt-12 text-center">
                            <button
                                id="auth-toggle"
                                onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError('') }}
                                className="text-gray-500 hover:text-white font-bold text-[11px] uppercase tracking-widest transition-colors"
                            >
                                {mode === 'login' ? 'New Entity?' : 'Existing Node?'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default AuthModal
