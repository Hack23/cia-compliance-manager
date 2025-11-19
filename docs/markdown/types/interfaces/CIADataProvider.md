[**CIA Compliance Manager Documentation v0.9.1**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [types](../README.md) / CIADataProvider

# Interface: CIADataProvider

Defined in: [types/cia-services.ts:306](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L306)

Data provider for CIA security information

## Properties

### availabilityOptions

> **availabilityOptions**: `Record`\<[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:312](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L312)

***

### confidentialityOptions

> **confidentialityOptions**: `Record`\<[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:314](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L314)

***

### getBusinessImpact()?

> `optional` **getBusinessImpact**: () => `Promise`\<[`BusinessImpactDetails`](BusinessImpactDetails.md)\>

Defined in: [types/cia-services.ts:361](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L361)

Get business impact

#### Returns

`Promise`\<[`BusinessImpactDetails`](BusinessImpactDetails.md)\>

***

### getComplianceFrameworks()?

> `optional` **getComplianceFrameworks**: () => `Promise`\<[`ComplianceFramework`](../compliance/interfaces/ComplianceFramework.md)[]\>

Defined in: [types/cia-services.ts:351](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L351)

Get compliance frameworks

#### Returns

`Promise`\<[`ComplianceFramework`](../compliance/interfaces/ComplianceFramework.md)[]\>

***

### getComplianceRequirements()?

> `optional` **getComplianceRequirements**: () => `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [types/cia-services.ts:356](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L356)

Get compliance requirements

#### Returns

`Promise`\<`Record`\<`string`, `unknown`\>\>

***

### getCostEstimates()?

> `optional` **getCostEstimates**: () => `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [types/cia-services.ts:381](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L381)

Get cost estimates

#### Returns

`Promise`\<`Record`\<`string`, `unknown`\>\>

***

### getDefaultExpertiseLevel()?

> `optional` **getDefaultExpertiseLevel**: (`level`) => `string`

Defined in: [types/cia-services.ts:325](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L325)

Get default expertise level for a security level

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDefaultSecurityIcon()?

> `optional` **getDefaultSecurityIcon**: (`level`) => `string`

Defined in: [types/cia-services.ts:320](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L320)

Get default security icon for a security level

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDefaultValuePoints()?

> `optional` **getDefaultValuePoints**: (`level`) => `string`[]

Defined in: [types/cia-services.ts:335](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L335)

Get default value points for a security level

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### getImplementationDetails()?

> `optional` **getImplementationDetails**: () => `Promise`\<[`TechnicalImplementationDetails`](TechnicalImplementationDetails.md)\>

Defined in: [types/cia-services.ts:391](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L391)

Get implementation details

#### Returns

`Promise`\<[`TechnicalImplementationDetails`](TechnicalImplementationDetails.md)\>

***

### getProtectionLevel()?

> `optional` **getProtectionLevel**: (`level`) => `string`

Defined in: [types/cia-services.ts:330](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L330)

Get protection level for a security level

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getRemediationSteps()?

> `optional` **getRemediationSteps**: () => `Promise`\<`string`[]\>

Defined in: [types/cia-services.ts:396](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L396)

Get remediation steps

#### Returns

`Promise`\<`string`[]\>

***

### getSecurityLevelRecommendations()?

> `optional` **getSecurityLevelRecommendations**: (`level`) => `Promise`\<`string`[]\>

Defined in: [types/cia-services.ts:346](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L346)

Get security level recommendations

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`Promise`\<`string`[]\>

***

### getSecurityMetrics()?

> `optional` **getSecurityMetrics**: () => `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [types/cia-services.ts:366](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L366)

Get security metrics

#### Returns

`Promise`\<`Record`\<`string`, `unknown`\>\>

***

### getSecurityResources()?

> `optional` **getSecurityResources**: () => `Promise`\<[`SecurityResource`](../../services/interfaces/SecurityResource.md)[]\>

Defined in: [types/cia-services.ts:371](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L371)

Get security resources

#### Returns

`Promise`\<[`SecurityResource`](../../services/interfaces/SecurityResource.md)[]\>

***

### getSLAMetrics()?

> `optional` **getSLAMetrics**: () => `Promise`\<[`SLAMetrics`](../businessImpact/interfaces/SLAMetrics.md)\>

Defined in: [types/cia-services.ts:376](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L376)

Get SLA metrics

#### Returns

`Promise`\<[`SLAMetrics`](../businessImpact/interfaces/SLAMetrics.md)\>

***

### getValueCreationMetrics()?

> `optional` **getValueCreationMetrics**: () => `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [types/cia-services.ts:386](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L386)

Get value creation metrics

#### Returns

`Promise`\<`Record`\<`string`, `unknown`\>\>

***

### ~~getValuePoints()?~~

> `optional` **getValuePoints**: (`level`) => `string`[]

Defined in: [types/cia-services.ts:341](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L341)

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

Defined in: [types/cia-services.ts:310](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L310)

Initialize the data provider

#### Returns

`Promise`\<`boolean`\>

***

### integrityOptions

> **integrityOptions**: `Record`\<[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:313](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L313)

***

### roiEstimates

> **roiEstimates**: [`ROIEstimatesMap`](ROIEstimatesMap.md)

Defined in: [types/cia-services.ts:315](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/types/cia-services.ts#L315)
