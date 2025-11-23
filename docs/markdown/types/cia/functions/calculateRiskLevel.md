[**CIA Compliance Manager Documentation v1.0.0**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/cia](../README.md) / calculateRiskLevel

# Function: calculateRiskLevel()

> **calculateRiskLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [types/cia.ts:181](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/types/cia.ts#L181)

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
