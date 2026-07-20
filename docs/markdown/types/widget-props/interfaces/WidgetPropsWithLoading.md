[**CIA Compliance Manager — Markdown Documentation v1.1.116**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/widget-props](../README.md) / WidgetPropsWithLoading

# Interface: WidgetPropsWithLoading\<T\>

Defined in: [types/widget-props.ts:395](https://github.com/Hack23/cia-compliance-manager/blob/9ccce78f1d05ab6ac72d787643353220350a4be4/src/types/widget-props.ts#L395)

Widget props with loading state

Generic interface for widgets that load and display data asynchronously.

## Example

```typescript
interface MyData {
  value: number;
}

const props: WidgetPropsWithLoading<MyData> = {
  data: { value: 42 },
  loading: false,
  error: undefined
};
```

## Extends

- [`BaseWidgetProps`](BaseWidgetProps.md)

## Type Parameters

### T

`T`

Type of data being loaded

## Properties

### className?

> `optional` **className?**: `string`

Defined in: [types/widget-props.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/9ccce78f1d05ab6ac72d787643353220350a4be4/src/types/widget-props.ts#L124)

Optional CSS class name for custom styling

Allows consumers to apply custom styles via CSS classes.
Use Tailwind CSS classes or custom CSS classes.

#### Example

```ts
"mt-4 border-2 rounded-lg"
```

#### Inherited from

[`BaseWidgetProps`](BaseWidgetProps.md).[`className`](BaseWidgetProps.md#classname)

***

### testId?

> `optional` **testId?**: `string`

Defined in: [types/widget-props.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/9ccce78f1d05ab6ac72d787643353220350a4be4/src/types/widget-props.ts#L135)

Optional test ID for automated testing

Used by testing frameworks (Cypress, Vitest) to locate
and interact with the component. Should follow the pattern
defined in testIds constants.

#### Example

```ts
"security-widget-availability"
```

#### Inherited from

[`BaseWidgetProps`](BaseWidgetProps.md).[`testId`](BaseWidgetProps.md#testid)

***

### children?

> `optional` **children?**: `ReactNode`

Defined in: [types/widget-props.ts:243](https://github.com/Hack23/cia-compliance-manager/blob/9ccce78f1d05ab6ac72d787643353220350a4be4/src/types/widget-props.ts#L243)

Optional children elements

#### Inherited from

[`BaseWidgetProps`](BaseWidgetProps.md).[`children`](BaseWidgetProps.md#children)

***

### onError?

> `optional` **onError?**: (`error`) => `void`

Defined in: [types/widget-props.ts:249](https://github.com/Hack23/cia-compliance-manager/blob/9ccce78f1d05ab6ac72d787643353220350a4be4/src/types/widget-props.ts#L249)

Optional callback when widget encounters an error

#### Parameters

##### error

`Error`

Error that occurred

#### Returns

`void`

#### Inherited from

[`BaseWidgetProps`](BaseWidgetProps.md).[`onError`](BaseWidgetProps.md#onerror)

***

### data

> **data**: `T` \| `null`

Defined in: [types/widget-props.ts:399](https://github.com/Hack23/cia-compliance-manager/blob/9ccce78f1d05ab6ac72d787643353220350a4be4/src/types/widget-props.ts#L399)

Data to display in widget

***

### loading

> **loading**: `boolean`

Defined in: [types/widget-props.ts:404](https://github.com/Hack23/cia-compliance-manager/blob/9ccce78f1d05ab6ac72d787643353220350a4be4/src/types/widget-props.ts#L404)

If true, widget is loading data

***

### error?

> `optional` **error?**: `Error`

Defined in: [types/widget-props.ts:409](https://github.com/Hack23/cia-compliance-manager/blob/9ccce78f1d05ab6ac72d787643353220350a4be4/src/types/widget-props.ts#L409)

Error encountered while loading
