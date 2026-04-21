<p align="center">
  <img src="https://hack23.com/icon-192.png" alt="Hack23 Logo" width="192" height="192">
</p>

<h1 align="center">💰 CIA Compliance Manager — Financial & Security Plan</h1>

<p align="center">
  <strong>📊 Infrastructure Cost Analysis & Security Investment</strong><br>
  <em>🔗 <a href="https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md">Secure Development Policy</a> · <a href="https://github.com/Hack23/ISMS-PUBLIC/blob/main/CLASSIFICATION.md">Classification Framework</a></em>
</p>

<p align="center">
  <a><img src="https://img.shields.io/badge/Owner-CEO-0A66C2?style=for-the-badge" alt="Owner"/></a>
  <a><img src="https://img.shields.io/badge/Version-1.1-555?style=for-the-badge" alt="Version"/></a>
  <a><img src="https://img.shields.io/badge/Updated-2026--04--21-success?style=for-the-badge" alt="Updated"/></a>
  <a><img src="https://img.shields.io/badge/Status-%E2%9C%85_Production-success?style=for-the-badge" alt="Status"/></a>
</p>

**📋 Document Owner:** CEO | **📄 Version:** 1.1 | **📅 Last Updated:** 2026-04-21 (UTC)  
**🔄 Review Cycle:** Semi-Annual | **⏰ Next Review:** 2026-10-21

---

## 📋 Purpose

This document outlines the financial and security implementation plan for the CIA Compliance Manager platform. For architectural context, see the [Architecture Documentation](./architecture/ARCHITECTURE.md) and [End-of-Life Strategy](./End-of-Life-Strategy.md).

---

## 💵 v1.1.54 Cost Summary — AWS + GitHub Pages DR + npm Distribution

The current v1.1.54 delivery is a **static React 19 SPA** distributed across **three channels**:

1. **Primary**: AWS CloudFront + S3 (production at `ciacompliancemanager.com`), deployed by `.github/workflows/deploy-s3.yml` using IAM OIDC and CloudFormation stack `ciacompliancemanager-frontend`
2. **DR**: GitHub Pages (fallback hosting, deployed by `release.yml`)
3. **Library**: npm registry (`cia-compliance-manager` package), published by the `publish-npm` job with `provenance: true`

### Cash Flow Overview

| **Time Frame** | **Monthly (USD)** | **Annual (USD)** |
|----------------|-------------------|------------------|
| **AWS Infrastructure** (CloudFront + S3 + Route53) | **~$2–5** | **~$24–60** |
| **Domain Registration** | **$1** | **$12** |
| **Security Tooling** | **$0** | **$0** (free OSS tiers) |
| **Development CI/CD** | **$0** | **$0** (GitHub Actions public repo) |
| **npm Publishing** | **$0** | **$0** (public package) |
| **Grand Total (typical)** | **~$3–6** | **~$36–72** |

