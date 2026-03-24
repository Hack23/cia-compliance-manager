[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/services](../README.md) / ICIAContentService

# Interface: ICIAContentService

Defined in: [types/services.ts:106](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L106)

CIA Content Service interface

Provides access to CIA triad content, ROI calculations, and security metrics

## Extends

- [`IBaseService`](IBaseService.md)

## Properties

### name

> `readonly` **name**: `string`

Defined in: [types/services.ts:82](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L82)

Service name for identification and logging

#### Inherited from

[`IBaseService`](IBaseService.md).[`name`](IBaseService.md#name)

## Methods

### validate()

> **validate**(`input`): `boolean`

Defined in: [types/services.ts:90](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L90)

Validate input parameters (returns simple boolean)

#### Parameters

##### input

`unknown`

Input to validate

#### Returns

`boolean`

True if valid, false otherwise

#### Inherited from

[`IBaseService`](IBaseService.md).[`validate`](IBaseService.md#validate)

***

### handleError()

> **handleError**(`error`): [`ServiceError`](../../../services/errors/classes/ServiceError.md)

Defined in: [types/services.ts:98](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L98)

Handle errors consistently across services

#### Parameters

##### error

`Error`

Error to handle

#### Returns

[`ServiceError`](../../../services/errors/classes/ServiceError.md)

Formatted ServiceError

#### Inherited from

[`IBaseService`](IBaseService.md).[`handleError`](IBaseService.md#handleerror)

***

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): [`CIADetails`](../../cia-services/interfaces/CIADetails.md) \| `undefined`

Defined in: [types/services.ts:114](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L114)

Get details for a specific CIA component and security level

#### Parameters

##### component

[`CIAComponentType`](../../cia-services/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

[`CIADetails`](../../cia-services/interfaces/CIADetails.md) \| `undefined`

Component details or undefined if not found

***

### calculateRoi()

> **calculateRoi**(`level`, `implementationCost`): `object`

Defined in: [types/services.ts:126](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L126)

Calculate ROI for a security implementation

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Security level

##### implementationCost

`number`

Cost of implementation

#### Returns

`object`

ROI metrics

##### value

> **value**: `string`

##### percentage

> **percentage**: `string`

##### description

> **description**: `string`

***

### getROIEstimate()

> **getROIEstimate**(`level`): [`ROIEstimate`](../../cia-services/interfaces/ROIEstimate.md)

Defined in: [types/services.ts:138](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L138)

Get ROI estimate for a security level

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

[`ROIEstimate`](../../cia-services/interfaces/ROIEstimate.md)

ROI estimate details

***

### getBusinessImpact()

> **getBusinessImpact**(`component`, `level`): [`BusinessImpactDetails`](../../cia-services/interfaces/BusinessImpactDetails.md)

Defined in: [types/services.ts:147](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L147)

Get business impact details for a component and level

#### Parameters

##### component

[`CIAComponentType`](../../cia-services/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

[`BusinessImpactDetails`](../../cia-services/interfaces/BusinessImpactDetails.md)

Business impact details

***

### getTechnicalImplementation()

> **getTechnicalImplementation**(`component`, `level`): [`TechnicalImplementationDetails`](../../cia-services/interfaces/TechnicalImplementationDetails.md)

Defined in: [types/services.ts:159](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L159)

Get technical implementation details

#### Parameters

##### component

[`CIAComponentType`](../../cia-services/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

[`TechnicalImplementationDetails`](../../cia-services/interfaces/TechnicalImplementationDetails.md)

Technical implementation details

***

### getSecurityMetrics()

> **getSecurityMetrics**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`ISecurityMetrics`](ISecurityMetrics.md)

Defined in: [types/services.ts:172](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L172)

Get security metrics for given security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Confidentiality security level

#### Returns

[`ISecurityMetrics`](ISecurityMetrics.md)

Security metrics
