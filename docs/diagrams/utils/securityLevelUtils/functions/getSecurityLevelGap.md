[**CIA Compliance Manager Diagrams v0.8.14**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/securityLevelUtils](../README.md) / getSecurityLevelGap

# Function: getSecurityLevelGap()

> **getSecurityLevelGap**(`currentLevel`, `requiredLevel`): `number`

Defined in: [utils/securityLevelUtils.ts:206](https://github.com/Hack23/cia-compliance-manager/blob/257dd569f432a46611a1746c832a7e3d29232229/src/utils/securityLevelUtils.ts#L206)

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
