[**CIA Compliance Manager Diagrams v0.8.6**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [services](../README.md) / SecurityResourceService

# Class: SecurityResourceService

Defined in: [services/securityResourceService.ts:16](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/services/securityResourceService.ts#L16)

Service for security resource recommendations

## Extends

- [`BaseService`](BaseService.md)

## Constructors

### Constructor

> **new SecurityResourceService**(`dataProvider`): `SecurityResourceService`

Defined in: [services/securityResourceService.ts:19](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/services/securityResourceService.ts#L19)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../types/interfaces/CIADataProvider.md)

#### Returns

`SecurityResourceService`

#### Overrides

[`BaseService`](BaseService.md).[`constructor`](BaseService.md#constructor)

## Methods

### getSecurityResources()

> **getSecurityResources**(`component`, `level`): `EnhancedSecurityResource`[]

Defined in: [services/securityResourceService.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/services/securityResourceService.ts#L44)

Get security resources based on component and level

#### Parameters

##### component

`"general"` | [`CIAComponentType`](../../types/type-aliases/CIAComponentType.md) | `"all"`

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`EnhancedSecurityResource`[]

***

### getValuePoints()

> **getValuePoints**(`level`): `string`[]

Defined in: [services/securityResourceService.ts:174](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/services/securityResourceService.ts#L174)

Get value points for a security level

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

#### Overrides

`BaseService.getValuePoints`
