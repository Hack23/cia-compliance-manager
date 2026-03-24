[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/ciaContentService](../README.md) / CIAContentService

# Class: CIAContentService

Defined in: [services/ciaContentService.ts:166](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L166)

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

Defined in: [services/ciaContentService.ts:175](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L175)

#### Parameters

##### dataProvider?

[`CIADataProvider`](../../../types/cia-services/interfaces/CIADataProvider.md)

#### Returns

`CIAContentService`

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`constructor`](../../BaseService/classes/BaseService.md#constructor)

## Properties

### name

> `readonly` **name**: `string` = `'BaseService'`

Defined in: [services/BaseService.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/BaseService.ts#L44)

Service name for identification

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`name`](../../BaseService/classes/BaseService.md#name)

## Methods

### validate()

> **validate**(`input`): `boolean`

Defined in: [services/BaseService.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/BaseService.ts#L73)

Validate input parameters (to be overridden by subclasses)

#### Parameters

##### input

`unknown`

Input to validate

#### Returns

`boolean`

True if valid, false otherwise

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`validate`](../../BaseService/classes/BaseService.md#validate)

***

### handleError()

> **handleError**(`error`): [`ServiceError`](../../errors/classes/ServiceError.md)

Defined in: [services/BaseService.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/BaseService.ts#L104)

Handle errors consistently across services

#### Parameters

##### error

`Error`

Error to handle

#### Returns

[`ServiceError`](../../errors/classes/ServiceError.md)

ServiceError

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`handleError`](../../BaseService/classes/BaseService.md#handleerror)

***

### getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [services/BaseService.ts:254](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/BaseService.ts#L254)

Get risk level from security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getRiskLevelFromSecurityLevel`](../../BaseService/classes/BaseService.md#getrisklevelfromsecuritylevel)

***

### initialize()

> **initialize**(): `Promise`\<`void`\>

Defined in: [services/ciaContentService.ts:206](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L206)

Initialize the service
This is a placeholder for any async initialization that might be needed

#### Returns

`Promise`\<`void`\>

***

### getCIAOptions()

> **getCIAOptions**(`component`): `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\>

Defined in: [services/ciaContentService.ts:235](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L235)

Get options data for a CIA component

Retrieves all security level options (None through Very High) for a specific
CIA triad component, including descriptions, technical details, costs, and recommendations.

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

CIA component type ('confidentiality', 'integrity', or 'availability')

#### Returns

`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\>

Record mapping each SecurityLevel to its CIADetails

#### Example

```typescript
const service = new CIAContentService(dataProvider);
const options = service.getCIAOptions('confidentiality');

// Access specific level
console.log(options['High'].description);
console.log(options['High'].capex); // CAPEX percentage

// Iterate through all levels
Object.entries(options).forEach(([level, details]) => {
  console.log(`${level}: ${details.description}`);
});
```

#### Overrides

`BaseService.getCIAOptions`

***

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md) \| `undefined`

Defined in: [services/ciaContentService.ts:332](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L332)

Get details for a specific component and security level

Retrieves comprehensive details for a specific CIA component at a given
security level, including description, technical requirements, business impact,
cost estimates (CAPEX/OPEX), and implementation recommendations.

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

CIA component type ('confidentiality', 'integrity', or 'availability')

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level ('None', 'Low', 'Moderate', 'High', 'Very High')

#### Returns

[`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md) \| `undefined`

CIADetails object with all information, or undefined if invalid component

#### Example

```typescript
const service = new CIAContentService(dataProvider);

// Get High confidentiality details
const details = service.getComponentDetails('confidentiality', 'High');

if (details) {
  console.log('Description:', details.description);
  console.log('Technical:', details.technical);
  console.log('Business Impact:', details.businessImpact);
  console.log('CAPEX:', details.capex, '%');
  console.log('OPEX:', details.opex, '%');
  console.log('Colors:', details.bg, details.text);
  
  // Access recommendations
  details.recommendations?.forEach(rec => {
    console.log('- ', rec);
  });
}
```

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`getComponentDetails`](../../BaseService/classes/BaseService.md#getcomponentdetails)

***

### getROIEstimate()

> **getROIEstimate**(`level`): [`ROIEstimate`](../../../types/cia-services/interfaces/ROIEstimate.md)

Defined in: [services/ciaContentService.ts:382](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L382)

Get ROI (Return on Investment) estimate for a security level

Calculates the expected return on investment for implementing security
controls at a specific level. Higher security levels typically provide
better ROI through risk mitigation and incident prevention.

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level to calculate ROI for

#### Returns

[`ROIEstimate`](../../../types/cia-services/interfaces/ROIEstimate.md)

ROI estimate with value, return rate, and description

#### Example

```typescript
const service = new CIAContentService(dataProvider);

// Get ROI for High security level
const roi = service.getROIEstimate('High');
console.log('ROI Value:', roi.value);           // e.g., "250%"
console.log('Return Rate:', roi.returnRate);    // e.g., "150%"
console.log('Description:', roi.description);

// Compare ROI across levels
['Low', 'Moderate', 'High'].forEach(level => {
  const levelRoi = service.getROIEstimate(level as SecurityLevel);
  console.log(`${level}: ${levelRoi.value}`);
});
```

***

### getROIEstimates()

> **getROIEstimates**(`level`): [`ROIEstimate`](../../../types/cia-services/interfaces/ROIEstimate.md)

Defined in: [services/ciaContentService.ts:415](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L415)

Get ROI estimates for a specific security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`ROIEstimate`](../../../types/cia-services/interfaces/ROIEstimate.md)

***

### getAllROIEstimates()

> **getAllROIEstimates**(): [`ROIEstimatesMap`](../../../types/cia-services/interfaces/ROIEstimatesMap.md)

Defined in: [services/ciaContentService.ts:479](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L479)

Get overall ROI estimates map

#### Returns

[`ROIEstimatesMap`](../../../types/cia-services/interfaces/ROIEstimatesMap.md)

***

### getBusinessImpact()

> **getBusinessImpact**(`component`, `level`): [`BusinessImpactDetails`](../../../types/cia-services/interfaces/BusinessImpactDetails.md)

Defined in: [services/ciaContentService.ts:484](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L484)

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`BusinessImpactDetails`](../../../types/cia-services/interfaces/BusinessImpactDetails.md)

***

### getTechnicalImplementation()

> **getTechnicalImplementation**(`_component`, `level`): [`TechnicalImplementationDetails`](../../../types/cia-services/interfaces/TechnicalImplementationDetails.md)

Defined in: [services/ciaContentService.ts:494](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L494)

Get technical implementation details for a component and security level

#### Parameters

##### \_component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`TechnicalImplementationDetails`](../../../types/cia-services/interfaces/TechnicalImplementationDetails.md)

***

### getComponentImplementationDetails()

> **getComponentImplementationDetails**(`component`, `level`): [`TechnicalImplementationDetails`](../../../types/cia-services/interfaces/TechnicalImplementationDetails.md)

Defined in: [services/ciaContentService.ts:507](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L507)

Get component implementation details

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`TechnicalImplementationDetails`](../../../types/cia-services/interfaces/TechnicalImplementationDetails.md)

