[**CIA Compliance Manager Diagrams v1.0.2**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / AvailabilityImpactWidgetProps

# Interface: AvailabilityImpactWidgetProps

Defined in: [types/widget-props.ts:637](https://github.com/Hack23/cia-compliance-manager/blob/175c46a72442c615bb0c104848c5b4deec0cfc31/src/types/widget-props.ts#L637)

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

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:641](https://github.com/Hack23/cia-compliance-manager/blob/175c46a72442c615bb0c104848c5b4deec0cfc31/src/types/widget-props.ts#L641)

Availability security level

***

### children?

> `optional` **children**: `ReactNode`

Defined in: [types/widget-props.ts:244](https://github.com/Hack23/cia-compliance-manager/blob/175c46a72442c615bb0c104848c5b4deec0cfc31/src/types/widget-props.ts#L244)

Optional children elements

#### Inherited from

[`BaseWidgetProps`](BaseWidgetProps.md).[`children`](BaseWidgetProps.md#children)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widget-props.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/175c46a72442c615bb0c104848c5b4deec0cfc31/src/types/widget-props.ts#L124)

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

### confidentialityLevel?

> `optional` **confidentialityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:651](https://github.com/Hack23/cia-compliance-manager/blob/175c46a72442c615bb0c104848c5b4deec0cfc31/src/types/widget-props.ts#L651)

Confidentiality security level (optional, for context)

***

### integrityLevel?

> `optional` **integrityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:646](https://github.com/Hack23/cia-compliance-manager/blob/175c46a72442c615bb0c104848c5b4deec0cfc31/src/types/widget-props.ts#L646)

Integrity security level (optional, for context)

***

### onError()?

> `optional` **onError**: (`error`) => `void`

Defined in: [types/widget-props.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/175c46a72442c615bb0c104848c5b4deec0cfc31/src/types/widget-props.ts#L250)

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

### showExtendedDetails?

> `optional` **showExtendedDetails**: `boolean`

Defined in: [types/widget-props.ts:657](https://github.com/Hack23/cia-compliance-manager/blob/175c46a72442c615bb0c104848c5b4deec0cfc31/src/types/widget-props.ts#L657)

If true, displays extended details

#### Default

```ts
false
```

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widget-props.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/175c46a72442c615bb0c104848c5b4deec0cfc31/src/types/widget-props.ts#L135)

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
