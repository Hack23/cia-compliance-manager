[**CIA Compliance Manager Diagrams v1.1.24**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/securityLevelUtils](../README.md) / asSecurityLevel

# Function: asSecurityLevel()

> **asSecurityLevel**(`value`, `fallback?`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/securityLevelUtils.ts:540](https://github.com/Hack23/cia-compliance-manager/blob/38f6f5c07abe26db22d63c793ea812e50d687ce5/src/utils/securityLevelUtils.ts#L540)

Convert string to security level, with fallback

## Parameters

### value

`string`

Value to convert

### fallback?

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `"None"`

Fallback level if invalid

## Returns

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Valid security level
