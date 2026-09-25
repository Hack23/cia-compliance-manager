[**CIA Compliance Manager — Markdown Documentation v1.1.153**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/securityLevelUtils](../README.md) / getSecurityLevelValue

# Function: getSecurityLevelValue()

> **getSecurityLevelValue**(`level`): `number`

Defined in: [utils/securityLevelUtils.ts:105](https://github.com/Hack23/cia-compliance-manager/blob/aae220a35b85217ac74b619cb9128300e38ff3a0/src/utils/securityLevelUtils.ts#L105)

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
