"use client"

import React, { useState, useEffect } from "react"
import { DOWNLOAD_CONFIG, PlatformDownload } from "@/config/downloads"
import { Download, Check, ExternalLink } from "lucide-react"

function WindowsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.401H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.951" />
    </svg>
  )
}

function AppleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 1.01-2.85-.92.04-2.04.62-2.7 1.39-.58.67-1.09 1.74-1.02 2.78 1.03.08 2.09-.57 2.71-1.32z" />
    </svg>
  )
}

export function DownloadCTA({
  align = "center",
  showAlternatives = true,
}: {
  align?: "center" | "left"
  showAlternatives?: boolean
}) {
  const [platform, setPlatform] = useState<"windows" | "mac">("windows")
  const [downloading, setDownloading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent.toLowerCase()
      if (userAgent.includes("mac") || userAgent.includes("darwin")) {
        setPlatform("mac")
      } else {
        setPlatform("windows")
      }
    }
  }, [])

  const currentDownload: PlatformDownload =
    platform === "mac" ? DOWNLOAD_CONFIG.mac : DOWNLOAD_CONFIG.windows
  const altDownload: PlatformDownload =
    platform === "mac" ? DOWNLOAD_CONFIG.windows : DOWNLOAD_CONFIG.mac

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>, dl: PlatformDownload) => {
    setDownloading(true)
    setTimeout(() => {
      setDownloading(false)
    }, 4000)
  }

  return (
    <div
      className={`flex flex-col ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      } w-full`}
    >
      {/* Primary Download Button */}
      <div className="relative group inline-block">
        <a
          href={currentDownload.url}
          onClick={(e) => handleDownload(e, currentDownload)}
          download
          className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#111] hover:bg-black text-white rounded-full font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.99] border border-black/10"
        >
          {downloading ? (
            <>
              <Check className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Starting Download...</span>
            </>
          ) : (
            <>
              {platform === "mac" ? (
                <AppleIcon className="w-4 h-4 text-white/90" />
              ) : (
                <WindowsIcon className="w-4 h-4 text-white/90" />
              )}
              <span className="tracking-tight">
                Download for {currentDownload.name}
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                {currentDownload.ext} • {currentDownload.arch}
              </span>
            </>
          )}
        </a>
      </div>

      {/* Alternative platforms & versions */}
      {showAlternatives && (
        <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-xs text-black/50">
          <span>Also available for</span>
          <a
            href={altDownload.url}
            onClick={(e) => handleDownload(e, altDownload)}
            className="inline-flex items-center gap-1 font-medium text-black/80 hover:text-black underline underline-offset-4 decoration-black/20 hover:decoration-black transition-colors"
          >
            {altDownload.name === "macOS" ? (
              <AppleIcon className="w-3 h-3 inline" />
            ) : (
              <WindowsIcon className="w-3 h-3 inline" />
            )}
            <span>
              {altDownload.name} ({altDownload.ext})
            </span>
          </a>
          <span className="text-black/30">•</span>
          <a
            href={DOWNLOAD_CONFIG.githubReleases}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-black/50 hover:text-black transition-colors"
          >
            <span>v{DOWNLOAD_CONFIG.version} releases</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  )
}
