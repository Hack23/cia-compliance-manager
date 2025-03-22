[**CIA Compliance Manager Diagrams v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [hooks/useSecurityLevelSync](../README.md) / useSecurityLevelSync

# Function: useSecurityLevelSync()

> **useSecurityLevelSync**(`propsOrAvailability`, `integrityOrCallbacks`, `confidentiality`): `object`

Defined in: [src/hooks/useSecurityLevelSync.ts:22](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/hooks/useSecurityLevelSync.ts#L22)

Hook for synchronizing security level state between component props and internal state

This hook provides a way to manage security level state that can be controlled
both by component props and internal state, maintaining synchronization between them.

## Business Perspective

Security level synchronization ensures that components reflect the organization's
current security posture accurately throughout the application. This maintains
consistency in assessment and reporting. 🔒

## Parameters

### propsOrAvailability

Either component props with levels or direct availability level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) | [`WithSecurityLevelProps`](../../../hoc/withSecurityLevelState/interfaces/WithSecurityLevelProps.md)

### integrityOrCallbacks

Either integrity level or object with callbacks

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) | \{ `onAvailabilityChange`: (`level`) => `void`; `onConfidentialityChange`: (`level`) => `void`; `onIntegrityChange`: (`level`) => `void`; \}

### confidentiality

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `"Moderate"`

Confidentiality level (only used in direct mode)

## Returns

`object`

Object containing local state and setters

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `confidLevel`

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
