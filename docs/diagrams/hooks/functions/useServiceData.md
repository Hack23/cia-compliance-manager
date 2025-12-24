[**CIA Compliance Manager Diagrams v1.0.6**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [hooks](../README.md) / useServiceData

# Function: useServiceData()

> **useServiceData**\<`T`\>(`fetchFn`, `deps`): [`ServiceDataState`](../interfaces/ServiceDataState.md)\<`T`\>

Defined in: [hooks/useServiceData.ts:89](https://github.com/Hack23/cia-compliance-manager/blob/9b3072efb30bdaf3352c14e8d2bbb95562548f7a/src/hooks/useServiceData.ts#L89)

Custom hook for fetching service data with loading and error states

## Business Perspective

Standardizes data fetching across all widgets, ensuring consistent loading
states and error handling. This improves user experience by providing
predictable feedback during data operations and simplifies maintenance
by centralizing error handling logic. 🔄

## Technical Perspective

Extracts the common loading/error/data pattern found in 6+ widgets,
reducing code duplication and ensuring consistent error handling. Uses
React hooks best practices with proper dependency management.

Note: This hook currently supports synchronous fetch functions only.
The services in this application return data synchronously, so this
design choice simplifies the implementation and testing. For async
operations, the hook can be extended in the future if needed.

## Type Parameters

### T

`T`

Type of data returned by the fetch function

## Parameters

### fetchFn

() => `T`

Synchronous function to fetch data

### deps

`DependencyList` = `[]`

Dependency array for useEffect (when to re-fetch)

## Returns

[`ServiceDataState`](../interfaces/ServiceDataState.md)\<`T`\>

Service data state with loading, error, data, and refetch function

## Examples

```tsx
// Basic usage with service call
const { data, loading, error, refetch } = useServiceData(
  () => securityMetricsService.getMetrics(level),
  [level]
);

if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} retry={refetch} />;
if (!data) return <NoDataMessage />;

return <DataDisplay data={data} />;
```

```tsx
// Usage with multiple dependencies
const { data, loading, error } = useServiceData(
  () => getSecurityMetrics(
    levels.availability,
    levels.integrity,
    levels.confidentiality
  ),
  [levels.availability, levels.integrity, levels.confidentiality]
);
```

```tsx
// Manual refetch on user action
const { data, refetch } = useServiceData(
  () => complianceService.getStatus(level),
  [level]
);

return (
  <div>
    <DataDisplay data={data} />
    <button onClick={refetch}>Refresh</button>
  </div>
);
```
