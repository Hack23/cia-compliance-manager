[**CIA Compliance Manager — UML Diagrams v1.1.137**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/widget-props](../README.md) / SecurityLevelWidgetProps

# Interface: SecurityLevelWidgetProps

Defined in: [types/widget-props.ts:431](https://github.com/Hack23/cia-compliance-manager/blob/93f1d84ade636c2035c7999465a9c27157ae0ace/src/types/widget-props.ts#L431)

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

- [`AllCIAComponentsProps`](AllCIAComponentsProps.md)

## Properties

### className?

> `optional` **className?**: `string`

Defined in: [types/widget-props.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/93f1d84ade636c2035c7999465a9c27157ae0ace/src/types/widget-props.ts#L124)

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

Defined in: [types/widget-props.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/93f1d84ade636c2035c7999465a9c27157ae0ace/src/types/widget-props.ts#L135)

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

Defined in: [types/widget-props.ts:243](https://github.com/Hack23/cia-compliance-manager/blob/93f1d84ade636c2035c7999465a9c27157ae0ace/src/types/widget-props.ts#L243)

Optional children elements

#### Inherited from

[`AllCIAComponentsProps`](AllCIAComponentsProps.md).[`children`](AllCIAComponentsProps.md#children)

***

### onError?

> `optional` **onError?**: (`error`) => `void`

Defined in: [types/widget-props.ts:249](https://github.com/Hack23/cia-compliance-manager/blob/93f1d84ade636c2035c7999465a9c27157ae0ace/src/types/widget-props.ts#L249)

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

Defined in: [types/widget-props.ts:324](https://github.com/Hack23/cia-compliance-manager/blob/93f1d84ade636c2035c7999465a9c27157ae0ace/src/types/widget-props.ts#L324)

Security level for availability component

#### Inherited from

[`AllCIAComponentsProps`](AllCIAComponentsProps.md).[`availabilityLevel`](AllCIAComponentsProps.md#availabilitylevel)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:329](https://github.com/Hack23/cia-compliance-manager/blob/93f1d84ade636c2035c7999465a9c27157ae0ace/src/types/widget-props.ts#L329)

Security level for integrity component

#### Inherited from

[`AllCIAComponentsProps`](AllCIAComponentsProps.md).[`integrityLevel`](AllCIAComponentsProps.md#integritylevel)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:334](https://github.com/Hack23/cia-compliance-manager/blob/93f1d84ade636c2035c7999465a9c27157ae0ace/src/types/widget-props.ts#L334)

Security level for confidentiality component

#### Inherited from

[`AllCIAComponentsProps`](AllCIAComponentsProps.md).[`confidentialityLevel`](AllCIAComponentsProps.md#confidentialitylevel)

***

### onAvailabilityChange?

> `optional` **onAvailabilityChange?**: (`level`) => `void`

Defined in: [types/widget-props.ts:436](https://github.com/Hack23/cia-compliance-manager/blob/93f1d84ade636c2035c7999465a9c27157ae0ace/src/types/widget-props.ts#L436)

Callback fired when availability level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

New availability security level

#### Returns

`void`

***

### onIntegrityChange?

> `optional` **onIntegrityChange?**: (`level`) => `void`

Defined in: [types/widget-props.ts:442](https://github.com/Hack23/cia-compliance-manager/blob/93f1d84ade636c2035c7999465a9c27157ae0ace/src/types/widget-props.ts#L442)

Callback fired when integrity level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

New integrity security level

#### Returns

`void`

***

### onConfidentialityChange?

> `optional` **onConfidentialityChange?**: (`level`) => `void`

Defined in: [types/widget-props.ts:448](https://github.com/Hack23/cia-compliance-manager/blob/93f1d84ade636c2035c7999465a9c27157ae0ace/src/types/widget-props.ts#L448)

Callback fired when confidentiality level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

New confidentiality security level

#### Returns

`void`
