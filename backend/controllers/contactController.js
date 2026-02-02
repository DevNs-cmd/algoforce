import { validationResult } from 'express-validator'
import { sendOTPSMS, validatePhoneNumber, normalizePhoneNumber } from '../services/authService.js'
import {
  hasRecentSubmission,
  hasRecentOTPRequest,
  createContact,
  verifyOTP as verifyOTPService,
  getAllContacts as getAllContactsService,
  getContactById as getContactByIdService,
  updateContactStatus as updateContactStatusService
} from '../services/contactService.js'

// @desc    Send OTP to phone number
// @route   POST /api/contact/send-otp
// @access  Public
export const sendOTP = async (req, res) => {
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

    const { phone } = req.body

    // Normalize phone number to E.164 format
    const normalizedPhone = normalizePhoneNumber(phone);

    // Validate phone number
    if (!normalizedPhone || !validatePhoneNumber(normalizedPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Valid phone number is required (E.164 format: +1234567890)'
      })
    }

    // Check if user has requested OTP within last 5 minutes (rate limiting)
    const hasRecent5min = await hasRecentOTPRequest(normalizedPhone)
    if (hasRecent5min) {
      return res.status(429).json({
        success: false,
        message: 'Please wait 5 minutes before requesting a new OTP.'
      })
    }

    // Send OTP via Twilio SMS
    const smsResult = await sendOTPSMS(normalizedPhone)
    if (!smsResult.success) {
      return res.status(400).json({
        success: false,
        message: smsResult.message
      })
    }

    res.status(200).json({
      success: true,
      message: 'OTP sent to your phone number',
      phone: normalizedPhone
    })
  } catch (error) {
    console.error('Send OTP error:', error)

    // Handle specific error types
    if (error.message.includes('Invalid phone number') || error.message.includes('format')) {
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Server error. Please try again later.'
    })
  }
}



// @desc    Verify OTP and save contact enquiry
// @route   POST /api/contact/verify-and-save
// @access  Public
export const verifyAndSave = async (req, res) => {
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

    const { name, company, phone, role, problem, inquiryType, otp } = req.body

    // Normalize phone number to E.164 format
    const normalizedPhone = normalizePhoneNumber(phone);

    // Validate required fields
    if (!normalizedPhone || !validatePhoneNumber(normalizedPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Valid phone number is required (E.164 format: +1234567890)'
      })
    }

    if (!otp || otp.length !== 6) {
      return res.status(400).json({
        success: false,
        message: 'Valid 6-digit OTP is required'
      })
    }

    // Check if user has submitted within last 24 hours
    const hasRecent24h = await hasRecentSubmission(normalizedPhone)
    if (hasRecent24h) {
      return res.status(429).json({
        success: false,
        message: 'You have already submitted a request recently. We will get back to you soon.'
      })
    }

    // Verify OTP using Twilio
    const verificationResult = await verifyOTPService(normalizedPhone, otp)
    
    if (!verificationResult.success) {
      return res.status(400).json({
        success: false,
        message: verificationResult.message
      })
    }

    // Save contact to database after successful verification
    const contact = await createContact(
      { name, company, phone: normalizedPhone, role, problem, inquiryType },
      null, // No local OTP hash needed
      null  // No local expiry needed
    )

    res.status(201).json({
      success: true,
      message: 'Contact enquiry saved successfully',
      data: {
        contactId: contact._id,
        name: contact.name
      }
    })
  } catch (error) {
    console.error('Verify and save error:', error)

    // Handle specific error types
    if (error.message.includes('already verified') || error.message.includes('already approved')) {
      return res.status(409).json({
        success: false,
        message: 'This OTP has already been verified.'
      })
    }
    
    if (error.message.includes('expired') || error.message.includes('not found')) {
      return res.status(400).json({
        success: false,
        message: 'This OTP has expired or is invalid.'
      })
    }
    
    if (error.message.includes('Invalid') || error.message.includes('incorrect')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please check and try again.'
      })
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Server error. Please try again later.'
    })
  }
}

// @desc    Verify OTP via Twilio
// @route   POST /api/contact/verify-otp
// @access  Public


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
