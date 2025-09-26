[**CIA Compliance Manager Diagrams v0.8.29**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/typeGuards](../README.md) / toSecurityLevel

# Function: toSecurityLevel()

> **toSecurityLevel**(`value`, `fallback`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/typeGuards.ts:872](https://github.com/Hack23/cia-compliance-manager/blob/5836b4c74e2010cd05eca63c0016fd711c628ec9/src/utils/typeGuards.ts#L872)

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
