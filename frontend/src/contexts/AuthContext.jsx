import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '../services/supabase'
import { createCompany, getUserCompany } from '../services/workspaceService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null)
  const [session, setSession] = useState(null)
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)

  // Prevent duplicate in-flight company loads
  const companyLoadingRef = useRef(false)
  // Track which userId we last loaded company for — skip redundant loads on token refresh
  const lastLoadedUserRef = useRef(null)

  // ── BOOTSTRAP COMPANY ────────────────────────────────────────────────────
  // Called once per unique userId. Auto-creates company if user has none.
  const bootstrapCompany = useCallback(async (authUser) => {
    if (!authUser?.id) return
    // Skip if already loaded for this user (e.g. token refresh fires repeatedly)
    if (lastLoadedUserRef.current === authUser.id && !companyLoadingRef.current) return
    if (companyLoadingRef.current) return

    companyLoadingRef.current = true
    lastLoadedUserRef.current = authUser.id

    try {
      let comp = await getUserCompany(authUser.id)

      if (!comp) {
        // User exists in auth but has no workspace yet (fresh install, migration just ran, etc.)
        const name =
          authUser.user_metadata?.company_name ||
          authUser.email?.split('@')[0] ||
          'My Company'
        try {
          comp = await createCompany(authUser.id, name)
        } catch (createErr) {
          // Could fail if company already exists (race on double-login)
          // Try fetching one more time
          comp = await getUserCompany(authUser.id)
          if (!comp) console.warn('[Auth] Company creation failed:', createErr.message)
        }
      }

      setCompany(comp ?? null)
    } catch (err) {
      console.error('[Auth] bootstrapCompany error:', err)
    } finally {
      companyLoadingRef.current = false
      setLoading(false)
    }
  }, [])

  // ── AUTH INIT ─────────────────────────────────────────────────────────────
  useEffect(() => {
    // 1. Get the current persisted session immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        bootstrapCompany(session.user)
      } else {
        setLoading(false)
      }
    })

    // 2. Subscribe to future auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user) {
          // Only re-bootstrap on meaningful events, not every token refresh
          if (_event === 'SIGNED_IN' || _event === 'USER_UPDATED') {
            lastLoadedUserRef.current = null // force reload
            bootstrapCompany(session.user)
          } else if (_event === 'TOKEN_REFRESHED' && !company) {
            // Retry if we somehow ended up with no company after a refresh
            bootstrapCompany(session.user)
          }
        } else if (_event === 'SIGNED_OUT') {
          setCompany(null)
          setLoading(false)
          lastLoadedUserRef.current = null
        }
      }
    )

    return () => subscription?.unsubscribe()
  }, [bootstrapCompany]) // stable ref — only runs once

  // ── SIGN UP ───────────────────────────────────────────────────────────────
  const signup = useCallback(async (email, password, companyName, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, company_name: companyName } },
    })
    if (error) throw error
    return data
  }, [])

  // ── LOGIN ─────────────────────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }, [])

  // ── MAGIC LINK ────────────────────────────────────────────────────────────
  const sendMagicLink = useCallback(async (email) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/workspace` },
    })
    if (error) throw error
  }, [])

  // ── LOGOUT ────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    setCompany(null)
    lastLoadedUserRef.current = null
  }, [])

  // ── REFRESH COMPANY ───────────────────────────────────────────────────────
  const refreshCompany = useCallback(async () => {
    if (!user?.id) return
    lastLoadedUserRef.current = null // force reload
    await bootstrapCompany(user)
  }, [user, bootstrapCompany])

  // ── DERIVED VALUES ────────────────────────────────────────────────────────
  const userDisplayName =
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0]?.replace(/[._]/g, ' ')?.replace(/\b\w/g, c => c.toUpperCase()) ||
    'User'

  const isAuthenticated = !!session && !!user

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        company,
        loading,
        isAuthenticated,
        userDisplayName,
        signup,
        login,
        sendMagicLink,
        logout,
        refreshCompany,
        userRole:       company?.memberRole       || 'member',
        userDepartment: company?.memberDepartment || null,
        userType:       company?.memberUserType   || 'staff',
        currentWorkspace: company, // legacy compat
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
