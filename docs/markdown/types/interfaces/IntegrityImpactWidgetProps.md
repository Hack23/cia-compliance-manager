[**CIA Compliance Manager Documentation v1.0.3**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [types](../README.md) / IntegrityImpactWidgetProps

# Interface: IntegrityImpactWidgetProps

Defined in: [types/widget-props.ts:676](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/types/widget-props.ts#L676)

Props for IntegrityImpactWidget component

Displays integrity-specific business impact including data accuracy,
validation requirements, and audit controls.

## Example

```typescript
<IntegrityImpactWidget
  integrityLevel="Very High"
  availabilityLevel="High"
  confidentialityLevel="Moderate"
  showExtendedDetails
/>
```

## Extends

- [`BaseWidgetProps`](BaseWidgetProps.md)

## Properties

### availabilityLevel?

> `optional` **availabilityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:680](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/types/widget-props.ts#L680)

Availability security level (optional, for context)

***

### children?

> `optional` **children**: `ReactNode`

Defined in: [types/widget-props.ts:244](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/types/widget-props.ts#L244)

Optional children elements

#### Inherited from

[`BaseWidgetProps`](BaseWidgetProps.md).[`children`](BaseWidgetProps.md#children)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widget-props.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/types/widget-props.ts#L124)

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

Defined in: [types/widget-props.ts:690](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/types/widget-props.ts#L690)

Confidentiality security level (optional, for context)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:685](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/types/widget-props.ts#L685)

Integrity security level

***

### onError()?

> `optional` **onError**: (`error`) => `void`

Defined in: [types/widget-props.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/types/widget-props.ts#L250)

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

Defined in: [types/widget-props.ts:696](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/types/widget-props.ts#L696)

If true, displays extended details

#### Default

```ts
false
```

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widget-props.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/types/widget-props.ts#L135)

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
