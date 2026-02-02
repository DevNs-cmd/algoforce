import axios from 'axios'

const API_URL = (import.meta.env.VITE_API_URL || 
                (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
                 ? 'http://localhost:5000' 
                 : 'https://algoforce-backend.onrender.com')).replace(/\/$/, '')

const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const sendOTP = async (phone) => {
    const response = await api.post('/contact/send-otp', { phone })
    return response.data
}

export const verifyAndSaveContact = async (data) => {
    const response = await api.post('/contact/verify-and-save', data)
    return response.data
}

export default api
