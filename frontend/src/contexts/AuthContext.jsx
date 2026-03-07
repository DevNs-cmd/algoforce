import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(() => localStorage.getItem('af_token'))

    const fetchMe = useCallback(async (t) => {
        if (!t) { setLoading(false); return }
        try {
            const res = await api.get('/auth/me', {
                headers: { Authorization: `Bearer ${t}` }
            })
            setUser(res.data.user)
        } catch {
            localStorage.removeItem('af_token')
            setToken(null)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchMe(token) }, [token, fetchMe])

    const login = (userData, newToken) => {
        localStorage.setItem('af_token', newToken)
        setToken(newToken)
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem('af_token')
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
