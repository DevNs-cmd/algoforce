import { validationResult } from 'express-validator'
import { generateOTP, getOTPExpiry, sendOTPEmail, hashOTP } from '../services/emailService.js'
import {
  hasRecentSubmission,
  hasRecentOTPRequest,
  createContact,
  verifyOTP as verifyOTPService,
  getAllContacts as getAllContactsService,
  getContactById as getContactByIdService,
  updateContactStatus as updateContactStatusService
} from '../services/contactService.js'

// @desc    Submit contact form and send OTP
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
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

    // Check if user has submitted within last 24 hours
    const hasRecent24h = await hasRecentSubmission(email)
    if (hasRecent24h) {
      return res.status(429).json({
        success: false,
        message: 'You have already submitted a request recently. We will get back to you soon.'
      })
    }

    // Check if user has requested OTP within last 5 minutes (rate limiting)
    const hasRecent5min = await hasRecentOTPRequest(email)
    if (hasRecent5min) {
      return res.status(429).json({
        success: false,
        message: 'Please wait 5 minutes before requesting a new OTP.'
      })
    }

    // Generate OTP and hash it for storage
    const otp = generateOTP()
    const hashedOTP = await hashOTP(otp)
    const otpExpiry = getOTPExpiry()

    // Save contact to Supabase with hashed OTP
    const contact = await createContact(
      { name, company, email, role, problem, inquiryType },
      hashedOTP,
      otpExpiry
    )

    // Send plain OTP via email (user will enter this)
    await sendOTPEmail(email, otp, name)

    res.status(201).json({
      success: true,
      message: 'OTP sent to your email'
    })
  } catch (error) {
    console.error('Contact submission error:', error)

    // If it's a specific email error, pass it to the client for debugging
    if (error.message.includes('authentication') || error.message.includes('GMAIL')) {
      return res.status(500).json({
        success: false,
        message: `Email Authentication Failed: ${error.message}. Please check your GMAIL_USER and GMAIL_APP_PASS in the Render environment variables.`
      })
    }

    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    })
  }
}

// @desc    Verify OTP
// @route   POST /api/contact/verify-otp
// @access  Public
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      })
    }

    // Verify OTP
    const result = await verifyOTPService(email, otp)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message
      })
    }

    res.status(200).json({
      success: true,
      message: result.message,
      data: result.data
    })
  } catch (error) {
    console.error('OTP verification error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    })
  }
}

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Admin (future)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await getAllContactsService()

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    })
  } catch (error) {
    console.error('Get contacts error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    })
  }
}

// @desc    Get contact by ID
// @route   GET /api/contact/:id
// @access  Admin (future)
export const getContactById = async (req, res) => {
  try {
    const contact = await getContactByIdService(req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }

    res.status(200).json({
      success: true,
      data: contact
    })
  } catch (error) {
    console.error('Get contact error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    })
  }
}

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Admin (future)
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      })
    }

    const contact = await updateContactStatusService(req.params.id, status)

    res.status(200).json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    })
  } catch (error) {
    console.error('Update contact error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    })
  }
}
