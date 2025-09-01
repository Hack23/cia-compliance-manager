[**CIA Compliance Manager Diagrams v0.8.25**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [hooks/useSecurityMetricsService](../README.md) / useSecurityMetricsService

# Function: useSecurityMetricsService()

> **useSecurityMetricsService**(): `object`

Defined in: [hooks/useSecurityMetricsService.ts:13](https://github.com/Hack23/cia-compliance-manager/blob/b7816746b3b7f5e02cb18303af9cc6696a8caef9/src/hooks/useSecurityMetricsService.ts#L13)

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
