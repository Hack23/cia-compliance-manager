[**CIA Compliance Manager Documentation v0.8.18**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [hooks/useCIAContentService](../README.md) / useCIAContentService

# Function: useCIAContentService()

> **useCIAContentService**(): `object`

Defined in: [hooks/useCIAContentService.ts:12](https://github.com/Hack23/cia-compliance-manager/blob/509f2f6138f4e24aa7fe1ae9432ec1ccefbe5f32/src/hooks/useCIAContentService.ts#L12)

Hook to access the CIA content service with loading and error states

## Returns

`object`

Object containing the CIA content service, loading state, and error state

### ciaContentService

> **ciaContentService**: `null` \| [`CIAContentService`](../../../services/ciaContentService/classes/CIAContentService.md)

### error

> **error**: `null` \| `Error`

### isLoading

> **isLoading**: `boolean`

### refresh()

> **refresh**: () => `void`

#### Returns

`void`
