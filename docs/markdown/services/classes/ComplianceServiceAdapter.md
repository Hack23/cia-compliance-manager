[**CIA Compliance Manager Documentation v0.8.31**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [services](../README.md) / ComplianceServiceAdapter

# Class: ComplianceServiceAdapter

Defined in: [services/ComplianceServiceAdapter.ts:39](https://github.com/Hack23/cia-compliance-manager/blob/85c025371255f412469ec0119911b7cb143a6212/src/services/ComplianceServiceAdapter.ts#L39)

Adapter for compliance service functionality

## Extends

- [`BaseService`](../BaseService/classes/BaseService.md)

## Constructors

### Constructor

> **new ComplianceServiceAdapter**(`dataProvider`): `ComplianceServiceAdapter`

Defined in: [services/ComplianceServiceAdapter.ts:113](https://github.com/Hack23/cia-compliance-manager/blob/85c025371255f412469ec0119911b7cb143a6212/src/services/ComplianceServiceAdapter.ts#L113)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../types/interfaces/CIADataProvider.md)

#### Returns

`ComplianceServiceAdapter`

#### Overrides

[`BaseService`](../BaseService/classes/BaseService.md).[`constructor`](../BaseService/classes/BaseService.md#constructor)

## Properties

### frameworkRequirements

> **frameworkRequirements**: `Record`\<`string`, \{ `availability`: [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md); `confidentiality`: [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md); `integrity`: [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md); \}\>

Defined in: [services/ComplianceServiceAdapter.ts:43](https://github.com/Hack23/cia-compliance-manager/blob/85c025371255f412469ec0119911b7cb143a6212/src/services/ComplianceServiceAdapter.ts#L43)

## Methods

### getComplianceGapAnalysis()

> **getComplianceGapAnalysis**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `framework?`): [`ComplianceGapAnalysis`](../../types/compliance/interfaces/ComplianceGapAnalysis.md)

Defined in: [services/ComplianceServiceAdapter.ts:305](https://github.com/Hack23/cia-compliance-manager/blob/85c025371255f412469ec0119911b7cb143a6212/src/services/ComplianceServiceAdapter.ts#L305)

Get compliance gap analysis between current and required security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

##### framework?

`string`

Optional framework to analyze specifically

#### Returns

[`ComplianceGapAnalysis`](../../types/compliance/interfaces/ComplianceGapAnalysis.md)

Compliance gap analysis

***

### getComplianceStatus()

> **getComplianceStatus**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`ComplianceStatusDetails`](../complianceService/interfaces/ComplianceStatusDetails.md)

Defined in: [services/ComplianceServiceAdapter.ts:126](https://github.com/Hack23/cia-compliance-manager/blob/85c025371255f412469ec0119911b7cb143a6212/src/services/ComplianceServiceAdapter.ts#L126)

Get compliance status based on security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

#### Returns

[`ComplianceStatusDetails`](../complianceService/interfaces/ComplianceStatusDetails.md)

Compliance status details

***

### getComplianceStatusText()

> **getComplianceStatusText**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/ComplianceServiceAdapter.ts:146](https://github.com/Hack23/cia-compliance-manager/blob/85c025371255f412469ec0119911b7cb143a6212/src/services/ComplianceServiceAdapter.ts#L146)

Get compliance status text based on security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Integrity security level (optional, defaults to availabilityLevel)

##### confidentialityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Confidentiality security level (optional, defaults to availabilityLevel)

#### Returns

`string`

Compliance status text

***

### getCompliantFrameworks()

> **getCompliantFrameworks**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`[]

Defined in: [services/ComplianceServiceAdapter.ts:176](https://github.com/Hack23/cia-compliance-manager/blob/85c025371255f412469ec0119911b7cb143a6212/src/services/ComplianceServiceAdapter.ts#L176)

Get compliant frameworks

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Integrity security level (optional, defaults to availabilityLevel)

##### confidentialityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Confidentiality security level (optional, defaults to availabilityLevel)

#### Returns

`string`[]

Array of compliant framework names

***

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): `undefined` \| [`CIADetails`](../../types/interfaces/CIADetails.md)

Defined in: [services/BaseService.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/85c025371255f412469ec0119911b7cb143a6212/src/services/BaseService.ts#L53)

Get component details for a specific component and security level

#### Parameters

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`undefined` \| [`CIADetails`](../../types/interfaces/CIADetails.md)

#### Inherited from

[`BaseService`](../BaseService/classes/BaseService.md).[`getComponentDetails`](../BaseService/classes/BaseService.md#getcomponentdetails)

***

### getFrameworkDescription()

> **getFrameworkDescription**(`framework`): `string`

Defined in: [services/ComplianceServiceAdapter.ts:194](https://github.com/Hack23/cia-compliance-manager/blob/85c025371255f412469ec0119911b7cb143a6212/src/services/ComplianceServiceAdapter.ts#L194)

Get description of a compliance framework

#### Parameters

##### framework

`string`

Framework name

#### Returns

`string`

Framework description

***

### getFrameworkRequiredLevel()

> **getFrameworkRequiredLevel**(`framework`, `component`): [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [services/ComplianceServiceAdapter.ts:286](https://github.com/Hack23/cia-compliance-manager/blob/85c025371255f412469ec0119911b7cb143a6212/src/services/ComplianceServiceAdapter.ts#L286)

Get required security level for a specific framework and component

#### Parameters

##### framework

`string`

Framework name

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

CIA component

#### Returns

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Required security level

***

### getFrameworkStatus()

> **getFrameworkStatus**(`framework`, `availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `object`

Defined in: [services/ComplianceServiceAdapter.ts:229](https://github.com/Hack23/cia-compliance-manager/blob/85c025371255f412469ec0119911b7cb143a6212/src/services/ComplianceServiceAdapter.ts#L229)

Get framework status (compliant, partially-compliant, non-compliant)

#### Parameters

##### framework

`string`

Framework name

##### availabilityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

#### Returns

`object`

Compliance status for the framework

##### status

> **status**: `string`

***

### getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [services/BaseService.ts:114](https://github.com/Hack23/cia-compliance-manager/blob/85c025371255f412469ec0119911b7cb143a6212/src/services/BaseService.ts#L114)

Get risk level from security level

#### Parameters

##### level

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Inherited from

[`BaseService`](../BaseService/classes/BaseService.md).[`getRiskLevelFromSecurityLevel`](../BaseService/classes/BaseService.md#getrisklevelfromsecuritylevel)

***

### getSecurityLevelDescription()

> **getSecurityLevelDescription**(`level`): `string`

Defined in: [services/BaseService.ts:93](https://github.com/Hack23/cia-compliance-manager/blob/85c025371255f412469ec0119911b7cb143a6212/src/services/BaseService.ts#L93)

Get security level description

#### Parameters

##### level

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Inherited from

[`BaseService`](../BaseService/classes/BaseService.md).[`getSecurityLevelDescription`](../BaseService/classes/BaseService.md#getsecurityleveldescription)

***

### isFrameworkApplicable()

> **isFrameworkApplicable**(`framework`, `industry?`, `region?`): `boolean`

Defined in: [services/ComplianceServiceAdapter.ts:269](https://github.com/Hack23/cia-compliance-manager/blob/85c025371255f412469ec0119911b7cb143a6212/src/services/ComplianceServiceAdapter.ts#L269)

Check if a framework is applicable to an industry/region

#### Parameters

##### framework

`string`

Framework name

##### industry?

`string`

Industry (optional)

##### region?

`string`

Region (optional)

#### Returns

`boolean`

True if the framework is applicable
