import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

console.log('🔥 emailService.js loaded successfully')

/**
 * Build Gmail transporter (production-ready)
 */
const buildMailer = () => {
  if (!process.env.GMAIL_APP_PASS) {
    throw new Error('❌ GMAIL_APP_PASS not configured in environment variables')
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'algoforceofficial.12@gmail.com',
      pass: process.env.GMAIL_APP_PASS
    },
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    rateDelta: 1000,
    rateLimit: 5
  })
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
 * Validate transporter connection
 */
const verifyTransporter = async (transporter) => {
  await transporter.verify()
  console.log('✅ Email transporter verified')
}

/**
 * Send OTP email
 */
export const sendOTPEmail = async (email, otp, name = 'User') => {
  try {
    const transporter = buildMailer()
    await verifyTransporter(transporter)

    const mailOptions = {
      from: `"AlgoForce" <algoforceofficial.12@gmail.com>`,
      to: email,
      subject: 'Verify Your Email – AlgoForce',
      html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
        <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:25px;text-align:center;">
            <h1>AlgoForce</h1>
            <p>Email Verification</p>
          </div>

          <div style="padding:30px;color:#333;">
            <h2>Hello ${name},</h2>
            <p>Please use the OTP below to verify your request:</p>

            <div style="margin:25px 0;padding:20px;border:2px dashed #667eea;text-align:center;">
              <div style="font-size:34px;letter-spacing:8px;font-weight:bold;color:#667eea;">
                ${otp}
              </div>
            </div>

            <ul>
              <li>OTP valid for <strong>10 minutes</strong></li>
              <li>Do not share this code</li>
              <li>Ignore if not requested</li>
            </ul>

            <p style="margin-top:30px;">
              Regards,<br/>
              <strong>AlgoForce Team</strong>
            </p>
          </div>

          <div style="text-align:center;font-size:12px;color:#777;padding:15px;">
            © ${new Date().getFullYear()} AlgoForce. Automated email.
          </div>
        </div>
      </body>
      </html>
      `
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ OTP email sent:', info.messageId)

  } catch (error) {
    console.error('❌ Email error:', error)

    if (error.code === 'EAUTH') {
      throw new Error('Gmail authentication failed (check App Password)')
    }
    if (error.code === 'ETIMEDOUT') {
      throw new Error('Email service timeout')
    }

    throw new Error('Failed to send OTP email')
  }
}

/**
 * Check OTP validity
 */
export const isOTPValid = (expiryTime) => {
  return new Date() < new Date(expiryTime)
}
