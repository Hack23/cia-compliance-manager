[**CIA Compliance Manager — UML Diagrams v1.1.135**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/services](../README.md) / IServiceFactory

# Interface: IServiceFactory\<T\>

Defined in: [types/services.ts:420](https://github.com/Hack23/cia-compliance-manager/blob/adbb4925fe59f61a674ca7ca5a3bd8d1bad15900/src/types/services.ts#L420)

Service factory interface

Defines a standard way to create service instances

## Type Parameters

### T

`T` *extends* [`IBaseService`](IBaseService.md)

## Methods

### create()

> **create**(`config?`): `T`

Defined in: [types/services.ts:427](https://github.com/Hack23/cia-compliance-manager/blob/adbb4925fe59f61a674ca7ca5a3bd8d1bad15900/src/types/services.ts#L427)

Create a new service instance

#### Parameters

##### config?

[`ServiceConfig`](ServiceConfig.md)

Optional configuration

#### Returns

`T`

Service instance
