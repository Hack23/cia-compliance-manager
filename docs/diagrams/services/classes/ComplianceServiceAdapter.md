[**CIA Compliance Manager Diagrams v0.8.7**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [services](../README.md) / ComplianceServiceAdapter

# Class: ComplianceServiceAdapter

Defined in: [services/ComplianceServiceAdapter.ts:93](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/services/ComplianceServiceAdapter.ts#L93)

Adapter for compliance service functionality

## Extends

- [`BaseService`](BaseService.md)

## Constructors

### Constructor

> **new ComplianceServiceAdapter**(`dataProvider`): `ComplianceServiceAdapter`

Defined in: [services/ComplianceServiceAdapter.ts:142](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/services/ComplianceServiceAdapter.ts#L142)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../types/interfaces/CIADataProvider.md)

#### Returns

`ComplianceServiceAdapter`

#### Overrides

[`BaseService`](BaseService.md).[`constructor`](BaseService.md#constructor)

## Properties

### frameworkRequirements

> **frameworkRequirements**: `Record`\<`string`, \{ `availability`: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md); `confidentiality`: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md); `integrity`: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md); \}\>

Defined in: [services/ComplianceServiceAdapter.ts:95](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/services/ComplianceServiceAdapter.ts#L95)

## Methods

### getComplianceGapAnalysis()

> **getComplianceGapAnalysis**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `framework`?): [`ComplianceGapAnalysis`](../../types/compliance/interfaces/ComplianceGapAnalysis.md)

Defined in: [services/ComplianceServiceAdapter.ts:400](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/services/ComplianceServiceAdapter.ts#L400)

Get compliance gap analysis between current and required security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### framework?

`string`

#### Returns

[`ComplianceGapAnalysis`](../../types/compliance/interfaces/ComplianceGapAnalysis.md)

***

### getComplianceStatus()

> **getComplianceStatus**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `any`

Defined in: [services/ComplianceServiceAdapter.ts:151](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/services/ComplianceServiceAdapter.ts#L151)

Get compliance status based on security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`any`

***

### getComplianceStatusDetails()

> **getComplianceStatusDetails**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`ComplianceStatusDetails`](../../types/compliance/interfaces/ComplianceStatusDetails.md)

Defined in: [services/ComplianceServiceAdapter.ts:582](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/services/ComplianceServiceAdapter.ts#L582)

Get compliance status details

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

[`ComplianceStatusDetails`](../../types/compliance/interfaces/ComplianceStatusDetails.md)

***

### getComplianceStatusText()

> **getComplianceStatusText**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/ComplianceServiceAdapter.ts:178](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/services/ComplianceServiceAdapter.ts#L178)

Get compliance status text with standardized values for tests

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md) = `availabilityLevel`

##### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md) = `availabilityLevel`

#### Returns

`string`

***

### getCompliantFrameworks()

> **getCompliantFrameworks**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`[]

Defined in: [services/ComplianceServiceAdapter.ts:339](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/services/ComplianceServiceAdapter.ts#L339)

Get compliant frameworks

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md) = `availabilityLevel`

##### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md) = `availabilityLevel`

#### Returns

`string`[]

***

### getFrameworkComplianceStatus()

> **getFrameworkComplianceStatus**(`framework`, `industry`?, `region`?): `FrameworkComplianceStatus`

Defined in: [services/ComplianceServiceAdapter.ts:556](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/services/ComplianceServiceAdapter.ts#L556)

Get framework compliance status

#### Parameters

##### framework

`string`

##### industry?

`string`

##### region?

`string`

#### Returns

`FrameworkComplianceStatus`

***

### getFrameworkDescription()

> **getFrameworkDescription**(`framework`): `string`

Defined in: [services/ComplianceServiceAdapter.ts:307](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/services/ComplianceServiceAdapter.ts#L307)

Get framework description

#### Parameters

##### framework

`string`

#### Returns

`string`

***

### getFrameworkRequiredLevel()

> **getFrameworkRequiredLevel**(`framework`, `component`): [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [services/ComplianceServiceAdapter.ts:364](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/services/ComplianceServiceAdapter.ts#L364)

Get framework required level

#### Parameters

##### framework

`string`

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

#### Returns

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

***

### getFrameworkRequirements()

> **getFrameworkRequirements**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`[]

Defined in: [services/ComplianceServiceAdapter.ts:616](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/services/ComplianceServiceAdapter.ts#L616)

Get compliance framework requirements

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### getFrameworkStatus()

> **getFrameworkStatus**(`framework`, `availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`ComplianceStatusDetails`](../../types/compliance/interfaces/ComplianceStatusDetails.md)

Defined in: [services/ComplianceServiceAdapter.ts:236](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/services/ComplianceServiceAdapter.ts#L236)

Get framework status (compliant, partially-compliant, non-compliant)

#### Parameters

##### framework

`string`

##### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

[`ComplianceStatusDetails`](../../types/compliance/interfaces/ComplianceStatusDetails.md)

***

### isFrameworkApplicable()

> **isFrameworkApplicable**(`framework`, `industry`?, `region`?): `boolean`

Defined in: [services/ComplianceServiceAdapter.ts:388](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/services/ComplianceServiceAdapter.ts#L388)

Check if a framework is applicable to an industry/region

#### Parameters

##### framework

`string`

##### industry?

`string`

##### region?

`string`

#### Returns

`boolean`
