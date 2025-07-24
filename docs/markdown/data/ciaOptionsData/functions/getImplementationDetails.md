[**CIA Compliance Manager Documentation v0.8.20**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [data/ciaOptionsData](../README.md) / getImplementationDetails

# Function: getImplementationDetails()

> **getImplementationDetails**(`component`, `level`): `object`

Defined in: [data/ciaOptionsData.ts:337](https://github.com/Hack23/cia-compliance-manager/blob/9180e2700dca841f6711d7243c036db4de73db57/src/data/ciaOptionsData.ts#L337)

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
