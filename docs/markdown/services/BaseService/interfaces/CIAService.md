[**CIA Compliance Manager Documentation v1.1.4**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/BaseService](../README.md) / CIAService

# Interface: CIAService

Defined in: [services/BaseService.ts:21](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/BaseService.ts#L21)

Common interface for CIA services

## Methods

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): [`CIADetails`](../../../types/interfaces/CIADetails.md) \| `undefined`

Defined in: [services/BaseService.ts:22](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/BaseService.ts#L22)

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

Defined in: [services/BaseService.ts:27](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/BaseService.ts#L27)

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getSecurityLevelDescription()

> **getSecurityLevelDescription**(`level`): `string`

Defined in: [services/BaseService.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/BaseService.ts#L26)

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`
