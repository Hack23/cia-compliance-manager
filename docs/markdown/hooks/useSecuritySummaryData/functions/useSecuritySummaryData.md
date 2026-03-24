[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [hooks/useSecuritySummaryData](../README.md) / useSecuritySummaryData

# Function: useSecuritySummaryData()

> **useSecuritySummaryData**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `ciaContentService`, `complianceService`): `object`

Defined in: [hooks/useSecuritySummaryData.ts:32](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/hooks/useSecuritySummaryData.ts#L32)

Custom hook for SecuritySummaryWidget data calculations
Extracts all data transformation logic for better testability and reusability

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Selected availability security level

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Selected integrity security level

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Selected confidentiality security level

### ciaContentService

`unknown`

CIA content service instance

### complianceService

`unknown`

Compliance service instance

## Returns

Computed security summary data and helper functions

### overallSecurityLevel

> **overallSecurityLevel**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### securityLevelDescription

> **securityLevelDescription**: `string`

### securityScore

> **securityScore**: `number`

### riskLevel

> **riskLevel**: `string`

### securityClassification

> **securityClassification**: `string`

### dataClassification

> **dataClassification**: `string`

### implementationComplexity

> **implementationComplexity**: `string`

### complianceStatus

> **complianceStatus**: [`ComplianceStatusType`](../../../types/compliance/interfaces/ComplianceStatusType.md) \| `null`

### businessMaturityLevel

> **businessMaturityLevel**: `string`

### businessMaturityDescription

> **businessMaturityDescription**: `string`

### costDetails

> **costDetails**: `object`

#### costDetails.availabilityCost

> **availabilityCost**: [`CostResult`](../../../utils/costCalculationUtils/interfaces/CostResult.md)

#### costDetails.integrityCost

> **integrityCost**: [`CostResult`](../../../utils/costCalculationUtils/interfaces/CostResult.md)

#### costDetails.confidentialityCost

> **confidentialityCost**: [`CostResult`](../../../utils/costCalculationUtils/interfaces/CostResult.md)

#### costDetails.totalCapex

> **totalCapex**: `number`

#### costDetails.totalOpex

> **totalOpex**: `number`

#### costDetails.totalCost

> **totalCost**: `number`

### implementationTime

> **implementationTime**: `string`

### requiredResources

> **requiredResources**: `string`

### roiEstimate

> **roiEstimate**: `string`

### getStatusVariant

> **getStatusVariant**: (`level`) => [`StatusType`](../../../types/common/StatusTypes/type-aliases/StatusType.md)

Converts a risk level string to a status badge variant

Maps security levels to appropriate badge variants for consistent
visual representation. Uses color-coded variants that align with
security posture intuition (green=secure, red=insecure).

#### Parameters

##### level

`string`

The risk level string (e.g., "Low Risk", "High Risk")

#### Returns

[`StatusType`](../../../types/common/StatusTypes/type-aliases/StatusType.md)

The corresponding StatusType for the badge

#### Example

```typescript
getStatusVariant('none')       // 'error' (red - critical)
getStatusVariant('low')        // 'warning' (yellow)
getStatusVariant('moderate')   // 'info' (blue)
getStatusVariant('high')       // 'success' (green)
getStatusVariant('very high')  // 'purple' (premium)
getStatusVariant('unknown')    // 'neutral' (gray)

// Usage in component
<StatusBadge variant={getStatusVariant(securityLevel)}>
  {securityLevel}
</StatusBadge>
```

### getRiskColorClass

> **getRiskColorClass**: (`risk`) => `string`

Gets the appropriate Tailwind CSS color class for a risk level

Provides Tailwind CSS color classes for risk level text styling with
dark mode support. Colors semantically represent risk severity using
industry-standard color conventions.

#### Parameters

##### risk

`string`

The risk level string (e.g., "Low Risk", "Critical Risk")

#### Returns

`string`

Tailwind CSS class string for text color with dark mode support

#### Example

```typescript
getRiskColorClass('Low Risk')      // 'text-green-600 dark:text-green-400'
getRiskColorClass('Medium Risk')   // 'text-yellow-600 dark:text-yellow-400'
getRiskColorClass('High Risk')     // 'text-orange-600 dark:text-orange-400'
getRiskColorClass('Critical Risk') // 'text-red-600 dark:text-red-400'
getRiskColorClass('Unknown')       // 'text-gray-600 dark:text-gray-400'

// Usage in component
<span className={getRiskColorClass(riskLevel)}>
  Risk Level: {riskLevel}
</span>
```
