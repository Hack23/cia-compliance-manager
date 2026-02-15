[**CIA Compliance Manager Documentation v1.1.19**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [hooks/useCIAContentService](../README.md) / useCIAContentService

# Function: useCIAContentService()

> **useCIAContentService**(): [`UseCIAContentServiceReturn`](../interfaces/UseCIAContentServiceReturn.md)

Defined in: [hooks/useCIAContentService.ts:151](https://github.com/Hack23/cia-compliance-manager/blob/9dce5e80857b65e14d60f220240eac83c6163399/src/hooks/useCIAContentService.ts#L151)

Custom hook to access the CIA content service with loading and error states

Provides a convenient way to access the CIAContentService in React components
with automatic initialization, loading states, and error handling. The service
is initialized once when the component mounts and can be refreshed on demand.

## Features
- Automatic service initialization on mount
- Loading state management
- Error handling with retry capability
- Async initialization support
- Type-safe return values

## Usage Guidelines
- Always check `isLoading` before rendering content
- Handle `error` state to provide user feedback
- Verify `ciaContentService` is not null before use
- Use `refresh()` to retry after errors

## Returns

[`UseCIAContentServiceReturn`](../interfaces/UseCIAContentServiceReturn.md)

Object containing the CIA content service, loading state, error state, and refresh function

## Examples

```tsx
// Basic usage with loading and error handling
function MyComponent() {
  const { ciaContentService, isLoading, error, refresh } = useCIAContentService();

  if (isLoading) {
    return <div>Loading CIA content service...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={refresh}>Retry</button>
      </div>
    );
  }

  if (!ciaContentService) {
    return <div>Service not available</div>;
  }

  // Safe to use the service here
  const availabilityDetails = ciaContentService.getCIADetails('availability', 'High');

  return <div>{availabilityDetails.description}</div>;
}
```

```tsx
// Advanced usage with multiple service calls
function SecurityDashboard() {
  const { ciaContentService, isLoading, error } = useCIAContentService();
  const [selectedLevel, setSelectedLevel] = useState<SecurityLevel>('Moderate');

  if (isLoading || !ciaContentService) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorBoundary error={error} />;
  }

  const availDetails = ciaContentService.getCIADetails('availability', selectedLevel);
  const integrityDetails = ciaContentService.getCIADetails('integrity', selectedLevel);
  const confDetails = ciaContentService.getCIADetails('confidentiality', selectedLevel);

  return (
    <div>
      <h2>Security Level: {selectedLevel}</h2>
      <ComponentCard title="Availability" details={availDetails} />
      <ComponentCard title="Integrity" details={integrityDetails} />
      <ComponentCard title="Confidentiality" details={confDetails} />
    </div>
  );
}
```
