# Backend Optimization TODO

## Pending Tasks
- [ ] Update backend/package.json to include compression dependency
- [ ] Create backend/utils/fileStore.js with async readContacts and writeContacts functions using atomic writes
- [ ] Create backend/routes/contact.js with POST /api/contact endpoint, including validation, rate limiting, and calling fileStore
- [ ] Update backend/server.js: add compression, update CORS to only allow https://algoforceaii.com, import routes/contact.js
- [ ] Update frontend/src/pages/Contact.jsx to use axios.post('https://algoforce-backend.onrender.com/api/contact', formData)
- [ ] Ensure backend/data/contacts.json is properly initialized
- [ ] Test setup locally
- [ ] Provide Render deployment settings
- [ ] Note performance limits and recommendations
