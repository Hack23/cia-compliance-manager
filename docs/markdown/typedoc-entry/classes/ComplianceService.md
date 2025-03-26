[**CIA Compliance Manager Documentation v0.8.5**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [typedoc-entry](../README.md) / ComplianceService

# Class: ComplianceService

Defined in: [services/complianceService.ts:48](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/complianceService.ts#L48)

Service for compliance mapping and status reporting

## Compliance Perspective

This service maps security levels to compliance with various regulatory
frameworks, helping organizations understand their compliance posture
and identify gaps that need to be addressed to meet regulatory
requirements. 📋

## Extends

- [`BaseService`](../../services/classes/BaseService.md)

## Constructors

### Constructor

> **new ComplianceService**(`dataProvider`): `ComplianceService`

Defined in: [services/complianceService.ts:114](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/complianceService.ts#L114)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../types/interfaces/CIADataProvider.md)

#### Returns

`ComplianceService`

#### Overrides

[`BaseService`](../../services/classes/BaseService.md).[`constructor`](../../services/classes/BaseService.md#constructor)

## Methods

### getComplianceGapAnalysis()

> **getComplianceGapAnalysis**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `framework`?): [`ComplianceGapAnalysis`](../../types/compliance/interfaces/ComplianceGapAnalysis.md)

Defined in: [services/complianceService.ts:591](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/complianceService.ts#L591)

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

> **getComplianceStatus**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `ComplianceStatusDetails`

Defined in: [services/complianceService.ts:126](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/complianceService.ts#L126)

Get compliance status based on security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Confidentiality security level

#### Returns

`ComplianceStatusDetails`

Compliance status details

***

### getComplianceStatusText()

> **getComplianceStatusText**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/complianceService.ts:207](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/complianceService.ts#L207)

Get compliance status text

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

Defined in: [services/complianceService.ts:278](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/complianceService.ts#L278)

Get compliant frameworks for a specific security level

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md) = `availabilityLevel`

Integrity security level (optional, defaults to availabilityLevel)

##### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md) = `availabilityLevel`

Confidentiality security level (optional, defaults to availabilityLevel)

#### Returns

`string`[]

Array of compliant framework names

***

### getFrameworkDescription()

> **getFrameworkDescription**(`framework`): `string`

Defined in: [services/complianceService.ts:307](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/complianceService.ts#L307)

Get description of a specific compliance framework

#### Parameters

##### framework

`string`

Framework name

#### Returns

`string`

Framework description

***

### getFrameworkRequiredLevel()

> **getFrameworkRequiredLevel**(`framework`, `component`): [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [services/complianceService.ts:410](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/complianceService.ts#L410)

Get required security level for a specific framework and component

#### Parameters

##### framework

`string`

Framework name

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

CIA component

#### Returns

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Required security level

***

### getFrameworkStatus()

> **getFrameworkStatus**(`framework`, `availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `ComplianceStatusType`

Defined in: [services/complianceService.ts:354](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/services/complianceService.ts#L354)

Get compliance status for a specific framework

#### Parameters

##### framework

`string`

Framework name

##### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Confidentiality security level

#### Returns

`ComplianceStatusType`

Compliance status for the framework
