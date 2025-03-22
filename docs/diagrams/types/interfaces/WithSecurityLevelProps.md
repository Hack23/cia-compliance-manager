[**CIA Compliance Manager Diagrams v0.8.5**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / WithSecurityLevelProps

# Interface: WithSecurityLevelProps

Defined in: [types/widget-props.ts:6](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widget-props.ts#L6)

Standard interface for components that use security levels

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:10](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widget-props.ts#L10)

The selected availability level

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:20](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widget-props.ts#L20)

The selected confidentiality level

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:15](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widget-props.ts#L15)

The selected integrity level

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:25](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widget-props.ts#L25)

Optional callback for availability level changes

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widget-props.ts#L35)

Optional callback for confidentiality level changes

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/types/widget-props.ts#L30)

Optional callback for integrity level changes

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`void`
