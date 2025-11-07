[**CIA Compliance Manager Documentation v0.8.38**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [types](../README.md) / WithSecurityLevelProps

# Interface: WithSecurityLevelProps

Defined in: [types/widget-props.ts:6](https://github.com/Hack23/cia-compliance-manager/blob/aedb85c440cd82a5c63a8b131e99fe72da8b07ec/src/types/widget-props.ts#L6)

Standard interface for components that use security levels

## Extended by

- [`SecurityWidgetBaseProps`](../widgets/interfaces/SecurityWidgetBaseProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:10](https://github.com/Hack23/cia-compliance-manager/blob/aedb85c440cd82a5c63a8b131e99fe72da8b07ec/src/types/widget-props.ts#L10)

The selected availability level

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:20](https://github.com/Hack23/cia-compliance-manager/blob/aedb85c440cd82a5c63a8b131e99fe72da8b07ec/src/types/widget-props.ts#L20)

The selected confidentiality level

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widget-props.ts:15](https://github.com/Hack23/cia-compliance-manager/blob/aedb85c440cd82a5c63a8b131e99fe72da8b07ec/src/types/widget-props.ts#L15)

The selected integrity level

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:25](https://github.com/Hack23/cia-compliance-manager/blob/aedb85c440cd82a5c63a8b131e99fe72da8b07ec/src/types/widget-props.ts#L25)

Optional callback for availability level changes

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/aedb85c440cd82a5c63a8b131e99fe72da8b07ec/src/types/widget-props.ts#L35)

Optional callback for confidentiality level changes

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [types/widget-props.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/aedb85c440cd82a5c63a8b131e99fe72da8b07ec/src/types/widget-props.ts#L30)

Optional callback for integrity level changes

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`
