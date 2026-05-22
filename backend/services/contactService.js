import { verifyOTPSMS } from './authService.js'
import { getSupabase } from '../config/database.js'

const toContact = (row) => {
  if (!row) return null

  return {
    _id: row.id,
    id: row.id,
    name: row.name,
    company: row.company,
    phone: row.phone,
    email: row.email,
    role: row.role,
    problem: row.problem,
    inquiryType: row.inquiry_type,
    status: row.status,
    otp: row.otp,
    otp_expiry: row.otp_expiry,
    otp_verified: row.otp_verified,
    submittedAt: row.submitted_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

const findContactByIdentifier = async (identifier) => {
  const supabase = getSupabase()
  const normalized = (identifier || '').toLowerCase().trim()

  const queries = []
  if (identifier) {
    queries.push(
      supabase
        .from('contacts')
        .select('*')
        .eq('phone', identifier)
        .order('submitted_at', { ascending: false })
        .limit(1)
        .maybeSingle()
    )
  }
  if (normalized && normalized.includes('@')) {
    queries.push(
      supabase
        .from('contacts')
        .select('*')
        .eq('email', normalized)
        .order('submitted_at', { ascending: false })
        .limit(1)
        .maybeSingle()
    )
  }

  for (const query of queries) {
    const { data, error } = await query
    if (error) throw error
    if (data) return data
  }

  return null
}

const findExistingContact = async (phone, email) => {
  const supabase = getSupabase()
  const normalizedEmail = email ? email.toLowerCase().trim() : ''

  const phoneResult = phone
    ? await supabase.from('contacts').select('*').eq('phone', phone).limit(1).maybeSingle()
    : { data: null, error: null }
  if (phoneResult.error) throw phoneResult.error
  if (phoneResult.data) return phoneResult.data

  if (normalizedEmail) {
    const emailResult = await supabase.from('contacts').select('*').eq('email', normalizedEmail).limit(1).maybeSingle()
    if (emailResult.error) throw emailResult.error
    if (emailResult.data) return emailResult.data
  }

  return null
}

export const hasRecentSubmission = async (identifier) => {
  const contact = await findContactByIdentifier(identifier)
  if (!contact?.submitted_at) return false

  const submittedAt = new Date(contact.submitted_at).getTime()
  return submittedAt >= Date.now() - 24 * 60 * 60 * 1000
}

export const hasRecentOTPRequest = async (identifier) => {
  const contact = await findContactByIdentifier(identifier)
  if (!contact?.submitted_at || contact.otp_verified) return false

  const submittedAt = new Date(contact.submitted_at).getTime()
  return submittedAt >= Date.now() - 5 * 60 * 1000
}

export const createContact = async (contactData, hashedOTP = null, otpExpiry = null) => {
  const supabase = getSupabase()
  const { name, company, phone, email, role, problem, inquiryType } = contactData
  const normalizedEmail = email ? email.toLowerCase().trim() : ''
  const existingContact = await findExistingContact(phone, normalizedEmail)

  const payload = {
    name,
    company,
    phone,
    email: normalizedEmail,
    role,
    problem,
    inquiry_type: inquiryType || 'demo',
    status: contactData.status || 'pending',
    otp: hashedOTP,
    otp_expiry: otpExpiry ? otpExpiry.toISOString() : null,
    otp_verified: contactData.otp_verified || false,
    updated_at: new Date().toISOString()
  }

  if (existingContact) {
    const { data, error } = await supabase
      .from('contacts')
      .update(payload)
      .eq('id', existingContact.id)
      .select()
      .single()

    if (error) throw error
    return toContact(data)
  }

  const { data, error } = await supabase
    .from('contacts')
    .insert({
      ...payload,
      submitted_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return toContact(data)
}

export const verifyOTP = async (phone, plainOTP) => {
  const supabase = getSupabase()
  const { data: contact, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('phone', phone)
    .eq('otp_verified', false)
    .order('submitted_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw error
  if (!contact) {
    return { success: false, message: 'Invalid phone number or OTP already verified' }
  }

  try {
    const verificationResult = await verifyOTPSMS(phone, plainOTP)
    if (!verificationResult.success) {
      return { success: false, message: verificationResult.message }
    }

    const { error: updateError } = await supabase
      .from('contacts')
      .update({
        otp_verified: true,
        status: 'verified',
        otp: null,
        otp_expiry: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', contact.id)

    if (updateError) throw updateError

    return {
      success: true,
      message: 'Phone verified successfully. We will get back to you soon!',
      data: {
        id: contact.id,
        name: contact.name,
        phone: contact.phone,
        email: contact.email
      }
    }
  } catch (error) {
    console.error('OTP verification service error:', error)
    return { success: false, message: 'Verification service error. Please try again.' }
  }
}

export const getAllContacts = async () => {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('submitted_at', { ascending: false })

  if (error) throw error
  return (data || []).map(toContact)
}

export const getContactById = async (id) => {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return toContact(data)
}

export const updateContactStatus = async (id, status) => {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('contacts')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return toContact(data)
}
