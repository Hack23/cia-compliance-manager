[**CIA Compliance Manager Documentation v1.1.4**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/securityLevelUtils](../README.md) / getSecurityLevelFromValue

# Function: getSecurityLevelFromValue()

> **getSecurityLevelFromValue**(`value`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/securityLevelUtils.ts:159](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/utils/securityLevelUtils.ts#L159)

Maps numeric values to security levels

Converts numeric security scores back to SecurityLevel enum values.
Useful for converting calculated scores or slider values to security levels.
Values outside 0-4 range default to 'None'.

## Parameters

### value

`number`

Numeric value (0-4), where higher numbers indicate stronger security

## Returns

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The corresponding security level

## Example

```typescript
getSecurityLevelFromValue(0)    // 'None'
getSecurityLevelFromValue(1)    // 'Low'
getSecurityLevelFromValue(2)    // 'Moderate'
getSecurityLevelFromValue(3)    // 'High'
getSecurityLevelFromValue(4)    // 'Very High'
getSecurityLevelFromValue(5)    // 'None' (out of range)
getSecurityLevelFromValue(-1)   // 'None' (out of range)

// Use with calculated average
const avgValue = Math.round((val1 + val2 + val3) / 3);
const overallLevel = getSecurityLevelFromValue(avgValue);
```
