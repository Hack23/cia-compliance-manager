[**CIA Compliance Manager API Documentation v0.6.0**](../../../README.md)

***

[CIA Compliance Manager API Documentation](../../../modules.md) / [tests/mockFactory](../README.md) / createMockOptions

# Function: createMockOptions()

> **createMockOptions**(`levels`, `customValues`): `Record`\<`string`, [`MockOptions`](../../../types/testTypes/interfaces/MockOptions.md)\>

Defined in: [src/tests/mockFactory.ts:13](https://github.com/Hack23/cia-compliance-manager/blob/32fe683007dd7fe1aa6b244d2353e60fab4f51de/src/tests/mockFactory.ts#L13)

Creates mock CIA options for testing components

## Parameters

### levels

`string`[] = `...`

Array of security levels to include in the mock

### customValues

`Partial`\<`Record`\<`string`, `Partial`\<[`MockOptions`](../../../types/testTypes/interfaces/MockOptions.md)\>\>\> = `{}`

Optional custom values for specific fields

## Returns

`Record`\<`string`, [`MockOptions`](../../../types/testTypes/interfaces/MockOptions.md)\>

Mocked options object
