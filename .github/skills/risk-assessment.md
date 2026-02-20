# 📊 Risk Assessment Skill

> **Strategic Principle**: Systematically identify, analyze, evaluate, and treat information security risks to protect organizational assets and ensure informed decision-making aligned with business objectives and risk appetite.

---

## 📚 Core References

| Document | Location | Purpose |
|----------|----------|---------|
| [Risk Assessment Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/policies/risk-assessment-policy.md) | ISMS-PUBLIC | Organizational risk assessment framework |
| [Risk Register](https://github.com/Hack23/ISMS-PUBLIC/blob/main/risk/risk-register.md) | ISMS-PUBLIC | Active risk tracking and treatment |
| [Risk Treatment Plan](https://github.com/Hack23/ISMS-PUBLIC/blob/main/risk/risk-treatment-plan.md) | ISMS-PUBLIC | Risk mitigation strategies |
| [SECURITY.md](../../SECURITY.md) | This repo | Security policy and vulnerability handling |

---

## 🔬 Risk Assessment Methodology

### Overview

Risk assessment follows a structured lifecycle:

1. **Context Establishment** — Define scope, boundaries, and risk criteria
2. **Risk Identification** — Identify threats, vulnerabilities, and assets
3. **Risk Analysis** — Determine likelihood and impact using the 5×5 matrix
4. **Risk Evaluation** — Compare against risk appetite and tolerance
5. **Risk Treatment** — Select and implement appropriate controls
6. **Monitoring & Review** — Continuously track and reassess risks

### 5×5 Risk Matrix

Use this matrix to calculate risk scores by combining **Likelihood** and **Impact**:

| Likelihood ↓ / Impact → | Negligible (1) | Minor (2) | Moderate (3) | Major (4) | Critical (5) |
|--------------------------|:-:|:-:|:-:|:-:|:-:|
| **Almost Certain (5)**   | 5 | 10 | 15 | 20 | **25** |
| **Likely (4)**           | 4 | 8 | 12 | 16 | **20** |
| **Possible (3)**         | 3 | 6 | 9 | 12 | **15** |
| **Unlikely (2)**         | 2 | 4 | 6 | 8 | **10** |
| **Rare (1)**             | 1 | 2 | 3 | 4 | **5** |

**Risk Score = Likelihood × Impact**

### Risk Rating Thresholds

| Score Range | Rating | Color | Action Required |
|-------------|--------|-------|-----------------|
| 20–25 | **Critical** | 🔴 Red | Immediate escalation; treatment within 24 hours |
| 15–19 | **High** | 🟠 Orange | Senior management attention; treatment within 7 days |
| 8–14 | **Medium** | 🟡 Yellow | Management review; treatment within 30 days |
| 4–7 | **Low** | 🔵 Blue | Monitor and review; treatment within 90 days |
| 1–3 | **Very Low** | 🟢 Green | Accept and monitor during regular review cycles |

### Likelihood Criteria

| Level | Score | Description | Frequency |
|-------|:-----:|-------------|-----------|
| Almost Certain | 5 | Expected to occur in most circumstances | Multiple times per year |
| Likely | 4 | Will probably occur in most circumstances | Once per year |
| Possible | 3 | Might occur at some time | Once every 1–3 years |
| Unlikely | 2 | Could occur but not expected | Once every 3–10 years |
| Rare | 1 | May occur only in exceptional circumstances | Less than once per 10 years |

### Impact Criteria

| Level | Score | Confidentiality | Integrity | Availability | Financial |
|-------|:-----:|-----------------|-----------|--------------|-----------|
| Critical | 5 | Mass data breach; regulatory action | Systemic corruption; unrecoverable | >72h outage; complete loss | >€1M loss |
| Major | 4 | Significant data exposure | Major data corruption | 24–72h outage | €100K–€1M |
| Moderate | 3 | Limited sensitive data leak | Partial data corruption; recoverable | 4–24h outage | €10K–€100K |
| Minor | 2 | Internal data exposure | Minor errors; easily corrected | 1–4h outage | €1K–€10K |
| Negligible | 1 | No sensitive data affected | No meaningful impact | <1h outage | <€1K |

---

## 📋 Risk Register Maintenance

### MUST Rules

- ✅ **MUST** maintain a centralized risk register with unique identifiers
- ✅ **MUST** assign a risk owner to every identified risk
- ✅ **MUST** record inherent risk (before controls) and residual risk (after controls)
- ✅ **MUST** review and update the risk register at least quarterly
- ✅ **MUST** reassess risks after significant changes (new systems, incidents, org changes)
- ✅ **MUST** document risk treatment decisions with justification

### SHOULD Rules

- ✅ **SHOULD** use consistent risk taxonomy across the organization
- ✅ **SHOULD** link risks to affected assets, controls, and compliance requirements
- ✅ **SHOULD** track risk trends over time for pattern analysis
- ✅ **SHOULD** automate risk register updates where feasible

### Risk Register Entry Template

Each risk entry MUST include:

```
Risk ID:           RISK-[YYYY]-[NNN]
Title:             [Brief descriptive title]
Category:          [Confidentiality | Integrity | Availability | Operational | Compliance]
Description:       [Detailed risk description including threat, vulnerability, and asset]
Risk Owner:        [Named individual accountable for the risk]
Likelihood:        [1-5]
Impact:            [1-5]
Inherent Score:    [Likelihood × Impact]
Existing Controls: [Current mitigations in place]
Residual Score:    [Score after existing controls]
Treatment:         [Accept | Mitigate | Transfer | Avoid]
Treatment Plan:    [Specific actions, timeline, and resources]
Status:            [Open | In Treatment | Accepted | Closed]
Review Date:       [Next scheduled review]
```

---

## 🛡️ Risk Treatment Options

### Decision Framework

| Option | When to Use | Example | Residual Risk |
|--------|-------------|---------|---------------|
| **Avoid** | Risk exceeds appetite; activity not essential | Discontinue legacy system with known vulnerabilities | Eliminated |
| **Mitigate** | Risk can be reduced to acceptable level cost-effectively | Implement MFA, encryption, access controls | Reduced |
| **Transfer** | Risk better managed by third party | Cyber insurance, outsource to specialist provider | Shared |
| **Accept** | Risk within appetite; treatment cost exceeds benefit | Low-impact risk with existing monitoring | Unchanged |

### Treatment Selection Rules

- ✅ **MUST** document rationale for accepting any risk rated Medium or above
- ✅ **MUST** obtain senior management approval for accepting High or Critical risks
- ✅ **MUST** implement compensating controls when primary controls are not feasible
- ✅ **MUST** verify treatment effectiveness through testing or audit
- ✅ **SHOULD** prefer mitigation over acceptance for risks affecting CIA triad
- ✅ **SHOULD** consider cost-benefit analysis for all treatment options

### Risk Appetite and Tolerance

| Category | Risk Appetite | Tolerance Threshold | Escalation |
|----------|--------------|--------------------:|------------|
| Security (Confidentiality) | Low | Residual score ≤ 8 | CISO if exceeded |
| Data Integrity | Low | Residual score ≤ 8 | CTO if exceeded |
| Availability | Moderate | Residual score ≤ 12 | Operations lead if exceeded |
| Compliance | Very Low | Residual score ≤ 4 | Legal/DPO if exceeded |
| Operational | Moderate | Residual score ≤ 12 | Department head if exceeded |

---

## ⏱️ Vulnerability Management SLAs

Vulnerability remediation timelines are driven by severity and align with the risk matrix:

| Severity | CVSS Score | Remediation SLA | Verification | Escalation |
|----------|:----------:|:---------------:|:------------:|------------|
| **Critical** | 9.0–10.0 | **24 hours** | Immediate rescan | CISO + executive team |
| **High** | 7.0–8.9 | **7 days** | Within 48h of fix | CISO |
| **Medium** | 4.0–6.9 | **30 days** | Next scheduled scan | Security team lead |
| **Low** | 0.1–3.9 | **90 days** | Next quarterly scan | Risk owner |

### SLA Rules

- ✅ **MUST** begin assessment of Critical vulnerabilities within 4 hours of discovery
- ✅ **MUST** apply temporary mitigations if permanent fix exceeds SLA
- ✅ **MUST** track SLA compliance metrics and report monthly
- ✅ **MUST** document exceptions with compensating controls and management approval
- ✅ **SHOULD** automate vulnerability scanning on a continuous basis
- ✅ **SHOULD** integrate vulnerability data into the risk register

---

## 📈 Risk Reporting and Metrics

### Key Risk Indicators (KRIs)

Track these metrics to monitor risk posture:

| Metric | Target | Frequency | Owner |
|--------|--------|-----------|-------|
| Open Critical/High risks | 0 Critical, <5 High | Weekly | CISO |
| Vulnerability SLA compliance | ≥95% | Monthly | Security team |
| Risk register completeness | 100% fields populated | Quarterly | Risk manager |
| Overdue risk treatments | 0 | Monthly | Risk owners |
| Mean time to remediate (MTTR) | <SLA thresholds | Monthly | Security team |
| Third-party risk assessments completed | 100% of critical vendors | Annually | Procurement |
| Risk acceptance approvals current | 100% | Quarterly | Risk manager |

### Reporting Cadence

| Report | Audience | Frequency | Content |
|--------|----------|-----------|---------|
| Risk Dashboard | All stakeholders | Real-time | Current risk posture, trends, KRIs |
| Risk Summary | Management | Monthly | Top risks, treatment progress, SLA compliance |
| Risk Review | Senior leadership | Quarterly | Full risk register review, appetite assessment |
| Annual Risk Report | Board / Executive | Annually | Strategic risk landscape, year-over-year trends |

### Risk Trend Analysis

Monitor directional changes:

- **↑ Increasing** — Risk score has risen since last assessment; requires attention
- **→ Stable** — Risk score unchanged; continue current treatment
- **↓ Decreasing** — Risk score has dropped; controls are effective

---

## 🔗 Supply Chain Risk Assessment

### Third-Party Risk Framework

| Risk Tier | Criteria | Assessment Depth | Review Frequency |
|-----------|----------|-----------------|------------------|
| **Tier 1 — Critical** | Access to sensitive data, critical infrastructure, or high financial impact | Full security assessment, on-site audit | Annually + event-driven |
| **Tier 2 — Important** | Access to internal systems or moderate data exposure | Security questionnaire, evidence review | Annually |
| **Tier 3 — Standard** | Limited access, low-risk services | Self-assessment questionnaire | Biennially |

### Supply Chain Risk Rules

- ✅ **MUST** assess all third-party vendors before onboarding
- ✅ **MUST** include security requirements in vendor contracts (SLAs, incident notification, audit rights)
- ✅ **MUST** monitor Tier 1 vendors continuously for security posture changes
- ✅ **MUST** maintain a vendor risk register linked to the main risk register
- ✅ **SHOULD** require SOC 2 Type II or ISO 27001 certification for Tier 1 vendors
- ✅ **SHOULD** include right-to-audit clauses in all vendor contracts
- ✅ **SHOULD** have documented exit strategies for critical vendor dependencies

### Software Supply Chain

For development dependencies (directly relevant to this project):

- ✅ **MUST** run `npm audit` and review Dependabot alerts regularly
- ✅ **MUST** pin dependency versions and review updates before merging
- ✅ **MUST** evaluate new dependencies for known vulnerabilities before adoption
- ✅ **SHOULD** minimize dependency count to reduce attack surface
- ✅ **SHOULD** prefer well-maintained packages with active security response

---

## 🔄 Quarterly Risk Review Process

### Review Agenda

1. **Risk Register Review** (all entries)
   - Validate current likelihood and impact scores
   - Update residual risk based on control effectiveness
   - Close risks that are no longer relevant
   - Identify new risks from recent changes or incidents

2. **Treatment Progress**
   - Review status of in-progress treatments
   - Assess effectiveness of completed treatments
   - Escalate overdue treatments

3. **Metrics Review**
   - Analyze KRI trends
   - Review SLA compliance
   - Benchmark against risk appetite thresholds

4. **External Context**
   - Review emerging threats and vulnerabilities
   - Assess regulatory or compliance changes
   - Evaluate industry incident reports for applicability

5. **Action Items**
   - Assign new risk owners as needed
   - Update treatment plans and timelines
   - Schedule ad-hoc assessments if required

### Review Rules

- ✅ **MUST** conduct quarterly reviews with documented minutes
- ✅ **MUST** include risk owners and senior management representation
- ✅ **MUST** produce updated risk register within 5 business days of review
- ✅ **SHOULD** invite cross-functional stakeholders for comprehensive perspective

---

## 🗺️ Compliance Mapping

### ISO 27001:2022 Alignment

| ISO 27001 Clause | Risk Assessment Activity |
|-------------------|--------------------------|
| 6.1.2 | Information security risk assessment process |
| 6.1.3 | Information security risk treatment |
| 8.2 | Information security risk assessment execution |
| 8.3 | Information security risk treatment implementation |
| A.5.1 | Policies for information security |
| A.8.8 | Management of technical vulnerabilities |
| A.5.19–5.23 | Supplier relationships and security |

### NIST CSF 2.0 Alignment

| NIST CSF Function | Category | Risk Assessment Activity |
|--------------------|----------|--------------------------|
| **GOVERN (GV)** | GV.RM | Risk management strategy and appetite |
| **IDENTIFY (ID)** | ID.RA | Risk assessment execution |
| | ID.RA-01 | Vulnerabilities identified and documented |
| | ID.RA-02 | Threat intelligence received and analyzed |
| | ID.RA-03 | Internal and external threats identified |
| | ID.RA-04 | Potential impacts and likelihoods determined |
| | ID.RA-05 | Risk responses determined and prioritized |
| | ID.RA-06 | Risk responses selected and planned |
| **PROTECT (PR)** | PR.IP | Protective technology and processes |
| **DETECT (DE)** | DE.CM | Continuous monitoring |
| **RESPOND (RS)** | RS.MI | Incident mitigation and risk recalculation |

### CIS Controls v8 Alignment

| CIS Control | Risk Assessment Activity |
|-------------|--------------------------|
| Control 7 | Continuous vulnerability management |
| Control 15 | Service provider management |
| Control 17 | Incident response management |

---

## ⚡ Quick Decision Guide

### When to Perform a Risk Assessment

```
New system or service?              → Full risk assessment before deployment
Significant change to existing?     → Targeted reassessment of affected areas
Security incident occurred?         → Post-incident risk reassessment
New vulnerability discovered?       → Evaluate against risk matrix, apply SLA
Vendor onboarding?                  → Third-party risk assessment (by tier)
Regulatory change?                  → Compliance-focused risk review
Quarterly cycle?                    → Comprehensive risk register review
```

### Risk Score Quick Calculator

```
Step 1: Rate Likelihood (1-5)
Step 2: Rate Impact (1-5)
Step 3: Multiply → Risk Score
Step 4: Apply rating thresholds
Step 5: Select treatment option
Step 6: Document in risk register
```

### Escalation Path

```
Very Low (1-3)    → Risk owner monitors
Low (4-7)         → Risk owner manages, reports quarterly
Medium (8-14)     → Management review, treatment plan required
High (15-19)      → Senior management approval, treatment within 7 days
Critical (20-25)  → Executive escalation, immediate action within 24 hours
```

---

## 📎 Related Resources

### Internal References
- [Security by Design Skill](security-by-design.md) — Secure development practices
- [ISMS Compliance Skill](isms-compliance.md) — ISMS framework alignment
- [Code Quality Excellence Skill](code-quality-excellence.md) — Quality standards
- [Testing Excellence Skill](testing-excellence.md) — Testing and validation

### External Standards
- [ISO 27005:2022](https://www.iso.org/standard/80585.html) — Information security risk management
- [NIST SP 800-30 Rev. 1](https://csrc.nist.gov/publications/detail/sp/800-30/rev-1/final) — Guide for Conducting Risk Assessments
- [NIST CSF 2.0](https://www.nist.gov/cyberframework) — Cybersecurity Framework
- [OWASP Risk Rating Methodology](https://owasp.org/www-community/OWASP_Risk_Rating_Methodology) — Application security risk rating

---

*This skill consolidates governance risk assessment, risk register management, risk assessment frameworks, and risk assessment methodology into a unified reference for the CIA Compliance Manager project.*
