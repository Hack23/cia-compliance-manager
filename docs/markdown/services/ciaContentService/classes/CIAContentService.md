[**CIA Compliance Manager Documentation v0.8.8**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/ciaContentService](../README.md) / CIAContentService

# Class: CIAContentService

Defined in: [services/ciaContentService.ts:166](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L166)

Main service to provide CIA content and utilities throughout the application

## Business Perspective

This service acts as a central hub for accessing security-related information
across the CIA triad, providing consistent data and calculations for business
impact analysis, technical implementations, and compliance requirements. 🔒

## Extends

- [`BaseService`](../../BaseService/classes/BaseService.md)

## Constructors

### Constructor

> **new CIAContentService**(`dataProvider?`): `CIAContentService`

Defined in: [services/ciaContentService.ts:175](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L175)

#### Parameters

##### dataProvider?

[`CIADataProvider`](../../../types/interfaces/CIADataProvider.md)

#### Returns

`CIAContentService`

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`constructor`](../../BaseService/classes/BaseService.md#constructor)

## Methods

### calculateBusinessImpactLevel()

> **calculateBusinessImpactLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/ciaContentService.ts:576](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L576)

Calculate business impact level based on security levels

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

`string`

Business impact level description

***

### calculateRoi()

> **calculateRoi**(`level`, `implementationCost`): [`ROIMetrics`](../interfaces/ROIMetrics.md)

Defined in: [services/ciaContentService.ts:475](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L475)

Calculate ROI

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### implementationCost

`number`

#### Returns

[`ROIMetrics`](../interfaces/ROIMetrics.md)

***

### getAllROIEstimates()

> **getAllROIEstimates**(): [`ROIEstimatesMap`](../../../types/interfaces/ROIEstimatesMap.md)

Defined in: [services/ciaContentService.ts:369](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L369)

Get overall ROI estimates map

#### Returns

[`ROIEstimatesMap`](../../../types/interfaces/ROIEstimatesMap.md)

***

### getBusinessImpact()

