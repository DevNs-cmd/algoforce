# AlgoForce Website - Complete File Index

## 📋 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Main project overview and introduction |
| `QUICK_START.md` | 5-minute setup guide |
| `SETUP_INSTRUCTIONS.md` | Detailed installation instructions |
| `CUSTOMIZATION_GUIDE.md` | How to customize everything |
| `PROJECT_SUMMARY.md` | Complete project delivery summary |
| `FILE_INDEX.md` | This file - complete file listing |
| `.gitignore` | Git ignore configuration |
| `install.ps1` | Automated Windows setup script |

## 🎨 Frontend Files

### Root Configuration
| File | Purpose |
|------|---------|
| `frontend/package.json` | Frontend dependencies and scripts |
| `frontend/vite.config.js` | Vite build configuration |
| `frontend/tailwind.config.js` | Tailwind CSS theme configuration |
| `frontend/postcss.config.js` | PostCSS configuration |
| `frontend/index.html` | HTML entry point |

### Source Files - Core
| File | Purpose |
|------|---------|
| `frontend/src/main.jsx` | React application entry point |
| `frontend/src/App.jsx` | Main app component with routing |
| `frontend/src/index.css` | Global styles and Tailwind imports |

### Source Files - Pages
| File | Purpose |
|------|---------|
| `frontend/src/pages/Home.jsx` | Homepage with all main sections |
| `frontend/src/pages/Pricing.jsx` | Pricing page with tiers and FAQ |
| `frontend/src/pages/Contact.jsx` | Contact form page with validation |

### Source Files - Common Components
| File | Purpose |
|------|---------|
| `frontend/src/components/common/Navigation.jsx` | Site navigation with mobile menu |
| `frontend/src/components/common/Footer.jsx` | Site footer with links |
| `frontend/src/components/common/ScrollReveal.jsx` | GSAP scroll animation component |
| `frontend/src/components/common/ScrollReveal.css` | ScrollReveal styles |
| `frontend/src/components/common/BounceCard.jsx` | Animated card component (React Bits) |
| `frontend/src/components/common/BounceCard.css` | BounceCard styles |
| `frontend/src/components/common/CircularGallery.jsx` | 3D gallery component (React Bits) |
| `frontend/src/components/common/CircularGallery.css` | CircularGallery styles |
| `frontend/src/components/common/Dock.jsx` | macOS-style dock (React Bits) |
| `frontend/src/components/common/Dock.css` | Dock styles |
| `frontend/src/components/common/Lanyard.jsx` | 3D lanyard component (React Bits) |
| `frontend/src/components/common/Lanyard.css` | Lanyard styles |

### Source Files - Section Components
| File | Purpose |
|------|---------|
| `frontend/src/components/sections/Hero.jsx` | Homepage hero section |
| `frontend/src/components/sections/WhatIsAlgoForce.jsx` | Product explanation section |
| `frontend/src/components/sections/HowItWorks.jsx` | 4-step timeline section |
| `frontend/src/components/sections/ProductModules.jsx` | 5 product modules cards |
| `frontend/src/components/sections/WhyAlgoForce.jsx` | Comparison table section |
| `frontend/src/components/sections/WhoItsFor.jsx` | Target audience cards |

## 🔧 Backend Files

### Root Configuration
| File | Purpose |
|------|---------|
| `backend/package.json` | Backend dependencies and scripts |
| `backend/server.js` | Express server entry point |
| `backend/.env.example` | Environment variables template |
| `backend/.env` | Actual environment variables (create manually) |

### Backend - Config
| File | Purpose |
|------|---------|
| `backend/config/database.js` | MongoDB connection configuration |

### Backend - Models
| File | Purpose |
|------|---------|
| `backend/models/Contact.js` | MongoDB Contact schema with validation |

### Backend - Controllers
| File | Purpose |
|------|---------|
| `backend/controllers/contactController.js` | Contact form business logic |

### Backend - Routes
| File | Purpose |
|------|---------|
| `backend/routes/contactRoutes.js` | Contact API endpoints and validation |

## 📦 Original Components (React Bits)

### Component Files
| File | Purpose |
|------|---------|
| `Components/BounceCard.jsx` | Original BounceCard component |
| `Components/BounceCard.css` | BounceCard styles |
| `Components/CircularGallery.jsx` | Original CircularGallery |
| `Components/CircularGallery.css` | CircularGallery styles |
| `Components/Dock.jsx` | Original Dock component |
| `Components/Dock.css` | Dock styles |
| `Components/Lanyard.jsx` | Original Lanyard component |
| `Components/Lanyard.css` | Lanyard styles |
| `Components/ScrollReveal.jsx` | Original ScrollReveal |
| `Components/ScrollReveal.css` | ScrollReveal styles |

### Component Usage Documentation
| File | Purpose |
|------|---------|
| `Components Usage/BounceCard.txt` | How to use BounceCard |
| `Components Usage/CircullarGallery.txt` | How to use CircularGallery |
| `Components Usage/Dock.txt` | How to use Dock |
| `Components Usage/Lanyard.txt` | How to use Lanyard |
| `Components Usage/ScrollReveal.txt` | How to use ScrollReveal |

## 📂 Directory Structure

