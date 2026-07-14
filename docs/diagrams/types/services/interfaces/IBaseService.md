[**CIA Compliance Manager — UML Diagrams v1.1.109**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/services](../README.md) / IBaseService

# Interface: IBaseService

Defined in: [types/services.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/services.ts#L78)

Base service interface that all services must implement

Provides common functionality for validation and error handling

## Extended by

- [`ICIAContentService`](ICIAContentService.md)
- [`IComplianceService`](IComplianceService.md)
- [`IBusinessImpactService`](IBusinessImpactService.md)
- [`ISecurityMetricsService`](ISecurityMetricsService.md)
- [`ITechnicalImplementationService`](ITechnicalImplementationService.md)
- [`ISecurityResourceService`](ISecurityResourceService.md)

## Properties

### name

> `readonly` **name**: `string`

Defined in: [types/services.ts:82](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/services.ts#L82)

Service name for identification and logging

## Methods

### validate()

> **validate**(`input`): `boolean`

Defined in: [types/services.ts:90](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/services.ts#L90)

Validate input parameters (returns simple boolean)

#### Parameters

##### input

`unknown`

Input to validate

#### Returns

`boolean`

True if valid, false otherwise

***

### handleError()

> **handleError**(`error`): [`ServiceError`](../../../services/errors/classes/ServiceError.md)

Defined in: [types/services.ts:98](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/services.ts#L98)

Handle errors consistently across services

#### Parameters

##### error

`Error`

Error to handle

#### Returns

[`ServiceError`](../../../services/errors/classes/ServiceError.md)

Formatted ServiceError
