[**CIA Compliance Manager Diagrams v1.0.5**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / getSecurityLevelClass

# Variable: getSecurityLevelClass()

> **getSecurityLevelClass**: (`level`) => `string`

Defined in: [utils/index.ts:108](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/utils/index.ts#L108)

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
// "bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-300"

getSecurityLevelClass('High')        
// "bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-300"

// Use in components
<span className={`px-2 py-1 rounded ${getSecurityLevelClass(level)}`}>
  {level}
</span>
```
