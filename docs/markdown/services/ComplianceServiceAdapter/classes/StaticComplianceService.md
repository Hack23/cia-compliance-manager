[**CIA Compliance Manager Documentation v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/ComplianceServiceAdapter](../README.md) / StaticComplianceService

# Class: StaticComplianceService

Defined in: [src/services/ComplianceServiceAdapter.ts:420](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/ComplianceServiceAdapter.ts#L420)

Static compatibility methods for ComplianceService
These are used to maintain backward compatibility with existing code

## Constructors

### new StaticComplianceService()

> **new StaticComplianceService**(): `StaticComplianceService`

#### Returns

`StaticComplianceService`

## Methods

### getComplianceStatus()

> `static` **getComplianceStatus**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `options`?): [`ComplianceStatusDetails`](../../complianceService/interfaces/ComplianceStatusDetails.md)

Defined in: [src/services/ComplianceServiceAdapter.ts:424](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/ComplianceServiceAdapter.ts#L424)

Get compliance status for a given configuration

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### options?

###### industry?

`string`

###### region?

`string`

#### Returns

[`ComplianceStatusDetails`](../../complianceService/interfaces/ComplianceStatusDetails.md)

***

### getComplianceStatusText()

> `static` **getComplianceStatusText**(`availabilityLevel`, `integrityLevel`?, `confidentialityLevel`?): `string`

Defined in: [src/services/ComplianceServiceAdapter.ts:442](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/ComplianceServiceAdapter.ts#L442)

Get compliance status text

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### integrityLevel?

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### confidentialityLevel?

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getFrameworkDescription()

> `static` **getFrameworkDescription**(`framework`): `string`

Defined in: [src/services/ComplianceServiceAdapter.ts:459](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/ComplianceServiceAdapter.ts#L459)

Get framework description

#### Parameters

##### framework

`string`

#### Returns

`string`
