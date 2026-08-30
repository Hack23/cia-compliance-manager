[**CIA Compliance Manager — UML Diagrams v1.1.110**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [hooks/useComplianceService](../README.md) / useComplianceService

# Function: useComplianceService()

> **useComplianceService**(): `object`

Defined in: [hooks/useComplianceService.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/10c9d46d58d4ca937f15cd84ca8d67641f9ca8bc/src/hooks/useComplianceService.ts#L26)

Hook to access compliance service functionality

## Business Perspective

Provides compliance status and framework validation capabilities for CIA security levels.
Enables widgets to determine which compliance frameworks are satisfied based on
selected security configurations. 📋

## Returns

`object`

Object containing complianceService, isLoading state, and error state

### isLoading

> **isLoading**: `boolean`

### complianceService

> **complianceService**: [`ComplianceServiceAdapter`](../../../services/ComplianceServiceAdapter/classes/ComplianceServiceAdapter.md)

### error

> **error**: `Error` \| `null`

## Example

```typescript
const { complianceService, isLoading, error } = useComplianceService();

if (!isLoading && complianceService) {
  const status = complianceService.getComplianceStatus('High', 'High', 'High');
  console.log(status?.compliantFrameworks);
}
```
