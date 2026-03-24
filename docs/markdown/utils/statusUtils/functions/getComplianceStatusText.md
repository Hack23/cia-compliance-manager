[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/statusUtils](../README.md) / getComplianceStatusText

# Function: getComplianceStatusText()

> **getComplianceStatusText**(`complianceScore`): `string`

Defined in: [utils/statusUtils.ts:114](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/utils/statusUtils.ts#L114)

Gets compliance status text based on compliance score

Translates numeric compliance scores into human-readable status messages
for executives and stakeholders. Uses industry-standard thresholds for
compliance categorization.

## Parameters

### complianceScore

`number`

The compliance score percentage (0-100)

## Returns

`string`

Human-readable compliance status text

## Example

```typescript
getComplianceStatusText(95)  // 'Strong compliance position'
getComplianceStatusText(80)  // 'Strong compliance position'
getComplianceStatusText(65)  // 'Moderate compliance position'
getComplianceStatusText(50)  // 'Moderate compliance position'
getComplianceStatusText(30)  // 'Compliance gaps detected'
getComplianceStatusText(0)   // 'Compliance gaps detected'

// Usage in dashboard
const score = calculateComplianceScore();
const status = getComplianceStatusText(score);
<ComplianceCard score={score} status={status} />
```
