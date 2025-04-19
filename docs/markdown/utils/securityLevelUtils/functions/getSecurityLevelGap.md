[**CIA Compliance Manager Documentation v0.8.11**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/securityLevelUtils](../README.md) / getSecurityLevelGap

# Function: getSecurityLevelGap()

> **getSecurityLevelGap**(`currentLevel`, `requiredLevel`): `number`

Defined in: [utils/securityLevelUtils.ts:205](https://github.com/Hack23/cia-compliance-manager/blob/d6eede30e4f01622fe18187e98b207e9a06a781f/src/utils/securityLevelUtils.ts#L205)

Get the gap between current and required security levels

## Parameters

### currentLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Current security level

### requiredLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Required security level

## Returns

`number`

Number of levels gap (negative if current is lower than required)
