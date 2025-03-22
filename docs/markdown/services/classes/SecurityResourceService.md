[**CIA Compliance Manager Documentation v0.8.5**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [services](../README.md) / SecurityResourceService

# Class: SecurityResourceService

Defined in: [services/securityResourceService.ts:28](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/securityResourceService.ts#L28)

Service for security resources related functionality

## Educational Perspective

This service provides educational resources and implementation guides
that help security teams build their knowledge and implement security
controls effectively. It curates relevant documentation and learning
resources based on selected security levels. 📚

## Extends

- [`BaseService`](BaseService.md)

## Constructors

### new SecurityResourceService()

> **new SecurityResourceService**(`dataProvider`): `SecurityResourceService`

Defined in: [services/securityResourceService.ts:29](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/securityResourceService.ts#L29)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../types/interfaces/CIADataProvider.md)

#### Returns

`SecurityResourceService`

#### Overrides

[`BaseService`](BaseService.md).[`constructor`](BaseService.md#constructor)

## Methods

### getSecurityResources()

> **getSecurityResources**(`component`, `level`): [`SecurityResource`](../interfaces/SecurityResource.md)[]

Defined in: [services/securityResourceService.ts:43](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/securityResourceService.ts#L43)

Get security resources for a specific level

#### Parameters

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

[`SecurityResource`](../interfaces/SecurityResource.md)[]

***

### getValuePoints()

> **getValuePoints**(`level`): `string`[]

Defined in: [services/securityResourceService.ts:36](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/securityResourceService.ts#L36)

Get value points for a security level

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

#### Overrides

`BaseService.getValuePoints`
