import { verifyOTPHash } from './emailService.js'
import { getDB } from '../config/database.js'
import { v4 as uuidv4 } from 'uuid'

/**
 * Check if user has submitted a contact form in the last 24 hours
 * @param {string} email - User email
 * @returns {Promise<boolean>}
 */
export const hasRecentSubmission = async (email) => {
  const db = getDB()
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000)

  const contact = await db.collection('contacts').findOne({
    email,
    submittedAt: { $gte: last24Hours }
  })

  return !!contact
}

/**
 * Check if user has requested OTP in the last 5 minutes (rate limiting)
 * @param {string} email - User email
 * @returns {Promise<boolean>}
 */
export const hasRecentOTPRequest = async (email) => {
  const db = getDB()
  const last5Minutes = new Date(Date.now() - 5 * 60 * 1000)

  const contact = await db.collection('contacts').findOne({
    email,
    otp_verified: false,
    submittedAt: { $gte: last5Minutes }
  })

  return !!contact
}

/**
 * Create a new contact entry with hashed OTP
 * @param {Object} contactData - Contact form data
 * @param {string} hashedOTP - Hashed OTP
 * @param {Date} otpExpiry - OTP expiry time
 * @returns {Promise<Object>} - Created contact record
 */
export const createContact = async (contactData, hashedOTP, otpExpiry) => {
  const db = getDB()
  const { name, company, email, role, problem, inquiryType } = contactData

  const newContact = {
    _id: uuidv4(),
    name,
    company,
    email,
    role,
    problem,
    inquiryType: inquiryType || 'demo',
    status: 'pending',
    otp: hashedOTP,
    otp_expiry: otpExpiry,
    otp_verified: false,
    submittedAt: new Date()
  }

  await db.collection('contacts').insertOne(newContact)
  return newContact
}

/**
 * Verify OTP and update contact status
 * @param {string} email - User email
 * @param {string} plainOTP - Plain text OTP from user
 * @returns {Promise<Object>} - Verification result
 */
export const verifyOTP = async (email, plainOTP) => {
  const db = getDB()

  // Find unverified contact with matching email
  const contact = await db.collection('contacts').findOne({
    email,
    otp_verified: false
  }, {
    sort: { submittedAt: -1 }
  })

  if (!contact) {
    return { success: false, message: 'Invalid email or OTP already verified' }
  }

  // Check if OTP has expired
  const now = new Date()
  if (now > contact.otp_expiry) {
    return { success: false, message: 'OTP has expired. Please request a new one.' }
  }

  // Verify hashed OTP
  const isValid = await verifyOTPHash(plainOTP, contact.otp)
  if (!isValid) {
    return { success: false, message: 'Invalid OTP code' }
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
    message: 'Email verified successfully. We will get back to you soon!',
    data: {
      id: contact._id,
      name: contact.name,
      email: contact.email
    }
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
