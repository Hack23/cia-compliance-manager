[**CIA Compliance Manager Documentation v0.8.40**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/securityMetricsService](../README.md) / SecurityMetricsService

# Class: SecurityMetricsService

Defined in: [services/securityMetricsService.ts:214](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/services/securityMetricsService.ts#L214)

Service for security metrics and measurements

## Analytics Perspective

This service provides quantitative metrics for security levels, enabling
organizations to measure their security posture, track improvements over time,
and quantify the impact of security investments through cost-benefit analysis
and risk reduction calculations. 📊

## Extends

- [`BaseService`](../../BaseService/classes/BaseService.md)

## Constructors

### Constructor

> **new SecurityMetricsService**(`dataProvider`): `SecurityMetricsService`

Defined in: [services/securityMetricsService.ts:215](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/services/securityMetricsService.ts#L215)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/interfaces/CIADataProvider.md)

#### Returns

`SecurityMetricsService`

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`constructor`](../../BaseService/classes/BaseService.md#constructor)

## Methods

### calculateRoi()

> **calculateRoi**(`securityLevel`, `implementationCost`): [`ROIMetrics`](../../../types/interfaces/ROIMetrics.md)

Defined in: [services/securityMetricsService.ts:226](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/services/securityMetricsService.ts#L226)

Calculate ROI metrics based on security level and implementation cost

#### Parameters

##### securityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Selected security level

##### implementationCost

`number`

Cost of implementation in currency units

#### Returns

[`ROIMetrics`](../../../types/interfaces/ROIMetrics.md)

ROI metrics with value, percentage and description

***

### calculateSecurityScore()

> **calculateSecurityScore**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `number`

Defined in: [services/securityMetricsService.ts:800](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/services/securityMetricsService.ts#L800)

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

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): [`CIADetails`](../../../types/interfaces/CIADetails.md) \| `undefined`

Defined in: [services/BaseService.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/services/BaseService.ts#L53)

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

### getComponentMetrics()

> **getComponentMetrics**(`component`, `level`): [`ComponentMetrics`](../interfaces/ComponentMetrics.md)

Defined in: [services/securityMetricsService.ts:391](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/services/securityMetricsService.ts#L391)

Get component-specific metrics

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

[`ComponentMetrics`](../interfaces/ComponentMetrics.md)

Component metrics

***

### getComponentTechnicalMetrics()

> **getComponentTechnicalMetrics**(`component`, `level`): `Record`\<`string`, `string`\>

Defined in: [services/securityMetricsService.ts:420](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/services/securityMetricsService.ts#L420)

Get technical metrics for a component

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

The CIA component

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The security level

#### Returns

`Record`\<`string`, `string`\>

Component technical metrics

***

### getImpactMetrics()

> **getImpactMetrics**(`component`, `level`): [`ImpactMetrics`](../interfaces/ImpactMetrics.md)

Defined in: [services/securityMetricsService.ts:452](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/services/securityMetricsService.ts#L452)

Get impact metrics for a component and level

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

[`ImpactMetrics`](../interfaces/ImpactMetrics.md)

Impact metrics

***

### getProtectionLevel()

> **getProtectionLevel**(`level`): `string`

Defined in: [services/securityMetricsService.ts:688](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/services/securityMetricsService.ts#L688)

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

Defined in: [services/securityMetricsService.ts:721](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/services/securityMetricsService.ts#L721)

Get appropriate UI badge variant for a risk level

#### Parameters

##### riskLevel

`string`

Risk level string (High, Medium, Low, etc.)

#### Returns

`"success"` \| `"info"` \| `"warning"` \| `"error"` \| `"neutral"`

Badge variant name

***

### getRiskLevel()

> **getRiskLevel**(`score`): `string`

Defined in: [services/securityMetricsService.ts:761](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/services/securityMetricsService.ts#L761)

Get risk level based on security score

#### Parameters

##### score

`number`

Security score (0-100)

#### Returns

`string`

Risk level description

***

### getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [services/BaseService.ts:114](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/services/BaseService.ts#L114)

Get risk level from security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getRiskLevelFromSecurityLevel`](../../BaseService/classes/BaseService.md#getrisklevelfromsecuritylevel)

***

### getROIEstimates()

> **getROIEstimates**(): [`ROIEstimatesMap`](../interfaces/ROIEstimatesMap.md)

Defined in: [services/securityMetricsService.ts:263](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/services/securityMetricsService.ts#L263)

Get ROI estimates from the data provider

#### Returns

[`ROIEstimatesMap`](../interfaces/ROIEstimatesMap.md)

Map of ROI estimates for different security levels

***

### getSecurityIcon()

> **getSecurityIcon**(`level`): `string`

Defined in: [services/securityMetricsService.ts:751](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/services/securityMetricsService.ts#L751)

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

Defined in: [services/securityMetricsService.ts:665](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/services/securityMetricsService.ts#L665)

Get security level description based on level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Textual description of security level

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`getSecurityLevelDescription`](../../BaseService/classes/BaseService.md#getsecurityleveldescription)

***

### getSecurityLevelFromValue()

> **getSecurityLevelFromValue**(`value`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [services/securityMetricsService.ts:775](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/services/securityMetricsService.ts#L775)

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

> **getSecurityMetrics**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`SecurityMetrics`](../interfaces/SecurityMetrics.md)

Defined in: [services/securityMetricsService.ts:275](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/services/securityMetricsService.ts#L275)

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

[`SecurityMetrics`](../interfaces/SecurityMetrics.md)

Security metrics including score, costs, and risk reduction
