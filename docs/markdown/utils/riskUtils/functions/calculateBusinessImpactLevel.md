[**CIA Compliance Manager Documentation v1.1.4**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/riskUtils](../README.md) / calculateBusinessImpactLevel

# Function: calculateBusinessImpactLevel()

> **calculateBusinessImpactLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [utils/riskUtils.ts:389](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/utils/riskUtils.ts#L389)

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
