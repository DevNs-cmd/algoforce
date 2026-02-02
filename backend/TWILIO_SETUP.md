# Twilio SMS OTP Setup Guide

## Prerequisites

1. **Twilio Account** - Sign up at [https://www.twilio.com/](https://www.twilio.com/)
2. **Verify Phone Number** - You'll need to verify your phone number in Twilio console
3. **Get Credits** - Twilio provides $15 free credit for new accounts

## Setup Steps

### 1. Get Your Twilio Credentials

1. Log into your [Twilio Console](https://console.twilio.com/)
2. Navigate to **Account Info** section
3. Copy these values:
   - **Account SID** (starts with AC...)
   - **Auth Token** (keep this secret)

### 2. Create a Verify Service

1. In Twilio Console, go to **Verify** → **Services**
2. Click **Create Service**
3. Name it "AlgoForce OTP"
4. Copy the **Service SID** (starts with VA...)

### 3. Set Environment Variables

Add these to your deployment platform (Render/Northflank):

```
TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_SERVICE_SID=VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 4. Phone Number Requirements

- **Format**: Use E.164 format: `+1234567890` (include country code)
- **Supported Countries**: Most countries are supported
- **Testing**: You can only send to verified numbers on free accounts

## Testing Your Setup

### Local Testing

1. Create a `.env` file in your backend directory:
```bash
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_SERVICE_SID=your_service_sid
```

2. Test with curl:
```bash
# Send OTP
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "company": "Test Company",
    "phone": "+1234567890",
    "role": "Developer",
    "problem": "Testing OTP system",
    "inquiryType": "demo"
  }'

# Verify OTP
curl -X POST http://localhost:8080/api/contact/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+1234567890",
    "otp": "123456"
  }'
```

### Northflank Deployment

1. **Environment Variables**: Set all three Twilio variables in Northflank dashboard
2. **Health Check**: Use `GET /` endpoint for keep-alive
3. **Port**: Make sure port is set to `8080`

## Pricing Information

### Twilio Verify Pricing (as of 2024)
- **SMS Verification**: ~$0.05 - $0.10 per message
- **Free Tier**: $15 credit for new accounts
- **Volume Discounts**: Available for high usage

### Cost Examples
- 100 verifications = ~$5-10
- 1,000 verifications = ~$50-100

## Troubleshooting

### Common Issues

1. **"Invalid phone number format"**
   - Solution: Use E.164 format (+1234567890)

2. **"Rate limit exceeded"**
   - Solution: Wait 1 minute between requests

3. **"Phone number not valid"**
   - Solution: Verify the number in Twilio console or use a different number

4. **"Authentication failed"**
   - Solution: Check TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN

### Logs to Check

Look for these success messages:
- `✅ authService.js loaded and verified successfully`
- `✅ OTP SMS sent: XXXXXXXX`
- `✅ OTP verified successfully`

Error messages to watch for:
- `❌ Twilio authentication failed`
- `❌ Invalid phone number format`
- `❌ Rate limit exceeded`

## Security Best Practices

1. **Environment Variables**: Never commit credentials to git
2. **Rate Limiting**: Built-in 5-minute cooldown per phone number
3. **24-hour Limit**: One submission per phone per 24 hours
4. **HTTPS**: Always use HTTPS in production
5. **Logging**: Avoid logging sensitive information

## Migration from Gmail SMTP

### What Changed
- ✅ Replaced email OTP with SMS OTP
- ✅ Better deliverability (no spam folders)
- ✅ Faster delivery (~2-5 seconds vs 30+ seconds)
- ✅ No authentication timeouts
- ✅ Works globally with phone numbers

### Database Impact
- Phone numbers stored instead of emails for verification
- Backward compatibility maintained for existing email records
- No data migration required

## Support

For Twilio support: [https://support.twilio.com/](https://support.twilio.com/)
For AlgoForce issues: Check server logs and environment variables