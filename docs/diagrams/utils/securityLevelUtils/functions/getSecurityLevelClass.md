[**CIA Compliance Manager Diagrams v1.1.13**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/securityLevelUtils](../README.md) / getSecurityLevelClass

# Function: getSecurityLevelClass()

> **getSecurityLevelClass**(`level`): `string`

Defined in: [utils/securityLevelUtils.ts:453](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/utils/securityLevelUtils.ts#L453)

Determines the appropriate CSS classes for displaying a security level

Returns Tailwind CSS classes with color coding that visually represents
security level severity. Includes dark mode support. Red=None, Yellow=Low,
Blue=Moderate, Green=High, Purple=Very High.

## Parameters

### level

`string`

The security level (string or SecurityLevel enum)

## Returns

`string`

CSS class string for styling the security level badge/indicator

## Example

```typescript
getSecurityLevelClass('None')        
// "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"

getSecurityLevelClass('High')        
// "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"

// Use in components
<span className={`px-2 py-1 rounded ${getSecurityLevelClass(level)}`}>
  {level}
</span>
```
