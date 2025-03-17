[**CIA Compliance Manager Diagrams v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/ciaContentService](../README.md) / default

# Variable: default

> `const` **default**: `object`

Defined in: [src/services/ciaContentService.ts:1370](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/services/ciaContentService.ts#L1370)

## Type declaration

### calculateBusinessImpactLevel()

> **calculateBusinessImpactLevel**: (`availLevel`, `integrLevel`, `confLevel`) => [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Calculate business impact level based on CIA security levels

#### Parameters

##### availLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### integrLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### confLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### getBusinessImpact()

> **getBusinessImpact**: (`component`, `level`) => [`BusinessImpactDetails`](../../../types/cia-services/interfaces/BusinessImpactDetails.md)

Get comprehensive business impact details

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`BusinessImpactDetails`](../../../types/cia-services/interfaces/BusinessImpactDetails.md)

### getBusinessImpactDescription()

> **getBusinessImpactDescription**: (`component`, `level`) => `string`

Get business impact description for a component and level

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

### getBusinessPerspective()

> **getBusinessPerspective**: (`component`, `level`) => `string`

Get business perspective information for a component and level

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

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

> **getCIAOptions**: (`component`) => `Record`\<`string`, [`EnhancedCIADetails`](../../../hooks/useCIAOptions/interfaces/EnhancedCIADetails.md)\>

Get the base options for a CIA component

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

#### Returns

`Record`\<`string`, [`EnhancedCIADetails`](../../../hooks/useCIAOptions/interfaces/EnhancedCIADetails.md)\>

### getComplianceStatus()

> **getComplianceStatus**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => `object`

Get compliance status based on CIA security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

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

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

### getComponentDetails()

> **getComponentDetails**: (`component`, `level`) => `undefined` \| [`EnhancedCIADetails`](../../../hooks/useCIAOptions/interfaces/EnhancedCIADetails.md)

Get component details for a specific level with strong typing

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`undefined` \| [`EnhancedCIADetails`](../../../hooks/useCIAOptions/interfaces/EnhancedCIADetails.md)

### getComponentImplementationDetails()

> **getComponentImplementationDetails**: (`component`, `level`) => `ComponentTechnicalDetails`

Get technical implementation details for each component and level

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`ComponentTechnicalDetails`

### getComponentMetrics()

> **getComponentMetrics**: (`component`, `level`) => [`ComponentMetrics`](../interfaces/ComponentMetrics.md)

Get impact metrics for a given CIA component and security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`ComponentMetrics`](../interfaces/ComponentMetrics.md)

### getDetailedDescription()

> **getDetailedDescription**: (`component`, `level`) => `string`

Get detailed component description with enhanced type safety

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

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

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`Record`\<`string`, [`ComponentMetrics`](../interfaces/ComponentMetrics.md)\>

### getImplementationConsiderations()

> **getImplementationConsiderations**: (`level`) => `string`

Get implementation considerations for a security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

### getImplementationTime()

> **getImplementationTime**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => `string`

Get implementation time estimate based on security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

### getInformationSensitivity()

> **getInformationSensitivity**: (`level`) => `string`

Get information sensitivity classification based on confidentiality level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

### getProtectionLevel()

> **getProtectionLevel**: (`level`) => `string`

Get protection level description based on confidentiality level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

### getRecommendations()

> **getRecommendations**: (`component`, `level`) => `string`[]

Get recommendations for a specific component and level
Always returns a string array, even when no recommendations are found

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

### getRiskBadgeVariant()

> **getRiskBadgeVariant**: (`riskLevel`) => `"error"` \| `"info"` \| `"success"` \| `"warning"` \| `"neutral"`

Get appropriate badge variant based on risk level

#### Parameters

##### riskLevel

`string`

#### Returns

`"error"` \| `"info"` \| `"success"` \| `"warning"` \| `"neutral"`

### getROIEstimate()

> **getROIEstimate**: (`level`) => `object`

Get ROI estimate data for security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`object`

##### description

> **description**: `string`

##### returnRate

> **returnRate**: `string`

##### value

> **value**: `string`

### getROIEstimates()

> **getROIEstimates**: (`level`) => [`ROIMetrics`](../../../types/cia-services/interfaces/ROIMetrics.md)

Get ROI information for a security level with proper type handling

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`ROIMetrics`](../../../types/cia-services/interfaces/ROIMetrics.md)

### getSecurityIcon()

> **getSecurityIcon**: (`level`) => `string`

Get security icon for a security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

### getSecurityLevelDescription()

> **getSecurityLevelDescription**: (`level`) => `string`

Get security level description with meaningful context

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

### getSecurityMetrics()

> **getSecurityMetrics**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => `object`

Get combined metrics for a security profile

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

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

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### securityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`SecurityResource`](../interfaces/SecurityResource.md)[]

### getTechnicalDescription()

> **getTechnicalDescription**: (`component`, `level`) => `string`

Get technical description for a component and level

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

### getTechnicalImplementation()

> **getTechnicalImplementation**: (`component`, `level`) => [`TechnicalImplementationDetails`](../../../types/cia-services/interfaces/TechnicalImplementationDetails.md)

Get detailed technical implementation information

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

`string`

#### Returns

[`TechnicalImplementationDetails`](../../../types/cia-services/interfaces/TechnicalImplementationDetails.md)

### getValuePoints()

> **getValuePoints**: (`level`) => `string`[]

Get value points for a security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]
