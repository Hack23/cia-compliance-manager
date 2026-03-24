[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [hooks/useServiceData](../README.md) / ServiceDataState

# Interface: ServiceDataState\<T\>

Defined in: [hooks/useServiceData.ts:8](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/hooks/useServiceData.ts#L8)

Service data state

## Type Parameters

### T

`T`

Type of data returned by the service

## Properties

### data

> **data**: `T` \| `null`

Defined in: [hooks/useServiceData.ts:10](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/hooks/useServiceData.ts#L10)

Fetched data, null if not yet loaded or if an error occurred

***

### loading

> **loading**: `boolean`

Defined in: [hooks/useServiceData.ts:12](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/hooks/useServiceData.ts#L12)

Loading state - true while data is being fetched

***

### error

> **error**: `Error` \| `null`

Defined in: [hooks/useServiceData.ts:14](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/hooks/useServiceData.ts#L14)

Error if fetch failed, null otherwise

***

### refetch

> **refetch**: () => `void`

Defined in: [hooks/useServiceData.ts:16](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/hooks/useServiceData.ts#L16)

Function to manually trigger a refetch of the data

#### Returns

`void`
