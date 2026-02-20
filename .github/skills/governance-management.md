# 🏛️ Governance & Management Skill

> **Strategic Principle**: Effective information security governance ensures organizational accountability, risk-informed decision-making, and continuous compliance through structured asset management, supplier oversight, stakeholder engagement, and policy lifecycle management.

---

## 📚 Core References

| Resource | Link | Purpose |
|----------|------|---------|
| ISMS Third Party Management | [Hack23/ISMS-PUBLIC - Third Party](https://github.com/Hack23/ISMS-PUBLIC) | Supplier and vendor security governance |
| ISMS Asset Management | [Hack23/ISMS-PUBLIC - Assets](https://github.com/Hack23/ISMS-PUBLIC) | IT asset inventory and classification |
| ISO 27001:2022 | [iso.org/standard/27001](https://www.iso.org/standard/27001) | ISMS requirements (Annex A controls) |
| NIST CSF 2.0 | [nist.gov/cyberframework](https://www.nist.gov/cyberframework) | Govern, Identify, Protect functions |
| CIS Controls v8 | [cisecurity.org/controls](https://www.cisecurity.org/controls) | Inventory and control safeguards |

---

## 1️⃣ Asset Management

### IT Asset Inventory

**MUST Rules**:
- Maintain a complete inventory of all IT assets (hardware, software, data, services)
- Assign an owner to every asset with documented accountability
- Track asset lifecycle states: `Planned → Provisioned → Active → Deprecated → Decommissioned`
- Record asset metadata: name, type, owner, classification, location, dependencies
- Review the full asset inventory at least quarterly

**SHOULD Rules**:
- Automate asset discovery and reconciliation where possible
- Link assets to business processes and risk assessments
- Track software dependencies using SBOM (Software Bill of Materials)
- Monitor asset health and patch status continuously

### Asset Classification

All assets MUST be classified using a tiered scheme:

| Classification | Description | Examples | Controls Required |
|---------------|-------------|----------|-------------------|
| **Critical** | Business-essential, high impact if compromised | Production databases, auth services | Full encryption, MFA, 24/7 monitoring, DR plan |
| **High** | Important operations, significant impact | CI/CD pipelines, internal APIs | Encryption, access control, regular backups |
| **Medium** | Standard business use, moderate impact | Development tools, documentation | Standard access control, periodic review |
| **Low** | Minimal impact if unavailable | Public docs, sandbox environments | Basic access control |

### Criticality Assessment Criteria

Evaluate each asset against these dimensions:

1. **Confidentiality Impact**: What data does it process or store? (PII, credentials, financial)
2. **Integrity Impact**: What happens if data is modified without authorization?
3. **Availability Impact**: What is the business cost of downtime? (revenue, reputation, safety)
4. **Dependency Factor**: How many other assets or services depend on it?
5. **Regulatory Exposure**: Is the asset subject to compliance requirements?

### Dependency Tracking

**MUST Rules**:
- Map upstream and downstream dependencies for all Critical and High assets
- Document third-party service dependencies with SLA references
- Track open-source dependency vulnerabilities (Dependabot, Snyk, or equivalent)
- Maintain SBOM for all production software artifacts

**SHOULD Rules**:
- Visualize dependency graphs for critical service chains
- Alert on newly discovered vulnerabilities in dependency trees
- Pin dependency versions in production; avoid floating ranges

---

## 2️⃣ Supplier & Vendor Management

### Vendor Security Assessment

**MUST Rules**:
- Assess all vendors handling organizational data before onboarding
- Require vendors to demonstrate security controls proportional to data sensitivity
- Maintain a vendor risk register with current assessment status
- Re-assess vendor security posture annually (or upon material change)
- Include right-to-audit clauses in all contracts involving sensitive data

### Due Diligence Checklist

Before onboarding any vendor, verify:

| Area | Requirement | Evidence |
|------|-------------|----------|
| **Security Certifications** | ISO 27001, SOC 2, or equivalent | Certificate copy, audit report |
| **Data Processing** | GDPR/privacy compliance if handling PII | DPA signed, privacy policy review |
| **Incident Response** | Documented IR plan with notification SLA | IR plan document, SLA clause |
| **Business Continuity** | DR/BCP plan with tested RTO/RPO | BCP document, test results |
| **Access Control** | Least-privilege access, MFA enforcement | Security architecture doc |
| **Subprocessor Management** | Disclosed subprocessors, flow-down controls | Subprocessor list, contracts |

### SLA Monitoring

**MUST Rules**:
- Define measurable SLAs for all Critical and High vendor services
- Monitor SLA compliance continuously with automated alerting
- Document SLA breaches with root cause and remediation actions
- Escalate repeated SLA failures through defined governance channels

**SLA Breach Handling Process**:

```
1. Detection    → Automated alert or manual report
2. Triage       → Assess impact on business operations (within 4 hours)
3. Notification → Formal notice to vendor per contract terms
4. Remediation  → Vendor provides corrective action plan (within 5 business days)
5. Verification → Confirm remediation effectiveness
6. Documentation→ Record in vendor risk register, update risk score
7. Escalation   → If unresolved, escalate to contract review or vendor replacement
```

### Supply Chain Risk

**MUST Rules**:
- Assess supply chain risk for all software dependencies
- Monitor for compromised packages and typosquatting attacks
- Verify package integrity using checksums and signatures
- Restrict installation sources to approved registries

**SHOULD Rules**:
- Implement dependency firewall or proxy for package management
- Conduct periodic supply chain threat assessments
- Require vendors to provide SBOM for delivered software
- Evaluate vendor concentration risk (single points of failure)

---

## 3️⃣ Stakeholder Registry

### External Stakeholder Engagement

**MUST Rules**:
- Maintain a registry of all external stakeholders relevant to information security
- Classify stakeholders by type: Regulators, Customers, Partners, Auditors, Insurers
- Document communication requirements and frequencies per stakeholder
- Assign an internal owner for each stakeholder relationship

### Stakeholder Registry Template

| Stakeholder | Type | Interest/Concern | Communication Frequency | Owner | Last Contact |
|-------------|------|-------------------|------------------------|-------|--------------|
| Data Protection Authority | Regulator | GDPR compliance, breach notification | As required + annual | DPO | YYYY-MM-DD |
| External Auditor | Auditor | ISO 27001 certification | Quarterly + annual audit | CISO | YYYY-MM-DD |
| Key Customer (Enterprise) | Customer | Data security, SLA compliance | Monthly review | Account Mgr | YYYY-MM-DD |
| Cloud Provider | Partner | Infrastructure security, availability | Quarterly review | CTO | YYYY-MM-DD |

### Regulatory Relationships

**MUST Rules**:
- Know all applicable regulatory bodies and their requirements
- Maintain current contact details for regulatory notification
- Document regulatory reporting obligations with deadlines
- Test breach notification procedures at least annually

**SHOULD Rules**:
- Engage proactively with regulators on emerging requirements
- Participate in industry working groups and information-sharing forums
- Track regulatory changes and assess impact within 30 days

---

## 4️⃣ Policy Governance

### Policy Lifecycle Management

**MUST Rules**:
- Review all security policies at least annually
- Obtain management approval for new and revised policies
- Communicate policy changes to all affected personnel
- Maintain version history with change rationale
- Archive superseded policies for the retention period

### Policy Review Cycle

```
Month 1-2:   Draft/Revise  → Policy owner updates content
Month 3:     Review         → Peer review and stakeholder input
Month 4:     Approve        → Management sign-off
Month 5:     Communicate    → Training, awareness, distribution
Month 6-12:  Monitor        → Compliance monitoring and exception tracking
Month 12:    Evaluate       → Effectiveness review, start next cycle
```

### Exception Management

**MUST Rules**:
- Document all policy exceptions with business justification
- Require risk owner approval for every exception
- Set a maximum exception duration (default: 90 days, renewable once)
- Implement compensating controls for approved exceptions
- Track exceptions in a central register with expiry alerts

**Exception Request Template**:
- **Policy**: Which policy/control is being excepted
- **Justification**: Business reason the exception is needed
- **Risk Assessment**: Impact if the exception is exploited
- **Compensating Controls**: Alternative measures in place
- **Duration**: Start and end date
- **Approval**: Risk owner sign-off

---

## 5️⃣ Compliance Framework Management

### Framework Mapping

Map organizational controls to all applicable frameworks:

| Control Area | ISO 27001:2022 | NIST CSF 2.0 | CIS Controls v8 | GDPR | NIS2 | EU CRA |
|-------------|----------------|--------------|-----------------|------|------|--------|
| Asset Inventory | A.5.9 | ID.AM-1, ID.AM-2 | CIS 1, CIS 2 | Art. 30 | Art. 21(2)(a) | Art. 10 |
| Access Control | A.5.15-5.18, A.8.2-8.5 | PR.AA | CIS 5, CIS 6 | Art. 32 | Art. 21(2)(d) | Art. 10(1) |
| Supplier Security | A.5.19-5.23 | GV.SC | CIS 15 | Art. 28 | Art. 21(2)(e) | Art. 13 |
| Incident Response | A.5.24-5.28 | RS, RC | CIS 17 | Art. 33-34 | Art. 23 | Art. 14 |
| Risk Management | A.5.1-5.4 | GV.RM | — | Art. 35 | Art. 21(1) | Art. 10(8) |
| Vulnerability Mgmt | A.8.8 | ID.RA | CIS 7 | Art. 32 | Art. 21(2)(b) | Art. 10(6) |
| Data Protection | A.5.33-5.34, A.8.10-8.12 | PR.DS | CIS 3 | Art. 5, 25, 32 | Art. 21(2)(d) | — |

### Compliance Monitoring

**MUST Rules**:
- Track compliance status for each applicable framework
- Identify and document control gaps with remediation timelines
- Report compliance posture to management at least quarterly
- Maintain evidence of compliance for audit readiness

**SHOULD Rules**:
- Automate compliance evidence collection where possible
- Use a GRC tool or structured tracking system
- Conduct internal compliance assessments semi-annually
- Benchmark against industry peers

---

## 6️⃣ Audit & Evidence Collection

### Audit Trail Requirements

**MUST Rules**:
- Log all security-relevant events with timestamp, actor, action, and outcome
- Protect audit logs from tampering (append-only, integrity verification)
- Retain audit logs per regulatory requirements (minimum 12 months accessible)
- Review audit logs regularly for anomalies (weekly for Critical systems)

### Evidence Collection Standards

Maintain auditable evidence for every control:

| Evidence Type | Examples | Retention | Format |
|--------------|----------|-----------|--------|
| **Policy Documents** | Security policies, procedures | Current + 2 prior versions | PDF, versioned markdown |
| **Access Reviews** | Quarterly access review reports | 3 years | Signed reports |
| **Risk Assessments** | Annual risk assessment, vendor assessments | 3 years | Structured documents |
| **Training Records** | Security awareness completion | 3 years | LMS export, certificates |
| **Incident Reports** | Post-incident reviews, RCAs | 5 years | Incident management tool |
| **Configuration Baselines** | System hardening evidence | Current + 1 prior | Automated scan reports |
| **Change Records** | Change approvals, deployment logs | 3 years | Change management tool, Git |
| **Vulnerability Scans** | Scan results, remediation evidence | 2 years | Scanner reports |

### Evidence-Based Compliance

**MUST Rules**:
- Map each compliance requirement to specific evidence artifacts
- Ensure evidence is current (refreshed within the assessment period)
- Store evidence in a centralized, access-controlled repository
- Verify evidence completeness before external audits

**SHOULD Rules**:
- Automate evidence generation from operational tools (CI/CD, SIEM, IAM)
- Cross-reference evidence across frameworks to reduce duplication
- Conduct mock audits to validate evidence readiness
- Maintain an evidence calendar with collection deadlines

---

## 🧭 Quick Decision Guide

### "How do I classify this asset?"

```
Is it production infrastructure or data?
  YES → Does it handle PII, credentials, or financial data?
    YES → CRITICAL
    NO  → Does significant business impact occur if it fails?
      YES → HIGH
      NO  → MEDIUM
  NO  → LOW
```

### "Do I need a vendor security assessment?"

```
Does the vendor access, process, or store our data?
  YES → Full security assessment required (MUST)
Does the vendor provide infrastructure we depend on?
  YES → SLA-focused assessment required (MUST)
Is the vendor a software dependency?
  YES → Supply chain risk assessment required (MUST)
None of the above?
  → Basic vendor registration only (MAY)
```

### "Is a policy exception acceptable?"

```
Does the exception create Critical or High risk?
  YES → Requires CISO + risk owner approval, 30-day max, compensating controls MUST exist
Does the exception affect compliance obligations?
  YES → Requires compliance officer review, document regulatory impact
Is it time-bounded with a remediation plan?
  YES → Standard exception process (90-day max)
  NO  → REJECT — exceptions must be temporary
```

### "What evidence do I need for this audit?"

```
1. Identify the controls in scope for the audit
2. Map controls to the framework mapping table (Section 5)
3. For each control, collect evidence per the evidence standards (Section 6)
4. Verify evidence is current and complete
5. Prepare summary documentation linking evidence to requirements
```

---

## 🔗 Related Resources

| Resource | Path / Link | Description |
|----------|-------------|-------------|
| Security by Design | `.github/skills/security-by-design.md` | Secure development lifecycle |
| ISMS Compliance | `.github/skills/isms-compliance.md` | ISMS implementation guidance |
| Code Quality Excellence | `.github/skills/code-quality-excellence.md` | Code standards and reuse |
| Testing Excellence | `.github/skills/testing-excellence.md` | Quality assurance practices |
| ISMS Implementation Guide | `ISMS_IMPLEMENTATION_GUIDE.md` | Full ISMS deployment guide |
| Security Policy | `SECURITY.md` | Vulnerability reporting and policy |
| Traceability Matrix | `TRACEABILITY_MATRIX.md` | Requirement-to-control mapping |
| ISMS Public Repository | [Hack23/ISMS-PUBLIC](https://github.com/Hack23/ISMS-PUBLIC) | Public ISMS templates and guidance |

---

*This skill consolidates governance patterns from asset management, supplier management, stakeholder registry, and policy governance into a unified framework aligned with ISO 27001:2022, NIST CSF 2.0, CIS Controls v8, GDPR, NIS2, and EU CRA requirements.*
