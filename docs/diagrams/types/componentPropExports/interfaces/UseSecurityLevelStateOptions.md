[**CIA Compliance Manager — UML Diagrams v1.1.146**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/componentPropExports](../README.md) / UseSecurityLevelStateOptions

# Interface: UseSecurityLevelStateOptions

Defined in: [types/componentPropExports.ts:285](https://github.com/Hack23/cia-compliance-manager/blob/1ad940e5aedd08b10a800e582746541da5c51dd4/src/types/componentPropExports.ts#L285)

## Properties

### availabilityLevel?

> `optional` **availabilityLevel?**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/componentPropExports.ts:286](https://github.com/Hack23/cia-compliance-manager/blob/1ad940e5aedd08b10a800e582746541da5c51dd4/src/types/componentPropExports.ts#L286)

***

### integrityLevel?

> `optional` **integrityLevel?**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/componentPropExports.ts:287](https://github.com/Hack23/cia-compliance-manager/blob/1ad940e5aedd08b10a800e582746541da5c51dd4/src/types/componentPropExports.ts#L287)

***

### confidentialityLevel?

> `optional` **confidentialityLevel?**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/componentPropExports.ts:288](https://github.com/Hack23/cia-compliance-manager/blob/1ad940e5aedd08b10a800e582746541da5c51dd4/src/types/componentPropExports.ts#L288)

***

### onAvailabilityChange?

> `optional` **onAvailabilityChange?**: (`level`) => `void`

Defined in: [types/componentPropExports.ts:289](https://github.com/Hack23/cia-compliance-manager/blob/1ad940e5aedd08b10a800e582746541da5c51dd4/src/types/componentPropExports.ts#L289)

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### onIntegrityChange?

> `optional` **onIntegrityChange?**: (`level`) => `void`

Defined in: [types/componentPropExports.ts:290](https://github.com/Hack23/cia-compliance-manager/blob/1ad940e5aedd08b10a800e582746541da5c51dd4/src/types/componentPropExports.ts#L290)

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### onConfidentialityChange?

> `optional` **onConfidentialityChange?**: (`level`) => `void`

Defined in: [types/componentPropExports.ts:291](https://github.com/Hack23/cia-compliance-manager/blob/1ad940e5aedd08b10a800e582746541da5c51dd4/src/types/componentPropExports.ts#L291)

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`
