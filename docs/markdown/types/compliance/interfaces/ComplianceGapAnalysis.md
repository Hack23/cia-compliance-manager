[**CIA Compliance Manager Documentation v1.1.5**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/compliance](../README.md) / ComplianceGapAnalysis

# Interface: ComplianceGapAnalysis

Defined in: [types/compliance.ts:103](https://github.com/Hack23/cia-compliance-manager/blob/a17ff8a572d7423ca01410dd8a5a66308c170558/src/types/compliance.ts#L103)

Interface for compliance gap analysis

## Properties

### complianceScore?

> `optional` **complianceScore**: `number`

Defined in: [types/compliance.ts:127](https://github.com/Hack23/cia-compliance-manager/blob/a17ff8a572d7423ca01410dd8a5a66308c170558/src/types/compliance.ts#L127)

Compliance score (0-100)

***

### gaps

> **gaps**: [`ComplianceGap`](ComplianceGap.md)[]

Defined in: [types/compliance.ts:112](https://github.com/Hack23/cia-compliance-manager/blob/a17ff8a572d7423ca01410dd8a5a66308c170558/src/types/compliance.ts#L112)

List of compliance gaps by framework

***

### isCompliant

> **isCompliant**: `boolean`

Defined in: [types/compliance.ts:107](https://github.com/Hack23/cia-compliance-manager/blob/a17ff8a572d7423ca01410dd8a5a66308c170558/src/types/compliance.ts#L107)

Whether the organization is compliant with the framework

***

### overallStatus?

> `optional` **overallStatus**: `string`

Defined in: [types/compliance.ts:122](https://github.com/Hack23/cia-compliance-manager/blob/a17ff8a572d7423ca01410dd8a5a66308c170558/src/types/compliance.ts#L122)

Overall compliance status text

***

### recommendations

> **recommendations**: `string`[]

Defined in: [types/compliance.ts:117](https://github.com/Hack23/cia-compliance-manager/blob/a17ff8a572d7423ca01410dd8a5a66308c170558/src/types/compliance.ts#L117)

Recommendations for addressing compliance gaps
