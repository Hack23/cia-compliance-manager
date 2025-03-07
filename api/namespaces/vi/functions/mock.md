[**CIA Compliance Manager API Documentation v0.6.0**](../../../README.md)

***

[CIA Compliance Manager API Documentation](../../../globals.md) / [vi](../README.md) / mock

# Function: mock()

## Call Signature

> **mock**(`path`, `factory`?): `void`

Defined in: [src/tests/vitest-extensions.d.ts:34](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L34)

Mocks every import call to the module even if it was already statically imported.

The call to `vi.mock` is hoisted to the top of the file, so you don't have access to variables declared in the global file scope
unless they are defined with [`vi.hoisted`](https://vitest.dev/api/vi#vi-hoisted) before this call.

Mocking algorithm is described in [documentation](https://vitest.dev/guide/mocking#modules).

### Parameters

#### path

`string`

Path to the module. Can be aliased, if your Vitest config supports it

#### factory?

Mocked module factory. The result of this function will be an exports object

`MockFactoryWithHelper` | `MockOptions`

### Returns

`void`

## Call Signature

> **mock**\<`T`\>(`module`, `factory`?): `void`

Defined in: [src/tests/vitest-extensions.d.ts:34](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/vitest-extensions.d.ts#L34)

### Type Parameters

• **T**

### Parameters

#### module

`Promise`\<`T`\>

#### factory?

`MockOptions` | `MockFactoryWithHelper`\<`T`\>

### Returns

`void`
