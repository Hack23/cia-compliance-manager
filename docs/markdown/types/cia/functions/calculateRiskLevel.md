[**CIA Compliance Manager Documentation v0.8.33**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/cia](../README.md) / calculateRiskLevel

# Function: calculateRiskLevel()

> **calculateRiskLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [types/cia.ts:168](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/types/cia.ts#L168)

Calculate risk level based on security levels

## Parameters

### availabilityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

Confidentiality security level

## Returns

`string`

Risk level string
