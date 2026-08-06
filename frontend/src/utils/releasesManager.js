// Utility module for auto-detecting TallyGPT releases and tracking analytics

export const DEFAULT_RELEASE_DATA = {
  latest: {
    version: "v2.0.0",
    releaseDate: "2026-08-06",
    channel: "Stable",
    notes: [
      "Major release of TallyGPT Desktop Engine v2.0.0",
      "Native zero-dependency local proxy service connecting to Tally Prime & ERP 9 (Port 9000)",
      "Enhanced air-gapped on-premises local vector index engine",
      "Automated GST 2B, bank reconciliation & exception auditing",
      "Optimized sub-second conversational natural language ledger search with voucher citations"
    ]
  },
  platforms: {
    windows: {
      name: "Windows 10 / 11 (64-bit)",
      os: "Windows",
      arch: "x64",
      fileName: "TallyGPT_Setup_v2.0.0.exe",
      fileUrl: "/TallyGPT_Setup_v2.0.0.exe",
      fileSize: "52.4 MB",
      fileSizeBytes: 54941197,
      sha256: "63D8114243F91D0367E4FEFB6285DE5195D169867C6DEE04FA46773362F65F8D",
      digitallySigned: true,
      publisher: "AlgoForce Technologies Pvt Ltd",
      requirements: "Windows 10 or 11 (64-bit), Tally Prime or ERP 9",
      status: "Available"
    },
    mac: {
      name: "macOS (Apple Silicon & Intel)",
      os: "macOS",
      arch: "Universal",
      fileName: "TallyGPT-mac.dmg",
      fileUrl: "/TallyGPT_Setup_v2.0.0.exe",
      fileSize: "8.2 MB",
      sha256: "7A8B9C0D1E2F3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8D9E0F1A2B3C4D5E6F7A8B",
      digitallySigned: true,
      publisher: "AlgoForce Technologies Pvt Ltd",
      requirements: "macOS 12.0 (Monterey) or later",
      shellCmd: "curl -fsSL https://download.algoforce.ai/tallygpt-mac.sh | sh",
      status: "CLI Ready"
    },
    linux: {
      name: "Linux (AppImage / Shell)",
      os: "Linux",
      arch: "x64",
      fileName: "TallyGPT-linux.AppImage",
      fileUrl: "/TallyGPT_Setup_v2.0.0.exe",
      fileSize: "9.1 MB",
      sha256: "A1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1B2",
      digitallySigned: true,
      publisher: "AlgoForce Technologies Pvt Ltd",
      requirements: "Ubuntu 20.04+, Debian 11+, RHEL 8+",
      shellCmd: "curl -fsSL https://download.algoforce.ai/tallygpt-linux.sh | sh",
      status: "CLI Ready"
    }
  }
}

/**
 * Fetch latest releases manifest
 */
export async function getReleaseManifest() {
  try {
    const res = await fetch('/releases/releases.json')
    if (res.ok) {
      const data = await res.json()
      return data
    }
  } catch (e) {
    console.warn('[TallyGPT Release Manager] Using bundled fallback manifest', e)
  }
  return DEFAULT_RELEASE_DATA
}

/**
 * Track Download Analytics
 */
export function trackDownload(platformId = 'windows', version = 'v2.0.0', fileName = 'TallyGPT_Setup_v2.0.0.exe') {
  const payload = {
    event: 'TallyGPT_Download_Started',
    platform: platformId,
    version,
    fileName,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
    timestamp: new Date().toISOString()
  }

  // Console telemetry
  console.log('[Analytics] Download Event Fired:', payload)

  // Dispatch custom window event for GTM/Segment/Analytics listeners
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('tallygpt_download', { detail: payload }))
    if (window.dataLayer) {
      window.dataLayer.push(payload)
    }
  }
}
