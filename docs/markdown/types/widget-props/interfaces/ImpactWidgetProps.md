[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/widget-props](../README.md) / ImpactWidgetProps

# Interface: ImpactWidgetProps

Defined in: [types/widget-props.ts:688](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L688)

Props for the shared ImpactWidget component

This is the base component used by all three impact widgets (Availability,
Integrity, Confidentiality). It provides a unified interface for displaying
CIA component-specific business impact analysis.

## Example

```typescript
<ImpactWidget
  component="availability"
  level="High"
  showExtendedDetails
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

### showExtendedDetails?

> `optional` **showExtendedDetails?**: `boolean`

Defined in: [types/widget-props.ts:693](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L693)

If true, displays extended details (e.g., recommendations for integrity)

#### Default

```ts
false
```
