[**CIA Compliance Manager Documentation v0.8.5**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [services](../README.md) / CIAContentService

# Class: CIAContentService

Defined in: [services/ciaContentService.ts:187](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L187)

Main service to provide CIA content and utilities throughout the application

## Business Perspective

This service acts as a central hub for accessing security-related information
across the CIA triad, providing consistent data and calculations for business
impact analysis, technical implementations, and compliance requirements. 🔒

## Constructors

### new CIAContentService()

> **new CIAContentService**(`dataProvider`?): `CIAContentService`

Defined in: [services/ciaContentService.ts:195](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L195)

#### Parameters

##### dataProvider?

[`CIADataProvider`](../../types/interfaces/CIADataProvider.md)

#### Returns

`CIAContentService`

## Methods

### calculateBusinessImpactLevel()

> **calculateBusinessImpactLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/ciaContentService.ts:538](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L538)

Calculate business impact level based on security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md) = `availabilityLevel`

Integrity security level (optional, defaults to availabilityLevel)

##### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md) = `availabilityLevel`

Confidentiality security level (optional, defaults to availabilityLevel)

#### Returns

`string`

Business impact level description

***

### calculateRoi()

> **calculateRoi**(`level`, `implementationCost`): `ROIMetrics`

Defined in: [services/ciaContentService.ts:437](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L437)

Calculate ROI

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### implementationCost

`number`

#### Returns

`ROIMetrics`

***

### getAllROIEstimates()

> **getAllROIEstimates**(): [`ROIEstimatesMap`](../../types/interfaces/ROIEstimatesMap.md)

Defined in: [services/ciaContentService.ts:331](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L331)

Get overall ROI estimates map

#### Returns

[`ROIEstimatesMap`](../../types/interfaces/ROIEstimatesMap.md)

***

### getBusinessImpact()

> **getBusinessImpact**(`component`, `level`): [`BusinessImpactDetails`](../../types/interfaces/BusinessImpactDetails.md)

Defined in: [services/ciaContentService.ts:338](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L338)

Get the business impact for a component and security level

#### Parameters

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

[`BusinessImpactDetails`](../../types/interfaces/BusinessImpactDetails.md)

***

### getBusinessImpactContent()

> **getBusinessImpactContent**(`component`, `level`): `string`

Defined in: [services/ciaContentService.ts:875](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L875)

Get business impact content for a specific component and security level

#### Parameters

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Business impact content as formatted string

***

### getBusinessImpactDescription()

> **getBusinessImpactDescription**(`component`, `level`): `string`

Defined in: [services/ciaContentService.ts:374](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L374)

Get business impact description

#### Parameters

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getCategoryIcon()

> **getCategoryIcon**(`category`): `string`

Defined in: [services/ciaContentService.ts:561](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L561)

Get category icon

#### Parameters

##### category

`string`

#### Returns

`string`

***

### getCIAOptions()

> **getCIAOptions**(`component`): `Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), [`CIADetails`](../../types/interfaces/CIADetails.md)\>

Defined in: [services/ciaContentService.ts:218](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L218)

Get options data for a CIA component

#### Parameters

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

#### Returns

`Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), [`CIADetails`](../../types/interfaces/CIADetails.md)\>

***

### getComplianceDescription()

> **getComplianceDescription**(`level`): `string`

Defined in: [services/ciaContentService.ts:1016](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L1016)

Get compliance description for a specific security level

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Compliance description

***

### getComplianceStatus()

> **getComplianceStatus**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `ComplianceStatusDetails`

Defined in: [services/ciaContentService.ts:476](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L476)

Get compliance status

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`ComplianceStatusDetails`

***

### getCompliantFrameworks()

> **getCompliantFrameworks**(`level`): `string`[]

Defined in: [services/ciaContentService.ts:602](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L602)

Get compliant frameworks

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### getComponentContent()

> **getComponentContent**(`component`, `level`): `object`

Defined in: [services/ciaContentService.ts:832](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L832)

Get component content details for a specific component and security level

#### Parameters

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

CIA component type (availability, integrity, confidentiality)

##### level

`string`

Security level

#### Returns

`object`

Component content details

##### businessImpact

> **businessImpact**: `string`

##### description

> **description**: `string`

##### recommendations

> **recommendations**: `string`[]

##### technical

> **technical**: `string`

***

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): `undefined` \| [`CIADetails`](../../types/interfaces/CIADetails.md)

Defined in: [services/ciaContentService.ts:285](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L285)

Get details for a specific component and security level

#### Parameters

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`undefined` \| [`CIADetails`](../../types/interfaces/CIADetails.md)

***

### getComponentImplementationDetails()

> **getComponentImplementationDetails**(`component`, `level`): [`TechnicalImplementationDetails`](../../types/interfaces/TechnicalImplementationDetails.md)

Defined in: [services/ciaContentService.ts:361](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L361)

Get component implementation details

#### Parameters

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

[`TechnicalImplementationDetails`](../../types/interfaces/TechnicalImplementationDetails.md)

***

### getComponentMetrics()

> **getComponentMetrics**(`component`, `level`): [`ComponentMetrics`](../securityMetricsService/interfaces/ComponentMetrics.md)

Defined in: [services/ciaContentService.ts:492](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L492)

Get component metrics

#### Parameters

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

[`ComponentMetrics`](../securityMetricsService/interfaces/ComponentMetrics.md)

***

### getDetailedDescription()

> **getDetailedDescription**(`component`, `level`): [`BusinessImpactDetails`](../../types/interfaces/BusinessImpactDetails.md)

Defined in: [services/ciaContentService.ts:400](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L400)

Get detailed description

#### Parameters

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

[`BusinessImpactDetails`](../../types/interfaces/BusinessImpactDetails.md)

***

