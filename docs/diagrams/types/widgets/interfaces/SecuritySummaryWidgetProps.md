[**CIA Compliance Manager Diagrams v1.1.15**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/widgets](../README.md) / SecuritySummaryWidgetProps

# Interface: SecuritySummaryWidgetProps

Defined in: [types/widgets.ts:122](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L122)

Props for widgets that display security summaries

This widget displays a summary of the current security posture based on
confidentiality, integrity, and availability security levels. It provides
a consolidated view of the organization's security stance.

## Business Perspective

This component helps security officers quickly visualize the current
security posture across the CIA triad. The security level information
is critical for compliance reporting and risk assessment. 🔒

## Extends

- [`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widget-props.ts#L35)

The selected availability level

Controls system uptime and accessibility requirements.

#### Example

```ts
'High'
```

#### Inherited from

[`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md).[`availabilityLevel`](SecurityWidgetBaseProps.md#availabilitylevel)

***

### children?

> `optional` **children**: `ReactNode`

Defined in: [types/widget-props.ts:244](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widget-props.ts#L244)

Optional children elements

#### Inherited from

[`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md).[`children`](SecurityWidgetBaseProps.md#children)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widget-props.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widget-props.ts#L124)

Optional CSS class name for custom styling

Allows consumers to apply custom styles via CSS classes.
Use Tailwind CSS classes or custom CSS classes.

#### Example

```ts
"mt-4 border-2 rounded-lg"
```

#### Inherited from

[`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md).[`className`](SecurityWidgetBaseProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widget-props.ts#L53)

The selected confidentiality level

Controls data privacy and access control requirements.

#### Example

```ts
'Moderate'
```

#### Inherited from

[`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md).[`confidentialityLevel`](SecurityWidgetBaseProps.md#confidentialitylevel)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widget-props.ts#L44)

The selected integrity level

Controls data accuracy and consistency requirements.

#### Example

```ts
'Very High'
```

#### Inherited from

[`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md).[`integrityLevel`](SecurityWidgetBaseProps.md#integritylevel)

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widget-props.ts#L68)

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

[`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md).[`onAvailabilityChange`](SecurityWidgetBaseProps.md#onavailabilitychange)

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:98](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widget-props.ts#L98)

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

[`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md).[`onConfidentialityChange`](SecurityWidgetBaseProps.md#onconfidentialitychange)

***

### onError()?

> `optional` **onError**: (`error`) => `void`

Defined in: [types/widget-props.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widget-props.ts#L250)

Optional callback when widget encounters an error

#### Parameters

##### error

`Error`

Error that occurred

#### Returns

`void`

#### Inherited from

[`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md).[`onError`](SecurityWidgetBaseProps.md#onerror)

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:83](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widget-props.ts#L83)

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

[`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md).[`onIntegrityChange`](SecurityWidgetBaseProps.md#onintegritychange)

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:126](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L126)

Optional overall security level

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widget-props.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widget-props.ts#L135)

Optional test ID for automated testing

Used by testing frameworks (Cypress, Vitest) to locate
and interact with the component. Should follow the pattern
defined in testIds constants.

#### Example

```ts
"security-widget-availability"
```

#### Inherited from

[`SecurityWidgetBaseProps`](SecurityWidgetBaseProps.md).[`testId`](SecurityWidgetBaseProps.md#testid)
