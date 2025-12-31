import PageLayout from '@/components/PageLayout';
import { generatePageMetadata } from '@/components/PageLayout';

export const metadata = generatePageMetadata(
  'Features',
  'phpMyFAQ is a mobile-friendly, multilingual, scalable, completely database-driven FAQ software and offers features from single FAQ sites up to enterprise ready integrations',
);

export default function FeaturesPage() {
  return (
    <PageLayout title="phpMyFAQ Features">
      <p className="lead text-center mb-5">
        phpMyFAQ is a mobile-friendly, multilingual, scalable, completely database-driven FAQ software and offers the
        following features - from single FAQ sites up to enterprise ready integrations:
      </p>

      {/* Core Features */}
      <div className="row mb-5">
        <div className="col-lg-8 offset-lg-2">
          <h3 className="text-center mb-4">Core Features</h3>
          <ul className="list-unstyled">
            <li className="mb-2">
              <i className="fas fa-check text-success me-2"></i>
              Supports PHP 8.3, 8.4, 8.5, and 8.6
            </li>
            <li className="mb-2">
              <i className="fas fa-check text-success me-2"></i>
              Supports MySQL, MariaDB, PostgreSQL, MS SQL Server, SQLite3, Azure SQL, Elasticsearch, and OpenSearch
            </li>
            <li className="mb-2">
              <i className="fas fa-check text-success me-2"></i>
              Unlimited FAQs, categories, users, and groups
            </li>
            <li className="mb-2">
              <i className="fas fa-check text-success me-2"></i>
              Mobile first, touch-friendly HTML5/CSS3 layout based on{' '}
              <a href="https://getbootstrap.com/" target="_blank" rel="nofollow">
                Bootstrap
              </a>
            </li>
            <li className="mb-2">
              <i className="fas fa-check text-success me-2"></i>
              Integrated WYSIWYG editor
            </li>
            <li className="mb-2">
              <i className="fas fa-check text-success me-2"></i>
              <a href="/translations">40+ languages</a> incl. RTL layouts for Arabic, Farsi, Urdu, and Hebrew
            </li>
            <li className="mb-2">
              <i className="fas fa-check text-success me-2"></i>
              Simple installation and configuration
            </li>
            <li className="mb-2">
              <i className="fas fa-check text-success me-2"></i>
              AI ready with an integrated MCP server
            </li>
            <li className="mb-2">
              <i className="fas fa-check text-success me-2"></i>
              Plugin system to extend phpMyFAQ&apos;s functionality
            </li>
            <li className="mb-2">
              <i className="fas fa-check text-success me-2"></i>
              Supports simple cloud hosting with Docker and Kubernetes
            </li>
            <li className="mb-2">
              <i className="fas fa-check text-success me-2"></i>
              Compatible with all modern browsers
            </li>
          </ul>
        </div>
      </div>

      {/* Advanced Features */}
      <div className="row mb-4">
        <div className="col-12">
          <h3 className="text-center mb-4">Advanced Features</h3>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4 col-sm-6">
          <div className="mb-3">
            <i className="fas fa-edit fa-3x" style={{ color: '#ff6600' }}></i>
          </div>
          <h3 className="h5">FAQ Content Management System</h3>
          <p>
            You can administrate your users, groups, news, categories, FAQ records, attachments, comments, glossary
            items, stop words in the password-protected administration backend.
          </p>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="mb-3">
            <i className="fas fa-users fa-3x" style={{ color: '#ff6600' }}></i>
          </div>
          <h3 className="h5">User and group-based permissions</h3>
          <p>
            You can assign permissions to users and groups, you can create users and user groups with permissions and
            category and even record restrictions for viewing and creating/editing content. It&apos;s even possible to
            secure the whole FAQ frontend.
          </p>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="mb-3">
            <i className="fas fa-search fa-3x" style={{ color: '#ff6600' }}></i>
          </div>
          <h3 className="h5">Powerful Search</h3>
          <p>
            Your users can easily find questions and answers using the search feature with search in all languages or in
            one category. You&apos;ll also get a list of the most popular searches, and you get a graphical report. By
            using Elasticsearch or OpenSearch, you greatly improve the search experience for your users.
          </p>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4 col-sm-6">
          <div className="mb-3">
            <i className="fas fa-sign-in-alt fa-3x" style={{ color: '#ff6600' }}></i>
          </div>
          <h3 className="h5">LDAP and HTTP authentication with SSO support</h3>
          <p>
            Add your company&apos;s OpenLDAP or Microsoft Active Directory-based user management into phpMyFAQ for
            authentication or just secure your whole FAQ by using HTTP authentication. You can also use various Single
            Sign On services like Shibboleth or NTLM.
          </p>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="mb-3">
            <i className="fas fa-cloud fa-3x" style={{ color: '#ff6600' }}></i>
          </div>
          <h3 className="h5">Active Directory and EntraID Support</h3>
          <p>
            phpMyFAQ supports LDAP Data Mapping, e.g., against a Microsoft Active Directory and Microsoft EntraID,
            including multi-domain-authentication, e.g., against an ADS-Global Catalog. You can configure using multiple
            AD servers.
          </p>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="mb-3">
            <i className="fas fa-retweet fa-3x" style={{ color: '#ff6600' }}></i>
          </div>
          <h3 className="h5">Community support</h3>
          <p>
            All users can add questions, so that another user can answer these questions. They can also answer these
            open questions or add translations for existing FAQ records. All these user-generated entries have to be
            enabled by the administrators.
          </p>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4 col-sm-6">
          <div className="mb-3">
            <i className="fas fa-chart-bar fa-3x" style={{ color: '#ff6600' }}></i>
          </div>
          <h3 className="h5">Statistics</h3>
          <p>
            Analyze the way of your users through your FAQ with the built-in user tracking, analyze the quality of your
            FAQs with the statistics of the user voting and the number of views on each FAQ. You can also download an
            extended reporting sheet as CSV downloads.
          </p>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="mb-3">
            <i className="fas fa-code-branch fa-3x" style={{ color: '#ff6600' }}></i>
          </div>
          <h3 className="h5">Revision system</h3>
          <p>Store the old entries in wiki-like revisions, so you can switch back to old versions of the FAQ entry.</p>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="mb-3">
            <i className="fas fa-download fa-3x" style={{ color: '#ff6600' }}></i>
          </div>
          <h3 className="h5">Backup and Restore</h3>
          <p>Backup and restore all the database content with one click including verification of the backup.</p>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4 col-sm-6">
          <div className="mb-3">
            <i className="fas fa-comment fa-3x" style={{ color: '#ff6600' }}></i>
          </div>
          <h3 className="h5">User comments</h3>
          <p>
            Get more feedback by your users and visitors, by allowing them to comment on your questions and answers.
          </p>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="mb-3">
            <i className="fas fa-lightbulb fa-3x" style={{ color: '#ff6600' }}></i>
          </div>
          <h3 className="h5">Smart answering</h3>
          <p>
            If an user submits a new question, phpMyFAQ will automatically try to answer the question by doing a full
            text search on all existing FAQs.
          </p>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="mb-3">
            <i className="fab fa-google fa-3x" style={{ color: '#ff6600' }}></i>
          </div>
          <h3 className="h5">Search engine optimization</h3>
          <p>
            phpMyFAQ supports rewrite rules for Apache, and nginx. It also lists all FAQ articles in alphabetical order.
            We also support special automatically generated XML sitemaps for search robots including the GoogleBot.
            Additionally, we support rich snippets for Google.
          </p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4 col-sm-6">
          <div className="mb-3">
            <i className="fas fa-file-pdf fa-3x" style={{ color: '#ff6600' }}></i>
          </div>
          <h3 className="h5">Export and Import your FAQs</h3>
          <p>
            Export as PDFs including a Table of Contents, and JSON files. Import your existing FAQs in CSV format.
          </p>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="mb-3">
            <i className="fas fa-shield-alt fa-3x" style={{ color: '#ff6600' }}></i>
          </div>
          <h3 className="h5">Advanced spam protection</h3>
          <p>phpMyFAQ uses graphical captcha, bad word lists, and IPv4/IPv6 banlists to prevent spam.</p>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="mb-3">
            <i className="fas fa-robot fa-3x" style={{ color: '#ff6600' }}></i>
          </div>
          <h3 className="h5">MCP server</h3>
          <p>phpMyFAQ is AI ready with an integrated MCP server, so you can use phpMyFAQ together with AI clients.</p>
        </div>
      </div>
      <div className="row g-4">
        <div className="col-md-4 col-sm-6">
          <div className="mb-3">
            <i className="fas fa-puzzle-piece fa-3x" style={{ color: '#ff6600' }}></i>
          </div>
          <h3 className="h5">Plugin management</h3>
          <p>
            phpMyFAQ supports a plugin system to extend its functionality. You can easily install, and remove plugins.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
