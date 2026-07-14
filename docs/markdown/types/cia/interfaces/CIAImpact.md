[**CIA Compliance Manager — Markdown Documentation v1.1.109**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia](../README.md) / CIAImpact

# Interface: CIAImpact

Defined in: [types/cia.ts:448](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/cia.ts#L448)

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

Defined in: [types/cia.ts:450](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/cia.ts#L450)

Availability impact assessment

***

### integrity

> **integrity**: [`IntegrityImpact`](IntegrityImpact.md)

Defined in: [types/cia.ts:453](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/cia.ts#L453)

Integrity impact assessment

***

### confidentiality

> **confidentiality**: [`ConfidentialityImpact`](ConfidentialityImpact.md)

Defined in: [types/cia.ts:456](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/cia.ts#L456)

Confidentiality impact assessment
