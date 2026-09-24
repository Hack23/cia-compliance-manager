[**CIA Compliance Manager — UML Diagrams v1.1.110**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/widget-props](../README.md) / AvailabilityImpactWidgetProps

# Interface: AvailabilityImpactWidgetProps

Defined in: [types/widget-props.ts:571](https://github.com/Hack23/cia-compliance-manager/blob/10c9d46d58d4ca937f15cd84ca8d67641f9ca8bc/src/types/widget-props.ts#L571)

Props for AvailabilityImpactWidget component

Displays availability-specific business impact including uptime,
recovery objectives, and resilience requirements.

## Example

```typescript
<AvailabilityImpactWidget
  availabilityLevel="High"
  integrityLevel="Moderate"
  confidentialityLevel="Moderate"
  showExtendedDetails
/>
```

## Extends

- [`BaseWidgetProps`](BaseWidgetProps.md)

## Properties

### className?

> `optional` **className?**: `string`

Defined in: [types/widget-props.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/10c9d46d58d4ca937f15cd84ca8d67641f9ca8bc/src/types/widget-props.ts#L124)

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

Defined in: [types/widget-props.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/10c9d46d58d4ca937f15cd84ca8d67641f9ca8bc/src/types/widget-props.ts#L135)

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

Defined in: [types/widget-props.ts:243](https://github.com/Hack23/cia-compliance-manager/blob/10c9d46d58d4ca937f15cd84ca8d67641f9ca8bc/src/types/widget-props.ts#L243)

Optional children elements

#### Inherited from

[`BaseWidgetProps`](BaseWidgetProps.md).[`children`](BaseWidgetProps.md#children)

***

### onError?

> `optional` **onError?**: (`error`) => `void`

Defined in: [types/widget-props.ts:249](https://github.com/Hack23/cia-compliance-manager/blob/10c9d46d58d4ca937f15cd84ca8d67641f9ca8bc/src/types/widget-props.ts#L249)

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

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:575](https://github.com/Hack23/cia-compliance-manager/blob/10c9d46d58d4ca937f15cd84ca8d67641f9ca8bc/src/types/widget-props.ts#L575)

Availability security level

***

### integrityLevel?

> `optional` **integrityLevel?**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:580](https://github.com/Hack23/cia-compliance-manager/blob/10c9d46d58d4ca937f15cd84ca8d67641f9ca8bc/src/types/widget-props.ts#L580)

Integrity security level (optional, for context)

***

### confidentialityLevel?

> `optional` **confidentialityLevel?**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:585](https://github.com/Hack23/cia-compliance-manager/blob/10c9d46d58d4ca937f15cd84ca8d67641f9ca8bc/src/types/widget-props.ts#L585)

Confidentiality security level (optional, for context)

***

### showExtendedDetails?

> `optional` **showExtendedDetails?**: `boolean`

Defined in: [types/widget-props.ts:591](https://github.com/Hack23/cia-compliance-manager/blob/10c9d46d58d4ca937f15cd84ca8d67641f9ca8bc/src/types/widget-props.ts#L591)

If true, displays extended details

#### Default

```ts
false
```
