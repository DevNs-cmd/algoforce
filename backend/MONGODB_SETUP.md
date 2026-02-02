# 📦 AlgoForce Backend - MongoDB Setup Guide

## ✅ COMPLETED IMPLEMENTATION

### What Was Done:
1. ✅ Replaced Supabase with MongoDB native driver
2. ✅ Implemented Twilio Verify v2 for SMS OTP
3. ✅ Created auth service for phone verification
4. ✅ Updated contact controller with new endpoints
5. ✅ Added Docker support for containerization
6. ✅ Configured for Northflank deployment (PORT 8080)
7. ✅ Maintained all existing routes and response formats
8. ✅ Added production-ready error handling
9. ✅ Fixed SPA routing (404 on page refresh)
10. ✅ Added environment-based API URLs

---

## 📋 REQUIRED SETUP STEPS

### 1️⃣ Create MongoDB Atlas Cluster

1. **Sign up/Login**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a free account or login

2. **Create Cluster**
   - Click "Build a Database"
   - Select "M0 FREE" tier
   - Choose cloud provider and region
   - Click "Create Cluster"

3. **Configure Security**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - For development: Add your current IP
   - For production: Add `0.0.0.0/0` (allow all) or specific IPs

4. **Create Database User**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter username and password
   - Assign "Read and write to any database" role
   - Click "Add User"

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Select "Node.js" driver
   - Copy the connection string
   - Replace `<password>` with your user password

### 2️⃣ Get Twilio Credentials

1. **Sign up/Login**
   - Go to [Twilio Console](https://console.twilio.com)
   - Create a free account or login

2. **Get Account SID and Auth Token**
   - In the dashboard, find "Account SID" and "Auth Token"
   - Keep the Auth Token secure

3. **Create Verify Service**
   - Go to "Verify" → "Services"
   - Click "Create Service"
   - Name it "AlgoForce OTP"
   - Copy the "Service SID"

### 3️⃣ Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
# Server Configuration
PORT=8080
NODE_ENV=production

# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/algoforce?retryWrites=true&w=majority

# Twilio SMS OTP Configuration
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_SERVICE_SID=your_service_sid_here
```

### 4️⃣ Test the Integration

Start the server:
```bash
cd backend
npm start
```

Test endpoints:

**1. Send OTP to Phone:**
```bash
POST /api/contact/send-otp
Content-Type: application/json

{
  "phone": "+1234567890"
}

Expected Response:
{
  "success": true,
  "message": "OTP sent to your phone"
}
```

**2. Verify OTP and Save Contact:**
```bash
POST /api/contact/verify-and-save
Content-Type: application/json

{
  "name": "John Doe",
  "company": "TechCorp",
  "email": "john@example.com",
  "phone": "+1234567890",
  "role": "CTO",
  "problem": "Need AI solutions",
  "inquiryType": "demo",
  "otp": "123456"
}

Expected Response:
{
  "success": true,
  "message": "Phone verified successfully. We will get back to you soon!",
  "data": {
    "id": "objectid-here",
    "name": "John Doe",
    "phone": "+1234567890"
  }
}
```

---

## 🔒 SECURITY FEATURES IMPLEMENTED

✅ **MongoDB Connection Security:**
- Uses MongoDB native driver with connection pooling
- Connection string stored in environment variables
- Automatic reconnection handling
- Proper error handling for connection failures

✅ **Twilio Verify v2 Security:**
- Uses Twilio's secure verification service
- Phone numbers validated in E.164 format
- Rate limiting prevents SMS spam
- 10-minute OTP expiration

✅ **Data Validation:**
- Server-side validation for all inputs
- Phone number format validation
- MongoDB injection protection
- Rate limiting on API endpoints

✅ **Rate Limiting:**
- 24-hour submission limit per phone number
- 5-minute cooldown between OTP requests
- Automatic IP-based rate limiting

---

## 📊 MONGODB COLLECTION STRUCTURE

### contacts Collection

| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Primary key (auto-generated) |
| `name` | String | Contact name |
| `company` | String | Company name |
| `email` | String | Email address |
| `phone` | String | Phone number (E.164 format) |
| `role` | String | User role/position |
| `problem` | String | Problem description |
| `inquiryType` | String | Type of inquiry |
| `status` | String | Status (pending/verified/contacted) |
| `otpHash` | String | **HASHED** OTP code (bcrypt) |
| `otpExpiry` | Date | OTP expiration time |
| `otpVerified` | Boolean | Whether OTP is verified |
| `submittedAt` | Date | Submission timestamp |

**Indexes:**
- `_id`: Primary index (default)
- `phone`: For quick phone lookups
- `submittedAt`: For time-based queries
- `otpVerified`: For verification status queries

---

## 🔄 COMPLETE FLOW

1. **User submits contact form** → `POST /api/contact/send-otp`
   - Backend validates phone number format
   - Checks for recent submissions (24h block)
   - Checks for OTP spam (5min cooldown)
   - Generates 6-digit OTP
   - Sends SMS via Twilio Verify v2
   - Returns: `{ success: true, message: "OTP sent to your phone" }`

2. **User receives SMS** → Opens phone with OTP code

3. **User submits contact details + OTP** → `POST /api/contact/verify-and-save`
   - Backend validates all form fields
   - Verifies OTP using Twilio Verify v2
   - Saves complete contact to MongoDB
   - Updates `otpVerified=true`, `status='verified'`
   - Returns success message

4. **Admin can view contacts** → `GET /api/contact`
   - Retrieves all contacts from MongoDB
   - Sorted by submission date
   - Filter by verification status

---

## 🚀 DEPLOYMENT OPTIONS

### Northflank (Recommended)
- **Port**: 8080
- **Health Check**: `/api/health`
- **Environment Variables**: All required variables
- **Build Command**: `npm install`
- **Run Command**: `node server.js`

### Alternative Platforms
- **Render**: Still supported with PORT 8080
- **Railway**: Easy Node.js deployment
- **Heroku**: Classic choice

See `NORTHFLANK_MIGRATION_GUIDE.md` for complete deployment instructions.

---

## 🛠️ TROUBLESHOOTING

**MongoDB Connection Issues:**
- Check if IP is whitelisted in Atlas
- Verify connection string format
- Ensure database user has correct permissions
- Check network connectivity

**Twilio SMS Not Sending:**
- Verify Account SID and Auth Token
- Check if Verify service is active
- Ensure phone number is in E.164 format
- Check Twilio account balance

**OTP Verification Failing:**
- Verify OTP hasn't expired (10 minutes)
- Check phone number matches exactly
- Ensure no typos in OTP code
- Verify Twilio service configuration

**Rate Limiting Errors:**
- Wait for cooldown period (5 minutes)
- Use different phone number for testing
- Check if IP is being rate limited