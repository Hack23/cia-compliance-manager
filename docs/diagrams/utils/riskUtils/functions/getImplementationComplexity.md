[**CIA Compliance Manager Diagrams v0.8.15**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/riskUtils](../README.md) / getImplementationComplexity

# Function: getImplementationComplexity()

> **getImplementationComplexity**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [utils/riskUtils.ts:412](https://github.com/Hack23/cia-compliance-manager/blob/50a3bb1fa64948444e36c06fee075b5043350db0/src/utils/riskUtils.ts#L412)

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
