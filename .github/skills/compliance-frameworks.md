# ✅ Compliance Frameworks Skill

## Strategic Principle

**Every development activity must demonstrably comply with applicable regulatory frameworks through systematic mapping, documentation, and continuous validation.**

This skill provides comprehensive guidance for aligning with ISO 27001:2022, NIST Cybersecurity Framework 2.0, CIS Controls v8.1, GDPR, NIS2 Directive, and EU Cyber Resilience Act.

## Core Reference

### Hack23 ISMS Compliance Framework

**Primary Document**: [✅ Compliance Checklist](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Compliance_Checklist.md) - 

Unified compliance tracking across all frameworks with 240+ control mappings.

**Key Components**:
- Comprehensive control inventory for ISO 27001:2022 (93 controls)
- NIST CSF 2.0 function mapping (Govern, Identify, Protect, Detect, Respond, Recover)
- CIS Controls v8.1 implementation groups (IG1, IG2, IG3)
- GDPR Article 32 technical measures
- NIS2 Directive cybersecurity requirements
- EU CRA essential cybersecurity requirements

## ISO 27001:2022 Information Security Controls

### Control Categories

**Organizational Controls (A.5)**:
- A.5.1: Policies for information security
- A.5.7: Threat intelligence
- A.5.23: Information security for use of cloud services

**People Controls (A.6)**:
- A.6.2: Terms and conditions of employment
- A.6.3: Information security awareness, education and training

**Physical Controls (A.7)**:
- A.7.4: Physical security monitoring

**Technological Controls (A.8)**:
- A.8.1: User endpoint devices
- A.8.2: Privileged access rights
- A.8.5: Secure authentication
- A.8.8: Management of technical vulnerabilities
- A.8.9: Configuration management
- A.8.10: Information deletion
- A.8.16: Monitoring activities
- A.8.19: Installation of software on operational systems
- A.8.23: Web filtering
- A.8.24: Use of cryptography
- A.8.25: Secure development life cycle
- A.8.26: Application security requirements
- A.8.28: Secure coding
- A.8.32: Change management

### Implementation Example

```typescript
// ✅ GOOD: ISO 27001 Control A.8.5 - Secure Authentication
interface AuthenticationControl_A85 {
  readonly controlId: 'A.8.5';
  readonly controlName: 'Secure authentication';
  readonly implementationStatus: 'implemented' | 'partial' | 'planned';
  readonly evidence: readonly string[];
  readonly testingProcedure: string;
}

const AUTH_CONTROL_A85: AuthenticationControl_A85 = {
  controlId: 'A.8.5',
  controlName: 'Secure authentication',
  implementationStatus: 'implemented',
  evidence: [
    'src/services/authService.ts - MFA implementation',
    'docs/SECURITY_ARCHITECTURE.md - Authentication architecture',
    'tests/auth.test.ts - Authentication security tests',
  ],
  testingProcedure: 'Run npm test -- auth.test.ts to validate authentication controls',
};
```

