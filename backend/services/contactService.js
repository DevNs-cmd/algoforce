import { verifyOTPSMS, verifyOTPHash } from './authService.js'
import { getDB } from '../config/database.js'
import { v4 as uuidv4 } from 'uuid'

/**
 * Check if user has submitted a contact form in the last 24 hours
 * @param {string} identifier - User phone number
 * @returns {Promise<boolean>}
 */
export const hasRecentSubmission = async (identifier) => {
  const db = getDB()
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000)

  // Check by phone - use exact match for normalized phone number
  const contact = await db.collection('contacts').findOne({
    phone: identifier,
    submittedAt: { $gte: last24Hours }
  })

  return !!contact
}

/**
 * Check if user has requested OTP in the last 5 minutes (rate limiting)
 * @param {string} identifier - User phone number
 * @returns {Promise<boolean>}
 */
export const hasRecentOTPRequest = async (identifier) => {
  const db = getDB()
  const last5Minutes = new Date(Date.now() - 5 * 60 * 1000)

  // Check by phone - use exact match for normalized phone number
  const contact = await db.collection('contacts').findOne({
    phone: identifier,
    otp_verified: false,
    submittedAt: { $gte: last5Minutes }
  })

  return !!contact
}

/**
 * Create a new contact entry
 * @param {Object} contactData - Contact form data
 * @param {string} hashedOTP - Hashed OTP (optional for Twilio)
 * @param {Date} otpExpiry - OTP expiry time (optional for Twilio)
 * @returns {Promise<Object>} - Created contact record
 */
export const createContact = async (contactData, hashedOTP = null, otpExpiry = null) => {
  const db = getDB()
  const { name, company, phone, role, problem, inquiryType } = contactData

  const newContact = {
    _id: uuidv4(),
    name,
    company,
    phone: phone || '',
    role,
    problem,
    inquiryType: inquiryType || 'demo',
    status: 'pending',
    otp: hashedOTP,  // Will be null for Twilio (handled by Twilio service)
    otp_expiry: otpExpiry,  // Will be null for Twilio
    otp_verified: false,
    submittedAt: new Date()
  }

  await db.collection('contacts').insertOne(newContact)
  return newContact
}

/**
 * Verify OTP using Twilio and update contact status
 * @param {string} phone - User phone number
 * @param {string} plainOTP - Plain text OTP from user
 * @returns {Promise<Object>} - Verification result
 */
export const verifyOTP = async (phone, plainOTP) => {
  const db = getDB()

  // Find unverified contact with matching phone
  const contact = await db.collection('contacts').find({
    phone,
    otp_verified: false
  })
    .sort({ submittedAt: -1 })
    .limit(1)
    .next()

  if (!contact) {
    return { success: false, message: 'Invalid phone number or OTP already verified' }
  }

  try {
    // Verify OTP using service (Twilio or mock)
    const verificationResult = await verifyOTPSMS(phone, plainOTP)
    
    if (!verificationResult.success) {
      return { success: false, message: verificationResult.message }
    }

    // Update contact to verified status
    await db.collection('contacts').updateOne(
      { _id: contact._id },
      {
        $set: {
          otp_verified: true,
          status: 'verified'
        }
      }
    )

    return {
      success: true,
      message: 'Phone verified successfully. We will get back to you soon!',
      data: {
        id: contact._id,
        name: contact.name,
        phone: contact.phone
      }
    }

  } catch (error) {
    console.error('OTP verification service error:', error)
    return { success: false, message: 'Verification service error. Please try again.' }
  }
}

/**
 * Get all contacts (Admin function)
 * @returns {Promise<Array>}
 */
export const getAllContacts = async () => {
  const db = getDB()
  const contacts = await db.collection('contacts')
    .find({})
    .sort({ submittedAt: -1 })
    .toArray()

  return contacts
}

/**
 * Get contact by ID (Admin function)
 * @param {string} id - Contact ID
 * @returns {Promise<Object|null>}
 */
export const getContactById = async (id) => {
  const db = getDB()
  const contact = await db.collection('contacts').findOne({ _id: id })
  return contact
}

/**
 * Update contact status (Admin function)
 * @param {string} id - Contact ID
 * @param {string} status - New status
 * @returns {Promise<Object>}
 */
export const updateContactStatus = async (id, status) => {
  const db = getDB()

  const result = await db.collection('contacts').findOneAndUpdate(
    { _id: id },
    { $set: { status } },
    { returnDocument: 'after' }
  )

  if (!result.value) {
    throw new Error('Contact not found')
  }

  return result.value
}
