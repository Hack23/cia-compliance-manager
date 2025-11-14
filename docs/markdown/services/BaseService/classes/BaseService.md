[**CIA Compliance Manager Documentation v0.8.38**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/BaseService](../README.md) / BaseService

# Class: BaseService

Defined in: [services/BaseService.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/1bdf265bbf5387ac7eac8636cc4b7cdd43a7664b/src/services/BaseService.ts#L26)

Base service class that provides common functionality
for security-related services

## Extended by

- [`SecurityMetricsService`](../../securityMetricsService/classes/SecurityMetricsService.md)
- [`ComplianceService`](../../complianceService/classes/ComplianceService.md)
- [`CIAContentService`](../../ciaContentService/classes/CIAContentService.md)
- [`BusinessImpactService`](../../businessImpactService/classes/BusinessImpactService.md)
- [`SecurityResourceService`](../../securityResourceService/classes/SecurityResourceService.md)
- [`TechnicalImplementationService`](../../technicalImplementationService/classes/TechnicalImplementationService.md)
- [`ComplianceServiceAdapter`](../../classes/ComplianceServiceAdapter.md)

## Implements

- [`CIAService`](../interfaces/CIAService.md)

## Constructors

### Constructor

> **new BaseService**(`dataProvider`): `BaseService`

Defined in: [services/BaseService.ts:37](https://github.com/Hack23/cia-compliance-manager/blob/1bdf265bbf5387ac7eac8636cc4b7cdd43a7664b/src/services/BaseService.ts#L37)

Create a new service instance

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/interfaces/CIADataProvider.md)

Data provider for security information

#### Returns

`BaseService`

## Methods

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): [`CIADetails`](../../../types/interfaces/CIADetails.md) \| `undefined`

Defined in: [services/BaseService.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/1bdf265bbf5387ac7eac8636cc4b7cdd43a7664b/src/services/BaseService.ts#L53)

Get component details for a specific component and security level

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`CIADetails`](../../../types/interfaces/CIADetails.md) \| `undefined`

#### Implementation of

[`CIAService`](../interfaces/CIAService.md).[`getComponentDetails`](../interfaces/CIAService.md#getcomponentdetails)

***

### getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [services/BaseService.ts:114](https://github.com/Hack23/cia-compliance-manager/blob/1bdf265bbf5387ac7eac8636cc4b7cdd43a7664b/src/services/BaseService.ts#L114)

Get risk level from security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Implementation of

[`CIAService`](../interfaces/CIAService.md).[`getRiskLevelFromSecurityLevel`](../interfaces/CIAService.md#getrisklevelfromsecuritylevel)

***

### getSecurityLevelDescription()

> **getSecurityLevelDescription**(`level`): `string`

Defined in: [services/BaseService.ts:93](https://github.com/Hack23/cia-compliance-manager/blob/1bdf265bbf5387ac7eac8636cc4b7cdd43a7664b/src/services/BaseService.ts#L93)

Get security level description

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

#### Implementation of

[`CIAService`](../interfaces/CIAService.md).[`getSecurityLevelDescription`](../interfaces/CIAService.md#getsecurityleveldescription)
