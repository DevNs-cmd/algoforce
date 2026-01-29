# Render.com Deployment Guide for AlgoForce Backend

## 🚀 Quick Deployment Steps

### 1. Prepare Your Repository
Ensure your backend code is in a separate directory (e.g., `backend/`) in your repository.

### 2. Create a New Web Service on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New+"** → **"Web Service"**
3. Connect your GitHub repository

### 3. Configure Your Web Service

**Basic Settings:**
- **Name:** `algoforce-backend`
- **Region:** Choose closest to your users
- **Branch:** `main` (or your deployment branch)
- **Root Directory:** `backend` ← **IMPORTANT**
- **Environment:** `Node`

**Build Settings:**
- **Build Command:** `npm install`
- **Start Command:** `node server.js`

### 4. Set Environment Variables

In the **Environment Variables** section, add:

```
MONGO_URI=your_mongodb_connection_string
GMAIL_APP_PASS=your_gmail_app_password
NODE_ENV=production
```

**How to get these:**
- **MONGO_URI:** From MongoDB Atlas or your MongoDB provider
- **GMAIL_APP_PASS:** 
  1. Enable 2-factor authentication on your Gmail account
  2. Generate an App Password: https://myaccount.google.com/apppasswords
  3. Use the 16-character code (no spaces)

### 5. Advanced Settings (Optional)
- **Auto-Deploy:** Enable for automatic deployments on push
- **Health Check Path:** `/api/health`
- **Instance Type:** Free or Starter (depending on your needs)

### 6. Deploy
Click **"Create Web Service"** and wait for deployment to complete.

---

## 🛠️ Troubleshooting Common Issues

### Issue: `ENOENT: no such file or directory, scandir '/opt/render/project/src/backend/backend'`

**Solution:** This is fixed in the updated `server.js`. The directory scanning now:
- Uses `process.cwd()` instead of hardcoded paths
- Checks if directories exist before scanning
- Gracefully handles missing directories
- Doesn't crash the application

### Issue: `PORT is not binding correctly`

**Solution:** The server now:
- Uses `process.env.PORT` with fallback to 5000
- Binds to `0.0.0.0` for external access
- Logs the exact port and binding information

### Issue: `Module not found` errors

**Solution:** 
- Ensure **Root Directory** is set to `backend`
- Check that `package.json` is in the `backend/` directory
- Verify all dependencies are in `dependencies` (not `devDependencies`)

### Issue: MongoDB connection fails

**Solution:**
- Check your `MONGO_URI` format: `mongodb+srv://username:password@cluster.url/database`
- Ensure IP whitelist includes `0.0.0.0/0` (for Render's dynamic IPs)
- Verify database name exists

### Issue: Email service not working

**Solution:**
- Double-check your Gmail App Password
- Ensure `GMAIL_APP_PASS` is set correctly (16 characters, no spaces)
- Check Render logs for specific error messages

---

## 🔍 Diagnostic Tools

### Run Deployment Helper Locally
```bash
cd backend
node DEPLOYMENT_HELPER.js
```

This script will:
- Check environment variables
- Verify directory structure
- Validate `server.js` and `package.json`
- Provide deployment readiness report

### Check Render Logs
1. Go to your Render service dashboard
2. Click **"Logs"** tab
3. Look for:
   - `✅` Success messages
   - `❌` Error messages
   - `🔍` Diagnostic information

---

## 🧪 Testing Your Deployment

### 1. Health Check Endpoint
```
GET https://your-service.onrender.com/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "AlgoForce API is running",
  "time": "2024-01-29T10:00:00.000Z",
  "emailServiceLoaded": true
}
```

### 2. Test Contact Endpoint
```
POST https://your-service.onrender.com/api/contact/send
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "message": "This is a test message"
}
```

---

## 📊 Monitoring

### Render Dashboard
- **Overview:** CPU, memory, and response time metrics
- **Logs:** Real-time application logs
- **Deploys:** Deployment history and status

### Custom Monitoring
Add this to your frontend to check backend status:
```javascript
fetch('https://your-service.onrender.com/api/health')
  .then(res => res.json())
  .then(data => console.log('Backend status:', data))
  .catch(err => console.error('Backend down:', err));
```

---

## 🔐 Security Best Practices

1. **Environment Variables:**
   - Never commit `.env` files
   - Use strong, unique passwords
   - Rotate credentials regularly

2. **MongoDB:**
   - Enable database access control
   - Use IP whitelist (0.0.0.0/0 for Render)
   - Enable encryption at rest

3. **Gmail:**
   - Use App Passwords (not your main password)
   - Enable 2-factor authentication
   - Monitor account activity

4. **API Security:**
   - Implement rate limiting (already included)
   - Validate all inputs
   - Use HTTPS (Render provides this automatically)

---

## 🔄 Updates & Maintenance

### Deploying Updates
1. Push changes to your GitHub repository
2. Render will automatically deploy (if Auto-Deploy is enabled)
3. Or manually trigger deploy from Render dashboard

### Rollback
1. Go to Render dashboard
2. Click **"Deploys"** tab
3. Find the working deploy
4. Click **"Rollback to this deploy"**

### Scaling
- **Free Tier:** Sleeps after 15 minutes of inactivity
- **Starter Tier:** Always on ($7/month)
- **Pro Tier:** Custom scaling options

---

## 💬 Support

If you encounter issues:
1. Check Render logs for error messages
2. Run the diagnostic script locally
3. Verify all environment variables are set
4. Ensure your MongoDB and Gmail credentials are correct
5. Check Render status: https://status.render.com/

**Common fix for the original error:**
The issue with `scandir '/opt/render/project/src/backend/backend'` has been resolved in the updated `server.js`. The new version:
- Uses proper path resolution
- Handles missing directories gracefully
- Provides clear error messages
- Doesn't crash on missing folders

Your deployment should now work without this error.