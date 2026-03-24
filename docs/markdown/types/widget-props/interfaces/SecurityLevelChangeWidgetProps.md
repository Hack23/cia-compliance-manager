[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/widget-props](../README.md) / SecurityLevelChangeWidgetProps

# Interface: SecurityLevelChangeWidgetProps

Defined in: [types/widget-props.ts:292](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L292)

Base props for widgets that allow security level changes

Extends CIAComponentWidgetProps with interactive change capability.

## Example

```typescript
<InteractiveWidget
  component="integrity"
  level="Moderate"
  onLevelChange={(level) => console.log('New level:', level)}
/>
```

## Extends

- [`CIAComponentWidgetProps`](CIAComponentWidgetProps.md)

## Properties

### className?

> `optional` **className?**: `string`

Defined in: [types/widget-props.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L124)

Optional CSS class name for custom styling

Allows consumers to apply custom styles via CSS classes.
Use Tailwind CSS classes or custom CSS classes.

#### Example

```ts
"mt-4 border-2 rounded-lg"
```

#### Inherited from

[`CIAComponentWidgetProps`](CIAComponentWidgetProps.md).[`className`](CIAComponentWidgetProps.md#classname)

***

### testId?

> `optional` **testId?**: `string`

Defined in: [types/widget-props.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L135)

Optional test ID for automated testing

Used by testing frameworks (Cypress, Vitest) to locate
and interact with the component. Should follow the pattern
defined in testIds constants.

#### Example

```ts
"security-widget-availability"
```

#### Inherited from

[`CIAComponentWidgetProps`](CIAComponentWidgetProps.md).[`testId`](CIAComponentWidgetProps.md#testid)

***

### children?

> `optional` **children?**: `ReactNode`

Defined in: [types/widget-props.ts:244](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L244)

Optional children elements

#### Inherited from

[`CIAComponentWidgetProps`](CIAComponentWidgetProps.md).[`children`](CIAComponentWidgetProps.md#children)

***

### onError?

> `optional` **onError?**: (`error`) => `void`

Defined in: [types/widget-props.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L250)

Optional callback when widget encounters an error

#### Parameters

##### error

`Error`

Error that occurred

#### Returns

`void`

#### Inherited from

[`CIAComponentWidgetProps`](CIAComponentWidgetProps.md).[`onError`](CIAComponentWidgetProps.md#onerror)

***

### component

> **component**: [`CIAComponent`](../../cia/type-aliases/CIAComponent.md)

Defined in: [types/widget-props.ts:270](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L270)

CIA triad component (availability, integrity, or confidentiality)

#### Inherited from

[`CIAComponentWidgetProps`](CIAComponentWidgetProps.md).[`component`](CIAComponentWidgetProps.md#component)

***

### level

> **level**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:275](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L275)

Current security level for the component

#### Inherited from

[`CIAComponentWidgetProps`](CIAComponentWidgetProps.md).[`level`](CIAComponentWidgetProps.md#level)

***

### onLevelChange

> **onLevelChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:297](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L297)

Callback fired when security level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

New security level selected by user

#### Returns

`void`

***

### disabled?

> `optional` **disabled?**: `boolean`

Defined in: [types/widget-props.ts:303](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L303)

If true, the widget is disabled and cannot be interacted with

#### Default

```ts
false
```
