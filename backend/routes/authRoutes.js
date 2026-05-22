import express from 'express'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import rateLimit from 'express-rate-limit'
import { OAuth2Client } from 'google-auth-library'
import {
    comparePassword,
    createUser,
    findUserByEmail,
    findUserByGoogleOrEmail,
    findUserById,
    publicUser,
    updateUser
} from '../services/userService.js'

const router = express.Router()
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { success: false, message: 'Too many auth attempts. Please try again later.' }
})

const signToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET || 'algoforce-dev-secret',
        { expiresIn: '7d' }
    )
}

router.post(
    '/register',
    authLimiter,
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }

        try {
            const { name, email, password } = req.body
            const existing = await findUserByEmail(email)
            if (existing) {
                return res.status(409).json({ success: false, message: 'Email already registered' })
            }

            const user = await createUser({ name, email, password })
            const token = signToken(user._id)
            res.status(201).json({ success: true, token, user: publicUser(user) })
        } catch (err) {
            console.error('Register error:', err)
            res.status(500).json({ success: false, message: 'Registration failed' })
        }
    }
)

router.post(
    '/login',
    authLimiter,
    [
        body('email').isEmail().withMessage('Valid email required'),
        body('password').notEmpty().withMessage('Password required')
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }

        try {
            const { email, password } = req.body
            const user = await findUserByEmail(email)
            if (!user || !(await comparePassword(user, password))) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' })
            }

            const updatedUser = await updateUser(user._id, { lastLogin: new Date() })
            const token = signToken(updatedUser._id)
            res.json({ success: true, token, user: publicUser(updatedUser) })
        } catch (err) {
            console.error('Login error:', err)
            res.status(500).json({ success: false, message: 'Login failed' })
        }
    }
)

router.post('/google', authLimiter, async (req, res) => {
    try {
        const { credential } = req.body
        if (!credential) {
            return res.status(400).json({ success: false, message: 'Google credential required' })
        }

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        const payload = ticket.getPayload()
        const { sub: googleId, email, name, picture } = payload

        let user = await findUserByGoogleOrEmail(googleId, email)
        if (!user) {
            user = await createUser({ name, email, googleId, avatar: picture })
        } else {
            user = await updateUser(user._id, { googleId, avatar: picture, lastLogin: new Date() })
        }

        const token = signToken(user._id)
        res.json({ success: true, token, user: publicUser(user) })
    } catch (err) {
        console.error('Google auth error:', err)
        res.status(401).json({ success: false, message: 'Google authentication failed' })
    }
})

router.get('/me', async (req, res) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'No token provided' })
        }

        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'algoforce-dev-secret')
        const user = await findUserById(decoded.userId)
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        res.json({ success: true, user: publicUser(user) })
    } catch (err) {
        res.status(401).json({ success: false, message: 'Invalid token' })
    }
})

export default router
