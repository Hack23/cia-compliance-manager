[**CIA Compliance Manager Documentation v1.0.1**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [hooks](../README.md) / ServiceDataState

# Interface: ServiceDataState\<T\>

Defined in: [hooks/useServiceData.ts:8](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/hooks/useServiceData.ts#L8)

Service data state

## Type Parameters

### T

`T`

Type of data returned by the service

## Properties

### data

> **data**: `T` \| `null`

Defined in: [hooks/useServiceData.ts:10](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/hooks/useServiceData.ts#L10)

Fetched data, null if not yet loaded or if an error occurred

***

### error

> **error**: `Error` \| `null`

Defined in: [hooks/useServiceData.ts:14](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/hooks/useServiceData.ts#L14)

Error if fetch failed, null otherwise

***

### loading

> **loading**: `boolean`

Defined in: [hooks/useServiceData.ts:12](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/hooks/useServiceData.ts#L12)

Loading state - true while data is being fetched

***

### refetch()

> **refetch**: () => `void`

Defined in: [hooks/useServiceData.ts:16](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/hooks/useServiceData.ts#L16)

Function to manually trigger a refetch of the data

#### Returns

`void`
