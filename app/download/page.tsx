"use client"

import React, { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { DOWNLOAD_CONFIG, PlatformDownload } from "@/config/downloads"
import {
  Download,
  Check,
  ExternalLink,
  ArrowLeft,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  KeyRound,
} from "lucide-react"

function WindowsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.401H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.951" />
    </svg>
  )
}

function AppleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 1.01-2.85-.92.04-2.04.62-2.7 1.39-.58.67-1.09 1.74-1.02 2.78 1.03.08 2.09-.57 2.71-1.32z" />
    </svg>
  )
}

function DownloadContent() {
  const searchParams = useSearchParams()
  const osParam = searchParams.get("os")
  const autoParam = searchParams.get("auto")

  const [selectedPlatform, setSelectedPlatform] = useState<"windows" | "mac">("windows")
  const [downloadTriggered, setDownloadTriggered] = useState(false)
  const [isMacIntel, setIsMacIntel] = useState(false)

  // OS detection and auto-trigger like Cursor
  useEffect(() => {
    let platform: "windows" | "mac" = "windows"
    if (osParam === "mac" || osParam === "macos") {
      platform = "mac"
    } else if (osParam === "win" || osParam === "windows") {
      platform = "windows"
    } else if (typeof window !== "undefined") {
      const ua = window.navigator.userAgent.toLowerCase()
      if (ua.includes("mac") || ua.includes("darwin")) {
        platform = "mac"
      } else {
        platform = "windows"
      }
    }
    setSelectedPlatform(platform)

    // Trigger auto-download if auto != 'false'
    if (autoParam !== "false") {
      const targetUrl =
        platform === "mac"
          ? DOWNLOAD_CONFIG.macArm.url
          : DOWNLOAD_CONFIG.windows.url

      const timer = setTimeout(() => {
        triggerDownload(targetUrl)
        setDownloadTriggered(true)
      }, 700)

      return () => clearTimeout(timer)
    }
  }, [osParam, autoParam])

  const triggerDownload = (url: string) => {
    if (typeof window === "undefined") return
    const a = document.createElement("a")
    a.href = url
    a.setAttribute("download", "")
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const currentDownload: PlatformDownload =
    selectedPlatform === "windows"
      ? DOWNLOAD_CONFIG.windows
      : isMacIntel
      ? DOWNLOAD_CONFIG.macIntel
      : DOWNLOAD_CONFIG.macArm

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased selection:bg-black/10">
      {/* ── MINIMAL TOP BAR ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full border-b border-black/[0.06] bg-[#F5F4F0]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-black/60 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <Link href="/" className="font-pixel text-xs tracking-[0.25em] text-black/80">
            ORECA
          </Link>

          <a
            href={DOWNLOAD_CONFIG.githubReleases}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-black/50 hover:text-black transition-colors"
          >
            <span>v{DOWNLOAD_CONFIG.version} Release Notes</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </header>

      {/* ── AUTO-DOWNLOAD STATUS BANNER (Cursor style) ───────────────────── */}
      <section className="pt-10 pb-6 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-black/[0.08] bg-white p-5 md:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                {downloadTriggered ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Download className="w-4 h-4 animate-bounce" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-black">
                  {downloadTriggered
                    ? `Your download for ${currentDownload.name} has started.`
                    : `Initiating download for ${currentDownload.name}...`}
                </p>
                <p className="text-xs text-black/50 mt-0.5">
                  Problems with the download?{" "}
                  <button
                    onClick={() => {
                      triggerDownload(currentDownload.url)
                      setDownloadTriggered(true)
                    }}
                    className="font-medium text-black underline underline-offset-2 hover:text-black/80"
                  >
                    Click here to restart manually
                  </button>
                  .
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2 self-stretch sm:self-auto">
              <button
                onClick={() => {
                  triggerDownload(currentDownload.url)
                  setDownloadTriggered(true)
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border border-black/10 bg-black/[0.02] hover:bg-black/[0.05] transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Restart</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── HERO HEADER ─────────────────────────────────────────────────── */}
      <section className="pt-6 pb-12 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/50 bg-black/[0.04] mb-4">
            NATIVE DESKTOP PORTS
          </span>
          <h1 className="text-4xl sm:text-5xl font-light text-[#111] tracking-tight leading-[1.1] mb-4">
            Download Oreca
          </h1>
          <p className="text-base text-black/60 leading-relaxed max-w-lg mx-auto">
            Autonomous AI agent orchestration running directly on your machine.
            Zero cloud telemetry, native speed, complete context privacy.
          </p>
        </div>
      </section>

      {/* ── PLATFORM SELECTOR CARDS (CURSOR STYLE) ───────────────────────── */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* ── WINDOWS CARD ── */}
            <div
              className={`relative rounded-3xl border transition-all duration-300 p-8 flex flex-col justify-between ${
                selectedPlatform === "windows"
                  ? "border-black bg-white shadow-xl shadow-black/[0.04]"
                  : "border-black/[0.08] bg-white/70 hover:bg-white hover:border-black/20"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-black/[0.04] flex items-center justify-center text-black">
                    <WindowsIcon className="w-6 h-6" />
                  </div>
                  {selectedPlatform === "windows" && (
                    <span className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 rounded-full bg-black text-white">
                      Detected OS
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-light text-[#111] mb-1">Windows</h3>
                <p className="text-xs text-black/50 mb-6">
                  {DOWNLOAD_CONFIG.windows.requirements}
                </p>

                <div className="space-y-2 mb-8 text-xs text-black/60">
                  <div className="flex items-center justify-between py-1.5 border-b border-black/[0.04]">
                    <span>Format</span>
                    <span className="font-mono text-black">NSIS Standalone (.exe)</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-black/[0.04]">
                    <span>Architecture</span>
                    <span className="font-mono text-black">{DOWNLOAD_CONFIG.windows.arch}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-black/[0.04]">
                    <span>File size</span>
                    <span className="font-mono text-black">{DOWNLOAD_CONFIG.windows.size}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span>Includes</span>
                    <span className="text-black font-medium">Local Python + Agno + Electron</span>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href={DOWNLOAD_CONFIG.windows.url}
                  onClick={() => triggerDownload(DOWNLOAD_CONFIG.windows.url)}
                  download
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#111] text-white hover:bg-black font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download for Windows</span>
                  <span className="text-xs text-white/60 font-mono">(.exe)</span>
                </a>
              </div>
            </div>

            {/* ── MACOS CARD ── */}
            <div
              className={`relative rounded-3xl border transition-all duration-300 p-8 flex flex-col justify-between ${
                selectedPlatform === "mac"
                  ? "border-black bg-white shadow-xl shadow-black/[0.04]"
                  : "border-black/[0.08] bg-white/70 hover:bg-white hover:border-black/20"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-black/[0.04] flex items-center justify-center text-black">
                    <AppleIcon className="w-6 h-6" />
                  </div>
                  {selectedPlatform === "mac" && (
                    <span className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 rounded-full bg-black text-white">
                      Detected OS
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-light text-[#111] mb-1">macOS</h3>
                <p className="text-xs text-black/50 mb-6">
                  {DOWNLOAD_CONFIG.macArm.requirements}
                </p>

                <div className="space-y-2 mb-8 text-xs text-black/60">
                  <div className="flex items-center justify-between py-1.5 border-b border-black/[0.04]">
                    <span>Format</span>
                    <span className="font-mono text-black">Apple Disk Image (.dmg)</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-black/[0.04]">
                    <span>Architecture</span>
                    <span className="font-mono text-black">
                      {isMacIntel ? "Intel x64" : "Apple Silicon (arm64)"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-black/[0.04]">
                    <span>File size</span>
                    <span className="font-mono text-black">{DOWNLOAD_CONFIG.macArm.size}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span>Silicon Support</span>
                    <span className="text-black font-medium">M1, M2, M3, M4 native</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <a
                  href={DOWNLOAD_CONFIG.macArm.url}
                  onClick={() => triggerDownload(DOWNLOAD_CONFIG.macArm.url)}
                  download
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#111] text-white hover:bg-black font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <AppleIcon className="w-4 h-4" />
                  <span>Download for Apple Silicon</span>
                  <span className="text-xs text-white/60 font-mono">(.dmg)</span>
                </a>

                <div className="text-center">
                  <a
                    href={DOWNLOAD_CONFIG.macIntel.url}
                    onClick={() => triggerDownload(DOWNLOAD_CONFIG.macIntel.url)}
                    download
                    className="text-xs text-black/50 hover:text-black underline underline-offset-4 decoration-black/20 transition-colors"
                  >
                    Looking for Intel Mac (.dmg x64)? Click here
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Linux Notice */}
          <div className="mt-6 rounded-2xl border border-black/[0.06] bg-black/[0.02] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-black/60">
            <div className="flex items-center gap-3">
              <Terminal className="w-4 h-4 text-black/70 shrink-0" />
              <span>
                <strong>Linux & Docker:</strong> Linux .AppImage and headless server containers will be available in v0.2.0.
              </span>
            </div>
            <a
              href="https://github.com/oreca-ai/Oreca.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-black underline underline-offset-4 decoration-black/20 hover:text-black shrink-0"
            >
              Star repository on GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* ── GETTING STARTED IN 3 STEPS (CURSOR STYLE) ────────────────────── */}
      <section className="py-20 px-6 border-t border-black/[0.06] bg-white/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-pixel text-[11px] tracking-widest text-black/40 uppercase mb-2 block">
              QUICK SETUP
            </span>
            <h2 className="text-3xl font-light text-[#111] tracking-tight">
              Get running in under 2 minutes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-black text-white text-xs font-mono font-medium flex items-center justify-center mb-4">
                01
              </div>
              <h4 className="text-base font-medium text-black mb-2">Run the Installer</h4>
              <p className="text-xs text-black/50 leading-relaxed">
                Open your browser&apos;s Downloads folder and run{" "}
                <code className="bg-black/[0.04] px-1 py-0.5 rounded text-[11px] font-mono text-black">
                  Oreca Setup 0.1.0.exe
                </code>
                . Follow the short setup wizard.
              </p>
            </div>

            <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-black text-white text-xs font-mono font-medium flex items-center justify-center mb-4">
                02
              </div>
              <h4 className="text-base font-medium text-black mb-2">Sign In or Sign Up</h4>
              <p className="text-xs text-black/50 leading-relaxed">
                Launch Oreca from your desktop shortcut. Sign in with your email or Google account to load your agent fleets.
              </p>
            </div>

            <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-black text-white text-xs font-mono font-medium flex items-center justify-center mb-4">
                03
              </div>
              <h4 className="text-base font-medium text-black mb-2">Connect Your Models</h4>
              <p className="text-xs text-black/50 leading-relaxed">
                Choose completely local inference (Ollama or LM Studio) or bring your custom API keys. Oreca runs immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-10 px-6 border-t border-black/[0.06] text-center text-xs text-black/40">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-pixel text-xs tracking-widest text-black/50">ORECA</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-black transition-colors">
              Privacy Policy
            </Link>
            <a
              href="https://github.com/oreca-ai/Oreca.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              GitHub
            </a>
          </div>
          <span>© 2026 Oreca Technologies. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}

export default function DownloadPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F5F4F0] flex items-center justify-center text-xs text-black/40 font-mono">
          Loading download package...
        </div>
      }
    >
      <DownloadContent />
    </Suspense>
  )
}
