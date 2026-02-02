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
  console.log('✅ Twilio configured');
} else {
  console.log('⚠️  Using mock OTP service');
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
 * Send OTP via Twilio
 * @param {string} phoneNumber - Phone number to send OTP to
 * @returns {Promise<{success: boolean, sid: string, message: string, phoneNumber: string}>}
 */
const sendTwilioOTP = async (normalizedPhone) => {
  try {
    // Validate environment variables
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_SERVICE_SID) {
      return {
        success: false,
        message: 'Twilio credentials not configured in environment variables'
      };
    }

    // Create verification request using Twilio Verify v2
    const verification = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verifications
      .create({
        to: normalizedPhone,
        channel: 'sms',
        locale: 'en'
      })

    console.log('✅ OTP SMS sent via Twilio to', normalizedPhone, ':', verification.sid)
    
    return {
      success: true,
      sid: verification.sid,
      message: 'OTP sent successfully',
      phoneNumber: normalizedPhone
    }
  } catch (error) {
    console.error('❌ Twilio SMS error:', error)
    
    // Handle specific Twilio errors with mapped messages
    if (error.code === 20003) {
      return {
        success: false,
        message: 'Twilio authentication failed (check credentials)'
      };
    }
    if (error.code === 60200) {
      return {
        success: false,
        message: 'Invalid phone number format'
      };
    }
    if (error.code === 60203) {
      return {
        success: false,
        message: 'Phone number not valid or cannot receive SMS'
      };
    }
    if (error.code === 20404) {
      return {
        success: false,
        message: 'Invalid phone number or unsupported carrier'
      };
    }
    if (error.status === 429) {
      return {
        success: false,
        message: 'Rate limit exceeded. Please try again later'
      };
    }
    
    // Log the actual Twilio error code for debugging
    if (error.code) {
      console.error('Twilio error code:', error.code);
    }
    
    return {
      success: false,
      message: 'Failed to send OTP SMS'
    };
  }
};

/**
 * Send mock OTP for development
 * @param {string} normalizedPhone - Normalized phone number
 * @returns {Promise<{success: boolean, sid: string, message: string, phoneNumber: string}>}
 */
const sendMockOTP = async (normalizedPhone) => {
  try {
    console.log('📱 Mock OTP sent to:', normalizedPhone);
    
    // In a real mock service, you'd store the OTP somewhere for verification
    // For now, we'll just return success and log the OTP for testing
    const mockOTP = generateOTP();
    console.log(`🔐 MOCK OTP for ${normalizedPhone}: ${mockOTP}`);
    
    return {
      success: true,
      sid: `mock_${Date.now()}`,
      message: 'OTP sent successfully (Mock Service - Check console for OTP)',
      phoneNumber: normalizedPhone
    };
  } catch (error) {
    console.error('❌ Mock OTP error:', error);
    return {
      success: false,
      message: 'Failed to send mock OTP'
    };
  }
};

/**
 * Main function to send OTP SMS - handles environment-based switching
 * @param {string} phoneNumber - Phone number to send OTP to
 * @param {string} name - User's name (not used but kept for interface compatibility)
 * @returns {Promise<{success: boolean, sid: string, message: string, phoneNumber: string}>}
 */
export const sendOTPSMS = async (phoneNumber, name = 'User') => {
  try {
    // Normalize phone number to E.164 format
    const normalizedPhone = normalizePhoneNumber(phoneNumber);
    
    // Validate phone number format
    if (!validatePhoneNumber(normalizedPhone)) {
      return {
        success: false,
        message: 'Invalid phone number format. Must be E.164 format (+1234567890)',
        phoneNumber: normalizedPhone
      };
    }

    // Environment-based switching
    if (twilioEnabled) {
      return await sendTwilioOTP(normalizedPhone);
    } else {
      return await sendMockOTP(normalizedPhone);
    }
  } catch (error) {
    console.error('❌ Unexpected error in sendOTPSMS:', error);
    return {
      success: false,
      message: 'Unexpected error occurred while sending OTP',
      phoneNumber: phoneNumber
    };
  }
};

