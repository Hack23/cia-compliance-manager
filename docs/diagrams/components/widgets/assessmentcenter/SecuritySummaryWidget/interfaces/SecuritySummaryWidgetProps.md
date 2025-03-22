[**CIA Compliance Manager Diagrams v0.8.5**](../../../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../../../modules.md) / [components/widgets/assessmentcenter/SecuritySummaryWidget](../README.md) / SecuritySummaryWidgetProps

# Interface: SecuritySummaryWidgetProps

Defined in: [src/components/widgets/assessmentcenter/SecuritySummaryWidget.tsx:18](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/assessmentcenter/SecuritySummaryWidget.tsx#L18)

SecuritySummaryWidget props extend SecurityWidgetProps

## Extends

- [`SecurityWidgetProps`](../../../../../types/widget-props/type-aliases/SecurityWidgetProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widget-props.ts:10](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widget-props.ts#L10)

The selected availability level

#### Inherited from

`SecurityWidgetProps.availabilityLevel`

***

### className?

> `optional` **className**: `string`

Defined in: [src/types/widget-props.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widget-props.ts#L45)

Optional CSS class name

#### Inherited from

`SecurityWidgetProps.className`

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widget-props.ts:20](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widget-props.ts#L20)

The selected confidentiality level

#### Inherited from

`SecurityWidgetProps.confidentialityLevel`

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widget-props.ts:15](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widget-props.ts#L15)

The selected integrity level

#### Inherited from

`SecurityWidgetProps.integrityLevel`

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

`SecurityWidgetProps.onAvailabilityChange`

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

`SecurityWidgetProps.onConfidentialityChange`

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

`SecurityWidgetProps.onIntegrityChange`

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/components/widgets/assessmentcenter/SecuritySummaryWidget.tsx:22](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/components/widgets/assessmentcenter/SecuritySummaryWidget.tsx#L22)

Optional overall security level

***

### testId?

> `optional` **testId**: `string`

Defined in: [src/types/widget-props.ts:50](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widget-props.ts#L50)

Optional test ID for automated testing

#### Inherited from

`SecurityWidgetProps.testId`
