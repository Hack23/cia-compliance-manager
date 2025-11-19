[**CIA Compliance Manager Documentation v0.8.40**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [types](../README.md) / CIADataProvider

# Interface: CIADataProvider

Defined in: [types/cia-services.ts:302](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L302)

Data provider for CIA security information

## Properties

### availabilityOptions

> **availabilityOptions**: `Record`\<[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:308](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L308)

***

### confidentialityOptions

> **confidentialityOptions**: `Record`\<[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:310](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L310)

***

### getBusinessImpact()?

> `optional` **getBusinessImpact**: () => `Promise`\<[`BusinessImpactDetails`](BusinessImpactDetails.md)\>

Defined in: [types/cia-services.ts:357](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L357)

Get business impact

#### Returns

`Promise`\<[`BusinessImpactDetails`](BusinessImpactDetails.md)\>

***

### getComplianceFrameworks()?

> `optional` **getComplianceFrameworks**: () => `Promise`\<[`ComplianceFramework`](../compliance/interfaces/ComplianceFramework.md)[]\>

Defined in: [types/cia-services.ts:347](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L347)

Get compliance frameworks

#### Returns

`Promise`\<[`ComplianceFramework`](../compliance/interfaces/ComplianceFramework.md)[]\>

***

### getComplianceRequirements()?

> `optional` **getComplianceRequirements**: () => `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [types/cia-services.ts:352](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L352)

Get compliance requirements

#### Returns

`Promise`\<`Record`\<`string`, `unknown`\>\>

***

### getCostEstimates()?

> `optional` **getCostEstimates**: () => `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [types/cia-services.ts:377](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L377)

Get cost estimates

#### Returns

`Promise`\<`Record`\<`string`, `unknown`\>\>

***

### getDefaultExpertiseLevel()?

> `optional` **getDefaultExpertiseLevel**: (`level`) => `string`

Defined in: [types/cia-services.ts:321](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L321)

Get default expertise level for a security level

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDefaultSecurityIcon()?

> `optional` **getDefaultSecurityIcon**: (`level`) => `string`

Defined in: [types/cia-services.ts:316](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L316)

Get default security icon for a security level

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDefaultValuePoints()?

> `optional` **getDefaultValuePoints**: (`level`) => `string`[]

Defined in: [types/cia-services.ts:331](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L331)

Get default value points for a security level

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### getImplementationDetails()?

> `optional` **getImplementationDetails**: () => `Promise`\<[`TechnicalImplementationDetails`](TechnicalImplementationDetails.md)\>

Defined in: [types/cia-services.ts:387](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L387)

Get implementation details

#### Returns

`Promise`\<[`TechnicalImplementationDetails`](TechnicalImplementationDetails.md)\>

***

### getProtectionLevel()?

> `optional` **getProtectionLevel**: (`level`) => `string`

Defined in: [types/cia-services.ts:326](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L326)

Get protection level for a security level

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getRemediationSteps()?

> `optional` **getRemediationSteps**: () => `Promise`\<`string`[]\>

Defined in: [types/cia-services.ts:392](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L392)

Get remediation steps

#### Returns

`Promise`\<`string`[]\>

***

### getSecurityLevelRecommendations()?

> `optional` **getSecurityLevelRecommendations**: (`level`) => `Promise`\<`string`[]\>

Defined in: [types/cia-services.ts:342](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L342)

Get security level recommendations

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`Promise`\<`string`[]\>

***

### getSecurityMetrics()?

> `optional` **getSecurityMetrics**: () => `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [types/cia-services.ts:362](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L362)

Get security metrics

#### Returns

`Promise`\<`Record`\<`string`, `unknown`\>\>

***

### getSecurityResources()?

> `optional` **getSecurityResources**: () => `Promise`\<[`SecurityResource`](../../services/interfaces/SecurityResource.md)[]\>

Defined in: [types/cia-services.ts:367](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L367)

Get security resources

#### Returns

`Promise`\<[`SecurityResource`](../../services/interfaces/SecurityResource.md)[]\>

***

### getSLAMetrics()?

> `optional` **getSLAMetrics**: () => `Promise`\<[`SLAMetrics`](../businessImpact/interfaces/SLAMetrics.md)\>

Defined in: [types/cia-services.ts:372](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L372)

Get SLA metrics

#### Returns

`Promise`\<[`SLAMetrics`](../businessImpact/interfaces/SLAMetrics.md)\>

***

### getValueCreationMetrics()?

> `optional` **getValueCreationMetrics**: () => `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [types/cia-services.ts:382](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L382)

Get value creation metrics

#### Returns

`Promise`\<`Record`\<`string`, `unknown`\>\>

***

### ~~getValuePoints()?~~

> `optional` **getValuePoints**: (`level`) => `string`[]

Defined in: [types/cia-services.ts:337](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L337)

Get value points for a security level

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

#### Deprecated

Use getDefaultValuePoints instead

***

### initialize()?

> `optional` **initialize**: () => `Promise`\<`boolean`\>

Defined in: [types/cia-services.ts:306](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L306)

Initialize the data provider

#### Returns

`Promise`\<`boolean`\>

***

### integrityOptions

> **integrityOptions**: `Record`\<[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:309](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L309)

***

### roiEstimates

> **roiEstimates**: [`ROIEstimatesMap`](ROIEstimatesMap.md)

Defined in: [types/cia-services.ts:311](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L311)
