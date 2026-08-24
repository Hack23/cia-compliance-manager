[**CIA Compliance Manager — UML Diagrams v1.1.137**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/widget-props](../README.md) / CIAComponentWidgetProps

# Interface: CIAComponentWidgetProps

Defined in: [types/widget-props.ts:265](https://github.com/Hack23/cia-compliance-manager/blob/93f1d84ade636c2035c7999465a9c27157ae0ace/src/types/widget-props.ts#L265)

Base props for widgets that display CIA component data

Used by widgets that need to show information for a single CIA component.

## Example

```typescript
<ComponentWidget 
  component="availability" 
  level="High" 
/>
```

## Extends

- [`BaseWidgetProps`](BaseWidgetProps.md)

## Extended by

- [`SecurityLevelChangeWidgetProps`](SecurityLevelChangeWidgetProps.md)
- [`ImpactWidgetProps`](ImpactWidgetProps.md)

## Properties

### className?

> `optional` **className?**: `string`

Defined in: [types/widget-props.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/93f1d84ade636c2035c7999465a9c27157ae0ace/src/types/widget-props.ts#L124)

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

Defined in: [types/widget-props.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/93f1d84ade636c2035c7999465a9c27157ae0ace/src/types/widget-props.ts#L135)

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

Defined in: [types/widget-props.ts:243](https://github.com/Hack23/cia-compliance-manager/blob/93f1d84ade636c2035c7999465a9c27157ae0ace/src/types/widget-props.ts#L243)

Optional children elements

#### Inherited from

[`BaseWidgetProps`](BaseWidgetProps.md).[`children`](BaseWidgetProps.md#children)

***

### onError?

> `optional` **onError?**: (`error`) => `void`

Defined in: [types/widget-props.ts:249](https://github.com/Hack23/cia-compliance-manager/blob/93f1d84ade636c2035c7999465a9c27157ae0ace/src/types/widget-props.ts#L249)

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

### component

> **component**: [`CIAComponent`](../../cia/type-aliases/CIAComponent.md)

Defined in: [types/widget-props.ts:269](https://github.com/Hack23/cia-compliance-manager/blob/93f1d84ade636c2035c7999465a9c27157ae0ace/src/types/widget-props.ts#L269)

CIA triad component (availability, integrity, or confidentiality)

***

### level

> **level**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:274](https://github.com/Hack23/cia-compliance-manager/blob/93f1d84ade636c2035c7999465a9c27157ae0ace/src/types/widget-props.ts#L274)

Current security level for the component