/**
 * Verify OTP via Twilio
 * @param {string} phoneNumber - Phone number to verify
 * @param {string} otp - OTP code to verify
 * @returns {Promise<{success: boolean, message: string, data: object}>}
 */
const verifyTwilioOTP = async (phoneNumber, otp) => {
  try {
    if (!process.env.TWILIO_SERVICE_SID) {
      return {
        success: false,
        message: 'Twilio service SID not configured'
      };
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
      console.log('✅ OTP verified successfully via Twilio');
      return {
        success: true,
        message: 'OTP verified successfully',
        data: {
          phoneNumber: verificationCheck.to,
          status: verificationCheck.status
        }
      };
    } else {
      console.log('❌ OTP verification failed');
      return {
        success: false,
        message: verificationCheck.status === 'canceled' ? 'OTP already verified' : 'Invalid or expired OTP'
      };
    }
  } catch (error) {
    console.error('❌ Twilio verification error:', error);
    
    // Handle specific errors
    if (error.code === 20003) {
      return {
        success: false,
        message: 'Twilio authentication failed'
      };
    }
    if (error.code === 60200) {
      return {
        success: false,
        message: 'Invalid phone number format'
      };
    }
    if (error.status === 404) {
      return {
        success: false,
        message: 'Verification not found or expired'
      };
    }
    if (error.code === 60202) {
      return {
        success: false,
        message: 'Invalid or expired OTP'
      };
    }
    if (error.code === 60208) {
      return {
        success: false,
        message: 'OTP already verified'
      };
    }
    
    return {
      success: false,
      message: 'Failed to verify OTP'
    };
  }
};

/**
 * Verify mock OTP for development
 * @param {string} phoneNumber - Phone number to verify
 * @param {string} otp - OTP code to verify
 * @returns {Promise<{success: boolean, message: string, data: object}>}
 */
const verifyMockOTP = async (phoneNumber, otp) => {
  try {
    // In a real mock service, you'd check against stored OTPs
    // For now, we'll accept any 6-digit number as valid for testing
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      console.log(`✅ OTP verified successfully (Mock Service) for ${phoneNumber}`);
      return {
        success: true,
        message: 'OTP verified successfully',
        data: {
          phoneNumber: phoneNumber,
          status: 'approved'
        }
      };
    } else {
      console.log('❌ OTP verification failed (Mock Service)');
      return {
        success: false,
        message: 'Invalid or expired OTP'
      };
    }
  } catch (error) {
    console.error('❌ Mock verification error:', error);
    return {
      success: false,
      message: 'Failed to verify mock OTP'
    };
  }
};

/**
 * Verify OTP SMS - handles environment-based switching
 * @param {string} phoneNumber - E.164 format phone number
 * @param {string} otp - 6-digit code
 * @returns {Promise<{success: boolean, message: string, data: object}>}
 */
export const verifyOTPSMS = async (phoneNumber, otp) => {
  try {
    // Validate inputs
    if (!phoneNumber || !otp) {
      return {
        success: false,
        message: 'Phone number and OTP are required'
      };
    }

    // Validate phone number format
    if (!validatePhoneNumber(phoneNumber)) {
      return {
        success: false,
        message: 'Invalid phone number format. Must be E.164 format (+1234567890)'
      };
    }

    // Environment-based switching
    if (twilioEnabled) {
      return await verifyTwilioOTP(phoneNumber, otp);
    } else {
      return await verifyMockOTP(phoneNumber, otp);
    }
  } catch (error) {
    console.error('❌ Unexpected error in verifyOTPSMS:', error);
    return {
      success: false,
      message: 'Unexpected error occurred while verifying OTP'
    };
  }
};

/**
 * Check OTP validity (helper function for custom implementation)
 */
export const isOTPValid = (expiryTime) => {
  return new Date() < new Date(expiryTime)
}

/**
 * Normalize phone number to E.164 format
 * @param {string} phoneNumber
 * @returns {string}
 */
export const normalizePhoneNumber = (phoneNumber) => {
  // Remove all non-digit characters except +
  let normalized = phoneNumber.replace(/[^\d+]/g, '');
  
  // Ensure it starts with +
  if (!normalized.startsWith('+')) {
    normalized = '+' + normalized;
  }
  
  return normalized;
};

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