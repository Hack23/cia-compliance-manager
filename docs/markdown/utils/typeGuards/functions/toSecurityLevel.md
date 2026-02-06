[**CIA Compliance Manager Documentation v1.1.16**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/typeGuards](../README.md) / toSecurityLevel

# Function: toSecurityLevel()

> **toSecurityLevel**(`value`, `fallback`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/typeGuards.ts:929](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/utils/typeGuards.ts#L929)

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
