[**CIA Compliance Manager Diagrams v0.8.15**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [data/ciaOptionsData](../README.md) / getImplementationDetails

# Function: getImplementationDetails()

> **getImplementationDetails**(`component`, `level`): `object`

Defined in: [data/ciaOptionsData.ts:337](https://github.com/Hack23/cia-compliance-manager/blob/50a3bb1fa64948444e36c06fee075b5043350db0/src/data/ciaOptionsData.ts#L337)

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
