[**CIA Compliance Manager Documentation v1.1.4**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/formatUtils](../README.md) / formatUptime

# Function: formatUptime()

> **formatUptime**(`uptime`): `string`

Defined in: [utils/formatUtils.ts:317](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/utils/formatUtils.ts#L317)

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
