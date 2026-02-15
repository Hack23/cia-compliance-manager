[**CIA Compliance Manager Diagrams v1.1.19**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/cia](../README.md) / IntegrityImpact

# Interface: IntegrityImpact

Defined in: [types/cia.ts:391](https://github.com/Hack23/cia-compliance-manager/blob/9dce5e80857b65e14d60f220240eac83c6163399/src/types/cia.ts#L391)

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

### dataAccuracy

> **dataAccuracy**: `string`

Defined in: [types/cia.ts:393](https://github.com/Hack23/cia-compliance-manager/blob/9dce5e80857b65e14d60f220240eac83c6163399/src/types/cia.ts#L393)

Expected data accuracy level and tolerance for errors

***

### description

> **description**: `string`

Defined in: [types/cia.ts:348](https://github.com/Hack23/cia-compliance-manager/blob/9dce5e80857b65e14d60f220240eac83c6163399/src/types/cia.ts#L348)

Human-readable description of the impact

#### Inherited from

[`BaseImpact`](BaseImpact.md).[`description`](BaseImpact.md#description)

***

### level

> **level**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:345](https://github.com/Hack23/cia-compliance-manager/blob/9dce5e80857b65e14d60f220240eac83c6163399/src/types/cia.ts#L345)

Security level associated with this impact

#### Inherited from

[`BaseImpact`](BaseImpact.md).[`level`](BaseImpact.md#level)

***

### verificationSteps

> **verificationSteps**: `string`

Defined in: [types/cia.ts:396](https://github.com/Hack23/cia-compliance-manager/blob/9dce5e80857b65e14d60f220240eac83c6163399/src/types/cia.ts#L396)

Verification and validation processes required
