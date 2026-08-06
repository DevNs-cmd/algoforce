import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaShieldAlt,
  FaLock,
  FaDatabase,
  FaChartLine,
  FaSearch,
  FaComments,
  FaFileInvoiceDollar,
  FaExchangeAlt,
  FaClock,
  FaTimes,
  FaServer,
  FaCogs,
  FaDownload,
  FaPlay,
  FaChevronDown,
  FaChevronUp,
  FaExclamationTriangle,
  FaUserShield
} from 'react-icons/fa'
import TallyGPTDownloadCard from './TallyGPTDownloadCard'
import { trackDownload } from '../../utils/releasesManager'

// -----------------------------------------------------------------------------
// DATA & CONTENT (PUNCHY, SHORT PARAGRAPHS, HIGH-CONVERTING)
// -----------------------------------------------------------------------------

// Section 3: Why Accountants Waste Hours Every Week
const PAIN_POINTS = [
  {
    title: 'Endless Ledger Navigation',
    description: 'Finding specific vendor transactions or historical bills requires clicking through dozens of nested Tally menus.'
  },
  {
    title: 'Manual GST 2B Cross-Checking',
    description: 'Matching supplier GSTR-2B returns against purchase daybooks takes days of line-by-line Excel formula work.'
  },
  {
    title: 'Spreadsheet Report Errors',
    description: 'Exporting raw Tally ledgers into Excel to build P&L and cash flow models leads to broken formulas and delays.'
  },
  {
    title: 'Delayed Cash Flow Answers',
    description: 'Management waits days for overdue debtor aging and cash runway reports because calculations are done manually.'
  }
]

// Section 4: What You'll Save
const SAVINGS_METRICS = [
  { metric: '75% Faster', label: 'Month-End Book Close', detail: 'Compress close cycles from weeks to days with continuous automated reconciliation.' },
  { metric: '90% Less', label: 'Manual Data Keying', detail: 'Automate bank matching, GST 2B recon, and invoice voucher drafting using AI.' },
  { metric: '14 ms', label: 'Ledger Query Speed', detail: 'Locate any invoice, voucher, or vendor balance across 150,000+ entries instantly.' },
  { metric: '100% Local', label: 'Data Sovereignty', detail: 'Zero cloud telemetry. All ledger parsing stays on your computer.' }
]

// Section 5: Everything You Can Do (Interactive UI Tabs)
const FEATURE_TABS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    title: 'Real-Time Financial Dashboard',
    description: 'See your net cash, overdue debtors, payables, working capital, and active audit alerts synced live from Tally.',
    image: '/tallygpt_executive_dashboard.png',
    points: ['Net Cash & Bank: ₹42,85,900', 'Working Capital: ₹52,24,100', 'Operating Runway: 6.4 Months']
  },
  {
    id: 'chat',
    label: 'AI Chat',
    title: 'Conversational Accounting Copilot',
    description: 'Ask questions in plain English like "Show overdue receivables > 60 days" and get immediate answers with voucher citations.',
    image: '/tallygpt_executive_dashboard.png',
    points: ['Ask in plain English', 'Sub-second response time', '100% verifiable Tally ledger links']
  },
  {
    id: 'reports',
    label: 'Reports',
    title: 'One-Click Financial Reports',
    description: 'Generate Profit & Loss, Balance Sheets, Cash Flow forecasts, and board presentation packs in seconds.',
    image: '/tallygpt_executive_dashboard.png',
    points: ['Board-ready financial packs', 'Ind AS & tax compliant', 'Export to PDF & Excel']
  },
  {
    id: 'gst',
    label: 'GST 2B Recon',
    title: 'Automated GST 2B Reconciliation',
    description: 'Match supplier GST 2B statements against Tally purchase ledgers to prevent tax leakage and claim 100% eligible ITC.',
    image: '/tallygpt_executive_dashboard.png',
    points: ['Detect IGST rate mismatches', 'Flag unfiled vendor invoices', 'Maximize eligible Input Tax Credit']
  },
  {
    id: 'search',
    label: 'Sub-Second Search',
    title: 'Sub-Second Search Engine',
    description: 'Search years of historical Tally ledgers, bill references, and vendor vouchers in milliseconds.',
    image: '/tallygpt_executive_dashboard.png',
    points: ['Search 150,000+ vouchers in 14ms', 'Filter by party, date, or amount', 'Direct link to Tally vouchers']
  },
  {
    id: 'vouchers',
    label: 'Voucher OCR',
    title: 'Smart Invoice Voucher OCR',
    description: 'Parse PDF invoices and scanned receipts automatically to auto-draft Tally vouchers with approval rules.',
    image: '/tallygpt_executive_dashboard.png',
    points: ['OCR invoice line extraction', 'Multi-level approval gates', 'One-click sync to Tally Prime']
  },
  {
    id: 'bank',
    label: 'Bank Recon',
    title: 'Automated Bank Reconciliation',
    description: 'Import bank statements (HDFC, ICICI, SBI) and auto-match entries against Tally bank ledgers.',
    image: '/tallygpt_executive_dashboard.png',
    points: ['96% auto-match accuracy', 'Flag un-reconciled entries', 'Multi-bank account support']
  }
]

