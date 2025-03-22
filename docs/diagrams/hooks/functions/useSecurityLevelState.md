[**CIA Compliance Manager Diagrams v0.8.5**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [hooks](../README.md) / useSecurityLevelState

# Function: useSecurityLevelState()

> **useSecurityLevelState**(`options`): `object`

Defined in: [hooks/useSecurityLevelState.ts:52](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/hooks/useSecurityLevelState.ts#L52)

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

> **availabilityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

### setAvailabilityLevel()

> **setAvailabilityLevel**: (`level`) => `void` = `handleAvailabilityChange`

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`void`

### setConfidentialityLevel()

> **setConfidentialityLevel**: (`level`) => `void` = `handleConfidentialityChange`

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`void`

### setIntegrityLevel()

> **setIntegrityLevel**: (`level`) => `void` = `handleIntegrityChange`

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`void`
