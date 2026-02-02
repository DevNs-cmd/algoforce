import twilio from 'twilio'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

console.log('🔥 authService.js loaded successfully')

// Initialize Twilio client (only if credentials are provided)
let client = null;
let twilioEnabled = false;

if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_SERVICE_SID) {
  client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  twilioEnabled = true;
  console.log('✅ Twilio service enabled');
} else {
  console.log('⚠️  Twilio credentials not found. Using mock OTP service for development.');
  twilioEnabled = false;
}

/**
 * Generate secure 6-digit OTP
 */
export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString()
}

/**
 * Hash OTP before saving
 */
export const hashOTP = async (otp) => {
  return await bcrypt.hash(otp, 10)
}

/**
 * Verify OTP hash
 */
export const verifyOTPHash = async (plainOTP, hashedOTP) => {
  return await bcrypt.compare(plainOTP, hashedOTP)
}

/**
 * OTP expiry (10 minutes)
 */
export const getOTPExpiry = () => {
  return new Date(Date.now() + 10 * 60 * 1000)
}

/**
 * Send OTP via Twilio SMS
 * @param {string} phoneNumber - E.164 format phone number (+1234567890)
 * @param {string} name - User's name
 * @returns {Promise<{success: boolean, sid: string, message: string}>}
 */
export const sendOTPSMS = async (phoneNumber, name = 'User') => {
  try {
    // Validate phone number format
    if (!phoneNumber || !phoneNumber.startsWith('+')) {
      throw new Error('Invalid phone number format. Must be E.164 format (+1234567890)')
    }

    if (twilioEnabled) {
      // Validate environment variables
      if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_SERVICE_SID) {
        throw new Error('Twilio credentials not configured in environment variables')
      }

      // Create verification request using Twilio Verify v2
      const verification = await client.verify.v2
        .services(process.env.TWILIO_SERVICE_SID)
        .verifications
        .create({
          to: phoneNumber,
          channel: 'sms',
          locale: 'en'
        })

      console.log('✅ OTP SMS sent via Twilio:', verification.sid)
      
      return {
        success: true,
        sid: verification.sid,
        message: 'OTP sent successfully'
      }
    } else {
      // Mock service for development
      console.log('📱 Mock OTP sent to:', phoneNumber);
      
      // In a real mock service, you'd store the OTP somewhere for verification
      // For now, we'll just return success and log the OTP for testing
      const mockOTP = generateOTP();
      console.log(`🔐 MOCK OTP for ${phoneNumber}: ${mockOTP}`);
      
      return {
        success: true,
        sid: `mock_${Date.now()}`,
        message: 'OTP sent successfully (Mock Service - Check console for OTP)'
      }
    }

  } catch (error) {
    console.error('❌ SMS error:', error)
    
    // Handle specific Twilio errors
    if (error.code === 20003) {
      throw new Error('Twilio authentication failed (check credentials)')
    }
    if (error.code === 60200) {
      throw new Error('Invalid phone number format')
    }
    if (error.code === 60203) {
      throw new Error('Phone number not valid or cannot receive SMS')
    }
    if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later')
    }
    
    throw new Error('Failed to send OTP SMS')
  }
}

/**
 * Verify OTP using Twilio Verify v2
 * @param {string} phoneNumber - E.164 format phone number
 * @param {string} otp - 6-digit code
 * @returns {Promise<{success: boolean, message: string, data: object}>}
 */
export const verifyOTPSMS = async (phoneNumber, otp) => {
  try {
    // Validate inputs
    if (!phoneNumber || !otp) {
      throw new Error('Phone number and OTP are required')
    }

    if (twilioEnabled) {
      if (!process.env.TWILIO_SERVICE_SID) {
        throw new Error('Twilio service SID not configured')
      }

      // Verify the code using Twilio Verify
      const verificationCheck = await client.verify.v2
        .services(process.env.TWILIO_SERVICE_SID)
        .verificationChecks
        .create({
          to: phoneNumber,
          code: otp
        })

      if (verificationCheck.status === 'approved') {
        console.log('✅ OTP verified successfully via Twilio')
        return {
          success: true,
          message: 'OTP verified successfully',
          data: {
            phoneNumber: verificationCheck.to,
            status: verificationCheck.status
          }
        }
      } else {
        console.log('❌ OTP verification failed')
        return {
          success: false,
          message: 'Invalid or expired OTP'
        }
      }
    } else {
      // Mock verification for development
      // In a real mock service, you'd check against stored OTPs
      // For now, we'll accept any 6-digit number as valid for testing
      if (otp.length === 6 && /^\d+$/.test(otp)) {
        console.log(`✅ OTP verified successfully (Mock Service) for ${phoneNumber}`)
        return {
          success: true,
          message: 'OTP verified successfully',
          data: {
            phoneNumber: phoneNumber,
            status: 'approved'
          }
        }
      } else {
        console.log('❌ OTP verification failed (Mock Service)')
        return {
          success: false,
          message: 'Invalid or expired OTP'
        }
      }
    }

  } catch (error) {
    console.error('❌ OTP verification error:', error)
    
    // Handle specific errors
    if (error.code === 20003) {
      throw new Error('Twilio authentication failed')
    }
    if (error.code === 60200) {
      throw new Error('Invalid phone number format')
    }
    if (error.status === 404) {
      throw new Error('Verification not found or expired')
    }
    
    throw new Error('Failed to verify OTP')
  }
}

/**
 * Check OTP validity (helper function for custom implementation)
 */
export const isOTPValid = (expiryTime) => {
  return new Date() < new Date(expiryTime)
}

/**
 * Validate phone number format (E.164)
 * @param {string} phoneNumber
 * @returns {boolean}
 */
export const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return false
  // Basic E.164 format validation (+ followed by 10-15 digits)
  return /^\+[1-9]\d{10,14}$/.test(phoneNumber)
}