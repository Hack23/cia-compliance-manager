[**CIA Compliance Manager Documentation v1.1.11**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/cia](../README.md) / ConfidentialityImpact

# Interface: ConfidentialityImpact

Defined in: [types/cia.ts:415](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/types/cia.ts#L415)

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

### accessControls

> **accessControls**: `string`

Defined in: [types/cia.ts:420](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/types/cia.ts#L420)

Access control mechanisms required (e.g., "MFA", "RBAC", "encryption")

***

### dataClassification

> **dataClassification**: `string`

Defined in: [types/cia.ts:417](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/types/cia.ts#L417)

Data classification level (e.g., "Public", "Internal", "Confidential", "Restricted")

***

### description

> **description**: `string`

Defined in: [types/cia.ts:348](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/types/cia.ts#L348)

Human-readable description of the impact

#### Inherited from

[`BaseImpact`](BaseImpact.md).[`description`](BaseImpact.md#description)

***

### level

> **level**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:345](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/types/cia.ts#L345)

Security level associated with this impact

#### Inherited from

[`BaseImpact`](BaseImpact.md).[`level`](BaseImpact.md#level)
