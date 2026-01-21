# AlgoForce Website - Setup Instructions

## 🚀 Quick Start Guide

Follow these steps to get the AlgoForce website running with Supabase database and Gmail OTP verification.

### Step 1: Install Dependencies

Open PowerShell in the project root directory and run:

```powershell
# Install Frontend Dependencies
cd frontend
npm install

# Install Backend Dependencies
cd ../backend
npm install

cd ..
```

### Step 2: Setup Environment Variables

Create a `.env` file in the `backend` directory:

```powershell
cd backend
New-Item -Path ".env" -ItemType File
```

Add the following content to `backend/.env`:
```env
PORT=5000
NODE_ENV=development

# Supabase Configuration (CRITICAL: Use SERVICE_ROLE_KEY)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Gmail SMTP Configuration (Use App Password, NOT regular password)
GMAIL_USER=yourname@gmail.com
GMAIL_APP_PASS=your_16_character_app_password
```

**Important**: See the detailed instructions below for getting these credentials.

### Step 3: Setup Supabase Database

#### A. Create Supabase Account & Project

1. Go to https://supabase.com
2. Create a free account
3. Create a new project
4. Wait for project initialization (~2 minutes)

#### B. Get Supabase Credentials

**CRITICAL: Backend MUST use SERVICE_ROLE_KEY**

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the `service_role` `secret` key (**NOT** the anon/public key)
3. Add it to your `backend/.env` file as `SUPABASE_SERVICE_ROLE_KEY`
4. **WARNING**: This key bypasses RLS - keep it secret!
5. Never expose this key in frontend code or public repos

#### C. Create Contacts Table with RLS

**IMPORTANT**: Use the provided SQL setup script for security

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Open the file: `backend/database/setup.sql`
4. Copy the ENTIRE contents and paste into SQL Editor
5. Click **Run** to execute
6. Verify:
   - Table created in **Table Editor**
   - RLS enabled (lock icon appears on table)
   - Policies created (click table → Policies tab)

This script includes:
- Complete table structure
- Row Level Security (RLS) policies
- Performance indexes
- Security configurations

### Step 4: Setup Gmail App Password

**Important**: You MUST use a Gmail App Password, NOT your regular Gmail password.

#### Steps:

1. **Enable 2-Factor Authentication** on your Gmail account:
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select **Mail** as the app
   - Select **Other** as the device
   - Name it "AlgoForce Backend"
   - Click **Generate**

3. **Copy the 16-character password** (it will be shown only once)

4. **Add to `.env` file**:
   ```env
   GMAIL_USER=yourname@gmail.com
   GMAIL_APP_PASS=abcdefghijklmnop  # Your 16-char app password (no spaces)
   ```

**Note**: Never use your regular Gmail password in the code.

### Step 5: Start the Application

#### Using Two Terminal Windows:

**Terminal 1 - Start Backend:**
```powershell
cd backend
npm run dev
```

You should see:
```
🚀 AlgoForce Backend running on port 5000
📊 Environment: development
```

**Terminal 2 - Start Frontend:**
```powershell
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:3000/
```

### Step 6: Access the Website

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health

## 📋 Verification Checklist

- [ ] Node.js installed (v16+)
- [ ] Supabase account created
- [ ] Supabase project created
- [ ] Contacts table created in Supabase
- [ ] Supabase service_role key added to .env
- [ ] Gmail 2FA enabled
- [ ] Gmail App Password generated
- [ ] Gmail credentials added to .env
- [ ] Frontend dependencies installed
- [ ] Backend dependencies installed
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000 (or shown)
- [ ] Website loads in browser
- [ ] Contact form submission works
- [ ] OTP email received
- [ ] OTP verification works

## 🔧 Troubleshooting

### Port Already in Use

If port 3000 or 5000 is already in use:

**Find and kill the process:**
```powershell
# For port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# For port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB Connection Error

**Not applicable** - We're using Supabase now!

If you see Supabase connection errors:
1. Check your `SUPABASE_SERVICE_ROLE_KEY` in `.env`
2. Verify you're using the service_role key (NOT anon key)
3. Ensure your Supabase project is active
4. Check the Supabase URL matches: `https://nhuhltyaiwhooqzgcqiw.supabase.co`
5. Verify RLS policies are correctly configured

