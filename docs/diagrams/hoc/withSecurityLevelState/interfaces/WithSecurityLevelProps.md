[**CIA Compliance Manager Diagrams v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [hoc/withSecurityLevelState](../README.md) / WithSecurityLevelProps

# Interface: WithSecurityLevelProps

Defined in: [src/hoc/withSecurityLevelState.tsx:10](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/hoc/withSecurityLevelState.tsx#L10)

Interface defining props for components with security level state

This interface is used by the withSecurityLevelState HOC and components
that need to handle security level props consistently.

## Properties

### availabilityLevel?

> `optional` **availabilityLevel**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/hoc/withSecurityLevelState.tsx:11](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/hoc/withSecurityLevelState.tsx#L11)

***

### confidentialityLevel?

> `optional` **confidentialityLevel**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/hoc/withSecurityLevelState.tsx:13](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/hoc/withSecurityLevelState.tsx#L13)

***

### integrityLevel?

> `optional` **integrityLevel**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/hoc/withSecurityLevelState.tsx:12](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/hoc/withSecurityLevelState.tsx#L12)

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [src/hoc/withSecurityLevelState.tsx:14](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/hoc/withSecurityLevelState.tsx#L14)

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [src/hoc/withSecurityLevelState.tsx:16](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/hoc/withSecurityLevelState.tsx#L16)

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [src/hoc/withSecurityLevelState.tsx:15](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/hoc/withSecurityLevelState.tsx#L15)

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`
