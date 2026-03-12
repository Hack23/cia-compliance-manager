[**CIA Compliance Manager Diagrams v1.1.29**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/costCalculationUtils](../README.md) / calculateSecurityROI

# Function: calculateSecurityROI()

> **calculateSecurityROI**(`securityCost`, `riskReductionPercent`, `potentialLoss`, `timeframeYears?`): `object`

Defined in: [utils/costCalculationUtils.ts:164](https://github.com/Hack23/cia-compliance-manager/blob/6b0efc4a0e6dc19fe754f64606c6464995b0f7f5/src/utils/costCalculationUtils.ts#L164)

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
