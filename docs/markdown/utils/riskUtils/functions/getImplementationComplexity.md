[**CIA Compliance Manager — Markdown Documentation v1.1.158**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/riskUtils](../README.md) / getImplementationComplexity

# Function: getImplementationComplexity()

> **getImplementationComplexity**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [utils/riskUtils.ts:417](https://github.com/Hack23/cia-compliance-manager/blob/65d61d3ef115f9c7c0045d3370762b4013c56a97/src/utils/riskUtils.ts#L417)

Determines the implementation complexity based on security levels

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

The implementation complexity as a string
