[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [colorConstants](../README.md) / SECURITY\_LEVEL\_COLORS

# Variable: SECURITY\_LEVEL\_COLORS

> `const` **SECURITY\_LEVEL\_COLORS**: `Record`\<[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md), [`SecurityLevelColorPair`](../interfaces/SecurityLevelColorPair.md)\>

Defined in: [constants/colorConstants.ts:76](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/constants/colorConstants.ts#L76)

Color mapping for security levels with background and text colors.

Colors are designed to provide intuitive visual feedback:
- **None** (Red): Critical security gaps, immediate attention required
- **Low** (Orange/Yellow): Basic security, needs improvement
- **Moderate** (Yellow/Blue): Standard security, acceptable for most use cases
- **High** (Green): Strong security, suitable for sensitive data
- **Very High** (Blue/Purple): Maximum security, suitable for critical systems

Each level includes both background and text colors to support various
display contexts (badges, cards, buttons, etc.).

## Examples

```typescript
// Apply colors to a badge component
const level = 'High';
const colors = SECURITY_LEVEL_COLORS[level];

<Badge 
  style={{
    backgroundColor: colors.bg,
    color: colors.text
  }}
>
  {level}
</Badge>
```

```typescript
// Use in dynamic styling
const getLevelStyles = (level: SecurityLevel) => ({
  borderColor: SECURITY_LEVEL_COLORS[level].bg,
  color: SECURITY_LEVEL_COLORS[level].text
});
```
