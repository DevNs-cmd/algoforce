import axios from 'axios'

const API_URL = (import.meta.env.VITE_API_URL || 'https://algoforce-backend.onrender.com').replace(/\/$/, '')

const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const submitContactForm = async (data) => {
    const response = await api.post('/contact', data)
    return response.data
}

export const verifyContactOTP = async (email, otp) => {
    const response = await api.post('/contact/verify-otp', { email, otp })
    return response.data
}

export default api
