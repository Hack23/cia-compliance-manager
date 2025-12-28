[**CIA Compliance Manager Documentation v1.1.0**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [types](../README.md) / CommonWidgetProps

# Interface: CommonWidgetProps

Defined in: [types/widget-props.ts:115](https://github.com/Hack23/cia-compliance-manager/blob/c466031910d76c5cbb596249d801f7ed60a95e63/src/types/widget-props.ts#L115)

Common props shared by all widgets

Provides standard customization options that all widgets should support
for consistent styling and testing across the application.

## Example

```typescript
<MyWidget 
  className="custom-styles" 
  testId="my-widget-test" 
/>
```

## Extended by

- [`BaseWidgetProps`](BaseWidgetProps.md)

## Properties

### className?

> `optional` **className**: `string`

Defined in: [types/widget-props.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/c466031910d76c5cbb596249d801f7ed60a95e63/src/types/widget-props.ts#L124)

Optional CSS class name for custom styling

Allows consumers to apply custom styles via CSS classes.
Use Tailwind CSS classes or custom CSS classes.

#### Example

```ts
"mt-4 border-2 rounded-lg"
```

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widget-props.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/c466031910d76c5cbb596249d801f7ed60a95e63/src/types/widget-props.ts#L135)

Optional test ID for automated testing

Used by testing frameworks (Cypress, Vitest) to locate
and interact with the component. Should follow the pattern
defined in testIds constants.

#### Example

```ts
"security-widget-availability"
```
