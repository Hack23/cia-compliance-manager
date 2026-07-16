[**CIA Compliance Manager — UML Diagrams v1.1.112**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/compliance](../README.md) / ComplianceGapAnalysis

# Interface: ComplianceGapAnalysis

Defined in: [types/compliance.ts:99](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/types/compliance.ts#L99)

Interface for compliance gap analysis

## Properties

### isCompliant

> **isCompliant**: `boolean`

Defined in: [types/compliance.ts:103](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/types/compliance.ts#L103)

Whether the organization is compliant with the framework

***

### gaps

> **gaps**: [`ComplianceGap`](ComplianceGap.md)[]

Defined in: [types/compliance.ts:108](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/types/compliance.ts#L108)

List of compliance gaps by framework

***

### recommendations

> **recommendations**: `string`[]

Defined in: [types/compliance.ts:113](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/types/compliance.ts#L113)

Recommendations for addressing compliance gaps

***

### overallStatus?

> `optional` **overallStatus?**: `string`

Defined in: [types/compliance.ts:118](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/types/compliance.ts#L118)

Overall compliance status text

***

### complianceScore?

> `optional` **complianceScore?**: `number`

Defined in: [types/compliance.ts:123](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/types/compliance.ts#L123)

Compliance score (0-100)