***

### getBusinessImpactDescription()

> **getBusinessImpactDescription**(`component`, `level`): `string`

Defined in: [services/ciaContentService.ts:520](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L520)

Get business impact description

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getTechnicalDescription()

> **getTechnicalDescription**(`component`, `level`): `string`

Defined in: [services/ciaContentService.ts:533](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L533)

Get technical description

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDetailedDescription()

> **getDetailedDescription**(`component`, `level`): [`BusinessImpactDetails`](../../../types/cia-services/interfaces/BusinessImpactDetails.md)

Defined in: [services/ciaContentService.ts:546](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L546)

Get detailed description

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`BusinessImpactDetails`](../../../types/cia-services/interfaces/BusinessImpactDetails.md)

***

### getRecommendations()

> **getRecommendations**(`component`, `level`): `string`[]

Defined in: [services/ciaContentService.ts:570](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L570)

Get recommendations

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### calculateRoi()

> **calculateRoi**(`level`, `implementationCost`): [`ROIMetrics`](../interfaces/ROIMetrics.md)

Defined in: [services/ciaContentService.ts:583](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L583)

Calculate ROI

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### implementationCost

`number`

#### Returns

[`ROIMetrics`](../interfaces/ROIMetrics.md)

***

### getSecurityMetrics()

> **getSecurityMetrics**(`availabilityLevel`, `integrityLevel?`, `confidentialityLevel?`): [`SecurityMetrics`](../../securityMetricsService/interfaces/SecurityMetrics.md)

