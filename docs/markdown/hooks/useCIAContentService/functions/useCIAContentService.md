[**CIA Compliance Manager Documentation v0.8.36**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [hooks/useCIAContentService](../README.md) / useCIAContentService

# Function: useCIAContentService()

> **useCIAContentService**(): `object`

Defined in: [hooks/useCIAContentService.ts:12](https://github.com/Hack23/cia-compliance-manager/blob/2ec0557cf80706d3ac1df0334a4af519a5787366/src/hooks/useCIAContentService.ts#L12)

Hook to access the CIA content service with loading and error states

## Returns

`object`

Object containing the CIA content service, loading state, and error state

### ciaContentService

> **ciaContentService**: [`CIAContentService`](../../../services/ciaContentService/classes/CIAContentService.md) \| `null`

### error

> **error**: `Error` \| `null`

### isLoading

> **isLoading**: `boolean`

### refresh()

> **refresh**: () => `void`

#### Returns

`void`
