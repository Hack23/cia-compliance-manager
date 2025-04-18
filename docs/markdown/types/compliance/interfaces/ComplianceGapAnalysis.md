[**CIA Compliance Manager Documentation v0.8.8**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/compliance](../README.md) / ComplianceGapAnalysis

# Interface: ComplianceGapAnalysis

Defined in: [types/compliance.ts:84](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/compliance.ts#L84)

Interface for compliance gap analysis

## Properties

### complianceScore?

> `optional` **complianceScore**: `number`

Defined in: [types/compliance.ts:108](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/compliance.ts#L108)

Compliance score (0-100)

***

### gaps

> **gaps**: [`ComplianceGap`](ComplianceGap.md)[]

Defined in: [types/compliance.ts:93](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/compliance.ts#L93)

List of compliance gaps by framework

***

### isCompliant

> **isCompliant**: `boolean`

Defined in: [types/compliance.ts:88](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/compliance.ts#L88)

Whether the organization is compliant with the framework

***

### overallStatus?

> `optional` **overallStatus**: `string`

Defined in: [types/compliance.ts:103](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/compliance.ts#L103)

Overall compliance status text

***

### recommendations

> **recommendations**: `string`[]

Defined in: [types/compliance.ts:98](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/compliance.ts#L98)

Recommendations for addressing compliance gaps
