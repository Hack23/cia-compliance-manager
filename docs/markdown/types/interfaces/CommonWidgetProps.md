[**CIA Compliance Manager Documentation v0.9.1**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [types](../README.md) / CommonWidgetProps

# Interface: CommonWidgetProps

Defined in: [types/widget-props.ts:114](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/widget-props.ts#L114)

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

- [`BaseWidgetProps`](../widgets/interfaces/BaseWidgetProps.md)

## Properties

### className?

> `optional` **className**: `string`

Defined in: [types/widget-props.ts:123](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/widget-props.ts#L123)

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

Defined in: [types/widget-props.ts:134](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/widget-props.ts#L134)

Optional test ID for automated testing

Used by testing frameworks (Cypress, Vitest) to locate
and interact with the component. Should follow the pattern
defined in testIds constants.

#### Example

```ts
"security-widget-availability"
```
