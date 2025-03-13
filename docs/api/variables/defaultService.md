[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / defaultService

# Variable: defaultService

> `const` **defaultService**: `object`

Defined in: [src/services/ciaContentService.ts:1369](https://github.com/Hack23/cia-compliance-manager/blob/main/src/services/ciaContentService.ts#L1369)

## Type declaration

### calculateBusinessImpactLevel()

> **calculateBusinessImpactLevel**: (`availLevel`, `integrLevel`, `confLevel`) => [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Calculate business impact level based on CIA security levels

#### Parameters

##### availLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

##### integrLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

##### confLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

### getBusinessImpact()

> **getBusinessImpact**: (`component`, `level`) => [`BusinessImpactDetails`](../interfaces/BusinessImpactDetails.md)

Get comprehensive business impact details

#### Parameters

##### component

[`CIAComponentType`](../type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

[`BusinessImpactDetails`](../interfaces/BusinessImpactDetails.md)

### getBusinessImpactDescription()

> **getBusinessImpactDescription**: (`component`, `level`) => `string`

Get business impact description for a component and level

#### Parameters

##### component

[`CIAComponentType`](../type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`string`

### getBusinessPerspective()

> **getBusinessPerspective**: (`component`, `level`) => `string`

Get business perspective information for a component and level

#### Parameters

##### component

[`CIAComponentType`](../type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`string`

### getCategoryIcon()

> **getCategoryIcon**: (`category`) => `string`

Get icon for business impact category

#### Parameters

##### category

`string`

#### Returns

`string`

### getCIAOptions()

> **getCIAOptions**: (`component`) => `Record`\<`string`, [`EnhancedCIADetails`](../interfaces/EnhancedCIADetails.md)\>

Get the base options for a CIA component

#### Parameters

##### component

[`CIAComponentType`](../type-aliases/CIAComponentType.md)

#### Returns

`Record`\<`string`, [`EnhancedCIADetails`](../interfaces/EnhancedCIADetails.md)\>

### getComplianceStatus()

> **getComplianceStatus**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => `object`

Get compliance status based on CIA security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`object`

##### compliantFrameworks

> **compliantFrameworks**: `string`[]

##### nonCompliantFrameworks

> **nonCompliantFrameworks**: `string`[]

##### partiallyCompliantFrameworks

> **partiallyCompliantFrameworks**: `string`[]

##### remediationSteps?

> `optional` **remediationSteps**: `string`[]

##### requirements?

> `optional` **requirements**: `string`[]

### getCompliantFrameworks()

> **getCompliantFrameworks**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => `string`[]

Get compliant frameworks based on security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`string`[]

### getComponentDetails()

> **getComponentDetails**: (`component`, `level`) => `undefined` \| [`EnhancedCIADetails`](../interfaces/EnhancedCIADetails.md)

Get component details for a specific level with strong typing

#### Parameters

##### component

[`CIAComponentType`](../type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`undefined` \| [`EnhancedCIADetails`](../interfaces/EnhancedCIADetails.md)

### getComponentImplementationDetails()

> **getComponentImplementationDetails**: (`component`, `level`) => `ComponentTechnicalDetails`

Get technical implementation details for each component and level

#### Parameters

##### component

[`CIAComponentType`](../type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`ComponentTechnicalDetails`

### getComponentMetrics()

> **getComponentMetrics**: (`component`, `level`) => [`ComponentMetrics`](../interfaces/ComponentMetrics.md)

Get impact metrics for a given CIA component and security level

#### Parameters

##### component

[`CIAComponentType`](../type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

[`ComponentMetrics`](../interfaces/ComponentMetrics.md)

### getDetailedDescription()

> **getDetailedDescription**: (`component`, `level`) => `string`

Get detailed component description with enhanced type safety

#### Parameters

##### component

[`CIAComponentType`](../type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`string`

### getFrameworkDescription()

> **getFrameworkDescription**: (`framework`) => `string`

Get framework description for a specific compliance framework

#### Parameters

##### framework

`string`

#### Returns

`string`

### getImpactMetrics()

> **getImpactMetrics**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => `Record`\<`string`, [`ComponentMetrics`](../interfaces/ComponentMetrics.md)\>

Get combined impact metrics for all CIA components

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`Record`\<`string`, [`ComponentMetrics`](../interfaces/ComponentMetrics.md)\>

### getImplementationConsiderations()

> **getImplementationConsiderations**: (`level`) => `string`

Get implementation considerations for a security level

#### Parameters

##### level

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`string`

### getImplementationTime()

> **getImplementationTime**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => `string`

Get implementation time estimate based on security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`string`

### getInformationSensitivity()

> **getInformationSensitivity**: (`level`) => `string`

Get information sensitivity classification based on confidentiality level

#### Parameters

##### level

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`string`

### getProtectionLevel()

> **getProtectionLevel**: (`level`) => `string`

Get protection level description based on confidentiality level

#### Parameters

##### level

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`string`

### getRecommendations()

> **getRecommendations**: (`component`, `level`) => `string`[]

Get recommendations for a specific component and level
Always returns a string array, even when no recommendations are found

#### Parameters

##### component

[`CIAComponentType`](../type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`string`[]

### getRiskBadgeVariant()

> **getRiskBadgeVariant**: (`riskLevel`) => `"neutral"` \| `"success"` \| `"warning"` \| `"info"` \| `"error"`

Get appropriate badge variant based on risk level

#### Parameters

##### riskLevel

`string`

#### Returns

`"neutral"` \| `"success"` \| `"warning"` \| `"info"` \| `"error"`

### getROIEstimate()

> **getROIEstimate**: (`level`) => `object`

Get ROI estimate data for security level

#### Parameters

##### level

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`object`

##### description

> **description**: `string`

##### value

> **value**: `string`

### getROIEstimates()

> **getROIEstimates**: (`level`) => [`ROIMetrics`](../interfaces/ROIMetrics.md)

Get ROI information for a security level with proper type handling

#### Parameters

##### level

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

[`ROIMetrics`](../interfaces/ROIMetrics.md)

### getSecurityIcon()

> **getSecurityIcon**: (`level`) => `string`

Get security icon for a security level

#### Parameters

##### level

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`string`

### getSecurityLevelDescription()

> **getSecurityLevelDescription**: (`level`) => `string`

Get security level description with meaningful context

#### Parameters

##### level

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`string`

### getSecurityMetrics()

> **getSecurityMetrics**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => `object`

Get combined metrics for a security profile

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`object`

##### capexEstimate

> **capexEstimate**: `string`

##### isSmallSolution

> **isSmallSolution**: `boolean`

##### opexEstimate

> **opexEstimate**: `string`

##### roi

> **roi**: `string`

##### totalCapex

> **totalCapex**: `number`

##### totalOpex

> **totalOpex**: `number`

### getSecurityResources()

> **getSecurityResources**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `securityLevel`) => [`SecurityResource`](../interfaces/SecurityResource.md)[]

Get security resources based on security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

##### securityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

[`SecurityResource`](../interfaces/SecurityResource.md)[]

### getTechnicalDescription()

> **getTechnicalDescription**: (`component`, `level`) => `string`

Get technical description for a component and level

#### Parameters

##### component

[`CIAComponentType`](../type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`string`

### getTechnicalImplementation()

> **getTechnicalImplementation**: (`component`, `level`) => [`TechnicalImplementationDetails`](../interfaces/TechnicalImplementationDetails.md)

Get detailed technical implementation information

#### Parameters

##### component

[`CIAComponentType`](../type-aliases/CIAComponentType.md)

##### level

`string`

#### Returns

[`TechnicalImplementationDetails`](../interfaces/TechnicalImplementationDetails.md)

### getValuePoints()

> **getValuePoints**: (`level`) => `string`[]

Get value points for a security level

#### Parameters

##### level

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

#### Returns

`string`[]
