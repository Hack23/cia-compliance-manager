[**CIA Compliance Manager Diagrams v1.0.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/securityMetricsService](../README.md) / SecurityMetricsService

# Class: SecurityMetricsService

Defined in: [services/securityMetricsService.ts:214](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/services/securityMetricsService.ts#L214)

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

Defined in: [services/securityMetricsService.ts:215](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/services/securityMetricsService.ts#L215)

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

Defined in: [services/securityMetricsService.ts:245](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/services/securityMetricsService.ts#L245)

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

Defined in: [services/securityMetricsService.ts:881](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/services/securityMetricsService.ts#L881)

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

Defined in: [services/BaseService.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/services/BaseService.ts#L53)

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

Defined in: [services/securityMetricsService.ts:472](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/services/securityMetricsService.ts#L472)

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

***

### getComponentTechnicalMetrics()

> **getComponentTechnicalMetrics**(`component`, `level`): `Record`\<`string`, `string`\>

Defined in: [services/securityMetricsService.ts:501](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/services/securityMetricsService.ts#L501)

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

Defined in: [services/securityMetricsService.ts:533](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/services/securityMetricsService.ts#L533)

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

Defined in: [services/securityMetricsService.ts:769](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/services/securityMetricsService.ts#L769)

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

Defined in: [services/securityMetricsService.ts:802](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/services/securityMetricsService.ts#L802)

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

Defined in: [services/securityMetricsService.ts:842](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/services/securityMetricsService.ts#L842)

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

Defined in: [services/BaseService.ts:114](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/services/BaseService.ts#L114)

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

Defined in: [services/securityMetricsService.ts:296](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/services/securityMetricsService.ts#L296)

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

Defined in: [services/securityMetricsService.ts:832](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/services/securityMetricsService.ts#L832)

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

Defined in: [services/securityMetricsService.ts:746](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/services/securityMetricsService.ts#L746)

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

Defined in: [services/securityMetricsService.ts:856](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/services/securityMetricsService.ts#L856)

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

Defined in: [services/securityMetricsService.ts:334](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/services/securityMetricsService.ts#L334)

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
