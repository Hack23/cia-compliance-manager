[**CIA Compliance Manager Diagrams v0.8.35**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/technicalImplementationService](../README.md) / TechnicalImplementationService

# Class: TechnicalImplementationService

Defined in: [services/technicalImplementationService.ts:33](https://github.com/Hack23/cia-compliance-manager/blob/b297770fc62abf558e2711cd029bbbe74e6c5cfb/src/services/technicalImplementationService.ts#L33)

Service for technical implementation details and guidance

## Implementation Perspective

This service provides practical implementation guidance for security controls,
including effort estimation, technical requirements, and step-by-step
implementation guides. It helps technical teams understand how to operationalize
security requirements and implement controls effectively. 🔧

## Extends

- [`BaseService`](../../BaseService/classes/BaseService.md)

## Constructors

### Constructor

> **new TechnicalImplementationService**(`dataProvider`): `TechnicalImplementationService`

Defined in: [services/technicalImplementationService.ts:34](https://github.com/Hack23/cia-compliance-manager/blob/b297770fc62abf558e2711cd029bbbe74e6c5cfb/src/services/technicalImplementationService.ts#L34)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/interfaces/CIADataProvider.md)

#### Returns

`TechnicalImplementationService`

#### Overrides

[`BaseService`](../../BaseService/classes/BaseService.md).[`constructor`](../../BaseService/classes/BaseService.md#constructor)

## Methods

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): [`CIADetails`](../../../types/interfaces/CIADetails.md) \| `undefined`

Defined in: [services/BaseService.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/b297770fc62abf558e2711cd029bbbe74e6c5cfb/src/services/BaseService.ts#L53)

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

### getComponentImplementationDetails()

> **getComponentImplementationDetails**(`_component`, `level`): [`TechnicalImplementationDetails`](../../../types/interfaces/TechnicalImplementationDetails.md)

Defined in: [services/technicalImplementationService.ts:91](https://github.com/Hack23/cia-compliance-manager/blob/b297770fc62abf558e2711cd029bbbe74e6c5cfb/src/services/technicalImplementationService.ts#L91)

Get component implementation details

#### Parameters

##### \_component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`TechnicalImplementationDetails`](../../../types/interfaces/TechnicalImplementationDetails.md)

***

### getImplementationConsiderations()

> **getImplementationConsiderations**(`level`): `string`

Defined in: [services/technicalImplementationService.ts:178](https://github.com/Hack23/cia-compliance-manager/blob/b297770fc62abf558e2711cd029bbbe74e6c5cfb/src/services/technicalImplementationService.ts#L178)

Get implementation considerations based on security levels

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level for implementation

#### Returns

`string`

Implementation considerations text

***

### getImplementationEffort()

> **getImplementationEffort**(`component`, `level`): [`ImplementationEffort`](../../../types/interfaces/ImplementationEffort.md)

Defined in: [services/technicalImplementationService.ts:201](https://github.com/Hack23/cia-compliance-manager/blob/b297770fc62abf558e2711cd029bbbe74e6c5cfb/src/services/technicalImplementationService.ts#L201)

Get implementation effort for a component's security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

The CIA component

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The security level

#### Returns

[`ImplementationEffort`](../../../types/interfaces/ImplementationEffort.md)

Implementation effort details or default effort

***

### getImplementationSteps()

> **getImplementationSteps**(`component`, `level`): `string`[]

Defined in: [services/technicalImplementationService.ts:215](https://github.com/Hack23/cia-compliance-manager/blob/b297770fc62abf558e2711cd029bbbe74e6c5cfb/src/services/technicalImplementationService.ts#L215)

Get implementation steps for a component's security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

The CIA component

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The security level

#### Returns

`string`[]

Array of implementation steps

***

### getImplementationTime()

> **getImplementationTime**(`level`): `string`

Defined in: [services/technicalImplementationService.ts:155](https://github.com/Hack23/cia-compliance-manager/blob/b297770fc62abf558e2711cd029bbbe74e6c5cfb/src/services/technicalImplementationService.ts#L155)

Get implementation time estimate based on security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Implementation time estimate

***

### getRecommendations()

> **getRecommendations**(`component`, `level`): `string`[]

Defined in: [services/technicalImplementationService.ts:125](https://github.com/Hack23/cia-compliance-manager/blob/b297770fc62abf558e2711cd029bbbe74e6c5cfb/src/services/technicalImplementationService.ts#L125)

Get recommendations for a component and security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`[]

Array of recommendations

***

### getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [services/BaseService.ts:114](https://github.com/Hack23/cia-compliance-manager/blob/b297770fc62abf558e2711cd029bbbe74e6c5cfb/src/services/BaseService.ts#L114)

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

Defined in: [services/BaseService.ts:93](https://github.com/Hack23/cia-compliance-manager/blob/b297770fc62abf558e2711cd029bbbe74e6c5cfb/src/services/BaseService.ts#L93)

Get security level description

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Inherited from

[`BaseService`](../../BaseService/classes/BaseService.md).[`getSecurityLevelDescription`](../../BaseService/classes/BaseService.md#getsecurityleveldescription)

***

### getTechnicalDescription()

> **getTechnicalDescription**(`component`, `level`): `string`

Defined in: [services/technicalImplementationService.ts:105](https://github.com/Hack23/cia-compliance-manager/blob/b297770fc62abf558e2711cd029bbbe74e6c5cfb/src/services/technicalImplementationService.ts#L105)

Get technical description for a component and security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

`string`

Technical description

***

### getTechnicalImplementation()

> **getTechnicalImplementation**(`component`, `level`): [`TechnicalImplementationDetails`](../../../types/interfaces/TechnicalImplementationDetails.md)

Defined in: [services/technicalImplementationService.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/b297770fc62abf558e2711cd029bbbe74e6c5cfb/src/services/technicalImplementationService.ts#L45)

Get technical implementation details for a component and security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

CIA component type

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

#### Returns

[`TechnicalImplementationDetails`](../../../types/interfaces/TechnicalImplementationDetails.md)

Technical implementation details
