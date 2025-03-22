[**CIA Compliance Manager Documentation v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [hooks/useSecurityLevelState](../README.md) / useSecurityLevelState

# Function: useSecurityLevelState()

> **useSecurityLevelState**(`options`): `object`

Defined in: [src/hooks/useSecurityLevelState.ts:49](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/hooks/useSecurityLevelState.ts#L49)

Hook that combines global security level context with component-specific overrides

This provides a unified way for components to both read from global state
and propagate changes back to it, while allowing component-specific overrides.

## Parameters

### options

`UseSecurityLevelStateOptions` = `{}`

Configuration options including overrides and change handlers

## Returns

`object`

Security levels and setter functions

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### setAvailabilityLevel()

> **setAvailabilityLevel**: (`level`) => `void` = `handleAvailabilityChange`

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

### setConfidentialityLevel()

> **setConfidentialityLevel**: (`level`) => `void` = `handleConfidentialityChange`

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

### setIntegrityLevel()

> **setIntegrityLevel**: (`level`) => `void` = `handleIntegrityChange`

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`
