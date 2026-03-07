import axios from 'axios'

// In dev, Vite proxy routes /api → localhost:8080, so use relative path
// In production, use the full backend URL from env or the deployed Render URL
const isDev = import.meta.env.DEV

const API_URL = isDev
    ? ''
    : (import.meta.env.VITE_API_URL || 'https://algoforce-backend.onrender.com').replace(/\/$/, '')

const api = axios.create({
    baseURL: isDev ? '/api' : `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
})

export { API_URL }

export const sendOTP = async (data) => {
    const response = await api.post('/contact/send-otp', data)
    return response.data
}

export const verifyAndSaveContact = async (data) => {
    const response = await api.post('/contact/verify-and-save', data)
    return response.data
}

export const submitContact = async (data) => {
    const response = await api.post('/contact/submit', data)
    return response.data
}

export default api