# AlgoForce Website - Customization Guide

## 🎨 Brand Customization

### Colors

Edit `frontend/tailwind.config.js` to change brand colors:

```javascript
colors: {
  navy: {
    500: '#002369',  // Change primary navy
    // ... other shades
  },
  purple: {
    500: '#8700ff',  // Change primary purple
    // ... other shades
  },
}
```

Usage in components:
- `text-navy-900` - Navy text
- `bg-purple-600` - Purple background
- `gradient-text` - Purple to blue gradient text

### Typography

Change fonts in `frontend/index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

Update in `frontend/tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['YOUR_FONT', 'system-ui', 'sans-serif'],
}
```

### Logo

1. Add your logo to `frontend/src/assets/`
2. Update `frontend/src/components/common/Navigation.jsx`:
```jsx
<Link to="/" className="flex items-center space-x-2">
  <img src="/path/to/logo.png" alt="AlgoForce" className="h-8" />
  <span className="gradient-text">AlgoForce</span>
</Link>
```

## 📝 Content Customization

### Hero Section
File: `frontend/src/components/sections/Hero.jsx`

```jsx
// Change headline
<h1>Your New Headline</h1>

// Change description
<p>Your new description</p>

// Update stats
const stats = [
  { value: '10x', label: 'Your Metric' },
  // ...
]
```

### Pricing Tiers
File: `frontend/src/pages/Pricing.jsx`

```jsx
const pricingTiers = [
  {
    name: 'Your Plan Name',
    price: '$XXX',
    duration: 'per month',
    description: 'Your description',
    features: [
      'Feature 1',
      'Feature 2',
      // ...
    ]
  }
]
```

### Product Modules
File: `frontend/src/components/sections/ProductModules.jsx`

Add/remove/edit modules:
```jsx
const modules = [
  {
    icon: <YourIcon />,
    title: 'Module Name',
    description: 'Description',
    benefits: ['Benefit 1', 'Benefit 2'],
    outcome: 'Key outcome',
    gradient: 'from-color-500 to-color-500'
  }
]
```

## 🎭 Animation Customization

### Framer Motion Animations

Adjust animation speed:
```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}  // Change duration
>
```

### ScrollReveal Component

Customize scroll-triggered animations:
```jsx
<ScrollReveal
  baseOpacity={0}        // 0-1 starting opacity
  enableBlur={true}      // Enable/disable blur
  baseRotation={5}       // Degrees of rotation
  blurStrength={10}      // Blur amount
>
  Your content
</ScrollReveal>
```

## 🔧 Functionality Customization

### Contact Form Fields

File: `frontend/src/pages/Contact.jsx`

Add new fields:
```jsx
const [formData, setFormData] = useState({
  // ... existing fields
  newField: ''
})

// Add input in JSX
<input
  name="newField"
  value={formData.newField}
  onChange={handleChange}
/>
```

Update backend model: `backend/models/Contact.js`
```javascript
const contactSchema = new mongoose.Schema({
  // ... existing fields
  newField: {
    type: String,
    required: false
  }
})
```

### Navigation Links

File: `frontend/src/components/common/Navigation.jsx`

```jsx
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'New Page', path: '/new-page' },  // Add new link
]
```

Create new page: `frontend/src/pages/NewPage.jsx`
Add route in `frontend/src/App.jsx`:
```jsx
<Route path="/new-page" element={<NewPage />} />
```

## 📱 Responsive Customization

### Breakpoints

Tailwind breakpoints (in `tailwind.config.js`):
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

Usage:
```jsx
<div className="text-sm md:text-lg lg:text-xl">
  Responsive text
</div>
```

### Mobile Menu

Customize in `frontend/src/components/common/Navigation.jsx`:
```jsx
// Change mobile menu animation
<motion.div
  initial={{ opacity: 0, height: 0 }}
  animate={{ opacity: 1, height: 'auto' }}
  exit={{ opacity: 0, height: 0 }}
>
```

## 🌐 SEO Customization

### Meta Tags

File: `frontend/index.html`

```html
<title>Your Site Title</title>
<meta name="description" content="Your description">
<meta property="og:title" content="Your OG Title">
<meta property="og:description" content="Your OG Description">
<meta property="og:image" content="/path/to/image.jpg">
```

### Structured Data

Add to `index.html`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AlgoForce",
  "url": "https://yoursite.com"
}
</script>
```

## 📧 Email Integration

### Form Submission Notifications

Install nodemailer:
```bash
cd backend
npm install nodemailer
```

Create `backend/utils/email.js`:
```javascript
import nodemailer from 'nodemailer'

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  await transporter.sendMail({
    from: 'noreply@algoforce.com',
    to: options.to,
    subject: options.subject,
    text: options.message
  })
}

export default sendEmail
```

Update `backend/controllers/contactController.js`:
```javascript
import sendEmail from '../utils/email.js'

// After creating contact
await sendEmail({
  to: 'admin@algoforce.com',
  subject: 'New Contact Form Submission',
  message: `Name: ${name}\nEmail: ${email}\n...`
})
```

## 🎨 Theme Customization

### Glassmorphism Effect

Adjust in `frontend/src/index.css`:
```css
.glass-dark {
  background: rgba(0, 35, 105, 0.6);  /* Adjust opacity */
  backdrop-filter: blur(10px);          /* Adjust blur */
  border: 1px solid rgba(135, 0, 255, 0.3);
}
```

### Gradient Styles

Edit in `frontend/src/index.css`:
```css
.gradient-purple-blue {
  background: linear-gradient(135deg, #8700ff 0%, #002369 100%);
}
```

Usage:
```jsx
<div className="gradient-purple-blue">
  Content with gradient background
</div>
```

## 📊 Analytics Integration

### Google Analytics

Add to `frontend/index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Custom Event Tracking

```jsx
// Track button clicks
const handleCTAClick = () => {
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', 'cta_click', {
      'event_category': 'engagement',
      'event_label': 'Request Demo'
    })
  }
  
  // Your existing logic
}
```

## 🔒 Security Enhancements

### Rate Limiting

Install express-rate-limit:
```bash
cd backend
npm install express-rate-limit
```

Add to `backend/server.js`:
```javascript
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

app.use('/api/', limiter)
```

### Input Sanitization

```bash
npm install express-mongo-sanitize
```

```javascript
import mongoSanitize from 'express-mongo-sanitize'
app.use(mongoSanitize())
```

## 🚀 Performance Optimization

### Image Optimization

Use WebP format for images:
```jsx
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" />
</picture>
```

### Code Splitting

In your routes:
```jsx
import { lazy, Suspense } from 'react'

const Pricing = lazy(() => import('./pages/Pricing'))

<Suspense fallback={<div>Loading...</div>}>
  <Route path="/pricing" element={<Pricing />} />
</Suspense>
```

### Bundle Size

Analyze bundle:
```bash
cd frontend
npm install --save-dev rollup-plugin-visualizer
```

## 📱 PWA Setup

Create `frontend/public/manifest.json`:
```json
{
  "name": "AlgoForce",
  "short_name": "AlgoForce",
  "theme_color": "#002369",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "/",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

Link in `index.html`:
```html
<link rel="manifest" href="/manifest.json">
```

## 🎯 A/B Testing

Track different variants:
```jsx
const variant = Math.random() > 0.5 ? 'A' : 'B'

{variant === 'A' ? (
  <HeadlineA />
) : (
  <HeadlineB />
)}
```

---

**Need help with customization? Refer to the component files for inline comments and documentation.**
