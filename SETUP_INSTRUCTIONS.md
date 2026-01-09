# AlgoForce Website - Setup Instructions

## 🚀 Quick Start Guide

Follow these steps to get the AlgoForce website running on your local machine.

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
MONGODB_URI=mongodb://localhost:27017/algoforce
NODE_ENV=development
```

### Step 3: Install & Start MongoDB

#### Option A: Local MongoDB

1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Install MongoDB
3. Start MongoDB service:
```powershell
net start MongoDB
```

#### Option B: MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `backend/.env` with your connection string

### Step 4: Start the Application

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
MongoDB Connected: ...
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

### Step 5: Access the Website

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health

## 📋 Verification Checklist

- [ ] Node.js installed (v16+)
- [ ] MongoDB running
- [ ] Frontend dependencies installed
- [ ] Backend dependencies installed
- [ ] .env file created in backend
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] Website loads in browser
- [ ] Contact form submission works

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

1. Ensure MongoDB is running:
```powershell
net start MongoDB
```

2. Check connection string in `.env`
3. Try connecting manually:
```powershell
mongosh
# or
mongo
```

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
   - Check backend terminal for confirmation
   - Verify MongoDB entry:
   ```powershell
   mongosh
   use algoforce
   db.contacts.find().pretty()
   ```

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

### Backend (Railway/Heroku)

1. Update `.env` with production values
2. Use MongoDB Atlas for production database
3. Deploy backend code

## 📞 Need Help?

Common issues:
- Animations not working? Check if framer-motion is installed
- Forms not submitting? Check MongoDB connection
- Styling issues? Verify Tailwind CSS configuration

## 🎯 Next Steps

After setup:
1. Customize brand colors in `tailwind.config.js`
2. Add your logo to `frontend/src/assets`
3. Update content in section components
4. Configure email notifications for form submissions
5. Add analytics tracking

---

**Setup complete! You now have a fully functional AlgoForce website running locally.** 🎉
