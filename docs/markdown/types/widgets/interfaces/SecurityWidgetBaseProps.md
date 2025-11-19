[**CIA Compliance Manager Documentation v0.9.1**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/widgets](../README.md) / SecurityWidgetBaseProps

# Interface: SecurityWidgetBaseProps

Defined in: [types/widgets.ts:49](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/widgets.ts#L49)

Props for security-related widgets

## Business Perspective

These widgets form the foundation of security assessment in the application,
allowing organizations to visualize and manage their security posture
across the CIA triad. 🔒

## Extends

- [`WithSecurityLevelProps`](../../interfaces/WithSecurityLevelProps.md).[`BaseWidgetProps`](BaseWidgetProps.md)

## Extended by

- [`SecuritySummaryWidgetProps`](SecuritySummaryWidgetProps.md)
- [`SecurityImpactWidgetProps`](SecurityImpactWidgetProps.md)
- [`BusinessImpactWidgetProps`](BusinessImpactWidgetProps.md)
- [`ComplianceWidgetProps`](ComplianceWidgetProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:34](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/widget-props.ts#L34)

The selected availability level

Controls system uptime and accessibility requirements.

#### Example

```ts
'High'
```

#### Inherited from

[`WithSecurityLevelProps`](../../interfaces/WithSecurityLevelProps.md).[`availabilityLevel`](../../interfaces/WithSecurityLevelProps.md#availabilitylevel)

***

### children?

> `optional` **children**: `ReactNode`

Defined in: [types/widgets.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/widgets.ts#L35)

Optional children elements

#### Inherited from

[`BaseWidgetProps`](BaseWidgetProps.md).[`children`](BaseWidgetProps.md#children)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widget-props.ts:123](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/widget-props.ts#L123)

Optional CSS class name for custom styling

Allows consumers to apply custom styles via CSS classes.
Use Tailwind CSS classes or custom CSS classes.

#### Example

```ts
"mt-4 border-2 rounded-lg"
```

#### Inherited from

[`BaseWidgetProps`](BaseWidgetProps.md).[`className`](BaseWidgetProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:52](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/widget-props.ts#L52)

The selected confidentiality level

Controls data privacy and access control requirements.

#### Example

```ts
'Moderate'
```

#### Inherited from

[`WithSecurityLevelProps`](../../interfaces/WithSecurityLevelProps.md).[`confidentialityLevel`](../../interfaces/WithSecurityLevelProps.md#confidentialitylevel)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:43](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/widget-props.ts#L43)

The selected integrity level

Controls data accuracy and consistency requirements.

#### Example

```ts
'Very High'
```

#### Inherited from

[`WithSecurityLevelProps`](../../interfaces/WithSecurityLevelProps.md).[`integrityLevel`](../../interfaces/WithSecurityLevelProps.md#integritylevel)

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:67](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/widget-props.ts#L67)

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

[`WithSecurityLevelProps`](../../interfaces/WithSecurityLevelProps.md).[`onAvailabilityChange`](../../interfaces/WithSecurityLevelProps.md#onavailabilitychange)

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:97](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/widget-props.ts#L97)

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

[`WithSecurityLevelProps`](../../interfaces/WithSecurityLevelProps.md).[`onConfidentialityChange`](../../interfaces/WithSecurityLevelProps.md#onconfidentialitychange)

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:82](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/widget-props.ts#L82)

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

[`WithSecurityLevelProps`](../../interfaces/WithSecurityLevelProps.md).[`onIntegrityChange`](../../interfaces/WithSecurityLevelProps.md#onintegritychange)

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widget-props.ts:134](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/widget-props.ts#L134)

Optional test ID for automated testing

Used by testing frameworks (Cypress, Vitest) to locate
and interact with the component. Should follow the pattern
defined in testIds constants.

#### Example

```ts
"security-widget-availability"
```

#### Inherited from

[`BaseWidgetProps`](BaseWidgetProps.md).[`testId`](BaseWidgetProps.md#testid)
