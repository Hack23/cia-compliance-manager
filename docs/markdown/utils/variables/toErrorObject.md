[**CIA Compliance Manager Documentation v1.1.2**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / toErrorObject

# Variable: toErrorObject()

> **toErrorObject**: (`err`) => `Error`

Defined in: [utils/index.ts:225](https://github.com/Hack23/cia-compliance-manager/blob/9c3f9c0212e00ca1f7e7e22ddf0d1c98efb3e2be/src/utils/index.ts#L225)

Converts any error value to an Error object

Handles various error types including Error objects, objects with message
properties, strings, and other primitives. Essential for consistent error
handling across the application.

## Parameters

### err

`unknown`

The error value to convert (can be any type)

## Returns

`Error`

An Error object with appropriate message

## Example

```typescript
// Convert Error object (passthrough)
toErrorObject(new Error('Failed'))  // Error: Failed

// Convert string
toErrorObject('Network timeout')    // Error: Network timeout

// Convert object with message
toErrorObject({ message: 'Invalid data' })  // Error: Invalid data

// Convert number
toErrorObject(404)                  // Error: 404

// Usage in catch blocks
try {
  await riskyOperation();
} catch (err) {
  const error = toErrorObject(err);
  logger.error(error.message);
}
```
