[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/services](../README.md) / ITechnicalImplementationService

# Interface: ITechnicalImplementationService

Defined in: [types/services.ts:351](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L351)

Technical Implementation Service interface

Provides technical implementation guidance and details

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

### getTechnicalImplementation()

> **getTechnicalImplementation**(`component`, `level`): [`TechnicalImplementationDetails`](../../cia-services/interfaces/TechnicalImplementationDetails.md)

Defined in: [types/services.ts:359](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L359)

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

### getRecommendations()

> **getRecommendations**(`component`, `level`): `string`[]

Defined in: [types/services.ts:371](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L371)

Get recommendations for implementation

#### Parameters

##### component

[`CIAComponentType`](../../cia-services/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`[]

Array of recommendations

***

### getImplementationTime()

> **getImplementationTime**(`level`): `string`

Defined in: [types/services.ts:379](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L379)

Get implementation time estimate

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Time estimate string

***

### getTechnicalDescription()

> **getTechnicalDescription**(`component`, `level`): `string`

Defined in: [types/services.ts:388](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L388)

Get technical description

#### Parameters

##### component

[`CIAComponentType`](../../cia-services/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Technical description
