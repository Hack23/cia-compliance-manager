[**CIA Compliance Manager API Documentation v0.6.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / default

# Variable: default

> **default**: `object`

Defined in: [src/tests/mockFactory.ts:101](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/mockFactory.ts#L101)

## Type declaration

### createMockHandlers()

> **createMockHandlers**: () => [`MockHandlers`](../interfaces/MockHandlers.md)

Creates mock event handlers for component testing

#### Returns

[`MockHandlers`](../interfaces/MockHandlers.md)

Object with mock functions for availability, integrity, and confidentiality

### createMockOptions()

> **createMockOptions**: (`levels`, `customValues`) => `Record`\<`string`, [`MockOptions`](../interfaces/MockOptions.md)\>

Creates mock CIA options for testing components

#### Parameters

##### levels

`string`[] = `...`

Array of security levels to include in the mock

##### customValues

`Partial`\<`Record`\<`string`, `Partial`\<[`MockOptions`](../interfaces/MockOptions.md)\>\>\> = `{}`

Optional custom values for specific fields

#### Returns

`Record`\<`string`, [`MockOptions`](../interfaces/MockOptions.md)\>

Mocked options object
