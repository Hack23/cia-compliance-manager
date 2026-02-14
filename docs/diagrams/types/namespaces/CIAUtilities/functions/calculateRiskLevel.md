[**CIA Compliance Manager Diagrams v1.1.18**](../../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../../modules.md) / [types](../../../README.md) / [CIAUtilities](../README.md) / calculateRiskLevel

# Function: calculateRiskLevel()

> **calculateRiskLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [types/cia.utility.ts:129](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/types/cia.utility.ts#L129)

Calculate risk level based on security levels

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../cia/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../../cia/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../../cia/type-aliases/SecurityLevel.md)

Confidentiality security level

## Returns

`string`

Risk level (Critical, High, Medium, Low, Minimal)
