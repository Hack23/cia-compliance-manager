[**CIA Compliance Manager Diagrams v1.0.4**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/securityLevelUtils](../README.md) / getSecurityLevelGap

# Function: getSecurityLevelGap()

> **getSecurityLevelGap**(`currentLevel`, `requiredLevel`): `number`

Defined in: [utils/securityLevelUtils.ts:342](https://github.com/Hack23/cia-compliance-manager/blob/0b7da06a2d009cc9cac58e6400d72865b757f5d4/src/utils/securityLevelUtils.ts#L342)

Get the gap between current and required security levels

Calculates the numeric difference between two security levels.
Positive values indicate current level exceeds requirements,
negative values indicate a gap that needs to be addressed.

## Parameters

### currentLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Current security level

### requiredLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Required/target security level

## Returns

`number`

Number of levels gap (positive if current > required, negative if current < required)

## Example

```typescript
getSecurityLevelGap('High', 'Moderate')      // 1 (exceeds by 1 level)
getSecurityLevelGap('Low', 'High')           // -2 (falls short by 2 levels)
getSecurityLevelGap('Moderate', 'Moderate')  // 0 (meets exactly)

// Use for gap analysis
const gap = getSecurityLevelGap(currentLevel, requiredLevel);
if (gap < 0) {
  console.log(`Need to increase security by ${Math.abs(gap)} level(s)`);
} else if (gap > 0) {
  console.log(`Security exceeds requirements by ${gap} level(s)`);
}
```
