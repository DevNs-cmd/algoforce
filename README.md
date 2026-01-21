# AlgoForce - Official Website

Enterprise-grade AI Business Operating System website built with the MERN stack.

## 🎯 Overview

This is a premium, category-defining product website that explains AlgoForce—an AI Business OS that eliminates revenue leaks and compounds intelligence.

## 🧩 Tech Stack

- **Frontend**: React + Vite, Tailwind CSS
- **Animations**: React Bits Components, Framer Motion
- **Backend**: Node.js + Express
- **Database**: Supabase (PostgreSQL)
- **Email**: Gmail SMTP with OTP verification
- **State Management**: React Hooks
- **Styling**: Tailwind CSS with glassmorphism effects

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Supabase account and project
- Gmail account with App Password enabled
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
PORT=5000
NODE_ENV=development

# Supabase (CRITICAL: Use SERVICE_ROLE_KEY on backend)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Gmail SMTP (Use App Password)
GMAIL_USER=yourname@gmail.com
GMAIL_APP_PASS=your_16_character_app_password
```

**Note**: See `backend/.env.example` for detailed setup instructions.

5. **Setup Supabase Database**

**IMPORTANT**: Run the complete setup script for RLS and security:

```bash
# Use the provided SQL script (RECOMMENDED)
# File: backend/database/setup.sql
```

Copy the entire contents of `backend/database/setup.sql` and run in your Supabase SQL Editor.

This script includes:
- Table creation with all columns
- Row Level Security (RLS) policies
- Performance indexes
- Security configurations

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
- Frontend: http://localhost:3000 (or shown port)
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

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
│   ├── config/                 # Supabase configuration
│   ├── services/               # Email & database services
│   ├── controllers/            # Route controllers
│   ├── routes/                 # API routes
│   ├── server.js              # Express server
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
- **OTP-verified contact form** (connected to Supabase)
- Email verification with 6-digit OTP
- Inquiry types (Demo, Audit, Enterprise, Consultation)
- Process explanation

## 🔌 API Endpoints

### Contact Routes
- `POST /api/contact` - Submit contact form & send OTP email
- `POST /api/contact/verify-otp` - Verify OTP code
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/:id` - Get contact by ID (admin)
- `PUT /api/contact/:id` - Update contact status (admin)

### Health Check
- `GET /api/health` - API health status

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

1. **Build Frontend**
```bash
cd frontend
npm run build
```

2. **Set Environment to Production**
Update backend `.env`:
```env
NODE_ENV=production
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
GMAIL_USER=your_production_gmail
GMAIL_APP_PASS=your_production_app_password
```

**CRITICAL**: Use SERVICE_ROLE_KEY, not anon key!

3. **Deploy**
- Frontend: Deploy `frontend/dist` folder to Vercel/Netlify
- Backend: Deploy to Render/Railway/Heroku
- Database: Supabase (already cloud-based)
- **IMPORTANT**: Use SUPABASE_SERVICE_ROLE_KEY in production
- Never expose service_role key in frontend code

## 🔐 Security Notes

- ✅ **Service Role Key**: Backend uses SERVICE_ROLE_KEY for database operations
- ✅ **Row Level Security**: RLS enabled with proper policies
- ✅ **OTP Hashing**: OTPs hashed with bcrypt before storage
- ✅ **Secure Random**: Uses crypto.randomInt for OTP generation
- ✅ **Rate limiting**: Implemented on all API endpoints
- ✅ **24-hour submission limit** per email
- ✅ **5-minute OTP request cooldown**
- ✅ **10-minute OTP expiration**
- ✅ **CORS configured** for production domains
- ✅ **Input sanitization** with express-validator
- ⚠️ **Add authentication** for admin routes in production

## 🎯 Key Features

✅ Fully responsive design  
✅ Smooth animations with Framer Motion  
✅ Glassmorphism UI effects  
✅ **Supabase database integration**  
✅ **Email OTP verification system**  
✅ **Gmail SMTP for email delivery**  
✅ Form validation (client + server)  
✅ Rate limiting & anti-spam protection  
✅ Clean component architecture  
✅ Production-ready code  
✅ SEO-friendly structure  

## 📝 Future Enhancements

- [ ] Frontend OTP input UI component
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