### Module Not Found Errors

Re-install dependencies:
```powershell
# Frontend
cd frontend
Remove-Item -Recurse -Force node_modules
npm install

# Backend
cd ../backend
Remove-Item -Recurse -Force node_modules
npm install
```

### CORS Errors

The backend is already configured with CORS. If you still see issues:
1. Check that backend is running on port 5000
2. Verify proxy in `frontend/vite.config.js`

### Email Not Sending

1. Verify Gmail App Password is correct (16 characters, no spaces)
2. Check 2FA is enabled on Gmail account
3. Ensure `GMAIL_USER` is your full email address
4. Try generating a new App Password
5. Check backend logs for specific error messages

## 🎨 Testing the Website

1. **Homepage**: Navigate to http://localhost:3000
   - Check hero animation
   - Scroll through all sections
   - Test smooth scrolling

2. **Pricing Page**: Click "Pricing" in navigation
   - Verify all pricing tiers display
   - Check FAQ section

3. **Contact Page**: Click "Contact" or "Request Demo"
   - Fill out the form
   - Submit
   - **Check your email for OTP** (check spam folder too)
   - Enter the 6-digit OTP code
   - Submit OTP
   - Verify success message
   - Check backend terminal for confirmation
   - Verify Supabase entry:
     - Go to Supabase dashboard
     - Table Editor → contacts
     - Verify `otp_verified` = true and `status` = 'verified'

## 📱 Mobile Testing

Test responsiveness:
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test different screen sizes:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1920px

## 🔒 Production Deployment

### Frontend (Vercel/Netlify)

1. Build the frontend:
```powershell
cd frontend
npm run build
```

2. Deploy the `dist` folder

**SPA Routing Fix**: The frontend is configured to handle direct URL access. When deploying:
- **Netlify**: Already configured in `netlify.toml` with SPA redirects
- **Vercel**: Add `vercel.json` with rewrites:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Backend (Render/Railway/Heroku)

1. Update `.env` with production values:
```env
NODE_ENV=production
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
GMAIL_USER=your_production_gmail
GMAIL_APP_PASS=your_production_app_password
```

**CRITICAL**: Always use SERVICE_ROLE_KEY on backend!

2. Update CORS in `backend/server.js` with your production domain

3. Deploy backend code

**Render Deployment**: The project includes `render.yaml` for easy deployment to Render:

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

**Environment-Based API URLs**: Frontend uses environment variables for API endpoints:
- **Development**: `VITE_API_URL=http://localhost:5000`
- **Production**: `VITE_API_URL=https://algoforce-backend.onrender.com`

Configured in `frontend/.env.development` and `frontend/.env.production`

**CSS Import Fix**: Fixed `@import rules are not allowed here` error by moving component CSS imports from individual JSX files to `frontend/src/index.css` to prevent Constructable Stylesheets API conflicts in production.

**Testing Production Build Locally**:
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

**See `backend/DEPLOYMENT_SETUP.md` for complete deployment guide.**

## 📞 Need Help?

Common issues:
- **Animations not working?** Check if framer-motion is installed
- **Forms not submitting?** Check Supabase connection and credentials
- **Email not sending?** Verify Gmail App Password and 2FA
- **OTP not working?** Check OTP hasn't expired (10-minute limit)
- **Styling issues?** Verify Tailwind CSS configuration

**For detailed troubleshooting, see `backend/DEPLOYMENT_SETUP.md`**

## 🎯 Next Steps

After setup:
1. Test the complete OTP flow end-to-end
2. Customize email template in `backend/services/emailService.js`
3. Customize brand colors in `tailwind.config.js`
4. Add your logo to `frontend/src/assets`
5. Update content in section components
6. Configure Supabase row-level security policies
7. Set up email notifications for admin
8. Add analytics tracking

---

**Setup complete! You now have a fully functional AlgoForce website with OTP email verification running locally.** 🎉