Defined in: [services/ciaContentService.ts:626](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L626)

Get security metrics

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### integrityLevel?

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

##### confidentialityLevel?

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

#### Returns

[`SecurityMetrics`](../../securityMetricsService/interfaces/SecurityMetrics.md)

***

### getComplianceStatus()

> **getComplianceStatus**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`ComplianceStatusDetails`](../../../types/compliance/interfaces/ComplianceStatusDetails.md)

Defined in: [services/ciaContentService.ts:641](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L641)

Get compliance status

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`ComplianceStatusDetails`](../../../types/compliance/interfaces/ComplianceStatusDetails.md)

***

### getComponentMetrics()

> **getComponentMetrics**(`component`, `level`): [`ComponentMetrics`](../../securityMetricsService/interfaces/ComponentMetrics.md)

Defined in: [services/ciaContentService.ts:657](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L657)

Get component metrics

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`ComponentMetrics`](../../securityMetricsService/interfaces/ComponentMetrics.md)

***

### getImpactMetrics()

> **getImpactMetrics**(`component`, `level`): [`ImpactMetrics`](../../securityMetricsService/interfaces/ImpactMetrics.md)

Defined in: [services/ciaContentService.ts:667](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L667)

Get impact metrics

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`ImpactMetrics`](../../securityMetricsService/interfaces/ImpactMetrics.md)

***

### getSecurityResources()

> **getSecurityResources**(`component`, `level`): [`EnhancedSecurityResource`](../../../types/securityResources/interfaces/EnhancedSecurityResource.md)[]

Defined in: [services/ciaContentService.ts:674](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L674)

Get security resources

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`EnhancedSecurityResource`](../../../types/securityResources/interfaces/EnhancedSecurityResource.md)[]

***

### getSecurityLevelDescription()

> **getSecurityLevelDescription**(`level`): `string`

Defined in: [services/ciaContentService.ts:684](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L684)

Get security level description

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`getSecurityLevelDescription`](../../BaseService/classes/BaseService.md#getsecurityleveldescription)

***

### getProtectionLevel()

> **getProtectionLevel**(`level`): `string`

Defined in: [services/ciaContentService.ts:691](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L691)

Get protection level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### calculateBusinessImpactLevel()

> **calculateBusinessImpactLevel**(`availabilityLevel`, `integrityLevel?`, `confidentialityLevel?`): `string`

Defined in: [services/ciaContentService.ts:703](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L703)

Calculate business impact level based on security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel?

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Integrity security level (optional, defaults to availabilityLevel)

##### confidentialityLevel?

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Confidentiality security level (optional, defaults to availabilityLevel)

#### Returns

`string`

Business impact level description

***

### getRiskBadgeVariant()

> **getRiskBadgeVariant**(`riskLevel`): `"success"` \| `"info"` \| `"warning"` \| `"error"` \| `"neutral"`

Defined in: [services/ciaContentService.ts:719](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L719)

Get risk badge variant

#### Parameters

##### riskLevel

`string`

#### Returns

`"success"` \| `"info"` \| `"warning"` \| `"error"` \| `"neutral"`

***

### getCategoryIcon()

> **getCategoryIcon**(`category`): `string`

Defined in: [services/ciaContentService.ts:726](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L726)

Get category icon

#### Parameters

##### category

`string`

#### Returns

`string`

***

### getValuePoints()

> **getValuePoints**(`level`): `string`[]

Defined in: [services/ciaContentService.ts:733](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L733)

Get value points

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

#### Overrides

`BaseService.getValuePoints`

***

### getImplementationConsiderations()

> **getImplementationConsiderations**(`levels`): `string`

Defined in: [services/ciaContentService.ts:743](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L743)

Get implementation considerations for the given CIA levels.

#### Parameters

##### levels

\[[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)\]

Tuple containing exactly three security levels in order: [availability, integrity, confidentiality]

#### Returns

`string`

String with implementation considerations

***

### getSecurityIcon()

> **getSecurityIcon**(`level`): `string`

Defined in: [services/ciaContentService.ts:760](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L760)

Get security icon

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getCompliantFrameworks()

> **getCompliantFrameworks**(`level`): `string`[]

Defined in: [services/ciaContentService.ts:767](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L767)

Get compliant frameworks

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### getFrameworkDescription()

> **getFrameworkDescription**(`framework`): `string`

Defined in: [services/ciaContentService.ts:775](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L775)

Get framework description

#### Parameters

##### framework

`string`

#### Returns

`string`

***

### getFrameworkRequiredLevel()

> **getFrameworkRequiredLevel**(`component`, `level`): `string`

Defined in: [services/ciaContentService.ts:782](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L782)

Get framework required level for a component

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getImplementationTime()

> **getImplementationTime**(`level`): `string`

Defined in: [services/ciaContentService.ts:825](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L825)

Get implementation time

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getTotalImplementationTime()

> **getTotalImplementationTime**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/ciaContentService.ts:832](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L832)

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

