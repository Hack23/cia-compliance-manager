[**CIA Compliance Manager — UML Diagrams v1.1.126**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/technicalDetailsDefaults](../README.md) / getDefaultTechnicalDetails

# Function: getDefaultTechnicalDetails()

> **getDefaultTechnicalDetails**(`component`, `level`): `object`

Defined in: [utils/technicalDetailsDefaults.ts:10](https://github.com/Hack23/cia-compliance-manager/blob/9ccbd7f17a2eef277e3bb28ec127ec9fa27be180/src/utils/technicalDetailsDefaults.ts#L10)

Gets default technical details when service isn't available

## Parameters

### component

`string`

The CIA component

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The security level

## Returns

`object`

Default technical details object

### description

> **description**: `string`

### technical

> **technical**: `string`

### recommendations

> **recommendations**: `string`[]
