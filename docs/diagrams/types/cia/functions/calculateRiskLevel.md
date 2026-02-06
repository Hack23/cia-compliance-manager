[**CIA Compliance Manager Diagrams v1.1.17**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/cia](../README.md) / calculateRiskLevel

# Function: calculateRiskLevel()

> **calculateRiskLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [types/cia.ts:181](https://github.com/Hack23/cia-compliance-manager/blob/64549ac2e28eb854ca1acff8c4df7f34bf49dfaa/src/types/cia.ts#L181)

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
