[**CIA Compliance Manager API Documentation v0.6.0**](../../../README.md)

***

[CIA Compliance Manager API Documentation](../../../globals.md) / [vi](../README.md) / spyOn

# Function: spyOn()

## Call Signature

> **spyOn**\<`T`, `S`\>(`obj`, `methodName`, `accessType`): `MockInstance`\<() => `T`\[`S`\]\>

Defined in: [src/tests/vitest-extensions.d.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L35)

### Type Parameters

• **T**

• **S** *extends* `string` \| `symbol`

### Parameters

#### obj

`T`

#### methodName

`S`

#### accessType

`"get"`

### Returns

`MockInstance`\<() => `T`\[`S`\]\>

## Call Signature

> **spyOn**\<`T`, `G`\>(`obj`, `methodName`, `accessType`): `MockInstance`\<(`arg`) => `void`\>

Defined in: [src/tests/vitest-extensions.d.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L35)

### Type Parameters

• **T**

• **G** *extends* `string` \| `symbol`

### Parameters

#### obj

`T`

#### methodName

`G`

#### accessType

`"set"`

### Returns

`MockInstance`\<(`arg`) => `void`\>

## Call Signature

> **spyOn**\<`T`, `M`\>(`obj`, `methodName`): `Required`\<`T`\>\[`M`\] *extends* (...`args`) => `R` ? `MockInstance`\<(`this`, ...`args`) => `R`\> : `T`\[`M`\] *extends* `Procedure` ? `MockInstance`\<`any`\[`any`\]\> : `never`

Defined in: [src/tests/vitest-extensions.d.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L35)

### Type Parameters

• **T**

• **M** *extends* `string` \| `number` \| `symbol`

### Parameters

#### obj

`T`

#### methodName

`M`

### Returns

`Required`\<`T`\>\[`M`\] *extends* (...`args`) => `R` ? `MockInstance`\<(`this`, ...`args`) => `R`\> : `T`\[`M`\] *extends* `Procedure` ? `MockInstance`\<`any`\[`any`\]\> : `never`
