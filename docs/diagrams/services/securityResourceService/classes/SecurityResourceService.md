[**CIA Compliance Manager Diagrams v0.8.36**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/securityResourceService](../README.md) / SecurityResourceService

# Class: SecurityResourceService

Defined in: [services/securityResourceService.ts:16](https://github.com/Hack23/cia-compliance-manager/blob/2ec0557cf80706d3ac1df0334a4af519a5787366/src/services/securityResourceService.ts#L16)

Service for security resource recommendations

## Extends

- [`BaseService`](../../BaseService/classes/BaseService.md)

## Constructors

### Constructor

> **new SecurityResourceService**(`dataProvider`): `SecurityResourceService`

Defined in: [services/securityResourceService.ts:19](https://github.com/Hack23/cia-compliance-manager/blob/2ec0557cf80706d3ac1df0334a4af519a5787366/src/services/securityResourceService.ts#L19)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/interfaces/CIADataProvider.md)

#### Returns

`SecurityResourceService`

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`constructor`](../../BaseService/classes/BaseService.md#constructor)

## Methods

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): [`CIADetails`](../../../types/interfaces/CIADetails.md) \| `undefined`

Defined in: [services/BaseService.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/2ec0557cf80706d3ac1df0334a4af519a5787366/src/services/BaseService.ts#L53)

Get component details for a specific component and security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`CIADetails`](../../../types/interfaces/CIADetails.md) \| `undefined`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getComponentDetails`](../../BaseService/classes/BaseService.md#getcomponentdetails)

***

### getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [services/BaseService.ts:114](https://github.com/Hack23/cia-compliance-manager/blob/2ec0557cf80706d3ac1df0334a4af519a5787366/src/services/BaseService.ts#L114)

Get risk level from security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getRiskLevelFromSecurityLevel`](../../BaseService/classes/BaseService.md#getrisklevelfromsecuritylevel)

***

### getSecurityLevelDescription()

> **getSecurityLevelDescription**(`level`): `string`

Defined in: [services/BaseService.ts:93](https://github.com/Hack23/cia-compliance-manager/blob/2ec0557cf80706d3ac1df0334a4af519a5787366/src/services/BaseService.ts#L93)

Get security level description

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getSecurityLevelDescription`](../../BaseService/classes/BaseService.md#getsecurityleveldescription)

***

### getSecurityResources()

> **getSecurityResources**(`component`, `level`): `EnhancedSecurityResource`[]

Defined in: [services/securityResourceService.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/2ec0557cf80706d3ac1df0334a4af519a5787366/src/services/securityResourceService.ts#L44)

Get security resources based on component and level

#### Parameters

##### component

`"general"` | [`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md) | `"all"`

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`EnhancedSecurityResource`[]

***

### getValuePoints()

> **getValuePoints**(`level`): `string`[]

Defined in: [services/securityResourceService.ts:174](https://github.com/Hack23/cia-compliance-manager/blob/2ec0557cf80706d3ac1df0334a4af519a5787366/src/services/securityResourceService.ts#L174)

Get value points for a security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

#### Overrides

`BaseService.getValuePoints`
