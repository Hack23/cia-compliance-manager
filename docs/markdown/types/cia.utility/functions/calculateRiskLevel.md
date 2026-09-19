[**CIA Compliance Manager — Markdown Documentation v1.1.150**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia.utility](../README.md) / calculateRiskLevel

# Function: calculateRiskLevel()

> **calculateRiskLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [types/cia.utility.ts:115](https://github.com/Hack23/cia-compliance-manager/blob/dd6bd7695fe8d1d3efd6e251f39a0fbab3b0db3c/src/types/cia.utility.ts#L115)

Calculate risk level based on security levels

## Parameters

### availabilityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Confidentiality security level

## Returns

`string`

Risk level (Critical, High, Medium, Low, Minimal)
