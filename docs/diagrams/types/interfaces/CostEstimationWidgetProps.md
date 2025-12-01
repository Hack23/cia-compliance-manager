[**CIA Compliance Manager Diagrams v1.0.1**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / CostEstimationWidgetProps

# Interface: CostEstimationWidgetProps

Defined in: [types/widget-props.ts:532](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/types/widget-props.ts#L532)

Props for CostEstimationWidget component

Estimates implementation costs for security controls based on
selected security levels across CIA components.

## Example

```typescript
<CostEstimationWidget
  availabilityLevel="High"
  integrityLevel="Very High"
  confidentialityLevel="Moderate"
  showBreakdown
  currency="EUR"
/>
```

## Extends

- `AllCIAComponentsProps`

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:325](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/types/widget-props.ts#L325)

Security level for availability component

#### Inherited from

`AllCIAComponentsProps.availabilityLevel`

***

### children?

> `optional` **children**: `ReactNode`

Defined in: [types/widget-props.ts:244](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/types/widget-props.ts#L244)

Optional children elements

#### Inherited from

`AllCIAComponentsProps.children`

***

### className?

> `optional` **className**: `string`

Defined in: [types/widget-props.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/types/widget-props.ts#L124)

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

Defined in: [types/widget-props.ts:335](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/types/widget-props.ts#L335)

Security level for confidentiality component

#### Inherited from

`AllCIAComponentsProps.confidentialityLevel`

***

### currency?

> `optional` **currency**: `string`

Defined in: [types/widget-props.ts:543](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/types/widget-props.ts#L543)

Currency code for cost display

#### Default

```ts
'USD'
```

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:330](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/types/widget-props.ts#L330)

Security level for integrity component

#### Inherited from

`AllCIAComponentsProps.integrityLevel`

***

### onCostCalculated()?

> `optional` **onCostCalculated**: (`totalCost`) => `void`

Defined in: [types/widget-props.ts:549](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/types/widget-props.ts#L549)

Callback fired when cost estimation is complete

#### Parameters

##### totalCost

`number`

Total estimated cost

#### Returns

`void`

***

### onError()?

> `optional` **onError**: (`error`) => `void`

Defined in: [types/widget-props.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/types/widget-props.ts#L250)

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

### showBreakdown?

> `optional` **showBreakdown**: `boolean`

Defined in: [types/widget-props.ts:537](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/types/widget-props.ts#L537)

If true, displays detailed cost breakdown

#### Default

```ts
true
```

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widget-props.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/types/widget-props.ts#L135)

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
