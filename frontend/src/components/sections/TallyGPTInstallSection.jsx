import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaWindows,
  FaApple,
  FaLinux,
  FaDownload,
  FaCheckCircle,
  FaCopy,
  FaCheck,
  FaShieldAlt,
  FaRocket,
  FaTerminal,
  FaDesktop,
  FaServer,
  FaExternalLinkAlt,
  FaTimes,
  FaInfoCircle
} from 'react-icons/fa'

const OS_PLATFORMS = [
  {
    id: 'windows',
    name: 'Windows 10 / 11',
    subtitle: 'Desktop Application',
    icon: FaWindows,
    color: '#00adef',
    recommended: true,
    fileType: 'Windows Desktop Installer (.exe)',
    fileSize: '12.3 MB',
    fileName: 'TallyGPT_Setup.exe',
    downloadUrl: '/tallygpt_setup.exe',
    requirements: ['Windows 10 / 11 (64-bit)', 'Tally Prime or Tally ERP 9', '4 GB RAM minimum'],
    steps: [
      'Click "Install TallyGPT for Windows" to download installer',
      'Run installer and complete the setup wizard',
      'Ensure Tally Prime is running on localhost (Default port 9000)',
      'Launch TallyGPT Desktop — it will auto-detect your Tally Company!'
    ]
  },
  {
    id: 'mac',
    name: 'macOS (Apple Silicon & Intel)',
    subtitle: 'Universal App & Terminal Installer',
    icon: FaApple,
    color: '#a3aaae',
    recommended: false,
    fileType: '.dmg / .app',
    fileSize: '8.2 MB',
    fileName: 'tallygpt-mac.dmg',
    installCmd: 'curl -fsSL https://download.algoforce.ai/tallygpt-mac.sh | sh',
    requirements: ['macOS Monterey 12.0 or newer', 'Apple Silicon (M1-M4) or Intel Core', 'Tally Web API Gateway connected'],
    steps: [
      'Download the macOS package or run the terminal automated installer',
      'Move TallyGPT.app to your Applications folder',
      'Grant local network access permissions when prompted',
      'Connect to your remote or local Tally Server IP'
    ]
  },
  {
    id: 'linux',
    name: 'Linux (x86_64 / ARM64)',
    subtitle: 'AppImage, DEB & Shell Package',
    icon: FaLinux,
    color: '#f34f29',
    recommended: false,
    fileType: '.AppImage / .deb',
    fileSize: '7.9 MB',
    fileName: 'tallygpt-linux-x86_64.AppImage',
    installCmd: 'curl -fsSL https://download.algoforce.ai/tallygpt-linux.sh | sh',
    requirements: ['Ubuntu 20.04+, Debian 11+, RHEL/Fedora', 'GLIBC 2.31+', 'Local network route to Tally host'],
    steps: [
      'Download the AppImage file or run the Linux bash setup script',
      'Make executable: chmod +x tallygpt-linux-x86_64.AppImage',
      'Run ./tallygpt-linux-x86_64.AppImage --daemon',
      'Pair with AlgoForce Finance AI via local authorization token'
    ]
  }
]

