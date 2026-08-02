---
title: Security
description: How the phpMyFAQ project handles security — vulnerability reporting, supported versions, SBOM and secure development.
---

phpMyFAQ has published a public security advisory for every fixed vulnerability
since 2003. This page describes how we handle security — how to report an issue,
how long each release is supported, and what documentation we provide for audits.
The advisories themselves are listed on our
[security advisories page](/advisories).

## Reporting a vulnerability

Please do not open a public GitHub issue for security problems.

- Preferred: GitHub Security Advisories → [Report a vulnerability]({{advisoryReportUrl}})
- Alternative: [{{contactEmail}}](mailto:{{contactEmail}}){{pgpFingerprint}}

What to expect:

| Step                        | Target                  |
| --------------------------- | ----------------------- |
| Acknowledgement of receipt  | 2 business days         |
| Initial assessment and CVSS | 7 business days         |
| Fix for critical / high     | 30 days                 |
| Fix for medium / low        | next scheduled release  |
| Public advisory             | with the fixing release |

We request coordinated disclosure and ask you not to publish details before the
advisory is out. We credit every reporter who wants to be credited. We do not
currently operate a paid bug bounty.

Safe harbour: we will not pursue legal action against researchers who act in good
faith, stay within the scope of a test installation they control, and do not
access or exfiltrate third-party data.

## Supported versions

{{supportedVersionsTable}}

Our policy: every minor release receives security fixes for at least 12 months
after the following minor release is published. Every major release is supported
for at least 24 months from its stable release. [Extended support for older
versions is available commercially](/support).

## Software Bill of Materials

Every release since {{sbomSinceVersion}} ships a CycloneDX SBOM covering both PHP
and JavaScript dependencies, attached as an asset to the GitHub release and
included in the distribution package as `sbom.cdx.json`.

## Secure development

- Dependencies monitored and updated via Dependabot
- Static analysis (PHPStan level {{phpstanLevel}}) enforced in CI
- Release artifacts published with SHA-256 checksums
- Two-factor authentication required for all accounts with write access
- [Hardening recommendations]({{hardeningDocsUrl}}) in the documentation

## Regulatory

phpMyFAQ is developed as a free and open source project. For the commercial
offerings listed under [Support](/support), phpMyFAQ acts as a manufacturer
within the meaning of Regulation (EU) 2024/2847 (Cyber Resilience Act). Our
vulnerability handling process, support periods and SBOM provision are documented
on this page. Reporting obligations under Article 14 are covered by the process
above.

Last reviewed: {{lastReviewed}}
