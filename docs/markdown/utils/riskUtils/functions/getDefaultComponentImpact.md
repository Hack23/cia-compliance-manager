[**CIA Compliance Manager Documentation v0.8.17**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/riskUtils](../README.md) / getDefaultComponentImpact

# Function: getDefaultComponentImpact()

> **getDefaultComponentImpact**(`component`, `level`): `any`

Defined in: [utils/riskUtils.ts:502](https://github.com/Hack23/cia-compliance-manager/blob/6a2219920f4c187f7eafa3e355e36b35c9c19248/src/utils/riskUtils.ts#L502)

Generates default component impact data when service data isn't available

## Parameters

### component

`string`

The security component: 'availability', 'integrity', or 'confidentiality'

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The security level of the component

## Returns

`any`

Default impact details for the component
