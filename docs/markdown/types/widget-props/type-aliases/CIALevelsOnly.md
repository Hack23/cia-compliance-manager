[**CIA Compliance Manager — Markdown Documentation v1.1.110**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/widget-props](../README.md) / CIALevelsOnly

# Type Alias: CIALevelsOnly

> **CIALevelsOnly** = `Pick`\<[`AllCIAComponentsProps`](../interfaces/AllCIAComponentsProps.md), `"availabilityLevel"` \| `"integrityLevel"` \| `"confidentialityLevel"`\>

Defined in: [types/widget-props.ts:355](https://github.com/Hack23/cia-compliance-manager/blob/10c9d46d58d4ca937f15cd84ca8d67641f9ca8bc/src/types/widget-props.ts#L355)

Extract only the CIA level props from AllCIAComponentsProps

Useful when you need just the security levels without other widget props.

## Example

```typescript
const levels: CIALevelsOnly = {
  availabilityLevel: 'High',
  integrityLevel: 'Very High',
  confidentialityLevel: 'Moderate'
};
```
