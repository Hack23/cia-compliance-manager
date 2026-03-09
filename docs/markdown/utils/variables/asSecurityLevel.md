[**CIA Compliance Manager Documentation v1.1.28**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / asSecurityLevel

# Variable: asSecurityLevel()

> **asSecurityLevel**: (`value`, `fallback`) => [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/index.ts:128](https://github.com/Hack23/cia-compliance-manager/blob/6c4bbd75cd3a4f379a2a2228e6a1be5ddc7ed98b/src/utils/index.ts#L128)

Convert string to security level, with fallback

## Parameters

### value

`string`

Value to convert

### fallback?

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md) = `"None"`

Fallback level if invalid

## Returns

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Valid security level
