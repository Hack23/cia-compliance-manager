[**CIA Compliance Manager Diagrams v0.8.18**](../../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../../modules.md) / [types](../../../README.md) / [CIAUtilities](../README.md) / calculateRiskLevel

# Function: calculateRiskLevel()

> **calculateRiskLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [types/cia.utility.ts:129](https://github.com/Hack23/cia-compliance-manager/blob/509f2f6138f4e24aa7fe1ae9432ec1ccefbe5f32/src/types/cia.utility.ts#L129)

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
