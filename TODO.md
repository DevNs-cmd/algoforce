# Production Issues Fix Plan

## Tasks
- [x] Fix SPA routing in vercel.json for Vercel deployment
- [x] Move Tailwind @import rules to postcss.config.js to avoid production errors
- [x] Update frontend/src/index.css to remove @import rules
- [x] Verify backend CORS and routes are correct
- [x] Update render.yaml if needed for proper deployment
- [x] Test builds and ensure no console errors
- [x] Fix backend Supabase dependency issue by adding JSON fallback

## Followup Steps
- Set VITE_API_URL=https://algoforce-backend.onrender.com in Vercel env vars
- Set SUPABASE_SERVICE_ROLE_KEY in Render env vars (optional, backend works without it)
- Deploy and test refresh, API calls, no console errors
