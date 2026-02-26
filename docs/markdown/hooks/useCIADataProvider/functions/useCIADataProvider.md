[**CIA Compliance Manager Documentation v1.1.24**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [hooks/useCIADataProvider](../README.md) / useCIADataProvider

# Function: useCIADataProvider()

> **useCIADataProvider**(): `object`

Defined in: [hooks/useCIADataProvider.ts:9](https://github.com/Hack23/cia-compliance-manager/blob/38f6f5c07abe26db22d63c793ea812e50d687ce5/src/hooks/useCIADataProvider.ts#L9)

Hook that provides access to the CIA data provider

## Returns

`object`

An object containing the data provider, loading state, and error

### dataProvider

> **dataProvider**: [`CIADataProvider`](../../../types/interfaces/CIADataProvider.md) \| `null`

### error

> **error**: `Error` \| `null`

### isLoading

> **isLoading**: `boolean`

### refreshDataProvider()

> **refreshDataProvider**: () => `Promise`\<`void`\> = `initDataProvider`

#### Returns

`Promise`\<`void`\>
