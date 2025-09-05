[**CIA Compliance Manager Documentation v0.8.26**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [data/ciaOptionsData](../README.md) / getImplementationDetails

# Function: getImplementationDetails()

> **getImplementationDetails**(`component`, `level`): `object`

Defined in: [data/ciaOptionsData.ts:337](https://github.com/Hack23/cia-compliance-manager/blob/168f1311621722afef33b264085d8ac99d4a3213/src/data/ciaOptionsData.ts#L337)

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
