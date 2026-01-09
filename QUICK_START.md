# 🚀 AlgoForce - Quick Start

Get the website running in under 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- [ ] Node.js installed (v16 or higher)
- [ ] MongoDB installed or MongoDB Atlas account
- [ ] PowerShell or Terminal access

## Option 1: Automated Setup (Recommended)

Run the automated installation script:

```powershell
.\install.ps1
```

This will:
- Check for Node.js and npm
- Install all frontend dependencies
- Install all backend dependencies  
- Create .env file automatically
- Show you next steps

## Option 2: Manual Setup

### Step 1: Install Dependencies (2 minutes)

```powershell
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### Step 2: Configure Environment (30 seconds)

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/algoforce
NODE_ENV=development
```

### Step 3: Start MongoDB (30 seconds)

**Local MongoDB:**
```powershell
net start MongoDB
```

**Or use MongoDB Atlas** (free tier):
1. Go to mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update MONGODB_URI in .env

### Step 4: Run the Application (1 minute)

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

You should see:
```
🚀 AlgoForce Backend running on port 5000
MongoDB Connected: localhost:27017
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x ready in xxx ms
➜  Local:   http://localhost:3000/
```

### Step 5: Open Browser

Navigate to: **http://localhost:3000**

## ✅ Success Checklist

Your website should now be running! Check:

- [ ] Homepage loads with animated hero section
- [ ] Navigation works (Home, Pricing, Contact)
- [ ] Smooth scrolling between sections
- [ ] Contact form is visible
- [ ] No console errors in browser DevTools

## 🧪 Test the Contact Form

1. Go to Contact page
2. Fill out the form:
   - Name: Test User
   - Company: Test Corp
   - Email: test@example.com
   - Role: Developer
   - Problem: Testing the form
3. Click "Send Message"
4. You should see success message

Verify in MongoDB:
```powershell
mongosh
use algoforce
db.contacts.find().pretty()
```

## 📱 Test Responsive Design

1. Open browser DevTools (F12)
2. Click device toolbar (Ctrl+Shift+M)
3. Test different sizes:
   - iPhone: 375px
   - iPad: 768px
   - Desktop: 1920px

## 🎨 Explore the Website

### Homepage Sections:
1. **Hero** - Animated entrance with CTAs
2. **What is AlgoForce** - Feature explanation
3. **How It Works** - 4-step timeline
4. **Product Modules** - 5 core modules
5. **Why AlgoForce** - Comparison table
6. **Who It's For** - Target segments

### Other Pages:
- **Pricing** - 3 tiers + enterprise solutions
- **Contact** - Working form with MongoDB

## 🔧 Common Issues & Fixes

### Port Already in Use
```powershell
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB Connection Error
```powershell
# Check if MongoDB is running
net start MongoDB

# Or check MongoDB service status
sc query MongoDB
```

### Module Not Found
```powershell
# Re-install dependencies
cd frontend
Remove-Item -Recurse -Force node_modules
npm install

cd ../backend
Remove-Item -Recurse -Force node_modules
npm install
```

### Animations Not Working
Make sure GSAP and Framer Motion are installed:
```powershell
cd frontend
npm install framer-motion gsap
```

## 🎯 Next Steps

Now that it's running:

1. **Customize Content**
   - Edit section text in `frontend/src/components/sections/`
   - Update pricing in `frontend/src/pages/Pricing.jsx`

2. **Add Your Logo**
   - Place logo in `frontend/src/assets/`
   - Update in `frontend/src/components/common/Navigation.jsx`

3. **Change Colors**
   - Edit `frontend/tailwind.config.js`
   - Update brand colors (navy, purple)

4. **Deploy**
   - Frontend: Vercel (recommended)
   - Backend: Railway (recommended)
   - Database: MongoDB Atlas

## 📚 Documentation

- **Full Setup**: See `SETUP_INSTRUCTIONS.md`
- **Customization**: See `CUSTOMIZATION_GUIDE.md`
- **Project Overview**: See `README.md`
- **What Was Built**: See `PROJECT_SUMMARY.md`

## 🎓 Understanding the Code

### Frontend Structure
```
frontend/src/
├── components/
│   ├── common/      # Reusable (Navigation, Footer)
│   └── sections/    # Page sections (Hero, Features)
├── pages/           # Full pages (Home, Pricing, Contact)
├── App.jsx         # Main app with routing
└── main.jsx        # Entry point
```

### Backend Structure
```
backend/
├── config/          # Database connection
├── models/          # MongoDB schemas
├── controllers/     # Business logic
├── routes/          # API endpoints
└── server.js       # Express server
```

## 💡 Pro Tips

1. **Keep both terminals open** while developing
2. **Use browser DevTools** to debug
3. **Check MongoDB** to verify form submissions
4. **Read inline comments** in component files
5. **Start small** when customizing

## 🚨 Need Help?

1. Check the error message in terminal
2. Look for red errors in browser console (F12)
3. Verify MongoDB is running
4. Check that ports 3000 and 5000 are available
5. Refer to `SETUP_INSTRUCTIONS.md` for detailed troubleshooting

## ✨ You're Ready!

The AlgoForce website is now running on your machine. 

Time to customize it and make it your own! 🎉

---

**Total Setup Time: ~5 minutes**  
**Next: Customize your content and deploy!**
