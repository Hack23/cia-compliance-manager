[**CIA Compliance Manager Diagrams v1.1.4**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / ConfidentialityImpactWidgetProps

# Interface: ConfidentialityImpactWidgetProps

Defined in: [types/widget-props.ts:649](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/widget-props.ts#L649)

Props for ConfidentialityImpactWidget component

Displays confidentiality-specific business impact including data
classification, access controls, and privacy safeguards.

## Example

```typescript
<ConfidentialityImpactWidget
  confidentialityLevel="High"
  availabilityLevel="Moderate"
  integrityLevel="High"
/>
```

## Extends

- [`BaseWidgetProps`](BaseWidgetProps.md)

## Properties

### availabilityLevel?

> `optional` **availabilityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:653](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/widget-props.ts#L653)

Availability security level (optional, for context)

***

### children?

> `optional` **children**: `ReactNode`

Defined in: [types/widget-props.ts:244](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/widget-props.ts#L244)

Optional children elements

#### Inherited from

[`BaseWidgetProps`](BaseWidgetProps.md).[`children`](BaseWidgetProps.md#children)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widget-props.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/widget-props.ts#L124)

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

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:663](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/widget-props.ts#L663)

Confidentiality security level

***

### integrityLevel?

> `optional` **integrityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:658](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/widget-props.ts#L658)

Integrity security level (optional, for context)

***

### onError()?

> `optional` **onError**: (`error`) => `void`

Defined in: [types/widget-props.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/widget-props.ts#L250)

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

Defined in: [types/widget-props.ts:669](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/widget-props.ts#L669)

If true, displays extended details

#### Default

```ts
false
```

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widget-props.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/types/widget-props.ts#L135)

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
