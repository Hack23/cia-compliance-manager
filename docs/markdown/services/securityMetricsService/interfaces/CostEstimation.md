[**CIA Compliance Manager Documentation v0.9.0**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/securityMetricsService](../README.md) / CostEstimation

# Interface: CostEstimation

Defined in: [services/securityMetricsService.ts:27](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/services/securityMetricsService.ts#L27)

Cost estimation details for security implementation

## Properties

### annualMaintenanceCost

> **annualMaintenanceCost**: `string` \| `number`

Defined in: [services/securityMetricsService.ts:29](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/services/securityMetricsService.ts#L29)

Ongoing annual maintenance cost (formatted string or numeric value)

***

### costBreakdown

> **costBreakdown**: `Record`\<`string`, `unknown`\>

Defined in: [services/securityMetricsService.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/services/securityMetricsService.ts#L30)

Detailed breakdown by component (availability, integrity, confidentiality)

***

### roi?

> `optional` **roi**: `Record`\<`string`, `unknown`\>

Defined in: [services/securityMetricsService.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/services/securityMetricsService.ts#L31)

Optional ROI analysis including payback period, risk reduction, and business benefits

***

### totalImplementationCost

> **totalImplementationCost**: `string` \| `number`

Defined in: [services/securityMetricsService.ts:28](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/services/securityMetricsService.ts#L28)

Total upfront implementation cost (formatted string like "$50,000" or numeric value)
