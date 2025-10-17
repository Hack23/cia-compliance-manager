[**CIA Compliance Manager Documentation v0.8.32**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/riskUtils](../README.md) / createBusinessImpact

# Variable: createBusinessImpact()

> `const` **createBusinessImpact**: (`component`, `level`) => [`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md) = `createDefaultBusinessImpact`

Defined in: [utils/riskUtils.ts:41](https://github.com/Hack23/cia-compliance-manager/blob/0dc9a11e510cc2f2986e7debe532892627f2b00f/src/utils/riskUtils.ts#L41)

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
