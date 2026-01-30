[**CIA Compliance Manager Diagrams v1.1.14**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/riskUtils](../README.md) / getImplementationComplexity

# Function: getImplementationComplexity()

> **getImplementationComplexity**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [utils/riskUtils.ts:424](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/utils/riskUtils.ts#L424)

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
