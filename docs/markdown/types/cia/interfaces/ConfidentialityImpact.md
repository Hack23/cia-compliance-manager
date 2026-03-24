[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia](../README.md) / ConfidentialityImpact

# Interface: ConfidentialityImpact

Defined in: [types/cia.ts:415](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia.ts#L415)

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

Defined in: [types/cia.ts:345](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia.ts#L345)

Security level associated with this impact

#### Inherited from

[`BaseImpact`](BaseImpact.md).[`level`](BaseImpact.md#level)

***

### description

> **description**: `string`

Defined in: [types/cia.ts:348](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia.ts#L348)

Human-readable description of the impact

#### Inherited from

[`BaseImpact`](BaseImpact.md).[`description`](BaseImpact.md#description)

***

### dataClassification

> **dataClassification**: `string`

Defined in: [types/cia.ts:417](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia.ts#L417)

Data classification level (e.g., "Public", "Internal", "Confidential", "Restricted")

***

### accessControls

> **accessControls**: `string`

Defined in: [types/cia.ts:420](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia.ts#L420)

Access control mechanisms required (e.g., "MFA", "RBAC", "encryption")
