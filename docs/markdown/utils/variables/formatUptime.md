[**CIA Compliance Manager — Markdown Documentation v1.1.115**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / formatUptime

# Variable: formatUptime

> **formatUptime**: (`uptime`) => `string`

Defined in: [utils/index.ts:89](https://github.com/Hack23/cia-compliance-manager/blob/7ccd437a9a11f08277626ae4f6879b747fb31d1f/src/utils/index.ts#L89)

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
