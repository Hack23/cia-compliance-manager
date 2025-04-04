[**CIA Compliance Manager Documentation v0.8.5**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [types](../README.md) / CIADataProvider

# Interface: CIADataProvider

Defined in: [types/cia-services.ts:273](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L273)

Data provider for CIA security information

## Properties

### availabilityOptions

> **availabilityOptions**: `Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:279](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L279)

***

### confidentialityOptions

> **confidentialityOptions**: `Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:281](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L281)

***

### getBusinessImpact()?

> `optional` **getBusinessImpact**: () => `Promise`\<`any`\>

Defined in: [types/cia-services.ts:328](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L328)

Get business impact

#### Returns

`Promise`\<`any`\>

***

### getComplianceFrameworks()?

> `optional` **getComplianceFrameworks**: () => `Promise`\<`any`[]\>

Defined in: [types/cia-services.ts:318](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L318)

Get compliance frameworks

#### Returns

`Promise`\<`any`[]\>

***

### getComplianceRequirements()?

> `optional` **getComplianceRequirements**: () => `Promise`\<`any`\>

Defined in: [types/cia-services.ts:323](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L323)

Get compliance requirements

#### Returns

`Promise`\<`any`\>

***

### getCostEstimates()?

> `optional` **getCostEstimates**: () => `Promise`\<`any`\>

Defined in: [types/cia-services.ts:348](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L348)

Get cost estimates

#### Returns

`Promise`\<`any`\>

***

### getDefaultExpertiseLevel()?

> `optional` **getDefaultExpertiseLevel**: (`level`) => `string`

Defined in: [types/cia-services.ts:292](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L292)

Get default expertise level for a security level

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDefaultSecurityIcon()?

> `optional` **getDefaultSecurityIcon**: (`level`) => `string`

Defined in: [types/cia-services.ts:287](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L287)

Get default security icon for a security level

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDefaultValuePoints()?

> `optional` **getDefaultValuePoints**: (`level`) => `string`[]

Defined in: [types/cia-services.ts:302](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L302)

Get default value points for a security level

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### getImplementationDetails()?

> `optional` **getImplementationDetails**: () => `Promise`\<`any`\>

Defined in: [types/cia-services.ts:358](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L358)

Get implementation details

#### Returns

`Promise`\<`any`\>

***

### getProtectionLevel()?

> `optional` **getProtectionLevel**: (`level`) => `string`

Defined in: [types/cia-services.ts:297](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L297)

Get protection level for a security level

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getRemediationSteps()?

> `optional` **getRemediationSteps**: () => `Promise`\<`any`[]\>

Defined in: [types/cia-services.ts:363](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L363)

Get remediation steps

#### Returns

`Promise`\<`any`[]\>

***

### getSecurityLevelRecommendations()?

> `optional` **getSecurityLevelRecommendations**: (`level`) => `Promise`\<`string`[]\>

Defined in: [types/cia-services.ts:313](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L313)

Get security level recommendations

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`Promise`\<`string`[]\>

***

### getSecurityMetrics()?

> `optional` **getSecurityMetrics**: () => `Promise`\<`any`\>

Defined in: [types/cia-services.ts:333](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L333)

Get security metrics

#### Returns

`Promise`\<`any`\>

***

### getSecurityResources()?

> `optional` **getSecurityResources**: () => `Promise`\<`any`[]\>

Defined in: [types/cia-services.ts:338](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L338)

Get security resources

#### Returns

`Promise`\<`any`[]\>

***

### getSLAMetrics()?

> `optional` **getSLAMetrics**: () => `Promise`\<`any`\>

Defined in: [types/cia-services.ts:343](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L343)

Get SLA metrics

#### Returns

`Promise`\<`any`\>

***

### getValueCreationMetrics()?

> `optional` **getValueCreationMetrics**: () => `Promise`\<`any`\>

Defined in: [types/cia-services.ts:353](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L353)

Get value creation metrics

#### Returns

`Promise`\<`any`\>

***

### ~~getValuePoints()?~~

> `optional` **getValuePoints**: (`level`) => `string`[]

Defined in: [types/cia-services.ts:308](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L308)

Get value points for a security level

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

#### Deprecated

Use getDefaultValuePoints instead

***

### initialize()?

> `optional` **initialize**: () => `Promise`\<`boolean`\>

Defined in: [types/cia-services.ts:277](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L277)

Initialize the data provider

#### Returns

`Promise`\<`boolean`\>

***

### integrityOptions

> **integrityOptions**: `Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:280](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L280)

***

### roiEstimates

> **roiEstimates**: [`ROIEstimatesMap`](ROIEstimatesMap.md)

Defined in: [types/cia-services.ts:282](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L282)
