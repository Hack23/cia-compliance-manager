[**CIA Compliance Manager — Markdown Documentation v1.1.138**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia-services](../README.md) / CIAContentService

# Interface: CIAContentService

Defined in: [types/cia-services.ts:381](https://github.com/Hack23/cia-compliance-manager/blob/daf6e30357f2f03bad3af17a53802a86917ac171/src/types/cia-services.ts#L381)

CIA Content Service interface
Defines methods for retrieving CIA-related content and technical details

## Properties

### getComponentDetails?

> `optional` **getComponentDetails?**: (`component`, `level`) => `unknown`

Defined in: [types/cia-services.ts:382](https://github.com/Hack23/cia-compliance-manager/blob/daf6e30357f2f03bad3af17a53802a86917ac171/src/types/cia-services.ts#L382)

#### Parameters

##### component

`string`

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`unknown`

***

### getTechnicalRequirements?

> `optional` **getTechnicalRequirements?**: (`component`, `level`) => `string`[]

Defined in: [types/cia-services.ts:383](https://github.com/Hack23/cia-compliance-manager/blob/daf6e30357f2f03bad3af17a53802a86917ac171/src/types/cia-services.ts#L383)

#### Parameters

##### component

`string`

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### getRequiredExpertise?

> `optional` **getRequiredExpertise?**: (`component`, `level`) => `string`[]

Defined in: [types/cia-services.ts:384](https://github.com/Hack23/cia-compliance-manager/blob/daf6e30357f2f03bad3af17a53802a86917ac171/src/types/cia-services.ts#L384)

#### Parameters

##### component

`string`

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### getInformationSensitivity?

> `optional` **getInformationSensitivity?**: (`level`) => `string`

Defined in: [types/cia-services.ts:385](https://github.com/Hack23/cia-compliance-manager/blob/daf6e30357f2f03bad3af17a53802a86917ac171/src/types/cia-services.ts#L385)

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`
