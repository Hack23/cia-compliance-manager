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
  <a><img src="https://img.shields.io/badge/Version-1.0-555?style=for-the-badge" alt="Version"/></a>
  <a><img src="https://img.shields.io/badge/Status-%E2%9C%85_Production-success?style=for-the-badge" alt="Status"/></a>
</p>

---

## 📋 Purpose

This document outlines the financial and security implementation plan for the CIA Compliance Manager platform. For architectural context, see the [Architecture Documentation](./architecture/ARCHITECTURE.md) and [End-of-Life Strategy](./End-of-Life-Strategy.md).

---

## 💵 v1.0 Cost Summary — Static Frontend Deployment

The current v1.0 architecture is a **static React SPA** deployed on **GitHub Pages**, resulting in minimal infrastructure costs.

### Cash Flow Overview

| **Time Frame** | **Monthly (USD)** | **Annual (USD)** |
|----------------|-------------------|------------------|
| **Total Infrastructure** | **$1.00** | **$12.00** |
| **Security Tooling** | **$0.00** | **$0.00** |
| **Development CI/CD** | **$0.00** | **$0.00** |
| **Grand Total** | **$1.00** | **$12.00** |

> **Note:** CIA Compliance Manager v1.0 leverages free-tier services for open source projects, with the only recurring infrastructure cost being low-cost domain registration (approximately $1/month, $12/year).

---

### 🏗️ Infrastructure Cost Breakdown (v1.0)

| **Component** | **Service** | **Monthly (USD)** | **Annual (USD)** | **Notes** |
|---------------|-------------|-------------------|------------------|-----------|
| **Hosting** | GitHub Pages | $0.00 | $0.00 | Free for public repos |
| **CDN** | GitHub Pages CDN | $0.00 | $0.00 | Included with GitHub Pages |
| **SSL/TLS** | Let's Encrypt (via GitHub) | $0.00 | $0.00 | Automatic HTTPS |
| **DNS** | Custom domain | $1.00 | $12.00 | Annual domain renewal (~$1/mo averaged) |
| **CI/CD** | GitHub Actions | $0.00 | $0.00 | Free for public repos |
| **Code Scanning** | GitHub Advanced Security | $0.00 | $0.00 | Free for public repos |
| **Dependency Scanning** | Dependabot | $0.00 | $0.00 | Free for all repos |
| **SAST** | SonarCloud | $0.00 | $0.00 | Free for open source |
| **SBOM** | GitHub SBOM + SLSA | $0.00 | $0.00 | Free for public repos |
| **Total** | | **$1.00** | **$12.00** | |

---

## 🔐 Security Investment Analysis

### Current Security Services (v1.0 — All Free Tier)

| **Security Service** | **Provider** | **Annual Cost** | **ISMS Policy Alignment** |
|----------------------|-------------|-----------------|---------------------------|
| **SAST Scanning** | SonarCloud | $0.00 | [Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md) |
| **Dependency Scanning** | Dependabot + npm audit | $0.00 | [Vulnerability Management](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Vulnerability_Management.md) |
| **Secret Scanning** | GitHub Secret Scanning | $0.00 | [Cryptography Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Cryptography_Policy.md) |
| **Code Scanning** | CodeQL | $0.00 | [Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md) |
| **Supply Chain** | SLSA Level 3 + Scorecard | $0.00 | [Open Source Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Open_Source_Policy.md) |
| **License Compliance** | FOSSA | $0.00 | [Open Source Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Open_Source_Policy.md) |
| **E2E Testing** | Cypress (OSS) | $0.00 | [Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md) |
| **Total Security** | | **$0.00** | |

### Security ROI Metrics

| **Metric** | **Value** | **Source** |
|------------|-----------|-----------|
| **Total Security Investment** | $0/year | Free OSS tooling |
| **Vulnerability Detection Rate** | >95% | Automated scanning pipeline |
| **Mean Time to Detect (MTTD)** | <24 hours | Automated CI/CD scanning |
| **Code Coverage** | >80% | Vitest + Cypress |
| **Supply Chain Score** | OpenSSF Scorecard | Automated assessment |

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
