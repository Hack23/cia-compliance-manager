[**CIA Compliance Manager Diagrams v0.8.26**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [hooks/useCIADataProvider](../README.md) / useCIADataProvider

# Function: useCIADataProvider()

> **useCIADataProvider**(): `object`

Defined in: [hooks/useCIADataProvider.ts:9](https://github.com/Hack23/cia-compliance-manager/blob/168f1311621722afef33b264085d8ac99d4a3213/src/hooks/useCIADataProvider.ts#L9)

Hook that provides access to the CIA data provider

## Returns

`object`

An object containing the data provider, loading state, and error

### dataProvider

> **dataProvider**: `null` \| [`CIADataProvider`](../../../types/interfaces/CIADataProvider.md)

### error

> **error**: `null` \| `Error`

### isLoading

> **isLoading**: `boolean`

### refreshDataProvider()

> **refreshDataProvider**: () => `Promise`\<`void`\> = `initDataProvider`

#### Returns

`Promise`\<`void`\>