> **getBusinessImpact**(`component`, `level`): [`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md)

Defined in: [services/ciaContentService.ts:376](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L376)

Get the business impact for a component and security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md)

***

### getBusinessImpactContent()

> **getBusinessImpactContent**(`component`, `level`): `string`

Defined in: [services/ciaContentService.ts:922](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L922)

Get business impact content for a specific component and security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Business impact content as formatted string

***

### getBusinessImpactDescription()

> **getBusinessImpactDescription**(`component`, `level`): `string`

Defined in: [services/ciaContentService.ts:412](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L412)

Get business impact description

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getCategoryIcon()

> **getCategoryIcon**(`category`): `string`

Defined in: [services/ciaContentService.ts:599](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L599)

Get category icon

#### Parameters

##### category

`string`

#### Returns

`string`

***

### getCIAOptions()

> **getCIAOptions**(`component`): `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIADetails`](../../../types/interfaces/CIADetails.md)\>

Defined in: [services/ciaContentService.ts:214](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L214)

Get options data for a CIA component

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

#### Returns

`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIADetails`](../../../types/interfaces/CIADetails.md)\>

#### Overrides

`BaseService.getCIAOptions`

***

### getComplianceDescription()

> **getComplianceDescription**(`level`): `string`

Defined in: [services/ciaContentService.ts:1063](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L1063)

Get compliance description for a specific security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Compliance description

***

### getComplianceStatus()

> **getComplianceStatus**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `any`

Defined in: [services/ciaContentService.ts:514](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L514)

Get compliance status

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`any`

***

### getCompliantFrameworks()

> **getCompliantFrameworks**(`level`): `string`[]

Defined in: [services/ciaContentService.ts:640](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L640)

Get compliant frameworks

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### getComponentContent()

> **getComponentContent**(`component`, `level`): `object`

Defined in: [services/ciaContentService.ts:879](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L879)

Get component content details for a specific component and security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

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

> **getComponentDetails**(`component`, `level`): `undefined` \| [`CIADetails`](../../../types/interfaces/CIADetails.md)

Defined in: [services/ciaContentService.ts:281](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L281)

Get details for a specific component and security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`undefined` \| [`CIADetails`](../../../types/interfaces/CIADetails.md)

#### Overrides

`BaseService.getComponentDetails`

***

### getComponentImplementationDetails()

> **getComponentImplementationDetails**(`component`, `level`): [`TechnicalImplementationDetails`](../../../types/interfaces/TechnicalImplementationDetails.md)

Defined in: [services/ciaContentService.ts:399](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L399)

Get component implementation details

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`TechnicalImplementationDetails`](../../../types/interfaces/TechnicalImplementationDetails.md)

***

### getComponentMetrics()

> **getComponentMetrics**(`component`, `level`): [`ComponentMetrics`](../../securityMetricsService/interfaces/ComponentMetrics.md)

Defined in: [services/ciaContentService.ts:530](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L530)

Get component metrics

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`ComponentMetrics`](../../securityMetricsService/interfaces/ComponentMetrics.md)

***

### getDefaultErrorRate()

> **getDefaultErrorRate**(`level`): `string`

Defined in: [services/ciaContentService.ts:1211](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L1211)

Get default error rate based on security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Error rate description

***

### getDefaultPrivacyImpact()

> **getDefaultPrivacyImpact**(`level`): `string`

Defined in: [services/ciaContentService.ts:1100](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L1100)

Get default privacy impact based on security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Privacy impact description

***

### getDefaultSLAMetrics()

> **getDefaultSLAMetrics**(`level`): `object`

Defined in: [services/ciaContentService.ts:1123](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L1123)

Get default SLA metrics based on security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`object`

SLA metrics for availability

##### mttr

> **mttr**: `string`

##### rpo

> **rpo**: `string`

##### rto

> **rto**: `string`

##### sla

> **sla**: `string`

##### uptime

> **uptime**: `string`

***

### getDefaultValidationLevel()

> **getDefaultValidationLevel**(`level`): `string`

Defined in: [services/ciaContentService.ts:1188](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L1188)

Get default data validation level based on security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Validation level description

***

### getDetailedDescription()

> **getDetailedDescription**(`component`, `level`): [`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md)

Defined in: [services/ciaContentService.ts:438](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L438)

Get detailed description

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md)

***

### getFrameworkDescription()

> **getFrameworkDescription**(`framework`): `string`

Defined in: [services/ciaContentService.ts:648](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L648)

Get framework description

#### Parameters

##### framework

`string`

#### Returns

`string`

***

### getFrameworkRequiredLevel()

> **getFrameworkRequiredLevel**(`component`, `level`): `string`

Defined in: [services/ciaContentService.ts:655](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L655)

Get framework required level for a component

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getImpactMetrics()

> **getImpactMetrics**(`component`, `level`): [`ImpactMetrics`](../../securityMetricsService/interfaces/ImpactMetrics.md)

Defined in: [services/ciaContentService.ts:540](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L540)

Get impact metrics

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`ImpactMetrics`](../../securityMetricsService/interfaces/ImpactMetrics.md)

***

### getImplementationConsiderations()

> **getImplementationConsiderations**(`levels`): `string`

Defined in: [services/ciaContentService.ts:616](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L616)

Get implementation considerations for the given CIA levels.

#### Parameters

##### levels

\[[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)\]

Tuple containing exactly three security levels in order: [availability, integrity, confidentiality]

#### Returns

`string`

String with implementation considerations

***

### getImplementationTime()

> **getImplementationTime**(`level`): `string`

Defined in: [services/ciaContentService.ts:698](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L698)

Get implementation time

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getInformationSensitivity()

> **getInformationSensitivity**(`level`): `string`

Defined in: [services/ciaContentService.ts:855](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L855)

Get information sensitivity classification for a security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Information sensitivity classification

***

### getKeyValuePoints()

> **getKeyValuePoints**(`_component`, `level`): `string`[]

Defined in: [services/ciaContentService.ts:1087](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L1087)

Get key value points for a specific component and security level

#### Parameters

##### \_component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`[]

Array of value points

***

