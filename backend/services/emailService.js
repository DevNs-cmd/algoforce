import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

/**
 * Create nodemailer transporter for Gmail with production-ready settings
 */
const createTransporter = () => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS) {
    throw new Error('Gmail credentials not configured. Check GMAIL_USER and GMAIL_APP_PASS in .env')
  }

  return nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    },
    // Additional options for production stability
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    rateDelta: 1000,
    rateLimit: 5
  })
}

/**
 * Generate secure 6-digit OTP
 * @returns {string} - 6-digit OTP
 */
export const generateOTP = () => {
  // Use crypto for more secure random number generation
  const randomNum = crypto.randomInt(100000, 999999)
  return randomNum.toString()
}

/**
 * Hash OTP before storing in database
 * @param {string} otp - Plain text OTP
 * @returns {Promise<string>} - Hashed OTP
 */
export const hashOTP = async (otp) => {
  const saltRounds = 10
  return await bcrypt.hash(otp, saltRounds)
}

/**
 * Verify OTP against hashed version
 * @param {string} plainOTP - Plain text OTP from user
 * @param {string} hashedOTP - Hashed OTP from database
 * @returns {Promise<boolean>} - True if match
 */
export const verifyOTPHash = async (plainOTP, hashedOTP) => {
  return await bcrypt.compare(plainOTP, hashedOTP)
}

/**
 * Calculate OTP expiry time (10 minutes from now)
 * @returns {Date} - Expiry timestamp
 */
export const getOTPExpiry = () => {
  return new Date(Date.now() + 10 * 60 * 1000)
}

/**
 * Verify transporter connection
 * @returns {Promise<boolean>} - True if connection successful
 */
const verifyTransporter = async (transporter) => {
  try {
    await transporter.verify()
    console.log('✅ Email transporter connection verified')
    return true
  } catch (error) {
    console.error('❌ Email transporter verification failed:', error.message)
    throw new Error(`Email service unavailable: ${error.message}`)
  }
}

/**
 * Send OTP email to user
 * @param {string} email - User email
 * @param {string} otp - Generated OTP
 * @param {string} name - User name
 * @returns {Promise<void>}
 */
export const sendOTPEmail = async (email, otp, name) => {
  try {
    const transporter = createTransporter()

    // Verify connection before sending
    await verifyTransporter(transporter)

    const mailOptions = {
      from: `AlgoForce <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Verify Your Contact Request - AlgoForce',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .otp-box { background: white; border: 2px dashed #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
            .otp-code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 8px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>AlgoForce</h1>
              <p>Email Verification</p>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>Thank you for contacting AlgoForce. To complete your request, please verify your email address using the OTP below:</p>

              <div class="otp-box">
                <p style="margin: 0; font-size: 14px; color: #666;">Your One-Time Password</p>
                <div class="otp-code">${otp}</div>
              </div>

              <div class="warning">
                <strong>⚠️ Important:</strong>
                <ul style="margin: 10px 0 0 0;">
                  <li>This OTP will expire in <strong>10 minutes</strong></li>
                  <li>Do not share this code with anyone</li>
                  <li>If you didn't request this, please ignore this email</li>
                </ul>
              </div>

              <p>If you have any questions, feel free to reach out to our team.</p>

              <p style="margin-top: 30px;">
                Best regards,<br>
                <strong>The AlgoForce Team</strong>
              </p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} AlgoForce. All rights reserved.</p>
              <p>This is an automated email. Please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Email sent successfully:', info.messageId)

  } catch (error) {
    console.error('❌ Failed to send email:', error.message)

    // Provide specific error messages
    if (error.code === 'ETIMEDOUT') {
      throw new Error('Email service timed out. Please try again later.')
    } else if (error.code === 'EAUTH') {
      throw new Error('Email authentication failed. Check Gmail credentials.')
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('Email service connection refused. Check network settings.')
    } else {
      throw new Error(`Email sending failed: ${error.message}`)
    }
  }
}

/**
 * Check if OTP is still valid
 * @param {Date} expiryTime - OTP expiry timestamp
 * @returns {boolean}
 */
export const isOTPValid = (expiryTime) => {
  return new Date() < new Date(expiryTime)
}