### getFrameworkDescription()

> **getFrameworkDescription**(`framework`): `string`

Defined in: [services/ciaContentService.ts:610](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L610)

Get framework description

#### Parameters

##### framework

`string`

#### Returns

`string`

***

### getFrameworkRequiredLevel()

> **getFrameworkRequiredLevel**(`component`, `level`): `string`

Defined in: [services/ciaContentService.ts:617](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L617)

Get framework required level for a component

#### Parameters

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getImpactMetrics()

> **getImpactMetrics**(`component`, `level`): [`ImpactMetrics`](../securityMetricsService/interfaces/ImpactMetrics.md)

Defined in: [services/ciaContentService.ts:502](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L502)

Get impact metrics

#### Parameters

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

[`ImpactMetrics`](../securityMetricsService/interfaces/ImpactMetrics.md)

***

### getImplementationConsiderations()

> **getImplementationConsiderations**(`levels`): `string`

Defined in: [services/ciaContentService.ts:578](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L578)

Get implementation considerations for the given CIA levels.

#### Parameters

##### levels

\[[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)\]

Tuple containing exactly three security levels in order: [availability, integrity, confidentiality]

#### Returns

`string`

String with implementation considerations

***

### getImplementationTime()

> **getImplementationTime**(`level`): `string`

Defined in: [services/ciaContentService.ts:651](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L651)

Get implementation time

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getInformationSensitivity()

> **getInformationSensitivity**(`level`): `string`

Defined in: [services/ciaContentService.ts:808](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L808)

Get information sensitivity classification for a security level

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Information sensitivity classification

***

### getKeyValuePoints()

> **getKeyValuePoints**(`component`, `level`): `string`[]

Defined in: [services/ciaContentService.ts:1040](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L1040)

Get key value points for a specific component and security level

#### Parameters

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`[]

Array of value points

***

### getProtectionLevel()

> **getProtectionLevel**(`level`): `string`

Defined in: [services/ciaContentService.ts:526](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L526)

Get protection level

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getRecommendations()

> **getRecommendations**(`component`, `level`): `string`[]

Defined in: [services/ciaContentService.ts:424](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L424)

Get recommendations

#### Parameters

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### getRecommendedImplementationPlan()

> **getRecommendedImplementationPlan**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/ciaContentService.ts:726](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L726)

Get recommended implementation plan based on selected security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getRequiredExpertise()

> **getRequiredExpertise**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/ciaContentService.ts:694](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L694)

Get required expertise based on selected security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getRiskBadgeVariant()

> **getRiskBadgeVariant**(`riskLevel`): `"success"` \| `"warning"` \| `"error"` \| `"info"` \| `"neutral"`

Defined in: [services/ciaContentService.ts:554](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L554)

Get risk badge variant

#### Parameters

##### riskLevel

`string`

#### Returns

`"success"` \| `"warning"` \| `"error"` \| `"info"` \| `"neutral"`

***

### getROIEstimate()

> **getROIEstimate**(`level`): [`ROIEstimate`](../../types/interfaces/ROIEstimate.md)

Defined in: [services/ciaContentService.ts:304](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L304)

Get ROI estimate for a security level

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

[`ROIEstimate`](../../types/interfaces/ROIEstimate.md)

***

### getROIEstimates()

> **getROIEstimates**(`level`): [`ROIEstimate`](../../types/interfaces/ROIEstimate.md)

Defined in: [services/ciaContentService.ts:324](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L324)

Get ROI estimates for a specific security level

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

[`ROIEstimate`](../../types/interfaces/ROIEstimate.md)

***

### getSecurityIcon()

> **getSecurityIcon**(`level`): `string`

Defined in: [services/ciaContentService.ts:595](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L595)

Get security icon

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getSecurityLevelDescription()

> **getSecurityLevelDescription**(`level`): `string`

Defined in: [services/ciaContentService.ts:519](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L519)

Get security level description

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getSecurityMetrics()

> **getSecurityMetrics**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`SecurityMetrics`](../securityMetricsService/interfaces/SecurityMetrics.md)

Defined in: [services/ciaContentService.ts:461](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L461)

Get security metrics

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md) = `availabilityLevel`

##### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md) = `availabilityLevel`

#### Returns

[`SecurityMetrics`](../securityMetricsService/interfaces/SecurityMetrics.md)

***

### getSecurityResources()

> **getSecurityResources**(`component`, `level`): [`SecurityResource`](../interfaces/SecurityResource.md)[]

Defined in: [services/ciaContentService.ts:509](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L509)

Get security resources

#### Parameters

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

[`SecurityResource`](../interfaces/SecurityResource.md)[]

***

### getSummaryContent()

> **getSummaryContent**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/ciaContentService.ts:924](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L924)

Get summary content for all three CIA components

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Confidentiality security level

#### Returns

`string`

Summary content as formatted string

***

### getTechnicalDescription()

> **getTechnicalDescription**(`component`, `level`): `string`

Defined in: [services/ciaContentService.ts:387](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L387)

Get technical description

#### Parameters

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getTechnicalImplementation()

> **getTechnicalImplementation**(`component`, `level`): [`TechnicalImplementationDetails`](../../types/interfaces/TechnicalImplementationDetails.md)

Defined in: [services/ciaContentService.ts:348](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L348)

Get technical implementation details for a component and security level

#### Parameters

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

[`TechnicalImplementationDetails`](../../types/interfaces/TechnicalImplementationDetails.md)

***

### getTotalImplementationTime()

> **getTotalImplementationTime**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/ciaContentService.ts:658](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L658)

Get total implementation time for combined security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getValuePoints()

> **getValuePoints**(`level`): `string`[]

Defined in: [services/ciaContentService.ts:568](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/ciaContentService.ts#L568)

Get value points

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`[]
