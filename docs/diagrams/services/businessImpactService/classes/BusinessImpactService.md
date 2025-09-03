[**CIA Compliance Manager Diagrams v0.8.25**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/businessImpactService](../README.md) / BusinessImpactService

# Class: BusinessImpactService

Defined in: [services/businessImpactService.ts:34](https://github.com/Hack23/cia-compliance-manager/blob/b7816746b3b7f5e02cb18303af9cc6696a8caef9/src/services/businessImpactService.ts#L34)

Service for business impact related functionality

## Business Perspective

This service quantifies the business impact of security controls across
different dimensions including financial, operational, reputational,
strategic, and regulatory perspectives. It helps organizations understand
the business value of their security investments. 💼

## Extends

- [`BaseService`](../../BaseService/classes/BaseService.md)

## Constructors

### Constructor

> **new BusinessImpactService**(`dataProvider`): `BusinessImpactService`

Defined in: [services/businessImpactService.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/b7816746b3b7f5e02cb18303af9cc6696a8caef9/src/services/businessImpactService.ts#L35)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/interfaces/CIADataProvider.md)

#### Returns

`BusinessImpactService`

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`constructor`](../../BaseService/classes/BaseService.md#constructor)

## Methods

### calculateBusinessImpactLevel()

> **calculateBusinessImpactLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/businessImpactService.ts:215](https://github.com/Hack23/cia-compliance-manager/blob/b7816746b3b7f5e02cb18303af9cc6696a8caef9/src/services/businessImpactService.ts#L215)

Calculate business impact level based on security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Confidentiality security level

#### Returns

`string`

Business impact level description

***

### getBusinessImpact()

> **getBusinessImpact**(`component`, `level`): [`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md)

Defined in: [services/businessImpactService.ts:46](https://github.com/Hack23/cia-compliance-manager/blob/b7816746b3b7f5e02cb18303af9cc6696a8caef9/src/services/businessImpactService.ts#L46)

Get business impact details for a security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

CIA component (confidentiality, integrity, availability)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `...`

Security level

#### Returns

[`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md)

Business impact details

***

### getBusinessImpactDescription()

> **getBusinessImpactDescription**(`component`, `level`): `string`

Defined in: [services/businessImpactService.ts:118](https://github.com/Hack23/cia-compliance-manager/blob/b7816746b3b7f5e02cb18303af9cc6696a8caef9/src/services/businessImpactService.ts#L118)

Get business impact description for a security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

CIA component

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Business impact description

***

### getCategoryIcon()

> **getCategoryIcon**(`category`): `string`

Defined in: [services/businessImpactService.ts:107](https://github.com/Hack23/cia-compliance-manager/blob/b7816746b3b7f5e02cb18303af9cc6696a8caef9/src/services/businessImpactService.ts#L107)

Get impact category icon

#### Parameters

##### category

`string`

Impact category

#### Returns

`string`

Emoji icon representing the category

***

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): `undefined` \| [`CIADetails`](../../../types/interfaces/CIADetails.md)

Defined in: [services/BaseService.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/b7816746b3b7f5e02cb18303af9cc6696a8caef9/src/services/BaseService.ts#L53)

Get component details for a specific component and security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`undefined` \| [`CIADetails`](../../../types/interfaces/CIADetails.md)

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getComponentDetails`](../../BaseService/classes/BaseService.md#getcomponentdetails)

***

### getDetailedDescription()

> **getDetailedDescription**(`category`, `detail?`): `string`

Defined in: [services/businessImpactService.ts:141](https://github.com/Hack23/cia-compliance-manager/blob/b7816746b3b7f5e02cb18303af9cc6696a8caef9/src/services/businessImpactService.ts#L141)

Get detailed description of business impact

#### Parameters

##### category

`string`

Impact category

##### detail?

[`BusinessImpactDetail`](../../../types/interfaces/BusinessImpactDetail.md)

Business impact detail

#### Returns

`string`

Formatted detailed description

***

### getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [services/businessImpactService.ts:331](https://github.com/Hack23/cia-compliance-manager/blob/b7816746b3b7f5e02cb18303af9cc6696a8caef9/src/services/businessImpactService.ts#L331)

Get risk level from security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Risk level

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`getRiskLevelFromSecurityLevel`](../../BaseService/classes/BaseService.md#getrisklevelfromsecuritylevel)

***

### getSecurityLevelDescription()

> **getSecurityLevelDescription**(`level`): `string`

Defined in: [services/BaseService.ts:93](https://github.com/Hack23/cia-compliance-manager/blob/b7816746b3b7f5e02cb18303af9cc6696a8caef9/src/services/BaseService.ts#L93)

Get security level description

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getSecurityLevelDescription`](../../BaseService/classes/BaseService.md#getsecurityleveldescription)
