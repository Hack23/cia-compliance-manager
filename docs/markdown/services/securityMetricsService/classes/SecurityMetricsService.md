[**CIA Compliance Manager Documentation v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/securityMetricsService](../README.md) / SecurityMetricsService

# Class: SecurityMetricsService

Defined in: [src/services/securityMetricsService.ts:96](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/securityMetricsService.ts#L96)

Service for security metrics and measurements

## Analytics Perspective

This service provides quantitative metrics for security levels, enabling
organizations to measure their security posture, track improvements over time,
and quantify the impact of security investments through cost-benefit analysis
and risk reduction calculations. 📊

## Extends

- [`BaseService`](../../BaseService/classes/BaseService.md)

## Constructors

### new SecurityMetricsService()

> **new SecurityMetricsService**(`dataProvider`): `SecurityMetricsService`

Defined in: [src/services/securityMetricsService.ts:97](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/securityMetricsService.ts#L97)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/cia-services/interfaces/CIADataProvider.md)

#### Returns

`SecurityMetricsService`

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`constructor`](../../BaseService/classes/BaseService.md#constructor)

## Properties

### dataProvider

> `protected` **dataProvider**: [`CIADataProvider`](../../../types/cia-services/interfaces/CIADataProvider.md)

Defined in: [src/services/BaseService.ts:18](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/BaseService.ts#L18)

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`dataProvider`](../../BaseService/classes/BaseService.md#dataprovider)

## Methods

### calculateRoi()

> **calculateRoi**(`securityLevel`, `implementationCost`): [`ROIMetrics`](../../../types/cia-services/interfaces/ROIMetrics.md)

Defined in: [src/services/securityMetricsService.ts:108](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/securityMetricsService.ts#L108)

Calculate ROI metrics based on security level and implementation cost

#### Parameters

##### securityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Selected security level

##### implementationCost

`number`

Cost of implementation in currency units

#### Returns

[`ROIMetrics`](../../../types/cia-services/interfaces/ROIMetrics.md)

ROI metrics with value, percentage and description

***

### calculateSecurityScore()

> **calculateSecurityScore**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `number`

Defined in: [src/services/securityMetricsService.ts:471](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/securityMetricsService.ts#L471)

Calculate security score based on security levels

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

`number`

Security score (0-100)

***

### getComponentMetrics()

> **getComponentMetrics**(`component`, `level`): `ComponentMetrics`

Defined in: [src/services/securityMetricsService.ts:222](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/securityMetricsService.ts#L222)

Get component-specific metrics

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`ComponentMetrics`

Component metrics

***

### getComponentTechnicalMetrics()

> **getComponentTechnicalMetrics**(`component`, `level`): `Record`\<`string`, `string`\>

Defined in: [src/services/securityMetricsService.ts:248](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/securityMetricsService.ts#L248)

Get technical metrics for a component

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

The CIA component

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The security level

#### Returns

`Record`\<`string`, `string`\>

Component technical metrics

***

### getImpactMetrics()

> **getImpactMetrics**(`component`, `level`): `ImpactMetrics`

Defined in: [src/services/securityMetricsService.ts:273](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/securityMetricsService.ts#L273)

Get impact metrics for a component and level

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`ImpactMetrics`

Impact metrics

***

### getProtectionLevel()

> **getProtectionLevel**(`level`): `string`

Defined in: [src/services/securityMetricsService.ts:373](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/securityMetricsService.ts#L373)

Get protection level based on security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Protection level description

***

### getRiskBadgeVariant()

> **getRiskBadgeVariant**(`riskLevel`): `"success"` \| `"info"` \| `"warning"` \| `"error"` \| `"neutral"`

Defined in: [src/services/securityMetricsService.ts:406](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/securityMetricsService.ts#L406)

Get appropriate UI badge variant for a risk level

#### Parameters

##### riskLevel

`string`

Risk level string (High, Medium, Low, etc.)

#### Returns

`"success"` \| `"info"` \| `"warning"` \| `"error"` \| `"neutral"`

Badge variant name

***

### getROIEstimates()

> **getROIEstimates**(): [`ROIEstimatesMap`](../interfaces/ROIEstimatesMap.md)

Defined in: [src/services/securityMetricsService.ts:145](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/securityMetricsService.ts#L145)

Get ROI estimates from the data provider

#### Returns

[`ROIEstimatesMap`](../interfaces/ROIEstimatesMap.md)

Map of ROI estimates for different security levels

***

### getSecurityIcon()

> **getSecurityIcon**(`level`): `string`

Defined in: [src/services/securityMetricsService.ts:436](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/securityMetricsService.ts#L436)

Get security icon for a security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Security icon (emoji)

***

### getSecurityLevelDescription()

> **getSecurityLevelDescription**(`level`): `string`

Defined in: [src/services/securityMetricsService.ts:350](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/securityMetricsService.ts#L350)

Get security level description based on level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Textual description of security level

***

### getSecurityLevelFromValue()

> **getSecurityLevelFromValue**(`value`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/services/securityMetricsService.ts:446](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/securityMetricsService.ts#L446)

Get security level from a numeric value

#### Parameters

##### value

`number`

Numeric security level value (0-4)

#### Returns

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level string representation

***

### getSecurityMetrics()

> **getSecurityMetrics**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `SecurityMetrics`

Defined in: [src/services/securityMetricsService.ts:157](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/securityMetricsService.ts#L157)

Get comprehensive security metrics for security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Integrity security level (optional, defaults to availabilityLevel)

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Confidentiality security level (optional, defaults to availabilityLevel)

#### Returns

`SecurityMetrics`

Security metrics including score, costs, and risk reduction

***

### capitalizeFirstLetter()

> `protected` **capitalizeFirstLetter**(`string`): `string`

Defined in: [src/services/BaseService.ts:75](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/BaseService.ts#L75)

Capitalize first letter of a string

#### Parameters

##### string

`string`

#### Returns

`string`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`capitalizeFirstLetter`](../../BaseService/classes/BaseService.md#capitalizefirstletter)

***

### getCIAOptions()

> `protected` **getCIAOptions**(`component`): `Record`\<`string`, [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\>

Defined in: [src/services/BaseService.ts:43](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/BaseService.ts#L43)

Get options for a CIA component

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

#### Returns

`Record`\<`string`, [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\>

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getCIAOptions`](../../BaseService/classes/BaseService.md#getciaoptions)

***

### getComponentDetails()

> `protected` **getComponentDetails**(`component`, `level`): `undefined` \| [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)

Defined in: [src/services/BaseService.ts:27](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/BaseService.ts#L27)

Get component details for a specific security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`undefined` \| [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getComponentDetails`](../../BaseService/classes/BaseService.md#getcomponentdetails)

***

### getDefaultSecurityIcon()

> `protected` **getDefaultSecurityIcon**(`level`): `string`

Defined in: [src/services/securityMetricsService.ts:495](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/securityMetricsService.ts#L495)

Get default security icon for a security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Security icon (emoji)

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`getDefaultSecurityIcon`](../../BaseService/classes/BaseService.md#getdefaultsecurityicon)

***

### getRiskLevelFromSecurityLevel()

> `protected` **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [src/services/BaseService.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/BaseService.ts#L61)

Get risk level from security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getRiskLevelFromSecurityLevel`](../../BaseService/classes/BaseService.md#getrisklevelfromsecuritylevel)

***

### getSecurityLevelValue()

> `protected` **getSecurityLevelValue**(`level`): `number`

Defined in: [src/services/BaseService.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/BaseService.ts#L68)

Calculate security level value from level string

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`number`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getSecurityLevelValue`](../../BaseService/classes/BaseService.md#getsecuritylevelvalue)

***

### getValuePoints()

> `protected` **getValuePoints**(`level`): `string`[]

Defined in: [src/services/BaseService.ts:101](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/BaseService.ts#L101)

Get value points for a security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getValuePoints`](../../BaseService/classes/BaseService.md#getvaluepoints)
