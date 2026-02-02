import express from 'express'
import { body } from 'express-validator'
import rateLimit from 'express-rate-limit'
import {
  sendOTP,
  verifyAndSave,
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

const otpVerifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 OTP verification attempts per IP
  message: {
    success: false,
    message: 'Too many verification attempts. Please try again later.'
  }
})

// ---------------- VALIDATION ----------------
const sendOTPValidation = [
  body('phone').trim().notEmpty().withMessage('Phone number is required').matches(/^\+[1-9]\d{10,14}$/).withMessage('Phone number must be in E.164 format (e.g., +1234567890)')
]

const verifyAndSaveValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required').matches(/^\+[1-9]\d{10,14}$/).withMessage('Phone number must be in E.164 format (e.g., +1234567890)'),
  body('role').trim().notEmpty().withMessage('Role is required'),
  body('problem').trim().notEmpty().withMessage('Problem description is required'),
  body('inquiryType').optional().trim(),
  body('otp').trim().notEmpty().withMessage('OTP is required').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')
]

/* ---------------- SEND OTP ROUTE ---------------- */
router.post(
  '/send-otp',
  contactLimiter,
  sendOTPValidation,
  sendOTP
)

/* ---------------- VERIFY AND SAVE ROUTE ---------------- */
router.post(
  '/verify-and-save',
  otpVerifyLimiter,
  verifyAndSaveValidation,
  verifyAndSave
)

/* ---------------- ADMIN ROUTES (OPTIONAL) ---------------- */
/* These work with JSON file too */
router.get('/', getAllContacts)
router.get('/:id', getContactById)
router.put('/:id', updateContactStatus)

export default router
