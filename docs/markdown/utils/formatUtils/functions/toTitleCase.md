[**CIA Compliance Manager Documentation v1.1.16**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/formatUtils](../README.md) / toTitleCase

# Function: toTitleCase()

> **toTitleCase**(`str`): `string`

Defined in: [utils/formatUtils.ts:39](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/utils/formatUtils.ts#L39)

Converts a string to title case

Transforms strings by capitalizing the first letter of each word and
lowercasing the rest. Useful for formatting security level names,
component labels, and user-facing text.

## Parameters

### str

`string`

The string to convert to title case

## Returns

`string`

The title-cased string

## Example

```typescript
toTitleCase('hello world')           // 'Hello World'
toTitleCase('SECURITY LEVEL')        // 'Security Level'
toTitleCase('confidentiality')       // 'Confidentiality'
toTitleCase('risk-based approach')   // 'Risk-Based Approach'
toTitleCase('multi-factor authentication') // 'Multi-Factor Authentication'

// Usage in display
const displayName = toTitleCase(component);
<h2>{displayName} Analysis</h2>
```
