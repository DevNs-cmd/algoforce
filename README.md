# AlgoForce - Official Website

Enterprise-grade AI Business Operating System website built with the MERN stack.

## 🎯 Overview

This is a premium, category-defining product website that explains AlgoForce—an AI Business OS that eliminates revenue leaks and compounds intelligence.

## 🧩 Tech Stack

- **Frontend**: React + Vite, Tailwind CSS
- **Animations**: React Bits Components, Framer Motion
- **Backend**: Node.js + Express
- **Database**: MongoDB (Node.js native driver)
- **SMS**: Twilio Verify v2 with phone OTP verification
- **State Management**: React Hooks
- **Styling**: Tailwind CSS with glassmorphism effects

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- Twilio account with Verify service enabled
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd "AlgoForce Official Website OS"
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../backend
npm install
```

4. **Setup Environment Variables**

Create a `.env` file in the `backend` directory:
```env
PORT=8080
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=your_mongodb_connection_string

# Twilio SMS OTP (Use Account SID, Auth Token, and Service SID)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_SERVICE_SID=your_twilio_verify_service_sid
```

**Note**: See `backend/.env.example` for detailed setup instructions.

5. **Setup MongoDB Database**

Create a MongoDB Atlas cluster:
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free M0 cluster
3. Add your IP address to the whitelist
4. Create a database user
5. Get your connection string

**See `backend/DEPLOYMENT_SETUP.md` for complete setup guide.**

6. **Run the Application**

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

7. **Access the Application**
- Frontend: http://localhost:5173 (or shown port)
- Backend API: http://localhost:8080
- Health Check: http://localhost:8080/api/health

## 📂 Project Structure

```
AlgoForce Official Website OS/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Reusable components (Navigation, Footer, React Bits)
│   │   │   └── sections/       # Page sections (Hero, Features, etc.)
│   │   ├── pages/              # Main pages (Home, Pricing, Contact)
│   │   ├── styles/             # Global styles
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/
│   ├── config/                 # Database configuration
│   ├── services/               # Auth & database services
│   ├── controllers/            # Route controllers
│   ├── routes/                 # API routes
│   ├── server.js              # Express server
│   ├── Dockerfile              # Container configuration
│   ├── package.json
│   ├── .env.example           # Environment template
│   └── DEPLOYMENT_SETUP.md    # Complete setup guide
├── Components/                 # Original React Bits components
└── README.md
```

## 🎨 Design System

### Colors
- **Deep Navy Blue**: `#002369` (Primary)
- **Electric Purple**: `#8700ff` (Accent)
- **White**: `#ffffff` (Background)

### Typography
- **Font**: Inter (Google Fonts)

### Effects
- Glassmorphism
- Smooth micro-interactions
- Gradient overlays
- Animated transitions

## 📄 Pages & Sections

### Home Page (`/`)
1. **Hero Section** - Animated command entry with CTAs
2. **What is AlgoForce** - Product explanation with animations
3. **How It Works** - Step-by-step timeline
4. **Product Modules** - Feature cards with benefits
5. **Why AlgoForce** - Comparison table
6. **Who It's For** - Target audience segments

### Pricing Page (`/pricing`)
- Three pricing tiers
- Enterprise solutions
- FAQ section

### Contact Page (`/contact`)
- **Phone OTP-verified contact form** (connected to MongoDB)
- SMS verification with 6-digit OTP sent to phone number
- Inquiry types (Demo, Audit, Enterprise, Consultation)
- Process explanation

## 🔌 API Endpoints

### Contact Routes
- `POST /api/contact/send-otp` - Send SMS OTP to phone number
- `POST /api/contact/verify-and-save` - Verify OTP and save contact
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/:id` - Get contact by ID (admin)
- `PUT /api/contact/:id` - Update contact status (admin)

### Health Check
- `GET /api/health` - API health status

## ☁️ Deployment Options

### Northflank (Recommended)

1. **Create Service**
   - Service type: Web service
   - Build command: `npm install`
   - Run command: `node server.js`
   - Port: 8080

2. **Environment Variables**
   ```
   PORT=8080
   NODE_ENV=production
   MONGO_URI=your_mongodb_uri
   TWILIO_ACCOUNT_SID=your_sid
   TWILIO_AUTH_TOKEN=your_token
   TWILIO_SERVICE_SID=your_service_sid
   ```

3. **Health Check**
   - Path: `/api/health`
   - Port: 8080

**See `NORTHFLANK_MIGRATION_GUIDE.md` for complete deployment instructions.**

### Alternative Platforms
- **Render** - Still supported with PORT 8080
- **Railway** - Easy Node.js deployment
- **Heroku** - Classic choice

## 🎭 React Bits Components

The project uses custom animated components from React Bits:

- **BounceCards** - Animated card layouts
- **ScrollReveal** - Scroll-triggered animations
- **Dock** - macOS-style dock navigation
- **CircularGallery** - 3D circular gallery
- **Lanyard** - 3D animated lanyard (requires Three.js)

## 🛠️ Development

### Frontend Development
```bash
cd frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend Development
```bash
cd backend
npm run dev      # Start with nodemon
npm start        # Start production server
```

