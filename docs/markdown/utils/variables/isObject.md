[**CIA Compliance Manager Documentation v1.1.16**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / isObject

# Variable: isObject()

> **isObject**: (`value`) => value is Record\<string \| number \| symbol, unknown\>

Defined in: [utils/index.ts:207](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/utils/index.ts#L207)

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
