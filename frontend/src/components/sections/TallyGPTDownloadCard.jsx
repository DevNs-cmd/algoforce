import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FaWindows,
  FaApple,
  FaLinux,
  FaDownload,
  FaShieldAlt,
  FaCheckCircle,
  FaCopy,
  FaCheck,
  FaKey,
  FaCalendarAlt,
  FaHdd,
  FaTag,
  FaChevronDown,
  FaChevronUp,
  FaInfoCircle
} from 'react-icons/fa'
import { getReleaseManifest, trackDownload, DEFAULT_RELEASE_DATA } from '../../utils/releasesManager'

export default function TallyGPTDownloadCard() {
  const [manifest, setManifest] = useState(DEFAULT_RELEASE_DATA)
  const [activePlatform, setActivePlatform] = useState('windows')
  const [copiedHash, setCopiedHash] = useState(false)
  const [copiedCmd, setCopiedCmd] = useState(false)
  const [showNotes, setShowNotes] = useState(false)

  useEffect(() => {
    getReleaseManifest().then((data) => {
      if (data) setManifest(data)
    })
  }, [])

  const currentPlatform = manifest.platforms[activePlatform] || manifest.platforms.windows
  const latest = manifest.latest

  const handleDownload = (platformId, fileName, fileUrl) => {
    trackDownload(platformId, latest.version, fileName)
  }

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
    if (type === 'hash') {
      setCopiedHash(true)
      setTimeout(() => setCopiedHash(false), 2000)
    } else {
      setCopiedCmd(true)
      setTimeout(() => setCopiedCmd(false), 2000)
    }
  }

  return (
    <section className="py-20 border-b border-[#06101d]/8 bg-white" id="download">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 backdrop-blur-md">
            <FaDownload className="text-[#8f38ff]" size={12} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8f38ff]">
              Official Installer Releases
            </span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-[#06101d]">
            Get TallyGPT for Desktop
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Native, zero-dependency desktop application for Windows, macOS, and Linux.
          </p>
        </div>

        {/* Platform Selector Tabs */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setActivePlatform('windows')}
            className={`flex items-center gap-2.5 rounded-2xl px-6 py-3.5 text-xs font-bold transition-all duration-200 ${
              activePlatform === 'windows'
                ? 'bg-[#06101d] text-white shadow-lg'
                : 'border border-[#06101d]/12 bg-[#f7f9fc] text-slate-600 hover:bg-slate-100 hover:text-[#06101d]'
            }`}
          >
            <FaWindows className="text-[#00adef]" size={16} />
            <span>Windows (64-bit)</span>
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-extrabold text-emerald-400">
              Primary .exe
            </span>
          </button>

          <button
            onClick={() => setActivePlatform('mac')}
            className={`flex items-center gap-2.5 rounded-2xl px-6 py-3.5 text-xs font-bold transition-all duration-200 ${
              activePlatform === 'mac'
                ? 'bg-[#06101d] text-white shadow-lg'
                : 'border border-[#06101d]/12 bg-[#f7f9fc] text-slate-600 hover:bg-slate-100 hover:text-[#06101d]'
            }`}
          >
            <FaApple className="text-slate-300" size={16} />
            <span>macOS Universal</span>
          </button>

          <button
            onClick={() => setActivePlatform('linux')}
            className={`flex items-center gap-2.5 rounded-2xl px-6 py-3.5 text-xs font-bold transition-all duration-200 ${
              activePlatform === 'linux'
                ? 'bg-[#06101d] text-white shadow-lg'
                : 'border border-[#06101d]/12 bg-[#f7f9fc] text-slate-600 hover:bg-slate-100 hover:text-[#06101d]'
            }`}
          >
            <FaLinux className="text-orange-400" size={16} />
            <span>Linux AppImage / Shell</span>
          </button>
        </div>

        {/* Main Installer Release Card */}
        <div className="rounded-[32px] border border-[#06101d]/12 bg-[#06101d] text-white p-8 md:p-10 shadow-[0_28px_80px_rgba(6,47,79,0.14)] relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#8f38ff]/20 blur-[90px]" />

          <div className="grid gap-8 md:grid-cols-[1.3fr_0.7fr] items-center relative z-10">
            {/* Left Info Column */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="rounded-full bg-[#8f38ff]/20 px-3 py-1 text-[11px] font-extrabold text-purple-300 border border-[#8f38ff]/30">
                  {latest.version} {latest.channel}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                  <FaCalendarAlt size={12} /> Released {latest.releaseDate}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                  <FaHdd size={12} /> {currentPlatform.fileSize}
                </span>
              </div>

              <h3 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                {currentPlatform.name}
              </h3>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                Official standalone desktop package built for {currentPlatform.requirements}. Integrates with Tally Prime and Tally ERP 9 via zero-latency local proxy.
              </p>

              {/* Direct Download Button for Windows / Shell for Mac & Linux */}
              {activePlatform === 'windows' ? (
                <div className="space-y-3">
                  <a
                    href={currentPlatform.fileUrl}
                    download={currentPlatform.fileName}
                    onClick={() => handleDownload('windows', currentPlatform.fileName, currentPlatform.fileUrl)}
                    className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#8f38ff] via-[#7e25f6] to-[#6116cd] px-9 py-5 text-sm font-bold uppercase tracking-widest text-white shadow-2xl shadow-purple-500/30 transition-all hover:scale-[1.02] hover:shadow-purple-500/50 active:scale-[0.98]"
                  >
                    <FaDownload size={16} />
                    <span>Download TallyGPT for Windows</span>
                    <span className="rounded-md bg-white/20 px-2 py-0.5 text-[11px] font-extrabold">.exe</span>
                  </a>
                  <p className="text-[11px] text-slate-400">
                    Direct download • {currentPlatform.fileName} ({currentPlatform.fileSize})
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-black/60 p-4 font-mono text-xs text-purple-300 flex items-center justify-between gap-3">
                    <span className="truncate">{currentPlatform.shellCmd}</span>
                    <button
                      onClick={() => copyToClipboard(currentPlatform.shellCmd, 'cmd')}
                      className="shrink-0 flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-white/20 transition-colors"
                    >
                      {copiedCmd ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                      <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={currentPlatform.fileUrl}
                      download={currentPlatform.fileName}
                      onClick={() => handleDownload(activePlatform, currentPlatform.fileName, currentPlatform.fileUrl)}
                      className="inline-flex items-center gap-2 text-xs font-bold text-purple-300 hover:text-white underline"
                    >
                      <FaDownload size={11} /> Alternative direct package download
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Right Security & Checksum Column */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 text-xs space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-white/10 pb-3">
                <FaShieldAlt size={16} />
                <span>Verified Release Credentials</span>
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Digital Publisher:</span>
                  <span className="font-semibold text-white">{currentPlatform.publisher}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Status:</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <FaCheckCircle size={10} /> Digitally Signed
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Architecture:</span>
                  <span className="font-mono text-purple-300">{currentPlatform.arch}</span>
                </div>
              </div>

              {/* SHA256 Checksum block */}
              <div className="border-t border-white/10 pt-3">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400 mb-1">
                  <span className="flex items-center gap-1"><FaKey size={10} /> SHA256 Checksum</span>
                  <button
                    onClick={() => copyToClipboard(currentPlatform.sha256, 'hash')}
                    className="text-purple-300 hover:text-white flex items-center gap-1"
                  >
                    {copiedHash ? <FaCheck className="text-emerald-400" /> : <FaCopy size={10} />}
                    <span>{copiedHash ? 'Copied' : 'Copy Hash'}</span>
                  </button>
                </div>
                <div className="font-mono text-[10px] text-slate-300 bg-black/50 p-2 rounded-xl break-all border border-white/5">
                  {currentPlatform.sha256}
                </div>
              </div>
            </div>
          </div>

          {/* Security Guarantee Badges Grid */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-400" size={14} />
              <span>Official AlgoForce Release</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-400" size={14} />
              <span>Malware &amp; Virus Scanned</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-400" size={14} />
              <span>Secure SSL Download</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-400" size={14} />
              <span>No Bundled Software</span>
            </div>
          </div>

          {/* Toggle Release Notes */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="inline-flex items-center gap-2 text-xs font-bold text-purple-300 hover:text-white transition-colors"
            >
              <FaInfoCircle size={12} />
              <span>{showNotes ? 'Hide Version Release Notes' : 'View Version v1.0.0 Release Notes'}</span>
              {showNotes ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
            </button>
          </div>

          {/* Release Notes Expandable */}
          {showNotes && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 rounded-2xl border border-white/10 bg-black/60 p-6 text-xs text-slate-300 font-sans"
            >
              <h4 className="text-sm font-bold text-white mb-3">Release Notes — Version {latest.version}</h4>
              <ul className="space-y-2 list-disc list-inside text-slate-300 leading-relaxed">
                {latest.notes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {/* Step-by-Step Installation Guide */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f38ff]">Setup Instructions</p>
            <h3 className="text-2xl font-bold text-[#06101d]">5-Step Setup Guide</h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-5 text-center">
            <div className="rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc] p-5">
              <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#06101d] text-xs font-bold text-white">1</div>
              <h4 className="text-xs font-bold text-[#06101d] mb-1">Download TallyGPT</h4>
              <p className="text-[11px] text-slate-500">Download TallyGPT_Setup.exe file</p>
            </div>

            <div className="rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc] p-5">
              <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#8f38ff] text-xs font-bold text-white">2</div>
              <h4 className="text-xs font-bold text-[#06101d] mb-1">Run Installer</h4>
              <p className="text-[11px] text-slate-500">Launch executable and complete wizard</p>
            </div>

            <div className="rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc] p-5">
              <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">3</div>
              <h4 className="text-xs font-bold text-[#06101d] mb-1">Open Tally</h4>
              <p className="text-[11px] text-slate-500">Ensure Tally Prime/ERP 9 is running</p>
            </div>

            <div className="rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc] p-5">
              <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">4</div>
              <h4 className="text-xs font-bold text-[#06101d] mb-1">Launch TallyGPT</h4>
              <p className="text-[11px] text-slate-500">App auto-detects Tally company</p>
            </div>

            <div className="rounded-2xl border border-[#06101d]/10 bg-[#f7f9fc] p-5">
              <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">5</div>
              <h4 className="text-xs font-bold text-[#06101d] mb-1">Start Using AI</h4>
              <p className="text-[11px] text-slate-500">Query ledgers &amp; run reconciliations</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
