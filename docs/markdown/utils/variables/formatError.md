[**CIA Compliance Manager — Markdown Documentation v1.1.132**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / formatError

# Variable: formatError

> **formatError**: (`err`, `prefix?`) => `string`

Defined in: [utils/index.ts:208](https://github.com/Hack23/cia-compliance-manager/blob/18c7e9fa5b86ac2162df1bb4c2600dea2227dddb/src/utils/index.ts#L208)

Formats an error for consistent logging with optional prefix

Converts errors to formatted strings suitable for logging, with optional
contextual prefix for better error traceability. Handles unknown error types
safely.

## Parameters

### err

`unknown`

The error to format (can be any type)

### prefix?

`string`

Optional prefix for context (e.g., 'API', 'Database', 'Widget')

## Returns

`string`

A formatted error message string

## Example

```typescript
// Without prefix
formatError(new Error('Connection failed'))
// 'Connection failed'

// With prefix for context
formatError(new Error('Timeout'), 'API Call')
// 'API Call: Timeout'

formatError('Invalid input', 'Validation')
// 'Validation: Invalid input'

// Usage in service methods
try {
  await fetchData();
} catch (err) {
  const message = formatError(err, 'DataService');
  console.error(message);  // 'DataService: Network error'
}
```