### getProtectionLevel()

> **getProtectionLevel**(`level`): `string`

Defined in: [services/ciaContentService.ts:564](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L564)

Get protection level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getRecommendations()

> **getRecommendations**(`component`, `level`): `string`[]

Defined in: [services/ciaContentService.ts:462](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L462)

Get recommendations

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### getRecommendedImplementationPlan()

> **getRecommendedImplementationPlan**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/ciaContentService.ts:773](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L773)

Get recommended implementation plan based on selected security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getRequiredExpertise()

> **getRequiredExpertise**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/ciaContentService.ts:741](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L741)

Get required expertise based on selected security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getRiskBadgeVariant()

> **getRiskBadgeVariant**(`riskLevel`): `"success"` \| `"info"` \| `"warning"` \| `"error"` \| `"neutral"`

Defined in: [services/ciaContentService.ts:592](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L592)

Get risk badge variant

#### Parameters

##### riskLevel

`string`

#### Returns

`"success"` \| `"info"` \| `"warning"` \| `"error"` \| `"neutral"`

***

### getROIEstimate()

> **getROIEstimate**(`level`): [`ROIEstimate`](../../../types/interfaces/ROIEstimate.md)

Defined in: [services/ciaContentService.ts:300](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L300)

Get ROI estimate for a security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`ROIEstimate`](../../../types/interfaces/ROIEstimate.md)

***

### getROIEstimates()

> **getROIEstimates**(`level`): [`ROIEstimate`](../../../types/interfaces/ROIEstimate.md)

Defined in: [services/ciaContentService.ts:329](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L329)

Get ROI estimates for a specific security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`ROIEstimate`](../../../types/interfaces/ROIEstimate.md)

***

### getSecurityIcon()

> **getSecurityIcon**(`level`): `string`

Defined in: [services/ciaContentService.ts:633](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L633)

Get security icon

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getSecurityLevelDescription()

> **getSecurityLevelDescription**(`level`): `string`

Defined in: [services/ciaContentService.ts:557](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L557)

Get security level description

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getSecurityMetrics()

> **getSecurityMetrics**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`SecurityMetrics`](../../securityMetricsService/interfaces/SecurityMetrics.md)

Defined in: [services/ciaContentService.ts:499](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L499)

Get security metrics

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

#### Returns

[`SecurityMetrics`](../../securityMetricsService/interfaces/SecurityMetrics.md)

***

### getSecurityResources()

> **getSecurityResources**(`component`, `level`): `EnhancedSecurityResource`[]

Defined in: [services/ciaContentService.ts:547](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L547)

Get security resources

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`EnhancedSecurityResource`[]

***

### getSummaryContent()

> **getSummaryContent**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/ciaContentService.ts:971](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L971)

Get summary content for all three CIA components

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

#### Returns

`string`

Summary content as formatted string

***

### getTechnicalDescription()

> **getTechnicalDescription**(`component`, `level`): `string`

Defined in: [services/ciaContentService.ts:425](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L425)

Get technical description

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getTechnicalImplementation()

> **getTechnicalImplementation**(`_component`, `level`): [`TechnicalImplementationDetails`](../../../types/interfaces/TechnicalImplementationDetails.md)

Defined in: [services/ciaContentService.ts:386](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L386)

Get technical implementation details for a component and security level

#### Parameters

##### \_component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`TechnicalImplementationDetails`](../../../types/interfaces/TechnicalImplementationDetails.md)

***

### getTotalImplementationTime()

> **getTotalImplementationTime**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/ciaContentService.ts:705](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L705)

Get total implementation time for combined security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getValuePoints()

> **getValuePoints**(`level`): `string`[]

Defined in: [services/ciaContentService.ts:606](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L606)

Get value points

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

#### Overrides

`BaseService.getValuePoints`

***

### initialize()

> **initialize**(): `Promise`\<`void`\>

Defined in: [services/ciaContentService.ts:206](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/services/ciaContentService.ts#L206)

Initialize the service
This is a placeholder for any async initialization that might be needed

#### Returns

`Promise`\<`void`\>
