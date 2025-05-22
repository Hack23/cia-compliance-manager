[**CIA Compliance Manager Diagrams v0.8.15**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/cia](../README.md) / calculateRiskLevel

# Function: calculateRiskLevel()

> **calculateRiskLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [types/cia.ts:168](https://github.com/Hack23/cia-compliance-manager/blob/50a3bb1fa64948444e36c06fee075b5043350db0/src/types/cia.ts#L168)

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
