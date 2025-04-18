[**CIA Compliance Manager Diagrams v0.8.8**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / calculateRiskLevel

# Function: calculateRiskLevel()

> **calculateRiskLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [types/cia.ts:168](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/cia.ts#L168)

Calculate risk level based on security levels

## Parameters

### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Confidentiality security level

## Returns

`string`

Risk level string
