[**CIA Compliance Manager — Markdown Documentation v1.1.121**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/securityMetricsService](../README.md) / CostEstimation

# Interface: CostEstimation

Defined in: [services/securityMetricsService.ts:28](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/services/securityMetricsService.ts#L28)

Cost estimation details for security implementation

## Properties

### totalImplementationCost

> **totalImplementationCost**: `string` \| `number`

Defined in: [services/securityMetricsService.ts:29](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/services/securityMetricsService.ts#L29)

Total upfront implementation cost (formatted string like "$50,000" or numeric value)

***

### annualMaintenanceCost

> **annualMaintenanceCost**: `string` \| `number`

Defined in: [services/securityMetricsService.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/services/securityMetricsService.ts#L30)

Ongoing annual maintenance cost (formatted string or numeric value)

***

### costBreakdown

> **costBreakdown**: `Record`\<`string`, `unknown`\>

Defined in: [services/securityMetricsService.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/services/securityMetricsService.ts#L31)

Detailed breakdown by component (availability, integrity, confidentiality)

***

### roi?

> `optional` **roi?**: `Record`\<`string`, `unknown`\>

Defined in: [services/securityMetricsService.ts:32](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/services/securityMetricsService.ts#L32)

Optional ROI analysis including payback period, risk reduction, and business benefits
