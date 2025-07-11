[**CIA Compliance Manager Diagrams v0.8.19**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [hooks/useSecurityMetricsService](../README.md) / useSecurityMetricsService

# Function: useSecurityMetricsService()

> **useSecurityMetricsService**(): `object`

Defined in: [hooks/useSecurityMetricsService.ts:13](https://github.com/Hack23/cia-compliance-manager/blob/8a17389ebf0d2a027875b835eec814811b99abcc/src/hooks/useSecurityMetricsService.ts#L13)

Hook for accessing the SecurityMetricsService

## Returns

`object`

An object containing the SecurityMetricsService instance, loading state, and error

### error

> **error**: `null` \| `Error`

### isLoading

> **isLoading**: `boolean`

### refreshService()

> **refreshService**: () => `Promise`\<`void`\> = `initService`

#### Returns

`Promise`\<`void`\>

### securityMetricsService

> **securityMetricsService**: `null` \| [`SecurityMetricsService`](../../../services/securityMetricsService/classes/SecurityMetricsService.md)