### getRequiredExpertise()

> **getRequiredExpertise**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/ciaContentService.ts:871](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L871)

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

### getRecommendedImplementationPlan()

> **getRecommendedImplementationPlan**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/ciaContentService.ts:903](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L903)

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

### getInformationSensitivity()

> **getInformationSensitivity**(`level`): `string`

Defined in: [services/ciaContentService.ts:933](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L933)

Get information sensitivity classification for a security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Information sensitivity classification

***

### getComponentContent()

> **getComponentContent**(`component`, `level`): `object`

Defined in: [services/ciaContentService.ts:957](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L957)

Get component content details for a specific component and security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

CIA component type (availability, integrity, confidentiality)

##### level

`string`

Security level

#### Returns

`object`

Component content details

##### description

> **description**: `string`

##### technical

> **technical**: `string`

##### businessImpact

> **businessImpact**: `string`

##### recommendations

> **recommendations**: `string`[]

***

### getBusinessImpactContent()

> **getBusinessImpactContent**(`component`, `level`): `string`

Defined in: [services/ciaContentService.ts:1000](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L1000)

Get business impact content for a specific component and security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Business impact content as formatted string

***

### getSummaryContent()

> **getSummaryContent**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/ciaContentService.ts:1049](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L1049)

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

### getComplianceDescription()

> **getComplianceDescription**(`level`): `string`

Defined in: [services/ciaContentService.ts:1141](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L1141)

Get compliance description for a specific security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Compliance description

***

### getKeyValuePoints()

> **getKeyValuePoints**(`_component`, `level`): `string`[]

Defined in: [services/ciaContentService.ts:1165](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L1165)

Get key value points for a specific component and security level

#### Parameters

##### \_component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`[]

Array of value points

***

### getDefaultPrivacyImpact()

> **getDefaultPrivacyImpact**(`level`): `string`

Defined in: [services/ciaContentService.ts:1178](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L1178)

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

Defined in: [services/ciaContentService.ts:1201](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L1201)

Get default SLA metrics based on security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`object`

SLA metrics for availability

##### uptime

> **uptime**: `string`

##### rto

> **rto**: `string`

##### rpo

> **rpo**: `string`

##### mttr

> **mttr**: `string`

##### sla

> **sla**: `string`

***

### getDefaultValidationLevel()

> **getDefaultValidationLevel**(`level`): `string`

Defined in: [services/ciaContentService.ts:1266](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L1266)

Get default data validation level based on security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Validation level description

***

### getDefaultErrorRate()

> **getDefaultErrorRate**(`level`): `string`

Defined in: [services/ciaContentService.ts:1289](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/ciaContentService.ts#L1289)

Get default error rate based on security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Error rate description
