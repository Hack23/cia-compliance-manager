[**CIA Compliance Manager Documentation v1.1.10**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [types](../README.md) / SecurityLevelWidgetProps

# Interface: SecurityLevelWidgetProps

Defined in: [types/widget-props.ts:432](https://github.com/Hack23/cia-compliance-manager/blob/eb3dd66ffaf39f50db4da1b4d578d20d1c37a0b3/src/types/widget-props.ts#L432)

Props for SecurityLevelWidget component

Allows users to select and view security level for CIA components.

## Example

```typescript
<SecurityLevelWidget
  availabilityLevel="High"
  integrityLevel="Very High"
  confidentialityLevel="Moderate"
  onAvailabilityChange={(level) => setLevel('availability', level)}
/>
```

## Extends

- `AllCIAComponentsProps`

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:325](https://github.com/Hack23/cia-compliance-manager/blob/eb3dd66ffaf39f50db4da1b4d578d20d1c37a0b3/src/types/widget-props.ts#L325)

Security level for availability component

#### Inherited from

`AllCIAComponentsProps.availabilityLevel`

***

### children?

> `optional` **children**: `ReactNode`

Defined in: [types/widget-props.ts:244](https://github.com/Hack23/cia-compliance-manager/blob/eb3dd66ffaf39f50db4da1b4d578d20d1c37a0b3/src/types/widget-props.ts#L244)

Optional children elements

#### Inherited from

`AllCIAComponentsProps.children`

***

### className?

> `optional` **className**: `string`

Defined in: [types/widget-props.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/eb3dd66ffaf39f50db4da1b4d578d20d1c37a0b3/src/types/widget-props.ts#L124)

Optional CSS class name for custom styling

Allows consumers to apply custom styles via CSS classes.
Use Tailwind CSS classes or custom CSS classes.

#### Example

```ts
"mt-4 border-2 rounded-lg"
```

#### Inherited from

`AllCIAComponentsProps.className`

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:335](https://github.com/Hack23/cia-compliance-manager/blob/eb3dd66ffaf39f50db4da1b4d578d20d1c37a0b3/src/types/widget-props.ts#L335)

Security level for confidentiality component

#### Inherited from

`AllCIAComponentsProps.confidentialityLevel`

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:330](https://github.com/Hack23/cia-compliance-manager/blob/eb3dd66ffaf39f50db4da1b4d578d20d1c37a0b3/src/types/widget-props.ts#L330)

Security level for integrity component

#### Inherited from

`AllCIAComponentsProps.integrityLevel`

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:437](https://github.com/Hack23/cia-compliance-manager/blob/eb3dd66ffaf39f50db4da1b4d578d20d1c37a0b3/src/types/widget-props.ts#L437)

Callback fired when availability level changes

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

New availability security level

#### Returns

`void`

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:449](https://github.com/Hack23/cia-compliance-manager/blob/eb3dd66ffaf39f50db4da1b4d578d20d1c37a0b3/src/types/widget-props.ts#L449)

Callback fired when confidentiality level changes

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

New confidentiality security level

#### Returns

`void`

***

### onError()?

> `optional` **onError**: (`error`) => `void`

Defined in: [types/widget-props.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/eb3dd66ffaf39f50db4da1b4d578d20d1c37a0b3/src/types/widget-props.ts#L250)

Optional callback when widget encounters an error

#### Parameters

##### error

`Error`

Error that occurred

#### Returns

`void`

#### Inherited from

`AllCIAComponentsProps.onError`

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:443](https://github.com/Hack23/cia-compliance-manager/blob/eb3dd66ffaf39f50db4da1b4d578d20d1c37a0b3/src/types/widget-props.ts#L443)

Callback fired when integrity level changes

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

New integrity security level

#### Returns

`void`

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widget-props.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/eb3dd66ffaf39f50db4da1b4d578d20d1c37a0b3/src/types/widget-props.ts#L135)

Optional test ID for automated testing

Used by testing frameworks (Cypress, Vitest) to locate
and interact with the component. Should follow the pattern
defined in testIds constants.

#### Example

```ts
"security-widget-availability"
```

#### Inherited from

`AllCIAComponentsProps.testId`
