[**CIA Compliance Manager Diagrams v0.8.28**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/riskUtils](../README.md) / getHighestImpactArea

# Function: getHighestImpactArea()

> **getHighestImpactArea**(`availabilityImpact`, `integrityImpact`, `confidentialityImpact`): `string`

Defined in: [utils/riskUtils.ts:436](https://github.com/Hack23/cia-compliance-manager/blob/7619f76b35999bc4eb3f6ff6c1e77c13be78f250/src/utils/riskUtils.ts#L436)

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
