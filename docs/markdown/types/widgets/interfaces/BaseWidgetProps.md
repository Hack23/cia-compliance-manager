[**CIA Compliance Manager Documentation v0.9.0**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/widgets](../README.md) / BaseWidgetProps

# Interface: BaseWidgetProps

Defined in: [types/widgets.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/types/widgets.ts#L31)

Base widget props shared by all widgets

## Extends

- [`CommonWidgetProps`](../../interfaces/CommonWidgetProps.md)

## Extended by

- [`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md)

## Properties

### children?

> `optional` **children**: `ReactNode`

Defined in: [types/widgets.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/types/widgets.ts#L35)

Optional children elements

***

### className?

> `optional` **className**: `string`

Defined in: [types/widget-props.ts:123](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/types/widget-props.ts#L123)

Optional CSS class name for custom styling

Allows consumers to apply custom styles via CSS classes.
Use Tailwind CSS classes or custom CSS classes.

#### Example

```ts
"mt-4 border-2 rounded-lg"
```

#### Inherited from

[`CommonWidgetProps`](../../interfaces/CommonWidgetProps.md).[`className`](../../interfaces/CommonWidgetProps.md#classname)

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widget-props.ts:134](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/types/widget-props.ts#L134)

Optional test ID for automated testing

Used by testing frameworks (Cypress, Vitest) to locate
and interact with the component. Should follow the pattern
defined in testIds constants.

#### Example

```ts
"security-widget-availability"
```

#### Inherited from

[`CommonWidgetProps`](../../interfaces/CommonWidgetProps.md).[`testId`](../../interfaces/CommonWidgetProps.md#testid)
