[**CIA Compliance Manager Documentation v0.8.34**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/BaseService](../README.md) / CIAService

# Interface: CIAService

Defined in: [services/BaseService.ts:13](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/BaseService.ts#L13)

Common interface for CIA services

## Methods

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): [`CIADetails`](../../../types/interfaces/CIADetails.md) \| `undefined`

Defined in: [services/BaseService.ts:14](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/BaseService.ts#L14)

#### Parameters

##### component

[`CIAComponentType`](../../../types/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`CIADetails`](../../../types/interfaces/CIADetails.md) \| `undefined`

***

### getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [services/BaseService.ts:19](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/BaseService.ts#L19)

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getSecurityLevelDescription()

> **getSecurityLevelDescription**(`level`): `string`

Defined in: [services/BaseService.ts:18](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/BaseService.ts#L18)

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`
