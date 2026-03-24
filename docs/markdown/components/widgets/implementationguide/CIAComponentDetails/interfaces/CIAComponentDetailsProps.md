[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../../../modules.md) / [components/widgets/implementationguide/CIAComponentDetails](../README.md) / CIAComponentDetailsProps

# Interface: CIAComponentDetailsProps

Defined in: [components/widgets/implementationguide/CIAComponentDetails.tsx:63](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/widgets/implementationguide/CIAComponentDetails.tsx#L63)

Props for CIAComponentDetails component

## Properties

### component

> **component**: [`CIAComponent`](../../../../../types/cia/type-aliases/CIAComponent.md)

Defined in: [components/widgets/implementationguide/CIAComponentDetails.tsx:64](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/widgets/implementationguide/CIAComponentDetails.tsx#L64)

***

### level

> **level**: [`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [components/widgets/implementationguide/CIAComponentDetails.tsx:65](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/widgets/implementationguide/CIAComponentDetails.tsx#L65)

***

### details

> **details**: `unknown`

Defined in: [components/widgets/implementationguide/CIAComponentDetails.tsx:66](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/widgets/implementationguide/CIAComponentDetails.tsx#L66)

***

### ciaContentService

> **ciaContentService**: `unknown`

Defined in: [components/widgets/implementationguide/CIAComponentDetails.tsx:67](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/widgets/implementationguide/CIAComponentDetails.tsx#L67)

***

### testId

> **testId**: `string`

Defined in: [components/widgets/implementationguide/CIAComponentDetails.tsx:68](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/widgets/implementationguide/CIAComponentDetails.tsx#L68)

***

### getTechnicalDescription

> **getTechnicalDescription**: (`component`, `level`) => `string`

Defined in: [components/widgets/implementationguide/CIAComponentDetails.tsx:69](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/widgets/implementationguide/CIAComponentDetails.tsx#L69)

#### Parameters

##### component

[`CIAComponent`](../../../../../types/cia/type-aliases/CIAComponent.md)

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getTechnicalRequirements

> **getTechnicalRequirements**: (`component`, `level`) => `string`[]

Defined in: [components/widgets/implementationguide/CIAComponentDetails.tsx:70](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/widgets/implementationguide/CIAComponentDetails.tsx#L70)

#### Parameters

##### component

[`CIAComponent`](../../../../../types/cia/type-aliases/CIAComponent.md)

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### getTechnologies

> **getTechnologies**: (`component`, `level`) => `string`

Defined in: [components/widgets/implementationguide/CIAComponentDetails.tsx:71](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/widgets/implementationguide/CIAComponentDetails.tsx#L71)

#### Parameters

##### component

[`CIAComponent`](../../../../../types/cia/type-aliases/CIAComponent.md)

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getConfigurations

> **getConfigurations**: (`component`, `level`) => `string`

Defined in: [components/widgets/implementationguide/CIAComponentDetails.tsx:72](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/widgets/implementationguide/CIAComponentDetails.tsx#L72)

#### Parameters

##### component

[`CIAComponent`](../../../../../types/cia/type-aliases/CIAComponent.md)

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getExpertiseRequired

> **getExpertiseRequired**: (`component`, `level`) => `string`[]

Defined in: [components/widgets/implementationguide/CIAComponentDetails.tsx:73](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/components/widgets/implementationguide/CIAComponentDetails.tsx#L73)

#### Parameters

##### component

[`CIAComponent`](../../../../../types/cia/type-aliases/CIAComponent.md)

##### level

[`SecurityLevel`](../../../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]
