[**CIA Compliance Manager Documentation v1.1.12**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [types](../README.md) / SecurityResourcesWidgetProps

# Interface: SecurityResourcesWidgetProps

Defined in: [types/widget-props.ts:734](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/widget-props.ts#L734)

Props for SecurityResourcesWidget component

Displays relevant security resources and documentation based
on current security configuration.

## Example

```typescript
<SecurityResourcesWidget
  availabilityLevel="High"
  integrityLevel="Very High"
  confidentialityLevel="Moderate"
  maxItems={10}
  showTopResourcesOnly
/>
```

## Extends

- `AllCIAComponentsProps`

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:325](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/widget-props.ts#L325)

Security level for availability component

#### Inherited from

`AllCIAComponentsProps.availabilityLevel`

***

### children?

> `optional` **children**: `ReactNode`

Defined in: [types/widget-props.ts:244](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/widget-props.ts#L244)

Optional children elements

#### Inherited from

`AllCIAComponentsProps.children`

***

### className?

> `optional` **className**: `string`

Defined in: [types/widget-props.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/widget-props.ts#L124)

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

Defined in: [types/widget-props.ts:335](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/widget-props.ts#L335)

Security level for confidentiality component

#### Inherited from

`AllCIAComponentsProps.confidentialityLevel`

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:330](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/widget-props.ts#L330)

Security level for integrity component

#### Inherited from

`AllCIAComponentsProps.integrityLevel`

***

### maxItems?

> `optional` **maxItems**: `number`

Defined in: [types/widget-props.ts:739](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/widget-props.ts#L739)

Maximum number of items to display

#### Default

```ts
8
```

***

### onError()?

> `optional` **onError**: (`error`) => `void`

Defined in: [types/widget-props.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/widget-props.ts#L250)

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

### showTopResourcesOnly?

> `optional` **showTopResourcesOnly**: `boolean`

Defined in: [types/widget-props.ts:745](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/widget-props.ts#L745)

Optional flag to show only top/priority resources

#### Default

```ts
false
```

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widget-props.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/widget-props.ts#L135)

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
