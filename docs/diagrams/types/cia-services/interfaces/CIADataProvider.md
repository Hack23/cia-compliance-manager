[**CIA Compliance Manager — UML Diagrams v1.1.119**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/cia-services](../README.md) / CIADataProvider

# Interface: CIADataProvider

Defined in: [types/cia-services.ts:279](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/cia-services.ts#L279)

Data provider for CIA security information

## Properties

### initialize?

> `optional` **initialize?**: () => `Promise`\<`boolean`\>

Defined in: [types/cia-services.ts:283](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/cia-services.ts#L283)

Initialize the data provider

#### Returns

`Promise`\<`boolean`\>

***

### availabilityOptions

> **availabilityOptions**: `Record`\<[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:285](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/cia-services.ts#L285)

***

### integrityOptions

> **integrityOptions**: `Record`\<[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:286](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/cia-services.ts#L286)

***

### confidentialityOptions

> **confidentialityOptions**: `Record`\<[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md), [`CIADetails`](CIADetails.md)\>

Defined in: [types/cia-services.ts:287](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/cia-services.ts#L287)

***

### roiEstimates

> **roiEstimates**: [`ROIEstimatesMap`](ROIEstimatesMap.md)

Defined in: [types/cia-services.ts:288](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/cia-services.ts#L288)

***

### getDefaultSecurityIcon?

> `optional` **getDefaultSecurityIcon?**: (`level`) => `string`

Defined in: [types/cia-services.ts:293](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/cia-services.ts#L293)

Get default security icon for a security level

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDefaultExpertiseLevel?

> `optional` **getDefaultExpertiseLevel?**: (`level`) => `string`

Defined in: [types/cia-services.ts:298](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/cia-services.ts#L298)

Get default expertise level for a security level

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getProtectionLevel?

> `optional` **getProtectionLevel?**: (`level`) => `string`

Defined in: [types/cia-services.ts:303](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/cia-services.ts#L303)

Get protection level for a security level

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getDefaultValuePoints?

> `optional` **getDefaultValuePoints?**: (`level`) => `string`[]

Defined in: [types/cia-services.ts:308](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/cia-services.ts#L308)

Get default value points for a security level

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### getSecurityLevelRecommendations?

> `optional` **getSecurityLevelRecommendations?**: (`level`) => `Promise`\<`string`[]\>

Defined in: [types/cia-services.ts:313](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/cia-services.ts#L313)

Get security level recommendations

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`Promise`\<`string`[]\>

***

### getComplianceFrameworks?

> `optional` **getComplianceFrameworks?**: () => `Promise`\<[`ComplianceFramework`](../../compliance/interfaces/ComplianceFramework.md)[]\>

Defined in: [types/cia-services.ts:318](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/cia-services.ts#L318)

Get compliance frameworks

#### Returns

`Promise`\<[`ComplianceFramework`](../../compliance/interfaces/ComplianceFramework.md)[]\>

***

### getComplianceRequirements?

> `optional` **getComplianceRequirements?**: () => `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [types/cia-services.ts:323](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/cia-services.ts#L323)

Get compliance requirements

#### Returns

`Promise`\<`Record`\<`string`, `unknown`\>\>

***

### getBusinessImpact?

> `optional` **getBusinessImpact?**: () => `Promise`\<[`BusinessImpactDetails`](BusinessImpactDetails.md)\>

Defined in: [types/cia-services.ts:328](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/cia-services.ts#L328)

Get business impact

#### Returns

`Promise`\<[`BusinessImpactDetails`](BusinessImpactDetails.md)\>

***

### getSecurityMetrics?

> `optional` **getSecurityMetrics?**: () => `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [types/cia-services.ts:333](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/cia-services.ts#L333)

Get security metrics

#### Returns

`Promise`\<`Record`\<`string`, `unknown`\>\>

***

### getSecurityResources?

> `optional` **getSecurityResources?**: () => `Promise`\<[`SecurityResource`](../../securityResources/interfaces/SecurityResource.md)[]\>

Defined in: [types/cia-services.ts:338](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/cia-services.ts#L338)

Get security resources

#### Returns

`Promise`\<[`SecurityResource`](../../securityResources/interfaces/SecurityResource.md)[]\>

***

### getSLAMetrics?

> `optional` **getSLAMetrics?**: () => `Promise`\<[`SLAMetrics`](../../businessImpact/interfaces/SLAMetrics.md)\>

Defined in: [types/cia-services.ts:343](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/cia-services.ts#L343)

Get SLA metrics

#### Returns

`Promise`\<[`SLAMetrics`](../../businessImpact/interfaces/SLAMetrics.md)\>

***

### getCostEstimates?

> `optional` **getCostEstimates?**: () => `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [types/cia-services.ts:348](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/cia-services.ts#L348)

Get cost estimates

#### Returns

`Promise`\<`Record`\<`string`, `unknown`\>\>

***

### getValueCreationMetrics?

> `optional` **getValueCreationMetrics?**: () => `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [types/cia-services.ts:353](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/cia-services.ts#L353)

Get value creation metrics

#### Returns

`Promise`\<`Record`\<`string`, `unknown`\>\>

***

### getImplementationDetails?

> `optional` **getImplementationDetails?**: () => `Promise`\<[`TechnicalImplementationDetails`](TechnicalImplementationDetails.md)\>

Defined in: [types/cia-services.ts:358](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/cia-services.ts#L358)

Get implementation details

#### Returns

`Promise`\<[`TechnicalImplementationDetails`](TechnicalImplementationDetails.md)\>

***

### getRemediationSteps?

> `optional` **getRemediationSteps?**: () => `Promise`\<`string`[]\>

Defined in: [types/cia-services.ts:363](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/cia-services.ts#L363)

Get remediation steps

#### Returns

`Promise`\<`string`[]\>
