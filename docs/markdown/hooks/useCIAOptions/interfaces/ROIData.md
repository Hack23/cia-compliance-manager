[**CIA Compliance Manager Documentation v1.1.1**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [hooks/useCIAOptions](../README.md) / ROIData

# Interface: ROIData

Defined in: [hooks/useCIAOptions.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/hooks/useCIAOptions.ts#L30)

ROI data structure containing investment analysis

Provides return on investment metrics and recommendations for
security level implementations, helping stakeholders understand
the business value of security investments.

## Example

```typescript
const roiData: ROIData = {
  returnRate: "75%",
  recommendation: "High investment recommended",
  description: "Advanced security measures should be implemented.",
  value: "$75,000",
  potentialSavings: "$200,000 annually",
  breakEvenPeriod: "18 months"
};
```

## Properties

### breakEvenPeriod?

> `optional` **breakEvenPeriod**: `string`

Defined in: [hooks/useCIAOptions.ts:47](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/hooks/useCIAOptions.ts#L47)

Optional time period to break even on investment

***

### description

> **description**: `string`

Defined in: [hooks/useCIAOptions.ts:38](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/hooks/useCIAOptions.ts#L38)

Detailed description of the investment scenario

***

### potentialSavings?

> `optional` **potentialSavings**: `string`

Defined in: [hooks/useCIAOptions.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/hooks/useCIAOptions.ts#L44)

Optional estimated cost savings

***

### recommendation

> **recommendation**: `string`

Defined in: [hooks/useCIAOptions.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/hooks/useCIAOptions.ts#L35)

Investment recommendation text

***

### returnRate

> **returnRate**: `string`

Defined in: [hooks/useCIAOptions.ts:32](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/hooks/useCIAOptions.ts#L32)

Expected return rate as percentage (e.g., "75%", "100%")

***

### value?

> `optional` **value**: `string`

Defined in: [hooks/useCIAOptions.ts:41](https://github.com/Hack23/cia-compliance-manager/blob/1ebf341a32b3e817927a60b7d1a0904ca94c68ff/src/hooks/useCIAOptions.ts#L41)

Optional calculated ROI value in currency
