[**CIA Compliance Manager API Documentation v0.7.0**](../../../README.md)

***

[CIA Compliance Manager API Documentation](../../../modules.md) / [tests/mockFactory](../README.md) / default

# Variable: default

> `const` **default**: `object`

Defined in: [src/tests/mockFactory.tsx:117](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/tests/mockFactory.tsx#L117)

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
