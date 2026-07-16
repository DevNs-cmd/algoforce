# AlgoForce — AI Software for Business Operations

AlgoForce is an AI software company. We build and deploy specialized, repeatable AI products that integrate with existing software systems (Tally, SAP, Zoho CRM, Salesforce) to automate core business operations.

We do not build custom software on the fly or operate as a consulting agency. Instead, every client engagement begins with a Business Assessment to map database structures, followed by implementation configuration and ongoing product subscription.

## 🚀 The Nexus Workspace

Nexus is our proprietary AI-powered development workspace. It’s designed for rapid product testing, workflow mapping, and operational integration simulation.

### Key Features:
- **AI Products Integration**: Configured to sync with our pre-built copilots (TallyGPT, LeadBolt, HotelGPT, GST Autopilot).
- **VPC Cloud Compatibility**: Designed for secure, private cloud deployments on AWS and Azure.
- **Workflow Auditing**: Tools to map database schemas, API connections, and automated pipelines.
- **Academic Network Integration**: Powers collaboration projects with student engineering communities across India.

## ⚙️ Technology Stack

### Frontend:
- **React 18**: Core framework.
- **Vite**: Ultra-fast build tool and development server.
- **TailwindCSS**: Utility-first styling for clean, premium layouts.
- **Framer Motion**: Advanced transitions and micro-animations.

### Backend:
- **Node.js & Express**: High-performance API server.
- **MongoDB**: Flexible document database for session storage and user states.
- **Database Connectors**: Native query translation and database connectors (Tally XML, SQL Gateway, Zoho, Salesforce APIs).

## 📂 Project Structure

```bash
├── backend/            # Express server, routes, and database models
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints (Auth, Projects, AI)
│   └── config/         # Server configuration
├── frontend/           # Vite-React application
│   ├── src/
│   │   ├── components/ # Atomic UI components & sections
│   │   ├── pages/      # Core pages (Products, Home, Labs, etc.)
│   │   ├── services/   # API and AI service layers
│   │   └── contexts/   # Global state management
```

## ⚡ Getting Started

### Prerequisites:
- Node.js (v18+)
- MongoDB (Running locally or MongoDB Atlas)

### Local Development:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DevNs-cmd/algoforce.git
   cd algoforce
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   # Create a .env file based on .env.example
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🌐 Deployment

- **Private VPC Cloud**: Configured for private hosting inside client AWS/Azure infrastructure to ensure total data privacy.
- **Static Hosting**: Frontend is optimized for CDN edge deployments (Vercel, Netlify).
- **Containerized APIs**: Backend is optimized for containerized services (Render, AWS ECS, Google Cloud Run).

---
**AlgoForce AI**  
*AI products that automate business operations.*
