# 🔓 Open Source Governance Skill

## Strategic Principle

**Open source transparency creates competitive advantage through systematic security excellence.**

This skill embodies Hack23 AB's Open Source Policy, ensuring all open source projects demonstrate security excellence through evidence-based governance, public verification, and community-aligned innovation.

## Primary ISMS References

**This skill is directly informed by:**
- [🔓 Open Source Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Open_Source_Policy.md) - Comprehensive 38KB governance framework
- [🛠️ Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md) - Security-integrated SDLC practices
- [🔍 Vulnerability Management](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Vulnerability_Management.md) - Security testing and remediation SLAs
- [🏷️ Data Classification Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Data_Classification_Policy.md) - Data handling requirements
- [🎯 CLASSIFICATION Framework](https://github.com/Hack23/ISMS-PUBLIC/blob/main/CLASSIFICATION.md) - Business impact analysis
- [🚨 Incident Response Plan](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Incident_Response_Plan.md) - Security incident management
- [🤝 Third Party Management](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Third_Party_Management.md) - Supply chain security

**Related Skills:**
- [Security by Design Skill](security-by-design.md) - Secure development practices
- [Data Protection Skill](data-protection.md) - Privacy and data security
- [ISMS Compliance Skill](isms-compliance.md) - Framework alignment
- [Threat Modeling Skill](threat-modeling.md) - STRIDE, MITRE ATT&CK

## Core Principles

### 🌟 Transparency
Security posture and governance evidence publicly visible through badges and documentation

### 🔐 Security-by-Default
Preventive controls with evidence-based validation

### ✅ Compliance-First
License compliance via automated scanning

### 🤝 Community Respect
Follow upstream guidelines, maintain attribution, enforce code of conduct

### 📊 Evidence-Based
All security claims backed by public badges, reports, and metrics

## 🎖️ Section 1: Security Posture Evidence

**RULE**: All open source repositories MUST demonstrate security excellence through public badges.

### Required Security Badges (MUST)

| Badge | Requirement | Action |
|-------|-------------|--------|
| 🏆 **OpenSSF Scorecard** | Score ≥ 7.0/10, all checks passing | Use `ossf/scorecard-action@v2.4.0` in CI, run weekly + on push to main |
| 🏆 **CII Best Practices** | "Passing" minimum, "Silver"/"Gold" for mature projects | Register at bestpractices.coreinfrastructure.org |
| 🏆 **SLSA Level 3** | Build provenance, non-falsifiable, verifiable | Use `actions/attest-build-provenance@v1` on releases |
| 📊 **Quality Gate** | Passed, zero critical vulns, zero blockers, coverage ≥ 80% | SonarCloud integration |

### License Compliance Badges (MUST)

| Badge | Requirement | Action |
|-------|-------------|--------|
| 🏷️ **FOSSA** | All deps scanned, no violations, automated on PRs | Use `fossas/fossa-action@v1` |
| 🏷️ **REUSE** | All files have licensing, LICENSES/ dir present | Use `fsfe/reuse-action@v2` |
| 🏷️ **License** | OSI-approved, LICENSE file in root | `img.shields.io/github/license` badge |

### Reference Implementations

- **Citizen Intelligence Agency**: [Badge suite](https://github.com/Hack23/cia)
- **CIA Compliance Manager**: [Badge suite](https://github.com/Hack23/cia-compliance-manager)

## 📋 Section 2: Governance Artifacts

**RULE**: Every repository MUST maintain comprehensive governance documentation.

### 🔐 Security Documentation (MUST)

Each repository MUST have these files. See linked examples for templates:

| Document | MUST Include | Example |
|----------|-------------|---------|
| **SECURITY_ARCHITECTURE.md** | Security layers (app, data, network), controls mapping (ISO 27001, NIST CSF), Mermaid diagrams | [Example](https://github.com/Hack23/cia-compliance-manager/blob/main/docs/architecture/SECURITY_ARCHITECTURE.md) |
| **FUTURE_SECURITY_ARCHITECTURE.md** | Planned improvements: short-term (3-6mo), medium-term (6-12mo), long-term (12+mo) | [Example](https://github.com/Hack23/cia-compliance-manager/blob/main/docs/architecture/FUTURE_SECURITY_ARCHITECTURE.md) |
| **SECURITY.md** | Supported versions table, reporting process (email: security@hack23.com), response SLA (Critical: 24h, High: 7d, Medium: 30d, Low: 90d), PGP key link | Standard template |
| **WORKFLOWS.md** | Build pipeline, security gates (SAST/SCA/license/container scanning), deployment process | Standard template |

### 📜 License & Compliance Documentation (MUST)

| Document | MUST Include |
|----------|-------------|
| **LICENSE** | OSI-approved license text (prefer Apache 2.0) |
| **NOTICE** | Third-party attributions with component name, license, copyright holder, URL |
| **CRA-ASSESSMENT.md** | EU CRA product classification, Annex I compliance (security by design, vulnerability handling), conformity assessment — [Example](https://github.com/Hack23/cia-compliance-manager/blob/main/CRA-ASSESSMENT.md) |

**License Categories:**

| Category | Licenses | Action |
|----------|----------|--------|
| ✅ **Pre-approved** | MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC, Unlicense, 0BSD | Use freely |
| ⚠️ **Review Required** | LGPL-2.1/3.0, MPL-2.0, EPL-2.0, CDDL-1.0 | CEO approval required |
| ❌ **Prohibited** | AGPL (all), GPL-2.0/3.0, SSPL, Elastic-2.0, BUSL-1.1, proprietary | Block; remove dependency |

### 🤝 Community Documentation (MUST)

| Document | MUST Include |
|----------|-------------|
| **CODE_OF_CONDUCT.md** | Contributor Covenant, positive/unacceptable behaviors, enforcement contact (conduct@hack23.com) |
| **CONTRIBUTING.md** | Fork/branch/PR workflow, code standards reference, security rules (no secrets/PII), DCO sign-off requirement, license agreement |
| **README.md** | Project classification section with CIA Triad levels (Confidentiality, Integrity, Availability), business impact assessment, compliance requirements |

## 🛡️ Section 3: Security Implementation

**RULE**: Implement comprehensive supply chain security and vulnerability management.

### Supply Chain Security (MUST)

#### SBOM Generation
- **MUST** generate SBOM on every release using `cyclonedx-npm` or equivalent
- **MUST** upload SBOM to release assets
- **SHOULD** sign SBOM with cosign
- Supported formats: CycloneDX (JSON/XML), SPDX (JSON/RDF)

#### Dependency Scanning
- **MUST** configure Dependabot for daily npm and weekly GitHub Actions updates
- **MUST** require CEO review for security-labeled PRs
- **SHOULD** integrate Snyk (`snyk/actions/node@master`, `--severity-threshold=high`)
- **SHOULD** integrate Trivy (`aquasecurity/trivy-action@master`, SARIF output)

#### Secret Scanning
- **MUST** run Gitleaks (`gitleaks/gitleaks-action@v2`) on push and PR
- **SHOULD** maintain `.gitleaksignore` for documented false positives

#### Artifact Signing
- **MUST** sign release artifacts with Sigstore/cosign on tagged releases
- **MUST** generate build provenance attestation with `actions/attest-build-provenance@v1`

### Vulnerability Management (MUST)

**Remediation SLA** (from [Vulnerability Management Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Vulnerability_Management.md)):

| Severity | CVSS Score | Remediation SLA | Notification |
|----------|------------|-----------------|--------------|
| 🔴 **Critical** | 9.0-10.0 | **24 hours** | Immediate |
| 🟠 **High** | 7.0-8.9 | **7 days** | Within 24h |
| 🟡 **Medium** | 4.0-6.9 | **30 days** | Within 7d |
| 🟢 **Low** | 0.1-3.9 | **90 days** | Within 30d |

**Process**: Track via GitHub issues with `security`/`vulnerability`/severity labels. Auto-remediate critical vulns when patch available. Assign to CEO (`pethers`).

### Security Testing Pipeline (MUST)

All repositories MUST run these security gates in CI:

| Gate | Tool | Trigger |
|------|------|---------|
| **SAST** | CodeQL (`github/codeql-action`) | Push to main/develop, PRs, weekly |
| **SCA** | `npm audit` + Snyk | Push to main, PRs |
| **Secrets** | Gitleaks | Push, PRs |
| **License** | FOSSA | Push to main, PRs |
| **Security Gate** | Composite job | Blocks merge if any gate fails |

## 📜 Section 4: License Compliance Framework

**RULE**: Ensure comprehensive license compliance through automated tools and clear policies.

### License Categories

| Category | Licenses | Rationale |
|----------|----------|-----------|
| ✅ **Approved** | MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC, Unlicense, 0BSD | Permissive, compatible with Apache 2.0 |
| ⚠️ **Review Required** | LGPL-2.1/3.0, MPL-2.0, EPL-2.0, CDDL-1.0 | Copyleft considerations; dynamic linking may be acceptable |
| ❌ **Prohibited** | AGPL (all), GPL-2.0/3.0, SSPL, Elastic-2.0, BUSL-1.1 | Strong copyleft or not OSI-approved |

**Review Required workflow**: Create GitHub issue assigned to CEO (`pethers`) with labels `license-review`, `ceo-approval-required`. Block merge until approved.

### License Compliance Automation

- **MUST** run `license-checker --onlyAllow 'MIT;Apache-2.0;BSD-2-Clause;BSD-3-Clause;ISC;Unlicense' --production` in CI
- **MUST** run FOSSA analysis on push to main and PRs (`fossas/fossa-action@v1`)
- **SHOULD** run REUSE compliance check (`fsfe/reuse-action@v2`)

## 🏷️ Section 5: Classification & Documentation

**RULE**: Apply CIA Triad classification to all repositories per [CLASSIFICATION Framework](https://github.com/Hack23/ISMS-PUBLIC/blob/main/CLASSIFICATION.md).

### Classification Requirements (MUST)

Every README MUST include a Project Classification section with:

1. **Confidentiality Level** (Public/Internal/Confidential/Critical) with rationale and controls
2. **Integrity Level** (Public/Standard/High/Critical) with rationale and controls
3. **Availability Level** (Public/Standard/High/Critical) with rationale and controls
4. **Business Impact Assessment** table: Financial, Reputation, Legal, Operational (each Low/Moderate/High/Critical)
5. **Compliance Requirements** checklist: GDPR, ISO 27001:2022, NIST CSF 2.0, EU CRA

### Controls by Classification Level

| Level | Confidentiality Controls | Integrity Controls | Availability Controls |
|-------|-------------------------|-------------------|----------------------|
| **Public/Standard** | No secrets in code, secret scanning | Branch protection, status checks | Standard hosting |
| **High** | + Access controls, encryption | + Code review, signed commits, SLSA | + CDN, monitoring |
| **Critical** | + MFA, audit logging, DLP | + CEO approval, multiple reviewers | + Multi-region, auto-scaling, DR |

## 🚫 Section 6: Data Protection Requirements

> **See also**: [Data Protection Skill](data-protection.md) for comprehensive data protection guidance.

**RULE**: Never commit sensitive data to public repositories.

### Prohibited Data (MUST NOT)

- ❌ **Credentials**: Passwords, API keys, OAuth tokens, JWT secrets, database credentials, AWS keys
- ❌ **Personal Data**: Real names, emails, phone numbers, SSNs, government IDs
- ❌ **Financial Data**: Credit cards, bank accounts, payment credentials
- ❌ **Production Data**: Customer data, transaction records, database dumps
- ❌ **Cryptographic Keys**: Private keys, TLS certs, signing/encryption keys

### Prevention Controls

- **MUST** run Gitleaks pre-commit hook and in CI
- **MUST** use environment variables or secret management services (e.g., AWS Secrets Manager) for secrets
- **MUST** maintain `.gitignore` excluding `.env*`, `*.pem`, `*.key`, `secrets.json`
- **MUST** use example/template config files (committed) separate from real config (gitignored)
- If secrets are accidentally committed: use BFG Repo-Cleaner, rotate ALL exposed secrets immediately, notify security team

## 🤝 Section 7: Community Engagement

**RULE**: Foster healthy open source communities with clear contribution guidelines.

### Contribution Workflow (MUST)

CONTRIBUTING.md MUST define:
1. **Fork & Clone** → Create feature branch → Make changes → Run tests → Commit with DCO sign-off (`-s`) → Push & PR
2. **Code standards**: Follow Security by Design Skill, 80%+ coverage, all tests passing, ESLint/Prettier
3. **Security rules**: No secrets, no PII, no proprietary code; report vulns to security@hack23.com
4. **Code review process**: Automated CI → Security review → CEO approval for security-critical → Squash merge

### Developer Certificate of Origin (MUST)

All commits MUST include DCO sign-off via `git commit -s`. This certifies the contributor has the right to submit under the project's open source license.

### Security Vulnerability Disclosure (MUST)

SECURITY.md MUST include:
- Supported versions table
- Reporting instructions (email: security@hack23.com, PGP key)
- What to include: description, impact, reproduction steps, affected versions
- Response timeline: Initial response (24h), Assessment (72h), Fix (per SLA), Coordinated disclosure
- Remediation SLA table (Critical: 24h, High: 7d, Medium: 30d, Low: 90d)

### Code of Conduct Enforcement (SHOULD)

Enforcement process:
1. Acknowledge receipt within 24 hours
2. Review evidence objectively
3. Assess severity (minor → warning, moderate → warning + 7-day suspension, severe → ban)
4. Document decision
5. Notify reporter of outcome

## 🎯 Compliance Framework Mapping

| Framework | Controls | Implementation |
|-----------|----------|---------------|
| **ISO 27001:2022** | A.5.23, A.5.36, A.8.19, A.8.30-32 | SBOM, license compliance, dependency scanning, change management |
| **NIST CSF 2.0** | GV.SC-01/03, ID.AM-02, ID.RA-06, ID.SC-04, PR.DS-06, PR.IP-01 | Supply chain risk, inventory, vulnerability SLA, scorecard, SLSA |
| **CIS Controls v8.1** | 2.2/2.3/2.7, 7.1/7.5/7.6, 16.4/16.5 | Software inventory, vulnerability management, third-party components |
| **GDPR** | Art. 25, 32, 33 | No PII in code, secret scanning, incident response |
| **EU CRA** | Annex I Part I & II | Security by default, vulnerability scanning, coordinated disclosure |
| **OpenSSF** | Passing/Silver/Gold badges | Scorecard assessment |

## Enforcement Rules

### MUST (Critical - Block PR if violated)
1. All required security badges MUST be displayed in README
2. SECURITY.md MUST exist with vulnerability disclosure process
3. LICENSE file MUST be present and OSI-approved
4. No secrets or credentials MUST be in code (verified by secret scanning)
5. All dependencies MUST pass license compliance checks
6. SBOM MUST be generated for all releases
7. Vulnerability SLA MUST be followed (Critical: 24h, High: 7d, Medium: 30d, Low: 90d)

### SHOULD (High priority - Require justification if not followed)
1. OpenSSF Scorecard score SHOULD be ≥ 7.0
2. CII Best Practices SHOULD be at least "Passing" level
3. SLSA Level 3 provenance SHOULD be generated
4. SECURITY_ARCHITECTURE.md SHOULD document current security implementation
5. FUTURE_SECURITY_ARCHITECTURE.md SHOULD document planned improvements
6. CODE_OF_CONDUCT.md SHOULD be present
7. CONTRIBUTING.md SHOULD provide clear contribution guidelines

### MAY (Recommended - Best practice)
1. Achieve CII Best Practices "Silver" or "Gold" level
2. Implement bug bounty program for mature projects
3. Provide PGP encryption for vulnerability reports
4. Publish security advisories for fixed vulnerabilities
5. Maintain Hall of Fame for security researchers
6. Use multiple SBOM formats (CycloneDX + SPDX)

## Quick Decision Guide

**When creating a new repository:**
→ Start with repository template that includes all governance artifacts
→ Configure badge generation in CI/CD
→ Set up Dependabot and secret scanning
→ Add project classification to README

**When adding a dependency:**
→ Check license compatibility (FOSSA scan)
→ Review security posture (OpenSSF Scorecard if available)
→ Verify no known vulnerabilities (npm audit / Snyk)
→ Approve if green, escalate to CEO if license review required

**When a vulnerability is reported:**
→ Acknowledge within 24 hours
→ Assess severity (CVSS scoring)
→ Assign SLA deadline
→ Develop and test fix
→ Release patched version
→ Coordinate disclosure with researcher

**When enforcing Code of Conduct:**
→ Review evidence objectively
→ Assess severity (minor/moderate/severe)
→ Take proportional action (warning/suspension/ban)
→ Document decision
→ Notify all parties

## Remember

**Open source transparency creates competitive advantage through demonstrable security excellence.**

Every badge, every policy, every security control is public evidence of our cybersecurity consulting expertise. Our open source repositories are our most visible marketing material.

## Related Resources

### 📚 Hack23 ISMS Framework
- [🔓 Open Source Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Open_Source_Policy.md)
- [🛠️ Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md)
- [🔍 Vulnerability Management](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Vulnerability_Management.md)
- [🏷️ Data Classification Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Data_Classification_Policy.md)
- [🎯 CLASSIFICATION Framework](https://github.com/Hack23/ISMS-PUBLIC/blob/main/CLASSIFICATION.md)
- [🤝 Third Party Management](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Third_Party_Management.md)

### 🎯 Related Skills
- [Security by Design Skill](security-by-design.md)
- [Data Protection Skill](data-protection.md)
- [ISMS Compliance Skill](isms-compliance.md)
- [Threat Modeling Skill](threat-modeling.md)
- [Testing Excellence Skill](testing-excellence.md)

### 🌐 External Standards
- [OpenSSF Scorecard](https://github.com/ossf/scorecard) | [CII Best Practices](https://bestpractices.coreinfrastructure.org/) | [SLSA Framework](https://slsa.dev/)
- [FOSSA](https://fossa.com/) | [REUSE Software](https://reuse.software/) | [Sigstore](https://www.sigstore.dev/)
- [Gitleaks](https://github.com/gitleaks/gitleaks) | [Snyk](https://snyk.io/) | [Trivy](https://github.com/aquasecurity/trivy)
- [Choose a License](https://choosealicense.com/) | [OSI Approved Licenses](https://opensource.org/licenses)
- [EU Cyber Resilience Act](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act)

---

**Made with ❤️ for transparent security excellence** | [Hack23 AB](https://www.hack23.com) | Open Source by Design
