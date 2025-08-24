[**CIA Compliance Manager Documentation v0.8.24**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/riskUtils](../README.md) / getHighestImpactArea

# Function: getHighestImpactArea()

> **getHighestImpactArea**(`availabilityImpact`, `integrityImpact`, `confidentialityImpact`): `string`

Defined in: [utils/riskUtils.ts:436](https://github.com/Hack23/cia-compliance-manager/blob/8f5d084752ccee354557e96bf8b49239fb671c91/src/utils/riskUtils.ts#L436)

Identifies the highest impact area from component impact details

## Parameters

### availabilityImpact

`any`

Availability impact details

### integrityImpact

`any`

Integrity impact details

### confidentialityImpact

`any`

Confidentiality impact details

## Returns

`string`

The highest impact area or areas as a string
