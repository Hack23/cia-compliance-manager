[**CIA Compliance Manager Documentation v1.1.21**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / asSecurityLevel

# Variable: asSecurityLevel()

> **asSecurityLevel**: (`value`, `fallback`) => [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/index.ts:128](https://github.com/Hack23/cia-compliance-manager/blob/88f0f4c85924bcbc12455a443cef3ddc741972e8/src/utils/index.ts#L128)

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
