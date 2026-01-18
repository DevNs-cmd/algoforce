import express from 'express'
import { body, validationResult } from 'express-validator'
import rateLimit from 'express-rate-limit'
import { v4 as uuidv4 } from 'uuid'
import { readContacts, writeContacts } from '../utils/fileStore.js'

const router = express.Router()

/* ---------------- RATE LIMIT (ANTI-SPAM) ---------------- */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // max 20 submissions per IP
  message: {
    success: false,
    message: 'Too many requests. Please try again later.'
  }
})

/* ---------------- VALIDATION ---------------- */
const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('role').trim().notEmpty().withMessage('Role is required'),
  body('problem').trim().notEmpty().withMessage('Problem description is required'),
  body('inquiryType').optional().trim()
]

/* ---------------- POST /api/contact ---------------- */
router.post('/', contactLimiter, contactValidation, async (req, res) => {
  try {
    // Validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { name, company, email, role, problem, inquiryType } = req.body

    const contacts = await readContacts()

    // Check recent submission (24 hours)
    const last24Hours = Date.now() - 24 * 60 * 60 * 1000
    const recentSubmission = contacts.find(
      c => c.email === email && new Date(c.submittedAt).getTime() >= last24Hours
    )

    if (recentSubmission) {
      return res.status(429).json({
        success: false,
        message: 'You have already submitted a request recently. We will get back to you soon.'
      })
    }

    const newContact = {
      id: uuidv4(),
      name,
      company,
      email,
      role,
      problem,
      inquiryType: inquiryType || 'demo',
      status: 'new',
      submittedAt: new Date().toISOString()
    }

    contacts.push(newContact)
    await writeContacts(contacts)

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: newContact.id,
        name: newContact.name,
        email: newContact.email
      }
    })
  } catch (error) {
    console.error('Contact submission error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    })
  }
})

export default router
