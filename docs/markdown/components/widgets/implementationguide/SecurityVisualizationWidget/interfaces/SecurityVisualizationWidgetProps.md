[**CIA Compliance Manager Documentation v0.8.5**](../../../../../README.md)

***

[CIA Compliance Manager Documentation](../../../../../modules.md) / [components/widgets/implementationguide/SecurityVisualizationWidget](../README.md) / SecurityVisualizationWidgetProps

# Interface: SecurityVisualizationWidgetProps

Defined in: [src/components/widgets/implementationguide/SecurityVisualizationWidget.tsx:33](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/implementationguide/SecurityVisualizationWidget.tsx#L33)

Standard interface for components that use security levels

## Extends

- [`WithSecurityLevelProps`](../../../../../types/widget-props/interfaces/WithSecurityLevelProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widget-props.ts:10](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widget-props.ts#L10)

The selected availability level

#### Inherited from

[`WithSecurityLevelProps`](../../../../../types/widget-props/interfaces/WithSecurityLevelProps.md).[`availabilityLevel`](../../../../../types/widget-props/interfaces/WithSecurityLevelProps.md#availabilitylevel)

***

### className?

> `optional` **className**: `string`

Defined in: [src/components/widgets/implementationguide/SecurityVisualizationWidget.tsx:38](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/implementationguide/SecurityVisualizationWidget.tsx#L38)

Optional CSS class name

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widget-props.ts:20](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widget-props.ts#L20)

The selected confidentiality level

#### Inherited from

[`WithSecurityLevelProps`](../../../../../types/widget-props/interfaces/WithSecurityLevelProps.md).[`confidentialityLevel`](../../../../../types/widget-props/interfaces/WithSecurityLevelProps.md#confidentialitylevel)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widget-props.ts:15](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widget-props.ts#L15)

The selected integrity level

#### Inherited from

[`WithSecurityLevelProps`](../../../../../types/widget-props/interfaces/WithSecurityLevelProps.md).[`integrityLevel`](../../../../../types/widget-props/interfaces/WithSecurityLevelProps.md#integritylevel)

***

### onAvailabilityChange()?

> `optional` **onAvailabilityChange**: (`level`) => `void`

Defined in: [src/types/widget-props.ts:25](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widget-props.ts#L25)

Optional callback for availability level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

[`WithSecurityLevelProps`](../../../../../types/widget-props/interfaces/WithSecurityLevelProps.md).[`onAvailabilityChange`](../../../../../types/widget-props/interfaces/WithSecurityLevelProps.md#onavailabilitychange)

***

### onConfidentialityChange()?

> `optional` **onConfidentialityChange**: (`level`) => `void`

Defined in: [src/types/widget-props.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widget-props.ts#L35)

Optional callback for confidentiality level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

[`WithSecurityLevelProps`](../../../../../types/widget-props/interfaces/WithSecurityLevelProps.md).[`onConfidentialityChange`](../../../../../types/widget-props/interfaces/WithSecurityLevelProps.md#onconfidentialitychange)

***

### onIntegrityChange()?

> `optional` **onIntegrityChange**: (`level`) => `void`

Defined in: [src/types/widget-props.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widget-props.ts#L30)

Optional callback for integrity level changes

#### Parameters

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

[`WithSecurityLevelProps`](../../../../../types/widget-props/interfaces/WithSecurityLevelProps.md).[`onIntegrityChange`](../../../../../types/widget-props/interfaces/WithSecurityLevelProps.md#onintegritychange)

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/components/widgets/implementationguide/SecurityVisualizationWidget.tsx:48](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/implementationguide/SecurityVisualizationWidget.tsx#L48)

Optional security level override

***

### testId?

> `optional` **testId**: `string`

Defined in: [src/components/widgets/implementationguide/SecurityVisualizationWidget.tsx:43](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/implementationguide/SecurityVisualizationWidget.tsx#L43)

Optional test ID for automated testing
