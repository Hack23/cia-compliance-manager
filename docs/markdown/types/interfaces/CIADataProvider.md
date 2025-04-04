[**CIA Compliance Manager Documentation v0.8.6**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [types](../README.md) / CIADataProvider

# Interface: CIADataProvider

Defined in: [types/cia-services.ts:297](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L297)

Data provider for CIA security information

## Properties

### availabilityOptions

> **availabilityOptions**: `Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:303](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L303)

***

### confidentialityOptions

> **confidentialityOptions**: `Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:305](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L305)

***

### getBusinessImpact()?

> `optional` **getBusinessImpact**: () => `Promise`\<`any`\>

Defined in: [types/cia-services.ts:352](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L352)

Get business impact

#### Returns

`Promise`\<`any`\>

***

### getComplianceFrameworks()?

> `optional` **getComplianceFrameworks**: () => `Promise`\<`any`[]\>

Defined in: [types/cia-services.ts:342](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L342)

Get compliance frameworks

#### Returns

`Promise`\<`any`[]\>

***

### getComplianceRequirements()?

> `optional` **getComplianceRequirements**: () => `Promise`\<`any`\>

Defined in: [types/cia-services.ts:347](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L347)

Get compliance requirements

#### Returns

`Promise`\<`any`\>

***

### getCostEstimates()?

> `optional` **getCostEstimates**: () => `Promise`\<`any`\>

Defined in: [types/cia-services.ts:372](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L372)

Get cost estimates

#### Returns

`Promise`\<`any`\>

***

### getDefaultExpertiseLevel()?

> `optional` **getDefaultExpertiseLevel**: (`level`) => `string`

Defined in: [types/cia-services.ts:316](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L316)

Get default expertise level for a security level

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDefaultSecurityIcon()?

> `optional` **getDefaultSecurityIcon**: (`level`) => `string`

Defined in: [types/cia-services.ts:311](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L311)

Get default security icon for a security level

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDefaultValuePoints()?

> `optional` **getDefaultValuePoints**: (`level`) => `string`[]

Defined in: [types/cia-services.ts:326](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L326)

Get default value points for a security level

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### getImplementationDetails()?

> `optional` **getImplementationDetails**: () => `Promise`\<`any`\>

Defined in: [types/cia-services.ts:382](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L382)

Get implementation details

#### Returns

`Promise`\<`any`\>

***

### getProtectionLevel()?

> `optional` **getProtectionLevel**: (`level`) => `string`

Defined in: [types/cia-services.ts:321](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L321)

Get protection level for a security level

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getRemediationSteps()?

> `optional` **getRemediationSteps**: () => `Promise`\<`any`[]\>

Defined in: [types/cia-services.ts:387](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L387)

Get remediation steps

#### Returns

`Promise`\<`any`[]\>

***

### getSecurityLevelRecommendations()?

> `optional` **getSecurityLevelRecommendations**: (`level`) => `Promise`\<`string`[]\>

Defined in: [types/cia-services.ts:337](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L337)

Get security level recommendations

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`Promise`\<`string`[]\>

***

### getSecurityMetrics()?

> `optional` **getSecurityMetrics**: () => `Promise`\<`any`\>

Defined in: [types/cia-services.ts:357](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L357)

Get security metrics

#### Returns

`Promise`\<`any`\>

***

### getSecurityResources()?

> `optional` **getSecurityResources**: () => `Promise`\<`any`[]\>

Defined in: [types/cia-services.ts:362](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L362)

Get security resources

#### Returns

`Promise`\<`any`[]\>

***

### getSLAMetrics()?

> `optional` **getSLAMetrics**: () => `Promise`\<`any`\>

Defined in: [types/cia-services.ts:367](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L367)

Get SLA metrics

#### Returns

`Promise`\<`any`\>

***

### getValueCreationMetrics()?

> `optional` **getValueCreationMetrics**: () => `Promise`\<`any`\>

Defined in: [types/cia-services.ts:377](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L377)

Get value creation metrics

#### Returns

`Promise`\<`any`\>

***

### ~~getValuePoints()?~~

> `optional` **getValuePoints**: (`level`) => `string`[]

Defined in: [types/cia-services.ts:332](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L332)

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

Defined in: [types/cia-services.ts:301](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L301)

Initialize the data provider

#### Returns

`Promise`\<`boolean`\>

***

### integrityOptions

> **integrityOptions**: `Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:304](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L304)

***

### roiEstimates

> **roiEstimates**: [`ROIEstimatesMap`](ROIEstimatesMap.md)

Defined in: [types/cia-services.ts:306](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/types/cia-services.ts#L306)
