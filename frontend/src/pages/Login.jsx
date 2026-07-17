import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

const TABS = ['login', 'signup']

export default function Login() {
  const { login, signup, sendMagicLink } = useAuth()
  const navigate = useNavigate()

  const [tab, setTab] = useState('login')
  const [mode, setMode] = useState('password') // 'password' | 'magic'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Login fields
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Signup fields
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupConfirm, setSignupConfirm] = useState('')
  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'magic') {
        await sendMagicLink(loginEmail)
        setSuccess(`Magic link sent to ${loginEmail}. Check your inbox.`)
      } else {
        const loginRes = await login(loginEmail, loginPassword)
        if (loginRes?.user) {
          const { getUserCompany } = await import('../services/workspaceService')
          const comp = await getUserCompany(loginRes.user.id)
          if (comp?.memberUserType === 'client') {
            navigate('/client')
          } else {
            navigate('/workspace')
          }
        } else {
          navigate('/workspace')
        }
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    if (signupPassword !== signupConfirm) {
      setError('Passwords do not match.')
      return
    }
    if (signupPassword.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      const result = await signup(signupEmail, signupPassword, companyName, fullName)
      if (result.session) {
        navigate('/workspace')
      } else {
        setSuccess('Account created! Check your email to confirm your address, then log in.')
        setTab('login')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center p-5">
      <div className="w-full max-w-[440px]">
        {/* Logo */}
        <div className="mb-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <img src="/logo.png" alt="AlgoForce" className="h-7 w-auto object-contain" />
          </Link>
          <p className="text-xs text-slate-500">AI Business Operations Platform</p>
        </div>

        <div className="bg-white rounded-[24px] border border-[#06101d]/10 shadow-[0_20px_60px_rgba(6,47,79,0.08)] p-8">
          {/* Tabs */}
          <div className="flex gap-1 bg-[#f7f9fc] p-1 rounded-xl mb-7">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(''); setSuccess('') }}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all capitalize ${
                  tab === t
                    ? 'bg-white text-[#06101d] shadow-sm'
                    : 'text-slate-500 hover:text-[#06101d]'
                }`}
              >
                {t === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* ── LOGIN ── */}
            {tab === 'login' && (
              <motion.form
                key="login"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#06101d]/12 bg-[#f7f9fc] text-sm text-[#06101d] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30 focus:border-[#8f38ff]/50 transition-all"
                  />
                </div>

                {mode === 'password' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Password</label>
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-[#06101d]/12 bg-[#f7f9fc] text-sm text-[#06101d] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30 focus:border-[#8f38ff]/50 transition-all"
                    />
                  </div>
                )}

                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">{error}</div>
                )}
                {success && (
                  <div className="p-3 rounded-xl bg-green-50 border border-green-100 text-sm text-green-700">{success}</div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#06101d] text-white rounded-xl text-sm font-bold hover:bg-[#102640] transition-colors disabled:opacity-60"
                >
                  {loading ? 'Signing in…' : mode === 'magic' ? 'Send Magic Link' : 'Sign In'}
                </button>

                <button
                  type="button"
                  onClick={() => { setMode(mode === 'password' ? 'magic' : 'password'); setError(''); setSuccess('') }}
                  className="w-full text-xs text-slate-400 hover:text-[#8f38ff] transition-colors text-center py-1"
                >
                  {mode === 'password' ? '✉️ Sign in with magic link instead' : '🔑 Sign in with password instead'}
                </button>
              </motion.form>
            )}

            {/* ── SIGNUP ── */}
            {tab === 'signup' && (
              <motion.form
                key="signup"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onSubmit={handleSignup}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-[#06101d]/12 bg-[#f7f9fc] text-sm text-[#06101d] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Company Name</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Acme Private Limited"
                      className="w-full px-4 py-3 rounded-xl border border-[#06101d]/12 bg-[#f7f9fc] text-sm text-[#06101d] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Work Email</label>
                    <input
                      type="email"
                      required
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#06101d]/12 bg-[#f7f9fc] text-sm text-[#06101d] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Password</label>
                    <input
                      type="password"
                      required
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="Min. 6 characters"
                      className="w-full px-4 py-3 rounded-xl border border-[#06101d]/12 bg-[#f7f9fc] text-sm text-[#06101d] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Confirm Password</label>
                    <input
                      type="password"
                      required
                      value={signupConfirm}
                      onChange={(e) => setSignupConfirm(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full px-4 py-3 rounded-xl border border-[#06101d]/12 bg-[#f7f9fc] text-sm text-[#06101d] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8f38ff]/30 transition-all"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">{error}</div>
                )}
                {success && (
                  <div className="p-3 rounded-xl bg-green-50 border border-green-100 text-sm text-green-700">{success}</div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#06101d] text-white rounded-xl text-sm font-bold hover:bg-[#102640] transition-colors disabled:opacity-60"
                >
                  {loading ? 'Creating account…' : 'Create Account'}
                </button>

                <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                  By creating an account you agree to our{' '}
                  <Link to="/terms" className="underline hover:text-[#8f38ff]">Terms</Link> and{' '}
                  <Link to="/privacy" className="underline hover:text-[#8f38ff]">Privacy Policy</Link>.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          <Link to="/" className="hover:text-[#06101d] transition-colors">← Back to AlgoForce.in</Link>
        </p>
      </div>
    </div>
  )
}
