import { supabase } from '../config/supabase.js'
import { verifyOTPHash } from './emailService.js'

/**
 * Check if user has submitted a contact form in the last 24 hours
 * @param {string} email - User email
 * @returns {Promise<boolean>}
 */
export const hasRecentSubmission = async (email) => {
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

  const { data, error } = await supabase
    .from('contacts')
    .select('id')
    .eq('email', email)
    .gte('submitted_at', last24Hours)
    .limit(1)

  if (error) {
    throw new Error(`Database error: ${error.message}`)
  }

  return data && data.length > 0
}

/**
 * Check if user has requested OTP in the last 5 minutes (rate limiting)
 * @param {string} email - User email
 * @returns {Promise<boolean>}
 */
export const hasRecentOTPRequest = async (email) => {
  const last5Minutes = new Date(Date.now() - 5 * 60 * 1000).toISOString()

  const { data, error } = await supabase
    .from('contacts')
    .select('id, submitted_at')
    .eq('email', email)
    .gte('submitted_at', last5Minutes)
    .is('otp_verified', false)
    .limit(1)

  if (error) {
    throw new Error(`Database error: ${error.message}`)
  }

  return data && data.length > 0
}

/**
 * Create a new contact entry with hashed OTP
 * @param {Object} contactData - Contact form data
 * @param {string} hashedOTP - Hashed OTP
 * @param {Date} otpExpiry - OTP expiry time
 * @returns {Promise<Object>} - Created contact record
 */
export const createContact = async (contactData, hashedOTP, otpExpiry) => {
  const { name, company, email, role, problem, inquiryType } = contactData

  const { data, error } = await supabase
    .from('contacts')
    .insert([
      {
        name,
        company,
        email,
        role,
        problem,
        inquiryType: inquiryType || 'demo',
        status: 'pending',
        otp: hashedOTP, // Store hashed OTP for security
        otp_expiry: otpExpiry.toISOString(),
        otp_verified: false,
        submitted_at: new Date().toISOString()
      }
    ])
    .select()
    .single()

  if (error) {
    // Log error for debugging but don't expose internal details
    console.error('[Supabase Error] Failed to create contact:', error.message, error.code)
    throw new Error(`Failed to create contact: ${error.message}`)
  }

  return data
}

/**
 * Verify OTP and update contact status
 * @param {string} email - User email
 * @param {string} plainOTP - Plain text OTP from user
 * @returns {Promise<Object>} - Verification result
 */
export const verifyOTP = async (email, plainOTP) => {
  try {
    // Fetch contact with matching email (unverified only)
    const { data: contacts, error: fetchError } = await supabase
      .from('contacts')
      .select('*')
      .eq('email', email)
      .eq('otp_verified', false)
      .order('submitted_at', { ascending: false })
      .limit(1)

    if (fetchError) {
      console.error('[Supabase Error] Failed to fetch contact for OTP verification:', fetchError.message)
      throw new Error(`Database error: ${fetchError.message}`)
    }

    if (!contacts || contacts.length === 0) {
      return { success: false, message: 'Invalid email or OTP already verified' }
    }

    const contact = contacts[0]

    // Check if OTP has expired
    const now = new Date()
    const expiryTime = new Date(contact.otp_expiry)

    if (now > expiryTime) {
      return { success: false, message: 'OTP has expired. Please request a new one.' }
    }

    // Verify hashed OTP
    const isValid = await verifyOTPHash(plainOTP, contact.otp)

    if (!isValid) {
      return { success: false, message: 'Invalid OTP code' }
    }

    // Update contact to verified status
    const { error: updateError } = await supabase
      .from('contacts')
      .update({
        otp_verified: true,
        status: 'verified'
      })
      .eq('id', contact.id)

    if (updateError) {
      console.error('[Supabase Error] Failed to update verification status:', updateError.message)
      throw new Error(`Failed to verify contact: ${updateError.message}`)
    }

    return {
      success: true,
      message: 'Email verified successfully. We will get back to you soon!',
      data: {
        id: contact.id,
        name: contact.name,
        email: contact.email
      }
    }
  } catch (error) {
    console.error('[OTP Verification Error]:', error)
    throw error
  }
}

/**
 * Get all contacts (Admin function)
 * @returns {Promise<Array>}
 */
export const getAllContacts = async () => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('submitted_at', { ascending: false })

  if (error) {
    throw new Error(`Database error: ${error.message}`)
  }

  return data || []
}

/**
 * Get contact by ID (Admin function)
 * @param {string} id - Contact ID
 * @returns {Promise<Object|null>}
 */
export const getContactById = async (id) => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null // Not found
    }
    throw new Error(`Database error: ${error.message}`)
  }

  return data
}

/**
 * Update contact status (Admin function)
 * @param {string} id - Contact ID
 * @param {string} status - New status
 * @returns {Promise<Object>}
 */
export const updateContactStatus = async (id, status) => {
  const { data, error } = await supabase
    .from('contacts')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update contact: ${error.message}`)
  }

  return data
}
