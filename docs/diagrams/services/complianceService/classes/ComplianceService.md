[**CIA Compliance Manager Diagrams v1.1.18**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/complianceService](../README.md) / ComplianceService

# Class: ComplianceService

Defined in: [services/complianceService.ts:36](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/complianceService.ts#L36)

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

Defined in: [services/complianceService.ts:102](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/complianceService.ts#L102)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/interfaces/CIADataProvider.md)

#### Returns

`ComplianceService`

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`constructor`](../../BaseService/classes/BaseService.md#constructor)

## Properties

### name

> `readonly` **name**: `string` = `'BaseService'`

Defined in: [services/BaseService.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/BaseService.ts#L44)

Service name for identification

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`name`](../../BaseService/classes/BaseService.md#name)

## Methods

### getComplianceGapAnalysis()

> **getComplianceGapAnalysis**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `framework?`): [`ComplianceGapAnalysis`](../../../types/compliance/interfaces/ComplianceGapAnalysis.md)

Defined in: [services/complianceService.ts:634](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/complianceService.ts#L634)

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

> **getComplianceStatus**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`ComplianceStatusDetails`](../../../types/compliance/interfaces/ComplianceStatusDetails.md)

Defined in: [services/complianceService.ts:135](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/complianceService.ts#L135)

Get compliance status based on security levels

Evaluates current security levels against multiple compliance frameworks
(NIST 800-53, ISO 27001, GDPR, HIPAA, SOC2, PCI DSS, etc.) and provides
detailed compliance status, gaps, and remediation guidance.

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

[`ComplianceStatusDetails`](../../../types/compliance/interfaces/ComplianceStatusDetails.md)

Compliance status details including compliant/non-compliant frameworks and remediation steps

#### Example

```typescript
const service = new ComplianceService(dataProvider);

// Check compliance for High security levels
const status = service.getComplianceStatus('High', 'High', 'High');
console.log('Overall Status:', status.status);
console.log('Compliance Score:', status.complianceScore, '%');
console.log('Compliant Frameworks:', status.compliantFrameworks);
console.log('Non-Compliant Frameworks:', status.nonCompliantFrameworks);

// Get remediation steps
status.remediationSteps.forEach(step => {
  console.log('- ', step);
});
```

***

### getComplianceStatusText()

> **getComplianceStatusText**(`availabilityLevel`, `integrityLevel?`, `confidentialityLevel?`): `string`

Defined in: [services/complianceService.ts:216](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/complianceService.ts#L216)

Get compliance status text

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### integrityLevel?

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

##### confidentialityLevel?

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

#### Returns

`string`

***

### getCompliantFrameworks()

> **getCompliantFrameworks**(`availabilityLevel`, `integrityLevel?`, `confidentialityLevel?`): `string`[]

Defined in: [services/complianceService.ts:297](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/complianceService.ts#L297)

Get compliant frameworks for a specific security level

Identifies which compliance frameworks are fully met by the current
security configuration. Useful for compliance reporting and gap analysis.

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel?

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Integrity security level (optional, defaults to availabilityLevel)

##### confidentialityLevel?

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Confidentiality security level (optional, defaults to availabilityLevel)

#### Returns

`string`[]

Array of compliant framework names

#### Example

```typescript
const service = new ComplianceService(dataProvider);

// Check which frameworks High security meets
const frameworks = service.getCompliantFrameworks('High', 'High', 'High');
console.log('Compliant with:', frameworks.join(', '));
// Output: "Compliant with: NIST 800-53, ISO 27001, NIST CSF, GDPR, HIPAA, SOC2, PCI DSS..."

// Check moderate security levels
const moderateFrameworks = service.getCompliantFrameworks('Moderate', 'Moderate', 'Moderate');
console.log('Moderate meets:', moderateFrameworks.length, 'frameworks');
```

***

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): [`CIADetails`](../../../types/interfaces/CIADetails.md) \| `undefined`

Defined in: [services/BaseService.ts:193](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/BaseService.ts#L193)

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

Defined in: [services/complianceService.ts:326](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/complianceService.ts#L326)

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

Defined in: [services/complianceService.ts:453](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/complianceService.ts#L453)

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

Defined in: [services/complianceService.ts:397](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/complianceService.ts#L397)

Get compliance status for a specific framework

Evaluates whether current security levels meet a specific compliance
framework's requirements. Returns detailed status showing full compliance,
partial compliance, or non-compliance.

#### Parameters

##### framework

`string`

Framework name (e.g., "NIST 800-53", "ISO 27001", "GDPR")

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

Compliance status for the framework ("compliant", "partially-compliant", or "non-compliant")

#### Example

```typescript
const service = new ComplianceService(dataProvider);

// Check GDPR compliance
const gdprStatus = service.getFrameworkStatus('GDPR', 'High', 'High', 'High');
console.log('GDPR Status:', gdprStatus); // "compliant"

// Check HIPAA with moderate levels
const hipaaStatus = service.getFrameworkStatus('HIPAA', 'Moderate', 'Moderate', 'Moderate');
console.log('HIPAA Status:', hipaaStatus); // "partially-compliant" or "non-compliant"

// Evaluate all frameworks
const frameworks = ['NIST 800-53', 'ISO 27001', 'GDPR', 'HIPAA'];
frameworks.forEach(framework => {
  const status = service.getFrameworkStatus(framework, 'High', 'High', 'Moderate');
  console.log(`${framework}: ${status}`);
});
```

***

### getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [services/BaseService.ts:254](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/BaseService.ts#L254)

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

Defined in: [services/BaseService.ts:233](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/BaseService.ts#L233)

Get security level description

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getSecurityLevelDescription`](../../BaseService/classes/BaseService.md#getsecurityleveldescription)

***

### handleError()

> **handleError**(`error`): [`ServiceError`](../../classes/ServiceError.md)

Defined in: [services/BaseService.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/BaseService.ts#L104)

Handle errors consistently across services

#### Parameters

##### error

`Error`

Error to handle

#### Returns

[`ServiceError`](../../classes/ServiceError.md)

ServiceError

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`handleError`](../../BaseService/classes/BaseService.md#handleerror)

***

### validate()

> **validate**(`input`): `boolean`

Defined in: [services/BaseService.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/BaseService.ts#L73)

Validate input parameters (to be overridden by subclasses)

#### Parameters

##### input

`unknown`

Input to validate

#### Returns

`boolean`

True if valid, false otherwise

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`validate`](../../BaseService/classes/BaseService.md#validate)
