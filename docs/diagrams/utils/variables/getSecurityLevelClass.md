[**CIA Compliance Manager — UML Diagrams v1.1.115**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / getSecurityLevelClass

# Variable: getSecurityLevelClass

> **getSecurityLevelClass**: (`level`) => `string`

Defined in: [utils/index.ts:121](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/utils/index.ts#L121)

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
