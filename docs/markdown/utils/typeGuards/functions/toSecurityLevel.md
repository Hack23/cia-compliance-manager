[**CIA Compliance Manager Documentation v1.1.14**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/typeGuards](../README.md) / toSecurityLevel

# Function: toSecurityLevel()

> **toSecurityLevel**(`value`, `fallback`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/typeGuards.ts:929](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/utils/typeGuards.ts#L929)

Safely converts a string to a SecurityLevel, with fallback

## Parameters

### value

`unknown`

The value to convert

### fallback

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `"Moderate"`

The fallback value (defaults to "Moderate")

## Returns

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

A valid SecurityLevel
