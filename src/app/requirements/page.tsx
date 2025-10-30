import PageLayout from '@/components/PageLayout';
import { generatePageMetadata } from '@/components/PageLayout';

export const metadata = generatePageMetadata(
  'Requirements',
  'System requirements for phpMyFAQ installation and hosting',
);

export default function RequirementsPage() {
  return (
    <PageLayout title="System Requirements">
      <div className="row">
        <div className="col-12">
          <p className="lead">phpMyFAQ requires the following system components for proper operation.</p>

          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">PHP Requirements</h5>
                  <ul>
                    <li>
                      <strong>PHP 8.2+</strong> (8.3+ recommended)
                    </li>
                    <li>Extensions: PDO, cURL, GD/ImageMagick, mbstring</li>
                    <li>Optional: LDAP, XML, ZIP, Fileinfo</li>
                    <li>Memory limit: 128MB minimum, 256MB recommended</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Web Server</h5>
                  <ul>
                    <li>
                      <strong>Apache 2.4+</strong> with mod_rewrite
                    </li>
                    <li>
                      <strong>Nginx 1.18+</strong> with proper configuration
                    </li>
                    <li>
                      <strong>IIS 10+</strong> with URL Rewrite Module
                    </li>
                    <li>HTTPS support recommended</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Database</h5>
                  <ul>
                    <li>
                      <strong>MySQL 8.0+</strong> or <strong>MariaDB 10.6+</strong>
                    </li>
                    <li>
                      <strong>PostgreSQL 13+</strong>
                    </li>
                    <li>
                      <strong>SQLite 3.38+</strong> (for small installations)
                    </li>
                    <li>
                      <strong>Microsoft SQL Server 2019+</strong>
                    </li>
                    <li>
                      <strong>Microsoft SQL Server 2019+</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Optional Components</h5>
                  <ul>
                    <li>
                      <strong>Elasticsearch 7.0+</strong> or <strong>OpenSearch 2.0+</strong> for advanced search
                    </li>
                    <li>
                      <strong>LDAP server</strong> for user authentication
                    </li>
                    <li>
                      <strong>SMTP server</strong> for email notifications
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
