# AlgoForce - Official Website

Enterprise-grade AI Business Operating System website built with the MERN stack.

## 🎯 Overview

This is a premium, category-defining product website that explains AlgoForce—an AI Business OS that eliminates revenue leaks and compounds intelligence.

## 🧩 Tech Stack

- **Frontend**: React + Vite, Tailwind CSS
- **Animations**: React Bits Components, Framer Motion
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **State Management**: React Hooks
- **Styling**: Tailwind CSS with glassmorphism effects

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
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
MONGODB_URI=mongodb://localhost:27017/algoforce
NODE_ENV=development
```

5. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

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
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

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
│   ├── models/                 # MongoDB models
│   ├── controllers/            # Route controllers
│   ├── routes/                 # API routes
│   ├── server.js              # Express server
│   └── package.json
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
- Contact form (connected to MongoDB)
- Inquiry types (Demo, Audit, Enterprise, Consultation)
- Process explanation

## 🔌 API Endpoints

### Contact Routes
- `POST /api/contact` - Submit contact form
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
```

3. **Deploy**
- Frontend: Deploy `frontend/dist` folder to Vercel/Netlify
- Backend: Deploy to Heroku/Railway/DigitalOcean
- Database: Use MongoDB Atlas for production

## 🔐 Security Notes

- Add authentication for admin routes in production
- Use environment variables for sensitive data
- Implement rate limiting on API endpoints
- Add CORS whitelist for production
- Sanitize user inputs

## 🎯 Key Features

✅ Fully responsive design  
✅ Smooth animations with Framer Motion  
✅ Glassmorphism UI effects  
✅ MongoDB integration for lead capture  
✅ Form validation (client + server)  
✅ Clean component architecture  
✅ Production-ready code  
✅ SEO-friendly structure  

## 📝 Future Enhancements

- [ ] Admin dashboard for managing leads
- [ ] Email notifications on form submission
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
