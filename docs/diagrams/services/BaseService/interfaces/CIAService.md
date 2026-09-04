[**CIA Compliance Manager — UML Diagrams v1.1.143**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/BaseService](../README.md) / CIAService

# Interface: CIAService

Defined in: [services/BaseService.ts:21](https://github.com/Hack23/cia-compliance-manager/blob/ed90fd0069f5cd488ae5acffca473ead6710addb/src/services/BaseService.ts#L21)

Common interface for CIA services

## Methods

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md) \| `undefined`

Defined in: [services/BaseService.ts:22](https://github.com/Hack23/cia-compliance-manager/blob/ed90fd0069f5cd488ae5acffca473ead6710addb/src/services/BaseService.ts#L22)

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md) \| `undefined`

***

### getSecurityLevelDescription()

> **getSecurityLevelDescription**(`level`): `string`

Defined in: [services/BaseService.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/ed90fd0069f5cd488ae5acffca473ead6710addb/src/services/BaseService.ts#L26)

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [services/BaseService.ts:27](https://github.com/Hack23/cia-compliance-manager/blob/ed90fd0069f5cd488ae5acffca473ead6710addb/src/services/BaseService.ts#L27)

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`
