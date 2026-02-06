[**CIA Compliance Manager Diagrams v1.1.16**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/securityMetricsService](../README.md) / CostEstimation

# Interface: CostEstimation

Defined in: [services/securityMetricsService.ts:28](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/services/securityMetricsService.ts#L28)

Cost estimation details for security implementation

## Properties

### annualMaintenanceCost

> **annualMaintenanceCost**: `string` \| `number`

Defined in: [services/securityMetricsService.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/services/securityMetricsService.ts#L30)

Ongoing annual maintenance cost (formatted string or numeric value)

***

### costBreakdown

> **costBreakdown**: `Record`\<`string`, `unknown`\>

Defined in: [services/securityMetricsService.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/services/securityMetricsService.ts#L31)

Detailed breakdown by component (availability, integrity, confidentiality)

***

### roi?

> `optional` **roi**: `Record`\<`string`, `unknown`\>

Defined in: [services/securityMetricsService.ts:32](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/services/securityMetricsService.ts#L32)

Optional ROI analysis including payback period, risk reduction, and business benefits

***

### totalImplementationCost

> **totalImplementationCost**: `string` \| `number`

Defined in: [services/securityMetricsService.ts:29](https://github.com/Hack23/cia-compliance-manager/blob/08d981d9d23db94df1debc77186c22027f4d896e/src/services/securityMetricsService.ts#L29)

Total upfront implementation cost (formatted string like "$50,000" or numeric value)
