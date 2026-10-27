export interface PlatformDownload {
  name: string
  label: string
  ext: string
  arch: string
  url: string
  fallbackUrl: string
  filename: string
  size: string
}

export interface DownloadConfig {
  version: string
  releaseTag: string
  windows: PlatformDownload
  mac: PlatformDownload
  githubReleases: string
}

export const DOWNLOAD_CONFIG: DownloadConfig = {
  version: "0.1.0",
  releaseTag: "v0.1.0",
  windows: {
    name: "Windows",
    label: "Windows 10/11",
    ext: ".exe",
    arch: "64-bit",
    url:
      process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL ||
      "https://github.com/oreca-ai/Oreca.ai/releases/download/v0.1.0/Oreca.Setup.0.1.0.exe",
    fallbackUrl: "https://github.com/oreca-ai/Oreca.ai/releases",
    filename: "Oreca Setup 0.1.0.exe",
    size: "208 MB",
  },
  mac: {
    name: "macOS",
    label: "macOS Ventura+",
    ext: ".dmg",
    arch: "Apple Silicon (arm64)",
    url:
      process.env.NEXT_PUBLIC_MAC_DOWNLOAD_URL ||
      "https://github.com/oreca-ai/Oreca.ai/releases/download/v0.1.0/Oreca-0.1.0-arm64.dmg",
    fallbackUrl: "https://github.com/oreca-ai/Oreca.ai/releases",
    filename: "Oreca-0.1.0-arm64.dmg",
    size: "185 MB",
  },
  githubReleases: "https://github.com/oreca-ai/Oreca.ai/releases",
}
