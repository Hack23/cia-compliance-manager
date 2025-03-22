[**CIA Compliance Manager Diagrams v0.8.5**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [typedoc-entry](../README.md) / ComplianceService

# Class: ComplianceService

Defined in: [services/complianceService.ts:43](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/complianceService.ts#L43)

Service for compliance mapping and status reporting

## Compliance Perspective

This service maps security levels to compliance with various regulatory
frameworks, helping organizations understand their compliance posture
and identify gaps that need to be addressed to meet regulatory
requirements. 📋

## Extends

- [`BaseService`](../../services/classes/BaseService.md)

## Constructors

### new ComplianceService()

> **new ComplianceService**(`dataProvider`): `ComplianceService`

Defined in: [services/complianceService.ts:83](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/complianceService.ts#L83)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../types/interfaces/CIADataProvider.md)

#### Returns

`ComplianceService`

#### Overrides

[`BaseService`](../../services/classes/BaseService.md).[`constructor`](../../services/classes/BaseService.md#constructor)

## Methods

### getComplianceStatus()

> **getComplianceStatus**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `ComplianceStatusDetails`

Defined in: [services/complianceService.ts:95](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/complianceService.ts#L95)

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

### getCompliantFrameworks()

> **getCompliantFrameworks**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`[]

Defined in: [services/complianceService.ts:181](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/complianceService.ts#L181)

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

Defined in: [services/complianceService.ts:212](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/complianceService.ts#L212)

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

Defined in: [services/complianceService.ts:299](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/complianceService.ts#L299)

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

> **getFrameworkStatus**(`framework`, `availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `ComplianceStatus`

Defined in: [services/complianceService.ts:243](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/services/complianceService.ts#L243)

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

`ComplianceStatus`

Compliance status for the framework
