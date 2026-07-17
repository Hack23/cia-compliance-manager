[**CIA Compliance Manager — UML Diagrams v1.1.113**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/services](../README.md) / IServiceFactory

# Interface: IServiceFactory\<T\>

Defined in: [types/services.ts:420](https://github.com/Hack23/cia-compliance-manager/blob/74960a7f81055ddd90d84cebf46e733424aff851/src/types/services.ts#L420)

Service factory interface

Defines a standard way to create service instances

## Type Parameters

### T

`T` *extends* [`IBaseService`](IBaseService.md)

## Methods

### create()

> **create**(`config?`): `T`

Defined in: [types/services.ts:427](https://github.com/Hack23/cia-compliance-manager/blob/74960a7f81055ddd90d84cebf46e733424aff851/src/types/services.ts#L427)

Create a new service instance

#### Parameters

##### config?

[`ServiceConfig`](ServiceConfig.md)

Optional configuration

#### Returns

`T`

Service instance
