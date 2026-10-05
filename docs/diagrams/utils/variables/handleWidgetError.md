[**CIA Compliance Manager — UML Diagrams v1.1.160**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / handleWidgetError

# Variable: handleWidgetError

> **handleWidgetError**: (`error`) => `string`

Defined in: [utils/index.ts:134](https://github.com/Hack23/cia-compliance-manager/blob/65d80050336fcb6ec803a647b772abde27cf817d/src/utils/index.ts#L134)

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
