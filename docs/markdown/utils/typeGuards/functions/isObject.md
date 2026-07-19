[**CIA Compliance Manager — Markdown Documentation v1.1.115**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/typeGuards](../README.md) / isObject

# Function: isObject()

> **isObject**(`value`): value is Record\<string \| number \| symbol, unknown\>

Defined in: [utils/typeGuards.ts:136](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/utils/typeGuards.ts#L136)

Type guard to check if a value is a non-null object

Useful for safely checking if a value is an object before accessing properties.
Filters out null, arrays, and primitive values.

## Parameters

### value

`unknown`

Value to check

## Returns

value is Record\<string \| number \| symbol, unknown\>

True if value is a non-null object (excludes arrays)

## Example

```typescript
isObject({})              // true
isObject({ key: 'val' })  // true
isObject(null)            // false
isObject([])              // false (arrays excluded)
isObject('string')        // false
isObject(123)             // false

// Usage in code
const data: unknown = getUserData();
if (isObject(data) && 'name' in data) {
  console.log(data.name); // Safe property access
}
```