export default function TallyGPTInstallSection({ isModalOpen, setIsModalOpen, modalOnly = false }) {
  const [activeTab, setActiveTab] = useState('windows')
  const [copiedCmd, setCopiedCmd] = useState(false)
  const [downloadCount, setDownloadCount] = useState(1482)
  const [isDownloading, setIsDownloading] = useState(false)

  const activeOS = OS_PLATFORMS.find((p) => p.id === activeTab) || OS_PLATFORMS[0]

  const handleCopyCmd = (cmd) => {
    if (!cmd) return
    navigator.clipboard.writeText(cmd)
    setCopiedCmd(true)
    setTimeout(() => setCopiedCmd(false), 2200)
  }

  const handleDownload = () => {
    setIsDownloading(true)
    setDownloadCount((prev) => prev + 1)
    setTimeout(() => setIsDownloading(false), 2000)
  }

  if (modalOnly) {
    return (
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-purple-500/30 bg-[#0a1526] p-6 text-white shadow-2xl md:p-8"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-400 transition-colors hover:bg-white/20 hover:text-white"
              >
                <FaTimes size={16} />
              </button>

              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 border border-purple-500/30 text-purple-400">
                  <FaDesktop size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">TallyGPT Desktop Installation Guide</h3>
                  <p className="text-xs text-slate-400">Official setup manual for Windows 10/11, macOS &amp; Linux</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Windows direct section */}
                <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <FaWindows className="text-[#00adef]" size={20} />
                      <h4 className="text-base font-bold text-white">Windows 10 / 11 Desktop Agent</h4>
                    </div>
                    <span className="rounded-full bg-purple-500/30 px-3 py-1 text-xs font-bold text-purple-200">
                      Installer Ready
                    </span>
                  </div>
                  <p className="mb-4 text-xs text-slate-300 leading-relaxed">
                    Download the pre-compiled TallyGPT Desktop Agent for Windows 10 &amp; 11. Includes zero-dependency installer with local proxy service.
                  </p>
                  <a
                    href="/tallygpt_setup.exe"
                    download="tallygpt_setup.exe"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-purple-500"
                  >
                    <FaDownload size={12} /> Install TallyGPT Desktop for Windows (12.3 MB)
                  </a>
                </div>

                {/* macOS & Linux details */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <FaApple size={18} className="text-slate-300" />
                      <h4 className="text-sm font-bold text-white">macOS Installation</h4>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">
                      Run automated bash setup script in Terminal:
                    </p>
                    <div className="flex items-center justify-between rounded-xl bg-black/60 px-3 py-2 text-[11px] font-mono text-cyan-300 border border-slate-800">
                      <span className="truncate">curl -fsSL https://download.algoforce.ai/tallygpt-mac.sh | sh</span>
                      <button
                        onClick={() => handleCopyCmd('curl -fsSL https://download.algoforce.ai/tallygpt-mac.sh | sh')}
                        className="ml-2 text-slate-400 hover:text-white"
                      >
                        {copiedCmd ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <FaLinux size={18} className="text-orange-500" />
                      <h4 className="text-sm font-bold text-white">Linux AppImage / Shell</h4>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">
                      Run automated bash setup script in Terminal:
                    </p>
                    <div className="flex items-center justify-between rounded-xl bg-black/60 px-3 py-2 text-[11px] font-mono text-orange-300 border border-slate-800">
                      <span className="truncate">curl -fsSL https://download.algoforce.ai/tallygpt-linux.sh | sh</span>
                      <button
                        onClick={() => handleCopyCmd('curl -fsSL https://download.algoforce.ai/tallygpt-linux.sh | sh')}
                        className="ml-2 text-slate-400 hover:text-white"
                      >
                        {copiedCmd ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <section className="relative overflow-hidden bg-[#06101d] py-16 text-white md:py-24">
      {/* Glow background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 h-[35rem] w-[35rem] -translate-x-1/2 rounded-full bg-[#8f38ff]/15 blur-[120px]" />
        <div className="absolute bottom-0 right-10 h-[25rem] w-[25rem] rounded-full bg-[#00adef]/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        {/* Header Badge & Title */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 backdrop-blur-md">
            <FaRocket className="text-purple-400" size={12} />
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-300">
              Desktop Connector Agent
            </span>
          </div>

          <h2 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Install TallyGPT Desktop Engine
          </h2>
          <p className="text-base text-slate-300 md:text-lg">
            Download the native desktop agent to connect your local Tally Prime or Tally ERP 9 instance to AlgoForce Finance AI. Works on Windows, macOS, and Linux.
          </p>
        </div>

        {/* OS Platform Selector Tabs */}
        <div className="mb-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3">
          {OS_PLATFORMS.map((platform) => {
            const Icon = platform.icon
            const isActive = activeTab === platform.id
            return (
              <button
                key={platform.id}
                onClick={() => setActiveTab(platform.id)}
                className={`relative flex items-center gap-3 rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 font-semibold transition-all duration-300 ${isActive
                    ? 'border border-purple-500/50 bg-[#121c2d] text-white shadow-[0_10px_30px_rgba(143,56,255,0.25)]'
                    : 'border border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <Icon size={20} style={{ color: platform.color }} />
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{platform.name}</span>
                    {platform.recommended && (
                      <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-300">
                        Recommended
                      </span>
                    )}
                  </div>
                  <span className="block text-[11px] font-normal text-slate-400">{platform.fileType}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Active OS Card Container */}
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-[#0c192c]/80 p-6 backdrop-blur-xl shadow-2xl md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeOS.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid gap-8 lg:grid-cols-12"
            >
              {/* Left Column: Download & CTA */}
              <div className="flex flex-col justify-between lg:col-span-6">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/10 shadow-inner">
                      <activeOS.icon size={26} style={{ color: activeOS.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{activeOS.name}</h3>
                      <p className="text-xs text-purple-300 font-medium">{activeOS.subtitle}</p>
                    </div>
                  </div>

                  <p className="mb-6 text-sm text-slate-300 leading-relaxed">
                    Designed for high-speed local data indexing, seamless ledger synchronization, and privacy-first encrypted communication with AlgoForce Finance AI.
                  </p>

                  {/* Requirements List */}
                  <div className="mb-6 space-y-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">System Requirements:</span>
                    {activeOS.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <FaCheckCircle className="text-purple-400 shrink-0" size={12} />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Download / Install Action */}
                <div className="mt-4 pt-6 border-t border-white/10">
                  {activeOS.id === 'windows' ? (
                    <div>
                      <a
                        href={activeOS.downloadUrl}
                        download={activeOS.fileName}
                        onClick={handleDownload}
                        className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#8f38ff] to-[#701ce3] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.02] hover:shadow-purple-500/40 active:scale-[0.98]"
                      >
                        <FaDownload size={16} className={`${isDownloading ? 'animate-bounce' : 'group-hover:translate-y-0.5'} transition-transform`} />
                        <span>Install TallyGPT for Windows</span>
                      </a>
                      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 px-1">
                        <span>Size: <strong className="text-slate-200">{activeOS.fileSize}</strong></span>
                        <span className="flex items-center gap-1 text-emerald-400">
                          <FaShieldAlt size={10} /> Verified & Secure Installer
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="mb-2 text-xs font-semibold text-slate-300">Run terminal quick install command:</p>
                      <div className="relative mb-3 flex items-center rounded-xl border border-white/10 bg-black/50 p-3">
                        <code className="text-xs font-mono text-purple-300 pr-10 overflow-x-auto whitespace-nowrap block">
                          {activeOS.installCmd}
                        </code>
                        <button
                          onClick={() => handleCopyCmd(activeOS.installCmd)}
                          className="absolute right-2 rounded-lg bg-white/10 p-2 text-slate-300 transition-colors hover:bg-white/20 hover:text-white"
                          title="Copy command"
                        >
                          {copiedCmd ? <FaCheck size={12} className="text-emerald-400" /> : <FaCopy size={12} />}
                        </button>
                      </div>

                      <a
                        href={activeOS.downloadUrl || '#'}
                        onClick={(e) => {
                          if (!activeOS.downloadUrl || activeOS.downloadUrl === '#') {
                            e.preventDefault()
                            alert(`Downloading TallyGPT installer for ${activeOS.name}... (Windows installer is available directly above!)`)
                          }
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-xs font-bold text-white transition-all hover:bg-white/10"
                      >
                        <FaDownload size={12} /> Install Package ({activeOS.fileType})
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Step-by-Step Prompt */}
              <div className="rounded-2xl border border-white/10 bg-[#07111e]/90 p-6 lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-purple-300">
                      <FaDesktop className="text-purple-400" /> Quick Setup Instructions
                    </h4>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                      4 Step Quick Setup
                    </span>
                  </div>

                  <div className="space-y-4">
                    {activeOS.steps.map((stepText, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-xs font-bold text-purple-300 border border-purple-500/30">
                          {idx + 1}
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed pt-0.5">
                          {stepText}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Trust & Modal Trigger Bar */}
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-400">
                    <FaServer className="text-purple-400" />
                    <span>Connects to local port 9000</span>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 transition-colors hover:text-purple-300"
                  >
                    Full Installation Manual <FaExternalLinkAlt size={10} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <FaShieldAlt className="mb-3 text-2xl text-purple-400" />
            <h4 className="mb-2 text-base font-bold text-white">100% On-Premises Privacy</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your financial data stays local. TallyGPT processes transactions directly on your machine without storing ledgers in external clouds.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <FaServer className="mb-3 text-2xl text-cyan-400" />
            <h4 className="mb-2 text-base font-bold text-white">Tally Prime & ERP 9 Ready</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compatible with all major versions of Tally Prime, Tally ERP 9, and multi-user silver/gold server configurations.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <FaTerminal className="mb-3 text-2xl text-emerald-400" />
            <h4 className="mb-2 text-base font-bold text-white">Instant Natural Language Sync</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Query accounting reports, post ledger vouchers, and reconcile statements using natural language commands directly inside Finance AI.
            </p>
          </div>
        </div>
      </div>

      {/* Modal Popup Component */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-purple-500/30 bg-[#0a1526] p-6 text-white shadow-2xl md:p-8"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-400 transition-colors hover:bg-white/20 hover:text-white"
              >
                <FaTimes size={16} />
              </button>

              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 border border-purple-500/30 text-purple-400">
                  <FaDesktop size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">TallyGPT Desktop Installation Guide</h3>
                  <p className="text-xs text-slate-400">Official setup manual for Windows 10/11, macOS & Linux</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Windows direct section */}
                <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <FaWindows className="text-[#00adef]" size={20} />
                      <h4 className="text-base font-bold text-white">Windows 10 / 11 Desktop Agent</h4>
                    </div>
                    <span className="rounded-full bg-purple-500/30 px-3 py-1 text-xs font-bold text-purple-200">
                      Installer Ready
                    </span>
                  </div>
                  <p className="mb-4 text-xs text-slate-300 leading-relaxed">
                    Download the pre-compiled TallyGPT Desktop Agent for Windows 10 & 11. Includes zero-dependency installer with local proxy service.
                  </p>
                  <a
                    href="/tallygpt_setup.exe"
                    download="tallygpt_setup.exe"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-purple-500"
                  >
                    <FaDownload size={12} /> Install TallyGPT Desktop for Windows (12.3 MB)
                  </a>
                </div>

                {/* macOS & Linux details */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <FaApple className="text-slate-300" size={18} />
                      <h5 className="text-sm font-bold text-white">macOS Setup</h5>
                    </div>
                    <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                      Compatible with macOS 12+. Requires terminal curl script or DMG package installation.
                    </p>
                    <code className="block rounded-lg bg-black/60 p-2 text-[11px] font-mono text-purple-300 mb-3">
                      curl -fsSL https://download.algoforce.ai/tallygpt-mac.sh | sh
                    </code>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <FaLinux className="text-orange-400" size={18} />
                      <h5 className="text-sm font-bold text-white">Linux Setup</h5>
                    </div>
                    <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                      Compatible with Ubuntu, Debian, RHEL. Ships as portable AppImage & DEB package.
                    </p>
                    <code className="block rounded-lg bg-black/60 p-2 text-[11px] font-mono text-purple-300 mb-3">
                      curl -fsSL https://download.algoforce.ai/tallygpt-linux.sh | sh
                    </code>
                  </div>
                </div>

                {/* Troubleshooting / FAQ inside modal */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h5 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <FaInfoCircle className="text-purple-400" /> Tally Configuration Check
                  </h5>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">•</span>
                      Open Tally Prime &rarr; F12 (Configure) &rarr; Advanced Configuration &rarr; Enable ODBC Server: <strong>Yes</strong> (Port 9000).
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">•</span>
                      Ensure Tally Prime is open with your desired company loaded before launching TallyGPT Desktop.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
