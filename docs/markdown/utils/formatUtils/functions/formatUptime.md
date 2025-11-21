[**CIA Compliance Manager Documentation v0.9.2**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/formatUtils](../README.md) / formatUptime

# Function: formatUptime()

> **formatUptime**(`uptime`): `string`

Defined in: [utils/formatUtils.ts:300](https://github.com/Hack23/cia-compliance-manager/blob/4a2010ba7d0748aab2dadaf655c5204c6a96bd65/src/utils/formatUtils.ts#L300)

Format uptime percentage for availability display

Normalizes uptime values which may be provided in different formats
(with or without % symbol, as string or number). Ensures consistent
percentage display format.

## Parameters

### uptime

`string`

Uptime value in various formats

## Returns

`string`

Formatted uptime string with % symbol

## Example

```typescript
formatUptime("99.9%")     // "99.9%" (already formatted)
formatUptime("99.9")      // "99.9%" (adds % symbol)
formatUptime("0.999")     // "99.9%" (converts decimal to percentage)
formatUptime("invalid")   // "invalid" (returns as-is if not parseable)
```
