[**CIA Compliance Manager — UML Diagrams v1.1.108**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/cia](../README.md) / ConfidentialityImpact

# Interface: ConfidentialityImpact

Defined in: [types/cia.ts:410](https://github.com/Hack23/cia-compliance-manager/blob/c8774c5adae041afe27c3067f53da22f1a7cb253/src/types/cia.ts#L410)

Impact associated with the confidentiality of the system

Describes data classification and access control requirements
for the selected confidentiality security level.

## Example

```typescript
const impact: ConfidentialityImpact = {
  level: 'High',
  description: 'Data must be encrypted and access strictly controlled',
  dataClassification: 'Confidential - Restricted Access',
  accessControls: 'Multi-factor authentication, role-based access, encryption at rest and in transit'
};
```

## Extends

- [`BaseImpact`](BaseImpact.md)

## Properties

### level

> **level**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:340](https://github.com/Hack23/cia-compliance-manager/blob/c8774c5adae041afe27c3067f53da22f1a7cb253/src/types/cia.ts#L340)

Security level associated with this impact

#### Inherited from

[`BaseImpact`](BaseImpact.md).[`level`](BaseImpact.md#level)

***

### description

> **description**: `string`

Defined in: [types/cia.ts:343](https://github.com/Hack23/cia-compliance-manager/blob/c8774c5adae041afe27c3067f53da22f1a7cb253/src/types/cia.ts#L343)

Human-readable description of the impact

#### Inherited from

[`BaseImpact`](BaseImpact.md).[`description`](BaseImpact.md#description)

***

### dataClassification

> **dataClassification**: `string`

Defined in: [types/cia.ts:412](https://github.com/Hack23/cia-compliance-manager/blob/c8774c5adae041afe27c3067f53da22f1a7cb253/src/types/cia.ts#L412)

Data classification level (e.g., "Public", "Internal", "Confidential", "Restricted")

***

### accessControls

> **accessControls**: `string`

Defined in: [types/cia.ts:415](https://github.com/Hack23/cia-compliance-manager/blob/c8774c5adae041afe27c3067f53da22f1a7cb253/src/types/cia.ts#L415)

Access control mechanisms required (e.g., "MFA", "RBAC", "encryption")
