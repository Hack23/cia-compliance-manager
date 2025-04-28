[**CIA Compliance Manager Documentation v0.8.12**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/riskUtils](../README.md) / getHighestImpactArea

# Function: getHighestImpactArea()

> **getHighestImpactArea**(`availabilityImpact`, `integrityImpact`, `confidentialityImpact`): `string`

Defined in: [utils/riskUtils.ts:436](https://github.com/Hack23/cia-compliance-manager/blob/e7811142a771ec75716a7ce3a0d60f18cb91cd06/src/utils/riskUtils.ts#L436)

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
