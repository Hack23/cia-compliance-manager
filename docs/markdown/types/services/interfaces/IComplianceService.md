[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/services](../README.md) / IComplianceService

# Interface: IComplianceService

Defined in: [types/services.ts:184](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L184)

Compliance Service interface

Provides compliance status checking and framework mapping

## Extends

- [`IBaseService`](IBaseService.md)

## Properties

### name

> `readonly` **name**: `string`

Defined in: [types/services.ts:82](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L82)

Service name for identification and logging

#### Inherited from

[`IBaseService`](IBaseService.md).[`name`](IBaseService.md#name)

## Methods

### validate()

> **validate**(`input`): `boolean`

Defined in: [types/services.ts:90](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L90)

Validate input parameters (returns simple boolean)

#### Parameters

##### input

`unknown`

Input to validate

#### Returns

`boolean`

True if valid, false otherwise

#### Inherited from

[`IBaseService`](IBaseService.md).[`validate`](IBaseService.md#validate)

***

### handleError()

> **handleError**(`error`): [`ServiceError`](../../../services/errors/classes/ServiceError.md)

Defined in: [types/services.ts:98](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L98)

Handle errors consistently across services

#### Parameters

##### error

`Error`

Error to handle

#### Returns

[`ServiceError`](../../../services/errors/classes/ServiceError.md)

Formatted ServiceError

#### Inherited from

[`IBaseService`](IBaseService.md).[`handleError`](IBaseService.md#handleerror)

***

### getComplianceStatus()

> **getComplianceStatus**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`ComplianceStatusDetails`](../../compliance/interfaces/ComplianceStatusDetails.md)

Defined in: [types/services.ts:193](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L193)

Get compliance status for given security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Confidentiality security level

#### Returns

[`ComplianceStatusDetails`](../../compliance/interfaces/ComplianceStatusDetails.md)

Compliance status details

***

### getCompliantFrameworks()

> **getCompliantFrameworks**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`[]

Defined in: [types/services.ts:207](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L207)

Get compliant frameworks for given security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Confidentiality security level

#### Returns

`string`[]

Array of compliant framework names

***

### getFrameworkDescription()

> **getFrameworkDescription**(`framework`): `string`

Defined in: [types/services.ts:219](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L219)

Get description of a compliance framework

#### Parameters

##### framework

`string`

Framework name

#### Returns

`string`

Framework description

***

### getComplianceGapAnalysis()

> **getComplianceGapAnalysis**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `framework?`): [`ComplianceGapAnalysis`](../../compliance/interfaces/ComplianceGapAnalysis.md)

Defined in: [types/services.ts:230](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/services.ts#L230)

Get compliance gap analysis

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Confidentiality security level

##### framework?

`string`

Optional specific framework to analyze

#### Returns

[`ComplianceGapAnalysis`](../../compliance/interfaces/ComplianceGapAnalysis.md)

Gap analysis results
