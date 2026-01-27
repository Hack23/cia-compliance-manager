[**CIA Compliance Manager Documentation v1.1.13**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/securityResourceService](../README.md) / SecurityResourceService

# Class: SecurityResourceService

Defined in: [services/securityResourceService.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/securityResourceService.ts#L26)

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

- `ISecurityResourceService`

## Constructors

### Constructor

> **new SecurityResourceService**(`dataProvider`): `SecurityResourceService`

Defined in: [services/securityResourceService.ts:43](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/securityResourceService.ts#L43)

Create a new SecurityResourceService instance

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/interfaces/CIADataProvider.md)

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

Defined in: [services/securityResourceService.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/securityResourceService.ts#L30)

Service name for identification

#### Implementation of

`ISecurityResourceService.name`

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`name`](../../BaseService/classes/BaseService.md#name)

## Methods

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): [`CIADetails`](../../../types/interfaces/CIADetails.md) \| `undefined`

Defined in: [services/BaseService.ts:193](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/BaseService.ts#L193)

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

### getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [services/BaseService.ts:254](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/BaseService.ts#L254)

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

Defined in: [services/BaseService.ts:233](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/BaseService.ts#L233)

Get security level description

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getSecurityLevelDescription`](../../BaseService/classes/BaseService.md#getsecurityleveldescription)

***

### getSecurityResources()

> **getSecurityResources**(`component`, `level`): `EnhancedSecurityResource`[]

Defined in: [services/securityResourceService.ts:87](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/securityResourceService.ts#L87)

Get security resources based on component and level

Returns a curated list of security resources tailored to the specific
CIA component and security level, including documentation, tools,
frameworks, and best practices.

#### Parameters

##### component

CIA component type or 'general' for general resources

`"general"` | [`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md) | `"all"`

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`EnhancedSecurityResource`[]

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

`ISecurityResourceService.getSecurityResources`

***

### getValuePoints()

> **getValuePoints**(`level`): `string`[]

Defined in: [services/securityResourceService.ts:237](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/securityResourceService.ts#L237)

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

`ISecurityResourceService.getValuePoints`

#### Overrides

`BaseService.getValuePoints`

***

### handleError()

> **handleError**(`error`): [`ServiceError`](../../classes/ServiceError.md)

Defined in: [services/BaseService.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/BaseService.ts#L104)

Handle errors consistently across services

#### Parameters

##### error

`Error`

Error to handle

#### Returns

[`ServiceError`](../../classes/ServiceError.md)

ServiceError

#### Implementation of

`ISecurityResourceService.handleError`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`handleError`](../../BaseService/classes/BaseService.md#handleerror)

***

### validate()

> **validate**(`input`): `boolean`

Defined in: [services/BaseService.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/d1f49c8017dd6649366103fd87fa14f3af19f220/src/services/BaseService.ts#L73)

Validate input parameters (to be overridden by subclasses)

#### Parameters

##### input

`unknown`

Input to validate

#### Returns

`boolean`

True if valid, false otherwise

#### Implementation of

`ISecurityResourceService.validate`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`validate`](../../BaseService/classes/BaseService.md#validate)
