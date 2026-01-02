[**CIA Compliance Manager Documentation v1.1.5**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / formatError

# Variable: formatError()

> **formatError**: (`err`, `prefix?`) => `string`

Defined in: [utils/index.ts:225](https://github.com/Hack23/cia-compliance-manager/blob/a17ff8a572d7423ca01410dd8a5a66308c170558/src/utils/index.ts#L225)

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
