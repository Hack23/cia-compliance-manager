[**CIA Compliance Manager — Markdown Documentation v1.1.170**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/riskUtils](../README.md) / calculateRiskScore

# Function: calculateRiskScore()

> **calculateRiskScore**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `number`

Defined in: [utils/riskUtils.ts:181](https://github.com/Hack23/cia-compliance-manager/blob/276996e15a71466c7b9b1aed3e1a103db89356a5/src/utils/riskUtils.ts#L181)

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
