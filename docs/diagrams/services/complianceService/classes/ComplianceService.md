[**CIA Compliance Manager Diagrams v0.8.34**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/complianceService](../README.md) / ComplianceService

# Class: ComplianceService

Defined in: [services/complianceService.ts:48](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/complianceService.ts#L48)

Service for compliance mapping and status reporting

## Compliance Perspective

This service maps security levels to compliance with various regulatory
frameworks, helping organizations understand their compliance posture
and identify gaps that need to be addressed to meet regulatory
requirements. 📋

## Extends

- [`BaseService`](../../BaseService/classes/BaseService.md)

## Constructors

### Constructor

> **new ComplianceService**(`dataProvider`): `ComplianceService`

Defined in: [services/complianceService.ts:114](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/complianceService.ts#L114)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/interfaces/CIADataProvider.md)

#### Returns

`ComplianceService`

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`constructor`](../../BaseService/classes/BaseService.md#constructor)

## Methods

### getComplianceGapAnalysis()

> **getComplianceGapAnalysis**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `framework?`): [`ComplianceGapAnalysis`](../../../types/compliance/interfaces/ComplianceGapAnalysis.md)

Defined in: [services/complianceService.ts:584](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/complianceService.ts#L584)

Get compliance gap analysis between current and required security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### framework?

`string`

#### Returns

[`ComplianceGapAnalysis`](../../../types/compliance/interfaces/ComplianceGapAnalysis.md)

***

### getComplianceStatus()

> **getComplianceStatus**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`ComplianceStatusDetails`](../interfaces/ComplianceStatusDetails.md)

Defined in: [services/complianceService.ts:126](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/complianceService.ts#L126)

Get compliance status based on security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

#### Returns

[`ComplianceStatusDetails`](../interfaces/ComplianceStatusDetails.md)

Compliance status details

***

### getComplianceStatusText()

> **getComplianceStatusText**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/complianceService.ts:207](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/complianceService.ts#L207)

Get compliance status text

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

#### Returns

`string`

***

### getCompliantFrameworks()

> **getCompliantFrameworks**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`[]

Defined in: [services/complianceService.ts:271](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/complianceService.ts#L271)

Get compliant frameworks for a specific security level

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Integrity security level (optional, defaults to availabilityLevel)

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Confidentiality security level (optional, defaults to availabilityLevel)

#### Returns

`string`[]

Array of compliant framework names

***

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): [`CIADetails`](../../../types/interfaces/CIADetails.md) \| `undefined`

Defined in: [services/BaseService.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/BaseService.ts#L53)

Get component details for a specific component and security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`CIADetails`](../../../types/interfaces/CIADetails.md) \| `undefined`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getComponentDetails`](../../BaseService/classes/BaseService.md#getcomponentdetails)

***

### getFrameworkDescription()

> **getFrameworkDescription**(`framework`): `string`

Defined in: [services/complianceService.ts:300](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/complianceService.ts#L300)

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

> **getFrameworkRequiredLevel**(`framework`, `component`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [services/complianceService.ts:403](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/complianceService.ts#L403)

Get required security level for a specific framework and component

#### Parameters

##### framework

`string`

Framework name

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

CIA component

#### Returns

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Required security level

***

### getFrameworkStatus()

> **getFrameworkStatus**(`framework`, `availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`ComplianceStatusType`](../type-aliases/ComplianceStatusType.md)

Defined in: [services/complianceService.ts:347](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/complianceService.ts#L347)

Get compliance status for a specific framework

#### Parameters

##### framework

`string`

Framework name

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

#### Returns

[`ComplianceStatusType`](../type-aliases/ComplianceStatusType.md)

Compliance status for the framework

***

### getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [services/BaseService.ts:114](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/BaseService.ts#L114)

Get risk level from security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getRiskLevelFromSecurityLevel`](../../BaseService/classes/BaseService.md#getrisklevelfromsecuritylevel)

***

### getSecurityLevelDescription()

> **getSecurityLevelDescription**(`level`): `string`

Defined in: [services/BaseService.ts:93](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/BaseService.ts#L93)

Get security level description

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getSecurityLevelDescription`](../../BaseService/classes/BaseService.md#getsecurityleveldescription)
