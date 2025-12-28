[**CIA Compliance Manager Documentation v1.1.1**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/businessImpactService](../README.md) / BusinessImpactService

# Class: BusinessImpactService

Defined in: [services/businessImpactService.ts:37](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/businessImpactService.ts#L37)

Service for business impact related functionality

## Business Perspective

This service quantifies the business impact of security controls across
different dimensions including financial, operational, reputational,
strategic, and regulatory perspectives. It helps organizations understand
the business value of their security investments. 💼

## Implements

## Extends

- [`BaseService`](../../BaseService/classes/BaseService.md)

## Implements

- `IBusinessImpactService`

## Constructors

### Constructor

> **new BusinessImpactService**(`dataProvider`): `BusinessImpactService`

Defined in: [services/businessImpactService.ts:49](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/businessImpactService.ts#L49)

Create a new BusinessImpactService instance

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/interfaces/CIADataProvider.md)

Data provider for CIA options and business impact data

#### Returns

`BusinessImpactService`

#### Throws

If dataProvider is not provided

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`constructor`](../../BaseService/classes/BaseService.md#constructor)

## Properties

### name

> `readonly` **name**: `string` = `'BusinessImpactService'`

Defined in: [services/businessImpactService.ts:41](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/businessImpactService.ts#L41)

Service name for identification

#### Implementation of

`IBusinessImpactService.name`

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`name`](../../BaseService/classes/BaseService.md#name)

## Methods

### calculateBusinessImpactLevel()

> **calculateBusinessImpactLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [services/businessImpactService.ts:287](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/businessImpactService.ts#L287)

Calculate business impact level based on security levels

Evaluates the overall business impact risk by analyzing security levels
across all three CIA components and determining the weakest link.

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Integrity security level (defaults to availabilityLevel if not provided)

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Confidentiality security level (defaults to availabilityLevel if not provided)

#### Returns

`string`

Business impact level description (e.g., "Critical", "High", "Moderate", "Low", "Minimal")

#### Throws

If any security level is invalid

#### Example

```typescript
const impactLevel = service.calculateBusinessImpactLevel('High', 'Moderate', 'High');
console.log(`Business impact risk: ${impactLevel}`);
```

#### Implementation of

`IBusinessImpactService.calculateBusinessImpactLevel`

***

### getBusinessImpact()

> **getBusinessImpact**(`component`, `level`): [`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md)

Defined in: [services/businessImpactService.ts:72](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/businessImpactService.ts#L72)

Get business impact details for a security level

Retrieves comprehensive business impact analysis including financial,
operational, and reputational impacts for a specific CIA component
at a given security level.

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

CIA component (confidentiality, integrity, availability)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `...`

Security level (defaults to 'Moderate' if not provided)

#### Returns

[`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md)

Business impact details including summary and risk levels for each impact category

#### Throws

If component or level is invalid

#### Example

```typescript
const impact = service.getBusinessImpact('confidentiality', 'High');
console.log(impact.summary);
console.log(`Financial risk: ${impact.financial.riskLevel}`);
```

#### Implementation of

`IBusinessImpactService.getBusinessImpact`

***

### getBusinessImpactDescription()

> **getBusinessImpactDescription**(`component`, `level`): `string`

Defined in: [services/businessImpactService.ts:176](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/businessImpactService.ts#L176)

Get business impact description for a security level

Returns a human-readable description of the business impact for a specific
CIA component at a given security level.

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

CIA component (confidentiality, integrity, availability)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Business impact description string

#### Throws

If component or level is invalid

#### Example

```typescript
const desc = service.getBusinessImpactDescription('availability', 'High');
console.log(desc); // "High level of system uptime and availability..."
```

#### Implementation of

`IBusinessImpactService.getBusinessImpactDescription`

***

### getCategoryIcon()

> **getCategoryIcon**(`category`): `string`

Defined in: [services/businessImpactService.ts:152](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/businessImpactService.ts#L152)

Get category icon for business impact visualization

Returns an icon (emoji) representing the business impact category
for visual identification in reports and dashboards.

#### Parameters

##### category

`string`

Impact category (e.g., 'financial', 'operational', 'reputational')

#### Returns

`string`

Icon string (emoji) for the category or '❓' if category is unknown

#### Example

```typescript
const icon = service.getCategoryIcon('financial');
console.log(icon); // '💰'
```

#### Implementation of

`IBusinessImpactService.getCategoryIcon`

***

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): [`CIADetails`](../../../types/interfaces/CIADetails.md) \| `undefined`

Defined in: [services/BaseService.ts:193](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/BaseService.ts#L193)

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

### getDetailedDescription()

> **getDetailedDescription**(`category`, `detail?`): `string`

Defined in: [services/businessImpactService.ts:203](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/businessImpactService.ts#L203)

Get detailed description of business impact

#### Parameters

##### category

`string`

Impact category

##### detail?

[`BusinessImpactDetail`](../../../types/interfaces/BusinessImpactDetail.md)

Business impact detail

#### Returns

`string`

Formatted detailed description

***

### getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [services/businessImpactService.ts:408](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/businessImpactService.ts#L408)

Get risk level from security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Risk level

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`getRiskLevelFromSecurityLevel`](../../BaseService/classes/BaseService.md#getrisklevelfromsecuritylevel)

***

### getSecurityLevelDescription()

> **getSecurityLevelDescription**(`level`): `string`

Defined in: [services/BaseService.ts:233](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/BaseService.ts#L233)

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

Defined in: [services/BaseService.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/BaseService.ts#L104)

Handle errors consistently across services

#### Parameters

##### error

`Error`

Error to handle

#### Returns

[`ServiceError`](../../classes/ServiceError.md)

ServiceError

#### Implementation of

`IBusinessImpactService.handleError`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`handleError`](../../BaseService/classes/BaseService.md#handleerror)

***

### validate()

> **validate**(`input`): `boolean`

Defined in: [services/BaseService.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/services/BaseService.ts#L73)

Validate input parameters (to be overridden by subclasses)

#### Parameters

##### input

`unknown`

Input to validate

#### Returns

`boolean`

True if valid, false otherwise

#### Implementation of

`IBusinessImpactService.validate`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`validate`](../../BaseService/classes/BaseService.md#validate)
