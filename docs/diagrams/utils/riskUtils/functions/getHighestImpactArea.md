[**CIA Compliance Manager Diagrams v0.8.25**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/riskUtils](../README.md) / getHighestImpactArea

# Function: getHighestImpactArea()

> **getHighestImpactArea**(`availabilityImpact`, `integrityImpact`, `confidentialityImpact`): `string`

Defined in: [utils/riskUtils.ts:436](https://github.com/Hack23/cia-compliance-manager/blob/b7816746b3b7f5e02cb18303af9cc6696a8caef9/src/utils/riskUtils.ts#L436)

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
