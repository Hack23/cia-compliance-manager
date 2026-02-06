[**CIA Compliance Manager Diagrams v1.1.17**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/riskUtils](../README.md) / getDefaultComponentImpact

# Function: getDefaultComponentImpact()

> **getDefaultComponentImpact**(`component`, `level`): [`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md)

Defined in: [utils/riskUtils.ts:514](https://github.com/Hack23/cia-compliance-manager/blob/64549ac2e28eb854ca1acff8c4df7f34bf49dfaa/src/utils/riskUtils.ts#L514)

Generates default component impact data when service data isn't available

## Parameters

### component

`string`

The security component: 'availability', 'integrity', or 'confidentiality'

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The security level of the component

## Returns

[`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md)

Default impact details for the component
