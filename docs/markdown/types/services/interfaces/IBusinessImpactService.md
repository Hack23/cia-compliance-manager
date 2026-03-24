[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/services](../README.md) / IBusinessImpactService

# Interface: IBusinessImpactService

Defined in: [types/services.ts:243](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L243)

Business Impact Service interface

Provides business impact analysis and risk assessment

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

### getBusinessImpact()

> **getBusinessImpact**(`component`, `level`): [`BusinessImpactDetails`](../../cia-services/interfaces/BusinessImpactDetails.md)

Defined in: [types/services.ts:251](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L251)

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

### getBusinessImpactDescription()

> **getBusinessImpactDescription**(`component`, `level`): `string`

Defined in: [types/services.ts:263](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L263)

Get business impact description

#### Parameters

##### component

[`CIAComponentType`](../../cia-services/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Business impact description

***

### calculateBusinessImpactLevel()

> **calculateBusinessImpactLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [types/services.ts:276](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L276)

Calculate overall business impact level

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

`string`

Business impact level description

***

### getCategoryIcon()

> **getCategoryIcon**(`category`): `string`

Defined in: [types/services.ts:288](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L288)

Get category icon for business impact visualization

#### Parameters

##### category

`string`

Impact category

#### Returns

`string`

Icon string (emoji)
