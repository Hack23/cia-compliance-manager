[**CIA Compliance Manager Documentation v1.1.14**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / handleWidgetError

# Variable: handleWidgetError()

> **handleWidgetError**: (`error`) => `string`

Defined in: [utils/index.ts:147](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/utils/index.ts#L147)

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
