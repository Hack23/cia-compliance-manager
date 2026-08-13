[**CIA Compliance Manager — Markdown Documentation v1.1.132**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/compliance](../README.md) / ComplianceStatusType

# Interface: ComplianceStatusType

Defined in: [types/compliance.ts:27](https://github.com/Hack23/cia-compliance-manager/blob/18c7e9fa5b86ac2162df1bb4c2600dea2227dddb/src/types/compliance.ts#L27)

Interface for compliance status used in SecuritySummaryWidget
Represents a simplified view of compliance status for UI display

## Properties

### status?

> `optional` **status?**: `string`

Defined in: [types/compliance.ts:29](https://github.com/Hack23/cia-compliance-manager/blob/18c7e9fa5b86ac2162df1bb4c2600dea2227dddb/src/types/compliance.ts#L29)

Optional status text

***

### complianceScore?

> `optional` **complianceScore?**: `number`

Defined in: [types/compliance.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/18c7e9fa5b86ac2162df1bb4c2600dea2227dddb/src/types/compliance.ts#L31)

Compliance score (0-100)

***

### compliantFrameworks

> **compliantFrameworks**: `string`[]

Defined in: [types/compliance.ts:33](https://github.com/Hack23/cia-compliance-manager/blob/18c7e9fa5b86ac2162df1bb4c2600dea2227dddb/src/types/compliance.ts#L33)

List of fully compliant frameworks

***

### partiallyCompliantFrameworks

> **partiallyCompliantFrameworks**: `string`[]

Defined in: [types/compliance.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/18c7e9fa5b86ac2162df1bb4c2600dea2227dddb/src/types/compliance.ts#L35)

List of partially compliant frameworks

***

### nonCompliantFrameworks?

> `optional` **nonCompliantFrameworks?**: `string`[]

Defined in: [types/compliance.ts:37](https://github.com/Hack23/cia-compliance-manager/blob/18c7e9fa5b86ac2162df1bb4c2600dea2227dddb/src/types/compliance.ts#L37)

List of non-compliant frameworks

***

### remediationSteps?

> `optional` **remediationSteps?**: `string`[]

Defined in: [types/compliance.ts:39](https://github.com/Hack23/cia-compliance-manager/blob/18c7e9fa5b86ac2162df1bb4c2600dea2227dddb/src/types/compliance.ts#L39)

Recommended remediation steps
