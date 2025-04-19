[**CIA Compliance Manager Diagrams v0.8.8**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / CIADataProvider

# Interface: CIADataProvider

Defined in: [types/cia-services.ts:301](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L301)

Data provider for CIA security information

## Properties

### availabilityOptions

> **availabilityOptions**: `Record`\<[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:307](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L307)

***

### confidentialityOptions

> **confidentialityOptions**: `Record`\<[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:309](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L309)

***

### getBusinessImpact()?

> `optional` **getBusinessImpact**: () => `Promise`\<`any`\>

Defined in: [types/cia-services.ts:356](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L356)

Get business impact

#### Returns

`Promise`\<`any`\>

***

### getComplianceFrameworks()?

> `optional` **getComplianceFrameworks**: () => `Promise`\<`any`[]\>

Defined in: [types/cia-services.ts:346](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L346)

Get compliance frameworks

#### Returns

`Promise`\<`any`[]\>

***

### getComplianceRequirements()?

> `optional` **getComplianceRequirements**: () => `Promise`\<`any`\>

Defined in: [types/cia-services.ts:351](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L351)

Get compliance requirements

#### Returns

`Promise`\<`any`\>

***

### getCostEstimates()?

> `optional` **getCostEstimates**: () => `Promise`\<`any`\>

Defined in: [types/cia-services.ts:376](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L376)

Get cost estimates

#### Returns

`Promise`\<`any`\>

***

### getDefaultExpertiseLevel()?

> `optional` **getDefaultExpertiseLevel**: (`level`) => `string`

Defined in: [types/cia-services.ts:320](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L320)

Get default expertise level for a security level

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDefaultSecurityIcon()?

> `optional` **getDefaultSecurityIcon**: (`level`) => `string`

Defined in: [types/cia-services.ts:315](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L315)

Get default security icon for a security level

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDefaultValuePoints()?

> `optional` **getDefaultValuePoints**: (`level`) => `string`[]

Defined in: [types/cia-services.ts:330](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L330)

Get default value points for a security level

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### getImplementationDetails()?

> `optional` **getImplementationDetails**: () => `Promise`\<`any`\>

Defined in: [types/cia-services.ts:386](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L386)

Get implementation details

#### Returns

`Promise`\<`any`\>

***

### getProtectionLevel()?

> `optional` **getProtectionLevel**: (`level`) => `string`

Defined in: [types/cia-services.ts:325](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L325)

Get protection level for a security level

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getRemediationSteps()?

> `optional` **getRemediationSteps**: () => `Promise`\<`any`[]\>

Defined in: [types/cia-services.ts:391](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L391)

Get remediation steps

#### Returns

`Promise`\<`any`[]\>

***

### getSecurityLevelRecommendations()?

> `optional` **getSecurityLevelRecommendations**: (`level`) => `Promise`\<`string`[]\>

Defined in: [types/cia-services.ts:341](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L341)

Get security level recommendations

#### Parameters

##### level

[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md)

#### Returns

`Promise`\<`string`[]\>

***

### getSecurityMetrics()?

> `optional` **getSecurityMetrics**: () => `Promise`\<`any`\>

Defined in: [types/cia-services.ts:361](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L361)

Get security metrics

#### Returns

`Promise`\<`any`\>

***

### getSecurityResources()?

> `optional` **getSecurityResources**: () => `Promise`\<`any`[]\>

Defined in: [types/cia-services.ts:366](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L366)

Get security resources

#### Returns

`Promise`\<`any`[]\>

***

### getSLAMetrics()?

> `optional` **getSLAMetrics**: () => `Promise`\<`any`\>

Defined in: [types/cia-services.ts:371](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L371)

Get SLA metrics

#### Returns

`Promise`\<`any`\>

***

### getValueCreationMetrics()?

> `optional` **getValueCreationMetrics**: () => `Promise`\<`any`\>

Defined in: [types/cia-services.ts:381](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L381)

Get value creation metrics

#### Returns

`Promise`\<`any`\>

***

### ~~getValuePoints()?~~

> `optional` **getValuePoints**: (`level`) => `string`[]

Defined in: [types/cia-services.ts:336](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L336)

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

Defined in: [types/cia-services.ts:305](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L305)

Initialize the data provider

#### Returns

`Promise`\<`boolean`\>

***

### integrityOptions

> **integrityOptions**: `Record`\<[`SecurityLevel`](../cia/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:308](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L308)

***

### roiEstimates

> **roiEstimates**: [`ROIEstimatesMap`](ROIEstimatesMap.md)

Defined in: [types/cia-services.ts:310](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/cia-services.ts#L310)
