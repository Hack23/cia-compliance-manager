[**CIA Compliance Manager Documentation v0.8.30**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/riskUtils](../README.md) / createBusinessImpact

# Variable: createBusinessImpact()

> `const` **createBusinessImpact**: (`component`, `level`) => [`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md) = `createDefaultBusinessImpact`

Defined in: [utils/riskUtils.ts:41](https://github.com/Hack23/cia-compliance-manager/blob/6afa716316469147e542039d136ec79ffdbd4ac9/src/utils/riskUtils.ts#L41)

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
