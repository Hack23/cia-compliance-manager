[**CIA Compliance Manager Diagrams v1.1.12**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [data/ciaOptionsData](../README.md) / getImplementationDetails

# Function: getImplementationDetails()

> **getImplementationDetails**(`component`, `level`): `object`

Defined in: [data/ciaOptionsData.ts:335](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/data/ciaOptionsData.ts#L335)

Get the implementation details for a specific component and level

## Parameters

### component

CIA component

`"confidentiality"` | `"integrity"` | `"availability"`

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

## Returns

`object`

Implementation details

### effort

> **effort**: `string`

### expertise

> **expertise**: `string`

### timeframe

> **timeframe**: `string`
