import PageLayout from '@/components/PageLayout'
import { generatePageMetadata } from '@/components/PageLayout'
import { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata(
  'Changelog',
  'User visible changes in phpMyFAQ releases since 2001 until today'
)

export default function ChangelogPage() {
  return (
    <PageLayout title="Changelog">
      <div className="row">
        <div className="col-12">
          <p className="lead">
            User visible changes in phpMyFAQ releases since 2001 until today
          </p>

          <div className="changelog-content">
            <div dangerouslySetInnerHTML={{
              __html: `<h2 className="mt-5 mb-3">
      phpMyFAQ 4.1.x


    <h3 className="mt-4 mb-2">
      <a id="4.1.0-alpha.3"></a>
      phpMyFAQ 4.1.0-alpha.3 - 2025-10-04
    </h3>
    <ul className="list-unstyled ms-3">
      <li className="mb-1">changed PHP requirement to PHP 8.3 or later</li>
      <li className="mb-1">added configuration to edit robots.txt</li>
      <li className="mb-1">added configuration to edit llms.txt</li>
      <li className="mb-1">added Symfony Routing for administration backend</li>
      <li className="mb-1">added code snippets plugin with syntax highlighting in WYSIWYG editor</li>
      <li className="mb-1">added an administration view for orphaned FAQs</li>
      <li className="mb-1">added plugin administration backend</li>
      <li className="mb-1">added image upload and image manager in the Markdown editor</li>
      <li className="mb-1">added experimental support for PDO</li>
      <li className="mb-1">added possibility to enable/disable admin session counter</li>
      <li className="mb-1">added EU Data Act 2025 compliance</li>
      <li className="mb-1">added Urdu translation</li>
      <li className="mb-1">added dark mode / light mode toggle</li>
      <li className="mb-1">added experimental support for PHP 8.5</li>
      <li className="mb-1">added experimental support for FrankenPHP</li>
      <li className="mb-1">added experimental support for OpenSearch</li>
      <li className="mb-1">added experimental support for LDAP group support</li>
      <li className="mb-1">added experimental MCP Server</li>
      <li className="mb-1">added experimental update via command line</li>
      <li className="mb-1">added experimental support for .env files</li>
      <li className="mb-1">added experimental support for Mago</li>
      <li className="mb-1">improved online update feature</li>
      <li className="mb-1">updated Spanish translation</li>
      <li className="mb-1">updated Japanese translation</li>
      <li className="mb-1">updated to PHPUnit v12</li>
      <li className="mb-1">migrated codebase to use PHP 8.3 language features</li>
      <li className="mb-1">migrated from WYSIWYG editor from TinyMCE to Jodit Editor</li>
      <li className="mb-1">migrated from JavaScript to TypeScript</li>
      <li className="mb-1">migrated from Webpack to Vite v7</li>
      <li className="mb-1">migrated from Jest to Vitest v3</li>
    </ul>

    <h2 className="mt-5 mb-3">
      phpMyFAQ 4.0.x
    </h2>

    <h3 className="mt-4 mb-2">
      <a id="4.0.13"></a>
      phpMyFAQ 4.0.13 - 2025-10-03
    </h3>
    <ul className="list-unstyled ms-3">
      <li className="mb-1">fixed security vulnerability</li>
      <li className="mb-1">updated third party dependencies</li>
      <li className="mb-1">fixed bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="4.0.12"></a>
      phpMyFAQ 4.0.12 - 2025-09-23
    </h3>
    <ul className="list-unstyled ms-3">
      <li className="mb-1">updated third party dependencies</li>
      <li className="mb-1">fixed bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="4.0.11"></a>
      phpMyFAQ 4.0.11 - 2025-09-13
    </h3>
    <ul className="list-unstyled ms-3">
      <li className="mb-1">re-added rewrite support for IIS</li>
      <li className="mb-1">updated third party dependencies</li>
      <li className="mb-1">fixed bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="4.0.10"></a>
      phpMyFAQ 4.0.10 - 2025-08-02
    </h3>
    <ul className="list-unstyled ms-3">
      <li className="mb-1">updated third party dependencies</li>
      <li className="mb-1">fixed bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="4.0.9"></a>
      phpMyFAQ 4.0.9 - 2025-07-06
    </h3>
    <ul className="list-unstyled ms-3">
      <li className="mb-1">updated third party dependencies</li>
      <li className="mb-1">fixed bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="4.0.8"></a>
      phpMyFAQ 4.0.8 - 2025-05-10
    </h3>
    <ul className="list-unstyled ms-3">
      <li className="mb-1">updated third party dependencies</li>
      <li className="mb-1">fixed bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="4.0.7"></a>
      phpMyFAQ 4.0.7 - 2025-03-24
    </h3>
    <ul className="list-unstyled ms-3">
      <li className="mb-1">updated third party dependencies</li>
      <li className="mb-1">fixed bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="4.0.6"></a>
      phpMyFAQ 4.0.6 - 2025-02-23
    </h3>
    <ul className="list-unstyled ms-3">
      <li className="mb-1">updated French translation</li>
      <li className="mb-1">updated third party dependencies</li>
      <li className="mb-1">fixed bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="4.0.5"></a>
      phpMyFAQ 4.0.5 - 2025-01-19
    </h3>
    <ul className="list-unstyled ms-3">
      <li className="mb-1">updated Hellenic translation</li>
      <li className="mb-1">updated third party dependencies</li>
      <li className="mb-1">fixed bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="4.0.4"></a>
      phpMyFAQ 4.0.4 - 2025-01-09
    </h3>
    <ul className="list-unstyled ms-3">
      <li className="mb-1">improved update from v3</li>
      <li className="mb-1">updated third party dependencies</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="4.0.3"></a>
      phpMyFAQ 4.0.3 - 2025-01-03
    </h3>
    <ul className="list-unstyled ms-3">
      <li className="mb-1">fixed installation bug introduced with v4.0.2</li>
      <li className="mb-1">fixed minor bug</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="4.0.2"></a>
      phpMyFAQ 4.0.2 - 2025-01-02
    </h3>
    <ul className="list-unstyled ms-3">
      <li className="mb-1">fixed security vulnerability</li>
      <li className="mb-1">improved update handling of .htaccess file</li>
      <li className="mb-1">updated third party dependencies</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="4.0.1"></a>
      phpMyFAQ 4.0.1 - 2024-12-13
    </h3>
    <ul className="list-unstyled ms-3">
      <li className="mb-1">fixed security vulnerability</li>
      <li className="mb-1">improved update handling of .htaccess file</li>
      <li className="mb-1">updated 3rd party dependencies</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="4.0.0"></a>
      phpMyFAQ 4.0.0 - 2024-12-06
    </h3>
    <ul className="list-unstyled ms-3">
      <li className="mb-1">changed PHP requirement to PHP 8.2 or later</li>
      <li className="mb-1">changed rewrite rules for Apache and nginx as mandatory requirement</li>
      <li className="mb-1">changed folder structure</li>
      <li className="mb-1">added Twig as new template engine</li>
      <li className="mb-1">added Symfony Routing</li>
      <li className="mb-1">added trending FAQs</li>
      <li className="mb-1">added new frontend layout</li>
      <li className="mb-1">added new admin configuration frontend</li>
      <li className="mb-1">added new admin category management frontend with full drag and drop sorting support</li>
      <li className="mb-1">added new admin FAQ management frontend</li>
      <li className="mb-1">added possibility to sort sticky FAQs</li>
      <li className="mb-1">added possibility to enable/disable cookie consent</li>
      <li className="mb-1">added experimental online update feature</li>
      <li className="mb-1">added new REST API v3 with OpenAPI specification</li>
      <li className="mb-1">added Kubernetes manifest samples</li>
      <li className="mb-1">added experimental import of FAQs from CSV</li>
      <li className="mb-1">added CSV export of user sessions</li>
      <li className="mb-1">added possibility to add custom CSS via admin frontend</li>
      <li className="mb-1">added experimental plugin manager</li>
      <li className="mb-1">added support for PHP 8.4</li>
      <li className="mb-1">added "share with" feature</li>
      <li className="mb-1">added basic support for Rich Snippets</li>
      <li className="mb-1">added experimental support for WebAuthn / Passkeys</li>
      <li className="mb-1">improved installation and update</li>
      <li className="mb-1">improved SEO support</li>
      <li className="mb-1">improved session timout warning for admins</li>
      <li className="mb-1">removed Twitter/X support</li>
      <li className="mb-1">removed support for adding own meta-content in templates</li>
      <li className="mb-1">removed REST API v2</li>
      <li className="mb-1">removed "send to friend" feature</li>
      <li className="mb-1">migrated from Yarn to PNPM</li>
      <li className="mb-1">migrated from Fork Awesome to Bootstrap Icons</li>
      <li className="mb-1">migrated codebase to use PHP 8.2 language features</li>
      <li className="mb-1">updated to PHPUnit v11</li>
      <li className="mb-1">updated Polish translation</li>
      <li className="mb-1">updated French translation</li>
    </ul>

    <h2 className="mt-5 mb-3">
      phpMyFAQ 3.2.x
    </h2>

    <h3 className="mt-4 mb-2">
      <a id="3.2.10"></a>
      phpMyFAQ 3.2.10 - 2024-11-09
    </h3>
    <ul>
      <li className="mb-1">updated bundled dependencies</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.2.9"></a>
      phpMyFAQ 3.2.9 - 2024-07-23
    </h3>
    <ul>
      <li className="mb-1">fixed bugs introduced with v3.2.8</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.2.8"></a>
      phpMyFAQ 3.2.8 - 2024-07-21
    </h3>
    <ul>
      <li className="mb-1">fixed security vulnerability</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.2.7"></a>
      phpMyFAQ 3.2.7 - 2024-06-07
    </h3>
    <ul>
      <li className="mb-1">updated and improved cookie consent</li>
      <li className="mb-1">updated bundled dependencies</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.2.6"></a>
      phpMyFAQ 3.2.6 - 2024-03-25
    </h3>
    <ul>
      <li className="mb-1">fixed multiple vulnerabilities</li>
      <li className="mb-1">updated bundled dependencies</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.2.5"></a>
      phpMyFAQ 3.2.5 - 2024-02-05
    </h3>
    <ul>
      <li className="mb-1">fixed multiple vulnerabilities</li>
      <li className="mb-1">updated bundled dependencies</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.2.4"></a>
      phpMyFAQ 3.2.4 - 2024-01-10
    </h3>
    <ul>
      <li className="mb-1">updated bundled dependencies</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.2.3"></a>
      phpMyFAQ 3.2.3 - 2023-11-24
    </h3>
    <ul>
      <li className="mb-1">added support for PHP 8.3</li>
      <li className="mb-1">updated bundled dependencies</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.2.2"></a>
      phpMyFAQ 3.2.2 - 2023-10-27
    </h3>
    <ul>
      <li className="mb-1">fixed multiple vulnerabilities</li>
      <li className="mb-1">re-added fullscreen plugin for TinyMCE</li>
      <li className="mb-1">updated bundled dependencies</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.2.1"></a>
      phpMyFAQ 3.2.1 - 2023-09-21
    </h3>
    <ul>
      <li className="mb-1">fixed multiple vulnerabilities</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.2.0"></a>
      phpMyFAQ 3.2.0 - 2023-09-04
      (Codename: <a rel="nofollow" target="_blank" href="https://en.wikipedia.org/wiki/Pontus_(mythology)">Pontus</a>)
    </h3>
    <ul>
      <li className="mb-1">changed PHP requirement to PHP 8.1.0 or later</li>
      <li className="mb-1">changed to HTTPS as new default</li>
      <li className="mb-1">changed MariaDB / MySQL / Percona Server / Galera Cluster to InnoDB only</li>
      <li className="mb-1">changed MariaDB requirement to 10.0</li>
      <li className="mb-1">changed MySQL / Percona Server / Galera Cluster requirement to 8.0 or later</li>
      <li className="mb-1">changed PostgreSQL requirement to 10.0 or later</li>
      <li className="mb-1">changed MS SQL Server requirement to 2016 or later</li>
      <li className="mb-1">added support for PHP 8.2</li>
      <li className="mb-1">added 2FA (Two Factor Authentication)</li>
      <li className="mb-1">added experimental Azure AD login</li>
      <li className="mb-1">added option to use Google ReCaptcha</li>
      <li className="mb-1">added REST API v2.2 to fetch groups, add categories, and update FAQs</li>
      <li className="mb-1">added verification of backup files</li>
      <li className="mb-1">added option to disable questions and notifications</li>
      <li className="mb-1">added new options for more flexibility</li>
      <li className="mb-1">added new mobile first, touch-friendly default layout</li>
      <li className="mb-1">added HTTPS support for local Docker development</li>
      <li className="mb-1">added Symfony HttpFoundation</li>
      <li className="mb-1">added Monolog v3 as logging solution</li>
      <li className="mb-1">removed experimental large permissions support with sections</li>
      <li className="mb-1">removed broken link verification</li>
      <li className="mb-1">removed translation frontend for users</li>
      <li className="mb-1">migrated from SwiftMailer to Symfony Mailer</li>
      <li className="mb-1">migrated codebase to use PHP 8.1 language features</li>
      <li className="mb-1">updated to Bootstrap v5.3</li>
      <li className="mb-1">updated to TinyMCE v6.7</li>
      <li className="mb-1">updated to PHPUnit v10</li>
      <li className="mb-1">updated Japanese translation</li>
      <li className="mb-1">updated Dutch translation</li>
    </ul>

    <h2 className="mt-5 mb-3">
      phpMyFAQ 3.1.x
    </h2>

    <h3 className="mt-4 mb-2">
      <a id="3.1.18"></a>
      phpMyFAQ 3.1.18 - 2023-09-21
    </h3>
    <ul>
      <li className="mb-1">fixed multiple vulnerabilities</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.1.17"></a>
      phpMyFAQ 3.1.17 - 2023-08-27
    </h3>
    <ul>
      <li className="mb-1">fixed multiple vulnerabilities</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.1.16"></a>
      phpMyFAQ 3.1.16 - 2023-07-16
    </h3>
    <ul>
      <li className="mb-1">fixed multiple vulnerabilities</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.1.15"></a>
      phpMyFAQ 3.1.15 - 2023-06-17
    </h3>
    <ul>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.1.14"></a>
      phpMyFAQ 3.1.14 - 2023-05-17
    </h3>
    <ul>
      <li className="mb-1">fixed multiple vulnerabilities</li>
      <li className="mb-1">updated bundled dependencies</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.1.13"></a>
      phpMyFAQ 3.1.13 - 2023-04-23
    </h3>
    <ul>
      <li className="mb-1">fixed multiple vulnerabilities</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.1.12"></a>
      phpMyFAQ 3.1.12 - 2023-03-20
    </h3>
    <ul>
      <li className="mb-1">fixed multiple vulnerabilities</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.1.11"></a>
      phpMyFAQ 3.1.11 - 2023-02-12
    </h3>
    <ul>
      <li className="mb-1">Happy 22nd Birthday, phpMyFAQ!</li>
      <li className="mb-1">fixed multiple vulnerabilities</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.1.10"></a>
      phpMyFAQ 3.1.10 - 2023-01-15
    </h3>
    <ul>
      <li className="mb-1">fixed multiple vulnerabilities</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.1.9"></a>
      phpMyFAQ 3.1.9 - 2022-12-11
    </h3>
    <ul>
      <li className="mb-1">fixed multiple vulnerabilities</li>
      <li className="mb-1">fixed minor bugs</li>
      <li className="mb-1">updated bundled dependencies</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.1.8"></a>
      phpMyFAQ 3.1.8 - 2022-10-24
    </h3>
    <ul>
      <li className="mb-1">fixed multiple vulnerabilities</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.1.7"></a>
      phpMyFAQ 3.1.7 - 2022-10-02
    </h3>
    <ul>
      <li className="mb-1">fixed CSRF vulnerability</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.1.6"></a>
      phpMyFAQ 3.1.6 - 2022-07-23
    </h3>
    <ul>
      <li className="mb-1">fixed XSS vulnerability</li>
      <li className="mb-1">fixed dismiss error for cookie consent</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.1.5"></a>
      phpMyFAQ 3.1.5 - 2022-06-27
    </h3>
    <ul>
      <li className="mb-1">added compatibility with Elasticsearch v8+</li>
      <li className="mb-1">added trust of self-signed certificates with MS SQL</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.1.4"></a>
      phpMyFAQ 3.1.4 - 2022-04-25
    </h3>
    <ul>
      <li className="mb-1">fixed missing assets</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.1.3"></a>
      phpMyFAQ 3.1.3 - 2022-04-24
    </h3>
    <ul>
      <li className="mb-1">fixed login via LDAP</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.1.2"></a>
      phpMyFAQ 3.1.2 - 2022-03-16
    </h3>
    <ul>
      <li className="mb-1">fixed minor bugs</li>
      <li className="mb-1">updated bundled dependencies</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.1.1"></a>
      phpMyFAQ 3.1.1 - 2022-02-14
    </h3>
    <ul>
      <li className="mb-1">fixed enabled debug mode</li>
      <li className="mb-1">updated bundled dependencies</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.1.0"></a>
      phpMyFAQ 3.1.0 - 2022-02-12
      (Codename: <a rel="nofollow" target="_blank" href="https://en.wikipedia.org/wiki/Poseidon">Poseidon</a>)
    </h3>
    <ul>
      <li className="mb-1">Happy 21st Birthday, phpMyFAQ!</li>
      <li className="mb-1">changed PHP requirement to PHP 7.4+</li>
      <li className="mb-1">added support for PHP 8.0 and PHP 8.1</li>
      <li className="mb-1">added support for Elasticsearch v6+</li>
      <li className="mb-1">added drag and drop sorting for main categories</li>
      <li className="mb-1">added possibility to add users without a password</li>
      <li className="mb-1">added export of all users as CSV</li>
      <li className="mb-1">added ChartJS as new charting library</li>
      <li className="mb-1">added REST API v2.1 to register users and add FAQs</li>
      <li className="mb-1">added API client tokens for REST API v2.1</li>
      <li className="mb-1">added opt-in for displaying user data</li>
      <li className="mb-1">added mail notifications for new FAQs in admin section</li>
      <li className="mb-1">added possibility to login via email address</li>
      <li className="mb-1">updated to Composer v2 and improved build</li>
      <li className="mb-1">improved install and update scripts</li>
      <li className="mb-1">removed REST API v1</li>
      <li className="mb-1">removed RSS support</li>
      <li className="mb-1">removed rewrite support for IIS</li>
      <li className="mb-1">removed password hashing with MD5 and SHA-1</li>
      <li className="mb-1">removed OpenSearch support</li>
      <li className="mb-1">removed Travis CI build, switched to Github Actions</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h2 className="mt-5 mb-3">
      phpMyFAQ 3.0.x
    </h2>

    <h3 className="mt-4 mb-2">
      <a id="3.0.12"></a>
      phpMyFAQ 3.0.12 - 2022-01-22
    </h3>
    <ul>
      <li className="mb-1">fixed broken LDAP authentication</li>
      <li className="mb-1">updated bundled dependencies</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.0.11"></a>
      phpMyFAQ 3.0.11 - 2022-01-18
    </h3>
    <ul>
      <li className="mb-1">fixed enabled debug mode</li>
      <li className="mb-1">updated bundled dependencies</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.0.10"></a>
      phpMyFAQ 3.0.10 - 2022-01-17
    </h3>
    <ul>
      <li className="mb-1">fixed multiple XSS and CSRF vulnerabilities (<a href="/security/advisory-2022-01-17">advisory</a>)</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.0.9"></a>
      phpMyFAQ 3.0.9 - 2021-04-17
    </h3>
    <ul>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.0.8"></a>
      phpMyFAQ 3.0.8 - 2021-02-24
    </h3>
    <ul>
      <li className="mb-1">updated to Bootstrap v4.6</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.0.7"></a>
      phpMyFAQ 3.0.7 - 2020-12-23
    </h3>
    <ul>
      <li className="mb-1">fixed XSS vulnerability (<a href="/security/advisory-2020-12-23">advisory</a>)</li>
      <li className="mb-1">added TOC plugin for TinyMCE</li>
      <li className="mb-1">removed support for deprecated data-vocabulary.org schema</li>
      <li className="mb-1">removed Travis CI build, switched to Github Actions</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.0.6"></a>
      phpMyFAQ 3.0.6 - 2020-11-27
    </h3>
    <ul>
      <li className="mb-1">added support for PHP 8.0</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.0.5"></a>
      phpMyFAQ 3.0.5 - 2020-10-17
    </h3>
    <ul>
      <li className="mb-1">minor improvements</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.0.4"></a>
      phpMyFAQ 3.0.4 - 2020-07-26
    </h3>
    <ul>
      <li className="mb-1">session timeout extended to 5 hours</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.0.3"></a>
      phpMyFAQ 3.0.3 - 2020-05-21
    </h3>
    <ul>
      <li className="mb-1">improved FAQ editing</li>
      <li className="mb-1">updated to Bootstrap v4.5</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.0.2"></a>
      phpMyFAQ 3.0.2 - 2020-04-16
    </h3>
    <ul>
      <li className="mb-1">improved handling of multiple homepage categories</li>
      <li className="mb-1">improved FAQ editing</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.0.1"></a>
      phpMyFAQ 3.0.1 - 2020-03-17
    </h3>
    <ul>
      <li className="mb-1">re-added tag cloud on several pages</li>
      <li className="mb-1">fixed minor bugs</li>
      <li className="mb-1">fixed update issues for PostgreSQL</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="3.0.0"></a>
      phpMyFAQ 3.0.0 - 2020-02-16
      (Codename: <a rel="nofollow" href="http://en.wikipedia.org/wiki/Phobos_%28moon%29">Phobos</a>)
    </h3>
    <ul>
      <li className="mb-1">changed PHP requirement to PHP 7.2+</li>
      <li className="mb-1">added PHP namespaces</li>
      <li className="mb-1">added Docker support</li>
      <li className="mb-1">added experimental large permissions support with sections</li>
      <li className="mb-1">added support for Elasticsearch v5+</li>
      <li className="mb-1">added LDAP configuration frontend</li>
      <li className="mb-1">added configuration for enable/disable XML sitemap</li>
      <li className="mb-1">added support for category images</li>
      <li className="mb-1">added support for categories on homepage</li>
      <li className="mb-1">added image slider template</li>
      <li className="mb-1">added improved attachment overview</li>
      <li className="mb-1">added HTML5 export</li>
      <li className="mb-1">added support for EU General Data Protection Regulation</li>
      <li className="mb-1">added multiple attachment upload</li>
      <li className="mb-1">added 404 page template</li>
      <li className="mb-1">added Mongolian translation</li>
      <li className="mb-1">added support for adding own meta content in templates</li>
      <li className="mb-1">added new REST API v2 (includes login)</li>
      <li className="mb-1">improved sticky records</li>
      <li className="mb-1">improved brute force handling</li>
      <li className="mb-1">improved layout</li>
      <li className="mb-1">switched CSS development from LESS to SCSS</li>
      <li className="mb-1">template variable syntax compatible with Twig/Handlebars</li>
      <li className="mb-1">updated Turkish translation</li>
      <li className="mb-1">updated bundled dependencies</li>
      <li className="mb-1">deprecated RSS feeds</li>
      <li className="mb-1">deprecated REST API v1</li>
      <li className="mb-1">removed translation admin frontend</li>
      <li className="mb-1">removed XHTML export</li>
      <li className="mb-1">removed support for ext/mssql</li>
      <li className="mb-1">removed bundled Symfony ClassLoader</li>
      <li className="mb-1">removed Bower, now using Yarn only</li>
      <li className="mb-1">removed Modernizr</li>
      <li className="mb-1">removed share on Facebook link</li>
      <li className="mb-1">removed Facebook Like Button support</li>
    </ul>

    <h2 className="mt-5 mb-3">phpMyFAQ 2.9.x</h2>

    <h3 className="mt-4 mb-2">
      <a id="2.9.13"></a>
      phpMyFAQ 2.9.13 - 2019-02-14
    </h3>
    <ul>
      <li className="mb-1">fixed XSS vulnerabilities in the bundled Bootstrap version</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.9.12"></a>
      phpMyFAQ 2.9.12 - 2019-02-12
    </h3>
    <ul>
      <li className="mb-1">updated bundled Bootstrap to version 3.4.0</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.9.11"></a>
      phpMyFAQ 2.9.11 - 2018-09-02
    </h3>
    <ul>
      <li className="mb-1">fixed multiple vulnerabilities (<a href="/security/advisory-2018-09-02">advisory</a>)</li>
      <li className="mb-1">updated bundled jQuery to version</li>
      <li className="mb-1">updated bundled Handlebars to version</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.9.10"></a>
      phpMyFAQ 2.9.10 - 2018-02-17
    </h3>
    <ul>
      <li className="mb-1">updated Dutch translation</li>
      <li className="mb-1">updated bundled SwiftMailer to version 5.4.9</li>
      <li className="mb-1">updated bundled phpseclib to version 2.0.9</li>
      <li className="mb-1">updated bundled TinyMCE to version 4.6.7</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.9.9"></a>
      phpMyFAQ 2.9.9 - 2017-10-19
    </h3>
    <ul>
      <li className="mb-1">fixed XSS and CSRF vulnerabilities (<a href="/security/advisory-2017-10-19">advisory</a>)</li>
      <li className="mb-1">updated bundled Bootstrap to version 3.3.7</li>
      <li className="mb-1">updated bundled Font Awesome to version 4.7.0</li>
      <li className="mb-1">updated bundled TinyMCE to version 4.5.7</li>
      <li className="mb-1">updated bundled HighlightJS to version 9.12.0</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.9.8"></a>
      phpMyFAQ 2.9.8 - 2017-07-12
    </h3>
    <ul>
      <li className="mb-1">fixed improper restriction (<a href="/security/advisory-2017-07-12">advisory</a>)</li>
      <li className="mb-1">add LDAP search in sub groups (Thorsten</li>
      <li className="mb-1">updated French translation</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.9.7"></a>
      phpMyFAQ 2.9.7 - 2017-04-02
    </h3>
    <ul>
      <li className="mb-1">fixed stored XSS vulnerability (<a href="/security/advisory-2017-04-02">advisory</a>)</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.9.6"></a>
      phpMyFAQ 2.9.6 - 2017-01-27
    </h3>
    <ul>
      <li className="mb-1">fixed possible arbitrary PHP code execution</li>
      <li className="mb-1">ready for PHP 7.1</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.9.5"></a>
      phpMyFAQ 2.9.5 - 2016-08-31
    </h3>
    <ul>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.9.4"></a>
      phpMyFAQ 2.9.4 - 2016-08-02
    </h3>
    <ul>
      <li className="mb-1">updated bundled Bootstrap to version 3.3.7</li>
      <li className="mb-1">updated bundled TinyMCE to version 4.4.1</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.9.3"></a>
      phpMyFAQ 2.9.3 - 2016-08-01
    </h3>
    <ul>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.9.2"></a>
      phpMyFAQ 2.9.2 - 2016-07-05
    </h3>
    <ul>
      <li className="mb-1">updated bundled phpseclib to version 2.0.2</li>
      <li className="mb-1">updated bundled TinyMCE to version 4.4.0</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.9.1"></a>
      phpMyFAQ 2.9.1 - 2016-05-31
    </h3>
    <ul>
      <li className="mb-1">fixed stored XSS vulnerability (<a href="/security/advisory-2016-05-31">advisory</a>)</li>
      <li className="mb-1">added new source code paste plugin</li>
      <li className="mb-1">removed American English translation</li>
      <li className="mb-1">updated bundled TinyMCE to version 4.3.12</li>
      <li className="mb-1">updated bundled Typeahead.js to version 0.11.0</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.9.0"></a>
      phpMyFAQ 2.9.0 - 2016-05-13
      (Codename: <a rel="nofollow" href="http://en.wikipedia.org/wiki/Proteus%28moon%29">Proteus</a>)
    </h3>
    <ul>
      <li className="mb-1">ready for PHP 7</li>
      <li className="mb-1">changed <a href="/requirements">PHP requirement</a> to PHP 5.5+ and PHP 7</li>
      <li className="mb-1">added support for HHVM 3.4.2+</li>
      <li className="mb-1">added support for Elasticsearch</li>
      <li className="mb-1">added new mobile first, touch-friendly default layout</li>
      <li className="mb-1">added tag intersection based search</li>
      <li className="mb-1">added support for Markdown</li>
      <li className="mb-1">added permissions for guests</li>
      <li className="mb-1">added support for multiple LDAP/AD servers</li>
      <li className="mb-1">added experimental support for LDAP dynamic user binding</li>
      <li className="mb-1">added frontend dependency management using Bower</li>
      <li className="mb-1">added possibility to delete all logged search terms</li>
      <li className="mb-1">added support for MySQL sockets</li>
      <li className="mb-1">added configuration for enable/disable highlighting search terms</li>
      <li className="mb-1">added configuration for enable/disable RSS feeds</li>
      <li className="mb-1">added configuration to enable/disable gzip compression</li>
      <li className="mb-1">added configuration for inactive, hidden categories</li>
      <li className="mb-1">added configuration to disable registration</li>
      <li className="mb-1">added configuration to allow anonymous downloads</li>
      <li className="mb-1">added configuration to override user passwords by admin</li>
      <li className="mb-1">added configuration to reset voting and visits</li>
      <li className="mb-1">added configuration to disable smart answering</li>
      <li className="mb-1">added tag management frontend</li>
      <li className="mb-1">added full support for SQLite3</li>
      <li className="mb-1">added control for meta robots handling</li>
      <li className="mb-1">added configuration for auto-activation of new users</li>
      <li className="mb-1">added support for SMTP</li>
      <li className="mb-1">added bundled Twitter Typeahead.js</li>
      <li className="mb-1">added support for custom headers and footers in PDF exports</li>
      <li className="mb-1">added support for language specific open questions</li>
      <li className="mb-1">added moderator groups to categories</li>
      <li className="mb-1">added FAQ overview page</li>
      <li className="mb-1">added JSON export</li>
      <li className="mb-1">added private notes to FAQs</li>
      <li className="mb-1">added experimental support for bcrypt</li>
      <li className="mb-1">extended REST/JSON API</li>
      <li className="mb-1">added simple bash based backup script</li>
      <li className="mb-1">code base PSR-1 and PSR-2 compatible</li>
      <li className="mb-1">updated bundled Symfony ClassLoader to version 2.6.13</li>
      <li className="mb-1">updated bundled jQuery to version 1.11.2</li>
      <li className="mb-1">updated bundled Bootstrap to version 3.3.5</li>
      <li className="mb-1">updated bundled Font Awesome to version 4.4.0</li>
      <li className="mb-1">updated bundled Modernizr to version 2.8.3</li>
      <li className="mb-1">updated bundled TinyMCE to version 4.2.7</li>
      <li className="mb-1">updated bundled SwiftMailer to version 5.4.1</li>
      <li className="mb-1">updated bundled Parsedown to version 1.5.3</li>
      <li className="mb-1">updated bundled HighlightJS to version 8.9.1</li>
      <li className="mb-1">updated bundled Elasticsearch client to version 2.1.5</li>
      <li className="mb-1">updated Russian translation</li>
      <li className="mb-1">removed bundled SyntaxHighlighter</li>
      <li className="mb-1">dropped support for ext/mysql</li>
      <li className="mb-1">dropped support for SQLite2</li>
      <li className="mb-1">dropped support for Zeus Webserver, IIS 6 and lighttpd</li>
      <li className="mb-1">fixed a lot of minor bugs</li>
    </ul>

    <h2 className="mt-5 mb-3">phpMyFAQ 2.8.x</h2>

    <h3 className="mt-4 mb-2">
      <a id="2.8.29"></a>
      phpMyFAQ 2.8.29 - 2016-05-31
    </h3>
    <ul>
      <li className="mb-1">fixed stored XSS vulnerability (<a href="/security/advisory-2016-05-31">advisory</a>)</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.28"></a>
      phpMyFAQ 2.8.28 - 2016-05-13
    </h3>
    <ul>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.27"></a>
      phpMyFAQ 2.8.27 - 2016-04-11
    </h3>
    <ul>
      <li className="mb-1">fixed CSRF security issue (<a href="/security/advisory-2016-04-11">advisory</a>)</li>
      <li className="mb-1">added possibility to use fullscreen videos</li>
      <li className="mb-1">added compatibility with MySQL 5.7</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.26"></a>
      phpMyFAQ 2.8.26 - 2016-02-12 - 15 years of phpMyFAQ Edition
    </h3>
    <ul>
      <li className="mb-1">dropped support for Internet Explorer 9 and 10</li>
      <li className="mb-1">updated Italian translation</li>
      <li className="mb-1">updated Norwegian Bokmål translation</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.25"></a>
      phpMyFAQ 2.8.25 - 2015-12-05
    </h3>
    <ul>
      <li className="mb-1">ready for PHP 7</li>
      <li className="mb-1">added American English translation</li>
      <li className="mb-1">updated bundled Symfony ClassLoader to version 2.6.11</li>
      <li className="mb-1">updated Japanese translation</li>
      <li className="mb-1">updated Brazilian Portuguese translation</li>
      <li className="mb-1">updated Italian translation</li>
      <li className="mb-1">updated Dutch translation</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.24"></a>
      phpMyFAQ 2.8.24 - 2015-07-27
    </h3>
    <ul>
      <li className="mb-1">updated Farsi translation</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.23"></a>
      phpMyFAQ 2.8.23 - 2015-06-13
    </h3>
    <ul>
      <li className="mb-1">updated bundled Symfony ClassLoader to version 2.6.9</li>
      <li className="mb-1">fixed "remember me" issues</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.22"></a>
      phpMyFAQ 2.8.22 - 2015-03-31
    </h3>
    <ul>
      <li className="mb-1">updated Czech translation</li>
      <li className="mb-1">updated Brazilian Portuguese translation</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">

      <a id="2.8.21"></a>
      phpMyFAQ 2.8.21 - 2015-02-28
    </h3>
    <ul>
      <li className="mb-1">added experimental rewrite rules for IIS7 and IIS8</li>
      <li className="mb-1">improved usability in admin backend</li>
      <li className="mb-1">improved HTML5 support in editor</li>
      <li className="mb-1">improved code coverage</li>
      <li className="mb-1">updated Brazilian Portuguese translation</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.20"></a>
      phpMyFAQ 2.8.20 - 2015-02-07
    </h3>
    <ul>
      <li className="mb-1">added experimental support for HHVM 3.4.2+</li>
      <li className="mb-1">added experimental support for PHP 7.0.0-dev</li>
      <li className="mb-1">updated Brazilian Portuguese translation</li>
      <li className="mb-1">updated French translation</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.19"></a>
      phpMyFAQ 2.8.19 - 2014-12-31
    </h3>
    <ul>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.18"></a>
      phpMyFAQ 2.8.18 - 2014-11-30
    </h3>
    <ul>
      <li className="mb-1">added clickjacking prevention (<a href="/security/advisory-2014-11-30">advisory</a>)</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.17"></a>
      phpMyFAQ 2.8.17 - 2014-11-05
    </h3>
    <ul>
      <li className="mb-1">fixed typo in update script</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.16"></a>
      phpMyFAQ 2.8.16 - 2014-11-03
    </h3>
    <ul>
      <li className="mb-1">fixed bug in restore from backup</li>
      <li className="mb-1">fixed a lot of minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.15"></a>
      phpMyFAQ 2.8.15 - 2014-10-02
    </h3>
    <ul>
      <li className="mb-1">fixed broken installation</li>
      <li className="mb-1">updated Farsi translation</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.14"></a>
      phpMyFAQ 2.8.14 - 2014-10-01
    </h3>
    <ul>
      <li className="mb-1">fixed installation compatibility with MySQL 5.1 and MySQL 5.5</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.13"></a>
      phpMyFAQ 2.8.13 - 2014-09-16
    </h3>
    <ul>
      <li className="mb-1">fixed multiple security vulnerabilities (<a href="/security/advisory-2014-09-16">advisory</a>)</li>
      <li className="mb-1">backported full support for SQLite3</li>
      <li className="mb-1">updated Chinese (Traditional) translation</li>
      <li className="mb-1">updated Farsi translation</li>
      <li className="mb-1">updated Italian translation</li>
      <li className="mb-1">updated Spanish translation</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.12"></a>
      phpMyFAQ 2.8.12 - 2014-08-02
    </h3>
    <ul>
      <li className="mb-1">updated Hebrew translation</li>
      <li className="mb-1">updated to Twitter OAuth v1.1</li>
      <li className="mb-1">updated bundled Symfony ClassLoader to version 2.5.1</li>
      <li className="mb-1">fixed RSS/Atom feed compatibility</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.11"></a>
      phpMyFAQ 2.8.11 - 2014-06-28
    </h3>
    <ul>
      <li className="mb-1">updated German translation</li>
      <li className="mb-1">updated Romanian translation</li>
      <li className="mb-1">updated Spanish translation</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.10"></a>
      phpMyFAQ 2.8.10 - 2014-05-30
    </h3>
    <ul>
      <li className="mb-1">dropped support for Internet Explorer 7 and 8</li>
      <li className="mb-1">updated Brazilian Portuguese translation</li>
      <li className="mb-1">updated bundled TinyMCE to version 3.5.11</li>
      <li className="mb-1">updated bundled TCPDF library to version 6.0.078</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.9"></a>
      phpMyFAQ 2.8.9 - 2014-04-28
    </h3>
    <ul>
      <li className="mb-1">updated Thai translation</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.8"></a>
      phpMyFAQ 2.8.8 - 2014-03-18
    </h3>
    <ul>
      <li className="mb-1">improved API security</li>
      <li className="mb-1">fixed search with Hebrew characters</li>
      <li className="mb-1">fixed PDF export with Czech and Slovak characters</li>
      <li className="mb-1">fixed a lot of bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.7"></a>
      phpMyFAQ 2.8.7 - 2014-02-05
    </h3>
    <ul>
      <li className="mb-1">Fixed PHP 5.4 related issue introduced in 2.8.6</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.6"></a>
      phpMyFAQ 2.8.6 - 2014-02-04
    </h3>
    <ul>
      <li className="mb-1">Fixed IE8/9 only XSS and CSRF vulnerabilities (<a href="/security/advisory-2014-02-04">advisory</a>)
      </li>
      <li className="mb-1">updated Hungarian translation</li>
      <li className="mb-1">updated Spanish translation</li>
      <li className="mb-1">updated bundled Symfony ClassLoader to version 2.4.1</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.5"></a>
      phpMyFAQ 2.8.5 - 2013-12-31
    </h3>
    <ul>
      <li className="mb-1">fixed SSO logins with mod_auth_kerb</li>
      <li className="mb-1">improved HTTPS handling</li>
      <li className="mb-1">updated Dutch translation</li>
      <li className="mb-1">updated European Portuguese translation</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.4"></a>
      phpMyFAQ 2.8.4 - 2013-11-26
    </h3>
    <ul>
      <li className="mb-1">fixed possible arbitrary PHP code execution (<a href="/security/advisory-2013-11-26">advisory</a>)</li>
      <li className="mb-1">updated Chinese (Traditional) translation</li>
      <li className="mb-1">updated Dutch translation</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.3"></a>
      phpMyFAQ 2.8.3 - 2013-11-18
    </h3>
    <ul>
      <li className="mb-1">fixed missing permission check on Image Manager (<a href="/security/advisory-2013-11-18">advisory</a>)
      </li>
      <li className="mb-1">improved HTML / CSS code</li>
      <li className="mb-1">updated Brazilian Portuguese translation</li>
      <li className="mb-1">updated Japanese translation</li>
      <li className="mb-1">updated Spanish translation</li>
      <li className="mb-1">update Swedish translation</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>
    <h3 className="mt-4 mb-2">
      <a id="2.8.2"></a>
      phpMyFAQ 2.8.2 - 2013-07-25
    </h3>
    <ul>
      <li className="mb-1">added French Canada translation</li>
      <li className="mb-1">improved attachment upload dialog with HTML5 File API</li>
      <li className="mb-1">updated Finnish translation</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.1"></a>
      phpMyFAQ 2.8.1 - 2013-06-26
    </h3>
    <ul>
      <li className="mb-1">added support for Grunt</li>
      <li className="mb-1">added minified CSS and JavaScript code</li>
      <li className="mb-1">improved usability for group administration</li>
      <li className="mb-1">fixed broken updates for MS SQL and SQLite</li>
      <li className="mb-1">fixed IE8 related JavaScript issues</li>
      <li className="mb-1">fixed HTML5 validation errors</li>
      <li className="mb-1">fixed Arabic translation</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.8.0"></a>
      phpMyFAQ 2.8.0 - 2013-05-21
      (Codename: <a rel="nofollow" href="http://en.wikipedia.org/wiki/Perdita_%28moon%29">Perdita</a>)
    </h3>
    <ul>
      <li className="mb-1">changed PHP <a href="/requirements">requirement</a> to PHP 5.3.3 and later</li>
      <li className="mb-1">phpMyFAQ is now licensed under the terms of Mozilla Public License 2.0</li>
      <li className="mb-1">added new and improved frontend and backend user interface based on Twitter Bootstrap 2.3.2</li>
      <li className="mb-1">added multi site support</li>
      <li className="mb-1">added auto-save for FAQs during editing</li>
      <li className="mb-1">added improved advanced search in subcategories</li>
      <li className="mb-1">added possibility to close and delete open questions</li>
      <li className="mb-1">added possibility to delete multiple open questions</li>
      <li className="mb-1">added user control panel</li>
      <li className="mb-1">added support for Composer</li>
      <li className="mb-1">added configurable maintenance mode</li>
      <li className="mb-1">added user notification for answered questions</li>
      <li className="mb-1">added possibility to deactivate complete FAQ export</li>
      <li className="mb-1">added possibility to random sorting of FAQs</li>
      <li className="mb-1">added documentation in Markdown with GitHub style HTML export</li>
      <li className="mb-1">added support for Gravatar</li>
      <li className="mb-1">added user statistic report in admin dashboard</li>
      <li className="mb-1">improved usability of administration backend</li>
      <li className="mb-1">improved setup and update</li>
      <li className="mb-1">improved security with salted passwords</li>
      <li className="mb-1">improved attachment functionality</li>
      <li className="mb-1">improved CSS development with LESS</li>
      <li className="mb-1">improved minified CSS output</li>
      <li className="mb-1">simplified the link verification</li>
      <li className="mb-1">dropped support for IBM DB2, Interbase/Firebird and Sybase</li>
      <li className="mb-1">dropped support for PHP register_globals and magic_quotes_gpc</li>
      <li className="mb-1">dropped support for Google Translate API v1</li>
      <li className="mb-1">dropped support for Delicious</li>
      <li className="mb-1">updated bundled jQuery to version 1.9.1</li>
      <li className="mb-1">updated bundled Modernizr to version 2.6.2</li>
      <li className="mb-1">updated bundled TinyMCE to version 3.5.7</li>
      <li className="mb-1">updated bundled Symfony ClassLoader to version 2.2.1</li>
      <li className="mb-1">updated bundled Font Awesome to version 3.1</li>
      <li className="mb-1">updated bundled jQuery Sparklines to version 2.1.1</li>
      <li className="mb-1">updated PHP dependency management using Composer</li>
      <li className="mb-1">updated Czech translation</li>
      <li className="mb-1">updated Portuguese translation</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h2 className="mt-5 mb-3">phpMyFAQ 2.7.x</h2>

    <h3 className="mt-4 mb-2"><a id="2.7.9"></a>phpMyFAQ 2.7.9 - 2012-11-02</h3>
    <ul>
      <li className="mb-1">updated Czech translation</li>
      <li className="mb-1">updated Dutch translation</li>
      <li className="mb-1">updated French translation</li>
      <li className="mb-1">improved English translation</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.7.8"></a>phpMyFAQ 2.7.8 - 2012-08-22</h3>
    <ul>
      <li className="mb-1">added experimental rewrite rules for Zeus Webserver</li>
      <li className="mb-1">updated Arabic translation</li>
      <li className="mb-1">updated Dutch translation</li>
      <li className="mb-1">updated Spanish translation</li>
      <li className="mb-1">improved LDAP handling</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.7.7"></a>phpMyFAQ 2.7.7 - 2012-07-01</h3>
    <ul>
      <li className="mb-1">added Bosnian translation</li>
      <li className="mb-1">improved complete PDF export</li>
      <li className="mb-1">updated Polish translation</li>
      <li className="mb-1">updated Simplified Chinese translation</li>
      <li className="mb-1">fixed Arabian and Bengali translation</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.7.6"></a>phpMyFAQ 2.7.6 - 2012-05-16</h3>
    <ul>
      <li className="mb-1">updated Dutch translation</li>
      <li className="mb-1">updated Polish translation</li>
      <li className="mb-1">updated Russian translation</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.7.5"></a>phpMyFAQ 2.7.5 - 2012-04-14</h3>
    <ul>
      <li className="mb-1">fixed serious security issue in bundled ImageManager library</li>
      <li className="mb-1">full support for Microsoft SQL Server Driver for PHP</li>
      <li className="mb-1">added online verification check</li>
      <li className="mb-1">added experimental support for SQLite3</li>
      <li className="mb-1">updated Spanish translation</li>
      <li className="mb-1">fixed Slovak translation</li>
      <li className="mb-1">fixed IE9 related JavaScript issues</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.7.4"></a>phpMyFAQ 2.7.4 - 2012-02-22</h3>
    <ul>
      <li className="mb-1">added PDF export for complete FAQ in frontend</li>
      <li className="mb-1">updated Japanese translation</li>
      <li className="mb-1">updated Russian translation</li>
      <li className="mb-1">updated Spanish translation</li>
      <li className="mb-1">fixed backup issue</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.7.3"></a>phpMyFAQ 2.7.3 - 2012-01-16</h3>
    <ul>
      <li className="mb-1">improved PDF export</li>
      <li className="mb-1">updated Dutch translation</li>
      <li className="mb-1">fixed some PostgreSQL related issues</li>
      <li className="mb-1">fixed some attachment related issues</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.7.2"></a>phpMyFAQ 2.7.2 - 2011-12-31</h3>
    <ul>
      <li className="mb-1">improved PDF export and install script</li>
      <li className="mb-1">updated Finnish translation</li>
      <li className="mb-1">updated French translation</li>
      <li className="mb-1">updated Chinese (Simplified) translation</li>
      <li className="mb-1">updated bundled TCPDF library to version 5.9.136</li>
      <li className="mb-1">updated bundled jQuery datePicker plugin</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.7.1"></a>phpMyFAQ 2.7.1 - 2011-10-25</h3>
    <ul>
      <li className="mb-1">fixed security issue in bundled ImageManager library</li>
      <li className="mb-1">added missing translations</li>
      <li className="mb-1">added configurable encryption type for passwords</li>
      <li className="mb-1">added support for anonymous login for LDAP servers</li>
      <li className="mb-1">added table of contents in PDF exports</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.7.0"></a>
      phpMyFAQ 2.7.0 - 2011-09-30
      (Codename: <a rel="nofollow" href="http://en.wikipedia.org/wiki/Prospero_%28moon%29">Prospero</a>)
    </h3>
    <ul>
      <li className="mb-1">changed PHP <a href="/requirements">requirement</a> to PHP 5.2.3</li>
      <li className="mb-1">dropped support for MySQL 4.1</li>
      <li className="mb-1">dropped support for Internet Explorer 6 + 7</li>
      <li className="mb-1">dropped support for obsolete Microsummaries</li>
      </li>
      <li className="mb-1">added new HTML5/CSS3 powered layout and administration backend</li>
      <li className="mb-1">added configurable search relevance functionality</li>
      <li className="mb-1">added automatic translations with Google Translate</li>
      <li className="mb-1">added Twitter support</li>
      <li className="mb-1">added Facebook Like Button support</li>
      <li className="mb-1">added "Bookmark on Delicious" support</li>
      <li className="mb-1">added Ajax-powered comment functionality</li>
      <li className="mb-1">added attachment administration frontend</li>
      <li className="mb-1">added basic authentication support for LDAP groups</li>
      <li className="mb-1">added basic support for HTML5 microdata</li>
      <li className="mb-1">added functionality of the TinyMCE save button</li>
      <li className="mb-1">added basic reporting functionality</li>
      <li className="mb-1">added IPv6 support</li>
      <li className="mb-1">added support for Single Sign On authentication</li>
      <li className="mb-1">added support for complete secured FAQ installations</li>
      <li className="mb-1">added user configurable date formatting</li>
      <li className="mb-1">added captcha image refresh</li>
      <li className="mb-1">added possibility to delete user generated search terms</li>
      <li className="mb-1">improved usability in frontend and administration backend</li>
      <li className="mb-1">improved attachment handling in administration backend</li>
      <li className="mb-1">enabling Gzip compression by default</li>
      <li className="mb-1">updated bundled jQuery to version 1.6.2</li>
      <li className="mb-1">updated bundled Modernizr to version 2.0</li>
      <li className="mb-1">updated bundled TinyMCE to version 3.4.2</li>
      <li className="mb-1">updated bundled SyntaxHighlighter to version 3.0.83</li>
      <li className="mb-1">updated bundled TCPDF library to version 5.9.110</li>
      <li className="mb-1">updated Dutch translation</li>
      <li className="mb-1">updated German translation</li>
      <li className="mb-1">updated Japanese translation</li>
      <li className="mb-1">updated Portuguese translation</li>
      <li className="mb-1">updated Russian translation</li>
      <li className="mb-1">updated Spanish translation</li>
    </ul>

    <h2 className="mt-5 mb-3">phpMyFAQ 2.6.x</h2>

    <h3 className="mt-4 mb-2"><a id="2.6.19"></a>phpMyFAQ 2.6.19 - 2011-10-25</h3>
    <ul>
      <li className="mb-1">fixed security issue in bundled ImageManager library</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.6.18"></a>phpMyFAQ 2.6.18 - 2011-09-28</h3>
    <ul>
      <li className="mb-1">fixed information disclosure vulnerability</li>
      <li className="mb-1">updated Spanish translation</li>
      <li className="mb-1">fixed Danish translation</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.6.17"></a>phpMyFAQ 2.6.17 - 2011-06-08</h3>
    <ul>
      <li className="mb-1">updated Portuguese translation</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.6.16"></a>phpMyFAQ 2.6.16 - 2011-05-31</h3>
    <ul>
      <li className="mb-1">updated Dutch translation</li>
      <li className="mb-1">updated French translation</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.6.15"></a>phpMyFAQ 2.6.15 - 2011-02-23</h3>
    <ul>
      <li className="mb-1">added Malay translation</li>
      <li className="mb-1">updated Danish translation</li>
      <li className="mb-1">updated Brazilian Portuguese translation</li>
      <li className="mb-1">updated Spanish translation</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.6.14"></a>phpMyFAQ 2.6.14 - 2011-01-24</h3>
    <ul>
      <li className="mb-1">added rewrite rules for nginx</li>
      <li className="mb-1">added compatibility for MySQL 5.5 with ext/mysql</li>
      <li className="mb-1">added support to ban IPs from user tracking files</li>
      <li className="mb-1">improved restore functionality</li>
      <li className="mb-1">updated Dutch translation</li>
      <li className="mb-1">updated German translation</li>
      <li className="mb-1">fixed issue with sending mails to category administrators</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.6.13"></a>phpMyFAQ 2.6.13 - 2010-12-15</h3>
    <ul>
      <li className="mb-1">clean package (<a href="/security/advisory-2010-12-15">advisory</a>)</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.6.12"></a>phpMyFAQ 2.6.12 - 2010-12-13</h3>
    <ul>
      <li className="mb-1">added experimental support for MariaDB</li>
      <li className="mb-1">added empty LDAP configuration file as example</li>
      <li className="mb-1">updated Arabic translation</li>
      <li className="mb-1">updated Dutch translation</li>
      <li className="mb-1">updated French translation</li>
      <li className="mb-1">updated Norwegian Bokmål translation</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.6.11"></a>phpMyFAQ 2.6.11 - 2010-11-03</h3>
    <ul>
      <li className="mb-1">fixed some bugs introduced with phpMyFAQ 2.6.10</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.6.10"></a>phpMyFAQ 2.6.10 - 2010-11-02</h3>
    <ul>
      <li className="mb-1">added several security enhancements</li>
      <li className="mb-1">updated Chinese (Simplified) translation</li>
      <li className="mb-1">updated German translation</li>
      </li>
      <li className="mb-1">updated Portuguese translation</li>
      <li className="mb-1">fixed minor bugs</li>
      </li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.6.9"></a>phpMyFAQ 2.6.9 - 2010-09-28</h3>
    <ul>
      <li className="mb-1">fixed XSS vulnerability</li>
      <li className="mb-1">added Slovak translation</li>
      <li className="mb-1">added minor usability improvement in administration backend</li>
      <li className="mb-1">fixed issue with embedded Google Analytics code</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.6.8"></a>phpMyFAQ 2.6.8 - 2010-08-31</h3>
    <ul>
      <li className="mb-1">dropped Oracle database support</li>
      <li className="mb-1">added new TinyMCE plugin for adding internal links by a suggest search</li>
      <li className="mb-1">added basic HTML5 powered administration backend</li>
      <li className="mb-1">improved setup and update functionality</li>
      <li className="mb-1">updated bundled TCPDF library to version 5.6.000</li>
      <li className="mb-1">updated bundled TinyMCE editor component to version 3.3.8</li>
      <li className="mb-1">updated bundled phpseclib to version 0.2.1</li>
      <li className="mb-1">updated Russian translation</li>
      <li className="mb-1">updated Portuguese translation</li>
      <li className="mb-1">fixed XML rendering issue</li>
      <li className="mb-1">fixed many bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.6.7"></a>phpMyFAQ 2.6.7 - 2010-07-29</h3>
    <ul>
      <li className="mb-1">refactored search backend</li>
      <li className="mb-1">improved pagination functionality</li>
      <li className="mb-1">fixed various problems with Microsoft SQL Server Driver for PHP</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.6.6"></a>phpMyFAQ 2.6.6 - 2010-06-21</h3>
    <ul>
      <li className="mb-1">refactored database abstraction</li>
      <li className="mb-1">fixed OpenLDAP authentication</li>
      <li className="mb-1">fixed duplication of search results</li>
      <li className="mb-1">fixed issue with duplicate sitemap characters</li>
      <li className="mb-1">fixed solution ID issues</li>
      <li className="mb-1">improved Glossary deletion workflow</li>
      <li className="mb-1">updated Brazilian Portuguese translation</li>
      <li className="mb-1">updated Norwegian Bokmål translation</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.6.5"></a>phpMyFAQ 2.6.5 - 2010-05-24</h3>
    <ul>
      <li className="mb-1">updated bundled TCPDF library to version 5.0.009</li>
      <li className="mb-1">updated bundled TinyMCE editor component to version 3.3.5.1</li>
      <li className="mb-1">refactored OpenSearch plugin code base</li>
      <li className="mb-1">fixed small update issues in update script</li>
      <li className="mb-1">fixed missing language fallback issue in instant response</li>
      <li className="mb-1">fixed user deletion in admin backend</li>
      <li className="mb-1">fixed backup/restore bug</li>
      <li className="mb-1">updated Polish translation</li>
      <li className="mb-1">updated Russian translation</li>
      <li className="mb-1">updated Thai translation</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.6.4"></a>phpMyFAQ 2.6.4 - 2010-04-18</h3>
    <ul>
      <li className="mb-1">added experimental support for Microsoft SQL Server Driver for PHP</li>
      <li className="mb-1">improved FAQ record administration frontend</li>
      <li className="mb-1">improved Sitemap titles</li>
      <li className="mb-1">updated German translation</li>
      <li className="mb-1">updated Romanian translation</li>
      <li className="mb-1">updated Swedish translation</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.6.3"></a>phpMyFAQ 2.6.3 - 2010-03-03</h3>
    <ul>
      <li className="mb-1">fixed various mail issues</li>
      <li className="mb-1">improved links rewriting</li>
      <li className="mb-1">improved sitemap for Chinese, Japanese and Korean content</li>
      <li className="mb-1">improved meta keyword handling</li>
      <li className="mb-1">updated Portuguese translation</li>
      <li className="mb-1">updated French translation</li>
      <li className="mb-1">fixed minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.6.2"></a>phpMyFAQ 2.6.2 - 2010-02-01</h3>
    <ul>
      <li className="mb-1">fixed update script issue</li>
      <li className="mb-1">fixed display of Chinese, Japanese and Korean content in PDFs</li>
      <li className="mb-1">fixed issues with RSS feeds</li>
      <li className="mb-1">fixed broken Spanish translation</li>
      <li className="mb-1">updated French translation</li>
      <li className="mb-1">minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.6.1"></a>phpMyFAQ 2.6.1 - 2010-01-23</h3>
    <ul>
      <li className="mb-1">updated bundled TCPDF library to version 4.8.026</li>
      <li className="mb-1">improved cookie handling</li>
      <li className="mb-1">minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.6.0"></a>
      phpMyFAQ 2.6.0 - 2010-01-11
      (Codename: <a rel="nofollow" href="http://en.wikipedia.org/wiki/Portia_%28moon%29">Portia</a>)
    </h3>
    <ul>
      <li className="mb-1">moved all language files to UTF-8</li>
      <li className="mb-1">added TCPDF as replacement for FPDF library</li>
      <li className="mb-1">added support for TinyMCE translations</li>
      <li className="mb-1">added support for multi-language news</li>
      <li className="mb-1">added user adjustable template sets and styles</li>
      <li className="mb-1">added support plurals in translations</li>
      <li className="mb-1">added share on Facebook link</li>
      <li className="mb-1">added a rest/json API</li>
      <li className="mb-1">added secure login if SSL is available</li>
      <li className="mb-1">added FAQ entry dependent meta description</li>
      <li className="mb-1">added experimental support for Microsoft Windows Web App Gallery</li>
      <li className="mb-1">improved attachment functionality</li>
      <li className="mb-1">improved install script</li>
      <li className="mb-1">improved category view with description</li>
      <li className="mb-1">improved FAQ entry activation</li>
      <li className="mb-1">improved user administration</li>
      <li className="mb-1">improved FAQ entry workflow</li>
      <li className="mb-1">removed Docbook XML export</li>
      <li className="mb-1">removed Net_IDNA library</li>
      <li className="mb-1">updated Greek translation</li>
      <li className="mb-1">updated Lithuanian translation</li>
      <li className="mb-1">updated Japanese translation</li>
    </ul>

    <h2 className="mt-5 mb-3">phpMyFAQ 2.5.x</h2>

    <h3 className="mt-4 mb-2"><a id="2.5.7"></a>phpMyFAQ 2.5.7 - 2010-01-19</h3>
    <ul>
      <li className="mb-1">improved glossary detection</li>
      <li className="mb-1">updated Dutch translation</li>
      <li className="mb-1">updated Indonasian translation</li>
      <li className="mb-1">updated Chinese (Simplified) translation</li>
      <li className="mb-1">updated Japanese translation</li>
      <li className="mb-1">updated Norwegian Bokmal translation</li>
      <li className="mb-1">many minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.5.6"></a>phpMyFAQ 2.5.6 - 2009-12-22</h3>
    <ul>
      <li className="mb-1">updated bundled TinyMCE editor component to version 3.2.7</li>
      <li className="mb-1">updated bundled SyntaxHighlighter library to version 2.1.364</li>
      <li className="mb-1">updated bundled SyntaxHighlighter plugin for TinyMCE</li>
      <li className="mb-1">updated Brazilian Portuguese translation</li>
      <li className="mb-1">updated Spanish translation</li>
      <li className="mb-1">minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.5.5"></a>phpMyFAQ 2.5.5 - 2009-12-01</h3>
    <ul>
      <li className="mb-1">fixed IE6/7 only XSS vulnerabilities (<a href="/security/advisory-2009-12-01">advisory</a>)</li>
      <li className="mb-1">many minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.5.4"></a>phpMyFAQ 2.5.4 - 2009-11-10</h3>
    <ul>
      <li className="mb-1">fixed various PostgreSQL related issues</li>
      <li className="mb-1">updated Dutch translation</li>
      <li className="mb-1">updated Brazilian Portuguese translation</li>
      <li className="mb-1">many minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.5.3"></a>phpMyFAQ 2.5.3 - 2009-10-19</h3>
    <ul>
      <li className="mb-1">switched repository from SVN to git</li>
      <li className="mb-1">added missing Perl syntax hightlighting</li>
      <li className="mb-1">fixed missing info link in news</li>
      <li className="mb-1">fixed broken group permission check for instant response</li>
      <li className="mb-1">fixed broken attachment download</li>
      <li className="mb-1">fixed SQLite problems</li>
      <li className="mb-1">updated Japanese translation</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.5.2"></a>phpMyFAQ 2.5.2 - 2009-09-01</h3>
    <ul>
      <li className="mb-1">fixed IE6/7 only XSS vulnerability (<a href="/security/advisory-2009-09-01">advisory</a>)</li>
      <li className="mb-1">updated Polish language file</li>
      <li className="mb-1">updated Chinese language file</li>
      <li className="mb-1">fixed problem with Czech translation</li>
      <li className="mb-1">many minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.5.1"></a>phpMyFAQ 2.5.1 - 2009-08-10</h3>
    <ul>
      <li className="mb-1">added support for LDAP-datamapping, e.g. against an Active Directory Server</li>
      <li className="mb-1">added support for multi-domain-authentication, e.g. against an ADS-Global Catalog</li>
      <li className="mb-1">added support for PHP LDAP options</li>
      <li className="mb-1">added Lithuanian translation</li>
      <li className="mb-1">fixed LDAP issues</li>
      <li className="mb-1">fixed some Oracle issues</li>
      <li className="mb-1">improved svn2package script</li>
      <li className="mb-1">many minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.5.0"></a>
      phpMyFAQ 2.5.0 - 2009-07-21
      (Codename: <a rel="nofollow" href="http://en.wikipedia.org/wiki/Pandora_%28moon%29">Pandora</a>)
    </h3>
    <ul>
      <li className="mb-1">changed PHP <a href="/requirements">requirement</a> to PHP 5.2</li>
      <li className="mb-1">dropped support for MySQL 4.0 and MaxDB</li>
      <li className="mb-1">dropped support for XML-RPC</li>
      <li className="mb-1">refactored complete code base to PHP 5.2+</li>
      <li className="mb-1">added new and improved new basic layout theme</li>
      <li className="mb-1">added new administration layout</li>
      <li className="mb-1">added new Image Manager in administration backend</li>
      <li className="mb-1">added RSS feed for every category</li>
      <li className="mb-1">added ability to copy and duplicate FAQ entries</li>
      <li className="mb-1">added support for blocks in template engine</li>
      <li className="mb-1">added public user registration</li>
      <li className="mb-1">added LDAP authentication</li>
      <li className="mb-1">added HTTP authentication</li>
      <li className="mb-1">added Mail sub system</li>
      <li className="mb-1">added enable/disable WYSIWYG Editor flag</li>
      <li className="mb-1">added most popular searches list</li>
      <li className="mb-1">added frontend for search logs statistics</li>
      <li className="mb-1">added sticky FAQ records</li>
      <li className="mb-1">added smart answering for user questions</li>
      <li className="mb-1">added string wrapper for better UTF-8 handling</li>
      <li className="mb-1">added translation frontend</li>
      <li className="mb-1">added jQuery 1.3 as replacement for Prototype/Script.aculo.us</li>
      <li className="mb-1">improved user administration frontend</li>
      <li className="mb-1">improved performance</li>
      <li className="mb-1">improved language files</li>
      <li className="mb-1">ajaxified comment and record administration</li>
      <li className="mb-1">updated bundled Net_IDNA to version 0.6.3</li>
      <li className="mb-1">updated bundled TinyMCE editor component to version 3.2.2.3</li>
      <li className="mb-1">updated bundled FPDF library to version 1.6</li>
    </ul>

    <h2 className="mt-5 mb-3">phpMyFAQ 2.0.x</h2>

    <h3 className="mt-4 mb-2"><a id="2.0.17"></a>phpMyFAQ 2.0.17 - 2009-09-01</h3>
    <ul>
      <li className="mb-1">fixed XSS vulnerability (<a href="/security/advisory-2009-09-01">advisory</a>)</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.0.16"></a>phpMyFAQ 2.0.16 - 2009-08-10</h3>
    <ul>
      <li className="mb-1">updated French translation</li>
      <li className="mb-1">fixed problem with visible questions</li>
      <li className="mb-1">fixed bug with broken category permission settings</li>
      <li className="mb-1">fixed some Oracle issues</li>
      <li className="mb-1">improved SVN export script</li>
      <li className="mb-1">minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.0.15"></a>phpMyFAQ 2.0.15 - 2009-06-02</h3>
    <ul>
      <li className="mb-1">fixed XSS vulnerability (<a href="/security/advisory-2009-06-02">advisory</a>)</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.0.14"></a>phpMyFAQ 2.0.14 - 2009-05-21</h3>
    <ul>
      <li className="mb-1">updated Vietnamese translation</li>
      <li className="mb-1">improved tagging implementation</li>
      <li className="mb-1">fixed authentication bypass</li>
      <li className="mb-1">fixed content type for RSS feeds</li>
      <li className="mb-1">minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.0.13"></a>phpMyFAQ 2.0.13 - 2009-04-20</h3>
    <ul>
      <li className="mb-1">added new blocked words for spam protection</li>
      <li className="mb-1">fixed fatal error in PHP 5.3</li>
      <li className="mb-1">fixed redirect problem with multiviews in .htaccess</li>
      <li className="mb-1">fixed problem with visible questions in RSS feed</li>
      <li className="mb-1">minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.0.12"></a>phpMyFAQ 2.0.12 - 2009-02-17</h3>
    <ul>
      <li className="mb-1">fixed bug with MySQL 6 and ext/mysqli</li>
      <li className="mb-1">fixed stat call bug in installer on OpenSuse 10.3</li>
      <li className="mb-1">improved SVN checkout script</li>
      <li className="mb-1">many minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.0.11"></a>phpMyFAQ 2.0.11 - 2009-01-22</h3>
    <ul>
      <li className="mb-1">updated English and Turkish translation and switched to UTF-8</li>
      <li className="mb-1">updated Simplified Chinese translation</li>
      <li className="mb-1">fixed possible infinity loop bug in categories</li>
      <li className="mb-1">fixed permission bypass issue</li>
      <li className="mb-1">many minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.0.10"></a>phpMyFAQ 2.0.10 - 2008-11-26</h3>
    <ul>
      <li className="mb-1">fixed image bug in PDF</li>
      <li className="mb-1">fixed isses in admin log display</li>
      <li className="mb-1">re-added missing XML-RPCS library files</li>
      <li className="mb-1">fixed PHP warnings and notices</li>
      <li className="mb-1">minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.0.9"></a>phpMyFAQ 2.0.9 - 2008-10-17</h3>
    <ul>
      <li className="mb-1">dedicated to my uncle Werner</li>
      <li className="mb-1">fixed content deletion bug</li>
      <li className="mb-1">fixed SVN export script</li>
      <li className="mb-1">improved comment spam protection</li>
      <li className="mb-1">re-added missing css color file</li>
      <li className="mb-1">minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.0.8"></a>phpMyFAQ 2.0.8 - 2008-09-11</h3>
    <ul>
      <li className="mb-1">fixed security vulnerability in XSS filter (Alexios Fakos at n.runs.com)</li>
      <li className="mb-1">switched repository from CVS to SVN</li>
      <li className="mb-1">fixed session bug with MS SQL</li>
      <li className="mb-1">fixed login errors with IBM DB2</li>
      <li className="mb-1">updated French translation</li>
      <li className="mb-1">updated Serbian translation</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.0.7"></a>phpMyFAQ 2.0.7 - 2008-05-12</h3>
    <ul>
      <li className="mb-1">added Bengali translation</li>
      <li className="mb-1">added Ukrainian translation</li>
      <li className="mb-1">updated Czech translation</li>
      <li className="mb-1">minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.0.6"></a>phpMyFAQ 2.0.6 - 2008-02-24</h3>
    <ul>
      <li className="mb-1">permission setting related fix</li>
      <li className="mb-1">minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.0.5"></a>phpMyFAQ 2.0.5 - 2008-01-20</h3>
    <ul>
      <li className="mb-1">fixed lighttpd rewrite rules</li>
      <li className="mb-1">many minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.0.4"></a>phpMyFAQ 2.0.4 - 2007-11-18</h3>
    <ul>
      <li className="mb-1">added Thai translation</li>
      <li className="mb-1">improved DiggIt link</li>
      <li className="mb-1">fixed French translation</li>
      <li className="mb-1">many minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.0.3"></a>phpMyFAQ 2.0.3 - 2007-08-18</h3>
    <ul>
      <li className="mb-1">some permission related fixes</li>
      <li className="mb-1">some glossary related fixes</li>
      <li className="mb-1">many minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.0.2"></a>phpMyFAQ 2.0.2 - 2007-07-08</h3>
    <ul>
      <li className="mb-1">some performance improvements</li>
      <li className="mb-1">some permission related fixes</li>
      <li className="mb-1">some update fixes</li>
      <li className="mb-1">updated Danish translation</li>
      <li className="mb-1">some minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="2.0.1"></a>phpMyFAQ 2.0.1 - 2007-06-01</h3>
    <ul>
      <li className="mb-1">fixed broken update script</li>
      <li className="mb-1">fixed bugs with basic permission level</li>
      <li className="mb-1">fixed PHP segfaults with Zend Optimizer extension</li>
      <li className="mb-1">updated Japanese translation</li>
      <li className="mb-1">many minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="2.0.0"></a>
      phpMyFAQ 2.0.0 - 2007-05-22
      (Codename: <a rel="nofollow" href="http://en.wikipedia.org/wiki/Prometheus_%28moon%29">Prometheus</a>)
    </h3>
    <ul>
      <li className="mb-1">added rewritten and enhanced user management</li>
      <li className="mb-1">added rewritten and enhanced authorization management</li>
      <li className="mb-1">added user and group based permissions for categories and records</li>
      <li className="mb-1">added Ajax support</li>
      <li className="mb-1">added automatic link verification</li>
      <li className="mb-1">added user binding to a category</li>
      <li className="mb-1">added glossary support</li>
      <li className="mb-1">added possibility to delete admin log</li>
      <li className="mb-1">added configurable visibility of new questions</li>
      <li className="mb-1">added dynamic related articles</li>
      <li className="mb-1">added support for Google, Yahoo!, and MSN sitemaps</li>
      <li className="mb-1">added improved WYSIWYG editor and Image Manager</li>
      <li className="mb-1">added improved News module</li>
      <li className="mb-1">added tagging</li>
      <li className="mb-1">added DiggIt! link</li>
      <li className="mb-1">added Microsummaries</li>
      <li className="mb-1">added OpenSearch support</li>
      <li className="mb-1">added "submit translation" link</li>
      <li className="mb-1">added experimental support for Oracle</li>
      <li className="mb-1">added experimental support for Interbase/Firebird</li>
      <li className="mb-1">added sorting by id, title and date for records in admin backend</li>
      <li className="mb-1">added comment administration frontend</li>
      <li className="mb-1">added configurable simple reordering of records</li>
      <li className="mb-1">added questionnaire for statistics in installer</li>
      <li className="mb-1">added Ajax-powered Instant Response</li>
      <li className="mb-1">added editable default values for record configuration</li>
      <li className="mb-1">added blacklist for search bots</li>
      <li className="mb-1">added stylesheets for right-to-left text-direction</li>
      <li className="mb-1">improved export functions</li>
      <li className="mb-1">improved URL rewrite functions</li>
      <li className="mb-1">improved category management</li>
      <li className="mb-1">improved administration backend</li>
      <li className="mb-1">updated Arabic translation</li>
      <li className="mb-1">updated German translation</li>
      <li className="mb-1">updated Hewbrew translation</li>
      <li className="mb-1">updated Italian translation</li>
      <li className="mb-1">updated Japanese translation</li>
      <li className="mb-1">updated Spanish translation</li>
    </ul>

    <h2 className="mt-5 mb-3">phpMyFAQ 1.6.x</h2>

    <h3 className="mt-4 mb-2"><a id="1.6.12"></a>phpMyFAQ 1.6.12 - 2007-05-13</h3>
    <ul>
      <li className="mb-1">updated bundled Net_Idna to version 0.5.1</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.6.11"></a>phpMyFAQ 1.6.11 - 2007-03-31</h3>
    <ul>
      <li className="mb-1">updated Finnish translation</li>
      <li className="mb-1">fixed problems with unsupported charsets in PHP</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.6.10"></a>phpMyFAQ 1.6.10 - 2007-02-18</h3>
    <ul>
      <li className="mb-1">fixed a serious security issue (<a href="/security/advisory-2007-02-18">advisory</a>)</li>
      <li className="mb-1">improved performance</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.6.9"></a>phpMyFAQ 1.6.9 - 2007-01-28</h3>
    <ul>
      <li className="mb-1">updated bundled PHP XMLRPC to version 2.1</li>
      <li className="mb-1">fixed the backup download permissions</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.6.8"></a>phpMyFAQ 1.6.8 - 2006-12-15</h3>
    <ul>
      <li className="mb-1">fixed a possible security issue (<a href="/security/advisory-2006-12-15">advisory</a>)</li>
      <li className="mb-1">fixed the blank dropdown in the installer</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.6.7"></a>phpMyFAQ 1.6.7 - 2006-11-27</h3>
    <ul>
      <li className="mb-1">added Persian (Farsi) translation</li>
      <li className="mb-1">fixed PHP 5.2.0 related issues</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.6.6"></a>phpMyFAQ 1.6.6 - 2006-10-28</h3>
    <ul>
      <li className="mb-1">updated Arabic translation (also moved to UTF-8)</li>
      <li className="mb-1">updated bundled Net_IDNA to version 0.4.4</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.6.5"></a>phpMyFAQ 1.6.5 - 2006-09-21</h3>
    <ul>
      <li className="mb-1">added Welsh translation</li>
      <li className="mb-1">added French documentation</li>
      <li className="mb-1">updated Czech translation</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.6.4"></a>phpMyFAQ 1.6.4 - 2006-08-19</h3>
    <ul>
      <li className="mb-1">updated Brazilian Portuguese translation</li>
      <li className="mb-1">updated Dutch translation</li>
      <li className="mb-1">updated French translation</li>
      <li className="mb-1">updated Italian translation</li>
      <li className="mb-1">updated Japanese translation</li>
      <li className="mb-1">updated Portuguese translation</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.6.3"></a>phpMyFAQ 1.6.3 - 2006-07-16</h3>
    <ul>
      <li className="mb-1">added German documentation</li>
      <li className="mb-1">updated bundled NET_IDNA class to version 0.4.3</li>
      <li className="mb-1">released a spec file for building an RPM package of phpMyFAQ</li>
      <li className="mb-1">updated Simplified Chinese translation (also moved to utf-8)</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.6.2"></a>phpMyFAQ 1.6.2 - 2006-06-17</h3>
    <ul>
      <li className="mb-1">added user tracking data deletion</li>
      <li className="mb-1">improved PHP 5 support for MySQL and SQLite</li>
      <li className="mb-1">updated Dutch translation</li>
      <li className="mb-1">updated French translation</li>
      <li className="mb-1">updated Italian translation</li>
      <li className="mb-1">updated Swedish translation</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.6.1"></a>phpMyFAQ 1.6.1 - 2006-05-13</h3>
    <ul>
      <li className="mb-1">added spam control center</li>
      <li className="mb-1">added mod_rewrite support for lighttpd</li>
      <li className="mb-1">added Microsoft Internet Explorer 7 search plugin</li>
      <li className="mb-1">added automatic admin session expiry notice</li>
      <li className="mb-1">improved record administration</li>
      <li className="mb-1">improved user administration</li>
      <li className="mb-1">improved category administration</li>
      <li className="mb-1">improved highlighting of searched words</li>
      <li className="mb-1">updated Italian translation</li>
      <li className="mb-1">updated German translation</li>
      <li className="mb-1">updated Danish translation</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="1.6.0"></a>
      phpMyFAQ 1.6.0 - 2006-04-21
      (Codename: <a rel="nofollow" href="http://en.wikipedia.org/wiki/Pluto">Pluto</a>)
    </h3>
    <ul>
      <li className="mb-1">fixed security issue (<a href="/security/advisory-2006-04-21">advisory</a>)</li>
      <li className="mb-1">added unique solution id</li>
      <li className="mb-1">added revision system</li>
      <li className="mb-1">added support for captchas</li>
      <li className="mb-1">added bad word list blocker</li>
      <li className="mb-1">added search in one selected category</li>
      <li className="mb-1">added linked breadcrumb</li>
      <li className="mb-1">added RSS feed for open questions</li>
      <li className="mb-1">added Brazilian Portuguese translation</li>
      <li className="mb-1">improved record administration</li>
      <li className="mb-1">improved spam protection</li>
      <li className="mb-1">improved language detection and handling</li>
      <li className="mb-1">updated Italian translation</li>
      <li className="mb-1">updated Japanese translation</li>
      <li className="mb-1">updated Korean translation</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h2 className="mt-5 mb-3">phpMyFAQ 1.5.x</h2>

    <h3 className="mt-4 mb-2"><a id="1.5.9"></a>phpMyFAQ 1.5.9 - 2006-04-21</h3>
    <ul>
      <li className="mb-1">fixed security issue (<a href="/security/advisory-2006-04-21">advisory</a>)</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.5.8"></a>phpMyFAQ 1.5.8 - 2006-04-09</h3>
    <ul>
      <li className="mb-1">updated Korean translation</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.5.7"></a>phpMyFAQ 1.5.7 - 2006-03-02</h3>
    <ul>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.5.6"></a>phpMyFAQ 1.5.6 - 2006-01-28</h3>
    <ul>
      <li className="mb-1">added Basque translation</li>
      <li className="mb-1">improved spam protection</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.5.5"></a>phpMyFAQ 1.5.5 - 2005-12-19</h3>
    <ul>
      <li className="mb-1">added support for MaxDB</li>
      <li className="mb-1">added keywords into meta keywords</li>
      <li className="mb-1">added search by record ID</li>
      <li className="mb-1">improved language detection and handling</li>
      <li className="mb-1">updated Italian translation</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.5.4"></a>phpMyFAQ 1.5.4 - 2005-11-18</h3>
    <ul>
      <li className="mb-1">fixed security issues (<a href="/security/advisory-2005-11-18">advisory</a>)</li>
      <li className="mb-1">full support for IBM DB2 databases</li>
      <li className="mb-1">added re-ordering of sub-categories</li>
      <li className="mb-1">added Firefox/Mozilla search plugin</li>
      <li className="mb-1">updated Hebrew translation</li>
      <li className="mb-1">updated Simplified Chinese translation</li>
      <li className="mb-1">updated Spanish translation</li>
      <li className="mb-1">updated Italian translation</li>
      <li className="mb-1">updated Japanese translation</li>
      <li className="mb-1">updated Danish translation</li>
      <li className="mb-1">some minor improvements</li>
      <li className="mb-1">many minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.5.3"></a>phpMyFAQ 1.5.3 - 2005-10-15</h3>
    <ul>
      <li className="mb-1">added several security enhancements</li>
      <li className="mb-1">added Greek translation</li>
      <li className="mb-1">improved RSS support</li>
      <li className="mb-1">improved backup/restore frontend</li>
      <li className="mb-1">updated Indonasian translation</li>
      <li className="mb-1">updated bundled Net_IDNA class</li>
      <li className="mb-1">many minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.5.2"></a>phpMyFAQ 1.5.2 - 2005-09-23</h3>
    <ul>
      <li className="mb-1">fixed serious security issues (<a href="/security/advisory-2005-09-23">advisory</a>)</li>
      <li className="mb-1">full support for SQLite</li>
      <li className="mb-1">more compliance with phpMyFAQ 1.4.x templates</li>
      <li className="mb-1"> many minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.5.1"></a>phpMyFAQ 1.5.1 - 2005-09-19</h3>
    <ul>
      <li className="mb-1">added experimental support for SQLite</li>
      <li className="mb-1">added dynamic Sitemap</li>
      <li className="mb-1">added Norwegian Bokmål translation</li>
      <li className="mb-1">improved image handling in PDF export</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="1.5.0"></a>
      phpMyFAQ 1.5.0 - 2005-08-20
      (Codename: <a rel="nofollow" href="http://en.wikipedia.org/wiki/Phoebe_%28moon%29">Phoebe</a>)
    </h3>
    <ul>
      <li className="mb-1">full support for PostgreSQL databases</li>
      <li className="mb-1">full support for Sybase databases</li>
      <li className="mb-1">full support for MS SQL databases</li>
      <li className="mb-1">full support for MySQL 4.1/5.0 databases</li>
      <li className="mb-1">experimental support for IBM DB2 databases</li>
      <li className="mb-1">LDAP support as an additional option</li>
      <li className="mb-1">one entry in various categories</li>
      <li className="mb-1">mod_rewrite support</li>
      <li className="mb-1">faster template engine parses PHP code</li>
      <li className="mb-1">rewritten PDF export</li>
      <li className="mb-1">complete XML, XHTML and DocBook XML exports</li>
      <li className="mb-1">better RSS support</li>
      <li className="mb-1">updated bundled htmlArea and bundled NET_IDNA class</li>
      <li className="mb-1">PHP 5.x compatible</li>
      <li className="mb-1">many code and performance improvements and code cleanup</li>
    </ul>

    <h2 className="mt-5 mb-3">phpMyFAQ 1.4.x</h2>

    <h3 className="mt-4 mb-2"><a id="1.4.11"></a>phpMyFAQ 1.4.11 - 2005-08-15</h3>
    <ul>
      <li className="mb-1">fixed serious security issue in bundled XML-RPC component (<a
          href="/security/advisory-2005-08-15">advisory</a>)
      </li>
      <li className="mb-1">updated bundled NET_IDNA class to version 0.4.1</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.4.10"></a>phpMyFAQ 1.4.10 - 2005-08-01</h3>
    <ul>
      <li className="mb-1">compatible with PHP 4.4.0</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.4.9"></a>phpMyFAQ 1.4.9 - 2005-06-29</h3>
    <ul>
      <li className="mb-1">fixed serious security issue in bundled XML-RPC component (<a
          href="/security/advisory-2005-06-29">advisory</a>)
      </li>
      <li className="mb-1">some minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.4.8"></a>phpMyFAQ 1.4.8 - 2005-04-11</h3>
    <ul>
      <li className="mb-1">fixed bug with images in PDFs</li>
      <li className="mb-1">fixed bug with URLs in export</li>
      <li className="mb-1">updated Japanese translation</li>
      <li className="mb-1">updated Korean translation</li>
      <li className="mb-1">some minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.4.7"></a>phpMyFAQ 1.4.7 - 2005-03-06</h3>
    <ul>
      <li className="mb-1">fixed possible SQL injection bug (<a href="/security/advisory-2005-03-06">advisory</a>)</li>
      <li className="mb-1">some minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.4.6"></a>phpMyFAQ 1.4.6 - 2005-02-20</h3>
    <ul>
      <li className="mb-1">updated Polish translation</li>
      <li className="mb-1">updated French translation</li>
      <li className="mb-1">some minor bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.4.5"></a>phpMyFAQ 1.4.5 - 2005-01-22</h3>
    <ul>
      <li className="mb-1">updated Japanese translation</li>
      <li className="mb-1">updated Chinese (Traditional) translation</li>
      <li className="mb-1">some bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.4.4"></a>phpMyFAQ 1.4.4 "The Santa Claus Version" - 2004-12-06</h3>
    <ul>
      <li className="mb-1">added Romanian translation</li>
      <li className="mb-1">added Chinese (Traditional) translation</li>
      <li className="mb-1">many bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.4.3"></a>phpMyFAQ 1.4.3 - 2004-11-05</h3>
    <ul>
      <li className="mb-1">added Turkish translation</li>
      <li className="mb-1">added Indonesian translation</li>
      <li className="mb-1">updated German translation</li>
      <li className="mb-1">many bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.4.2"></a>phpMyFAQ 1.4.2 - 2004-10-10</h3>
    <ul>
      <li className="mb-1">added Finnish translation</li>
      <li className="mb-1">added Hebrew translation</li>
      <li className="mb-1">fulltext search inside admin section</li>
      <li className="mb-1">some accessibility improvements</li>
      <li className="mb-1">many bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.4.1"></a>phpMyFAQ 1.4.1 - 2004-08-16</h3>
    <ul>
      <li className="mb-1">improved category administration</li>
      <li className="mb-1">added Swedish translation</li>
      <li className="mb-1">added Korean translation</li>
      <li className="mb-1">added Japanese translation</li>
      <li className="mb-1">custom admin menu according to user permissions</li>
      <li className="mb-1">easier record deleting</li>
      <li className="mb-1">session and language stored in a cookie</li>
      <li className="mb-1">less SQL queries in admin section</li>
      <li className="mb-1">updated install script</li>
      <li className="mb-1">updated Chinese translation</li>
      <li className="mb-1">updated Portoguese translation</li>
      <li className="mb-1">improved IDN domain support</li>
      <li className="mb-1">improved accessibility</li>
      <li className="mb-1">many bug fixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.4.0"></a>phpMyFAQ 1.4.0a - 2004-07-27</h3>
    <ul>
      <li className="mb-1">fixed security vulnerability (<a href="/security/advisory-2004-07-27">advisory</a>)</li>
    </ul>

    <h3 className="mt-4 mb-2">
      <a id="1.4.0"></a>
      phpMyFAQ 1.4.0 - 2004-07-22
      (Codename: <a rel="nofollow" href="http://en.wikipedia.org/wiki/Pan_%28moon%29">Pan</a>)
    </h3>
    <ul>
      <li className="mb-1">added WYSIWYG Editor</li>
      <li className="mb-1">added Image Manager</li>
      <li className="mb-1">added new category module</li>
      <li className="mb-1">added support for XML-RPC</li>
      <li className="mb-1">added support for timezones</li>
      <li className="mb-1">added ISO 639 support in translations</li>
      <li className="mb-1">added script that converts BBCode in XHTML</li>
      <li className="mb-1">better PDF export with table of contents</li>
      <li className="mb-1">new and better installer</li>
      <li className="mb-1">new XHTML based templates</li>
      <li className="mb-1">automatic language detection</li>
      <li className="mb-1">improved IDN domain support</li>
      <li className="mb-1">function for resetting forgotten passwords</li>
      <li className="mb-1">include internal links with dropdown box</li>
      <li className="mb-1">many code improvements and code cleanup</li>
      <li className="mb-1">many bug fixes</li>
    </ul>

    <h2 className="mt-5 mb-3">phpMyFAQ 1.3.x</h2>

    <h3 className="mt-4 mb-2"><a id="1.3.14"></a>phpMyFAQ 1.3.14 - 2004-06-09</h3>
    <ul>
      <li className="mb-1">added Slovenian translation</li>
      <li className="mb-1">added Serbian translation</li>
      <li className="mb-1">added Danish translation</li>
      <li className="mb-1">improved performance on Windows Server 2003 and PHP with ISAPI</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.3.13"></a>phpMyFAQ 1.3.13 - 2004-05-18</h3>
    <ul>
      <li className="mb-1">fixed serious security vulnerability (Stefan Esser, <a href="/security/advisory-2004-05-18">advisory</a>)
      </li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.3.12"></a>phpMyFAQ 1.3.12 - 2004-04-21</h3>
    <ul>
      <li className="mb-1">added Hungarian translation</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.3.11"></a>phpMyFAQ 1.3.11a - 2004-04-13</h3>
    <ul>
      <li className="mb-1">fixed some annoying bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.3.11"></a>phpMyFAQ 1.3.11 - 2004-04-07</h3>
    <ul>
      <li className="mb-1">added Chinese translation</li>
      <li className="mb-1">added Czech translation</li>
      <li className="mb-1">added support for IDN domains</li>
      <li className="mb-1">many bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.3.10"></a>phpMyFAQ 1.3.10 - 2004-02-12</h3>
    <ul>
      <li className="mb-1">updated bundled FPDF class</li>
      <li className="mb-1">added Arabian translation</li>
      <li className="mb-1">many bugfixes</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.3.9"></a>phpMyFAQ 1.3.9pl1 - 2004-01-02</h3>
    <ul>
      <li className="mb-1">added Vietnamese translation</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.3.9"></a>phpMyFAQ 1.3.9 - 2003-11-26</h3>
    <ul>
      <li className="mb-1">added graphical bar for voting results</li>
      <li className="mb-1">added new Russian translation</li>
      <li className="mb-1">added BB-Code support for news</li>
      <li className="mb-1">added valid ISO 8601 dates</li>
      <li className="mb-1">improved search highliting</li>
      <li className="mb-1">improved category selection</li>
      <li className="mb-1">improved BB-Code editor</li>
      <li className="mb-1">improved performance</li>
      <li className="mb-1">improved PDF export with images</li>
      <li className="mb-1">updated English translation</li>
      <li className="mb-1">fixed some multibyte problems</li>
      <li className="mb-1">fixed some PHP5 problems</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.3.8"></a>phpMyFAQ 1.3.8 - 2003-10-23</h3>
    <ul>
      <li className="mb-1">added support fo MySQL 4.0 full text search</li>
      <li className="mb-1">added Latvian translation</li>
      <li className="mb-1">improved performance in admin backend</li>
      <li className="mb-1">improved install script</li>
      <li className="mb-1">fixed Italian translation</li>
      <li className="mb-1">fixed IE only bug in backup function</li>
      <li className="mb-1">fixed many bugs in baxckup function</li>
      <li className="mb-1">fixed cookie problems</li>
      <li className="mb-1">fixed bug in BB-Code parser</li>
      <li className="mb-1">fixed some translations</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.3.7"></a>phpMyFAQ 1.3.7 - 2003-09-19</h3>
    <ul>
      <li className="mb-1">dedicated to Johnny Cash</li>
      <li className="mb-1">added patch against Versign</li>
      <li className="mb-1">improved BB-Code parser</li>
      <li className="mb-1">fixed some minor layout problems</li>
      <li className="mb-1">fixed Windows-only bug in send2friend function</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.3.6"></a>phpMyFAQ 1.3.6 - 2003-09-01</h3>
    <ul>
      <li className="mb-1">fixed serious bug in install script</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.3.5"></a>phpMyFAQ 1.3.5 - 2003-08-31</h3>
    <ul>
      <li className="mb-1">added internal linking of FAQ records</li>
      <li className="mb-1">added RSS feed exports with cronjob</li>
      <li className="mb-1">improved BB-Code parser</li>
      <li className="mb-1">updated English translation</li>
      <li className="mb-1">fixed some PDF problems</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.3.4"></a>phpMyFAQ 1.3.4 - 2003-08-03</h3>
    <ul>
      <li className="mb-1">added new BB-Code parser</li>
      <li className="mb-1">added Italian translation</li>
      <li className="mb-1">improved search highlighting</li>
      <li className="mb-1">updated French and Dutch translation</li>
      <li className="mb-1">fixed some translations</li>
      <li className="mb-1">fixed bug in install script</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.3.3"></a>phpMyFAQ 1.3.3 - 2003-06-27</h3>
    <ul>
      <li className="mb-1">added IP bans</li>
      <li className="mb-1">added Portuguese translation</li>
      <li className="mb-1">added Spanish translation</li>
      <li className="mb-1">added enable/disable comments function</li>
      <li className="mb-1">added copyright and URL in printing view and PDF exports</li>
      <li className="mb-1">improved installation (testing default language and password)</li>
      <li className="mb-1">improved PDF export with image support</li>
      <li className="mb-1">improved user management</li>
      <li className="mb-1">removed default password</li>
      <li className="mb-1">switched default language from German to English</li>
      <li className="mb-1">renamed backup files to phpmyfaq.&lt;datum&gt;.sql instead of attachment.php</li>
      <li className="mb-1">fixed installation bug with MySQL 4.0</li>
      <li className="mb-1">fixed bug when deleting a news record</li>
      <li className="mb-1">fixed a bug when deleting comments</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.3.2"></a>phpMyFAQ 1.3.2 - 2003-05-26</h3>
    <ul>
      <li className="mb-1">added new category sort function</li>
      <li className="mb-1">added Polish translation</li>
      <li className="mb-1">added reload for votings</li>
      <li className="mb-1">added translation for BB-Code help</li>
      <li className="mb-1">improved navigation</li>
      <li className="mb-1">improved update script</li>
      <li className="mb-1">fixed bug in backup script</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.3.1"></a>phpMyFAQ 1.3.1 - 2003-05-02</h3>
    <ul>
      <li className="mb-1">added FAQ record preview</li>
      <li className="mb-1">added RSS feeds for Top10, news and latest records</li>
      <li className="mb-1">added system information in admin backend</li>
      <li className="mb-1">added French translation</li>
      <li className="mb-1">improved navigation in admin backend</li>
      <li className="mb-1">fixed bug in session search</li>
      <li className="mb-1">fixed some bugs when creating new FAQ records</li>
      <li className="mb-1">fixed some cookie problems</li>
      <li className="mb-1">fixed wrong link at send2friend function</li>
      <li className="mb-1">fixed delimiter bug in Apache2 and PHP 4.3</li>
      <li className="mb-1">fixed many bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.3.0"></a>phpMyFAQ 1.3.0 - 2003-04-17</h3>
    <ul>
      <li className="mb-1">added support for multilingualism</li>
      <li className="mb-1">added database abstraction layer</li>
      <li className="mb-1">added PDF support</li>
      <li className="mb-1">added BB-Code editor</li>
      <li className="mb-1">added more BB-Codes</li>
      <li className="mb-1">added PHP syntax highlighting</li>
      <li className="mb-1">added English documentation</li>
      <li className="mb-1">added encryption of passwords</li>
      <li className="mb-1">improved security</li>
      <li className="mb-1">improved admin backend</li>
      <li className="mb-1">improved XML support with XML namespaces and XML scheme</li>
      <li className="mb-1">fixed many bugs</li>
    </ul>

    <h2 className="mt-5 mb-3">phpMyFAQ 1.2.x</h2>

    <h3 className="mt-4 mb-2"><a id="1.2.5b"></a>phpMyFAQ 1.2.5b - 2003-03-24</h3>
    <ul>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.2.5a"></a>phpMyFAQ 1.2.5a - 2003-03-04</h3>
    <ul>
      <li className="mb-1">fixed bug in BB-Code parser</li>
      <li className="mb-1">fixed bug in display of Top10</li>
      <li className="mb-1">fixed some minor bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.2.5"></a>phpMyFAQ 1.2.5 - 2003-02-02</h3>
    <ul>
      <li className="mb-1">fixed some serious bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.2.4"></a>phpMyFAQ 1.2.4 - 2003-01-31</h3>
    <ul>
      <li className="mb-1">improved variable checks</li>
      <li className="mb-1">improved printing functions</li>
      <li className="mb-1">fixed some bugs in admin backend</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.2.3"></a>phpMyFAQ 1.2.3 - 2002-11-30</h3>
    <ul>
      <li className="mb-1">added check if installation or update script are deleted</li>
      <li className="mb-1">added automatic content negotiation in admin backend</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.2.2"></a>phpMyFAQ 1.2.2 - 2002-11-04</h3>
    <ul>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.2.1"></a>phpMyFAQ 1.2.1 - 2002-10-23</h3>
    <ul>
      <li className="mb-1">improved update script</li>
      <li className="mb-1">improved language selection</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.2.0"></a>phpMyFAQ 1.2.0 - 2002-10-09</h3>
    <ul>
      <li className="mb-1">phpMyFAQ is now Open Source</li>
      <li className="mb-1">added template engine for own layouts</li>
      <li className="mb-1">fully compatible for PHP 4.1, PHP 4.2 and PHP 4.3 (register_globals=off)</li>
      <li className="mb-1">color and font definitions based on CSS</li>
      <li className="mb-1">improved SQL queries</li>
      <li className="mb-1">improved search engine</li>
      <li className="mb-1">improved send2friend function</li>
      <li className="mb-1">improved display of categories</li>
      <li className="mb-1">improved installation script</li>
      <li className="mb-1">many bugfixes</li>
    </ul>

    <h2 className="mt-5 mb-3">phpMyFAQ 1.1.x</h2>

    <h3 className="mt-4 mb-2"><a id="1.1.5"></a>phpMyFAQ 1.1.5 - 2002-06-23</h3>
    <ul>
      <li className="mb-1">added Russian translation</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.1.4"></a>phpMyFAQ 1.1.4a - 2002-06-08</h3>
    <ul>
      <li className="mb-1">fixed some bugs for PHP 4.1.0</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.1.4"></a>phpMyFAQ 1.1.4 - 2002-05-24</h3>
    <ul>
      <li className="mb-1">added possibilty to disable voting</li>
      <li className="mb-1">bigger code cleanup</li>
      <li className="mb-1">changed CSS file from style.php to style.css</li>
      <li className="mb-1">improved HTML code</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.1.3"></a>phpMyFAQ 1.1.3 - 2002-05-01</h3>
    <ul>
      <li className="mb-1">fixed bug in BB-Code parser</li>
      <li className="mb-1">fixed bug in display of comments</li>
      <li className="mb-1">code cleanup</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.1.2"></a>phpMyFAQ 1.1.2 - 2002-03-22</h3>
    <ul>
      <li className="mb-1">added send2friend function</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.1.1"></a>phpMyFAQ 1.1.1 - 2002-03-06</h3>
    <ul>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.1.0"></a>phpMyFAQ 1.1.0 - 2002-02-11</h3>
    <ul>
      <li className="mb-1">improved attachments</li>
      <li className="mb-1">added sub-categories</li>
      <li className="mb-1">added possibility to disable user-tracking and adminlogging</li>
      <li className="mb-1">ported to PHP4</li>
      <li className="mb-1">code cleanup</li>
      <li className="mb-1">improved installation script</li>
      <li className="mb-1">admin backend works now in Netscape 4.x</li>
      <li className="mb-1">improved error handling</li>
      <li className="mb-1">improved adminlogging</li>
      <li className="mb-1">improved documentation</li>
      <li className="mb-1">removed possibility to delete admin account</li>
      <li className="mb-1">fixed many bugs</li>
    </ul>

    <h2 className="mt-5 mb-3">phpMyFAQ 1.0.x</h2>

    <h3 className="mt-4 mb-2"><a id="1.0.1"></a>phpMyFAQ 1.0.1a - 2001-10-15</h3>
    <ul>
      <li className="mb-1">changed file extensions from .php3 to .php</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.0.1"></a>phpMyFAQ 1.0.1 - 2001-10-10</h3>
    <ul>
      <li className="mb-1">fixed some bugs in installation and update scripts</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="1.0.0"></a>phpMyFAQ 1.0.0 - 2001-09-30</h3>
    <ul>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h2 className="mt-5 mb-3">phpMyFAQ 0.x</h2>

    <h3 className="mt-4 mb-2"><a id="0.95"></a>phpMyFAQ 0.95 - 2001-09-11</h3>
    <ul>
      <li className="mb-1">clean up of MySQL table names</li>
      <li className="mb-1">added documentation</li>
      <li className="mb-1">frontend is HTML 4.0 valid</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="0.90"></a>phpMyFAQ 0.90 - 2001-08-23</h3>
    <ul>
      <li className="mb-1">added update script</li>
      <li className="mb-1">added possibility to answer open questions</li>
      <li className="mb-1">configurable admin backend design</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="0.87"></a>phpMyFAQ 0.87 - 2001-07-20</h3>
    <ul>
      <li className="mb-1">added possibility to disable Top10 and latest records</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="0.86"></a>phpMyFAQ 0.86 - 2001-07-10</h3>
    <ul>
      <li className="mb-1">fixed BB-Code parser fixed</li>
      <li className="mb-1">added option to select HTML or BB-Code</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="0.85"></a>phpMyFAQ 0.85 - 2001-07-08</h3>
    <ul>
      <li className="mb-1">added backup function (backup and restore)</li>
      <li className="mb-1">added BB-Code support</li>
      <li className="mb-1">added XML export</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="0.80"></a>phpMyFAQ 0.80a - 2001-06-07</h3>
    <ul>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="0.80"></a>phpMyFAQ 0.80 - 2001-05-30</h3>
    <ul>
      <li className="mb-1">added frontend to ask questions</li>
      <li className="mb-1">added display of latest FAQ records</li>
      <li className="mb-1">added attachments for FAQ records</li>
      <li className="mb-1">added improved FAQ record administration</li>
      <li className="mb-1">added configuration frontend</li>
      <li className="mb-1">added display of number of users online</li>
      <li className="mb-1">added printer-optimized view</li>
      <li className="mb-1">improved comment functions</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="0.70"></a>phpMyFAQ 0.70 - 2001-04-27</h3>
    <ul>
      <li className="mb-1">added installation script</li>
      <li className="mb-1">improved authorization in the admin backend</li>
      <li className="mb-1">configurable layout</li>
      <li className="mb-1">added English translation</li>
      <li className="mb-1">fixed a bug when deleting comments</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="0.666"></a>phpMyFAQ 0.666 - 2001-04-10</h3>
    <ul>
      <li className="mb-1">added category administration</li>
      <li className="mb-1">added voting function</li>
      <li className="mb-1">added possibility to delete comments in the admin backend</li>
      <li className="mb-1">fixed some bugs</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="0.65"></a>phpMyFAQ 0.65 - 2001-03-18</h3>
    <ul>
      <li className="mb-1">added comment function</li>
      <li className="mb-1">added news administration</li>
      <li className="mb-1">improved search function</li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="0.60"></a>phpMyFAQ 0.60 - 2001-02-22</h3>
    <ul>
      <li className="mb-1">First public release: <strong>http://stratofaq.ig4.de</strong></li>
    </ul>

    <h3 className="mt-4 mb-2"><a id="0.1"></a>phpMyFAQ 0.1 - 2001-02-12</h3>
    <ul>
      <li className="mb-1">Start of the phpMyFAQ project, originally written by Thorsten Rinne and Bastian Pöttner</li>
    </ul>`
            }} />
          </div>

          <div className="alert alert-info mt-5">
            <h4>Complete History</h4>
            <p className="mb-0">
              For development builds and pre-release versions, please visit our{' '}
              <a href="https://github.com/thorsten/phpMyFAQ/releases" target="_blank" rel="noopener">
                GitHub Releases page
              </a>.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
