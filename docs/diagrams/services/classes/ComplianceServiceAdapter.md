[**CIA Compliance Manager Diagrams v0.8.5**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [services](../README.md) / ComplianceServiceAdapter

# Class: ComplianceServiceAdapter

Defined in: [services/ComplianceServiceAdapter.ts:71](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/ComplianceServiceAdapter.ts#L71)

Adapter for compliance service functionality

## Extends

- [`BaseService`](BaseService.md)

## Constructors

### Constructor

> **new ComplianceServiceAdapter**(`dataProvider`): `ComplianceServiceAdapter`

Defined in: [services/ComplianceServiceAdapter.ts:120](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/ComplianceServiceAdapter.ts#L120)

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

Defined in: [services/ComplianceServiceAdapter.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/ComplianceServiceAdapter.ts#L73)

## Methods

### getComplianceGapAnalysis()

> **getComplianceGapAnalysis**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `framework`?): [`ComplianceGapAnalysis`](../../types/compliance/interfaces/ComplianceGapAnalysis.md)

Defined in: [services/ComplianceServiceAdapter.ts:378](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/ComplianceServiceAdapter.ts#L378)

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

Defined in: [services/ComplianceServiceAdapter.ts:129](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/ComplianceServiceAdapter.ts#L129)

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

Defined in: [services/ComplianceServiceAdapter.ts:560](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/ComplianceServiceAdapter.ts#L560)

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

Defined in: [services/ComplianceServiceAdapter.ts:156](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/ComplianceServiceAdapter.ts#L156)

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

Defined in: [services/ComplianceServiceAdapter.ts:317](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/ComplianceServiceAdapter.ts#L317)

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

Defined in: [services/ComplianceServiceAdapter.ts:534](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/ComplianceServiceAdapter.ts#L534)

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

Defined in: [services/ComplianceServiceAdapter.ts:285](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/ComplianceServiceAdapter.ts#L285)

Get framework description

#### Parameters

##### framework

`string`

#### Returns

`string`

***

### getFrameworkRequiredLevel()

> **getFrameworkRequiredLevel**(`framework`, `component`): [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [services/ComplianceServiceAdapter.ts:342](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/ComplianceServiceAdapter.ts#L342)

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

Defined in: [services/ComplianceServiceAdapter.ts:594](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/ComplianceServiceAdapter.ts#L594)

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

Defined in: [services/ComplianceServiceAdapter.ts:214](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/ComplianceServiceAdapter.ts#L214)

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

Defined in: [services/ComplianceServiceAdapter.ts:366](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/ComplianceServiceAdapter.ts#L366)

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
