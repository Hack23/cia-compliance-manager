[**CIA Compliance Manager — Markdown Documentation v1.1.114**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/widget-props](../README.md) / ComplianceStatusWidgetProps

# Interface: ComplianceStatusWidgetProps

Defined in: [types/widget-props.ts:522](https://github.com/Hack23/cia-compliance-manager/blob/cfd93aac82f8561e7f02de334225220469ce29a6/src/types/widget-props.ts#L522)

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

- [`AllCIAComponentsProps`](AllCIAComponentsProps.md)

## Properties

### className?

> `optional` **className?**: `string`

Defined in: [types/widget-props.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/cfd93aac82f8561e7f02de334225220469ce29a6/src/types/widget-props.ts#L124)

Optional CSS class name for custom styling

Allows consumers to apply custom styles via CSS classes.
Use Tailwind CSS classes or custom CSS classes.

#### Example

```ts
"mt-4 border-2 rounded-lg"
```

#### Inherited from

[`AllCIAComponentsProps`](AllCIAComponentsProps.md).[`className`](AllCIAComponentsProps.md#classname)

***

### testId?

> `optional` **testId?**: `string`

Defined in: [types/widget-props.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/cfd93aac82f8561e7f02de334225220469ce29a6/src/types/widget-props.ts#L135)

Optional test ID for automated testing

Used by testing frameworks (Cypress, Vitest) to locate
and interact with the component. Should follow the pattern
defined in testIds constants.

#### Example

```ts
"security-widget-availability"
```

#### Inherited from

[`AllCIAComponentsProps`](AllCIAComponentsProps.md).[`testId`](AllCIAComponentsProps.md#testid)

***

### children?

> `optional` **children?**: `ReactNode`

Defined in: [types/widget-props.ts:243](https://github.com/Hack23/cia-compliance-manager/blob/cfd93aac82f8561e7f02de334225220469ce29a6/src/types/widget-props.ts#L243)

Optional children elements

#### Inherited from

[`AllCIAComponentsProps`](AllCIAComponentsProps.md).[`children`](AllCIAComponentsProps.md#children)

***

### onError?

> `optional` **onError?**: (`error`) => `void`

Defined in: [types/widget-props.ts:249](https://github.com/Hack23/cia-compliance-manager/blob/cfd93aac82f8561e7f02de334225220469ce29a6/src/types/widget-props.ts#L249)

Optional callback when widget encounters an error

#### Parameters

##### error

`Error`

Error that occurred

#### Returns

`void`

#### Inherited from

[`AllCIAComponentsProps`](AllCIAComponentsProps.md).[`onError`](AllCIAComponentsProps.md#onerror)

***

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:324](https://github.com/Hack23/cia-compliance-manager/blob/cfd93aac82f8561e7f02de334225220469ce29a6/src/types/widget-props.ts#L324)

Security level for availability component

#### Inherited from

[`AllCIAComponentsProps`](AllCIAComponentsProps.md).[`availabilityLevel`](AllCIAComponentsProps.md#availabilitylevel)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:329](https://github.com/Hack23/cia-compliance-manager/blob/cfd93aac82f8561e7f02de334225220469ce29a6/src/types/widget-props.ts#L329)

Security level for integrity component

#### Inherited from

[`AllCIAComponentsProps`](AllCIAComponentsProps.md).[`integrityLevel`](AllCIAComponentsProps.md#integritylevel)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:334](https://github.com/Hack23/cia-compliance-manager/blob/cfd93aac82f8561e7f02de334225220469ce29a6/src/types/widget-props.ts#L334)

Security level for confidentiality component

#### Inherited from

[`AllCIAComponentsProps`](AllCIAComponentsProps.md).[`confidentialityLevel`](AllCIAComponentsProps.md#confidentialitylevel)

***

### industry?

> `optional` **industry?**: `string`

Defined in: [types/widget-props.ts:526](https://github.com/Hack23/cia-compliance-manager/blob/cfd93aac82f8561e7f02de334225220469ce29a6/src/types/widget-props.ts#L526)

Optional industry context for compliance

***

### region?

> `optional` **region?**: `string`

Defined in: [types/widget-props.ts:531](https://github.com/Hack23/cia-compliance-manager/blob/cfd93aac82f8561e7f02de334225220469ce29a6/src/types/widget-props.ts#L531)

Optional region context for compliance