```
AlgoForce Official Website OS/
│
├── 📄 Documentation (9 files)
│   ├── README.md
│   ├── QUICK_START.md
│   ├── SETUP_INSTRUCTIONS.md
│   ├── CUSTOMIZATION_GUIDE.md
│   ├── PROJECT_SUMMARY.md
│   ├── FILE_INDEX.md
│   ├── .gitignore
│   └── install.ps1
│
├── 🎨 frontend/
│   ├── 📦 Configuration (5 files)
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   ├── tailwind.config.js
│   │   ├── postcss.config.js
│   │   └── index.html
│   │
│   └── src/
│       ├── 🏠 Core (3 files)
│       │   ├── main.jsx
│       │   ├── App.jsx
│       │   └── index.css
│       │
│       ├── 📄 pages/ (3 files)
│       │   ├── Home.jsx
│       │   ├── Pricing.jsx
│       │   └── Contact.jsx
│       │
│       └── components/
│           ├── common/ (12 files)
│           │   ├── Navigation.jsx
│           │   ├── Footer.jsx
│           │   ├── ScrollReveal.jsx + .css
│           │   ├── BounceCard.jsx + .css
│           │   ├── CircularGallery.jsx + .css
│           │   ├── Dock.jsx + .css
│           │   └── Lanyard.jsx + .css
│           │
│           └── sections/ (6 files)
│               ├── Hero.jsx
│               ├── WhatIsAlgoForce.jsx
│               ├── HowItWorks.jsx
│               ├── ProductModules.jsx
│               ├── WhyAlgoForce.jsx
│               └── WhoItsFor.jsx
│
├── 🔧 backend/
│   ├── 📦 Configuration (2 files)
│   │   ├── package.json
│   │   └── server.js
│   │
│   ├── config/ (1 file)
│   │   └── database.js
│   │
│   ├── models/ (1 file)
│   │   └── Contact.js
│   │
│   ├── controllers/ (1 file)
│   │   └── contactController.js
│   │
│   └── routes/ (1 file)
│       └── contactRoutes.js
│
├── 🎭 Components/ (10 files)
│   ├── BounceCard.jsx + .css
│   ├── CircularGallery.jsx + .css
│   ├── Dock.jsx + .css
│   ├── Lanyard.jsx + .css
│   └── ScrollReveal.jsx + .css
│
└── 📚 Components Usage/ (5 files)
    ├── BounceCard.txt
    ├── CircullarGallery.txt
    ├── Dock.txt
    ├── Lanyard.txt
    └── ScrollReveal.txt
```

## 📊 File Count Summary

| Category | Files | Purpose |
|----------|-------|---------|
| Documentation | 8 | Setup guides and references |
| Frontend Config | 5 | Build and style configuration |
| Frontend Core | 3 | App entry points |
| Frontend Pages | 3 | Main website pages |
| Frontend Components | 18 | Reusable UI components |
| Backend Config | 3 | Server and environment setup |
| Backend Logic | 4 | API, database, and business logic |
| Original Components | 10 | React Bits animation components |
| Component Docs | 5 | Usage instructions |
| **TOTAL** | **59** | Complete project files |

## 🎯 Key Files for Customization

### Must Edit First
1. `backend/.env` - Environment configuration
2. `frontend/tailwind.config.js` - Brand colors
3. `frontend/src/components/common/Navigation.jsx` - Add logo
4. `frontend/src/components/sections/Hero.jsx` - Main headline

### Content Updates
1. `frontend/src/components/sections/*.jsx` - All section content
2. `frontend/src/pages/Pricing.jsx` - Pricing tiers
3. `frontend/src/components/common/Footer.jsx` - Footer links

### Styling
1. `frontend/src/index.css` - Global styles
2. `frontend/tailwind.config.js` - Theme configuration

## 🚀 Files That Run the App

### Development
```
Frontend: frontend/src/main.jsx → App.jsx → pages/*.jsx
Backend:  backend/server.js → routes → controllers → models
```

### Build Process
```
Frontend: npm run dev (Vite) → http://localhost:3000
Backend:  npm run dev (Nodemon) → http://localhost:5000
```

## 📝 File Relationships

```
App Flow:
index.html 
  → main.jsx 
    → App.jsx (routing)
      → pages/Home.jsx
        → sections/Hero.jsx
        → sections/WhatIsAlgoForce.jsx
        → etc...

API Flow:
server.js 
  → routes/contactRoutes.js 
    → controllers/contactController.js 
      → models/Contact.js 
        → MongoDB
```

## 🔍 Finding Specific Features

| Feature | File Location |
|---------|---------------|
| Hero animation | `frontend/src/components/sections/Hero.jsx` |
| Navigation menu | `frontend/src/components/common/Navigation.jsx` |
| Contact form | `frontend/src/pages/Contact.jsx` |
| Pricing cards | `frontend/src/pages/Pricing.jsx` |
| Product modules | `frontend/src/components/sections/ProductModules.jsx` |
| API endpoints | `backend/routes/contactRoutes.js` |
| Database schema | `backend/models/Contact.js` |
| Color theme | `frontend/tailwind.config.js` |
| Global styles | `frontend/src/index.css` |

## 📦 Dependencies Location

| Dependency Type | File |
|----------------|------|
| Frontend packages | `frontend/package.json` |
| Backend packages | `backend/package.json` |
| Environment vars | `backend/.env` |
| Build config | `frontend/vite.config.js` |
| Style config | `frontend/tailwind.config.js` |

## 🎨 Style Files Priority

CSS loading order:
1. `frontend/src/index.css` (Tailwind + custom)
2. `frontend/tailwind.config.js` (theme)
3. Component-specific `.css` files
4. Inline styles in components

## 🔐 Sensitive Files

Never commit to git:
- `backend/.env` - Environment variables
- `node_modules/` - Dependencies
- `frontend/dist/` - Build output
- `.DS_Store` - OS files

These are already in `.gitignore`.

---

**Total Project Files: 59**  
**Lines of Code: ~5,000+**  
**Ready for: Development, Customization, Deployment**