**Reference**: [Compliance Checklist - ISO 27001:2022 Controls](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Compliance_Checklist.md#-iso-270012022---information-security-controls)

## NIST Cybersecurity Framework 2.0

### Six Core Functions

**1. Govern (GV)**: Establish and monitor cybersecurity risk management
```typescript
// GV.OC: Cybersecurity supply chain risk management is established
const SUPPLY_CHAIN_GOVERNANCE = {
  function: 'GV.OC-05',
  requirement: 'Cybersecurity supply chain risk management processes are established',
  implementation: [
    'Third Party Management Policy enforced',
    'Supplier Security Posture assessments documented',
    'SBOM generation for all releases',
    'Dependency vulnerability scanning integrated in CI/CD',
  ],
  evidence: 'https://github.com/Hack23/ISMS-PUBLIC/blob/main/Third_Party_Management.md',
};
```

**2. Identify (ID)**: Understand cybersecurity risks
```typescript
// ID.AM: Asset Management
const ASSET_MANAGEMENT = {
  function: 'ID.AM-01',
  requirement: 'Inventories of hardware, software, systems, services, and data are maintained',
  implementation: [
    'Asset Register maintained in ISMS-PUBLIC',
    'GitHub repository inventory automated',
    'AWS resource tagging enforced',
    'Data classification applied per CLASSIFICATION.md',
  ],
  evidence: 'https://github.com/Hack23/ISMS-PUBLIC/blob/main/Asset_Register.md',
};
```

**3. Protect (PR)**: Implement appropriate safeguards
```typescript
// PR.DS: Data Security
const DATA_SECURITY = {
  function: 'PR.DS-01',
  requirement: 'Data-at-rest is protected',
  implementation: [
    'TLS 1.3 for all data in transit',
    'AES-256-GCM for sensitive data at rest',
    'Encryption key management via AWS KMS',
    'Data classification enforced',
  ],
  evidence: 'https://github.com/Hack23/ISMS-PUBLIC/blob/main/Cryptography_Policy.md',
};
```

**4. Detect (DE)**: Identify cybersecurity events
```typescript
// DE.CM: Security Continuous Monitoring
const CONTINUOUS_MONITORING = {
  function: 'DE.CM-01',
  requirement: 'Networks and network services are monitored to detect potential cybersecurity events',
  implementation: [
    'GitHub Advanced Security enabled',
    'CodeQL scanning on all PRs',
    'Dependabot alerts configured',
    'AWS CloudWatch monitoring active',
  ],
  evidence: 'https://github.com/Hack23/cia-compliance-manager/.github/workflows/',
};
```

**5. Respond (RS)**: Take action regarding detected cybersecurity incidents
```typescript
// RS.MA: Incident Management
const INCIDENT_MANAGEMENT = {
  function: 'RS.MA-01',
  requirement: 'The incident response plan is executed in coordination with relevant third parties once an incident is declared',
  implementation: [
    'Incident Response Plan documented',
    'Severity classification defined',
    'Escalation procedures established',
    'Third-party notification process defined',
  ],
  evidence: 'https://github.com/Hack23/ISMS-PUBLIC/blob/main/Incident_Response_Plan.md',
};
```

**6. Recover (RC)**: Restore capabilities or services
```typescript
// RC.RP: Recovery Planning
const RECOVERY_PLANNING = {
  function: 'RC.RP-01',
  requirement: 'The recovery portion of the incident response plan is executed once the incident is declared',
  implementation: [
    'Business Continuity Plan documented',
    'Disaster Recovery Plan with RPO/RTO targets',
    'Backup verification automated',
    'Recovery procedures tested quarterly',
  ],
  evidence: [
    'https://github.com/Hack23/ISMS-PUBLIC/blob/main/Business_Continuity_Plan.md',
    'https://github.com/Hack23/ISMS-PUBLIC/blob/main/Disaster_Recovery_Plan.md',
  ],
};
```

**Reference**: [Compliance Checklist - NIST CSF 2.0](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Compliance_Checklist.md#-nist-cybersecurity-framework-20)

## CIS Controls v8.1

### Implementation Groups

**IG1 (Basic Cyber Hygiene)**: Essential controls for all organizations
```typescript
interface CISControl {
  readonly controlId: string;
  readonly controlName: string;
  readonly implementationGroup: 'IG1' | 'IG2' | 'IG3';
  readonly safeguards: readonly string[];
  readonly implementation: readonly string[];
}

const CIS_CONTROL_2_IG1: CISControl = {
  controlId: 'CIS-2',
  controlName: 'Inventory and Control of Software Assets',
  implementationGroup: 'IG1',
  safeguards: [
    '2.1: Establish and Maintain a Software Inventory',
    '2.2: Ensure Authorized Software is Currently Supported',
    '2.3: Address Unauthorized Software',
  ],
  implementation: [
    'package.json and package-lock.json maintained',
    'npm audit executed in CI/CD',
    'Dependabot automated dependency updates',
    'SBOM generated for releases',
  ],
};
```

**IG2 (Foundational)**: Additional controls for increased security
```typescript
const CIS_CONTROL_13_IG2: CISControl = {
  controlId: 'CIS-13',
  controlName: 'Network Monitoring and Defense',
  implementationGroup: 'IG2',
  safeguards: [
    '13.1: Centralize Security Event Alerting',
    '13.6: Collect Network Traffic Flow Logs',
  ],
  implementation: [
    'AWS CloudWatch centralized logging',
    'VPC Flow Logs enabled',
    'GitHub Advanced Security alerts',
    'Security event correlation automated',
  ],
};
```

**IG3 (Organizational)**: Advanced controls for mature security programs
```typescript
const CIS_CONTROL_18_IG3: CISControl = {
  controlId: 'CIS-18',
  controlName: 'Penetration Testing',
  implementationGroup: 'IG3',
  safeguards: [
    '18.1: Establish and Maintain a Penetration Testing Program',
    '18.3: Remediate Penetration Test Findings',
  ],
  implementation: [
    'Annual penetration testing scheduled',
    'Findings documented in Risk Register',
    'Remediation tracked in GitHub Issues',
    'Retest verification performed',
  ],
};
```

**Reference**: [Compliance Checklist - CIS Controls v8.1](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Compliance_Checklist.md#-cis-controls-v81)

## GDPR Compliance (Article 32 - Security of Processing)

### Technical and Organizational Measures

```typescript
interface GDPRArticle32Compliance {
  readonly article: 'Article 32';
  readonly requirement: string;
  readonly technicalMeasures: readonly string[];
  readonly organizationalMeasures: readonly string[];
  readonly evidence: readonly string[];
}

const GDPR_ARTICLE_32: GDPRArticle32Compliance = {
  article: 'Article 32',
  requirement: 'Security of processing - Implement appropriate technical and organizational measures',
  technicalMeasures: [
    'Pseudonymisation and encryption of personal data (AES-256-GCM)',
    'Ongoing confidentiality, integrity, availability, and resilience (CIA Triad)',
    'Regular testing and evaluation of security effectiveness',
    'Ability to restore availability and access to data (backup/recovery)',
  ],
  organizationalMeasures: [
    'Data Protection Policy documented',
    'Privacy by Design principles integrated',
    'Data classification and handling procedures',
    'Employee training on data protection',
    'Vendor data processing agreements',
  ],
  evidence: [
    'https://github.com/Hack23/ISMS-PUBLIC/blob/main/Privacy_Policy.md',
    'https://github.com/Hack23/ISMS-PUBLIC/blob/main/Data_Classification_Policy.md',
    'https://github.com/Hack23/ISMS-PUBLIC/blob/main/Cryptography_Policy.md',
  ],
};
```

### GDPR Principles in Code

```typescript
// ✅ GOOD: GDPR data minimization principle
interface UserProfile {
  readonly id: string;              // Required
  readonly email: string;           // Required for authentication
  readonly createdAt: Date;         // Required for audit
  // ❌ BAD: Collecting unnecessary data
  // readonly phoneNumber?: string;
  // readonly address?: string;
  // readonly dateOfBirth?: Date;
}

// ✅ GOOD: Right to be forgotten (GDPR Article 17)
async function deleteUserData(userId: string): Promise<void> {
  // Delete or anonymize all user data
  await database.transaction(async (trx) => {
    // Anonymize rather than delete for audit trail
    await trx('users')
      .where({ id: userId })
      .update({
        email: `deleted-user-${userId}@example.com`,
        name: '[DELETED]',
        deletedAt: new Date(),
      });
    
    // Delete associated personal data
    await trx('user_preferences').where({ userId }).del();
    await trx('user_sessions').where({ userId }).del();
  });
  
  // Log deletion for compliance audit
  await auditLog('user_data_deletion', { userId, timestamp: new Date() });
}
```

**Reference**: [Compliance Checklist - GDPR Compliance](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Compliance_Checklist.md#-gdpr---general-data-protection-regulation)

## NIS2 Directive Compliance

### Cybersecurity Risk Management Measures

```typescript
interface NIS2Requirements {
  readonly directive: 'NIS2';
  readonly article: 'Article 21';
  readonly measures: readonly string[];
  readonly implementation: readonly string[];
}

const NIS2_ARTICLE_21: NIS2Requirements = {
  directive: 'NIS2',
  article: 'Article 21',
  measures: [
    'Risk analysis and information system security policies',
    'Incident handling',
    'Business continuity and crisis management',
    'Supply chain security',
    'Security in network and information systems acquisition, development, and maintenance',
    'Policies and procedures to assess cybersecurity risk management measures',
    'Use of cryptography and encryption',
    'Human resources security, access control, and asset management',
  ],
  implementation: [
    'Risk Register maintained quarterly',
    'Incident Response Plan documented',
    'Business Continuity Plan with BIA',
    'Third Party Management policy enforced',
    'Secure Development Policy integrated in SDLC',
    'Quarterly ISMS reviews documented',
    'Cryptography Policy with AES-256/TLS 1.3',
    'Access Control Policy with least privilege',
  ],
};
```

**Reference**: [Compliance Checklist - NIS2 Directive](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Compliance_Checklist.md#-nis2-directive)

## EU Cyber Resilience Act (CRA)

### Essential Cybersecurity Requirements

```typescript
interface CRARequirements {
  readonly regulation: 'EU CRA';
  readonly annex: 'Annex I';
  readonly requirements: readonly string[];
  readonly conformityAssessment: readonly string[];
}

const CRA_ANNEX_I: CRARequirements = {
  regulation: 'EU CRA',
  annex: 'Annex I',
  requirements: [
    'Products designed, developed, and produced to ensure appropriate levels of cybersecurity',
    'Products delivered without known exploitable vulnerabilities',
    'Secure by default configuration',
    'Protection against unauthorized access with authentication mechanisms',
    'Protect confidentiality, integrity, and availability of data',
    'Record relevant security events (logging)',
    'Ensure updates can be securely obtained and applied',
    'Minimize their own negative impact on availability of services',
  ],
  conformityAssessment: [
    'Technical documentation maintained',
    'Conformity assessment process documented',
    'CE marking requirements prepared',
    'Vulnerability disclosure policy public',
    'Support period defined and communicated',
  ],
};
```

**CRA Conformity Implementation**:

```typescript
// ✅ GOOD: CRA-compliant product configuration
interface ProductSecurityConfig {
  readonly product: string;
  readonly version: string;
  readonly secureByDefault: boolean;
  readonly vulnerabilityDisclosureUrl: string;
  readonly supportPeriod: string;
  readonly updateMechanism: string;
  readonly conformityAssessment: string;
}

const CIA_COMPLIANCE_MANAGER_CRA: ProductSecurityConfig = {
  product: 'CIA Compliance Manager',
  version: '1.0.0',
  secureByDefault: true,
  vulnerabilityDisclosureUrl: 'https://github.com/Hack23/cia-compliance-manager/security/advisories',
  supportPeriod: '5 years from release date',
  updateMechanism: 'Automated GitHub releases with integrity verification',
  conformityAssessment: 'https://github.com/Hack23/ISMS-PUBLIC/blob/main/CRA_Conformity_Assessment_Process.md',
};
```

**Reference**: 
- [CRA Conformity Assessment Process](https://github.com/Hack23/ISMS-PUBLIC/blob/main/CRA_Conformity_Assessment_Process.md)
- [Compliance Checklist - EU CRA](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Compliance_Checklist.md#-eu-cyber-resilience-act-cra)

## Compliance Mapping Matrix

### Feature-to-Framework Mapping

**RULE**: Every security-relevant feature must be mapped to applicable compliance frameworks.

```typescript
interface ComplianceMapping {
  readonly feature: string;
  readonly iso27001Controls: readonly string[];
  readonly nistCsfFunctions: readonly string[];
  readonly cisControls: readonly string[];
  readonly gdprArticles: readonly string[];
  readonly nis2Requirements: readonly string[];
  readonly craRequirements: readonly string[];
}

// ✅ GOOD: Comprehensive compliance mapping
const USER_AUTHENTICATION_MAPPING: ComplianceMapping = {
  feature: 'User Authentication with MFA',
  iso27001Controls: [
    'A.8.2 - Privileged access rights',
    'A.8.5 - Secure authentication',
  ],
  nistCsfFunctions: [
    'PR.AC-1 - Identities and credentials are managed',
    'PR.AC-7 - Users, devices, and assets are authenticated',
  ],
  cisControls: [
    'CIS-5 - Account Management',
    'CIS-6 - Access Control Management',
  ],
  gdprArticles: [
    'Article 32(1)(b) - Ability to ensure ongoing confidentiality',
  ],
  nis2Requirements: [
    'Article 21(2)(h) - Access control and asset management',
  ],
  craRequirements: [
    'Annex I Part I (1) - Protection against unauthorized access',
  ],
};
```

### Automated Compliance Checking

```typescript
// ✅ GOOD: Automated compliance validation
interface ComplianceCheck {
  readonly framework: string;
  readonly controlId: string;
  readonly automated: boolean;
  readonly testCommand: string;
  readonly passingCriteria: string;
}

const COMPLIANCE_CHECKS: readonly ComplianceCheck[] = [
  {
    framework: 'ISO 27001',
    controlId: 'A.8.8 - Management of technical vulnerabilities',
    automated: true,
    testCommand: 'npm audit --audit-level=high',
    passingCriteria: 'Zero high or critical vulnerabilities',
  },
  {
    framework: 'NIST CSF',
    controlId: 'DE.CM-08 - Vulnerability scans are performed',
    automated: true,
    testCommand: 'npm run security-scan',
    passingCriteria: 'All scans pass with no critical findings',
  },
  {
    framework: 'CIS Controls',
    controlId: 'CIS-7.1 - Establish and Maintain Vulnerability Management',
    automated: true,
    testCommand: 'npm run audit && npm run snyk-test',
    passingCriteria: 'No critical vulnerabilities reported',
  },
];
```

## Compliance Documentation Requirements

### Evidence Collection

**RULE**: Maintain evidence for all compliance controls.

```typescript
interface ComplianceEvidence {
  readonly controlId: string;
  readonly framework: string;
  readonly evidenceType: 'policy' | 'procedure' | 'technical' | 'audit';
  readonly evidenceLocation: string;
  readonly lastReviewed: Date;
  readonly nextReview: Date;
}

// ✅ GOOD: Structured compliance evidence
const EVIDENCE_COLLECTION: readonly ComplianceEvidence[] = [
  {
    controlId: 'A.8.25',
    framework: 'ISO 27001:2022',
    evidenceType: 'policy',
    evidenceLocation: 'https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md',
    lastReviewed: new Date('2026-01-25'),
    nextReview: new Date('2027-01-25'),
  },
  {
    controlId: 'PR.IP-01',
    framework: 'NIST CSF 2.0',
    evidenceType: 'technical',
    evidenceLocation: 'https://github.com/Hack23/cia-compliance-manager/.github/workflows/security-scan.yml',
    lastReviewed: new Date('2026-02-10'),
    nextReview: new Date('2026-05-10'),
  },
];
```

## Enforcement Rules

### MUST (Critical - Block PR if violated)
1. Security features MUST be mapped to applicable compliance frameworks
2. Automated compliance checks MUST pass before merge
3. Evidence MUST be documented for all implemented controls
4. GDPR data protection principles MUST be followed for all PII handling
5. CRA requirements MUST be met for product releases
6. Critical and high-severity vulnerabilities MUST be remediated per SLA
7. Compliance documentation MUST be kept current

### SHOULD (High priority - Require justification)
1. Implement ISO 27001:2022 controls relevant to the system
2. Map features to NIST CSF 2.0 functions
3. Document NIS2 compliance measures
4. Maintain CIS Controls implementation evidence
5. Conduct quarterly compliance reviews
6. Update Compliance Checklist with implementation status
7. Perform annual compliance audits

### MAY (Recommended - Best practice)
1. Pursue ISO 27001 certification
2. Engage external compliance auditors
3. Implement compliance automation tools
4. Participate in compliance communities
5. Share compliance lessons learned
6. Contribute to compliance standards development

## Quick Decision Guide

**When implementing authentication:**
→ Map to ISO 27001 A.8.5, NIST PR.AC-1, CIS-5/6
→ Implement MFA, secure credential storage
→ Document GDPR Article 32 measures
→ Test authentication bypass scenarios

**When handling personal data:**
→ Apply GDPR data minimization principle
→ Implement encryption per ISO 27001 A.8.24
→ Document data classification per CLASSIFICATION.md
→ Enable right to erasure functionality

**When releasing products:**
→ Verify CRA conformity assessment complete
→ Ensure secure by default configuration
→ Publish vulnerability disclosure policy
→ Define support period clearly

**When managing third parties:**
→ Follow Third Party Management policy
→ Assess vendor compliance certifications
→ Document supply chain security per NIS2
→ Review vendor risk quarterly

## Remember

**Compliance is not a checkbox exercise. It's a continuous commitment to systematic security management and regulatory adherence.**

Every feature has compliance implications. Map controls, gather evidence, validate continuously.

## Related Resources

### Hack23 ISMS Compliance Framework
- [✅ Compliance Checklist](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Compliance_Checklist.md) - Unified 240+ control tracking
- [📋 CRA Conformity Assessment Process](https://github.com/Hack23/ISMS-PUBLIC/blob/main/CRA_Conformity_Assessment_Process.md)
- [🏷️ CLASSIFICATION Framework](https://github.com/Hack23/ISMS-PUBLIC/blob/main/CLASSIFICATION.md)
- [🔐 Information Security Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Information_Security_Policy.md)

### Framework Standards
- [ISO/IEC 27001:2022](https://www.iso.org/standard/27001)
- [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework)
- [CIS Controls v8.1](https://www.cisecurity.org/controls/)
- [GDPR Official Text](https://gdpr-info.eu/)
- [NIS2 Directive](https://www.enisa.europa.eu/topics/cybersecurity-policy/nis-directive-new)
- [EU Cyber Resilience Act](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act)
