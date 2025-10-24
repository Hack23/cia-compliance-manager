[**CIA Compliance Manager Diagrams v0.8.34**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/ciaContentService](../README.md) / CIAContentService

# Class: CIAContentService

Defined in: [services/ciaContentService.ts:166](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L166)

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

Defined in: [services/ciaContentService.ts:175](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L175)

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

Defined in: [services/ciaContentService.ts:628](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L628)

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

Defined in: [services/ciaContentService.ts:508](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L508)

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

Defined in: [services/ciaContentService.ts:404](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L404)

Get overall ROI estimates map

#### Returns

[`ROIEstimatesMap`](../../../types/interfaces/ROIEstimatesMap.md)

***

### getBusinessImpact()

> **getBusinessImpact**(`component`, `level`): [`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md)

Defined in: [services/ciaContentService.ts:409](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L409)

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

Defined in: [services/ciaContentService.ts:925](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L925)

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

Defined in: [services/ciaContentService.ts:445](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L445)

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

Defined in: [services/ciaContentService.ts:651](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L651)

Get category icon

#### Parameters

##### category

`string`

#### Returns

`string`

***

### getCIAOptions()

> **getCIAOptions**(`component`): `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIADetails`](../../../types/interfaces/CIADetails.md)\>

Defined in: [services/ciaContentService.ts:214](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L214)

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

Defined in: [services/ciaContentService.ts:1066](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L1066)

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

> **getComplianceStatus**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`ComplianceStatusDetails`](../../complianceService/interfaces/ComplianceStatusDetails.md)

Defined in: [services/ciaContentService.ts:566](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L566)

Get compliance status

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`ComplianceStatusDetails`](../../complianceService/interfaces/ComplianceStatusDetails.md)

***

### getCompliantFrameworks()

> **getCompliantFrameworks**(`level`): `string`[]

Defined in: [services/ciaContentService.ts:692](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L692)

Get compliant frameworks

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### getComponentContent()

> **getComponentContent**(`component`, `level`): `object`

Defined in: [services/ciaContentService.ts:882](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L882)

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

> **getComponentDetails**(`component`, `level`): [`CIADetails`](../../../types/interfaces/CIADetails.md) \| `undefined`

Defined in: [services/ciaContentService.ts:281](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L281)

Get details for a specific component and security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`CIADetails`](../../../types/interfaces/CIADetails.md) \| `undefined`

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`getComponentDetails`](../../BaseService/classes/BaseService.md#getcomponentdetails)

***

### getComponentImplementationDetails()

> **getComponentImplementationDetails**(`component`, `level`): [`TechnicalImplementationDetails`](../../../types/interfaces/TechnicalImplementationDetails.md)

Defined in: [services/ciaContentService.ts:432](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L432)

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

Defined in: [services/ciaContentService.ts:582](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L582)

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

Defined in: [services/ciaContentService.ts:1214](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L1214)

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

Defined in: [services/ciaContentService.ts:1103](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L1103)

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

Defined in: [services/ciaContentService.ts:1126](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L1126)

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

Defined in: [services/ciaContentService.ts:1191](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L1191)

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

Defined in: [services/ciaContentService.ts:471](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L471)

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

Defined in: [services/ciaContentService.ts:700](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L700)

Get framework description

#### Parameters

##### framework

`string`

#### Returns

`string`

***

### getFrameworkRequiredLevel()

> **getFrameworkRequiredLevel**(`component`, `level`): `string`

Defined in: [services/ciaContentService.ts:707](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L707)

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

Defined in: [services/ciaContentService.ts:592](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L592)

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

Defined in: [services/ciaContentService.ts:668](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L668)

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

Defined in: [services/ciaContentService.ts:750](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L750)

Get implementation time

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getInformationSensitivity()

> **getInformationSensitivity**(`level`): `string`

Defined in: [services/ciaContentService.ts:858](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L858)

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

Defined in: [services/ciaContentService.ts:1090](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L1090)

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

Defined in: [services/ciaContentService.ts:616](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L616)

Get protection level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getRecommendations()

> **getRecommendations**(`component`, `level`): `string`[]

Defined in: [services/ciaContentService.ts:495](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L495)

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

Defined in: [services/ciaContentService.ts:828](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L828)

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

Defined in: [services/ciaContentService.ts:796](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L796)

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

Defined in: [services/ciaContentService.ts:644](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L644)

Get risk badge variant

#### Parameters

##### riskLevel

`string`

#### Returns

`"success"` \| `"info"` \| `"warning"` \| `"error"` \| `"neutral"`

***

### getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [services/BaseService.ts:114](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/BaseService.ts#L114)

Get risk level from security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getRiskLevelFromSecurityLevel`](../../BaseService/classes/BaseService.md#getrisklevelfromsecuritylevel)

***

### getROIEstimate()

> **getROIEstimate**(`level`): [`ROIEstimate`](../../../types/interfaces/ROIEstimate.md)

Defined in: [services/ciaContentService.ts:307](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L307)

Get ROI estimate for a security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`ROIEstimate`](../../../types/interfaces/ROIEstimate.md)

***

### getROIEstimates()

> **getROIEstimates**(`level`): [`ROIEstimate`](../../../types/interfaces/ROIEstimate.md)

Defined in: [services/ciaContentService.ts:340](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L340)

Get ROI estimates for a specific security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`ROIEstimate`](../../../types/interfaces/ROIEstimate.md)

***

### getSecurityIcon()

> **getSecurityIcon**(`level`): `string`

Defined in: [services/ciaContentService.ts:685](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L685)

Get security icon

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getSecurityLevelDescription()

> **getSecurityLevelDescription**(`level`): `string`

Defined in: [services/ciaContentService.ts:609](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L609)

Get security level description

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`getSecurityLevelDescription`](../../BaseService/classes/BaseService.md#getsecurityleveldescription)

***

### getSecurityMetrics()

> **getSecurityMetrics**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`SecurityMetrics`](../../securityMetricsService/interfaces/SecurityMetrics.md)

Defined in: [services/ciaContentService.ts:551](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L551)

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

Defined in: [services/ciaContentService.ts:599](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L599)

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

Defined in: [services/ciaContentService.ts:974](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L974)

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

Defined in: [services/ciaContentService.ts:458](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L458)

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

Defined in: [services/ciaContentService.ts:419](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L419)

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

Defined in: [services/ciaContentService.ts:757](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L757)

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

Defined in: [services/ciaContentService.ts:658](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L658)

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

Defined in: [services/ciaContentService.ts:206](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/ciaContentService.ts#L206)

Initialize the service
This is a placeholder for any async initialization that might be needed

#### Returns

`Promise`\<`void`\>
