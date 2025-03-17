[**CIA Compliance Manager Documentation v0.8.5**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / checkRequiredSecurityLevels

# Function: checkRequiredSecurityLevels()

> **checkRequiredSecurityLevels**(`securityLevels`, `requiredLevels`?): `boolean`

Defined in: [src/utils/widgetHelpers.tsx:296](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/utils/widgetHelpers.tsx#L296)

Check if all required security levels are present in the given security levels object

## Parameters

### securityLevels

`Record`\<`string`, `unknown`\>

Object containing security levels

### requiredLevels?

`string`[]

Array of required security level keys

## Returns

`boolean`

True if all required levels are present, false otherwise
