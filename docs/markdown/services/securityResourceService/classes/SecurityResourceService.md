[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/securityResourceService](../README.md) / SecurityResourceService

# Class: SecurityResourceService

Defined in: [services/securityResourceService.ts:20](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/securityResourceService.ts#L20)

Service for security resource recommendations

## Business Perspective

Provides curated security resources, best practices, and implementation
guidance tailored to specific security levels and CIA components. Helps
organizations find relevant documentation, tools, and frameworks to
implement effective security controls. 📚

## Implements

## Extends

- [`BaseService`](../../BaseService/classes/BaseService.md)

## Implements

- [`ISecurityResourceService`](../../../types/services/interfaces/ISecurityResourceService.md)

## Constructors

### Constructor

> **new SecurityResourceService**(`dataProvider`): `SecurityResourceService`

Defined in: [services/securityResourceService.ts:37](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/securityResourceService.ts#L37)

Create a new SecurityResourceService instance

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/cia-services/interfaces/CIADataProvider.md)

Data provider for CIA options and security data

#### Returns

`SecurityResourceService`

#### Throws

If dataProvider is not provided

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`constructor`](../../BaseService/classes/BaseService.md#constructor)

## Properties

### name

> `readonly` **name**: `string` = `'SecurityResourceService'`

Defined in: [services/securityResourceService.ts:24](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/securityResourceService.ts#L24)

Service name for identification

#### Implementation of

[`ISecurityResourceService`](../../../types/services/interfaces/ISecurityResourceService.md).[`name`](../../../types/services/interfaces/ISecurityResourceService.md#name)

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`name`](../../BaseService/classes/BaseService.md#name)

## Methods

### validate()

> **validate**(`input`): `boolean`

Defined in: [services/BaseService.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/BaseService.ts#L73)

Validate input parameters (to be overridden by subclasses)

#### Parameters

##### input

`unknown`

Input to validate

#### Returns

`boolean`

True if valid, false otherwise

#### Implementation of

[`ISecurityResourceService`](../../../types/services/interfaces/ISecurityResourceService.md).[`validate`](../../../types/services/interfaces/ISecurityResourceService.md#validate)

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`validate`](../../BaseService/classes/BaseService.md#validate)

***

### handleError()

> **handleError**(`error`): [`ServiceError`](../../errors/classes/ServiceError.md)

Defined in: [services/BaseService.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/BaseService.ts#L104)

Handle errors consistently across services

#### Parameters

##### error

`Error`

Error to handle

#### Returns

[`ServiceError`](../../errors/classes/ServiceError.md)

ServiceError

#### Implementation of

[`ISecurityResourceService`](../../../types/services/interfaces/ISecurityResourceService.md).[`handleError`](../../../types/services/interfaces/ISecurityResourceService.md#handleerror)

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`handleError`](../../BaseService/classes/BaseService.md#handleerror)

***

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md) \| `undefined`

Defined in: [services/BaseService.ts:193](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/BaseService.ts#L193)

Get component details for a specific component and security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md) \| `undefined`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getComponentDetails`](../../BaseService/classes/BaseService.md#getcomponentdetails)

***

### getSecurityLevelDescription()

> **getSecurityLevelDescription**(`level`): `string`

Defined in: [services/BaseService.ts:233](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/BaseService.ts#L233)

Get security level description

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getSecurityLevelDescription`](../../BaseService/classes/BaseService.md#getsecurityleveldescription)

***

### getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [services/BaseService.ts:254](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/BaseService.ts#L254)

Get risk level from security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getRiskLevelFromSecurityLevel`](../../BaseService/classes/BaseService.md#getrisklevelfromsecuritylevel)

***

### getSecurityResources()

> **getSecurityResources**(`component`, `level`): [`EnhancedSecurityResource`](../../../types/securityResources/interfaces/EnhancedSecurityResource.md)[]

Defined in: [services/securityResourceService.ts:81](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/securityResourceService.ts#L81)

Get security resources based on component and level

Returns a curated list of security resources tailored to the specific
CIA component and security level, including documentation, tools,
frameworks, and best practices.

#### Parameters

##### component

`"general"` \| [`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md) \| `"all"`

CIA component type or 'general' for general resources

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

[`EnhancedSecurityResource`](../../../types/securityResources/interfaces/EnhancedSecurityResource.md)[]

Array of relevant security resources sorted by relevance

#### Throws

If component or level is invalid

#### Example

```typescript
const resources = service.getSecurityResources('confidentiality', 'High');
console.log(`Found ${resources.length} resources`);
resources.forEach(r => console.log(`- ${r.title}: ${r.url}`));
```

#### Implementation of

[`ISecurityResourceService`](../../../types/services/interfaces/ISecurityResourceService.md).[`getSecurityResources`](../../../types/services/interfaces/ISecurityResourceService.md#getsecurityresources)

***

### getValuePoints()

> **getValuePoints**(`level`): `string`[]

Defined in: [services/securityResourceService.ts:231](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/services/securityResourceService.ts#L231)

Get value points for a security level

Returns a list of key value propositions and benefits for implementing
security controls at the specified security level. Helps justify
security investments to stakeholders.

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`[]

Array of value point strings describing the benefits and characteristics

#### Throws

If level is invalid

#### Example

```typescript
const valuePoints = service.getValuePoints('High');
console.log('Benefits of High security:');
valuePoints.forEach(point => console.log(`- ${point}`));
```

#### Implementation of

[`ISecurityResourceService`](../../../types/services/interfaces/ISecurityResourceService.md).[`getValuePoints`](../../../types/services/interfaces/ISecurityResourceService.md#getvaluepoints)

#### Overrides

`BaseService.getValuePoints`
