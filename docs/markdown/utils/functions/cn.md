[**CIA Compliance Manager Documentation v1.1.15**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / cn

# Function: cn()

> **cn**(...`classes`): `string`

Defined in: [utils/tailwindClassHelpers.ts:294](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/utils/tailwindClassHelpers.ts#L294)

Combine Tailwind classes with proper handling of conditionals

This utility function merges multiple class strings, filtering out
falsy values (false, null, undefined) for conditional styling.

## Parameters

### classes

...(`string` \| `false` \| `null` \| `undefined`)[]

Variable number of class strings or conditional values

## Returns

`string`

Combined class string with falsy values filtered out

## Example

```tsx
// Basic usage
cn('text-lg', 'font-bold') // 'text-lg font-bold'

// Conditional classes
cn('base-class', isActive && 'active-class', 'another-class')
// Result: 'base-class active-class another-class' (if isActive is true)
// Result: 'base-class another-class' (if isActive is false)

// With null/undefined
cn('text-lg', null, undefined, 'font-bold') // 'text-lg font-bold'

// Practical example
function Button({ primary, disabled }) {
  return (
    <button className={cn(
      'btn',
      primary && 'btn-primary',
      !primary && 'btn-secondary',
      disabled && 'opacity-50'
    )}>
      Click me
    </button>
  );
}
```
