# AlgoForce Website - System Architecture

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                     http://localhost:3000                    │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                   │
│                         Port 3000                            │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │   Home   │  │ Pricing  │  │ Contact  │  Pages           │
│  └──────────┘  └──────────┘  └──────────┘                  │
│                                                               │
│  ┌────────────────────────────────────────┐                 │
│  │  Components (Hero, Features, etc.)     │                 │
│  └────────────────────────────────────────┘                 │
│                                                               │
│  ┌────────────────────────────────────────┐                 │
│  │  Animations (Framer Motion, GSAP)      │                 │
│  └────────────────────────────────────────┘                 │
│                                                               │
│  ┌────────────────────────────────────────┐                 │
│  │  Styles (Tailwind CSS)                 │                 │
│  └────────────────────────────────────────┘                 │
└───────────────────────────┬─────────────────────────────────┘
                            │
                    API Calls (Axios)
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND (Express.js)                        │
│                         Port 5000                            │
├─────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────┐                 │
│  │  Routes (API Endpoints)                │                 │
│  │  - POST /api/contact                   │                 │
│  │  - GET  /api/contact                   │                 │
│  │  - GET  /api/health                    │                 │
│  └──────────────────┬─────────────────────┘                 │
│                     │                                        │
│                     ▼                                        │
│  ┌────────────────────────────────────────┐                 │
│  │  Controllers (Business Logic)          │                 │
│  │  - Validation                          │                 │
│  │  - Error Handling                      │                 │
│  └──────────────────┬─────────────────────┘                 │
│                     │                                        │
│                     ▼                                        │
│  ┌────────────────────────────────────────┐                 │
│  │  Models (Mongoose Schemas)             │                 │
│  │  - Contact Schema                      │                 │
│  └──────────────────┬─────────────────────┘                 │
└────────────────────┬┴──────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE (MongoDB)                        │
│                   mongodb://localhost:27017                  │
├─────────────────────────────────────────────────────────────┤
│  Collections:                                                │
│  └─ contacts (form submissions)                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow Diagram

### Contact Form Submission Flow

```
User fills form
     │
     ▼
┌────────────────────────┐
│  Contact Page (React)  │  Frontend Validation
└───────────┬────────────┘
            │
            ▼ axios.post('/api/contact', data)
┌────────────────────────┐
│  Express Route Handler │  Server-side Validation
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│  Contact Controller    │  Business Logic
└───────────┬────────────┘  - Check duplicates
            │                - Format data
            ▼
┌────────────────────────┐
│   MongoDB (Mongoose)   │  Save to Database
└───────────┬────────────┘
            │
            ▼ Success Response
┌────────────────────────┐
│  Contact Page (React)  │  Show Success Message
└────────────────────────┘
```

---

## 🎨 Frontend Architecture

```
frontend/
│
├── Entry Point
│   └── index.html
│       └── imports main.jsx
│           └── renders App.jsx
│
├── Routing (React Router)
│   └── App.jsx
│       ├── Route: / → Home
│       ├── Route: /pricing → Pricing
│       └── Route: /contact → Contact
│
├── Pages (Full Views)
│   ├── Home.jsx
│   │   ├── Hero
│   │   ├── WhatIsAlgoForce
│   │   ├── HowItWorks
│   │   ├── ProductModules
│   │   ├── WhyAlgoForce
│   │   └── WhoItsFor
│   │
│   ├── Pricing.jsx
│   │   ├── Hero
│   │   ├── Pricing Tiers
│   │   └── FAQ
│   │
│   └── Contact.jsx
│       ├── Info Section
│       └── Contact Form
│
├── Components
│   ├── Common (Reusable)
│   │   ├── Navigation
│   │   ├── Footer
│   │   └── React Bits Components
│   │
│   └── Sections (Page Specific)
│       ├── Hero
│       ├── WhatIsAlgoForce
│       ├── HowItWorks
│       ├── ProductModules
│       ├── WhyAlgoForce
│       └── WhoItsFor
│
└── Styling
    ├── Tailwind CSS (utility classes)
    ├── Custom CSS (global styles)
    └── Component CSS (specific animations)
```

