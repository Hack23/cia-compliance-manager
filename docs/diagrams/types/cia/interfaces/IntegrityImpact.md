[**CIA Compliance Manager — UML Diagrams v1.1.122**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/cia](../README.md) / IntegrityImpact

# Interface: IntegrityImpact

Defined in: [types/cia.ts:386](https://github.com/Hack23/cia-compliance-manager/blob/fdbd0224f5e379f45807637facf704ea40d9b47d/src/types/cia.ts#L386)

Impact associated with the integrity of the system

Describes data accuracy requirements and verification processes
for the selected integrity security level.

## Example

```typescript
const impact: IntegrityImpact = {
  level: 'Very High',
  description: 'Data must be tamper-proof with audit trails',
  dataAccuracy: 'Zero tolerance for unauthorized modifications',
  verificationSteps: 'Cryptographic signatures, audit logs, checksums'
};
```

## Extends

- [`BaseImpact`](BaseImpact.md)

## Properties

### level

> **level**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:340](https://github.com/Hack23/cia-compliance-manager/blob/fdbd0224f5e379f45807637facf704ea40d9b47d/src/types/cia.ts#L340)

Security level associated with this impact

#### Inherited from

[`BaseImpact`](BaseImpact.md).[`level`](BaseImpact.md#level)

***

### description

> **description**: `string`

Defined in: [types/cia.ts:343](https://github.com/Hack23/cia-compliance-manager/blob/fdbd0224f5e379f45807637facf704ea40d9b47d/src/types/cia.ts#L343)

Human-readable description of the impact

#### Inherited from

[`BaseImpact`](BaseImpact.md).[`description`](BaseImpact.md#description)

***

### dataAccuracy

> **dataAccuracy**: `string`

Defined in: [types/cia.ts:388](https://github.com/Hack23/cia-compliance-manager/blob/fdbd0224f5e379f45807637facf704ea40d9b47d/src/types/cia.ts#L388)

Expected data accuracy level and tolerance for errors

***

### verificationSteps

> **verificationSteps**: `string`

Defined in: [types/cia.ts:391](https://github.com/Hack23/cia-compliance-manager/blob/fdbd0224f5e379f45807637facf704ea40d9b47d/src/types/cia.ts#L391)

Verification and validation processes required
