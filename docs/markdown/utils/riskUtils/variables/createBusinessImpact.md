[**CIA Compliance Manager Documentation v0.8.31**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/riskUtils](../README.md) / createBusinessImpact

# Variable: createBusinessImpact()

> `const` **createBusinessImpact**: (`component`, `level`) => [`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md) = `createDefaultBusinessImpact`

Defined in: [utils/riskUtils.ts:41](https://github.com/Hack23/cia-compliance-manager/blob/85c025371255f412469ec0119911b7cb143a6212/src/utils/riskUtils.ts#L41)

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
