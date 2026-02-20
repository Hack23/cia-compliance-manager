[**CIA Compliance Manager Diagrams v1.1.22**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / asSecurityLevel

# Variable: asSecurityLevel()

> **asSecurityLevel**: (`value`, `fallback`) => [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/index.ts:128](https://github.com/Hack23/cia-compliance-manager/blob/83ec4592971af1db133b76cbdcec3934063462f5/src/utils/index.ts#L128)

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
