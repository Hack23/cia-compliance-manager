[**CIA Compliance Manager — Markdown Documentation v1.1.110**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/businessValueUtils](../README.md) / calculateROIEstimate

# Function: calculateROIEstimate()

> **calculateROIEstimate**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`ROIEstimate`](../../../types/cia-services/interfaces/ROIEstimate.md)

Defined in: [utils/businessValueUtils.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/10c9d46d58d4ca937f15cd84ca8d67641f9ca8bc/src/utils/businessValueUtils.ts#L26)

Calculates ROI estimate based on security levels

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

## Returns

[`ROIEstimate`](../../../types/cia-services/interfaces/ROIEstimate.md)

ROI estimate object with value and description

## Example

```typescript
// Calculate ROI for high security configuration
const roi = calculateROIEstimate('High', 'High', 'Moderate');
console.log(`ROI: ${roi.value}, ${roi.description}`);
// Output: ROI: 150-250%, Significant risk reduction

// Calculate ROI for moderate security
const moderateROI = calculateROIEstimate('Moderate', 'Moderate', 'Low');
console.log(moderateROI.value); // "100-150%"
```
