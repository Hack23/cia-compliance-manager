[**CIA Compliance Manager — Markdown Documentation v1.1.123**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/widget-props](../README.md) / IntegrityImpactWidgetProps

# Interface: IntegrityImpactWidgetProps

Defined in: [types/widget-props.ts:610](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/types/widget-props.ts#L610)

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

### className?

> `optional` **className?**: `string`

Defined in: [types/widget-props.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/types/widget-props.ts#L124)

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

Defined in: [types/widget-props.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/types/widget-props.ts#L135)

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

Defined in: [types/widget-props.ts:243](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/types/widget-props.ts#L243)

Optional children elements

#### Inherited from

[`BaseWidgetProps`](BaseWidgetProps.md).[`children`](BaseWidgetProps.md#children)

***

### onError?

> `optional` **onError?**: (`error`) => `void`

Defined in: [types/widget-props.ts:249](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/types/widget-props.ts#L249)

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

### availabilityLevel?

> `optional` **availabilityLevel?**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:614](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/types/widget-props.ts#L614)

Availability security level (optional, for context)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:619](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/types/widget-props.ts#L619)

Integrity security level

***

### confidentialityLevel?

> `optional` **confidentialityLevel?**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:624](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/types/widget-props.ts#L624)

Confidentiality security level (optional, for context)

***

### showExtendedDetails?

> `optional` **showExtendedDetails?**: `boolean`

Defined in: [types/widget-props.ts:630](https://github.com/Hack23/cia-compliance-manager/blob/d6e41548f5230c63e532615fc0f3bd3c247b6b44/src/types/widget-props.ts#L630)

If true, displays extended details

#### Default

```ts
false
```