> **Note:** Actual AWS costs scale with traffic; the static SPA incurs minimal S3 storage and CloudFront egress charges. Dev-tier free quotas cover typical usage. Figures assume small-to-moderate traffic; [AWS CloudFront free tier](https://aws.amazon.com/cloudfront/pricing/) further reduces cost for the first 1 TB/month.

---

### 🏗️ Infrastructure Cost Breakdown (v1.1.54)

| **Component** | **Service** | **Monthly (USD)** | **Annual (USD)** | **Notes** |
|---------------|-------------|-------------------|------------------|-----------|
| **Primary Hosting** | AWS S3 (`ciacompliancemanager-frontend-us-east-1-…`) | $0.50–1.00 | $6–12 | Static assets, versioned, encrypted at rest |
| **Primary CDN** | AWS CloudFront | $1.00–3.00 | $12–36 | Global edge caching, HTTPS, security headers |
| **DNS** | AWS Route 53 | $0.50 | $6 | Hosted zone + DNS queries |
| **Domain** | Registrar (`ciacompliancemanager.com`) | $1.00 | $12 | Annual registration averaged |
| **IaC** | AWS CloudFormation | $0.00 | $0.00 | Included; stack `ciacompliancemanager-frontend` |
| **IAM OIDC** | AWS IAM (`GithubWorkFlowRole`) | $0.00 | $0.00 | No long-lived credentials |
| **DR Hosting** | GitHub Pages | $0.00 | $0.00 | Free for public repos (DR channel) |
| **Library Distribution** | npm Registry | $0.00 | $0.00 | Free public package |
| **CI/CD** | GitHub Actions | $0.00 | $0.00 | Free for public repos |
| **Code Scanning** | GitHub Advanced Security (CodeQL) | $0.00 | $0.00 | Free for public repos |
| **Dependency Scanning** | Dependabot | $0.00 | $0.00 | Free for all repos |
| **SAST** | SonarCloud | $0.00 | $0.00 | Free for open source |
| **SBOM + Attestation** | GitHub SBOM + SLSA Level 3 | $0.00 | $0.00 | Free for public repos |
| **DAST** | OWASP ZAP (GitHub Action) | $0.00 | $0.00 | Free OSS scanner |
| **Performance Audit** | Google Lighthouse CI | $0.00 | $0.00 | Free OSS |
| **Supply Chain Score** | OpenSSF Scorecard | $0.00 | $0.00 | Free assessment |
| **Total** | | **~$3–6** | **~$36–72** | |

---

## 🔐 Security Investment Analysis

### Current Security Services (v1.1.54 — All Free Tier)

| **Security Service** | **Provider** | **Annual Cost** | **ISMS Policy Alignment** |
|----------------------|-------------|-----------------|---------------------------|
| **SAST Scanning** | SonarCloud + CodeQL | $0.00 | [Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md) |
| **Dependency Scanning** | Dependabot + npm audit | $0.00 | [Vulnerability Management](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Vulnerability_Management.md) |
| **Secret Scanning** | GitHub Secret Scanning + push protection | $0.00 | [Cryptography Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Cryptography_Policy.md) |
| **DAST** | OWASP ZAP (manual dispatch) | $0.00 | [Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md) |
| **Supply Chain** | SLSA Level 3 attestation + OpenSSF Scorecard | $0.00 | [Open Source Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Open_Source_Policy.md) |
| **CI Runner Hardening** | step-security/harden-runner | $0.00 | [Network Security Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Network_Security_Policy.md) |
| **License Compliance** | FOSSA | $0.00 | [Open Source Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Open_Source_Policy.md) |
| **E2E Testing** | Cypress 15.14.0 (OSS) | $0.00 | [Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md) |
| **Unit/Component Testing** | Vitest 4.1.4 (OSS) | $0.00 | [Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md) |
| **Dead-code Detection** | Knip 6.5.0 (OSS) | $0.00 | [Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md) |
| **Package Provenance** | npm `--provenance` (Sigstore) | $0.00 | [Open Source Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Open_Source_Policy.md) |
| **Total Security** | | **$0.00** | |

### Security ROI Metrics

| **Metric** | **Value** | **Source** |
|------------|-----------|-----------|
| **Total Security Investment** | $0/year (tooling) + ~$36–72/year (AWS infra) | Free OSS tooling + minimal AWS hosting |
| **Vulnerability Detection Rate** | >95% | Automated CodeQL + Dependabot + SonarCloud + ZAP |
| **Mean Time to Detect (MTTD)** | <24 hours | Automated CI/CD scanning on every PR + weekly schedule |
| **Line Coverage** | ≥80% (enforced) | Vitest thresholds in `vite.config.ts` |
| **Supply Chain Score** | Live (see OpenSSF Scorecard badge) | `scorecards.yml` |
| **SLSA Build Level** | Level 3 | `release.yml` attestations |

---

## 💰 Future Cost Projection — v2.0 AWS Serverless

The planned evolution to a full-stack AWS serverless platform will introduce infrastructure costs. See [Future Architecture](./architecture/FUTURE_ARCHITECTURE.md) for details.

### Projected Monthly Costs (v2.0)

| **Component** | **AWS Service** | **Monthly (USD)** | **Annual (USD)** |
|---------------|-----------------|-------------------|------------------|
| **Compute** | Lambda | $5.00 | $60.00 |
| **API** | API Gateway | $3.50 | $42.00 |
| **Database** | DynamoDB (on-demand) | $10.00 | $120.00 |
| **Authentication** | Cognito | $0.00 | $0.00 |
| **Storage** | S3 | $1.00 | $12.00 |
| **CDN** | CloudFront | $5.00 | $60.00 |
| **DNS** | Route 53 | $0.50 | $6.00 |
| **Security - WAF** | AWS WAF | $10.00 | $120.00 |
| **Security - GuardDuty** | GuardDuty | $15.00 | $180.00 |
| **Security - Security Hub** | Security Hub | $10.00 | $120.00 |
| **Security - Inspector** | Inspector | $5.00 | $60.00 |
| **Monitoring** | CloudWatch | $5.00 | $60.00 |
| **Encryption** | KMS | $3.00 | $36.00 |
| **Audit** | CloudTrail | $2.00 | $24.00 |
| **Total** | | **$75.00** | **$900.00** |

### Future Security Investment by ISMS Policy

| 🛡️ ISMS Policy | 💰 Annual Investment | 🔧 AWS Services | 📊 Business Value |
|----------------|---------------------|------------------|-------------------|
| [**Incident Response Plan**](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Incident_Response_Plan.md) | $300.00 | GuardDuty, Security Hub | Real-time threat detection |
| [**Vulnerability Management**](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Vulnerability_Management.md) | $60.00 | Inspector | Continuous vulnerability scanning |
| [**Cryptography Policy**](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Cryptography_Policy.md) | $36.00 | KMS | Encryption key management |
| [**Network Security Policy**](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Network_Security_Policy.md) | $120.00 | WAF | Application-layer protection |
| [**Information Security Policy**](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Information_Security_Policy.md) | $84.00 | CloudTrail, CloudWatch | Audit logging and monitoring |
| **Total Security Investment** | **$600.00** | | |

---

## 📋 Related Documents

| Icon | Document | Relationship |
|------|----------|--------------|
| 🏗️ | [Architecture](./architecture/ARCHITECTURE.md) | System architecture overview |
| 🛡️ | [Security Architecture](./architecture/SECURITY_ARCHITECTURE.md) | Security model details |
| 🎯 | [Threat Model](./architecture/THREAT_MODEL.md) | Risk-driven security justification |
| 🔮 | [Future Architecture](./architecture/FUTURE_ARCHITECTURE.md) | v2.0 evolution roadmap |
| 🔚 | [End-of-Life Strategy](./End-of-Life-Strategy.md) | Technology lifecycle management |
| 📋 | [BCPPlan](./architecture/BCPPlan.md) | Business continuity planning |
| 📖 | [README](../README.md) | Project overview |

---

<div align="center">

## 📋 Document Control

**Approved by:** James Pether Sörling, CEO, Hack23 AB
**Distribution:** Public (GitHub Repository)
**Classification:** [![Confidentiality: Public](https://img.shields.io/badge/C-Public-lightgrey?style=flat-square)](https://github.com/Hack23/ISMS-PUBLIC/blob/main/CLASSIFICATION.md#confidentiality-levels)

---

### 🏆 Framework Alignment

[![ISO 27001:2022](https://img.shields.io/badge/ISO_27001-2022-blue?style=flat-square)](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Compliance_Checklist.md)
[![NIST CSF 2.0](https://img.shields.io/badge/NIST_CSF-2.0-purple?style=flat-square)](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Compliance_Checklist.md)
[![CIS Controls v8.1](https://img.shields.io/badge/CIS_Controls-v8.1-orange?style=flat-square)](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Compliance_Checklist.md)

</div>
