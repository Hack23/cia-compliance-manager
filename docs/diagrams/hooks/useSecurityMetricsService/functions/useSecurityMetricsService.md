[**CIA Compliance Manager Diagrams v1.1.17**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [hooks/useSecurityMetricsService](../README.md) / useSecurityMetricsService

# Function: useSecurityMetricsService()

> **useSecurityMetricsService**(): `object`

Defined in: [hooks/useSecurityMetricsService.ts:13](https://github.com/Hack23/cia-compliance-manager/blob/64549ac2e28eb854ca1acff8c4df7f34bf49dfaa/src/hooks/useSecurityMetricsService.ts#L13)

Hook for accessing the SecurityMetricsService

## Returns

`object`

An object containing the SecurityMetricsService instance, loading state, and error

### error

> **error**: `Error` \| `null`

### isLoading

> **isLoading**: `boolean`

### refreshService()

> **refreshService**: () => `Promise`\<`void`\> = `initService`

#### Returns

`Promise`\<`void`\>

### securityMetricsService

> **securityMetricsService**: [`SecurityMetricsService`](../../../services/securityMetricsService/classes/SecurityMetricsService.md) \| `null`
