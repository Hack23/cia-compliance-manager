[**CIA Compliance Manager Diagrams v0.8.6**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [services](../README.md) / BusinessImpactService

# Class: BusinessImpactService

Defined in: [services/businessImpactService.ts:33](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/services/businessImpactService.ts#L33)

Service for business impact related functionality

## Business Perspective

This service quantifies the business impact of security controls across
different dimensions including financial, operational, reputational,
strategic, and regulatory perspectives. It helps organizations understand
the business value of their security investments. 💼

## Constructors

### Constructor

> **new BusinessImpactService**(`dataProvider`): `BusinessImpactService`

Defined in: [services/businessImpactService.ts:36](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/services/businessImpactService.ts#L36)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../types/interfaces/CIADataProvider.md)

#### Returns

`BusinessImpactService`

## Methods

### calculateBusinessImpactLevel()

> **calculateBusinessImpactLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/businessImpactService.ts:182](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/services/businessImpactService.ts#L182)

Calculate business impact level based on security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md) = `availabilityLevel`

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md) = `availabilityLevel`

Confidentiality security level

#### Returns

`string`

Business impact level description

***

### getBusinessImpact()

> **getBusinessImpact**(`component`, `level`): [`BusinessImpactDetails`](../../types/interfaces/BusinessImpactDetails.md)

Defined in: [services/businessImpactService.ts:47](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/services/businessImpactService.ts#L47)

Get business impact details for a security level

#### Parameters

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

CIA component (confidentiality, integrity, availability)

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md) = `...`

Security level

#### Returns

[`BusinessImpactDetails`](../../types/interfaces/BusinessImpactDetails.md)

Business impact details

***

### getBusinessImpactDescription()

> **getBusinessImpactDescription**(`component`, `level`): `string`

Defined in: [services/businessImpactService.ts:85](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/services/businessImpactService.ts#L85)

Get business impact description for a security level

#### Parameters

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

CIA component

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Business impact description

***

### getCategoryIcon()

> **getCategoryIcon**(`category`): `string`

Defined in: [services/businessImpactService.ts:74](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/services/businessImpactService.ts#L74)

Get impact category icon

#### Parameters

##### category

`string`

Impact category

#### Returns

`string`

Emoji icon representing the category

***

### getDetailedDescription()

> **getDetailedDescription**(`category`, `detail`?): `string`

Defined in: [services/businessImpactService.ts:108](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/services/businessImpactService.ts#L108)

Get detailed description of business impact

#### Parameters

##### category

`string`

Impact category

##### detail?

[`BusinessImpactDetail`](../../types/interfaces/BusinessImpactDetail.md)

Business impact detail

#### Returns

`string`

Formatted detailed description
