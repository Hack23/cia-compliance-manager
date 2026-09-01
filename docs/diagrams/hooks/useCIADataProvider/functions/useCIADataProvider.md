[**CIA Compliance Manager — UML Diagrams v1.1.142**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [hooks/useCIADataProvider](../README.md) / useCIADataProvider

# Function: useCIADataProvider()

> **useCIADataProvider**(): `object`

Defined in: [hooks/useCIADataProvider.ts:9](https://github.com/Hack23/cia-compliance-manager/blob/7749169fe0dfb00ea4da12e5941787f96c33f1d8/src/hooks/useCIADataProvider.ts#L9)

Hook that provides access to the CIA data provider

## Returns

`object`

An object containing the data provider, loading state, and error

### dataProvider

> **dataProvider**: [`CIADataProvider`](../../../types/cia-services/interfaces/CIADataProvider.md) \| `null`

### error

> **error**: `Error` \| `null`

### isLoading

> **isLoading**: `boolean`

### refreshDataProvider

> **refreshDataProvider**: () => `Promise`\<`void`\> = `initDataProvider`

#### Returns

`Promise`\<`void`\>