## 📦 Production Build

### SPA Routing Fix (CRITICAL)

To prevent 404 errors on page refresh in production:

1. **Frontend** uses BrowserRouter with catch-all route
2. **Vite** configured for SPA builds
3. **Backend** serves `index.html` for all non-API routes

### Northflank Deployment Configuration

The project is optimized for Northflank deployment with PORT 8080 and health check:

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

- **Development**: `VITE_API_URL=http://localhost:8080`
- **Production**: `VITE_API_URL=https://your-northflank-app.northflank.app`

Configured in:
- `frontend/.env.development` (local development)
- `frontend/.env.production` (production build)

### CSS Import Fix

Fixed `@import rules are not allowed here` error by moving component CSS imports from individual JSX files to `frontend/src/index.css`:

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Component CSS imports (moved from JS to avoid @import issues in production) */
@import './components/common/BounceCard.css';
@import './components/common/CircularGallery.css';
@import './components/common/Dock.css';
@import './components/common/ScrollReveal.css';
```

### Build Steps

1. **Build Frontend**
```bash
cd frontend
npm run build
```

2. **Set Environment to Production**
Update backend `.env`:
```env
NODE_ENV=production
MONGO_URI=your_production_mongodb_uri
TWILIO_ACCOUNT_SID=your_production_twilio_sid
TWILIO_AUTH_TOKEN=your_production_twilio_token
TWILIO_SERVICE_SID=your_production_twilio_service_sid
```

3. **Deploy**
- **Frontend**: Deploy `frontend/dist` folder to Vercel/Netlify
  - Netlify: Already configured in `netlify.toml` with SPA redirects
  - Vercel: Add `vercel.json` with rewrites (see below)
- **Backend**: Deploy to Northflank/Render/Railway/Heroku
  - Backend automatically serves frontend from `dist` folder
  - All non-API routes return `index.html`
- **Database**: MongoDB (cloud-based or self-hosted)
- **IMPORTANT**: Use MONGO_URI and Twilio credentials in production
- Never expose database credentials in frontend code

### Vercel Configuration (if using Vercel)

Create `vercel.json` in frontend directory:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Testing Production Build Locally

```bash
# Build frontend
cd frontend
npm run build

# Start backend (serves frontend)
cd ../backend
npm start

# Test at http://localhost:8080
# Try refreshing /contact, /pricing - should work!
```

## 🔐 Security Notes

- ✅ **MongoDB Connection**: Backend uses secure MongoDB connection
- ✅ **Twilio Verification**: Uses Twilio Verify v2 for OTP validation
- ✅ **OTP Hashing**: OTPs hashed with bcrypt before storage (backup verification)
- ✅ **Secure Random**: Uses crypto.randomInt for OTP generation
- ✅ **Rate limiting**: Implemented on all API endpoints
- ✅ **24-hour submission limit** per phone/email
- ✅ **5-minute OTP request cooldown**
- ✅ **10-minute OTP expiration** (backup verification)
- ✅ **CORS configured** for production domains
- ✅ **Input sanitization** with express-validator
- ⚠️ **Add authentication** for admin routes in production

## 🎯 Key Features

✅ Fully responsive design  
✅ Smooth animations with Framer Motion  
✅ Glassmorphism UI effects  
- ✅ **MongoDB database integration**  
✅ **Phone SMS OTP verification system**  
✅ **Twilio Verify v2 for SMS delivery**
✅ Form validation (client + server)  
✅ Rate limiting & anti-spam protection  
✅ Clean component architecture  
✅ Production-ready code  
✅ SEO-friendly structure  
✅ **SPA routing (no 404 on refresh)**  
✅ **Environment-based API URLs**  
✅ **CSS import error fixes**  
✅ **Northflank deployment optimized**  

## 📝 Future Enhancements

- [x] Frontend OTP input UI component
- [ ] Admin dashboard for managing leads
- [ ] Email notifications to admin on verified submissions
- [ ] Analytics integration (Google Analytics/Mixpanel)
- [ ] Blog section for content marketing
- [ ] Case studies page
- [ ] Multi-language support
- [ ] Dark mode toggle

## 🤝 Contributing

This is a proprietary project for AlgoForce. Internal contributions only.

## 📄 License

Proprietary - All rights reserved by AlgoForce

## 📞 Support

For technical issues or questions, contact the development team.

---

**Built with ❤️ for AlgoForce**
