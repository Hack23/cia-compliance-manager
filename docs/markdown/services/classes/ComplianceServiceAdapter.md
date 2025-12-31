[**CIA Compliance Manager Documentation v1.1.4**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [services](../README.md) / ComplianceServiceAdapter

# Class: ComplianceServiceAdapter

Defined in: [services/ComplianceServiceAdapter.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/ComplianceServiceAdapter.ts#L45)

Adapter for compliance service functionality

## Business Perspective
Provides a simplified interface to compliance checking and framework mapping,
adapting the ComplianceService for easier consumption by components and services.
Enables organizations to understand their compliance posture and identify gaps. 📋

## Implements

## Extends

- [`BaseService`](../BaseService/classes/BaseService.md)

## Implements

- `IComplianceService`

## Constructors

### Constructor

> **new ComplianceServiceAdapter**(`dataProvider`): `ComplianceServiceAdapter`

Defined in: [services/ComplianceServiceAdapter.ts:136](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/ComplianceServiceAdapter.ts#L136)

Create a new ComplianceServiceAdapter instance

#### Parameters

##### dataProvider

[`CIADataProvider`](../../types/interfaces/CIADataProvider.md)

Data provider for CIA options and compliance data

#### Returns

`ComplianceServiceAdapter`

#### Throws

If dataProvider is not provided

#### Overrides

[`BaseService`](../BaseService/classes/BaseService.md).[`constructor`](../BaseService/classes/BaseService.md#constructor)

## Properties

### frameworkRequirements

> **frameworkRequirements**: `Record`\<`string`, \{ `availability`: [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md); `confidentiality`: [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md); `integrity`: [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md); \}\>

Defined in: [services/ComplianceServiceAdapter.ts:60](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/ComplianceServiceAdapter.ts#L60)

Framework requirements mapping
Maps compliance frameworks to their minimum security requirements

***

### name

> `readonly` **name**: `string` = `'ComplianceServiceAdapter'`

Defined in: [services/ComplianceServiceAdapter.ts:49](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/ComplianceServiceAdapter.ts#L49)

Service name for identification

#### Implementation of

`IComplianceService.name`

#### Overrides

[`BaseService`](../BaseService/classes/BaseService.md).[`name`](../BaseService/classes/BaseService.md#name)

## Methods

### getComplianceGapAnalysis()

> **getComplianceGapAnalysis**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `framework?`): [`ComplianceGapAnalysis`](../../types/compliance/interfaces/ComplianceGapAnalysis.md)

Defined in: [services/ComplianceServiceAdapter.ts:433](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/ComplianceServiceAdapter.ts#L433)

Get compliance gap analysis between current and required security levels

Performs a comprehensive gap analysis, identifying where the current security
posture falls short of compliance framework requirements and providing
actionable remediation steps.

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Current availability security level

##### integrityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Current integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Current confidentiality security level

##### framework?

`string`

Optional specific framework to analyze (analyzes all if not provided)

#### Returns

[`ComplianceGapAnalysis`](../../types/compliance/interfaces/ComplianceGapAnalysis.md)

Detailed gap analysis including gaps, recommendations, and compliance score

#### Throws

If any security level is invalid

#### Example

```typescript
const gapAnalysis = adapter.getComplianceGapAnalysis('Moderate', 'Moderate', 'High', 'HIPAA');
console.log(`Compliance score: ${gapAnalysis.complianceScore}%`);
console.log(`Number of gaps: ${gapAnalysis.gaps.length}`);
```

#### Implementation of

`IComplianceService.getComplianceGapAnalysis`

***

### getComplianceStatus()

> **getComplianceStatus**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`ComplianceStatusDetails`](../../types/compliance/interfaces/ComplianceStatusDetails.md)

Defined in: [services/ComplianceServiceAdapter.ts:159](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/ComplianceServiceAdapter.ts#L159)

Get compliance status based on security levels

Evaluates compliance with all supported frameworks based on the provided
security levels for availability, integrity, and confidentiality.

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

[`ComplianceStatusDetails`](../../types/compliance/interfaces/ComplianceStatusDetails.md)

Compliance status details including compliant, partially compliant, and non-compliant frameworks

#### Throws

If any security level is invalid

#### Example

```typescript
const status = adapter.getComplianceStatus('High', 'High', 'Very High');
console.log(`Compliant with ${status.compliantFrameworks.length} frameworks`);
```

#### Implementation of

`IComplianceService.getComplianceStatus`

***

### getComplianceStatusText()

> **getComplianceStatusText**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/ComplianceServiceAdapter.ts:197](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/ComplianceServiceAdapter.ts#L197)

Get compliance status text based on security levels

Returns a human-readable text description of the overall compliance status.

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Integrity security level (defaults to availabilityLevel if not provided)

##### confidentialityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Confidentiality security level (defaults to availabilityLevel if not provided)

#### Returns

`string`

Compliance status text description

#### Throws

If any security level is invalid

#### Example

```typescript
const statusText = adapter.getComplianceStatusText('High', 'High', 'Very High');
console.log(statusText); // "Compliant with all major frameworks"
```

***

### getCompliantFrameworks()

> **getCompliantFrameworks**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`[]

Defined in: [services/ComplianceServiceAdapter.ts:242](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/ComplianceServiceAdapter.ts#L242)

Get compliant frameworks for given security levels

Returns a list of all compliance frameworks that are fully satisfied
by the provided security levels.

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Integrity security level (defaults to availabilityLevel if not provided)

##### confidentialityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Confidentiality security level (defaults to availabilityLevel if not provided)

#### Returns

`string`[]

Array of compliant framework names

#### Throws

If any security level is invalid

#### Example

```typescript
const frameworks = adapter.getCompliantFrameworks('High', 'High', 'Very High');
console.log(`Compliant with: ${frameworks.join(', ')}`);
```

#### Implementation of

`IComplianceService.getCompliantFrameworks`

***

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): [`CIADetails`](../../types/interfaces/CIADetails.md) \| `undefined`

Defined in: [services/BaseService.ts:193](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/BaseService.ts#L193)

Get component details for a specific component and security level

#### Parameters

##### component

[`CIAComponentType`](../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`CIADetails`](../../types/interfaces/CIADetails.md) \| `undefined`

#### Inherited from

[`BaseService`](../BaseService/classes/BaseService.md).[`getComponentDetails`](../BaseService/classes/BaseService.md#getcomponentdetails)

***

### getFrameworkDescription()

> **getFrameworkDescription**(`framework`): `string`

Defined in: [services/ComplianceServiceAdapter.ts:275](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/ComplianceServiceAdapter.ts#L275)

Get description of a compliance framework

Returns a detailed description of the specified compliance framework,
explaining its purpose and scope.

#### Parameters

##### framework

`string`

Framework name (e.g., 'NIST 800-53', 'ISO 27001', 'GDPR')

#### Returns

`string`

Framework description or "No description available" if framework is unknown

#### Example

```typescript
const desc = adapter.getFrameworkDescription('GDPR');
console.log(desc); // "General Data Protection Regulation for protecting personal data in the EU"
```

#### Implementation of

`IComplianceService.getFrameworkDescription`

***

### getFrameworkRequiredLevel()

> **getFrameworkRequiredLevel**(`framework`, `component`): [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [services/ComplianceServiceAdapter.ts:402](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/ComplianceServiceAdapter.ts#L402)

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

Defined in: [services/ComplianceServiceAdapter.ts:329](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/ComplianceServiceAdapter.ts#L329)

Get framework compliance status

Evaluates whether a specific framework's requirements are met by the given
security levels.

#### Parameters

##### framework

`string`

Framework name to evaluate

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

Object containing status string (Compliant, Partially Compliant, or Non-Compliant)

##### status

> **status**: `string`

#### Throws

If any security level is invalid

#### Example

```typescript
const status = adapter.getFrameworkStatus('HIPAA', 'High', 'High', 'Very High');
console.log(status.status); // "Compliant"
```

***

### getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [services/BaseService.ts:254](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/BaseService.ts#L254)

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

Defined in: [services/BaseService.ts:233](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/BaseService.ts#L233)

Get security level description

#### Parameters

##### level

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Inherited from

[`BaseService`](../BaseService/classes/BaseService.md).[`getSecurityLevelDescription`](../BaseService/classes/BaseService.md#getsecurityleveldescription)

***

### handleError()

> **handleError**(`error`): [`ServiceError`](ServiceError.md)

Defined in: [services/BaseService.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/BaseService.ts#L104)

Handle errors consistently across services

#### Parameters

##### error

`Error`

Error to handle

#### Returns

[`ServiceError`](ServiceError.md)

ServiceError

#### Implementation of

`IComplianceService.handleError`

#### Inherited from

[`BaseService`](../BaseService/classes/BaseService.md).[`handleError`](../BaseService/classes/BaseService.md#handleerror)

***

### isFrameworkApplicable()

> **isFrameworkApplicable**(`framework`, `industry?`, `region?`): `boolean`

Defined in: [services/ComplianceServiceAdapter.ts:385](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/ComplianceServiceAdapter.ts#L385)

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

***

### validate()

> **validate**(`input`): `boolean`

Defined in: [services/BaseService.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/BaseService.ts#L73)

Validate input parameters (to be overridden by subclasses)

#### Parameters

##### input

`unknown`

Input to validate

#### Returns

`boolean`

True if valid, false otherwise

#### Implementation of

`IComplianceService.validate`

#### Inherited from

[`BaseService`](../BaseService/classes/BaseService.md).[`validate`](../BaseService/classes/BaseService.md#validate)
