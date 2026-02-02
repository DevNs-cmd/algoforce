# 🚀 AlgoForce Backend - MongoDB & Twilio SMS OTP Setup Guide

## ✅ COMPLETED IMPLEMENTATION

### What Was Done:
1. ✅ Replaced Gmail SMTP with Twilio Verify v2 SMS OTP
2. ✅ Replaced Supabase with MongoDB native driver
3. ✅ Created auth service for Twilio integration
4. ✅ Updated contact controller with new endpoints
5. ✅ Added Docker support for containerization
6. ✅ Configured for Northflank deployment (PORT 8080)
7. ✅ Maintained all existing routes and response formats
8. ✅ Added production-ready error handling
9. ✅ Fixed SPA routing (404 on page refresh)
10. ✅ Added environment-based API URLs
11. ✅ Created comprehensive deployment guides

---

## 📋 REQUIRED SETUP STEPS

### 1️⃣ Create MongoDB Atlas Cluster

Follow the detailed setup in `MONGODB_SETUP.md`:

1. Create free M0 cluster on MongoDB Atlas
2. Configure network access and database user
3. Get your connection string
4. Set up indexes for optimal performance

### 2️⃣ Get Twilio Credentials

1. Sign up at [Twilio Console](https://console.twilio.com)
2. Get your Account SID and Auth Token
3. Create a Verify service and get Service SID
4. Keep credentials secure

### 3️⃣ Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
# Server Configuration
PORT=8080
NODE_ENV=production

# MongoDB Configuration
MONGO_URI=your_mongodb_connection_string

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

Test endpoints (see `MONGODB_SETUP.md` for detailed examples).

### 5️⃣ Deploy to Production

**Northflank (Recommended):**
- Follow `NORTHFLANK_MIGRATION_GUIDE.md`
- Set environment variables in dashboard
- Configure health check: `/api/health` on port 8080

**Alternative Platforms:**
- Render, Railway, or Heroku
- Use PORT 8080
- All environment variables required

---

## 🔒 SECURITY FEATURES IMPLEMENTED

✅ **MongoDB Connection Security:**
- Connection strings in environment variables
- Proper authentication with database user
- Connection pooling and automatic reconnection

✅ **Twilio Verify v2 Security:**
- Phone numbers validated in E.164 format
- Rate limiting prevents SMS spam
- 10-minute OTP expiration

✅ **Data Validation:**
- Server-side validation for all inputs
- Phone number format validation
- MongoDB injection protection

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

---

## 🌐 DEPLOYMENT CHECKLIST

- [x] Run `backend/database/setup.sql` in Supabase SQL Editor
- [x] Verify RLS is enabled on contacts table
- [x] Get Gmail App Password
- [x] Get Supabase Service Role Key (NOT anon key)
- [x] Create `.env` file with all credentials
- [x] Test locally with `npm start`
- [x] Verify OTP email delivery works
- [x] Test complete flow end-to-end
- [x] Deploy to production server
- [x] Update CORS origins in `server.js` if needed
- [x] Monitor Supabase logs for any errors
- [x] **NEW**: Configure SPA routing for direct URL access
- [x] **NEW**: Add environment-based API URLs
- [x] **NEW**: Fix CSS @import errors in production
- [x] **NEW**: Add Render deployment configuration

### Render Deployment

The project includes `render.yaml` for easy deployment to Render:

```yaml
services:
  - type: web
    name: algoforce-backend
    runtime: node
    env: node
    region: oregon
    plan: free
    rootDir: backend
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: SUPABASE_SERVICE_ROLE_KEY
        sync: false
      - key: GMAIL_USER
        sync: false
      - key: GMAIL_APP_PASS
        sync: false
    healthCheckPath: /api/health
```

### Environment-Based API URLs

Frontend uses environment variables for API endpoints:

- **Development**: `VITE_API_URL=http://localhost:5000`
- **Production**: `VITE_API_URL=https://algoforce-backend.onrender.com`

Configured in:
- `frontend/.env.development` (local development)
- `frontend/.env.production` (production build)

### SPA Routing Fix

To prevent 404 errors on page refresh in production:

1. **Frontend** uses BrowserRouter with catch-all route
2. **Vite** configured for SPA builds
3. **Backend** serves `index.html` for all non-API routes

### CSS Import Fix

Fixed `@import rules are not allowed here` error by moving component CSS imports from individual JSX files to `frontend/src/index.css` to prevent Constructable Stylesheets API conflicts in production.

### Testing Production Build Locally

```bash
# Build frontend
cd frontend
npm run build

# Start backend (serves frontend)
cd ../backend
npm start

# Test at http://localhost:5000
# Try refreshing /contact, /pricing - should work!
```

### SPA Redirect Configuration

**Netlify**: Already configured in `netlify.toml` with SPA redirects:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Vercel**: Add `vercel.json` with rewrites:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 🎯 API ENDPOINTS

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/contact` | Submit form + send OTP | Public |
| POST | `/api/contact/verify-otp` | Verify OTP code | Public |
| GET | `/api/contact` | Get all contacts | Admin |
| GET | `/api/contact/:id` | Get contact by ID | Admin |
| PUT | `/api/contact/:id` | Update contact status | Admin |

---

## 📝 NOTES

- **No frontend changes needed** - existing form continues to work
- **Existing routes preserved** - no breaking changes
- **JSON file storage removed** - all data now in Supabase
- **Production-ready** - comprehensive error handling
- **Clean code** - separation of concerns with service layers

---

## ❓ TROUBLESHOOTING

**Issue: Email not sending**
- Check Gmail App Password is correct (16 chars, no spaces)
- Verify 2FA is enabled on Gmail account
- Check GMAIL_USER and GMAIL_APP_PASS in .env

**Issue: Supabase errors**
- Verify SUPABASE_KEY is the anon/public key, not service_role
- Ensure table exists and matches schema above
- Check Supabase project is active

**Issue: OTP expired**
- Default expiry is 10 minutes
- User must verify within 10 minutes
- They can request new OTP (with 5min cooldown)

---

## 🎉 READY FOR PRODUCTION

Your backend is now fully integrated with:
- ✅ Supabase database
- ✅ Gmail OTP verification
---

## 🎯 FINAL STEPS

After setup is complete:

✅ Ensure MongoDB Atlas cluster is running
✅ Ensure Twilio Verify service is active
✅ Add all environment variables to your deployment platform
✅ Test with real phone numbers for production

Deploy following documentation:
- See `NORTHFLANK_MIGRATION_GUIDE.md` for Northflank (recommended)
- See `RENDER_DEPLOYMENT_GUIDE.md` for Render (still supported)
- Both platforms work with PORT 8080

⚠️ **Important**: The service is ready for production after successful local testing!

For detailed MongoDB setup instructions, see `MONGODB_SETUP.md`.

---

✅ Production-grade security
✅ Clean, maintainable code
✅ No breaking changes
✅ Eliminates cold-start lag
✅ SMS-based verification
✅ Container-ready with Docker

Deploy with confidence! 🚀
