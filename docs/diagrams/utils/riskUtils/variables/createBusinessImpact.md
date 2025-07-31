[**CIA Compliance Manager Diagrams v0.8.21**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/riskUtils](../README.md) / createBusinessImpact

# Variable: createBusinessImpact()

> `const` **createBusinessImpact**: (`component`, `level`) => [`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md) = `createDefaultBusinessImpact`

Defined in: [utils/riskUtils.ts:41](https://github.com/Hack23/cia-compliance-manager/blob/689e67e40bb6afe811128d672a0d7dd5fcbdaea5/src/utils/riskUtils.ts#L41)

Create a default business impact object with minimum required fields

## Parameters

### component

`string`

CIA component type

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

## Returns

[`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md)

Business impact details
