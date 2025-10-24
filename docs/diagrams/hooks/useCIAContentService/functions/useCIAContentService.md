[**CIA Compliance Manager Diagrams v0.8.34**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [hooks/useCIAContentService](../README.md) / useCIAContentService

# Function: useCIAContentService()

> **useCIAContentService**(): `object`

Defined in: [hooks/useCIAContentService.ts:12](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/hooks/useCIAContentService.ts#L12)

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
