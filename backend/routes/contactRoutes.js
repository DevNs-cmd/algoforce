import express from 'express'
import { body } from 'express-validator'
import rateLimit from 'express-rate-limit'
import {
  submitContact,
  getAllContacts,
  getContactById,
  updateContactStatus
} from '../controllers/contactController.js'

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

/* ---------------- PUBLIC ROUTE ---------------- */
router.post(
  '/',
  contactLimiter,
  contactValidation,
  submitContact
)

/* ---------------- ADMIN ROUTES (OPTIONAL) ---------------- */
/* These work with JSON file too */
router.get('/', getAllContacts)
router.get('/:id', getContactById)
router.put('/:id', updateContactStatus)

export default router
