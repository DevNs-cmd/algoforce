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
                    style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-md rounded-2xl p-8"
                        style={{
                            background: 'linear-gradient(135deg, #0B0F2A 0%, #05050F 100%)',
                            border: '1px solid rgba(154, 77, 255, 0.3)',
                            boxShadow: '0 25px 50px rgba(135, 0, 255, 0.2)'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-xl"
                            id="auth-modal-close"
                        >✕</button>

                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold gradient-text mb-1">
                                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                            </h2>
                            <p className="text-gray-400 text-sm">
                                {mode === 'login' ? 'Sign in to your AlgoForce account' : 'Join AlgoForce AI Builder'}
                            </p>
                        </div>

                        {/* Error */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 p-3 rounded-lg text-sm text-red-400"
                                style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {mode === 'register' && (
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1.5">Full Name</label>
                                    <input
                                        id="auth-name"
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 outline-none transition-all text-sm"
                                        style={{
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(154, 77, 255, 0.2)',
                                        }}
                                        onFocus={e => e.target.style.borderColor = 'rgba(154, 77, 255, 0.6)'}
                                        onBlur={e => e.target.style.borderColor = 'rgba(154, 77, 255, 0.2)'}
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm text-gray-300 mb-1.5">Email</label>
                                <input
                                    id="auth-email"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 outline-none transition-all text-sm"
                                    style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(154, 77, 255, 0.2)',
                                    }}
                                    onFocus={e => e.target.style.borderColor = 'rgba(154, 77, 255, 0.6)'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(154, 77, 255, 0.2)'}
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300 mb-1.5">Password</label>
                                <input
                                    id="auth-password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 outline-none transition-all text-sm"
                                    style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(154, 77, 255, 0.2)',
                                    }}
                                    onFocus={e => e.target.style.borderColor = 'rgba(154, 77, 255, 0.6)'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(154, 77, 255, 0.2)'}
                                />
                            </div>

                            <motion.button
                                id="auth-submit"
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                whileTap={{ scale: loading ? 1 : 0.98 }}
                                className="w-full py-3 rounded-xl font-semibold text-white transition-all text-sm"
                                style={{
                                    background: loading ? 'rgba(135, 0, 255, 0.4)' : 'linear-gradient(135deg, #8700FF 0%, #9A4DFF 100%)',
                                    boxShadow: loading ? 'none' : '0 8px 25px rgba(135, 0, 255, 0.35)'
                                }}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                                    </span>
                                ) : mode === 'login' ? 'Sign In' : 'Create Account'}
                            </motion.button>
                        </form>

                        {/* Divider */}
                        <div className="my-5 flex items-center gap-3">
                            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
                            <span className="text-xs text-gray-500">or</span>
                            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
                        </div>

                        {/* Toggle */}
                        <p className="text-center text-sm text-gray-400">
                            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                            {' '}
                            <button
                                id="auth-toggle"
                                onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError('') }}
                                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                            >
                                {mode === 'login' ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default AuthModal
