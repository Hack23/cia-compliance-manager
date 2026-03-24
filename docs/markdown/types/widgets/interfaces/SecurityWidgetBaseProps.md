[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/widgets](../README.md) / SecurityWidgetBaseProps

# Interface: SecurityWidgetBaseProps

Defined in: [types/widgets.ts:37](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widgets.ts#L37)

Props for security-related widgets

## Business Perspective

These widgets form the foundation of security assessment in the application,
allowing organizations to visualize and manage their security posture
across the CIA triad. 🔒

## Extends

- [`WithSecurityLevelProps`](../../widget-props/interfaces/WithSecurityLevelProps.md).[`BaseWidgetProps`](../../widget-props/interfaces/BaseWidgetProps.md)

## Extended by

- [`SecuritySummaryWidgetProps`](SecuritySummaryWidgetProps.md)
- [`SecurityImpactWidgetProps`](SecurityImpactWidgetProps.md)
- [`BusinessImpactWidgetProps`](BusinessImpactWidgetProps.md)
- [`ComplianceWidgetProps`](ComplianceWidgetProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L35)

The selected availability level

Controls system uptime and accessibility requirements.

#### Example

```ts
'High'
```

#### Inherited from

[`WithSecurityLevelProps`](../../widget-props/interfaces/WithSecurityLevelProps.md).[`availabilityLevel`](../../widget-props/interfaces/WithSecurityLevelProps.md#availabilitylevel)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L44)

The selected integrity level

Controls data accuracy and consistency requirements.

#### Example

```ts
'Very High'
```

#### Inherited from

[`WithSecurityLevelProps`](../../widget-props/interfaces/WithSecurityLevelProps.md).[`integrityLevel`](../../widget-props/interfaces/WithSecurityLevelProps.md#integritylevel)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L53)

The selected confidentiality level

Controls data privacy and access control requirements.

#### Example

```ts
'Moderate'
```

#### Inherited from

[`WithSecurityLevelProps`](../../widget-props/interfaces/WithSecurityLevelProps.md).[`confidentialityLevel`](../../widget-props/interfaces/WithSecurityLevelProps.md#confidentialitylevel)

***

### onAvailabilityChange?

> `optional` **onAvailabilityChange?**: (`level`) => `void`

Defined in: [types/widget-props.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L68)

Optional callback fired when availability level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

New security level selected by user

#### Returns

`void`

#### Example

```typescript
onAvailabilityChange={(level) => {
  console.log('New availability level:', level);
  updateConfiguration('availability', level);
}}
```

#### Inherited from

[`WithSecurityLevelProps`](../../widget-props/interfaces/WithSecurityLevelProps.md).[`onAvailabilityChange`](../../widget-props/interfaces/WithSecurityLevelProps.md#onavailabilitychange)

***

### onIntegrityChange?

> `optional` **onIntegrityChange?**: (`level`) => `void`

Defined in: [types/widget-props.ts:83](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L83)

Optional callback fired when integrity level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

New security level selected by user

#### Returns

`void`

#### Example

```typescript
onIntegrityChange={(level) => {
  console.log('New integrity level:', level);
  updateConfiguration('integrity', level);
}}
```

#### Inherited from

[`WithSecurityLevelProps`](../../widget-props/interfaces/WithSecurityLevelProps.md).[`onIntegrityChange`](../../widget-props/interfaces/WithSecurityLevelProps.md#onintegritychange)

***

### onConfidentialityChange?

> `optional` **onConfidentialityChange?**: (`level`) => `void`

Defined in: [types/widget-props.ts:98](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L98)

Optional callback fired when confidentiality level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

New security level selected by user

#### Returns

`void`

#### Example

```typescript
onConfidentialityChange={(level) => {
  console.log('New confidentiality level:', level);
  updateConfiguration('confidentiality', level);
}}
```

#### Inherited from

[`WithSecurityLevelProps`](../../widget-props/interfaces/WithSecurityLevelProps.md).[`onConfidentialityChange`](../../widget-props/interfaces/WithSecurityLevelProps.md#onconfidentialitychange)

***

### className?

> `optional` **className?**: `string`

Defined in: [types/widget-props.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L124)

Optional CSS class name for custom styling

Allows consumers to apply custom styles via CSS classes.
Use Tailwind CSS classes or custom CSS classes.

#### Example

```ts
"mt-4 border-2 rounded-lg"
```

#### Inherited from

[`BaseWidgetProps`](../../widget-props/interfaces/BaseWidgetProps.md).[`className`](../../widget-props/interfaces/BaseWidgetProps.md#classname)

***

### testId?

> `optional` **testId?**: `string`

Defined in: [types/widget-props.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L135)

Optional test ID for automated testing

Used by testing frameworks (Cypress, Vitest) to locate
and interact with the component. Should follow the pattern
defined in testIds constants.

#### Example

```ts
"security-widget-availability"
```

#### Inherited from

[`BaseWidgetProps`](../../widget-props/interfaces/BaseWidgetProps.md).[`testId`](../../widget-props/interfaces/BaseWidgetProps.md#testid)

***

### children?

> `optional` **children?**: `ReactNode`

Defined in: [types/widget-props.ts:244](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L244)

Optional children elements

#### Inherited from

[`BaseWidgetProps`](../../widget-props/interfaces/BaseWidgetProps.md).[`children`](../../widget-props/interfaces/BaseWidgetProps.md#children)

***

### onError?

> `optional` **onError?**: (`error`) => `void`

Defined in: [types/widget-props.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widget-props.ts#L250)

Optional callback when widget encounters an error

#### Parameters

##### error

`Error`

Error that occurred

#### Returns

`void`

#### Inherited from

[`BaseWidgetProps`](../../widget-props/interfaces/BaseWidgetProps.md).[`onError`](../../widget-props/interfaces/BaseWidgetProps.md#onerror)
