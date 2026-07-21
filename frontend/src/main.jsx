import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// ── Suppress known browser non-errors ────────────────────────────────────────
// Monaco Editor injects its CSS via constructed stylesheets; Chrome logs a
// harmless warning about @import not being allowed there. Filter it out so
// the console stays clean for real errors.
const _consoleError = console.error.bind(console)
console.error = (...args) => {
  const msg = args[0]?.toString?.() ?? ''
  if (msg.includes('@import rules are not allowed here')) return
  _consoleError(...args)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
