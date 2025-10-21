[**CIA Compliance Manager Diagrams v0.8.33**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/riskUtils](../README.md) / calculateRiskScore

# Function: calculateRiskScore()

> **calculateRiskScore**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `number`

Defined in: [utils/riskUtils.ts:176](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/utils/riskUtils.ts#L176)

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
