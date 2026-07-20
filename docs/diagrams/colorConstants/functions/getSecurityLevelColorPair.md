[**CIA Compliance Manager — UML Diagrams v1.1.116**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [colorConstants](../README.md) / getSecurityLevelColorPair

# Function: getSecurityLevelColorPair()

> **getSecurityLevelColorPair**(`level`): [`SecurityLevelColorPair`](../interfaces/SecurityLevelColorPair.md)

Defined in: [constants/colorConstants.ts:174](https://github.com/Hack23/cia-compliance-manager/blob/9ccce78f1d05ab6ac72d787643353220350a4be4/src/constants/colorConstants.ts#L174)

Get security level color pair by level name.

Retrieves the background and text colors for a given security level.
Returns "None" colors as fallback for invalid or undefined levels.

## Parameters

### level

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Security level to get colors for

## Returns

[`SecurityLevelColorPair`](../interfaces/SecurityLevelColorPair.md)

Color pair object with background and text colors

## Examples

```typescript
// Basic usage
const colors = getSecurityLevelColorPair('High');
console.log(colors.bg);   // "#27ae60"
console.log(colors.text); // "#00e676"

// With dynamic level
const UserBadge = ({ level }: { level: SecurityLevel }) => {
  const colors = getSecurityLevelColorPair(level);
  return (
    <span style={{ backgroundColor: colors.bg, color: colors.text }}>
      {level}
    </span>
  );
};
```

```typescript
// Fallback behavior for invalid level
const colors = getSecurityLevelColorPair('InvalidLevel' as SecurityLevel);
// Returns SECURITY_LEVEL_COLORS['None'] (red colors)
```
