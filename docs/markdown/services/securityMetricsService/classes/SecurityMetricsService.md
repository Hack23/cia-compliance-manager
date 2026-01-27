[**CIA Compliance Manager Documentation v1.1.13**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/securityMetricsService](../README.md) / SecurityMetricsService

# Class: SecurityMetricsService

Defined in: [services/securityMetricsService.ts:220](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/securityMetricsService.ts#L220)

Service for security metrics and measurements

## Analytics Perspective

This service provides quantitative metrics for security levels, enabling
organizations to measure their security posture, track improvements over time,
and quantify the impact of security investments through cost-benefit analysis
and risk reduction calculations. 📊

## Implements

## Extends

- [`BaseService`](../../BaseService/classes/BaseService.md)

## Implements

- `ISecurityMetricsService`

## Constructors

### Constructor

> **new SecurityMetricsService**(`dataProvider`): `SecurityMetricsService`

Defined in: [services/securityMetricsService.ts:232](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/securityMetricsService.ts#L232)

Create a new SecurityMetricsService instance

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/interfaces/CIADataProvider.md)

Data provider for CIA options and metrics data

#### Returns

`SecurityMetricsService`

#### Throws

If dataProvider is not provided

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`constructor`](../../BaseService/classes/BaseService.md#constructor)

## Properties

### name

> `readonly` **name**: `string` = `'SecurityMetricsService'`

Defined in: [services/securityMetricsService.ts:224](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/securityMetricsService.ts#L224)

Service name for identification

#### Implementation of

`ISecurityMetricsService.name`

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`name`](../../BaseService/classes/BaseService.md#name)

## Methods

### calculateRoi()

> **calculateRoi**(`securityLevel`, `implementationCost`): [`ROIMetrics`](../../../types/interfaces/ROIMetrics.md)

Defined in: [services/securityMetricsService.ts:263](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/securityMetricsService.ts#L263)

Calculate ROI metrics based on security level and implementation cost

Computes return on investment (ROI) for security implementations by analyzing
the expected returns for different security levels. Higher security levels
typically yield better ROI through reduced incident costs and improved resilience.

#### Parameters

##### securityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Selected security level to calculate ROI for

##### implementationCost

`number`

Total cost of implementation in currency units (CAPEX + OPEX)

#### Returns

[`ROIMetrics`](../../../types/interfaces/ROIMetrics.md)

ROI metrics including monetary value, percentage return, and description

#### Throws

If security level is invalid

#### Example

```typescript
const service = new SecurityMetricsService(dataProvider);

// Calculate ROI for High security level with $100,000 investment
const roi = service.calculateRoi('High', 100000);
console.log(roi.value);        // "$300,000"
console.log(roi.percentage);   // "300%"
console.log(roi.description);  // "Return on investment for High security level implementation"

// No ROI for zero investment
const noRoi = service.calculateRoi('High', 0);
console.log(noRoi.value);      // "$0"
```

***

### calculateSecurityScore()

> **calculateSecurityScore**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `number`

Defined in: [services/securityMetricsService.ts:899](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/securityMetricsService.ts#L899)

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

#### Implementation of

`ISecurityMetricsService.calculateSecurityScore`

***

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): [`CIADetails`](../../../types/interfaces/CIADetails.md) \| `undefined`

Defined in: [services/BaseService.ts:193](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/BaseService.ts#L193)

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

Defined in: [services/securityMetricsService.ts:490](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/securityMetricsService.ts#L490)

Get component-specific security metrics

Provides detailed metrics for a single CIA component at a specific security level,
including score, description, recommendations, and cost information. Useful for
component-level analysis and detailed reporting.

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

CIA component type ('availability', 'integrity', or 'confidentiality')

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level for the component

#### Returns

[`ComponentMetrics`](../interfaces/ComponentMetrics.md)

Component metrics with score, description, recommendations, and cost details

#### Example

```typescript
const service = new SecurityMetricsService(dataProvider);

// Get metrics for availability at High level
const availMetrics = service.getComponentMetrics('availability', 'High');
console.log(availMetrics.score);         // 75 (0-100 scale)
console.log(availMetrics.level);         // "High"
console.log(availMetrics.description);   // "High availability with 99.9% uptime"
console.log(availMetrics.recommendations); // Array of improvement suggestions
console.log(availMetrics.capex);         // Capital expenditure cost
console.log(availMetrics.opex);          // Operational expenditure cost

// Get metrics for integrity
const integrityMetrics = service.getComponentMetrics('integrity', 'Very High');
console.log(integrityMetrics.component); // "integrity"
```

#### Implementation of

`ISecurityMetricsService.getComponentMetrics`

***

### getComponentTechnicalMetrics()

> **getComponentTechnicalMetrics**(`component`, `level`): `Record`\<`string`, `string`\>

Defined in: [services/securityMetricsService.ts:519](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/securityMetricsService.ts#L519)

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

Defined in: [services/securityMetricsService.ts:551](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/securityMetricsService.ts#L551)

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

#### Implementation of

`ISecurityMetricsService.getImpactMetrics`

***

### getProtectionLevel()

> **getProtectionLevel**(`level`): `string`

Defined in: [services/securityMetricsService.ts:787](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/securityMetricsService.ts#L787)

Get protection level based on security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Protection level description

#### Implementation of

`ISecurityMetricsService.getProtectionLevel`

***

### getRiskBadgeVariant()

> **getRiskBadgeVariant**(`riskLevel`): `"success"` \| `"info"` \| `"warning"` \| `"error"` \| `"neutral"`

Defined in: [services/securityMetricsService.ts:820](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/securityMetricsService.ts#L820)

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

Defined in: [services/securityMetricsService.ts:860](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/securityMetricsService.ts#L860)

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

Defined in: [services/BaseService.ts:254](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/BaseService.ts#L254)

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

Defined in: [services/securityMetricsService.ts:314](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/securityMetricsService.ts#L314)

Get ROI estimates from the data provider

Retrieves pre-configured return on investment estimates for all security levels.
Each level has associated return rates, potential savings, and break-even periods
based on industry research and historical data.

#### Returns

[`ROIEstimatesMap`](../interfaces/ROIEstimatesMap.md)

Map of ROI estimates keyed by security level (NONE, LOW, MODERATE, HIGH, VERY_HIGH)

#### Example

```typescript
const service = new SecurityMetricsService(dataProvider);
const estimates = service.getROIEstimates();

console.log(estimates.HIGH.returnRate);        // "300%"
console.log(estimates.HIGH.description);       // "High ROI with significant risk reduction"
console.log(estimates.MODERATE.breakEvenPeriod); // "2 years"
```

***

### getSecurityIcon()

> **getSecurityIcon**(`level`): `string`

Defined in: [services/securityMetricsService.ts:850](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/securityMetricsService.ts#L850)

Get security icon for a security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Security icon (emoji)

#### Implementation of

`ISecurityMetricsService.getSecurityIcon`

***

### getSecurityLevelDescription()

> **getSecurityLevelDescription**(`level`): `string`

Defined in: [services/securityMetricsService.ts:764](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/securityMetricsService.ts#L764)

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

Defined in: [services/securityMetricsService.ts:874](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/securityMetricsService.ts#L874)

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

Defined in: [services/securityMetricsService.ts:352](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/securityMetricsService.ts#L352)

Get comprehensive security metrics for selected security levels

Calculates a complete security assessment including scores, costs, risk reduction,
compliance metrics, and component-specific analysis. This is the primary method
for obtaining a holistic view of security posture across all CIA triad components.

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Integrity security level (defaults to availabilityLevel if not provided)

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Confidentiality security level (defaults to availabilityLevel if not provided)

#### Returns

[`SecurityMetrics`](../interfaces/SecurityMetrics.md)

Comprehensive security metrics object with scores, costs, and assessments

#### Example

```typescript
const service = new SecurityMetricsService(dataProvider);

// Get metrics for specific configuration
const metrics = service.getSecurityMetrics('High', 'Very High', 'Moderate');
console.log(metrics.overallScore);     // 75 (0-100 scale)
console.log(metrics.totalCost);        // 450000 (total CAPEX + OPEX)
console.log(metrics.riskReduction);    // "85%"
console.log(metrics.securityMaturity); // "Advanced"

// Use uniform level across all components
const uniformMetrics = service.getSecurityMetrics('Moderate');
console.log(uniformMetrics.availability.level);      // "Moderate"
console.log(uniformMetrics.integrity.level);         // "Moderate"
console.log(uniformMetrics.confidentiality.level);   // "Moderate"

// Access component-specific metrics
console.log(metrics.availability.score);           // Score for availability
console.log(metrics.availability.recommendations); // Recommendations array
```

***

### handleError()

> **handleError**(`error`): [`ServiceError`](../../classes/ServiceError.md)

Defined in: [services/BaseService.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/BaseService.ts#L104)

Handle errors consistently across services

#### Parameters

##### error

`Error`

Error to handle

#### Returns

[`ServiceError`](../../classes/ServiceError.md)

ServiceError

#### Implementation of

`ISecurityMetricsService.handleError`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`handleError`](../../BaseService/classes/BaseService.md#handleerror)

***

### validate()

> **validate**(`input`): `boolean`

Defined in: [services/BaseService.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/BaseService.ts#L73)

Validate input parameters (to be overridden by subclasses)

#### Parameters

##### input

`unknown`

Input to validate

#### Returns

`boolean`

True if valid, false otherwise

#### Implementation of

`ISecurityMetricsService.validate`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`validate`](../../BaseService/classes/BaseService.md#validate)
