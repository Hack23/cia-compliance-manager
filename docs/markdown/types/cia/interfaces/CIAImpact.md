[**CIA Compliance Manager Documentation v0.9.2**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/cia](../README.md) / CIAImpact

# Interface: CIAImpact

Defined in: [types/cia.ts:453](https://github.com/Hack23/cia-compliance-manager/blob/4a2010ba7d0748aab2dadaf655c5204c6a96bd65/src/types/cia.ts#L453)

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

Defined in: [types/cia.ts:455](https://github.com/Hack23/cia-compliance-manager/blob/4a2010ba7d0748aab2dadaf655c5204c6a96bd65/src/types/cia.ts#L455)

Availability impact assessment

***

### confidentiality

> **confidentiality**: [`ConfidentialityImpact`](ConfidentialityImpact.md)

Defined in: [types/cia.ts:461](https://github.com/Hack23/cia-compliance-manager/blob/4a2010ba7d0748aab2dadaf655c5204c6a96bd65/src/types/cia.ts#L461)

Confidentiality impact assessment

***

### integrity

> **integrity**: [`IntegrityImpact`](IntegrityImpact.md)

Defined in: [types/cia.ts:458](https://github.com/Hack23/cia-compliance-manager/blob/4a2010ba7d0748aab2dadaf655c5204c6a96bd65/src/types/cia.ts#L458)

Integrity impact assessment
