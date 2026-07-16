[**CIA Compliance Manager — UML Diagrams v1.1.112**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [hooks/useSecurityMetricsService](../README.md) / useSecurityMetricsService

# Function: useSecurityMetricsService()

> **useSecurityMetricsService**(): `object`

Defined in: [hooks/useSecurityMetricsService.ts:13](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/hooks/useSecurityMetricsService.ts#L13)

Hook for accessing the SecurityMetricsService

## Returns

`object`

An object containing the SecurityMetricsService instance, loading state, and error

### securityMetricsService

> **securityMetricsService**: [`SecurityMetricsService`](../../../services/securityMetricsService/classes/SecurityMetricsService.md) \| `null`

### error

> **error**: `Error` \| `null`

### isLoading

> **isLoading**: `boolean`

### refreshService

> **refreshService**: () => `Promise`\<`void`\> = `initService`

#### Returns

`Promise`\<`void`\>