---

## 🔧 Backend Architecture

```
backend/
│
├── Entry Point
│   └── server.js
│       ├── Initialize Express
│       ├── Connect MongoDB
│       ├── Configure Middleware
│       └── Register Routes
│
├── Configuration
│   └── config/database.js
│       └── MongoDB connection
│
├── Routes (API Endpoints)
│   └── routes/contactRoutes.js
│       ├── POST /api/contact (submit)
│       ├── GET  /api/contact (list all)
│       ├── GET  /api/contact/:id (get one)
│       └── PUT  /api/contact/:id (update)
│
├── Controllers (Business Logic)
│   └── controllers/contactController.js
│       ├── submitContact()
│       ├── getAllContacts()
│       ├── getContactById()
│       └── updateContactStatus()
│
└── Models (Database Schemas)
    └── models/Contact.js
        └── Schema Definition
            ├── name (String, required)
            ├── company (String, required)
            ├── email (String, required, validated)
            ├── role (String, required)
            ├── problem (String, required)
            ├── inquiryType (Enum)
            ├── status (Enum)
            └── timestamps
```

---

## 🔄 Request/Response Flow

### GET Request (Page Load)

```
Browser
  │
  └─► GET http://localhost:3000/
       │
       ▼
  ┌────────────────┐
  │  Vite Dev      │  Serves React App
  │  Server        │
  └────────┬───────┘
           │
           ▼
  ┌────────────────┐
  │  React Router  │  Matches route
  └────────┬───────┘
           │
           ▼
  ┌────────────────┐
  │  Home Page     │  Renders components
  │  Component     │  with animations
  └────────────────┘
```

### POST Request (Form Submit)

```
User clicks Submit
  │
  ▼
Frontend Validation
  │
  ▼
axios.post('/api/contact', formData)
  │
  ▼
┌─────────────────────────────┐
│  Vite Proxy                  │  Forwards to backend
│  /api/* → localhost:5000     │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│  Express Route              │  /api/contact
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│  Express Validator          │  Server validation
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│  Contact Controller         │  Business logic
│  - Check duplicates         │
│  - Sanitize input           │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│  Mongoose Model             │  Create document
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│  MongoDB                    │  Save to DB
└──────────┬──────────────────┘
           │
           ▼ Response
┌─────────────────────────────┐
│  { success: true, data: {} }│  JSON Response
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│  Frontend                   │  Show success message
└─────────────────────────────┘
```

---

## 🎭 Animation Architecture

```
Animation Layers:

1. Page Entry Animations (Framer Motion)
   └── initial, animate, transition props

2. Scroll Animations (GSAP + ScrollTrigger)
   └── ScrollReveal component

3. Hover States (Framer Motion)
   └── whileHover prop

4. Micro-interactions (CSS + Framer)
   └── Button clicks, form focus, etc.

5. Background Animations
   └── Gradient shifts, floating elements
```

---

## 🔐 Security Architecture

```
Input → Frontend Validation
          │
          ▼
       Backend Validation (Express Validator)
          │
          ▼
       Sanitization
          │
          ▼
       MongoDB Schema Validation
          │
          ▼
       Stored Safely
```

---

## 📦 State Management

```
Component Level State (useState)
  │
  ├─► Form State (Contact page)
  ├─► UI State (mobile menu, modals)
  └─► Animation State (scroll position)

No Global State Management Needed
  (Simple application, prop drilling minimal)
```

---

## 🚀 Build & Deployment Architecture

### Development

```
┌──────────────┐     ┌──────────────┐
│   Frontend   │     │   Backend    │
│              │     │              │
│  Vite Dev    │     │   Nodemon    │
│  Hot Reload  │────▶│   Auto       │
│  Port 3000   │     │   Restart    │
│              │     │   Port 5000  │
└──────────────┘     └──────────────┘
       │                     │
       └─────────┬───────────┘
                 │
                 ▼
        ┌────────────────┐
        │   MongoDB      │
        │   Local/Atlas  │
        └────────────────┘
```

