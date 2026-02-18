[**CIA Compliance Manager Documentation v1.1.20**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / handleWidgetError

# Variable: handleWidgetError()

> **handleWidgetError**: (`error`) => `string`

Defined in: [utils/index.ts:147](https://github.com/Hack23/cia-compliance-manager/blob/c2ee7b2fcb69460ebb29176ad9c216fcb0830779/src/utils/index.ts#L147)

Handle widget errors and format error messages consistently

Provides consistent error message formatting across all widgets,
handling null/undefined errors gracefully with fallback messages.

## Parameters

### error

Error object or null/undefined

`Error` | `null` | `undefined`

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
