[**CIA Compliance Manager Documentation v1.1.0**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [types](../README.md) / WithSecurityLevelProps

# Interface: WithSecurityLevelProps

Defined in: [types/widget-props.ts:27](https://github.com/Hack23/cia-compliance-manager/blob/c466031910d76c5cbb596249d801f7ed60a95e63/src/types/widget-props.ts#L27)

Standard interface for components that use security levels

This interface should be used by any component that needs to display
or modify security levels for the CIA triad components. It provides
a consistent pattern for props across the application.

## Example

```typescript
interface MyWidgetProps extends WithSecurityLevelProps {
  customProp: string;
}

const MyWidget: React.FC<MyWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  onAvailabilityChange
}) => {
  // Component implementation
};
```

## Extended by

- [`SecurityWidgetBaseProps`](../widgets/interfaces/SecurityWidgetBaseProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/c466031910d76c5cbb596249d801f7ed60a95e63/src/types/widget-props.ts#L35)

The selected availability level

Controls system uptime and accessibility requirements.

#### Example

```ts
'High'
```

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/c466031910d76c5cbb596249d801f7ed60a95e63/src/types/widget-props.ts#L53)

The selected confidentiality level

Controls data privacy and access control requirements.

#### Example

```ts
'Moderate'
```

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/c466031910d76c5cbb596249d801f7ed60a95e63/src/types/widget-props.ts#L44)

The selected integrity level

Controls data accuracy and consistency requirements.

#### Example

```ts
'Very High'
```

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/c466031910d76c5cbb596249d801f7ed60a95e63/src/types/widget-props.ts#L68)

Optional callback fired when availability level changes

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

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

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:98](https://github.com/Hack23/cia-compliance-manager/blob/c466031910d76c5cbb596249d801f7ed60a95e63/src/types/widget-props.ts#L98)

Optional callback fired when confidentiality level changes

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

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

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:83](https://github.com/Hack23/cia-compliance-manager/blob/c466031910d76c5cbb596249d801f7ed60a95e63/src/types/widget-props.ts#L83)

Optional callback fired when integrity level changes

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

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
