[**CIA Compliance Manager Diagrams v1.0.0**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / BusinessImpactAnalysisWidgetProps

# Interface: BusinessImpactAnalysisWidgetProps

Defined in: [types/widget-props.ts:498](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/types/widget-props.ts#L498)

Props for BusinessImpactAnalysisWidget component

Analyzes and displays business impact of security levels across
financial, operational, reputational, and regulatory dimensions.

## Example

```typescript
<BusinessImpactAnalysisWidget
  availabilityLevel="High"
  integrityLevel="Very High"
  confidentialityLevel="Moderate"
  organizationSize="large"
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

### industrySector?

> `optional` **industrySector**: `string`

Defined in: [types/widget-props.ts:508](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/types/widget-props.ts#L508)

Industry sector for impact analysis

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

### organizationSize?

> `optional` **organizationSize**: `"medium"` \| `"small"` \| `"large"` \| `"enterprise"`

Defined in: [types/widget-props.ts:503](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/types/widget-props.ts#L503)

Organization size for impact calculations

#### Default

```ts
'medium'
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
