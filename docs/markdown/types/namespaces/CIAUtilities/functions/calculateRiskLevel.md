[**CIA Compliance Manager Documentation v1.1.29**](../../../../README.md)

***

[CIA Compliance Manager Documentation](../../../../modules.md) / [types](../../../README.md) / [CIAUtilities](../README.md) / calculateRiskLevel

# Function: calculateRiskLevel()

> **calculateRiskLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [types/cia.utility.ts:129](https://github.com/Hack23/cia-compliance-manager/blob/6b0efc4a0e6dc19fe754f64606c6464995b0f7f5/src/types/cia.utility.ts#L129)

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
