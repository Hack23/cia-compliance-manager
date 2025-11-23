[**CIA Compliance Manager Documentation v1.0.0**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [types](../README.md) / ComplianceStatusWidgetProps

# Interface: ComplianceStatusWidgetProps

Defined in: [types/widget-props.ts:569](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/types/widget-props.ts#L569)

Props for ComplianceStatusWidget component

Shows compliance status across multiple regulatory frameworks
based on current security levels.

## Example

```typescript
<ComplianceStatusWidget
  availabilityLevel="High"
  integrityLevel="Very High"
  confidentialityLevel="Moderate"
  frameworks={['NIST', 'ISO27001', 'GDPR']}
  showRequirements
/>
```

## Extends

- `AllCIAComponentsProps`

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:325](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/types/widget-props.ts#L325)

Security level for availability component

#### Inherited from

`AllCIAComponentsProps.availabilityLevel`

***

### children?

> `optional` **children**: `ReactNode`

Defined in: [types/widget-props.ts:244](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/types/widget-props.ts#L244)

Optional children elements

#### Inherited from

`AllCIAComponentsProps.children`

***

### className?

> `optional` **className**: `string`

Defined in: [types/widget-props.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/types/widget-props.ts#L124)

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

Defined in: [types/widget-props.ts:335](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/types/widget-props.ts#L335)

Security level for confidentiality component

#### Inherited from

`AllCIAComponentsProps.confidentialityLevel`

***

### frameworks?

> `optional` **frameworks**: `string`[]

Defined in: [types/widget-props.ts:574](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/types/widget-props.ts#L574)

Compliance frameworks to check

#### Default

```ts
['NIST', 'ISO27001', 'GDPR']
```

***

### industry?

> `optional` **industry**: `string`

Defined in: [types/widget-props.ts:585](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/types/widget-props.ts#L585)

Optional industry context for compliance

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:330](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/types/widget-props.ts#L330)

Security level for integrity component

#### Inherited from

`AllCIAComponentsProps.integrityLevel`

***

### onError()?

> `optional` **onError**: (`error`) => `void`

Defined in: [types/widget-props.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/types/widget-props.ts#L250)

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

Defined in: [types/widget-props.ts:590](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/types/widget-props.ts#L590)

Optional region context for compliance

***

### showRequirements?

> `optional` **showRequirements**: `boolean`

Defined in: [types/widget-props.ts:580](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/types/widget-props.ts#L580)

If true, displays detailed compliance requirements

#### Default

```ts
false
```

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widget-props.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/types/widget-props.ts#L135)

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
