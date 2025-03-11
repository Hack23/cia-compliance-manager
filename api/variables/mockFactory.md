[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / mockFactory

# Variable: mockFactory

> `const` **mockFactory**: `object`

Defined in: [src/tests/mockFactory.tsx:117](https://github.com/Hack23/cia-compliance-manager/blob/main/src/tests/mockFactory.tsx#L117)

## Type declaration

### createMockHandlers()

> **createMockHandlers**: () => `MockHandlers`

Creates mock event handlers for component testing

#### Returns

`MockHandlers`

### createMockOptions()

> **createMockOptions**: (`levels`, `customValues`) => `Record`\<`string`, `MockOptions`\>

Creates mock options for test cases

#### Parameters

##### levels

`string`[] = `...`

##### customValues

`Partial`\<`Record`\<`string`, `Partial`\<`MockOptions`\>\>\> = `{}`

#### Returns

`Record`\<`string`, `MockOptions`\>
