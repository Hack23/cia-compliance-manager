[**CIA Compliance Manager Diagrams v0.8.34**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/securityLevelUtils](../README.md) / getSecurityLevelGap

# Function: getSecurityLevelGap()

> **getSecurityLevelGap**(`currentLevel`, `requiredLevel`): `number`

Defined in: [utils/securityLevelUtils.ts:206](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/utils/securityLevelUtils.ts#L206)

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
