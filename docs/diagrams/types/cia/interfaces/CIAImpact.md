[**CIA Compliance Manager Diagrams v1.1.7**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/cia](../README.md) / CIAImpact

# Interface: CIAImpact

Defined in: [types/cia.ts:453](https://github.com/Hack23/cia-compliance-manager/blob/6efa8b7e4173b2ed17e0594b4b26c48a1b704d1e/src/types/cia.ts#L453)

Complete CIA impact model

Comprehensive impact assessment covering all three CIA triad components.
Used to communicate the full security posture and requirements.

## Example

```typescript
const ciaImpact: CIAImpact = {
  availability: {
    level: 'High',
    description: 'High availability required',
    uptime: '99.9%',
    recoveryTime: '< 1 hour'
  },
  integrity: {
    level: 'Very High',
    description: 'Data integrity critical',
    dataAccuracy: 'Zero tolerance',
    verificationSteps: 'Cryptographic validation'
  },
  confidentiality: {
    level: 'High',
    description: 'Sensitive data protection',
    dataClassification: 'Confidential',
    accessControls: 'MFA + RBAC'
  }
};
```

## Properties

### availability

> **availability**: [`AvailabilityImpact`](AvailabilityImpact.md)

Defined in: [types/cia.ts:455](https://github.com/Hack23/cia-compliance-manager/blob/6efa8b7e4173b2ed17e0594b4b26c48a1b704d1e/src/types/cia.ts#L455)

Availability impact assessment

***

### confidentiality

> **confidentiality**: [`ConfidentialityImpact`](ConfidentialityImpact.md)

Defined in: [types/cia.ts:461](https://github.com/Hack23/cia-compliance-manager/blob/6efa8b7e4173b2ed17e0594b4b26c48a1b704d1e/src/types/cia.ts#L461)

Confidentiality impact assessment

***

### integrity

> **integrity**: [`IntegrityImpact`](IntegrityImpact.md)

Defined in: [types/cia.ts:458](https://github.com/Hack23/cia-compliance-manager/blob/6efa8b7e4173b2ed17e0594b4b26c48a1b704d1e/src/types/cia.ts#L458)

Integrity impact assessment
