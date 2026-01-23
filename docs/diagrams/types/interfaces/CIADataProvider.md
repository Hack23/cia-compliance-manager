[**CIA Compliance Manager Diagrams v1.1.12**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / CIADataProvider

# Interface: CIADataProvider

Defined in: [types/cia-services.ts:301](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/cia-services.ts#L301)

Data provider for CIA security information

## Properties

### availabilityOptions

> **availabilityOptions**: `Record`\<[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:307](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/cia-services.ts#L307)

***

### confidentialityOptions

> **confidentialityOptions**: `Record`\<[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:309](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/cia-services.ts#L309)

***

### getBusinessImpact()?

> `optional` **getBusinessImpact**: () => `Promise`\<[`BusinessImpactDetails`](BusinessImpactDetails.md)\>

Defined in: [types/cia-services.ts:350](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/cia-services.ts#L350)

Get business impact

#### Returns

`Promise`\<[`BusinessImpactDetails`](BusinessImpactDetails.md)\>

***

### getComplianceFrameworks()?

> `optional` **getComplianceFrameworks**: () => `Promise`\<[`ComplianceFramework`](../compliance/interfaces/ComplianceFramework.md)[]\>

Defined in: [types/cia-services.ts:340](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/cia-services.ts#L340)

Get compliance frameworks

#### Returns

`Promise`\<[`ComplianceFramework`](../compliance/interfaces/ComplianceFramework.md)[]\>

***

### getComplianceRequirements()?

> `optional` **getComplianceRequirements**: () => `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [types/cia-services.ts:345](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/cia-services.ts#L345)

Get compliance requirements

#### Returns

`Promise`\<`Record`\<`string`, `unknown`\>\>

***

### getCostEstimates()?

> `optional` **getCostEstimates**: () => `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [types/cia-services.ts:370](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/cia-services.ts#L370)

Get cost estimates

#### Returns

`Promise`\<`Record`\<`string`, `unknown`\>\>

***

### getDefaultExpertiseLevel()?

> `optional` **getDefaultExpertiseLevel**: (`level`) => `string`

Defined in: [types/cia-services.ts:320](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/cia-services.ts#L320)

Get default expertise level for a security level

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDefaultSecurityIcon()?

> `optional` **getDefaultSecurityIcon**: (`level`) => `string`

Defined in: [types/cia-services.ts:315](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/cia-services.ts#L315)

Get default security icon for a security level

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDefaultValuePoints()?

> `optional` **getDefaultValuePoints**: (`level`) => `string`[]

Defined in: [types/cia-services.ts:330](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/cia-services.ts#L330)

Get default value points for a security level

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### getImplementationDetails()?

> `optional` **getImplementationDetails**: () => `Promise`\<[`TechnicalImplementationDetails`](TechnicalImplementationDetails.md)\>

Defined in: [types/cia-services.ts:380](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/cia-services.ts#L380)

Get implementation details

#### Returns

`Promise`\<[`TechnicalImplementationDetails`](TechnicalImplementationDetails.md)\>

***

### getProtectionLevel()?

> `optional` **getProtectionLevel**: (`level`) => `string`

Defined in: [types/cia-services.ts:325](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/cia-services.ts#L325)

Get protection level for a security level

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getRemediationSteps()?

> `optional` **getRemediationSteps**: () => `Promise`\<`string`[]\>

Defined in: [types/cia-services.ts:385](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/cia-services.ts#L385)

Get remediation steps

#### Returns

`Promise`\<`string`[]\>

***

### getSecurityLevelRecommendations()?

> `optional` **getSecurityLevelRecommendations**: (`level`) => `Promise`\<`string`[]\>

Defined in: [types/cia-services.ts:335](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/cia-services.ts#L335)

Get security level recommendations

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`Promise`\<`string`[]\>

***

### getSecurityMetrics()?

> `optional` **getSecurityMetrics**: () => `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [types/cia-services.ts:355](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/cia-services.ts#L355)

Get security metrics

#### Returns

`Promise`\<`Record`\<`string`, `unknown`\>\>

***

### getSecurityResources()?

> `optional` **getSecurityResources**: () => `Promise`\<[`SecurityResource`](../../services/interfaces/SecurityResource.md)[]\>

Defined in: [types/cia-services.ts:360](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/cia-services.ts#L360)

Get security resources

#### Returns

`Promise`\<[`SecurityResource`](../../services/interfaces/SecurityResource.md)[]\>

***

### getSLAMetrics()?

> `optional` **getSLAMetrics**: () => `Promise`\<[`SLAMetrics`](../businessImpact/interfaces/SLAMetrics.md)\>

Defined in: [types/cia-services.ts:365](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/cia-services.ts#L365)

Get SLA metrics

#### Returns

`Promise`\<[`SLAMetrics`](../businessImpact/interfaces/SLAMetrics.md)\>

***

### getValueCreationMetrics()?

> `optional` **getValueCreationMetrics**: () => `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [types/cia-services.ts:375](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/cia-services.ts#L375)

Get value creation metrics

#### Returns

`Promise`\<`Record`\<`string`, `unknown`\>\>

***

### initialize()?

> `optional` **initialize**: () => `Promise`\<`boolean`\>

Defined in: [types/cia-services.ts:305](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/cia-services.ts#L305)

Initialize the data provider

#### Returns

`Promise`\<`boolean`\>

***

### integrityOptions

> **integrityOptions**: `Record`\<[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:308](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/cia-services.ts#L308)

***

### roiEstimates

> **roiEstimates**: [`ROIEstimatesMap`](ROIEstimatesMap.md)

Defined in: [types/cia-services.ts:310](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/types/cia-services.ts#L310)
