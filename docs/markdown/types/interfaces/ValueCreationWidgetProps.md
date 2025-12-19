[**CIA Compliance Manager Documentation v1.0.5**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [types](../README.md) / ValueCreationWidgetProps

# Interface: ValueCreationWidgetProps

Defined in: [types/widget-props.ts:609](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/types/widget-props.ts#L609)

Props for ValueCreationWidget component

Displays business value created by security investments
including ROI and value metrics.

## Example

```typescript
<ValueCreationWidget
  availabilityLevel="High"
  integrityLevel="Very High"
  confidentialityLevel="Moderate"
  timePeriod={5}
/>
```

## Extends

- `AllCIAComponentsProps`

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:325](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/types/widget-props.ts#L325)

Security level for availability component

#### Inherited from

`AllCIAComponentsProps.availabilityLevel`

***

### children?

> `optional` **children**: `ReactNode`

Defined in: [types/widget-props.ts:244](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/types/widget-props.ts#L244)

Optional children elements

#### Inherited from

`AllCIAComponentsProps.children`

***

### className?

> `optional` **className**: `string`

Defined in: [types/widget-props.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/types/widget-props.ts#L124)

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

Defined in: [types/widget-props.ts:335](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/types/widget-props.ts#L335)

Security level for confidentiality component

#### Inherited from

`AllCIAComponentsProps.confidentialityLevel`

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:330](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/types/widget-props.ts#L330)

Security level for integrity component

#### Inherited from

`AllCIAComponentsProps.integrityLevel`

***

### onError()?

> `optional` **onError**: (`error`) => `void`

Defined in: [types/widget-props.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/types/widget-props.ts#L250)

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

### testId?

> `optional` **testId**: `string`

Defined in: [types/widget-props.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/types/widget-props.ts#L135)

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

***

### timePeriod?

> `optional` **timePeriod**: `number`

Defined in: [types/widget-props.ts:614](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/types/widget-props.ts#L614)

Time period for ROI calculation (in years)

#### Default

```ts
3
```
