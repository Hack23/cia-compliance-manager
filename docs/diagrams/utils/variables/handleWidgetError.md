[**CIA Compliance Manager — UML Diagrams v1.1.123**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / handleWidgetError

# Variable: handleWidgetError

> **handleWidgetError**: (`error`) => `string`

Defined in: [utils/index.ts:134](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/utils/index.ts#L134)

Handle widget errors and format error messages consistently

Provides consistent error message formatting across all widgets,
handling null/undefined errors gracefully with fallback messages.

## Parameters

### error

`Error` \| `null` \| `undefined`

Error object or null/undefined

## Returns

`string`

Formatted error message string

## Example

```typescript
handleWidgetError(new Error('Network failed'))  // 'Error: Network failed'
handleWidgetError(null)                         // 'Error: Unknown error'
handleWidgetError(undefined)                    // 'Error: Unknown error'

// Usage in error boundary
try {
  await loadWidgetData();
} catch (error) {
  const message = handleWidgetError(error as Error);
  showNotification(message);
}
```
