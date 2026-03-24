[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/compliance](../README.md) / ComplianceGapAnalysis

# Interface: ComplianceGapAnalysis

Defined in: [types/compliance.ts:103](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L103)

Interface for compliance gap analysis

## Properties

### isCompliant

> **isCompliant**: `boolean`

Defined in: [types/compliance.ts:107](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L107)

Whether the organization is compliant with the framework

***

### gaps

> **gaps**: [`ComplianceGap`](ComplianceGap.md)[]

Defined in: [types/compliance.ts:112](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L112)

List of compliance gaps by framework

***

### recommendations

> **recommendations**: `string`[]

Defined in: [types/compliance.ts:117](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L117)

Recommendations for addressing compliance gaps

***

### overallStatus?

> `optional` **overallStatus?**: `string`

Defined in: [types/compliance.ts:122](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L122)

Overall compliance status text

***

### complianceScore?

> `optional` **complianceScore?**: `number`

Defined in: [types/compliance.ts:127](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L127)

Compliance score (0-100)
