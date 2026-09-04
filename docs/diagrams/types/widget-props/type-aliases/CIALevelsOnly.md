[**CIA Compliance Manager — UML Diagrams v1.1.143**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/widget-props](../README.md) / CIALevelsOnly

# Type Alias: CIALevelsOnly

> **CIALevelsOnly** = `Pick`\<[`AllCIAComponentsProps`](../interfaces/AllCIAComponentsProps.md), `"availabilityLevel"` \| `"integrityLevel"` \| `"confidentialityLevel"`\>

Defined in: [types/widget-props.ts:355](https://github.com/Hack23/cia-compliance-manager/blob/ed90fd0069f5cd488ae5acffca473ead6710addb/src/types/widget-props.ts#L355)

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
