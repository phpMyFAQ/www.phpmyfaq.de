#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import type { VersionData } from './fetch-versions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface DownloadInfo {
  version: string;
  released: string;
  filename: string;
  filesize: number | string;
  sha256: string;
}

async function fetchDownloadInfo(version: string, filename: string): Promise<DownloadInfo> {
  return new Promise((resolve, reject) => {
    const url = `https://download.phpmyfaq.de/info/${version}`;

    const req = https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk: Buffer) => {
        data += chunk.toString();
      });

      res.on('end', () => {
        try {
          const downloadInfo: DownloadInfo = JSON.parse(data);
          const dataDir = path.join(__dirname, '..', 'data');

          if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
          }

          fs.writeFileSync(path.join(dataDir, filename), JSON.stringify(downloadInfo, null, 2));

          console.log(`✅ ${filename} fetched successfully`);
          resolve(downloadInfo);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error: Error) => {
      reject(error);
    });
  });
}

async function fetchAllDownloads(): Promise<void> {
  try {
    // Read versions data
    const versionsPath = path.join(__dirname, '..', 'data', 'versions.json');

    if (!fs.existsSync(versionsPath)) {
      throw new Error('versions.json not found. Run fetch-versions first.');
    }

    const versions: VersionData = JSON.parse(fs.readFileSync(versionsPath, 'utf8'));

    // Fetch stable and development info
    await Promise.all([
      fetchDownloadInfo(versions.stable, 'stable.json'),
      fetchDownloadInfo(versions.development, 'development.json'),
    ]);

    console.log('✅ All download info fetched successfully');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error fetching download info:', errorMessage);
    process.exit(1);
  }
}

// Run if this is the main module
if (process.argv[1] === new URL(import.meta.url).pathname) {
  fetchAllDownloads();
}

export { fetchDownloadInfo, fetchAllDownloads, type DownloadInfo };