// Section 9: Simple Pricing Plans
const PRICING_PLANS = [
  {
    name: 'Professional',
    tag: 'Mid-Market Teams',
    description: 'For growing businesses looking to automate Tally ledgers, GST recon, and financial reports.',
    features: [
      'Up to 5 Connected Tally Companies',
      'Conversational AI Ledger Search',
      'Automated GST 2B & Bank Reconciliation',
      'One-Click Financial Report Generator',
      '100% On-Premises Local Processing',
      'Email & Community Support'
    ],
    isFeatured: false
  },
  {
    name: 'Business',
    tag: '⭐ Most Popular',
    description: 'For active accounting teams, CA practices, and multi-branch commercial enterprises.',
    features: [
      'Unlimited Connected Tally Companies',
      'Multi-Branch & Multi-Entity Workspace',
      'Automated Voucher OCR Drafting',
      'Advanced GST Mismatch Audit Engine',
      'Priority Support & Dedicated Onboarding',
      'Multi-User Desktop Agent Access'
    ],
    isFeatured: true
  },
  {
    name: 'Enterprise',
    tag: 'Large Corporate Groups',
    description: 'Custom private deployment for corporate groups needing TDL, ERP SQL, or VPC setups.',
    features: [
      'Unlimited Tally Companies & Multi-Branch',
      'Custom TDL & ERP SQL Gateway Connectors',
      'Granular Role-Based Access (RBAC)',
      'On-Premises or Private VPC Deployment',
      'Dedicated Account Manager & SLA',
      'Custom On-Site Staff Enablement'
    ],
    isFeatured: false
  }
]

// Section 11: 8 Clean FAQs
const FAQ_LIST = [
  { q: 'Does TallyGPT replace Tally Prime or ERP 9?', a: 'No. TallyGPT runs alongside your existing Tally instance on port 9000/9888. Tally remains your official system of record.' },
  { q: 'Is my accounting data uploaded to the cloud?', a: 'No. TallyGPT runs 100% on-premises. All vector indexing, search queries, and OCR parsing happen locally on your computer.' },
  { q: 'Which Tally versions are supported?', a: 'TallyGPT supports Tally Prime (v1.0 to v4.x) and Tally ERP 9 (Release 5.0+).' },
  { q: 'How do I install TallyGPT on Windows?', a: 'Download TallyGPT_Setup_v2.0.0.exe (52.4 MB), run the setup wizard, open Tally Prime, and TallyGPT will automatically detect your company.' },
  { q: 'Can I install TallyGPT on macOS or Linux?', a: 'Yes. In addition to the Windows .exe installer, TallyGPT includes automated setup scripts for macOS and Linux.' },
  { q: 'How does GST 2B reconciliation work?', a: 'Import your GSTR-2B file. TallyGPT automatically matches supplier GSTINs, invoice numbers, and tax rates against your Tally purchase books.' },
  { q: 'What are the system requirements?', a: 'Windows 10 or 11 (64-bit), 4 GB RAM minimum (8 GB recommended), and Tally Prime or ERP 9.' },
  { q: 'How do I schedule a live demo?', a: 'Click "Book Demo", enter your details, and an AlgoForce Product Specialist will host a 15-minute walkthrough.' }
]

