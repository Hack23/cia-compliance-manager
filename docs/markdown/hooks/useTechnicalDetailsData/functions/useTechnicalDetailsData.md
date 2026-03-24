[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [hooks/useTechnicalDetailsData](../README.md) / useTechnicalDetailsData

# Function: useTechnicalDetailsData()

> **useTechnicalDetailsData**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `ciaContentService`): `object`

Defined in: [hooks/useTechnicalDetailsData.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/hooks/useTechnicalDetailsData.ts#L26)

Custom hook for TechnicalDetailsWidget helper functions and data
Centralizes all fallback logic for technical details

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Selected availability security level

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Selected integrity security level

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Selected confidentiality security level

### ciaContentService

`unknown`

CIA content service instance

## Returns

Computed technical details data and helper functions

### confidentialityDetails

> **confidentialityDetails**: `object`

### integrityDetails

> **integrityDetails**: `object`

### availabilityDetails

> **availabilityDetails**: `object`

### confidentialityComplexity

> **confidentialityComplexity**: `object`

#### confidentialityComplexity.value

> **value**: `number`

#### confidentialityComplexity.label

> **label**: `string` = `complexity`

### integrityComplexity

> **integrityComplexity**: `object`

#### integrityComplexity.value

> **value**: `number`

#### integrityComplexity.label

> **label**: `string` = `complexity`

### availabilityComplexity

> **availabilityComplexity**: `object`

#### availabilityComplexity.value

> **value**: `number`

#### availabilityComplexity.label

> **label**: `string` = `complexity`

### getTechnicalDescription

> **getTechnicalDescription**: (`component`, `level`) => `string`

Gets technical description for a CIA component

#### Parameters

##### component

[`CIAComponent`](../../../types/cia/type-aliases/CIAComponent.md)

The CIA component

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The security level

#### Returns

`string`

Technical description text

### getTechnicalRequirements

> **getTechnicalRequirements**: (`component`, `level`) => `string`[]

Gets technical requirements for a CIA component

#### Parameters

##### component

[`CIAComponent`](../../../types/cia/type-aliases/CIAComponent.md)

The CIA component

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The security level

#### Returns

`string`[]

Array of technical requirements

### getTechnologies

> **getTechnologies**: (`component`, `level`) => `string`

Gets technologies for a CIA component

#### Parameters

##### component

[`CIAComponent`](../../../types/cia/type-aliases/CIAComponent.md)

The CIA component

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The security level

#### Returns

`string`

Technologies description

### getConfigurations

> **getConfigurations**: (`component`, `level`) => `string`

Gets configurations for a CIA component

#### Parameters

##### component

[`CIAComponent`](../../../types/cia/type-aliases/CIAComponent.md)

The CIA component

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The security level

#### Returns

`string`

Configurations description

### getExpertiseRequired

> **getExpertiseRequired**: (`component`, `level`) => `string`[]

Gets expertise requirements for a CIA component

#### Parameters

##### component

[`CIAComponent`](../../../types/cia/type-aliases/CIAComponent.md)

The CIA component

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The security level

#### Returns

`string`[]

Array of expertise requirements
