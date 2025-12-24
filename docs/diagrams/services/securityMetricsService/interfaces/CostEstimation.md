[**CIA Compliance Manager Diagrams v1.0.6**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/securityMetricsService](../README.md) / CostEstimation

# Interface: CostEstimation

Defined in: [services/securityMetricsService.ts:27](https://github.com/Hack23/cia-compliance-manager/blob/9b3072efb30bdaf3352c14e8d2bbb95562548f7a/src/services/securityMetricsService.ts#L27)

Cost estimation details for security implementation

## Properties

### annualMaintenanceCost

> **annualMaintenanceCost**: `string` \| `number`

Defined in: [services/securityMetricsService.ts:29](https://github.com/Hack23/cia-compliance-manager/blob/9b3072efb30bdaf3352c14e8d2bbb95562548f7a/src/services/securityMetricsService.ts#L29)

Ongoing annual maintenance cost (formatted string or numeric value)

***

### costBreakdown

> **costBreakdown**: `Record`\<`string`, `unknown`\>

Defined in: [services/securityMetricsService.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/9b3072efb30bdaf3352c14e8d2bbb95562548f7a/src/services/securityMetricsService.ts#L30)

Detailed breakdown by component (availability, integrity, confidentiality)

***

### roi?

> `optional` **roi**: `Record`\<`string`, `unknown`\>

Defined in: [services/securityMetricsService.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/9b3072efb30bdaf3352c14e8d2bbb95562548f7a/src/services/securityMetricsService.ts#L31)

Optional ROI analysis including payback period, risk reduction, and business benefits

***

### totalImplementationCost

> **totalImplementationCost**: `string` \| `number`

Defined in: [services/securityMetricsService.ts:28](https://github.com/Hack23/cia-compliance-manager/blob/9b3072efb30bdaf3352c14e8d2bbb95562548f7a/src/services/securityMetricsService.ts#L28)

Total upfront implementation cost (formatted string like "$50,000" or numeric value)
