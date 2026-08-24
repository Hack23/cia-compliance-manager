[**CIA Compliance Manager — Markdown Documentation v1.1.137**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/riskUtils](../README.md) / calculateBusinessImpactLevel

# Function: calculateBusinessImpactLevel()

> **calculateBusinessImpactLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [utils/riskUtils.ts:382](https://github.com/Hack23/cia-compliance-manager/blob/93f1d84ade636c2035c7999465a9c27157ae0ace/src/utils/riskUtils.ts#L382)

Calculates the overall business impact level based on security levels

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The availability security level

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The integrity security level

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The confidentiality security level

## Returns

`string`

The calculated impact level as a string
