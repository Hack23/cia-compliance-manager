[**CIA Compliance Manager — UML Diagrams v1.1.115**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / asSecurityLevel

# Variable: asSecurityLevel

> **asSecurityLevel**: (`value`, `fallback`) => [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/index.ts:116](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/utils/index.ts#L116)

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
