[**CIA Compliance Manager Documentation v1.1.16**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [hooks/useCIAContentService](../README.md) / UseCIAContentServiceReturn

# Interface: UseCIAContentServiceReturn

Defined in: [hooks/useCIAContentService.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/hooks/useCIAContentService.ts#L26)

Return type for useCIAContentService hook

Provides access to the CIA content service along with loading
and error states for proper UI handling.

## Example

```tsx
const { ciaContentService, isLoading, error, refresh } = useCIAContentService();

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} onRetry={refresh} />;
if (!ciaContentService) return null;

// Use the service
const details = ciaContentService.getCIADetails('availability', 'High');
```

## Properties

### ciaContentService

> **ciaContentService**: [`CIAContentService`](../../../services/ciaContentService/classes/CIAContentService.md) \| `null`

Defined in: [hooks/useCIAContentService.ts:33](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/hooks/useCIAContentService.ts#L33)

CIA content service instance

Null while loading or if initialization failed. Check isLoading
and error states before using.

***

### error

> **error**: `Error` \| `null`

Defined in: [hooks/useCIAContentService.ts:49](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/hooks/useCIAContentService.ts#L49)

Error object if initialization failed

Null if no error occurred. When present, ciaContentService will be null.
Use to show error UI and provide retry option.

***

### isLoading

> **isLoading**: `boolean`

Defined in: [hooks/useCIAContentService.ts:41](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/hooks/useCIAContentService.ts#L41)

Loading state indicator

True during initial service initialization or when refresh() is called.
Use to show loading UI.

***

### refresh()

> **refresh**: () => `void`

Defined in: [hooks/useCIAContentService.ts:66](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/hooks/useCIAContentService.ts#L66)

Function to retry service initialization

Call this to re-attempt service creation after an error,
or to refresh the service instance.

#### Returns

`void`

#### Example

```tsx
{error && (
  <button onClick={refresh}>
    Retry Loading
  </button>
)}
```
