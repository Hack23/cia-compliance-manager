[**CIA Compliance Manager Documentation v1.1.20**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [hooks](../README.md) / ServiceDataState

# Interface: ServiceDataState\<T\>

Defined in: [hooks/useServiceData.ts:8](https://github.com/Hack23/cia-compliance-manager/blob/c2ee7b2fcb69460ebb29176ad9c216fcb0830779/src/hooks/useServiceData.ts#L8)

Service data state

## Type Parameters

### T

`T`

Type of data returned by the service

## Properties

### data

> **data**: `T` \| `null`

Defined in: [hooks/useServiceData.ts:10](https://github.com/Hack23/cia-compliance-manager/blob/c2ee7b2fcb69460ebb29176ad9c216fcb0830779/src/hooks/useServiceData.ts#L10)

Fetched data, null if not yet loaded or if an error occurred

***

### error

> **error**: `Error` \| `null`

Defined in: [hooks/useServiceData.ts:14](https://github.com/Hack23/cia-compliance-manager/blob/c2ee7b2fcb69460ebb29176ad9c216fcb0830779/src/hooks/useServiceData.ts#L14)

Error if fetch failed, null otherwise

***

### loading

> **loading**: `boolean`

Defined in: [hooks/useServiceData.ts:12](https://github.com/Hack23/cia-compliance-manager/blob/c2ee7b2fcb69460ebb29176ad9c216fcb0830779/src/hooks/useServiceData.ts#L12)

Loading state - true while data is being fetched

***

### refetch()

> **refetch**: () => `void`

Defined in: [hooks/useServiceData.ts:16](https://github.com/Hack23/cia-compliance-manager/blob/c2ee7b2fcb69460ebb29176ad9c216fcb0830779/src/hooks/useServiceData.ts#L16)

Function to manually trigger a refetch of the data

#### Returns

`void`
