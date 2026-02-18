[**CIA Compliance Manager Documentation v1.1.20**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/costCalculationUtils](../README.md) / calculateSecurityROI

# Function: calculateSecurityROI()

> **calculateSecurityROI**(`securityCost`, `riskReductionPercent`, `potentialLoss`, `timeframeYears?`): `object`

Defined in: [utils/costCalculationUtils.ts:164](https://github.com/Hack23/cia-compliance-manager/blob/c2ee7b2fcb69460ebb29176ad9c216fcb0830779/src/utils/costCalculationUtils.ts#L164)

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
