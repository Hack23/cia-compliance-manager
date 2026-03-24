[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/services](../README.md) / ISecurityResourceService

# Interface: ISecurityResourceService

Defined in: [types/services.ts:396](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L396)

Security Resource Service interface

Provides security resources and references

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

### getSecurityResources()

> **getSecurityResources**(`component`, `level`): [`SecurityResource`](../../securityResources/interfaces/SecurityResource.md)[]

Defined in: [types/services.ts:404](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L404)

Get security resources for a component and level

#### Parameters

##### component

[`CIAComponentType`](../../cia-services/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

[`SecurityResource`](../../securityResources/interfaces/SecurityResource.md)[]

Array of security resources

***

### getValuePoints()

> **getValuePoints**(`level`): `string`[]

Defined in: [types/services.ts:412](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L412)

Get value points for a security level

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`[]

Array of value points
