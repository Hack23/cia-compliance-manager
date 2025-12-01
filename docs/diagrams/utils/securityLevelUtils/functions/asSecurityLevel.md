[**CIA Compliance Manager Diagrams v1.0.1**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/securityLevelUtils](../README.md) / asSecurityLevel

# Function: asSecurityLevel()

> **asSecurityLevel**(`value`, `fallback`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/securityLevelUtils.ts:540](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/utils/securityLevelUtils.ts#L540)

Convert string to security level, with fallback

## Parameters

### value

`string`

Value to convert

### fallback

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `"None"`

Fallback level if invalid

## Returns

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Valid security level
