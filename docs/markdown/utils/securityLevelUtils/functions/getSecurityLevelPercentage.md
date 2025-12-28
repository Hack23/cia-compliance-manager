[**CIA Compliance Manager Documentation v1.1.0**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/securityLevelUtils](../README.md) / getSecurityLevelPercentage

# Function: getSecurityLevelPercentage()

> **getSecurityLevelPercentage**(`level`): `string`

Defined in: [utils/securityLevelUtils.ts:419](https://github.com/Hack23/cia-compliance-manager/blob/c466031910d76c5cbb596249d801f7ed60a95e63/src/utils/securityLevelUtils.ts#L419)

Provides a numerical representation of security levels for UI presentation

Converts security levels to percentage strings for use in progress bars,
gauges, and other visual indicators. Maps 0-4 scale to 0-100% range
in 25% increments.

## Parameters

### level

`string`

The security level (string or SecurityLevel enum)

## Returns

`string`

A percentage string (0%, 25%, 50%, 75%, or 100%)

## Example

```typescript
getSecurityLevelPercentage('None')        // "0%"
getSecurityLevelPercentage('Low')         // "25%"
getSecurityLevelPercentage('Moderate')    // "50%"
getSecurityLevelPercentage('High')        // "75%"
getSecurityLevelPercentage('Very High')   // "100%"

// Use in UI components
<ProgressBar value={getSecurityLevelPercentage(level)} />
```
