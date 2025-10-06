#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import https from 'https'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface VersionData {
  stable: string
  development: string
  stable_released?: string
  development_released?: string
}

async function fetchVersions(): Promise<VersionData> {
  return new Promise((resolve, reject) => {
    const req = https.get('https://api.phpmyfaq.de/versions', (res) => {
      let data = ''
      
      res.on('data', (chunk: Buffer) => {
        data += chunk.toString()
      })
      
      res.on('end', () => {
        try {
          const versions: VersionData = JSON.parse(data)
          const dataDir = path.join(__dirname, '..', 'data')
          
          if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true })
          }
          
          fs.writeFileSync(
            path.join(dataDir, 'versions.json'),
            JSON.stringify(versions, null, 2)
          )
          
          console.log('✅ Versions data fetched successfully')
          resolve(versions)
        } catch (error) {
          reject(error)
        }
      })
    })
    
    req.on('error', (error: Error) => {
      reject(error)
    })
  })
}

// Run if this is the main module
if (process.argv[1] === new URL(import.meta.url).pathname) {
  fetchVersions()
    .then(() => process.exit(0))
    .catch((error: Error) => {
      console.error('❌ Error fetching versions:', error.message)
      process.exit(1)
    })
}

export { fetchVersions, type VersionData }