[**CIA Compliance Manager Diagrams v0.9.0**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / getSecurityLevelValue

# Variable: getSecurityLevelValue()

> **getSecurityLevelValue**: (`level`) => `number`

Defined in: [utils/index.ts:111](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/utils/index.ts#L111)

Get numeric value for a security level (0-4)

Converts SecurityLevel enum values to numeric scores for comparison,
calculation, and sorting operations. Returns 0 for invalid levels.

## Parameters

### level

`string`

Security level to convert (SecurityLevel or string)

## Returns

`number`

Numeric value: None=0, Low=1, Moderate=2, High=3, Very High=4

## Example

```typescript
getSecurityLevelValue('None')         // 0
getSecurityLevelValue('Low')          // 1
getSecurityLevelValue('Moderate')     // 2
getSecurityLevelValue('High')         // 3
getSecurityLevelValue('Very High')    // 4
getSecurityLevelValue('invalid')      // 0 (invalid input)

// Use for comparison
const isHighEnough = getSecurityLevelValue(currentLevel) >= getSecurityLevelValue('High');
```
