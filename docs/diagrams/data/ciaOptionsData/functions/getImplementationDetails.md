[**CIA Compliance Manager — UML Diagrams v1.1.121**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [data/ciaOptionsData](../README.md) / getImplementationDetails

# Function: getImplementationDetails()

> **getImplementationDetails**(`component`, `level`): `object`

Defined in: [data/ciaOptionsData.ts:331](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/data/ciaOptionsData.ts#L331)

Get the implementation details for a specific component and level

## Parameters

### component

`"confidentiality"` \| `"integrity"` \| `"availability"`

CIA component

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
