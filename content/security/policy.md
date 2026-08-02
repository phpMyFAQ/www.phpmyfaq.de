---
title: Security
description: How the phpMyFAQ project handles security — vulnerability reporting, supported versions, SBOM and secure development.
---

phpMyFAQ has published a public security advisory for every fixed vulnerability
since 2004. This page describes how we handle security — how to report an issue,
how long each release is supported, and what documentation we provide for audits.
The advisories themselves are listed on our
[security advisories page](/advisories).

## Reporting a vulnerability

Please do not open a public GitHub issue for security problems.

- Preferred: GitHub Security Advisories → [Report a vulnerability]({{advisoryReportUrl}})
- Alternative: [{{contactEmail}}](mailto:{{contactEmail}}) {{pgpFingerprint}}
- Machine-readable: [security.txt](/.well-known/security.txt)

What to expect:

| Step                        | Target                  |
| --------------------------- | ----------------------- |
| Acknowledgement of receipt  | 2 business days         |
| Initial assessment and CVSS | 7 business days         |
| Fix for critical / high     | 30 days                 |
| Fix for medium / low        | next scheduled release  |
| Public advisory             | with the fixing release |

We request coordinated disclosure and ask you not to publish details before the
advisory is out. The targets above describe when we aim to ship a fix; our
disclosure window, documented in full in [SECURITY.md]({{securityPolicyUrl}}),
allows up to 90 days from the initial report where a fix requires more time.
We credit every reporter who wants to be credited. We do not currently operate
a paid bug bounty.

Safe harbour: we will not pursue legal action against researchers who act in good
faith, stay within the scope of a test installation they control, and do not
access or exfiltrate third-party data.

## Supported versions

{{supportedVersionsTable}}

Our policy: every stable release receives security fixes for at least 12 months
from its release date, and until at least 3 months after the following minor
release reaches stable — whichever is later. This rule applies from 4.1.x
onwards; releases that reached the end of life earlier predate it. Releases past end
of life receive no fixes of any kind, including for critical vulnerabilities.
[Commercial support is available](/support).

## Software Bill of Materials

Every release since {{sbomSinceVersion}} ships a CycloneDX SBOM covering both PHP
and JavaScript dependencies, attached to the GitHub release as
`phpMyFAQ-<version>.sbom.cdx.json` — for example `phpMyFAQ-{{sbomSinceVersion}}.sbom.cdx.json`.
Earlier releases do not include one; for earlier supported 4.1.x releases we
generate an SBOM on request for Business and Enterprise customers.

## Secure development

- Dependencies monitored and updated via Dependabot
- Static analysis (PHPStan level {{phpstanLevel}}) enforced in CI
- Two-factor authentication is required for all accounts with write access
- [Documentation]({{hardeningDocsUrl}}) covering installation and configuration

## Regulatory

phpMyFAQ is developed as a free and open source project. For the commercial
offerings listed under [Support](/support), phpMyFAQ acts as a manufacturer
within the meaning of Regulation (EU) 2024/2847 (Cyber Resilience Act). Our
vulnerability handling process, support periods, and SBOM provision are documented
on this page.

Last reviewed: {{lastReviewed}}