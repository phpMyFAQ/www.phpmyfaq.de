import fs from 'fs'
import path from 'path'

export interface VersionData {
  stable: string
  stable_released: string
  development: string
  development_released: string
  nightly?: string
  nightly_released?: string
}

export interface FileInfo {
  filesize: number
  md5: string
}

export interface DownloadInfo {
  version: string
  zip: FileInfo
  targz: FileInfo
}

export function getVersions(): VersionData | null {
  try {
    const versionsPath = path.join(process.cwd(), 'data', 'versions.json')
    if (!fs.existsSync(versionsPath)) return null

    const data = fs.readFileSync(versionsPath, 'utf8')
    return JSON.parse(data)
  } catch {
    return null
  }
}

export function getStableInfo(): DownloadInfo | null {
  try {
    const stablePath = path.join(process.cwd(), 'data', 'stable.json')
    if (!fs.existsSync(stablePath)) return null

    const data = fs.readFileSync(stablePath, 'utf8')
    return JSON.parse(data)
  } catch {
    return null
  }
}

export function getDevelopmentInfo(): DownloadInfo | null {
  try {
    const devPath = path.join(process.cwd(), 'data', 'development.json')
    if (!fs.existsSync(devPath)) return null

    const data = fs.readFileSync(devPath, 'utf8')
    return JSON.parse(data)
  } catch {
    return null
  }
}

export function formatFileSize(sizeInMB: number): string {
  return `${sizeInMB.toFixed(2)} MB`
}

export function getDownloadUrl(version: string, format: 'zip' | 'tar.gz'): string {
  const baseUrl = 'https://download.phpmyfaq.de'
  const extension = format === 'zip' ? 'zip' : 'tar.gz'
  return `${baseUrl}/phpMyFAQ-${version}.${extension}`
}

export function formatReleaseDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

export function getSiteConfig() {
  const env = process.env.NODE_ENV || 'development'
  
  const config = {
    development: {
      domain: 'http://localhost:3000',
      siteUrl: 'http://localhost:3000'
    },
    staging: {
      domain: 'https://staging.phpmyfaq.de',
      siteUrl: 'https://staging.phpmyfaq.de'
    },
    production: {
      domain: 'https://www.phpmyfaq.de',
      siteUrl: 'https://www.phpmyfaq.de'
    }
  }
  
  return config[env as keyof typeof config] || config.development
}