[**CIA Compliance Manager Diagrams v1.1.16**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / ComplianceStatusWidgetProps

# Interface: ComplianceStatusWidgetProps

Defined in: [types/widget-props.ts:523](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/widget-props.ts#L523)

Props for ComplianceStatusWidget component

Shows compliance status across multiple regulatory frameworks
based on current security levels.

## Example

```typescript
<ComplianceStatusWidget
  availabilityLevel="High"
  integrityLevel="Very High"
  confidentialityLevel="Moderate"
  industry="healthcare"
  region="EU"
/>
```

## Extends

- `AllCIAComponentsProps`

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:325](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/widget-props.ts#L325)

Security level for availability component

#### Inherited from

`AllCIAComponentsProps.availabilityLevel`

***

### children?

> `optional` **children**: `ReactNode`

Defined in: [types/widget-props.ts:244](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/widget-props.ts#L244)

Optional children elements

#### Inherited from

`AllCIAComponentsProps.children`

***

### className?

> `optional` **className**: `string`

Defined in: [types/widget-props.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/widget-props.ts#L124)

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

Defined in: [types/widget-props.ts:335](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/widget-props.ts#L335)

Security level for confidentiality component

#### Inherited from

`AllCIAComponentsProps.confidentialityLevel`

***

### industry?

> `optional` **industry**: `string`

Defined in: [types/widget-props.ts:527](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/widget-props.ts#L527)

Optional industry context for compliance

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:330](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/widget-props.ts#L330)

Security level for integrity component

#### Inherited from

`AllCIAComponentsProps.integrityLevel`

***

### onError()?

> `optional` **onError**: (`error`) => `void`

Defined in: [types/widget-props.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/widget-props.ts#L250)

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

### region?

> `optional` **region**: `string`

Defined in: [types/widget-props.ts:532](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/widget-props.ts#L532)

Optional region context for compliance

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widget-props.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/types/widget-props.ts#L135)

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
