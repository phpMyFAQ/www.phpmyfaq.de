import PageLayout from '@/components/PageLayout'
import { generatePageMetadata } from '@/components/PageLayout'
import {
  getVersions,
  getStableInfo,
  getDevelopmentInfo,
  formatFileSize,
  getDownloadUrl,
  formatReleaseDate
} from '@/lib/data'

export const metadata = generatePageMetadata(
  'Download',
  'Download the latest version of phpMyFAQ - the open source FAQ system'
)

export default function DownloadPage() {
  const versions = getVersions()
  const stableInfo = getStableInfo()
  const developmentInfo = getDevelopmentInfo()

  // Fallback data if files don't exist
  const fallbackVersions = {
    stable: '4.0.13',
    stable_released: '2025-10-03',
    development: '4.1.0-alpha.3',
    development_released: '2025-10-04'
  }

  const stableVersion = versions?.stable || fallbackVersions.stable
  const stableReleased = versions?.stable_released || fallbackVersions.stable_released
  const devVersion = versions?.development || fallbackVersions.development
  const devReleased = versions?.development_released || fallbackVersions.development_released

  return (
    <PageLayout title="Download phpMyFAQ">
      <div className="row">
        <div className="col-12">
          <p className="lead text-center mb-4">
            Download the latest version of phpMyFAQ and start building your knowledge base today.
          </p>

          {/* Featured Stable Version */}
          <div className="download-hero text-center mb-5 p-4 rounded">
            <div className="download-badge d-inline-block px-3 py-1 rounded mb-3">
              <small className="text-uppercase fw-bold">Recommended</small>
            </div>
            <h2 className="mb-2">phpMyFAQ {stableVersion}</h2>
            <p className="mb-3">Latest Stable Release · {formatReleaseDate(stableReleased)}</p>
            {stableInfo && (
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <a
                  href={getDownloadUrl(stableVersion, 'zip')}
                  className="btn btn-light btn-lg px-4"
                  download
                  style={{borderRadius: '30px'}}
                >
                  <i className="fas fa-download me-2"></i>
                  Download ZIP ({formatFileSize(stableInfo.zip.filesize)})
                </a>
                <a
                  href={getDownloadUrl(stableVersion, 'tar.gz')}
                  className="btn btn-outline-light btn-lg px-4"
                  download
                  style={{borderRadius: '30px'}}
                >
                  <i className="fas fa-file-archive me-2"></i>
                  Download TAR.GZ ({formatFileSize(stableInfo.targz.filesize)})
                </a>
              </div>
            )}
          </div>

          {/* Version Cards */}
          <div className="row g-4 mb-5">
            <div className="col-lg-6">
              <div className="card h-100 shadow-sm" style={{border: '2px solid #ff6600'}}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-badge-orange rounded-circle d-flex align-items-center justify-content-center me-3"
                         style={{width: '50px', height: '50px'}}>
                      <i className="fas fa-check-circle fa-lg"></i>
                    </div>
                    <div>
                      <h5 className="mb-0">Stable Release</h5>
                      <small className="text-muted">Production Ready</small>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h4 className="mb-1" style={{color: '#ff6600'}}>phpMyFAQ {stableVersion}</h4>
                    <p className="text-muted mb-0">Released: {formatReleaseDate(stableReleased)}</p>
                  </div>

                  <p className="mb-3">
                    The latest stable version with all features tested and ready for production use.
                  </p>

                  {stableInfo && (
                    <div className="checksum-box mb-3 p-3 rounded">
                      <h6 className="mb-2">Checksums</h6>
                      <div className="small">
                        <div className="mb-1">
                          <strong>ZIP:</strong> <code className="text-muted">{stableInfo.zip.md5}</code>
                        </div>
                        <div>
                          <strong>TAR.GZ:</strong> <code className="text-muted">{stableInfo.targz.md5}</code>
                        </div>
                      </div>
                    </div>
                  )}

                  <a href="./changelog#{stableVersion}"
                     className="btn btn-outline-primary w-100" target="_blank" rel="noopener"
                     style={{borderRadius: '25px'}}>
                    <i className="fas fa-file-alt me-2"></i>
                    View Release Notes
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card h-100 shadow-sm" style={{border: '2px solid #f39c12'}}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-badge-yellow rounded-circle d-flex align-items-center justify-content-center me-3"
                         style={{width: '50px', height: '50px'}}>
                      <i className="fas fa-code-branch fa-lg"></i>
                    </div>
                    <div>
                      <h5 className="mb-0">Development Version</h5>
                      <small className="text-muted">Testing Only</small>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h4 className="mb-1" style={{color: '#f39c12'}}>phpMyFAQ {devVersion}</h4>
                    <p className="text-muted mb-0">Released: {formatReleaseDate(devReleased)}</p>
                  </div>

                  <p className="mb-3">
                    Get the latest features and improvements. Use for testing and development only.
                  </p>

                  {developmentInfo && (
                    <>
                      <div className="d-grid gap-2 mb-3">
                        <a
                          href={getDownloadUrl(devVersion, 'zip')}
                          className="btn btn-warning"
                          download
                          style={{borderRadius: '25px'}}
                        >
                          <i className="fas fa-download me-2"></i>
                          ZIP ({formatFileSize(developmentInfo.zip.filesize)})
                        </a>
                        <a
                          href={getDownloadUrl(devVersion, 'tar.gz')}
                          className="btn btn-outline-warning"
                          download
                          style={{borderRadius: '25px'}}
                        >
                          <i className="fas fa-file-archive me-2"></i>
                          TAR.GZ ({formatFileSize(developmentInfo.targz.filesize)})
                        </a>
                      </div>

                      <div className="checksum-box-dev mb-3 p-3 rounded">
                        <h6 className="mb-2">Checksums</h6>
                        <div className="small">
                          <div className="mb-1">
                            <strong>ZIP:</strong> <code className="text-muted">{developmentInfo.zip.md5}</code>
                          </div>
                          <div>
                            <strong>TAR.GZ:</strong> <code className="text-muted">{developmentInfo.targz.md5}</code>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <a href="https://github.com/thorsten/phpMyFAQ"
                     className="btn btn-outline-secondary w-100" target="_blank" rel="noopener"
                     style={{borderRadius: '25px'}}>
                    <i className="fab fa-github me-2"></i>
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="row g-4 mb-4">
            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-badge-blue rounded-circle d-flex align-items-center justify-content-center me-3"
                         style={{width: '45px', height: '45px'}}>
                      <i className="fas fa-server"></i>
                    </div>
                    <h5 className="mb-0">System Requirements</h5>
                  </div>
                  <ul className="list-unstyled mb-3">
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>PHP 8.2 or higher</li>
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Web server (Apache, Nginx, IIS)</li>
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Database (MySQL, PostgreSQL, SQLite)</li>
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Modern web browser</li>
                  </ul>
                  <a href="/requirements" className="btn btn-outline-primary w-100" style={{borderRadius: '25px'}}>
                    <i className="fas fa-list me-2"></i>
                    View Full Requirements
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-badge-orange-light rounded-circle d-flex align-items-center justify-content-center me-3"
                         style={{width: '45px', height: '45px'}}>
                      <i className="fas fa-life-ring"></i>
                    </div>
                    <h5 className="mb-0">Installation Help</h5>
                  </div>
                  <ul className="list-unstyled mb-3">
                    <li className="mb-2">
                      <i className="fas fa-book text-primary me-2"></i>
                      <a href="/documentation" className="text-decoration-none">Installation Guide</a>
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-headset text-primary me-2"></i>
                      <a href="/support" className="text-decoration-none">Getting Support</a>
                    </li>
                    <li className="mb-2">
                      <i className="fab fa-discord text-primary me-2"></i>
                      <a href="https://discord.gg/wszhTceuNM" target="_blank" rel="noopener" className="text-decoration-none">Discord Community</a>
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-bug text-primary me-2"></i>
                      <a href="https://github.com/thorsten/phpMyFAQ/issues" target="_blank" rel="noopener" className="text-decoration-none">Report Issues</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Older Versions Notice */}
          <div className="older-versions-box text-center p-4 rounded">
            <i className="fas fa-archive fa-2x mb-3" style={{color: '#6c757d'}}></i>
            <h5>Looking for Older Versions?</h5>
            <p className="mb-3">
              Previous releases are available on our
              <a href="https://github.com/thorsten/phpMyFAQ/releases" target="_blank" rel="noopener" className="text-decoration-none fw-bold"> GitHub Releases page</a>.
            </p>
            <p className="text-muted small mb-0">
              We recommend always using the latest stable version for security and performance.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
