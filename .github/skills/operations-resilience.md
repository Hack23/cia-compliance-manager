# 🔄 Operations & Resilience Skill

> **Strategic Principle**: Ensure continuous service delivery through disciplined change management, robust backup and recovery, business continuity planning, disaster recovery preparedness, and structured incident response — all aligned with CIA triad protection levels and organizational risk tolerance.

---

## 📚 Core References

| Domain | ISMS Policy Reference |
|--------|----------------------|
| Change Management | [Change Management Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/policies/change-management-policy.md) |
| Backup & Recovery | [Backup & Recovery Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/policies/backup-recovery-policy.md) |
| Business Continuity | [Business Continuity Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/policies/business-continuity-policy.md) |
| Disaster Recovery | [Disaster Recovery Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/policies/disaster-recovery-policy.md) |
| Incident Response | [Incident Response Plan](https://github.com/Hack23/ISMS-PUBLIC/blob/main/policies/incident-response-plan.md) |

---

## 1️⃣ Change Management

### Strategic Goal

Minimize service disruption and security risk by governing all changes through a structured, risk-assessed process with clear accountability, rollback procedures, and post-implementation validation.

### MUST Rules (Non-Negotiable)

- **MUST** classify every change by risk level before approval:
  - **Standard**: Pre-approved, low-risk, repeatable (e.g., dependency patch updates)
  - **Normal**: Requires CAB review and scheduled deployment window
  - **Emergency**: Expedited approval with mandatory post-implementation review
- **MUST** document a rollback procedure for every change before deployment
- **MUST** test rollback procedures in a non-production environment
- **MUST** obtain Change Advisory Board (CAB) approval for Normal and Emergency changes
- **MUST** record all changes in the change log with: requester, approver, timestamp, risk level, and outcome
- **MUST** perform post-implementation validation to confirm the change achieved its objective without side effects
- **MUST** conduct post-incident review for any Emergency change within 5 business days

### SHOULD Rules (Justify If Skipped)

- **SHOULD** batch related low-risk changes into a single deployment window to reduce overhead
- **SHOULD** automate deployment pipelines with built-in rollback triggers (e.g., health check failures)
- **SHOULD** notify all stakeholders before and after scheduled changes
- **SHOULD** maintain a forward schedule of changes visible to all teams
- **SHOULD** use feature flags for high-risk feature rollouts to enable instant rollback

### MAY Rules (Best Practice)

- **MAY** implement canary deployments for gradual rollout to subsets of users
- **MAY** use chaos engineering practices to validate change resilience
- **MAY** automate CAB notifications and approval workflows

### Change Advisory Board (CAB) Governance

```
CAB Composition:
├── Chair: Engineering Lead or designated delegate
├── Members:
│   ├── Security representative
│   ├── Infrastructure/DevOps representative
│   ├── QA representative
│   └── Product owner (for user-facing changes)
└── Quorum: Chair + 2 members minimum

CAB Responsibilities:
├── Review Normal and Emergency change requests
├── Assess risk, impact, and rollback readiness
├── Approve, defer, or reject changes
├── Review post-implementation reports
└── Track change success/failure metrics
```

### Change Process Flow

```
1. Request    → Submit RFC (Request for Change) with risk classification
2. Assess     → CAB reviews impact, dependencies, rollback plan
3. Approve    → CAB approves or rejects (Emergency: expedited path)
4. Schedule   → Assign deployment window; notify stakeholders
5. Implement  → Deploy with monitoring; execute rollback if needed
6. Validate   → Post-implementation checks confirm success
7. Close      → Record outcome; update change log
```

---

## 2️⃣ Backup & Recovery

### Strategic Goal

Protect organizational data assets through business impact-driven backup strategies with validated recovery capabilities aligned to RTO/RPO requirements.

### MUST Rules (Non-Negotiable)

- **MUST** define Recovery Time Objective (RTO) and Recovery Point Objective (RPO) for every critical system
- **MUST** align backup frequency with RPO requirements:

| RPO Target | Minimum Backup Frequency | Example Systems |
|------------|-------------------------|-----------------|
| < 1 hour | Continuous / real-time replication | Financial transactions, auth systems |
| 1–4 hours | Hourly snapshots | User data, configuration stores |
| 4–24 hours | Daily backups | Application logs, analytics data |
| > 24 hours | Weekly backups | Archives, static assets |

- **MUST** store backups in a geographically separate location from primary data
- **MUST** encrypt all backups at rest and in transit
- **MUST** test backup restoration at least quarterly and document results
- **MUST** validate backup integrity using checksums or hash verification
- **MUST** retain backups according to data classification and regulatory requirements
- **MUST** maintain an inventory of all backup schedules, locations, and responsible owners

### SHOULD Rules (Justify If Skipped)

- **SHOULD** automate backup verification with automated restore tests
- **SHOULD** implement the 3-2-1 backup rule: 3 copies, 2 different media types, 1 offsite
- **SHOULD** monitor backup job completion and alert on failures within 1 hour
- **SHOULD** document and test bare-metal recovery procedures annually
- **SHOULD** version backup configurations alongside infrastructure-as-code

### MAY Rules (Best Practice)

- **MAY** use immutable backups to protect against ransomware
- **MAY** implement point-in-time recovery for databases
- **MAY** conduct surprise recovery drills to validate team readiness

### RTO/RPO Alignment Matrix

```
CIA Security Level → Backup Requirements:

Very High:
├── RPO: < 1 hour
├── RTO: < 1 hour
├── Method: Synchronous replication + continuous backup
├── Retention: Per regulatory requirement (minimum 7 years)
└── Test Frequency: Monthly

High:
├── RPO: 1–4 hours
├── RTO: < 4 hours
├── Method: Asynchronous replication + hourly snapshots
├── Retention: 1 year minimum
└── Test Frequency: Quarterly

Moderate:
├── RPO: 4–24 hours
├── RTO: < 24 hours
├── Method: Daily automated backups
├── Retention: 90 days minimum
└── Test Frequency: Semi-annually

Low:
├── RPO: 24–72 hours
├── RTO: < 72 hours
├── Method: Weekly backups
├── Retention: 30 days minimum
└── Test Frequency: Annually

None:
├── RPO: N/A
├── RTO: Best effort
├── Method: Optional manual backups
└── Retention: As needed
```

---

## 3️⃣ Business Continuity

### Strategic Goal

Ensure critical business functions continue operating during and after disruptions through Maximum Tolerable Downtime (MTD)-based prioritization, predefined continuity strategies, and regular testing.

### MUST Rules (Non-Negotiable)

- **MUST** identify and prioritize critical business functions based on MTD
- **MUST** define continuity strategies for all functions with MTD < 72 hours
- **MUST** maintain a Business Impact Analysis (BIA) updated at least annually
- **MUST** define clear roles and responsibilities in the continuity plan
- **MUST** establish communication procedures for internal teams, customers, and regulators
- **MUST** test the business continuity plan at least annually via tabletop exercise or simulation
- **MUST** review and update the plan after every significant incident or organizational change

### SHOULD Rules (Justify If Skipped)

- **SHOULD** maintain alternate operating procedures for critical functions
- **SHOULD** identify and document single points of failure for all critical systems
- **SHOULD** cross-train personnel on critical functions to eliminate key-person dependencies
- **SHOULD** integrate business continuity testing with disaster recovery testing
- **SHOULD** maintain relationships with external recovery service providers

### MAY Rules (Best Practice)

- **MAY** conduct unannounced continuity exercises to test real-world readiness
- **MAY** use business continuity management software for plan maintenance
- **MAY** benchmark continuity capabilities against industry standards

### MTD-Based Prioritization

```
Priority 1 — MTD < 4 hours (Mission Critical):
├── Functions: Authentication, core application services, data integrity
├── Strategy: Active-active deployment, automatic failover
├── Resources: Dedicated recovery team on standby
└── Testing: Quarterly failover drills

Priority 2 — MTD 4–24 hours (Business Critical):
├── Functions: Reporting, notifications, secondary integrations
├── Strategy: Active-passive with automated promotion
├── Resources: Recovery team activated within 2 hours
└── Testing: Semi-annual exercises

Priority 3 — MTD 24–72 hours (Business Important):
├── Functions: Analytics, batch processing, non-critical APIs
├── Strategy: Cold standby with documented recovery
├── Resources: Recovery team activated within 8 hours
└── Testing: Annual exercises

Priority 4 — MTD > 72 hours (Non-Critical):
├── Functions: Development environments, internal tools
├── Strategy: Rebuild from infrastructure-as-code
├── Resources: Scheduled recovery during business hours
└── Testing: As needed
```

---

## 4️⃣ Disaster Recovery

### Strategic Goal

Restore technology infrastructure and systems to full operational capability following a disaster, minimizing data loss and downtime through predefined, tested recovery procedures.

### MUST Rules (Non-Negotiable)

- **MUST** maintain a documented Disaster Recovery Plan (DRP) covering all critical systems
- **MUST** define recovery procedures for each critical system with step-by-step instructions
- **MUST** test the DRP at least annually using realistic scenarios
- **MUST** deploy critical systems across multiple availability zones or regions
- **MUST** automate failover for Priority 1 (mission-critical) systems
- **MUST** validate data integrity after every recovery operation
- **MUST** document lessons learned after every DR test or actual disaster event
- **MUST** maintain current contact lists for all DR team members and external providers

### SHOULD Rules (Justify If Skipped)

- **SHOULD** automate DR procedures using infrastructure-as-code
- **SHOULD** maintain a secondary deployment pipeline for disaster scenarios
- **SHOULD** test network failover and DNS switchover procedures
- **SHOULD** conduct joint DR exercises with critical third-party providers
- **SHOULD** measure and report on actual vs. target RTO/RPO performance

### MAY Rules (Best Practice)

- **MAY** implement multi-region active-active architecture for zero-downtime recovery
- **MAY** use automated DR orchestration tools for complex recovery sequences
- **MAY** conduct annual full-scale DR simulations involving all teams

### Multi-Zone Deployment & Failover

```
Production Architecture for DR:

Primary Zone (Active):
├── Application tier: Load-balanced instances
├── Data tier: Primary database with synchronous replication
├── Storage: Primary object storage with cross-region replication
└── Monitoring: Health checks every 30 seconds

Secondary Zone (Standby/Active):
├── Application tier: Warm standby instances (auto-scaled on failover)
├── Data tier: Read replica promoted on failover
├── Storage: Replicated object storage
└── Monitoring: Independent health check validation

Failover Triggers:
├── Automatic: Health check failures exceed threshold (3 consecutive)
├── Automatic: Database replication lag exceeds RPO threshold
├── Manual: Declared disaster by incident commander
└── Scheduled: Planned DR test exercise

Recovery Validation Checklist:
├── [ ] All services responding to health checks
├── [ ] Database integrity verified (checksum comparison)
├── [ ] User authentication functioning
├── [ ] Data replication resumed to new standby
├── [ ] Monitoring and alerting operational
└── [ ] Stakeholders notified of recovery status
```

### DR Testing Requirements

| Test Type | Frequency | Scope | Success Criteria |
|-----------|-----------|-------|-----------------|
| Tabletop exercise | Quarterly | Walk through scenarios | All roles understood, gaps identified |
| Component failover | Quarterly | Individual system recovery | RTO met, data integrity confirmed |
| Partial simulation | Semi-annually | Multiple system recovery | Coordinated recovery within targets |
| Full-scale test | Annually | Complete environment failover | All critical systems recovered within RTO/RPO |

---

## 5️⃣ Incident Response

### Strategic Goal

Detect, assess, contain, eradicate, and recover from security incidents and service disruptions through a structured, repeatable process with clear escalation paths and accountability.

### MUST Rules (Non-Negotiable)

- **MUST** follow the six-phase incident response lifecycle: Detection → Assessment → Containment → Eradication → Recovery → Lessons Learned
- **MUST** classify incidents by severity level with defined response timelines
- **MUST** designate an Incident Commander for all High and Critical severity incidents
- **MUST** document all incident actions in a timeline with timestamps
- **MUST** notify affected stakeholders within the timeframes defined by severity level
- **MUST** conduct a post-incident review (PIR) for all High and Critical incidents within 5 business days
- **MUST** track remediation actions to completion with assigned owners and due dates
- **MUST** preserve evidence for forensic analysis in security incidents

### SHOULD Rules (Justify If Skipped)

- **SHOULD** automate detection and alerting for known incident patterns
- **SHOULD** maintain incident response runbooks for common scenarios
- **SHOULD** conduct incident response training exercises at least semi-annually
- **SHOULD** integrate incident management with change management processes
- **SHOULD** use blameless post-incident review methodology

### MAY Rules (Best Practice)

- **MAY** implement automated containment for specific incident types
- **MAY** use incident management platforms for coordination and tracking
- **MAY** establish a bug bounty program for external vulnerability reporting

### Incident Severity Levels

```
┌──────────┬───────────────────────┬──────────────┬────────────────────┐
│ Severity │ Definition            │ Response SLA │ Resolution Target  │
├──────────┼───────────────────────┼──────────────┼────────────────────┤
│ Critical │ Complete service      │ 15 minutes   │ 24 hours           │
│          │ outage or active      │              │                    │
│          │ security breach       │              │                    │
├──────────┼───────────────────────┼──────────────┼────────────────────┤
│ High     │ Major feature         │ 1 hour       │ 7 days             │
│          │ degradation or        │              │                    │
│          │ potential breach      │              │                    │
├──────────┼───────────────────────┼──────────────┼────────────────────┤
│ Medium   │ Minor feature impact  │ 4 hours      │ 30 days            │
│          │ or vulnerability      │              │                    │
│          │ discovered            │              │                    │
├──────────┼───────────────────────┼──────────────┼────────────────────┤
│ Low      │ Cosmetic issue or     │ 1 business   │ 90 days            │
│          │ improvement needed    │ day          │                    │
└──────────┴───────────────────────┴──────────────┴────────────────────┘
```

### Incident Response Lifecycle

#### Phase 1: Detection

- Monitor application health, security events, and error rates
- Automated alerting on anomaly detection thresholds
- Accept reports from users, team members, or external sources
- Log initial detection time and source

#### Phase 2: Assessment

- Classify severity using the severity level matrix
- Identify affected systems, data, and users
- Determine scope and potential business impact
- Assign Incident Commander for High/Critical incidents
- Notify stakeholders per communication procedures

#### Phase 3: Containment

- Implement immediate containment to prevent further damage
- Short-term: Isolate affected systems, block malicious traffic
- Long-term: Apply temporary fixes to restore partial service
- Preserve evidence and logs for forensic analysis
- Document all containment actions with timestamps

#### Phase 4: Eradication

- Identify and eliminate root cause
- Remove malicious artifacts, patch vulnerabilities
- Verify eradication through scanning and testing
- Update detection rules to prevent recurrence

#### Phase 5: Recovery

- Restore systems from known-good state (validated backups)
- Verify data integrity post-restoration
- Monitor closely for incident recurrence (enhanced monitoring for 72 hours minimum)
- Gradually restore full service with validation at each step
- Confirm recovery with stakeholders

#### Phase 6: Lessons Learned

- Conduct blameless post-incident review within 5 business days
- Document root cause, timeline, and actions taken
- Identify improvements to prevent recurrence
- Create and assign follow-up action items with deadlines
- Update runbooks, playbooks, and detection rules
- Share relevant learnings across the organization

---

## 6️⃣ Compliance Mapping

### ISO 27001:2022 Alignment

| Control | Domain | Requirement |
|---------|--------|-------------|
| A.5.1 | Change Management | Policies for information security |
| A.8.9 | Change Management | Configuration management |
| A.8.32 | Change Management | Change management |
| A.8.13 | Backup & Recovery | Information backup |
| A.8.14 | Backup & Recovery | Redundancy of information processing facilities |
| A.5.29 | Business Continuity | ICT readiness for business continuity |
| A.5.30 | Business Continuity | ICT readiness for business continuity |
| A.5.24 | Incident Response | Information security incident management planning |
| A.5.25 | Incident Response | Assessment and decision on information security events |
| A.5.26 | Incident Response | Response to information security incidents |
| A.5.27 | Incident Response | Learning from information security incidents |
| A.5.28 | Incident Response | Collection of evidence |

### NIST CSF 2.0 Alignment

| Function | Category | Operations & Resilience Domain |
|----------|----------|-------------------------------|
| Protect (PR) | PR.IP | Change management, configuration management |
| Protect (PR) | PR.MA | Backup and maintenance procedures |
| Detect (DE) | DE.AE | Anomaly detection, incident identification |
| Detect (DE) | DE.CM | Continuous monitoring |
| Respond (RS) | RS.RP | Incident response planning |
| Respond (RS) | RS.CO | Incident communications |
| Respond (RS) | RS.AN | Incident analysis |
| Respond (RS) | RS.MI | Incident mitigation and containment |
| Respond (RS) | RS.IM | Incident response improvements |
| Recover (RC) | RC.RP | Recovery planning and execution |
| Recover (RC) | RC.IM | Recovery improvements |
| Recover (RC) | RC.CO | Recovery communications |

---

## 7️⃣ Quick Decision Guide

```
Is this a change, an incident, or a recovery task?

CHANGE:
├── Is it a pre-approved standard change?
│   ├── Yes → Follow standard change procedure, log it
│   └── No → Submit RFC to CAB
│       ├── Is it urgent/emergency?
│       │   ├── Yes → Emergency change path (expedited CAB approval)
│       │   └── No → Normal change path (scheduled CAB review)
│       └── Does it have a rollback plan?
│           ├── Yes → Proceed to approval
│           └── No → STOP — document rollback plan first

INCIDENT:
├── Is there active data loss or security breach?
│   ├── Yes → CRITICAL severity → Incident Commander assigned → 15 min response
│   └── No → Assess severity level
│       ├── Major degradation → HIGH → 1 hour response
│       ├── Minor impact → MEDIUM → 4 hour response
│       └── Cosmetic/improvement → LOW → 1 business day response
└── Follow 6-phase lifecycle: Detect → Assess → Contain → Eradicate → Recover → Learn

RECOVERY:
├── Is the DR plan tested and current?
│   ├── Yes → Execute recovery procedures
│   └── No → STOP — update and test plan first
├── What is the system priority?
│   ├── Priority 1 (MTD < 4h) → Automatic failover, immediate action
│   ├── Priority 2 (MTD 4-24h) → Activate recovery team within 2 hours
│   ├── Priority 3 (MTD 24-72h) → Scheduled recovery
│   └── Priority 4 (MTD > 72h) → Rebuild from IaC when convenient
└── After recovery: Validate data integrity → Resume monitoring → Notify stakeholders
```

---

## 8️⃣ Related Resources

### Internal References

- [Security by Design Skill](security-by-design.md) — Security controls that feed into incident detection
- [ISMS Compliance Skill](isms-compliance.md) — Compliance framework and policy alignment
- [Testing Excellence Skill](testing-excellence.md) — Testing practices that support change validation
- [ISMS Implementation Guide](ISMS_IMPLEMENTATION_GUIDE.md) — Organizational ISMS implementation guidance
- [Security Policy](SECURITY.md) — Vulnerability reporting and security contacts

### External References

- [ISO 22301:2019 — Business Continuity Management](https://www.iso.org/standard/75106.html)
- [NIST SP 800-61 — Computer Security Incident Handling Guide](https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final)
- [NIST SP 800-34 — Contingency Planning Guide](https://csrc.nist.gov/publications/detail/sp/800-34/rev-1/final)
- [Hack23 ISMS Public Repository](https://github.com/Hack23/ISMS-PUBLIC)

---

**Made with ❤️ for CIA Compliance Manager** | [Hack23 AB](https://www.hack23.com) | Operations & Resilience Excellence
