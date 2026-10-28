export interface PlatformDownload {
  name: string
  label: string
  ext: string
  arch: string
  url: string
  fallbackUrl: string
  filename: string
  size: string
  requirements: string
}

export interface DownloadConfig {
  version: string
  releaseTag: string
  windows: PlatformDownload
  mac: PlatformDownload
  macArm: PlatformDownload
  macIntel: PlatformDownload
  githubReleases: string
  publicReleaseUrl: string
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
      "https://github.com/Anukalpdixit/oreca-release/releases/download/v0.1.0/Oreca.Setup.0.1.0.exe",
    fallbackUrl: "https://github.com/Anukalpdixit/oreca-release/releases",
    filename: "Oreca Setup 0.1.0.exe",
    size: "181 MB",
    requirements: "Windows 10 (version 1903+) or Windows 11 (64-bit)",
  },
  mac: {
    name: "macOS",
    label: "macOS (Apple Silicon & Intel)",
    ext: ".dmg",
    arch: "Universal",
    url:
      process.env.NEXT_PUBLIC_MAC_DOWNLOAD_URL ||
      "https://github.com/Anukalpdixit/oreca-release/releases/download/v0.1.0/Oreca-0.1.0.dmg",
    fallbackUrl: "https://github.com/Anukalpdixit/oreca-release/releases",
    filename: "Oreca-0.1.0.dmg",
    size: "165 MB",
    requirements: "macOS 12.0 Monterey, Ventura, Sonoma, or Sequoia",
  },
  macArm: {
    name: "macOS (Apple Silicon)",
    label: "Apple Silicon (M1/M2/M3/M4)",
    ext: ".dmg",
    arch: "arm64",
    url:
      process.env.NEXT_PUBLIC_MAC_DOWNLOAD_URL ||
      "https://github.com/Anukalpdixit/oreca-release/releases/download/v0.1.0/Oreca-0.1.0.dmg",
    fallbackUrl: "https://github.com/Anukalpdixit/oreca-release/releases",
    filename: "Oreca-0.1.0.dmg",
    size: "165 MB",
    requirements: "macOS 12.0 Monterey, Ventura, Sonoma, or Sequoia (M1/M2/M3/M4)",
  },
  macIntel: {
    name: "macOS (Intel)",
    label: "Intel x64",
    ext: ".dmg",
    arch: "x64",
    url:
      process.env.NEXT_PUBLIC_MAC_INTEL_DOWNLOAD_URL ||
      "https://github.com/Anukalpdixit/oreca-release/releases/download/v0.1.0/Oreca-0.1.0.dmg",
    fallbackUrl: "https://github.com/Anukalpdixit/oreca-release/releases",
    filename: "Oreca-0.1.0.dmg",
    size: "165 MB",
    requirements: "macOS 12.0 Monterey or later with Intel 64-bit CPU",
  },
  githubReleases: "https://github.com/Anukalpdixit/oreca-release/releases",
  publicReleaseUrl: "https://github.com/Anukalpdixit/oreca-release/releases/tag/v0.1.0",
}
