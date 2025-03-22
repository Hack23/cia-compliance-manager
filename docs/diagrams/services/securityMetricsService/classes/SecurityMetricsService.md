[**CIA Compliance Manager Diagrams v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/securityMetricsService](../README.md) / SecurityMetricsService

# Class: SecurityMetricsService

Defined in: [services/securityMetricsService.ts:112](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/securityMetricsService.ts#L112)

Service for security metrics and measurements

## Analytics Perspective

This service provides quantitative metrics for security levels, enabling
organizations to measure their security posture, track improvements over time,
and quantify the impact of security investments through cost-benefit analysis
and risk reduction calculations. 📊

## Extends

- [`BaseService`](../../classes/BaseService.md)

## Constructors

### new SecurityMetricsService()

> **new SecurityMetricsService**(`dataProvider`): `SecurityMetricsService`

Defined in: [services/securityMetricsService.ts:113](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/securityMetricsService.ts#L113)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/interfaces/CIADataProvider.md)

#### Returns

`SecurityMetricsService`

#### Overrides

[`BaseService`](../../classes/BaseService.md).[`constructor`](../../classes/BaseService.md#constructor)

## Methods

### calculateRoi()

> **calculateRoi**(`securityLevel`, `implementationCost`): [`ROIMetrics`](../../../typedoc-entry/interfaces/ROIMetrics.md)

Defined in: [services/securityMetricsService.ts:124](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/securityMetricsService.ts#L124)

Calculate ROI metrics based on security level and implementation cost

#### Parameters

##### securityLevel

[`SecurityLevel`](../../../index/type-aliases/SecurityLevel.md)

Selected security level

##### implementationCost

`number`

Cost of implementation in currency units

#### Returns

[`ROIMetrics`](../../../typedoc-entry/interfaces/ROIMetrics.md)

ROI metrics with value, percentage and description

***

### calculateSecurityScore()

> **calculateSecurityScore**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `number`

Defined in: [services/securityMetricsService.ts:528](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/securityMetricsService.ts#L528)

Calculate security score based on security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../index/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../../index/type-aliases/SecurityLevel.md) = `availabilityLevel`

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../../index/type-aliases/SecurityLevel.md) = `availabilityLevel`

Confidentiality security level

#### Returns

`number`

Security score (0-100)

***

### getComponentMetrics()

> **getComponentMetrics**(`component`, `level`): [`ComponentMetrics`](../interfaces/ComponentMetrics.md)

Defined in: [services/securityMetricsService.ts:264](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/securityMetricsService.ts#L264)

Get component-specific metrics

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../../index/type-aliases/SecurityLevel.md)

Security level

#### Returns

[`ComponentMetrics`](../interfaces/ComponentMetrics.md)

Component metrics

***

### getComponentTechnicalMetrics()

> **getComponentTechnicalMetrics**(`component`, `level`): `Record`\<`string`, `string`\>

Defined in: [services/securityMetricsService.ts:293](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/securityMetricsService.ts#L293)

Get technical metrics for a component

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

The CIA component

##### level

[`SecurityLevel`](../../../index/type-aliases/SecurityLevel.md)

The security level

#### Returns

`Record`\<`string`, `string`\>

Component technical metrics

***

### getImpactMetrics()

> **getImpactMetrics**(`component`, `level`): [`ImpactMetrics`](../interfaces/ImpactMetrics.md)

Defined in: [services/securityMetricsService.ts:325](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/securityMetricsService.ts#L325)

Get impact metrics for a component and level

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../../index/type-aliases/SecurityLevel.md)

Security level

#### Returns

[`ImpactMetrics`](../interfaces/ImpactMetrics.md)

Impact metrics

***

### getProtectionLevel()

> **getProtectionLevel**(`level`): `string`

Defined in: [services/securityMetricsService.ts:430](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/securityMetricsService.ts#L430)

Get protection level based on security level

#### Parameters

##### level

[`SecurityLevel`](../../../index/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Protection level description

***

### getRiskBadgeVariant()

> **getRiskBadgeVariant**(`riskLevel`): `"success"` \| `"warning"` \| `"error"` \| `"info"` \| `"neutral"`

Defined in: [services/securityMetricsService.ts:463](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/securityMetricsService.ts#L463)

Get appropriate UI badge variant for a risk level

#### Parameters

##### riskLevel

`string`

Risk level string (High, Medium, Low, etc.)

#### Returns

`"success"` \| `"warning"` \| `"error"` \| `"info"` \| `"neutral"`

Badge variant name

***

### getROIEstimates()

> **getROIEstimates**(): [`ROIEstimatesMap`](../interfaces/ROIEstimatesMap.md)

Defined in: [services/securityMetricsService.ts:161](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/securityMetricsService.ts#L161)

Get ROI estimates from the data provider

#### Returns

[`ROIEstimatesMap`](../interfaces/ROIEstimatesMap.md)

Map of ROI estimates for different security levels

***

### getSecurityIcon()

> **getSecurityIcon**(`level`): `string`

Defined in: [services/securityMetricsService.ts:493](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/securityMetricsService.ts#L493)

Get security icon for a security level

#### Parameters

##### level

[`SecurityLevel`](../../../index/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Security icon (emoji)

***

### getSecurityLevelDescription()

> **getSecurityLevelDescription**(`level`): `string`

Defined in: [services/securityMetricsService.ts:407](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/securityMetricsService.ts#L407)

Get security level description based on level

#### Parameters

##### level

[`SecurityLevel`](../../../index/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Textual description of security level

***

### getSecurityLevelFromValue()

> **getSecurityLevelFromValue**(`value`): [`SecurityLevel`](../../../index/type-aliases/SecurityLevel.md)

Defined in: [services/securityMetricsService.ts:503](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/securityMetricsService.ts#L503)

Get security level from a numeric value

#### Parameters

##### value

`number`

Numeric security level value (0-4)

#### Returns

[`SecurityLevel`](../../../index/type-aliases/SecurityLevel.md)

Security level string representation

***

### getSecurityMetrics()

> **getSecurityMetrics**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`SecurityMetrics`](../interfaces/SecurityMetrics.md)

Defined in: [services/securityMetricsService.ts:173](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/securityMetricsService.ts#L173)

Get comprehensive security metrics for security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../index/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../../index/type-aliases/SecurityLevel.md) = `availabilityLevel`

Integrity security level (optional, defaults to availabilityLevel)

##### confidentialityLevel

[`SecurityLevel`](../../../index/type-aliases/SecurityLevel.md) = `availabilityLevel`

Confidentiality security level (optional, defaults to availabilityLevel)

#### Returns

[`SecurityMetrics`](../interfaces/SecurityMetrics.md)

Security metrics including score, costs, and risk reduction
