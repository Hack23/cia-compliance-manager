[**CIA Compliance Manager Documentation v1.1.12**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/securityLevelUtils](../README.md) / asSecurityLevel

# Function: asSecurityLevel()

> **asSecurityLevel**(`value`, `fallback`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/securityLevelUtils.ts:540](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/utils/securityLevelUtils.ts#L540)

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
