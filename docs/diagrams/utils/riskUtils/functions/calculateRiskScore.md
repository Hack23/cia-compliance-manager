[**CIA Compliance Manager Diagrams v1.1.26**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/riskUtils](../README.md) / calculateRiskScore

# Function: calculateRiskScore()

> **calculateRiskScore**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `number`

Defined in: [utils/riskUtils.ts:188](https://github.com/Hack23/cia-compliance-manager/blob/5f2722b27ad5a860c0c32d7458a8ddb0e3dddde9/src/utils/riskUtils.ts#L188)

Calculate risk score from security levels

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

## Returns

`number`

Risk score (0-100)
