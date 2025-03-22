[**CIA Compliance Manager Documentation v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/businessImpactService](../README.md) / BusinessImpactService

# Class: BusinessImpactService

Defined in: [src/services/businessImpactService.ts:27](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/businessImpactService.ts#L27)

Service for business impact related functionality

## Business Perspective

This service quantifies the business impact of security controls across
different dimensions including financial, operational, reputational,
strategic, and regulatory perspectives. It helps organizations understand
the business value of their security investments. 💼

## Constructors

### new BusinessImpactService()

> **new BusinessImpactService**(`dataProvider`): `BusinessImpactService`

Defined in: [src/services/businessImpactService.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/businessImpactService.ts#L30)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/cia-services/interfaces/CIADataProvider.md)

#### Returns

`BusinessImpactService`

## Methods

### calculateBusinessImpactLevel()

> **calculateBusinessImpactLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [src/services/businessImpactService.ts:145](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/businessImpactService.ts#L145)

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

> **getBusinessImpact**(`component`, `level`): [`BusinessImpactDetails`](../../../types/cia-services/interfaces/BusinessImpactDetails.md)

Defined in: [src/services/businessImpactService.ts:41](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/businessImpactService.ts#L41)

Get business impact details for a security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

CIA component (confidentiality, integrity, availability)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `...`

Security level

#### Returns

[`BusinessImpactDetails`](../../../types/cia-services/interfaces/BusinessImpactDetails.md)

Business impact details

***

### getBusinessImpactDescription()

> **getBusinessImpactDescription**(`component`, `level`): `string`

Defined in: [src/services/businessImpactService.ts:77](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/businessImpactService.ts#L77)

Get business impact description for a security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

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

Defined in: [src/services/businessImpactService.ts:66](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/businessImpactService.ts#L66)

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

Defined in: [src/services/businessImpactService.ts:95](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/businessImpactService.ts#L95)

Get detailed description of business impact

#### Parameters

##### category

`string`

Impact category

##### detail?

[`BusinessImpactDetail`](../../../types/cia-services/interfaces/BusinessImpactDetail.md)

Business impact detail

#### Returns

`string`

Formatted detailed description
