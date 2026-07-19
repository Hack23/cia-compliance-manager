[**CIA Compliance Manager — UML Diagrams v1.1.115**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/technicalDetailsDefaults](../README.md) / getDefaultTechnicalDetails

# Function: getDefaultTechnicalDetails()

> **getDefaultTechnicalDetails**(`component`, `level`): `object`

Defined in: [utils/technicalDetailsDefaults.ts:10](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/utils/technicalDetailsDefaults.ts#L10)

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
