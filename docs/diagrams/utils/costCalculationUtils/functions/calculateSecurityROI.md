[**CIA Compliance Manager Diagrams v1.1.25**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/costCalculationUtils](../README.md) / calculateSecurityROI

# Function: calculateSecurityROI()

> **calculateSecurityROI**(`securityCost`, `riskReductionPercent`, `potentialLoss`, `timeframeYears?`): `object`

Defined in: [utils/costCalculationUtils.ts:164](https://github.com/Hack23/cia-compliance-manager/blob/59ebd29f77a54a25971ff7a3c0faf33a391bbcc5/src/utils/costCalculationUtils.ts#L164)

Calculate security ROI

## Parameters

### securityCost

`number`

### riskReductionPercent

`number`

### potentialLoss

`number`

### timeframeYears?

`number` = `3`

## Returns

`object`

### costAvoidance

> **costAvoidance**: `number`

### paybackPeriodMonths

> **paybackPeriodMonths**: `number`

### roi

> **roi**: `number`

### roiPercentage

> **roiPercentage**: `string`