### Production

```
┌──────────────────┐
│   Vercel/        │  Frontend Build (npm run build)
│   Netlify        │  Serves static files
│                  │  CDN distribution
└─────────┬────────┘
          │
          │ API Calls
          │
          ▼
┌──────────────────┐
│   Railway/       │  Backend Server
│   Heroku/DO      │  Express.js
│                  │
└─────────┬────────┘
          │
          │ MongoDB
          │ Connection
          │
          ▼
┌──────────────────┐
│   MongoDB        │  Cloud Database
│   Atlas          │  Managed service
└──────────────────┘
```

---

## 🗄️ Database Schema

```
Contact Document:
{
  _id: ObjectId,
  name: String,
  company: String,
  email: String (unique indexed),
  role: String,
  problem: String,
  inquiryType: Enum['demo', 'audit', 'enterprise', 'consultation'],
  status: Enum['new', 'contacted', 'qualified', 'closed'],
  submittedAt: Date,
  createdAt: Date,
  updatedAt: Date
}

Indexes:
- email (ascending)
- submittedAt (descending)
```

---

## 🎯 Component Hierarchy

```
App
├── Navigation (sticky)
│   ├── Logo
│   ├── Desktop Nav Items
│   └── Mobile Menu (hamburger)
│
├── Router
│   ├── Home
│   │   ├── Hero
│   │   │   ├── Headline
│   │   │   ├── CTA Buttons
│   │   │   └── Stats Cards
│   │   │
│   │   ├── WhatIsAlgoForce
│   │   │   ├── Feature Cards (3)
│   │   │   └── Visual Flow
│   │   │
│   │   ├── HowItWorks
│   │   │   └── Timeline Steps (4)
│   │   │
│   │   ├── ProductModules
│   │   │   └── Module Cards (5)
│   │   │
│   │   ├── WhyAlgoForce
│   │   │   ├── Comparison Table
│   │   │   └── Differentiator Cards (3)
│   │   │
│   │   └── WhoItsFor
│   │       └── Segment Cards (4)
│   │
│   ├── Pricing
│   │   ├── Hero
│   │   ├── Pricing Cards (3)
│   │   └── FAQ Items
│   │
│   └── Contact
│       ├── Process Steps (4)
│       └── Contact Form
│           ├── Input Fields (6)
│           └── Submit Button
│
└── Footer
    ├── Brand Info
    ├── Quick Links
    └── Social Icons
```

---

## 🔌 API Endpoints Detail

```
POST /api/contact
├── Request Body: { name, company, email, role, problem, inquiryType }
├── Validation: Express Validator
├── Response: { success: true, data: { id, name, email } }
└── Error: { success: false, message: "..." }

GET /api/contact
├── Response: { success: true, count: N, data: [...] }
└── Use: Admin dashboard (future)

GET /api/contact/:id
├── Response: { success: true, data: { contact } }
└── Use: Admin view single lead

PUT /api/contact/:id
├── Request Body: { status }
├── Response: { success: true, data: { updated contact } }
└── Use: Admin update lead status

GET /api/health
├── Response: { success: true, message: "...", timestamp: "..." }
└── Use: Health check / monitoring
```

---

## 📱 Responsive Breakpoints

```
Mobile First Approach:

Base (Mobile):     0px - 639px
   └── Single column layouts
   └── Stacked navigation
   └── Full-width cards

sm (Small):       640px - 767px
   └── 2-column grids start
   └── Larger text

md (Medium):      768px - 1023px
   └── Desktop navigation shows
   └── 3-column grids
   └── Side-by-side layouts

lg (Large):      1024px - 1279px
   └── Wider content area
   └── Full feature visibility

xl (Extra Large): 1280px+
   └── Max-width container
   └── Optimal spacing
```

---

This architecture document provides a complete technical overview of how all pieces fit together. Use it as a reference when understanding or modifying the codebase.
