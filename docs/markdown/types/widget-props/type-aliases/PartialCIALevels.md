[**CIA Compliance Manager — Markdown Documentation v1.1.119**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/widget-props](../README.md) / PartialCIALevels

# Type Alias: PartialCIALevels

> **PartialCIALevels** = `Partial`\<[`CIALevelsOnly`](CIALevelsOnly.md)\>

Defined in: [types/widget-props.ts:373](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/types/widget-props.ts#L373)

Make all CIA levels optional

Useful for partial updates or default values.

## Example

```typescript
const partialLevels: PartialCIALevels = {
  availabilityLevel: 'High'
  // other levels are optional
};
```
