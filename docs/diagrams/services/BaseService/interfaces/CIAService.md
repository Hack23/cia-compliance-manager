[**CIA Compliance Manager Diagrams v1.1.16**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/BaseService](../README.md) / CIAService

# Interface: CIAService

Defined in: [services/BaseService.ts:21](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/services/BaseService.ts#L21)

Common interface for CIA services

## Methods

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): [`CIADetails`](../../../types/interfaces/CIADetails.md) \| `undefined`

Defined in: [services/BaseService.ts:22](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/services/BaseService.ts#L22)

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

Defined in: [services/BaseService.ts:27](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/services/BaseService.ts#L27)

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getSecurityLevelDescription()

> **getSecurityLevelDescription**(`level`): `string`

Defined in: [services/BaseService.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/services/BaseService.ts#L26)

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`