export default function TallyGPTLanding() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [showStickyBar, setShowStickyBar] = useState(false)

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', role: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 450)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDownloadClick = () => {
    trackDownload('windows', 'v2.0.0', 'TallyGPT_Setup_v2.0.0.exe')
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setShowDemoModal(false)
      setFormSubmitted(false)
      setFormData({ name: '', email: '', phone: '', company: '', role: '' })
    }, 2500)
  }

  const activeModule = FEATURE_TABS.find((m) => m.id === activeTab) || FEATURE_TABS[0]

  return (
    <div className="relative min-h-screen bg-[#f7f9fc] text-[#06101d] font-sans">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (MATCHES PRODUCTS & LABS HERO DESIGN PATTERN) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden border-b border-[#06101d]/8 bg-white pt-32 pb-14 md:pt-36 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-12rem] right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#8f38ff]/10 blur-[90px]" />
          <div className="absolute bottom-[-12rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-[#062f4f]/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            
            {/* Left Column: Headline, Copy, Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 transition-colors hover:text-[#8f38ff]"
                >
                  <FaArrowLeft size={10} /> All products
                </Link>
              </div>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#06101d]/10 bg-[#f7f9fc] px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8f38ff]" />
                <span className="text-[10px] font-semibold uppercase text-slate-500">FINANCE SOFTWARE • TALLYGPT V2.0 DESKTOP READY</span>
              </div>

              <h1 className="mb-6 max-w-4xl text-[2.45rem] font-semibold leading-[1.03] sm:text-5xl md:text-6xl lg:text-[4.1rem] tracking-tight">
                TallyGPT — <span className="premium-serif italic font-normal text-[#8f38ff]">AI for Tally.</span>
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg font-normal">
                The fastest way to search ledgers, reconcile GST, generate reports, and automate accounting in Tally Prime &amp; ERP 9.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href="/TallyGPT_Setup_v2.0.0.exe"
                  download="TallyGPT_Setup_v2.0.0.exe"
                  onClick={handleDownloadClick}
                  className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#8f38ff] via-[#7e25f6] to-[#6116cd] px-7 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-xl shadow-purple-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FaDownload size={14} />
                  <span>Download TallyGPT for Windows</span>
                  <span className="rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-extrabold">52.4 MB</span>
                </a>

                <button
                  onClick={() => setShowVideoModal(true)}
                  className="flex items-center justify-center gap-2.5 rounded-2xl border border-[#06101d]/15 bg-white px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#06101d] transition-all hover:bg-slate-50 shadow-sm"
                >
                  <FaPlay size={11} className="text-[#8f38ff]" />
                  <span>Watch Demo</span>
                </button>

                <button
                  onClick={() => setShowDemoModal(true)}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#06101d] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-[#102640] shadow-md"
                >
                  <span>Book Demo</span>
                  <FaArrowRight size={10} />
                </button>
              </div>

              {/* Trust Badges Row */}
              <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 pt-4 border-t border-slate-100">
                <span className="flex items-center gap-1.5"><FaCheckCircle className="text-emerald-600" size={12} /> Works with Tally Prime</span>
                <span>•</span>
                <span className="flex items-center gap-1.5"><FaCheckCircle className="text-emerald-600" size={12} /> Works with ERP 9</span>
                <span>•</span>
                <span className="flex items-center gap-1.5"><FaLock className="text-[#8f38ff]" size={12} /> 100% Local On-Premises</span>
              </div>
            </motion.div>

            {/* Right Column: Live Looping Background Video Card (Exact Products & Labs Pattern) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.75 }}
              className="overflow-hidden rounded-[30px] border border-[#06101d]/10 bg-white p-4 shadow-[0_24px_70px_rgba(6,47,79,0.08)]"
            >
              <div className="relative aspect-[16/10] min-h-[300px] overflow-hidden rounded-[24px] border border-[#06101d]/10 bg-[#06101d]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover opacity-90"
                  poster="/tallygpt_executive_dashboard.png"
                >
                  <source src="/tallygpt_demo_video.mp4" type="video/mp4" />
                  <source src="/tallygpt-demo.mp4" type="video/mp4" />
                  <img src="/tallygpt_executive_dashboard.png" alt="TallyGPT Live Desktop Preview" />
                </video>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,16,29,0.08),rgba(6,16,29,0.78))]" />
                <div className="absolute left-5 right-5 bottom-5 text-white flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-[10px] font-semibold uppercase text-purple-300">TallyGPT Desktop Demonstration</p>
                    <h2 className="text-lg font-bold tracking-tight text-white">Live Sync: Tally Prime :9000</h2>
                  </div>
                  <button
                    onClick={() => setShowVideoModal(true)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#8f38ff] text-white shadow-lg transition-transform hover:scale-110"
                  >
                    <FaPlay size={14} className="ml-0.5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-500 px-2">
                <span className="text-emerald-700 font-bold">✓ Verified Native Release</span>
                <span>SHA256 Signed • 52.4 MB</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHY ACCOUNTANTS WASTE HOURS EVERY WEEK */}
      {/* ========================================================================= */}
      <section className="py-20 border-b border-[#06101d]/8 bg-[#f7f9fc]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f38ff]">Daily Friction</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-[#06101d]">
              Why Accountants Waste Hours Every Week
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PAIN_POINTS.map((pain) => (
              <div key={pain.title} className="rounded-[28px] border border-[#06101d]/10 bg-white p-7 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-600 mb-4">
                  <FaExclamationTriangle size={16} />
                </div>
                <h3 className="text-base font-bold text-[#06101d] mb-2">{pain.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHAT YOU'LL SAVE (RESULT METRICS) */}
      {/* ========================================================================= */}
      <section className="py-20 border-b border-[#06101d]/8 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f38ff]">Quantifiable Results</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-[#06101d]">
              What You'll Save
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SAVINGS_METRICS.map((s) => (
              <div key={s.label} className="rounded-[28px] border border-[#06101d]/10 bg-[#f7f9fc] p-7 text-center shadow-sm">
                <div className="text-3xl font-black text-[#8f38ff] mb-2">{s.metric}</div>
                <h3 className="text-sm font-bold text-[#06101d] mb-1.5">{s.label}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. EVERYTHING YOU CAN DO (INTERACTIVE TABS & SCREENSHOTS) */}
      {/* ========================================================================= */}
      <section className="py-20 border-b border-[#06101d]/8 bg-[#f7f9fc]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f38ff]">Product Features</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-[#06101d]">
              Everything You Can Do
            </h2>
          </div>

          {/* Tabs Switcher (Touch Scrollable on Mobile) */}
          <div className="mb-8 flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none text-nowrap">
            {FEATURE_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 text-xs font-bold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#06101d] text-white shadow-md'
                    : 'border border-[#06101d]/12 bg-white text-slate-600 hover:bg-slate-100 hover:text-[#06101d]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Screen Display */}
          <div className="rounded-[24px] sm:rounded-[32px] border border-[#06101d]/12 bg-[#06101d] p-4 sm:p-6 md:p-8 text-white shadow-2xl">
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{activeModule.title}</h3>
                <p className="mt-1 text-xs text-slate-300 max-w-2xl">{activeModule.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {activeModule.points.map((p) => (
                  <span key={p} className="rounded-xl border border-white/10 bg-white/5 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs text-purple-300 font-semibold">
                    ✓ {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-slate-900">
              <img
                src={activeModule.image}
                alt={activeModule.title}
                className="w-full h-auto object-cover rounded-xl sm:rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. HOW TALLYGPT WORKS (4 SIMPLE STEPS) */}
      {/* ========================================================================= */}
      <section className="py-20 border-b border-[#06101d]/8 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f38ff]">Simple Setup</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-[#06101d]">
              How TallyGPT Works
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-4 text-center">
            <div className="rounded-[24px] border border-[#06101d]/10 bg-[#f7f9fc] p-6">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#06101d] text-white font-bold text-xs">1</div>
              <h3 className="text-sm font-bold text-[#06101d] mb-1">Download</h3>
              <p className="text-xs text-slate-500">Download TallyGPT_Setup_v2.0.0.exe</p>
            </div>

            <div className="rounded-[24px] border border-[#06101d]/10 bg-[#f7f9fc] p-6">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#8f38ff] text-white font-bold text-xs">2</div>
              <h3 className="text-sm font-bold text-[#06101d] mb-1">Connect to Tally</h3>
              <p className="text-xs text-slate-500">Auto-detects Tally on port 9000</p>
            </div>

            <div className="rounded-[24px] border border-[#06101d]/10 bg-[#f7f9fc] p-6">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs">3</div>
              <h3 className="text-sm font-bold text-[#06101d] mb-1">Auto-Index</h3>
              <p className="text-xs text-slate-500">Creates local ledger vector index</p>
            </div>

            <div className="rounded-[24px] border border-[#06101d]/10 bg-[#f7f9fc] p-6">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-xs">4</div>
              <h3 className="text-sm font-bold text-[#06101d] mb-1">Ask &amp; Automate</h3>
              <p className="text-xs text-slate-500">Search ledgers &amp; run reconciliations</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. OFFICIAL DOWNLOAD SECTION */}
      {/* ========================================================================= */}
      <TallyGPTDownloadCard />

      {/* ========================================================================= */}
      {/* 8. PRICING (SIMPLE & TRANSPARENT) */}
      {/* ========================================================================= */}
      <section className="py-20 border-b border-[#06101d]/8 bg-[#f7f9fc]" id="pricing">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f38ff]">Transparent Pricing</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-[#06101d]">
              Pricing
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-[32px] p-8 shadow-md transition-all ${
                  plan.isFeatured
                    ? 'border-2 border-[#8f38ff] bg-[#06101d] text-white shadow-2xl scale-[1.02]'
                    : 'border border-[#06101d]/10 bg-white text-[#06101d]'
                }`}
              >
                <div>
                  <span className={`inline-block rounded-full px-3.5 py-1 text-[10px] font-bold mb-4 ${
                    plan.isFeatured ? 'bg-[#8f38ff] text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {plan.tag}
                  </span>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className={`mt-3 text-xs leading-relaxed min-h-[48px] ${plan.isFeatured ? 'text-slate-300' : 'text-slate-600'}`}>
                    {plan.description}
                  </p>

                  <ul className={`mt-6 space-y-3.5 border-t pt-6 text-xs ${plan.isFeatured ? 'border-white/10 text-slate-300' : 'border-slate-100 text-slate-700'}`}>
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <FaCheckCircle className={`mt-0.5 shrink-0 ${plan.isFeatured ? 'text-purple-300' : 'text-[#8f38ff]'}`} size={13} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100/20">
                  {plan.name === 'Enterprise' ? (
                    <button
                      onClick={() => setShowDemoModal(true)}
                      className="w-full rounded-2xl bg-white py-4 text-xs font-bold uppercase tracking-wider text-[#06101d] hover:bg-slate-100 transition-colors shadow-md"
                    >
                      Book Enterprise Demo
                    </button>
                  ) : (
                    <a
                      href="/TallyGPT_Setup_v2.0.0.exe"
                      download="TallyGPT_Setup_v2.0.0.exe"
                      onClick={handleDownloadClick}
                      className={`w-full flex items-center justify-center gap-2 rounded-2xl py-4 text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                        plan.isFeatured
                          ? 'bg-[#8f38ff] text-white hover:bg-purple-600'
                          : 'bg-[#06101d] text-white hover:bg-[#102640]'
                      }`}
                    >
                      <FaDownload size={12} />
                      <span>Download TallyGPT (52.4 MB)</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. BUILT FOR SECURE FINANCE TEAMS (ENTERPRISE TRUST AT BOTTOM) */}
      {/* ========================================================================= */}
      <section className="py-20 border-b border-[#06101d]/8 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f38ff]">Enterprise Security</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-[#06101d]">
              Built for Secure Finance Teams
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-[24px] border border-[#06101d]/10 bg-[#f7f9fc] p-7 shadow-sm">
              <FaLock className="text-[#8f38ff] mb-4" size={22} />
              <h3 className="text-lg font-bold text-[#06101d]">Private Cloud / On-Premises</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Deploy TallyGPT locally or inside your private AWS/Azure VPC infrastructure.
              </p>
            </div>

            <div className="rounded-[24px] border border-[#06101d]/10 bg-[#f7f9fc] p-7 shadow-sm">
              <FaShieldAlt className="text-blue-600 mb-4" size={22} />
              <h3 className="text-lg font-bold text-[#06101d]">Role-Based Access (RBAC)</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Control user permissions, ledger visibility scopes, and voucher draft approval thresholds.
              </p>
            </div>

            <div className="rounded-[24px] border border-[#06101d]/10 bg-[#f7f9fc] p-7 shadow-sm">
              <FaServer className="text-emerald-600 mb-4" size={22} />
              <h3 className="text-lg font-bold text-[#06101d]">Custom TDL &amp; ERP Connectors</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Integrate custom Tally TDL scripts, SQL databases, or SAP alongside Tally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. FAQ (8 CLEAN ACCORDION QUESTIONS) */}
      {/* ========================================================================= */}
      <section className="py-20 border-b border-[#06101d]/8 bg-[#f7f9fc]">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="text-center mb-16">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f38ff]">Help &amp; Support</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-[#06101d]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQ_LIST.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div key={idx} className="rounded-2xl border border-[#06101d]/10 bg-white overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left font-bold text-sm text-[#06101d] hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <FaChevronUp className="text-[#8f38ff]" /> : <FaChevronDown className="text-slate-400" />}
                  </button>

                  {isOpen && (
                    <div className="p-6 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. FINAL CONVERSION CTA */}
      {/* ========================================================================= */}
      <section className="bg-[#06101d] py-24 text-white px-5 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl text-white">
            Start Using AI with Tally Today.
          </h2>
          <p className="mt-4 text-base text-slate-300 max-w-xl mx-auto">
            Join accounting teams and finance leaders automating Tally workflows.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/TallyGPT_Setup_v2.0.0.exe"
              download="TallyGPT_Setup_v2.0.0.exe"
              onClick={handleDownloadClick}
              className="inline-flex items-center gap-3 rounded-2xl bg-[#8f38ff] px-8 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-xl hover:bg-purple-600 transition-colors"
            >
              <FaDownload size={14} />
              <span>Download TallyGPT for Windows (52.4 MB)</span>
            </a>

            <button
              onClick={() => setShowDemoModal(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#06101d] hover:bg-slate-100 transition-colors shadow-lg"
            >
              <span>Book Demo</span>
              <FaArrowRight size={10} />
            </button>
          </div>
        </div>
      </section>

      {/* FLOATING STICKY SIDEBAR ACTION CARD */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 left-6 z-40 max-w-xs sm:max-w-sm rounded-[24px] border border-[#06101d]/15 bg-[#06101d]/95 p-4 text-white shadow-[0_20px_50px_rgba(6,47,79,0.3)] backdrop-blur-xl hidden md:block"
          >
            <div className="flex items-center justify-between gap-3 mb-2.5 pb-2.5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8f38ff] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8f38ff]" />
                </span>
                <span className="text-xs font-bold tracking-tight text-white">TallyGPT v2.0 Desktop</span>
              </div>
              <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
                52.4 MB .exe
              </span>
            </div>

            <p className="text-[11px] text-slate-300 mb-3 leading-snug font-normal">
              Automate ledgers, GST 2B recon, and financial reports in Tally.
            </p>

            <div className="flex flex-col gap-2">
              <a
                href="/TallyGPT_Setup_v2.0.0.exe"
                download="TallyGPT_Setup_v2.0.0.exe"
                onClick={handleDownloadClick}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8f38ff] to-[#7e25f6] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <FaDownload size={12} />
                <span>Download for Windows</span>
              </a>

              <button
                onClick={() => setShowDemoModal(true)}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/10 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20 transition-colors"
              >
                <span>Book Live Demo</span>
                <FaArrowRight size={9} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE COMPACT FLOATING BAR (RAISED TO AVOID AI CONSULT BUTTON) */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-20 left-4 z-40 max-w-[calc(100%-80px)] rounded-2xl border border-[#06101d]/15 bg-[#06101d]/95 p-2.5 px-3.5 backdrop-blur-xl shadow-2xl flex items-center gap-2 text-white md:hidden"
          >
            <a
              href="/TallyGPT_Setup_v2.0.0.exe"
              download="TallyGPT_Setup_v2.0.0.exe"
              onClick={handleDownloadClick}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#8f38ff] px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider text-white shadow-md"
            >
              <FaDownload size={10} />
              <span>Download (52.4 MB)</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {showVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl rounded-3xl border border-white/10 bg-[#06101d] p-6 text-white shadow-2xl"
            >
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white"
              >
                <FaTimes size={16} />
              </button>
              <h3 className="text-xl font-bold mb-4">TallyGPT Interactive Product Tour</h3>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black aspect-video flex items-center justify-center">
                <video
                  controls
                  autoPlay
                  className="w-full h-full object-cover rounded-2xl"
                  poster="/tallygpt_executive_dashboard.png"
                >
                  <source src="/tallygpt_demo_video.mp4" type="video/mp4" />
                  <source src="/tallygpt-demo.mp4" type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DEMO MODAL */}
      <AnimatePresence>
        {showDemoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-[32px] border border-[#06101d]/10 bg-white p-8 shadow-2xl text-[#06101d]"
            >
              <button
                onClick={() => setShowDemoModal(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-[#06101d]"
              >
                <FaTimes size={18} />
              </button>

              {!formSubmitted ? (
                <>
                  <div className="mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8f38ff]">15-Minute Tailored Walkthrough</span>
                    <h3 className="mt-1 text-2xl font-bold text-[#06101d]">Book a Live Demo</h3>
                    <p className="mt-1 text-xs text-slate-600">
                      See how TallyGPT integrates into your specific accounting workflows.
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Rajeev Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-xs text-[#06101d] focus:border-[#8f38ff] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Work Email</label>
                        <input
                          type="email"
                          required
                          placeholder="rajeev@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-xs text-[#06101d] focus:border-[#8f38ff] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-xs text-[#06101d] focus:border-[#8f38ff] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Acme Manufacturing Ltd"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-xs text-[#06101d] focus:border-[#8f38ff] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Your Role</label>
                        <input
                          type="text"
                          required
                          placeholder="CFO / Accountant"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-xs text-[#06101d] focus:border-[#8f38ff] focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-6 w-full rounded-2xl bg-[#06101d] py-4 text-xs font-bold uppercase tracking-widest text-white shadow-xl hover:bg-[#102640]"
                    >
                      Schedule Demo
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                    <FaCheckCircle size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#06101d]">Demo Scheduled</h3>
                  <p className="mt-2 text-xs text-slate-600">
                    An AlgoForce Product Specialist will contact you shortly to confirm your session.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
