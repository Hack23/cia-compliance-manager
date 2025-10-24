[**CIA Compliance Manager Documentation v0.8.34**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/riskUtils](../README.md) / calculateRiskScore

# Function: calculateRiskScore()

> **calculateRiskScore**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `number`

Defined in: [utils/riskUtils.ts:176](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/utils/riskUtils.ts#L176)

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
